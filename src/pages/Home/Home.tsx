export default function Home() {
  return (
    <>
      <div className='bg-black text-white'>
        <div className='flex min-h-screen'>
          {/* Sidebar */}
          <div className='hidden lg:block w-1/5 bg-black p-4 space-y-4'>
            <div className='flex items-center space-x-2'>
              <i className='fab fa-twitter text-2xl'></i>
            </div>
            <nav className='space-y-4'>
              <a className='flex items-center space-x-2 text-xl' href='#'>
                <i className='fas fa-home'></i>
                <span>Home</span>
              </a>
              <a className='flex items-center space-x-2 text-xl' href='#'>
                <i className='fas fa-search'></i>
                <span>Discover</span>
              </a>
              <a className='flex items-center space-x-2 text-xl' href='#'>
                <i className='fas fa-bell'></i>
                <span>Notification</span>
              </a>
              <a className='flex items-center space-x-2 text-xl' href='#'>
                <i className='fas fa-envelope'></i>
                <span>Message</span>
              </a>
              <a className='flex items-center space-x-2 text-xl' href='#'>
                <i className='fas fa-flask'></i>
                <span>Grok</span>
              </a>
              <a className='flex items-center space-x-2 text-xl' href='#'>
                <i className='fas fa-list'></i>
                <span>Lists</span>
              </a>
              <a className='flex items-center space-x-2 text-xl' href='#'>
                <i className='fas fa-bookmark'></i>
                <span>Bookmarks</span>
              </a>
              <a className='flex items-center space-x-2 text-xl' href='#'>
                <i className='fas fa-briefcase'></i>
                <span>Jobs</span>
              </a>
              <a className='flex items-center space-x-2 text-xl' href='#'>
                <i className='fas fa-users'></i>
                <span>Community</span>
              </a>
              <a className='flex items-center space-x-2 text-xl' href='#'>
                <i className='fas fa-star'></i>
                <span>Premium</span>
              </a>
              <a className='flex items-center space-x-2 text-xl' href='#'>
                <i className='fas fa-building'></i>
                <span>Organizations</span>
              </a>
              <a className='flex items-center space-x-2 text-xl' href='#'>
                <i className='fas fa-file'></i>
                <span>Files</span>
              </a>
              <a className='flex items-center space-x-2 text-xl' href='#'>
                <i className='fas fa-ellipsis-h'></i>
                <span>More</span>
              </a>
            </nav>
            <button className='bg-white text-black rounded-full px-4 py-2 mt-4'>Post</button>
            <div className='flex items-center space-x-2 mt-4'>
              <img alt='User profile picture' className='rounded-full' src='https://placehold.co/40x40' />
              <span>Favor</span>
            </div>
          </div>
          {/* Main Content */}
          <div className='flex-grow w-[clamp(300px,80vw,1200px)] mx-auto transition-all duration-300'>
            <div className='p-4 border-b border-gray-700'>
              <h2 className='text-xl font-bold'>For you</h2>
              <div className='flex items-center mt-4'>
                <img alt='User profile picture' className='rounded-full' src='https://placehold.co/40x40' />
                <input
                  className='bg-black text-white ml-4 flex-grow outline-none'
                  placeholder="What's going on?"
                  type='text'
                />
              </div>
              <div className='flex justify-between mt-4'>
                <div className='flex space-x-4'>
                  <i className='far fa-image'></i>
                  <i className='fas fa-chart-bar'></i>
                  <i className='far fa-smile'></i>
                  <i className='far fa-calendar-alt'></i>
                  <i className='fas fa-map-marker-alt'></i>
                </div>
                <button className='bg-blue-500 text-white rounded-full px-4 py-2'>Post</button>
              </div>
            </div>
            <div className='p-4 border-b border-gray-700'>
              <p className='text-blue-500'>Show 35 posts</p>
            </div>
            <div className='p-4 border-b border-gray-700'>
              <div className='flex items-center space-x-2'>
                <img alt='User profile picture' className='rounded-full' src='https://placehold.co/40x40' />
                <div>
                  <span className='font-bold'>Elon Musk</span>
                  <span className='text-gray-500'>@elonmusk · March 20</span>
                </div>
              </div>
              <p className='mt-2'>
                Reservoir
                <span className='text-blue-500'>DOGE</span>
              </p>
              <img alt='Elon Musk with DOGE sign' className='mt-2' src='https://placehold.co/500x300' />
              <div className='flex justify-between mt-2 text-gray-500'>
                <span>
                  <i className='far fa-comment'></i>
                  14K
                </span>
                <span>
                  <i className='fas fa-retweet'></i>
                  23K
                </span>
                <span>
                  <i className='far fa-heart'></i>
                  216K
                </span>
                <span>
                  <i className='fas fa-share'></i>
                  29K
                </span>
              </div>
            </div>
            <div className='p-4 border-b border-gray-700'>
              <div className='flex items-center space-x-2'>
                <img alt='User profile picture' className='rounded-full' src='https://placehold.co/40x40' />
                <div>
                  <span className='font-bold'>Zacharias Creutznacher</span>
                  <span className='text-gray-500'>@Sairahcaz2k · March 20</span>
                </div>
              </div>
              <p className='mt-2'>
                Simple multi tenancy for
                <span className='text-blue-500'>laravelphp</span>
              </p>
              <img alt='Code snippet' className='mt-2' src='https://placehold.co/500x300' />
              <div className='flex justify-between mt-2 text-gray-500'>
                <span>
                  <i className='far fa-comment'></i>
                  14K
                </span>
                <span>
                  <i className='fas fa-retweet'></i>
                  23K
                </span>
                <span>
                  <i className='far fa-heart'></i>
                  216K
                </span>
                <span>
                  <i className='fas fa-share'></i>
                  29K
                </span>
              </div>
            </div>
          </div>
          {/* Right Sidebar */}
          <div className='hidden lg:block w-1/5 p-4 space-y-4'>
            <div className='relative'>
              <input
                className='bg-gray-800 text-white rounded-full px-4 py-2 w-full'
                placeholder='Search'
                type='text'
              />
              <i className='fas fa-search absolute top-2 right-4 text-gray-500'></i>
            </div>
            <div className='bg-gray-800 p-4 rounded-lg'>
              <h3 className='font-bold'>Sign up for Premium</h3>
              <p className='text-gray-500 mt-2'>
                Sign up to unlock new features and, if eligible, earn a revenue share for content creators.
              </p>
              <button className='bg-blue-500 text-white rounded-full px-4 py-2 mt-4'>Register</button>
            </div>
            <div className='bg-gray-800 p-4 rounded-lg'>
              <h3 className='font-bold'>What's Happening</h3>
              <ul className='mt-2 space-y-2'>
                <li>
                  <span className='text-blue-500'>Tokens</span>
                  <span className='text-gray-500'>156K posts</span>
                </li>
                <li>
                  <span className='text-blue-500'>Digital</span>
                  <span className='text-gray-500'>388K posts</span>
                </li>
                <li>
                  <span className='text-blue-500'>Alike</span>
                  <span className='text-gray-500'>1,817 posts</span>
                </li>
                <li>
                  <span className='text-blue-500'>Ronin</span>
                  <span className='text-gray-500'>16.2K posts</span>
                </li>
              </ul>
              <button className='text-blue-500 mt-2'>Show more</button>
            </div>
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
            <div className='text-gray-500 text-sm'>
              <p>Terms of Service Privacy Policy Cookie Policy Accessibility Advertising information More ...</p>
              <p className='mt-2'>© 2025 X Corp.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
