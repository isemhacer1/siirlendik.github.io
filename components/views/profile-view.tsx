'use client'

import { PenLine } from 'lucide-react'
import { useApp } from '@/components/app-context'
import { PoemCard } from '@/components/poem-card'

export function ProfileView({ onWrite }: { onWrite: () => void }) {
  const { poems, savedIds, likedIds, followedPoets } = useApp()
  const myPoems = poems.filter((p) => p.poetId === 'sen')

  const stats = [
    { label: 'Şiir', value: myPoems.length },
    { label: 'Kayıtlı', value: savedIds.length },
    { label: 'Beğeni', value: likedIds.length },
    { label: 'Takip', value: followedPoets.length },
  ]

  return (
    <div className="space-y-6 px-4 py-5">
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-6 py-8 text-center">
        <div
          aria-hidden="true"
          className="flex size-16 items-center justify-center rounded-full bg-primary font-serif text-2xl text-primary-foreground"
        >
          S
        </div>
        <div>
          <p className="font-serif text-xl font-semibold text-foreground">Sen</p>
          <p className="text-sm text-muted-foreground">@sen</p>
        </div>
        <div className="mt-2 flex w-full max-w-sm justify-around">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-lg font-semibold text-foreground tabular-nums">
                {s.value}
              </p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg font-semibold text-foreground">Şiirlerim</h2>
        <button
          type="button"
          onClick={onWrite}
          className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent"
        >
          <PenLine className="size-4" /> Yaz
        </button>
      </div>

      {myPoems.length > 0 ? (
        <div className="space-y-4">
          {myPoems.map((poem) => (
            <PoemCard key={poem.id} poem={poem} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
          Henüz şiir yazmadın. İlk dizelerini paylaşmaya ne dersin?
        </p>
      )}
    </div>
  )
}
