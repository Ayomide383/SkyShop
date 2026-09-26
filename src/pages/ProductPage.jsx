import ProductInfo from '../components/ProductInfo.jsx';
import ProductDetailsTabs from '../components/ProductDetailsTabs.jsx';
import ImageGallery from '../components/ImageGallery.jsx';
import HeroBanner from '../components/HeroBanner.jsx';
import CustomerReviews from '../components/CustomerReviews.jsx';
import BuyBoxCard from '../components/BuyBoxCard.jsx';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../data/Product.js';

{/* const sampleImages = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
  'https://images.unsplash.com/photo-1583394838336-acd977736f90',
  'https://images.unsplash.com/photo-1484704849700-f032a568e944',
  'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
];
*/}

export default function ProductPage({ onAddToCart }) {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-blue-600 font-semibold">
          Loading product...
        </p>
      </div>
    );
  }

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold">
          Product not found
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <HeroBanner product={product}/>

      <main className="mx-auto max-w-7xl px-6 py-8">
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          <div className="lg:col-span-5">
            <ImageGallery 
  images={product.images}
  image={product.image}
 />
          </div>

          
          <div className="lg:col-span-4">
            <ProductInfo product={product} />
          </div>

          
          <div className="lg:col-span-3">
            <BuyBoxCard
  product={product}
  onAddToCart={onAddToCart}
/>
          </div>
        </div>

        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Side: Tabs */}
          <div className="lg:col-span-8">
            <ProductDetailsTabs   product={product} />
          </div>

          
          <div className="lg:col-span-4">
            <CustomerReviews />
          </div>
        </div>
      </main>
    </div>
  );
}
