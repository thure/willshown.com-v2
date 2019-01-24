import React from 'react'

const Asset = ({ asset, className, setReady }) => {
  const { sources, dims } = asset
  switch (asset.type) {
    case 'video':
      return (
        <video
          width={dims[0]}
          height={dims[1]}
          className={className}
          poster={sources.png ? sources.png.src : sources.jpeg.src}
          playsInline
          autoPlay
          muted
          loop
          onCanPlayThrough={setReady}
        >
          {sources.mp4 && <source src={sources.mp4.src} type="video/mp4" />}
          {sources.ogv && <source src={sources.ogv.src} type="video/ogv" />}
          {sources.webm && <source src={sources.webm.src} type="video/webm" />}
        </video>
      )
    case 'image':
      return (
        <img
          width={dims[0]}
          height={dims[1]}
          className={className}
          alt={asset.alt}
          src={sources.png ? sources.png.src : sources.jpeg.src}
          onLoad={setReady}
        />
      )
    default:
      return null
  }
}

export default Asset
