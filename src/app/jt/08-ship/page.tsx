'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { colors, spacing } from '../../../styles/designTokens'
import { areAllTestsPassed } from '../../../utils/testChecklist'

export default function ShipPage() {
  const router = useRouter()
  const [isLocked, setIsLocked] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // Check if all tests are passed
  useEffect(() => {
    const allPassed = areAllTestsPassed()
    setIsLocked(!allPassed)
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  if (isLocked) {
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
            maxWidth: '600px',
            textAlign: 'center',
          }}
        >
          {/* Lock Icon */}
          <div
            style={{
              fontSize: '80px',
              marginBottom: spacing.lg,
            }}
          >
            🔒
          </div>

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
              backgroundColor: colors.semantic.error,
              opacity: 0.1,
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
              ❌ Access Denied: All 10 tests must be checked
            </p>
          </div>

          {/* Checklist Preview */}
          <div
            style={{
              backgroundColor: colors.bg.subtle,
              border: `1px solid ${colors.border.subtle}`,
              borderRadius: '4px',
              padding: spacing.md,
              marginBottom: spacing.lg,
              textAlign: 'left',
            }}
          >
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: colors.text.secondary,
                margin: `0 0 ${spacing.md} 0`,
                textTransform: 'uppercase',
              }}
            >
              Required Actions:
            </h3>
            <ul style={{ margin: 0, paddingLeft: spacing.md, fontSize: '14px' }}>
              <li style={{ color: colors.text.secondary, marginBottom: spacing.xs }}>
                Return to the test checklist
              </li>
              <li style={{ color: colors.text.secondary, marginBottom: spacing.xs }}>
                Verify each requirement is met
              </li>
              <li style={{ color: colors.text.secondary, marginBottom: spacing.xs }}>
                Check all 10 test items
              </li>
              <li style={{ color: colors.text.secondary }}>
                This page will unlock automatically
              </li>
            </ul>
          </div>

          <a
            href="/jt/07-test"
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
            ← Back to Test Checklist
          </a>
        </div>
      </div>
    )
  }

  // All tests passed - show ship ready state
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
          maxWidth: '600px',
          textAlign: 'center',
        }}
      >
        {/* Unlock Icon */}
        <div
          style={{
            fontSize: '80px',
            marginBottom: spacing.lg,
          }}
        >
          🚀
        </div>

        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '48px',
            fontWeight: 600,
            color: colors.semantic.success,
            marginBottom: spacing.md,
            letterSpacing: '-0.01em',
          }}
        >
          Ready to Ship
        </h1>

        <p
          style={{
            fontSize: '18px',
            color: colors.text.secondary,
            lineHeight: '1.8',
            marginBottom: spacing.lg,
          }}
        >
          All tests have passed successfully. Your application is ready for production.
        </p>

        <div
          style={{
            backgroundColor: colors.semantic.success,
            opacity: 0.1,
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

        {/* Stats */}
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
              10
            </div>
            <div style={{ fontSize: '13px', color: colors.text.secondary }}>
              Tests Passed
            </div>
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
            <div style={{ fontSize: '13px', color: colors.text.secondary }}>
              Status: Ready
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: colors.bg.subtle,
            border: `1px solid ${colors.border.subtle}`,
            borderRadius: '4px',
            padding: spacing.md,
            marginBottom: spacing.lg,
            textAlign: 'left',
          }}
        >
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: colors.text.secondary,
              margin: `0 0 ${spacing.md} 0`,
              textTransform: 'uppercase',
            }}
          >
            Next Steps:
          </h3>
          <ul style={{ margin: 0, paddingLeft: spacing.md, fontSize: '14px' }}>
            <li style={{ color: colors.text.secondary, marginBottom: spacing.xs }}>
              Deploy to production environment
            </li>
            <li style={{ color: colors.text.secondary, marginBottom: spacing.xs }}>
              Monitor application health
            </li>
            <li style={{ color: colors.text.secondary, marginBottom: spacing.xs }}>
              Gather user feedback
            </li>
            <li style={{ color: colors.text.secondary }}>
              Plan next feature iteration
            </li>
          </ul>
        </div>

        <a
          href="/"
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
          Return to Dashboard
        </a>
      </div>
    </div>
  )
}
