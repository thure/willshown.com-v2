import React from 'react'
import Page from '../components/Page'
import injectSheets from 'react-jss'

const styles = {}

const Portfolio = props => (
  <Page
    id="portfolio"
    title="Portfolio"
    description="Will Shown's online portfolio: topics"
  >
    Hello, this is portfolio.
  </Page>
)

export default injectSheets(styles)(Portfolio)
