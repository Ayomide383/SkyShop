import React, { useState } from 'react';
import { Star, Wifi, Volume2, Battery, Zap, Smile } from 'lucide-react';

export default function ProductInfo( {product} ) {
  const [selectedColor, setSelectedColor] = useState('blue');

  const colors = [
    { name: 'blue', bg: 'bg-blue-600' },
    { name: 'black', bg: 'bg-black' },
    { name: 'white', bg: 'bg-gray-200' },
    { name: 'pink', bg: 'bg-pink-400' },
  ];

  return (
    <div className="space-y-4">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{product?.category}</span>
      <h2 className="text-2xl font-bold text-gray-900">{product?.title}</h2>

      {/* Rating */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <span className="font-semibold text-gray-800">{product?.rating}</span>
        <span>({product.reviews})</span>
      </div>

      {/* Pricing */}
      <div className="flex items-center space-x-3">
        <span className="text-3xl font-bold text-blue-600">${product?.price}</span>
        <span className="text-sm text-gray-400 line-through">$89.99</span>
        <span className="rounded-md bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">33% OFF</span>
      </div>

      {/*   <p className="text-sm text-gray-600 leading-relaxed">
        Enjoy high-quality sound, deep bass and all-day comfort with our wireless headphones. Perfect for music, gaming, work and travel. Features advanced noise cancellation and long battery life.
      </p>

      
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2"><Wifi className="h-4 w-4 text-gray-500" /> Bluetooth 5.3 connection</div>
        <div className="flex items-center gap-2"><Volume2 className="h-4 w-4 text-gray-500" /> Active Noise Cancellation (ANC)</div>
        <div className="flex items-center gap-2"><Battery className="h-4 w-4 text-gray-500" /> Up to 40 hours battery life</div>
        <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-gray-500" /> Fast charging (10 min = 5 hours)</div>
        <div className="flex items-center gap-2"><Smile className="h-4 w-4 text-gray-500" /> Comfortable over-ear design</div>
      </div>

      
      <div className="pt-2">
        <label className="text-xs font-semibold text-gray-700">Color:</label>
        <div className="mt-2 flex space-x-3">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={`h-6 w-6 rounded-full ${color.bg} ${
                selectedColor === color.name ? 'ring-2 ring-blue-600 ring-offset-2' : ''
              }`}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
}
