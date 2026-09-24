import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';


export default function ProductDetailsTabs( {product} ) {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="mt-12 border-t pt-6">
      
      <div className="flex border-b text-sm font-medium">
        <button
          onClick={() => setActiveTab('description')}
          className={`pb-3 pr-6 ${
            activeTab === 'description' ? 'border-b-2 border-blue-600 text-blue-600 font-bold' : 'text-gray-500'
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('specifications')}
          className={`pb-3 px-6 ${
            activeTab === 'specifications' ? 'border-b-2 border-blue-600 text-blue-600 font-bold' : 'text-gray-500'
          }`}
        >
          Specifications
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-3 px-6 ${
            activeTab === 'reviews' ? 'border-b-2 border-blue-600 text-blue-600 font-bold' : 'text-gray-500'
          }`}
        >
          Reviews (128)
        </button>
      </div>

      
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Product Description</h3>
          <p className="mt-2 text-xs text-gray-600 leading-relaxed">
            {product.description} </p>
          {/*}   <ul className="mt-4 space-y-2 text-xs font-medium text-gray-700">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-600" /> High-fidelity sound with deep bass</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-600" /> Active noise cancellation</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-600" /> Soft ear cushions for all-day comfort</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-600" /> Foldable and portable design</li>
          </ul> */}
        </div>

        {/* 
        <div className="relative overflow-hidden rounded-xl bg-gray-800 p-6 text-white min-h-[220px] flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold">Better Sound<br />Bigger Moments</h4>
            <p className="mt-1 text-xs text-gray-300">Your music. Your way.</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
            alt="Lifestyle headphones"
            className="absolute inset-0 h-full w-full object-cover opacity-50 -z-0"
          />
        </div> */}
      </div>
    </div>
  );
}
