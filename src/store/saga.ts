import { all, takeLatest } from 'redux-saga/effects'

import { checkWallet, getProof } from './slices/wallet.slice'
import { checkWalletSaga, getProofSaga } from './saga/wallet.saga'

function* rootSaga() {
  yield all([
    takeLatest(checkWallet.type, checkWalletSaga),
    takeLatest(getProof.type, getProofSaga)
  ])
}

export default rootSaga
