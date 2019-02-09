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
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const profileWidth = 13.2
const timelineWidth = 24
const gap = 2
const sideBySide = profileWidth + timelineWidth + gap
const sideBySideBreakpoint = `@media (min-width: ${sideBySide * 16}px)`

const styles = () => ({
  cv: {},
  profile: {
    width: '100%',
    minWidth: `${profileWidth}rem`,
    margin: '0 auto',
    [sideBySideBreakpoint]: {
      position: 'fixed',
      width: `${profileWidth}rem`,
    },
  },
  profileTitle: {
    textAlign: 'center',
  },
  profileLinks: {
    [sideBySideBreakpoint]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
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
    margin: '.5rem -8px',
    [sideBySideBreakpoint]: {
      margin: '.5rem 0',
    },
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
  timeline: {
    [sideBySideBreakpoint]: {
      paddingLeft: `${profileWidth + gap}rem`,
    },
  },
  timelineHeader: {
    paddingTop: 0,
    paddingBottom: '1rem',
  },
  timelineItem: {
    marginBottom: '2rem',
  },
  timelineAbstractLast: {
    '& > p:last-of-type': {
      marginBottom: 0,
    },
  },
  timelineAbstract: {
    '& > p:last-of-type': {
      marginBottom: '1.4rem',
    },
  },
  timelineCopy: {
    marginBottom: '1rem',
  },
  timelineInstitution: {
    marginBottom: '1.2rem',
  },
})

const AnchorTo = fullRoute => props => (
  <a {...props} href={fullRoute}>
    {props.children}
  </a>
)

const ProfileLink = ({
  href,
  Icon,
  social,
  classes,
  copy,
  downloadDisposition,
}) => (
  <div className={classes.profileButtonRow}>
    <Button
      size="small"
      component={AnchorTo(href)}
      className={classes.profileDatum}
    >
      <Icon className={classes.profileIcon} />
      <code className={classes.profileDatumCopy}>{social}</code>
    </Button>
    {!downloadDisposition && copy && (
      <CopyToClipboard text={copy}>
        <Button
          size="small"
          className={classes.profileDatumCommand}
          title={`Click to copy “${copy || href}”`}
        >
          <icons.CopyIcon className={classes.copyIcon} />
        </Button>
      </CopyToClipboard>
    )}
  </div>
)

const dateFormat = 'MMM YYYY'

const TimelineEvent = ({ classes, event }) => (
  <Paper elevation={1} className={classes.timelineItem}>
    <CardContent>
      <Typography variant="h5" className={classes.timelineInstitution}>
        {event.institution}
      </Typography>
      {event.roles.map((role, rIndex, roles) => {
        const timeFrom = moment(role.timeRange[0])
        const timeTo = moment(role.timeRange[1] || Date.now())
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
          <React.Fragment>
            <Typography variant="h6" className={classes.timelineCopy}>
              {role.title}
              {role.team ? `: ${role.team}` : ''}
            </Typography>
            <Typography variant="button" className={classes.timelineCopy}>
              {`${durationParts.join(' ')} | ${timeFrom.format(
                dateFormat
              )} to\xa0${
                role.timeRange[1]
                  ? preventOrphans(timeTo.format(dateFormat))
                  : 'present'
              }`}
            </Typography>
            <Typography
              variant="body2"
              component="div"
              className={
                rIndex + 1 === roles.length
                  ? classes.timelineAbstractLast
                  : classes.timelineAbstract
              }
            >
              <ReactMarkdown source={preventOrphans(role.abstract)} />
            </Typography>
          </React.Fragment>
        )
      })}
    </CardContent>
  </Paper>
)

const CV = ({ classes }) => (
  <Page id="cv" title="CV" description="CV / résumé / list of things">
    <main className={classes.cv}>
      <section className={classes.profile}>
        <Paper className={classes.pic}>
          <AssetInFlow
            asset={assets[cv.profileAsset]}
            className={classes.picAsset}
            forceFullWidth
          />
        </Paper>
        <Typography variant="h3" className={classes.profileTitle}>
          {cv.name}
        </Typography>
        <CardContent className={classes.profileLinks}>
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
          {cv.resumeAsset && (
            <ProfileLink
              Icon={icons.DownloadIcon}
              href={assets[cv.resumeAsset].sources.pdf.src}
              social="résumé as PDF"
              classes={classes}
              downloadDisposition
            />
          )}
        </CardContent>
      </section>
      <section className={classes.timeline}>
        <CardContent className={classes.timelineHeader}>
          <Typography variant="h3">Work</Typography>
        </CardContent>
        {cv.workTimeline.map(event => (
          <TimelineEvent
            key={`timelineEvent_${event.roles[0].timeRange[0]}`}
            classes={classes}
            event={event}
          />
        ))}
        <CardContent>
          <Typography variant="h3">Education</Typography>
        </CardContent>
        {cv.educationTimeline.map(event => (
          <TimelineEvent
            key={`timelineEvent_${event.roles[0].timeRange[0]}`}
            classes={classes}
            event={event}
          />
        ))}
      </section>
    </main>
  </Page>
)

export default withStyles(styles)(CV)
