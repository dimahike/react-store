import React from 'react';
import { detailProduct, storeProducts } from './data';

export const ProductContext = React.createContext();

function ProductProvider({ children }) {
  const [products, setProducts] = React.useState(storeProducts);
  const [resetProducts, setResetProducts] = React.useState(false);
  const [valueDetail, setValueDetail] = React.useState(detailProduct);
  const [cart, setCart] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalProduct, setModalProduct] = React.useState(detailProduct);
  const [cartSubTotal, setCartSubTotal] = React.useState(0);
  const [cartTax, setCartTax] = React.useState(0);
  const [cartTotal, setCartTotal] = React.useState(0);
  // console.log('data from context', { product, valueDetail });

  console.log('storeProducts', storeProducts);

  React.useEffect(() => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    setProducts(tempProducts);
  }, [resetProducts]);

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

  const increment = (id) => {
    let tempCart = [...cart];
    const index = tempCart.indexOf(getItem(id));
    const product = tempCart[index];
    product.count += 1;
    const price = product.price;
    product.total = price * product.count;
    setCart([...tempCart]);
  };

  const decrement = (id) => {
    let tempCart = [...cart];
    const index = tempCart.indexOf(getItem(id));
    const product = tempCart[index];
    product.count -= 1;
    if (product.count === 0) {
      removeItem(id);
    }
    if (product.count > 0) {
      const price = product.price;
      product.total = price * product.count;
      setCart([...tempCart]);
    } else {
      console.log('something ran wrong in decrement method');
    }
  };

  const removeItem = (id) => {
    let tempProducts = [...products];
    let tempCart = [...cart];
    tempCart = tempCart.filter((item) => item.id !== id);
    const index = tempProducts.indexOf(getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.totel = 0;
    setProducts([...tempProducts]);
    setCart([...tempCart]);
  };

  const clearCart = () => {
    setCart([]);
    setResetProducts(!resetProducts);
  };

  React.useEffect(() => {
    let subTotal = 0;
    cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    setCartSubTotal(subTotal);
    setCartTax(tax);
    setCartTotal(total);
  }, [cart]);

  // const addTotals = () => {
  //   let subTotal = 0;
  //   cart.map((item) => (subTotal += item.total));
  //   const tempTax = subTotal * 0.1;
  //   const tax = parseFloat(tempTax.toFixed(2));
  //   const total = subTotal + tax;
  //   setCartSubTotal(subTotal);
  //   setCartTax(tax);
  //   setCartTotal(total);
  // };

  return (
    <ProductContext.Provider
      value={{
        modalOpen,
        modalProduct,
        valueDetail,
        products,
        cart,
        cartSubTotal,
        cartTax,
        cartTotal,
        handleDetail,
        addToCart,
        openModal,
        closeModal,
        increment,
        decrement,
        removeItem,
        clearCart,
      }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
