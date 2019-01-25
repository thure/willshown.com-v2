import React from 'react'
// import moment from 'moment'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Page from '../components/Page'
import AssetInFlow from '../components/AssetInFlow'

import { cv, assets } from '../config/cv.json'

import { withStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { ReactComponent as MailIcon } from 'feather-icons/dist/icons/mail.svg'
import { ReactComponent as GithubIcon } from 'feather-icons/dist/icons/github.svg'
import { ReactComponent as DiscIcon } from 'feather-icons/dist/icons/disc.svg'
import { ReactComponent as InstagramIcon } from 'feather-icons/dist/icons/instagram.svg'
import { ReactComponent as CopyIcon } from 'feather-icons/dist/icons/copy.svg'

const styles = {
  profile: {
    maxWidth: '13.2rem',
    margin: '0 auto',
  },
  profileTitle: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  profileIcon: {
    height: '1.2rem',
    width: '1.2rem',
    strokeWidth: [[1.64], '!important'],
  },
  copyIcon: {
    height: '.8rem',
    width: '.8rem',
  },
  profileDatum: {
    flex: '1 0 auto',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    background: 'none',
  },
  profileButtonRow: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'stretch',
    margin: '.5rem 0',
  },
  profileDatumCopy: {
    flex: '1 1 auto',
    textAlign: 'right',
    textTransform: 'none',
    letterSpacing: '.02em',
    fontWeight: 400,
  },
  profileDatumCommand: {
    margin: '0 0 0 0',
    padding: '.2rem',
    minWidth: '1.4rem',
    width: 'auto',
    height: 'auto',
  },
  pic: {
    borderRadius: 9999,
    maxWidth: '12rem',
    margin: '0 auto 1rem auto',
    overflow: 'hidden',
  },
  timeline: {},
}

const AnchorTo = fullRoute => props => (
  <a {...props} href={fullRoute} target="_blank" rel="noopener noreferrer">
    {props.children}
  </a>
)

const ProfileLink = ({ href, Icon, social, classes, copy }) => (
  <div className={classes.profileButtonRow}>
    <Button
      size="small"
      component={AnchorTo(href)}
      className={classes.profileDatum}
    >
      <Icon className={classes.profileIcon} />
      <code className={classes.profileDatumCopy}>{social}</code>
    </Button>
    <CopyToClipboard text={copy || href}>
      <Button
        size="small"
        className={classes.profileDatumCommand}
        title={`Click to copy “${copy || href}”`}
      >
        <CopyIcon className={classes.copyIcon} />
      </Button>
    </CopyToClipboard>
  </div>
)

const CV = ({ classes }) => (
  <Page id="cv" title="CV" description="Will Shown's CV">
    <main>
      <section className={classes.profile}>
        <Paper className={classes.pic}>
          <AssetInFlow asset={assets[cv.profileAsset]} />
        </Paper>
        <Typography variant="h3" className={classes.profileTitle}>
          {cv.name}
        </Typography>
        {Object.keys(cv.social).map(socialType => {
          const social = cv.social[socialType]
          switch (socialType) {
            case 'email':
              return (
                <ProfileLink
                  Icon={MailIcon}
                  href={`mailto:${social}`}
                  social={social}
                  copy={social}
                  key={`socialDatum_${socialType}`}
                  classes={classes}
                />
              )
            case 'github':
              return (
                <ProfileLink
                  Icon={GithubIcon}
                  href={`https://github.com/${social}/`}
                  social={social}
                  key={`socialDatum_${socialType}`}
                  classes={classes}
                />
              )
            case 'soundcloud':
              return (
                <ProfileLink
                  Icon={DiscIcon}
                  href={`https://soundcloud.com/${social}/`}
                  social={social}
                  key={`socialDatum_${socialType}`}
                  classes={classes}
                />
              )
            case 'instagram':
              return (
                <ProfileLink
                  Icon={InstagramIcon}
                  href={`https://www.instagram.com/${social}/`}
                  social={`@${social}`}
                  key={`socialDatum_${socialType}`}
                  classes={classes}
                />
              )
            default:
              return null
          }
        })}
      </section>
      <section className={classes.timeline} />
    </main>
  </Page>
)

export default withStyles(styles)(CV)
