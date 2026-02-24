import { colors } from '../styles/designTokens'

export type JobStatus = 'Not Applied' | 'Applied' | 'Rejected' | 'Selected'

export interface JobStatusUpdate {
  jobId: string
  jobTitle: string
  company: string
  status: JobStatus
  timestamp: number // milliseconds since epoch
}

/**
 * Check if we're on the client side
 */
function isClient(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
}

/**
 * Get all job statuses from localStorage
 * Returns object mapping jobId to status
 */
export function getAllJobStatuses(): Record<string, JobStatus> {
  if (!isClient()) return {}

  const stored = localStorage.getItem('jobTrackerStatuses')
  if (!stored) return {}

  try {
    return JSON.parse(stored) as Record<string, JobStatus>
  } catch (e) {
    console.error('Error parsing job statuses:', e)
    return {}
  }
}

/**
 * Get status for a specific job
 * Defaults to 'Not Applied' if no status exists
 */
export function getJobStatus(jobId: string): JobStatus {
  const statuses = getAllJobStatuses()
  return statuses[jobId] || 'Not Applied'
}

/**
 * Set status for a job and record the update
 */
export function setJobStatus(jobId: string, jobTitle: string, company: string, status: JobStatus): void {
  if (!isClient()) return

  // Update the status map
  const statuses = getAllJobStatuses()
  statuses[jobId] = status
  localStorage.setItem('jobTrackerStatuses', JSON.stringify(statuses))

  // Record the status update
  const updates = getStatusUpdates()
  updates.push({
    jobId,
    jobTitle,
    company,
    status,
    timestamp: Date.now(),
  })
  localStorage.setItem('jobTrackerStatusUpdates', JSON.stringify(updates))
}

/**
 * Get all status updates in reverse chronological order (newest first)
 */
export function getStatusUpdates(): JobStatusUpdate[] {
  if (!isClient()) return []

  const stored = localStorage.getItem('jobTrackerStatusUpdates')
  if (!stored) return []

  try {
    const updates = JSON.parse(stored) as JobStatusUpdate[]
    // Sort by timestamp descending (newest first)
    return updates.sort((a, b) => b.timestamp - a.timestamp)
  } catch (e) {
    console.error('Error parsing status updates:', e)
    return []
  }
}

/**
 * Get recent status updates (last N updates)
 */
export function getRecentStatusUpdates(limit: number = 5): JobStatusUpdate[] {
  return getStatusUpdates().slice(0, limit)
}

/**
 * Get color for a job status
 */
export function getStatusColor(status: JobStatus): string {
  const statusColors: Record<JobStatus, string> = {
    'Not Applied': colors.text.tertiary, // neutral gray
    'Applied': '#0066CC', // blue
    'Rejected': colors.semantic.error, // red
    'Selected': colors.semantic.success, // green
  }
  return statusColors[status]
}

/**
 * Get background color for status badge
 */
export function getStatusBgColor(status: JobStatus): string {
  const statusColors: Record<JobStatus, string> = {
    'Not Applied': '#F0F0F0', // light gray
    'Applied': '#E3F2FD', // light blue
    'Rejected': '#FFEBEE', // light red
    'Selected': '#E8F5E9', // light green
  }
  return statusColors[status]
}

/**
 * Clear all statuses and updates (for testing/reset)
 */
export function clearAllStatuses(): void {
  if (!isClient()) return

  localStorage.removeItem('jobTrackerStatuses')
  localStorage.removeItem('jobTrackerStatusUpdates')
}
