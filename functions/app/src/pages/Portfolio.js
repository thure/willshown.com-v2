import React from 'react'
import Page from '../components/Page'
import { connect } from 'react-redux'

import { typeScale, fonts } from '../style'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import PortfolioCategory from '../components/PortfolioCategory'

import publicPortfolio from '../config/portfolio.public.json'

const styles = theme => ({
  accessCode: {
    padding: '.25rem',
    display: 'flex',
    alignItems: 'center',
    margin: '0.5rem 2rem 2rem 2rem',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '24rem',
      margin: '0 auto 2rem auto',
    },
  },
  accessCodeInput: {
    marginLeft: '.5rem',
    flex: '1 1 auto',
    ...typeScale(0),
    ...fonts.raleway.medium,
  },
  categories: {
    display: 'flex',
    flexFlow: 'row wrap',
    margin: '0 -2rem -2rem 0',
    padding: '0 2rem',
    boxSizing: 'border-box',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      padding: '0',
      width: 'auto',
    },
  },
  category: {
    flex: '1 0 auto',
    margin: '0 0 2rem 0',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      margin: '0 2rem 2rem 0',
      width: 'calc(50% - 2rem)',
    },
  },
  validate: {
    boxShadow: theme.shadows[0],
    marginRight: '.125rem',
  },
})

class Portfolio extends React.Component {
  render() {
    const { privatePortfolio = null, classes } = this.props

    return (
      <Page
        id="portfolio"
        title="Portfolio"
        description="Will Shown's online portfolio: topics"
      >
        <Paper className={classes.accessCode} elevation={1}>
          <InputBase
            className={classes.accessCodeInput}
            placeholder="Access code"
          />
          <Button color="primary" className={classes.validate}>
            <Typography variant="button" color="primary">
              Validate
            </Typography>
          </Button>
        </Paper>
        <main className={classes.categories}>
          {publicPortfolio.structure.map(category => (
            <PortfolioCategory
              key={`PortfolioCategory__${category.title}`}
              portfolio={publicPortfolio}
              category={category}
              className={classes.category}
            />
          ))}
        </main>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  privatePortfolio: state.auth.privatePortfolio,
})

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Portfolio))
