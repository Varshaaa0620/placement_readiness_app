'use client'

import React, { useState } from 'react'
import { RBLayout } from '../../../components/RBLayout'
import { colors, spacing } from '../../../styles/designTokens'

export default function LLDPage() {
  const [checkpoints, setCheckpoints] = useState([
    { id: 'rb_step_5_api', label: 'Design API contracts', checked: false },
    { id: 'rb_step_5_ui', label: 'Define UI components', checked: false },
    { id: 'rb_step_5_ai', label: 'Document AI prompts', checked: false },
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
          Low-Level Design
        </h2>
        <p
          style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: colors.text.secondary,
            marginBottom: spacing.md,
          }}
        >
          Detail the API contracts, component props, and AI prompts. Ready for implementation.
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
          API Endpoints
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
{`GET    /api/resumes           - List user resumes
POST   /api/resumes           - Create new resume
GET    /api/resumes/:id       - Get resume details
PUT    /api/resumes/:id       - Update resume
DELETE /api/resumes/:id       - Delete resume

POST   /api/resumes/:id/ai    - AI content generation
POST   /api/ats/analyze       - ATS score analysis
POST   /api/jobs/parse        - Parse job description

GET    /api/templates         - List templates
GET    /api/templates/:id     - Get template details`}
        </pre>
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
          Key UI Components
        </h3>
        <div style={{ display: 'grid', gap: spacing.md }}>
          {[
            { name: 'ResumeEditor', props: 'resume, onChange, template' },
            { name: 'TemplateSelector', props: 'templates, selected, onSelect' },
            { name: 'AIChat', props: 'messages, onSend, loading' },
            { name: 'ATSAnalyzer', props: 'resume, jobDescription, score' },
            { name: 'SectionBuilder', props: 'type, content, onUpdate' },
            { name: 'ExportModal', props: 'resume, formats, onExport' },
          ].map((comp) => (
            <div
              key={comp.name}
              style={{
                padding: spacing.sm,
                backgroundColor: colors.bg.subtle,
                borderRadius: '4px',
              }}
            >
              <span style={{ fontWeight: 500, color: colors.text.primary }}>{comp.name}</span>
              <span style={{ color: colors.text.secondary, fontSize: '13px', marginLeft: spacing.sm }}>
                ({comp.props})
              </span>
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
          AI Prompt Templates
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
{`// Improve bullet point
"Rewrite this work experience bullet to be more impactful:
{bullet}

Make it action-oriented, quantifiable, and ATS-friendly."

// Generate summary
"Write a professional summary for a {role} with {years} years 
of experience in {skills}. Keep it under 50 words."

// ATS optimization
"Analyze this resume against this job description:
Resume: {resume}
Job: {jobDescription}

Identify missing keywords and suggest improvements."`}
        </pre>
      </div>
    </div>
  )

  return (
    <RBLayout
      step={5}
      headerTitle="Step 5: Low-Level Design"
      headerSubtitle="Define API contracts, component specifications, and AI prompts. Get ready to build."
      primaryContent={primaryContent}
      stepExplanation="Document API endpoints, define component props and interfaces, and create AI prompt templates."
      promptContent={`Create a low-level design document for an AI Resume Builder.

API Design:
- RESTful endpoint specifications
- Request/response schemas
- Authentication requirements
- Error handling patterns

Component Specifications:
- Props interfaces for each component
- State management approach
- Event handlers and callbacks

AI Integration:
- Prompt templates for different use cases
- Response parsing logic
- Error handling for AI failures
- Rate limiting considerations

Database Schema:
- Detailed field definitions
- Relationships between entities
- Indexes and constraints

Create detailed technical specifications ready for implementation.`}
      proofCheckpoints={checkpoints}
      onCheckpointToggle={handleCheckpointToggle}
    />
  )
}
