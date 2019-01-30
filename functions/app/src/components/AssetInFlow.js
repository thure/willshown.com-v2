import React from 'react'
import Carousel from 'react-slick'
import cx from 'classnames'
import LoadingScrim from './LoadingScrim'
import { colors, icons } from '../style'

import { withStyles } from '@material-ui/core'

import Paper from '@material-ui/core/Paper'

import Asset from './Asset'

const styles = {
  assetContainer: {
    background: colors.dark,
    color: 'transparent',
    position: 'relative',
  },
  fill: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  assetElement: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'block',
    width: '100%',
    height: 'auto',
  },
  carouselSlide: {
    padding: '0 1rem',
    boxSizing: 'border-box',
  },
  carouselArrow: {
    '&:before': {
      content: '""',
      display: 'none',
    },
    height: '100%',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    padding: '0 .5rem',
    color: colors.dark,
    transition: 'color .2s linear',
    '&:hover': {
      color: colors.red,
    },
  },
  carouselArrowIcon: {
    display: 'block',
    flex: '0 0 auto',
    marginLeft: '-2px',
  },
}

// Carousel configuration

const CarouselArrow = withStyles(styles)(
  ({ Icon, className, classes, style, ...props }) => (
    <div
      className={cx(classes.carouselArrow, className)}
      style={{
        ...style,
        display: style.display === 'block' ? 'flex' : style.display,
      }}
      {...props}
    >
      <Icon className={classes.carouselArrowIcon} />
    </div>
  )
)

const CarouselArrowNext = props => (
  <CarouselArrow Icon={icons.ChevronRight} {...props} />
)
const CarouselArrowPrev = props => (
  <CarouselArrow Icon={icons.ChevronLeft} {...props} />
)

const carouselConfig = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <CarouselArrowNext />,
  prevArrow: <CarouselArrowPrev />,
  cssEase: 'cubic-bezier(0.77, 0, 0.175, 1)',
}

// Individual asset component

class AssetInFlowAsset extends React.Component {
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
    const { className, classes, asset, ...props } = this.props
    const { ready } = this.state

    return (
      <Paper elevation={1} className={className}>
        <div
          className={classes.assetContainer}
          style={{
            paddingBottom: `${((100 * asset.dims[1]) / asset.dims[0]).toFixed(
              7
            )}%`,
          }}
        >
          <Asset
            {...props}
            asset={asset}
            setReady={this.setReady}
            className={classes.assetElement}
          />
          <LoadingScrim className={classes.fill} ready={ready} />
        </div>
      </Paper>
    )
  }
}

// Composed component

const AssetInFlow = props =>
  props.asset.type === 'carousel' ? (
    <Carousel {...carouselConfig}>
      {props.asset.slides.map(assetId => {
        return (
          <div
            className={props.classes.carouselSlide}
            key={`carouselSlide_${assetId}`}
          >
            <AssetInFlowAsset {...props} asset={props.assets[assetId]} />
          </div>
        )
      })}
    </Carousel>
  ) : (
    <AssetInFlowAsset {...props} />
  )

export default withStyles(styles)(AssetInFlow)
