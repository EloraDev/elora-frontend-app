import { createFileRoute } from '@tanstack/react-router'
import  Home from '../../../features/pages/home-page'

export const Route = createFileRoute('/(public)/_public/')({
  component:() => <Home />,
})

// function RouteComponent() {
//   return <div className='text-black'>Hello "/(public)/_public/"!</div>
// }
