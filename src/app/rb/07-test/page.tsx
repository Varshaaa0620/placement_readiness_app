'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { colors, spacing } from '../../../styles/designTokens'
import { RBLayout } from '../../../components/RBLayout'

interface TestItem {
  id: string
  label: string
  tooltip: string
}

const TEST_ITEMS: TestItem[] = [
  {
    id: 'rb_test_auth',
    label: 'Authentication works',
    tooltip: 'Users can sign up, sign in, and sign out',
  },
  {
    id: 'rb_test_create',
    label: 'Create resume',
    tooltip: 'Users can create a new resume from scratch',
  },
  {
    id: 'rb_test_edit',
    label: 'Edit resume sections',
    tooltip: 'All sections (experience, education, skills) are editable',
  },
  {
    id: 'rb_test_templates',
    label: 'Template selection',
    tooltip: 'Users can browse and select different templates',
  },
  {
    id: 'rb_test_ai_content',
    label: 'AI content generation',
    tooltip: 'AI can generate and improve resume content',
  },
  {
    id: 'rb_test_ats',
    label: 'ATS analyzer',
    tooltip: 'ATS score and optimization suggestions work',
  },
  {
    id: 'rb_test_export',
    label: 'PDF export',
    tooltip: 'Resumes can be exported as PDF',
  },
  {
    id: 'rb_test_responsive',
    label: 'Responsive design',
    tooltip: 'App works on mobile, tablet, and desktop',
  },
  {
    id: 'rb_test_performance',
    label: 'Performance acceptable',
    tooltip: 'Pages load in under 3 seconds',
  },
  {
    id: 'rb_test_errors',
    label: 'Error handling',
    tooltip: 'Graceful error messages and recovery',
  },
]

const STORAGE_KEY = 'rb_test_checklist'

function getTestChecklistState(): Record<string, boolean> {
  if (typeof window === 'undefined') return {}
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return {}
  try {
    return JSON.parse(stored)
  } catch {
    return {}
  }
}

function toggleTestItem(itemId: string): void {
  const state = getTestChecklistState()
  state[itemId] = !state[itemId]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function getTestsPassed(): number {
  const state = getTestChecklistState()
  return Object.values(state).filter(Boolean).length
}

function areAllTestsPassed(): boolean {
  return getTestsPassed() === TEST_ITEMS.length
}

function resetTestChecklist(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export default function TestPage() {
  const router = useRouter()
  const [checklist, setChecklist] = useState<Record<string, boolean>>({})
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const state = getTestChecklistState()
    setChecklist(state)
    setIsMounted(true)
  }, [])

  const handleToggle = (itemId: string) => {
    toggleTestItem(itemId)
    setChecklist(getTestChecklistState())
  }

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
          Test Checklist
        </h2>
        <p
          style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: colors.text.secondary,
            marginBottom: spacing.md,
          }}
        >
          Verify all functionality works correctly before shipping. Complete all tests to unlock the Ship step.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: spacing.md,
            backgroundColor: allPassed ? colors.semantic.success + '15' : colors.bg.subtle,
            border: `1px solid ${allPassed ? colors.semantic.success : colors.border.subtle}`,
            borderRadius: '4px',
          }}
        >
          <span style={{ fontSize: '18px', fontWeight: 600, color: colors.text.primary }}>
            Tests Passed: {passedCount} / {totalCount}
          </span>
          <span
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: allPassed ? colors.semantic.success : colors.accent,
            }}
          >
            {allPassed ? '✓ All Passed' : `${totalCount - passedCount} remaining`}
          </span>
        </div>
      </div>

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
              backgroundColor: checklist[item.id] ? colors.bg.subtle : 'white',
            }}
          >
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
            <div style={{ flex: 1 }}>
              <label
                style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: checklist[item.id] ? colors.text.secondary : colors.text.primary,
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
                {item.tooltip}
              </p>
            </div>
            <span style={{ fontSize: '20px' }}>{checklist[item.id] ? '✓' : '○'}</span>
          </div>
        ))}
      </div>

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
          }}
        >
          Reset Tests
        </button>

        <a
          href="/rb/08-ship"
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
            opacity: allPassed ? 1 : 0.5,
          }}
          onClick={(e) => {
            if (!allPassed) {
              e.preventDefault()
            }
          }}
        >
          Proceed to Ship →
        </a>
      </div>
    </div>
  )

  return (
    <RBLayout
      step={7}
      headerTitle="Step 7: Test"
      headerSubtitle="Run through the complete test checklist. All tests must pass before shipping."
      primaryContent={primaryContent}
      stepExplanation="Test all functionality: authentication, resume creation, AI features, ATS analyzer, and export. Check off each test as you verify it works."
      promptContent={`Test the AI Resume Builder application thoroughly.

Test Checklist:
1. Authentication - Sign up, sign in, sign out all work
2. Resume creation - Can create new resume
3. Section editing - All fields editable
4. Templates - Can switch between templates
5. AI content - AI generates relevant content
6. ATS analyzer - Provides score and suggestions
7. PDF export - Downloads work correctly
8. Responsive - Works on all screen sizes
9. Performance - Loads quickly
10. Error handling - Graceful error messages

Document any bugs found and fix them before proceeding to ship.`}
      proofCheckpoints={[
        { id: 'rb_step_7_tested', label: 'Completed test checklist', checked: allPassed },
      ]}
    />
  )
}
