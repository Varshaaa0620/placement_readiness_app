const ACTION_VERBS = [
  'built', 'developed', 'designed', 'implemented', 'led', 'improved', 'created',
  'optimized', 'automated', 'managed', 'architected', 'engineered', 'launched',
  'delivered', 'spearheaded', 'pioneered', 'streamlined', 'reduced', 'increased',
  'achieved', 'collaborated', 'coordinated', 'executed', 'facilitated', 'generated',
  'integrated', 'maintained', 'mentored', 'negotiated', 'orchestrated', 'produced',
  'refactored', 'resolved', 'scaled', 'secured', 'trained', 'transformed',
  'analyzed', 'conducted', 'defined', 'established', 'evaluated', 'identified',
  'investigated', 'measured', 'monitored', 'researched', 'tested', 'validated',
]

export interface BulletFeedback {
  hasActionVerb: boolean
  hasNumbers: boolean
  suggestions: string[]
}

export function analyzeBullet(text: string): BulletFeedback {
  const trimmed = text.trim().toLowerCase()
  
  if (!trimmed) {
    return { hasActionVerb: false, hasNumbers: false, suggestions: [] }
  }

  // Check for action verb at start
  const firstWord = trimmed.split(/[\s\W]+/)[0]
  const hasActionVerb = ACTION_VERBS.includes(firstWord)

  // Check for numeric indicators
  const hasNumbers = /\d+%?|\d+k|\d+m|\d+x|\$\d+|\d+\s*(percent|times|x|fold)/.test(trimmed)

  const suggestions: string[] = []
  
  if (!hasActionVerb) {
    suggestions.push('Start with a strong action verb.')
  }
  
  if (!hasNumbers) {
    suggestions.push('Add measurable impact (numbers).')
  }

  return {
    hasActionVerb,
    hasNumbers,
    suggestions,
  }
}

export function getBulletInputGuidance(text: string): string[] {
  const feedback = analyzeBullet(text)
  return feedback.suggestions
}
