import RightSidebar from '../../components/RightSidebar'
import { useQuery } from '@tanstack/react-query'
import userApi from '../../apis/user.api'
import EditProfile from '../../components/EditProfile'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

export default function MyProfile() {
  // const [data, setData] = useState<User>()
  const [isOpen, setIsOpen] = useState(false)
  const user = useSelector((state: RootState) => state.user.currentUser)

  const { data } = useQuery({
    queryKey: ['userInfo', user?._id],
    queryFn: () => {
      return userApi.myProfile()
    }
  })

  return (
    <>
      <div className='bg-black text-white '>
        <div className='max-w-screen-sm mx-auto m-sm-50'>
          <div className='bg-gray-900 p-4'>
            <div className='flex items-center justify-between'>
              <div className='text-xl font-bold'>{data?.data.data.name}</div>
              <div className='text-sm'>0 posts</div>
            </div>
          </div>
          <div className='bg-gray-800 h-40'></div>
          <div className='bg-gray-900 p-4'>
            <div className='relative flex items-center'>
              <div className='absolute top-auto left-4'>
                <img
                  alt='Profile picture with a purple background and a white letter B'
                  className='rounded-full border-4 border-black w-[100px] h-[100px]'
                  src={
                    data?.data.data.avatar
                      ? `http://localhost:4000/assets/images/${data?.data.data.avatar}`
                      : 'https://storage.googleapis.com/a1aa/image/jVI-8aJKZsDRxFeYuCzWDCY58zjIvN0eE6aZLT2r7CI.jpg'
                  }
                />
              </div>
              <div className='absolute top-3 right-4'>
                <button
                  data-modal-target='default-modal'
                  data-modal-toggle='default-modal'
                  className='border border-gray-600 px-4 py-1 rounded-full hover:bg-[#354352]'
                  type='button'
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Edit profile
                </button>
              </div>
            </div>
            <div className='mt-16'>
              <div className='text-xl font-bold'>{data?.data.data.name}</div>
              <div className='text-gray-500'>{data?.data.data.username}</div>
              <div className='text-gray-500 mt-2'>
                <i className='far fa-calendar-alt'></i> Joined March 2025
              </div>
              <div className='flex mt-2'>
                <div className='mr-4'>
                  <span className='font-bold'>0</span> Following
                </div>
                <div>
                  <span className='font-bold'>0</span> Followers
                </div>
              </div>
            </div>
          </div>
          <div className='bg-green-700 p-4 mt-4 rounded-lg'>
            <div className='flex items-center justify-between'>
              <div>
                <div className='font-bold'>You aren’t verified yet</div>
                <div className='text-sm'>
                  Get verified for boosted replies, analytics, ad-free browsing, and more. Upgrade your profile now.
                </div>
              </div>
              <button className='bg-white text-green-700 px-4 py-1 rounded-full'>Get verified</button>
            </div>
          </div>
          <div className='mt-4'>
            <div className='font-bold text-lg'>Let's get you set up</div>
            <div className='flex mt-4 space-x-4'>
              <div className='bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg text-center'>
                <div className='text-2xl font-bold'>5</div>
                <div className='text-sm'>left</div>
                <div className='mt-2'>Follow 5 accounts</div>
              </div>
              <div className='bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-lg text-center'>
                <div className='text-2xl font-bold'>3</div>
                <div className='text-sm'>left</div>
                <div className='mt-2'>Follow 3 Topics</div>
              </div>
              <div className='bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-lg text-center'>
                <div className='text-2xl font-bold'>DONE</div>
                <div className='mt-2'>Complete your profile</div>
              </div>
              <div className='bg-gradient-to-r from-green-500 to-teal-500 p-4 rounded-lg text-center'>
                <div className='text-2xl font-bold'>DONE</div>
                <div className='mt-2'>Turn on notifications</div>
              </div>
            </div>
          </div>
          <div className='mt-4'>
            <div className='font-bold text-lg'>Who to follow</div>
            <div className='mt-4'>
              <div className='flex items-center justify-between'>
                <div className='grid grid-flow-col grid-rows-3 gap-4'>
                  <div className='row-span-3'>
                    <img
                      className='max-w-10 rounded-full'
                      src='https://storage.googleapis.com/a1aa/image/jVI-8aJKZsDRxFeYuCzWDCY58zjIvN0eE6aZLT2r7CI.jpg'
                    />
                  </div>
                  <div className='row-span-2'>
                    <div className='font-bold'>Diễm My</div>
                    <div className='text-sm text-gray-500'>@DiemMySexy</div>
                    <div className='text-sm'>Em là My. Yêu tất cả các a hihi</div>
                  </div>
                </div>
                <button className='bg-white text-black px-4 py-1 rounded-full'>Follow</button>
              </div>
              <div className='flex items-center justify-between mt-auto'>
                <div className='grid grid-flow-col grid-rows-3 gap-4'>
                  <div className='row-span-3'>
                    <img
                      className='max-w-10 rounded-full'
                      src='https://storage.googleapis.com/a1aa/image/jVI-8aJKZsDRxFeYuCzWDCY58zjIvN0eE6aZLT2r7CI.jpg'
                    />
                  </div>
                  <div className='row-span-2'>
                    <div className='font-bold'>Pé Saa (Tgdd - dm0)</div>
                    <div className='text-sm text-gray-500'>@Saa_oi</div>
                  </div>
                </div>
                <button className='bg-white text-black px-4 py-1 rounded-full'>Follow</button>
              </div>
              <div className='flex items-center justify-between mt-auto'>
                <div className='grid grid-flow-col grid-rows-3 gap-4'>
                  <div className='row-span-3'>
                    <img
                      className='max-w-10 rounded-full'
                      src='https://storage.googleapis.com/a1aa/image/jVI-8aJKZsDRxFeYuCzWDCY58zjIvN0eE6aZLT2r7CI.jpg'
                    />
                  </div>
                  <div className='row-span-2'>
                    <div className='font-bold'>Rau Muống Luộc 🇻🇳</div>
                    <div className='text-sm text-gray-500'>@RauMuongLuocHC</div>
                    <div className='text-sm'>t.me/raumongluoc07</div>
                  </div>
                </div>
                <button className='bg-white text-black px-4 py-1 rounded-full'>Follow</button>
              </div>
              <div className='mt-4 text-blue-500'>Show more</div>
            </div>
          </div>
        </div>
      </div>
      <RightSidebar />
      <EditProfile isOpen={isOpen} setIsOpen={setIsOpen} userInfo={data?.data.data} />
    </>
  )
}
