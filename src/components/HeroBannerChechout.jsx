import React from 'react';
import { ChevronRight, ShieldCheck } from 'lucide-react';

export default function HeroBannerCheckout() {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-sky-50 to-blue-100/50 py-10 px-4 sm:px-6 lg:px-8 border-b border-blue-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        <div>
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-3">
            <a href="#" className="hover:text-blue-600">Home</a>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-900 font-semibold">Checkout</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Checkout
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Complete your order and get your products delivered to your door.
          </p>
        </div>

        {/* Illustration */}
        <div className="hidden md:flex items-center justify-center pr-8">
          <div className="relative w-48 h-24 flex items-center justify-center">
            <div className="absolute -left-2 bg-blue-500 text-white rounded-2xl w-24 h-20 shadow-lg transform -rotate-12 flex items-center justify-center font-black text-2xl border-2 border-white">
              N
            </div>
            <div className="absolute right-0 bg-amber-700 text-amber-100 rounded-xl w-20 h-16 shadow-md transform rotate-6 flex items-center justify-center text-xs font-bold border-2 border-amber-600">
              <div className="border border-dashed border-amber-400/50 p-2 rounded">
                PACKAGE
              </div>
            </div>
            <div className="absolute -bottom-1 right-2 bg-blue-600 text-white p-2 rounded-full shadow-lg border-2 border-white z-20">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
