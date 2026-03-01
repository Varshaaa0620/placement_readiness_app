'use client'

import React, { useState } from 'react'
import { RBLayout } from '../../../components/RBLayout'
import { colors, spacing } from '../../../styles/designTokens'

export default function ArchitecturePage() {
  const [checkpoints, setCheckpoints] = useState([
    { id: 'rb_step_3_tech', label: 'Select tech stack', checked: false },
    { id: 'rb_step_3_data', label: 'Define data models', checked: false },
    { id: 'rb_step_3_integrations', label: 'Plan AI integrations', checked: false },
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
          System Architecture
        </h2>
        <p
          style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: colors.text.secondary,
            marginBottom: spacing.md,
          }}
        >
          Design the high-level architecture. What technologies? What data flows? What AI integrations?
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
          Recommended Tech Stack
        </h3>
        <div style={{ display: 'grid', gap: spacing.md }}>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: colors.text.primary, marginBottom: spacing.xs }}>
              Frontend
            </h4>
            <p style={{ fontSize: '14px', color: colors.text.secondary, margin: 0 }}>
              React + TypeScript + Tailwind CSS + Vite
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: colors.text.primary, marginBottom: spacing.xs }}>
              Backend
            </h4>
            <p style={{ fontSize: '14px', color: colors.text.secondary, margin: 0 }}>
              Supabase (Auth + Database + Storage)
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: colors.text.primary, marginBottom: spacing.xs }}>
              AI Integration
            </h4>
            <p style={{ fontSize: '14px', color: colors.text.secondary, margin: 0 }}>
              OpenAI GPT-4 / Claude API for content generation
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: colors.text.primary, marginBottom: spacing.xs }}>
              Deployment
            </h4>
            <p style={{ fontSize: '14px', color: colors.text.secondary, margin: 0 }}>
              Vercel (Frontend) + Supabase (Backend)
            </p>
          </div>
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
          Core Data Models
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
{`User
- id, email, name
- subscription_tier
- created_at

Resume
- id, user_id
- title, template_id
- content (JSON)
- ats_score
- created_at, updated_at

Template
- id, name, category
- structure (JSON)
- preview_image

JobDescription
- id, user_id
- company, role
- description_text
- parsed_keywords`}
        </pre>
      </div>
    </div>
  )

  return (
    <RBLayout
      step={3}
      headerTitle="Step 3: System Architecture"
      headerSubtitle="Design the technical foundation. Choose your stack, define data models, and plan AI integrations."
      primaryContent={primaryContent}
      stepExplanation="Select technologies, design data models, and plan how AI will integrate with your system. Document the architecture decisions."
      promptContent={`Design the system architecture for an AI Resume Builder.

Tech Stack Selection:
- Frontend framework and styling
- Backend and database solution
- AI/LLM integration approach
- File storage for exports
- Authentication system

Data Models:
- User entity
- Resume entity
- Template entity
- Job description entity

AI Integration Points:
- Content generation
- ATS optimization
- Keyword extraction
- Improvement suggestions

Create an architecture document with diagrams or clear descriptions of how components interact.`}
      proofCheckpoints={checkpoints}
      onCheckpointToggle={handleCheckpointToggle}
    />
  )
}
