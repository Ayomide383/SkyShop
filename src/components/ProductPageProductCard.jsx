import React from 'react'
import { Star, ShoppingCart  } from 'lucide-react'

const ProductPageProductPage = () => {
  return (
    <div className="bg-slate-100 p-3 rounded-lg shadow-md">
      <div className="aspect-square bg-sky-200 flex items-center justify-center rounded-lg mb-3">
        Product Image
      </div>

      
      <div className="flex flex-col justify-between  gap-2">
        <div>
          <h2 className="font-bold">
            Product Name
          </h2>
          <p className="font-extrabold text-sky-600">
            $999.99
          </p>

          <p className="flex items-center gap-1 text-sm text-gray-500">
  <Star
    size={12}
    className="text-yellow-400 fill-yellow-400"
  />
  4.8
</p>
        </div>
        <button className="w-full bg-sky-600 flex items-center justify-center rounded py-2 font-bold gap-4 text-white">
          <ShoppingCart className="text-white"/> Add to Cart 
        </button>
      </div>
    </div>
  )
}

export default ProductPageProductPage