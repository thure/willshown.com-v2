import React from 'react'
import Page from '../components/Page'
import injectSheet from 'react-jss'
import cx from 'classnames'
import { typeScale, fonts } from '../style'

import pony from '../assets/404.png'

const styles = {
  img: {
    display: 'block',
    margin: '0 auto',
    maxWidth: '100%',
    marginTop: '2rem',
  },
  text: {
    ...fonts.lapture.caption.regular,
    display: 'block',
    textAlign: 'center',
    marginBottom: '0.6rem',
  },
  big: {
    ...typeScale(3),
  },
  med: {
    ...typeScale(1),
  },
  small: {
    ...typeScale(-1),
  },
}

export default injectSheet(styles)(({ classes }) => (
  <Page id="not-found" title="Not Found" description="Pony ate page." noCrawl>
    <img alt="Pony" className={classes.img} src={pony} />
    <h1 className={cx(classes.text, classes.big)}>Oh no. Pony&nbsp;found.</h1>
    <p className={cx(classes.text, classes.small)}>
      illustration by Kate Beaton
    </p>
  </Page>
))
