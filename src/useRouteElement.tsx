import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import AuthenticateLayout from './layouts/AuthenticateLayout'
import Authenticate from './pages/Authenticate/Authenticate'
import EmailVerifyLayout from './layouts/EmailVerifyLayout'
import PendingVerify from './pages/PendingVerify'
import EmailVerify from './pages/EmailVerify'

// eslint-disable-next-line react-refresh/only-export-components
function ProtectedRoute() {
  const isAuthenticated = false
  return isAuthenticated ? <Outlet /> : <Navigate to='/authenticate' />
}

// eslint-disable-next-line react-refresh/only-export-components
function RejectedRoute() {
  const isAuthenticated = false
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: (
            <MainLayout>
              <Home />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/authenticate',
          element: (
            <AuthenticateLayout>
              <Authenticate />
            </AuthenticateLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/email-verify',
          element: (
            <EmailVerifyLayout>
              <EmailVerify />
            </EmailVerifyLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/pending-verify',
          element: (
            <EmailVerifyLayout>
              <PendingVerify />
            </EmailVerifyLayout>
          )
        }
      ]
    }
  ])
  return routeElements
}
