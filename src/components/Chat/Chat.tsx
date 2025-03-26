import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import socket from '../../utils/socket'
import { RootState } from '../../store'
import { setSelectedUser } from '../../store/selectedUserSlice'
import { User } from '../../types/user.type'
import { useQuery } from '@tanstack/react-query'
import conversationApi from '../../apis/conversation.api'
import { MessageType } from '../../types/conversation.type'

const listUser = [
  {
    _id: '67d92a0e57089235967c13fc',
    name: 'Chó Hào',
    email: 'ccc123@gmail.com',
    date_of_birth: '2024-01-01T00:00:00.000Z',
    created_at: '2025-03-18T08:08:46.651Z',
    updated_at: '2025-03-18T08:08:46.651Z',
    bio: '',
    location: '',
    website: '',
    username: '',
    avatar: 'avatar-1742713662332-540753223.jpg',
    cover_photo: ''
  },
  {
    _id: '67dfd448f5c80cde482562b0',
    name: 'Chó Bảo',
    email: 'duonghoaian.work@gmail.com',
    date_of_birth: '2024-01-01T00:00:00.000Z',
    created_at: '2025-03-23T09:28:40.338Z',
    updated_at: '2025-03-23T09:28:50.635Z',
    bio: '',
    location: '',
    website: '',
    username: '',
    avatar: '',
    cover_photo: ''
  },
  {
    _id: '67dfd4f3f5c80cde482562b4',
    name: 'Dương Hoài Ân',
    email: 'dhan29112001@gmail.com',
    date_of_birth: '2024-01-01T00:00:00.000Z',
    created_at: '2025-03-23T09:31:31.978Z',
    updated_at: '2025-03-23T09:35:08.575Z',
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
  const [messages, setMessages] = useState<MessageType[]>([])
  const selectedUser = useSelector((state: RootState) => state.selectedUser.userSelected)
  const { data: conversations } = useQuery({
    queryKey: ['conversations', user?._id, selectedUser?._id],
    queryFn: () => {
      return conversationApi.getConversation({
        receiver_id: selectedUser?._id as string,
        limit: 10,
        page: 1
      })
    },
    enabled: !!selectedUser
  })
  console.log(conversations)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!user) {
      return
    }
    socket.auth = {
      _id: user?._id
    }
    socket.connect()
    socket.on('receive_message', (data) => {
      const { payload } = data
      setMessages((prev) => [...prev, payload])
      console.log(data)
    })
    return () => {
      socket.disconnect()
    }
  }, [user])

  useEffect(() => {
    if (conversations?.data) {
      setMessages(conversations.data.data.conversations)
    }
  }, [conversations])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const send = (e: any) => {
    e.preventDefault()
    setValue('')
    const conversation = {
      content: value,
      sender_id: user?._id as string,
      receiver_id: selectedUser?._id as string
    }
    socket.emit('send_message', {
      payload: conversation
    })

    setMessages((prev) => [
      ...prev,
      {
        ...conversation,
        _id: new Date().getTime().toString()
      }
    ])
  }

  const selectUserToChat = (newUser: User) => {
    if (selectedUser?._id === newUser._id) return
    dispatch(setSelectedUser(newUser))
    setMessages(conversations?.data?.data?.conversations ?? [])
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
                  'bg-gray-800': user._id === selectedUser?._id
                })}
                key={user._id}
                onClick={() => selectUserToChat(user)}
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
            {selectedUser !== null ? (
              <>
                {' '}
                <div className='flex items-center p-4 border-b border-gray-700'>
                  <img
                    alt='User profile picture'
                    className='rounded-full'
                    height={40}
                    src='https://placehold.co/40x40'
                    width={40}
                  />
                  <div className='ml-4 font-bold'>{selectedUser.name}</div>
                </div>
                <div className='h-full'>
                  {Array.isArray(messages) &&
                    messages.map((message, index) => (
                      <div className='flex-grow p-4' key={index}>
                        <div
                          className={classNames('flex mb-4', {
                            'justify-end': message.sender_id == user?._id,
                            'justify-start': !(message.sender_id == user?._id)
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
              </>
            ) : (
              <div className='h-full flex justify-center items-center'>
                <div>
                  <h1 className='text-3xl font-bold text-center'>Select message</h1>
                  <p className='text-center text-gray-500'>
                    Choose from your existing conversations, start a new one, or just keep going.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
