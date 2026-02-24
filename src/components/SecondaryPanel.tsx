import React, { useState } from 'react'
import { colors, layout, spacing, transitions, borderRadius } from '../styles/designTokens'
import { Card } from './Card'
import { Button } from './Button'
import { Copy, CheckCircle, AlertCircle, Image } from 'lucide-react'

interface SecondaryPanelProps {
  stepExplanation: string
  promptContent: string
  onCopy?: () => void
  onBuild?: () => void
  onSuccess?: () => void
  onError?: () => void
  onScreenshot?: () => void
}

export const SecondaryPanel: React.FC<SecondaryPanelProps> = ({
  stepExplanation,
  promptContent,
  onCopy,
  onBuild,
  onSuccess,
  onError,
  onScreenshot,
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptContent)
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.md,
      }}
    >
      {/* Step Explanation */}
      <Card padding="md">
        <h4
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: colors.text.primary,
            marginBottom: spacing.sm,
          }}
        >
          This Step
        </h4>
        <p
          style={{
            fontSize: '14px',
            lineHeight: '1.6',
            color: colors.text.secondary,
            margin: 0,
          }}
        >
          {stepExplanation}
        </p>
      </Card>

      {/* Copyable Prompt Box */}
      <Card padding="md" variant="subtle">
        <div
          style={{
            marginBottom: spacing.sm,
            fontSize: '12px',
            fontWeight: 600,
            color: colors.text.tertiary,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Prompt to Copy
        </div>
        <div
          style={{
            backgroundColor: 'white',
            border: `1px solid ${colors.border.default}`,
            borderRadius: borderRadius.default,
            padding: spacing.sm,
            marginBottom: spacing.md,
            position: 'relative',
          }}
        >
          <pre
            style={{
              fontSize: '12px',
              lineHeight: '1.5',
              color: colors.text.primary,
              margin: 0,
              overflow: 'auto',
              maxHeight: '200px',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
          >
            {promptContent}
          </pre>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleCopy}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <Copy size={16} />
          {copied ? 'Copied!' : 'Copy Prompt'}
        </Button>
      </Card>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.xs,
        }}
      >
        <Button
          variant="primary"
          size="md"
          onClick={onBuild}
          style={{ width: '100%' }}
        >
          Build in Lovable
        </Button>
        <Button
          variant="secondary"
          size="md"
          onClick={onSuccess}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <CheckCircle size={16} />
          It Worked
        </Button>
        <Button
          variant="secondary"
          size="md"
          onClick={onError}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <AlertCircle size={16} />
          Error
        </Button>
        <Button
          variant="tertiary"
          size="md"
          onClick={onScreenshot}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <Image size={16} />
          Add Screenshot
        </Button>
      </div>
    </div>
  )
}

