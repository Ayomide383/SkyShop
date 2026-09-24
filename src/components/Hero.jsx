import React from 'react'
import {
  ShoppingBag,
  Tag,
  Truck,
  ShieldCheck,
  Award
} from 'lucide-react'
import {Link} from 'react-router-dom'

const Hero = () => {
  return (
    <section className="overflow-hidden">

      <div
        className="
          relative flex flex-col md:flex-row
          items-center justify-between
          min-h-[620px]
          px-6 sm:px-10 lg:px-16
          py-12 md:py-16
          gap-10
          bg-gradient-to-br from-sky-50 via-sky-100 to-blue-200
        "
      >

        
        <div className="absolute -top-32 -right-20 h-80 w-80 rounded-full bg-sky-200/50" />

        <div className="absolute bottom-0 right-1/3 h-20 w-20 rounded-full bg-white/40" />

      
        <div className="relative z-10 w-full md:w-1/2 max-w-xl">

  
          <div className="inline-flex items-center rounded-full bg-sky-200/70 px-4 py-2 text-sm font-bold text-sky-700">
            BEST QUALITY • BEST PRICE
          </div>

        
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
            Discover Amazing
            <span className="block text-sky-600">
              Products
            </span>
          </h1>

  
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
            Quality Products, Best Price.
            <br />
            Fast Delivery, Shop now!
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap gap-4">

          <Link to="/shop">
            <button
              type="button"
              className="
                flex items-center gap-2
                rounded-lg
                bg-sky-600
                px-6 py-3
                font-bold text-white
                shadow-md
                transition
                hover:bg-sky-700
              "
            >
              <ShoppingBag size={20} />
              Shop Now
            </button>
          </Link>

         <Link to="/deals">
            <button
              type="button"
              className="
                flex items-center gap-2
                rounded-lg
                border-2 border-sky-600
                bg-white
                px-6 py-3
                font-bold text-sky-600
                transition
                hover:bg-sky-50
              "
            >
              <Tag size={20} />
              Explore Deals
            </button>
          </Link>

          </div>

        
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">

            <div className="flex items-center gap-3">
              <div className="rounded-full bg-sky-200 p-3 text-sky-600">
                <Truck size={22} />
              </div>

              <div>
                <p className="font-bold text-slate-800">
                  Fast Delivery
                </p>
                <p className="text-sm text-slate-500">
                  On all orders
                </p>
              </div>
            </div>


            <div className="flex items-center gap-3">
              <div className="rounded-full bg-sky-200 p-3 text-sky-600">
                <ShieldCheck size={22} />
              </div>

              <div>
                <p className="font-bold text-slate-800">
                  Secure Payment
                </p>
                <p className="text-sm text-slate-500">
                  100% protected
                </p>
              </div>
            </div>


            <div className="flex items-center gap-3">
              <div className="rounded-full bg-sky-200 p-3 text-sky-600">
                <Award size={22} />
              </div>

              <div>
                <p className="font-bold text-slate-800">
                  Best Quality
                </p>
                <p className="text-sm text-slate-500">
                  Premium products
                </p>
              </div>
            </div>

          </div>

        </div>


        
        <div className="relative z-10 flex w-full md:w-1/2 justify-center">

          <div className="relative flex h-[320px] w-[320px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px] items-center justify-center rounded-full bg-sky-300/40">

            
            <div className="absolute bottom-12 h-12 w-3/4 rounded-[50%] bg-white shadow-lg" />

            <img
              src="./1.png"
              alt="Featured headphones and smartwatch"
              className="
                relative z-10
                w-full
                max-w-lg
                object-contain
                drop-shadow-2xl
              "
            />

          </div>

        </div>

      </div>

    </section>
  )
}

export default Hero