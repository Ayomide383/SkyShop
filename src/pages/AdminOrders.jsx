import React, { useEffect, useState } from 'react';
import {
  getAllOrders,
  updateOrderStatus,
} from '../services/orderService';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (error) {
  console.error('Load admin orders error:', error);
  alert(error.message);
} finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      setUpdatingOrderId(orderId);

      const updatedOrder = await updateOrderStatus(
        orderId,
        status
      );

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                order_status: updatedOrder.order_status,
              }
            : order
        )
      );
    } catch (error) {
      console.error(
        'Update order status error:',
        error
      );

      alert(error.message);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const filteredOrders =
    statusFilter === 'all'
      ? orders
      : orders.filter(
          (order) =>
            order.order_status === statusFilter
        );
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">
          Loading orders...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-2xl font-bold text-slate-900">
          Manage Orders
        </h1>

        <p className="text-slate-500 mt-1">
          View and manage all customer orders.
        </p>

        <div className="mt-8">

          <div className="mb-5">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
            >
              <option value="all">
                All Orders
              </option>

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

          <div className="space-y-4">

            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  {/* Customer */}
                  <div>
                    <h2 className="font-bold text-slate-900">
                      Order #{order.id}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      {order.full_name}
                    </p>

                    <p className="text-sm text-slate-500">
                      {order.email}
                    </p>
                  </div>

                  {/* Total */}
                  <div>
                    <p className="text-sm text-slate-500">
                      Total
                    </p>

                    <p className="font-bold text-slate-900">
                      ₦
                      {Number(order.total).toLocaleString(
                        'en-NG',
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-sm text-slate-500">
                      Status
                    </p>

<select
  value={order.order_status}
  onChange={(e) =>
    handleStatusChange(
      order.id,
      e.target.value
    )
  }
  disabled={
    updatingOrderId === order.id
  }
  className={`mt-1 rounded-lg border px-3 py-2 text-sm font-medium outline-none ${getStatusStyle(
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

                  {/* View Details */}
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedOrderId(
                        expandedOrderId === order.id
                          ? null
                          : order.id
                      )
                    }
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                  >
                    {expandedOrderId === order.id
                      ? 'Hide Details'
                      : 'View Details'}
                  </button>

                </div>


                {expandedOrderId === order.id && (
  <div className="mt-5 border-t border-slate-100 pt-5">

    <h3 className="font-semibold text-slate-900">
      Order Details
    </h3>

    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">

      <div>
        <p className="text-xs text-slate-400">
          Phone
        </p>
        <p className="text-sm text-slate-700">
          {order.phone}
        </p>
      </div>

      <div>
        <p className="text-xs text-slate-400">
          Payment Method
        </p>
        <p className="text-sm text-slate-700">
          {order.payment_method}
        </p>
      </div>

      <div>
        <p className="text-xs text-slate-400">
          Payment Status
        </p>
        <p className="text-sm text-slate-700">
          {order.payment_status}
        </p>
      </div>

      <div>
        <p className="text-xs text-slate-400">
          Order Date
        </p>
        <p className="text-sm text-slate-700">
          {new Date(order.created_at).toLocaleString(
            'en-NG'
          )}
        </p>
      </div>

      <div className="md:col-span-2">
        <p className="text-xs text-slate-400">
          Delivery Address
        </p>

        <p className="text-sm text-slate-700">
          {order.address}, {order.city}, {order.state}
          {order.zip_code
            ? `, ${order.zip_code}`
            : ''}
        </p>
      </div>

    </div>

    <div className="mt-6">

  <h3 className="font-semibold text-slate-900">
    Products
  </h3>

  <div className="mt-3 space-y-3">

    {order.order_items?.map((item) => (
      <div
        key={item.id}
        className="flex items-center justify-between rounded-xl bg-slate-50 p-3"
      >

        <div>
          <p className="text-sm font-medium text-slate-800">
            {item.product_name}
          </p>

          <p className="text-xs text-slate-500 mt-1">
            Quantity: {item.quantity}
          </p>
        </div>

        <p className="text-sm font-semibold text-slate-900">
          ₦
          {Number(item.unit_price).toLocaleString(
            'en-NG',
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          )}
        </p>

      </div>
    ))}

  </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
  <div className="space-y-2 text-sm">

    <div className="flex justify-between">
      <span className="text-slate-500">
        Subtotal
      </span>

      <span className="font-medium text-slate-700">
        ₦
        {Number(order.subtotal).toLocaleString(
          'en-NG',
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-slate-500">
        Shipping
      </span>

      <span className="font-medium text-slate-700">
        ₦
        {Number(order.shipping).toLocaleString(
          'en-NG',
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-slate-500">
        Tax
      </span>

      <span className="font-medium text-slate-700">
        ₦
        {Number(order.tax).toLocaleString(
          'en-NG',
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )}
      </span>
    </div>

    <div className="flex justify-between border-t border-slate-200 pt-3">
      <span className="font-semibold text-slate-900">
        Total
      </span>

      <span className="font-bold text-slate-900">
        ₦
        {Number(order.total).toLocaleString(
          'en-NG',
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )}
      </span>
    </div>

  </div>
</div>

</div>

  </div>
)}

              </div>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
}