'use client'

import React, { useState } from 'react'
import { Input } from '../../components'
import { colors, spacing } from '../../styles/designTokens'

export default function SettingsPage() {
  const [preferences, setPreferences] = useState({
    roleKeywords: '',
    locations: '',
    mode: '',
    experienceLevel: '',
  })

  const modes = ['Remote', 'Hybrid', 'Onsite']
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior', 'Lead']

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
          Job Preferences
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: colors.text.secondary,
            lineHeight: '1.8',
            marginBottom: spacing.lg,
          }}
        >
          Set your job search criteria to receive precision-matched opportunities.
        </p>

        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: spacing.lg,
          }}
        >
          {/* Role Keywords */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: colors.text.primary,
                marginBottom: spacing.sm,
              }}
            >
              Role Keywords
            </label>
            <Input
              placeholder="e.g., Frontend Engineer, Product Designer"
              value={preferences.roleKeywords}
              onChange={(e) =>
                setPreferences({ ...preferences, roleKeywords: e.target.value })
              }
              style={{
                width: '100%',
                padding: `${spacing.sm} ${spacing.sm}`,
                fontSize: '16px',
                border: `1px solid ${colors.border.default}`,
                borderRadius: '4px',
                backgroundColor: colors.bg.subtle,
                color: colors.text.primary,
              }}
            />
            <p
              style={{
                fontSize: '14px',
                color: colors.text.tertiary,
                marginTop: spacing.xs,
                margin: `${spacing.xs} 0 0 0`,
              }}
            >
              Comma-separated job titles or keywords
            </p>
          </div>

          {/* Preferred Locations */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: colors.text.primary,
                marginBottom: spacing.sm,
              }}
            >
              Preferred Locations
            </label>
            <Input
              placeholder="e.g., San Francisco, New York, Remote"
              value={preferences.locations}
              onChange={(e) =>
                setPreferences({ ...preferences, locations: e.target.value })
              }
              style={{
                width: '100%',
                padding: `${spacing.sm} ${spacing.sm}`,
                fontSize: '16px',
                border: `1px solid ${colors.border.default}`,
                borderRadius: '4px',
                backgroundColor: colors.bg.subtle,
                color: colors.text.primary,
              }}
            />
            <p
              style={{
                fontSize: '14px',
                color: colors.text.tertiary,
                marginTop: spacing.xs,
                margin: `${spacing.xs} 0 0 0`,
              }}
            >
              Cities or regions where you want to work
            </p>
          </div>

          {/* Work Mode */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: colors.text.primary,
                marginBottom: spacing.sm,
              }}
            >
              Work Mode
            </label>
            <div
              style={{
                display: 'flex',
                gap: spacing.sm,
                flexWrap: 'wrap',
              }}
            >
              {modes.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() =>
                    setPreferences({ ...preferences, mode })
                  }
                  style={{
                    padding: `${spacing.sm} ${spacing.md}`,
                    border: `1px solid ${preferences.mode === mode ? colors.accent : colors.border.default}`,
                    backgroundColor:
                      preferences.mode === mode
                        ? colors.bg.subtle
                        : colors.background,
                    color:
                      preferences.mode === mode ? colors.accent : colors.text.primary,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500,
                    transition: `all 150ms ease-in-out`,
                  }}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: colors.text.primary,
                marginBottom: spacing.sm,
              }}
            >
              Experience Level
            </label>
            <div
              style={{
                display: 'flex',
                gap: spacing.sm,
                flexWrap: 'wrap',
              }}
            >
              {experienceLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() =>
                    setPreferences({ ...preferences, experienceLevel: level })
                  }
                  style={{
                    padding: `${spacing.sm} ${spacing.md}`,
                    border: `1px solid ${preferences.experienceLevel === level ? colors.accent : colors.border.default}`,
                    backgroundColor:
                      preferences.experienceLevel === level
                        ? colors.bg.subtle
                        : colors.background,
                    color:
                      preferences.experienceLevel === level
                        ? colors.accent
                        : colors.text.primary,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500,
                    transition: `all 150ms ease-in-out`,
                  }}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Note */}
          <div
            style={{
              marginTop: spacing.lg,
              padding: spacing.md,
              backgroundColor: colors.bg.subtle,
              border: `1px solid ${colors.border.subtle}`,
              borderRadius: '4px',
            }}
          >
            <p
              style={{
                fontSize: '14px',
                color: colors.text.secondary,
                lineHeight: '1.6',
                margin: 0,
              }}
            >
              Your preferences help us deliver personalized job matches. Settings are saved automatically as you customize them.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
