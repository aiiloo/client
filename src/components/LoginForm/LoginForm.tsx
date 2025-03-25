import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, X } from 'lucide-react'
import { loginSchema, LoginType } from '../../utils/rules'
import userApi from '../../apis/user.api'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Button from '../Button'
import { ErrorResponse, ValidationErrors } from '../../types/utils.type'
import { isAxiosBadRequestError, isAxiosError } from '../../utils/utils'
import Spinner from '../Spinner'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store'
import { loginSuccess } from '../../store/user.slice'

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LoginForm(props: Props) {
  const { setShowModal } = props
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginType>({
    resolver: yupResolver(loginSchema)
  })
  const loginMutation = useMutation({
    mutationFn: (body: LoginType) => userApi.login(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
          setShowSuccess(true)
          setTimeout(() => {
            dispatch(loginSuccess(response.data.data.user))
            navigate('/')
          }, 1000)
        }, 1000)
      },
      onError: (error) => {
        if (isAxiosBadRequestError<ErrorResponse<ValidationErrors>>(error)) {
          setError('email', {
            type: 'custom',
            message: error.response?.data.errors?.email?.msg
          })
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (isAxiosError<ErrorResponse<any>>(error) && error.status === 401) {
          setError('email', {
            type: 'custom',
            message: error.response?.data.message
          })
        }
      }
    })
  })
  return (
    <div>
      <div>
        <AnimatePresence>
          <motion.div
            className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className='relative bg-gray-900 text-white p-6 rounded-2xl shadow-2xl max-w-md w-full transform'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Nút đóng */}
              <button
                onClick={() => setShowModal(false)}
                className='absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition'
              >
                <X className='w-5 h-5 text-gray-400' />
              </button>
              <div className='flex justify-center mb-4'>
                <img
                  alt='Large X logo'
                  className='w-[60px] rounded-sm'
                  height={15}
                  src='https://storage.googleapis.com/a1aa/image/ydcIwrOeytAcDcPoppFf2tMrnygco5m02cABuN5A8tg.jpg'
                  width={15}
                />
              </div>
              <h2 className='text-2xl font-bold text-center'>Sign in to your account</h2>
              <form className='mt-4' onSubmit={onSubmit}>
                <div className='mb-4'>
                  <input
                    type='email'
                    placeholder='Name'
                    className='w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700  transition'
                    {...register('email')}
                  />
                  <div className='text-sm text-red-500 mt-1'>{errors.email?.message}</div>
                </div>

                <div className='mb-4 relative'>
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder='Password'
                    className='w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700  transition'
                    {...register('password')}
                  />
                  <button
                    type='button'
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className='absolute right-3 top-3 text-gray-400'
                  >
                    {passwordVisible ? <EyeOff /> : <Eye />}
                  </button>

                  <div className='text-sm text-red-500 mt-1'>{errors.password?.message}</div>
                </div>
                <Button className={'w-full p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition'}>
                  Sign in
                </Button>
              </form>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className='fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg'
          >
            🎉 Login successfully!
          </motion.div>
        )}
      </div>
      {isLoading && <Spinner />}
    </div>
  )
}
