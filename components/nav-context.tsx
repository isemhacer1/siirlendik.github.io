'use client'

import { createContext, useContext } from 'react'
import type { Poem } from '@/lib/data'

export type NavValue = {
  openReader: (poem: Poem) => void
  openPoet: (poetId: string) => void
  openTheme: (theme: string) => void
}

export const NavContext = createContext<NavValue | null>(null)

export function useNav() {
  const ctx = useContext(NavContext)
  if (!ctx) throw new Error('useNav must be used within NavContext.Provider')
  return ctx
}

export function formatCount(n: number) {
  if (n >= 1000) {
    const v = n / 1000
    return `${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)}B`
  }
  return String(n)
}
