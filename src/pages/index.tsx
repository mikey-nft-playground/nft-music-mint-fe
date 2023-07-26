import CountdownHero from '~/components/CountdownHero'
import Header from '~/components/Header'
import MintHero from '~/components/MintHero'

import { LandingPageStyle } from '~/styles/pages/index.style'

const LandingPage = () => {
  return (
    <>
      <Header />

      <LandingPageStyle>
        <CountdownHero />
        <MintHero />
      </LandingPageStyle>
    </>
  )
}

export default LandingPage
