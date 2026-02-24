'use client'

import React, { useState, useEffect } from 'react'
import { colors, spacing } from '../../../styles/designTokens'
import {
  TEST_ITEMS,
  getTestChecklistState,
  toggleTestItem,
  getTestsPassed,
  resetTestChecklist,
} from '../../../utils/testChecklist'

export default function TestPage() {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({})
  const [isMounted, setIsMounted] = useState(false)

  // Load checklist from localStorage
  useEffect(() => {
    const state = getTestChecklistState()
    setChecklist(state)
    setIsMounted(true)
  }, [])

  // Handle checkbox toggle
  const handleToggle = (itemId: string) => {
    toggleTestItem(itemId)
    const updatedState = getTestChecklistState()
    setChecklist(updatedState)
  }

  // Handle reset
  const handleReset = () => {
    if (confirm('Reset all test statuses? This action cannot be undone.')) {
      resetTestChecklist()
      setChecklist({})
    }
  }

  if (!isMounted) return null

  const passedCount = getTestsPassed()
  const totalCount = TEST_ITEMS.length
  const allPassed = passedCount === totalCount

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
          maxWidth: '800px',
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
          Test Checklist
        </h1>

        {/* Results Summary */}
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
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: spacing.md,
            }}
          >
            <h2
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '28px',
                fontWeight: 600,
                color: colors.text.primary,
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              Tests Passed: {passedCount} / {totalCount}
            </h2>
            <div
              style={{
                fontSize: '32px',
                fontWeight: 600,
                color: allPassed ? colors.semantic.success : colors.accent,
              }}
            >
              {allPassed ? '✓' : `${totalCount - passedCount} remaining`}
            </div>
          </div>

          {!allPassed && (
            <div
              style={{
                backgroundColor: colors.bg.subtle,
                border: `1px solid ${colors.border.subtle}`,
                borderRadius: '4px',
                padding: spacing.md,
              }}
            >
              <p
                style={{
                  fontSize: '14px',
                  color: colors.text.secondary,
                  margin: 0,
                }}
              >
                ⚠️ Resolve all issues before shipping.
              </p>
            </div>
          )}

          {allPassed && (
            <div
              style={{
                backgroundColor: colors.semantic.success,
                opacity: 0.1,
                border: `1px solid ${colors.semantic.success}`,
                borderRadius: '4px',
                padding: spacing.md,
              }}
            >
              <p
                style={{
                  fontSize: '14px',
                  color: colors.semantic.success,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                ✓ All tests passed! Ready to navigate to Ship Lock.
              </p>
            </div>
          )}
        </div>

        {/* Checklist Items */}
        <div
          style={{
            backgroundColor: 'white',
            border: `1px solid ${colors.border.default}`,
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          {TEST_ITEMS.map((item, index) => (
            <div
              key={item.id}
              style={{
                padding: spacing.md,
                borderBottom:
                  index < TEST_ITEMS.length - 1 ? `1px solid ${colors.border.default}` : 'none',
                display: 'flex',
                gap: spacing.md,
                alignItems: 'flex-start',
              }}
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={checklist[item.id] || false}
                onChange={() => handleToggle(item.id)}
                style={{
                  width: '20px',
                  height: '20px',
                  marginTop: '4px',
                  cursor: 'pointer',
                  accentColor: colors.accent,
                }}
              />

              {/* Label and Tooltip */}
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: checklist[item.id]
                      ? colors.text.secondary
                      : colors.text.primary,
                    cursor: 'pointer',
                    textDecoration: checklist[item.id] ? 'line-through' : 'none',
                    display: 'block',
                    marginBottom: spacing.xs,
                  }}
                  onClick={() => handleToggle(item.id)}
                >
                  {item.label}
                </label>
                <p
                  style={{
                    fontSize: '13px',
                    color: colors.text.tertiary,
                    margin: 0,
                    fontStyle: 'italic',
                  }}
                >
                  💡 {item.tooltip}
                </p>
              </div>

              {/* Status Icon */}
              <span
                style={{
                  fontSize: '20px',
                  marginTop: '2px',
                }}
              >
                {checklist[item.id] ? '✓' : '○'}
              </span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: spacing.md,
            marginTop: spacing.lg,
            justifyContent: 'center',
          }}
        >
          <button
            onClick={handleReset}
            style={{
              backgroundColor: colors.bg.subtle,
              color: colors.text.primary,
              border: `1px solid ${colors.border.subtle}`,
              padding: `${spacing.sm} ${spacing.md}`,
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
            Reset Test Status
          </button>

          <a
            href="/jt/08-ship"
            style={{
              backgroundColor: allPassed ? colors.accent : colors.text.tertiary,
              color: 'white',
              border: 'none',
              padding: `${spacing.sm} ${spacing.md}`,
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: allPassed ? 'pointer' : 'not-allowed',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 150ms ease-in-out',
              opacity: allPassed ? 1 : 0.5,
            }}
            onMouseEnter={(e) => {
              if (allPassed) {
                (e.currentTarget as HTMLAnchorElement).style.opacity = '0.9'
              }
            }}
            onMouseLeave={(e) => {
              if (allPassed) {
                (e.currentTarget as HTMLAnchorElement).style.opacity = '1'
              }
            }}
            onClick={(e) => {
              if (!allPassed) {
                e.preventDefault()
              }
            }}
          >
            Proceed to Ship Lock →
          </a>
        </div>

        {/* Footer Info */}
        <div
          style={{
            marginTop: spacing.lg,
            textAlign: 'center',
            fontSize: '13px',
            color: colors.text.tertiary,
          }}
        >
          <p style={{ margin: 0 }}>
            Complete all 10 tests to unlock the Ship Lock page.
          </p>
        </div>
      </div>
    </div>
  )
}
