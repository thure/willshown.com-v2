import React from 'react'
import { Link } from 'react-router-dom'
import Asset from './Asset'
import LoadingScrim from './LoadingScrim'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import cx from 'classnames'
import { colors, preventOrphans, shadows, borderRadii } from '../style'
import { withStyles } from '@material-ui/core'

const styles = {
  link: {
    borderRadius: borderRadii.A,
    boxShadow: [[shadows.A], '!important'],
    transition: 'box-shadow 100ms linear',
    cursor: 'pointer',
    pointerEvents: 'auto',
    '&:hover $asset, &:focus $asset': {
      opacity: 0.9,
      filter: 'grayscale(40%)',
    },
    '&:hover, &:focus, &:active': {
      boxShadow: [[shadows.B], '!important'],
    },
  },
  category: {
    color: colors.dark,
    textDecoration: 'none',
    minHeight: '100%',
    textShadow: 'none',
    boxShadow: ['none', '!important'],
  },
  title: {
    margin: '.1em 0 .5em 0',
    color: colors.red,
  },
  content: {
    padding: '1.2rem 1.6rem 1.4rem 1.6rem',
  },
  fill: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  asset: {
    objectFit: 'cover',
    opacity: 0,
    transition: 'opacity .2s ease-out, filter .2s linear',
    filter: 'grayscale(100%)',
  },
  assetReady: {
    opacity: 0.5,
  },
  assetStage: {
    width: '100%',
    paddingBottom: `${(900 / 16).toFixed(3)}%`,
    position: 'relative',
    overflow: 'hidden',
    background: colors.dark,
  },
  deckTag: {
    background: colors.red,
    position: 'absolute',
    top: '1rem',
    right: '-1.5rem',
    transform: 'rotate(45deg)',
    zIndex: 2,
    padding: '.2rem 2rem',
  },
  deckTagLabel: {
    color: 'white',
  },
}

class CategoryPreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false,
    }
    this.setReady = this._setReady.bind(this)
  }

  _setReady() {
    this.setState({ ready: true })
  }

  render() {
    const { asset, classes } = this.props
    const { ready } = this.state
    return (
      <div className={classes.assetStage}>
        <Asset
          asset={asset}
          ready={ready}
          setReady={this.setReady}
          imgOnly
          className={cx(
            classes.fill,
            classes.asset,
            ready && classes.assetReady
          )}
        />
        <LoadingScrim ready={ready} className={classes.fill} />
      </div>
    )
  }
}

const DeckTag = withStyles(styles)(({ classes }) => (
  <div className={classes.deckTag}>
    <Typography variant="button" className={classes.deckTagLabel}>
      Deck
    </Typography>
  </div>
))

export default withStyles(styles)(
  ({ portfolio, category, className, classes }) => (
    <Link
      to={`/portfolio/${category.id}`}
      className={cx(classes.link, className)}
    >
      <Card className={cx(classes.category)}>
        {category.hasOwnProperty('deck') && <DeckTag />}
        <CategoryPreview
          asset={portfolio.assets[category.previewAsset]}
          classes={classes}
        />
        <CardContent className={classes.content}>
          <Typography variant="h4" className={classes.title}>
            {preventOrphans(category.title)}
          </Typography>
          <Typography variant="body1">
            {preventOrphans(category.caption)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
)
