import { yupResolver } from '@hookform/resolvers/yup'
import EastRoundedIcon from '@mui/icons-material/EastRounded'
import { Box, FormControl, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { CountdownHeroStyle } from './index.style'

const statusSchema = yup.object().shape({
  address: yup.string().required('Please enter your wallet address')
})

const CountdownHero = () => {
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({ resolver: yupResolver(statusSchema) })

  const onCheckStatus = (data: { [x: string]: string }) => {
    console.log('Address: ', data)
  }

  return (
    <CountdownHeroStyle>
      <Box className="countdown-hero-bg"></Box>
      <Box className="countdown-hero-noise"></Box>
      <Box className="countdown-hero-header"></Box>

      <Box className="countdown-hero-contents-container">
        <Box>
          <Typography variant="h1" className="countdown-hero-title">
            GroundUp Genesis Pass
          </Typography>
          <Typography variant="h1" className="countdown-hero-subtext">
            Mint 倒计时:
          </Typography>

          <Box className="countdown">
            <Typography variant="h1">3</Typography>
            <Typography>days :</Typography>
            <Typography variant="h1">23</Typography>
            <Typography>h :</Typography>
            <Typography variant="h1">05</Typography>
            <Typography>mins</Typography>
          </Box>

          <Box className="check-status">
            <Typography variant="h1" className="countdown-hero-subtext">
              Check Status:
            </Typography>

            <FormControl className="wallet-address-input">
              <Controller
                control={control}
                name="address"
                render={({ field }) => (
                  <TextField
                    id="form-wallet-address"
                    placeholder="Wallet address"
                    value={field.value || ''}
                    onChange={field.onChange}
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleSubmit(onCheckStatus)}
                            onMouseDown={() => {}}
                            edge="end">
                            <EastRoundedIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
              <Box
                className={`feedback-error ${
                  errors.address && errors.address.message ? 'visible' : ''
                }`}>
                {/* <NotificationImportantIcon /> */}
                {errors.address && errors.address.message && (
                  <Typography>{errors.address.message as string}</Typography>
                )}
              </Box>
            </FormControl>

            <Typography className="countdown-hero-intro-text">
              Check your whiteliststatus by wallet address.
            </Typography>
            <Typography className="countdown-hero-intro-text">
              It may take a few minutes if you just submitted your wallet.
            </Typography>
            <Typography className="countdown-hero-intro-text">No ENS please.</Typography>
          </Box>
        </Box>
        <Box></Box>
      </Box>
    </CountdownHeroStyle>
  )
}

export default CountdownHero
