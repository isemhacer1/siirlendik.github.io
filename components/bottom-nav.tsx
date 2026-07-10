'use client'

import { Bookmark, Compass, Home, PenLine, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Tab = 'feed' | 'discover' | 'write' | 'saved' | 'profile'

const items: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: 'feed', label: 'Akış', icon: Home },
  { id: 'discover', label: 'Keşfet', icon: Compass },
  { id: 'write', label: 'Yaz', icon: PenLine },
  { id: 'saved', label: 'Kayıtlı', icon: Bookmark },
  { id: 'profile', label: 'Profil', icon: User },
]

export function BottomNav({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <nav
      aria-label="Ana gezinme"
      className="sticky bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur"
    >
      <ul className="mx-auto flex max-w-xl items-stretch justify-around px-2">
        {items.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          const isWrite = id === 'write'
          return (
            <li key={id} className="flex-1">
              <button
                type="button"
                onClick={() => onChange(id)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex w-full flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <span
                  className={cn(
                    'flex items-center justify-center rounded-full transition-colors',
                    isWrite
                      ? 'size-9 -translate-y-1 bg-primary text-primary-foreground shadow-sm'
                      : 'size-6',
                  )}
                >
                  <Icon className={cn(isWrite ? 'size-5' : 'size-5')} />
                </span>
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
