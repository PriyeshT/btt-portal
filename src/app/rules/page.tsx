"use client"

import { useState } from "react"
import { RULES, RULE_SECTIONS, getRulesBySection } from "@/data/rules"

export default function RulesPage() {
  const [activeSection, setActiveSection] = useState(RULE_SECTIONS[0])
  const [expanded, setExpanded] = useState<string | null>(null)

  const rules = getRulesBySection(activeSection)

  const sectionColors: Record<string, string> = {
    'Lane Rules': 'bg-blue-700',
    'Speed': 'bg-red-700',
    'Junctions & Turns': 'bg-orange-600',
    'Expressways': 'bg-purple-700',
    'Parking & Stopping': 'bg-yellow-600',
    'Signals & Lights': 'bg-green-700',
    'Road Users': 'bg-teal-700',
    'Safety': 'bg-rose-700',
    'Vehicle Requirements': 'bg-slate-700',
    'Special Zones': 'bg-indigo-700',
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Traffic Rules</h1>
        <p className="text-sm text-gray-500 mt-1">
          {RULES.length} rules from Part B of the Official Handbook
        </p>
      </div>

      {/* Section selector */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        {RULE_SECTIONS.map((sec) => {
          const active = sec === activeSection
          const color = sectionColors[sec] || 'bg-gray-700'
          return (
            <button
              key={sec}
              onClick={() => { setActiveSection(sec); setExpanded(null) }}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                active ? `${color} text-white` : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
              }`}
            >
              {sec}
            </button>
          )
        })}
      </div>

      {/* Rules list */}
      <div className="space-y-2">
        {rules.map((rule) => (
          <button
            key={rule.id}
            onClick={() => setExpanded(expanded === rule.id ? null : rule.id)}
            className="w-full text-left bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm font-semibold text-gray-800">{rule.title}</span>
              <span className="text-gray-400 text-sm ml-2 flex-shrink-0">
                {expanded === rule.id ? '▲' : '▼'}
              </span>
            </div>
            {expanded === rule.id && (
              <div className="px-4 pb-4 border-t border-gray-100 space-y-2">
                <ul className="mt-2 space-y-1.5">
                  {rule.points.map((point, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-600">
                      <span className="text-red-600 mt-0.5 flex-shrink-0">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                {rule.note && (
                  <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    <p className="text-xs text-amber-800">⚠ {rule.note}</p>
                  </div>
                )}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
