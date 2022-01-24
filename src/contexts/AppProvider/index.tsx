import { AuthProvider } from '../AuthProvider'
import { StaticDataProvider } from '../StaticDataProvider'
import { AppProviderProps } from './types'

export const AppProvider = (props: AppProviderProps) => {
  const { children } = props
  return (
    <AuthProvider>
      <StaticDataProvider>{children}</StaticDataProvider>
    </AuthProvider>
  )
}
