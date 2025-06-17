import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from "react"
import { Input } from './input'

describe('Input', () => {
  it('renders correctly with base styles', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input.className).toContain('flex h-10 w-full rounded-md border')
  })

  it('accepts and merges custom className', () => {
    render(<Input className="custom-class" />)
    const input = screen.getByRole('textbox')
    expect(input.className).toContain('custom-class')
    expect(input.className).toContain('flex h-10') // Base styles should still be there
  })

  it('handles value changes', async () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    const user = userEvent.setup()
    
    await user.type(input, 'test value')
    expect(handleChange).toHaveBeenCalled()
    expect(input).toHaveValue('test value')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('spreads additional props correctly', () => {
    render(<Input data-testid="test-input" aria-label="test input" />)
    const input = screen.getByTestId('test-input')
    expect(input).toHaveAttribute('aria-label', 'test input')
  })
})
