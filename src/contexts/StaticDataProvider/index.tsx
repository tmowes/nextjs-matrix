import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { DataProps, StaticDataContextData, StaticDataProviderProps } from './types'
import { useAuth } from '../AuthProvider'

export const StaticDataContext = createContext({} as StaticDataContextData)

export const StaticDataProvider = (props: StaticDataProviderProps) => {
  const { children } = props
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [hasUpdate, setHasUpdate] = useState(false)
  const [data, setData] = useState({} as DataProps)

  useEffect(() => {
    setIsLoading(false)
    setData({ name: 'JULIUS' })
  }, [])

  const providerValues = useMemo(
    () => ({ data, isLoading, hasUpdate }),
    [data, hasUpdate, isLoading],
  )

  return (
    <StaticDataContext.Provider value={providerValues}>{children}</StaticDataContext.Provider>
  )
}

export function useStaticData(): StaticDataContextData {
  const context = useContext(StaticDataContext)
  if (!context) {
    throw new Error('useStaticData must be used within a StaticDataProvider')
  }
  return context
}
