import { io } from 'socket.io-client'
const socket = io(import.meta.env.VITE_URL_SERVER, {
  autoConnect: false
})

export default socket
