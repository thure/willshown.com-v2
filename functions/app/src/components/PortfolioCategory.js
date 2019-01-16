import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'

import { withStyles } from '@material-ui/core/styles'

const styles = {
  asset: {
    objectFit: 'cover',
    position: 'absolute',
    top: '-.5rem',
    left: '-.5rem',
    width: 'calc(100% + 1rem)',
    height: 'calc(100% + 1rem)',
    filter: 'blur(.5rem)',
  },
  assetStage: {
    width: '100%',
    paddingBottom: `${100 * (9 / 16).toFixed(3)}%`,
    position: 'relative',
    overflow: 'hidden',
  },
}

const PreviewAsset = withStyles(styles)(({ asset, classes }) => {
  switch (asset.type) {
    case 'video':
      let { sources } = asset
      return (
        <video
          width={asset.dims[0]}
          height={asset.dims[1]}
          className={classes.asset}
          poster={sources.png ? sources.png.src : sources.jpeg.src}
          autoPlay
          loop
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
          className={classes.asset}
          alt={asset.alt}
          src={asset.src}
        />
      )
    default:
      return null
  }
})

const CategoryPreview = withStyles(styles)(({ asset, classes }) => (
  <div className={classes.assetStage}>
    <PreviewAsset asset={asset} />
  </div>
))

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
