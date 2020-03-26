import React from 'react'
import cx from 'classnames'
import Headroom from 'react-headroom'
import { Link } from 'react-router-dom'

import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core'

import { colors, shadows, icons, borderRadii, fonts, typeScale } from '../style'

const styles = ({ breakpoints }) => ({
  outerContainer: {
    paddingBottom: '3px',
    transition: 'transform 120ms ease-in-out, opacity 0ms linear 0ms',
    transform: 'translate3d(0, 0, 0)',
    opacity: 1,
  },
  hiddenOuterContainer: {
    transition: 'transform 120ms ease-in-out, opacity 0ms linear 120ms',
    transform: 'translate3d(0, -100%, 0)',
    opacity: 0,
  },
  innerContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    background: colors.dark,
    boxShadow: shadows.A,
  },
  links: {
    flex: '0 0 auto',
    display: 'flex',
    flexFlow: 'row nowrap',
    position: 'relative',
  },
  pip: {
    display: 'block',
    position: 'absolute',
    bottom: 0,
    width: '1.2rem',
    height: '.25rem',
    background: colors.red,
    borderRadius: [borderRadii.A, borderRadii.A, 0, 0].join(' '),
    transition: 'left .3s cubic-bezier(1, 0, 0, 1) 0s',
    left: `${3 * 0 + (3 - 1.2) / 2}rem`,
  },
  portfolioActive: {
    left: `${3 * 1 + (3 - 1.2) / 2}rem`,
    [breakpoints.up('sm')]: {
      left: `${4.5 + (3 - 1.2) / 2}rem`,
    },
  },
  cvActive: {
    left: `${3 * 2 + (3 - 1.2) / 2}rem`,
    [breakpoints.up('sm')]: {
      left: `${10.5 + (3 - 1.2) / 2}rem`,
    },
  },
  topNavLink: {
    display: 'flex',
    flex: '0 0 auto',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '3rem',
    height: '3rem',
    color: 'white',
    transition: 'color 120ms linear',
    background: 'none',
    '&:hover,&:focus': {
      color: colors.red,
    },
    '&:focus': {
      outline: 'none',
    },
    [breakpoints.up('sm')]: {
      width: '6rem',
    },
  },
  topNavHomeLink: {
    color: colors.red,
    '& .markPath': {
      transition: 'stroke-width 120ms ease-in-out',
    },
    '&:hover .markPath': {
      strokeWidth: 8.6,
    },
    [breakpoints.up('sm')]: {
      width: '3rem',
    },
  },
  topNavLinkIcon: {
    display: 'block',
    height: '1.2em',
    width: '1.2em',
    margin: '0 auto',
    strokeWidth: [[1.42], '!important'],
    [breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  topNavHomeIcon: {
    display: 'block',
    width: 'auto',
    height: '100%',
    margin: '0 auto',
    transform: 'translate(1px, -1px)',
  },
  topNavLinkCopy: {
    display: 'none',
    textShadow: 'none',
    color: 'inherit',
    [breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  tooltip: {
    margin: '.5rem 0',
    background: colors.dark,
    boxShadow: shadows.A,
    ...fonts.sans.medium,
    ...typeScale(-1),
    letterSpacing: '.02em',
    opacity: 1,
    transition: 'opacity .2s linear 0s',
  },
  tooltipDisabled: {
    opacity: [[0], '!important'],
  },
  tooltipHiddenAfterMobile: {
    [breakpoints.up('sm')]: {
      opacity: [[0], '!important'],
    },
  },
})

const TopNavLink = ({
  children,
  to,
  tooltip,
  title,
  classes,
  disableTooltip,
  Icon,
}) => (
  <Tooltip
    position="bottom"
    title={tooltip || title}
    classes={{
      tooltip: cx(
        classes.tooltip,
        disableTooltip && classes.tooltipDisabled,
        title && classes.tooltipHiddenAfterMobile
      ),
    }}
  >
    <Link
      to={to}
      className={cx(
        'topNavLink',
        classes.topNavLink,
        to === '/' && classes.topNavHomeLink
      )}
    >
      <Icon
        className={cx(
          to === '/' ? classes.topNavHomeIcon : classes.topNavLinkIcon
        )}
      />
      {title && (
        <Typography variant="button" className={classes.topNavLinkCopy}>
          {title}
        </Typography>
      )}
    </Link>
  </Tooltip>
)

const TopNav = ({ isAuthenticated, pathName, classes }) => {
  const inRoot = pathName === '/'
  const inCV = pathName.startsWith('/cv')
  const inPortfolio =
    pathName.startsWith('/portfolio') || pathName.startsWith('/deck')
  const disableHeadroom = inCV
  const disableCompletely = inRoot

  return (
    <Headroom
      style={{
        zIndex: 99,
        ...(disableHeadroom ? { position: 'fixed' } : {}),
      }}
      disable={disableHeadroom}
    >
      <div
        className={cx(
          classes.outerContainer,
          disableCompletely && classes.hiddenOuterContainer
        )}
      >
        <nav className={classes.innerContainer}>
          <div className={classes.links}>
            <i
              className={cx(
                classes.pip,
                inPortfolio && classes.portfolioActive,
                inCV && classes.cvActive
              )}
            />
            <TopNavLink
              to="/"
              classes={classes}
              tooltip="Intro"
              disableTooltip={disableCompletely}
              Icon={icons.MarkIcon}
            />
            <TopNavLink
              to="/portfolio"
              classes={classes}
              disableTooltip={disableCompletely}
              Icon={icons.PackageIcon}
              title="Portfolio"
            />
            <TopNavLink
              to="/cv"
              classes={classes}
              disableTooltip={disableCompletely}
              Icon={icons.LayersIcon}
              title="CV/Résumé"
            />
          </div>
        </nav>
      </div>
    </Headroom>
  )
}

export default withStyles(styles)(TopNav)
