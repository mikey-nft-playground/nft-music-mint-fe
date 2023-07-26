import styled from '@emotion/styled'
import { rgba } from 'emotion-rgba'

export const MintHeroStyle = styled('section')(({ theme }: any) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.primary,
    backgroundColor: '#3c2edd',
    backgroundImage: 'linear-gradient(200deg, #2927bd 41%, #347fe3)',
    paddingBottom: '3.5rem',
    position: 'relative',
    overflow: 'hidden',
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
      opacity: 0.25,
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
      backgroundImage: `linear-gradient(${rgba('#e9b345', 0.8)}, ${rgba('#347fe3', 0)})`,
      paddingTop: '1.5rem',
      zIndex: 1
    },

    '.mint-hero-contents-container': {
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      alignSelf: 'flex-end',
      alignItems: 'flex-start',
      maxWidth: '600px',
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
        lineHeight: '90%',
        color: theme.primary
      },

      '.mint-hero-subtext': {
        fontSize: '1.75rem',
        fontWeight: 700,
        lineHeight: '90%',
        color: theme.primary
      },

      '.mint-hero-account': {
        marginTop: '1.75rem'
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
        borderRadius: '1rem',
        backdropFilter: 'blur(2px)',
        backgroundColor: rgba(theme.contrast, 0.2),
        boxShadow:
          'inset 0 0 1px rgba(255, 255, 255, .54), inset 0 1px 1px rgba(214, 211, 255, .56), 0 10px 10px -8px rgba(21, 20, 46, .25)',

        '.wallet-address-input': {
          marginTop: '1.5rem',
          marginBottom: '1rem',

          '.MuiInputBase-root': {
            borderRadius: '0.5rem',
            backgroundColor: rgba(theme.primary, 0.2),
            overflow: 'hidden'
          },

          input: {
            color: theme.primary,
            fontWeight: 600,
            backdropFilter: 'blur(2px)',
            minWidth: '27rem',
            height: '1rem',

            '&::placeholder': {
              color: rgba(theme.primary, 1)
            }
          },

          '.MuiInputAdornment-root': {
            marginRight: '0.25rem',

            svg: {
              color: theme.contrast
            }
          },

          fieldset: {
            borderWidth: 2,
            borderColor: rgba(theme.primary, 0.6)
          }
        }
      }
    }
  }
})
