import React from 'react'
import injectSheet from 'react-jss'
import anime from 'animejs'
import { colors, shadows } from '../style'

const styles = {
  introCanvas: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  svgCanvas: {
    display: 'block',
    margin: '0 auto',
    width: '12rem',
    height: '12rem',
    borderRadius: '6rem',
    background: colors.light,
    boxShadow: shadows.zero,
  },
  svg: {
    display: 'block',
    width: '100%',
  },
  transformOriginCenter: {
    transformOrigin: 'center',
  },
}

class Intro extends React.Component {
  constructor(props) {
    super(props)
    this.animationRoot = React.createRef()
  }

  playIntroAnimation() {
    const $animRoot = this.animationRoot.current
    const $boxes = $animRoot.querySelectorAll('.box')
    const $roundedRects = $animRoot.querySelectorAll('.roundedRect')
    const $markPaths = $animRoot.querySelectorAll('.mark')

    anime
      .timeline()
      .add({
        targets: $animRoot,
        duration: 2000,
        easing: 'easeInOutQuart',
        translateY: ['0px', `-${38 - 19}px`],
        update: function(anim) {
          const p = anime.easings.easeInOutQuart(anim.currentTime / 2000)
          $animRoot.style.setProperty(
            'box-shadow',
            `0 ${p * 19}px ${p * 38}px rgba(0,0,0,${p * 0.3}), 0 ${p *
              15}px ${p * 12}px rgba(0,0,0,${p * 0.22})`
          )
        },
      })
      .add({
        targets: $animRoot,
        duration: 400,
        easing: 'easeInOutExpo',
        translateY: '0px',
        update: function(anim) {
          if (anim.currentTime > anim.offset) {
            const p = anime.easings.easeInOutExpo(
              (anim.currentTime - anim.offset) / (anim.duration - anim.offset)
            )
            $animRoot.style.setProperty(
              'box-shadow',
              `0 ${19 - p * (19 - 3)}px ${38 -
                p * (38 - 6)}px rgba(0,0,0,${0.3 - p * (0.3 - 0.16)}), 0 ${15 -
                p * (15 - 3)}px ${12 - p * (12 - 6)}px rgba(0,0,0,${0.22 -
                p * (0.22 - 0.23)})`
            )
          }
        },
      })

    anime({
      targets: $roundedRects,
      duration: 400,
      delay: 2000,
      easing: 'easeInOutExpo',
      rx: 2,
      ry: 2,
    })

    anime({
      targets: $animRoot,
      duration: 400,
      delay: 2000,
      easing: 'easeInOutExpo',
      borderRadius: ['6rem', '.25rem'],
    })

    anime
      .timeline()
      .add({
        targets: $boxes,
        strokeDashoffset: {
          value: [anime.setDashoffset, 0],
          easing: 'easeInOutQuart',
          duration: 2000,
        },
        strokeWidth: {
          value: [0, 2],
          easing: 'easeInOutQuart',
          duration: 500,
        },
        rotate: {
          value: ['-0.5turn', '0.5turn'],
          easing: 'easeInOutQuad',
          duration: 2000,
        },
      })
      .add({
        targets: $boxes,
        duration: 400,
        easing: 'easeInOutQuint',
        strokeWidth: 100,
      })

    anime
      .timeline()
      .add({
        targets: $markPaths,
        duration: 2000,
        strokeDasharray: {
          value: [
            () => `0 ${anime.setDashoffset($markPaths[0]) / 5}`,
            () => `${anime.setDashoffset($markPaths[0]) / 5}, 0`,
          ],
          easing: 'easeInOutExpo',
        },
        strokeWidth: {
          value: [0, 2],
          easing: 'easeInOutQuart',
          duration: 500,
        },
        strokeDashoffset: {
          value: [0, () => anime.setDashoffset($markPaths[0]) / -8],
          easing: 'easeInOutQuad',
        },
      })
      .add({
        targets: $markPaths,
        strokeWidth: {
          duration: 400,
          value: 9,
          easing: 'easeInOutQuint',
        },
      })
  }

  componentDidMount() {
    this.playIntroAnimation()
  }

  render() {
    const { classes } = this.props

    const markPathD =
      'M69.78418,21.337,54.75455,36.539l.52646.92591a1.86305,1.86305,0,0,1,.928-.2662q2.58333,0,2.57885,5.35537V59.154a4.02794,4.02794,0,0,1-1.89767,3.16622,2.70322,2.70322,0,0,1-1.43958.47742c-1.63892,0-2.47179-1.84558-2.47179-5.53385V42.98309a12.19512,12.19512,0,0,0-1.01424-5.5346,11.4895,11.4895,0,0,0-4.01614-3.96483l-6.28783,6.424.6186.81871a2.14083,2.14083,0,0,1,.75261-.203,2.37981,2.37981,0,0,1,2.4628,1.98309,14.10647,14.10647,0,0,1,.2825,3.483V59.456a3.56745,3.56745,0,0,1-1.64487,2.86424,2.71054,2.71054,0,0,1-1.43958.47742c-1.63877,0-2.47468-1.84558-2.47468-5.53385V42.98309a12.20119,12.20119,0,0,0-1.0112-5.5346,11.51349,11.51349,0,0,0-4.01553-3.96483l-6.29072,6.424.6186.81871a2.13774,2.13774,0,0,1,.7555-.203,2.38485,2.38485,0,0,1,2.46585,1.98309,14.30228,14.30228,0,0,1,.2796,3.483V59.72505c0,2.86743.28843,4.82753.88038,5.873.72565,1.46044,2.35574,2.55342,4.90763,3.28227l7.07318-6.68058a8.82829,8.82829,0,0,0,.77621,3.39831q1.08872,2.19066,4.91145,3.28227L58.78791,62.057V67.3588c0,4.66976-1.68355,8.88159-4.36946,10.37767l.5324.92652a23.47961,23.47961,0,0,0,8.10524-6.08254c1.85014-2.42275,2.68-5.62019,2.68-9.58654V43.42854c0-13.81086.63352-16.27428.63352-16.27428L71.03035,31.253l4.50925-4.82449Z'

    return (
      <div className={classes.introCanvas}>
        <div className={classes.svgCanvas} ref={this.animationRoot}>
          <svg viewBox="0 0 100 100" className={classes.svg}>
            <defs>
              <clipPath id="boxClip">
                <rect
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  rx="50"
                  ry="50"
                  className="roundedRect"
                />
              </clipPath>
              <clipPath id="markClip">
                <path d={markPathD} />
              </clipPath>
              <mask id="redBoxMask">
                <rect
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  fill="none"
                  stroke="white"
                  strokeLinecap="round"
                  rx="50"
                  ry="50"
                  className={`box ${classes.transformOriginCenter}`}
                />
              </mask>
            </defs>
            <g transform="translate(-1.2, 1)" clipPath="url(#markClip)">
              <path
                className="mark"
                stroke={colors.red}
                strokeWidth="0"
                fill="none"
                strokeLinecap="round"
                d={markPathD}
              />
            </g>
            <rect
              x="0"
              y="0"
              width="100"
              height="100"
              fill="none"
              stroke={colors.red}
              strokeLinecap="round"
              rx="50"
              ry="50"
              className={`box ${classes.transformOriginCenter}`}
              clipPath="url(#boxClip)"
            />
            <g
              transform="translate(-1.2, 1)"
              clipPath="url(#markClip)"
              mask="url(#redBoxMask)"
            >
              <path
                className="mark"
                stroke="white"
                strokeWidth="0"
                fill="none"
                strokeLinecap="round"
                d={markPathD}
              />
            </g>
          </svg>
        </div>
      </div>
    )
  }
}

export default injectSheet(styles)(Intro)
