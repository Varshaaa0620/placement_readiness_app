export type ResumeLayout = 'classic' | 'modern' | 'minimal'

export interface ColorTheme {
  name: string
  hue: number
  saturation: number
  lightness: number
  hsl: string
}

export const colorThemes: ColorTheme[] = [
  { name: 'Teal', hue: 168, saturation: 60, lightness: 40, hsl: 'hsl(168, 60%, 40%)' },
  { name: 'Navy', hue: 220, saturation: 60, lightness: 35, hsl: 'hsl(220, 60%, 35%)' },
  { name: 'Burgundy', hue: 345, saturation: 60, lightness: 35, hsl: 'hsl(345, 60%, 35%)' },
  { name: 'Forest', hue: 150, saturation: 50, lightness: 30, hsl: 'hsl(150, 50%, 30%)' },
  { name: 'Charcoal', hue: 0, saturation: 0, lightness: 25, hsl: 'hsl(0, 0%, 25%)' },
]

export const defaultLayout: ResumeLayout = 'classic'
export const defaultColorTheme = colorThemes[0]

const LAYOUT_STORAGE_KEY = 'resumeBuilderLayout'
const COLOR_STORAGE_KEY = 'resumeBuilderColor'

export function getStoredLayout(): ResumeLayout {
  if (typeof window === 'undefined') return defaultLayout
  const stored = localStorage.getItem(LAYOUT_STORAGE_KEY)
  if (stored === 'classic' || stored === 'modern' || stored === 'minimal') {
    return stored
  }
  return defaultLayout
}

export function setStoredLayout(layout: ResumeLayout): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(LAYOUT_STORAGE_KEY, layout)
}

export function getStoredColorTheme(): ColorTheme {
  if (typeof window === 'undefined') return defaultColorTheme
  const stored = localStorage.getItem(COLOR_STORAGE_KEY)
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      const found = colorThemes.find(
        (t) => t.name === parsed.name && t.hue === parsed.hue
      )
      if (found) return found
    } catch {
      // Fall through to default
    }
  }
  return defaultColorTheme
}

export function setStoredColorTheme(theme: ColorTheme): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(COLOR_STORAGE_KEY, JSON.stringify(theme))
}

export function generateColorVariations(baseTheme: ColorTheme) {
  const { hue, saturation, lightness } = baseTheme
  return {
    primary: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
    primaryLight: `hsl(${hue}, ${saturation}%, ${lightness + 15}%)`,
    primaryDark: `hsl(${hue}, ${saturation}%, ${lightness - 10}%)`,
    primaryMuted: `hsl(${hue}, ${saturation - 20}%, ${lightness + 25}%)`,
    sidebarBg: `hsl(${hue}, ${saturation - 30}%, ${lightness + 45}%)`,
  }
}
