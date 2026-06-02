"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, AlertTriangle } from "lucide-react"
import { RULES, RULE_SECTIONS, getRulesBySection } from "@/data/rules"

const SECTION_COLOR: Record<string, string> = {
  'Lane Rules':           'var(--color-mandatory)',
  'Speed':                'var(--color-prohibitory)',
  'Junctions & Turns':    'var(--color-warning)',
  'Expressways':          'var(--color-emas)',
  'Parking & Stopping':   'var(--color-regulatory)',
  'Signals & Lights':     'var(--color-pedal-cycle)',
  'Road Users':           'var(--color-information)',
  'Safety':               'var(--color-facility)',
  'Vehicle Requirements': 'var(--color-tunnel)',
  'Special Zones':        'var(--color-pedestrian)',
}

export default function RulesPage() {
  const [activeSection, setActiveSection] = useState(RULE_SECTIONS[0])
  const [expanded, setExpanded] = useState<string | null>(null)

  const rules = getRulesBySection(activeSection)
  const accentColor = SECTION_COLOR[activeSection] ?? 'var(--color-primary)'

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      <div>
        <h1 style={{ fontWeight: 700, fontSize: 28, color: "var(--color-text-primary)" }}>Traffic Rules</h1>
        <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginTop: 4 }}>
          {RULES.length} rules from Part B of the Official Handbook
        </p>
      </div>

      {/* Section tabs */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }}>
        {RULE_SECTIONS.map((sec) => (
          <button
            key={sec}
            onClick={() => { setActiveSection(sec); setExpanded(null) }}
            className={`tab-btn${activeSection === sec ? ' active' : ''}`}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Rules list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="card"
            style={{ overflow: "hidden", borderLeft: `3px solid ${accentColor}` }}
          >
            <button
              onClick={() => setExpanded(expanded === rule.id ? null : rule.id)}
              style={{
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <span style={{ fontWeight: 600, fontSize: 14, color: "var(--color-text-primary)" }}>
                {rule.title}
              </span>
              <span style={{ color: "var(--color-text-muted)", flexShrink: 0 }}>
                {expanded === rule.id
                  ? <ChevronUp size={16} strokeWidth={2} />
                  : <ChevronDown size={16} strokeWidth={2} />
                }
              </span>
            </button>

            {expanded === rule.id && (
              <div
                style={{
                  padding: "0 16px 16px",
                  borderTop: "1px solid var(--color-border)",
                  paddingTop: 12,
                }}
              >
                <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {rule.points.map((point, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.55 }}>
                      <span style={{ color: accentColor, flexShrink: 0, marginTop: 2, fontSize: 16, lineHeight: 1 }}>·</span>
                      {point}
                    </li>
                  ))}
                </ul>

                {rule.note && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      marginTop: 12,
                      padding: "10px 12px",
                      background: "color-mix(in srgb, var(--color-warning) 8%, transparent)",
                      border: "1px solid color-mix(in srgb, var(--color-warning) 20%, transparent)",
                      borderRadius: 8,
                    }}
                  >
                    <AlertTriangle size={14} strokeWidth={2} style={{ color: "var(--color-warning)", flexShrink: 0, marginTop: 1 }} />
                    <p style={{ fontSize: 12, color: "var(--color-warning)", lineHeight: 1.5 }}>{rule.note}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  )
}
