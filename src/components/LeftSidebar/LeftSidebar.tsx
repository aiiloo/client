export default function LeftSidebar() {
  return (
    <>
      <div className='hidden lg:block w-[20%] bg-black p-4 space-y-4 absolute md:left-20 top-0 h-full '>
        <div className='flex items-center space-x-2'>
          <i className='fab fa-twitter text-2xl'></i>
        </div>
        <nav className='space-y-4'>
          <a className='flex items-center space-x-8 text-xl' href='#'>
            <svg
              className='w-[25px] h-[25px] text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                fill-rule='evenodd'
                d='M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z'
                clip-rule='evenodd'
              />
            </svg>

            <span>Home</span>
          </a>
          <a className='flex items-center space-x-8 text-xl' href='#'>
            <svg
              className='w-[25px] h-[25px] text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-width='2'
                d='m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z'
              />
            </svg>

            <span>Discover</span>
          </a>
          <a className='flex items-center space-x-8 text-xl' href='#'>
            <svg
              className='w-[25px] h-[25px] text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z'
              />
            </svg>

            <span>Notification</span>
          </a>
          <a className='flex items-center space-x-8 text-xl' href='#'>
            <svg
              className='w-[25px] h-[25px] text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z' />
              <path d='M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z' />
            </svg>

            <span>Message</span>
          </a>
          <a className='flex items-center space-x-8 text-xl' href='#'>
            <svg
              className='w-[25px] h-[25px] text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M11 21V2.352A3.451 3.451 0 0 0 9.5 2a3.5 3.5 0 0 0-3.261 2.238A3.5 3.5 0 0 0 4.04 8.015a3.518 3.518 0 0 0-.766 1.128c-.042.1-.064.209-.1.313a3.34 3.34 0 0 0-.106.344 3.463 3.463 0 0 0 .02 1.468A4.017 4.017 0 0 0 2.3 12.5l-.015.036a3.861 3.861 0 0 0-.216.779A3.968 3.968 0 0 0 2 14c.003.24.027.48.072.716a4 4 0 0 0 .235.832c.006.014.015.027.021.041a3.85 3.85 0 0 0 .417.727c.105.146.219.285.342.415.072.076.148.146.225.216.1.091.205.179.315.26.11.081.2.14.308.2.02.013.039.028.059.04v.053a3.506 3.506 0 0 0 3.03 3.469 3.426 3.426 0 0 0 4.154.577A.972.972 0 0 1 11 21Zm10.934-7.68a3.956 3.956 0 0 0-.215-.779l-.017-.038a4.016 4.016 0 0 0-.79-1.235 3.417 3.417 0 0 0 .017-1.468 3.387 3.387 0 0 0-.1-.333c-.034-.108-.057-.22-.1-.324a3.517 3.517 0 0 0-.766-1.128 3.5 3.5 0 0 0-2.202-3.777A3.5 3.5 0 0 0 14.5 2a3.451 3.451 0 0 0-1.5.352V21a.972.972 0 0 1-.184.546 3.426 3.426 0 0 0 4.154-.577A3.506 3.506 0 0 0 20 17.5v-.049c.02-.012.039-.027.059-.04.106-.064.208-.13.308-.2s.214-.169.315-.26c.077-.07.153-.14.225-.216a4.007 4.007 0 0 0 .459-.588c.115-.176.215-.361.3-.554.006-.014.015-.027.021-.041.087-.213.156-.434.205-.659.013-.057.024-.115.035-.173.046-.237.07-.478.073-.72a3.948 3.948 0 0 0-.066-.68Z' />
            </svg>

            <span>Ai</span>
          </a>
          <a className='flex items-center space-x-8 text-xl' href='#'>
            <svg
              className='w-[25px] h-[25px] text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z'
              />
            </svg>

            <span>Lists</span>
          </a>
          <a className='flex items-center space-x-8 text-xl' href='#'>
            <svg
              className='w-[25px] h-[25px] text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z'
              />
            </svg>

            <span>Bookmarks</span>
          </a>

          <a className='flex items-center space-x-8 text-xl' href='#'>
            <svg
              className='w-[25px] h-[25px] text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-width='2'
                d='M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
              />
            </svg>

            <span>Community</span>
          </a>
          {/* <a className='flex items-center space-x-8 text-xl' href='#'>
      <i className='fas fa-star'></i>
      <span>Premium</span>
    </a> */}

          <a className='flex items-center space-x-8 text-xl' href='#'>
            <svg
              className='w-6 h-6 text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                fill-rule='evenodd'
                d='M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z'
                clip-rule='evenodd'
              />
            </svg>

            <span>My Profile</span>
          </a>

          <a className='flex items-center space-x-8 text-xl' href='#'>
            <svg
              className='w-[25px] h-[25px] text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path stroke='currentColor' stroke-linecap='round' stroke-width='2' d='M6 12h.01m6 0h.01m5.99 0h.01' />
            </svg>

            <span>More</span>
          </a>
        </nav>
        <button className='bg-white flex justify-center items-center text-black rounded-full px-6 py-2 mt-4 w-1/2'>
          <span>Post</span>
        </button>
        <button className='flex items-center space-x-2 mt-4 w-1/2 py-1 hover:bg-gray-800  rounded-full '>
          <div className='pl-3'>
            <img alt='User profile picture' className='rounded-full' src='https://placehold.co/40x40' />
          </div>
          <span>Favor</span>
          <div className='pl-3'>
            <svg
              className='w-6 h-6 text-white dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path stroke='currentColor' stroke-linecap='round' stroke-width='2' d='M6 12h.01m6 0h.01m5.99 0h.01' />
            </svg>
          </div>
        </button>
      </div>
    </>
  )
}
