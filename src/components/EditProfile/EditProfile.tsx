import { useEffect, useRef, useState } from 'react'
import userApi from '../../apis/user.api'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { ProfileUser } from '../../types/user.type'
import { updateCurrentUser } from '../../store/user.slice'
import Spinner from '../Spinner'
import { motion } from 'framer-motion'

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  userInfo: ProfileUser
}

export default function EditProfile(props: Props) {
  const avatarRef = useRef<HTMLInputElement | null>(null)
  const coverPhotoRef = useRef<HTMLInputElement | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const user = useSelector((state: RootState) => state.user.currentUser)
  const dispatch = useDispatch()
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const [isShowSpinner, setIsShowSpinner] = useState(false)

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      ...user
    }
  })

  const handleFileUpload = (name: string) => {
    if (avatarRef.current && name === 'avatar') {
      avatarRef.current.click()
    }
    if (coverPhotoRef.current && name === 'cover_photo') {
      coverPhotoRef.current.click()
    }
  }

  const updateProfileMutation = useMutation({
    mutationFn: (body: ProfileUser | FormData) => userApi.updateProfile(body)
  })

  const onSubmit = handleSubmit((data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const formData = new FormData()
    formData.append('name', data?.name ?? '')
    formData.append('date_of_birth', data?.date_of_birth ?? '')
    formData.append('bio', data?.bio ?? '')
    formData.append('location', data?.location ?? '')
    formData.append('website', data?.website ?? '')
    formData.append('avatar', data?.avatar ? data?.avatar[0] : '')
    formData.append('cover_photo', data?.cover_photo ? data?.cover_photo[0] : '')

    updateProfileMutation.mutate(formData, {
      onSuccess: async (data) => {
        dispatch(updateCurrentUser(data.data.data))
        props.setIsOpen(false)
        setIsShowSpinner(true)
        await delay(500)
        setIsShowSpinner(false)

        setShowSuccess(true)
        await delay(2000)
        setShowSuccess(false)
      },
      onError: (error) => {
        console.log('error', error)
      }
    })
  })

  useEffect(() => {
    if (props.isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [props.isOpen])

  return (
    <>
      {props.isOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 min-h-screen'>
          <div className='bg-gray-800 text-white rounded-2xl p-8 w-screen max-w-xl h-4/5 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/40'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Edit profile</h2>
              <button className='text-white'>
                <svg
                  className='w-6 h-6 dark:text-white'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  width={24}
                  height={24}
                  fill='none'
                  viewBox='0 0 24 24'
                  onClick={() => props.setIsOpen(false)}
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18 17.94 6M18 18 6.06 6'
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={onSubmit} encType='multipart/form-data'>
              <div className='relative mb-4'>
                <div className='relative w-full h-40 mb-4'>
                  <img
                    alt='Cover photo'
                    className='w-full h-full object-cover rounded-lg'
                    height={200}
                    src={
                      user?.cover_photo
                        ? `http://localhost:4000/assets/images/${user.cover_photo}`
                        : 'https://storage.googleapis.com/a1aa/image/EXcmct0yhW-2XRhTq_U1d1F_lIRIJWqVdO0Uul6F3HE.jpg'
                    }
                    width={600}
                  />
                  <button
                    onClick={() => handleFileUpload('cover_photo')}
                    className='absolute inset-0 flex items-center justify-center text-white bg-gray-800 bg-opacity-50 rounded-lg'
                    type='button'
                  >
                    <svg
                      className='w-7 h-7 dark:text-white'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      width={28}
                      height={28}
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z'
                      />
                      <path
                        stroke='currentColor'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                      />
                    </svg>
                  </button>
                  <Controller
                    name='cover_photo'
                    control={control}
                    defaultValue={''}
                    render={({ field }) => (
                      <input
                        hidden={true}
                        type='file'
                        ref={coverPhotoRef}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          field.onChange(e.target?.files)
                        }}
                      />
                    )}
                  />
                  {/* <input {...register('cover_photo')} ref={fileInputRef} type='file' hidden={true} /> */}
                </div>
                <div className='relative w-24 h-24 mx-auto mb-4 -mt-12'>
                  <img
                    alt='Profile picture'
                    className='w-[96px] h-[96px] rounded-full border-4 border-gray-800'
                    src={
                      user?.avatar
                        ? `http://localhost:4000/assets/images/${user.avatar}`
                        : 'https://storage.googleapis.com/a1aa/image/9JuhMp-7e2Zy5Xs3dY1OLvxPGgW8J1izniRgkq1nmrU.jpg'
                    }
                  />
                  <button
                    onClick={() => handleFileUpload('avatar')}
                    className='absolute inset-0 flex items-center justify-center text-white bg-gray-800 bg-opacity-50 rounded-full'
                    type='button'
                  >
                    <svg
                      className='w-7 h-7 dark:text-white'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      width={28}
                      height={28}
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z'
                      />
                      <path
                        stroke='currentColor'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                      />
                    </svg>
                  </button>
                  <Controller
                    name='avatar'
                    control={control}
                    defaultValue={''}
                    render={({ field }) => (
                      <input
                        hidden={true}
                        type='file'
                        ref={avatarRef}
                        onChange={(e) => field.onChange(e.target?.files)}
                      />
                    )}
                  />
                  {/* <input {...register('avatar')} ref={fileInputRef} type='file' hidden={true} /> */}
                </div>
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium' htmlFor='name'>
                  Name
                </label>
                <input
                  className='w-full bg-gray-700 border border-gray-600 rounded-lg p-2 mt-1 text-white'
                  id='name'
                  {...register('name')}
                  type='text'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium' htmlFor='bio'>
                  Bio
                </label>
                <textarea
                  className='w-full bg-gray-700 border border-gray-600 rounded-lg p-2 mt-1 text-white'
                  id='bio'
                  {...register('bio')}
                />
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium' htmlFor='location'>
                  Location
                </label>
                <input
                  className='w-full bg-gray-700 border border-gray-600 rounded-lg p-2 mt-1 text-white'
                  id='location'
                  type='text'
                  {...register('location')}
                />
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium' htmlFor='website'>
                  Website
                </label>
                <input
                  className='w-full bg-gray-700 border border-gray-600 rounded-lg p-2 mt-1 text-white'
                  id='website'
                  type='text'
                  {...register('website')}
                />
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium' htmlFor='birthday'>
                  Birthday
                </label>
                <input
                  className='w-full bg-gray-700 border border-gray-600 rounded-lg p-2 mt-1 text-white'
                  id='birthday'
                  type='date'
                  {...register('date_of_birth')}
                />
              </div>
              <div className='flex justify-end'>
                <button className='bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2' type='submit'>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isShowSpinner && <Spinner />}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className='fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg'
        >
          🎉 update profile successfully
        </motion.div>
      )}
    </>
  )
}
