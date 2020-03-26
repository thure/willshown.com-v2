const serifFamily = "'Noto Serif', serif"
const sansFamily = 'urw-din, sans-serif'

export default {
  serif: {
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
  sans: {
    medium: {
      fontFamily: sansFamily,
      fontWeight: 400,
      fontStyle: 'normal',
    },
    semibold: {
      fontFamily: sansFamily,
      fontWeight: 500,
      fontStyle: 'normal',
    },
    bold: {
      fontFamily: sansFamily,
      fontWeight: 600,
      fontStyle: 'normal',
    },
    black: {
      fontFamily: sansFamily,
      fontWeight: 700,
      fontStyle: 'normal',
    },
    name: sansFamily,
    styles: ['400', '500', '600', '700'],
  },
}
