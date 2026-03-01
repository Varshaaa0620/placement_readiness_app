export type ResumeTemplate = 'classic' | 'modern' | 'minimal'

export const TEMPLATE_STORAGE_KEY = 'resumeBuilderTemplate'

export function getStoredTemplate(): ResumeTemplate {
  if (typeof window === 'undefined') return 'classic'
  const stored = localStorage.getItem(TEMPLATE_STORAGE_KEY)
  if (stored === 'classic' || stored === 'modern' || stored === 'minimal') {
    return stored
  }
  return 'classic'
}

export function setStoredTemplate(template: ResumeTemplate): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(TEMPLATE_STORAGE_KEY, template)
}

export const TEMPLATE_LABELS: Record<ResumeTemplate, string> = {
  classic: 'Classic',
  modern: 'Modern',
  minimal: 'Minimal',
}
