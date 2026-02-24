import { Job } from '../data/jobs'

export interface UserPreferences {
  roleKeywords: string[]
  preferredLocations: string[]
  preferredMode: ('Remote' | 'Hybrid' | 'Onsite')[]
  experienceLevel: string
  skills: string[]
  minMatchScore: number
}

/**
 * Calculate match score for a job based on user preferences
 *
 * Scoring rules:
 * +25 if any roleKeyword appears in job.title (case-insensitive)
 * +15 if any roleKeyword appears in job.description
 * +15 if job.location matches preferredLocations
 * +10 if job.mode matches preferredMode
 * +10 if job.experience matches experienceLevel
 * +15 if overlap between job.skills and user.skills (any match)
 * +5 if postedDaysAgo <= 2
 * +5 if source is LinkedIn
 * Capped at 100
 */
export function calculateMatchScore(job: Job, preferences: UserPreferences | null): number {
  if (!preferences) return 0

  let score = 0

  // Normalize inputs
  const titleLower = job.title.toLowerCase()
  const descriptionLower = job.description.toLowerCase()
  const roleKeywordsLower = preferences.roleKeywords.map((k) => k.toLowerCase())
  const jobSkillsLower = job.skills.map((s) => s.toLowerCase())
  const userSkillsLower = preferences.skills.map((s) => s.toLowerCase())

  // +25 if any roleKeyword appears in job.title
  if (roleKeywordsLower.some((keyword) => titleLower.includes(keyword))) {
    score += 25
  }

  // +15 if any roleKeyword appears in job.description
  if (roleKeywordsLower.some((keyword) => descriptionLower.includes(keyword))) {
    score += 15
  }

  // +15 if job.location matches preferredLocations
  if (preferences.preferredLocations.includes(job.location)) {
    score += 15
  }

  // +10 if job.mode matches preferredMode
  if (preferences.preferredMode.includes(job.mode)) {
    score += 10
  }

  // +10 if job.experience matches experienceLevel
  if (job.experience === preferences.experienceLevel) {
    score += 10
  }

  // +15 if overlap between job.skills and user.skills
  if (userSkillsLower.some((userSkill) => jobSkillsLower.some((jobSkill) => jobSkill.includes(userSkill) || userSkill.includes(jobSkill)))) {
    score += 15
  }

  // +5 if postedDaysAgo <= 2
  if (job.postedDaysAgo <= 2) {
    score += 5
  }

  // +5 if source is LinkedIn
  if (job.source === 'LinkedIn') {
    score += 5
  }

  // Cap at 100
  return Math.min(score, 100)
}

/**
 * Get color for match score badge
 * 80-100: green
 * 60-79: amber
 * 40-59: neutral
 * <40: grey
 */
export function getMatchScoreColor(score: number): string {
  if (score >= 80) return '#4B7C59' // green
  if (score >= 60) return '#B8860B' // amber
  if (score >= 40) return '#999999' // neutral
  return '#D4D3CF' // grey
}

/**
 * Parse comma-separated string into array, trimmed
 */
export function parseCommaSeparated(input: string): string[] {
  return input
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
}

/**
 * Convert array back to comma-separated string
 */
export function formatArrayToString(arr: string[]): string {
  return arr.join(', ')
}
