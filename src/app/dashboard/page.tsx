'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { Job, jobsData } from '../../data/jobs'
import { JobCard, JobModal } from '../../components'
import { colors, spacing } from '../../styles/designTokens'

export default function DashboardPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set())

  // Filters
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    mode: '',
    experience: '',
    source: '',
    sortBy: 'latest',
  })

  // Load saved jobs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedJobs')
    if (saved) {
      try {
        setSavedJobIds(new Set(JSON.parse(saved)))
      } catch (e) {
        console.error('Error loading saved jobs:', e)
      }
    }
  }, [])

  // Save/unsave a job
  const handleSaveJob = (jobId: string) => {
    const newSavedIds = new Set(savedJobIds)
    if (newSavedIds.has(jobId)) {
      newSavedIds.delete(jobId)
    } else {
      newSavedIds.add(jobId)
    }
    setSavedJobIds(newSavedIds)
    localStorage.setItem('savedJobs', JSON.stringify(Array.from(newSavedIds)))
  }

  // Get unique values for dropdowns
  const locations = Array.from(new Set(jobsData.map((j) => j.location))).sort()
  const modes = Array.from(new Set(jobsData.map((j) => j.mode))).sort()
  const experiences = Array.from(new Set(jobsData.map((j) => j.experience))).sort()
  const sources = Array.from(new Set(jobsData.map((j) => j.source))).sort()

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let result = jobsData.filter((job) => {
      // Keyword search
      if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase()
        const matchesTitle = job.title.toLowerCase().includes(keyword)
        const matchesCompany = job.company.toLowerCase().includes(keyword)
        if (!matchesTitle && !matchesCompany) return false
      }

      // Location filter
      if (filters.location && job.location !== filters.location) return false

      // Mode filter
      if (filters.mode && job.mode !== filters.mode) return false

      // Experience filter
      if (filters.experience && job.experience !== filters.experience) return false

      // Source filter
      if (filters.source && job.source !== filters.source) return false

      return true
    })

    // Sort
    if (filters.sortBy === 'latest') {
      result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo)
    } else if (filters.sortBy === 'oldest') {
      result.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo)
    } else if (filters.sortBy === 'salary') {
      result.sort((a, b) => {
        const extractSalary = (range: string) => {
          const match = range.match(/(\d+)/);
          return match ? parseInt(match[1]) : 0
        }
        return extractSalary(b.salaryRange) - extractSalary(a.salaryRange)
      })
    }

    return result
  }, [filters])

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
          Available Opportunities
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: colors.text.secondary,
            marginBottom: spacing.lg,
            lineHeight: '1.6',
          }}
        >
          Browse {jobsData.length} curated tech jobs from leading Indian companies.
        </p>

        {/* Filter Bar */}
        <div
          style={{
            backgroundColor: 'white',
            border: `1px solid ${colors.border.default}`,
            borderRadius: '4px',
            padding: spacing.md,
            marginBottom: spacing.lg,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: spacing.md,
            }}
          >
            {/* Keyword Search */}
            <input
              type="text"
              placeholder="Search by title or company..."
              value={filters.keyword}
              onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
              style={{
                padding: `${spacing.sm} ${spacing.sm}`,
                border: `1px solid ${colors.border.default}`,
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'inherit',
                color: colors.text.primary,
                backgroundColor: colors.bg.subtle,
              }}
            />

            {/* Location Filter */}
            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              style={{
                padding: `${spacing.sm} ${spacing.sm}`,
                border: `1px solid ${colors.border.default}`,
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'inherit',
                color: colors.text.primary,
                backgroundColor: colors.bg.subtle,
                cursor: 'pointer',
              }}
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            {/* Mode Filter */}
            <select
              value={filters.mode}
              onChange={(e) => setFilters({ ...filters, mode: e.target.value })}
              style={{
                padding: `${spacing.sm} ${spacing.sm}`,
                border: `1px solid ${colors.border.default}`,
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'inherit',
                color: colors.text.primary,
                backgroundColor: colors.bg.subtle,
                cursor: 'pointer',
              }}
            >
              <option value="">All Modes</option>
              {modes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>

            {/* Experience Filter */}
            <select
              value={filters.experience}
              onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
              style={{
                padding: `${spacing.sm} ${spacing.sm}`,
                border: `1px solid ${colors.border.default}`,
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'inherit',
                color: colors.text.primary,
                backgroundColor: colors.bg.subtle,
                cursor: 'pointer',
              }}
            >
              <option value="">All Experience</option>
              {experiences.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>

            {/* Source Filter */}
            <select
              value={filters.source}
              onChange={(e) => setFilters({ ...filters, source: e.target.value })}
              style={{
                padding: `${spacing.sm} ${spacing.sm}`,
                border: `1px solid ${colors.border.default}`,
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'inherit',
                color: colors.text.primary,
                backgroundColor: colors.bg.subtle,
                cursor: 'pointer',
              }}
            >
              <option value="">All Sources</option>
              {sources.map((src) => (
                <option key={src} value={src}>
                  {src}
                </option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              style={{
                padding: `${spacing.sm} ${spacing.sm}`,
                border: `1px solid ${colors.border.default}`,
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'inherit',
                color: colors.text.primary,
                backgroundColor: colors.bg.subtle,
                cursor: 'pointer',
              }}
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="salary">Highest Salary</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <p
          style={{
            fontSize: '14px',
            color: colors.text.secondary,
            marginBottom: spacing.lg,
          }}
        >
          Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
          {Object.values(filters).some((f) => f && f !== 'latest')
            ? ' (filtered)'
            : ''}
        </p>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div>
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onView={(job) => {
                  setSelectedJob(job)
                  setIsModalOpen(true)
                }}
                onSave={handleSaveJob}
                isSaved={savedJobIds.has(job.id)}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: spacing.xl,
              backgroundColor: colors.bg.subtle,
              borderRadius: '4px',
              border: `1px solid ${colors.border.subtle}`,
            }}
          >
            <h2
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '28px',
                fontWeight: 600,
                color: colors.text.primary,
                marginBottom: spacing.md,
                letterSpacing: '-0.01em',
              }}
            >
              No jobs match your search.
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: colors.text.secondary,
                margin: 0,
              }}
            >
              Try adjusting your filters to find more opportunities.
            </p>
          </div>
        )}
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
