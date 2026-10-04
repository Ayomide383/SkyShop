import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  ShoppingCart,
  Users,
  Clock,
  ArrowRight,
  Star,
  TrendingUp,
  AlertCircle,
  Truck,
  CheckCircle,
  XCircle,
} from 'lucide-react';

import {
  getProductCount,
  getOrderCount,
  getPendingOrderCount,
  getCustomerCount,
  getOrderStatusCounts,
  getAllOrders,
  getAllReviews,
  getAdminDashboardStats,
} from '../services/adminService';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [pendingOrderCount, setPendingOrderCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const [orderStatusCounts, setOrderStatusCounts] = useState({
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadDashboardData = async () => {
    try {
      const stats = await getAdminDashboardStats();

      setProductCount(stats.products ?? 0);
      setOrderCount(stats.orders ?? 0);
      setPendingOrderCount(stats.pending_orders ?? 0);
      setCustomerCount(stats.customers ?? 0);
      setReviewCount(stats.reviews ?? 0);

      setOrderStatusCounts({
        pending: stats.order_status?.pending ?? 0,
        processing: stats.order_status?.processing ?? 0,
        shipped: stats.order_status?.shipped ?? 0,
        delivered: stats.order_status?.delivered ?? 0,
        cancelled: stats.order_status?.cancelled ?? 0,
      });

      const allOrders = await getAllOrders();

      setRecentOrders(
        Array.isArray(allOrders)
          ? allOrders.slice(0, 5)
          : []
      );

    } catch (error) {
      console.error('Load dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  loadDashboardData();
}, []);

  
  const formatCurrency = (amount) => {
    return `₦${Number(amount || 0).toLocaleString(
      'en-NG',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      'en-NG',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }
    );
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';

      case 'processing':
        return 'bg-sky-100 text-sky-700';

      case 'shipped':
        return 'bg-purple-100 text-purple-700';

      case 'delivered':
        return 'bg-green-100 text-green-700';

      case 'cancelled':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock size={17} />;

      case 'processing':
        return <Clock size={17} />;

      case 'shipped':
        return <Truck size={17} />;

      case 'delivered':
        return <CheckCircle size={17} />;

      case 'cancelled':
        return <XCircle size={17} />;

      default:
        return <AlertCircle size={17} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-sky-500" />

          <p className="text-sm font-medium text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Here's what's happening with your
              SkyShop store.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate('/admin/orders')
            }
            className="flex w-fit items-center gap-2 rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600"
          >
            Manage Orders
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {/* Products */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Products
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {productCount}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100">
                <Package
                  className="text-sky-600"
                  size={21}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate('/admin/products')
              }
              className="mt-4 flex items-center gap-1 text-xs font-medium text-sky-600 hover:text-sky-700"
            >
              Manage products
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Orders */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Orders
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {orderCount}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100">
                <ShoppingCart
                  className="text-purple-600"
                  size={21}
                />
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              Total orders received
            </p>
          </div>

          {/* Customers */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Customers
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {customerCount}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
                <Users
                  className="text-green-600"
                  size={21}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate('/admin/customers')
              }
              className="mt-4 flex items-center gap-1 text-xs font-medium text-sky-600 hover:text-sky-700"
            >
              View customers
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Reviews */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Reviews
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {reviewCount}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100">
                <Star
                  className="fill-current text-amber-500"
                  size={21}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate('/admin/reviews')
              }
              className="mt-4 flex items-center gap-1 text-xs font-medium text-sky-600 hover:text-sky-700"
            >
              Manage reviews
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="mt-6 rounded-2xl border border-yellow-100 bg-yellow-50 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-100">
                <Clock
                  className="text-yellow-600"
                  size={22}
                />
              </div>

              <div>
                <p className="text-sm font-medium text-yellow-800">
                  Pending Orders
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {pendingOrderCount}
                </p>

                <p className="text-xs text-slate-500">
                  Orders awaiting processing
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate('/admin/orders')
              }
              className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-yellow-700 shadow-sm ring-1 ring-yellow-200 hover:bg-yellow-100"
            >
              Review orders
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Order Status */}
        <div className="mt-8">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Order Status
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Overview of your current orders.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

            {/* Pending */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  Pending
                </p>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
                  <Clock size={18} />
                </div>
              </div>

              <h2 className="mt-3 text-2xl font-bold text-slate-900">
                {orderStatusCounts.pending}
              </h2>
            </div>

            {/* Processing */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  Processing
                </p>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
                  <Clock size={18} />
                </div>
              </div>

              <h2 className="mt-3 text-2xl font-bold text-slate-900">
                {orderStatusCounts.processing}
              </h2>
            </div>

            {/* Shipped */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  Shipped
                </p>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <Truck size={18} />
                </div>
              </div>

              <h2 className="mt-3 text-2xl font-bold text-slate-900">
                {orderStatusCounts.shipped}
              </h2>
            </div>

            {/* Delivered */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  Delivered
                </p>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <CheckCircle size={18} />
                </div>
              </div>

              <h2 className="mt-3 text-2xl font-bold text-slate-900">
                {orderStatusCounts.delivered}
              </h2>
            </div>

            {/* Cancelled */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  Cancelled
                </p>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-red-600">
                  <XCircle size={18} />
                </div>
              </div>

              <h2 className="mt-3 text-2xl font-bold text-slate-900">
                {orderStatusCounts.cancelled}
              </h2>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">

          {/* Header */}
          <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent Orders
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest customer orders.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate('/admin/orders')
              }
              className="flex w-fit items-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-700"
            >
              View all
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Orders */}
          {recentOrders.length === 0 ? (
            <div className="p-10 text-center">
              <ShoppingCart
                className="mx-auto text-slate-300"
                size={35}
              />

              <p className="mt-3 text-sm font-medium text-slate-500">
                No orders yet.
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Customer orders will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px]">
                <thead>
                  <tr className="border-b border-slate-100 text-left">
                    <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-500">
                      Order
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-500">
                      Customer
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-500">
                      Total
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-500">
                      Date
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => {
                    const status =
                      order.order_status ||
                      'unknown';

                    return (
                      <tr
                        key={order.id}
                        className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
                      >
                        {/* Order */}
                        <td className="px-5 py-4">
                          <p className="text-sm font-semibold text-slate-900">
                            #{order.id}
                          </p>
                        </td>

                        {/* Customer */}
                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-slate-700">
                            {order.full_name ||
                              'Customer'}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            {order.email ||
                              'No email'}
                          </p>
                        </td>

                        {/* Total */}
                        <td className="px-5 py-4">
                          <p className="text-sm font-semibold text-slate-900">
                            {formatCurrency(
                              order.total
                            )}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                              status
                            )}`}
                          >
                            {getStatusIcon(status)}

                            {status
                              .charAt(0)
                              .toUpperCase() +
                              status.slice(1)}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-5 py-4">
                          <p className="text-sm text-slate-500">
                            {formatDate(
                              order.created_at
                            )}
                          </p>
                        </td>

                        {/* Action */}
                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/admin/orders/${order.id}`
                              )
                            }
                            className="text-xs font-semibold text-sky-600 hover:text-sky-700"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                           </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-slate-900">
            Quick Actions
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <button
              type="button"
              onClick={() =>
                navigate('/admin/products/add')
              }
              className="group rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
            >
              <Package
                className="text-sky-500"
                size={22}
              />

              <p className="mt-3 font-semibold text-slate-900">
                Add Product
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Add a new product to your store.
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                navigate('/admin/orders')
              }
              className="group rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
            >
              <ShoppingCart
                className="text-purple-500"
                size={22}
              />

              <p className="mt-3 font-semibold text-slate-900">
                Manage Orders
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Review and update customer orders.
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                navigate('/admin/customers')
              }
              className="group rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
            >
              <Users
                className="text-green-500"
                size={22}
              />

              <p className="mt-3 font-semibold text-slate-900">
                Customers
              </p>

              <p className="mt-1 text-xs text-slate-500">
                View and manage your customers.
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                navigate('/admin/reviews')
              }
              className="group rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
            >
              <Star
                className="fill-current text-amber-500"
                size={22}
              />

              <p className="mt-3 font-semibold text-slate-900">
                Reviews
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Manage customer product reviews.
              </p>
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}