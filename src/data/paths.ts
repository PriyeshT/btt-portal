import { BookOpen, TrafficCone, Map, AlignLeft, Target, Award } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type StepId = 'learn' | 'check' | 'drill' | 'apply' | 'complete'

export type SubPathStep = {
  id: StepId
  label: string
  description: string
  href?: string        // links to an existing page; absent = no navigation
  placeholder?: true   // Phase 2 feature — renders as "Coming soon"
}

export type LearningPath = {
  id: string
  title: string
  tagline: string
  colorVar: string     // CSS variable name, e.g. '--color-mandatory'
  Icon: LucideIcon
  steps: SubPathStep[]
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'start-here',
    title: 'Start Here',
    tagline: 'Understand the BTT format and what to study',
    colorVar: '--color-primary',
    Icon: BookOpen,
    steps: [
      {
        id: 'learn',
        label: 'Learn',
        description: 'Read the BTT exam overview — 50 questions, 45 minutes, 90% pass mark.',
        href: '/#exam-facts',
      },
      {
        id: 'check',
        label: 'Check',
        description: 'Quick orientation check on what the test covers.',
        placeholder: true,
      },
      {
        id: 'drill',
        label: 'Drill',
        description: 'No drill for this module — move on to Traffic Signs.',
        placeholder: true,
      },
      {
        id: 'apply',
        label: 'Apply',
        description: 'Scan through the full sign catalog so you know what lies ahead.',
        href: '/signs',
      },
      {
        id: 'complete',
        label: 'Mark Complete',
        description: 'Tick this off once you feel oriented and ready to start studying.',
      },
    ],
  },

  {
    id: 'traffic-signs',
    title: 'Traffic Signs',
    tagline: 'Learn all 11 sign categories from the Official Handbook',
    colorVar: '--color-mandatory',
    Icon: TrafficCone,
    steps: [
      {
        id: 'learn',
        label: 'Learn',
        description: 'Browse every sign category — mandatory, prohibitory, warning, regulatory, and more.',
        href: '/signs',
      },
      {
        id: 'check',
        label: 'Check',
        description: 'Test yourself with the flashcard drill. Start with one category at a time.',
        href: '/flashcards',
      },
      {
        id: 'drill',
        label: 'Drill',
        description: 'Run the full all-signs flashcard drill. Aim for 80%+ before moving on.',
        href: '/flashcards',
      },
      {
        id: 'apply',
        label: 'Apply',
        description: 'Go back through any category you scored poorly on and re-read every sign.',
        href: '/signs',
      },
      {
        id: 'complete',
        label: 'Mark Complete',
        description: 'Mark complete once you consistently score 90%+ on the flashcard drill.',
      },
    ],
  },

  {
    id: 'road-markings',
    title: 'Road Markings',
    tagline: 'Understand lines, zones, and surface markings',
    colorVar: '--color-warning',
    Icon: Map,
    steps: [
      {
        id: 'learn',
        label: 'Learn',
        description: 'Study all 28 road markings across four sections: Across, Along, On Road, Bus Lanes.',
        href: '/markings',
      },
      {
        id: 'check',
        label: 'Check',
        description: 'Knowledge check on marking meanings and restrictions.',
        placeholder: true,
      },
      {
        id: 'drill',
        label: 'Drill',
        description: 'Marking identification drill — identify the marking from its image.',
        placeholder: true,
      },
      {
        id: 'apply',
        label: 'Apply',
        description: 'Re-read the Along the Road section — yellow and white line rules are heavily tested.',
        href: '/markings',
      },
      {
        id: 'complete',
        label: 'Mark Complete',
        description: 'Mark complete when you can recall every marking rule without looking.',
      },
    ],
  },

  {
    id: 'road-rules',
    title: 'Road Rules',
    tagline: 'Master the 10 rule categories from Part B',
    colorVar: '--color-pedal-cycle',
    Icon: AlignLeft,
    steps: [
      {
        id: 'learn',
        label: 'Learn',
        description: 'Work through all 25 rules across 10 sections — lane rules, speed, junctions, and more.',
        href: '/rules',
      },
      {
        id: 'check',
        label: 'Check',
        description: 'Rules knowledge check — answer questions on each section.',
        placeholder: true,
      },
      {
        id: 'drill',
        label: 'Drill',
        description: 'Rules recall drill — given a scenario, pick the correct rule.',
        placeholder: true,
      },
      {
        id: 'apply',
        label: 'Apply',
        description: 'Focus on Speed, Junctions & Turns, and Expressways — the most-tested sections.',
        href: '/rules',
      },
      {
        id: 'complete',
        label: 'Mark Complete',
        description: 'Mark complete when you feel confident across all 10 rule categories.',
      },
    ],
  },

  {
    id: 'practice-mode',
    title: 'Practice Mode',
    tagline: 'Combine everything and push for 90%+',
    colorVar: '--color-information',
    Icon: Target,
    steps: [
      {
        id: 'learn',
        label: 'Learn',
        description: 'Review exam tips and common pitfall signs before drilling.',
        placeholder: true,
      },
      {
        id: 'check',
        label: 'Check',
        description: 'Run a complete flashcard session across all sign categories.',
        href: '/flashcards',
      },
      {
        id: 'drill',
        label: 'Drill',
        description: 'Complete three full drill sessions. Do not stop until you score 90%+ on all three.',
        href: '/flashcards',
      },
      {
        id: 'apply',
        label: 'Apply',
        description: 'Return to any sign category where you made mistakes and re-study.',
        href: '/signs',
      },
      {
        id: 'complete',
        label: 'Mark Complete',
        description: 'Mark complete after achieving 90%+ on three consecutive full drill sessions.',
      },
    ],
  },

  {
    id: 'exam-readiness',
    title: 'Exam Readiness',
    tagline: 'Final checks before your test day',
    colorVar: '--color-pedestrian',
    Icon: Award,
    steps: [
      {
        id: 'learn',
        label: 'Learn',
        description: 'Read what to bring, what to expect, and last-minute tips for test day.',
        placeholder: true,
      },
      {
        id: 'check',
        label: 'Check',
        description: 'Final self-assessment — go through all learning paths and confirm each is complete.',
        href: '/learn/start-here',
      },
      {
        id: 'drill',
        label: 'Drill',
        description: 'Full simulated 50-question exam practice under timed conditions.',
        placeholder: true,
      },
      {
        id: 'apply',
        label: 'Apply',
        description: 'Revisit your weakest path one final time before the exam.',
        href: '/',
      },
      {
        id: 'complete',
        label: 'Mark Complete',
        description: "Mark complete when you're ready. Good luck — you've got this!",
      },
    ],
  },
]

export function getPath(id: string): LearningPath | undefined {
  return LEARNING_PATHS.find(p => p.id === id)
}
