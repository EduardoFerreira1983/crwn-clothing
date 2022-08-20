import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import {CartItem, CartIconContainer, CartIconShopping } from './cart-icon.styles';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <CartIconShopping/>
      <CartItem >{ cartCount }</CartItem>
    </CartIconContainer>
  );
};

export default CartIcon;
