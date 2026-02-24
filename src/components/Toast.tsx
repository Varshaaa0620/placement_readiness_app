import React, { useState, useEffect } from 'react'
import { colors, spacing } from '../styles/designTokens'

export interface ToastProps {
  message: string
  duration?: number
  onDismiss?: () => void
}

/**
 * Toast notification component
 * Auto-dismisses after duration (default 3000ms)
 */
export function Toast({ message, duration = 3000, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onDismiss?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onDismiss])

  if (!isVisible) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: spacing.lg,
        left: spacing.lg,
        backgroundColor: colors.accent,
        color: 'white',
        padding: `${spacing.sm} ${spacing.md}`,
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 500,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 9999,
        animation: 'slideIn 300ms ease-out',
      }}
    >
      {message}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default Toast
