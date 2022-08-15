import { createContext, useState, useEffect } from "react";

import { onAuthUserStateChanged, createUserDocumentFromAuth }
    from '../../utils/firebase/firebase.utils';


export const UserContext = createContext( {
    currentUser: null,
    setCurrentUser: () => null
} )

export const UserProvider = ( { children } ) => {
    
    const [ currentUser, setCurrentUser ] = useState( null );
    const value = { currentUser, setCurrentUser };
    
    useEffect( () => {  // when the auth changes the callback is called
        const unsubscribe = onAuthUserStateChanged( ( user ) => {
            if ( user ) createUserDocumentFromAuth( user );
            setCurrentUser( user );
            console.log( user );
        } )
        return unsubscribe;
    }, [] );
    
    return <UserContext.Provider value={ value }> { children } </UserContext.Provider>
};