import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems } from '../../store/cart/cart.selector';
import Button from '../botton/button.component';
import CartItem from '../cart-item/cart-item.component';

import { CartDropdownContainer, EmptyMessage, CartItems} from "./cart-dropdown.styles"

const CartDropDown = () => {
  //const { cartItems, setIsCartOpen, isCartOpen } = useContext(CartContext);
  const cartItems = useSelector(selectCartItems)
  const navigate = useNavigate()

  const handleCheckOut = () => navigate('/checkout')
    
  

  return (
    <CartDropdownContainer>
        <CartItems>
          {
           cartItems.length ?  
           (cartItems.map(item => <CartItem key={item.id} cartItem={item} />)) :
           (<EmptyMessage>Your cart is empty</EmptyMessage>)
          }
        </CartItems>
        <Button onClick={handleCheckOut}>Go to Checkout</Button>
    </CartDropdownContainer>
  )
}

export default CartDropDown