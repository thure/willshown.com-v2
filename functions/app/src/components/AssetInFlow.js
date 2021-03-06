import React from 'react'
import Carousel from 'react-slick'
import cx from 'classnames'
import LoadingScrim from './LoadingScrim'
import { colors, icons } from '../style'

import { withStyles } from '@material-ui/core'

import Paper from '@material-ui/core/Paper'

import Asset from './Asset'

const styles = {
  assetInFlowAsset: {
    overflow: 'hidden',
  },
  assetContainer: {
    margin: '0 auto',
    '@media (max-aspect-ratio: 1/1)': {
      width: [['100%'], '!important'],
    },
  },
  assetStage: {
    background: colors.dark,
    color: 'transparent',
    position: 'relative',
  },
  assetLight: {
    background: 'transparent',
    boxShadow: 'none',
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
    opacity: 0,
  },
  assetElementReady: {
    opacity: 1,
  },
  assetElementLight: {
    transition: 'opacity .2s linear',
  },
  carousel: {
    marginBottom: '1rem',
    width: 'calc(100% + 2rem)',
    marginLeft: '-1rem',
  },
  carouselPip: {
    height: '.4rem',
    width: '1.4rem',
    borderRadius: 9999,
    background: colors.darkA(0.2),
    transition: 'background .2s linear',
    display: 'block',
    '.slick-active &, .slick-active &:hover': {
      background: colors.red,
    },
    '&:hover': {
      background: colors.dark,
    },
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
  ({ currentSlide, slideCount, Icon, className, classes, style, ...props }) => (
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
const CarouselPip = withStyles(styles)(({ classes, ...props }) => (
  <i className={classes.carouselPip} {...props} />
))

const carouselConfig = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <CarouselArrowNext />,
  prevArrow: <CarouselArrowPrev />,
  cssEase: 'cubic-bezier(0.77, 0, 0.175, 1)',
  customPaging: slideIndex => <CarouselPip />,
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
    const {
      className,
      classes,
      asset,
      forceFullWidth,
      noMotion,
      layout,
      light,
      maxWidth,
      maxHeight,
      ...props
    } = this.props
    const { ready } = this.state

    const aspect = asset.dims[0] / asset.dims[1]
    const width =
      layout === 'TextWidth' || forceFullWidth || aspect > 1.1
        ? 100
        : 80 * aspect

    return (
      <div
        className={classes.assetContainer}
        style={{
          width: `${width.toFixed(7)}%`,
          maxWidth: width < 100 ? `${asset.dims[0]}px` : maxWidth || 'none',
          maxHeight: maxHeight || 'none',
        }}
      >
        <Paper
          elevation={1}
          className={cx(
            className,
            classes.assetInFlowAsset,
            light && classes.assetLight
          )}
        >
          <div
            className={cx(classes.assetStage, light && classes.assetLight)}
            style={{
              paddingBottom: `${(100 / aspect).toFixed(7)}%`,
            }}
          >
            <Asset
              {...props}
              asset={asset}
              setReady={this.setReady}
              className={cx(
                classes.assetElement,
                ready && classes.assetElementReady,
                light && !noMotion && classes.assetElementLight
              )}
            />
            <LoadingScrim
              className={classes.fill}
              ready={ready}
              light={light}
              noMotion={noMotion}
            />
          </div>
        </Paper>
      </div>
    )
  }
}

// Composed component

const AssetInFlow = props =>
  props.asset.type === 'carousel' ? (
    <Carousel {...carouselConfig} className={props.classes.carousel}>
      {props.asset.slides.map(assetId => {
        const asset = props.assets[assetId]
        return (
          <div
            className={props.classes.carouselSlide}
            key={`carouselSlide_${assetId}`}
          >
            <AssetInFlowAsset {...props} asset={asset} />
          </div>
        )
      })}
    </Carousel>
  ) : (
    <AssetInFlowAsset {...props} />
  )

export default withStyles(styles)(AssetInFlow)
