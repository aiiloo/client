// ChatWindow.jsx
import InfiniteScroll from 'react-infinite-scroll-component'
import classNames from 'classnames'
import { MessageType } from '../../../../types/conversation.type'
import { User } from '../../../../types/user.type'
import { useState } from 'react'

import pdfIcon from '../../../../assets/icons/pdf-file.png'
import docIcon from '../../../../assets/icons/doc.png'
import excelIcon from '../../../../assets/icons/excel-file.png'
import file from '../../../../assets/icons/file.png'
import { formatDate } from '../../../../utils/date'

interface Props {
  messages: MessageType[]
  user: User | null
  loadMore: () => void
  hasMore: boolean
  isFetching: boolean
  onDeleteMessage?: (messageId: string) => void
  onShareMessage?: (message: MessageType) => void
  onReplyMessage?: (message: MessageType) => void
}

const fileIcons = {
  pdf: pdfIcon,
  doc: docIcon,
  docx: docIcon,
  xls: excelIcon,
  xlsx: excelIcon,
  ppt: excelIcon,
  pptx: excelIcon
}

const defaultFileIcon = file

export default function ChatWindow({
  messages,
  user,
  loadMore,
  hasMore,
  isFetching,
  onDeleteMessage,
  onShareMessage,
  onReplyMessage
}: Props) {
  const [selectedImage, setSelectedImage] = useState('')
  const [activeMessageOptions, setActiveMessageOptions] = useState<string | null>(null)

  const handleOptionsClick = (messageId: string) => {
    if (activeMessageOptions === messageId) {
      setActiveMessageOptions(null)
    } else {
      setActiveMessageOptions(messageId)
    }
  }

  const handleDeleteMessage = (messageId: string) => {
    if (onDeleteMessage) onDeleteMessage(messageId)
    setActiveMessageOptions(null)
  }

  const handleShareMessage = (message: MessageType) => {
    if (onShareMessage) onShareMessage(message)
    setActiveMessageOptions(null)
  }

  const handleReplyMessage = (message: MessageType) => {
    if (onReplyMessage) onReplyMessage(message)
    setActiveMessageOptions(null)
  }

  return (
    <div className='h-full'>
      <div>{isFetching && <h4 className='text-center text-gray-500'>Đang tải...</h4>}</div>

      <div
        id='scrollableDiv'
        style={{
          height: 'calc(100vh - 228px)',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
          overflowAnchor: 'none'
        }}
      >
        <InfiniteScroll
          dataLength={messages.length}
          next={loadMore}
          style={{ display: 'flex', flexDirection: 'column-reverse' }}
          inverse={true}
          hasMore={hasMore}
          loader={<></>}
          scrollableTarget='scrollableDiv'
        >
          {Array.isArray(messages) &&
            messages.map((message, index) => (
              <div className='flex-grow p-4' key={index}>
                <div
                  className={classNames('flex mb-1', {
                    'justify-end': message.sender_id == user?._id,
                    'justify-start': !(message.sender_id == user?._id)
                  })}
                >
                  {message.medias?.map((media, mediaIndex) => (
                    <div key={mediaIndex} className='mt-2'>
                      {media.type === 'image' && (
                        <img
                          src={media.url}
                          alt='Media'
                          className='max-w-[250px] max-h-[200px] rounded-lg'
                          onClick={() => setSelectedImage(media.url)}
                        />
                      )}
                      {media.type === 'video' && (
                        <video controls className='max-w-[250px] max-h-[200px] rounded-lg'>
                          <source src={media.url} type='video/mp4' />
                        </video>
                      )}
                      {media.type === 'audio' && <audio controls src={media.url}></audio>}

                      {media.type === 'document' &&
                        (() => {
                          const fileExtension = media.name?.split('.').pop()?.toLowerCase() as keyof typeof fileIcons
                          const icon = fileIcons[fileExtension] || defaultFileIcon
                          return (
                            <a
                              href={media.url}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='flex items-center gap-2 bg-gray-200 p-2 rounded-lg mt-2 text-blue-500 hover:text-blue-700'
                            >
                              <img src={icon} alt='File Icon' className='w-6 h-6' />
                              <span className='truncate'>{media.name || 'Tài liệu'}</span>
                            </a>
                          )
                        })()}
                    </div>
                  ))}
                </div>
                <div
                  className={classNames('flex mb-2 relative', {
                    'justify-end': message.sender_id == user?._id,
                    'justify-start': !(message.sender_id == user?._id)
                  })}
                >
                  <div
                    title={formatDate(message.created_at as string)}
                    className={classNames(
                      ' text-white p-2 rounded-lg cursor-pointer max-w-xs break-words relative group',
                      {
                        'bg-blue-500': message.content != '',
                        'bg-black': message.content == ''
                      }
                    )}
                  >
                    <button
                      className={classNames(
                        'absolute -top-2  text-white rounded-lg w-6 h-6 flex items-center justify-center',
                        {
                          '-left-8': message.sender_id == user?._id,
                          '-right-8': !(message.sender_id == user?._id)
                        }
                      )}
                      onClick={() => handleOptionsClick(message._id)}
                    >
                      ...
                    </button>

                    {message.status != 'recalled' ? (
                      message.content
                    ) : (
                      <span className='italic'>This message was deleted</span>
                    )}

                    {/* Menu tùy chọn */}
                    {activeMessageOptions === message._id && (
                      <div
                        className={classNames(
                          'absolute z-10 bg-black border border-white shadow-lg rounded p-2 w-32 mt-1',
                          {
                            '-left-40 top-0': message.sender_id == user?._id,
                            '-right-40 top-0': !(message.sender_id == user?._id)
                          }
                        )}
                      >
                        <ul>
                          {message.sender_id == user?._id && (
                            <li
                              className='text-red-500 hover:bg-gray-700 hover:text-red-400 p-1 rounded cursor-pointer text-sm'
                              onClick={() => handleDeleteMessage(message._id)}
                            >
                              Unsend
                            </li>
                          )}
                          <li
                            className='text-gray-700 hover:bg-gray-700 hover:text-white p-1 rounded cursor-pointer text-sm'
                            onClick={() => handleShareMessage(message)}
                          >
                            Share
                          </li>
                          <li
                            className='text-gray-700 hover:bg-gray-700 hover:text-white p-1 rounded cursor-pointer text-sm'
                            onClick={() => handleReplyMessage(message)}
                          >
                            Reply
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </InfiniteScroll>
      </div>
      {selectedImage && (
        <div
          className='fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 m-4 border border-white rounded-lg'
          onClick={() => setSelectedImage('')}
        >
          <img src={selectedImage} alt='Fullscreen' className='max-w-full max-h-full rounded-lg' />
          <button
            className='absolute top-4 right-4 bg-white text-black p-2 rounded-full'
            onClick={() => setSelectedImage('')}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
