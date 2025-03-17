import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types/user.type'

interface UserState {
  currentUser: User | null
  isAuthenticated: boolean
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false
  //   currentUser: getProfileFromLS() || null,
  //   isAuthenticated: Boolean(getAccessTokenFromLS())
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.isAuthenticated = true
    },
    logOut: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
    }
  }
})

export const { loginSuccess, logOut } = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer
