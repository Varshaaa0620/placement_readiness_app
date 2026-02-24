'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { Job, jobsData } from '../../data/jobs'
import { JobCard, JobModal } from '../../components'
import { colors, spacing } from '../../styles/designTokens'
import { UserPreferences, calculateMatchScore } from '../../utils/preferences'

export default function DashboardPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set())
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  const [showOnlyMatches, setShowOnlyMatches] = useState(false)

  // Filters
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    mode: '',
    experience: '',
    source: '',
    sortBy: 'latest',
  })

  // Load saved jobs and preferences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedJobs')
    if (saved) {
      try {
        setSavedJobIds(new Set(JSON.parse(saved)))
      } catch (e) {
        console.error('Error loading saved jobs:', e)
      }
    }

    const prefs = localStorage.getItem('jobTrackerPreferences')
    if (prefs) {
      try {
        setPreferences(JSON.parse(prefs))
      } catch (e) {
        console.error('Error loading preferences:', e)
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

  // Create job scores map
  const jobScoresMap = useMemo(() => {
    const map = new Map<string, number>()
    jobsData.forEach((job) => {
      map.set(job.id, calculateMatchScore(job, preferences))
    })
    return map
  }, [preferences])

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let result = jobsData.filter((job) => {
      // Keyword search (AND logic with other filters)
      if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase()
        const matchesTitle = job.title.toLowerCase().includes(keyword)
        const matchesCompany = job.company.toLowerCase().includes(keyword)
        if (!matchesTitle && !matchesCompany) return false
      }

      // Location filter (AND)
      if (filters.location && job.location !== filters.location) return false

      // Mode filter (AND)
      if (filters.mode && job.mode !== filters.mode) return false

      // Experience filter (AND)
      if (filters.experience && job.experience !== filters.experience) return false

      // Source filter (AND)
      if (filters.source && job.source !== filters.source) return false

      // Show only matches filter (AND)
      if (showOnlyMatches && preferences) {
        const score = jobScoresMap.get(job.id) || 0
        if (score < preferences.minMatchScore) return false
      }

      return true
    })

    // Sort
    if (filters.sortBy === 'latest') {
      result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo)
    } else if (filters.sortBy === 'oldest') {
      result.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo)
    } else if (filters.sortBy === 'match') {
      result.sort((a, b) => (jobScoresMap.get(b.id) || 0) - (jobScoresMap.get(a.id) || 0))
    } else if (filters.sortBy === 'salary') {
      result.sort((a, b) => {
        const extractSalary = (range: string) => {
          const match = range.match(/(\d+)/)
          return match ? parseInt(match[1]) : 0
        }
        return extractSalary(b.salaryRange) - extractSalary(a.salaryRange)
      })
    }

    return result
  }, [filters, showOnlyMatches, preferences, jobScoresMap])

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

        {/* Preferences Banner */}
        {!preferences && (
          <div
            style={{
              backgroundColor: colors.bg.subtle,
              border: `1px solid ${colors.border.subtle}`,
              borderRadius: '4px',
              padding: spacing.md,
              marginBottom: spacing.lg,
            }}
          >
            <p
              style={{
                fontSize: '14px',
                color: colors.text.secondary,
                margin: 0,
              }}
            >
              📊 <strong>Pro tip:</strong> Set your preferences on the <a href="/settings" style={{ color: colors.accent, textDecoration: 'none' }}>Settings</a> page to activate intelligent matching and get personalized match scores.
            </p>
          </div>
        )}

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
              marginBottom: spacing.md,
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
              {preferences && <option value="match">Match Score</option>}
              <option value="salary">Highest Salary</option>
            </select>
          </div>

          {/* Show Only Matches Toggle */}
          {preferences && (
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.sm,
                cursor: 'pointer',
                fontSize: '14px',
                color: colors.text.primary,
              }}
            >
              <input
                type="checkbox"
                checked={showOnlyMatches}
                onChange={(e) => setShowOnlyMatches(e.target.checked)}
                style={{
                  cursor: 'pointer',
                }}
              />
              <span>
                Show only jobs above {preferences.minMatchScore}% threshold
              </span>
            </label>
          )}
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
          {Object.values(filters).some((f) => f && f !== 'latest') || showOnlyMatches
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
                matchScore={preferences ? jobScoresMap.get(job.id) : undefined}
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
              {showOnlyMatches
                ? 'No roles match your criteria.'
                : 'No jobs match your search.'}
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: colors.text.secondary,
                margin: 0,
              }}
            >
              {showOnlyMatches
                ? 'Adjust your filters or lower your match score threshold to see more opportunities.'
                : 'Try adjusting your filters to find more opportunities.'}
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
