import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

export default function ImageGallery({ images }) {
  const [selectedImg, setSelectedImg] = useState(images[0]);

  return (
    <div className="flex gap-4">
      
      <div className="flex flex-col gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImg(img)}
            className={`h-16 w-16 overflow-hidden rounded-lg border-2 ${
              selectedImg === img ? 'border-blue-600' : 'border-gray-200'
            }`}
          >
            <img src={img} alt="thumbnail" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      
      <div className="relative flex-1 rounded-2xl bg-gray-100 p-8 flex items-center justify-center">

        {/*   <button className="absolute left-2 rounded-full bg-white p-2 shadow text-gray-600">
          <ChevronLeft className="h-5 w-5" />
        </button> */}

        <img src={selectedImg} alt="Main Product" className="max-h-96 object-contain" />

       {/* <button className="absolute right-2 rounded-full bg-white p-2 shadow text-gray-600">
          <ChevronRight className="h-5 w-5" />
        </button> */}
      </div>
    </div>
  );
}
