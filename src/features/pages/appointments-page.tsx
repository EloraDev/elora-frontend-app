import { useState } from 'react'
// import { PatientDashboard } from '../../components/screens/patient-dashboard'
import { BottomNavigation } from '../../components/bottom-navigation'
import { useUserStore } from '../../stores/user-store'
import { AppointmentsScreen } from '../../components/screens/appointment-screen'

export const AppointmentPage = () => {
  const [, setShowScan] = useState(false)
  const {user} = useUserStore()
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
    <AppointmentsScreen user={user} />
    <BottomNavigation onScanClick={() => setShowScan(true)} />
  </div>
  )
}
