import { USER_ACTION_TYPES } from "./user.types";

const Initial_state = {
    currentUser: null
}

export const userReducer = (state = Initial_state, action) => {
    const { type, payload } = action;
    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER: 
            return {
                ...state,
                currentUser: payload
            }
        default: {
            return state;
        }
    }
}
