import React from 'react'
import injectSheet from 'react-jss'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import cx from 'classnames'
import { colors } from '../style'

const styles = {
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
    transition: 'opacity 1s ease-out',
    mixBlendMode: 'multiply',
  },
  assetReady: {
    opacity: 0.82,
  },
  loading: {
    animation: 'loading infinite linear 4s',
    backgroundImage: `linear-gradient(90deg, ${colors.red} 0%, ${colors.lightA(
      0.5
    )} 25%, ${colors.red} 50%)`,
    backgroundSize: '1400px',
    opacity: 1,
    zIndex: 2,
    transition: 'opacity .5s linear',
  },
  loadingReady: {
    opacity: 0,
  },
  assetStage: {
    width: '100%',
    paddingBottom: `${(900 / 16).toFixed(3)}%`,
    position: 'relative',
    overflow: 'hidden',
    background: colors.red,
  },
}

const PreviewAsset = injectSheet(styles)(
  ({ asset, classes, ready, setReady }) => {
    switch (asset.type) {
      case 'video':
        let { sources } = asset
        return (
          <video
            width={asset.dims[0]}
            height={asset.dims[1]}
            className={cx(
              classes.fill,
              classes.asset,
              ready && classes.assetReady
            )}
            poster={sources.png ? sources.png.src : sources.jpeg.src}
            playsInline
            autoPlay
            muted
            loop
            onCanPlayThrough={() => {
              setReady(true)
            }}
          >
            {sources.mp4 && <source src={sources.mp4.src} type="video/mp4" />}
            {sources.ogv && <source src={sources.ogv.src} type="video/ogv" />}
            {sources.webm && (
              <source src={sources.webm.src} type="video/webm" />
            )}
          </video>
        )
      case 'image':
        return (
          <img
            width={asset.dims[0]}
            height={asset.dims[1]}
            className={cx(
              classes.fill,
              classes.asset,
              ready && classes.assetReady
            )}
            alt={asset.alt}
            src={asset.src}
            onLoad={() => {
              setReady(true)
            }}
          />
        )
      default:
        return null
    }
  }
)

class CategoryPreviewWithoutStyles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false,
    }
    this.setReady = this._setReady.bind(this)
  }

  _setReady(ready) {
    this.setState({ ready })
  }

  render() {
    const { asset, classes } = this.props
    const { ready } = this.state
    return (
      <div className={classes.assetStage}>
        <PreviewAsset asset={asset} ready={ready} setReady={this.setReady} />
        <div
          className={cx(
            classes.fill,
            classes.loading,
            ready && classes.loadingReady
          )}
        />
      </div>
    )
  }
}

const CategoryPreview = injectSheet(styles)(CategoryPreviewWithoutStyles)

export default ({ portfolio, category, className }) => {
  return (
    <Card className={className}>
      <CardActionArea>
        <CategoryPreview asset={portfolio.assets[category.previewAsset]} />
        <CardContent>{category.title}</CardContent>
      </CardActionArea>
    </Card>
  )
}
