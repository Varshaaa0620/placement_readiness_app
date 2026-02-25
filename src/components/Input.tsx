import React from 'react'
import { colors, transitions, borderRadius, spacing } from '../styles/designTokens'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  hint?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, size = 'md', className = '', ...props }, ref) => {
    const sizeMap = {
      sm: {
        padding: `${spacing.xs} ${spacing.sm}`,
        fontSize: '14px',
      },
      md: {
        padding: `${spacing.sm} ${spacing.sm}`,
        fontSize: '16px',
      },
      lg: {
        padding: `${spacing.md} ${spacing.sm}`,
        fontSize: '18px',
      },
    }

    const currentSize = sizeMap[size]

    return (
      <div className={className}>
        {label && (
          <label
            style={{
              display: 'block',
              marginBottom: spacing.xs,
              fontSize: '14px',
              fontWeight: 500,
              color: colors.text.primary,
            }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          style={{
            width: '100%',
            padding: currentSize.padding,
            fontSize: currentSize.fontSize,
            fontFamily: 'inherit',
            border: `1px solid ${error ? colors.semantic.error : colors.border.default}`,
            borderRadius: borderRadius.default,
            backgroundColor: colors.bg.subtle,
            color: colors.text.primary,
            transition: `all ${transitions.base}`,
            outline: 'none',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = error ? colors.semantic.error : colors.accent
            e.currentTarget.style.boxShadow = `0 0 0 3px ${error ? colors.semantic.error : colors.accent}20`
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? colors.semantic.error : colors.border.default
            e.currentTarget.style.boxShadow = 'none'
          }}
          {...props}
        />
        {error && (
          <p
            style={{
              marginTop: spacing.xs,
              fontSize: '13px',
              color: colors.semantic.error,
            }}
          >
            {error}
          </p>
        )}
        {hint && !error && (
          <p
            style={{
              marginTop: spacing.xs,
              fontSize: '13px',
              color: colors.text.tertiary,
            }}
          >
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
