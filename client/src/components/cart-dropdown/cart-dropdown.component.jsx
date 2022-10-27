import React from 'react'
import Button from '../botton/button.component';

import "./cart-dropdown.styles.scss"

const CartDropDown = () => {
  return (
    <div className="cart-dropdown-container">
        <div className="cart-items" />
        <Button>Go to Checkout</Button>
    </div>
  )
}

export default CartDropDown