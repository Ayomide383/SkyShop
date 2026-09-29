import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart, onToggleWishlist }) {
  if (!product) return null;

  const isOutOfStock = Number(product.stock) <= 0;

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) return;

    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3 flex flex-col justify-between hover:shadow-md transition-shadow group relative">

      {/* Clickable Card Link */}
      <Link
        to={`/product/${product.id}`}
        className="block flex-1 flex flex-col justify-between"
      >
        <div className="w-full h-32 bg-slate-100 rounded-lg flex items-center justify-center mb-3 text-xs text-slate-400 font-medium overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain p-2"
            />
          ) : (
            '[ Image ]'
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold block mb-0.5">
              {product.category}
            </span>

            <h4 className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
              {product.title}
            </h4>

            <div className="flex items-center space-x-1 mt-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.round(product.rating || 0)
                        ? 'fill-current text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>

              <span className="text-[10px] text-slate-400">
                ({product.reviews || 0})
              </span>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-sm font-bold text-blue-600 mb-2">
              ₦
              {product.price
                ? Number(product.price).toLocaleString('en-NG', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : '0.00'}
            </div>

            {/* Stock Status */}
            <p
              className={`text-[10px] font-medium ${
                isOutOfStock
                  ? 'text-red-500'
                  : 'text-green-600'
              }`}
            >
              {isOutOfStock
                ? 'Out of stock'
                : `${product.stock} available in stock`}
            </p>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <button
        type="button"
        onClick={handleAddToCartClick}
        disabled={isOutOfStock}
        className={`w-full rounded-lg py-1.5 text-xs font-medium flex items-center justify-center space-x-1.5 transition-colors mt-1 relative z-10 ${
          isOutOfStock
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        <ShoppingCart className="w-3.5 h-3.5" />

        <span>
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </span>
      </button>

    </div>
  );
}