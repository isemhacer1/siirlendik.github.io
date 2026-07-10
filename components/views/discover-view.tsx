'use client'

import { useMemo, useState } from 'react'
import { ChevronRight, Search } from 'lucide-react'
import { useApp } from '@/components/app-context'
import { useNav, formatCount } from '@/components/nav-context'
import { PoemCard } from '@/components/poem-card'
import { poets, themes } from '@/lib/data'
import { cn } from '@/lib/utils'

export function DiscoverView() {
  const { poems } = useApp()
  const { openPoet, openTheme } = useNav()
  const [query, setQuery] = useState('')
  const [theme, setTheme] = useState<string | null>(null)

  const results = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr')
    return poems.filter((p) => {
      const matchesTheme = !theme || p.theme === theme
      const matchesQuery =
        !q ||
        p.title.toLocaleLowerCase('tr').includes(q) ||
        p.poet.toLocaleLowerCase('tr').includes(q) ||
        p.body.toLocaleLowerCase('tr').includes(q)
      return matchesTheme && matchesQuery
    })
  }, [poems, query, theme])

  const isSearching = query.trim().length > 0 || theme !== null

  return (
    <div className="space-y-6 px-4 py-5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Şiir, şair veya dize ara"
          className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
          aria-label="Ara"
        />
      </div>

      <section>
        <h2 className="mb-3 font-serif text-lg font-semibold text-foreground">Temalar</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {themes.map((t) => (
            <div key={t} className="flex overflow-hidden rounded-xl border border-border bg-card">
              <button
                type="button"
                onClick={() => setTheme((prev) => (prev === t ? null : t))}
                className={cn(
                  'flex-1 px-4 py-4 text-left font-serif text-base font-medium transition-colors',
                  theme === t
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-secondary',
                )}
              >
                {t}
              </button>
              <button
                type="button"
                onClick={() => openTheme(t)}
                aria-label={`${t} temasındaki tüm şiirler`}
                className={cn(
                  'flex items-center border-l px-2 transition-colors',
                  theme === t
                    ? 'border-primary-foreground/20 bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:bg-secondary',
                )}
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {isSearching ? (
        <section>
          <h2 className="mb-3 font-serif text-lg font-semibold text-foreground">
            Sonuçlar ({results.length})
          </h2>
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((poem) => (
                <PoemCard key={poem.id} poem={poem} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
              Aramanıza uygun şiir bulunamadı.
            </p>
          )}
        </section>
      ) : (
        <section>
          <h2 className="mb-3 font-serif text-lg font-semibold text-foreground">Öne Çıkan Şairler</h2>
          <div className="space-y-3">
            {poets.map((poet) => (
              <button
                key={poet.id}
                type="button"
                onClick={() => openPoet(poet.id)}
                className="flex w-full items-start gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/50"
              >
                <div
                  aria-hidden="true"
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent font-serif text-accent-foreground"
                >
                  {poet.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium text-foreground">{poet.name}</p>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
                      {formatCount(poet.followers)} takipçi
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{poet.handle}</p>
                  <p className="mt-1.5 text-pretty text-sm leading-relaxed text-foreground/80">
                    {poet.bio}
                  </p>
                </div>
                <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
