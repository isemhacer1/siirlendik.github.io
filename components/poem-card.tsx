'use client'

import { Bookmark, Heart, MessageCircle } from 'lucide-react'
import { useApp } from '@/components/app-context'
import { useNav } from '@/components/nav-context'
import type { Poem } from '@/lib/data'
import { cn } from '@/lib/utils'

export function PoemCard({ poem }: { poem: Poem }) {
  const { isSaved, isLiked, toggleSaved, toggleLiked, likeCount, commentsFor } = useApp()
  const { openReader, openPoet, openTheme } = useNav()
  const saved = isSaved(poem.id)
  const liked = isLiked(poem.id)
  const commentCount = commentsFor(poem.id).length

  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => openPoet(poem.poetId)}
          aria-label={`${poem.poet} profilini gör`}
          className="flex size-9 items-center justify-center rounded-full bg-accent font-serif text-sm text-accent-foreground"
        >
          {poem.poet.charAt(0)}
        </button>
        <div className="min-w-0">
          <button
            type="button"
            onClick={() => openPoet(poem.poetId)}
            className="block truncate text-sm font-medium text-foreground hover:text-primary"
          >
            {poem.poet}
          </button>
          <button
            type="button"
            onClick={() => openTheme(poem.theme)}
            className="text-xs text-muted-foreground hover:text-primary"
          >
            {poem.theme}
          </button>
        </div>
        <span className="ml-auto rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground">
          {poem.readingTime}
        </span>
      </div>

      <button
        type="button"
        onClick={() => openReader(poem)}
        className="mt-4 block w-full text-left"
        aria-label={`${poem.title} şiirini oku`}
      >
        <h3 className="text-pretty font-serif text-xl font-semibold text-foreground">
          {poem.title}
        </h3>
        <p className="mt-2 whitespace-pre-line font-serif text-[15px] leading-relaxed text-foreground/85 line-clamp-4">
          {poem.body}
        </p>
        <span className="mt-2 inline-block text-xs font-medium text-primary">Devamını oku</span>
      </button>

      <div className="mt-4 flex items-center gap-1 border-t border-border pt-3">
        <button
          type="button"
          onClick={() => toggleLiked(poem.id)}
          aria-pressed={liked}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary"
        >
          <Heart className={cn('size-4', liked && 'fill-primary text-primary')} />
          <span className={cn('tabular-nums', liked && 'text-primary')}>{likeCount(poem)}</span>
        </button>
        <button
          type="button"
          onClick={() => openReader(poem)}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary"
          aria-label="Yorumlar"
        >
          <MessageCircle className="size-4" />
          <span className="tabular-nums">{commentCount}</span>
        </button>
        <button
          type="button"
          onClick={() => toggleSaved(poem.id)}
          aria-pressed={saved}
          className="ml-auto flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary"
        >
          <Bookmark className={cn('size-4', saved && 'fill-primary text-primary')} />
          <span className={cn('sr-only sm:not-sr-only', saved && 'text-primary')}>
            {saved ? 'Kaydedildi' : 'Kaydet'}
          </span>
        </button>
      </div>
    </article>
  )
}
