"use client"

import { useState, useCallback, useEffect, useMemo } from "react"
import Image from "next/image"
import { CheckCircle2, XCircle, Circle, Trophy, ThumbsUp, BookOpen, AlertTriangle, ChevronRight } from "lucide-react"
import { getAllFlashcardSigns, CATEGORIES, type Sign } from "@/data/signs"

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getOptions(correct: Sign, allSigns: Sign[]): Sign[] {
  const sameCat = allSigns.filter(s => s.id !== correct.id && s.category === correct.category)
  const otherCat = allSigns.filter(s => s.id !== correct.id && s.category !== correct.category)
  const pool = [...shuffle(sameCat), ...shuffle(otherCat)]
  return shuffle([correct, ...pool.slice(0, 3)])
}

type AnswerState = 'unanswered' | 'correct' | 'wrong'

export default function FlashcardsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [deck, setDeck] = useState<Sign[]>([])
  const [index, setIndex] = useState(0)
  const [options, setOptions] = useState<Sign[]>([])
  const [answer, setAnswer] = useState<AnswerState>('unanswered')
  const [chosen, setChosen] = useState<string | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [started, setStarted] = useState(false)

  const allSigns = useMemo(() => getAllFlashcardSigns(), [])

  const buildDeck = useCallback((catId: string) => {
    const filtered = catId === 'all' ? allSigns : allSigns.filter(s => s.category === catId)
    return shuffle(filtered)
  }, [allSigns])

  const startSession = useCallback((catId: string) => {
    const d = buildDeck(catId)
    setDeck(d)
    setIndex(0)
    setScore({ correct: 0, total: 0 })
    setAnswer('unanswered')
    setChosen(null)
    setStarted(true)
  }, [buildDeck])

  useEffect(() => {
    if (deck.length > 0 && index < deck.length) {
      setOptions(getOptions(deck[index], allSigns))
    }
  }, [deck, index, allSigns])

  const handleAnswer = (signId: string) => {
    if (answer !== 'unanswered') return
    const correct = deck[index].id === signId
    setChosen(signId)
    setAnswer(correct ? 'correct' : 'wrong')
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))
  }

  const next = () => {
    setAnswer('unanswered')
    setChosen(null)
    setIndex(i => i + 1)
  }

  const restart = () => {
    setStarted(false)
    setIndex(0)
    setScore({ correct: 0, total: 0 })
    setAnswer('unanswered')
    setChosen(null)
  }

  // ── Start screen ──────────────────────────────────────────────────────────────
  if (!started) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <h1 style={{ fontWeight: 700, fontSize: 28, color: "var(--color-text-primary)" }}>Flashcard Drill</h1>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginTop: 4 }}>
            See the sign — pick the correct meaning from 4 options
          </p>
        </div>

        <div>
          <p className="section-label" style={{ marginBottom: 10 }}>Category</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {/* All signs */}
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "12px 16px",
                borderRadius: 10,
                border: selectedCategory === 'all'
                  ? "2px solid var(--color-primary)"
                  : "1px solid var(--color-border)",
                background: selectedCategory === 'all'
                  ? "color-mix(in srgb, var(--color-primary) 6%, white)"
                  : "var(--color-surface)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{
                fontSize: 14,
                fontWeight: 600,
                color: selectedCategory === 'all' ? "var(--color-primary)" : "var(--color-text-primary)",
              }}>
                All signs
              </span>
              <span className="font-mono-stat" style={{
                fontSize: 12,
                color: selectedCategory === 'all' ? "var(--color-primary)" : "var(--color-text-muted)",
              }}>
                {allSigns.length}
              </span>
            </button>

            {CATEGORIES.map(cat => {
              const count = allSigns.filter(s => s.category === cat.id).length
              if (count === 0) return null
              const colorVar = `var(--color-${cat.id})`
              const isSelected = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 16px",
                    borderRadius: 10,
                    border: isSelected
                      ? `2px solid ${colorVar}`
                      : "1px solid var(--color-border)",
                    background: isSelected
                      ? `color-mix(in srgb, ${colorVar} 6%, white)`
                      : "var(--color-surface)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: isSelected ? colorVar : "var(--color-text-primary)",
                  }}>
                    {cat.name}
                  </span>
                  <span className="font-mono-stat" style={{
                    fontSize: 12,
                    color: isSelected ? colorVar : "var(--color-text-muted)",
                  }}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <button
          onClick={() => startSession(selectedCategory)}
          style={{
            width: "100%",
            background: "var(--color-primary)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            padding: "14px 24px",
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          Start Drill
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    )
  }

  // ── Results screen ────────────────────────────────────────────────────────────
  if (index >= deck.length) {
    const pct = Math.round((score.correct / score.total) * 100)
    const ResultIcon = pct >= 90 ? Trophy : pct >= 70 ? ThumbsUp : BookOpen
    const resultColor = pct >= 90 ? "var(--color-pedal-cycle)" : pct >= 70 ? "var(--color-warning)" : "var(--color-prohibitory)"
    const resultMsg = pct >= 90 ? "Excellent! Ready for the BTT." : pct >= 70 ? "Good, but keep practising." : "Keep studying — you've got this!"

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "center" }}>
        <div className="card" style={{ padding: 40 }}>
          <ResultIcon size={48} strokeWidth={1.5} style={{ color: resultColor, margin: "0 auto 16px" }} />
          <div className="font-mono-stat" style={{ fontSize: 36, color: "var(--color-text-primary)", lineHeight: 1 }}>
            {score.correct} / {score.total}
          </div>
          <div className="font-mono-stat" style={{ fontSize: 48, fontWeight: 700, color: resultColor, margin: "8px 0" }}>
            {pct}%
          </div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{resultMsg}</p>
        </div>
        <button
          onClick={restart}
          style={{
            width: "100%",
            background: "var(--color-primary)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 15,
            padding: "14px 24px",
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </div>
    )
  }

  // ── Drill screen ──────────────────────────────────────────────────────────────
  const current = deck[index]

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Progress */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13 }}>
        <span className="font-mono-stat" style={{ color: "var(--color-text-muted)" }}>
          {index + 1} / {deck.length}
        </span>
        <span style={{ fontWeight: 600, color: "var(--color-pedal-cycle)" }}>
          {score.correct} correct
        </span>
      </div>
      <div style={{ width: "100%", background: "var(--color-border)", borderRadius: 999, height: 4 }}>
        <div
          style={{
            background: "var(--color-primary)",
            height: 4,
            borderRadius: 999,
            transition: "width 0.3s",
            width: `${(index / deck.length) * 100}%`,
          }}
        />
      </div>

      {/* Sign card */}
      <div
        className="card"
        style={{ padding: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}
      >
        <div style={{ width: 160, height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Image
            src={current.image}
            alt="What sign is this?"
            width={160}
            height={160}
            className="object-contain max-w-full max-h-full"
          />
        </div>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)", textAlign: "center" }}>
          What does this sign mean?
        </p>
      </div>

      {/* Answer options */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {options.map((opt) => {
          const isCorrect = opt.id === current.id
          const isChosen = opt.id === chosen
          const revealed = answer !== 'unanswered'

          let borderColor = "var(--color-border)"
          let bg = "var(--color-surface)"
          let textColor = "var(--color-text-primary)"

          if (revealed) {
            if (isCorrect) { borderColor = "var(--color-pedal-cycle)"; bg = "color-mix(in srgb, var(--color-pedal-cycle) 8%, white)"; textColor = "var(--color-pedal-cycle)" }
            else if (isChosen) { borderColor = "var(--color-prohibitory)"; bg = "color-mix(in srgb, var(--color-prohibitory) 8%, white)"; textColor = "var(--color-prohibitory)" }
            else { textColor = "var(--color-text-muted)" }
          }

          const IndicatorIcon = isCorrect ? CheckCircle2 : isChosen ? XCircle : Circle

          return (
            <button
              key={opt.id}
              onClick={() => handleAnswer(opt.id)}
              disabled={revealed}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "12px 16px",
                borderRadius: 10,
                border: `1px solid ${borderColor}`,
                background: bg,
                cursor: revealed ? "default" : "pointer",
                fontSize: 14,
                fontWeight: 500,
                color: textColor,
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                transition: "border-color 0.15s",
              }}
            >
              {revealed && (
                <IndicatorIcon
                  size={16}
                  strokeWidth={2}
                  style={{ color: isCorrect ? "var(--color-pedal-cycle)" : isChosen ? "var(--color-prohibitory)" : "var(--color-border)", flexShrink: 0, marginTop: 1 }}
                />
              )}
              {opt.name}
            </button>
          )
        })}
      </div>

      {/* Reveal panel */}
      {answer !== 'unanswered' && (
        <div
          style={{
            borderRadius: 10,
            padding: "12px 16px",
            border: `1px solid ${answer === 'correct' ? "color-mix(in srgb, var(--color-pedal-cycle) 30%, transparent)" : "color-mix(in srgb, var(--color-prohibitory) 30%, transparent)"}`,
            background: answer === 'correct'
              ? "color-mix(in srgb, var(--color-pedal-cycle) 6%, white)"
              : "color-mix(in srgb, var(--color-prohibitory) 6%, white)",
            borderLeft: `4px solid ${answer === 'correct' ? "var(--color-pedal-cycle)" : "var(--color-prohibitory)"}`,
          }}
        >
          <p style={{ fontWeight: 600, fontSize: 14, color: "var(--color-text-primary)" }}>{current.name}</p>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 4 }}>{current.description}</p>
          {current.note && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 5, marginTop: 8 }}>
              <AlertTriangle size={13} strokeWidth={2} style={{ color: "var(--color-warning)", flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 12, color: "var(--color-warning)" }}>{current.note}</p>
            </div>
          )}
        </div>
      )}

      {answer !== 'unanswered' && (
        <button
          onClick={next}
          style={{
            width: "100%",
            background: "var(--color-text-primary)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 15,
            padding: "13px 24px",
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {index + 1 < deck.length ? "Next" : "See Results"}
          <ChevronRight size={17} strokeWidth={2.5} />
        </button>
      )}

    </div>
  )
}
