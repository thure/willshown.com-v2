import React from 'react'

import { colors, typeScale } from '../style'

import Paper from '@material-ui/core/Paper'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core'

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'row wrap',
    marginRight: '-.6rem',
  },
  skill: {
    display: 'flex',
    flex: '0 1 auto',
    flexFlow: 'row nowrap',
    alignItems: 'stretch',
    background: 'white',
    margin: '0 .6rem .6rem 0',
    overflow: 'hidden',
  },
  skillTitle: {
    padding: '.3rem .6rem',
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
    padding: '.3rem .4rem',
    textTransform: 'none',
    ...typeScale(-1),
  },
  skillYears: {
    position: 'relative',
    zIndex: 1,
  },
}

const Skill = ({ skill, classes }) => (
  <Paper elevation={1} className={classes.skill}>
    <Typography variant="button" className={classes.skillTitle}>
      {skill.title}
    </Typography>
    <Typography variant="button" className={classes.years}>
      <i
        className={classes.skillShade}
        style={{
          opacity:
            (Math.log(parseInt(skill.years) / 12) / 3 + 1).toFixed(3) || 0,
        }}
      />
      <span className={classes.skillYears}>{skill.years}</span>
    </Typography>
  </Paper>
)

class SkillCloud extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { skills, classes } = this.props

    return (
      <CardContent className={classes.container}>
        {skills.map((skill, si) => (
          <Skill skill={skill} classes={classes} key={`skill__${si}`} />
        ))}
      </CardContent>
    )
  }
}

export default withStyles(styles)(SkillCloud)
