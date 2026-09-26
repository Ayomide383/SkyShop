import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

export default function ImageGallery({ images = [], image }) {
  const galleryImages = images.length > 0 ? images : image ? [image] : [];

const [selectedImg, setSelectedImg] = useState(galleryImages[0] || null);
useEffect(() => {
  setSelectedImg(galleryImages[0] || null);
}, [images, image]);

const handleNext = () => {
  const currentIndex = galleryImages.indexOf(selectedImg);
  const nextIndex = (currentIndex + 1) % galleryImages.length;

  setSelectedImg(galleryImages[nextIndex]);
};

const handlePrevious = () => {
  const currentIndex = galleryImages.indexOf(selectedImg);
  const previousIndex =
    (currentIndex - 1 + galleryImages.length) % galleryImages.length;

  setSelectedImg(galleryImages[previousIndex]);
};
  
  return (
    <div className="flex gap-4">
      
      <div className="flex flex-col gap-3">
        {galleryImages.map((img, idx) => (
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

       <button
  onClick={handlePrevious}
  disabled={galleryImages.length < 2}
  className="absolute left-2 rounded-full bg-white p-2 shadow text-gray-600 disabled:opacity-40"
>
  <ChevronLeft className="h-5 w-5" />
</button>

       {selectedImg ? (
  <img
    src={selectedImg}
    alt="Main Product"
    className="max-h-96 object-contain"
  />
) : (
  <p className="text-gray-500">No image available</p>
)}

      <button
  onClick={handleNext}
  disabled={galleryImages.length < 2}
  className="absolute right-2 rounded-full bg-white p-2 shadow text-gray-600 disabled:opacity-40"
>
  <ChevronRight className="h-5 w-5" />
</button>
      </div>
    </div>
  );
}
