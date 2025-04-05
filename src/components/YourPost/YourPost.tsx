import { useQuery } from '@tanstack/react-query'
import postApi from '../../apis/post.api'
import { useParams } from 'react-router-dom'
import { Post } from '../../types/post.type'

export default function YourPost() {
  const { username } = useParams()

  const { data } = useQuery({
    queryKey: ['your-post', username],
    queryFn: () => {
      return postApi.getYourPost(username || '')
    }
  })
  return (
    <div className='p-4 border-b border-gray-700'>
      {data &&
        data.data.data.map((item: Post, index: number) => {
          return (
            <div key={`your-post-${index}`} className='p-4 border-b border-gray-700'>
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
                      key={`your-media-${index}`}
                      alt='Elon Musk with DOGE sign'
                      className='mt-2 ml-4 md:w-[516px] md:h-[516px] w-auto h-auto'
                      src={`http://localhost:4000/assets/images/${media.url}`}
                    />
                  )
                return (
                  <video
                    key={`your-media-${index}`}
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
  )
}
