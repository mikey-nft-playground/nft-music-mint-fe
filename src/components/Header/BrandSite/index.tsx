import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

import { PATHS } from '~/utils/constants'
import { BrandSiteStyle } from './index.style'

type IBrandSiteProps = {
  width?: number
  height?: number
}

const BrandSite = (props: IBrandSiteProps) => {
  const { width = 140, height = 50 } = props

  return (
    <BrandSiteStyle>
      <Link className="brand-site" href={PATHS.HOME} aria-label="GroupUp Logo">
        <Box className="brand-site-wrapper">
          <Typography variant="h1">GroupUp Logo</Typography>
          <Image src="logo.svg" width={width} height={height} alt="GroundUp" />
        </Box>
      </Link>
    </BrandSiteStyle>
  )
}

export default BrandSite
