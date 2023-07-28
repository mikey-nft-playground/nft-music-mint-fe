import { all, takeLatest } from 'redux-saga/effects'

import { checkWallet } from './slices/wallet.slice'
import { checkWalletSaga } from './saga/wallet.saga'

function* rootSaga() {
  yield all([takeLatest(checkWallet.type, checkWalletSaga)])
}

export default rootSaga
