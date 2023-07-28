import { Box, Button, Typography } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RevertedMessages } from '~/contracts'
import { getProof, resetProof } from '~/store/slices/wallet.slice'
import { RootState } from '~/store/store'
import { mintBlockchain } from '~/utils/blockchain'
import QuantityPicker from '../QuantityPicker'
import { MintHeroStyle } from './index.style'
import { EWalletListType } from '~/utils/constants'
import { openConnectWalletModal } from '~/store/slices/local.slice'

const MintHero = () => {
  const dispatch = useDispatch()
  const { gotProof, proof } = useSelector((state: RootState) => state.wallet)
  const { connector, hooks } = useWeb3React()
  const { useSelectedAccount } = hooks
  const account = useSelectedAccount(connector)

  async function handleMintNFTs(amount: number) {
    // await requestAccount()
    if (!account) {
      dispatch(openConnectWalletModal())
    } else {
      dispatch(
        getProof({
          walletAddress: account,
          type: EWalletListType.ALLOW_LIST
        })
      )
    }
  }

  useEffect(() => {
    console.log('1.....', gotProof, proof)
    if (gotProof && !!proof.length) {
      mintBlockchain({
        amount: 1,
        merkleProof: proof,
        value: '0.05'
      })
        .then(() => {
          console.log('Mint done!')
          dispatch(resetProof())
        })
        .catch((err) => {
          console.log('Mint Error: ', err)
          dispatch(resetProof())
          RevertedMessages.Messages.forEach((message) => {
            if ((err as Error).message.indexOf(message.errorMessage) > -1) {
              alert(message.userMessage)
            }
          })
        })
    }
  }, [gotProof, proof])

  return (
    <MintHeroStyle>
      <Box className="mint-hero-bg"></Box>
      <Box className="mint-hero-noise"></Box>
      <Box className="mint-hero-header"></Box>

      <Box className="mint-hero-contents-container">
        <Box className="mint-hero-content">
          <Typography variant="h1" className="mint-hero-title">
            GroundUp Genesis Pass
          </Typography>
          <Typography variant="h1" className="mint-hero-subtext">
            INFO:
          </Typography>

          <Box className="mint-hero-account">
            <Typography className="mint-hero-intro-text">NFT总量 : 2,500</Typography>
            <Typography className="mint-hero-intro-text">MINT Price : 0.02eth</Typography>
          </Box>

          <Box className="mint-hero-info">
            <Typography className="mint-hero-intro-text">NFT介绍:</Typography>
            <Typography className="mint-hero-text">
              Groundup Studios is a forward-thinking, web3-focused music organization that views
              music and are in a brand new light. We aspire to creat a borderless space for artists
              to connect, create, collaborate and monetize by capitalizing on rapid evolving
              technologies, economics and consumer/artist dynamics.
            </Typography>
          </Box>

          <Box className="mint-section">
            <Box style={{ display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
              <Box className="mint-box">
                <Typography className="mint-hero-intro-text">Mint</Typography>
                <QuantityPicker />
                <Typography className="mint-hero-intro-text">0.02eth</Typography>
              </Box>
              <Button className="mint-btn" onClick={async () => handleMintNFTs(1)}>
                Mint
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </MintHeroStyle>
  )
}

export default MintHero
