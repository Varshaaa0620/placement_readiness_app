'use client'

import React from 'react'
import { Job } from '../data/jobs'
import { colors, spacing, transitions } from '../styles/designTokens'
import { getMatchScoreColor } from '../utils/preferences'

interface JobCardProps {
  job: Job
  matchScore?: number
  onView: (job: Job) => void
  onSave: (jobId: string) => void
  isSaved: boolean
}

export const JobCard: React.FC<JobCardProps> = ({ job, matchScore, onView, onSave, isSaved }) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        border: `1px solid ${colors.border.default}`,
        borderRadius: '4px',
        padding: spacing.md,
        marginBottom: spacing.lg,
        transition: `all ${transitions.base}`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'
        ;(e.currentTarget as HTMLDivElement).style.borderColor = colors.accent
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
        ;(e.currentTarget as HTMLDivElement).style.borderColor = colors.border.default
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: spacing.md,
        }}
      >
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '20px',
              fontWeight: 600,
              color: colors.text.primary,
              margin: `0 0 ${spacing.xs} 0`,
              letterSpacing: '-0.01em',
            }}
          >
            {job.title}
          </h3>
          <p
            style={{
              fontSize: '15px',
              fontWeight: 500,
              color: colors.accent,
              margin: `0 0 ${spacing.xs} 0`,
            }}
          >
            {job.company}
          </p>
        </div>

        {/* Badges */}
        <div
          style={{
            display: 'flex',
            gap: spacing.sm,
            marginLeft: spacing.md,
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
          }}
        >
          {matchScore !== undefined && (
            <span
              style={{
                backgroundColor: getMatchScoreColor(matchScore),
                color: 'white',
                padding: `${spacing.xs} ${spacing.sm}`,
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              {matchScore}% match
            </span>
          )}
          <span
            style={{
              backgroundColor: colors.bg.subtle,
              border: `1px solid ${colors.border.subtle}`,
              color: colors.text.secondary,
              padding: `${spacing.xs} ${spacing.sm}`,
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 500,
              whiteSpace: 'nowrap',
            }}
          >
            {job.source}
          </span>
        </div>
      </div>

      {/* Meta Info */}
      <div
        style={{
          display: 'flex',
          gap: spacing.md,
          marginBottom: spacing.md,
          flexWrap: 'wrap',
          fontSize: '14px',
          color: colors.text.secondary,
        }}
      >
        <span>{job.location}</span>
        <span>•</span>
        <span>{job.mode}</span>
        <span>•</span>
        <span>{job.experience}</span>
      </div>

      {/* Salary & Posted */}
      <div
        style={{
          display: 'flex',
          gap: spacing.md,
          marginBottom: spacing.md,
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: colors.accent,
          }}
        >
          {job.salaryRange}
        </span>
        <span
          style={{
            fontSize: '13px',
            color: colors.text.tertiary,
          }}
        >
          {job.postedDaysAgo === 0 ? 'Posted today' : `Posted ${job.postedDaysAgo} days ago`}
        </span>
      </div>

      {/* Buttons */}
      <div
        style={{
          display: 'flex',
          gap: spacing.sm,
          marginTop: spacing.lg,
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={() => onView(job)}
          style={{
            backgroundColor: colors.accent,
            color: 'white',
            border: 'none',
            padding: `${spacing.xs} ${spacing.md}`,
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: `all ${transitions.base}`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = '0.9'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = '1'
          }}
        >
          View
        </button>

        <button
          onClick={() => onSave(job.id)}
          style={{
            backgroundColor: isSaved ? colors.accent : 'transparent',
            color: isSaved ? 'white' : colors.accent,
            border: `1px solid ${colors.accent}`,
            padding: `${spacing.xs} ${spacing.md}`,
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: `all ${transitions.base}`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors.accent
            ;(e.currentTarget as HTMLButtonElement).style.color = 'white'
          }}
          onMouseLeave={(e) => {
            if (!isSaved) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
              ;(e.currentTarget as HTMLButtonElement).style.color = colors.accent
            }
          }}
        >
          {isSaved ? '✓ Saved' : 'Save'}
        </button>

        <a
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: colors.bg.subtle,
            color: colors.text.primary,
            border: `1px solid ${colors.border.subtle}`,
            padding: `${spacing.xs} ${spacing.md}`,
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            textDecoration: 'none',
            transition: `all ${transitions.base}`,
            display: 'inline-block',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = colors.border.subtle
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = colors.bg.subtle
          }}
        >
          Apply
        </a>
      </div>
    </div>
  )
}
