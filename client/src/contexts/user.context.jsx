import { createContext, useState, useEffect, useReducer } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase.utils';

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
       dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
   }
    const value = { currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            console.log(user)
            if(user) {
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        })
         return unsubscribe
    }, [])
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