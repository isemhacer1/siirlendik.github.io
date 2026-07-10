'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useApp } from '@/components/app-context'
import { useNav } from '@/components/nav-context'
import { PoemCard } from '@/components/poem-card'
import { poemOfTheDay, themes } from '@/lib/data'
import { cn } from '@/lib/utils'

export function FeedView() {
  const { poems } = useApp()
  const { openReader } = useNav()
  const [active, setActive] = useState<string>('Tümü')

  const filtered = active === 'Tümü' ? poems : poems.filter((p) => p.theme === active)

  return (
    <div className="space-y-6 px-4 py-5">
      <button
        type="button"
        onClick={() => openReader(poemOfTheDay)}
        className="block w-full overflow-hidden rounded-2xl bg-primary p-6 text-left text-primary-foreground"
      >
        <p className="text-xs font-medium uppercase tracking-widest opacity-80">Günün Şiiri</p>
        <h2 className="mt-2 text-balance font-serif text-2xl font-semibold leading-tight">
          {poemOfTheDay.title}
        </h2>
        <p className="mt-3 whitespace-pre-line font-serif text-[15px] leading-relaxed opacity-90 line-clamp-3">
          {poemOfTheDay.body}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
          {poemOfTheDay.poet} <ArrowRight className="size-4" />
        </span>
      </button>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {['Tümü', ...themes].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActive(t)}
            className={cn(
              'shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              active === t
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:text-foreground',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((poem) => (
          <PoemCard key={poem.id} poem={poem} />
        ))}
      </div>
    </div>
  )
}
