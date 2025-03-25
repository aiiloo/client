import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import socket from '../../utils/socket'
import { RootState } from '../../store'
import { setSelectedUser } from '../../store/selectedUserSlice'

const listUser = [
  {
    _id: {
      $oid: '67d92a0e57089235967c13fc'
    },
    name: 'Chó Hào',
    email: 'ccc123@gmail.com',
    date_of_birth: null,
    password: 'b96d5a2dc9f027ada20a3ddbc3344337d15750fc84d37481b4a9f8f88b4a021d',
    created_at: {
      $date: '2025-03-18T08:08:46.651Z'
    },
    updated_at: {
      $date: '2025-03-18T08:08:46.651Z'
    },
    email_verify_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjdkOTJhMGU1NzA4OTIzNTk2N2MxM2ZjIiwidG9rZW5fdHlwZSI6MywidmVyaWZ5IjowLCJpYXQiOjE3NDIyODUzMjYsImV4cCI6MTc0Mjg5MDEyNn0.u8pz_ibNKyL5Nqy-ig-KYTvlAPte6Hr7PHRmqIorBPE',
    forgot_password_token: '',
    verify: 0,
    bio: null,
    location: null,
    website: null,
    username: null,
    avatar: 'avatar-1742713662332-540753223.jpg',
    cover_photo: null
  },
  {
    _id: {
      $oid: '67dfd448f5c80cde482562b0'
    },
    name: 'Chó Bảo',
    email: 'duonghoaian.work@gmail.com',
    date_of_birth: {
      $date: '2024-01-01T00:00:00.000Z'
    },
    password: 'b96d5a2dc9f027ada20a3ddbc3344337d15750fc84d37481b4a9f8f88b4a021d',
    created_at: {
      $date: '2025-03-23T09:28:40.338Z'
    },
    updated_at: {
      $date: '2025-03-23T09:28:50.635Z'
    },
    email_verify_token: '',
    forgot_password_token: '',
    verify: 1,
    bio: '',
    location: '',
    website: '',
    username: '',
    avatar: '',
    cover_photo: ''
  },
  {
    _id: {
      $oid: '67dfd4f3f5c80cde482562b4'
    },
    name: 'Dương Hoài Ân',
    email: 'dhan29112001@gmail.com',
    date_of_birth: {
      $date: '2024-01-01T00:00:00.000Z'
    },
    password: 'b96d5a2dc9f027ada20a3ddbc3344337d15750fc84d37481b4a9f8f88b4a021d',
    created_at: {
      $date: '2025-03-23T09:31:31.978Z'
    },
    updated_at: {
      $date: '2025-03-23T09:35:08.575Z'
    },
    email_verify_token: '',
    forgot_password_token: '',
    verify: 1,
    bio: '',
    location: '',
    website: '',
    username: '',
    avatar: '',
    cover_photo: ''
  }
]

export default function Chat() {
  const [value, setValue] = useState('')
  const user = useSelector((state: RootState) => state.user.currentUser)
  const [messages, setMessages] = useState<{ content: string; isSender: boolean }[]>([])
  const selectedUserId = useSelector((state: RootState) => state.selectedUser.selectedUserId)
  const dispatch = useDispatch()
  useEffect(() => {
    socket.auth = {
      _id: user?._id
    }
    socket.connect()
    socket.on('receive private message', (data) => {
      const content = data.content
      setMessages((prev) => [...prev, { content: content, isSender: false }])
      console.log(data)
    })
    return () => {
      socket.disconnect()
    }
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const send = (e: any) => {
    e.preventDefault()
    setValue('')
    socket.emit('private message', {
      content: value,
      to: selectedUserId
    })

    setMessages((prev) => [
      ...prev,
      {
        content: value,
        isSender: true
      }
    ])
  }

  const selectUserToChat = (userId: string) => {
    dispatch(setSelectedUser(userId))
  }
  return (
    <>
      <div className='w-full lg:ml-[25%] flex flex-col'>
        {/* Header */}
        <div className='flex justify-between items-center p-4 border-b border-gray-700'>
          <h1 className='text-xl font-bold'>Message</h1>
          <div className='flex items-center space-x-4'>
            <i className='fas fa-cog' />
            <i className='fas fa-envelope' />
          </div>
        </div>
        {/* Messages Section */}
        <div className='flex flex-grow flex-col lg:flex-row'>
          {/* Conversations List */}
          <div className='w-full hidden md:block lg:w-1/3 border-r border-gray-700'>
            <div className='p-4'>
              <input
                className='w-full p-2 bg-gray-800 rounded-full text-white'
                placeholder='Search direct messages'
                type='text'
              />
            </div>
            {listUser.map((user) => (
              <div
                className={classNames('p-4 flex items-center space-x-2 cursor-pointer', {
                  'bg-gray-800': user._id.$oid === selectedUserId
                })}
                key={user._id.$oid}
                onClick={() => selectUserToChat(user._id.$oid)}
              >
                <img
                  alt='OpenAI logo'
                  className='rounded-full'
                  height={40}
                  src='https://placehold.co/40x40'
                  width={40}
                />
                <div>
                  <div className='font-bold'>{user.name}</div>
                  <div className='text-gray-500'>13 thg 4, 2023</div>
                  <div className='text-gray-500'>Dear ChatGPT Support Team.</div>
                </div>
              </div>
            ))}
          </div>
          {/* Chat Window */}
          <div className='w-full h-full lg:w-2/3 flex flex-col'>
            <div className='flex items-center p-4 border-b border-gray-700'>
              <img
                alt='User profile picture'
                className='rounded-full'
                height={40}
                src='https://placehold.co/40x40'
                width={40}
              />
              <div className='ml-4 font-bold'>Bủng Khào</div>
            </div>
            <div className='h-full'>
              {messages.map((message, index) => (
                <div className='flex-grow p-4' key={index}>
                  <div
                    className={classNames('flex mb-4', {
                      'justify-start': !message.isSender,
                      'justify-end': message.isSender
                    })}
                  >
                    <div className='bg-blue-500 text-white p-2 rounded-full'>{message.content}</div>
                  </div>
                  <div className='text-gray-500 text-sm text-right'>4:18 CH · Sent</div>
                </div>
              ))}
            </div>
            <form onSubmit={send}>
              <div className='p-4 border-t border-gray-700 flex items-center space-x-4'>
                <i className='fas fa-image text-blue-500' />
                <i className='fas fa-gift text-blue-500' />
                <i className='fas fa-smile text-blue-500' />
                <input
                  className='flex-grow p-2 bg-gray-800 rounded-full text-white'
                  placeholder='Type a message'
                  type='text'
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                />
                <button className='bg-blue-500 text-white rounded-full px-4 py-2' type='submit'>
                  Send
                </button>
                <i className='fas fa-paper-plane text-blue-500' />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
