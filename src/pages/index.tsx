import { Box } from '@mui/material'
import Header from '~/components/Header'

import { LandingPageStyle } from '~/styles/pages/index.style'

const LandingPage = () => {
  return (
    <>
      <Header />
      <LandingPageStyle>
        <Box>Mint 倒计时:</Box>
      </LandingPageStyle>
    </>
  )
}

export default LandingPage
