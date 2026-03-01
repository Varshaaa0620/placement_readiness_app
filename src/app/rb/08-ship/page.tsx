'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { colors, spacing } from '../../../styles/designTokens'
import { RBLayout } from '../../../components/RBLayout'
import {
  canAccessStep,
  markStepArtifactUploaded,
  areAllStepsCompleted,
  getCompletedStepsCount,
} from '../../../utils/rbStatus'

const STORAGE_KEY = 'rb_test_checklist'

function areAllTestsPassed(): boolean {
  if (typeof window === 'undefined') return false
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return false
  try {
    const state = JSON.parse(stored)
    return Object.values(state).filter(Boolean).length === 10
  } catch {
    return false
  }
}

export default function ShipPage() {
  const router = useRouter()
  const [isLocked, setIsLocked] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [deployUrl, setDeployUrl] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const accessible = canAccessStep(8)
    const testsPassed = areAllTestsPassed()
    setIsLocked(!accessible || !testsPassed)
    setIsMounted(true)
  }, [])

  const handleShip = () => {
    if (deployUrl) {
      markStepArtifactUploaded(8)
      setShowSuccess(true)
    }
  }

  if (!isMounted) return null

  if (isLocked) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: colors.background,
        }}
      >
        <div
          style={{
            height: '56px',
            backgroundColor: 'white',
            borderBottom: `1px solid ${colors.border.default}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: spacing.md,
            paddingRight: spacing.md,
          }}
        >
          <h6 style={{ fontSize: '14px', fontWeight: 600, color: colors.text.primary, margin: 0 }}>
            AI Resume Builder
          </h6>
          <div style={{ fontSize: '14px', color: colors.text.secondary }}>Step 8 / 8</div>
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 500,
              backgroundColor: colors.text.tertiary + '20',
              color: colors.text.tertiary,
            }}
          >
            Locked
          </span>
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: spacing.lg,
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '600px' }}>
            <div style={{ fontSize: '80px', marginBottom: spacing.lg }}>🔒</div>
            <h1
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '48px',
                fontWeight: 600,
                color: colors.text.primary,
                marginBottom: spacing.md,
              }}
            >
              Ship Lock Active
            </h1>
            <p
              style={{
                fontSize: '18px',
                color: colors.text.secondary,
                lineHeight: '1.8',
                marginBottom: spacing.lg,
              }}
            >
              Complete all tests before shipping.
            </p>

            <div
              style={{
                backgroundColor: colors.semantic.error + '15',
                border: `2px solid ${colors.semantic.error}`,
                borderRadius: '4px',
                padding: spacing.md,
                marginBottom: spacing.lg,
              }}
            >
              <p
                style={{
                  fontSize: '16px',
                  color: colors.semantic.error,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                ❌ Access Denied: All 10 tests must be passed
              </p>
            </div>

            <a
              href="/rb/07-test"
              style={{
                display: 'inline-block',
                backgroundColor: colors.accent,
                color: 'white',
                padding: `${spacing.sm} ${spacing.md}`,
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '16px',
              }}
            >
              ← Back to Test Checklist
            </a>
          </div>
        </div>
      </div>
    )
  }

  if (showSuccess) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: colors.background,
        }}
      >
        <div
          style={{
            height: '56px',
            backgroundColor: 'white',
            borderBottom: `1px solid ${colors.border.default}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: spacing.md,
            paddingRight: spacing.md,
          }}
        >
          <h6 style={{ fontSize: '14px', fontWeight: 600, color: colors.text.primary, margin: 0 }}>
            AI Resume Builder
          </h6>
          <div style={{ fontSize: '14px', color: colors.text.secondary }}>Step 8 / 8</div>
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 500,
              backgroundColor: colors.semantic.success + '20',
              color: colors.semantic.success,
            }}
          >
            Shipped
          </span>
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: spacing.lg,
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '600px' }}>
            <div style={{ fontSize: '80px', marginBottom: spacing.lg }}>🚀</div>
            <h1
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '48px',
                fontWeight: 600,
                color: colors.semantic.success,
                marginBottom: spacing.md,
              }}
            >
              Successfully Shipped!
            </h1>
            <p
              style={{
                fontSize: '18px',
                color: colors.text.secondary,
                lineHeight: '1.8',
                marginBottom: spacing.lg,
              }}
            >
              Your AI Resume Builder is now live and ready for users.
            </p>

            <div
              style={{
                backgroundColor: colors.semantic.success + '15',
                border: `2px solid ${colors.semantic.success}`,
                borderRadius: '4px',
                padding: spacing.md,
                marginBottom: spacing.lg,
              }}
            >
              <p
                style={{
                  fontSize: '16px',
                  color: colors.semantic.success,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                ✓ All Quality Gates Passed
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: spacing.md,
                marginBottom: spacing.lg,
              }}
            >
              <div
                style={{
                  backgroundColor: 'white',
                  border: `1px solid ${colors.border.default}`,
                  borderRadius: '4px',
                  padding: spacing.md,
                }}
              >
                <div
                  style={{
                    fontSize: '32px',
                    fontWeight: 600,
                    color: colors.accent,
                    marginBottom: spacing.xs,
                  }}
                >
                  8
                </div>
                <div style={{ fontSize: '13px', color: colors.text.secondary }}>Steps Completed</div>
              </div>
              <div
                style={{
                  backgroundColor: 'white',
                  border: `1px solid ${colors.border.default}`,
                  borderRadius: '4px',
                  padding: spacing.md,
                }}
              >
                <div
                  style={{
                    fontSize: '32px',
                    fontWeight: 600,
                    color: colors.semantic.success,
                    marginBottom: spacing.xs,
                  }}
                >
                  ✓
                </div>
                <div style={{ fontSize: '13px', color: colors.text.secondary }}>Status: Live</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: spacing.md, justifyContent: 'center' }}>
              <a
                href={deployUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  backgroundColor: colors.accent,
                  color: 'white',
                  padding: `${spacing.sm} ${spacing.md}`,
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '16px',
                }}
              >
                View Live App →
              </a>
              <a
                href="/rb/proof"
                style={{
                  display: 'inline-block',
                  backgroundColor: 'white',
                  color: colors.text.primary,
                  border: `1px solid ${colors.border.default}`,
                  padding: `${spacing.sm} ${spacing.md}`,
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '16px',
                }}
              >
                Go to Proof Page
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const primaryContent = (
    <div>
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
            fontSize: '28px',
            fontWeight: 600,
            color: colors.text.primary,
            marginBottom: spacing.md,
          }}
        >
          Ship Your Application
        </h2>
        <p
          style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: colors.text.secondary,
            marginBottom: spacing.md,
          }}
        >
          Deploy your AI Resume Builder to production. All tests have passed - you're ready to ship!
        </p>
      </div>

      <div
        style={{
          backgroundColor: 'white',
          border: `1px solid ${colors.border.default}`,
          borderRadius: '4px',
          padding: spacing.lg,
          marginBottom: spacing.lg,
        }}
      >
        <h3
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '20px',
            fontWeight: 600,
            color: colors.text.primary,
            marginBottom: spacing.md,
          }}
        >
          Deployment Checklist
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
          {[
            'Deploy frontend to Vercel',
            'Verify Supabase production settings',
            'Set production environment variables',
            'Test on production URL',
            'Verify AI API keys work',
            'Check PDF export in production',
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.sm,
                padding: spacing.sm,
                backgroundColor: colors.bg.subtle,
                borderRadius: '4px',
              }}
            >
              <span style={{ color: colors.semantic.success }}>✓</span>
              <span style={{ color: colors.text.primary }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          backgroundColor: 'white',
          border: `1px solid ${colors.border.default}`,
          borderRadius: '4px',
          padding: spacing.lg,
        }}
      >
        <h3
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '20px',
            fontWeight: 600,
            color: colors.text.primary,
            marginBottom: spacing.md,
          }}
        >
          Enter Deployment URL
        </h3>
        <input
          type="url"
          placeholder="https://your-app.vercel.app"
          value={deployUrl}
          onChange={(e) => setDeployUrl(e.target.value)}
          style={{
            width: '100%',
            padding: spacing.sm,
            fontSize: '16px',
            border: `1px solid ${colors.border.default}`,
            borderRadius: '4px',
            marginBottom: spacing.md,
            fontFamily: 'inherit',
          }}
        />
        <button
          onClick={handleShip}
          disabled={!deployUrl}
          style={{
            width: '100%',
            padding: `${spacing.sm} ${spacing.md}`,
            backgroundColor: deployUrl ? colors.semantic.success : colors.text.tertiary,
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 500,
            cursor: deployUrl ? 'pointer' : 'not-allowed',
          }}
        >
          🚀 Ship Application
        </button>
      </div>
    </div>
  )

  return (
    <RBLayout
      step={8}
      headerTitle="Step 8: Ship"
      headerSubtitle="Deploy your AI Resume Builder to production. Enter your deployment URL to complete the build track."
      primaryContent={primaryContent}
      stepExplanation="Deploy to Vercel or your preferred platform. Enter the live URL to mark this step complete and finish the build track."
      promptContent={`Ship the AI Resume Builder application.

Deployment Steps:
1. Build for production: npm run build
2. Deploy to Vercel
3. Set environment variables in production
4. Verify all features work on production URL
5. Test authentication flow
6. Verify AI features work
7. Test PDF export

Enter the production URL to complete the ship step.`}
      proofCheckpoints={[
        { id: 'rb_step_8_deployed', label: 'Deployed to production', checked: false },
        { id: 'rb_step_8_tested', label: 'Verified on live URL', checked: false },
      ]}
    />
  )
}
