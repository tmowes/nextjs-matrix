import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import nookies from 'nookies'

import { AuthContextData, AuthProviderProps, User } from './types'
import { api } from '../../services/api'

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [contacts, setContacts] = useState<User[]>([])

  const getUserFollowers = async (username: string) => {
    const { data } = await api.get<User[]>(`/users/${username}/followers`)
    return data.map((follower: User) => ({
      id: follower.id,
      login: follower.login,
      avatar_url: follower.avatar_url,
      followers: null,
      following: null,
      name: follower.name,
      location: follower.location,
      bio: follower.bio,
      created_at: follower.created_at,
      updated_at: follower.updated_at,
    }))
  }

  const getUserFollowing = async (username: string) => {
    const { data } = await api.get<User[]>(`/users/${username}/following`)
    return data.map((follows: User) => ({
      id: follows.id,
      login: follows.login,
      avatar_url: follows.avatar_url,
      followers: null,
      following: null,
      name: follows.name,
      location: follows.location,
      bio: follows.bio,
      created_at: follows.created_at,
      updated_at: follows.updated_at,
    }))
  }

  const onLogin = useCallback(async (username: string) => {
    if (username.trim().length >= 3) {
      const { data } = await api.get(`/users/${username}`)
      if (data) {
        const [userFollows, userFollowers] = await Promise.all([
          getUserFollowing(data.login),
          getUserFollowers(data.login),
        ])

        const allContacts = [...userFollows, ...userFollowers]

        const uniqueContactsIds = [...new Set(allContacts.map((item) => String(item.id)))]

        setContacts([
          ...uniqueContactsIds.map((id) => allContacts.find((item) => String(item.id) === id)),
        ] as User[])

        setUser({
          id: data.id,
          login: data.login,
          avatar_url: data.avatar_url,
          followers: userFollowers,
          following: userFollows,
          name: data.name,
          location: data.location,
          bio: data.bio,
          created_at: data.created_at,
          updated_at: data.updated_at,
        })
      }
    }
  }, [])

  const onLogout = useCallback(() => {
    setUser(null)
    setContacts([])
  }, [])

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      isLoading,
      onLogin,
      onLogout,
      user,
      contacts,
    }),
    [contacts, isLoading, onLogin, onLogout, user],
  )

  return <AuthContext.Provider value={providerValues}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}
