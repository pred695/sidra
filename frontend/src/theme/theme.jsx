import { extendTheme } from '@chakra-ui/react'

// Custom theme with baby pink colors and sunflower accents
export const theme = extendTheme({
  colors: {
    brand: {
      50: '#fff5f7',
      100: '#ffe3eb',
      200: '#ffb3cc',
      300: '#ff99bb',
      400: '#ff80aa',
      500: '#ff6699', // Main baby pink
      600: '#e65a8a',
      700: '#cc4d7a',
      800: '#b3406b',
      900: '#99335c',
    },
    sunflower: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b', // Main sunflower yellow
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: 'linear-gradient(135deg, #fff5f7 0%, #ffe3eb 100%)',
        minHeight: '100vh',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'xl',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            transform: 'translateY(-2px)',
            shadow: 'lg',
          },
          _active: {
            bg: 'brand.700',
            transform: 'translateY(0)',
          },
          transition: 'all 0.2s',
        },
        sunflower: {
          bg: 'sunflower.500',
          color: 'white',
          _hover: {
            bg: 'sunflower.600',
            transform: 'translateY(-2px)',
            shadow: 'lg',
          },
          _active: {
            bg: 'sunflower.700',
            transform: 'translateY(0)',
          },
          transition: 'all 0.2s',
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '2xl',
          border: '1px solid rgba(255, 182, 204, 0.3)',
          shadow: 'xl',
        },
      },
    },
  },
})