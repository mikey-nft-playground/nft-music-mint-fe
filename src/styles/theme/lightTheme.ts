import { createTheme } from '@mui/material/styles'

const themeColors = {
  text: {
    primary: '#404040',
    secondary: '#808080'
  },
  bg: {
    primary: '#fff',
    secondary: '#eee'
  },
  primary: '#f48024',
  border: '#e0e0e0',
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
