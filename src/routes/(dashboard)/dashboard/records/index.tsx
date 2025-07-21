import { useState } from 'react'
import { BottomNavigation } from '../../../../components/bottom-navigation'
import { ScanScreen } from '../../../../components/screens/scan-screen'
import { createFileRoute } from '@tanstack/react-router'
import { RecordsPage } from '../../../../features/pages/records-page'

export const Route = createFileRoute('/(dashboard)/dashboard/records/')({
  component: () => <RecordsPage />,
})

// function RouteComponent() {
//   const [showScan, setShowScan] = useState(false)

//   return (
//     <div className="min-h-screen bg-gray-50 pb-20">
//       <div className="transition-all duration-300 ease-in-out">
//         {showScan ? (
//           <ScanScreen onDiagnosisComplete={() => setShowScan(false)} />
//         ) : (
//           <div>Hello "/(dashboard)/dashboard/records/"!</div>
//         )}
//       </div>
//       <BottomNavigation onScanClick={() => setShowScan(true)} />
//     </div>
//   )
// }
