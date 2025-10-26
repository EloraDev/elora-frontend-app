import { createFileRoute } from '@tanstack/react-router'
// import  Home from '../../../features/pages/home-page'
import { LandingPage } from '../../../features/pages/landing-page'

export const Route = createFileRoute('/(public)/_public/')({
  component:() => <LandingPage />,
})

// function RouteComponent() {
//   return <div className='text-black'>Hello "/(public)/_public/"!</div>
// }
