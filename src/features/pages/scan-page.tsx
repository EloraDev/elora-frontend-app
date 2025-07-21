import { useState } from 'react'
import { BottomNavigation } from '../../components/bottom-navigation'
import { useUserStore } from '../../stores/user-store'
import { ScanScreen } from '../../components/screens/scan-screen'
import { useRouter } from '@tanstack/react-router'
import type { DiagnosisResult } from '../../features/diagnosis/types'

export const ScanPage = () => {
  const { user } = useUserStore()
  const router = useRouter()
  
  const onDiagnosisComplete = (result: DiagnosisResult) => {
    // Navigate to results page
    router.navigate({ to: "/dashboard/result" })
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <ScanScreen onDiagnosisComplete={onDiagnosisComplete} />
      <BottomNavigation onScanClick={() => {}} />
    </div>
  )
}