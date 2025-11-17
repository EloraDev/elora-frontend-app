
import { useEffect, useState } from 'react';
import { SplashScreen } from '../../components/splash-screen';
import { AuthFlow } from '../../components/auth/auth-flow';
// import { AppContainer } from '../../components/app-container';
import { useRouter } from '@tanstack/react-router';
import { useUserStore } from '../../stores/user-store';


function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [, setIsAuthenticated] = useState(false)
  const {setUser} = useUserStore()
  // const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)

    // Check if user is already logged in
    const savedUser = localStorage.getItem("skin-ai-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }

    return () => clearTimeout(timer)
  }, [])

  const handleAuthSuccess = (userData: any) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("skin-ai-user", JSON.stringify(userData))
    router.navigate({to: "/dashboard"})
  }

  // const handleLogout = () => {
  //   setUser(null)
  //   setIsAuthenticated(false)
  //   localStorage.removeItem("skin-ai-user")
  // }

  if (showSplash) {
    return <SplashScreen />
  }

  // if (!isAuthenticated) {
    return <AuthFlow onAuthSuccess={handleAuthSuccess} />
  // }

  // return <AppContainer user={user} onLogout={handleLogout} />
}

export default Home;
  