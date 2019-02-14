import React from 'react'
import Headroom from 'react-headroom'
import { Link } from 'react-router-dom'

import Tooltip from '@material-ui/core/Tooltip'

import injectSheet from 'react-jss'
import { colors, shadows, icons, borderRadii, fonts, typeScale } from '../style'
import cx from 'classnames'

const styles = {
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
    left: `${3 * 0 + (3 - 1.2) / 2}rem`,
    width: '1.2rem',
    height: '.25rem',
    background: colors.red,
    borderRadius: [borderRadii.A, borderRadii.A, 0, 0].join(' '),
  },
  portfolioActive: {
    left: `${3 * 1 + (3 - 1.2) / 2}rem`,
  },
  cvActive: {
    left: `${3 * 2 + (3 - 1.2) / 2}rem`,
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
  },
  topNavHomeLink: {
    color: colors.red,
    '& .markPath': {
      transition: 'stroke-width 120ms ease-in-out',
    },
    '&:hover .markPath': {
      strokeWidth: 8.6,
    },
  },
  topNavLinkIcon: {
    display: 'block',
    height: '1.2em',
    width: '1.2em',
    margin: '0 auto',
    strokeWidth: [[1.42], '!important'],
  },
  topNavHomeIcon: {
    display: 'block',
    width: '100%',
    height: 'auto',
    margin: '0 auto',
    transform: 'translate(1px, -1px)',
  },
  tooltip: {
    margin: '.5rem 0',
    background: colors.dark,
    boxShadow: shadows.A,
    ...fonts.raleway.medium,
    ...typeScale(-2),
    letterSpacing: '.02em',
  },
}

const TopNavLink = ({ children, to, tooltip, classes }) => (
  <Tooltip
    position="bottom"
    title={tooltip}
    classes={{ tooltip: classes.tooltip }}
  >
    <Link
      to={to}
      className={cx(
        'topNavLink',
        classes.topNavLink,
        to === '/' && classes.topNavHomeLink
      )}
    >
      {children}
    </Link>
  </Tooltip>
)

const TopNav = ({ isAuthenticated, pathName, classes }) => (
  <Headroom
    style={{
      zIndex: 99,
      ...(pathName.startsWith('/cv') ? { position: 'fixed' } : {}),
    }}
    disable={pathName.startsWith('/cv')}
  >
    <div
      className={cx(
        classes.outerContainer,
        pathName === '/' && classes.hiddenOuterContainer
      )}
    >
      <nav className={classes.innerContainer}>
        <div className={classes.links}>
          <i
            className={cx(
              classes.pip,
              pathName.startsWith('/portfolio') && classes.portfolioActive,
              pathName.startsWith('/cv') && classes.cvActive
            )}
          />
          <TopNavLink to="/" classes={classes} tooltip="Intro">
            <icons.MarkIcon className={classes.topNavHomeIcon} />
          </TopNavLink>
          <TopNavLink to="/portfolio" classes={classes} tooltip="Portfolio">
            <icons.PackageIcon className={classes.topNavLinkIcon} />
          </TopNavLink>
          <TopNavLink to="/cv" classes={classes} tooltip="CV/Résumé">
            <icons.LayersIcon className={classes.topNavLinkIcon} />
          </TopNavLink>
        </div>
      </nav>
    </div>
  </Headroom>
)

export default injectSheet(styles)(TopNav)
