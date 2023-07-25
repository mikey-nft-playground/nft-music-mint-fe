import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

import { MenuItemStyle } from './index.style'

type IMenuItemProps = {
  href: string
}

const MenuItem = (props: PropsWithChildren<IMenuItemProps>) => {
  const { children, href } = props

  return (
    <MenuItemStyle>
      <Box className="menu-item">
        <Link className="menu-item-link" href={href}>
          <Typography className="">{children}</Typography>
        </Link>
      </Box>
    </MenuItemStyle>
  )
}

export default MenuItem
