import ShippingForm from '../components/ShippingForm.jsx';
import PaymentMethod from '../components/PaymentsMethod.jsx';
import HeroBannerCheckout from '../components/HeroBannerChechout.jsx';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { createOrder, createOrderItems } from '../services/orderService';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../services/cartService';
import OrderSummary from '../components/OrderSummary';

export default function ChechoutPage({ cartItems, setCartItems }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  
  const subtotal = cartItems.reduce(
  (acc, item) => acc + Number(item.price) * item.quantity,
  0
);

const shipping = 0;
const tax = subtotal * 0.07;
const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user) {
    alert('Please log in before placing an order.');
    return;
  }

  try {
    const order = await createOrder(user.id, {
      ...formData,
      subtotal,
      shipping,
      tax,
      total,
      paymentMethod,
    });

    await createOrderItems(order.id, cartItems);

    await clearCart(user.id);

    navigate(`/order-success/${order.id}`);
  } catch (error) {
    console.error('Checkout error:', error);
    alert(error.message);
  }
};

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-800 antialiased pb-16">
    
    
      <HeroBannerCheckout />

      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            
            <div className="lg:col-span-7 xl:col-span-8">
              <ShippingForm
                formData={formData}
                onChange={handleInputChange}
              />
              <PaymentMethod
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                cardDetails={cardDetails}
                onChange={handleCardChange}
                onSubmit={handleSubmit}
                subtotal={subtotal}
              />
            </div>

            
            <div className="lg:col-span-5 xl:col-span-4">
              <OrderSummary
                items={cartItems}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
              />
            </div>

          </div>
        </form>
      </main>
    </div>
  );
}
