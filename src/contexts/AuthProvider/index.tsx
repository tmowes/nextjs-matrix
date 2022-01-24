import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import nookies from 'nookies'

import { AuthContextData, AuthProviderProps } from './types'

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any | null>(null)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      isLoading,
      user,
    }),
    [isLoading, user],
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
