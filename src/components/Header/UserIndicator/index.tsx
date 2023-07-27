import { Box } from '@mui/material'
import Jazzicon from 'react-jazzicon'

import { UserIndicatorStyle } from './index.style'

interface IUserIndicatorProps {
  account: string
}

const UserIndicator = (props: IUserIndicatorProps) => {
  const { account } = props

  const address = account.slice(2, 10)
  const seed = parseInt(address, 16)

  return (
    <UserIndicatorStyle>
      <Box className="user-indicator">
        <Jazzicon diameter={32} seed={seed} />
      </Box>
    </UserIndicatorStyle>
  )
}

export default UserIndicator
