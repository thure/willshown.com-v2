import React from 'react'

const markPath =
  'M69.78418,21.337,54.75455,36.539l.52646.92591a1.86305,1.86305,0,0,1,.928-.2662q2.58333,0,2.57885,5.35537V59.154a4.02794,4.02794,0,0,1-1.89767,3.16622,2.70322,2.70322,0,0,1-1.43958.47742c-1.63892,0-2.47179-1.84558-2.47179-5.53385V42.98309a12.19512,12.19512,0,0,0-1.01424-5.5346,11.4895,11.4895,0,0,0-4.01614-3.96483l-6.28783,6.424.6186.81871a2.14083,2.14083,0,0,1,.75261-.203,2.37981,2.37981,0,0,1,2.4628,1.98309,14.10647,14.10647,0,0,1,.2825,3.483V59.456a3.56745,3.56745,0,0,1-1.64487,2.86424,2.71054,2.71054,0,0,1-1.43958.47742c-1.63877,0-2.47468-1.84558-2.47468-5.53385V42.98309a12.20119,12.20119,0,0,0-1.0112-5.5346,11.51349,11.51349,0,0,0-4.01553-3.96483l-6.29072,6.424.6186.81871a2.13774,2.13774,0,0,1,.7555-.203,2.38485,2.38485,0,0,1,2.46585,1.98309,14.30228,14.30228,0,0,1,.2796,3.483V59.72505c0,2.86743.28843,4.82753.88038,5.873.72565,1.46044,2.35574,2.55342,4.90763,3.28227l7.07318-6.68058a8.82829,8.82829,0,0,0,.77621,3.39831q1.08872,2.19066,4.91145,3.28227L58.78791,62.057V67.3588c0,4.66976-1.68355,8.88159-4.36946,10.37767l.5324.92652a23.47961,23.47961,0,0,0,8.10524-6.08254c1.85014-2.42275,2.68-5.62019,2.68-9.58654V43.42854c0-13.81086.63352-16.27428.63352-16.27428L71.03035,31.253l4.50925-4.82449Z'

const MarkIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="100"
    height="100"
  >
    <defs>
      <clipPath id="mark_clip">
        <path d={markPath} />
      </clipPath>
    </defs>
    <g clipPath="url(#mark_clip)">
      <path
        className="markPath"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        d={markPath}
      />
    </g>
  </svg>
)

const PackageIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z" />
    <polyline points="2.32 6.16 12 11 21.68 6.16" />
    <line x1="12" y1="22.76" x2="12" y2="11" />
    <line x1="7" y1="3.5" x2="17" y2="8.5" />
  </svg>
)

const LayersIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
)

const MenuIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

export { PackageIcon, LayersIcon, MenuIcon, MarkIcon }
