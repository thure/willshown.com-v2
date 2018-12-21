import React from 'react'
import Page from '../components/Page'

export default () => (
  <Page
    id="not-found"
    title="Not Found"
    description="This is embarrassing."
    noCrawl
  >
    <div style={{ height: '500vh' }}>Super embarrassing.</div>
  </Page>
)
