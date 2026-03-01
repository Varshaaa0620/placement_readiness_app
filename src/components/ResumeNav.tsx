'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { colors, spacing } from '../styles/designTokens'

export const ResumeNav: React.FC = () => {
  const pathname = usePathname()

  const navItems = [
    { label: 'Builder', href: '/builder' },
    { label: 'Preview', href: '/preview' },
    { label: 'Proof', href: '/proof' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <nav
      style={{
        backgroundColor: 'white',
        borderBottom: `1px solid ${colors.border.default}`,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: `${spacing.sm} ${spacing.md}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo/Home */}
        <Link
          href="/"
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: colors.text.primary,
            textDecoration: 'none',
            fontFamily: 'Georgia, serif',
            letterSpacing: '-0.01em',
          }}
        >
          AI Resume Builder
        </Link>

        {/* Navigation */}
        <div
          style={{
            display: 'flex',
            gap: spacing.md,
            alignItems: 'center',
          }}
        >
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color: active ? colors.accent : colors.text.primary,
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: active ? 500 : 400,
                  borderBottom: active ? `2px solid ${colors.accent}` : 'none',
                  paddingBottom: '4px',
                  transition: 'all 150ms ease',
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
