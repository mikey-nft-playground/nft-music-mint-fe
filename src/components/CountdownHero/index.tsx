import { yupResolver } from '@hookform/resolvers/yup'
import EastRoundedIcon from '@mui/icons-material/EastRounded'
import { Box, FormControl, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { BigNumber } from 'ethers'
import { DateTime, Duration, DurationObjectUnits } from 'luxon'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'

import { checkWallet } from '~/store/slices/wallet.slice'
import { CountdownHeroStyle } from './index.style'

const statusSchema = yup.object().shape({
  address: yup.string().required('Please enter your wallet address')
})

const Countdown = (props: { remainingMs: number }) => {
  const { remainingMs = 0 } = props
  const [duration, setDuration] = useState<DurationObjectUnits>({ days: 0, hours: 0, minutes: 0 })

  useEffect(() => {
    if (remainingMs)
      setDuration(Duration.fromMillis(remainingMs).shiftTo('days', 'hours', 'minutes').toObject())
  }, [remainingMs])

  return (
    <Box className="countdown">
      <Typography variant="h1">{duration.days}</Typography>
      <Typography>days :</Typography>
      <Typography variant="h1">{duration.hours}</Typography>
      <Typography>h :</Typography>
      <Typography variant="h1">{Math.trunc(duration.minutes || 0)}</Typography>
      <Typography>mins</Typography>
    </Box>
  )
}

const CountdownHero = () => {
  const deployedTimestamp = process.env.NEXT_PUBLIC_CONTRACT_DEPLOYED_TIMESTAMP!
  const allowListDuration = process.env.NEXT_PUBLIC_ALLOW_LIST_DURATION!
  const whiteListDuration = process.env.NEXT_PUBLIC_WHITE_LIST_DURATION!

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({ resolver: yupResolver(statusSchema) })
  const dispatch = useDispatch()

  const [remainingMs, setRemainingMs] = useState(0)
  const intervalLength = 1000
  let countdown: NodeJS.Timer | null = null

  const onCheckStatus = (data: { [x: string]: string }) => {
    dispatch(checkWallet({ walletAddress: data.address }))
  }

  const startTimer = () => {
    if (deployedTimestamp && allowListDuration && whiteListDuration) {
      const start = BigNumber.from(deployedTimestamp).toNumber() * 1000
      const allowListDurationMs = DateTime.fromMillis(start)
        .plus({ days: parseInt(allowListDuration) })
        .diffNow('millisecond')
        .toMillis()

      if (allowListDurationMs > 0) {
        setRemainingMs(allowListDurationMs)
        countdown = setInterval(() => {
          setRemainingMs((duration) => duration - 1000)
        }, intervalLength)
      } else {
        const whiteListDurationMs = DateTime.fromMillis(start)
          .plus({ days: parseInt(allowListDuration) + parseInt(whiteListDuration) })
          .diffNow('millisecond')
          .toMillis()
        if (whiteListDurationMs > 0) {
          setRemainingMs(whiteListDurationMs)
          countdown = setInterval(() => {
            setRemainingMs((duration) => duration - 1000)
          }, intervalLength)
        }
      }
    }
  }

  const cancelTimer = () => {
    countdown && clearInterval(countdown)
    setRemainingMs(0)
  }

  useEffect(() => {
    startTimer()
    return () => cancelTimer()
  }, [])

  return (
    <CountdownHeroStyle>
      <Box className="countdown-hero-bg"></Box>
      <Box className="countdown-hero-noise"></Box>
      <Box className="countdown-hero-header"></Box>

      <Box className="countdown-hero-contents-container">
        <Box style={{ overflow: 'hidden' }}>
          <Typography variant="h1" className="countdown-hero-title">
            GroundUp Genesis Pass
          </Typography>
          <Typography variant="h1" className="countdown-hero-subtext">
            Mint 倒计时:
          </Typography>

          <Countdown remainingMs={remainingMs} />

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
      </Box>
    </CountdownHeroStyle>
  )
}

export default CountdownHero
