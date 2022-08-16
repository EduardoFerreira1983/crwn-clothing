import './product-card.styles.scss';
import { useContext } from 'react';
import Button from '../button/button.component';
import { CartContext } from '../contexts/cart-context';


const ProductCard = ( { product } ) => {
    const { addItemToCart } = useContext( CartContext );
    const { imageUrl, price, name } = product;
    
    const addProductToCard = () => {
        addItemToCart( product );
    };

    return (
        <div className='product-card-container'>
            <img src = {imageUrl} alt={`${name}`}/>
            <div className='footer'>
                <span className='name'>{ name }</span>
                <span className='price'>{ price }</span>
            </div>
            <Button onClick={ addProductToCard }
                buttonType="inverted">
                Add to card
            </Button>
        </div>        
    );

}

export default ProductCard;