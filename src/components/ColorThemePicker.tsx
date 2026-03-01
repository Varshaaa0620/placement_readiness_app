'use client'

import React from 'react'
import { ColorTheme, colorThemes } from '../types/resumeTheme'
import { colors } from '../styles/designTokens'

interface ColorThemePickerProps {
  currentTheme: ColorTheme
  onThemeChange: (theme: ColorTheme) => void
}

export function ColorThemePicker({ currentTheme, onThemeChange }: ColorThemePickerProps) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: colors.text.primary,
          marginBottom: '12px',
        }}
      >
        Color Theme
      </h3>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {colorThemes.map((theme) => {
          const isActive = currentTheme.name === theme.name
          return (
            <button
              key={theme.name}
              onClick={() => onThemeChange(theme)}
              title={theme.name}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: theme.hsl,
                border: `3px solid ${isActive ? '#333' : 'transparent'}`,
                boxShadow: isActive ? '0 0 0 2px white, 0 0 0 4px #333' : 'none',
                cursor: 'pointer',
                padding: 0,
                position: 'relative',
              }}
            >
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: theme.lightness > 50 ? '#333' : '#fff',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}
                >
                  ✓
                </span>
              )}
            </button>
          )
        })}
      </div>
      <div
        style={{
          marginTop: '8px',
          fontSize: '13px',
          color: colors.text.secondary,
        }}
      >
        {currentTheme.name}
      </div>
    </div>
  )
}
