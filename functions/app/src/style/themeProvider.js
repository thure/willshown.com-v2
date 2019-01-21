import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import fonts from './fonts'
import colors from './colors'
import typeScale from './typeScale'
import borderRadii from './borderRadii'

const breakpoints = createBreakpoints({})

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
      h1: {
        ...typeScale(6),
        ...fonts.raleway.light,
        [breakpoints.up('sm')]: {
          ...typeScale(10),
        },
      },
      h4: {
        ...typeScale(3),
        ...fonts.raleway.extrabold,
      },
      body1: {
        ...typeScale(0),
        ...fonts.lapture.caption.regular,
      },
      body2: {
        ...typeScale(-1),
        ...fonts.lapture.caption.regular,
      },
      button: {
        ...typeScale(-2),
        ...fonts.raleway.bold,
        letterSpacing: '0.12em',
      },
      caption: {
        ...typeScale(-1),
        ...fonts.lapture.caption.regular,
        color: colors.darkA(0.7),
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
