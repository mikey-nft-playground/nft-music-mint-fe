import { createTheme } from '@mui/material/styles'

const themeColors = {
  bg: {
    primary: '#fff'
  },
  primary: '#16161a',
  link: '#007fff',
  error: '#d54474'
} as const

const lightTheme = createTheme({
  ...themeColors,
  palette: {
    mode: 'light'
  }
})

export default lightTheme
