import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IWalletState {
  checkingWallet: boolean
  checkedWallet: boolean
  checkWalletResult: string | null
  checkWalletError: any
  gettingProof: boolean
  gotProof: boolean
  proof: string[]
  getProofError: any
}

const walletState: IWalletState = {
  checkingWallet: false,
  checkedWallet: false,
  checkWalletResult: null,
  checkWalletError: null,
  gettingProof: false,
  gotProof: false,
  proof: [],
  getProofError: null
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
      state.checkWalletError = action.payload
    },
    resetCheckWalletResult(state) {
      state.checkingWallet = false
      state.checkedWallet = false
      state.checkWalletResult = null
      state.checkWalletError = null
    },

    /**
     * getProof
     */
    getProof(state, action: PayloadAction<{ walletAddress: string; type: string }>) {
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
      state.getProofError = action.payload
    },
    resetProof(state) {
      state.gettingProof = false
      state.gotProof = false
      state.proof = []
      state.getProofError = null
    }
  }
})

export const {
  checkWallet,
  checkWalletSuccess,
  checkWalletError,
  resetCheckWalletResult,
  getProof,
  getProofSuccess,
  getProofError,
  resetProof
} = walletSlice.actions
export default walletSlice.reducer
