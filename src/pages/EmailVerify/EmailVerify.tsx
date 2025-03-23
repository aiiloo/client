import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import userApi from '../../apis/user.api'
import Spinner from '../../components/Spinner'
import { useAppDispatch } from '../../store'
import { loginSuccess } from '../../store/user.slice'
import { getProfileFromLS } from '../../utils/auth'
import { User } from '../../types/user.type'

const initialUserData: User = {
  avatar: '',
  bio: '',
  cover_photo: '',
  created_at: '',
  date_of_birth: '',
  email: '',
  location: '',
  name: '',
  updated_at: '',
  username: '',
  verify: false,
  website: '',
  _id: ''
}

export default function EmailVerify() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [isShowSpinner, setIsShowSpinner] = useState(false)
  const [userData, setUserData] = useState<User>(initialUserData)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const email_verify_token = searchParams.get('token') || ''
  useEffect(() => {
    setIsShowSpinner(true)
    if (email_verify_token) {
      setStatus('loading')
      userApi
        .verify({ email_verify_token })
        .then(() => {
          setStatus('success')
          // console.log(data)
          const user = getProfileFromLS()
          setUserData(user)
        })
        .catch((error) => {
          console.error(error)
          setStatus('error')
          setErrorMessage(error.response?.data?.message || 'Something went wrong')
        })
    }
    setTimeout(() => {
      setIsShowSpinner(false)
    }, 1000)
  }, [email_verify_token])

  const handleNavigateToHome = () => {
    setIsShowSpinner(true)
    setTimeout(() => {
      dispatch(loginSuccess(userData))
    }, 1000)
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-black'>
      {!isShowSpinner && status === 'success' && (
        <div className='bg-black border border-blue-950 p-6 rounded-lg shadow-lg text-center'>
          <div className='flex justify-center mb-4'>
            <div className='bg-green-500 rounded-full p-4'>
              <svg
                className='w-14 h-14 text-white dark:text-white'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                width={24}
                height={24}
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  fillRule='evenodd'
                  d='M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </div>
          <h2 className='text-xl font-semibold mb-2'>Verification Success</h2>
          <p className='text-white mb-4'>Your email has been successfully verified</p>
          <button onClick={handleNavigateToHome} className='text-white font-semibold'>
            TAKE ME HOME &gt;&gt;
          </button>
        </div>
      )}
      {!isShowSpinner && status === 'error' && (
        <div className='text-center text-white'>
          <h2 className='text-xl font-semibold text-red-500 mb-2'>Verification Failed</h2>
          <p className='mb-4'>{errorMessage}</p>
        </div>
      )}
      {isShowSpinner && <Spinner />}
    </div>
  )
}
