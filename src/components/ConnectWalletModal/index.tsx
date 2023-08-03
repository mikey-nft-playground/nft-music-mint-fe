import { Box, Button, Typography } from '@mui/material'
import { utils } from 'ethers'
import Image from 'next/image'
import { parseCookies, setCookie } from 'nookies'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Web3 from 'web3'

import { connectors } from '~/connectors'
import { closeConnectWalletModal } from '~/store/slices/local.slice'
import { COOKIES } from '~/utils/constants'
import AppModal from '../AppModal'
import { ConnectWalletModalStyle } from './index.style'

type IConnectWalletModalProps = {
  open: boolean
  onClose: any
}

const ConnectWalletModal = (props: IConnectWalletModalProps) => {
  const { open, onClose } = props
  const dispatch = useDispatch()
  const cookies = parseCookies()

  const [metaMask, useMetaMask] = connectors[0]
  const [walletConnectV2, useWalletConnectV2] = connectors[1]

  const { useAccount: useMetaMaskAccount } = useMetaMask
  const { useAccount: useWalletConnectAccount } = useWalletConnectV2
  const metaMaskAccount = useMetaMaskAccount()
  const walletConnectAccount = useWalletConnectAccount()

  const [loadingMetaMask, setLoadingMetaMask] = useState(false)
  const [loadingWalletConnectV2, setLoadingWalletConnectV2] = useState(false)

  const onConnectMetaMask = async () => {
    const chainId = process.env.NEXT_PUBLIC_SUPPORT_CHAIN_ID || '1'

    try {
      if (chainId && window.ethereum && window.ethereum.networkVersion !== chainId) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: Web3.utils.toHex(parseInt(chainId)) }]
          })
        } catch (err: any) {
          console.log('Network changed rejected', err)
        }
      } else {
        setLoadingMetaMask(true)
        try {
          await metaMask.activate(parseInt(chainId))
        } catch (err) {
          console.log('User rejected the request', err)
          setLoadingMetaMask(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onConnectWalletConnect = async () => {
    const chainId = process.env.NEXT_PUBLIC_SUPPORT_CHAIN_ID || '1'

    try {
      if (chainId && window.ethereum && window.ethereum.networkVersion !== chainId) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: Web3.utils.toHex(parseInt(chainId)) }]
          })
        } catch (err: any) {
          console.log('Network changed rejected', err)
        }
      } else {
        setLoadingWalletConnectV2(true)
        try {
          await walletConnectV2.activate(parseInt(chainId)).catch((err) => {
            console.log('User rejected the request', err)
            setLoadingWalletConnectV2(false)
          })
        } catch (err) {
          console.log('User rejected the request', err)
          setLoadingWalletConnectV2(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const sign = (provider: any, account: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const date = new Date()
        if (!!provider) {
          const message = `I want to login on GroundUp Genesis Pass at ${date}.
              \nI accept the GroundUp Terms of Service and I am at least 13 years old.`
          const hexMessage = utils.hexlify(utils.toUtf8Bytes(message))
          const signature = await provider.request({
            method: 'personal_sign',
            params: [hexMessage, account]
          })
          resolve(signature)
        } else {
          reject()
        }
      } catch (err) {
        reject(err)
      }
    })
  }

  useEffect(() => {
    if (metaMaskAccount && !cookies[COOKIES.SIGNATURE]) {
      sign(metaMask.provider, metaMaskAccount)
        .then((signature: any) => {
          if (signature) {
            dispatch(closeConnectWalletModal())
            setCookie(null, COOKIES.SIGNATURE, signature, { path: '/' })
            setCookie(null, COOKIES.CONNECTOR, 'metaMask', { path: '/' })
          }
          setLoadingMetaMask(false)
        })
        .catch(() => {
          setLoadingMetaMask(false)
        })
    }
  }, [metaMaskAccount])

  useEffect(() => {
    if (walletConnectAccount && !cookies[COOKIES.SIGNATURE]) {
      sign(walletConnectV2.provider, walletConnectAccount)
        .then((signature: any) => {
          if (signature) {
            dispatch(closeConnectWalletModal())
            setCookie(null, COOKIES.SIGNATURE, signature, { path: '/' })
            setCookie(null, COOKIES.CONNECTOR, 'walletConnect', { path: '/' })
          }
          setLoadingWalletConnectV2(false)
        })
        .catch(() => {
          setLoadingWalletConnectV2(false)
        })
    }
  }, [walletConnectAccount])

  return (
    <AppModal open={open} onClose={onClose}>
      <ConnectWalletModalStyle>
        <Box className="cw-modal">
          <Typography variant="h1" className="cw-modal-header">
            Connect wallet
          </Typography>
          <Box className="cw-modal-body">
            <Typography className="content">
              Get started with your <span>Ethereum</span> wallet to sign messages and send
              transactions
            </Typography>

            <Box className="wallet-list">
              <Typography className="heading">Popular</Typography>

              <Button
                className={`wallet-btn metamask ${loadingMetaMask ? 'loading' : ''}`}
                disabled={!!loadingMetaMask}
                onClick={onConnectMetaMask}
                disableRipple>
                <Box className="btn-wrapper">
                  <svg viewBox="0 0 25 24" fill="none" width="24" height="24">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.5007 7C11.5007 6.44772 11.9484 6 12.5007 6C15.8144 6 18.5007 8.68629 18.5007 12C18.5007 15.3137 15.8144 18 12.5007 18C9.18702 18 6.50073 15.3137 6.50073 12C6.50073 11.4477 6.94845 11 7.50073 11C8.05302 11 8.50073 11.4477 8.50073 12C8.50073 14.2091 10.2916 16 12.5007 16C14.7099 16 16.5007 14.2091 16.5007 12C16.5007 9.79086 14.7099 8 12.5007 8C11.9484 8 11.5007 7.55228 11.5007 7Z"
                      fill="currentColor"></path>
                  </svg>
                  <Box className="btn-content">
                    <Image
                      src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zOmV2PSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL3htbC1ldmVudHMiCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAzMTguNiAzMTguNiIKCSBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMTguNiAzMTguNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNFMjc2MUI7c3Ryb2tlOiNFMjc2MUI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30KCS5zdDF7ZmlsbDojRTQ3NjFCO3N0cm9rZTojRTQ3NjFCO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9Cgkuc3Qye2ZpbGw6I0Q3QzFCMztzdHJva2U6I0Q3QzFCMztzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fQoJLnN0M3tmaWxsOiMyMzM0NDc7c3Ryb2tlOiMyMzM0NDc7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30KCS5zdDR7ZmlsbDojQ0Q2MTE2O3N0cm9rZTojQ0Q2MTE2O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9Cgkuc3Q1e2ZpbGw6I0U0NzUxRjtzdHJva2U6I0U0NzUxRjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fQoJLnN0NntmaWxsOiNGNjg1MUI7c3Ryb2tlOiNGNjg1MUI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30KCS5zdDd7ZmlsbDojQzBBRDlFO3N0cm9rZTojQzBBRDlFO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9Cgkuc3Q4e2ZpbGw6IzE2MTYxNjtzdHJva2U6IzE2MTYxNjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fQoJLnN0OXtmaWxsOiM3NjNEMTY7c3Ryb2tlOiM3NjNEMTY7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30KPC9zdHlsZT4KPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIyNzQuMSwzNS41IDE3NC42LDEwOS40IDE5Myw2NS44ICIvPgo8Zz4KCTxwb2x5Z29uIGNsYXNzPSJzdDEiIHBvaW50cz0iNDQuNCwzNS41IDE0My4xLDExMC4xIDEyNS42LDY1LjggCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSIyMzguMywyMDYuOCAyMTEuOCwyNDcuNCAyNjguNSwyNjMgMjg0LjgsMjA3LjcgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSIzMy45LDIwNy43IDUwLjEsMjYzIDEwNi44LDI0Ny40IDgwLjMsMjA2LjggCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSIxMDMuNiwxMzguMiA4Ny44LDE2Mi4xIDE0NC4xLDE2NC42IDE0Mi4xLDEwNC4xIAkiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDEiIHBvaW50cz0iMjE0LjksMTM4LjIgMTc1LjksMTAzLjQgMTc0LjYsMTY0LjYgMjMwLjgsMTYyLjEgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSIxMDYuOCwyNDcuNCAxNDAuNiwyMzAuOSAxMTEuNCwyMDguMSAJIi8+Cgk8cG9seWdvbiBjbGFzcz0ic3QxIiBwb2ludHM9IjE3Ny45LDIzMC45IDIxMS44LDI0Ny40IDIwNy4xLDIwOC4xIAkiLz4KPC9nPgo8Zz4KCTxwb2x5Z29uIGNsYXNzPSJzdDIiIHBvaW50cz0iMjExLjgsMjQ3LjQgMTc3LjksMjMwLjkgMTgwLjYsMjUzIDE4MC4zLDI2Mi4zIAkiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDIiIHBvaW50cz0iMTA2LjgsMjQ3LjQgMTM4LjMsMjYyLjMgMTM4LjEsMjUzIDE0MC42LDIzMC45IAkiLz4KPC9nPgo8cG9seWdvbiBjbGFzcz0ic3QzIiBwb2ludHM9IjEzOC44LDE5My41IDExMC42LDE4NS4yIDEzMC41LDE3Ni4xICIvPgo8cG9seWdvbiBjbGFzcz0ic3QzIiBwb2ludHM9IjE3OS43LDE5My41IDE4OCwxNzYuMSAyMDgsMTg1LjIgIi8+CjxnPgoJPHBvbHlnb24gY2xhc3M9InN0NCIgcG9pbnRzPSIxMDYuOCwyNDcuNCAxMTEuNiwyMDYuOCA4MC4zLDIwNy43IAkiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDQiIHBvaW50cz0iMjA3LDIwNi44IDIxMS44LDI0Ny40IDIzOC4zLDIwNy43IAkiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDQiIHBvaW50cz0iMjMwLjgsMTYyLjEgMTc0LjYsMTY0LjYgMTc5LjgsMTkzLjUgMTg4LjEsMTc2LjEgMjA4LjEsMTg1LjIgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0NCIgcG9pbnRzPSIxMTAuNiwxODUuMiAxMzAuNiwxNzYuMSAxMzguOCwxOTMuNSAxNDQuMSwxNjQuNiA4Ny44LDE2Mi4xIAkiLz4KPC9nPgo8Zz4KCTxwb2x5Z29uIGNsYXNzPSJzdDUiIHBvaW50cz0iODcuOCwxNjIuMSAxMTEuNCwyMDguMSAxMTAuNiwxODUuMiAJIi8+Cgk8cG9seWdvbiBjbGFzcz0ic3Q1IiBwb2ludHM9IjIwOC4xLDE4NS4yIDIwNy4xLDIwOC4xIDIzMC44LDE2Mi4xIAkiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDUiIHBvaW50cz0iMTQ0LjEsMTY0LjYgMTM4LjgsMTkzLjUgMTQ1LjQsMjI3LjYgMTQ2LjksMTgyLjcgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0NSIgcG9pbnRzPSIxNzQuNiwxNjQuNiAxNzEuOSwxODIuNiAxNzMuMSwyMjcuNiAxNzkuOCwxOTMuNSAJIi8+CjwvZz4KPHBvbHlnb24gY2xhc3M9InN0NiIgcG9pbnRzPSIxNzkuOCwxOTMuNSAxNzMuMSwyMjcuNiAxNzcuOSwyMzAuOSAyMDcuMSwyMDguMSAyMDguMSwxODUuMiAiLz4KPHBvbHlnb24gY2xhc3M9InN0NiIgcG9pbnRzPSIxMTAuNiwxODUuMiAxMTEuNCwyMDguMSAxNDAuNiwyMzAuOSAxNDUuNCwyMjcuNiAxMzguOCwxOTMuNSAiLz4KPHBvbHlnb24gY2xhc3M9InN0NyIgcG9pbnRzPSIxODAuMywyNjIuMyAxODAuNiwyNTMgMTc4LjEsMjUwLjggMTQwLjQsMjUwLjggMTM4LjEsMjUzIDEzOC4zLDI2Mi4zIDEwNi44LDI0Ny40IDExNy44LDI1Ni40IAoJMTQwLjEsMjcxLjkgMTc4LjQsMjcxLjkgMjAwLjgsMjU2LjQgMjExLjgsMjQ3LjQgIi8+Cjxwb2x5Z29uIGNsYXNzPSJzdDgiIHBvaW50cz0iMTc3LjksMjMwLjkgMTczLjEsMjI3LjYgMTQ1LjQsMjI3LjYgMTQwLjYsMjMwLjkgMTM4LjEsMjUzIDE0MC40LDI1MC44IDE3OC4xLDI1MC44IDE4MC42LDI1MyAiLz4KPGc+Cgk8cG9seWdvbiBjbGFzcz0ic3Q5IiBwb2ludHM9IjI3OC4zLDExNC4yIDI4Ni44LDczLjQgMjc0LjEsMzUuNSAxNzcuOSwxMDYuOSAyMTQuOSwxMzguMiAyNjcuMiwxNTMuNSAyNzguOCwxNDAgMjczLjgsMTM2LjQgCgkJMjgxLjgsMTI5LjEgMjc1LjYsMTI0LjMgMjgzLjYsMTE4LjIgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0OSIgcG9pbnRzPSIzMS44LDczLjQgNDAuMywxMTQuMiAzNC45LDExOC4yIDQyLjksMTI0LjMgMzYuOCwxMjkuMSA0NC44LDEzNi40IDM5LjgsMTQwIDUxLjMsMTUzLjUgMTAzLjYsMTM4LjIgCgkJMTQwLjYsMTA2LjkgNDQuNCwzNS41IAkiLz4KPC9nPgo8cG9seWdvbiBjbGFzcz0ic3Q2IiBwb2ludHM9IjI2Ny4yLDE1My41IDIxNC45LDEzOC4yIDIzMC44LDE2Mi4xIDIwNy4xLDIwOC4xIDIzOC4zLDIwNy43IDI4NC44LDIwNy43ICIvPgo8cG9seWdvbiBjbGFzcz0ic3Q2IiBwb2ludHM9IjEwMy42LDEzOC4yIDUxLjMsMTUzLjUgMzMuOSwyMDcuNyA4MC4zLDIwNy43IDExMS40LDIwOC4xIDg3LjgsMTYyLjEgIi8+Cjxwb2x5Z29uIGNsYXNzPSJzdDYiIHBvaW50cz0iMTc0LjYsMTY0LjYgMTc3LjksMTA2LjkgMTkzLjEsNjUuOCAxMjUuNiw2NS44IDE0MC42LDEwNi45IDE0NC4xLDE2NC42IDE0NS4zLDE4Mi44IDE0NS40LDIyNy42IAoJMTczLjEsMjI3LjYgMTczLjMsMTgyLjggIi8+Cjwvc3ZnPgo="
                      alt="MetaMask"
                      width={32}
                      height={32}
                      priority
                    />
                    <Typography>MetaMask</Typography>
                  </Box>
                </Box>
              </Button>

              <Button
                className={`wallet-btn walletconnect ${loadingWalletConnectV2 ? 'loading' : ''}`}
                disabled={!!loadingWalletConnectV2}
                onClick={onConnectWalletConnect}
                disableRipple>
                <Box className="btn-wrapper">
                  <svg viewBox="0 0 25 24" fill="none" width="24" height="24">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.5007 7C11.5007 6.44772 11.9484 6 12.5007 6C15.8144 6 18.5007 8.68629 18.5007 12C18.5007 15.3137 15.8144 18 12.5007 18C9.18702 18 6.50073 15.3137 6.50073 12C6.50073 11.4477 6.94845 11 7.50073 11C8.05302 11 8.50073 11.4477 8.50073 12C8.50073 14.2091 10.2916 16 12.5007 16C14.7099 16 16.5007 14.2091 16.5007 12C16.5007 9.79086 14.7099 8 12.5007 8C11.9484 8 11.5007 7.55228 11.5007 7Z"
                      fill="currentColor"></path>
                  </svg>
                  <Box className="btn-content">
                    <Image
                      src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtNS45NDY4NSA4LjQwMzE1YzMuMzQzMzItMy4yMDQyIDguNzYzOTUtMy4yMDQyIDEyLjEwNzI1IDBsLjU1MzIuNTMwMTdjLjA4MzcuMDgwMTguMDgzOS4yMTAzLjAwMDQuMjkwNjMtLjAwMDEuMDAwMTUtLjAwMDIuMDAwMy0uMDAwNC4wMDA0NWwtMS41Mjc2IDEuNDYzOWMtLjA4MzQuMDgtLjIxODYuMDgtLjMwMjEgMGwtLjU1MzktLjUzMDljLTIuMzMyNC0yLjIzNTMtNi4xMTQtMi4yMzUzLTguNDQ2MzUgMGwtLjU5MzMuNTY4NmMtLjA4MzQ5LjA4LS4yMTg2Mi4wOC0uMzAyMTEgMGwtMS41Mjc1Ni0xLjQ2NDAzYy0uMDgzNjUtLjA4MDE3LS4wODM4Mi0uMjEwMy0uMDAwNC0uMjkwNjIuMDAwMTMtLjAwMDE1LjAwMDI2LS4wMDAzLjAwMDQtLjAwMDM4em0xNC44MDIyNSAyLjU4Mjc1IDEuMzc1NyAxLjMxODRjLjE2NzMuMTYwNC4xNjc2LjQyMDYuMDAwOC41ODE0LS4wMDAzLjAwMDMtLjAwMDUuMDAwNS0uMDAwOC4wMDA4bC01LjUyMzMgNS4yOTM1Yy0uMTY3MS4xNi0uNDM3My4xNi0uNjA0MyAwbC0zLjkyMTItMy43NThjLS4wNDE3LS4wNC0uMTA5Mi0uMDQtLjE1MSAwbC0zLjkyMTA4IDMuNzU4Yy0uMTY3MDIuMTYtLjQzNzI1LjE2LS42MDQyNCAwbC01LjUyMzQ5LTUuMjkzNmMtLjE2NzI5LS4xNjAzLS4xNjc2NS0uNDIwNy0uMDAwNzktLjU4MTQuMDAwMjYtLjAwMDIuMDAwNTItLjAwMDUuMDAwNzktLjAwMDdsMS4zNzU2NC0xLjMxODRjLjA4MzQ5LS4wOC4yMTg2My0uMDguMzAyMTIgMGw0LjA3MjI3IDMuOTAyN2MuMDQxNzguMDQwMS4xMDkzNS4wNDAxLjE1MTA1IDBsMy45MjEwMy0zLjc1NzljLjE2Ny0uMTYwMS40MzcyLS4xNjAxLjYwNDIgMGwzLjkyMTMgMy43NTc5Yy4wNDE3LjA0MDEuMTA5Mi4wNDAxLjE1MSAwbDQuMDcyMi0zLjkwMjdjLjA4MzUtLjA3OTkuMjE4Ni0uMDc5OS4zMDIxIDB6IiBmaWxsPSIjM2I5OWZjIi8+PC9zdmc+"
                      alt="MetaMask"
                      width={32}
                      height={32}
                      priority
                    />
                    <Typography>WalletConnect</Typography>
                  </Box>
                </Box>
              </Button>
            </Box>

            <Button className="wallet-btn center" onClick={onClose}>
              <Box className="btn-content">
                <Typography>Cancel</Typography>
              </Box>
            </Button>
          </Box>
        </Box>
      </ConnectWalletModalStyle>
    </AppModal>
  )
}

export default ConnectWalletModal
