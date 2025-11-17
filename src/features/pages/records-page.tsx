import { useState } from 'react'
// import { PatientDashboard } from '../../components/screens/patient-dashboard'
import { BottomNavigation } from '../../components/bottom-navigation'
import { useUserStore } from '../../stores/user-store'
import { MedicalRecordsScreen } from '../../components/screens/medical-record-screen'

export const RecordsPage = () => {
  const [, setShowScan] = useState(false)
  const {user} = useUserStore()
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
    <MedicalRecordsScreen user={user} />
    <BottomNavigation onScanClick={() => setShowScan(true)} />
  </div>
  )
}
