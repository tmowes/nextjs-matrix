import { useState } from 'react'
import { useRouter } from 'next/router'

import { Avatar, Button, Flex, Heading, Input, Tag, Text } from '@chakra-ui/react'

import { useAuth } from '../../contexts/AuthProvider'

export default function WelcomeForm() {
  const { onLogin } = useAuth()
  const [username, setUsername] = useState('tmowes')
  const { push } = useRouter()

  const onSubmit = async () => {
    if (username.trim().length >= 3) {
      await onLogin(username)
      push('/chat')
    }
  }
  return (
    <Flex p="4">
      <Flex direction="column" textAlign="center" gap="2">
        <Heading fontSize={24}>Boas vindas de volta!</Heading>
        <Text fontSize={14} color="gray.400" fontWeight="bold" mb="auto">
          Discord - Alura Matrix
        </Text>
        <Input
          placeholder="Digite seu usuário do GitHub"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          _placeholder={{
            color: 'gray.400',
          }}
        />
        <Button colorScheme="green" onClick={onSubmit}>
          Entrar
        </Button>
      </Flex>
      <Flex
        direction="column"
        align="center"
        bg="blackAlpha.500"
        ml="8"
        p="4"
        borderRadius="8"
        gap="2"
        borderWidth="1px"
        borderColor="rgba(255,255,255,0.15)"
      >
        <Avatar src={`http://github.com/${username}.png`} size="2xl" />
        <Tag size="lg" bg="blackAlpha.500" borderRadius="full" color="gray.400" mt="4" px="6">
          {username}
        </Tag>
      </Flex>
    </Flex>
  )
}
