import React from 'react';
import { detailProduct, storeProducts } from './data';

export const ProductContext = React.createContext();

function ProductProvider({ children }) {
  const [valueStore, setValueStore] = React.useState(storeProducts);
  const [valueDetail, setValueDetail] = React.useState(detailProduct);
  // console.log('data from context', { valueStore, valueDetail });

  const handleDetail = () => {
    console.log('hello from detail');
  };

  const addCart = () => {
    console.log('hello from add to Cart');
  };
  
  return (
    <ProductContext.Provider value={{ valueDetail, valueStore, handleDetail, addCart }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
