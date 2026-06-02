import type { Metadata } from "next"
import Link from "next/link"
import NavBar from "./NavBar"
import "./globals.css"

export const metadata: Metadata = {
  title: "BTT Study Portal",
  description: "Singapore Basic Theory Test study portal",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col" style={{ background: "var(--color-bg)" }}>

        {/* Top header */}
        <header style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }} className="sticky top-0 z-50">
          <div className="mx-auto px-6 py-3 flex items-center justify-between" style={{ maxWidth: 1100 }}>
            <Link href="/" className="flex items-center gap-1.5 text-lg tracking-tight" style={{ fontWeight: 700 }}>
              <span style={{ color: "var(--color-primary)" }}>BTT</span>
              <span style={{ color: "var(--color-text-primary)" }}>Study Portal</span>
            </Link>
            <NavBar />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 w-full mx-auto px-6 py-6 pb-28" style={{ maxWidth: 1100 }}>
          {children}
        </main>

        {/* Footer */}
        <footer className="pb-20 sm:pb-4 text-center" style={{ color: "var(--color-text-muted)", fontSize: 11 }}>
          Content sourced from the Singapore Traffic Police Official Handbook
        </footer>

      </body>
    </html>
  )
}
