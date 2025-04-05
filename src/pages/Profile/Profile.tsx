import { Link, useParams } from 'react-router-dom'
import RightSidebar from '../../components/RightSidebar'
import userApi from '../../apis/user.api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { NavLink, Outlet } from 'react-router-dom'
import classNames from 'classnames'
import { useMemo } from 'react'

export default function Profile() {
  const { username } = useParams()

  const { data } = useQuery({
    queryKey: ['userInfo', username],
    queryFn: () => {
      return userApi.yourProfile(username || '')
    }
  })

  const queryClient = useQueryClient()
  const totalPost = queryClient.getQueryData(['your-post', username])

  return (
    <>
      <div className='max-w-2xl xl:min-w-[700px] mx-auto border-2 border-solid border-gray-800'>
        {/* Header */}
        <div className='relative'>
          <img
            alt=' Header image with a dark gradient and ar.io text'
            className='w-full h-48 object-cover'
            height={200}
            src={
              data?.data.data.cover_photo
                ? `http://localhost:4000/assets/images/${data?.data.data.cover_photo}`
                : 'https://storage.googleapis.com/a1aa/image/KmEUuoeZ1SAh4MOM3Tb3hDG632P6lyc8vSsDHbYZy3o.jpg'
            }
            width={600}
          />
          <div className='absolute top-4 left-4 flex items-center space-x-2'>
            <button className='bg-gray-800 p-2 rounded-full'>
              <svg
                className='w-6 h-6 text-white'
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
                  d='M5 12h14M5 12l4-4m-4 4 4 4'
                />
              </svg>
            </button>
            <p className='text-gray-400'>{totalPost ? totalPost.data.data.length : 0} posts</p>
            {/* <span className='text-xl font-bold'>{data?.data.data.name}</span> */}
          </div>
          <div className=' absolute bottom-4 left-4 flex items-center space-x-2'>
            <img
              alt='ar.io network logo'
              className='md:w-[100px] md:h-[100px] w-[70px] h-[70px] rounded-full'
              src={data?.data.data.avatar}
            />
            {/* <div>
              <h1 className='text-2xl font-bold'>
                {data?.data.data.name}
                <i className='fas fa-check-circle text-blue-500'></i>
              </h1>
            </div> */}
          </div>
          <div className='absolute bottom-4 right-4 flex space-x-2'>
            {/* <button className='bg-gray-800 p-2 rounded-full'>
              <i className='fas fa-ellipsis-h text-white'></i>
            </button>
            <button className='bg-gray-800 p-2 rounded-full'>
              <i className='fas fa-search text-white'></i>
            </button> */}
            <button className='bg-gray-800 p-2 rounded-full hover:bg-gray-600' title='message'>
              <svg
                className='w-6 h-6 text-white'
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
                  d='M4 13h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9'
                />
              </svg>
            </button>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-full font-bold hover:bg-blue-600'>
              Follow
            </button>
          </div>
        </div>
        {/* Profile Info */}
        <div className='p-4'>
          <h2 className='text-xl font-bold'>
            {data?.data.data.name}
            <i className='fas fa-check-circle text-blue-500'></i>
          </h2>
          <p className='text-gray-400'>{data?.data.data.username}</p>
          <div className='text-gray-400'>
            <p className='mt-2'>{data?.data.data.bio}</p>
          </div>
          <div className='mt-2 text-gray-400 flex flex-wrap'>
            {data?.data.data.location ? (
              <>
                <svg
                  className='w-6 h-6 text-white mr-1'
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
                    d='M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'
                  />
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z'
                  />
                </svg>
                <span className='mr-1'>{data?.data.data.location}</span>
              </>
            ) : (
              <></>
            )}
            {data?.data.data.website ? (
              <>
                <svg
                  className='w-6 h-6 text-white mr-1'
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
                    d='M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961'
                  />
                </svg>
                <Link className='text-blue-500 mr-2 truncate w-40' to={data?.data.data.website}>
                  {data?.data.data.website}
                </Link>
              </>
            ) : (
              <></>
            )}
            <span className='mr-1'>
              {' '}
              Joined {data?.data.data.created_at && format(new Date(data?.data.data.created_at), 'MM/yyyy')}
            </span>
          </div>
          <div className='mt-3 flex flex-wrap text-gray-400'>
            <p className='mr-2'>
              <span className='font-bold mr-1 text-white'>705</span>
              Following
            </p>
            <p className='ml-2'>
              <span className='font-bold mr-1 text-white'>97.5K</span>
              Followers
            </p>
          </div>
          {/* <p className='text-gray-400 mt-1'>Not followed by anyone you're following</p> */}
        </div>
        {/* Navigation */}
        <div className='flex justify-around border-b border-gray-700'>
          <NavLink
            end
            className={({ isActive }) =>
              classNames('py-2 px-4 border-b-2 transition-colors duration-200', {
                'text-blue-500 border-blue-500': isActive,
                'text-gray-400 border-transparent': !isActive
              })
            }
            to={``}
          >
            Posts
          </NavLink>
          {/* <a className='py-2 px-4 text-gray-400' href='#'>
          Affiliates
        </a> */}
          {/* <NavLink
            className={({ isActive }) =>
              classNames('py-2 px-4 border-b-2 transition-colors duration-200', {
                'text-blue-500 border-blue-500': isActive,
                'text-gray-400 border-transparent': !isActive
              })
            }
            to={`with_replies`}
          >
            Replies
          </NavLink> */}
          {/* <a className='py-2 px-4 text-gray-400' href='#'>
          Highlights
        </a> */}
          {/* <a className='py-2 px-4 text-gray-400' href='#'>
          Articles
        </a> */}
          <NavLink
            className={({ isActive }) =>
              classNames('py-2 px-4 border-b-2 transition-colors duration-200', {
                'text-blue-500 border-blue-500': isActive,
                'text-gray-400 border-transparent': !isActive
              })
            }
            to={`media`}
          >
            Media
          </NavLink>
        </div>
        {/* Post */}
        <Outlet />
      </div>
      <RightSidebar />
    </>
  )
}
