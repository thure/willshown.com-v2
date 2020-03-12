import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import cx from 'classnames'
import get from 'lodash/get'

import Page from '../components/Page'
import AssetInFlow from '../components/AssetInFlow'
import LinkTo from '../components/LinkTo'
import RoutedMarkdown from '../components/RoutedMarkdown'
import NotFound from './NotFound'

import { resolveItem } from '../modules/portfolio'

import { colors, icons, preventOrphans, shadows } from '../style'

import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

const styles = ({ breakpoints }) => ({
  item: {},
  assetContainer: {
    margin: '2rem 0',
  },
  firstAssetContainer: {
    marginTop: 0,
  },
  heroAsset: {
    marginBottom: '.5rem',
  },
  heroAssetPotato: {
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
    margin: '2rem auto',
  },
  blockquote: {
    padding: '0 2rem',
    boxSizing: 'border-box',
    marginBottom: 0,
    fontStyle: 'italic',
  },
  cite: {
    marginTop: 0,
    textAlign: 'right',
  },
  caption: {
    marginTop: '0.5rem',
  },
  ctaButton: {
    color: colors.dark,
    background: 'white',
    textShadow: 'none',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginTop: '4rem',
    //
    boxShadow: [[shadows.A], '!important'],
    transition: 'box-shadow 100ms linear',
    cursor: 'pointer',
    pointerEvents: 'auto',
    '&:hover, &:focus, &:active': {
      background: 'white',
      boxShadow: [[shadows.B], '!important'],
    },
  },
  cta: {
    marginLeft: '1em',
  },
  break: {
    border: 'none',
    borderBottom: `1px solid ${colors.darkA(0.2)}`,
    margin: '2rem auto',
    [breakpoints.up('sm')]: {
      margin: '3rem auto',
    },
    padding: '0',
    width: '50%',
  },
  deckNoticeCopy: {
    color: 'white',
    display: 'block',
    flex: '1 1 auto',
  },
  deckNoticeContent: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    '&:last-child': {
      padding: '1rem',
    },
  },
  deckNotice: {
    background: colors.red,
    marginBottom: '2rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '36rem',
  },
  deckNoticeButton: {
    textDecoration: 'none',
    textShadow: 'none',
    backgroundImage: 'none',
    textAlign: 'center',
  },
})

const DeckNotice = ({ deck, classes }) => (
  <Card className={classes.deckNotice}>
    <CardContent className={classes.deckNoticeContent}>
      <Typography className={classes.deckNoticeCopy} variant="h2">
        A case-study deck for this project is available.
      </Typography>
      <Button
        component={LinkTo(`/deck/${deck}`)}
        className={classes.deckNoticeButton}
      >
        <Typography variant="button" className={classes.deckNoticeCopy}>
          Open
        </Typography>
      </Button>
    </CardContent>
  </Card>
)

const PortfolioItemContent = ({ portfolio, content, classes }) => {
  return content
    ? content.map((particle, pIndex) => {
        const key = `particle_${particle.type}_${pIndex}`
        switch (particle.type) {
          case 'asset':
            return (
              <div
                className={cx(
                  classes.assetContainer,
                  pIndex === 0 && classes.firstAssetContainer
                )}
                key={key}
              >
                <AssetInFlow
                  className={cx(
                    classes.heroAsset,
                    classes[`assetLayout${particle.layout}`]
                  )}
                  layout={particle.layout}
                  asset={portfolio.assets[particle.asset]}
                  assets={portfolio.assets}
                />
                {particle.assetCaption && (
                  <Typography
                    variant="caption"
                    className={cx(classes.text, classes.caption)}
                    paragraph
                  >
                    {preventOrphans(particle.assetCaption)}
                  </Typography>
                )}
              </div>
            )
          case 'title':
            return (
              <Typography
                variant="h1"
                key={key}
                className={cx(classes.heroHeadline, classes.text)}
                paragraph
              >
                {preventOrphans(particle.text)}
              </Typography>
            )
          case 'subtitle':
            return (
              <Typography
                variant="h3"
                key={key}
                className={classes.text}
                paragraph
              >
                {preventOrphans(particle.text)}
              </Typography>
            )
          case 'text':
            return (
              <Typography
                variant="body1"
                key={key}
                className={classes.text}
                component="div"
                paragraph
              >
                <RoutedMarkdown withHTML source={particle.text} />
              </Typography>
            )
          case 'blockquote':
            return (
              <React.Fragment key={key}>
                <Typography
                  variant="body1"
                  className={cx(classes.text, classes.blockquote)}
                  component="blockquote"
                >
                  <RoutedMarkdown withHTML source={particle.text} />
                </Typography>
                <Typography
                  variant="body2"
                  className={cx(classes.text, classes.cite)}
                  component="cite"
                  paragraph
                >
                  ※ {particle.byline}
                </Typography>
              </React.Fragment>
            )
          case 'break':
            return <hr key={key} className={classes.break} />
          default:
            return null
        }
      })
    : null
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
          description={`A case study of ${item.title}`}
        >
          <main className={classes.item}>
            <PortfolioItemContent
              portfolio={portfolio}
              content={item.content}
              classes={classes}
            />
            {item.deck && <DeckNotice deck={item.deck} classes={classes} />}
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
    else return <NotFound />
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
