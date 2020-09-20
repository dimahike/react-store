import React from 'react';

import Product from './Product';
import Title from './Title';
import { ProductContext } from '../context';

function ProductList() {
  const { valueStore } = React.useContext(ProductContext);

  // console.log('cont', valueStore);
  return (
    <>
      <div className="py-5">
        <div className="container">
          <Title name="our " title="products" />
          <div className="row">
            {valueStore.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;
