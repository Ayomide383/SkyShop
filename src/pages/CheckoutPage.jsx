import ShippingForm from '../components/ShippingForm.jsx';
import PaymentMethod from '../components/PaymentsMethod.jsx';
import HeroBannerCheckout from '../components/HeroBannerChechout.jsx';
import React, { useState } from 'react';
import OrderSummary from '../components/OrderSummary';

export default function ChechoutPage({ cartItems, setCartItems }) {

  

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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
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
