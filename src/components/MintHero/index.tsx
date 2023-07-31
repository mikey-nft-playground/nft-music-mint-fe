import { Box, Button, Typography } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RevertedMessages } from '~/contracts'
import { openConnectWalletModal } from '~/store/slices/local.slice'
import { getProof, resetProof } from '~/store/slices/wallet.slice'
import { RootState } from '~/store/store'
import { mintBlockchain } from '~/utils/blockchain'
import { COOKIES } from '~/utils/constants'

import QuantityPicker from '../QuantityPicker'
import ConfirmationModal from './ConfirmationModal'
import LoadingModal from './LoadingModal'
import { MintHeroStyle } from './index.style'
import MintResultModal, { EStatus } from './MintResultModal'

const NFT_PRICE = process.env.NEXT_PUBLIC_NFT_PRICE || '0.02'

const MintHero = () => {
  const dispatch = useDispatch()
  const cookies = parseCookies()
  const { gotProof, proof, getProofError } = useSelector((state: RootState) => state.wallet)
  const { connector, hooks } = useWeb3React()
  const { useSelectedAccount } = hooks
  const account = useSelectedAccount(connector)

  const [quantity, setQuantity] = useState(1)
  const [isMintBtnClicked, setMintBtnClicked] = useState(false)
  const [isConfirmationModalOpened, setConfirmationModalOpened] = useState(false)
  const [isLoadingModalOpened, setLoadingModalOpened] = useState(false)
  const [isMintResultModalOpened, setMintResultModalOpened] = useState(false)
  const [mintStatus, setMintStatus] = useState(EStatus.SUCCESS)
  const [mintError, setMintError] = useState('Something went wrong.')

  const onQuantityChange = (qty: number) => {
    setQuantity(qty)
  }

  const onOpenConfirmationModal = () => {
    setMintBtnClicked(true)
    if (!account) {
      dispatch(openConnectWalletModal())
    } else {
      setConfirmationModalOpened(true)
    }
  }

  const onCloseConfirmationModal = () => {
    setMintBtnClicked(false)
    setConfirmationModalOpened(false)
    onCloseLoadingModal()
  }

  const onOpenLoadingModal = () => {
    setLoadingModalOpened(true)
    handleMintNFTs()
  }

  const onCloseLoadingModal = () => {
    setMintBtnClicked(false)
    setLoadingModalOpened(false)
  }

  const onOpenMintResultModal = () => {
    setMintResultModalOpened(true)
    onCloseConfirmationModal()
    onCloseLoadingModal()
  }

  const onCloseMintResultModal = () => {
    setMintResultModalOpened(false)
  }

  const handleMintNFTs = async () => {
    if (account)
      dispatch(
        getProof({
          walletAddress: account,
          type: process.env.NEXT_PUBLIC_EVENT_TYPE!
        })
      )
  }

  useEffect(() => {
    if (account && cookies[COOKIES.SIGNATURE] && isMintBtnClicked && !isConfirmationModalOpened) {
      setTimeout(() => {
        setConfirmationModalOpened(true)
      }, 500)
    }
  }, [account, cookies])

  useEffect(() => {
    if (getProofError) {
      setMintStatus(EStatus.ERROR)
      if (
        getProofError.response &&
        getProofError.response.data &&
        getProofError.response.data.message
      )
        setMintError(getProofError.response.data.message)
      onOpenMintResultModal()
    }
  }, [getProofError])

  useEffect(() => {
    if (gotProof && !!proof.length) {
      mintBlockchain({
        amount: quantity,
        merkleProof: proof,
        value: NFT_PRICE.toString()
      })
        .then(() => {
          console.log('Mint done!')
          dispatch(resetProof())
          setMintStatus(EStatus.SUCCESS)
          setMintError('')
          onOpenMintResultModal()
        })
        .catch((err) => {
          console.log('Mint Error: ', err)
          dispatch(resetProof())
          if ((err as Error).message.includes('insufficient funds')) {
            setMintError('Insufficient funds for gas.')
          }
          RevertedMessages.Messages.forEach((message) => {
            if ((err as Error).message.indexOf(message.errorMessage) > -1) {
              setMintError(message.userMessage)
            }
          })
          setMintStatus(EStatus.ERROR)
          onOpenMintResultModal()
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
            <Typography className="mint-hero-intro-text">MINT Price : {NFT_PRICE}eth</Typography>
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
                <QuantityPicker onChange={onQuantityChange} />
                <Typography className="mint-hero-intro-text">
                  {Number(NFT_PRICE) * quantity}eth
                </Typography>
              </Box>
              <Button className="mint-btn" onClick={onOpenConfirmationModal}>
                Mint
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <ConfirmationModal
        open={isConfirmationModalOpened}
        onClose={onCloseConfirmationModal}
        onConfirm={onOpenLoadingModal}
        quantity={quantity}
        price={Number(NFT_PRICE)}
      />

      <LoadingModal open={isLoadingModalOpened} onClose={onCloseLoadingModal} />

      <MintResultModal
        open={isMintResultModalOpened}
        onClose={onCloseMintResultModal}
        status={mintStatus}
        errorContent={mintError}
      />
    </MintHeroStyle>
  )
}

export default MintHero
