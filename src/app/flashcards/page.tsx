"use client"

import { useState, useCallback, useEffect, useMemo } from "react"
import Image from "next/image"
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
  // Get 3 distractors from the same category first, then random if not enough
  const sameCat = allSigns.filter(s => s.id !== correct.id && s.category === correct.category)
  const otherCat = allSigns.filter(s => s.id !== correct.id && s.category !== correct.category)
  const pool = [...shuffle(sameCat), ...shuffle(otherCat)]
  const distractors = pool.slice(0, 3)
  return shuffle([correct, ...distractors])
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
    const filtered = catId === 'all'
      ? allSigns
      : allSigns.filter(s => s.category === catId)
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
    setScore(s => ({
      correct: s.correct + (correct ? 1 : 0),
      total: s.total + 1,
    }))
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

  // Start screen
  if (!started) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Flashcard Drill</h1>
          <p className="text-sm text-gray-500 mt-1">
            See the sign → pick the correct meaning from 4 options
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            Category
          </label>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-red-700 text-white border-red-700'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-red-300'
              }`}
            >
              All signs ({allSigns.length})
            </button>
            {CATEGORIES.map(cat => {
              const count = allSigns.filter(s => s.category === cat.id).length
              if (count === 0) return null
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-red-700 text-white border-red-700'
                      : `${cat.bg} ${cat.color} ${cat.border} hover:opacity-90`
                  }`}
                >
                  {cat.name} ({count})
                </button>
              )
            })}
          </div>
        </div>

        <button
          onClick={() => startSession(selectedCategory)}
          className="w-full bg-red-700 text-white font-bold py-4 rounded-xl text-lg hover:bg-red-800 transition-colors"
        >
          Start Drill →
        </button>
      </div>
    )
  }

  // Done screen
  if (index >= deck.length) {
    const pct = Math.round((score.correct / score.total) * 100)
    return (
      <div className="space-y-6 text-center">
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <div className="text-5xl mb-4">{pct >= 90 ? '🎉' : pct >= 70 ? '👍' : '📚'}</div>
          <h2 className="text-2xl font-bold text-gray-900">
            {score.correct} / {score.total}
          </h2>
          <p className="text-4xl font-bold mt-1" style={{ color: pct >= 90 ? '#16a34a' : pct >= 70 ? '#d97706' : '#dc2626' }}>
            {pct}%
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            {pct >= 90 ? 'Excellent! Ready for the BTT.' : pct >= 70 ? 'Good, but keep practising.' : 'Keep studying — you\'ve got this!'}
          </p>
        </div>
        <button
          onClick={restart}
          className="w-full bg-red-700 text-white font-bold py-4 rounded-xl hover:bg-red-800 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  const current = deck[index]

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">{index + 1} / {deck.length}</span>
        <span className="font-medium text-green-700">{score.correct} correct</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className="bg-red-700 h-1.5 rounded-full transition-all"
          style={{ width: `${((index) / deck.length) * 100}%` }}
        />
      </div>

      {/* Sign card */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 flex flex-col items-center gap-4">
        <div className="w-40 h-40 flex items-center justify-center">
          <Image
            src={current.image}
            alt="What sign is this?"
            width={160}
            height={160}
            className="object-contain max-w-full max-h-full"
          />
        </div>
        <p className="text-sm text-gray-500 text-center">What does this sign mean?</p>
      </div>

      {/* Answer options */}
      <div className="space-y-2">
        {options.map((opt) => {
          const isCorrect = opt.id === current.id
          const isChosen = opt.id === chosen
          let btnClass = 'w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-colors '

          if (answer === 'unanswered') {
            btnClass += 'bg-white border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50'
          } else if (isCorrect) {
            btnClass += 'bg-green-100 border-green-500 text-green-800'
          } else if (isChosen) {
            btnClass += 'bg-red-100 border-red-500 text-red-800'
          } else {
            btnClass += 'bg-white border-gray-200 text-gray-400'
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleAnswer(opt.id)}
              className={btnClass}
              disabled={answer !== 'unanswered'}
            >
              <div className="flex items-start gap-2">
                {answer !== 'unanswered' && (
                  <span>{isCorrect ? '✅' : isChosen ? '❌' : '○'}</span>
                )}
                <span>{opt.name}</span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Reveal description after answering */}
      {answer !== 'unanswered' && (
        <div className={`rounded-xl p-3 text-sm ${answer === 'correct' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          <p className="font-semibold">{current.name}</p>
          <p className="mt-1 text-xs">{current.description}</p>
          {current.note && <p className="mt-1 text-xs font-medium">⚠ {current.note}</p>}
        </div>
      )}

      {answer !== 'unanswered' && (
        <button
          onClick={next}
          className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors"
        >
          {index + 1 < deck.length ? 'Next →' : 'See Results'}
        </button>
      )}
    </div>
  )
}
