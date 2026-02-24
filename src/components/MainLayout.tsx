import React from 'react'
import { colors, layout, spacing } from '../styles/designTokens'
import { TopBar } from './TopBar'
import { ContextHeader } from './ContextHeader'
import { SecondaryPanel } from './SecondaryPanel'
import { ProofFooter, type ProofCheckpoint } from './ProofFooter'

interface MainLayoutProps {
  projectName: string
  currentStep: number
  totalSteps: number
  status: 'not-started' | 'in-progress' | 'shipped'
  headerTitle: string
  headerSubtitle: string
  primaryContent: React.ReactNode
  stepExplanation: string
  promptContent: string
  proofCheckpoints: ProofCheckpoint[]
  onCheckpointToggle?: (id: string, checked: boolean) => void
  onProofSubmit?: (proof: string) => void
  onCopyPrompt?: () => void
  onBuildInLovable?: () => void
  onSuccess?: () => void
  onError?: () => void
  onScreenshot?: () => void
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  projectName,
  currentStep,
  totalSteps,
  status,
  headerTitle,
  headerSubtitle,
  primaryContent,
  stepExplanation,
  promptContent,
  proofCheckpoints,
  onCheckpointToggle,
  onProofSubmit,
  onCopyPrompt,
  onBuildInLovable,
  onSuccess,
  onError,
  onScreenshot,
}) => {
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
        projectName={projectName}
        currentStep={currentStep}
        totalSteps={totalSteps}
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
            onCopy={onCopyPrompt}
            onBuild={onBuildInLovable}
            onSuccess={onSuccess}
            onError={onError}
            onScreenshot={onScreenshot}
          />
        </div>
      </div>

      {/* Proof Footer */}
      <ProofFooter
        checkpoints={proofCheckpoints}
        onCheckpointToggle={onCheckpointToggle}
        onProofSubmit={onProofSubmit}
      />
    </div>
  )
}

