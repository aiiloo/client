import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import AuthenticateLayout from './layouts/AuthenticateLayout'
import Authenticate from './pages/Authenticate/Authenticate'
import VerifyLayout from './layouts/VerifyLayout'
import PendingVerify from './pages/PendingVerify'
import EmailVerify from './pages/EmailVerify'
import { RootState } from './store'
import { useSelector } from 'react-redux'
import GoogleAuth from './pages/GoogleOauth'
import Message from './pages/Message'
import MyProfile from './pages/MyProfile'

// eslint-disable-next-line react-refresh/only-export-components
function ProtectedRoute() {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to='/authenticate' />
}

// eslint-disable-next-line react-refresh/only-export-components
function RejectedRoute() {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated)
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
        },
        {
          path: '/messages',
          element: (
            <MainLayout>
              <Message />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/my-profile',
          element: (
            <MainLayout>
              <MyProfile />
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
            <VerifyLayout>
              <EmailVerify />
            </VerifyLayout>
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
            <VerifyLayout>
              <PendingVerify />
            </VerifyLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/google/oauth',
          element: (
            <VerifyLayout>
              <GoogleAuth />
            </VerifyLayout>
          )
        }
      ]
    }
  ])
  return routeElements
}
