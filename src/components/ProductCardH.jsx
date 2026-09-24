import ProductCard from './ProductCard.jsx';
import React, { useEffect, useState } from 'react';
import { getProducts } from '../data/Product.js';

const ProductCardH = ({ onAddToCart }) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

const popularProducts = data
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 10);

setProducts(popularProducts);
      } catch (error) {
        console.error('Failed to load home products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-10 text-center">
        <p className="text-blue-600 font-semibold">
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductCardH;