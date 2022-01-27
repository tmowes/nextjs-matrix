export type Message = {
  id: string
  username: string
  avatar_url: string
  message: string
  created_at: string
}
export type MessageDTO = Omit<Message, 'id' | 'created_at'>
