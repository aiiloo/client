import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { X, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { getDaysInMonth, handleYearChange } from '../../utils/date'
import { useMutation } from '@tanstack/react-query'
import { registerSchema, RegisterType } from '../../utils/rules'
import userApi from '../../apis/user.api'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import Spinner from '../Spinner'
import Button from '../Button'
import { isAxiosBadRequestError } from '../../utils/utils'
import { ErrorResponse, ValidationErrors } from '../../types/utils.type'

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RegisterForm({ setShowModal }: Props) {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(1)
  const [selectedYear, setSelectedYear] = useState(2024)
  const [selectedDay, setSelectedDay] = useState(1)

  const [isShowSpinner, setIsShowSpinner] = useState(false)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<RegisterType>({
    resolver: yupResolver(registerSchema)
  })

  const registerMutation = useMutation({
    mutationFn: (body: RegisterType) => userApi.register(body)
  })

  const onSubmit = handleSubmit((data) => {
    const dateText = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
    const date = new Date(dateText).toISOString()
    const dataSubmit = {
      ...data,
      date_of_birth: date
    }

    registerMutation.mutate(dataSubmit, {
      onSuccess: () => {
        setIsShowSpinner(true)
        setTimeout(() => {
          setIsShowSpinner(false)
          navigate('/pending-verify')
        }, 500)
      },
      onError: (error) => {
        console.log('error', error)
        if (isAxiosBadRequestError<ErrorResponse<ValidationErrors>>(error)) {
          setError('email', {
            type: 'custom',
            message: error.response?.data.errors?.email?.msg
          })
        }
      }
    })
  })
  console.log(errors)

  return (
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

            {/* Logo */}
            {/* <div className='flex justify-center mb-4'>
            <div className='bg-blue-500 p-3 rounded-full'>
              <span className='text-white text-2xl font-bold'>X</span>
            </div>
          </div> */}

            <h2 className='text-2xl font-bold text-center'>Create Your Account</h2>

            <form className='mt-4' onSubmit={onSubmit}>
              <div className='mb-4'>
                <input
                  type='text'
                  placeholder='Name'
                  className='w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700  transition'
                  {...register('name')}
                />
                <div className='text-sm text-red-500 mt-1'>{errors.name?.message}</div>
              </div>
              <div className='mb-4'>
                <input
                  type='email'
                  placeholder='Email'
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
              <div className='mb-4 relative'>
                <input
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  placeholder='Confirm Password'
                  className='w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700  transition'
                  {...register('confirm_password')}
                />
                <button
                  type='button'
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  className='absolute right-3 top-3 text-gray-400'
                >
                  {confirmPasswordVisible ? <EyeOff /> : <Eye />}
                </button>
                <div className='text-sm text-red-500 mt-1'>{errors.confirm_password?.message}</div>
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-semibold mb-1'>Date of Birth</label>
                <div className='flex space-x-2'>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    className='w-1/3 p-3 bg-gray-800 text-white rounded-lg border border-gray-700 '
                  >
                    {[...Array(12)].map((_, i) => (
                      <option key={i} value={i + 1}>{`Month ${i + 1}`}</option>
                    ))}
                  </select>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(Number(e.target.value))}
                    className='w-1/3 p-3 bg-gray-800 text-white rounded-lg border border-gray-700 '
                  >
                    {[...Array(getDaysInMonth(selectedMonth, selectedYear))].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedYear}
                    onChange={(e) =>
                      handleYearChange(
                        Number(e.target.value),
                        selectedDay,
                        selectedMonth,
                        setSelectedYear,
                        setSelectedDay
                      )
                    }
                    className='w-1/3 p-3 bg-gray-800 text-white rounded-lg border border-gray-700 '
                  >
                    {[...Array(100)].map((_, i) => (
                      <option key={i} value={1925 + i}>
                        {1925 + i}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button
                className={'w-full p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition'}
                isLoading={registerMutation.isPending}
                disabled={registerMutation.isPending}
              >
                Sign up
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      {isShowSpinner && <Spinner />}
    </div>
  )
}
