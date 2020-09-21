import React from 'react';

import Product from './Product';
import Title from './Title';
import { ProductContext } from '../context';

function ProductList() {
  const { products } = React.useContext(ProductContext);

  // console.log('cont', products);
  return (
    <>
      <div className="py-5">
        <div className="container">
          <Title name="our " title="products" />
          <div className="row">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;
