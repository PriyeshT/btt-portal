"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp } from "lucide-react"
import { MARKINGS, MARKING_SECTIONS, getMarkingsBySection, type Marking } from "@/data/markings"

export default function MarkingsPage() {
  const [activeSection, setActiveSection] = useState<Marking['section']>('across')
  const [expanded, setExpanded] = useState<string | null>(null)

  const markings = getMarkingsBySection(activeSection)
  const section = MARKING_SECTIONS.find(s => s.id === activeSection)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      <div>
        <h1 style={{ fontWeight: 700, fontSize: 28, color: "var(--color-text-primary)" }}>Road Markings</h1>
        <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginTop: 4 }}>
          {MARKINGS.length} markings from the Official Handbook
        </p>
      </div>

      {/* Section tabs */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }}>
        {MARKING_SECTIONS.map((sec) => (
          <button
            key={sec.id}
            onClick={() => { setActiveSection(sec.id as Marking['section']); setExpanded(null) }}
            className={`tab-btn${activeSection === sec.id ? ' active' : ''}`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {section && (
        <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: -8 }}>{section.description}</p>
      )}

      {/* Markings list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {markings.map((marking) => (
          <div key={marking.id} className="card" style={{ overflow: "hidden" }}>
            <button
              onClick={() => setExpanded(expanded === marking.id ? null : marking.id)}
              style={{
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 16,
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: 96,
                  height: 80,
                  flexShrink: 0,
                  background: "var(--color-bg)",
                  borderRadius: 8,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--color-border)",
                }}
              >
                <Image
                  src={marking.image}
                  alt={marking.name}
                  width={88}
                  height={72}
                  className="object-contain max-w-full max-h-full"
                />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, fontSize: 14, color: "var(--color-text-primary)" }}>
                  {marking.name}
                </p>
                {marking.key && (
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: 6,
                      fontSize: 11,
                      fontWeight: 500,
                      color: "var(--color-text-secondary)",
                      background: "var(--color-bg)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 999,
                      padding: "2px 10px",
                    }}
                  >
                    {marking.key}
                  </span>
                )}
              </div>

              <div style={{ color: "var(--color-text-muted)", flexShrink: 0 }}>
                {expanded === marking.id
                  ? <ChevronUp size={16} strokeWidth={2} />
                  : <ChevronDown size={16} strokeWidth={2} />
                }
              </div>
            </button>

            {expanded === marking.id && (
              <div
                style={{
                  padding: "0 16px 16px",
                  borderTop: "1px solid var(--color-border)",
                  paddingTop: 12,
                }}
              >
                <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                  {marking.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  )
}
