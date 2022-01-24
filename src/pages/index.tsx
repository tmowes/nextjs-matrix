import { useAuth } from '../contexts/AuthProvider'
import WindowContainer from '../containers/WindowContainer'
import WrapperContainer from '../containers/WrapperContainer'
import FormContainer from '../containers/FormContainer'
import WelcomeForm from '../components/WelcomeForm'

export default function Home() {
  const { user, isLoading } = useAuth()
  const underlayColor = '#00000099'

  return (
    <WindowContainer underlayColor={underlayColor}>
      {!isLoading && (
        <WrapperContainer>
          <FormContainer>
            <WelcomeForm />
          </FormContainer>
        </WrapperContainer>
      )}
    </WindowContainer>
  )
}
