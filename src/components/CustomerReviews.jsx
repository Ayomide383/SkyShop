import React from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquare } from 'lucide-react';

export default function CustomerReviews() {
  const ratings = [
    { stars: 5, pct: '78%' },
    { stars: 4, pct: '15%' },
    { stars: 3, pct: '4%' },
    { stars: 2, pct: '2%' },
    { stars: 1, pct: '1%' },
  ];

  return (
    <div className="rounded-2xl border bg-gray-50 p-6">
      <h3 className="font-bold text-gray-900">Customer Reviews</h3>

      {/* Overall Score */}
      <div className="mt-2 flex items-baseline space-x-2">
        <span className="text-3xl font-extrabold text-gray-900">4.5</span>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <span className="text-xs text-gray-500">(128 reviews)</span>
      </div>

      
      <div className="mt-4 space-y-1.5">
        {ratings.map((r) => (
          <div key={r.stars} className="flex items-center text-xs text-gray-600 space-x-2">
            <span className="w-2">{r.stars}</span>
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <div className="h-1.5 flex-1 rounded-full bg-gray-200">
              <div className="h-1.5 rounded-full bg-blue-600" style={{ width: r.pct }} />
            </div>
            <span className="w-8 text-right text-[10px] text-gray-400">{r.pct}</span>
          </div>
        ))}
      </div>

      <hr className="my-6 border-gray-200" />

    
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 font-bold text-gray-700 text-xs">
            A
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="text-xs font-bold text-gray-900">Amaka D.</span>
              <span className="flex items-center text-[10px] text-blue-600 font-medium">
                <CheckCircle className="h-3 w-3 mr-0.5" /> Verified Purchase
              </span>
            </div>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">
          Great sound quality and very comfortable. Battery lasts long too. Highly recommend!
        </p>

        <div className="flex items-center space-x-4 text-xs text-gray-400">
          <button className="flex items-center space-x-1 hover:text-gray-600">
            <ThumbsUp className="h-3 w-3" /> <span>12</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-gray-600">
            <MessageSquare className="h-3 w-3" /> <span>1</span>
          </button>
        </div>
      </div>
    </div>
  );
}
