import { createContext, useState, useEffect, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if(existingCartItem){ 
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
            { ...cartItem, quantity: cartItem.quantity + 1} :
            cartItem)
    }
    return [...cartItems, {...productToAdd, quantity: 1}]
} 

const removeCartItem = (cartItems, cartItemToRemove) => {

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    if(existingCartItem.quantity === 1){ 
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
    }

    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity -1 } : cartItem)
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

const Initial_state = {
    isCartOpen: true,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

export const CART_ACTIONS_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_TO_CART: 'REMOVE_TO_CART',
    CLEAR_ITEM_TO_CART: 'CLEAR_ITEM_TO_CART'
}

const cartReducer= (state, action) => {
    const { type, payload} = action;

    switch(type){
        case 'SET_CART_ITEMS':
            return {
                ...state,
                ...payload
                
            }
        default :
            throw new Error(`unhandled type of ${type} in cartReducer`)
    }

}

export const CartProvider = ({ children }) => {
   
    const [{ cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, Initial_state)

    const updateCartItemsReducer = (newCartItems) => {

        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0
        )

        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 0
        )
        
        dispatch({ type: 'SET_CART_ITEMS', 
            payload: {
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartCount: newCartCount
            }
        })
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = setCartItems(addCartItem(cartItems, productToAdd))
        updateCartItemsReducer(newCartItems)
    }

    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = setCartItems(removeCartItem(cartItems, cartItemToRemove))
        updateCartItemsReducer(newCartItems)

    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = setCartItems(clearCartItem(cartItems, cartItemToClear))
        updateCartItemsReducer(newCartItems)
    }

    const value = { isCartOpen, setIsCartOpen: () => {}, cartItems, addItemToCart, cartCount, removeItemToCart, clearItemFromCart, cartTotal }
    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}