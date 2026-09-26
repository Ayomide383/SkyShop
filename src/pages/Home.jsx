import ProductCardH from '../components/ProductCardH.jsx';
import Categories from '../components/Categories.jsx';
import Hero from '../components/Hero.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { ArrowRight } from 'lucide-react';

import React from 'react'

const Home = ( {onAddToCart} ) => {
  
  return (
   <section className="flex flex-col space-y-6">
  <Hero />
     <div className="px-4 sm:px-8 lg:px-12 space-x-4">
  
         <h2 className="text-xl font-medium">Popular Products </h2> 
                  <ProductCardH onAddToCart={onAddToCart}/>
            
         </div>
     
   </section>
  )
}

export default Home