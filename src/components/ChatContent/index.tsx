import { Avatar, Flex, Heading, IconButton, Input, Tag, Text } from '@chakra-ui/react'
import { AiOutlineSend, AiOutlineLogout } from 'react-icons/ai'

import { useAuth } from '../../contexts/AuthProvider'

export default function ChatContent() {
  const { user, contacts, onLogout } = useAuth()

  console.log({ user })

  return (
    <Flex h="100%" w="100%" direction="column" position="relative" overflow="hidden">
      <Tag
        bg="blackAlpha.500"
        justifyContent="space-between"
        borderRadius="full"
        color="gray.400"
        w="100%"
        h="16"
        mb="3"
      >
        <Avatar src={user?.avatar_url} size="sm" />
        <Text fontSize={14} color="gray.400" fontWeight="bold" ml="3" mr="auto">
          {user?.name}
        </Text>
        <IconButton
          icon={<AiOutlineLogout />}
          onClick={onLogout}
          aria-label="Sair"
          colorScheme="blackAlpha"
          bg="transparent"
          rounded="full"
          size="lg"
          fontSize={22}
        />
      </Tag>
      <Flex flex={1} overflow="hidden" p="0">
        <Flex
          borderTopLeftRadius="8"
          borderBottomLeftRadius="8"
          borderWidth="1px"
          borderColor="rgba(255,255,255,0.15)"
          direction="column"
          overflowX="scroll"
          w="25%"
        >
          {contacts?.map((contact) => (
            <Flex
              key={String(contact.id)}
              direction={['column', 'row']}
              p="2"
              align="center"
              borderBottomWidth="1px"
              borderBottomColor="rgba(255,255,255,0.15)"
            >
              <Avatar size="xs" src={contact.avatar_url} />
              <Text ml={['0', '2']}>{contact.login}</Text>
            </Flex>
          ))}
        </Flex>
        <Flex
          direction="column"
          align="center"
          bg="blackAlpha.500"
          w="75%"
          borderTopRightRadius="8"
          borderBottomRightRadius="8"
          borderWidth="1px"
          borderColor="rgba(255,255,255,0.15)"
        >
          <Flex w="100%" h="100%" overflowX="scroll">
            <Heading fontSize={24}>CHAT</Heading>
          </Flex>
          <Flex
            mt="auto"
            mb="0"
            h="16"
            w="100%"
            align="center"
            justify="center"
            px="4"
            borderTopWidth="1px"
            borderColor="rgba(255,255,255,0.15)"
          >
            <Input placeholder="Insira sua mensagem aqui..." rounded="full" />
            <IconButton
              icon={<AiOutlineSend />}
              aria-label="Enviar mensagem"
              colorScheme="blackAlpha"
              rounded="full"
              size="lg"
              ml="2"
              fontSize={22}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
