'use client'

import React, { useState, useEffect } from 'react'
import { colors, spacing } from '../../../styles/designTokens'
import {
  getRBProjectState,
  setProjectLinks,
  getProjectLinks,
  STEP_LABELS,
  type RBStep,
} from '../../../utils/rbStatus'

export default function RBProofPage() {
  const [isMounted, setIsMounted] = useState(false)
  const [stepStatus, setStepStatus] = useState<Record<string, { completed: boolean; artifactUploaded: boolean }>>({})
  const [lovableLink, setLovableLink] = useState('')
  const [githubLink, setGithubLink] = useState('')
  const [deployLink, setDeployLink] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const state = getRBProjectState()
    const links = getProjectLinks()
    
    const statusMap: Record<string, { completed: boolean; artifactUploaded: boolean }> = {}
    Object.entries(state.steps).forEach(([key, value]) => {
      statusMap[key] = {
        completed: value.completed,
        artifactUploaded: value.artifactUploaded,
      }
    })
    
    setStepStatus(statusMap)
    setLovableLink(links.lovableLink)
    setGithubLink(links.githubLink)
    setDeployLink(links.deployLink)
    setIsMounted(true)
  }, [])

  const handleSaveLinks = () => {
    setProjectLinks(lovableLink, githubLink, deployLink)
    alert('Links saved successfully!')
  }

  const handleCopySubmission = () => {
    const completedSteps = Object.entries(stepStatus)
      .filter(([, status]) => status.completed)
      .map(([step]) => parseInt(step) as RBStep)
      .sort((a, b) => a - b)

    const submission = `## AI Resume Builder - Project 3 Submission

### Build Track Progress
${completedSteps.map((step) => `- Step ${step}: ${STEP_LABELS[step]} ✓`).join('\n')}

### Project Links
- Lovable Project: ${lovableLink || 'Not provided'}
- GitHub Repository: ${githubLink || 'Not provided'}
- Live Deployment: ${deployLink || 'Not provided'}

### Completion Status
${completedSteps.length === 8 ? '✅ All 8 steps completed' : `⏳ ${completedSteps.length} of 8 steps completed`}
`

    navigator.clipboard.writeText(submission)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isMounted) return null

  const completedCount = Object.values(stepStatus).filter((s) => s.completed).length

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: colors.background,
        padding: spacing.lg,
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: spacing.lg }}>
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '48px',
              fontWeight: 600,
              color: colors.text.primary,
              marginBottom: spacing.sm,
              letterSpacing: '-0.01em',
            }}
          >
            Project 3: AI Resume Builder
          </h1>
          <p
            style={{
              fontSize: '18px',
              color: colors.text.secondary,
              lineHeight: '1.6',
              margin: 0,
            }}
          >
            Build Track Proof of Completion
          </p>
        </div>

        {/* Progress Overview */}
        <div
          style={{
            backgroundColor: 'white',
            border: `1px solid ${colors.border.default}`,
            borderRadius: '4px',
            padding: spacing.lg,
            marginBottom: spacing.lg,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: spacing.md,
            }}
          >
            <h2
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '24px',
                fontWeight: 600,
                color: colors.text.primary,
                margin: 0,
              }}
            >
              Build Progress
            </h2>
            <span
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: completedCount === 8 ? colors.semantic.success : colors.accent,
              }}
            >
              {completedCount} / 8
            </span>
          </div>

          <div
            style={{
              height: '8px',
              backgroundColor: colors.border.subtle,
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: spacing.md,
            }}
          >
            <div
              style={{
                width: `${(completedCount / 8) * 100}%`,
                height: '100%',
                backgroundColor: completedCount === 8 ? colors.semantic.success : colors.accent,
                transition: 'width 300ms ease',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
            {([1, 2, 3, 4, 5, 6, 7, 8] as RBStep[]).map((step) => {
              const status = stepStatus[String(step)]
              const completed = status?.completed
              const artifactUploaded = status?.artifactUploaded

              return (
                <a
                  key={step}
                  href={`/rb/0${step}-${getStepSlug(step)}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: `${spacing.sm} ${spacing.md}`,
                    backgroundColor: completed ? colors.semantic.success + '10' : colors.bg.subtle,
                    border: `1px solid ${completed ? colors.semantic.success + '30' : colors.border.subtle}`,
                    borderRadius: '4px',
                    textDecoration: 'none',
                    transition: 'all 150ms ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                    <span
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: completed ? colors.semantic.success : colors.text.tertiary,
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 600,
                      }}
                    >
                      {completed ? '✓' : step}
                    </span>
                    <span
                      style={{
                        fontSize: '15px',
                        fontWeight: 500,
                        color: completed ? colors.text.primary : colors.text.secondary,
                      }}
                    >
                      {STEP_LABELS[step]}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '13px',
                      color: artifactUploaded ? colors.semantic.success : colors.text.tertiary,
                    }}
                  >
                    {artifactUploaded ? 'Artifact Uploaded' : completed ? 'Completed' : 'Pending'}
                  </span>
                </a>
              )
            })}
          </div>
        </div>

        {/* Project Links */}
        <div
          style={{
            backgroundColor: 'white',
            border: `1px solid ${colors.border.default}`,
            borderRadius: '4px',
            padding: spacing.lg,
            marginBottom: spacing.lg,
          }}
        >
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '24px',
              fontWeight: 600,
              color: colors.text.primary,
              marginBottom: spacing.md,
            }}
          >
            Project Links
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: colors.text.primary,
                  marginBottom: spacing.xs,
                }}
              >
                Lovable Project URL
              </label>
              <input
                type="url"
                placeholder="https://lovable.dev/projects/..."
                value={lovableLink}
                onChange={(e) => setLovableLink(e.target.value)}
                style={{
                  width: '100%',
                  padding: spacing.sm,
                  fontSize: '15px',
                  border: `1px solid ${colors.border.default}`,
                  borderRadius: '4px',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: colors.text.primary,
                  marginBottom: spacing.xs,
                }}
              >
                GitHub Repository URL
              </label>
              <input
                type="url"
                placeholder="https://github.com/username/repo"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                style={{
                  width: '100%',
                  padding: spacing.sm,
                  fontSize: '15px',
                  border: `1px solid ${colors.border.default}`,
                  borderRadius: '4px',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: colors.text.primary,
                  marginBottom: spacing.xs,
                }}
              >
                Live Deployment URL
              </label>
              <input
                type="url"
                placeholder="https://your-app.vercel.app"
                value={deployLink}
                onChange={(e) => setDeployLink(e.target.value)}
                style={{
                  width: '100%',
                  padding: spacing.sm,
                  fontSize: '15px',
                  border: `1px solid ${colors.border.default}`,
                  borderRadius: '4px',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <button
              onClick={handleSaveLinks}
              style={{
                padding: `${spacing.sm} ${spacing.md}`,
                backgroundColor: colors.accent,
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '15px',
                fontWeight: 500,
                cursor: 'pointer',
                marginTop: spacing.sm,
              }}
            >
              Save Links
            </button>
          </div>
        </div>

        {/* Final Submission */}
        <div
          style={{
            backgroundColor: 'white',
            border: `1px solid ${colors.border.default}`,
            borderRadius: '4px',
            padding: spacing.lg,
          }}
        >
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '24px',
              fontWeight: 600,
              color: colors.text.primary,
              marginBottom: spacing.md,
            }}
          >
            Final Submission
          </h2>

          <p
            style={{
              fontSize: '14px',
              color: colors.text.secondary,
              lineHeight: '1.6',
              marginBottom: spacing.md,
            }}
          >
            Copy your submission summary to share with your mentor or save for your records.
          </p>

          <button
            onClick={handleCopySubmission}
            style={{
              width: '100%',
              padding: `${spacing.sm} ${spacing.md}`,
              backgroundColor: copied ? colors.semantic.success : colors.accent,
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing.sm,
            }}
          >
            {copied ? '✓ Copied!' : '📋 Copy Final Submission'}
          </button>
        </div>

        {/* Back to Dashboard */}
        <div style={{ textAlign: 'center', marginTop: spacing.lg }}>
          <a
            href="/"
            style={{
              color: colors.text.secondary,
              textDecoration: 'none',
              fontSize: '14px',
            }}
          >
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}

function getStepSlug(stepNum: number): string {
  const slugs: Record<number, string> = {
    1: 'problem',
    2: 'market',
    3: 'architecture',
    4: 'hld',
    5: 'lld',
    6: 'build',
    7: 'test',
    8: 'ship',
  }
  return slugs[stepNum] || 'problem'
}
