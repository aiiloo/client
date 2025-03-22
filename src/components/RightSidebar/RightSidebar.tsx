export default function RightSidebar() {
  return (
    <>
      <div className='hidden lg:block w-[25%] p-4 space-y-4 absolute right-0 top-0 h-full'>
        <div className='relative'>
          <input className='bg-gray-800 text-white rounded-full px-4 py-2 w-full' placeholder='Search' type='text' />
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
        {/* <div className='text-gray-500 text-sm'>
    <p>Terms of Service Privacy Policy Cookie Policy Accessibility Advertising information More ...</p>
    <p className='mt-2'>© 2025 X Corp.</p>
  </div> */}
      </div>
    </>
  )
}
