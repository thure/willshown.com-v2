import React from 'react'
import cx from 'classnames'

import { withStyles } from '@material-ui/core'
import { colors, borderRadii } from '../style'

const styles = {
  loading: {
    backgroundImage: `linear-gradient(90deg, ${colors.dark} 0%, ${colors.lightA(
      0.5
    )} 25%, ${colors.dark} 50%)`,
    backgroundSize: '1400px',
    opacity: 1,
    zIndex: 1,
  },
  loadingMotion: {
    transition: 'opacity .5s linear, z-index 0s linear .5s',
    animation: 'loading infinite linear 4s',
  },
  loadingReady: {
    opacity: 0,
    zIndex: -1,
  },
  loadingLight: {
    background: 'rgba(255,255,255,0.3)',
    borderRadius: borderRadii.A,
  },
}

export default withStyles(styles)(
  ({ ready, light, noMotion, classes, className }) => (
    <div
      className={cx(
        classes.loading,
        !noMotion && classes.loadingMotion,
        light && classes.loadingLight,
        ready && classes.loadingReady,
        className
      )}
    />
  )
)
