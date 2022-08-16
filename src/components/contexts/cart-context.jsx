import { createContext, useEffect, useState } from "react";


export const addCartItem = ( cartItems, productToAdd )=>{// function to help find if exists item in cart
    //find with cartItems contains productToAdd 
    const existCartItem = cartItems.find( ( cartItem ) =>
        cartItem.id === productToAdd.id );

    // if found, increment quantity
    if ( existCartItem ) {
        return cartItems.map( ( cartItem ) => 
            cartItem.id === productToAdd.id ?
                { ...cartItem, quantity: cartItem.quantity + 1 } :
                cartItem
         );
    }
    
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

export const CartContext = createContext( {
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0
} )


export const CartProvider = ( { children } ) => {
    const [ isCartOpen, setIsCartOpen ] = useState( false );
    const [ cartItems, setCartItems ] = useState( [] );
    const [ cartCount, setCartCount ] = useState();

    
    const addItemToCart = product => {
        setCartItems( addCartItem( cartItems, product ) );
    }

    useEffect( () => {
        const newCartCount = cartItems.reduce( ( total, cartItem ) =>
            total + cartItem.quantity, 0 );
        setCartCount( newCartCount );
    }, [ cartItems ] );

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };

    return (
        <CartContext.Provider value={ value }>{ children }</CartContext.Provider>
    )
};
