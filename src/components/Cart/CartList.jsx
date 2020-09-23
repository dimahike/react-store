import React from 'react';
import CartItem from './CartItem';

function CartList({ cart }) {
  console.log('cart from cartList: ', cart);

  return (
    <div className="container-fluid">
      {cart.map((item) => (
        <CartItem key={`cart_list_${item.id}`} item={item} />
      ))}
    </div>
  );
}

export default CartList;
