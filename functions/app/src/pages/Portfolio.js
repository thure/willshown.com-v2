import React from 'react'
import Page from '../components/Page'
import injectSheets from 'react-jss'

const styles = {}

const Portfolio = ({ portfolio = null }) => (
  <Page
    id="portfolio"
    title="Portfolio"
    description="Will Shown's online portfolio: topics"
  >
    Hello, this is portfolio, with {Object.keys(portfolio.items).length} topics.
  </Page>
)

export default injectSheets(styles)(Portfolio)
