import { useTheme } from '@emotion/react'
import { Box, Button, useMediaQuery } from '@mui/material'
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import Twitter from '~/assets/social-icons/twitter.svg'
import Medium from '~/assets/social-icons/medium.svg'
import Discord from '~/assets/social-icons/discord.svg'
import { openConnectWalletModal } from '~/store/slices/local.slice'
import { PATHS } from '~/utils/constants'

import BrandSite from './BrandSite'
import MenuItem from './MenuItem'
import { HeaderStyle } from './index.style'

const TooltipStyle = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }: any) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.primary
  }
}))

const Header = () => {
  const dispatch = useDispatch()
  const theme = useTheme() as any
  const sm = useMediaQuery(theme.breakpoints.up('sm'))
  const [isSignedIn, setSignedIn] = useState(false)

  const onOpenConnectWalletModal = () => {
    dispatch(openConnectWalletModal())
  }

  return (
    <HeaderStyle>
      <Box className="header">
        <Box className="header-container">
          <Box className="header-upper">
            <Box className="header-brand-site">
              <BrandSite width={sm ? 140 : 100} />
            </Box>

            <Box className="header-main">
              <Box className="header-menu">
                <MenuItem href={PATHS.HOME}>Genesis NFT</MenuItem>
              </Box>

              <Box>
                <TooltipStyle title="Twitter">
                  <Link
                    href="#"
                    target="_blank"
                    className="icon-button twitter"
                    aria-label="Twitter">
                    <Twitter height="0.875rem" />
                  </Link>
                </TooltipStyle>

                <TooltipStyle title="Medium">
                  <Link href="#" target="_blank" className="icon-button medium" aria-label="Medium">
                    <Medium height="1.525rem" />
                  </Link>
                </TooltipStyle>

                <TooltipStyle title="Discord">
                  <Link
                    href="#"
                    target="_blank"
                    className="icon-button discord"
                    aria-label="Discord">
                    <Discord height="1rem" />
                  </Link>
                </TooltipStyle>

                {isSignedIn ? (
                  <></>
                ) : (
                  // <UserIndicator />
                  <Button onClick={onOpenConnectWalletModal} className="connect-btn">
                    Connect Wallet
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="header-safe"></Box>
    </HeaderStyle>
  )
}

export default Header
