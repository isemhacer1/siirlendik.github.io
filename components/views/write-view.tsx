'use client'

import { useState } from 'react'
import { Check, PenLine } from 'lucide-react'
import { useApp } from '@/components/app-context'
import { themes } from '@/lib/data'
import { cn } from '@/lib/utils'

export function WriteView({ onPublished }: { onPublished: () => void }) {
  const { addPoem } = useApp()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [theme, setTheme] = useState<string>(themes[0])
  const [done, setDone] = useState(false)

  const canPublish = body.trim().length > 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canPublish) return
    addPoem({ title, body, theme })
    setDone(true)
    setTitle('')
    setBody('')
    setTheme(themes[0])
    setTimeout(() => {
      setDone(false)
      onPublished()
    }, 900)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 px-4 py-5">
      <div className="flex items-center gap-2">
        <PenLine className="size-5 text-primary" />
        <h2 className="font-serif text-xl font-semibold text-foreground">Yeni Şiir</h2>
      </div>

      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-foreground">
          Başlık
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Şiirine bir isim ver"
          className="w-full rounded-xl border border-border bg-card px-3 py-2.5 font-serif text-lg text-foreground outline-none placeholder:font-sans placeholder:text-base placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
        />
      </div>

      <div>
        <label htmlFor="body" className="mb-1.5 block text-sm font-medium text-foreground">
          Dizeler
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={9}
          placeholder={'Kalbinden geçenleri yaz...\nHer satır bir dize.'}
          className="w-full resize-none rounded-xl border border-border bg-card px-3 py-3 font-serif text-[15px] leading-relaxed text-foreground outline-none placeholder:font-sans placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
        />
        <p className="mt-1.5 text-right text-xs text-muted-foreground">
          {body.trim().length} karakter
        </p>
      </div>

      <div>
        <span className="mb-2 block text-sm font-medium text-foreground">Tema</span>
        <div className="flex flex-wrap gap-2">
          {themes.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTheme(t)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                theme === t
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground',
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={!canPublish}
        className={cn(
          'flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors',
          done
            ? 'bg-primary text-primary-foreground'
            : canPublish
              ? 'bg-primary text-primary-foreground hover:opacity-90'
              : 'cursor-not-allowed bg-secondary text-muted-foreground',
        )}
      >
        {done ? (
          <>
            <Check className="size-4" /> Yayımlandı
          </>
        ) : (
          'Yayımla'
        )}
      </button>
    </form>
  )
}
