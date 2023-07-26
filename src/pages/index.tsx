import { useDispatch, useSelector } from 'react-redux'

import ConnectWalletModal from '~/components/ConnectWalletModal'
import CountdownHero from '~/components/CountdownHero'
import Header from '~/components/Header'
import MintHero from '~/components/MintHero'
import { closeConnectWalletModal } from '~/store/slices/local.slice'
import { RootState } from '~/store/store'

import { LandingPageStyle } from '~/styles/pages/index.style'

const LandingPage = () => {
  const dispatch = useDispatch()
  const { isConnectWalletModalOpened } = useSelector((state: RootState) => state.local)

  const onCloseConnectWalletModal = () => {
    dispatch(closeConnectWalletModal())
  }

  return (
    <>
      <Header />

      <LandingPageStyle>
        <CountdownHero />
        <MintHero />
        <ConnectWalletModal open={isConnectWalletModalOpened} onClose={onCloseConnectWalletModal} />
      </LandingPageStyle>
    </>
  )
}

export default LandingPage
