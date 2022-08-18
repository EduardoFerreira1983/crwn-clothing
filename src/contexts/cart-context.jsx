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

const clearCartItem = (cartItems,cartItemToClear ) => {
  return cartItems.filter(( cartItem ) => cartItem.id !== cartItemToClear.id);
}

const removeCartItem = ( cartItems, cartItemToRemove ) => {
  //find the cart item to remove
  const existCartItem = cartItems.find( ( cartItem ) =>
    cartItem.id === cartItemToRemove.id );
  
  // if quantity equal to 1 remove item from he cart
  if ( existCartItem.quantity === 1 ) {
    return cartItems.filter( (cartItem) => cartItem.id !== cartItemToRemove.id );
  }
    
  return cartItems.map( ( cartItem ) =>
    cartItem.id === cartItemToRemove.id ?
      { ...cartItem, quantity: cartItem.quantity - 1 } :
      cartItem );
// return back quantities with matching cart item with reduced quantity
}

export const CartContext = createContext( {
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  cartCount: 0,
  removeItemFromCart: () => { },
  cartTotal: 0
} )


export const CartProvider = ( { children } ) => {
  const [ isCartOpen, setIsCartOpen ] = useState( false );
  const [ cartItems, setCartItems ] = useState( [] );
  const [ cartCount, setCartCount ] = useState();
  const [ cartTotal, setCartTotal ] = useState();

  
  const addItemToCart = product => {
    setCartItems( addCartItem( cartItems, product ) );
  }

  const removeItemFromCart = product => {
      setCartItems( removeCartItem( cartItems, product ) );
  }

    const clearItemFromCart = product => {
      setCartItems( clearCartItem( cartItems, product ) );
  }

  useEffect( () => {
    const newCartCount = cartItems.reduce( ( total, cartItem ) =>
        total + cartItem.quantity, 0 );
    setCartCount( newCartCount );
  }, [ cartItems ] );

  useEffect( () => {
    const newCartTotal = cartItems.reduce( ( total, cartItem ) =>
        total + cartItem.quantity * cartItem.price , 0 );
    setCartTotal( newCartTotal );
  }, [ cartItems ] );

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal
  };

  return (
    <CartContext.Provider value={ value }>{ children }</CartContext.Provider>
  )
};
