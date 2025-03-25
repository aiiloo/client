import { configureStore } from '@reduxjs/toolkit'
import userReducer from './store/user.slice'
import { useDispatch } from 'react-redux'
import spinnerReducer from './store/spinner.slice'
import selectedUserReducer from './store/selectedUserSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    spinner: spinnerReducer,
    selectedUser: selectedUserReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
