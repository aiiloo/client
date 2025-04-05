import { useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import postApi from '../../apis/post.api'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { Post } from '../../types/post.type'

export default function MainContent() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [reply, setReply] = useState('Everyone')
  const medias = useRef<HTMLInputElement | null>(null)
  const [isPostDisabled, setIsPostDisabled] = useState(false)
  const [filesError, setFilesError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const { register, control, handleSubmit, watch } = useForm({})

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation() // Ngăn sự kiện lan truyền
    console.log('Dropdown toggled')
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        console.log('Click outside detected, closing dropdown')
        setIsOpen(false)
      }
    }

    // Thay 'mousedown' thành 'click' để đồng bộ với onClick
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleReplyChange = (name: string, event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation() // Ngăn sự kiện lan truyền lên document
    setReply(name)
    setIsOpen(false) // Đóng dropdown ngay sau khi chọn
  }

  const handleUploadVideoOrImage = () => {
    if (medias.current) {
      medias.current.click()
    }
  }

  const mediasFiles = watch('medias')

  useMemo(() => {
    if (mediasFiles) {
      const files = Array.from(mediasFiles as FileList) // Chuyển FileList thành mảng
      const videoCount = files.filter((file) => file.type.startsWith('video/')).length
      const imageCount = files.filter((file) => file.type.startsWith('image/')).length
      if (videoCount > 1 || imageCount > 5 || (videoCount >= 1 && imageCount >= 1)) {
        setIsPostDisabled(true)
        setFilesError(true)
      } else {
        setIsPostDisabled(false)
        setFilesError(false)
      }
    } else {
      setIsPostDisabled(false) // Không có file nào thì enable nút
    }
  }, [mediasFiles])

  const newPost = useMutation({
    mutationFn: (body: FormData) => postApi.createPost(body)
  })

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData()
    formData.append('content', data.content)
    formData.append('audience', reply === 'Everyone' ? '0' : '1')
    if (mediasFiles) {
      for (let i = 0; i < mediasFiles.length; i++) {
        formData.append('medias', mediasFiles[i])
      }
    }

    newPost.mutate(formData, {
      onSuccess: async () => {
        setTimeout(() => {
          setShowSuccess(true)
        }, 2000)
        setShowSuccess(false)
      },
      onError: (error) => {
        console.log('error', error)
      }
    })
  })

  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => {
      return postApi.getAllPost()
    }
  })

  return (
    <>
      <div className='w-full lg:w-[calc(100%-50%)] max-w-[1100px] mx-auto overflow-y-auto h-screen md:p-4 hide-scrollbar'>
        <div className='h-[200vh] bg-gray-800 p-4'>
          <form encType='multipart/form-data' onSubmit={onSubmit}>
            <div className='p-4 border-b border-gray-700'>
              <h2 className='text-xl font-bold'>For you</h2>
              <div className='flex items-center mt-4'>
                <img alt='User profile picture' className='rounded-full' src='https://placehold.co/40x40' />
                <input
                  className='bg-[#1f2937] text-white ml-4 flex-grow outline-none focus:ring-0 border-none'
                  placeholder="What's going on?"
                  type='text'
                  {...register('content')}
                />
              </div>
              <div className='flex flex-wrap mt-5 ml-12'>
                <span className='cursor-pointer flex flex-wrap' ref={dropdownRef} onClick={toggleDropdown}>
                  {reply === 'Everyone' ? (
                    <>
                      <svg
                        className='w-5 h-5 text-[#3F83F8]'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        width={16}
                        height={16}
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeWidth={2}
                          d='M4.37 7.657c2.063.528 2.396 2.806 3.202 3.87 1.07 1.413 2.075 1.228 3.192 2.644 1.805 2.289 1.312 5.705 1.312 6.705M20 15h-1a4 4 0 0 0-4 4v1M8.587 3.992c0 .822.112 1.886 1.515 2.58 1.402.693 2.918.351 2.918 2.334 0 .276 0 2.008 1.972 2.008 2.026.031 2.026-1.678 2.026-2.008 0-.65.527-.9 1.177-.9H20M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                        />
                        <path
                          fillRule='evenodd'
                          d='M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span className='ml-1 text-[#3F83F8]'>Everyone can reply me</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className='w-5 h-5 text-[#3F83F8]'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        width={24}
                        height={24}
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          fillRule='evenodd'
                          d='M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span className='ml-1 text-[#3F83F8]'>Accounts you follow can reply</span>
                    </>
                  )}
                </span>

                <div
                  id='dropdownDivider'
                  className={`z-10 ${isOpen ? 'block' : 'hidden'} bg-[#1f2937] rounded-lg shadow-lg border-gray-700 border w-80 absolute mt-8 p-3`}
                >
                  <div>
                    <div className='font-bold'>Who can reply?</div>
                    <div className='mt-1 text-gray-400'>
                      Choose who can reply to this post. Anyone mentioned can always reply.
                    </div>
                  </div>
                  <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownDividerButton'>
                    <li>
                      <div
                        className=' px-4 py-4 hover:bg-gray-100 hover:text-black text-white text-lg flex flex-wrap cursor-pointer'
                        onClick={(event) => handleReplyChange('Everyone', event)}
                      >
                        <svg
                          className='w-6 h-6 dark:text-white mr-2'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          width={16}
                          height={16}
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeWidth={2}
                            d='M4.37 7.657c2.063.528 2.396 2.806 3.202 3.87 1.07 1.413 2.075 1.228 3.192 2.644 1.805 2.289 1.312 5.705 1.312 6.705M20 15h-1a4 4 0 0 0-4 4v1M8.587 3.992c0 .822.112 1.886 1.515 2.58 1.402.693 2.918.351 2.918 2.334 0 .276 0 2.008 1.972 2.008 2.026.031 2.026-1.678 2.026-2.008 0-.65.527-.9 1.177-.9H20M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                          />
                        </svg>
                        Everyone
                      </div>
                    </li>
                    <li>
                      <div
                        className='flex flex-wrap px-4 py-4 hover:bg-gray-100 hover:text-black text-white text-lg cursor-pointer'
                        onClick={(event) => handleReplyChange('Accounts you follow', event)}
                      >
                        <svg
                          className='w-6 h-6 dark:text-white mr-2'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          width={24}
                          height={24}
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            fillRule='evenodd'
                            d='M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z'
                            clipRule='evenodd'
                          />
                        </svg>
                        Accounts you follow
                      </div>
                    </li>
                    {/* <li>
                      <a
                        href='#'
                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                      >
                        Earnings
                      </a>
                    </li> */}
                  </ul>
                  {/* <div className='py-2'>
                    <a
                      href='#'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                    >
                      Separated link
                    </a>
                  </div> */}
                </div>
              </div>
              <div className='border-b-2 border-gray-700 mt-3 ml-12 mr-4'></div>
              <div className='flex justify-between mt-4 ml-12'>
                <div className='flex space-x-4'>
                  <svg
                    className='w-5 h-5 dark:text-white cursor-pointer'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    width={24}
                    height={24}
                    fill='none'
                    viewBox='0 0 24 24'
                    onClick={handleUploadVideoOrImage}
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z'
                    />
                  </svg>
                  <Controller
                    name='medias'
                    control={control}
                    defaultValue={''}
                    render={({ field }) => (
                      <input
                        hidden={true}
                        type='file'
                        multiple
                        ref={medias}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          field.onChange(e.target?.files)
                        }}
                      />
                    )}
                  />
                  <svg
                    className='w-5 h-5  dark:text-white cursor-pointer'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    width={24}
                    height={24}
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z'
                    />
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17 13c0 2.038-2.239 4.5-5 4.5S7 15.038 7 13c0 1.444 10 1.444 10 0Z'
                    />
                    <path
                      fill='currentColor'
                      d='m9 6.811.618 1.253 1.382.2-1 .975.236 1.377L9 9.966l-1.236.65L8 9.239l-1-.975 1.382-.2L9 6.811Zm6 0 .618 1.253 1.382.2-1 .975.236 1.377L15 9.966l-1.236.65L14 9.239l-1-.975 1.382-.2L15 6.811Z'
                    />
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='m9 6.811.618 1.253 1.382.2-1 .975.236 1.377L9 9.966l-1.236.65L8 9.239l-1-.975 1.382-.2L9 6.811Zm6 0 .618 1.253 1.382.2-1 .975.236 1.377L15 9.966l-1.236.65L14 9.239l-1-.975 1.382-.2L15 6.811Z'
                    />
                  </svg>

                  <i className='far fa-calendar-alt'></i>
                  <i className='fas fa-map-marker-alt'></i>
                </div>
                {/* <button className=' bg-blue-500 text-white  font-bold rounded-full px-6 py-3'>Post</button> */}
                <button
                  disabled={isPostDisabled}
                  type='submit'
                  className='disabled:opacity-50 disabled:pointer-events-none font-bold  
                  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 
                   shadow-lg shadow-blue-500/50 dark:shadow-lg 
                   rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 '
                >
                  Post
                </button>
              </div>
              {filesError === true ? (
                <div className='text-red-500'>Maximum 1 video or 5 images</div>
              ) : (
                <div className='flex flex-wrap'>
                  {mediasFiles &&
                    Array.from(mediasFiles as FileList).map((item, index) => {
                      console.log('item', item)
                      const previewUrl = URL.createObjectURL(item)
                      if (item.type === 'video/mp4')
                        return (
                          <video
                            className='w-full h-full max-w-[516px] max-h-[516px] object-contain mt-1'
                            src={previewUrl}
                            key={`review-${index}`}
                            controls
                            autoPlay
                            loop
                          />
                        )
                      return (
                        <img
                          className='w-60 h-60 m-3 object-cover rounded-lg'
                          src={previewUrl}
                          key={`review-${index}`}
                        />
                      )
                    })}
                </div>
              )}
            </div>
          </form>
          <div className='p-4 border-b border-gray-700'>
            <p className='text-blue-500'>Show 35 posts</p>
          </div>
          {data &&
            data.data.data.map((item: Post, index: number) => {
              return (
                <div key={`post-${index}`} className='p-4 border-b border-gray-700'>
                  <div className=' flex items-center space-x-2'>
                    <img alt='User profile picture' className='rounded-full w-10 h-10' src={item.user.avatar} />
                    <div>
                      <span className='font-bold'>{item.user.name}</span>
                      <span className='text-gray-500 ml-1'>@{item.user.username}</span>
                    </div>
                  </div>
                  <p className='mt-2'>{item.content}</p>
                  {item.medias.map((media, index: number) => {
                    if (media.type === 0)
                      return (
                        <img
                          key={`media-${index}`}
                          alt='Elon Musk with DOGE sign'
                          className='mt-2 ml-4 md:w-[516px] md:h-[516px] w-auto h-auto'
                          src={`http://localhost:4000/assets/images/${media.url}`}
                        />
                      )
                    return (
                      <video
                        key={`media-${index}`}
                        className='w-full h-full max-w-[516px] max-h-[516px] object-contain mt-1'
                        src={`http://localhost:4000/assets/images/${media.url}`}
                        controls
                        autoPlay
                        loop
                      />
                    )
                  })}

                  <div className='flex justify-between mt-2 text-gray-500'>
                    <div className='flex flex-warp cursor-pointer hover:text-rose-600 group'>
                      <svg
                        className='w-6 h-6 text-gray-500 group-hover:text-rose-600'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        width={24}
                        height={24}
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z'
                        />
                      </svg>

                      <p className='mt-1 ml-1'>14k</p>
                    </div>
                    <div className='flex flex-warp cursor-pointer'>
                      <svg
                        className='w-6 h-6 text-gray-500 hover:text-green-500'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        width={24}
                        height={24}
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3'
                        />
                      </svg>
                    </div>
                    <div className='flex flex-warp cursor-pointer hover:text-blue-400 group'>
                      <svg
                        className='w-6 h-6 text-gray-500 group-hover:text-blue-400'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        width={24}
                        height={24}
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <path
                          stroke='currentColor'
                          strokeWidth={2}
                          d='M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z'
                        />
                        <path stroke='currentColor' strokeWidth={2} d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
                      </svg>
                      <p className='mt-1 ml-1'>24k</p>
                    </div>
                    <div className='flex flex-warp cursor-pointer hover:text-blue-400 group'>
                      <svg
                        className='w-6 h-6 text-gray-500 group-hover:text-blue-400'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        width={24}
                        height={24}
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='m15.141 6 5.518 4.95a1.05 1.05 0 0 1 0 1.549l-5.612 5.088m-6.154-3.214v1.615a.95.95 0 0 0 1.525.845l5.108-4.251a1.1 1.1 0 0 0 0-1.646l-5.108-4.251a.95.95 0 0 0-1.525.846v1.7c-3.312 0-6 2.979-6 6.654v1.329a.7.7 0 0 0 1.344.353 5.174 5.174 0 0 1 4.652-3.191l.004-.003Z'
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className='fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg'
        >
          🎉 create post successfully
        </motion.div>
      )}
    </>
  )
}
