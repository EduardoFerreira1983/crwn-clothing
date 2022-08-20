import {
  CartItemContainer,
  CartItemName,
  CartItemDetails,
  ImageCartIcon
} from './cart-item.styles';



const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      
      <ImageCartIcon imageUrl={ imageUrl}/>
      <CartItemDetails>
        <CartItemName>{name}</CartItemName>
        <span className='price'>
          {quantity} x ${price}
        </span>
      </CartItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
