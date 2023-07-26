import { createSlice } from '@reduxjs/toolkit'

interface ILocalState {
  isConnectWalletModalOpened: boolean
}

const localState: ILocalState = {
  isConnectWalletModalOpened: false
}

const localSlice = createSlice({
  name: 'local',
  initialState: localState,
  reducers: {
    /**
     * connectWalletModal
     */
    openConnectWalletModal(state) {
      state.isConnectWalletModalOpened = true
    },
    closeConnectWalletModal(state) {
      state.isConnectWalletModalOpened = false
    }
  }
})

export const { openConnectWalletModal, closeConnectWalletModal } = localSlice.actions
export default localSlice.reducer
