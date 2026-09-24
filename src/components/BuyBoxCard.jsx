import React, { useState } from 'react';
import { ShoppingCart, Zap, Heart, RefreshCw, Truck, RotateCcw, ShieldCheck } from 'lucide-react';


export default function BuyBoxCard( {onAddToCart, product} ) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCartClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    if (onAddToCart) onAddToCart(product, quantity);
  };

  return (
    <div className="rounded-2xl border bg-gray-50 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">Quantity:</span>
        <div className="flex items-center rounded-lg border bg-white">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
          >
            -
          </button>
          <span className="px-4 py-1 text-sm font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      
      <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white shadow hover:bg-blue-700"
        onClick={handleAddToCartClick}>
        <ShoppingCart className="h-4 w-4" /> Add to Cart
      </button>

      {/*}  <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-600 bg-white py-3 font-semibold text-blue-600 hover:bg-blue-50">
        <Zap className="h-4 w-4" /> Buy Now
      </button> 

      <div className="flex justify-between pt-2 text-xs font-medium text-gray-600">
        <button className="flex items-center gap-1 hover:text-blue-600"><Heart className="h-4 w-4" /> Add to Wishlist</button>
        <button className="flex items-center gap-1 hover:text-blue-600"><RefreshCw className="h-4 w-4" /> Compare</button>
      </div> */}

      <hr className="my-4 border-gray-200" />

      
      <div className="space-y-3 text-xs text-gray-600">
        <div className="flex items-start gap-3">
          <Truck className="h-4 w-4 text-gray-500" />
          <div>
            <p className="font-semibold text-gray-800">Free Shipping</p>
            <p className="text-gray-500">On orders over $50</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <RotateCcw className="h-4 w-4 text-gray-500" />
          <div>
            <p className="font-semibold text-gray-800">Easy Returns</p>
            <p className="text-gray-500">3-7 days return policy</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-4 w-4 text-gray-500" />
          <div>
            <p className="font-semibold text-gray-800">Secure Payment</p>
            <p className="text-gray-500">100% secure checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
