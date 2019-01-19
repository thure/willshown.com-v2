import React from 'react'
import injectSheet from 'react-jss'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import cx from 'classnames'
import { colors } from '../style'

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
  loading: {
    animation: 'loading infinite linear 4s',
    backgroundImage: `linear-gradient(90deg, ${colors.dark} 0%, ${colors.lightA(
      0.5
    )} 25%, ${colors.dark} 50%)`,
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
    background: colors.dark,
  },
}

const PreviewAsset = ({ asset, classes, ready, setReady }) => {
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
          {sources.webm && <source src={sources.webm.src} type="video/webm" />}
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

class CategoryPreview extends React.Component {
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
        <PreviewAsset
          asset={asset}
          ready={ready}
          setReady={this.setReady}
          classes={classes}
        />
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

const LinkTo = fullRoute => props => (
  <Link {...props} to={fullRoute}>
    {props.children}
  </Link>
)

export default injectSheet(styles)(
  ({ portfolio, category, className, classes }) => (
    <Card className={cx(classes.category, className)}>
      <CardActionArea
        component={LinkTo(`/portfolio/${category.route}`)}
        className={classes.actionArea}
      >
        <CategoryPreview
          asset={portfolio.assets[category.previewAsset]}
          classes={classes}
        />
        <CardContent className={classes.content}>
          <Typography variant="h4" className={classes.title}>
            {category.title}
          </Typography>
          <Typography variant="body1">{category.caption}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
)
