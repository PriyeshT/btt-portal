import Link from "next/link"
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
      color: "bg-blue-700",
      icon: "🚦",
    },
    {
      href: "/flashcards",
      label: "Flashcard Drill",
      desc: "Practise sign recognition",
      color: "bg-red-700",
      icon: "🃏",
    },
    {
      href: "/markings",
      label: "Road Markings",
      desc: `${totalMarkings} road markings explained`,
      color: "bg-amber-600",
      icon: "🛣️",
    },
    {
      href: "/rules",
      label: "Traffic Rules",
      desc: `${totalRules} rules organised by topic`,
      color: "bg-green-700",
      icon: "📋",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-red-700 text-white rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-1">BTT Study Portal</h1>
        <p className="text-red-200 text-sm">
          Singapore Basic Theory Test — Official Handbook Study Guide
        </p>
        <div className="mt-4 flex gap-3 text-sm flex-wrap">
          {[
            { value: totalSigns, label: "Signs" },
            { value: totalMarkings, label: "Markings" },
            { value: totalRules, label: "Rules" },
            { value: 50, label: "BTT Qs" },
          ].map((stat) => (
            <div key={stat.label} className="bg-red-600 rounded-lg px-3 py-2 text-center min-w-[60px]">
              <div className="font-bold text-xl">{stat.value}</div>
              <div className="text-red-200 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <section>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Study Modes
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${link.color} text-white rounded-xl p-4 block hover:opacity-90 transition-opacity`}
            >
              <div className="text-2xl mb-2">{link.icon}</div>
              <div className="font-semibold text-sm">{link.label}</div>
              <div className="text-xs opacity-80 mt-0.5">{link.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Sign Categories
        </h2>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/signs/${cat.id}`}
              className={`flex items-center justify-between ${cat.bg} ${cat.border} border rounded-xl px-4 py-3 hover:opacity-80 transition-opacity`}
            >
              <div>
                <div className={`font-semibold text-sm ${cat.color}`}>{cat.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{cat.subtitle}</div>
              </div>
              <div className={`text-sm font-bold ${cat.color}`}>{cat.count}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-xl p-4">
        <h2 className="font-semibold text-gray-800 mb-3">BTT Exam Facts</h2>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex gap-2"><span>📝</span><span><strong>50 questions</strong> — multiple choice</span></li>
          <li className="flex gap-2"><span>⏱️</span><span><strong>45 minutes</strong> to complete</span></li>
          <li className="flex gap-2"><span>✅</span><span>Pass mark: <strong>45/50 correct</strong> (90%)</span></li>
          <li className="flex gap-2"><span>❌</span><span>Fail if more than <strong>10 wrong</strong></span></li>
          <li className="flex gap-2"><span>📖</span><span>Based on <strong>Part B</strong> of the Official Handbook</span></li>
        </ul>
      </section>
    </div>
  )
}
