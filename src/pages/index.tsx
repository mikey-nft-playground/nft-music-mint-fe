import { parseCookies } from 'nookies'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AboutHero from '~/components/AboutHero'
import ConnectWalletModal from '~/components/ConnectWalletModal'
import CountdownHero from '~/components/CountdownHero'
import DownloadMetaMaskModal from '~/components/DownloadMetaMaskModal'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import MintHero from '~/components/MintHero'
import { connectors } from '~/connectors'
import { closeConnectWalletModal, closeDownloadMetaMaskModal } from '~/store/slices/local.slice'
import { RootState } from '~/store/store'
import { COOKIES } from '~/utils/constants'

import { LandingPageStyle } from '~/styles/pages/index.style'

const LandingPage = () => {
  const dispatch = useDispatch()
  const cookies = parseCookies()

  const [metaMask, useMetaMask] = connectors[0]
  const [walletConnectV2, useWalletConnectV2] = connectors[1]

  const { isDownloadMetaMaskModalOpened, isConnectWalletModalOpened } = useSelector(
    (state: RootState) => state.local
  )

  const onCloseDownloadMetaMaskModal = () => {
    dispatch(closeDownloadMetaMaskModal())
  }

  const onCloseConnectWalletModal = () => {
    dispatch(closeConnectWalletModal())
  }

  useEffect(() => {
    const chainId = process.env.NEXT_PUBLIC_SUPPORT_CHAIN_ID || '1'

    if (
      chainId &&
      window.ethereum &&
      window.ethereum.networkVersion === chainId &&
      cookies[COOKIES.SIGNATURE]
    ) {
      switch (cookies[COOKIES.CONNECTOR]) {
        case 'metaMask':
          metaMask?.connectEagerly()
          break
        case 'walletConnect':
          walletConnectV2?.connectEagerly()
          break
      }
    }
  }, [])

  return (
    <>
      <Header />

      <LandingPageStyle>
        <CountdownHero />
        <MintHero />
        <AboutHero />
        <Footer />

        <ConnectWalletModal open={isConnectWalletModalOpened} onClose={onCloseConnectWalletModal} />
        <DownloadMetaMaskModal
          open={isDownloadMetaMaskModalOpened}
          onClose={onCloseDownloadMetaMaskModal}
        />
      </LandingPageStyle>
    </>
  )
}

export default LandingPage
