import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('should combine class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
    expect(cn('foo', undefined)).toBe('foo')
    expect(cn('foo', null)).toBe('foo')
    expect(cn('foo', { bar: true })).toBe('foo bar')
    expect(cn('foo', { bar: false })).toBe('foo')
    expect(cn({ 'foo-bar': true })).toBe('foo-bar')
    expect(cn({ 'foo-bar': false })).toBe('')
    expect(cn('foo', 'bar', 'baz')).toBe('foo bar baz')
  })
})
