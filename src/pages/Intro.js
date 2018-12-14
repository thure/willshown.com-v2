import React from 'react'
import injectSheet from 'react-jss'
import colors from '../style/colors'

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
    borderRadius: '4px',
    background: 'transparent',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  },
  svg: {
    display: 'block',
    width: '100%',
  }
}

const Intro = ({classes}) => <div className={classes.introCanvas}>
  <div className={classes.svgCanvas}>
  <svg viewBox="0 0 100 100" className={classes.svg}>
    <rect x="0" y="0" width="100" height="100" fill={colors.red} rx="2" ry="2" />
    <g transform="translate(-0.7, 1)"><path xmlns="http://www.w3.org/2000/svg" d="M69.78418,21.337,54.75455,36.539l.52646.92591a1.86305,1.86305,0,0,1,.928-.2662q2.58333,0,2.57885,5.35537V59.154a4.02794,4.02794,0,0,1-1.89767,3.16622,2.70322,2.70322,0,0,1-1.43958.47742c-1.63892,0-2.47179-1.84558-2.47179-5.53385V42.98309a12.19512,12.19512,0,0,0-1.01424-5.5346,11.4895,11.4895,0,0,0-4.01614-3.96483l-6.28783,6.424.6186.81871a2.14083,2.14083,0,0,1,.75261-.203,2.37981,2.37981,0,0,1,2.4628,1.98309,14.10647,14.10647,0,0,1,.2825,3.483V59.456a3.56745,3.56745,0,0,1-1.64487,2.86424,2.71054,2.71054,0,0,1-1.43958.47742c-1.63877,0-2.47468-1.84558-2.47468-5.53385V42.98309a12.20119,12.20119,0,0,0-1.0112-5.5346,11.51349,11.51349,0,0,0-4.01553-3.96483l-6.29072,6.424.6186.81871a2.13774,2.13774,0,0,1,.7555-.203,2.38485,2.38485,0,0,1,2.46585,1.98309,14.30228,14.30228,0,0,1,.2796,3.483V59.72505c0,2.86743.28843,4.82753.88038,5.873.72565,1.46044,2.35574,2.55342,4.90763,3.28227l7.07318-6.68058a8.82829,8.82829,0,0,0,.77621,3.39831q1.08872,2.19066,4.91145,3.28227L58.78791,62.057V67.3588c0,4.66976-1.68355,8.88159-4.36946,10.37767l.5324.92652a23.47961,23.47961,0,0,0,8.10524-6.08254c1.85014-2.42275,2.68-5.62019,2.68-9.58654V43.42854c0-13.81086.63352-16.27428.63352-16.27428L71.03035,31.253l4.50925-4.82449Z" fill="white"/></g>
  </svg>
  </div>
</div>

export default injectSheet(styles)(Intro);
