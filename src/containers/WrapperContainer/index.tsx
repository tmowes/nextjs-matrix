import { Flex } from '@chakra-ui/react'

import { WrapperContainerProps } from './types'

export default function WrapperContainer(props: WrapperContainerProps) {
  const { children } = props
  return (
    <Flex direction="column" m="auto" zIndex={10}>
      {children}
    </Flex>
  )
}
