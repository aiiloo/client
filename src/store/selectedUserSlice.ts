import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SelectedUserState {
  selectedUserId: string | null
}

const initialState: SelectedUserState = {
  selectedUserId: null
}

const selectedUserSlice = createSlice({
  name: 'selectedUser',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<string | null>) => {
      state.selectedUserId = action.payload
    }
  }
})

export const { setSelectedUser } = selectedUserSlice.actions
const selectedUserReducer = selectedUserSlice.reducer
export default selectedUserReducer
