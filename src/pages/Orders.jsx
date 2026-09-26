import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { getUserOrders } from '../services/orderService';
import { Link } from 'react-router-dom';

export default function Orders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  const loadOrders = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const data = await getUserOrders(user.id);
      setOrders(data);
    } catch (error) {
      console.error('Load orders error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  loadOrders();
}, [user]);

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-slate-500 font-medium">
        Loading your orders...
      </p>
    </div>
  );
}

if (error) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-xl font-bold text-slate-900">
          Something went wrong
        </h1>

        <p className="text-sm text-red-500 mt-2">
          {error}
        </p>
      </div>
    </div>
  );
}

return (
  <div className="min-h-screen bg-slate-50 px-4 py-8">
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900">
        My Orders
      </h1>

      <p className="text-sm text-slate-500 mt-1">
        View your previous orders and their status.
      </p>


      <div className="mt-6">
  {orders.length === 0 ? (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center">
      <div className="text-4xl mb-3">
        📦
      </div>

      <h2 className="text-lg font-bold text-slate-900">
        No orders yet
      </h2>

      <p className="text-sm text-slate-500 mt-2">
        When you place an order, it will appear here.
      </p>
    </div>
  ) : (
    <div className="space-y-4">
      {orders.map((order) => (
         <div
      key={order.id}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-slate-900">
            Order #{order.id}
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            {new Date(order.created_at).toLocaleDateString('en-NG', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        <span className="text-sm font-semibold text-amber-600 capitalize">
          {order.order_status}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
  <div>
    <span className="text-sm text-slate-500">
      Total
    </span>

    <p className="font-bold text-blue-600">
      ₦{Number(order.total).toLocaleString('en-NG', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </p>
  </div>

  <Link
    to={`/orders/${order.id}`}
    className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
  >
    View Details
  </Link>
</div>
    </div>
      ))}
    </div>
  )}
</div>

    </div>
  </div>
);
}