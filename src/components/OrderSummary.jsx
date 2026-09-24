import React, { use } from 'react';
import { ChevronDown, ShieldCheck, Truck, Headphones } from 'lucide-react';

export default function OrderSummary({ items, subtotal, shipping, tax, total }) {
  const totalItemCount = items.reduce(
  (acc, item) => acc + item.quantity,
  0
);
  
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>
        <span className="text-xs font-semibold text-blue-600 flex items-center gap-1 cursor-pointer">
          {totalItemCount} items <ChevronDown className="w-3 h-3" />
        </span>
      </div>

      {/* Item List */}
      <div className="space-y-4 mb-6 max-h-[320px] overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="w-14 h-14 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-800 truncate">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Qty: {item.quantity}
              </p>
            </div>
            <div className="text-xs font-bold text-slate-900">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Calculations Breakdown */}
      <div className="bg-slate-50/70 rounded-xl p-4 space-y-2.5 text-xs text-slate-600 mb-6">
        <div className="flex justify-between">
          <span>Subtotal ({totalItemCount} items)</span>
          <span className="font-semibold text-slate-800">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-semibold text-emerald-600">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Tax (7%)</span>
          <span className="font-semibold text-slate-800">${tax.toFixed(2)}</span>
        </div>

        <div className="pt-3 border-t border-slate-200/60 flex justify-between items-baseline">
          <span className="text-sm font-bold text-slate-900">Total</span>
          <span className="text-xl font-extrabold text-blue-600">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Encryption Note */}
      <div className="bg-blue-50/50 rounded-xl p-3.5 flex items-start gap-3 border border-blue-100/50 mb-6">
        <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h5 className="text-xs font-bold text-slate-800">Your order is protected</h5>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
            We use secure encryption to keep your payment information safe.
          </p>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
        <div className="flex flex-col items-center">
          <Truck className="w-4 h-4 text-blue-600 mb-1" />
          <span className="text-[10px] font-bold text-slate-800">Free Shipping</span>
          <span className="text-[9px] text-slate-400">On orders over $50</span>
        </div>

        <div className="flex flex-col items-center">
          <ShieldCheck className="w-4 h-4 text-blue-600 mb-1" />
          <span className="text-[10px] font-bold text-slate-800">Secure Payment</span>
          <span className="text-[9px] text-slate-400">100% secure checkout</span>
        </div>

        <div className="flex flex-col items-center">
          <Headphones className="w-4 h-4 text-blue-600 mb-1" />
          <span className="text-[10px] font-bold text-slate-800">24/7 Support</span>
          <span className="text-[9px] text-slate-400">We're here to help</span>
        </div>
      </div>
    </div>
  );
}
