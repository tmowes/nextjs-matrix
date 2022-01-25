import { Flex } from '@chakra-ui/react'

import { ChatContainerProps } from './types'

export default function ChatContainer(props: ChatContainerProps) {
  const { children } = props
  return (
    <Flex
      maxW={980}
      w={[320, 480, 724, 980]}
      h="96%"
      m="auto"
      align="center"
      bg="rgba(255,255,255,0.08)"
      p="4"
      gap="2"
      borderWidth="1px"
      borderRadius="16"
      borderColor="rgba(255,255,255,0.3)"
      backdropFilter="blur(10px)"
      backgroundClip="padding-box"
      boxShadow="dark-lg"
    >
      {children}
    </Flex>
  )
}
