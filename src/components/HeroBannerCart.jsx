import React from 'react';
import { Truck, ShieldCheck, Headphones } from 'lucide-react';

export default function HeroBannerCart() {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 py-8">
      <div className="mx-auto max-w-7xl px-6">
        
        <p className="text-xs text-gray-500">
          Home &gt; Chart
        </p>

        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Chart</h1>
            <p className="mt-1 text-sm text-gray-600">
              Review your items and proceed to checkout when ready
            </p>
          </div>

          
          <div className="mt-6 flex flex-wrap gap-6 md:mt-0">
            <div className="flex items-center space-x-3">
              <Truck className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-xs font-semibold text-gray-900">Free Shipping</p>
                <p className="text-[10px] text-gray-500">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-xs font-semibold text-gray-900">Secure Payment</p>
                <p className="text-[10px] text-gray-500">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Headphones className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-xs font-semibold text-gray-900">24/7 Support</p>
                <p className="text-[10px] text-gray-500">We're here to help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
