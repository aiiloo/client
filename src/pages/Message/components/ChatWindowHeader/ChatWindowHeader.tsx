import { useEffect, useState } from 'react'
import {
  Video,
  Phone,
  FolderOpen,
  X,
  Bell,
  User as UserIcon,
  Image as ImageIcon,
  File as FileIcon,
  Music as AudioIcon
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { User } from '../../../../types/user.type'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import conversationApi from '../../../../apis/conversation.api'
import pdfIcon from '../../../../assets/icons/pdf-file.png'
import docIcon from '../../../../assets/icons/doc.png'
import excelIcon from '../../../../assets/icons/excel-file.png'

const fileIcons = {
  pdf: pdfIcon,
  doc: docIcon,
  docx: docIcon,
  xls: excelIcon,
  xlsx: excelIcon,
  ppt: excelIcon,
  pptx: excelIcon
}

export default function ChatWindowHeader({ selectedUser }: { selectedUser: User | null }) {
  const [showSidebar, setShowSidebar] = useState(false)
  const [showContentSidebar, setShowContentSidebar] = useState<string | null>(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [privacyStatus, setPrivacyStatus] = useState<'none' | 'restricted' | 'blocked' | 'reported'>('none')

  const { data: conversationMedias } = useQuery({
    queryKey: ['conversation-medias', selectedUser?._id],
    queryFn: () => {
      return conversationApi.getConversationMedias({
        receiver_user_id: selectedUser?._id as string,
        type: showContentSidebar as string,
        limit: 10,
        page: 1
      })
    },
    enabled: !!selectedUser && !!showContentSidebar,

    placeholderData: keepPreviousData
  })

  useEffect(() => {
    console.log('conversationMedias', conversationMedias)
  }, [conversationMedias])
  const toggleSidebar = () => setShowSidebar(!showSidebar)
  const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled)

  const openContentSidebar = (contentType: string) => setShowContentSidebar(contentType)
  const closeContentSidebar = () => setShowContentSidebar(null)

  const handlePrivacyChange = (status: 'restricted' | 'blocked' | 'reported') => {
    setPrivacyStatus(status)
  }

  return (
    <>
      <div className='flex items-center justify-between p-4 border-b border-gray-700'>
        <div className='flex items-center'>
          <img
            alt='User profile picture'
            className='rounded-full'
            height={40}
            src={selectedUser?.avatar || 'https://placehold.co/40x40'}
            width={40}
          />
          <div className='ml-4 font-bold text-white'>{selectedUser?.name}</div>
        </div>

        <div className='flex items-center gap-4'>
          <button title='Voice Call'>
            <Phone className='w-5 h-5 hover:text-green-500 transition' />
          </button>
          <button title='Video Call'>
            <Video className='w-5 h-5 hover:text-blue-500 transition' />
          </button>
          <button title='View file/image history' onClick={toggleSidebar}>
            <FolderOpen className='w-5 h-5 hover:text-yellow-500 transition' />
          </button>
        </div>
      </div>

      {/* Main Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className='fixed top-0 right-0 w-96 h-full bg-[#1c1c1c] text-white shadow-lg z-50 flex flex-col border-l border-gray-700'
          >
            {/* Sidebar Header */}
            <div className='flex items-center justify-between px-4 py-3 border-b border-gray-600 bg-[#222]'>
              <h2 className='text-lg font-semibold'>Contact Details</h2>
              <button onClick={toggleSidebar} className='text-gray-400 hover:text-gray-600'>
                <X className='w-5 h-5' />
              </button>
            </div>

            {/* Main Sidebar Content */}
            <div className='flex-1 overflow-y-auto px-4 py-4 space-y-6'>
              {/* User Information */}
              <div className='flex items-center gap-3'>
                <img
                  alt='User profile'
                  src={selectedUser?.avatar || 'https://placehold.co/40x40'}
                  className='w-14 h-14 rounded-full'
                />
                <div>
                  <div className='font-semibold'>{selectedUser?.name}</div>
                  <button className='text-sm text-blue-500 hover:underline'>
                    <UserIcon className='w-4 h-4 inline mr-1' />
                    Profile Page
                  </button>
                </div>
              </div>

              {/* Notification Settings */}
              <div className='flex items-center justify-between'>
                <div className='text-sm'>Notifications</div>
                <button onClick={toggleNotifications} className='text-gray-500'>
                  {notificationsEnabled ? (
                    <Bell className='w-5 h-5 text-green-500' />
                  ) : (
                    <Bell className='w-5 h-5 text-gray-500' />
                  )}
                </button>
              </div>

              {/* Categories - Images, Videos, Files, Audio */}
              <div className='flex flex-col gap-4'>
                <button
                  className='flex items-center justify-start gap-2 py-2 px-4 bg-[#333] rounded-md hover:bg-[#444] transition'
                  onClick={() => openContentSidebar('image')}
                >
                  <ImageIcon className='w-5 h-5' />
                  <span>Images</span>
                </button>
                <button
                  className='flex items-center justify-start gap-2 py-2 px-4 bg-[#333] rounded-md hover:bg-[#444] transition'
                  onClick={() => openContentSidebar('video')}
                >
                  <Video className='w-5 h-5' />
                  <span>Videos</span>
                </button>
                <button
                  className='flex items-center justify-start gap-2 py-2 px-4 bg-[#333] rounded-md hover:bg-[#444] transition'
                  onClick={() => openContentSidebar('document')}
                >
                  <FileIcon className='w-5 h-5' />
                  <span>Files</span>
                </button>
                <button
                  className='flex items-center justify-start gap-2 py-2 px-4 bg-[#333] rounded-md hover:bg-[#444] transition'
                  onClick={() => openContentSidebar('audio')}
                >
                  <AudioIcon className='w-5 h-5' />
                  <span>Audio</span>
                </button>

                {/* Privacy Settings */}
                <div className='flex flex-col gap-2 mt-4'>
                  <div className='font-semibold'>Privacy Management</div>
                  <button
                    onClick={() => handlePrivacyChange('restricted')}
                    className={`py-2 px-4 rounded-md ${
                      privacyStatus === 'restricted' ? 'bg-red-500' : 'bg-[#333]'
                    } hover:bg-[#444] transition`}
                  >
                    Restrict
                  </button>
                  <button
                    onClick={() => handlePrivacyChange('blocked')}
                    className={`py-2 px-4 rounded-md ${
                      privacyStatus === 'blocked' ? 'bg-red-500' : 'bg-[#333]'
                    } hover:bg-[#444] transition`}
                  >
                    Block
                  </button>
                  <button
                    onClick={() => handlePrivacyChange('reported')}
                    className={`py-2 px-4 rounded-md ${
                      privacyStatus === 'reported' ? 'bg-red-500' : 'bg-[#333]'
                    } hover:bg-[#444] transition`}
                  >
                    Report
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Sidebar (Images, Videos, Files, Audio) */}
      <AnimatePresence>
        {showContentSidebar && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className='fixed top-0 right-0 w-96 h-full bg-[#1c1c1c] text-white shadow-lg z-50 flex flex-col border-l border-gray-700'
          >
            {/* Content Sidebar Header */}
            <div className='flex items-center justify-between px-4 py-3 border-b border-gray-600 bg-[#222]'>
              <h2 className='text-lg font-semibold'>
                {showContentSidebar === 'image' && 'Images'}
                {showContentSidebar === 'video' && 'Videos'}
                {showContentSidebar === 'document' && 'Documents'}
                {showContentSidebar === 'audio' && 'Audio'}
              </h2>
              <button onClick={closeContentSidebar} className='text-gray-400 hover:text-gray-600'>
                <X className='w-5 h-5' />
              </button>
            </div>

            {/* Content Sidebar Content */}
            <div className='flex-1 overflow-y-auto px-4 py-4 space-y-6'>
              {/* Display images in a grid */}
              {showContentSidebar === 'image' && (
                <div className='grid grid-cols-3 gap-4 max-h-[calc(100vh-150px)] overflow-y-auto'>
                  {/* Loop through 20 sample images */}
                  {conversationMedias?.data.data.map((media, index) => (
                    <div key={index}>
                      {media.medias?.map((image: any, i: number) => (
                        <div key={i} className='mb-4'>
                          <img src={image.url} alt={`Image ${i + 1}`} className='rounded-lg w-full' />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* Display videos in a grid */}
              {showContentSidebar === 'video' && (
                <div className='grid grid-cols-2 gap-4 max-h-[calc(100vh-150px)] overflow-y-auto'>
                  {/* Loop through 6 sample videos */}
                  {conversationMedias?.data.data.map((media, index) => (
                    <div key={index}>
                      {media.medias?.map((data: any, i: number) => (
                        <div key={i} className='mb-4'>
                          <video controls className=' rounded-lg w-full'>
                            <source src={data.url} type='video/mp4' />
                          </video>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* Display file links */}
              {showContentSidebar === 'document' && (
                <div>
                  <ul className='space-y-2'>
                    {conversationMedias?.data.data.map((media, index) => (
                      <li key={index}>
                        {media.medias?.map((file: any, i: number) => (
                          <a
                            key={i}
                            href={file.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex items-center gap-2 bg-gray-200 p-2 rounded-lg mt-2 text-blue-500 hover:text-blue-700'
                          >
                            <img
                              src={fileIcons[file.name?.split('.').pop()?.toLowerCase() as keyof typeof fileIcons]}
                              alt='File Icon'
                              className='w-6 h-6'
                            />
                            <span className='truncate'>{file.name || 'Tài liệu'}</span>
                          </a>
                        ))}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Display audio */}
              {showContentSidebar === 'audio' && (
                <div className='grid grid-cols-2 gap-4 max-h-[calc(100vh-150px)] overflow-y-auto'>
                  {/* Loop through 6 sample videos */}
                  {conversationMedias?.data.data.map((media, index) => (
                    <div key={index}>
                      {media.medias?.map((data: any, i: number) => (
                        <div key={i} className='mb-4' title={data.name}>
                          <audio controls className=' rounded-lg w-full'>
                            <source src={data.url} />
                          </audio>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
