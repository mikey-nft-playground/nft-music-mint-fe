import { yupResolver } from '@hookform/resolvers/yup'
import EastRoundedIcon from '@mui/icons-material/EastRounded'
import { Box, FormControl, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { BigNumber } from 'ethers'
import { DateTime, Duration, DurationObjectUnits } from 'luxon'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { isAddress } from 'web3-validator'

import { checkWallet, resetCheckWalletResult } from '~/store/slices/wallet.slice'
import { RootState } from '~/store/store'
import { CountdownHeroStyle } from './index.style'
import ResultModal from './ResultModal'
import Image from 'next/image'

const statusSchema = yup.object().shape({
  address: yup
    .string()
    .required('"Wallet address" is not allowed to be empty')
    .test('valid', 'Invalid wallet address', (value) => isAddress(value + ''))
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
  const eventDuration = process.env.NEXT_PUBLIC_EVENT_DURATION!

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({ resolver: yupResolver(statusSchema) })
  const dispatch = useDispatch()
  const { checkWalletResult } = useSelector((state: RootState) => state.wallet)

  const [isResultModalOpened, setResultModalOpened] = useState(false)
  const [address, setAddress] = useState('')
  const [result, setResult] = useState('')

  const [remainingMs, setRemainingMs] = useState(0)
  const intervalLength = 1000
  let countdown: NodeJS.Timer | null = null

  const onOpenResultModal = () => {
    setResultModalOpened(true)
    dispatch(resetCheckWalletResult())
  }

  const onCloseResultModal = () => {
    setResultModalOpened(false)
  }

  const onCheckStatus = (data: { [x: string]: string }) => {
    setAddress(data.address)
    dispatch(checkWallet({ walletAddress: data.address }))
  }

  const startTimer = () => {
    if (deployedTimestamp && eventDuration) {
      const start = BigNumber.from(deployedTimestamp).toNumber() * 1000
      const eventDurationMs = DateTime.fromMillis(start)
        .plus({ days: parseInt(eventDuration) })
        .diffNow('millisecond')
        .toMillis()

      if (eventDurationMs > 0) {
        setRemainingMs(eventDurationMs)
        countdown = setInterval(() => {
          setRemainingMs((duration) => duration - 1000)
        }, intervalLength)
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

  useEffect(() => {
    if (checkWalletResult) {
      setResult(checkWalletResult)
      onOpenResultModal()
    }
  }, [checkWalletResult])

  return (
    <CountdownHeroStyle>
      <Box className="countdown-hero-bg"></Box>
      <Box className="countdown-hero-noise"></Box>
      <Box className="countdown-hero-header"></Box>

      <Box className="countdown-hero-contents-container">
        <Box style={{ paddingBottom: '3.5rem', overflow: 'hidden' }}>
          <Typography variant="h1" className="countdown-hero-title">
            GroundUp Genesis Pass
          </Typography>
          <Typography variant="h3" className="countdown-hero-subtext">
            Countdown to Mint:
          </Typography>

          <Countdown remainingMs={remainingMs} />

          <Box className="check-status">
            <Typography variant="h3" className="countdown-hero-subtext">
              Check Status:
            </Typography>

            <form onSubmit={handleSubmit(onCheckStatus)}>
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
                      error={!!errors.address}
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
                  className={`wallet-address-error ${
                    errors.address && errors.address.message ? 'visible' : ''
                  }`}>
                  {errors.address && errors.address.message && (
                    <Typography>{errors.address.message as string}</Typography>
                  )}
                </Box>
              </FormControl>
            </form>

            <ResultModal
              open={isResultModalOpened}
              onClose={onCloseResultModal}
              address={address}
              result={result}
            />

            <Typography className="countdown-hero-intro-text">
              Check your whitelist status by wallet address.
            </Typography>
            <Typography className="countdown-hero-intro-text">
              It may take a few minutes if you have just submitted your wallet.
            </Typography>
            <Typography className="countdown-hero-intro-text">No ENS please.</Typography>
          </Box>
        </Box>

        <Box className="countdown-hero-gal">
          <Image
            src="/bg/guitar-gal.png"
            alt="Guitar Gal"
            width={0}
            height={0}
            sizes="100vw"
            priority
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>
      </Box>
    </CountdownHeroStyle>
  )
}

export default CountdownHero
