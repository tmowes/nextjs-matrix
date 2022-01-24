import { Flex } from '@chakra-ui/react'

import { FormContainerProps } from './types'

export default function FormContainer(props: FormContainerProps) {
  const { children } = props
  return (
    <Flex
      maxW={980}
      w="100%"
      mx="auto"
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
