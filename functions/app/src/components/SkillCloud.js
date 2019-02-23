import React from 'react'
import cx from 'classnames'

import { colors, fonts, typeScale, icons } from '../style'

import Paper from '@material-ui/core/Paper'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  skillsContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
    marginRight: '-.6rem',
    marginBottom: '1rem',
  },
  filterContainer: {
    paddingTop: '.4rem',
    paddingBottom: '.6rem',
  },
  skill: {
    display: 'flex',
    flex: '0 1 auto',
    flexFlow: 'row nowrap',
    background: 'white',
    margin: '0 .6rem .6rem 0',
    overflow: 'hidden',
    order: 0,
  },
  skillHidden: {
    visibility: 'hidden',
    order: 1,
  },
  skillTitle: {
    padding: '.3rem .5rem .3rem .6rem',
    textTransform: 'none',
    letterSpacing: '.01em',
    ...typeScale(-1),
  },
  skillShade: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: colors.red,
    opacity: 0,
  },
  years: {
    position: 'relative',
    background: colors.darkA(0.9),
    color: 'white',
    padding: '.3rem .5rem .3rem .5rem',
    textTransform: 'none',
    ...typeScale(-1),
    fontWeight: 900,
  },
  skillYears: {
    position: 'relative',
    zIndex: 1,
  },
  filter: {
    padding: '.25rem',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '18rem',
    },
  },
  filterInput: {
    display: 'block',
    marginLeft: '.5rem',
    marginRight: '.5rem',
    flex: '1 1 auto',
    ...typeScale(0),
    ...fonts.raleway.medium,
  },
  filterIcon: {
    display: 'block',
    height: '1.2rem',
    width: '1.2rem',
    strokeWidth: [['1.64'], '!important'],
    marginRight: '.4rem',
  },
})

const skillShouldHide = (query, skill) => {
  if (query.length < 2) return false
  if (skill.title.toLowerCase().includes(query)) return false
  if (skill.keywords)
    for (let i = 0; i < skill.keywords.length; i++) {
      if (skill.keywords[i].toLowerCase().includes(query)) return false
    }
  return true
}

const Skill = ({ query, skill, classes }) => {
  const shade =
    (Math.log(parseInt(skill.years) / 8) / 2.5 + 0.8).toFixed(3) || 0
  const hide = skillShouldHide(query, skill)
  return (
    <Paper
      elevation={1}
      className={cx(classes.skill, hide && classes.skillHidden)}
    >
      <Typography
        variant="button"
        className={classes.skillTitle}
        component="div"
      >
        {skill.title}
      </Typography>
      <Typography variant="button" className={classes.years} component="div">
        <i className={classes.skillShade} style={{ opacity: shade }} />
        <span className={classes.skillYears}>{skill.years}</span>
      </Typography>
    </Paper>
  )
}

class SkillCloud extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputValue: '',
    }

    this.handleInputChange = this._handleInputChange.bind(this)
  }

  _handleInputChange(event) {
    this.setState({ inputValue: event.target.value })
  }

  render() {
    const { skills, classes } = this.props
    const { inputValue } = this.state

    return (
      <React.Fragment>
        <CardContent className={classes.filterContainer}>
          <Paper elevation={1} className={classes.filter}>
            <InputBase
              className={classes.filterInput}
              placeholder="Filter by name or keyword"
              onChange={this.handleInputChange}
              value={inputValue}
              spellCheck={false}
              type="search"
              results={0}
            />
            <icons.SearchIcon className={classes.filterIcon} />
          </Paper>
        </CardContent>
        <CardContent className={classes.skillsContainer}>
          {skills.map((skill, si) => (
            <Skill
              skill={skill}
              classes={classes}
              query={inputValue.toLowerCase()}
              key={`skill__${si}`}
            />
          ))}
        </CardContent>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(SkillCloud)
