import React from 'react';
import { detailProduct, storeProducts } from './data';

export const ProductContext = React.createContext();

function ProductProvider({ children }) {
  const [products, setProducts] = React.useState(storeProducts);
  const [valueDetail, setValueDetail] = React.useState(detailProduct);
  // console.log('data from context', { product, valueDetail });

  React.useEffect(() => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    setProducts(tempProducts);
  }, []);

  const getItem = (id) => {
    const product = products.find((item) => item.id === id);
    return product;
  };

  const handleDetail = (id) => {
    const product = getItem(id);
    setValueDetail(product);
  };

  const addToCart = (id) => {
    console.log(`hello from add to Cart. id is ${id}`);
  };

  return (
    <ProductContext.Provider value={{ valueDetail, products, handleDetail, addToCart }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
