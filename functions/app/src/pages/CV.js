import React from 'react'
import Page from '../components/Page'
import injectSheets from 'react-jss'

const styles = {}

const CV = props => (
  <Page id="cv" title="CV" description="Will Shown's CV">
    Hello, this is CV.
  </Page>
)

export default injectSheets(styles)(CV)
