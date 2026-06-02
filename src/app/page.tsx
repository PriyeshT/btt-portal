"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, FileText, Clock, CheckCircle2, XCircle, BookOpen, Layers, TrafficCone, AlignLeft, Map } from "lucide-react"
import { LEARNING_PATHS, getPath } from "@/data/paths"
import { getLastActivePath, getPathCompletion } from "@/lib/progress"
import { SIGNS, CATEGORIES } from "@/data/signs"
import { MARKINGS } from "@/data/markings"
import { RULES } from "@/data/rules"

export default function Home() {
  const [lastPathId, setLastPathId] = useState<string | null>(null)
  const [pathProgress, setPathProgress] = useState<Record<string, number>>({})

  useEffect(() => {
    const last = getLastActivePath() ?? "start-here"
    setLastPathId(last)

    const progress: Record<string, number> = {}
    LEARNING_PATHS.forEach(p => {
      progress[p.id] = getPathCompletion(p.id, p.steps.length)
    })
    setPathProgress(progress)
  }, [])

  const continuePath = lastPathId ? (getPath(lastPathId) ?? getPath("start-here")) : getPath("start-here")
  const continuePct = continuePath ? (pathProgress[continuePath.id] ?? 0) : 0

  const totalSigns = SIGNS.length
  const totalMarkings = MARKINGS.length
  const totalRules = RULES.length

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

      {/* Hero */}
      <div className="pt-2">
        <p style={{
          color: "var(--color-text-muted)",
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontWeight: 500,
          marginBottom: 10,
        }}>
          Singapore Traffic Police · Basic Theory Test
        </p>
        <h1 style={{
          fontWeight: 700,
          fontSize: 40,
          color: "var(--color-text-primary)",
          lineHeight: 1.1,
          marginBottom: 6,
        }}>
          BTT Study Portal
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: 16, marginBottom: 24 }}>
          Official Handbook Study Guide
        </p>

        {/* Stat row */}
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          {[
            { value: totalSigns, label: "Signs" },
            { value: totalMarkings, label: "Markings" },
            { value: totalRules, label: "Rules" },
            { value: 50, label: "BTT Questions" },
          ].map((stat, i) => (
            <div key={stat.label} style={{ display: "flex", alignItems: "center" }}>
              {i > 0 && <div style={{ width: 1, height: 36, background: "var(--color-border)", margin: "0 20px" }} />}
              <div>
                <div className="font-mono-stat" style={{ fontSize: 32, color: "var(--color-text-primary)", lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ color: "var(--color-text-muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 3 }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Learning */}
      {continuePath && (
        <section>
          <p className="section-label" style={{ marginBottom: 10 }}>Continue Learning</p>
          <Link
            href={`/learn/${continuePath.id}`}
            className="card"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "16px 20px",
              textDecoration: "none",
              border: `1px solid color-mix(in srgb, var(${continuePath.colorVar}) 20%, var(--color-border))`,
            }}
          >
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: `color-mix(in srgb, var(${continuePath.colorVar}) 12%, white)`,
              border: `1px solid color-mix(in srgb, var(${continuePath.colorVar}) 20%, transparent)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <continuePath.Icon size={22} strokeWidth={1.75} style={{ color: `var(${continuePath.colorVar})` }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: "var(--color-text-primary)", marginBottom: 6 }}>
                {continuePath.title}
              </div>
              <div style={{ height: 4, background: "var(--color-border)", borderRadius: 999, marginBottom: 4 }}>
                <div style={{
                  height: 4,
                  background: `var(${continuePath.colorVar})`,
                  borderRadius: 999,
                  width: `${continuePct}%`,
                  transition: "width 0.4s ease",
                }} />
              </div>
              <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{continuePct}% complete</div>
            </div>
            <ChevronRight size={18} strokeWidth={2} style={{ color: `var(${continuePath.colorVar})`, flexShrink: 0 }} />
          </Link>
        </section>
      )}

      {/* Learning Paths */}
      <section>
        <p className="section-label" style={{ marginBottom: 10 }}>Learning Paths</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {LEARNING_PATHS.map(path => {
            const pct = pathProgress[path.id] ?? 0
            const colorVar = `var(${path.colorVar})`
            return (
              <Link
                key={path.id}
                href={`/learn/${path.id}`}
                className="card study-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  padding: "14px 16px",
                  textDecoration: "none",
                  "--accent": colorVar,
                } as React.CSSProperties}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                  <div style={{
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    background: `color-mix(in srgb, ${colorVar} 12%, white)`,
                    border: `1px solid color-mix(in srgb, ${colorVar} 20%, transparent)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <path.Icon size={17} strokeWidth={1.75} style={{ color: colorVar }} />
                  </div>
                  <ChevronRight size={14} strokeWidth={2} style={{ color: "var(--color-text-muted)", marginTop: 2, flexShrink: 0 }} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "var(--color-text-primary)", marginBottom: 2 }}>
                    {path.title}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.4 }}>
                    {path.tagline}
                  </div>
                </div>
                <div>
                  <div style={{ height: 3, background: "var(--color-border)", borderRadius: 999, marginBottom: 4 }}>
                    <div style={{
                      height: 3,
                      background: colorVar,
                      borderRadius: 999,
                      width: `${pct}%`,
                      transition: "width 0.4s ease",
                    }} />
                  </div>
                  <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>{pct}% complete</div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <p className="section-label" style={{ marginBottom: 10 }}>Quick Actions</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { href: "/flashcards", label: "Flashcard Drill", Icon: Layers, colorVar: "--color-mandatory" },
            { href: "/signs", label: "Browse Signs", Icon: TrafficCone, colorVar: "--color-primary" },
            { href: "/markings", label: "Road Markings", Icon: Map, colorVar: "--color-warning" },
            { href: "/rules", label: "Traffic Rules", Icon: AlignLeft, colorVar: "--color-pedal-cycle" },
          ].map(({ href, label, Icon, colorVar }) => (
            <Link
              key={href}
              href={href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 500,
                color: `var(${colorVar})`,
                background: `color-mix(in srgb, var(${colorVar}) 8%, white)`,
                border: `1px solid color-mix(in srgb, var(${colorVar}) 20%, transparent)`,
                borderRadius: 20,
                padding: "8px 14px",
                textDecoration: "none",
              }}
            >
              <Icon size={14} strokeWidth={2} />
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* Exam Facts */}
      <section className="card" id="exam-facts" style={{ padding: 20 }}>
        <h2 style={{ fontWeight: 600, fontSize: 15, color: "var(--color-text-primary)", marginBottom: 12 }}>
          BTT Exam Facts
        </h2>
        <ul style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14, color: "var(--color-text-secondary)" }}>
          {[
            { Icon: FileText, text: <><strong>50 questions</strong> — multiple choice</> },
            { Icon: Clock, text: <><strong>45 minutes</strong> to complete</> },
            { Icon: CheckCircle2, text: <>Pass mark: <strong>45/50 correct</strong> (90%)</>, color: "var(--color-pedal-cycle)" },
            { Icon: XCircle, text: <>Fail if more than <strong>10 wrong</strong></>, color: "var(--color-prohibitory)" },
            { Icon: BookOpen, text: <>Based on <strong>Part B</strong> of the Official Handbook</> },
          ].map(({ Icon, text, color }, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <Icon size={15} strokeWidth={1.8} style={{ color: color ?? "var(--color-text-muted)", flexShrink: 0, marginTop: 2 }} />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </section>

    </div>
  )
}
