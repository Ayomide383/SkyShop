import React, { useEffect, useState } from 'react';
import {
  getAllCustomers,
  getCustomerOrders,
  disableCustomer,
  enableCustomer,
  makeCustomerAdmin,
  removeCustomerAdmin,
} from '../services/adminService';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [customerOrders, setCustomerOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await getAllCustomers();
        setCustomers(data);
      } catch (error) {
        console.error('Load customers error:', error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    const search = searchQuery.toLowerCase();

    return (
      customer.full_name?.toLowerCase().includes(search) ||
      customer.email?.toLowerCase().includes(search) ||
      customer.phone?.toLowerCase().includes(search)
    );
  });

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

  const handleDisableCustomer = async (userId) => {
  try {
    await disableCustomer(userId);

    setCustomers((currentCustomers) =>
      currentCustomers.map((customer) =>
        customer.id === userId
          ? { ...customer, is_active: false }
          : customer
      )
    );
  } catch (error) {
    console.error('Disable customer error:', error);
    alert(error.message);
  }
};

const handleEnableCustomer = async (userId) => {
  try {
    await enableCustomer(userId);

    setCustomers((currentCustomers) =>
      currentCustomers.map((customer) =>
        customer.id === userId
          ? { ...customer, is_active: true }
          : customer
      )
    );
  } catch (error) {
    console.error('Enable customer error:', error);
    alert(error.message);
  }
};


  const handleMakeAdmin = async (userId) => {
  try {
    await makeCustomerAdmin(userId);

    setCustomers((currentCustomers) =>
      currentCustomers.map((customer) =>
        customer.id === userId
          ? { ...customer, is_admin: true }
          : customer
      )
    );
  } catch (error) {
    console.error('Make admin error:', error);
    alert(error.message);
  }
};

const handleRemoveAdmin = async (userId) => {
  try {
    await removeCustomerAdmin(userId);

    setCustomers((currentCustomers) =>
      currentCustomers.map((customer) =>
        customer.id === userId
          ? { ...customer, is_admin: false }
          : customer
      )
    );
  } catch (error) {
    console.error('Remove admin error:', error);
    alert(error.message);
  }
};

  const handleViewCustomer = async (customer) => {
    setSelectedCustomer(customer);
    setCustomerOrders([]);
    setExpandedOrderId(null);
    setOrdersLoading(true);

    try {
      const orders = await getCustomerOrders(customer.id);
      setCustomerOrders(orders);
    } catch (error) {
      console.error('Load customer orders error:', error);
      alert(error.message);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleCloseCustomer = () => {
    setSelectedCustomer(null);
    setCustomerOrders([]);
    setExpandedOrderId(null);
  };

  const toggleOrder = (orderId) => {
    setExpandedOrderId((currentId) =>
      currentId === orderId ? null : orderId
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">
          Loading customers...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      <div className="max-w-7xl mx-auto">

        {/* PAGE HEADER */}

        <h1 className="text-2xl font-bold text-slate-900">
          Customers
        </h1>

        <p className="text-slate-500 mt-1">
          View and manage your customers.
        </p>


        {/* SEARCH */}

        <div className="mt-6">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:max-w-md rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-sky-400"
          />
        </div>


        {/* CUSTOMER TABLE */}

        <div className="mt-8 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

          <div className="p-5 border-b border-slate-100">
            <p className="text-sm text-slate-500">
              Total Customers
            </p>

            <p className="text-2xl font-bold text-slate-900 mt-1">
              {customers.length}
            </p>
          </div>


          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-slate-50">

                <tr>

                  <th className="text-left px-5 py-4 font-semibold text-slate-600">
                    Customer
                  </th>

                  <th className="text-left px-5 py-4 font-semibold text-slate-600">
                    Email
                  </th>

                  <th className="text-left px-5 py-4 font-semibold text-slate-600">
                    Phone
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-slate-600">
                      Status
                    </th>

                  <th className="text-left px-5 py-4 font-semibold text-slate-600">
                    Role
                    </th>

                  <th className="text-left px-5 py-4 font-semibold text-slate-600">
                    Joined
                  </th>

                  <th className="text-left px-5 py-4 font-semibold text-slate-600">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-slate-100">

                {filteredCustomers.map((customer) => (

                  <tr
                    key={customer.id}
                    className="hover:bg-slate-50"
                  >

                    {/* CUSTOMER */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        {customer.avatar_url ? (

                          <img
                            src={customer.avatar_url}
                            alt={
                              customer.full_name ||
                              'Customer'
                            }
                            className="w-9 h-9 rounded-full object-cover"
                          />

                        ) : (

                          <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center">

                            <span className="text-sm font-semibold text-sky-600">
                              {customer.full_name
                                ? customer.full_name
                                    .charAt(0)
                                    .toUpperCase()
                                : '?'}
                            </span>

                          </div>

                        )}

                        <div>

                          <p className="font-medium text-slate-900">
                            {customer.full_name ||
                              'No name'}
                          </p>

                          <p className="text-xs text-slate-400">
                            ID: {customer.id.slice(0, 8)}...
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* EMAIL */}

                    <td className="px-5 py-4 text-slate-600">
                      {customer.email}
                    </td>


                    {/* PHONE */}

                    <td className="px-5 py-4 text-slate-600">
                      {customer.phone ||
                        'Not provided'}
                    </td>

                    {/* STATUS */}

<td className="px-5 py-4">

  <span
    className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium ${
      customer.is_active
        ? 'border-green-200 bg-green-50 text-green-700'
        : 'border-red-200 bg-red-50 text-red-700'
    }`}
  >

    <span
      className={`h-2 w-2 rounded-full ${
        customer.is_active
          ? 'bg-green-500'
          : 'bg-red-500'
      }`}
    />

    {customer.is_active
      ? 'Active'
      : 'Disabled'}

  </span>

</td>

                    {/* ROLE */}

<td className="px-5 py-4">

  <span
    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${
      customer.is_admin
        ? 'border-purple-200 bg-purple-50 text-purple-700'
        : 'border-slate-200 bg-slate-50 text-slate-600'
    }`}
  >
{customer.id === '5d86cb62-0569-4370-b540-1930d007338c'
  ? 'Owner'
  : customer.is_admin
    ? 'Admin'
    : 'Customer'}
  </span>

</td>


                    {/* JOINED */}

                    <td className="px-5 py-4 text-slate-600">
                      {new Date(
                        customer.created_at
                      ).toLocaleDateString('en-NG')}
                    </td>


                    {/* ACTION */}

                    <td className="px-5 py-4">

  <div className="flex items-center gap-2">

    {/* VIEW */}

    <button
      onClick={() =>
        handleViewCustomer(customer)
      }
      className="rounded-lg bg-sky-50 px-3 py-2 text-sm font-medium text-sky-600 hover:bg-sky-100"
    >
      View
    </button>

    {/* DISABLE / REACTIVATE */}

{customer.id === '5d86cb62-0569-4370-b540-1930d007338c' ? (

  <span className="rounded-lg bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-700">
    Protected
  </span>

) : customer.is_active ? (

  <button
    onClick={() =>
      handleDisableCustomer(customer.id)
    }
    className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
  >
    Disable
  </button>

) : (

  <button
    onClick={() =>
      handleEnableCustomer(customer.id)
    }
    className="rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-100"
  >
    Reactivate
  </button>

)}

    {/* MAKE ADMIN / REMOVE ADMIN */}

{customer.id === '5d86cb62-0569-4370-b540-1930d007338c' ? (

  <span className="rounded-lg bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-700">
    Owner
  </span>

) : customer.is_admin ? (

  <button
    onClick={() =>
      handleRemoveAdmin(customer.id)
    }
    className="rounded-lg bg-purple-50 px-3 py-2 text-sm font-medium text-purple-600 hover:bg-purple-100"
  >
    Remove Admin
  </button>

) : (

  <button
    onClick={() =>
      handleMakeAdmin(customer.id)
    }
    className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
  >
    Make Admin
  </button>

)}

  </div>

</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>


      {/* CUSTOMER DETAILS MODAL */}

      {selectedCustomer !== null && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">


            {/* MODAL HEADER */}

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  Customer Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Information about this customer
                </p>

              </div>


              <button
                onClick={handleCloseCustomer}
                className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200"
              >
                Close
              </button>

            </div>


            {/* CUSTOMER INFORMATION */}

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              <div>

                <p className="text-sm text-slate-400">
                  Name
                </p>

                <p className="mt-1 font-medium text-slate-900">
                  {selectedCustomer.full_name ||
                    'No name'}
                </p>

              </div>


              <div>

                <p className="text-sm text-slate-400">
                  Email
                </p>

                <p className="mt-1 font-medium text-slate-900">
                  {selectedCustomer.email}
                </p>

              </div>


              <div>

                <p className="text-sm text-slate-400">
                  Phone
                </p>

                <p className="mt-1 font-medium text-slate-900">
                  {selectedCustomer.phone ||
                    'Not provided'}
                </p>

              </div>


              <div>

                <p className="text-sm text-slate-400">
                  Joined
                </p>

                <p className="mt-1 font-medium text-slate-900">
                  {new Date(
                    selectedCustomer.created_at
                  ).toLocaleDateString('en-NG')}
                </p>

              </div>

            </div>


            {/* CUSTOMER SUMMARY */}

<div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">

  {/* TOTAL ORDERS */}

  <div className="rounded-xl bg-sky-50 p-4">
    <p className="text-xs text-slate-500">
      Total Orders
    </p>

    <p className="mt-1 text-xl font-bold text-slate-900">
      {customerOrders.length}
    </p>
  </div>

  {/* TOTAL SPENT */}

  <div className="rounded-xl bg-green-50 p-4">
    <p className="text-xs text-slate-500">
      Total Spent
    </p>

    <p className="mt-1 text-xl font-bold text-slate-900">
      ₦
      {customerOrders
        .reduce(
          (total, order) =>
            total + Number(order.total || 0),
          0
        )
        .toLocaleString('en-NG')}
    </p>
  </div>

  {/* LAST ORDER */}

  <div className="rounded-xl bg-purple-50 p-4">
    <p className="text-xs text-slate-500">
      Last Order
    </p>

    <p className="mt-1 text-sm font-bold text-slate-900">
      {customerOrders.length > 0
        ? new Date(
            customerOrders[0].created_at
          ).toLocaleDateString('en-NG')
        : 'No orders'}
    </p>
  </div>

  {/* CUSTOMER SINCE */}

  <div className="rounded-xl bg-orange-50 p-4">
    <p className="text-xs text-slate-500">
      Customer Since
    </p>

    <p className="mt-1 text-sm font-bold text-slate-900">
      {new Date(
        selectedCustomer.created_at
      ).toLocaleDateString('en-NG')}
    </p>
  </div>

</div>


            {/* ORDER HISTORY */}

            <div className="mt-8 border-t border-slate-100 pt-6">

              <h3 className="text-lg font-semibold text-slate-900">
                Order History
              </h3>


              {ordersLoading ? (

                <p className="mt-4 text-sm text-slate-500">
                  Loading orders...
                </p>

              ) : customerOrders.length === 0 ? (

                <p className="mt-4 text-sm text-slate-500">
                  This customer has no orders yet.
                </p>

              ) : (

                <div className="mt-4 space-y-3">

                  {customerOrders.map((order) => {

                    const isExpanded =
                      expandedOrderId === order.id;

                    return (

                      <div
                        key={order.id}
                        className="rounded-xl border border-slate-100 bg-slate-50 overflow-hidden"
                      >

                        {/* ORDER HEADER */}

                        <button
                          onClick={() =>
                            toggleOrder(order.id)
                          }
                          className="w-full p-4 text-left hover:bg-slate-100"
                        >

                          <div className="flex items-center justify-between gap-4">

                            <div>

                              <p className="font-medium text-slate-900">
                                Order #{order.id}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                {new Date(
                                  order.created_at
                                ).toLocaleDateString(
                                  'en-NG'
                                )}
                              </p>

                            </div>


                            <div className="text-right">

                              <p className="font-semibold text-slate-900">
                                ₦
                                {Number(
                                  order.total
                                ).toLocaleString(
                                  'en-NG'
                                )}
                              </p>


                              <span
                                className={`mt-1 inline-block rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${getStatusStyle(
                                  order.order_status
                                )}`}
                              >
                                {order.order_status}
                              </span>

                            </div>

                          </div>

                        </button>


                        {/* ORDER PRODUCTS */}

                        {isExpanded && (

                          <div className="border-t border-slate-200 bg-white p-4">

                            <p className="mb-3 text-sm font-semibold text-slate-700">
                              Products
                            </p>


                            {order.order_items?.length > 0 ? (

                              <div className="space-y-3">

                                {order.order_items.map(
                                  (item) => (

                                    <div
                                      key={item.id}
                                      className="flex items-center justify-between gap-4"
                                    >

                                      <div>

                                        <p className="text-sm font-medium text-slate-900">
                                          {item.product_name}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                          ₦
                                          {Number(
                                            item.unit_price
                                          ).toLocaleString(
                                            'en-NG'
                                          )}{' '}
                                          ×{' '}
                                          {item.quantity}
                                        </p>

                                      </div>


                                      <p className="text-sm font-semibold text-slate-900">
                                        ₦
                                        {Number(
                                          item.subtotal
                                        ).toLocaleString(
                                          'en-NG'
                                        )}
                                      </p>

                                    </div>

                                  )
                                )}

                              </div>

                            ) : (

                              <p className="text-sm text-slate-500">
                                No product details available.
                              </p>

                            )}

                          </div>

                        )}

                      </div>

                    );

                  })}

                </div>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}