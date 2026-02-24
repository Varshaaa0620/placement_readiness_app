'use client'

import React from 'react'
import { colors, spacing } from '../../styles/designTokens'

export default function DigestPage() {
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
          Digest
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: colors.text.secondary,
            lineHeight: '1.8',
            margin: 0,
          }}
        >
          This section will be built in the next step.
        </p>
      </div>
    </div>
  )
}
