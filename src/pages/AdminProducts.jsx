import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MoreHorizontal,
} from 'lucide-react';
import {
  getAllProducts,
  getCategories,
  deactivateProduct,
  reactivateProduct,
} from '../services/adminService';

export default function AdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [categories, setCategories] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);

        const categoryData = await getCategories();
        setCategories(categoryData);
      } catch (error) {
        console.error('Load admin products error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(searchQuery.toLowerCase());

  const matchesCategory =
    categoryFilter === 'all' ||
    product.category === categoryFilter;

  const matchesStock =
    stockFilter === 'all' ||
    (stockFilter === 'in-stock' && product.stock > 0) ||
    (stockFilter === 'low-stock' &&
      product.stock > 0 &&
      product.stock <= 5) ||
    (stockFilter === 'out-of-stock' &&
      product.stock === 0);

  const matchesStatus =
    statusFilter === 'all' ||
    (statusFilter === 'active' && product.is_active) ||
    (statusFilter === 'inactive' && !product.is_active);

  return (
    matchesSearch &&
    matchesCategory &&
    matchesStock &&
    matchesStatus
  );
});


  const totalProducts = products.length;

const activeProducts = products.filter(
  (product) => product.is_active
).length;

const inactiveProducts = products.filter(
  (product) => !product.is_active
).length;

const lowStockProducts = products.filter(
  (product) => product.stock > 0 && product.stock <= 5
).length;

const outOfStockProducts = products.filter(
  (product) => product.stock === 0
).length;

  

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  <div>
    <h1 className="text-2xl font-bold text-slate-900">
      Products
    </h1>

    <p className="mt-1 text-slate-500">
      Manage your SkyShop products.
    </p>
  </div>

  <button
    type="button"
    onClick={() => navigate('/admin/products/add')}
    className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-600 transition"
  >
    + Add Product
  </button>
</div>

            {/* Product Summary */}
<div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-12">

  {/* Total Products */}
  <div className="col-span-2 rounded-2xl border border-sky-100 bg-sky-50 p-6 shadow-sm lg:col-span-7">
    <p className="text-sm font-medium text-sky-700">
      Total Products
    </p>

    <p className="mt-3 text-4xl font-bold text-sky-900">
      {totalProducts}
    </p>

    <p className="mt-2 text-xs text-sky-600">
      Products in your inventory
    </p>
  </div>

  {/* Active */}
  <div className="col-span-2 rounded-2xl border border-green-100 bg-green-50 p-6 shadow-sm lg:col-span-5">
    <p className="text-sm font-medium text-green-700">
      Active
    </p>

    <p className="mt-3 text-4xl font-bold text-green-800">
      {activeProducts}
    </p>

    <p className="mt-2 text-xs text-green-600">
      Available to customers
    </p>
  </div>

  {/* Low Stock */}
  <div className="col-span-1 rounded-2xl border border-yellow-100 bg-yellow-50 p-5 shadow-sm lg:col-span-3">
    <p className="text-sm font-medium text-yellow-700">
      Low Stock
    </p>

    <p className="mt-3 text-3xl font-bold text-yellow-800">
      {lowStockProducts}
    </p>

    <p className="mt-2 text-xs text-yellow-600">
      Needs attention
    </p>
  </div>

  {/* Out of Stock */}
  <div className="col-span-1 rounded-2xl border border-orange-100 bg-orange-50 p-5 shadow-sm lg:col-span-3">
    <p className="text-sm font-medium text-orange-700">
      Out of Stock
    </p>

    <p className="mt-3 text-3xl font-bold text-orange-800">
      {outOfStockProducts}
    </p>

    <p className="mt-2 text-xs text-orange-600">
      Currently unavailable
    </p>
  </div>

  {/* Inactive */}
  <div className="col-span-2 rounded-2xl border border-red-100 bg-red-50 p-5 shadow-sm lg:col-span-6">
    <p className="text-sm font-medium text-red-700">
      Inactive
    </p>

    <p className="mt-3 text-3xl font-bold text-red-800">
      {inactiveProducts}
    </p>

    <p className="mt-2 text-xs text-red-600">
      Hidden from customers
    </p>
  </div>

</div>

<div className="mt-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
  <div className="flex flex-col lg:flex-row gap-3">

    {/* Search */}
    <div className="flex-1">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
      />
    </div>

    {/* Category */}
    <select
      value={categoryFilter}
      onChange={(e) => setCategoryFilter(e.target.value)}
      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
    >
      <option value="all">All Categories</option>
         {categories.map((category) => (
        <option key={category.id} value={category.name}>
        {category.name}
      </option>
))}
    </select>

    <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-sky-400"
>
  <option value="all">All Status</option>
  <option value="active">Active</option>
  <option value="inactive">Inactive</option>
</select>

    {/* Stock */}
    <select
      value={stockFilter}
      onChange={(e) => setStockFilter(e.target.value)}
      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
    >
      <option value="all">All Stock</option>
      <option value="in-stock">In Stock</option>
      <option value="low-stock">Low Stock</option>
      <option value="out-of-stock">Out of Stock</option>
    </select>

  </div>
</div>
        {/* Products */}
        {loading ? (
          <p className="mt-8 text-slate-500">
            Loading products...
          </p>
        ) : (
          <div className="mt-8 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px]">

                <thead>
                  <tr className="border-b border-slate-100 text-left">
                    <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Product
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Category
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Brand
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Price
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Stock
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>

<tbody>
  {filteredProducts.length === 0 ? (
    <tr>
      <td
        colSpan="6"
        className="px-5 py-16 text-center"
      >
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            📦
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-900">
            No products found
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Try adjusting your search or filters.
          </p>
        </div>
      </td>
    </tr>
  ) : (
    filteredProducts.map((product) => (
      <tr
        key={product.id}
        className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
      >
        {/* Product */}
        <td className="px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
              {product.product_images?.length > 0 ? (
                <img
                  src={
                    product.product_images.find(
                      (image) => image.is_primary
                    )?.image_url ||
                    product.product_images[0].image_url
                  }
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                  No image
                </div>
              )}
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                {product.name}
              </p>

              {product.is_active ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-green-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-red-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  Inactive
                </span>
              )}

              <p className="text-xs text-slate-400">
                ID: #{product.id}
              </p>
            </div>
          </div>
        </td>

        {/* Category */}
        <td className="px-5 py-4">
          <span className="text-sm text-slate-600">
            {product.category}
          </span>
        </td>

        {/* Brand */}
        <td className="px-5 py-4">
          <span className="text-sm text-slate-600">
            {product.brand}
          </span>
        </td>

        {/* Price */}
        <td className="px-5 py-4">
          <p className="text-sm font-semibold text-slate-900">
            ₦
            {Number(product.price).toLocaleString('en-NG', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </td>
          {/* Stock */}
          <td className="px-5 py-4">
            <div className="flex flex-col items-start gap-1">
              <span className="text-sm font-semibold text-slate-700">
                {product.stock}
              </span>
          
              {product.stock === 0 ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  Out of stock
                </span>
              ) : product.stock <= 5 ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                  Low stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  In stock
                </span>
              )}
            </div>
          </td>

        {/* Actions */}
        <td className="px-5 py-4">
          <div className="relative inline-block">
            <button
              type="button"
              onClick={() =>
                setOpenMenu(
                  openMenu === product.id
                    ? null
                    : product.id
                )
              }
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
            >
              <MoreHorizontal size={20} />
            </button>

            {openMenu === product.id && (
              <div className="absolute right-0 z-20 mt-2 w-40 rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(null);
                    navigate(
                      `/admin/products/edit/${product.id}`
                    );
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50"
                >
                  Edit product
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    setOpenMenu(null);

                    const action = product.is_active
                      ? 'deactivate'
                      : 'reactivate';

                    const confirmed = window.confirm(
                      `Are you sure you want to ${action} this product?`
                    );

                    if (!confirmed) return;

                    try {
                      if (product.is_active) {
                        await deactivateProduct(product.id);
                      } else {
                        await reactivateProduct(product.id);
                      }

                      setProducts((current) =>
                        current.map((item) =>
                          item.id === product.id
                            ? {
                                ...item,
                                is_active:
                                  !item.is_active,
                              }
                            : item
                        )
                      );

                      alert(
                        product.is_active
                          ? 'Product deactivated successfully!'
                          : 'Product reactivated successfully!'
                      );
                    } catch (error) {
                      console.error(
                        'Product status update error:',
                        error
                      );

                      alert(error.message);
                    }
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  {product.is_active
                    ? 'Deactivate'
                    : 'Reactivate'}
                </button>
              </div>
            )}
          </div>
        </td>
      </tr>
    ))
  )}
</tbody>

              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}