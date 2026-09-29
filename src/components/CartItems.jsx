import React, { useState } from 'react';
import { X, Trash, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

import {
  updateCartQuantity,
  deleteCartItem,
  clearCart
} from '../services/cartService';

const CartItems = ({ cartItems, setCartItems }) => {
  const { user } = useAuth();

  const [errors, setErrors] = useState({});

  // REMOVE ONE ITEM
  const removeItem = async (id) => {
    if (!user) return;

    const itemToRemove = cartItems.find(
      item => item.id === id
    );

    if (!itemToRemove) return;

    setErrors(prev => ({
      ...prev,
      [id]: ''
    }));

    // Remove from UI immediately
    setCartItems(
      cartItems.filter(item => item.id !== id)
    );

    try {
      await deleteCartItem(user.id, id);
    } catch (error) {
      // Restore item if Supabase fails
      setCartItems(cartItems);

      setErrors(prev => ({
        ...prev,
        [id]: error.message
      }));
    }
  };


  // INCREASE QUANTITY
  const increaseQuantity = async (id) => {
    const item = cartItems.find(
      item => item.id === id
    );

    if (!item || !user) return;

    // Product is currently out of stock
    if (Number(item.stock) <= 0) {
      return;
    }

    // Clear previous error
    setErrors(prev => ({
      ...prev,
      [id]: ''
    }));

    // Check stock
    if (item.quantity >= item.stock) {
      setErrors(prev => ({
        ...prev,
        [id]: `Only ${item.stock} item${
          item.stock === 1 ? '' : 's'
        } available in stock.`
      }));

      return;
    }

    const oldQuantity = item.quantity;
    const newQuantity = oldQuantity + 1;

    // Update UI immediately
    setCartItems(
      cartItems.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity
            }
          : item
      )
    );

    try {
      await updateCartQuantity(
        user.id,
        id,
        newQuantity
      );
    } catch (error) {
      // Restore old quantity
      setCartItems(
        cartItems.map(item =>
          item.id === id
            ? {
                ...item,
                quantity: oldQuantity
              }
            : item
        )
      );

      setErrors(prev => ({
        ...prev,
        [id]: error.message
      }));
    }
  };


  // DECREASE QUANTITY
  const decreaseQuantity = async (id) => {
    const item = cartItems.find(
      item => item.id === id
    );

    if (!item || !user) return;

    // Product is currently out of stock
    if (Number(item.stock) <= 0) {
      return;
    }

    const oldQuantity = item.quantity;

    const newQuantity = Math.max(
      1,
      oldQuantity - 1
    );

    // Already at 1
    if (newQuantity === oldQuantity) return;

    setErrors(prev => ({
      ...prev,
      [id]: ''
    }));

    // Update UI immediately
    setCartItems(
      cartItems.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity
            }
          : item
      )
    );

    try {
      await updateCartQuantity(
        user.id,
        id,
        newQuantity
      );
    } catch (error) {
      // Restore old quantity
      setCartItems(
        cartItems.map(item =>
          item.id === id
            ? {
                ...item,
                quantity: oldQuantity
              }
            : item
        )
      );

      setErrors(prev => ({
        ...prev,
        [id]: error.message
      }));
    }
  };


  // CLEAR CART
  const handleClearCart = async () => {
    if (!user) return;

    setErrors(prev => ({
      ...prev,
      cart: ''
    }));

    try {
      await clearCart(user.id);

      setCartItems([]);

      setErrors({});
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        cart: error.message
      }));
    }
  };


  return (
    <div className="px-6 lg:border-2 border-gray-200 lg:shadow lg:py-4 rounded mb-4">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">

        <h2 className="font-bold">
          Cart Items
        </h2>

        <button
          type="button"
          onClick={handleClearCart}
          className="text-red-400 font-medium text-[10px] flex items-center gap-1"
        >
          <Trash size={10} />
          Clear Cart
        </button>

      </div>


      {/* CART ERROR */}
      {errors.cart && (
        <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
          <p className="text-xs font-medium text-red-600">
            {errors.cart}
          </p>
        </div>
      )}


      <div className="flex flex-col">

        {cartItems.length === 0 ? (

          <div className="py-10 text-center">
            <p className="text-slate-400 text-sm">
              Your cart is empty
            </p>
          </div>

        ) : (

          cartItems.map((ci) => {

            const isOutOfStock =
              Number(ci.stock) <= 0;

            /*
              Display quantity as 0 when the product
              is no longer available.
            */
            const displayQuantity = isOutOfStock
              ? 0
              : ci.quantity;

            return (
              <div
                key={ci.id}
                className={`flex space-x-3 border-b border-gray-200 items-center justify-between transition-opacity duration-200 ${
                  isOutOfStock
                    ? 'opacity-40'
                    : 'opacity-100'
                }`}
              >

                {/* PRODUCT INFO */}
                <Link
                  to={`/product/${ci.id}`}
                  className="flex space-x-4 items-center group"
                >

                  {/* IMAGE */}
                  <div className="bg-slate-100 w-24 h-24 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">

                    <img
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                      src={ci.image}
                      alt={ci.title}
                    />

                  </div>


                  {/* DETAILS */}
                  <div className="flex flex-col py-6">

                    <h2 className="font-bold group-hover:text-blue-600 transition-colors">
                      {ci.title}
                    </h2>

                    <p className="font-extralight text-[10px]">
                      {ci.category}
                    </p>


                    {/* RATING */}
                    <div className="flex items-center text-[10px]">

                      <div className="flex">

                        {[...Array(5)].map((_, i) => (

                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.round(ci.rating)
                                ? 'fill-current text-amber-400'
                                : 'text-slate-300'
                            }`}
                          />

                        ))}

                      </div>

                      <span className="ml-1">
                        {ci.rating} ({ci.reviews})
                      </span>

                    </div>


                    {/* PRICE */}
                    <h1 className="font-bold text-blue-600">
                      ₦
                      {Number(ci.price).toLocaleString(
                        'en-NG',
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    </h1>


                    {/* STOCK */}
                    {isOutOfStock ? (

                      <p className="mt-1 text-[10px] font-semibold text-red-500">
                        Out of stock
                      </p>

                    ) : (

                      <p
                        className={`mt-1 text-[10px] font-medium ${
                          ci.quantity >= ci.stock
                            ? 'text-orange-600'
                            : 'text-green-600'
                        }`}
                      >
                        {ci.quantity >= ci.stock
                          ? `Maximum available: ${ci.stock}`
                          : `${ci.stock} available in stock`}
                      </p>

                    )}

                  </div>

                </Link>


                {/* QUANTITY + REMOVE */}
                <div className="flex flex-col items-end">

                  <div className="flex items-center space-x-3">

                    {/* QUANTITY */}
                    <div
                      className={`flex items-center rounded-lg border bg-white ${
                        isOutOfStock
                          ? 'cursor-not-allowed'
                          : ''
                      }`}
                    >

                      <button
                        type="button"
                        onClick={() =>
                          decreaseQuantity(ci.id)
                        }
                        disabled={
                          isOutOfStock ||
                          ci.quantity <= 1
                        }
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        -
                      </button>


                      <span className="px-4 py-1 text-sm font-medium">
                        {displayQuantity}
                      </span>


                      <button
                        type="button"
                        onClick={() =>
                          increaseQuantity(ci.id)
                        }
                        disabled={
                          isOutOfStock ||
                          ci.quantity >= ci.stock
                        }
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        +
                      </button>

                    </div>


                    {/* REMOVE */}
                    <button
                      type="button"
                      onClick={() =>
                        removeItem(ci.id)
                      }
                      className="text-slate-400 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>

                  </div>


                  {/* PRODUCT ERROR */}
                  {errors[ci.id] && (
                    <p className="mt-2 max-w-48 text-right text-xs font-medium text-red-500">
                      {errors[ci.id]}
                    </p>
                  )}

                </div>

              </div>
            );
          })

        )}

      </div>

    </div>
  );
};

export default CartItems;