import React from 'react'
import Headroom from 'react-headroom'
import { Link } from 'react-router-dom'
import injectSheet from 'react-jss'
import { colors, shadows } from '../style'
import { ReactComponent as PackageIcon } from 'feather-icons/dist/icons/package.svg'
import { ReactComponent as LayersIcon } from 'feather-icons/dist/icons/layers.svg'
import { ReactComponent as MenuIcon } from 'feather-icons/dist/icons/menu.svg'
import { ReactComponent as MarkIcon } from '../assets/mark.svg'

const styles = {
  outerContainer: {
    paddingBottom: '3px',
  },
  innerContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    background: colors.dark,
    boxShadow: shadows.A,
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
  topNavLinkContent: {
    display: 'block',
    width: '100%',
    transition: 'color 120ms linear',
    '&:hover': {
      color: colors.red,
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
  },
}

const TopNavLink = injectSheet(styles)(({ children, to, classes }) => (
  <Link
    to={to}
    className={`topNavLink ${classes.topNavLink}${
      to === '/' ? ` ${classes.topNavHomeLink}` : ''
    }`}
  >
    <div className={classes.topNavLinkContent}>{children}</div>
  </Link>
))

const TopNav = ({ isAuthenticated, pathName, classes }) => (
  <Headroom>
    <div className={classes.outerContainer}>
      <nav className={classes.innerContainer}>
        <TopNavLink to="/">
          <MarkIcon className={classes.topNavHomeIcon} />
        </TopNavLink>
        <TopNavLink to="/portfolio">
          <PackageIcon className={classes.topNavLinkIcon} />
        </TopNavLink>
        <TopNavLink to="/cv">
          <LayersIcon className={classes.topNavLinkIcon} />
        </TopNavLink>
        <TopNavLink to="/etc">
          <MenuIcon className={classes.topNavLinkIcon} />
        </TopNavLink>
      </nav>
    </div>
  </Headroom>
)

export default injectSheet(styles)(TopNav)
