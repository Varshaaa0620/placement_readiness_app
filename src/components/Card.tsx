import React from 'react'
import { colors, shadows, borderRadius, spacing } from '../styles/designTokens'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  padding?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'subtle'
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ padding = 'md', variant = 'default', className = '', ...props }, ref) => {
    const paddingMap = {
      sm: spacing.sm,
      md: spacing.md,
      lg: spacing.lg,
    }

    const variantStyles = {
      default: {
        backgroundColor: 'white',
        borderColor: colors.border.default,
      },
      subtle: {
        backgroundColor: colors.bg.subtle,
        borderColor: colors.border.subtle,
      },
    }

    const style = variantStyles[variant]

    return (
      <div
        ref={ref}
        style={{
          backgroundColor: style.backgroundColor,
          border: `1px solid ${style.borderColor}`,
          borderRadius: borderRadius.default,
          padding: paddingMap[padding],
          boxShadow: shadows.card,
        }}
        className={`transition-all duration-200 ${className}`}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'
