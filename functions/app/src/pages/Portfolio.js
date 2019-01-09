import React from 'react'
import Page from '../components/Page'
import injectSheets from 'react-jss'
import { connect } from 'react-redux'

const styles = {}

class Portfolio extends React.Component {
  render() {
    const { portfolio = null, privatePortfolio = null } = this.props

    return (
      <Page
        id="portfolio"
        title="Portfolio"
        description="Will Shown's online portfolio: topics"
      >
        Hello, this is portfolio, with {Object.keys(portfolio.items).length}{' '}
        topics.
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
)(injectSheets(styles)(Portfolio))
