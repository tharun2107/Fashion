// import React, { createContext, useContext, useReducer } from 'react';
// import userReducer from '../reducers/userReducer';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//     const [user, dispatch] = useReducer(userReducer, JSON.parse(localStorage.getItem('user')) || null);

//     const setUser = (userData) => {
//         dispatch({ type: 'SET_USER', payload: userData });
//         localStorage.setItem('user', JSON.stringify(userData));
//     };

//     const logout = () => {
//         dispatch({ type: 'LOGOUT' });
//         localStorage.removeItem('user');
//     };

//     return (
//         <UserContext.Provider value={{ user, setUser, logout }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// export const useUserContext = () => {
//     return useContext(UserContext);
// };

import React, { createContext, useContext, useReducer } from 'react';
import userReducer from '../reducers/userReducer';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, dispatch] = useReducer(userReducer, JSON.parse(localStorage.getItem('user')) || null);

    const setUser = (userData) => {
        dispatch({ type: 'SET_USER', payload: userData });
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
