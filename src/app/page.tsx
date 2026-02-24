'use client'

import { useState } from 'react'
import { MainLayout } from '../components'
import { Card } from '../components'
import { spacing, colors } from '../styles/designTokens'

export default function Home() {
  const [proofCheckpoints, setProofCheckpoints] = useState([
    { id: 'ui', label: 'UI Built', checked: false },
    { id: 'logic', label: 'Logic Working', checked: false },
    { id: 'test', label: 'Test Passed', checked: false },
    { id: 'deploy', label: 'Deployed', checked: false },
  ])

  const handleCheckpointToggle = (id: string, checked: boolean) => {
    setProofCheckpoints(
      proofCheckpoints.map((checkpoint) =>
        checkpoint.id === id ? { ...checkpoint, checked } : checkpoint
      )
    )
  }

  const handleProofSubmit = (proof: string) => {
    console.log('Proof submitted:', proof)
  }

  return (
    <MainLayout
      projectName="KodNest Premium"
      currentStep={1}
      totalSteps={5}
      status="in-progress"
      headerTitle="Design System Foundation"
      headerSubtitle="Build your application with precision. Everything is intentional, coherent, and confident."
      primaryContent={
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: spacing.md,
          }}
        >
          {/* Component Showcase Cards */}
          <Card padding="lg">
            <h3
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '28px',
                fontWeight: 600,
                marginBottom: spacing.md,
                color: colors.text.primary,
              }}
            >
              KodNest Premium Build System
            </h3>
            <p style={{ color: colors.text.secondary, lineHeight: '1.8' }}>
              A professional SaaS design system built on principles of calm,
              intention, and coherence. This system emphasizes whitespace,
              typography, and a focused color palette.
            </p>
          </Card>

          {/* Design Principles */}
          <Card padding="lg">
            <h4
              style={{
                fontSize: '20px',
                fontWeight: 600,
                marginBottom: spacing.md,
                color: colors.text.primary,
              }}
            >
              Design Principles
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: spacing.md,
              }}
            >
              {[
                { title: 'Calm', desc: 'No unnecessary noise or distraction' },
                {
                  title: 'Intentional',
                  desc: 'Every element serves a purpose',
                },
                {
                  title: 'Coherent',
                  desc: 'Consistent patterns everywhere',
                },
                {
                  title: 'Confident',
                  desc: 'Professional and assured',
                },
              ].map((principle, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: spacing.md,
                    backgroundColor: colors.bg.subtle,
                    borderRadius: '4px',
                    border: `1px solid ${colors.border.subtle}`,
                  }}
                >
                  <h6
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: colors.text.primary,
                      marginBottom: spacing.xs,
                    }}
                  >
                    {principle.title}
                  </h6>
                  <p
                    style={{
                      fontSize: '14px',
                      color: colors.text.secondary,
                      margin: 0,
                    }}
                  >
                    {principle.desc}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Color System */}
          <Card padding="lg">
            <h4
              style={{
                fontSize: '20px',
                fontWeight: 600,
                marginBottom: spacing.md,
                color: colors.text.primary,
              }}
            >
              Color System
            </h4>
            <p
              style={{
                fontSize: '14px',
                color: colors.text.secondary,
                marginBottom: spacing.md,
              }}
            >
              Maximum 4 colors for a unified, professional appearance.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: spacing.md,
              }}
            >
              {[
                {
                  name: 'Background',
                  hex: '#F7F6F3',
                  color: '#F7F6F3',
                },
                {
                  name: 'Primary Text',
                  hex: '#111111',
                  color: '#111111',
                },
                {
                  name: 'Accent (Deep Red)',
                  hex: '#8B0000',
                  color: '#8B0000',
                },
                {
                  name: 'Success',
                  hex: '#4B7C59',
                  color: '#4B7C59',
                },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: spacing.sm }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '4px',
                      backgroundColor: item.color,
                      border: `1px solid ${colors.border.default}`,
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: colors.text.primary,
                        margin: 0,
                        marginBottom: '4px',
                      }}
                    >
                      {item.name}
                    </p>
                    <code
                      style={{
                        fontSize: '12px',
                        color: colors.text.secondary,
                        fontFamily: 'monospace',
                      }}
                    >
                      {item.hex}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Spacing Scale */}
          <Card padding="lg">
            <h4
              style={{
                fontSize: '20px',
                fontWeight: 600,
                marginBottom: spacing.md,
                color: colors.text.primary,
              }}
            >
              Spacing Scale
            </h4>
            <p
              style={{
                fontSize: '14px',
                color: colors.text.secondary,
                marginBottom: spacing.md,
              }}
            >
              Consistent spacing system ensures visual harmony.
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.sm,
              }}
            >
              {[
                { name: '8px', value: '8px' },
                { name: '16px', value: '16px' },
                { name: '24px', value: '24px' },
                { name: '40px', value: '40px' },
                { name: '64px', value: '64px' },
              ].map((item, idx) => (
                <div key={idx}>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: colors.text.secondary,
                      marginBottom: '4px',
                    }}
                  >
                    {item.name}
                  </p>
                  <div
                    style={{
                      backgroundColor: colors.accent,
                      height: item.value,
                      width: '100%',
                      borderRadius: '2px',
                    }}
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Typography */}
          <Card padding="lg">
            <h4
              style={{
                fontSize: '20px',
                fontWeight: 600,
                marginBottom: spacing.md,
                color: colors.text.primary,
              }}
            >
              Typography
            </h4>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.lg,
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: colors.text.secondary,
                    textTransform: 'uppercase',
                    marginBottom: spacing.sm,
                  }}
                >
                  Heading (Serif)
                </p>
                <h1
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '48px',
                    margin: 0,
                  }}
                >
                  The Quick Brown Fox
                </h1>
              </div>
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: colors.text.secondary,
                    textTransform: 'uppercase',
                    marginBottom: spacing.sm,
                  }}
                >
                  Body (Sans-serif, 16px)
                </p>
                <p
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.8',
                    margin: 0,
                  }}
                >
                  The body text is set at 16-18px with generous line-height of
                  1.6–1.8. This ensures excellent readability and a calm reading
                  experience across all devices.
                </p>
              </div>
            </div>
          </Card>

          {/* Layout Structure */}
          <Card padding="lg">
            <h4
              style={{
                fontSize: '20px',
                fontWeight: 600,
                marginBottom: spacing.md,
                color: colors.text.primary,
              }}
            >
              Layout Structure
            </h4>
            <p
              style={{
                fontSize: '14px',
                color: colors.text.secondary,
                marginBottom: spacing.md,
              }}
            >
              Every page follows a consistent, predictable structure:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                '📌 Top Bar: Project name, progress, status',
                '📝 Context Header: Title and purpose statement',
                '🔄 Workspace (70% + 30%): Main content + secondary info',
                '✅ Proof Footer: Checklist for completion tracking',
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: spacing.sm,
                    backgroundColor: colors.bg.subtle,
                    borderRadius: '4px',
                    fontSize: '14px',
                    color: colors.text.primary,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      }
      stepExplanation="This step introduces the KodNest Premium Build System. Review the design principles, color palette, spacing scale, typography, and layout structure that form the foundation of this professional SaaS design system."
      promptContent={`You are designing a premium SaaS application called "KodNest Premium Build System".

Design Philosophy:
- Calm, Intentional, Coherent, Confident
- Professional, not playful
- No gradients, glassmorphism, neon, or animation noise

Color System (max 4 colors):
- Background: #F7F6F3 (off-white)
- Primary Text: #111111
- Accent: #8B0000 (deep red)
- Success: #4B7C59 (muted green)

Spacing Scale: 8px, 16px, 24px, 40px, 64px
Typography: Serif for headings (Georgia), Sans-serif for body (Inter/System)
Transitions: 150-200ms, ease-in-out, no bounce

Create a component that embodies these principles.`}
      proofCheckpoints={proofCheckpoints}
      onCheckpointToggle={handleCheckpointToggle}
      onProofSubmit={handleProofSubmit}
      onCopyPrompt={() => console.log('Prompt copied')}
      onBuildInLovable={() => console.log('Opening Lovable')}
      onSuccess={() => console.log('Marked as success')}
      onError={() => console.log('Marked as error')}
      onScreenshot={() => console.log('Adding screenshot')}
    />
  )
}
