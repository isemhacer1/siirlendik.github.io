'use client'

import { useEffect, useState } from 'react'
import { Bookmark, Heart, MessageCircle, Send, Share2, X } from 'lucide-react'
import { useApp } from '@/components/app-context'
import { useNav } from '@/components/nav-context'
import { ShareSheet } from '@/components/share-sheet'
import type { Poem } from '@/lib/data'
import { cn } from '@/lib/utils'

export function PoemReader({ poem, onClose }: { poem: Poem | null; onClose: () => void }) {
  const { isSaved, isLiked, toggleSaved, toggleLiked, likeCount, commentsFor, addComment } = useApp()
  const { openPoet, openTheme } = useNav()
  const [draft, setDraft] = useState('')
  const [sharing, setSharing] = useState(false)

  useEffect(() => {
    if (!poem) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [poem, onClose])

  useEffect(() => {
    setDraft('')
    setSharing(false)
  }, [poem])

  if (!poem) return null

  const saved = isSaved(poem.id)
  const liked = isLiked(poem.id)
  const poemComments = commentsFor(poem.id)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!draft.trim()) return
    addComment(poem.id, draft)
    setDraft('')
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={poem.title}
      className="fixed inset-0 z-50 flex flex-col bg-background"
    >
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        <button
          type="button"
          onClick={onClose}
          className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary"
          aria-label="Kapat"
        >
          <X className="size-5" />
        </button>
        <span className="font-serif text-sm font-medium text-muted-foreground">Siirlendik</span>
        <button
          type="button"
          onClick={() => setSharing(true)}
          className="ml-auto flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary"
          aria-label="Paylaş"
        >
          <Share2 className="size-5" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-10">
        <div className="mx-auto max-w-xl">
          <button
            type="button"
            onClick={() => {
              openTheme(poem.theme)
              onClose()
            }}
            className="text-xs font-medium uppercase tracking-widest text-primary hover:underline"
          >
            {poem.theme}
          </button>
          <h1 className="mt-3 text-balance font-serif text-3xl font-semibold leading-tight text-foreground">
            {poem.title}
          </h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <button
              type="button"
              onClick={() => {
                openPoet(poem.poetId)
                onClose()
              }}
              className="font-medium text-foreground hover:text-primary"
            >
              {poem.poet}
            </button>
            <span aria-hidden="true">·</span>
            <span>{poem.readingTime} okuma</span>
          </div>

          <p className="mt-8 whitespace-pre-line font-serif text-xl leading-loose text-foreground">
            {poem.body}
          </p>

          <section className="mt-12 border-t border-border pt-6">
            <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-foreground">
              <MessageCircle className="size-5 text-primary" />
              Yorumlar ({poemComments.length})
            </h2>

            <form onSubmit={submit} className="mt-4 flex items-center gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Bir yorum yaz…"
                aria-label="Yorum yaz"
                className="flex-1 rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                aria-label="Gönder"
                className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
              >
                <Send className="size-4" />
              </button>
            </form>

            <ul className="mt-5 space-y-4">
              {poemComments.length === 0 && (
                <li className="text-sm text-muted-foreground">
                  Henüz yorum yok. İlk yorumu sen yaz.
                </li>
              )}
              {poemComments.map((c) => (
                <li key={c.id} className="flex gap-3">
                  <div
                    aria-hidden="true"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent font-serif text-xs text-accent-foreground"
                  >
                    {c.author.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{c.author}</p>
                      <span className="text-xs text-muted-foreground">{c.timeAgo}</span>
                    </div>
                    <p className="text-pretty text-sm leading-relaxed text-foreground/85">
                      {c.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <footer className="flex items-center gap-2 border-t border-border px-6 py-4">
        <button
          type="button"
          onClick={() => toggleLiked(poem.id)}
          aria-pressed={liked}
          className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent"
        >
          <Heart className={cn('size-4', liked && 'fill-primary text-primary')} />
          <span className="tabular-nums">{likeCount(poem)}</span>
        </button>
        <button
          type="button"
          onClick={() => toggleSaved(poem.id)}
          aria-pressed={saved}
          className={cn(
            'flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
            saved
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-accent',
          )}
        >
          <Bookmark className={cn('size-4', saved && 'fill-current')} />
          {saved ? 'Kaydedildi' : 'Kaydet'}
        </button>
      </footer>

      {sharing && <ShareSheet poem={poem} onClose={() => setSharing(false)} />}
    </div>
  )
}
