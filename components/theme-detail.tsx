'use client'

import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useApp } from '@/components/app-context'
import { PoemCard } from '@/components/poem-card'

export function ThemeDetail({ theme, onClose }: { theme: string; onClose: () => void }) {
  const { poems } = useApp()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const themePoems = poems.filter((p) => p.theme === theme)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${theme} teması`}
      className="fixed inset-0 z-40 flex flex-col bg-background"
    >
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
        <button
          type="button"
          onClick={onClose}
          className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary"
          aria-label="Geri"
        >
          <ArrowLeft className="size-5" />
        </button>
        <span className="font-serif text-base font-semibold text-foreground">Tema</span>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-xl px-4 py-6">
          <div className="rounded-2xl bg-primary px-6 py-8 text-primary-foreground">
            <p className="text-xs font-medium uppercase tracking-widest opacity-80">Tema</p>
            <h1 className="mt-1 font-serif text-3xl font-semibold">{theme}</h1>
            <p className="mt-2 text-sm opacity-90">
              {themePoems.length} şiir · {new Set(themePoems.map((p) => p.poetId)).size} şair
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {themePoems.length > 0 ? (
              themePoems.map((poem) => <PoemCard key={poem.id} poem={poem} />)
            ) : (
              <p className="rounded-xl border border-dashed border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
                Bu temada henüz şiir yok.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
