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
          Build a Resume That Gets Read.
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: colors.text.secondary,
            lineHeight: '1.8',
            marginBottom: spacing.xl,
          }}
        >
          AI-powered resume builder designed for modern job seekers.
        </p>
        <Link href="/builder">
          <Button variant="primary" size="md">
            Start Building
          </Button>
        </Link>
      </div>
    </div>
  )
}

