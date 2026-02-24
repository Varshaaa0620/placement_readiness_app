'use client'

import React from 'react'
import { Job } from '../data/jobs'
import { colors, spacing, transitions } from '../styles/designTokens'

interface JobModalProps {
  job: Job | null
  isOpen: boolean
  onClose: () => void
}

export const JobModal: React.FC<JobModalProps> = ({ job, isOpen, onClose }) => {
  if (!isOpen || !job) return null

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
          transition: `all ${transitions.base}`,
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: colors.background,
          borderRadius: '4px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          maxWidth: '600px',
          width: '90%',
          maxHeight: '80vh',
          overflowY: 'auto',
          padding: spacing.lg,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: spacing.md,
            right: spacing.md,
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: colors.text.secondary,
            padding: 0,
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ×
        </button>

        {/* Job Title */}
        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '32px',
            fontWeight: 600,
            color: colors.text.primary,
            marginBottom: spacing.sm,
            letterSpacing: '-0.01em',
            paddingRight: '40px',
          }}
        >
          {job.title}
        </h1>

        {/* Company & Basic Info */}
        <div
          style={{
            marginBottom: spacing.lg,
            paddingBottom: spacing.lg,
            borderBottom: `1px solid ${colors.border.default}`,
          }}
        >
          <p
            style={{
              fontSize: '18px',
              fontWeight: 500,
              color: colors.accent,
              margin: `0 0 ${spacing.sm} 0`,
            }}
          >
            {job.company}
          </p>
          <p
            style={{
              fontSize: '14px',
              color: colors.text.secondary,
              margin: `0 0 ${spacing.sm} 0`,
              lineHeight: '1.6',
            }}
          >
            <strong>{job.location}</strong> • {job.mode} • {job.experience}
          </p>
          <p
            style={{
              fontSize: '14px',
              color: colors.text.secondary,
              margin: 0,
            }}
          >
            {job.salaryRange} • {job.source}
          </p>
        </div>

        {/* Description */}
        <div
          style={{
            marginBottom: spacing.lg,
          }}
        >
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '18px',
              fontWeight: 600,
              color: colors.text.primary,
              marginBottom: spacing.md,
              letterSpacing: '-0.01em',
            }}
          >
            About This Role
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: colors.text.secondary,
              lineHeight: '1.8',
              margin: 0,
              whiteSpace: 'pre-wrap',
            }}
          >
            {job.description}
          </p>
        </div>

        {/* Skills */}
        <div
          style={{
            marginBottom: spacing.lg,
          }}
        >
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '18px',
              fontWeight: 600,
              color: colors.text.primary,
              marginBottom: spacing.md,
              letterSpacing: '-0.01em',
            }}
          >
            Required Skills
          </h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: spacing.sm,
            }}
          >
            {job.skills.map((skill) => (
              <span
                key={skill}
                style={{
                  backgroundColor: colors.bg.subtle,
                  border: `1px solid ${colors.border.subtle}`,
                  color: colors.text.primary,
                  padding: `${spacing.xs} ${spacing.sm}`,
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: 500,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Meta Info */}
        <div
          style={{
            backgroundColor: colors.bg.subtle,
            border: `1px solid ${colors.border.subtle}`,
            borderRadius: '4px',
            padding: spacing.md,
            marginBottom: spacing.lg,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: spacing.md,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: colors.text.tertiary,
                  fontWeight: 500,
                  margin: `0 0 ${spacing.xs} 0`,
                }}
              >
                Posted
              </p>
              <p
                style={{
                  fontSize: '14px',
                  color: colors.text.primary,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                {job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo} days ago`}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: colors.text.tertiary,
                  fontWeight: 500,
                  margin: `0 0 ${spacing.xs} 0`,
                }}
              >
                Source
              </p>
              <p
                style={{
                  fontSize: '14px',
                  color: colors.text.primary,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                {job.source}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            textAlign: 'center',
            backgroundColor: colors.accent,
            color: 'white',
            padding: `${spacing.sm} ${spacing.md}`,
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '16px',
            cursor: 'pointer',
            transition: `all ${transitions.base}`,
            border: 'none',
            width: '100%',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.opacity = '0.9'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.opacity = '1'
          }}
        >
          Apply Now
        </a>
      </div>
    </>
  )
}
