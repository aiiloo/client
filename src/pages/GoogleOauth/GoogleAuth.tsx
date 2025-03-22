import { useNavigate, useSearchParams } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { useEffect, useState } from 'react'
import { setProfileToLs, setTokenToLS } from '../../utils/auth'
import { useAppDispatch } from '../../store'
import { loginSuccess } from '../../store/user.slice'

export default function GoogleAuth() {
  const [isShowSpinner, setIsShowSpinner] = useState(true)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const accessToken = searchParams.get('access_token') || ''
  const refreshToken = searchParams.get('refresh_token') || ''
  const userData = searchParams.get('user_data')
  const parsedUserData = userData ? JSON.parse(decodeURIComponent(userData)) : null
  console.log(searchParams.get('access_token'))
  console.log(searchParams.get('refresh_token'))
  console.log('User Data:', parsedUserData)

  useEffect(() => {
    if (accessToken && refreshToken && parsedUserData) {
      setTokenToLS(accessToken, refreshToken)
      setProfileToLs(parsedUserData)
      setTimeout(() => {
        setIsShowSpinner(false)
        dispatch(loginSuccess(parsedUserData))
        navigate('/')
      }, 1500)
    }
  }, [accessToken, refreshToken, parsedUserData, navigate, dispatch])
  return (
    <>
      <div className='bg-black'>{isShowSpinner && <Spinner />}</div>
    </>
  )
}
