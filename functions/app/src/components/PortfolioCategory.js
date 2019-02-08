import React from 'react'
import injectSheet from 'react-jss'
import LinkTo from './LinkTo'
import Asset from './Asset'
import LoadingScrim from './LoadingScrim'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import cx from 'classnames'
import { colors, preventOrphans } from '../style'

const styles = {
  category: {
    color: colors.dark,
    textDecoration: 'none',
    '&:hover $asset': {
      opacity: 0.9,
    },
  },
  title: {
    margin: '.1em 0 .5em 0',
    color: colors.red,
  },
  actionArea: {
    minHeight: '100%',
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
    transition: 'opacity .2s ease-out',
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

export default injectSheet(styles)(
  ({ portfolio, category, className, classes }) => (
    <Card className={cx(classes.category, className)}>
      <CardActionArea
        component={LinkTo(`/portfolio/${category.id}`)}
        className={classes.actionArea}
      >
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
      </CardActionArea>
    </Card>
  )
)
