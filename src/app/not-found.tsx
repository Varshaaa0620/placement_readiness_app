'use client'

import React from 'react'
import Link from 'next/link'
import { colors, spacing } from '../styles/designTokens'
import { Button } from '../components'

export default function NotFound() {
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
          margin: '0 auto',
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
          Page Not Found
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: colors.text.secondary,
            lineHeight: '1.8',
            marginBottom: spacing.lg,
          }}
        >
          The page you are looking for does not exist.
        </p>
        <Link href="/dashboard">
          <Button variant="primary" size="md">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
