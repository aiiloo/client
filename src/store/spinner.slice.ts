import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SpinnerState {
  isloading: boolean
}

const initialState: SpinnerState = {
  isloading: false
}

const spinnerSlice = createSlice({
  name: 'spinner',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isloading = action.payload
    }
  }
})

export const { setLoading } = spinnerSlice.actions
const spinnerReducer = spinnerSlice.reducer
export default spinnerReducer
