import Head from 'next/head'

import { Flex } from '@chakra-ui/react'

import { WindowContainerProps } from './types'

export default function WindowContainer(props: WindowContainerProps) {
  const { children, underlayColor } = props
  return (
    <>
      <Head>
        <title>Matrix Chat App</title>
      </Head>
      <Flex
        w="100vw"
        h="100vh"
        bg={underlayColor}
        backdropFilter="blur(2px)"
        direction="column"
        position="relative"
        overflowX="hidden"
      >
        {children}
      </Flex>
    </>
  )
}
