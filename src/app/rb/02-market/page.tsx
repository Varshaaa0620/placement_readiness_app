'use client'

import React, { useState } from 'react'
import { RBLayout } from '../../../components/RBLayout'
import { colors, spacing } from '../../../styles/designTokens'

export default function MarketPage() {
  const [checkpoints, setCheckpoints] = useState([
    { id: 'rb_step_2_competitors', label: 'Analyze 3-5 competitors', checked: false },
    { id: 'rb_step_2_gaps', label: 'Identify market gaps', checked: false },
    { id: 'rb_step_2_differentiation', label: 'Define differentiation strategy', checked: false },
  ])

  const handleCheckpointToggle = (id: string, checked: boolean) => {
    setCheckpoints((prev) =>
      prev.map((cp) => (cp.id === id ? { ...cp, checked } : cp))
    )
  }

  const primaryContent = (
    <div>
      <div
        style={{
          backgroundColor: 'white',
          border: `1px solid ${colors.border.default}`,
          borderRadius: '4px',
          padding: spacing.lg,
          marginBottom: spacing.lg,
        }}
      >
        <h2
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '28px',
            fontWeight: 600,
            color: colors.text.primary,
            marginBottom: spacing.md,
          }}
        >
          Market Research
        </h2>
        <p
          style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: colors.text.secondary,
            marginBottom: spacing.md,
          }}
        >
          Analyze the competitive landscape. What exists? What is missing? Where can your AI Resume Builder win?
        </p>
      </div>

      <div
        style={{
          backgroundColor: 'white',
          border: `1px solid ${colors.border.default}`,
          borderRadius: '4px',
          padding: spacing.lg,
          marginBottom: spacing.lg,
        }}
      >
        <h3
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '20px',
            fontWeight: 600,
            color: colors.text.primary,
            marginBottom: spacing.md,
          }}
        >
          Competitors to Analyze
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
          {[
            { name: 'Resume.io', focus: 'Template-based builder' },
            { name: 'Zety', focus: 'Guided resume creation' },
            { name: 'Teal', focus: 'Job tracking + resume' },
            { name: 'Rezi', focus: 'ATS optimization' },
            { name: 'Kickresume', focus: 'AI writer integration' },
          ].map((comp) => (
            <div
              key={comp.name}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: spacing.sm,
                backgroundColor: colors.bg.subtle,
                borderRadius: '4px',
              }}
            >
              <span style={{ fontWeight: 500, color: colors.text.primary }}>{comp.name}</span>
              <span style={{ color: colors.text.secondary, fontSize: '14px' }}>{comp.focus}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          backgroundColor: 'white',
          border: `1px solid ${colors.border.default}`,
          borderRadius: '4px',
          padding: spacing.lg,
        }}
      >
        <h3
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '20px',
            fontWeight: 600,
            color: colors.text.primary,
            marginBottom: spacing.md,
          }}
        >
          Research Framework
        </h3>
        <pre
          style={{
            backgroundColor: colors.bg.subtle,
            padding: spacing.md,
            borderRadius: '4px',
            fontSize: '13px',
            overflow: 'auto',
            color: colors.text.primary,
          }}
        >
{`## Competitor Analysis

### [Competitor Name]
- Strengths: 
- Weaknesses:
- Pricing:
- Target Audience:

## Market Gaps
1. [Gap 1]
2. [Gap 2]
3. [Gap 3]

## Our Differentiation
[What makes us unique]`}
        </pre>
      </div>
    </div>
  )

  return (
    <RBLayout
      step={2}
      headerTitle="Step 2: Market Research"
      headerSubtitle="Analyze competitors, identify market gaps, and define your unique positioning in the AI resume builder space."
      primaryContent={primaryContent}
      stepExplanation="Research 3-5 competitors, identify what they do well and where they fall short. Find the gaps your product can fill."
      promptContent={`Conduct market research for an AI Resume Builder application.

Research these competitors:
1. Resume.io - Template-based approach
2. Zety - Guided resume creation
3. Teal - Job tracking + resume builder
4. Rezi - ATS-focused optimization
5. Kickresume - AI writing features

For each competitor, analyze:
- Core features and strengths
- Pricing model
- Target audience
- Weaknesses and gaps

Identify 3 market gaps that your AI Resume Builder could fill.
Define your differentiation strategy.`}
      proofCheckpoints={checkpoints}
      onCheckpointToggle={handleCheckpointToggle}
    />
  )
}
