import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types/user.type'

interface SelectedUserState {
  userSelected: User | null
}

const initialState: SelectedUserState = {
  userSelected: null
}

const selectedUserSlice = createSlice({
  name: 'selectedUser',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.userSelected = action.payload
    }
  }
})

export const { setSelectedUser } = selectedUserSlice.actions
const selectedUserReducer = selectedUserSlice.reducer
export default selectedUserReducer
