import { ReactNode } from 'react'

export type AuthContextData = {
  isLoading: boolean
  user: User | null
  contacts: User[]
  onLogin: (username: string) => Promise<void>
  onLogout: () => void
}

export type AuthProviderProps = {
  children: ReactNode
}

export type User = {
  id: number
  login: string
  avatar_url: string
  followers: User[] | null
  following: User[] | null
  name: string
  location: string
  bio: string
  created_at: Date
  updated_at: Date
}
