/**
 * KodNest Premium Design System
 * Design Tokens
 * 
 * Philosophy: Calm, Intentional, Coherent, Confident
 * Everything must feel like one mind designed it.
 */

export const colors = {
  background: '#F7F6F3',
  text: {
    primary: '#111111',
    secondary: '#666666',
    tertiary: '#999999',
  },
  accent: '#8B0000',
  semantic: {
    success: '#4B7C59',
    warning: '#B8860B',
    error: '#8B0000',
  },
  border: {
    default: '#E5E4E0',
    subtle: '#D4D3CF',
  },
  bg: {
    subtle: '#FAFAF8',
    overlay: 'rgba(0, 0, 0, 0.05)',
  },
} as const

export const spacing = {
  '2xs': '4px',
  'xs': '8px',
  'sm': '16px',
  'md': '24px',
  'lg': '40px',
  'xl': '64px',
} as const

export const typography = {
  font: {
    serif: 'Georgia, serif',
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  heading: {
    h1: {
      size: '48px',
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
      weight: 600,
    },
    h2: {
      size: '36px',
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
      weight: 600,
    },
    h3: {
      size: '28px',
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
      weight: 600,
    },
    h4: {
      size: '20px',
      lineHeight: '1.4',
      weight: 500,
    },
  },
  body: {
    default: {
      size: '16px',
      lineHeight: '1.8',
      weight: 400,
    },
    large: {
      size: '18px',
      lineHeight: '1.8',
      weight: 400,
    },
    small: {
      size: '14px',
      lineHeight: '1.4',
      weight: 400,
    },
  },
} as const

export const borderRadius = {
  none: '0',
  sm: '3px',
  default: '4px',
  md: '4px',
  lg: '6px',
} as const

export const shadows = {
  none: 'none',
  subtle: '0 1px 2px rgba(0, 0, 0, 0.05)',
  card: '0 1px 3px rgba(0, 0, 0, 0.08)',
} as const

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const

export const layout = {
  topBar: {
    height: '56px',
  },
  contextHeader: {
    padding: '40px',
  },
  workspace: {
    primaryWidth: '70%',
    secondaryWidth: '30%',
    gap: '24px',
  },
  proofFooter: {
    height: 'auto',
    minHeight: '80px',
  },
  containerPadding: '24px',
} as const

export const breakpoints = {
  sm: '640px',
  md: '1024px',
  lg: '1280px',
} as const
