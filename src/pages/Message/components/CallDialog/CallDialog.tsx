import { AnimatePresence, motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../../store'
import { Phone } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import ringback from '../../../../assets/audios/ringback.wav'
import { useVoiceCall } from '../../../../hooks/useVoiceCall'

export default function CallDialog() {
  const callState = useSelector((state: RootState) => state.call)
  const [micOn, setMicOn] = useState(true)
  const dispatch = useAppDispatch()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { cancelCall } = useVoiceCall()

  // useEffect(() => {
  //   // Nếu đang gọi và là người gọi → phát nhạc
  //   if (callState.outgoingCall && callState.callStatus === 'calling') {
  //     if (!audioRef.current) {
  //       audioRef.current = new Audio(ringback)
  //       audioRef.current.loop = true
  //       audioRef.current.play().catch((err) => {
  //         console.error('Không thể phát nhạc:', err)
  //       })
  //     }
  //   } else {
  //     // Ngừng phát nếu không còn gọi nữa
  //     if (audioRef.current) {
  //       audioRef.current.pause()
  //       audioRef.current.currentTime = 0
  //       audioRef.current = null
  //     }
  //   }

  //   // Clear khi component bị unmount
  //   return () => {
  //     if (audioRef.current) {
  //       audioRef.current.pause()
  //       audioRef.current = null
  //     }
  //   }
  // }, [callState.outgoingCall, callState.callStatus])

  const handleEndCall = () => {
    cancelCall()
  }

  const toggleMic = () => {
    const stream = window.lastStream
    if (!stream) return

    const audioTracks = stream.getAudioTracks()
    if (audioTracks.length > 0) {
      const enabled = audioTracks[0].enabled
      audioTracks[0].enabled = !enabled
      setMicOn(!enabled)
      console.log(`🎙️ Microphone ${!enabled ? 'enabled' : 'muted'}`)
    }
  }

  return (
    <div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className='bg-[#1c1c1c] rounded-lg p-6 w-96 text-white shadow-xl'
          >
            <div className='flex flex-col items-center gap-4'>
              <img
                src={callState.callee?.avatar || 'https://placehold.co/40x40'}
                alt='User avatar'
                className='w-20 h-20 rounded-full'
              />
              <h3 className='text-lg font-semibold'>{callState.callee?.name}</h3>
              <div className='text-gray-400'>
                {callState.callStatus === 'calling' && (callState.isCaller ? 'Đang gọi...' : 'Cuộc gọi đến...')}
                {callState.callStatus === 'connected' && 'Đang kết nối'}
              </div>
              <div className='flex gap-4 mt-4'>
                <button
                  onClick={toggleMic}
                  className={`${
                    micOn ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'
                  } px-4 py-2 rounded-full transition flex items-center gap-2`}
                >
                  <Phone className='w-5 h-5' />
                  {micOn ? 'Tắt mic' : 'Bật mic'}
                </button>
                <button
                  onClick={handleEndCall}
                  className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition flex items-center gap-2'
                >
                  <Phone className='w-5 h-5' /> Kết thúc rồi
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
