import React from 'react'
import Page from '../components/Page'
import fetch from 'cross-fetch'
import { rootURL } from './index'
import injectSheets from 'react-jss'

const styles = {}

class Portfolio extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingPrivatePortfolio: true,
      privatePortfolio: null,
    }
  }

  componentDidMount() {
    fetch(`${rootURL()}/config/portfolio.private.json`)
      .then(res => res.json())
      .then(privatePortfolio =>
        this.setState({
          loadingPrivatePortfolio: false,
          privatePortfolio,
        })
      )
      .catch(err =>
        this.setState({
          loadingPrivatePortfolio: false,
        })
      )
  }

  render() {
    const { portfolio = null } = this.props
    const { loadingPrivatePortfolio, privatePortfolio } = this.state

    return (
      <Page
        id="portfolio"
        title="Portfolio"
        description="Will Shown's online portfolio: topics"
      >
        Hello, this is portfolio, with {Object.keys(portfolio.items).length}{' '}
        topics.
        <br />
        Private portfolio is{' '}
        {loadingPrivatePortfolio
          ? 'loading'
          : privatePortfolio
          ? 'available'
          : 'unavailable'}
        .
      </Page>
    )
  }
}

export default injectSheets(styles)(Portfolio)
