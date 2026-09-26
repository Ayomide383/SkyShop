import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getOrderById } from '../services/orderService';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const { user } = useAuth();

  const [order, setOrder] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

useEffect(() => {
  const loadOrder = async () => {
    if (!user || !orderId) return;

    try {
      const data = await getOrderById(user.id, orderId);
      setOrder(data);
    } catch (error) {
      console.error('Load order error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  loadOrder();
}, [user, orderId]);

  if (loading) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <p className="text-slate-500 font-medium">
        Loading your order...
      </p>
    </div>
  );
}

if (error || !order) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-xl font-bold text-slate-900">
          Order not found
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          We couldn't load this order.
        </p>
      </div>
    </div>
  );
}
  
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-3xl">✓</span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          Order placed successfully!
        </h1>
        <p className="text-sm text-slate-500 mt-2">
  Order #{orderId}
</p>


        <p className="text-sm text-slate-500 mt-1">
  Total: ₦{Number(order.total).toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
</p>

        <p className="text-sm text-slate-500 mt-1">
  Ordered on{' '}
  {new Date(order.created_at).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })}
</p>
        <p className="text-sm text-slate-500 mt-1">
  Status:{' '}
  <span className="font-semibold text-amber-600 capitalize">
    {order.order_status}
  </span>
</p>

        <p className="text-sm text-slate-500 mt-1">
  Payment:{' '}
  <span className="font-semibold text-amber-600 capitalize">
    {order.payment_status}
  </span>
</p>

        
        <p className="text-sm text-slate-500 mt-3">
          Thank you for shopping with SkyShop. Your order has been received.
        </p>
      </div>
    </div>
  );
}