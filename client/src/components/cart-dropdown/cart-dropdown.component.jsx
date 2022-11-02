import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import Button from '../botton/button.component';
import CartItem from '../cart-item/cart-item.component';

import "./cart-dropdown.styles.scss"

const CartDropDown = () => {
  const { cartItems, setIsCartOpen, isCartOpen } = useContext(CartContext);
  const navigate = useNavigate()

  const handleCheckOut = () => {
    const path = "checkout";
    navigate(path)
    setIsCartOpen(!isCartOpen)
  }

  return (
    <div className="cart-dropdown-container">
        <div className="cart-items">
          {
            cartItems.map(item => <CartItem key={item.id} cartItem={item} />)
          }
        </div>
        <Button onClick={handleCheckOut}>Go to Checkout</Button>
    </div>
  )
}

export default CartDropDown