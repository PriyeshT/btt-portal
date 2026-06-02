// Phase 1: localStorage-backed progress.
// Phase 2: swap load/save for API calls — components don't need to change.

const PROGRESS_KEY = 'btt_progress_v1'
const LAST_PATH_KEY = 'btt_last_path_v1'

export type StepStatus = 'not_started' | 'completed'

export type ProgressStore = {
  [pathId: string]: {
    [stepId: string]: StepStatus
  }
}

function load(): ProgressStore {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '{}')
  } catch {
    return {}
  }
}

function save(store: ProgressStore): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(store))
}

export function getProgress(): ProgressStore {
  return load()
}

export function getStepStatus(pathId: string, stepId: string): StepStatus {
  return load()[pathId]?.[stepId] ?? 'not_started'
}

export function markStepComplete(pathId: string, stepId: string): void {
  const store = load()
  if (!store[pathId]) store[pathId] = {}
  store[pathId][stepId] = 'completed'
  save(store)
}

export function toggleStepComplete(pathId: string, stepId: string): void {
  const store = load()
  if (!store[pathId]) store[pathId] = {}
  const current = store[pathId][stepId] ?? 'not_started'
  store[pathId][stepId] = current === 'completed' ? 'not_started' : 'completed'
  save(store)
}

export function getPathCompletion(pathId: string, totalSteps: number): number {
  const pathStore = load()[pathId] ?? {}
  const completed = Object.values(pathStore).filter(s => s === 'completed').length
  return totalSteps === 0 ? 0 : Math.round((completed / totalSteps) * 100)
}

export function getLastActivePath(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(LAST_PATH_KEY)
}

export function setLastActivePath(pathId: string): void {
  localStorage.setItem(LAST_PATH_KEY, pathId)
}
