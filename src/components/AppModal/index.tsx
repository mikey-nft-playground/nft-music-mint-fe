import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Box, IconButton } from '@mui/material'
import { PropsWithChildren } from 'react'

import { useOutsideClick } from '~/hooks/useOutsideClick'
import { AppModalStyle } from './index.style'

type IAppModalProps = {
  open: boolean
  onClose: any
}

const AppModal = (props: IAppModalProps & PropsWithChildren) => {
  const { open, onClose, children } = props

  const modalRef = useOutsideClick(() => {
    onClose()
  })

  return (
    <AppModalStyle open={open} onClose={onClose}>
      <Box className="app-modal">
        <IconButton className="close-icon" onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>

        <Box ref={modalRef} className="app-modal-container">
          <Box className="app-modal-scroll">{children}</Box>
        </Box>
      </Box>
    </AppModalStyle>
  )
}

export default AppModal
