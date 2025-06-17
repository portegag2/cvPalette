import { describe, it, expect } from 'vitest'
import { cvThemes } from './themes'

describe('CV Themes', () => {
  it('contains classic theme with required properties', () => {
    expect(cvThemes.classic).toBeDefined()
    expect(Array.isArray(cvThemes.classic)).toBe(true)
    
    const defaultTheme = cvThemes.classic.find(theme => theme.id === 'default')
    expect(defaultTheme).toBeDefined()
    expect(defaultTheme).toEqual({
      id: 'default',
      label: 'Profesional',
      primary: '#111827',
      secondary: '#374151',
      accent: '#9CA3AF',
    })
  })

  it('contains valid hexadecimal color codes for all themes', () => {
    const isValidHexColor = (color: string) => /^#[0-9A-Fa-f]{6}$/.test(color)
    
    cvThemes.classic.forEach(theme => {
      expect(isValidHexColor(theme.primary)).toBe(true)
      expect(isValidHexColor(theme.secondary)).toBe(true)
      expect(isValidHexColor(theme.accent)).toBe(true)
      // Additional check to make error messages clearer
      if (!isValidHexColor(theme.primary) || !isValidHexColor(theme.secondary) || !isValidHexColor(theme.accent)) {
        console.error(`Invalid colors in theme ${theme.id}:`, { primary: theme.primary, secondary: theme.secondary, accent: theme.accent })
      }
    })
  })

  it('has unique IDs across all classic themes', () => {
    const ids = cvThemes.classic.map(theme => theme.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('has meaningful labels for all themes', () => {
    cvThemes.classic.forEach(theme => {
      expect(theme.label).toBeTruthy()
      expect(typeof theme.label).toBe('string')
      expect(theme.label.length).toBeGreaterThan(0)
    })
  })
})
