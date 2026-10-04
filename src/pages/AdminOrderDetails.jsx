import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Package,
  User,
  MapPin,
  CreditCard,
  Calendar,
  Phone,
  Mail,
} from 'lucide-react';

import {
  getAllOrders,
  updateOrderStatus,
} from '../services/orderService';

export default function AdminOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const orders = await getAllOrders();

        const foundOrder = orders.find(
          (item) => String(item.id) === String(id)
        );

        setOrder(foundOrder || null);
      } catch (error) {
        console.error(
          'Load order details error:',
          error
        );

        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  const handleStatusChange = async (status) => {
    if (!order) return;

    try {
      setUpdating(true);

      const updatedOrder = await updateOrderStatus(
        order.id,
        status
      );

      setOrder((currentOrder) => ({
        ...currentOrder,
        order_status: updatedOrder.order_status,
      }));
    } catch (error) {
      console.error(
        'Update order status error:',
        error
      );

      alert(error.message);
    } finally {
      setUpdating(false);
    }
  };

  const formatCurrency = (amount) => {
    return `₦${Number(amount || 0).toLocaleString(
      'en-NG',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';

      case 'processing':
        return 'bg-blue-50 text-blue-700 border-blue-200';

      case 'shipped':
        return 'bg-purple-50 text-purple-700 border-purple-200';

      case 'delivered':
        return 'bg-green-50 text-green-700 border-green-200';

      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';

      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-sky-500" />

          <p className="text-sm text-slate-500">
            Loading order...
          </p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-4xl">
          <button
            type="button"
            onClick={() => navigate('/admin/orders')}
            className="flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-700"
          >
            <ArrowLeft size={17} />
            Back to Orders
          </button>

          <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
            <Package
              className="mx-auto text-slate-300"
              size={40}
            />

            <h1 className="mt-4 text-lg font-bold text-slate-900">
              Order not found
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              This order may have been removed or does not exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              type="button"
              onClick={() => navigate('/admin/orders')}
              className="mb-3 flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-700"
            >
              <ArrowLeft size={17} />
              Back to Orders
            </button>

            <h1 className="text-2xl font-bold text-slate-900">
              Order #{order.id}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Order placed{' '}
              {new Date(
                order.created_at
              ).toLocaleString('en-NG')}
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3">
            <select
              value={order.order_status}
              onChange={(e) =>
                handleStatusChange(e.target.value)
              }
              disabled={updating}
              className={`rounded-lg border px-4 py-2.5 text-sm font-semibold outline-none ${getStatusStyle(
                order.order_status
              )}`}
            >
              <option value="pending">
                Pending
              </option>

              <option value="processing">
                Processing
              </option>

              <option value="shipped">
                Shipped
              </option>

              <option value="delivered">
                Delivered
              </option>

              <option value="cancelled">
                Cancelled
              </option>
            </select>
          </div>
        </div>

        {/* Main Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Left */}
          <div className="space-y-6 lg:col-span-2">

            {/* Customer */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100">
                  <User
                    className="text-sky-600"
                    size={20}
                  />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Customer Information
                  </h2>

                  <p className="text-xs text-slate-500">
                    Customer details
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="flex items-start gap-3">
                  <User
                    size={17}
                    className="mt-0.5 text-slate-400"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Full Name
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {order.full_name || 'Customer'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail
                    size={17}
                    className="mt-0.5 text-slate-400"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Email
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700 break-all">
                      {order.email || 'No email'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone
                    size={17}
                    className="mt-0.5 text-slate-400"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Phone
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {order.phone || 'No phone'}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Products */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
                  <Package
                    className="text-purple-600"
                    size={20}
                  />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Ordered Products
                  </h2>

                  <p className="text-xs text-slate-500">
                    Products included in this order
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {order.order_items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-3 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {item.product_name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-sm font-bold text-slate-900">
                        {formatCurrency(
                          item.unit_price
                        )}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {formatCurrency(
                          item.subtotal
                        )}{' '}
                        subtotal
                      </p>
                    </div>
                  </div>
                ))}

                {!order.order_items?.length && (
                  <p className="py-5 text-center text-sm text-slate-500">
                    No products found for this order.
                  </p>
                )}
              </div>
            </div>

            {/* Delivery */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                  <MapPin
                    className="text-green-600"
                    size={20}
                  />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Delivery Information
                  </h2>

                  <p className="text-xs text-slate-500">
                    Where the order will be delivered
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-700">
                  {order.address}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {order.city}, {order.state}
                  {order.zip_code
                    ? `, ${order.zip_code}`
                    : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">

            {/* Payment */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                  <CreditCard
                    className="text-amber-600"
                    size={20}
                  />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Payment
                  </h2>

                  <p className="text-xs text-slate-500">
                    Payment information
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs text-slate-400">
                    Payment Method
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {order.payment_method || 'N/A'}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Payment Status
                  </p>

                  <p className="mt-1 text-sm font-medium capitalize text-slate-700">
                    {order.payment_status || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-slate-900">
                Order Summary
              </h2>

              <div className="mt-5 space-y-3 text-sm">

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Subtotal
                  </span>

                  <span className="font-medium text-slate-700">
                    {formatCurrency(order.subtotal)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Shipping
                  </span>

                  <span className="font-medium text-slate-700">
                    {formatCurrency(order.shipping)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Tax
                  </span>

                  <span className="font-medium text-slate-700">
                    {formatCurrency(order.tax)}
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-900">
                      Total
                    </span>

                    <span className="text-lg font-bold text-slate-900">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Order Date */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <Calendar
                  className="text-slate-400"
                  size={19}
                />

                <div>
                  <p className="text-xs text-slate-400">
                    Order Date
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {new Date(
                      order.created_at
                    ).toLocaleString('en-NG')}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}