'use client'

import React from 'react'
import { ResumeNav } from '../../components/ResumeNav'
import { colors, spacing } from '../../styles/designTokens'

export default function ProofPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.background }}>
      <ResumeNav />
      
      <div
        style={{
          padding: spacing.lg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 57px)',
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
            Proof of Work
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: colors.text.secondary,
              lineHeight: '1.8',
              margin: 0,
            }}
          >
            Artifacts and evidence of your resume building process will be collected here.
          </p>
        </div>
      </div>
    </div>
  )
}
