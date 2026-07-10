'use client'

import { useCallback, useMemo, useState } from 'react'
import { Feather } from 'lucide-react'
import { AppProvider } from '@/components/app-context'
import { BottomNav, type Tab } from '@/components/bottom-nav'
import { NavContext } from '@/components/nav-context'
import { PoemReader } from '@/components/poem-reader'
import { PoetDetail } from '@/components/poet-detail'
import { ThemeDetail } from '@/components/theme-detail'
import { DiscoverView } from '@/components/views/discover-view'
import { FeedView } from '@/components/views/feed-view'
import { ProfileView } from '@/components/views/profile-view'
import { SavedView } from '@/components/views/saved-view'
import { WriteView } from '@/components/views/write-view'
import type { Poem } from '@/lib/data'

const titles: Record<Tab, string> = {
  feed: 'Akış',
  discover: 'Keşfet',
  write: 'Yaz',
  saved: 'Kayıtlı',
  profile: 'Profil',
}

function App() {
  const [tab, setTab] = useState<Tab>('feed')
  const [reading, setReading] = useState<Poem | null>(null)
  const [poetId, setPoetId] = useState<string | null>(null)
  const [themeName, setThemeName] = useState<string | null>(null)

  const nav = useMemo(
    () => ({
      openReader: (poem: Poem) => setReading(poem),
      openPoet: (id: string) => setPoetId(id),
      openTheme: (theme: string) => setThemeName(theme),
    }),
    [],
  )

  const closeReader = useCallback(() => setReading(null), [])

  return (
    <NavContext.Provider value={nav}>
      <div className="mx-auto flex min-h-dvh max-w-xl flex-col bg-background">
        <header className="sticky top-0 z-30 flex items-center gap-2 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Feather className="size-4" />
          </span>
          <div className="flex-1">
            <h1 className="font-serif text-lg font-semibold leading-none text-foreground">
              Siirlendik
            </h1>
            <p className="text-[11px] text-muted-foreground">{titles[tab]}</p>
          </div>
        </header>

        <main className="flex-1">
          {tab === 'feed' && <FeedView />}
          {tab === 'discover' && <DiscoverView />}
          {tab === 'write' && <WriteView onPublished={() => setTab('profile')} />}
          {tab === 'saved' && <SavedView />}
          {tab === 'profile' && <ProfileView onWrite={() => setTab('write')} />}
        </main>

        <BottomNav active={tab} onChange={setTab} />

        <PoemReader poem={reading} onClose={closeReader} />
        {poetId && <PoetDetail poetId={poetId} onClose={() => setPoetId(null)} />}
        {themeName && <ThemeDetail theme={themeName} onClose={() => setThemeName(null)} />}
      </div>
    </NavContext.Provider>
  )
}

export default function Page() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  )
}
