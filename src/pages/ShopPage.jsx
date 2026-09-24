import Pagination from '../components/Pagination.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import SidebarFilters from '../components/SidebarFilters.jsx';
import React from 'react';


export default function ShopPage({ onAddToCart, searchQuery }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <div>
        <section className="bg-sky-50 border-b border-sky-100 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex justify-between items-center">
            <div>
              <div className="text-sm text-slate-500 mb-2">
                <span>Home</span> <span className="mx-1">&gt;</span> <span className="text-slate-800">Shop</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Shop All Products</h1>
              <p className="text-slate-600">Discover our amazing collection of products at the best prices.</p>
            </div>
            <div className="hidden md:flex items-center space-x-4 pr-12">
              <div className="w-28 h-28 bg-blue-500 rounded-lg shadow-md flex items-center justify-center text-white text-xs">
                [ Shopping Bag Graphic ]
              </div>
            </div>
          </div>
        </section>    
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            <aside className="w-full lg:w-64 shrink-0">
              <SidebarFilters />
            </aside>
            <main className="flex-1">
              <ProductGrid
  onAddToCart={onAddToCart}
  searchQuery={searchQuery}
/>
              <div className="mt-8">
                <Pagination />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
