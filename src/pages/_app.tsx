import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { Box, Typography } from '@mui/material'
import { AppProps } from 'next/app'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'

import AuthLayout from '~/components/_layout/Auth'
import SEOLayout from '~/components/_layout/SEO'
import ThemeLayout from '~/components/_layout/Theme'
import { store } from '~/store/store'
import createEmotionCache from '~/utils/createEmotionCache'

type AppPropsRoot = AppProps & { emotionCache: EmotionCache }
const clientSideEmotionCache = createEmotionCache()

const MyApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps }: AppPropsRoot) => {
  const onFallbackRender = ({ error, resetErrorBoundary }: any) => {
    return (
      <Box role="alert">
        <Typography>Something went wrong:</Typography>
        <pre style={{ color: 'red' }}>{JSON.stringify(error)}</pre>
      </Box>
    )
  }

  return (
    <SEOLayout seo={pageProps.seo}>
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <ThemeLayout>
            <AuthLayout>
              <ErrorBoundary fallbackRender={onFallbackRender}>
                <Component {...pageProps} />
              </ErrorBoundary>
            </AuthLayout>
          </ThemeLayout>
        </CacheProvider>
      </Provider>
    </SEOLayout>
  )
}

export default MyApp
