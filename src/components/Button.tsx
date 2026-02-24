import React from 'react'
import { colors, transitions, borderRadius, spacing } from '../styles/designTokens'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, className = '', disabled, ...props }, ref) => {
    const baseStyles = `
      font-sans font-500 border-none rounded-[${borderRadius.default}] 
      cursor-pointer transition-all ${transitions.base}
      disabled:opacity-60 disabled:cursor-not-allowed
      focus-visible:outline-2 focus-visible:outline-offset-2
    `

    const variantStyles = {
      primary: `
        bg-[${colors.accent}] text-white
        hover:opacity-90 focus-visible:outline-[${colors.accent}]
      `,
      secondary: `
        bg-transparent border-2 border-[${colors.accent}] text-[${colors.accent}]
        hover:bg-[${colors.accent}] hover:text-white
        focus-visible:outline-[${colors.accent}]
      `,
      tertiary: `
        bg-[${colors.bg.subtle}] text-[${colors.text.primary}]
        border border-[${colors.border.subtle}]
        hover:bg-[${colors.border.subtle}]
        focus-visible:outline-[${colors.accent}]
      `,
    }

    const sizeStyles = {
      sm: `px-${spacing.sm} py-2 text-sm`,
      md: `px-${spacing.sm} py-3 text-base`,
      lg: `px-${spacing.md} py-4 text-lg`,
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        style={{
          backgroundColor:
            variant === 'primary'
              ? colors.accent
              : variant === 'tertiary'
                ? colors.bg.subtle
                : 'transparent',
          color: variant === 'primary' ? 'white' : colors.text.primary,
          border: variant === 'secondary' ? `2px solid ${colors.accent}` : variant === 'tertiary' ? `1px solid ${colors.border.subtle}` : 'none',
          borderRadius: borderRadius.default,
          padding: size === 'sm' ? `8px 16px` : size === 'md' ? `12px 16px` : `16px 24px`,
          fontSize: size === 'sm' ? '14px' : size === 'md' ? '16px' : '18px',
          transition: `all ${transitions.base}`,
          opacity: disabled || isLoading ? 0.6 : 1,
          cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        }}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Loading...
          </span>
        ) : (
          props.children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
