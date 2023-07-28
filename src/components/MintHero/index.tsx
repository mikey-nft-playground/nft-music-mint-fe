import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { BigNumber, Contract, ethers } from 'ethers';
import * as abiFile from 'GroundUp721A.json';

import QuantityPicker from '../QuantityPicker'
import { MintHeroStyle } from './index.style'
import { requestAccount } from '~/utils/blockchain'

const statusSchema = yup.object().shape({
  address: yup.string().required('Please enter your wallet address')
})

const MintHero = () => {
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({ resolver: yupResolver(statusSchema) })

  async function handleMintNFTs(amount: number) {
    const erc721ContractAddress = '0x8C3c3aD87080E2dDF2Ff74b698a4251905310E98'; // from env
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new Contract(erc721ContractAddress, abiFile.abi, signer);

      const options = {value: ethers.utils.parseEther("0.05").mul(BigNumber.from(amount))}; // 0.05ETH per NFT

      // Get merkle proof for the address by calling backend API
      const merkleProof: string[] = [];

      const transaction = await contract.mint(amount, merkleProof, options);
      await transaction.wait();
    }
  }

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
              <Button className="mint-btn" onClick={async () => handleMintNFTs(1)}>Mint</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </MintHeroStyle>
  )
}

export default MintHero
