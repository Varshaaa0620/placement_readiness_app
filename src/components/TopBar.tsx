import React from 'react'
import { colors, layout, spacing, transitions } from '../styles/designTokens'
import { Badge } from './Badge'

interface TopBarProps {
  projectName: string
  currentStep: number
  totalSteps: number
  status: 'not-started' | 'in-progress' | 'shipped'
}

export const TopBar: React.FC<TopBarProps> = ({
  projectName,
  currentStep,
  totalSteps,
  status,
}) => {
  const statusConfig = {
    'not-started': { label: 'Not Started', variant: 'default' as const },
    'in-progress': { label: 'In Progress', variant: 'warning' as const },
    'shipped': { label: 'Shipped', variant: 'success' as const },
  }

  const statusInfo = statusConfig[status]

  return (
    <div
      style={{
        height: layout.topBar.height,
        backgroundColor: 'white',
        borderBottom: `1px solid ${colors.border.default}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: spacing.md,
        paddingRight: spacing.md,
        transition: `all ${transitions.base}`,
      }}
    >
      {/* Left: Project Name */}
      <div>
        <h6
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: colors.text.primary,
            margin: 0,
          }}
        >
          {projectName}
        </h6>
      </div>

      {/* Center: Progress Indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing.sm,
          fontSize: '14px',
          color: colors.text.secondary,
        }}
      >
        <span>
          Step {currentStep} / {totalSteps}
        </span>
        <div
          style={{
            width: '100px',
            height: '4px',
            backgroundColor: colors.border.subtle,
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${(currentStep / totalSteps) * 100}%`,
              height: '100%',
              backgroundColor: colors.accent,
              transition: `width ${transitions.base}`,
            }}
          />
        </div>
      </div>

      {/* Right: Status Badge */}
      <Badge variant={statusInfo.variant} size="md">
        {statusInfo.label}
      </Badge>
    </div>
  )
}

