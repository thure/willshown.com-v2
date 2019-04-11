const serifFamily = 'Merriweather, Georgia, serif'
const sansFamily = 'Raleway, sans-serif'

export default {
  merriweather: {
    regular: {
      fontFamily: serifFamily,
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: 1.6,
    },
    italic: {
      fontFamily: serifFamily,
      fontWeight: 400,
      fontStyle: 'italic',
      lineHeight: 1.6,
    },
    bold: {
      fontFamily: serifFamily,
      fontWeight: 700,
      fontStyle: 'normal',
      lineHeight: 1.6,
    },
    name: serifFamily,
    styles: ['400', '400i', '700'],
  },
  raleway: {
    medium: {
      fontFamily: sansFamily,
      fontWeight: 500,
      fontStyle: 'normal',
    },
    semibold: {
      fontFamily: sansFamily,
      fontWeight: 600,
      fontStyle: 'normal',
      letterSpacing: '.016em',
    },
    bold: {
      fontFamily: sansFamily,
      fontWeight: 700,
      fontStyle: 'normal',
      letterSpacing: '.018em',
    },
    black: {
      fontFamily: sansFamily,
      fontWeight: 900,
      fontStyle: 'normal',
      letterSpacing: '.02em',
    },
    name: sansFamily,
    styles: ['500', '600', '700', '900'],
  },
}
