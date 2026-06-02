import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, AlertTriangle } from "lucide-react"
import { getCategory, getSignsByCategory, CATEGORIES } from "@/data/signs"

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.id }))
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const cat = getCategory(category)
  if (!cat) notFound()

  const signs = getSignsByCategory(category)
  const colorVar = `var(--color-${cat.id})`

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Header */}
      <div>
        <Link
          href="/signs"
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
          Signs
        </Link>

        <h1 style={{ fontWeight: 700, fontSize: 28, color: colorVar, marginTop: 8, marginBottom: 6 }}>
          {cat.name}
        </h1>

        <span
          style={{
            display: "inline-block",
            fontSize: 12,
            fontWeight: 500,
            color: colorVar,
            background: `color-mix(in srgb, ${colorVar} 10%, transparent)`,
            border: `1px solid color-mix(in srgb, ${colorVar} 20%, transparent)`,
            borderRadius: 999,
            padding: "3px 10px",
            marginBottom: 8,
          }}
        >
          {cat.subtitle}
        </span>

        <p style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{cat.rule}</p>
      </div>

      {/* Signs grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3" style={{ gap: 16 }}>
        {signs.map((sign) => (
          <div
            key={sign.id}
            className="card"
            style={{
              padding: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              borderLeft: `3px solid ${colorVar}`,
            }}
          >
            <div style={{ width: 96, height: 96, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Image
                src={sign.image}
                alt={sign.name}
                width={96}
                height={96}
                className="object-contain max-w-full max-h-full"
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.35 }}>
                {sign.name}
              </p>
              <p style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 4, lineHeight: 1.45 }}>
                {sign.description}
              </p>
              {sign.note && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 5,
                    marginTop: 8,
                    background: "color-mix(in srgb, var(--color-warning) 8%, transparent)",
                    border: "1px solid color-mix(in srgb, var(--color-warning) 20%, transparent)",
                    borderRadius: 6,
                    padding: "6px 8px",
                    textAlign: "left",
                  }}
                >
                  <AlertTriangle size={12} strokeWidth={2} style={{ color: "var(--color-warning)", flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontSize: 11, color: "var(--color-warning)", lineHeight: 1.4 }}>{sign.note}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
