import React, { useState } from 'react';
import {
  ShoppingCart,
  Truck,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';

export default function BuyBoxCard({ onAddToCart, product }) {
  const [quantity, setQuantity] = useState(1);

  const stock = product?.stock ?? 0;
  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= 5;

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) return;

    if (onAddToCart) {
      onAddToCart(product, quantity);
    }
  };

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  return (
    <div className="rounded-2xl border bg-gray-50 p-6 space-y-5">

      {/* Price */}
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          Price
        </p>

        <p className="mt-1 text-2xl font-bold text-gray-900">
          ₦{Number(product?.price || 0).toLocaleString()}
        </p>
      </div>

      <hr className="border-gray-200" />

      {/* Stock Status */}
      <div>
        {isOutOfStock ? (
          <div className="rounded-lg bg-red-50 px-3 py-2">
            <p className="text-sm font-semibold text-red-600">
              Out of Stock
            </p>
            <p className="mt-0.5 text-xs text-red-500">
              This product is currently unavailable.
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isLowStock ? 'bg-orange-500' : 'bg-green-500'
              }`}
            />

            <p
              className={`text-sm font-semibold ${
                isLowStock ? 'text-orange-600' : 'text-green-600'
              }`}
            >
              {stock} available in stock
            </p>
          </div>
        )}
      </div>

      {/* Quantity */}
      {!isOutOfStock && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">
            Quantity:
          </span>

          <div className="flex items-center rounded-lg border bg-white">
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              -
            </button>

            <span className="min-w-10 px-3 py-1 text-center text-sm font-medium">
              {quantity}
            </span>

            <button
              type="button"
              onClick={increaseQuantity}
              disabled={quantity >= stock}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Add to Cart */}
      <button
        type="button"
        disabled={isOutOfStock}
        className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white shadow ${
          isOutOfStock
            ? 'cursor-not-allowed bg-gray-400'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        onClick={handleAddToCartClick}
      >
        <ShoppingCart className="h-4 w-4" />

        {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
      </button>

      <hr className="my-4 border-gray-200" />

      {/* Benefits */}
      <div className="space-y-4 text-xs text-gray-600">

        <div className="flex items-start gap-3">
          <Truck className="h-4 w-4 shrink-0 text-gray-500" />

          <div>
            <p className="font-semibold text-gray-800">
              Free Shipping
            </p>

            <p className="text-gray-500">
              On orders over ₦50,000
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <RotateCcw className="h-4 w-4 shrink-0 text-gray-500" />

          <div>
            <p className="font-semibold text-gray-800">
              Easy Returns
            </p>

            <p className="text-gray-500">
              3-7 days return policy
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <ShieldCheck className="h-4 w-4 shrink-0 text-gray-500" />

          <div>
            <p className="font-semibold text-gray-800">
              Secure Payment
            </p>

            <p className="text-gray-500">
              100% secure checkout
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}