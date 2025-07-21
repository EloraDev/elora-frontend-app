import React, { useState } from 'react'
import { PatientDashboard } from '../../components/screens/patient-dashboard'
import { BottomNavigation } from '../../components/bottom-navigation'
import { useUserStore } from '../../stores/user-store'

export const DashboardPage = () => {
  const [showScan, setShowScan] = useState(false)
  const {user} = useUserStore()
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
    <PatientDashboard user={user} />
    <BottomNavigation onScanClick={() => setShowScan(true)} />
  </div>
  )
}
