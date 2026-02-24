import React from 'react'
import { colors, layout, spacing } from '../styles/designTokens'

interface ContextHeaderProps {
  title: string
  subtitle: string
}

export const ContextHeader: React.FC<ContextHeaderProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div
      style={{
        padding: layout.contextHeader.padding,
        borderBottom: `1px solid ${colors.border.default}`,
        backgroundColor: 'white',
      }}
    >
      <h1
        style={{
          fontSize: '48px',
          fontFamily: 'Georgia, serif',
          fontWeight: 600,
          lineHeight: '1.3',
          color: colors.text.primary,
          marginBottom: spacing.sm,
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: '16px',
          color: colors.text.secondary,
          lineHeight: '1.6',
          margin: 0,
          maxWidth: '720px',
        }}
      >
        {subtitle}
      </p>
    </div>
  )
}
