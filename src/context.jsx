import React from 'react';
import { detailProduct, storeProducts } from './data';

export const ProductContext = React.createContext();

function ProductProvider({ children }) {
  const [products, setProducts] = React.useState(storeProducts);
  const [valueDetail, setValueDetail] = React.useState(detailProduct);
  const [cart, setCart] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalProduct, setModalProduct] = React.useState(detailProduct);
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
    let tempProducts = [...products];
    const index = tempProducts.indexOf(getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    setProducts(tempProducts);
    setCart([...cart, product]);
  };
  // console.log('products: ', products);
  // console.log('cart:', cart);

  const openModal = (id) => {
    const product = getItem(id);
    setModalProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ProductContext.Provider
      value={{
        modalOpen,
        modalProduct,
        valueDetail,
        products,
        handleDetail,
        addToCart,
        openModal,
        closeModal,
      }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
