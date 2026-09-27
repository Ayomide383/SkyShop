import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  ShoppingCart,
  Users,
  Clock,
  ArrowRight,
} from 'lucide-react';

import {
  getProductCount,
  getOrderCount,
  getPendingOrderCount,
  getCustomerCount,
  getOrderStatusCounts,
  getAllOrders,
} from '../services/adminService';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [pendingOrderCount, setPendingOrderCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);

  const [orderStatusCounts, setOrderStatusCounts] = useState({
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const count = await getProductCount();
        setProductCount(count);

        const orders = await getOrderCount();
        setOrderCount(orders);

        const pendingOrders = await getPendingOrderCount();
        setPendingOrderCount(pendingOrders);

        const customers = await getCustomerCount();
        setCustomerCount(customers);

        const statusCounts = await getOrderStatusCounts();
        setOrderStatusCounts(statusCounts);

        const allOrders = await getAllOrders();

        setRecentOrders(allOrders.slice(0, 5));
      } catch (error) {
        console.error('Load dashboard error:', error);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Here's what's happening with your SkyShop store.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 mt-8">

          {/* Products */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Products
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-2">
                  {productCount}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-sky-100 flex items-center justify-center">
                <Package
                  className="text-sky-600"
                  size={21}
                />
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4">
              Total products in store
            </p>
          </div>

          {/* Orders */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Orders
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-2">
                  {orderCount}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-sky-100 flex items-center justify-center">
                <ShoppingCart
                  className="text-sky-600"
                  size={21}
                />
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4">
              Total orders received
            </p>
          </div>

          {/* Customers */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Customers
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-2">
                  {customerCount}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-sky-100 flex items-center justify-center">
                <Users
                  className="text-sky-600"
                  size={21}
                />
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4">
              Registered customers
            </p>
          </div>

          {/* Pending Orders */}
          <div className="lg:col-span-12 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Pending Orders
                </p>

                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  {pendingOrderCount}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">
                <Clock
                  className="text-sky-600"
                  size={23}
                />
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4">
              Orders awaiting processing
            </p>
          </div>

        </div>

        {/* Order Status */}
        <div className="mt-8">

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Order Status
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Overview of your current orders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">

            {/* Processing */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Processing
                  </p>
            
                  <h2 className="text-2xl font-bold text-slate-900 mt-2">
                    {orderStatusCounts.processing}
                  </h2>
                </div>
            
                <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center">
                  <Clock className="text-sky-600" size={19} />
                </div>
              </div>
            </div>

            {/* Shipped */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Shipped
                  </p>
            
                  <h2 className="text-2xl font-bold text-slate-900 mt-2">
                    {orderStatusCounts.shipped}
                  </h2>
                </div>
            
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Package className="text-purple-600" size={19} />
                </div>
              </div>
            </div>

            {/* Delivered */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Delivered
                  </p>
            
                  <h2 className="text-2xl font-bold text-slate-900 mt-2">
                    {orderStatusCounts.delivered}
                  </h2>
                </div>
            
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <Package className="text-green-600" size={19} />
                </div>
              </div>
            </div>

            {/* Cancelled */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Cancelled
                  </p>
            
                  <h2 className="text-2xl font-bold text-slate-900 mt-2">
                    {orderStatusCounts.cancelled}
                  </h2>
                </div>
            
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <Package className="text-red-600" size={19} />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Recent Orders */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

          {/* Section Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent Orders
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Your latest customer orders.
              </p>
            </div>

            <button
            type="button"
            onClick={() => navigate('/admin/orders')}
            className="flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-700" >
            View all
            <ArrowRight size={16} />
          </button>
          </div>

          {/* Orders */}
          {recentOrders.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-slate-500">
                No orders yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-100 text-left">
                    <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Order
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Customer
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Total
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Status
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-slate-900">
                          #{order.id}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-700">
                          {order.full_name}
                        </p>

                        <p className="text-xs text-slate-400">
                          {order.email}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-slate-900">
                          ₦{Number(order.total).toLocaleString('en-NG', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                              order.order_status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : order.order_status === 'processing'
                                ? 'bg-sky-100 text-sky-700'
                                : order.order_status === 'shipped'
                                ? 'bg-purple-100 text-purple-700'
                                : order.order_status === 'delivered'
                                ? 'bg-green-100 text-green-700'
                                : order.order_status === 'cancelled'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {order.order_status.charAt(0).toUpperCase() +
                              order.order_status.slice(1)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-500">
                          {new Date(order.created_at).toLocaleDateString('en-NG')}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}