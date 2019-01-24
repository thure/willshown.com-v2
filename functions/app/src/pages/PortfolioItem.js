import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import cx from 'classnames'
import get from 'lodash/get'
import ReactMarkdown from 'react-markdown'

import Page from '../components/Page'
import AssetInFlow from '../components/AssetInFlow'
import LinkTo from '../components/LinkTo'
import NotFound from './NotFound'

import publicPortfolio from '../config/portfolio.public'
import { colors, icons, preventOrphans } from '../style'

import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

const styles = ({ breakpoints }) => ({
  item: {},
  heroAssetContainer: {
    overflow: 'hidden',
    marginBottom: '.5rem',
  },
  heroAsset: {
    display: 'block',
    width: '100%',
    height: 'auto',
  },
  assetLayoutTextWidth: {
    maxWidth: '36rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  heroHeadline: {
    marginTop: '.3em',
  },
  text: {
    display: 'block',
    width: '100%',
    maxWidth: '36rem',
    margin: '1rem auto',
  },
  caption: {
    marginTop: '0.5rem',
  },
  ctaButton: {
    color: colors.dark,
    background: 'white',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginTop: '2rem',
  },
  cta: {
    marginLeft: '1em',
  },
  break: {
    border: 'none',
    borderBottom: `1px solid ${colors.dark}`,
    margin: '2rem auto',
    [breakpoints.up('sm')]: {
      margin: '4rem auto',
    },
    padding: '0',
    width: '50%',
  },
})

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
      case 'asset':
        return (
          <React.Fragment key={key}>
            <Paper
              elevation={1}
              className={cx(
                classes.heroAssetContainer,
                classes[`assetLayout${particle.layout}`]
              )}
            >
              <AssetInFlow
                className={classes.heroAsset}
                asset={portfolio.assets[particle.asset]}
              />
            </Paper>
            {particle.assetCaption && (
              <Typography
                variant="caption"
                className={cx(classes.text, classes.caption)}
                paragraph
              >
                {preventOrphans(particle.assetCaption)}
              </Typography>
            )}
          </React.Fragment>
        )
      case 'title':
        return (
          <Typography
            variant="h1"
            className={cx(classes.heroHeadline, classes.text)}
            paragraph
          >
            {particle.text}
          </Typography>
        )
      case 'subtitle':
        return (
          <Typography variant="h3" key={key} className={classes.text} paragraph>
            {preventOrphans(particle.text)}
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
            <ReactMarkdown skipHtml source={preventOrphans(particle.text)} />
          </Typography>
        )
      case 'break':
        return <hr className={classes.break} />
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
            <Button
              variant="contained"
              size="large"
              className={cx(classes.text, classes.ctaButton)}
              component={LinkTo('/portfolio')}
            >
              <icons.ArrowLeftIcon />
              <Typography variant="button" className={classes.cta}>
                Back to Portfolio
              </Typography>
            </Button>
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
