import { useCallback, useEffect, useRef, useState } from 'react'

import { Avatar, Flex, IconButton, Input, Tag, Text } from '@chakra-ui/react'
import { AiOutlineSend, AiOutlineLogout, AiOutlineClose } from 'react-icons/ai'

import { useAuth } from '../../contexts/AuthProvider'
import { Message, MessageDTO } from './types'
import {
  deleteSupabaseMessage,
  loadSupabaseMessages,
  loadSupabaseMessagesRealtime,
  sendSupabaseMessage,
  supabase,
} from '../../services/supabase'
import { fixServerDate } from '../../utils/fixServerDate'

export default function ChatContent() {
  const { user, contacts, onLogout } = useAuth()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const onSendMessage = async () => {
    if (!user) return
    if (!message.trim()) return

    const newMessage: MessageDTO = {
      message,
      username: user.login,
      avatar_url: user.avatar_url,
    }

    const result = await sendSupabaseMessage(newMessage)
    if (result) {
      // setMessages((prev) => [...prev, result])
      setMessage('')
    }
  }

  const onDeleteMessage = async (id: string) => {
    await deleteSupabaseMessage(id)
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  const loadMessages = useCallback(async () => {
    const messagesList = await loadSupabaseMessages()
    setMessages(messagesList)
  }, [])

  useEffect(() => {
    loadMessages()
  }, [loadMessages])

  useEffect(() => {
    const subscribe = loadSupabaseMessagesRealtime((newMessage) =>
      setMessages((prev) => [...prev, newMessage]),
    )

    return () => {
      subscribe.unsubscribe()
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
          <Flex w="100%" h="100%" overflowX="scroll" direction="column" p="2">
            {messages.map((item) => (
              <Flex
                key={item.id}
                direction="column"
                maxW="60%"
                bg="blackAlpha.500"
                mb="2"
                borderRadius="8"
                p="2"
              >
                <Flex align="center" gap="2">
                  <Avatar src={item.avatar_url} size="xs" />
                  <Text fontSize={14}>{item.username}</Text>
                  <Text fontSize={10} color="gray.400">
                    {fixServerDate(item.created_at)}
                  </Text>
                  <IconButton
                    onClick={() => onDeleteMessage(item.id)}
                    icon={<AiOutlineClose />}
                    aria-label="Apagar mensagem"
                    colorScheme="blackAlpha"
                    size="xs"
                    ml="auto"
                  />
                </Flex>
                <Text fontSize={14} mt="2">
                  {item.message}
                </Text>
              </Flex>
            ))}
            <div ref={messagesEndRef} />
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
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Insira sua mensagem aqui..."
              _placeholder={{ color: 'gray.500' }}
              bg="blackAlpha.500"
              onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
              rounded="full"
            />
            <IconButton
              icon={<AiOutlineSend />}
              aria-label="Enviar mensagem"
              disabled={!message.trim()}
              onClick={onSendMessage}
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
