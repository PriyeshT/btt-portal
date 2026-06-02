"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, ExternalLink } from "lucide-react"
import { getPath } from "@/data/paths"
import {
  getStepStatus,
  toggleStepComplete,
  setLastActivePath,
  type StepStatus,
} from "@/lib/progress"

const STEP_ICONS = {
  learn: '01',
  check: '02',
  drill: '03',
  apply: '04',
  complete: '05',
}

export default function PathPageClient({ pathId }: { pathId: string }) {
  const path = getPath(pathId)!

  const colorVar = `var(${path.colorVar})`

  // Track statuses in local state so toggling re-renders immediately
  const [statuses, setStatuses] = useState<Record<string, StepStatus>>({})

  useEffect(() => {
    setLastActivePath(path.id)
    const loaded: Record<string, StepStatus> = {}
    path.steps.forEach(step => {
      loaded[step.id] = getStepStatus(path.id, step.id)
    })
    setStatuses(loaded)
  }, [path.id, path.steps])

  const completedCount = Object.values(statuses).filter(s => s === 'completed').length
  const pct = Math.round((completedCount / path.steps.length) * 100)

  function handleToggle(stepId: string) {
    toggleStepComplete(path.id, stepId)
    setStatuses(prev => ({
      ...prev,
      [stepId]: prev[stepId] === 'completed' ? 'not_started' : 'completed',
    }))
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Back link */}
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          fontSize: 13,
          fontWeight: 500,
          color: "var(--color-primary)",
          textDecoration: "none",
        }}
      >
        <ChevronLeft size={14} strokeWidth={2.5} />
        Learning Paths
      </Link>

      {/* Header */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: `color-mix(in srgb, ${colorVar} 12%, white)`,
              border: `1px solid color-mix(in srgb, ${colorVar} 20%, transparent)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <path.Icon size={20} strokeWidth={1.75} style={{ color: colorVar }} />
          </div>
          <div>
            <h1 style={{ fontWeight: 700, fontSize: 24, color: "var(--color-text-primary)", lineHeight: 1.2 }}>
              {path.title}
            </h1>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 2 }}>{path.tagline}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span className="section-label">Progress</span>
            <span className="font-mono-stat" style={{ fontSize: 12, color: colorVar }}>{pct}%</span>
          </div>
          <div style={{ height: 6, background: "var(--color-border)", borderRadius: 999 }}>
            <div
              style={{
                height: 6,
                background: colorVar,
                borderRadius: 999,
                width: `${pct}%`,
                transition: "width 0.4s ease",
              }}
            />
          </div>
          <p style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 6 }}>
            {completedCount} of {path.steps.length} steps complete
          </p>
        </div>
      </div>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {path.steps.map((step, i) => {
          const status = statuses[step.id] ?? 'not_started'
          const isDone = status === 'completed'
          const isComplete = step.id === 'complete'

          return (
            <div
              key={step.id}
              className="card"
              style={{
                borderLeft: `3px solid ${isDone ? colorVar : "var(--color-border)"}`,
                padding: "16px 20px",
                opacity: step.placeholder && !isComplete ? 0.6 : 1,
              }}
            >
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>

                {/* Step number / check */}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isDone
                      ? `color-mix(in srgb, ${colorVar} 12%, white)`
                      : "var(--color-bg)",
                    border: `1.5px solid ${isDone ? colorVar : "var(--color-border)"}`,
                  }}
                >
                  {isDone
                    ? <CheckCircle2 size={14} strokeWidth={2.5} style={{ color: colorVar }} />
                    : <span className="font-mono-stat" style={{ fontSize: 10, color: "var(--color-text-muted)" }}>{STEP_ICONS[step.id]}</span>
                  }
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 13, color: "var(--color-text-primary)" }}>
                      {step.label}
                    </span>
                    {step.placeholder && (
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: "var(--color-text-muted)",
                          background: "var(--color-bg)",
                          border: "1px solid var(--color-border)",
                          borderRadius: 999,
                          padding: "1px 7px",
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                        }}
                      >
                        Phase 2
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.55 }}>
                    {step.description}
                  </p>

                  {/* Action row */}
                  <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                    {/* Navigation link */}
                    {step.href && !isComplete && (
                      <Link
                        href={step.href}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          fontSize: 12,
                          fontWeight: 600,
                          color: colorVar,
                          background: `color-mix(in srgb, ${colorVar} 8%, white)`,
                          border: `1px solid color-mix(in srgb, ${colorVar} 20%, transparent)`,
                          borderRadius: 8,
                          padding: "6px 12px",
                          textDecoration: "none",
                        }}
                      >
                        Go
                        <ChevronRight size={13} strokeWidth={2.5} />
                      </Link>
                    )}

                    {/* Placeholder link */}
                    {step.placeholder && !step.href && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          fontSize: 12,
                          fontWeight: 500,
                          color: "var(--color-text-muted)",
                          background: "var(--color-bg)",
                          border: "1px solid var(--color-border)",
                          borderRadius: 8,
                          padding: "6px 12px",
                        }}
                      >
                        <Clock size={12} strokeWidth={2} />
                        Coming soon
                      </span>
                    )}

                    {/* Mark complete toggle */}
                    {isComplete && (
                      <button
                        onClick={() => handleToggle(step.id)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 12,
                          fontWeight: 600,
                          color: isDone ? colorVar : "var(--color-text-secondary)",
                          background: isDone
                            ? `color-mix(in srgb, ${colorVar} 8%, white)`
                            : "var(--color-bg)",
                          border: `1px solid ${isDone ? `color-mix(in srgb, ${colorVar} 25%, transparent)` : "var(--color-border)"}`,
                          borderRadius: 8,
                          padding: "6px 12px",
                          cursor: "pointer",
                          transition: "all 0.15s",
                        }}
                      >
                        <CheckCircle2 size={13} strokeWidth={2.5} />
                        {isDone ? "Completed" : "Mark as complete"}
                      </button>
                    )}

                    {/* External link hint for non-complete href steps */}
                    {step.href && !isComplete && (
                      <button
                        onClick={() => handleToggle(step.id)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          fontSize: 12,
                          fontWeight: 500,
                          color: isDone ? colorVar : "var(--color-text-muted)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "6px 0",
                        }}
                      >
                        <CheckCircle2 size={13} strokeWidth={isDone ? 2.5 : 1.8} />
                        {isDone ? "Done" : "Done"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
