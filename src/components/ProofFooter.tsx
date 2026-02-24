import React, { useState } from 'react'
import { colors, layout, spacing, transitions } from '../styles/designTokens'

export interface ProofCheckpoint {
  id: string
  label: string
  checked: boolean
}

interface ProofFooterProps {
  checkpoints: ProofCheckpoint[]
  onCheckpointToggle?: (id: string, checked: boolean) => void
  onProofSubmit?: (proof: string) => void
}

export const ProofFooter: React.FC<ProofFooterProps> = ({
  checkpoints,
  onCheckpointToggle,
  onProofSubmit,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [proof, setProof] = useState<Record<string, string>>({})

  const handleCheckpointToggle = (id: string) => {
    const checkpoint = checkpoints.find((c) => c.id === id)
    if (checkpoint) {
      onCheckpointToggle?.(id, !checkpoint.checked)
    }
  }

  return (
    <div
      style={{
        borderTop: `1px solid ${colors.border.default}`,
        backgroundColor: colors.bg.subtle,
        padding: spacing.md,
        minHeight: layout.proofFooter.minHeight,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h5
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: colors.text.primary,
            marginBottom: spacing.md,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Proof of Completion
        </h5>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: spacing.sm,
          }}
        >
          {checkpoints.map((checkpoint) => (
            <div key={checkpoint.id}>
              <button
                onClick={() => {
                  handleCheckpointToggle(checkpoint.id)
                  setExpandedId(
                    expandedId === checkpoint.id ? null : checkpoint.id
                  )
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.sm,
                  padding: `${spacing.xs} 0`,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: colors.text.primary,
                  fontWeight: 500,
                  transition: `all ${transitions.base}`,
                  width: '100%',
                  justifyContent: 'flex-start',
                }}
              >
                {/* Checkbox */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20px',
                    height: '20px',
                    border: `2px solid ${checkpoint.checked ? colors.accent : colors.border.default}`,
                    borderRadius: '3px',
                    backgroundColor: checkpoint.checked
                      ? colors.accent
                      : 'transparent',
                    transition: `all ${transitions.base}`,
                  }}
                >
                  {checkpoint.checked && (
                    <span
                      style={{
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      ✓
                    </span>
                  )}
                </div>
                <span>{checkpoint.label}</span>
              </button>

              {/* Expandable proof input */}
              {expandedId === checkpoint.id && checkpoint.checked === false && (
                <div
                  style={{
                    marginLeft: '28px',
                    marginTop: spacing.xs,
                    paddingBottom: spacing.sm,
                  }}
                >
                  <textarea
                    placeholder="Add proof or notes..."
                    value={proof[checkpoint.id] || ''}
                    onChange={(e) => {
                      setProof({
                        ...proof,
                        [checkpoint.id]: e.target.value,
                      })
                    }}
                    style={{
                      width: '100%',
                      padding: spacing.sm,
                      fontSize: '14px',
                      border: `1px solid ${colors.border.default}`,
                      borderRadius: '4px',
                      backgroundColor: 'white',
                      color: colors.text.primary,
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      minHeight: '80px',
                      transition: `all ${transitions.base}`,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = colors.accent
                      e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.accent}20`
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = colors.border.default
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  <button
                    onClick={() => {
                      handleCheckpointToggle(checkpoint.id)
                      setExpandedId(null)
                      onProofSubmit?.(proof[checkpoint.id] || '')
                    }}
                    style={{
                      marginTop: spacing.xs,
                      padding: `${spacing.xs} ${spacing.sm}`,
                      backgroundColor: colors.accent,
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: `all ${transitions.base}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.9'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1'
                    }}
                  >
                    Mark as Complete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

