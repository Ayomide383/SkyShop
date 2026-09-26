import React from 'react';
import { X, Trash, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import {
  updateCartQuantity,
  deleteCartItem,
  clearCart
} from '../services/cartService';

const CartItems = ({ cartItems, setCartItems }) => {
  const { user } = useAuth();

  // REMOVE ONE ITEM
  const removeItem = async (id) => {
  if (!user) return;

  const itemToRemove = cartItems.find(item => item.id === id);

  if (!itemToRemove) return;

  // Remove from UI immediately
  setCartItems(
    cartItems.filter(item => item.id !== id)
  );

  try {
    await deleteCartItem(user.id, id);
  } catch (error) {
    // Restore the item if Supabase fails
    setCartItems(cartItems);
    alert(error.message);
  }
};

  // INCREASE QUANTITY
  const increaseQuantity = async (id) => {
  const item = cartItems.find(item => item.id === id);

  if (!item || !user) return;

  const oldQuantity = item.quantity;
  const newQuantity = oldQuantity + 1;

  // Update UI immediately
  setCartItems(
    cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: newQuantity }
        : item
    )
  );

  try {
    await updateCartQuantity(user.id, id, newQuantity);
  } catch (error) {
    // Restore old quantity if Supabase fails
    setCartItems(
      cartItems.map(item =>
        item.id === id
          ? { ...item, quantity: oldQuantity }
          : item
      )
    );

    alert(error.message);
  }
};

  // DECREASE QUANTITY
  const decreaseQuantity = async (id) => {
  const item = cartItems.find(item => item.id === id);

  if (!item || !user) return;

  const oldQuantity = item.quantity;
  const newQuantity = Math.max(1, oldQuantity - 1);

  // Already at 1
  if (newQuantity === oldQuantity) return;

  // Update UI immediately
  setCartItems(
    cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: newQuantity }
        : item
    )
  );

  try {
    await updateCartQuantity(user.id, id, newQuantity);
  } catch (error) {
    // Restore old quantity if Supabase fails
    setCartItems(
      cartItems.map(item =>
        item.id === id
          ? { ...item, quantity: oldQuantity }
          : item
      )
    );

    alert(error.message);
  }
};

  // CLEAR CART
  const handleClearCart = async () => {
  if (!user) return;

  try {
    await clearCart(user.id);

    setCartItems([]);
  } catch (error) {
    alert(error.message);
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


      <div className="flex flex-col">

  {cartItems.length === 0 ? (

          <div className="py-10 text-center">
            <p className="text-slate-400 text-sm">
              Your cart is empty
            </p>
          </div>

        ) : (

          cartItems.map((ci) => (

            <div
              key={ci.id}
              className="flex space-x-3 border-b border-gray-200 items-center justify-between"
            >

              {/* PRODUCT INFO */}
              <div className="flex space-x-4 items-center">

                <div className="bg-slate-100 w-24 h-24 rounded-lg flex items-center justify-center shrink-0">

                  <img className="" src={ci.image} alt="" />

                </div>


                <div className="flex flex-col py-6">

                  <h2 className="font-bold">
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


                  <h1 className="font-bold text-blue-600">
                    ₦{Number(ci.price).toLocaleString('en-NG', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}
                  </h1>

                </div>

              </div>


              {/* QUANTITY + REMOVE */}
              <div className="flex items-center space-x-3">

                <div className="flex items-center rounded-lg border bg-white">

                  <button
                    type="button"
                    onClick={() => decreaseQuantity(ci.id)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>


                  <span className="px-4 py-1 text-sm font-medium">
                    {ci.quantity}
                  </span>


                  <button
                    type="button"
                    onClick={() => increaseQuantity(ci.id)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>

                </div>


                {/* REMOVE */}
                <button
                  type="button"
                  onClick={() => removeItem(ci.id)}
                  className="text-slate-400 hover:text-red-500"
                >
                  <X size={14} />
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default CartItems;