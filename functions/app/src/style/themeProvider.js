import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import fonts from './fonts'

const theme = createMuiTheme({
  typography: Object.assign(
    { useNextVariants: true },
    fonts.lapture.caption.semibold
  ),
})

export default ({ children }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
)
