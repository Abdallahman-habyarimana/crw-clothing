import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if(existingCartItem){ 
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
            { ...cartItem, quantity: cartItem.quantity + 1} :
            cartItem)
    }
    return [...cartItems, {...productToAdd, quantity: 1}]
} 

const countCartItem = (cartItems) => {
    const counted = cartItems.reduce((previousItem, currentItem) => previousItem + currentItem.quantity, 0)
    return counted
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {}
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(0)

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
        setCartQuantity(countCartItem(cartItems))
    }
    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartQuantity }
    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}