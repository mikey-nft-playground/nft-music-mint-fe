import styled from '@emotion/styled'
import { Modal } from '@mui/material'
import { rgba } from 'emotion-rgba'

export const ConnectWalletModalStyle = styled(Modal)(({ theme }: any) => {
  return {
    '.MuiBackdrop-root': {
      backgroundColor: rgba(theme.primary, 0.9)
    },

    '.connect-wallet-modal': {
      position: 'absolute',
      inset: 0,
      paddingTop: '4.625rem',
      outline: 'none',
      animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      animationFillMode: 'both',
      animationDuration: '300ms',
      animationName: 'slideUp',

      [theme.breakpoints.up('sm')]: {
        margin: '1.25rem 0',
        padding: 0,
        transformOrigin: 'center center'
      },

      '.close-icon': {
        position: 'absolute',
        top: '24px',
        right: '24px',
        height: '40px',
        width: '40px',
        padding: 0,
        borderRadius: '0.75rem',
        border: `1px solid ${rgba(theme.contrast, 0.08)}`,
        color: theme.contrast,
        background: 'transparent',
        zIndex: 20,

        [theme.breakpoints.up('sm')]: {
          top: 0
        },

        '&:hover': {
          borderColor: rgba(theme.contrast, 0.18)
        },

        svg: {
          fontSize: '0.875rem',
          fontWeight: 700
        }
      },

      '.cw-modal-container': {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxHeight: '100%',
        borderRadius: '16px 16px 0px 0px',
        zIndex: 15,

        // Scroll
        overflow: 'hidden scroll',
        scrollbarWidth: 'none' /* Firefox */,
        '&::-webkit-scrollbar': {
          display: 'none'
        },

        [theme.breakpoints.up('sm')]: {
          top: '50%',
          bottom: 'unset',
          transform: 'translate(-50%, -50%)',
          margin: 'auto',
          width: '380px',
          borderRadius: '14px'
        }
      },

      '.cw-modal-scroll': {
        position: 'relative',
        width: '100%',
        height: '100%',
        maxHeight: '100%',

        [theme.breakpoints.up('sm')]: {
          maxHeight: '574px'
        }
      },

      '.cw-modal': {
        padding: '2rem 0',
        maxHeight: '100%',
        background: theme.contrast,
        boxShadow: 'rgba(27, 32, 50, 0.1) 0px 6px 16px',
        border: `1px solid rgba(22, 22, 26, 0.08)`,
        color: theme.primary,

        [theme.breakpoints.up('sm')]: {
          height: 'auto'
        },

        '.cw-modal-header': {
          padding: '0 2rem',
          marginBottom: '1rem',
          fontSize: '1.375rem',
          lineHeight: '1.75rem',
          fontWeight: 600,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          maxWidth: '100%'
        },

        '.cw-modal-body': {
          display: 'flex',
          flexDirection: 'column',
          padding: '0 2rem',

          '.content': {
            marginBottom: '2rem',
            color: rgba(theme.primary, 0.6),
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 500,

            [theme.breakpoints.up('sm')]: {
              fontSize: '15px',
              lineHeight: '22px'
            },

            span: {
              color: theme.primary
            }
          },

          '.wallet-list': {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '2rem',

            '.heading': {
              fontSize: '13px',
              lineHeight: '20px',
              fontWeight: 400,
              color: rgba(theme.primary, 0.6),
              marginBottom: '0.625rem'
            }
          },

          '.wallet-btn': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            position: 'relative',
            whiteSpace: 'nowrap',
            background: 'transparent',
            textTransform: 'unset',
            lineHeight: '3rem',
            height: '3rem',
            border: '1px solid transparent',
            borderColor: rgba(theme.primary, 0.1),
            minWidth: '192px',
            borderRadius: '1rem',
            padding: '0.5rem 1.125rem',
            transition: 'all 0.15s ease-in-out 0s',
            transformOrigin: 'center center',
            userSelect: 'none',

            '&.center': {
              justifyContent: 'center'
            },

            '&:disabled': {
              background: rgba(theme.primary, 0.08),
              cursor: 'default',

              p: {
                color: rgba(theme.primary, 0.6)
              }
            },

            '.btn-wrapper': {
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease-in-out 0s',
              height: '100%'
            },

            svg: {
              marginRight: '0.5rem',
              color: rgba(theme.primary, 0.6),
              animation: '1s linear 0s infinite normal forwards running rotate'
            },

            '.btn-content': {
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',

              img: {
                marginRight: '0.75rem'
              },

              p: {
                fontSize: '0.875rem',
                fontWeight: 900,
                color: theme.primary
              }
            }
          }
        }
      }
    },

    '@keyframes slideUp': {
      '0%': {
        opacity: 0,
        transform: 'translateY(20px)'
      },
      '100%': {
        opacity: 1,
        transform: 'translateY(0)'
      }
    },

    '@keyframes rotate': {
      '0%': {
        transform: 'rotate(0deg)'
      },
      '100%': {
        transform: 'rotate(360deg)'
      }
    }
  }
})
