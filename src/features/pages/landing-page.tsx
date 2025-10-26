import { Button } from '../../components/ui/button'
import { useNavigate } from '@tanstack/react-router'

export const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Button onClick={() => navigate({ to: '/auth/signup' })}>Get Started</Button>
    </div>
  )
}
