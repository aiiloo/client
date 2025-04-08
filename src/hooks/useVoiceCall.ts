import { useEffect, useRef, useState } from 'react'
import socket from '../utils/socket'
import { RootState, useAppDispatch } from '../store'
import { acceptCall, cancelCallConnect, receiveCall, rejectCallConnect, sendCall } from '../store/call.slice'
import { User } from '../types/user.type'
import { useSelector } from 'react-redux'
import '../utils/hepler'

export const useVoiceCall = () => {
  const peerConnection = useRef<RTCPeerConnection | null>(null)
  const localStream = useRef<MediaStream | null>(null)

  const dispatch = useAppDispatch()
  const callState = useSelector((state: RootState) => state.call)

  useEffect(() => {
    socket.on('incoming_call', async ({ from, offer, callerInfo }) => {
      console.log('Có cuộc gọi từ', from)
      dispatch(receiveCall({ caller: callerInfo, offer }))
    })

    // Khi nhận được answer cho cuộc gọi đã gửi
    socket.on('call_answered', async ({ from, answer }) => {
      console.log('Cuộc gọi được trả lời bởi', from)
      dispatch(acceptCall())
      if (peerConnection.current) {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer))
      }
    })

    // Nhận ICE candidate từ phía đối phương
    socket.on('ice_candidate', async ({ from, candidate }) => {
      console.log('Cuộc gọi được trả lời bởi', from)
      if (peerConnection.current && candidate) {
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate))
      }
    })

    socket.on('call_rejected', () => {
      peerConnection.current?.close()
      peerConnection.current = null
      dispatch(rejectCallConnect())
      cleanupCall()
    })

    socket.on('call_cancelled', () => {
      peerConnection.current?.close()
      peerConnection.current = null
      console.log('Đã hủy cuộc gọi')
      dispatch(cancelCallConnect())
      cleanupCall()
    })

    // Cleanup khi component unmount
    return () => {
      socket.off('incoming_call')
      socket.off('call_answered')
      socket.off('ice_candidate')
      socket.off('call_rejected')
      socket.off('call_accepted')
    }
  }, [dispatch])

  const cleanupCall = () => {
    if (peerConnection.current) {
      peerConnection.current.close()
      peerConnection.current = null
    }

    if (localStream.current) {
      console.log('Stopping local stream tracks', localStream.current.getTracks())
      localStream.current.getTracks().forEach((track) => {
        track.stop()
      })
      localStream.current = null
    } else {
      console.log('No local stream to clean up')
    }
  }

  // Hàm khởi tạo cuộc gọi
  const startCall = async ({
    receiverId,
    receiverInfo,
    callerInfo
  }: {
    receiverId: string
    receiverInfo: User
    callerInfo: User
  }) => {
    setTimeout(() => {
      dispatch(sendCall(receiverInfo))
    }, 600)
    peerConnection.current = new RTCPeerConnection()

    // Lấy stream từ microphone
    localStream.current = await navigator.mediaDevices.getUserMedia({ audio: true })
    localStream.current.getTracks().forEach((track) => {
      peerConnection.current?.addTrack(track, localStream.current!)
    })

    window.lastStream = localStream.current

    // Thiết lập nghe remote stream khi có track mới
    peerConnection.current.ontrack = (event) => {
      const remoteAudio = document.getElementById('remoteAudio') as HTMLAudioElement
      if (remoteAudio) {
        remoteAudio.srcObject = event.streams[0]
        remoteAudio.play()
      }
    }

    // Tạo offer và gửi cho người nhận
    const offer = await peerConnection.current.createOffer()
    await peerConnection.current.setLocalDescription(offer)
    const dataEmit = {
      receiver_id: receiverId,
      offer: offer,
      callerInfo: callerInfo
    }
    socket.emit('call_user', { payload: dataEmit })

    // Trao đổi ICE candidate
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice_candidate', { receiver_id: receiverId, candidate: event.candidate })
      }
    }
  }

  const sendAnswerAcceptCall = async () => {
    peerConnection.current = new RTCPeerConnection()

    localStream.current = await navigator.mediaDevices.getUserMedia({ audio: true })
    localStream.current.getTracks().forEach((track) => {
      peerConnection.current?.addTrack(track, localStream.current!)
    })

    peerConnection.current.ontrack = (event) => {
      const remoteAudio = document.getElementById('remoteAudio') as HTMLAudioElement
      if (remoteAudio) {
        remoteAudio.srcObject = event.streams[0]
        remoteAudio.play()
      }
    }

    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(callState.offer))
    const answer = await peerConnection.current.createAnswer()
    await peerConnection.current.setLocalDescription(answer)

    socket.emit('answer_call', { receiver_id: callState.caller?._id, answer })

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice_candidate', { receiver_id: callState.caller?._id, candidate: event.candidate })
      }
    }
  }
  // Người nhận từ chối cuộc gọi
  const rejectCall = () => {
    if (callState.incomingCall) {
      socket.emit('reject_call', { receiver_id: callState.caller?._id })
      cleanupCall()
    }
  }

  // Người gọi hủy cuộc gọi
  const cancelCall = () => {
    window.stopLastStream?.()
    cleanupCall()

    if (callState.isCaller) {
      socket.emit('cancel_call', { receiver_id: callState.callee?._id })
    } else {
      socket.emit('cancel_call', { receiver_id: callState.caller?._id })
    }

    dispatch(cancelCallConnect())
  }

  return { startCall, rejectCall, cancelCall, sendAnswerAcceptCall }
}
