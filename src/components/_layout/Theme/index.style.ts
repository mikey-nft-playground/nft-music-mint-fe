import { css } from '@emotion/react'
import styled from '@emotion/styled'
// import localFont from 'next/font/local'
// const mulish = localFont({
//   src: '../../../../public/fonts/Mulish/Mulish-VariableFont_wght.woff2'
// })

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
  *:not(code, code *),
  html,
  body,
  button.MuiButton-root,
  p.MuiTypography-root,
  h1.MuiTypography-root,
  h3.MuiTypography-root,
  h4.MuiTypography-root {}

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
