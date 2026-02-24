import React from 'react'
import { colors, borderRadius, spacing } from '../styles/designTokens'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md'
  children: React.ReactNode
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', className = '', ...props }, ref) => {
    const variantStyles = {
      default: {
        backgroundColor: colors.bg.subtle,
        color: colors.text.primary,
        borderColor: colors.border.subtle,
      },
      success: {
        backgroundColor: colors.semantic.success,
        color: 'white',
        borderColor: colors.semantic.success,
      },
      warning: {
        backgroundColor: colors.semantic.warning,
        color: 'white',
        borderColor: colors.semantic.warning,
      },
      error: {
        backgroundColor: colors.semantic.error,
        color: 'white',
        borderColor: colors.semantic.error,
      },
    }

    const sizeMap = {
      sm: {
        padding: `4px 12px`,
        fontSize: '12px',
      },
      md: {
        padding: `6px 16px`,
        fontSize: '13px',
      },
    }

    const style = variantStyles[variant]
    const sizeStyle = sizeMap[size]

    return (
      <span
        ref={ref}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: sizeStyle.padding,
          fontSize: sizeStyle.fontSize,
          fontWeight: 500,
          borderRadius: borderRadius.lg,
          border: `1px solid ${style.borderColor}`,
          backgroundColor: style.backgroundColor,
          color: style.color,
          whiteSpace: 'nowrap',
        }}
        className={className}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'
