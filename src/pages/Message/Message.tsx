import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { RootState } from '../../store'
import { MediaConversationType, MessageType } from '../../types/conversation.type'
import { User } from '../../types/user.type'
import followerApi from '../../apis/follower.api'
import conversationApi from '../../apis/conversation.api'
import socket from '../../utils/socket'
import { setSelectedUser } from '../../store/selectedUserSlice'
import mediaApi from '../../apis/media.api'
import ChatHeader from './components/ChatHeader'
import ConversationsList from './components/ConversationList'
import ChatWindow from './components/ChatWindow'
import ChatInput from './components/ChatInput'
import { toast } from 'react-toastify'
import ChatWindowHeader from './components/ChatWindowHeader'

const LIMIT = 5
const PAGE = 1

export default function Chat() {
  const [value, setValue] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [fileStore, setFileStore] = useState<MediaConversationType[]>([])
  const user = useSelector((state: RootState) => state.user.currentUser)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [followers, setFollowers] = useState<User[]>([])
  const [page, setPage] = useState(PAGE)
  const selectedUser = useSelector((state: RootState) => state.selectedUser.userSelected)
  const { data: followersData, isFetching: isFetchingFollowers } = useQuery({
    queryKey: ['followers', user?._id],
    queryFn: () => {
      return followerApi.getMutualFollowers({
        limit: 10,
        page: 1
      })
    },
    enabled: !!user,
    placeholderData: keepPreviousData
  })

  const { data: conversations, isFetching } = useQuery({
    queryKey: ['conversations', user?._id, selectedUser?._id, page],
    queryFn: () => {
      return conversationApi.getConversation({
        receiver_id: selectedUser?._id as string,
        limit: LIMIT,
        page
      })
    },
    enabled: !!selectedUser,
    placeholderData: keepPreviousData
  })

  const uploadImagesMutation = useMutation({
    mutationFn: (body: FormData) => mediaApi.upLoadConversationImage(body)
  })

  const uploadVideoMutation = useMutation({
    mutationFn: (body: FormData) => mediaApi.uploadConversationVideo(body)
  })

  const uploadFileMutation = useMutation({
    mutationFn: (body: FormData) => mediaApi.uploadConversationFiles(body)
  })

  const uploadAudioMutation = useMutation({
    mutationFn: (body: FormData) => mediaApi.uploadConversationAudio(body)
  })

  const deleteMutation = useMutation({
    mutationFn: (body: { filePath: string; type: string }) => mediaApi.removeFile(body)
  })

  const unSendMessageMutation = useMutation({
    mutationFn: (body: { conversation_id: string }) => conversationApi.recallMessage(body)
  })

  const dispatch = useDispatch()
  useEffect(() => {
    // socket.auth = {
    //   _id: user?._id
    // }
    // socket.connect()
    socket.on('receive_message', (data) => {
      console.log('SuperIDO: ', data)
      const { payload } = data
      setMessages((prev) => [payload, ...prev])
    })

    // return () => {
    //   socket.disconnect()
    // }
  }, [user])

  useEffect(() => {
    if (conversations?.data) {
      setMessages((prev) => [...prev, ...conversations.data.data.conversations])
      console.log(conversations)
    }
  }, [conversations])

  useEffect(() => {
    if (followersData && !isFetchingFollowers) {
      const userObjects = followersData.data.data.map((item) => item.user)
      setFollowers(userObjects) // Replace instead of append
      console.log('followers: ', followersData)
    }
  }, [followersData, isFetchingFollowers])

  useEffect(() => {
    console.log('Value cập nhật: ', value)
  }, [value])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const send = (e: any) => {
    e.preventDefault()
    setValue('')
    const conversation = {
      content: value,
      medias: fileStore ? fileStore : [],
      sender_id: user?._id as string,
      receiver_id: selectedUser?._id as string
    }
    socket.emit('send_message', {
      payload: conversation
    })

    setMessages((prev) => [
      {
        ...conversation,
        _id: new Date().getTime().toString()
      },
      ...prev
    ])

    setFileStore([])
    setFiles([])
  }

  const selectUserToChat = (newUser: User) => {
    if (selectedUser?._id === newUser._id) return
    dispatch(setSelectedUser(newUser))
    setMessages(conversations?.data?.data?.conversations ?? [])
  }

  const loadMore = () => {
    if (page < conversations?.data?.data?.total_pages) {
      setPage((prev) => prev + 1)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)

      const imageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
      const videoTypes = ['video/mp4']
      const audioTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3']
      const documentTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ]

      // Check type of file
      const hasImage = newFiles.some((file) => imageTypes.includes(file.type))
      const hasVideo = newFiles.some((file) => videoTypes.includes(file.type))
      const hasAudio = newFiles.some((file) => audioTypes.includes(file.type))
      const hasDocument = newFiles.some((file) => documentTypes.includes(file.type))

      // Check if file already exists
      const existingImages = files.some((file) => imageTypes.includes(file.type))
      const existingVideos = files.some((file) => videoTypes.includes(file.type))

      // Don't allow uploading more than 2 files
      if (hasVideo && existingImages) {
        toast.warn('You can only select images before uploading videos.')
        e.target.value = ''
        return
      }

      // Don't allow uploading more than 1 file
      if (hasImage && existingVideos) {
        toast.warn('You can only select videos before uploading images.')
        e.target.value = ''
        return
      }

      if (newFiles.length + files.length > 2) {
        toast.warn('Bạn chỉ có thể chọn tối đa 2 file.')
        e.target.value = ''
        return
      }

      if (hasImage) {
        setFiles((prev) => [...prev, ...newFiles])

        const formData = new FormData()
        newFiles.forEach((file) => formData.append('image', file))

        uploadImagesMutation.mutate(formData, {
          onSuccess: (data) => {
            setFileStore((prev) => [...prev, ...data.data.data])
          },
          onError: () => {}
        })
      }

      if (hasVideo) {
        setFiles((prev) => [...prev, ...newFiles])

        const formData = new FormData()
        formData.append('video', newFiles[0])

        uploadVideoMutation.mutate(formData, {
          onSuccess: (data) => {
            setFileStore((prev) => [...prev, ...data.data.data])
          },
          onError: () => {}
        })
      }

      if (hasAudio) {
        setFiles((prev) => [...prev, ...newFiles])

        const formData = new FormData()
        formData.append('audio', newFiles[0])

        uploadAudioMutation.mutate(formData, {
          onSuccess: (data) => {
            setFileStore((prev) => [...prev, ...data.data.data])
          },
          onError: () => {}
        })
      }

      if (hasDocument) {
        setFiles((prev) => [...prev, ...newFiles])

        const formData = new FormData()
        newFiles.forEach((file) => formData.append('document', file))

        uploadFileMutation.mutate(formData, {
          onSuccess: (data) => {
            setFileStore((prev) => [...prev, ...data.data.data])
          },
          onError: () => {}
        })
      }
    }
  }

  const removeFile = async (index: number) => {
    const file = fileStore[index]

    if (!file?.url) {
      console.error('File URL is missing!')
      return
    }

    deleteMutation.mutate(
      { filePath: file.url, type: file.type },
      {
        onSuccess: (data) => {
          console.log(data)

          setFileStore((prev) => {
            const updatedFiles = prev.filter((_, i) => i !== index)
            return updatedFiles
          })

          setFiles((prev) => {
            const updatedFiles = prev.filter((_, i) => i !== index)
            console.log('Files after deletion: ', updatedFiles)
            return updatedFiles
          })
        },
        onError: (error) => {
          console.log(error)
        }
      }
    )
  }

  const handleUnsendMessage = (conversationId: string) => {
    if (selectedUser) {
      unSendMessageMutation.mutate(
        { conversation_id: conversationId },
        {
          onSuccess: () => {
            setMessages((prev) =>
              prev.map((message) => {
                if (message._id === conversationId) {
                  return {
                    ...message,
                    content: '',
                    medias: [],
                    status: 'recalled'
                  }
                }
                return message
              })
            )
          }
        }
      )
    }
  }

  return (
    <>
      <div className='w-full lg:ml-[25%] flex flex-col'>
        {/* Header */}
        <ChatHeader />
        {/* Messages Section */}
        <div className='flex flex-grow flex-col lg:flex-row'>
          {/* Conversations List */}
          <ConversationsList followers={followers} selectedUser={selectedUser} onSelectUser={selectUserToChat} />

          {/* Chat Window */}
          <div className='w-full h-full lg:w-2/3 flex flex-col'>
            {selectedUser !== null ? (
              <>
                <ChatWindowHeader selectedUser={selectedUser} />

                <ChatWindow
                  messages={messages}
                  user={user}
                  loadMore={loadMore}
                  hasMore={page < conversations?.data?.data?.total_pages}
                  isFetching={isFetching}
                  onDeleteMessage={handleUnsendMessage}
                />
                <ChatInput
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onSend={send}
                  files={files}
                  handleFileChange={handleFileChange}
                  removeFile={removeFile}
                  uploadImagesPending={uploadImagesMutation.isPending}
                  uploadVideosPending={uploadVideoMutation.isPending}
                  uploadAudiosPending={uploadAudioMutation.isPending}
                  uploadFilesPending={uploadFileMutation.isPending}
                />
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
