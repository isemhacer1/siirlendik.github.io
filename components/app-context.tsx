'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { comments as seedComments, poems as seedPoems, type Comment, type Poem } from '@/lib/data'

type AppContextValue = {
  poems: Poem[]
  comments: Comment[]
  savedIds: string[]
  likedIds: string[]
  followedPoets: string[]
  toggleSaved: (id: string) => void
  toggleLiked: (id: string) => void
  toggleFollow: (poetId: string) => void
  isSaved: (id: string) => boolean
  isLiked: (id: string) => boolean
  isFollowing: (poetId: string) => boolean
  likeCount: (poem: Poem) => number
  commentsFor: (poemId: string) => Comment[]
  addComment: (poemId: string, body: string) => void
  addPoem: (poem: { title: string; body: string; theme: string }) => Poem
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [userPoems, setUserPoems] = useState<Poem[]>([])
  const [userComments, setUserComments] = useState<Comment[]>([])
  const [savedIds, setSavedIds] = useState<string[]>(['p3'])
  const [likedIds, setLikedIds] = useState<string[]>([])
  const [followedPoets, setFollowedPoets] = useState<string[]>([])

  const poems = useMemo(() => [...userPoems, ...seedPoems], [userPoems])
  const comments = useMemo(() => [...userComments, ...seedComments], [userComments])

  const toggleSaved = useCallback((id: string) => {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]))
  }, [])

  const toggleLiked = useCallback((id: string) => {
    setLikedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]))
  }, [])

  const toggleFollow = useCallback((poetId: string) => {
    setFollowedPoets((prev) =>
      prev.includes(poetId) ? prev.filter((x) => x !== poetId) : [poetId, ...prev],
    )
  }, [])

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds])
  const isLiked = useCallback((id: string) => likedIds.includes(id), [likedIds])
  const isFollowing = useCallback(
    (poetId: string) => followedPoets.includes(poetId),
    [followedPoets],
  )

  const likeCount = useCallback(
    (poem: Poem) => poem.likes + (likedIds.includes(poem.id) ? 1 : 0),
    [likedIds],
  )

  const commentsFor = useCallback(
    (poemId: string) => comments.filter((c) => c.poemId === poemId),
    [comments],
  )

  const addComment = useCallback((poemId: string, body: string) => {
    const trimmed = body.trim()
    if (!trimmed) return
    const newComment: Comment = {
      id: `uc-${Date.now()}`,
      poemId,
      author: 'Sen',
      body: trimmed,
      timeAgo: 'şimdi',
    }
    setUserComments((prev) => [newComment, ...prev])
  }, [])

  const addPoem = useCallback((input: { title: string; body: string; theme: string }) => {
    const newPoem: Poem = {
      id: `user-${Date.now()}`,
      title: input.title.trim() || 'Adsız',
      poet: 'Sen',
      poetId: 'sen',
      theme: input.theme,
      body: input.body.trim(),
      likes: 0,
      readingTime: '1 dk',
    }
    setUserPoems((prev) => [newPoem, ...prev])
    return newPoem
  }, [])

  const value = useMemo(
    () => ({
      poems,
      comments,
      savedIds,
      likedIds,
      followedPoets,
      toggleSaved,
      toggleLiked,
      toggleFollow,
      isSaved,
      isLiked,
      isFollowing,
      likeCount,
      commentsFor,
      addComment,
      addPoem,
    }),
    [
      poems,
      comments,
      savedIds,
      likedIds,
      followedPoets,
      toggleSaved,
      toggleLiked,
      toggleFollow,
      isSaved,
      isLiked,
      isFollowing,
      likeCount,
      commentsFor,
      addComment,
      addPoem,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
