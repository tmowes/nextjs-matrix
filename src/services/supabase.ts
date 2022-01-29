import { createClient } from '@supabase/supabase-js'

import { Message, MessageDTO } from '../components/ChatContent/types'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY,
)

export const loadSupabaseMessages = async (): Promise<Message[]> => {
  try {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true })
    if (data) {
      return data
    }
    return []
  } catch (error) {
    console.log('loadSupabaseMessagesError', error)
    return []
  }
}

export const loadSupabaseMessagesRealtime = (getNewMessage: (message: Message) => void) =>
  supabase
    .from('messages')
    .on('INSERT', (data) => {
      getNewMessage(data.new)
    })
    .subscribe()

export const sendSupabaseMessage = async (message: MessageDTO): Promise<Message | null> => {
  try {
    const { data } = await supabase.from('messages').insert([message])
    if (!data) return null
    return data[0]
  } catch (error) {
    console.log('sendSupabaseMessageError', error)
    return null
  }
}

export const deleteSupabaseMessage = async (id: string) => {
  try {
    await supabase.from('messages').delete().match({ id })
  } catch (error) {
    console.log('deleteSupabaseMessageError', error)
  }
}
