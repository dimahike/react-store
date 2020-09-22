import React from 'react';
import Title from '../Title';
import CartColumns from './CartColumns';

function Cart() {
  return (
    <section>
      <Title name="your " title="cart" />
      <CartColumns />
    </section>
  );
}

export default Cart;
