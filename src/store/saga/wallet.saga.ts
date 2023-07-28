import { PayloadAction } from '@reduxjs/toolkit'
import { call, put } from 'redux-saga/effects'

import { walletApi } from '~/api/wallet.api'
import { checkWalletError, checkWalletSuccess } from '../slices/wallet.slice'

export function* checkWalletSaga(action: PayloadAction<{ walletAddress: string }>) {
  try {
    const { data } = yield call(walletApi.checkWallet, action.payload)
    if (data && data.message) {
      yield put(checkWalletSuccess(data))
    }
  } catch (error) {
    yield put(checkWalletError(error))
  }
}
