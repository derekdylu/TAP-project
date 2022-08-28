import * as React from 'react';

import CartItem from './CartItem'

const Cart = () => {
  return (
    <>
      <div>Cart</div>
      <CartItem name="嚴選胡蘿波" cuisines={["aaaa", "ccc"]} type="cart" added={false} />
    </>
  )
}

export default Cart