import React from 'react'
import Page from '../components/Page'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'

import publicPortfolio from '../config/portfolio.public.json'

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
}

class Portfolio extends React.Component {
  render() {
    const { privatePortfolio = null, classes } = this.props

    return (
      <Page
        id="portfolio"
        title="Portfolio"
        description="Will Shown's online portfolio: topics"
      >
        <Paper className={classes.root} elevation={1}>
          <InputBase
            className={classes.input}
            placeholder="Enter access code"
          />
        </Paper>
        Hello, this is portfolio, with{' '}
        {Object.keys(publicPortfolio.items).length} topics.
        <br />
        Private portfolio is
        {privatePortfolio ? ' available.' : ' unavailable.'}
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
