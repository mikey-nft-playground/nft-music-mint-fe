import { css } from '@emotion/react'
import styled from '@emotion/styled'
import localFont from 'next/font/local'
const poppins = localFont({
  src: [
    {
      path: '../../../../public/fonts/Poppins/Poppins-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../../../public/fonts/Poppins/Poppins-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../../../public/fonts/Poppins/Poppins-SemiBold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../../../../public/fonts/Poppins/Poppins-Bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ]
})

export const AppStyle = styled('main')(({ theme }: any) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '100vh',
    backgroundColor: theme.bg.primary
  }
})

export const ThemeStyle = css`
  html,
  body,
  button.MuiButton-root,
  p.MuiTypography-root,
  h1.MuiTypography-root,
  h3.MuiTypography-root,
  h4.MuiTypography-root {
    font-family: ${poppins.style.fontFamily};
  }

  button.MuiButton-root {
    min-width: unset;
  }

  .MuiInputBase-root.MuiInput-root:before,
  .MuiInputBase-root.MuiInput-root:after {
    display: none;
  }

  a {
    color: inherit;
  }
`
