'use client'

import React, { useState } from 'react'
import { RBLayout } from '../../../components/RBLayout'
import { colors, spacing } from '../../../styles/designTokens'

export default function BuildPage() {
  const [checkpoints, setCheckpoints] = useState([
    { id: 'rb_step_6_setup', label: 'Initialize project', checked: false },
    { id: 'rb_step_6_auth', label: 'Implement authentication', checked: false },
    { id: 'rb_step_6_core', label: 'Build core features', checked: false },
    { id: 'rb_step_6_ai', label: 'Integrate AI', checked: false },
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
          Build Phase
        </h2>
        <p
          style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: colors.text.secondary,
            marginBottom: spacing.md,
          }}
        >
          Time to code. Build the core features, integrate AI, and create a working application.
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
          Build Checklist
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: colors.text.primary, marginBottom: spacing.xs }}>
              1. Project Setup
            </h4>
            <ul style={{ margin: 0, paddingLeft: spacing.md, color: colors.text.secondary, fontSize: '14px' }}>
              <li>Initialize React + TypeScript project</li>
              <li>Set up Tailwind CSS and design system</li>
              <li>Configure Supabase connection</li>
              <li>Set up environment variables</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: colors.text.primary, marginBottom: spacing.xs }}>
              2. Authentication
            </h4>
            <ul style={{ margin: 0, paddingLeft: spacing.md, color: colors.text.secondary, fontSize: '14px' }}>
              <li>Implement sign up / sign in</li>
              <li>Create protected routes</li>
              <li>Set up user profiles</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: colors.text.primary, marginBottom: spacing.xs }}>
              3. Core Features
            </h4>
            <ul style={{ margin: 0, paddingLeft: spacing.md, color: colors.text.secondary, fontSize: '14px' }}>
              <li>Resume editor with sections</li>
              <li>Template system</li>
              <li>PDF export functionality</li>
              <li>Dashboard with resume list</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: colors.text.primary, marginBottom: spacing.xs }}>
              4. AI Integration
            </h4>
            <ul style={{ margin: 0, paddingLeft: spacing.md, color: colors.text.secondary, fontSize: '14px' }}>
              <li>Connect to OpenAI/Claude API</li>
              <li>Implement content generation</li>
              <li>Build ATS analyzer</li>
              <li>Create AI chat interface</li>
            </ul>
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
          Development Commands
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
{`# Initialize project
npm create vite@latest ai-resume-builder -- --template react-ts
cd ai-resume-builder
npm install

# Install dependencies
npm install @supabase/supabase-js
npm install openai
npm install lucide-react
npm install html2canvas jspdf

# Start development
npm run dev

# Build for production
npm run build`}
        </pre>
      </div>
    </div>
  )

  return (
    <RBLayout
      step={6}
      headerTitle="Step 6: Build"
      headerSubtitle="Implement the application. Set up the project, build core features, and integrate AI capabilities."
      primaryContent={primaryContent}
      stepExplanation="Build the application in Lovable or your local environment. Focus on core features first, then add AI capabilities."
      promptContent={`Build an AI Resume Builder application with the following features:

Core Features:
1. User authentication (sign up/sign in)
2. Dashboard showing user's resumes
3. Resume editor with sections:
   - Personal info
   - Work experience
   - Education
   - Skills
   - Projects
4. Template selector (3-5 templates)
5. PDF export functionality

AI Features:
1. AI writing assistant for bullet points
2. Professional summary generator
3. ATS score analyzer
4. Job description keyword matcher

Tech Stack:
- React + TypeScript + Tailwind CSS
- Supabase for auth and database
- OpenAI API for AI features
- Deploy on Vercel

Build the MVP version focusing on core functionality first.`}
      proofCheckpoints={checkpoints}
      onCheckpointToggle={handleCheckpointToggle}
    />
  )
}
