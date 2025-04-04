export default function ChatHeader() {
  return (
    <div className='flex justify-between items-center p-4 border-b border-gray-700'>
      <h1 className='text-xl font-bold'>Message</h1>
      <div className='flex items-center space-x-4'>
        <i className='fas fa-cog' />
        <i className='fas fa-envelope' />
      </div>
    </div>
  )
}
