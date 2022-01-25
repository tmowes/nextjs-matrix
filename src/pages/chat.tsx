import { useEffect } from 'react'

import { useAuth } from '../contexts/AuthProvider'
import WindowContainer from '../containers/WindowContainer'
import WrapperContainer from '../containers/WrapperContainer'
import ChatContent from '../components/ChatContent'
import ChatContainer from '../containers/ChatContainer'

export default function Chat() {
  const { isLoading, user } = useAuth()
  const underlayColor = '#00000099'

  useEffect(() => {
    if (user === null) {
      window.location.href = '/'
    }
  }, [user])

  return (
    <WindowContainer underlayColor={underlayColor}>
      {!isLoading && (
        <WrapperContainer>
          <ChatContainer>
            <ChatContent />
          </ChatContainer>
        </WrapperContainer>
      )}
    </WindowContainer>
  )
}
