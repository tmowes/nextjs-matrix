import type { AppProps } from 'next/app'

import { ChakraProvider, CSSReset } from '@chakra-ui/react'

import { theme } from '../styles/theme'
import { AppProvider } from '../contexts/AppProvider'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ChakraProvider>
  )
}
