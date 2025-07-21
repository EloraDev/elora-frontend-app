import { BottomNavigation } from '../../components/bottom-navigation'
import { useUserStore } from '../../stores/user-store'
import { ResultsScreen } from '../../components/screens/results-screen'
import { useResultStore } from '../../stores/result-store'
import { useRouter } from '@tanstack/react-router'

export const ResultPage = () => {
  const { user } = useUserStore()
  const { result } = useResultStore()
  const router = useRouter()
  
  const onBackToDashboard = () => {
    router.navigate({ to: "/dashboard" })
  }
  
  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Results Available</h2>
          <p className="text-gray-600 mb-4">Please perform a skin analysis first.</p>
          <button 
            onClick={() => router.navigate({ to: "/dashboard/scan" })}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Start Analysis
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <ResultsScreen result={result} onBackToDashboard={onBackToDashboard} />
      <BottomNavigation onScanClick={() => router.navigate({ to: "/dashboard/scan" })} />
    </div>
  )
}