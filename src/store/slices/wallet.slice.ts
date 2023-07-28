import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { EWalletListType } from '~/utils/constants'

interface IWalletState {
  checkingWallet: boolean
  checkedWallet: boolean
  checkWalletResult: string | null
  gettingProof: boolean
  gotProof: boolean
  proof: string[]
  error: any
}

const walletState: IWalletState = {
  checkingWallet: false,
  checkedWallet: false,
  checkWalletResult: null,
  gettingProof: false,
  gotProof: false,
  proof: [],
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
    },

    /**
     * getProof
     */
    getProof(state, action: PayloadAction<{ walletAddress: string; type: EWalletListType }>) {
      state.gettingProof = true
      state.gotProof = false
    },
    getProofSuccess(state, action) {
      state.gettingProof = false
      state.gotProof = true
      state.proof = action.payload
    },
    getProofError(state, action) {
      state.gettingProof = false
      state.gotProof = false
      state.error = action.payload
    }
  }
})

export const {
  checkWallet,
  checkWalletSuccess,
  checkWalletError,
  getProof,
  getProofSuccess,
  getProofError
} = walletSlice.actions
export default walletSlice.reducer
