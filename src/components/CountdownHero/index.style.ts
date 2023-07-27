import styled from '@emotion/styled'
import { rgba } from 'emotion-rgba'

export const CountdownHeroStyle = styled('section')(({ theme }: any) => {
  return {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    color: theme.contrast,
    backgroundColor: '#3c2edd',
    backgroundImage: 'linear-gradient(200deg, #2927bd 41%, #347fe3)',
    paddingBottom: '3.5rem',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '960px',
    zIndex: 1,

    [theme.breakpoints.up('sm')]: {
      display: 'grid',
      placeItems: 'center',
      minHeight: '80vh'
    },

    '.countdown-hero-bg': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100vw',
      opacity: 1,
      backgroundColor: 'transparent',
      backgroundImage: 'url(/bg/countdown-hero-mobile.png)',
      backgroundPosition: 'center bottom',
      backgroundSize: 'cover',
      zIndex: 0,

      [theme.breakpoints.up('sm')]: {
        backgroundImage: 'url(/bg/countdown-hero.png)',
        backgroundPosition: '0 0'
      }
    },

    '.countdown-hero-noise': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 0.05,
      mixBlendMode: 'overlay',
      backgroundColor: 'transparent',
      backgroundImage: 'url(/bg/noise-light.webp)',
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
      height: '2rem',
      opacity: 0.05,
      backgroundImage: `linear-gradient(${rgba('#2927bd', 0.8)}, ${rgba('#347fe3', 0)})`,
      paddingTop: '1.5rem',
      zIndex: 1,

      [theme.breakpoints.up('sm')]: {
        height: '5.45rem'
      }
    },

    '.countdown-hero-contents-container': {
      display: 'grid',
      gridTemplateColumns: '1fr',
      position: 'relative',
      flexDirection: 'column',
      alignSelf: 'flex-start',
      alignItems: 'flex-start',
      maxWidth: '1440px',
      width: '100%',
      minHeight: '6.25rem',
      gridColumnGap: '1.5rem',
      gridRowGap: '1.5rem',
      zIndex: 1,
      padding: '0 1rem',

      [theme.breakpoints.up('md')]: {
        padding: '2rem 2.5rem'
      },

      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: '1fr 1fr'
      },

      '.countdown-hero-title': {
        fontSize: '1.75rem',
        fontWeight: 700,
        lineHeight: '1.375',
        color: theme.contrast,

        [theme.breakpoints.up('sm')]: {
          fontSize: '2.125rem'
        }
      },

      '.countdown-hero-subtext': {
        fontSize: '1.5rem',
        fontWeight: 700,
        lineHeight: '1.75',
        color: theme.contrast,

        [theme.breakpoints.up('sm')]: {
          fontSize: '1.75rem'
        }
      },

      '.countdown': {
        display: 'flex',
        alignItems: 'baseline',
        gap: '0.5rem',
        marginTop: '2rem',

        [theme.breakpoints.up('sm')]: {
          marginTop: '2.75rem'
        },

        h1: {
          fontSize: '2.25rem',
          fontWeight: 600,

          [theme.breakpoints.up('sm')]: {
            fontSize: '4rem'
          }
        },

        p: {
          fontSize: '1.75rem',
          fontWeight: 600,

          [theme.breakpoints.up('sm')]: {
            fontSize: '2.25rem'
          }
        }
      },

      '.check-status': {
        marginTop: '2.75rem',

        '.wallet-address-input': {
          display: 'flex',
          marginTop: '1rem',
          marginBottom: '1rem',

          [theme.breakpoints.up('sm')]: {
            marginTop: '1.5rem'
          },

          '.MuiInputBase-root': {
            borderRadius: '0.5rem',
            backgroundColor: rgba(theme.contrast, 0.2),
            maxWidth: '27rem',
            overflow: 'hidden'
          },

          input: {
            color: theme.contrast,
            fontWeight: 600,
            backdropFilter: 'blur(2px)',
            width: '100%',
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
