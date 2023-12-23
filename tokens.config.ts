import { defineTheme } from 'pinceau'

export default defineTheme({
  typography: {},
  prose: {
    h1: {
      fontSize: '{typography.fontSize.4xl}',
    },
    h2: {
      fontSize: '{typography.fontSize.3xl}',
    },
    h3: {
      fontSize: '{typography.fontSize.2xl}',
    },
    h4: {
      fontSize: '{typography.fontSize.xl}',
    },
    h5: {
      fontSize: '{typography.fontSize.lg}',
    },
    img: {
      borderRadius: '{typography.radii.none}',
    },
  },
})
