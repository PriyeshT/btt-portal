import Link from "next/link"
import { TrafficCone, Layers, Map, BookOpen, ChevronRight, FileText, Clock, CheckCircle2, XCircle } from "lucide-react"
import { CATEGORIES, SIGNS } from "@/data/signs"
import { MARKINGS } from "@/data/markings"
import { RULES } from "@/data/rules"

export default function Home() {
  const totalSigns = SIGNS.length
  const totalMarkings = MARKINGS.length
  const totalRules = RULES.length

  const quickLinks = [
    {
      href: "/signs",
      label: "Browse All Signs",
      desc: `${totalSigns} signs across ${CATEGORIES.length} categories`,
      accentVar: "--color-primary",
      Icon: TrafficCone,
    },
    {
      href: "/flashcards",
      label: "Flashcard Drill",
      desc: "Practise sign recognition",
      accentVar: "--color-mandatory",
      Icon: Layers,
    },
    {
      href: "/markings",
      label: "Road Markings",
      desc: `${totalMarkings} road markings explained`,
      accentVar: "--color-warning",
      Icon: Map,
    },
    {
      href: "/rules",
      label: "Traffic Rules",
      desc: `${totalRules} rules organised by topic`,
      accentVar: "--color-pedal-cycle",
      Icon: BookOpen,
    },
  ]

  return (
    <div className="space-y-10">

      {/* ── Hero ── */}
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
          fontFamily: "DM Sans, sans-serif",
          fontWeight: 700,
          fontSize: 40,
          color: "var(--color-text-primary)",
          lineHeight: 1.1,
          marginBottom: 6,
        }}>
          BTT Study Portal
        </h1>
        <p style={{
          color: "var(--color-text-secondary)",
          fontSize: 16,
          marginBottom: 28,
        }}>
          Official Handbook Study Guide
        </p>

        {/* Stat row */}
        <div className="flex items-center gap-0" style={{ flexWrap: "wrap" }}>
          {[
            { value: totalSigns, label: "Signs" },
            { value: totalMarkings, label: "Markings" },
            { value: totalRules, label: "Rules" },
            { value: 50, label: "BTT Questions" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              {i > 0 && (
                <div style={{
                  width: 1,
                  height: 36,
                  background: "var(--color-border)",
                  margin: "0 20px",
                }} />
              )}
              <div>
                <div className="font-mono-stat" style={{
                  fontSize: 32,
                  color: "var(--color-text-primary)",
                  lineHeight: 1,
                }}>
                  {stat.value}
                </div>
                <div style={{
                  color: "var(--color-text-muted)",
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginTop: 3,
                }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Study Mode Cards ── */}
      <section>
        <h2 style={{
          fontSize: 11,
          fontWeight: 600,
          color: "var(--color-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 12,
        }}>
          Study Modes
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {quickLinks.map((link) => {
            const { href, label, desc, accentVar, Icon } = link
            return (
              <Link
                key={href}
                href={href}
                className="card study-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  textDecoration: "none",
                  "--accent": `var(${accentVar})`,
                } as React.CSSProperties}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={22}
                    strokeWidth={1.75}
                    style={{ color: `var(${accentVar})`, flexShrink: 0 }}
                  />
                  <div>
                    <div style={{
                      fontWeight: 600,
                      fontSize: 14,
                      color: "var(--color-text-primary)",
                    }}>
                      {label}
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: "var(--color-text-secondary)",
                      marginTop: 2,
                    }}>
                      {desc}
                    </div>
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  strokeWidth={2}
                  style={{ color: "var(--color-text-muted)", flexShrink: 0 }}
                />
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── Sign Categories ── */}
      <section>
        <h2 style={{
          fontSize: 11,
          fontWeight: 600,
          color: "var(--color-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 12,
        }}>
          Sign Categories
        </h2>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => {
            const colorVar = `var(--color-${cat.id})`
            return (
              <Link
                key={cat.id}
                href={`/signs/${cat.id}`}
                className="category-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "var(--color-surface)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  border: "1px solid var(--color-border)",
                  borderLeft: `4px solid ${colorVar}`,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  textDecoration: "none",
                }}
              >
                <div>
                  <div style={{
                    fontWeight: 600,
                    fontSize: 16,
                    color: colorVar,
                    lineHeight: 1.2,
                  }}>
                    {cat.name}
                  </div>
                  <div style={{
                    fontSize: 13,
                    color: "var(--color-text-secondary)",
                    marginTop: 2,
                  }}>
                    {cat.subtitle}
                  </div>
                </div>
                <div
                  className="font-mono-stat"
                  style={{
                    fontSize: 13,
                    color: colorVar,
                    background: `color-mix(in srgb, ${colorVar} 12%, transparent)`,
                    padding: "3px 10px",
                    borderRadius: 999,
                  }}
                >
                  {cat.count}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── Exam Facts ── */}
      <section className="card" style={{ padding: 20 }}>
        <h2 style={{
          fontWeight: 600,
          fontSize: 15,
          color: "var(--color-text-primary)",
          marginBottom: 12,
        }}>
          BTT Exam Facts
        </h2>
        <ul className="space-y-2.5" style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>
          {[
            { Icon: FileText, text: <><strong>50 questions</strong> — multiple choice</> },
            { Icon: Clock,    text: <><strong>45 minutes</strong> to complete</> },
            { Icon: CheckCircle2, text: <>Pass mark: <strong>45/50 correct</strong> (90%)</>, color: "var(--color-pedal-cycle)" },
            { Icon: XCircle,  text: <>Fail if more than <strong>10 wrong</strong></>, color: "var(--color-prohibitory)" },
            { Icon: BookOpen, text: <>Based on <strong>Part B</strong> of the Official Handbook</> },
          ].map(({ Icon, text, color }, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Icon size={15} strokeWidth={1.8} style={{ color: color ?? "var(--color-text-muted)", flexShrink: 0, marginTop: 2 }} />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
