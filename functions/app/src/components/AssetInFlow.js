import React from 'react'
import cx from 'classnames'
import LoadingScrim from './LoadingScrim'
import { colors } from '../style'

import { withStyles } from '@material-ui/core'

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
}

class AssetInFlow extends React.Component {
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
      <div
        className={cx(className, classes.assetContainer)}
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
    )
  }
}

export default withStyles(styles)(AssetInFlow)
