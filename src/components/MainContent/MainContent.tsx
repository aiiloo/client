export default function MainContent() {
  return (
    <>
      <div className='w-full lg:w-[calc(100%-50%)] max-w-[1100px] mx-auto overflow-y-auto h-screen md:p-4 hide-scrollbar'>
        <div className='h-[200vh] bg-gray-800 p-4'>
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
      </div>
    </>
  )
}
