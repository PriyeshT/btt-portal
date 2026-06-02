"use client"

import { useState } from "react"
import Image from "next/image"
import { MARKINGS, MARKING_SECTIONS, getMarkingsBySection, type Marking } from "@/data/markings"

export default function MarkingsPage() {
  const [activeSection, setActiveSection] = useState<Marking['section']>('across')
  const [expanded, setExpanded] = useState<string | null>(null)

  const markings = getMarkingsBySection(activeSection)
  const section = MARKING_SECTIONS.find(s => s.id === activeSection)

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Road Markings</h1>
        <p className="text-sm text-gray-500 mt-1">
          {MARKINGS.length} markings from the Official Handbook
        </p>
      </div>

      {/* Section tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        {MARKING_SECTIONS.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id as Marking['section'])}
            className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeSection === sec.id
                ? 'bg-amber-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-300'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {section && (
        <p className="text-xs text-gray-500">{section.description}</p>
      )}

      {/* Markings list */}
      <div className="space-y-3">
        {markings.map((marking) => (
          <button
            key={marking.id}
            onClick={() => setExpanded(expanded === marking.id ? null : marking.id)}
            className="w-full text-left bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-amber-300 transition-colors"
          >
            <div className="flex gap-3 p-3">
              <div className="w-24 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src={marking.image}
                  alt={marking.name}
                  width={96}
                  height={80}
                  className="object-contain max-w-full max-h-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{marking.name}</p>
                {marking.key && (
                  <span className="inline-block mt-1 text-xs bg-amber-100 text-amber-800 rounded px-2 py-0.5">
                    {marking.key}
                  </span>
                )}
              </div>
              <span className="text-gray-400 text-sm self-start">
                {expanded === marking.id ? '▲' : '▼'}
              </span>
            </div>
            {expanded === marking.id && (
              <div className="px-3 pb-3 pt-0 border-t border-gray-100">
                <p className="text-sm text-gray-600">{marking.description}</p>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
