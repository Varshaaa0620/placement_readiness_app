'use client'

import React, { useState, useEffect } from 'react'
import { Input } from '../../components'
import { colors, spacing } from '../../styles/designTokens'
import { UserPreferences, parseCommaSeparated, formatArrayToString } from '../../utils/preferences'

const DEFAULT_PREFERENCES: UserPreferences = {
  roleKeywords: [],
  preferredLocations: [],
  preferredMode: [],
  experienceLevel: '',
  skills: [],
  minMatchScore: 40,
}

export default function SettingsPage() {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES)
  const [isMounted, setIsMounted] = useState(false)

  const modes = ['Remote', 'Hybrid', 'Onsite']
  const experienceLevels = ['Fresher', '0-1', '1-3', '3-5', '5+']
  const locations = [
    'Bangalore',
    'Delhi',
    'Mumbai',
    'Pune',
    'Chennai',
    'Hyderabad',
  ]

  // Load preferences from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('jobTrackerPreferences')
    if (saved) {
      try {
        setPreferences(JSON.parse(saved) as UserPreferences)
      } catch (e) {
        console.error('Error loading preferences:', e)
      }
    }
    setIsMounted(true)
  }, [])

  // Save preferences to localStorage
  const handleSave = () => {
    localStorage.setItem('jobTrackerPreferences', JSON.stringify(preferences))
  }

  const handleRoleKeywordsChange = (value: string) => {
    setPreferences({
      ...preferences,
      roleKeywords: parseCommaSeparated(value),
    })
  }

  const handleSkillsChange = (value: string) => {
    setPreferences({
      ...preferences,
      skills: parseCommaSeparated(value),
    })
  }

  const handleLocationToggle = (location: string) => {
    const newLocations = preferences.preferredLocations.includes(location)
      ? preferences.preferredLocations.filter((l) => l !== location)
      : [...preferences.preferredLocations, location]
    setPreferences({
      ...preferences,
      preferredLocations: newLocations,
    })
  }

  const handleModeToggle = (mode: 'Remote' | 'Hybrid' | 'Onsite') => {
    const newModes = preferences.preferredMode.includes(mode)
      ? preferences.preferredMode.filter((m) => m !== mode)
      : [...preferences.preferredMode, mode]
    setPreferences({
      ...preferences,
      preferredMode: newModes,
    })
  }

  if (!isMounted) return null

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
          Configure your job search criteria to receive intelligent, personalized matches. Your preferences are saved locally and used to score opportunities.
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
            <input
              type="text"
              placeholder="e.g., React Developer, Backend Engineer, DevOps"
              value={formatArrayToString(preferences.roleKeywords)}
              onChange={(e) => handleRoleKeywordsChange(e.target.value)}
              style={{
                width: '100%',
                padding: `${spacing.sm} ${spacing.sm}`,
                fontSize: '16px',
                border: `1px solid ${colors.border.default}`,
                borderRadius: '4px',
                backgroundColor: colors.bg.subtle,
                color: colors.text.primary,
                fontFamily: 'inherit',
              }}
            />
            <p
              style={{
                fontSize: '13px',
                color: colors.text.tertiary,
                marginTop: spacing.xs,
                margin: `${spacing.xs} 0 0 0`,
              }}
            >
              Comma-separated job titles or keywords (e.g., "React, Frontend, UI")
            </p>
          </div>

          {/* Skills */}
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
              Technical Skills
            </label>
            <input
              type="text"
              placeholder="e.g., React, Python, PostgreSQL, Docker"
              value={formatArrayToString(preferences.skills)}
              onChange={(e) => handleSkillsChange(e.target.value)}
              style={{
                width: '100%',
                padding: `${spacing.sm} ${spacing.sm}`,
                fontSize: '16px',
                border: `1px solid ${colors.border.default}`,
                borderRadius: '4px',
                backgroundColor: colors.bg.subtle,
                color: colors.text.primary,
                fontFamily: 'inherit',
              }}
            />
            <p
              style={{
                fontSize: '13px',
                color: colors.text.tertiary,
                marginTop: spacing.xs,
                margin: `${spacing.xs} 0 0 0`,
              }}
            >
              Comma-separated skills you want to work with
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
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: spacing.sm,
              }}
            >
              {locations.map((location) => (
                <label
                  key={location}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.xs,
                    cursor: 'pointer',
                    fontSize: '14px',
                    padding: spacing.xs,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={preferences.preferredLocations.includes(location)}
                    onChange={() => handleLocationToggle(location)}
                    style={{
                      cursor: 'pointer',
                    }}
                  />
                  <span style={{ color: colors.text.primary }}>{location}</span>
                </label>
              ))}
            </div>
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
                gap: spacing.md,
                flexWrap: 'wrap',
              }}
            >
              {modes.map((mode) => (
                <label
                  key={mode}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.xs,
                    cursor: 'pointer',
                    fontSize: '14px',
                    padding: `${spacing.xs} ${spacing.sm}`,
                    border: `1px solid ${preferences.preferredMode.includes(mode as 'Remote' | 'Hybrid' | 'Onsite') ? colors.accent : colors.border.default}`,
                    borderRadius: '4px',
                    backgroundColor: preferences.preferredMode.includes(mode as 'Remote' | 'Hybrid' | 'Onsite')
                      ? colors.bg.subtle
                      : 'transparent',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={preferences.preferredMode.includes(mode as 'Remote' | 'Hybrid' | 'Onsite')}
                    onChange={() => handleModeToggle(mode as 'Remote' | 'Hybrid' | 'Onsite')}
                    style={{
                      cursor: 'pointer',
                    }}
                  />
                  <span style={{ color: colors.text.primary }}>{mode}</span>
                </label>
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
            <select
              value={preferences.experienceLevel}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  experienceLevel: e.target.value,
                })
              }
              style={{
                width: '100%',
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
              <option value="">Any Experience Level</option>
              {experienceLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Min Match Score Slider */}
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
              Minimum Match Score: {preferences.minMatchScore}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={preferences.minMatchScore}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  minMatchScore: parseInt(e.target.value),
                })
              }
              style={{
                width: '100%',
                cursor: 'pointer',
              }}
            />
            <p
              style={{
                fontSize: '13px',
                color: colors.text.tertiary,
                marginTop: spacing.xs,
                margin: `${spacing.xs} 0 0 0`,
              }}
            >
              Only show jobs that score {preferences.minMatchScore}% or higher on intelligent matching
            </p>
          </div>

          {/* Save Button */}
          <button
            type="button"
            onClick={handleSave}
            style={{
              backgroundColor: colors.accent,
              color: 'white',
              border: 'none',
              padding: `${spacing.sm} ${spacing.md}`,
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 500,
              cursor: 'pointer',
              marginTop: spacing.lg,
              transition: 'all 150ms ease-in-out',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '0.9'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '1'
            }}
          >
            Save Preferences
          </button>

          {/* Info Box */}
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
                fontSize: '13px',
                color: colors.text.secondary,
                lineHeight: '1.6',
                margin: 0,
              }}
            >
              <strong>How matching works:</strong> Jobs are scored based on how well they match your preferences. Scores from 0–100 appear as badges on each job card. Use the "Show only matches" toggle on the Dashboard to filter results.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
