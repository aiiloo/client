import { useMutation } from '@tanstack/react-query'
import { SearchUser, User } from '../../types/user.type'
import userApi from '../../apis/user.api'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function RightSidebar() {
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const searchMutation = useMutation({
    mutationFn: (body: SearchUser) => userApi.search(body),
    onSuccess: (data) => {
      setSearchResults(data.data.data.users || [])
      setShowResults(true)
      console.log('search data: ', data)
    }
  })

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      const sanitizedInput = searchInput.startsWith('@') ? searchInput.slice(1) : searchInput
      searchMutation.mutate({ search_key: sanitizedInput, limit: 5, page: 1 })
    }
  }

  const handleFocus = () => {
    if (searchResults.length > 0) {
      setShowResults(true)
    }
  }

  return (
    <>
      <div className='hidden lg:block w-[25%] p-4 space-y-4 absolute right-0 top-0 h-full overflow-y-auto'>
        <div className='relative' ref={searchRef as React.RefObject<HTMLDivElement>}>
          <input
            className='bg-gray-800 text-white rounded-full px-4 py-2 w-full'
            placeholder='Search'
            type='text'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
          />
          <i className='fas fa-search absolute top-2 right-4 text-gray-500'></i>

          {showResults && (
            <div className='absolute z-10 mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg'>
              {searchMutation.isPending && <div className='text-center text-gray-400 p-3'>Đang tìm kiếm...</div>}

              {searchMutation.isError && (
                <div className='bg-red-800 p-3 rounded text-white'>Đã xảy ra lỗi khi tìm kiếm</div>
              )}

              {searchMutation.isSuccess && searchResults.length > 0 && (
                <div className='p-2'>
                  <h3 className='font-bold p-2'>Kết quả tìm kiếm</h3>
                  <div className='max-h-72 overflow-y-auto'>
                    <ul className='space-y-2'>
                      {searchResults.map((user) => (
                        <Link
                          to={`/profile/${user.username}`}
                          key={user._id}
                          className='flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-lg cursor-pointer'
                        >
                          <img
                            src={user.avatar || 'https://placehold.co/40x40'}
                            className='rounded-full w-10 h-10'
                            alt={user.name}
                          />
                          <div>
                            <p className='font-medium'>{user.name}</p>
                            {user.username && <p className='text-gray-500 text-sm'>@{user.username}</p>}
                          </div>
                        </Link>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {searchMutation.isSuccess && searchResults.length === 0 && (
                <div className='text-center text-gray-400 p-3'>Không tìm thấy kết quả nào</div>
              )}
            </div>
          )}
        </div>

        {/* Premium Promo */}
        <div className='bg-gray-800 p-4 rounded-lg'>
          <h3 className='font-bold'>Sign up for Premium</h3>
          <p className='text-gray-500 mt-2'>
            Sign up to unlock new features and, if eligible, earn a revenue share for content creators.
          </p>
          <button className='bg-blue-500 text-white rounded-full px-4 py-2 mt-4'>Register</button>
        </div>

        {/* What's Happening */}
        <div className='bg-gray-800 p-4 rounded-lg'>
          <h3 className='font-bold'>What's Happening</h3>
          <ul className='mt-2 space-y-2'>
            <li>
              <span className='text-blue-500'>Tokens</span>
              <span className='text-gray-500'> · 156K posts</span>
            </li>
            <li>
              <span className='text-blue-500'>Digital</span>
              <span className='text-gray-500'> · 388K posts</span>
            </li>
            <li>
              <span className='text-blue-500'>Alike</span>
              <span className='text-gray-500'> · 1,817 posts</span>
            </li>
            <li>
              <span className='text-blue-500'>Ronin</span>
              <span className='text-gray-500'> · 16.2K posts</span>
            </li>
          </ul>
          <button className='text-blue-500 mt-2'>Show more</button>
        </div>

        {/* Suggested Follow-up */}
        <div className='bg-gray-800 p-4 rounded-lg'>
          <h3 className='font-bold'>Suggested follow-up</h3>
          <ul className='mt-2 space-y-2'>
            <li className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <img alt='UEFA Champions League logo' className='rounded-full' src='https://placehold.co/40x40' />
                <span>UEFA Champions L...</span>
              </div>
              <button className='bg-blue-500 text-white rounded-full px-4 py-2'>Monitor</button>
            </li>
            <li className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <img alt='Facebook logo' className='rounded-full' src='https://placehold.co/40x40' />
                <span>Facebook</span>
              </div>
              <button className='bg-blue-500 text-white rounded-full px-4 py-2'>Monitor</button>
            </li>
            <li className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <img alt='Pope Francis profile picture' className='rounded-full' src='https://placehold.co/40x40' />
                <span>Pope Francis</span>
              </div>
              <button className='bg-blue-500 text-white rounded-full px-4 py-2'>Monitor</button>
            </li>
          </ul>
          <button className='text-blue-500 mt-2'>Show more</button>
        </div>

        {/* Footer */}
        <div className='text-gray-500 text-sm'>
          <p>Terms of Service Privacy Policy Cookie Policy Accessibility Advertising information More ...</p>
          <p className='mt-2'>© 2025 X Corp.</p>
        </div>
      </div>
    </>
  )
}
