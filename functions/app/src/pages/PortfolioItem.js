import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import cx from 'classnames'
import get from 'lodash/get'

import Page from '../components/Page'
import Asset from '../components/Asset'
import NotFound from './NotFound'

import publicPortfolio from '../config/portfolio.public'
import { preventOrphans } from '../style'

import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

const styles = {
  heroAssetContainer: {
    overflow: 'hidden',
    marginBottom: '.5rem',
  },
  heroAsset: {
    display: 'block',
    width: '100%',
    height: 'auto',
  },
  heroHeadline: {
    marginTop: '.3em',
  },
  text: {
    maxWidth: '36rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}

const resolveItem = (id, privatePortfolio) => {
  if (id) {
    if (privatePortfolio) {
      const privateItem = privatePortfolio.structure.find(
        item => item.id === id
      )
      if (privateItem) return { portfolio: privatePortfolio, item: privateItem }
    }
    const publicItem = publicPortfolio.structure.find(item => item.id === id)
    if (publicItem) return { portfolio: publicPortfolio, item: publicItem }
    else return null
  } else return null
}

const PortfolioItemContent = ({ portfolio, content, classes }) => {
  return content.map((particle, pIndex) => {
    const key = `particle_${particle.type}_${pIndex}`
    switch (particle.type) {
      case 'hero':
        return (
          <React.Fragment key={key}>
            <Paper elevation={1} className={classes.heroAssetContainer}>
              <Asset
                className={classes.heroAsset}
                asset={portfolio.assets[particle.asset]}
              />
            </Paper>
            <Typography variant="caption" className={classes.text}>
              {preventOrphans(particle.assetCaption)}
            </Typography>
            <Typography
              variant="h1"
              className={cx(classes.heroHeadline, classes.text)}
              paragraph
            >
              {particle.text}
            </Typography>
          </React.Fragment>
        )
      case 'subtitle':
        return (
          <Typography variant="h3" key={key} className={classes.text}>
            {particle.text}
          </Typography>
        )
      case 'text':
        return (
          <Typography
            variant="body1"
            className={classes.text}
            paragraph
            key={key}
          >
            {preventOrphans(particle.text)}
          </Typography>
        )
      default:
        return null
    }
  })
}

class PortfolioItem extends React.Component {
  render() {
    const { privatePortfolio = null, classes, match } = this.props

    const { item, portfolio } = resolveItem(
      get(match, 'params.id'),
      privatePortfolio
    )

    if (item)
      return (
        <Page
          id={`portfolio_${item.id}`}
          title={`${item.title} | Portfolio`}
          description={`Will Shown's online portfolio: ${item.title}`}
        >
          <main className={classes.item}>
            <PortfolioItemContent
              portfolio={portfolio}
              content={item.content}
              classes={classes}
            />
          </main>
        </Page>
      )
    else return NotFound
  }
}

const mapStateToProps = state => ({
  privatePortfolio: state.auth.privatePortfolio,
})

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withStyles(styles)
)(PortfolioItem)
