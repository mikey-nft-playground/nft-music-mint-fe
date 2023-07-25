import CountdownHero from '~/components/CountdownHero'
import Header from '~/components/Header'

import { LandingPageStyle } from '~/styles/pages/index.style'

const LandingPage = () => {
  return (
    <>
      <Header />

      <LandingPageStyle>
        <CountdownHero />
      </LandingPageStyle>
    </>
  )
}

export default LandingPage
