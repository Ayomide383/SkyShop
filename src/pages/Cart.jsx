import CartSummary from '../components/CartSummary.jsx';
import CartItems from '../components/CartItems.jsx';
import HeroBannerCart from '../components/HeroBannerCart.jsx';
import React from 'react'

const Cart = ({ cartItems, setCartItems }) => {
  return (
    <div className="lg:px-8">
      <div className="mb-8">
        <HeroBannerCart />
      </div>
      <div className="grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 w-full">
          <CartItems
  cartItems={cartItems}
  setCartItems={setCartItems}
/>
        </div>
        <div className="lg:col-span-4 w-full ">
          <CartSummary cartItems={cartItems}/>
        </div>
      </div>
    </div>
  )
}

export default Cart