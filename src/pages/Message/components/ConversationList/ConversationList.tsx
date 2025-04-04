// ConversationsList.jsx
import classNames from 'classnames'
import { User } from '../../../../types/user.type'

export default function ConversationsList({
  followers,
  selectedUser,
  onSelectUser
}: {
  followers: User[]
  selectedUser: User | null
  onSelectUser: (user: User) => void
}) {
  return (
    <div className='w-full hidden md:block lg:w-1/3 border-r border-gray-700'>
      <div className='p-4'>
        <input
          className='w-full p-2 bg-gray-800 rounded-full text-white'
          placeholder='Search direct messages'
          type='text'
        />
      </div>
      {followers.map((user, index) => (
        <div
          key={index}
          className={classNames('p-4 flex items-center space-x-2 cursor-pointer', {
            'bg-gray-800': user._id === selectedUser?._id
          })}
          onClick={() => onSelectUser(user)}
        >
          <img alt='User avatar' className='rounded-full' height={40} src={user.avatar} width={40} />
          <div>
            <div className='font-bold'>{user.name}</div>
            <div className='text-gray-500'>13 thg 4, 2023</div>
            <div className='text-gray-500'>Dear ChatGPT Support Team.</div>
          </div>
        </div>
      ))}
    </div>
  )
}
