import { ReactNode } from 'react'

export type StaticDataContextData = {
  isLoading: boolean
  hasUpdate: boolean
  data: DataProps
}

export type StaticDataProviderProps = {
  children: ReactNode
}

export type DataProps = {
  name: string
}
