// src/contexts/SocketProvider.tsx
import { createContext, useContext, useEffect } from 'react'
import socket from '../utils/socket'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const SocketContext = createContext(socket)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.user.currentUser)

  useEffect(() => {
    if (user?._id) {
      socket.auth = { _id: user._id }
      socket.connect()
    }

    return () => {
      socket.disconnect()
    }
  }, [user])

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}

export const useSocket = () => useContext(SocketContext)
