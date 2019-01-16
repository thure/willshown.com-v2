import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import fonts from './fonts'
import colors from './colors'
import typeScale from './typeScale'
import borderRadii from './borderRadii'

export const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: colors.red,
      contrastText: '#fff',
    },
    secondary: {
      main: colors.light,
      contrastText: colors.dark,
    },
    text: {
      primary: colors.dark,
    },
  },
  typography: Object.assign(
    {
      // global values
      useNextVariants: true,
      fontSize: 16,
      fontWeightLight: fonts.raleway.light.fontWeight,
      fontWeightRegular: fonts.raleway.medium.fontWeight,
      fontWeightMedium: fonts.raleway.bold.fontWeight,
      // specific type styles
      button: {
        ...typeScale(-1),
        ...fonts.raleway.bold,
      },
      body1: {
        ...typeScale(0),
        ...fonts.lapture.caption.regular,
      },
      body2: {
        ...typeScale(-0.5),
        ...fonts.lapture.caption.regular,
      },
    },
    fonts.raleway.medium
  ),
  shape: {
    borderRadius: borderRadii.A,
  },
})

export default ({ children }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
)
