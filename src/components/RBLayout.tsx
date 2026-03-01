'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { colors, layout, spacing } from '../styles/designTokens'
import { TopBar } from './TopBar'
import { ContextHeader } from './ContextHeader'
import { SecondaryPanel } from './SecondaryPanel'
import { ProofFooter, type ProofCheckpoint } from './ProofFooter'
import {
  RBStep,
  canAccessStep,
  markStepArtifactUploaded,
  isArtifactUploaded,
  STEP_LABELS,
} from '../utils/rbStatus'

interface RBLayoutProps {
  step: RBStep
  headerTitle: string
  headerSubtitle: string
  primaryContent: React.ReactNode
  stepExplanation: string
  promptContent: string
  proofCheckpoints: ProofCheckpoint[]
  onCheckpointToggle?: (id: string, checked: boolean) => void
}

export const RBLayout: React.FC<RBLayoutProps> = ({
  step,
  headerTitle,
  headerSubtitle,
  primaryContent,
  stepExplanation,
  promptContent,
  proofCheckpoints,
  onCheckpointToggle,
}) => {
  const router = useRouter()
  const [isLocked, setIsLocked] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [localCheckpoints, setLocalCheckpoints] = useState<ProofCheckpoint[]>(proofCheckpoints)

  useEffect(() => {
    const accessible = canAccessStep(step)
    setIsLocked(!accessible)
    setIsMounted(true)
  }, [step])

  // Update local checkpoints when proofCheckpoints prop changes
  useEffect(() => {
    setLocalCheckpoints(proofCheckpoints)
  }, [proofCheckpoints])

  const handleCheckpointToggle = (id: string, checked: boolean) => {
    const updated = localCheckpoints.map((cp) =>
      cp.id === id ? { ...cp, checked } : cp
    )
    setLocalCheckpoints(updated)
    onCheckpointToggle?.(id, checked)
  }

  const handleSuccess = () => {
    markStepArtifactUploaded(step)
    // Navigate to next step or stay on current
    if (step < 8) {
      const nextRoute = `/rb/0${step + 1}-${getStepSlug(step + 1)}`
      router.push(nextRoute)
    }
  }

  const handleCopyPrompt = () => {
    // Copy handled in SecondaryPanel
  }

  const handleBuildInLovable = () => {
    window.open('https://lovable.dev', '_blank')
  }

  const handleError = () => {
    // Error handling - could show toast or modal
  }

  const handleScreenshot = () => {
    // Screenshot handling
  }

  if (!isMounted) return null

  if (isLocked) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: colors.background,
        }}
      >
        <TopBar
          projectName="AI Resume Builder"
          currentStep={step}
          totalSteps={8}
          status="not-started"
        />
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: spacing.lg,
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '500px' }}>
            <div style={{ fontSize: '64px', marginBottom: spacing.lg }}>🔒</div>
            <h1
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '36px',
                fontWeight: 600,
                color: colors.text.primary,
                marginBottom: spacing.md,
              }}
            >
              Step Locked
            </h1>
            <p
              style={{
                fontSize: '16px',
                color: colors.text.secondary,
                lineHeight: '1.6',
                marginBottom: spacing.lg,
              }}
            >
              Complete the previous step and upload an artifact to unlock this step.
            </p>
            <a
              href={`/rb/0${step - 1}-${getStepSlug(step - 1)}`}
              style={{
                display: 'inline-block',
                backgroundColor: colors.accent,
                color: 'white',
                padding: `${spacing.sm} ${spacing.md}`,
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              ← Back to Previous Step
            </a>
          </div>
        </div>
      </div>
    )
  }

  const artifactUploaded = isArtifactUploaded(step)
  const status: 'not-started' | 'in-progress' | 'shipped' = artifactUploaded
    ? 'shipped'
    : 'in-progress'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: colors.background,
      }}
    >
      {/* Top Bar */}
      <TopBar
        projectName="AI Resume Builder"
        currentStep={step}
        totalSteps={8}
        status={status}
      />

      {/* Context Header */}
      <ContextHeader title={headerTitle} subtitle={headerSubtitle} />

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {/* Primary Workspace (70%) */}
        <div
          style={{
            width: layout.workspace.primaryWidth,
            overflow: 'auto',
            padding: layout.containerPadding,
            backgroundColor: colors.background,
          }}
        >
          {primaryContent}
        </div>

        {/* Divider */}
        <div
          style={{
            width: '1px',
            backgroundColor: colors.border.default,
          }}
        />

        {/* Secondary Panel (30%) */}
        <div
          style={{
            width: layout.workspace.secondaryWidth,
            overflow: 'auto',
            padding: layout.containerPadding,
            backgroundColor: 'white',
            borderLeft: `1px solid ${colors.border.default}`,
          }}
        >
          <SecondaryPanel
            stepExplanation={stepExplanation}
            promptContent={promptContent}
            onCopy={handleCopyPrompt}
            onBuild={handleBuildInLovable}
            onSuccess={handleSuccess}
            onError={handleError}
            onScreenshot={handleScreenshot}
          />
        </div>
      </div>

      {/* Proof Footer */}
      <ProofFooter
        checkpoints={localCheckpoints}
        onCheckpointToggle={handleCheckpointToggle}
      />
    </div>
  )
}

function getStepSlug(stepNum: number): string {
  const slugs: Record<number, string> = {
    1: 'problem',
    2: 'market',
    3: 'architecture',
    4: 'hld',
    5: 'lld',
    6: 'build',
    7: 'test',
    8: 'ship',
  }
  return slugs[stepNum] || 'problem'
}
