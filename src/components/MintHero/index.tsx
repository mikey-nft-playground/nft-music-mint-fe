import { Box, Button, Typography } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import Image from 'next/image'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RevertedMessages } from '~/contracts'
import { openConnectWalletModal, openDownloadMetaMaskModal } from '~/store/slices/local.slice'
import { getProof, resetProof } from '~/store/slices/wallet.slice'
import { RootState } from '~/store/store'
import { getStatusBlockchain, mintBlockchain } from '~/utils/blockchain'
import { COOKIES, EWalletListType } from '~/utils/constants'

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
      if (typeof window.ethereum !== 'undefined') {
        dispatch(openConnectWalletModal())
      } else {
        dispatch(openDownloadMetaMaskModal())
      }
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
    if (account) {
      getStatusBlockchain()
        .then((status: number) => {
          console.log('SmartContract status: ', status)
          switch (status) {
            case 1:
              dispatch(getProof({ walletAddress: account, type: EWalletListType.ALLOW_LIST }))
              break
            case 2:
              dispatch(getProof({ walletAddress: account, type: EWalletListType.WHITE_LIST }))
              break
            case 3:
              setMintStatus(EStatus.ERROR)
              setMintError('Event is over!')
              onOpenMintResultModal()
          }
        })
        .catch((err) => {
          setMintStatus(EStatus.ERROR)
          setMintError('Something went wrong.')
          onOpenMintResultModal()
        })
    }
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
        <Box className="mint-hero-lad">
          <Image
            src="/bg/guitar-lad.png"
            alt="Guitar Lad"
            width={0}
            height={0}
            sizes="100vw"
            priority
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>

        <Box className="mint-hero-content">
          <Typography variant="h1" className="mint-hero-title">
            Mint GroundUp Genesis Pass
          </Typography>
          <Typography variant="h1" className="mint-hero-subtext">
            MINT INFO:
          </Typography>

          <Box className="mint-hero-account">
            <Typography className="mint-hero-intro-text">1st Round: Team 400</Typography>
            <Typography className="mint-hero-intro-text">2nd Round: Allowlist 1750</Typography>
            <Typography className="mint-hero-text">
              Date: August 10, 2023, from 12:00 to 14:00 UTC Allowlist is over allocated, and one
              point allows mint 2 NFTs
            </Typography>
            <Typography className="mint-hero-intro-text">3rd Round: Whitelist 350</Typography>
            <Typography className="mint-hero-text">
              Date: August 10, 2023, 14:00 to August 11, 2023, 02:00 UTC One whitelist point allows
              mint 1 NFT
            </Typography>
            <Typography className="mint-hero-intro-text note">
              *The remaining NFTs from the three rounds will be allocated to the treasury for
              community rewards.
            </Typography>
          </Box>

          <Box className="mint-hero-info">
            <Typography className="mint-hero-intro-text">
              Current Round: <strong>Allowlist</strong>
            </Typography>
            <Typography className="mint-hero-intro-text">
              Round ends in: <strong>1h 23m 56s</strong>
            </Typography>
            <Typography className="mint-hero-intro-text">
              Current round minted: <strong>785/1700</strong>
            </Typography>
            <Typography className="mint-hero-intro-text">
              Total minted: <strong>1085/2500</strong>
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
