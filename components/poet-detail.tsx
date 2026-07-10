'use client'

import { useEffect } from 'react'
import { ArrowLeft, Check, UserPlus } from 'lucide-react'
import { useApp } from '@/components/app-context'
import { formatCount } from '@/components/nav-context'
import { PoemCard } from '@/components/poem-card'
import { poets } from '@/lib/data'
import { cn } from '@/lib/utils'

export function PoetDetail({ poetId, onClose }: { poetId: string; onClose: () => void }) {
  const { poems, isFollowing, toggleFollow } = useApp()
  const poet = poets.find((p) => p.id === poetId)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const poetPoems = poems.filter((p) => p.poetId === poetId)
  const following = isFollowing(poetId)
  const displayName = poet?.name ?? poetPoems[0]?.poet ?? 'Şair'
  const followerBase = poet?.followers ?? 0

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={displayName}
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
        <span className="truncate font-serif text-base font-semibold text-foreground">
          {displayName}
        </span>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-xl px-4 py-6">
          <div className="flex items-start gap-4">
            <div
              aria-hidden="true"
              className="flex size-20 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-3xl text-primary-foreground"
            >
              {displayName.charAt(0)}
            </div>
            <div className="min-w-0 flex-1 pt-1">
              <h1 className="font-serif text-2xl font-semibold text-foreground">{displayName}</h1>
              {poet && <p className="text-sm text-muted-foreground">{poet.handle}</p>}
              <div className="mt-2 flex gap-4 text-sm">
                <span className="text-foreground">
                  <span className="font-semibold tabular-nums">
                    {formatCount(followerBase + (following ? 1 : 0))}
                  </span>{' '}
                  <span className="text-muted-foreground">takipçi</span>
                </span>
                <span className="text-foreground">
                  <span className="font-semibold tabular-nums">{poetPoems.length}</span>{' '}
                  <span className="text-muted-foreground">şiir</span>
                </span>
              </div>
            </div>
          </div>

          {poet?.bio && (
            <p className="mt-4 text-pretty leading-relaxed text-foreground/85">{poet.bio}</p>
          )}

          <button
            type="button"
            onClick={() => toggleFollow(poetId)}
            aria-pressed={following}
            className={cn(
              'mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
              following
                ? 'border border-border bg-secondary text-secondary-foreground hover:bg-accent'
                : 'bg-primary text-primary-foreground',
            )}
          >
            {following ? (
              <>
                <Check className="size-4" /> Takip Ediliyor
              </>
            ) : (
              <>
                <UserPlus className="size-4" /> Takip Et
              </>
            )}
          </button>

          <h2 className="mb-3 mt-8 font-serif text-lg font-semibold text-foreground">Şiirleri</h2>
          {poetPoems.length > 0 ? (
            <div className="space-y-4">
              {poetPoems.map((poem) => (
                <PoemCard key={poem.id} poem={poem} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
              Bu şairin henüz şiiri yok.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
