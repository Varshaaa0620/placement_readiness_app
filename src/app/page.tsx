'use client'

import Link from 'next/link'
import { Button } from '../components'
import { spacing, colors } from '../styles/designTokens'

export default function Home() {
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
            fontSize: '56px',
            fontWeight: 600,
            color: colors.text.primary,
            marginBottom: spacing.md,
            letterSpacing: '-0.01em',
            lineHeight: '1.3',
          }}
        >
          Stop Missing The Right Jobs.
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: colors.text.secondary,
            lineHeight: '1.8',
            marginBottom: spacing.xl,
          }}
        >
          Precision-matched job discovery delivered daily at 9AM.
        </p>
        <Link href="/settings">
          <Button variant="primary" size="md">
            Start Tracking
          </Button>
        </Link>
      </div>
    </div>
  )
}

