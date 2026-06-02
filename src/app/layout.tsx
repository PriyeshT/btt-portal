import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"

export const metadata: Metadata = {
  title: "BTT Study Portal",
  description: "Singapore Basic Theory Test study portal",
}

const NAV = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/signs", label: "Signs", icon: "🚦" },
  { href: "/flashcards", label: "Flashcards", icon: "🃏" },
  { href: "/markings", label: "Markings", icon: "🛣️" },
  { href: "/rules", label: "Rules", icon: "📋" },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-gray-50">
        {/* Top header */}
        <header className="bg-red-700 text-white sticky top-0 z-50 shadow-md">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg tracking-tight">
              BTT Study Portal
            </Link>
            <span className="text-red-200 text-sm hidden sm:block">Singapore Traffic Police</span>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 pb-24">
          {children}
        </main>

        {/* Bottom nav */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          <div className="max-w-4xl mx-auto grid grid-cols-5">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center py-2 px-1 text-gray-600 hover:text-red-700 transition-colors"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs mt-0.5">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </body>
    </html>
  )
}
