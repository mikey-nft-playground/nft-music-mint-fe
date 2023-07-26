import { yupResolver } from '@hookform/resolvers/yup'
import EastRoundedIcon from '@mui/icons-material/EastRounded'
import { Box, FormControl, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { MintHeroStyle } from './index.style'

const statusSchema = yup.object().shape({
  address: yup.string().required('Please enter your wallet address')
})

const MintHero = () => {
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({ resolver: yupResolver(statusSchema) })

  return (
    <MintHeroStyle>
      <Box className="mint-hero-bg"></Box>
      <Box className="mint-hero-noise"></Box>
      <Box className="mint-hero-header"></Box>

      <Box className="mint-hero-contents-container">
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
            Groundup Studios is a forward-thinking, web3-focused music organization that views music
            and are in a brand new light. We aspire to creat a borderless space for artists to
            connect, create, collaborate and monetize by capitalizing on rapid evolving
            technologies, economics and consumer/artist dynamics.
          </Typography>
        </Box>

        <Box className="mint-section">
          <FormControl className="wallet-address-input">
            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <></>
                // <TextField
                //   id="form-wallet-address"
                //   placeholder="Wallet address"
                //   value={field.value || ''}
                //   onChange={field.onChange}
                //   autoCapitalize="off"
                //   autoComplete="off"
                //   autoCorrect="off"
                //   spellCheck="false"
                //   InputProps={{
                //     endAdornment: (
                //       <InputAdornment position="end">
                //         <IconButton onClick={() => {}} onMouseDown={() => {}} edge="end">
                //           <EastRoundedIcon />
                //         </IconButton>
                //       </InputAdornment>
                //     )
                //   }}
                // />
              )}
            />
            {/* <Box
              className={`feedback-error ${errors.email && errors.email.message ? 'visible' : ''}`}>
              <NotificationImportantIcon />
              {errors.email && errors.email.message && (
                <Typography>{errors.email.message as string}</Typography>
              )}
            </Box> */}
          </FormControl>
        </Box>
      </Box>
    </MintHeroStyle>
  )
}

export default MintHero
