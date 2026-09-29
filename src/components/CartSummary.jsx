import React from 'react';
import { ArrowRight, ShieldLock } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartSummary = ({ cartItems }) => {

  // Only products that are currently in stock
  // should be included in the order calculation.
  const availableCartItems = cartItems.filter(
    item => Number(item.stock) > 0
  );

  const totalItemCount = availableCartItems.reduce(
    (total, item) => total + Number(item.quantity),
    0
  );

  const subtotal = availableCartItems.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  const tax = subtotal * 0.07;

  const total = subtotal + tax;

  return (
    <div className="py-6 lg:border border-gray-200 lg:shadow">

      <div className="flex flex-col px-8 space-y-3">

        <h1 className="font-bold text-2xl">
          Order Summary
        </h1>

        <div className="flex flex-col bg-sky-100 space-y-2 p-4 rounded">

          {/* Subtotal */}
          <div className="flex items-center justify-between">

            <p>
              Subtotal ({totalItemCount} items)
            </p>

            <p className="font-bold">
              ₦
              {subtotal.toLocaleString('en-NG', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>

          </div>


          {/* Shipping */}
          <div className="flex items-center justify-between">

            <p>
              Shipping
            </p>

            <p className="font-bold text-sky-600">
              Free
            </p>

          </div>


          {/* Tax */}
          <div className="flex items-center justify-between">

            <p>
              Tax (7%)
            </p>

            <p className="font-bold">
              ₦
              {tax.toLocaleString('en-NG', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>

          </div>


          <hr />


          {/* Total */}
          <div className="flex items-center justify-between">

            <h2 className="font-bold">
              Total
            </h2>

            <h1 className="font-extrabold text-sky-600 text-xl">
              ₦
              {total.toLocaleString('en-NG', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h1>

          </div>

        </div>


        {/* Checkout */}
        <Link to="/Checkout">
          <button
            type="button"
            className="bg-blue-500 w-full p-4 rounded-md text-white font-extrabold flex items-center justify-center space-x-2 disabled:bg-slate-300 disabled:cursor-not-allowed"
            disabled={subtotal === 0 || subtotal < 10}
          >
            <ShieldLock />
            <span>Proceed to Checkout</span>
            <ArrowRight />
          </button>
        </Link>

      </div>

    </div>
  );
};

export default CartSummary;