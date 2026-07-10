'use client'

import { Bookmark } from 'lucide-react'
import { useApp } from '@/components/app-context'
import { PoemCard } from '@/components/poem-card'

export function SavedView() {
  const { poems, savedIds } = useApp()
  const saved = poems.filter((p) => savedIds.includes(p.id))

  return (
    <div className="space-y-5 px-4 py-5">
      <h2 className="font-serif text-xl font-semibold text-foreground">Kaydedilenler</h2>

      {saved.length > 0 ? (
        <div className="space-y-4">
          {saved.map((poem) => (
            <PoemCard key={poem.id} poem={poem} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Bookmark className="size-5" />
          </div>
          <p className="font-serif text-lg font-medium text-foreground">Henüz bir şey yok</p>
          <p className="max-w-xs text-sm text-muted-foreground">
            Beğendiğin şiirleri kaydet, sana ait bir defter oluştur.
          </p>
        </div>
      )}
    </div>
  )
}
