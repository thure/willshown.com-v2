import React from 'react'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Page from '../components/Page'
import AssetInFlow from '../components/AssetInFlow'
import { icons, preventOrphans } from '../style'

import { cv, assets } from '../config/cv.json'

import { withStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const styles = {
  profile: {
    maxWidth: '13.2rem',
    margin: '0 auto 2rem auto',
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
  picAsset: {
    '-webkit-clip-path': 'circle(50% at 50% 50%)',
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
        <icons.CopyIcon className={classes.copyIcon} />
      </Button>
    </CopyToClipboard>
  </div>
)

const dateFormat = 'MMM YYYY'

const TimelineEvent = ({ classes, event }) => {
  const timeFrom = moment(event.timeRange[0])
  const timeTo = moment(event.timeRange[1] || Date.now())
  const duration = moment.duration(timeTo.diff(timeFrom))

  const durationParts = []

  if (duration.years() > 0)
    durationParts.push(
      duration.years() > 1 ? `${duration.years()} years` : '1 year'
    )

  if (duration.months() > 0)
    durationParts.push(
      duration.months() > 1 ? `${duration.months()} months` : '1 month'
    )

  return (
    <section className={classes.timelineItem}>
      <Typography variant="h5" paragraph>
        {event.institution}
      </Typography>
      <Typography variant="body1" paragraph>
        {`${durationParts.join(' ')} | ${timeFrom.format(
          dateFormat
        )} to ${preventOrphans(timeTo.format(dateFormat))}`}
      </Typography>
      <Typography variant="h6" paragraph>
        {event.title}
      </Typography>
      <Typography variant="body2" paragraph component="div">
        <ReactMarkdown source={preventOrphans(event.abstract)} />
      </Typography>
    </section>
  )
}

const CV = ({ classes }) => (
  <Page id="cv" title="CV" description="Will Shown's CV">
    <main>
      <section className={classes.profile}>
        <Paper className={classes.pic}>
          <AssetInFlow
            asset={assets[cv.profileAsset]}
            className={classes.picAsset}
          />
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
                  Icon={icons.MailIcon}
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
                  Icon={icons.GithubIcon}
                  href={`https://github.com/${social}/`}
                  social={social}
                  key={`socialDatum_${socialType}`}
                  classes={classes}
                />
              )
            case 'soundcloud':
              return (
                <ProfileLink
                  Icon={icons.DiscIcon}
                  href={`https://soundcloud.com/${social}/`}
                  social={social}
                  key={`socialDatum_${socialType}`}
                  classes={classes}
                />
              )
            case 'instagram':
              return (
                <ProfileLink
                  Icon={icons.InstagramIcon}
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
      <section className={classes.timeline}>
        <Typography variant="h3" paragraph>
          Work
        </Typography>
        {cv.workTimeline.map(event => (
          <TimelineEvent classes={classes} event={event} />
        ))}
        <Typography variant="h3" paragraph>
          Education
        </Typography>
        {cv.educationTimeline.map(event => (
          <TimelineEvent classes={classes} event={event} />
        ))}
      </section>
    </main>
  </Page>
)

export default withStyles(styles)(CV)
