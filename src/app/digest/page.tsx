'use client'

import React, { useState, useEffect } from 'react'
import { colors, spacing } from '../../styles/designTokens'
import { UserPreferences } from '../../utils/preferences'
import {
  Digest,
  getOrCreateDigest,
  formatDigestAsPlainText,
  formatDigestForEmail,
  getTodayDateString,
} from '../../utils/digest'

export default function DigestPage() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  const [digest, setDigest] = useState<Digest | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState('')

  // Load preferences on mount
  useEffect(() => {
    const prefs = localStorage.getItem('jobTrackerPreferences')
    if (prefs) {
      try {
        setPreferences(JSON.parse(prefs))
      } catch (e) {
        console.error('Error loading preferences:', e)
      }
    }
    setIsMounted(true)
  }, [])

  // Handle digest generation
  const handleGenerateDigest = () => {
    const newDigest = getOrCreateDigest(preferences)
    setDigest(newDigest)
  }

  // Handle copy to clipboard
  const handleCopyToClipboard = () => {
    if (!digest) return

    const text = formatDigestAsPlainText(digest)
    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback('Copied to clipboard!')
      setTimeout(() => setCopyFeedback(''), 2000)
    })
  }

  // Handle email draft
  const handleEmailDraft = () => {
    if (!digest) return

    const { subject, body } = formatDigestForEmail(digest)
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink
  }

  if (!isMounted) return null

  // No preferences set
  if (!preferences) {
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
            Daily Digest
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: colors.text.secondary,
              lineHeight: '1.8',
              marginBottom: spacing.lg,
            }}
          >
            Set your preferences to generate a personalized digest.
          </p>
          <a
            href="/settings"
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
            Go to Settings
          </a>
        </div>
      </div>
    )
  }

  // No digest generated yet
  if (!digest) {
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
            maxWidth: '720px',
            margin: '0 auto',
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
            Daily Digest
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: colors.text.secondary,
              lineHeight: '1.8',
              marginBottom: spacing.lg,
            }}
          >
            Generate personalized job recommendations based on your preferences.
          </p>

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
                fontSize: '13px',
                color: colors.text.tertiary,
                margin: 0,
              }}
            >
              💡 Demo Mode: Daily 9AM trigger simulated manually.
            </p>
          </div>

          <button
            onClick={handleGenerateDigest}
            style={{
              backgroundColor: colors.accent,
              color: 'white',
              border: 'none',
              padding: `${spacing.sm} ${spacing.md}`,
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 150ms ease-in-out',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '0.9'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '1'
            }}
          >
            Generate Today's 9AM Digest
          </button>
        </div>
      </div>
    )
  }

  // Digest is empty (no matching jobs)
  if (digest.jobs.length === 0) {
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
            No Matching Roles Today
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: colors.text.secondary,
              lineHeight: '1.8',
              marginBottom: spacing.lg,
            }}
          >
            No matching roles today. Check again tomorrow or adjust your preferences to see more opportunities.
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
            Browse All Jobs
          </a>
        </div>
      </div>
    )
  }

  const todayDate = new Date(digest.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  // Display digest
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
          maxWidth: '720px',
          margin: '0 auto',
        }}
      >
        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: spacing.sm,
            marginBottom: spacing.lg,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={handleCopyToClipboard}
            style={{
              backgroundColor: colors.accent,
              color: 'white',
              border: 'none',
              padding: `${spacing.xs} ${spacing.md}`,
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 150ms ease-in-out',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '0.9'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '1'
            }}
          >
            {copyFeedback || 'Copy to Clipboard'}
          </button>

          <button
            onClick={handleEmailDraft}
            style={{
              backgroundColor: colors.bg.subtle,
              color: colors.text.primary,
              border: `1px solid ${colors.border.subtle}`,
              padding: `${spacing.xs} ${spacing.md}`,
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 150ms ease-in-out',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors.border.subtle
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors.bg.subtle
            }}
          >
            Create Email Draft
          </button>

          <a
            href="/digest"
            style={{
              backgroundColor: colors.bg.subtle,
              color: colors.text.primary,
              border: `1px solid ${colors.border.subtle}`,
              padding: `${spacing.xs} ${spacing.md}`,
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 150ms ease-in-out',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = colors.border.subtle
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = colors.bg.subtle
            }}
          >
            Regenerate
          </a>
        </div>

        {/* Demo Mode Note */}
        <div
          style={{
            backgroundColor: colors.bg.subtle,
            border: `1px solid ${colors.border.subtle}`,
            borderRadius: '4px',
            padding: spacing.md,
            marginBottom: spacing.lg,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '13px',
              color: colors.text.tertiary,
              margin: 0,
            }}
          >
            💡 Demo Mode: Daily 9AM trigger simulated manually.
          </p>
        </div>

        {/* Email-style Digest Card */}
        <div
          style={{
            backgroundColor: 'white',
            border: `1px solid ${colors.border.default}`,
            borderRadius: '4px',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: spacing.lg,
              backgroundColor: colors.bg.subtle,
              borderBottom: `1px solid ${colors.border.default}`,
            }}
          >
            <h1
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '36px',
                fontWeight: 600,
                color: colors.text.primary,
                margin: `0 0 ${spacing.xs} 0`,
                letterSpacing: '-0.01em',
              }}
            >
              Top 10 Jobs For You
            </h1>
            <p
              style={{
                fontSize: '18px',
                fontWeight: 500,
                color: colors.accent,
                margin: 0,
              }}
            >
              9AM Digest
            </p>
            <p
              style={{
                fontSize: '14px',
                color: colors.text.secondary,
                marginTop: spacing.md,
                margin: `${spacing.md} 0 0 0`,
              }}
            >
              {todayDate}
            </p>
          </div>

          {/* Body - Jobs List */}
          <div
            style={{
              padding: spacing.lg,
            }}
          >
            {digest.jobs.map((job, index) => (
              <div
                key={job.id}
                style={{
                  marginBottom: index < digest.jobs.length - 1 ? spacing.lg : 0,
                  paddingBottom: index < digest.jobs.length - 1 ? spacing.lg : 0,
                  borderBottom:
                    index < digest.jobs.length - 1
                      ? `1px solid ${colors.border.default}`
                      : 'none',
                }}
              >
                {/* Job Title */}
                <h2
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: colors.text.primary,
                    margin: `0 0 ${spacing.xs} 0`,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {index + 1}. {job.title}
                </h2>

                {/* Company */}
                <p
                  style={{
                    fontSize: '15px',
                    fontWeight: 500,
                    color: colors.accent,
                    margin: `0 0 ${spacing.sm} 0`,
                  }}
                >
                  {job.company}
                </p>

                {/* Meta Info */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: spacing.sm,
                    marginBottom: spacing.md,
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: '11px',
                        color: colors.text.tertiary,
                        fontWeight: 500,
                        margin: `0 0 ${spacing.xs} 0`,
                        textTransform: 'uppercase',
                      }}
                    >
                      Location
                    </p>
                    <p
                      style={{
                        fontSize: '14px',
                        color: colors.text.primary,
                        margin: 0,
                      }}
                    >
                      {job.location}
                    </p>
                  </div>

                  <div>
                    <p
                      style={{
                        fontSize: '11px',
                        color: colors.text.tertiary,
                        fontWeight: 500,
                        margin: `0 0 ${spacing.xs} 0`,
                        textTransform: 'uppercase',
                      }}
                    >
                      Experience
                    </p>
                    <p
                      style={{
                        fontSize: '14px',
                        color: colors.text.primary,
                        margin: 0,
                      }}
                    >
                      {job.experience}
                    </p>
                  </div>

                  <div>
                    <p
                      style={{
                        fontSize: '11px',
                        color: colors.text.tertiary,
                        fontWeight: 500,
                        margin: `0 0 ${spacing.xs} 0`,
                        textTransform: 'uppercase',
                      }}
                    >
                      Match Score
                    </p>
                    <p
                      style={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: colors.accent,
                        margin: 0,
                      }}
                    >
                      {job.matchScore}%
                    </p>
                  </div>

                  <div />
                </div>

                {/* Apply Button */}
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    backgroundColor: colors.accent,
                    color: 'white',
                    padding: `${spacing.xs} ${spacing.md}`,
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    transition: 'all 150ms ease-in-out',
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
            ))}
          </div>

          {/* Footer */}
          <div
            style={{
              padding: spacing.lg,
              backgroundColor: colors.bg.subtle,
              borderTop: `1px solid ${colors.border.default}`,
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: '13px',
                color: colors.text.secondary,
                lineHeight: '1.6',
                margin: 0,
              }}
            >
              This digest was generated based on your preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
