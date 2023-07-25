import styled from '@emotion/styled'
import { rgba } from 'emotion-rgba'

export const CountdownHeroStyle = styled('section')(({ theme }: any) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#fff',
    backgroundColor: '#3c2edd',
    backgroundImage: 'linear-gradient(200deg, #2927bd 41%, #347fe3)',
    paddingBottom: '3.5rem',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '100vh',
    zIndex: 1,

    '.countdown-hero-bg': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100vw',
      opacity: 1,
      backgroundColor: 'transparent',
      backgroundImage: 'url(/countdown-hero.png)',
      backgroundPosition: '0 0',
      backgroundSize: 'cover',
      zIndex: 0
    },

    '.countdown-hero-noise': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 0.25,
      mixBlendMode: 'overlay',
      backgroundColor: 'transparent',
      backgroundImage: 'url(/noise-light.webp)',
      backgroundPosition: '0 0',
      backgroundSize: '10.5rem',
      zIndex: 0
    },

    '.countdown-hero-header': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      position: 'relative',
      width: '100%',
      height: '5.45rem',
      backgroundImage: `linear-gradient(${rgba('#2927bd', 0.8)}, ${rgba('#347fe3', 0)})`,
      paddingTop: '1.5rem',
      zIndex: 1
    },

    '.countdown-hero-contents-container': {
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      alignSelf: 'flex-start',
      alignItems: 'flex-start',
      maxWidth: '1440px',
      minHeight: '6.25rem',
      gridColumnGap: '1.5rem',
      gridRowGap: '1.5rem',
      zIndex: 1,
      padding: '0 0.75rem',

      [theme.breakpoints.up('md')]: {
        padding: '2rem 4rem'
      },

      '.countdown-hero-title': {
        fontSize: '2.125rem',
        fontWeight: 700,
        lineHeight: '90%',
        color: theme.contrast
      },

      '.countdown-hero-subtext': {
        fontSize: '1.75rem',
        fontWeight: 700,
        lineHeight: '90%',
        color: theme.contrast
      },

      '.countdown': {
        display: 'flex',
        alignItems: 'baseline',
        gap: '0.5rem',
        marginTop: '2.75rem',

        h1: {
          fontSize: '4.5rem',
          fontWeight: 600
        },

        p: {
          fontSize: '2.25rem',
          fontWeight: 600
        }
      },

      '.check-status': {
        marginTop: '2.75rem',

        '.wallet-address-input': {
          marginTop: '1.5rem',
          marginBottom: '1rem',

          '.MuiInputBase-root': {
            borderRadius: '0.5rem',
            backgroundColor: rgba(theme.contrast, 0.2),
            overflow: 'hidden'
          },

          input: {
            color: theme.contrast,
            fontWeight: 600,
            backdropFilter: 'blur(2px)',
            minWidth: '27rem',
            height: '1rem',

            '&::placeholder': {
              color: rgba(theme.contrast, 1)
            }
          },

          '.MuiInputAdornment-root': {
            marginRight: '0.25rem',

            svg: {
              color: theme.primary
            }
          },

          fieldset: {
            borderWidth: 2,
            borderColor: rgba(theme.contrast, 0.6)
          }
        }
      },

      '.countdown-hero-intro-text': {
        fontSize: '1.125rem',
        fontWeight: 400,
        lineHeight: '2rem'
      }
    }
  }
})
