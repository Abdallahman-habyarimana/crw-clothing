import { CART_ACTION_TYPES } from "./cart.types";

export const Initial_state = {
    isCartOpen: false,
    cartItems: []
}


export const cartReducer= (state = Initial_state, action = {}) => {
    const { type, payload} = action;
    const { SET_CART_ITEMS, SET_IS_CART_OPEN } = CART_ACTION_TYPES
    switch(type){
        case SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload
                
            }
        case SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
                
            }
        default :
            return state;
    }

}

