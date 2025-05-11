import { createTheme } from '@mantine/core'

export const theme = createTheme({
  fontFamily: "'Inter Variable', sans-serif",
  headings: {
    fontFamily: "'Inter Variable', sans-serif",
    sizes: {
      h1: {
        fontSize: '1.5rem', // 24px
      },
      h2: {
        fontSize: '1.375rem', // 22px
      },
      h3: {
        fontSize: '1.25rem', // 20px
      },
      h4: {
        fontSize: '1.125rem', // 18px
      },
      h5: {
        fontSize: '1rem', // 16px
      },
      h6: {
        fontSize: '0.875rem', // 14px
      },
    },
  },
  primaryColor: 'teal',
  colors: {
    teal: ['#e8fcfa', '#d9f5f2', '#b4eae4', '#8bded5', '#6bd4c9', '#56cec1', '#49cbbd', '#38b3a6', '#299d91', '#088b7f'],
  },
  lineHeights: {
    xs: '1.33',
    sm: '1.42',
    md: '1.5',
    lg: '1.33',
    xl: '1.4',
  },
})
