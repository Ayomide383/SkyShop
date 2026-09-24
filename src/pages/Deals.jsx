import React, { useEffect, useState } from 'react';
import { ArrowRight, Flame, ShoppingBag, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProducts } from '../data/Product.js';
import ProductCard from '../components/ProductCard.jsx';

export default function Deals({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDeals = async () => {
      try {
        const data = await getProducts();

        // Use highly-rated products as our current deal selection.
        const deals = [...data]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 10);

        setProducts(deals);
      } catch (error) {
        console.error('Failed to load deals:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-5">
              <Flame className="w-4 h-4" />
              Limited-time offers
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
              Great products.
              <br />
              Better prices.
            </h1>

            <p className="mt-5 text-blue-50 text-base sm:text-lg max-w-2xl leading-relaxed">
              Discover some of our top-rated products and find something
              worth adding to your cart.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">

              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-5 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors"
              >
                Shop All Products
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-blue-700/40 border border-white/30 text-white px-5 py-3 rounded-full font-semibold hover:bg-blue-700/60 transition-colors"
              >
                Back Home
              </Link>

            </div>

          </div>
        </div>
      </section>


      {/* DEAL INFO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-sky-50 text-blue-600 flex items-center justify-center">
              <Tag className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Special Picks
              </h3>
              <p className="text-sm text-slate-500">
                Carefully selected products
              </p>
            </div>
          </div>


          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-sky-50 text-blue-600 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Popular Choices
              </h3>
              <p className="text-sm text-slate-500">
                Products shoppers love
              </p>
            </div>
          </div>


          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-sky-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Easy Shopping
              </h3>
              <p className="text-sm text-slate-500">
                Add your favourites to cart
              </p>
            </div>
          </div>

        </div>

      </section>


      {/* DEAL PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        <div className="flex items-end justify-between gap-4 mb-6">

          <div>
            <p className="text-sm font-semibold text-blue-600">
              DEALS & PICKS
            </p>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Products worth checking out
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Explore our current selection.
            </p>
          </div>

          <Link
            to="/shop"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View Shop
            <ArrowRight className="w-4 h-4" />
          </Link>

        </div>


        {loading ? (

          <div className="py-20 text-center">
            <p className="text-blue-600 font-semibold">
              Loading deals...
            </p>
          </div>

        ) : (

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

            {products.map((product) => (

              <div key={product.id} className="relative">

                <div className="absolute z-10 top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  DEAL
                </div>

                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                />

              </div>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}