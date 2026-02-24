'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { colors, spacing, transitions } from '../styles/designTokens'

export const Navigation: React.FC = () => {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Saved', href: '/saved' },
    { label: 'Digest', href: '/digest' },
    { label: 'Settings', href: '/settings' },
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
          KodNest
        </Link>

        {/* Desktop Navigation */}
        <div
          style={{
            gap: spacing.md,
            alignItems: 'center',
            display: 'flex',
          }}
          className="hidden md:flex"
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
                  transition: `all ${transitions.base}`,
                  cursor: 'pointer',
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            color: colors.text.primary,
          }}
          className="md:hidden"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: colors.bg.subtle,
            borderTop: `1px solid ${colors.border.subtle}`,
            padding: spacing.sm,
            gap: spacing.xs,
          }}
          className="md:hidden"
        >
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: active ? colors.accent : colors.text.primary,
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: active ? 500 : 400,
                  padding: `${spacing.xs} ${spacing.sm}`,
                  borderLeft: active ? `3px solid ${colors.accent}` : 'none',
                  paddingLeft: active ? `calc(${spacing.sm} - 3px)` : spacing.sm,
                  transition: `all ${transitions.base}`,
                  display: 'block',
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}

export default Navigation
