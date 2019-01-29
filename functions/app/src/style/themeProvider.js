import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
import shadows from '@material-ui/core/styles/shadows'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import fonts from './fonts'
import colors from './colors'
import typeScale from './typeScale'
import borderRadii from './borderRadii'

const breakpoints = createBreakpoints({})

const themedShadows = shadows.map(shadow =>
  shadow.replace(/rgba\(0,0,0,/g, colors.darkShadow)
)

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
  shadows: themedShadows,
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
        ...typeScale(7),
        ...fonts.raleway.bold,
        [breakpoints.up('sm')]: {
          ...typeScale(10),
          ...fonts.raleway.bold,
          lineHeight: 1,
        },
        lineHeight: 1,
      },
      h3: {
        ...typeScale(5),
        ...fonts.raleway.black,
      },
      h4: {
        ...typeScale(3),
        ...fonts.raleway.black,
      },
      h5: {
        ...typeScale(3),
        ...fonts.raleway.semibold,
      },
      h6: {
        ...typeScale(2),
        ...fonts.raleway.black,
      },
      body1: {
        ...typeScale(0),
        ...fonts.merriweather.regular,
      },
      body2: {
        ...typeScale(-1),
        ...fonts.merriweather.regular,
      },
      button: {
        ...typeScale(-2),
        ...fonts.raleway.bold,
        letterSpacing: '0.08em',
        fontFeatureSettings: "'lnum' 1, 'onum' 0",
        fontVariantNumeric: 'lining-nums',
      },
      caption: {
        ...typeScale(-2),
        ...fonts.merriweather.regular,
        color: colors.darkA(0.7),
        [breakpoints.up('sm')]: {
          ...typeScale(-1),
        },
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
