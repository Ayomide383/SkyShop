import { getProducts } from '../data/Product.js';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useSearchParams } from 'react-router-dom';

export default function ProductGrid({
  onAddToCart,
  searchQuery = ''
}) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('Popular');

  const [searchParams] = useSearchParams();

  const selectedCategory =
    searchParams.get('category') || 'all';

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products
    .filter((product) => {

      const matchesSearch =
        product.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||

        product.category
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })

    .sort((a, b) => {

      if (sortBy === 'Price: Low to High') {
        return a.price - b.price;
      }

      if (sortBy === 'Price: High to Low') {
        return b.price - a.price;
      }

      if (sortBy === 'Popular') {
        return b.rating - a.rating;
      }

      return 0;
    });

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-blue-600 font-semibold">
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <div>

      {/* SORT BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">

        <div className="flex items-center space-x-4">

          <div className="flex items-center space-x-2 text-xs">

            <span className="text-slate-500">
              Sort by:
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-700"
            >
              <option>Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>

          </div>

        </div>

      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

        {filteredProducts.length > 0 ? (

          filteredProducts.map((product) => (

            <div key={product.id}>

              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
              />

            </div>

          ))

        ) : (

          <div className="col-span-full py-16 text-center">

            <h3 className="text-lg font-bold text-slate-800">
              No products found
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              We couldn't find any products matching your filters.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}