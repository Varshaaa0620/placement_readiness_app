import { ResumeData, defaultResumeData } from '../types/resume'

const STORAGE_KEY = 'resumeBuilderData'

export function saveResumeData(data: ResumeData): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function loadResumeData(): ResumeData {
  if (typeof window === 'undefined') return defaultResumeData
  
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return defaultResumeData
  
  try {
    return JSON.parse(stored) as ResumeData
  } catch {
    return defaultResumeData
  }
}

export function clearResumeData(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
