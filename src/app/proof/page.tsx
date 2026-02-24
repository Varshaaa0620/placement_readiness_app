'use client'

import React from 'react'
import { colors, spacing } from '../../styles/designTokens'

export default function ProofPage() {
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
          Artifact Collection
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: colors.text.secondary,
            lineHeight: '1.8',
            margin: 0,
          }}
        >
          Your profile, resume, and portfolio links will be managed here.
        </p>
      </div>
    </div>
  )
}
