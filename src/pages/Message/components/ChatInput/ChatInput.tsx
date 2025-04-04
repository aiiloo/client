import { useRef, useState, useEffect } from 'react'

// Import các biểu tượng cơ bản
import mp4Icon from '../../../../assets/icons/mp4.png'
import mp3Icon from '../../../../assets/icons/mp3.png'
import pdfIcon from '../../../../assets/icons/pdf-file.png'
import docIcon from '../../../../assets/icons/doc.png'
import excelIcon from '../../../../assets/icons/excel-file.png'
import { allEmojisWithDescriptions, emojiCategories, EmojiData, emojisByCategory } from '../../../../assets/ts/icons'

interface Props {
  value: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  onSend: (event: React.FormEvent<HTMLFormElement>) => void
  files: File[]
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  removeFile: (index: number) => void
  uploadPending: boolean
}
export default function ChatInput({
  value,
  onChange,
  onSend,
  files,
  handleFileChange,
  removeFile,
  uploadPending
}: Props) {
  const fileInputRef = useRef(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [currentEmojiCategory, setCurrentEmojiCategory] = useState('smileys')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<EmojiData[]>([])
  const [recentEmojis, setRecentEmojis] = useState<string[]>(['😀', '😂', '❤️', '👍', '🔥', '🎉', '👏', '🙏'])

  // Hàm reset input file khi click chọn file
  const handleFileClick = () => {
    if (fileInputRef.current) {
      ;(fileInputRef.current as HTMLInputElement).value = ''
    }
  }

  // Hàm tìm kiếm emoji
  const searchEmojis = (term: string) => {
    if (!term.trim()) {
      setSearchResults([])
      return
    }

    const results = allEmojisWithDescriptions.filter((item) =>
      item.description.toLowerCase().includes(term.toLowerCase())
    )
    setSearchResults(results)
  }

  // Xử lý tìm kiếm khi searchTerm thay đổi
  useEffect(() => {
    searchEmojis(searchTerm)
  }, [searchTerm])

  // Hàm thêm emoji vào input
  const addEmoji = (emoji: string) => {
    // Thêm vào giá trị input
    const newValue = value + emoji
    const simulatedEvent = {
      target: { value: newValue }
    } as React.ChangeEvent<HTMLTextAreaElement>

    onChange(simulatedEvent)

    // Lưu vào danh sách gần đây
    if (!recentEmojis.includes(emoji)) {
      const newRecentEmojis = [emoji, ...recentEmojis.slice(0, 7)]
      setRecentEmojis(newRecentEmojis)

      // Có thể lưu vào localStorage để giữ lại giữa các phiên
      try {
        localStorage.setItem('recentEmojis', JSON.stringify(newRecentEmojis))
      } catch (error) {
        console.error('Error saving recent emojis to localStorage:', error)
      }
    }
  }

  // Tải emoji gần đây từ localStorage khi component mount
  useEffect(() => {
    try {
      const savedRecentEmojis = localStorage.getItem('recentEmojis')
      if (savedRecentEmojis) {
        setRecentEmojis(JSON.parse(savedRecentEmojis))
      }
    } catch (error) {
      console.error('Error loading recent emojis from localStorage:', error)
    }
  }, [])

  return (
    <form onSubmit={onSend}>
      <div className='p-4 border-t border-b mb-1 border-b-white relative'>
        {files.length > 0 && (
          <div className='mb-2 flex flex-wrap gap-2'>
            {files.map((file, index) => (
              <div key={index} className='relative w-20 h-20'>
                {/* File preview code không thay đổi */}
                {file.type.startsWith('image') ? (
                  <div className='relative w-full h-full'>
                    <img
                      src={URL.createObjectURL(file)}
                      alt='preview'
                      className='w-full h-full object-cover rounded-lg'
                    />
                    {uploadPending && (
                      <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded-lg'>
                        <div className='animate-spin border-4 border-t-4 border-blue-600 rounded-full w-8 h-8'></div>
                      </div>
                    )}
                  </div>
                ) : file.type.startsWith('video') ? (
                  <div className='relative w-full h-full flex items-center justify-center bg-gray-700 text-white rounded-lg'>
                    <span title={file.name} className='cursor-pointer'>
                      <img src={mp4Icon} alt=' mp4' className='w-10' />
                      <span className='relative z-10 text-xs truncate block w-10'>{file.name}</span>
                    </span>
                  </div>
                ) : file.type.includes('pdf') ? (
                  <div className='w-full h-full flex flex-col items-center justify-center bg-red-500 text-white rounded-lg'>
                    <img src={pdfIcon} alt=' mp4' className='w-10' />
                    <span className='relative z-10 text-xs truncate block w-10'>{file.name}</span>
                  </div>
                ) : file.type.includes('word') ? (
                  <div className='w-full h-full flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg'>
                    <img src={docIcon} alt=' mp4' className='w-10' />
                    <span className='relative z-10 text-xs truncate block w-10'>{file.name}</span>
                  </div>
                ) : file.type.startsWith('audio') ? (
                  <div className='w-full h-full flex flex-col items-center justify-center bg-green-500 text-white rounded-lg'>
                    <img src={mp3Icon} alt=' mp4' className='w-10' />
                    <span className='relative z-10 text-xs truncate block w-10'>{file.name}</span>
                  </div>
                ) : file.type.startsWith('application/vnd.ms-excel') ||
                  file.type.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ? (
                  <div className='w-full h-full flex flex-col items-center justify-center bg-green-500 text-white rounded-lg'>
                    <img src={excelIcon} alt=' mp4' className='w-10' />
                    <span className='relative z-10 text-xs truncate block w-10'>{file.name}</span>
                  </div>
                ) : (
                  <div className='w-full h-full flex flex-col items-center justify-center bg-gray-300 rounded-lg'>
                    <span className='text-xs truncate'>📄 {file.name}</span>
                  </div>
                )}
                <button
                  type='button'
                  className='absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full'
                  onClick={() => removeFile(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
        <div className='flex items-center py-2 px-3 bg-dark rounded-lg dark:bg-gray-700'>
          <input
            type='file'
            multiple
            className='hidden'
            id='file-upload'
            ref={fileInputRef}
            onChange={handleFileChange}
            onClick={handleFileClick}
          />
          <label
            htmlFor='file-upload'
            className='p-2 text-gray-500 cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 rounded-lg'
          >
            📎
          </label>

          {/* Nút chọn emoji */}
          <button
            type='button'
            className='p-2 text-gray-500 cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 rounded-lg'
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            😊
          </button>

          <textarea
            id='chat'
            rows={1}
            className='block mx-4 p-2.5 w-full text-sm text-white bg-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Your message...'
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                onSend(e as unknown as React.FormEvent<HTMLFormElement>)
              }
            }}
            value={value}
          />
          <button
            type='submit'
            className='inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600'
          >
            ➤
          </button>
        </div>

        {/* Emoji picker mở rộng với tìm kiếm */}
        {showEmojiPicker && (
          <div className='absolute bottom-20 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 z-10 w-80 max-h-96 overflow-hidden'>
            {/* Thanh tìm kiếm */}
            <div className='mb-2'>
              <input
                type='text'
                placeholder='Tìm kiếm emoji...'
                className='w-full p-2 text-sm bg-gray-100 text-black dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Hiển thị kết quả tìm kiếm hoặc tabs danh mục */}
            {searchTerm ? (
              <div className='h-64 overflow-y-auto'>
                {searchResults.length > 0 ? (
                  <div className='grid grid-cols-7 gap-1'>
                    {searchResults.map((item, index) => (
                      <button
                        key={`search-${index}`}
                        type='button'
                        className='text-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded'
                        onClick={() => addEmoji(item.emoji)}
                        title={item.description}
                      >
                        {item.emoji}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className='p-4 text-center text-gray-500 dark:text-gray-400'>Không tìm thấy emoji nào</div>
                )}
              </div>
            ) : (
              <>
                {/* Tabs danh mục emoji */}
                <div className='flex overflow-x-auto mb-2 pb-2 border-b border-gray-200 dark:border-gray-700'>
                  {emojiCategories.map((category) => (
                    <button
                      key={category.id}
                      type='button'
                      className={`p-2 text-xl min-w-10 ${currentEmojiCategory === category.id ? 'bg-gray-100 dark:bg-gray-700 rounded' : ''}`}
                      onClick={() => setCurrentEmojiCategory(category.id)}
                      title={category.name}
                    >
                      {category.icon}
                    </button>
                  ))}
                </div>

                {/* Grid emoji */}
                <div className='h-48 overflow-y-auto'>
                  <div className='grid grid-cols-7 gap-1'>
                    {emojisByCategory[currentEmojiCategory as keyof typeof emojisByCategory].map((emoji, index) => (
                      <button
                        key={index}
                        type='button'
                        className='text-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded'
                        onClick={() => addEmoji(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </form>
  )
}
