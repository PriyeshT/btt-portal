import Link from "next/link"
import Image from "next/image"
import { CATEGORIES, getSignsByCategory } from "@/data/signs"

export default function SignsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      <div>
        <h1 style={{ fontWeight: 700, fontSize: 28, color: "var(--color-text-primary)" }}>
          Signs &amp; Signals
        </h1>
        <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginTop: 4 }}>
          All sign categories from Part B of the Official Handbook
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {CATEGORIES.map((cat) => {
          const signs = getSignsByCategory(cat.id)
          const preview = signs.slice(0, 4)
          const colorVar = `var(--color-${cat.id})`
          return (
            <Link
              key={cat.id}
              href={`/signs/${cat.id}`}
              className="category-row"
              style={{
                display: "block",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderLeft: `4px solid ${colorVar}`,
                borderRadius: 12,
                padding: "16px 20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                textDecoration: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: colorVar }}>{cat.name}</div>
                  <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 2 }}>{cat.rule}</div>
                </div>
                <span
                  className="font-mono-stat"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: colorVar,
                    background: `color-mix(in srgb, ${colorVar} 10%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${colorVar} 20%, transparent)`,
                    borderRadius: 999,
                    padding: "2px 10px",
                    flexShrink: 0,
                    marginLeft: 12,
                  }}
                >
                  {signs.length}
                </span>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                {preview.map((sign) => (
                  <div
                    key={sign.id}
                    style={{
                      width: 48,
                      height: 48,
                      background: "var(--color-bg)",
                      borderRadius: 8,
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <Image src={sign.image} alt={sign.name} width={40} height={40} className="object-contain" />
                  </div>
                ))}
                {signs.length > 4 && (
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background: "var(--color-bg)",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid var(--color-border)",
                      fontSize: 12,
                      fontWeight: 600,
                      color: colorVar,
                    }}
                  >
                    +{signs.length - 4}
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </div>

    </div>
  )
}
