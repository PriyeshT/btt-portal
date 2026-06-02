"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, TrafficCone, Layers, BookOpen, AlignLeft } from "lucide-react"

const NAV = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/signs", label: "Signs", Icon: TrafficCone },
  { href: "/flashcards", label: "Flashcards", Icon: Layers },
  { href: "/markings", label: "Markings", Icon: BookOpen },
  { href: "/rules", label: "Rules", Icon: AlignLeft },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop inline nav */}
      <nav className="hidden sm:flex items-center gap-6">
        {NAV.slice(1).map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-sm transition-colors"
            style={{
              color: pathname === href ? "var(--color-primary)" : "var(--color-text-secondary)",
              fontWeight: pathname === href ? 600 : 400,
            }}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 sm:hidden" style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
        <div className="grid grid-cols-5">
          {NAV.map(({ href, label, Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center py-2 px-1 transition-colors"
                style={{ color: active ? "var(--color-primary)" : "var(--color-text-muted)" }}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
                <span className="text-xs mt-0.5" style={{ fontWeight: active ? 600 : 400 }}>{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
