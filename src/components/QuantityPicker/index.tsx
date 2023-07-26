import { Box, Button } from '@mui/material'
import React, { useState } from 'react'

import { QuantityPickerStyle } from './index.style'

const QuantityPicker = (props: any) => {
  const [quantity, setQuantity] = useState(1)

  const increment = () => {
    setQuantity((quantity) => ++quantity)
  }

  const decrement = () => {
    setQuantity((quantity) => (quantity > 1 ? --quantity : 1))
  }

  return (
    <QuantityPickerStyle>
      <Box className="quantity-input">
        <Button className="quantity-input-modifier quantity-input-left" onClick={decrement}>
          &mdash;
        </Button>
        <input className="quantity-input-screen" type="text" value={quantity} readOnly />
        <Button className="quantity-input-modifier quantity-input-right" onClick={increment}>
          &#xff0b;
        </Button>
      </Box>
    </QuantityPickerStyle>
  )
}

export default QuantityPicker
