import { Navigate, Outlet } from 'react-router-dom'

export const MainLayout: React.FC = () => {
  const hasRead = localStorage.getItem('hasRead')
  if (hasRead === 'yes') {
    return <Navigate to='/home'/>
  }
  return (<div><Outlet /></div>)
}
