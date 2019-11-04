import React from 'react'
import moment from 'moment'
import cx from 'classnames'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Page from '../components/Page'
import AssetInFlow from '../components/AssetInFlow'
import SkillCloud from '../components/SkillCloud'
import RoutedMarkdown from '../components/RoutedMarkdown'
import { typeScale, icons, preventOrphans } from '../style'

import { cv, assets, footnotes } from '../config/cv.json'

import { withStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const profileWidth = 13
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
    textShadow: 'none',
  },
  profileDatumFlat: {
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
    fontWeight: 400,
    ...typeScale(-1),
  },
  profileDatumCommand: {
    margin: '0 0 0 0',
    padding: '.2rem',
    minWidth: '1.4rem',
    width: 'auto',
    height: 'auto',
    background: 'none',
    textShadow: 'none',
    clipPath: 'inset(-5px -5px -5px -1px)',
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
    '--text-background': 'white',
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
  bifurcatedLeft: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  bifurcatedRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
  },
})

const ProfileLink = ({
  href,
  Icon,
  service,
  title,
  flat,
  classes,
  copy,
  downloadDisposition,
}) => (
  <div className={classes.profileButtonRow}>
    <Button
      size="small"
      variant="text"
      elevation={1}
      href={href}
      className={cx(
        classes.profileDatum,
        flat && classes.profileDatumFlat,
        !downloadDisposition && copy && classes.bifurcatedLeft
      )}
    >
      {Icon ? (
        <Icon className={classes.profileIcon} />
      ) : (
        <Typography variant="button">{service}</Typography>
      )}
      <Typography variant="button" className={classes.profileDatumCopy}>
        {title}
      </Typography>
    </Button>
    {!downloadDisposition && copy && (
      <CopyToClipboard text={copy}>
        <Button
          size="small"
          variant="text"
          className={cx(classes.profileDatumCommand, classes.bifurcatedRight)}
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

        durationParts.push(
          duration.months() > 1 ? `${duration.months() + 1} months` : '1 month'
        )

        return (
          <React.Fragment key={`timelineEvent__${role.timeRange[0]}`}>
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
              <RoutedMarkdown source={role.abstract} />
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
          <ProfileLink
            Icon={icons.MailIcon}
            href={`mailto:${cv.email}`}
            title={cv.email}
            copy={cv.email}
            classes={classes}
          />
          {cv.resumeAsset && (
            <ProfileLink
              Icon={icons.DownloadIcon}
              href={assets[cv.resumeAsset].sources.pdf.src}
              title="résumé as PDF"
              classes={classes}
              downloadDisposition
            />
          )}

          {cv.socialLinks.map(({ href, title, service }) => (
            <ProfileLink
              href={href}
              service={service}
              title={title}
              key={`socialDatum_${service}`}
              classes={classes}
              flat
            />
          ))}
        </CardContent>
      </section>
      <section className={classes.timeline}>
        <CardContent className={classes.timelineHeader}>
          <Typography variant="h3" paragraph>
            Skills &amp; tools
          </Typography>
          <Typography variant="body2">
            The numbers next to each item indicate (very approximately)
            cumulative years of regular use. The list is in no
            particular&nbsp;order.
          </Typography>
        </CardContent>
        <SkillCloud skills={cv.skills} />
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
        <CardContent className={classes.timelineHeader}>
          <Typography variant="h4" paragraph>
            Footnotes
          </Typography>
          {footnotes.text.map((textParticle, tpIndex) => (
            <Typography
              variant="body2"
              component="div"
              paragraph
              key={`footnote__${tpIndex}`}
            >
              <RoutedMarkdown source={textParticle} />
            </Typography>
          ))}
        </CardContent>
      </section>
    </main>
  </Page>
)

export default withStyles(styles)(CV)
