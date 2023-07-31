import { useWeb3React } from '@web3-react/core'
import { parseCookies } from 'nookies'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ConnectWalletModal from '~/components/ConnectWalletModal'
import CountdownHero from '~/components/CountdownHero'
import Header from '~/components/Header'
import MintHero from '~/components/MintHero'
import { closeConnectWalletModal } from '~/store/slices/local.slice'
import { RootState } from '~/store/store'
import { COOKIES } from '~/utils/constants'

import { LandingPageStyle } from '~/styles/pages/index.style'

const LandingPage = () => {
  const dispatch = useDispatch()
  const cookies = parseCookies()
  const { connector } = useWeb3React()
  const { isConnectWalletModalOpened } = useSelector((state: RootState) => state.local)

  const onCloseConnectWalletModal = () => {
    dispatch(closeConnectWalletModal())
  }

  useEffect(() => {
    const chainId = process.env.NEXT_PUBLIC_SUPPORT_CHAIN_ID || '1'

    if (typeof window.ethereum !== 'undefined') {
      if (chainId && window.ethereum.networkVersion === chainId) {
        if (connector?.connectEagerly && cookies[COOKIES.SIGNATURE])
          connector?.connectEagerly(chainId)
      }
    } else {
      // Download MetaMask
    }
  }, [])

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
