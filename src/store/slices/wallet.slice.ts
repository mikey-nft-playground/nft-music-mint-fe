import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IWalletState {
  checkingWallet: boolean
  checkedWallet: boolean
  checkWalletResult: any
  error: any
}

const walletState: IWalletState = {
  checkingWallet: false,
  checkedWallet: false,
  checkWalletResult: null,
  error: null
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState: walletState,
  reducers: {
    /**
     * checkWallet
     */
    checkWallet(state, action: PayloadAction<{ walletAddress: string }>) {
      state.checkingWallet = true
      state.checkedWallet = false
    },
    checkWalletSuccess(state, action) {
      state.checkingWallet = false
      state.checkedWallet = true
      state.checkWalletResult = action.payload
    },
    checkWalletError(state, action) {
      state.checkingWallet = false
      state.checkedWallet = false
      state.error = action.payload
    }
  }
})

export const { checkWallet, checkWalletSuccess, checkWalletError } = walletSlice.actions
export default walletSlice.reducer
