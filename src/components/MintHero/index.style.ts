import styled from '@emotion/styled'
import { rgba } from 'emotion-rgba'

export const MintHeroStyle = styled('section')(({ theme }: any) => {
  return {
    display: 'grid',
    placeItems: 'center',
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    color: theme.primary,
    backgroundColor: '#3c2edd',
    backgroundImage: 'linear-gradient(200deg, #f8b523 41%, #347fe3)',
    paddingBottom: '3.5rem',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '80vh',
    zIndex: 1,

    '.mint-hero-bg': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100vw',
      opacity: 1,
      backgroundColor: 'transparent',
      backgroundImage: 'url(/mint-hero.png)',
      backgroundPosition: '0 0',
      backgroundSize: 'cover',
      zIndex: 0
    },

    '.mint-hero-noise': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 0.05,
      mixBlendMode: 'overlay',
      backgroundColor: 'transparent',
      backgroundImage: 'url(/noise-light.webp)',
      backgroundPosition: '0 0',
      backgroundSize: '10.5rem',
      zIndex: 0
    },

    '.mint-hero-header': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      position: 'relative',
      width: '100%',
      height: '5.45rem',
      opacity: 0.05,
      backgroundImage: `linear-gradient(${rgba('#e9b345', 0.8)}, ${rgba('#347fe3', 0)})`,
      paddingTop: '1.5rem',
      zIndex: 1
    },

    '.mint-hero-contents-container': {
      display: 'grid',
      gridTemplateColumns: 'auto 36%',
      position: 'relative',
      flexDirection: 'column',
      alignSelf: 'flex-end',
      alignItems: 'flex-start',
      maxWidth: '1440px',
      width: '100%',
      minHeight: '6.25rem',
      gridColumnGap: '1.5rem',
      gridRowGap: '1.5rem',
      zIndex: 1,
      padding: '0 0.75rem',

      [theme.breakpoints.up('md')]: {
        padding: '2rem 4rem'
      },

      '.mint-hero-title': {
        fontSize: '2.125rem',
        fontWeight: 700,
        lineHeight: '1.375',
        color: theme.primary
      },

      '.mint-hero-subtext': {
        fontSize: '1.75rem',
        fontWeight: 700,
        lineHeight: '1.75',
        color: theme.primary
      },

      '.mint-hero-account': {
        marginTop: '1.875rem'
      },

      '.mint-hero-info': {
        marginTop: '1.875rem'
      },

      '.mint-hero-intro-text': {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: '1.75rem',
        marginBottom: '0.625rem'
      },

      '.mint-hero-text': {
        fontSize: '1.125rem',
        fontWeight: 500,
        lineHeight: '1.625rem'
      },

      '.mint-section': {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderRadius: '1rem',
        padding: '1.25rem',
        marginTop: '1.875rem',
        backgroundColor: 'rgba(255, 255, 255, .4)',
        boxShadow:
          'inset 0 0 1px rgba(255, 255, 255, .54), inset 0 1px 1px rgba(214, 211, 255, .56), 0 10px 10px -8px rgba(21, 20, 46, .25)',
        // backgroundImage: 'linear-gradient(rgba(21, 20, 46, .34), rgba(21, 20, 46, .11))',
        // boxShadow: '0 1px 1px rgba(255, 255, 255, .15), inset 0 2px 4px rgba(21, 20, 46, .23)',

        '.mint-box': {
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '0.75rem',

          p: {
            marginBottom: 0
          }
        },

        '.mint-btn': {
          borderRadius: '0.375rem',
          padding: '0.25rem 0.5rem',
          height: '2.5rem',
          width: '100%',
          fontSize: '0.1rem',
          fontWeight: 500,
          textTransform: 'initial',
          overflow: 'hidden',
          margin: '1rem auto 0.25rem',
          backgroundColor: theme.primary,
          color: theme.contrast,
          transition: 'all 0.15s ease-in-out 0s',
          transformOrigin: 'center center',

          [theme.breakpoints.up('md')]: {
            padding: '0.75rem 0.875rem',
            fontSize: '1.125rem'
          },

          '&:hover': {
            borderColor: rgba(theme.primary, 0.2)
          },

          '&:active': {
            transform: 'scale(0.95)'
          }
        }
      }
    }
  }
})
