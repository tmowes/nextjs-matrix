import { ReactNode } from 'react'

export type AuthContextData = {
  isLoading: boolean
  user: any | null
}

export type AuthProviderProps = {
  children: ReactNode
}
