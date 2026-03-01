'use client'

import React, { useState } from 'react'
import { RBLayout } from '../../../components/RBLayout'
import { colors, spacing } from '../../../styles/designTokens'

export default function ProblemPage() {
  const [checkpoints, setCheckpoints] = useState([
    { id: 'rb_step_1_problem', label: 'Define the core problem statement', checked: false },
    { id: 'rb_step_1_users', label: 'Identify target users', checked: false },
    { id: 'rb_step_1_value', label: 'Articulate value proposition', checked: false },
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
          Problem Definition
        </h2>
        <p
          style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: colors.text.secondary,
            marginBottom: spacing.md,
          }}
        >
          Define the core problem your AI Resume Builder will solve. Who struggles with resume creation?
          What pain points exist in current solutions?
        </p>
        <div
          style={{
            backgroundColor: colors.bg.subtle,
            border: `1px solid ${colors.border.subtle}`,
            borderRadius: '4px',
            padding: spacing.md,
          }}
        >
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: colors.text.primary,
              marginBottom: spacing.sm,
            }}
          >
            Key Questions to Answer:
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: spacing.md,
              color: colors.text.secondary,
              fontSize: '14px',
              lineHeight: '1.8',
            }}
          >
            <li>What makes resume writing difficult for job seekers?</li>
            <li>Which industries or roles have the most trouble?</li>
            <li>What do existing tools get wrong?</li>
            <li>How can AI improve the experience?</li>
          </ul>
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
          Output Format
        </h3>
        <p
          style={{
            fontSize: '14px',
            color: colors.text.secondary,
            lineHeight: '1.6',
            marginBottom: spacing.md,
          }}
        >
          Document your findings in a structured format:
        </p>
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
{`## Problem Statement
[Clear 1-2 sentence problem definition]

## Target Users
[Who experiences this problem]

## Current Pain Points
[What's broken today]

## Opportunity
[How AI can help]`}
        </pre>
      </div>
    </div>
  )

  return (
    <RBLayout
      step={1}
      headerTitle="Step 1: Problem Definition"
      headerSubtitle="Define the core problem your AI Resume Builder will solve. Understanding the pain points is the foundation of a successful product."
      primaryContent={primaryContent}
      stepExplanation="Document the problem statement, identify target users, and articulate the value proposition. This step sets the foundation for everything that follows."
      promptContent={`Create a comprehensive problem definition document for an AI Resume Builder application.

Focus on:
1. Core problem: Why do job seekers struggle with resume creation?
2. Target users: Who benefits most from AI-assisted resume building?
3. Pain points: What's wrong with current solutions?
4. AI opportunity: How can AI specifically improve the experience?

Format your output as a structured markdown document with clear sections.`}
      proofCheckpoints={checkpoints}
      onCheckpointToggle={handleCheckpointToggle}
    />
  )
}
