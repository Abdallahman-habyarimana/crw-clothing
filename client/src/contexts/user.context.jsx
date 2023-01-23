import { createContext, useState, useEffect, useReducer } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase.utils';
import { createAction } from '../utils/reducer/reducer.utils';

export const UserContext = createContext({
    currentUser : null,
    setCurrentUser: () => null
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    const { type, payload } = action;
    switch(type) {
        case 'SET_CURRENT_USER': 
            return {
                ...state,
                currentUser: payload
            }
        defautl: {
            throw new Error(`Unhandled type ${type} in user Reducer`)
        }
    }
}

const Initial_state = {
    currentUser: null
}

export const UserProvider = ({ children }) => {
   const [ { currentUser }, dispatch] = useReducer(userReducer, Initial_state);

   const setCurrentUser = (user) => {
       dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
   }
    const value = { currentUser, setCurrentUser};

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}

/*

const userReducer = (state, action) => {
    return {
        currentUser: 
    }
}

*/