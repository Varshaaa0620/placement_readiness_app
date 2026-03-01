'use client'

import React, { useState } from 'react'
import { RBLayout } from '../../../components/RBLayout'
import { colors, spacing } from '../../../styles/designTokens'

export default function HLDPage() {
  const [checkpoints, setCheckpoints] = useState([
    { id: 'rb_step_4_pages', label: 'Define page structure', checked: false },
    { id: 'rb_step_4_flow', label: 'Map user flows', checked: false },
    { id: 'rb_step_4_components', label: 'Identify key components', checked: false },
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
          High-Level Design
        </h2>
        <p
          style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: colors.text.secondary,
            marginBottom: spacing.md,
          }}
        >
          Map out the pages, user flows, and key components. What screens exist? How do users navigate?
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
          Page Structure
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
          {[
            { page: 'Landing', purpose: 'Marketing + Sign up' },
            { page: 'Dashboard', purpose: 'Resume list + Quick actions' },
            { page: 'Editor', purpose: 'Resume creation/editing' },
            { page: 'Templates', purpose: 'Browse and select templates' },
            { page: 'AI Assistant', purpose: 'Chat-based improvements' },
            { page: 'ATS Check', purpose: 'Score and optimize' },
            { page: 'Settings', purpose: 'Profile and preferences' },
          ].map((item) => (
            <div
              key={item.page}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: `${spacing.sm} ${spacing.md}`,
                backgroundColor: colors.bg.subtle,
                borderRadius: '4px',
              }}
            >
              <span style={{ fontWeight: 500, color: colors.text.primary }}>{item.page}</span>
              <span style={{ color: colors.text.secondary, fontSize: '14px' }}>{item.purpose}</span>
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
          Key User Flows
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: colors.text.primary, marginBottom: spacing.xs }}>
              Flow 1: Create Resume from Scratch
            </h4>
            <p style={{ fontSize: '14px', color: colors.text.secondary, margin: 0 }}>
              Dashboard → Select Template → Editor → AI Enhance → Export
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: colors.text.primary, marginBottom: spacing.xs }}>
              Flow 2: Optimize for Job
            </h4>
            <p style={{ fontSize: '14px', color: colors.text.secondary, margin: 0 }}>
              Paste Job Description → AI Analysis → Keyword Suggestions → Apply Changes
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: colors.text.primary, marginBottom: spacing.xs }}>
              Flow 3: Import & Improve
            </h4>
            <p style={{ fontSize: '14px', color: colors.text.secondary, margin: 0 }}>
              Upload PDF → Parse Content → AI Suggestions → Edit → Export
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <RBLayout
      step={4}
      headerTitle="Step 4: High-Level Design"
      headerSubtitle="Map out pages, user flows, and component hierarchy. Create the blueprint for your application."
      primaryContent={primaryContent}
      stepExplanation="Define all pages, map key user flows, and identify shared components. Create wireframes or flow diagrams."
      promptContent={`Create a high-level design for an AI Resume Builder application.

Page Structure:
- List all pages/screens needed
- Define purpose of each page
- Show navigation between pages

User Flows:
1. New user creates first resume
2. User optimizes resume for specific job
3. User imports existing resume
4. User exports and shares resume

Key Components:
- Navigation components
- Form components
- AI interaction components
- Preview components
- Export components

Create a HLD document with page descriptions and user flow diagrams.`}
      proofCheckpoints={checkpoints}
      onCheckpointToggle={handleCheckpointToggle}
    />
  )
}
