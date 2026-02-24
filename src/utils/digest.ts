import { Job, jobsData } from '../data/jobs'
import { UserPreferences, calculateMatchScore } from './preferences'

export interface DigestJob {
  id: string
  title: string
  company: string
  location: string
  experience: string
  matchScore: number
  applyUrl: string
}

export interface Digest {
  date: string // YYYY-MM-DD
  generatedAt: string // ISO string
  jobs: DigestJob[]
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayDateString(): string {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

/**
 * Get localStorage key for today's digest
 */
export function getDigestKey(): string {
  return `jobTrackerDigest_${getTodayDateString()}`
}

/**
 * Generate top 10 jobs digest based on preferences
 * Sort by: matchScore desc, postedDaysAgo asc
 */
export function generateDigest(preferences: UserPreferences | null): Digest | null {
  if (!preferences) return null

  // Calculate scores for all jobs and create job objects with scores
  const jobsWithScores = jobsData.map((job) => ({
    ...job,
    matchScore: calculateMatchScore(job, preferences),
  }))

  // Filter jobs by minimum match score
  const matchedJobs = jobsWithScores.filter((job) => job.matchScore >= preferences.minMatchScore)

  // Sort by matchScore descending, then postedDaysAgo ascending
  matchedJobs.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore
    }
    return a.postedDaysAgo - b.postedDaysAgo
  })

  // Take top 10
  const topJobs = matchedJobs.slice(0, 10)

  // Convert to digest format
  const digestJobs: DigestJob[] = topJobs.map((job) => ({
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    experience: job.experience,
    matchScore: job.matchScore,
    applyUrl: job.applyUrl,
  }))

  return {
    date: getTodayDateString(),
    generatedAt: new Date().toISOString(),
    jobs: digestJobs,
  }
}

/**
 * Get or create today's digest
 */
export function getOrCreateDigest(preferences: UserPreferences | null): Digest | null {
  const key = getDigestKey()
  const existingDigest = localStorage.getItem(key)

  if (existingDigest) {
    try {
      return JSON.parse(existingDigest)
    } catch (e) {
      console.error('Error parsing existing digest:', e)
    }
  }

  // Generate new digest
  const digest = generateDigest(preferences)
  if (digest) {
    localStorage.setItem(key, JSON.stringify(digest))
  }

  return digest
}

/**
 * Format digest as plain text for copying
 */
export function formatDigestAsPlainText(digest: Digest): string {
  const today = new Date(digest.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  let text = `TOP 10 JOBS FOR YOU — 9AM DIGEST\n`
  text += `${today}\n`
  text += `\n${'='.repeat(50)}\n\n`

  digest.jobs.forEach((job, index) => {
    text += `${index + 1}. ${job.title}\n`
    text += `   Company: ${job.company}\n`
    text += `   Location: ${job.location}\n`
    text += `   Experience: ${job.experience}\n`
    text += `   Match Score: ${job.matchScore}%\n`
    text += `   Apply: ${job.applyUrl}\n\n`
  })

  text += `${'='.repeat(50)}\n`
  text += `This digest was generated based on your preferences.\n`

  return text
}

/**
 * Format digest for email subject and body
 */
export function formatDigestForEmail(digest: Digest): { subject: string; body: string } {
  const today = new Date(digest.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const subject = `My 9AM Job Digest - ${today}`

  let body = `TOP 10 JOBS FOR YOU — 9AM DIGEST\n\n`
  body += `${today}\n\n`

  digest.jobs.forEach((job, index) => {
    body += `${index + 1}. ${job.title}\n`
    body += `   Company: ${job.company}\n`
    body += `   Location: ${job.location}\n`
    body += `   Experience: ${job.experience}\n`
    body += `   Match Score: ${job.matchScore}%\n`
    body += `   Apply: ${job.applyUrl}\n\n`
  })

  body += `This digest was generated based on your preferences.\n`

  return { subject, body }
}
