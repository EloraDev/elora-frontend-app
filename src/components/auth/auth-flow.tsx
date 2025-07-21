"use client"

import { useState } from "react"
import { SignInScreen } from "./sign-in-screen"
import { SignUpScreen } from "./sign-up-screen"


interface AuthFlowProps {
  onAuthSuccess: (user: any) => void
}

export function AuthFlow({ onAuthSuccess }: AuthFlowProps) {
  const [currentScreen, setCurrentScreen] = useState<"signin" | "signup">("signin")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {currentScreen === "signin" ? (
        <SignInScreen onAuthSuccess={onAuthSuccess} onSwitchToSignUp={() => setCurrentScreen("signup")} />
      ) : (
        <SignUpScreen onAuthSuccess={onAuthSuccess} onSwitchToSignIn={() => setCurrentScreen("signin")} />
      )}
    </div>
  )
}
