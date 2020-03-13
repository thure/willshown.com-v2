import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
import shadows from '@material-ui/core/styles/shadows'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createSpectacleTheme from 'spectacle/lib/themes/default'
import fonts from './fonts'
import colors from './colors'
import typeScale from './typeScale'
import borderRadii from './borderRadii'

const breakpoints = createBreakpoints({})

const themedShadows = shadows.map(shadow =>
  shadow.replace(/rgba\(0,0,0,/g, colors.darkShadow)
)

let spectacleThemeFlawed = createSpectacleTheme(
  {
    primary: colors.light,
    secondary: colors.dark,
    tertiary: colors.red,
    quaternary: colors.dark,
  },
  {
    primary: {
      name: fonts.sans.name,
      styles: fonts.sans.styles,
    },
    secondary: {
      name: fonts.serif.name,
      styles: fonts.serif.styles,
    },
  }
)

// Fix Spectacle theme using unconfigurable 'black' in places.
Object.keys(spectacleThemeFlawed.screen.components).forEach(componentName => {
  const color = spectacleThemeFlawed.screen.components[componentName].color
  if (color === 'black')
    spectacleThemeFlawed.screen.components[componentName].color = colors.dark
})

export const spectacleTheme = spectacleThemeFlawed

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
      fontWeightRegular: fonts.sans.medium.fontWeight,
      fontWeightMedium: fonts.sans.bold.fontWeight,
      // specific type styles
      h1: {
        ...typeScale(7),
        ...fonts.sans.medium,
        letterSpacing: '-0.008em',
        [breakpoints.up('sm')]: {
          ...typeScale(10),
          ...fonts.sans.bold,
          lineHeight: 1,
        },
        lineHeight: 1,
      },
      h2: {
        ...typeScale(0),
        ...fonts.sans.medium,
      },
      h3: {
        ...typeScale(5),
        ...fonts.sans.black,
      },
      h4: {
        ...typeScale(3),
        ...fonts.sans.black,
      },
      h5: {
        ...typeScale(3),
        ...fonts.sans.semibold,
      },
      h6: {
        ...typeScale(2),
        ...fonts.sans.black,
      },
      body1: {
        ...typeScale(0),
        ...fonts.serif.regular,
      },
      body2: {
        ...typeScale(-1),
        ...fonts.serif.regular,
      },
      button: {
        ...typeScale(-1.5),
        ...fonts.sans.bold,
        letterSpacing: '0.08em',
        fontFeatureSettings: "'lnum' 1, 'onum' 0",
        fontVariantNumeric: 'lining-nums',
      },
      caption: {
        ...typeScale(-2),
        ...fonts.serif.regular,
        color: colors.darkA(0.7),
        [breakpoints.up('sm')]: {
          ...typeScale(-1),
        },
      },
    },
    fonts.sans.medium
  ),
  shape: {
    borderRadius: borderRadii.A,
  },
})

export default ({ children, ...props }) => (
  <MuiThemeProvider {...props} theme={theme}>
    {children}
  </MuiThemeProvider>
)
