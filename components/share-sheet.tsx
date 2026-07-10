'use client'

import { useEffect, useState } from 'react'
import { Check, Copy, Feather, Link2, Share2, X } from 'lucide-react'
import type { Poem } from '@/lib/data'

export function ShareSheet({ poem, onClose }: { poem: Poem; onClose: () => void }) {
  const [copied, setCopied] = useState<'text' | 'link' | null>(null)
  const [canShare, setCanShare] = useState(false)

  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function')
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const shareText = `${poem.title}\n\n${poem.body}\n\n— ${poem.poet}\nSiirlendik`
  const shareUrl =
    typeof window !== 'undefined' ? `${window.location.origin}/?siir=${poem.id}` : ''

  const copy = async (kind: 'text' | 'link') => {
    try {
      await navigator.clipboard.writeText(kind === 'text' ? shareText : shareUrl)
      setCopied(kind)
      setTimeout(() => setCopied(null), 1800)
    } catch {
      setCopied(null)
    }
  }

  const nativeShare = async () => {
    try {
      await navigator.share({ title: poem.title, text: shareText, url: shareUrl })
    } catch {
      /* kullanıcı iptal etti */
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Şiiri paylaş"
      className="absolute inset-0 z-10 flex flex-col justify-end bg-foreground/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="rounded-t-3xl border-t border-border bg-background p-5 pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-semibold text-foreground">Paylaş</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Görsel alıntı kartı */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="bg-primary px-6 py-7 text-primary-foreground">
            <p className="text-[11px] font-medium uppercase tracking-widest opacity-80">
              {poem.theme}
            </p>
            <h3 className="mt-2 text-balance font-serif text-xl font-semibold leading-tight">
              {poem.title}
            </h3>
            <p className="mt-3 line-clamp-6 whitespace-pre-line font-serif text-[15px] leading-relaxed opacity-95">
              {poem.body}
            </p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="font-medium">{poem.poet}</span>
              <span className="inline-flex items-center gap-1 opacity-80">
                <Feather className="size-3.5" /> Siirlendik
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {canShare && (
            <button
              type="button"
              onClick={nativeShare}
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card px-2 py-3 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <Share2 className="size-5 text-primary" />
              Paylaş
            </button>
          )}
          <button
            type="button"
            onClick={() => copy('text')}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card px-2 py-3 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
          >
            {copied === 'text' ? (
              <Check className="size-5 text-primary" />
            ) : (
              <Copy className="size-5 text-primary" />
            )}
            {copied === 'text' ? 'Kopyalandı' : 'Metni Kopyala'}
          </button>
          <button
            type="button"
            onClick={() => copy('link')}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card px-2 py-3 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
          >
            {copied === 'link' ? (
              <Check className="size-5 text-primary" />
            ) : (
              <Link2 className="size-5 text-primary" />
            )}
            {copied === 'link' ? 'Kopyalandı' : 'Bağlantı'}
          </button>
        </div>
      </div>
    </div>
  )
}
