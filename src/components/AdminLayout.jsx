import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Menu,
  X,
  UsersRound,
  MessageSquare,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await logout();

    if (error) {
      console.error('Logout error:', error);
      alert(error.message);
      return;
    }

    setMobileMenuOpen(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-slate-950 text-white flex flex-col z-50 transform transition-transform duration-200 lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >

        {/* Sidebar Header */}
        <div className="h-16 px-6 flex items-center border-b border-slate-800">
          <h1 className="text-xl font-bold">
            SkyShop
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">

          <NavLink
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl ${
                isActive
                  ? 'bg-sky-500 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <LayoutDashboard size={19} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl ${
                isActive
                  ? 'bg-sky-500 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Package size={19} />
            Products
          </NavLink>

          <NavLink
            to="/admin/orders"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl ${
                isActive
                  ? 'bg-sky-500 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <ShoppingCart size={19} />
            Orders
          </NavLink>

          <NavLink
            to="/admin/customers"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl ${
                isActive
                  ? 'bg-sky-500 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <UsersRound size={19} />
            Customers
          </NavLink>


          <NavLink
            to="/admin/reviews"
            onClick={() => setMobileMenuOpen(false)}
             className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                ? 'bg-sky-500 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <MessageSquare size={18} />
            Reviews
          </NavLink>

        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>

      </aside>

      <main className="lg:ml-64 min-h-screen">

        {/* Mobile Header */}
        <div className="lg:hidden h-16 bg-slate-950 text-white px-4 flex items-center justify-between sticky top-0 z-50">

          <h1 className="font-bold text-lg">
            SkyShop Admin
          </h1>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-slate-800"
            aria-label="Toggle admin menu"
          >
            {mobileMenuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

        </div>

        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30">

          <div>
            <p className="text-sm text-slate-500">
              Admin Panel
            </p>
          </div>

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center">
              <span className="text-sm font-semibold text-sky-700">
                A
              </span>
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">
                Admin
              </p>

              <p className="text-xs text-slate-500">
                Store Manager
              </p>
            </div>

          </div>

        </header>

        <div>
          <Outlet />
        </div>

      </main>

    </div>
  );
}