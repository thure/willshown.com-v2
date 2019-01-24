import React from 'react'
import Page from '../components/Page'
import AssetInFlow from '../components/AssetInFlow'

import { cv, assets } from '../config/cv.json'

import { withStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'

const styles = {
  profile: {},
  pic: {
    borderRadius: 9999,
    maxWidth: '12rem',
    margin: '0 auto',
    overflow: 'hidden',
  },
  timeline: {},
}

const CV = ({ classes }) => (
  <Page id="cv" title="CV" description="Will Shown's CV">
    <main>
      <section className={classes.profile}>
        <Paper className={classes.pic}>
          <AssetInFlow asset={assets[cv.profileAsset]} />
        </Paper>
      </section>
      <section className={classes.timeline} />
    </main>
  </Page>
)

export default withStyles(styles)(CV)
