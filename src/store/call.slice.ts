import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types/user.type'

interface CallState {
  incomingCall: boolean
  outgoingCall: boolean
  inCall: boolean // đang trong cuộc gọi
  isCaller: boolean // true nếu là người gọi
  caller?: User // người đang gọi đến
  callee?: User
  callStatus: 'idle' | 'calling' | 'ringing' | 'connected' | 'ended' // trạng thái cuộc gọi
  offer: RTCSessionDescriptionInit
}

const initialState: CallState = {
  incomingCall: false,
  outgoingCall: false,
  inCall: false,
  isCaller: false,
  caller: undefined,
  callStatus: 'idle',
  offer: {
    type: 'offer',
    sdp: ''
  }
}

const callSlice = createSlice({
  name: 'call',
  initialState,
  reducers: {
    sendCall: (state, action: PayloadAction<User>) => {
      state.outgoingCall = true
      state.isCaller = true
      state.callee = action.payload
      state.callStatus = 'calling'
    },
    acceptCall: (state) => {
      state.incomingCall = false
      state.outgoingCall = false
      state.inCall = true
      state.callStatus = 'connected'
    },
    rejectCallConnect: (state) => {
      state.incomingCall = false
      state.outgoingCall = false
      state.inCall = false
      state.callStatus = 'idle'
    },
    receiveCall: (state, action: PayloadAction<{ caller: User; offer: RTCSessionDescriptionInit }>) => {
      state.incomingCall = true
      state.isCaller = false
      state.caller = action.payload.caller
      state.offer = action.payload.offer
      state.callStatus = 'ringing'
    },
    cancelCallConnect: (state) => {
      state.incomingCall = false
      state.outgoingCall = false
      state.inCall = false

      state.callStatus = 'ended'
    }
  }
})

export const { sendCall, acceptCall, rejectCallConnect, receiveCall, cancelCallConnect } = callSlice.actions
const callReducer = callSlice.reducer
export default callReducer
