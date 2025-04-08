import { AnimatePresence, motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../../store'
import { Phone } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import ringphone from '../../../../assets/audios/ringphone.mp3'
import { useVoiceCall } from '../../../../hooks/useVoiceCall'
import { acceptCall, rejectCallConnect } from '../../../../store/call.slice'

export default function ReceiveCallDialog() {
  const callState = useSelector((state: RootState) => state.call)
  const dispatch = useAppDispatch()
  const [micOn, setMicOn] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { sendAnswerAcceptCall, cancelCall, rejectCall } = useVoiceCall()
  const { peerConnection } = useVoiceCall()

  useEffect(() => {
    // Nếu đang gọi và là người gọi → phát nhạc
    if (callState.incomingCall) {
      if (!audioRef.current) {
        audioRef.current = new Audio(ringphone)
        audioRef.current.loop = true
        audioRef.current.play().catch((err) => {
          console.error('Không thể phát nhạc:', err)
        })
      }
    } else {
      // Ngừng phát nếu không còn gọi nữa
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        audioRef.current = null
      }
    }

    // Clear khi component bị unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [callState.incomingCall, callState.callStatus])

  const handleAcceptCall = () => {
    dispatch(acceptCall())
    sendAnswerAcceptCall()
  }

  const handleRejectCall = () => {
    rejectCall()
    dispatch(rejectCallConnect())
  }

  const handleEndCall = () => {
    cancelCall()
  }

  const toggleMic = async () => {
    if (micOn) {
      // Tắt mic
      window.stopLastStream?.()
      setMicOn(false)
    } else {
      // Bật mic lại
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({ audio: true })
        window.lastStream = newStream
        setMicOn(true)
        console.log('✅ Microphone stream has been restarted.')

        // Cập nhật lại stream cho WebRTC (nếu cần)

        if (peerConnection) {
          newStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, newStream)
          })
        }
      } catch (error) {
        console.error('⚠️ Error restarting microphone:', error)
        setMicOn(false) // Giữ trạng thái tắt nếu lỗi
      }
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
                src={callState.caller?.avatar || 'https://placehold.co/40x40'}
                alt='User avatar'
                className='w-20 h-20 rounded-full'
              />
              <h3 className='text-lg font-semibold'>{callState.caller?.name}</h3>
              <div className='text-gray-400'>
                {callState.incomingCall && 'Cuộc gọi đến...'}
                {callState.callStatus === 'connected' && 'Đang kết nối'}
              </div>
              <div className='flex gap-4 mt-4'>
                {callState.incomingCall && !callState.isCaller && (
                  <>
                    <button
                      onClick={handleAcceptCall}
                      className='bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full transition flex items-center gap-2'
                    >
                      <Phone className='w-5 h-5' /> Đồng ý
                    </button>
                    <button
                      onClick={handleRejectCall}
                      className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition flex items-center gap-2'
                    >
                      <Phone className='w-5 h-5' /> Từ chối
                    </button>
                  </>
                )}
                {(callState.isCaller || callState.callStatus === 'connected') && (
                  <>
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
                      <Phone className='w-5 h-5' /> Kết thúc
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
