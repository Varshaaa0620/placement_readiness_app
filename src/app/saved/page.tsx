'use client'

import React, { useState, useEffect } from 'react'
import { Job, jobsData } from '../../data/jobs'
import { JobCard, JobModal } from '../../components'
import { colors, spacing } from '../../styles/designTokens'

export default function SavedPage() {
  const [savedJobs, setSavedJobs] = useState<Job[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set())

  // Load saved jobs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedJobs')
    if (saved) {
      try {
        const savedIds = new Set(JSON.parse(saved) as string[])
        setSavedJobIds(savedIds)
        const saved_jobs = jobsData.filter((job) => savedIds.has(job.id))
        setSavedJobs(saved_jobs)
      } catch (e) {
        console.error('Error loading saved jobs:', e)
      }
    }
  }, [])

  // Handle unsaving a job
  const handleSaveJob = (jobId: string) => {
    const newSavedIds = new Set(savedJobIds)
    newSavedIds.delete(jobId)
    setSavedJobIds(newSavedIds)
    setSavedJobs(savedJobs.filter((j) => j.id !== jobId))
    localStorage.setItem('savedJobs', JSON.stringify(Array.from(newSavedIds)))
  }

  if (savedJobs.length === 0) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: colors.background,
          padding: spacing.lg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '720px',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '48px',
              fontWeight: 600,
              color: colors.text.primary,
              marginBottom: spacing.md,
              letterSpacing: '-0.01em',
            }}
          >
            Your Saved Jobs
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: colors.text.secondary,
              lineHeight: '1.8',
              marginBottom: spacing.lg,
            }}
          >
            You haven't saved any jobs yet. Browse opportunities on the dashboard and save the ones you're interested in.
          </p>
          <a
            href="/dashboard"
            style={{
              display: 'inline-block',
              backgroundColor: colors.accent,
              color: 'white',
              padding: `${spacing.sm} ${spacing.md}`,
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 150ms ease-in-out',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = '0.9'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = '1'
            }}
          >
            Browse Jobs
          </a>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: colors.background,
        padding: spacing.lg,
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '48px',
            fontWeight: 600,
            color: colors.text.primary,
            marginBottom: spacing.md,
            letterSpacing: '-0.01em',
          }}
        >
          Your Saved Jobs
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: colors.text.secondary,
            marginBottom: spacing.lg,
            lineHeight: '1.6',
          }}
        >
          You have saved {savedJobs.length} job{savedJobs.length !== 1 ? 's' : ''}.
        </p>

        {/* Saved Jobs */}
        <div>
          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onView={(job) => {
                setSelectedJob(job)
                setIsModalOpen(true)
              }}
              onSave={handleSaveJob}
              isSaved={true}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <JobModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
