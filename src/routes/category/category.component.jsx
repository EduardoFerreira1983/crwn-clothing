import { CategoryContainer, CategoryTitle } from './category.styles';
import { useParams } from 'react-router-dom'; // take the value from shop component shop/category*
import { useContext, useState, useEffect, Fragment } from 'react';

//contexts
import { CategoriesContext } from '../../contexts/categories.context'; 
import ProductCard from '../../components/product-card/product-card.component';

const Category = () => {
  
  const { category } = useParams();
  const { categoriesMap } = useContext( CategoriesContext );
  
  const [ products, setProducts ] = useState( categoriesMap[ category ] );

  useEffect( () => {
    setProducts( categoriesMap[ category ] );
  }, [ category, categoriesMap ] )
  


  return (
    <Fragment>
      <CategoryTitle>{category.toLocaleUpperCase()}</CategoryTitle>
      <CategoryContainer>
        { products && // just render with after the asynchronous function returns
          products.map( ( product ) => (
          <ProductCard product={ product } key={ product.id } />
        ) ) }
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;