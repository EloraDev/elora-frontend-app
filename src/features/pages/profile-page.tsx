import React, { useState } from 'react'
import { PatientDashboard } from '../../components/screens/patient-dashboard'
import { BottomNavigation } from '../../components/bottom-navigation'
import { useUserStore } from '../../stores/user-store'
import { ProfileScreen } from '../../components/screens/profile-screen'

export const ProfilePage = () => {
  const [showScan, setShowScan] = useState(false)
  const {user} = useUserStore()
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
    <ProfileScreen />
    <BottomNavigation onScanClick={() => setShowScan(true)} />
  </div>
  )
}
