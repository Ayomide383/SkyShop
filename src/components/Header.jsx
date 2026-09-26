import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, X, 
         Menu, Sliders, ArrowLeft, ShoppingCart, Store } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';



export default function Header({
  cartItems = [],
  searchQuery,
  setSearchQuery
}) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();
  
  const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Categories', path: '/categories' },
  { name: 'Deals', path: '/deals' },
  { name: 'Cart', path: '/cart' },
  { name: 'About Us', path: '/about' },
];

  const handleSearchSubmit = (e) => {
  e.preventDefault();

  if (searchQuery.trim()) {
    navigate('/shop');
  }
};

  
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm transition-all duration-200">
      {}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        
        <div className="flex items-center gap-4 lg:gap-8">
     <Link to="/">
          <div className="flex items-center space-x-1 cursor-pointer select-none">
            <span className="text-2xl font-black tracking-tight text-blue-600">Sky</span>
            <span className="text-2xl font-black tracking-tight text-slate-800">Shop</span>
          </div>
     </Link> 
        
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = activeTab === link.name.toLowerCase();
              return (
                <Link to={link.path}
                  key={link.name}>
                <button
                  onClick={() => setActiveTab(link.name.toLowerCase())}
                  className={`px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-sky-50 font-semibold'
                      : 'hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </button>
                </Link>
              );
            })}
          </nav>
        </div>

        
        <div className="flex-1 max-w-md mx-4 hidden sm:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full bg-slate-100 text-sm rounded-full py-2 pl-4 pr-10 border border-transparent focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            <button 
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-blue-600 transition-colors rounded-full"
              title="Submit Search"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>

        {}
      
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-full sm:hidden transition-colors relative"
            aria-label="Toggle search bar"
          >
            {isMobileSearchOpen ? (
              <X className="w-5 h-5 text-blue-600" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>

          <Link to="/shop">
          <button className="sm:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-full transition-colors relative">
            <Store className="w-5 h-5" />
            
            
          </button>
          </Link>
          
          <Link to="/cart">
  <button className="sm:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-full transition-colors relative">
    <ShoppingCart className="w-5 h-5" />

    {cartItems.length > 0 && (
      <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
        {cartItems.length}
      </span>
    )}
  </button>
</Link>

          <Link to="/profile" className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-full transition-colors">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out bg-slate-50 border-t border-slate-100 ${
          isMobileSearchOpen ? 'max-h-20 opacity-100 py-2.5 px-4' : 'max-h-0 opacity-0 py-0 px-4'
        }`}
      >
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              autoFocus={isMobileSearchOpen}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands, or categories..."
              className="w-full bg-white text-sm rounded-full py-2.5 pl-10 pr-9 border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder-slate-400"
            />
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-4 py-2.5 rounded-full shadow-sm transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

