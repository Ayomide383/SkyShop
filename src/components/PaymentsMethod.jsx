import React from 'react';
import { CreditCard, Landmark, Banknote, Calendar, Lock, ShieldCheck } from 'lucide-react';

export default function PaymentMethod({ 
  paymentMethod, 
  setPaymentMethod, 
  cardDetails, 
  onChange, 
  onSubmit, 
  subtotal 
}) {
  const methods = [
    {
      id: 'card',
      title: 'Credit / Debit Card',
      sub: 'Visa, Mastercard, Verve',
      icon: CreditCard,
    },
    {
      id: 'paypal',
      title: 'PayPal',
      sub: 'Pay with PayPal',
      icon: (props) => (
        <span className="font-bold italic text-blue-800 text-sm tracking-tighter">
          Pay<span className="text-sky-500">Pal</span>
        </span>
      ),
    },
    {
      id: 'bank',
      title: 'Bank Transfer',
      sub: 'Direct bank transfer',
      icon: Landmark,
    },
    {
      id: 'cod',
      title: 'Cash on Delivery',
      sub: 'Pay when you receive',
      icon: Banknote,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-blue-500/20">
          2
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Payment Method</h2>
          <p className="text-xs text-slate-500">Choose how you want to pay</p>
        </div>
      </div>

      {/* Payment Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {methods.map((method) => {
          const Icon = method.icon;
          const isSelected = paymentMethod === method.id;
          return (
            <div
              key={method.id}
              onClick={() => setPaymentMethod(method.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/20 ring-2 ring-blue-600/10'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <div className="text-slate-700">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="font-bold text-xs text-slate-900">{method.title}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{method.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Card Details Inputs (Shows when Card is Selected) */}
      {paymentMethod === 'card' && (
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Card Details
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Card Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={onChange}
                placeholder="1234 5678 9012 3456"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Expiry Date <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={onChange}
                  placeholder="MM / YY"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                CVV <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  name="cvv"
                  maxLength={4}
                  value={cardDetails.cvv}
                  onChange={onChange}
                  placeholder="123"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder-slate-400"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pay Button */}
      <button
        type="submit"
        disabled={subtotal === 0}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Lock className="w-4 h-4" />
        <span>Pay Now</span>
      </button>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Your payment information is secure and encrypted.</span>
      </div>
    </div>
  );
}
