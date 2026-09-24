import React from 'react';
import {
  ArrowRight,
  Heart,
  ShieldCheck,
  Sparkles,
  Truck,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="bg-gradient-to-br from-sky-50 via-white to-blue-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 bg-white border border-sky-100 shadow-sm rounded-full px-4 py-2 text-sm font-semibold text-blue-600 mb-6">
              <Sparkles className="w-4 h-4" />
              Welcome to NewLogo
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
              Shopping should feel
              <span className="text-blue-600"> simple.</span>
            </h1>

            <p className="mt-6 text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              NewLogo is built around a simple idea: make discovering
              great products easy, enjoyable, and straightforward.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">

              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full font-bold transition-colors"
              >
                Start Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/deals"
                className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 hover:border-blue-300 hover:text-blue-600 px-5 py-3 rounded-full font-semibold transition-colors"
              >
                See Deals
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <div>

            <p className="text-sm font-bold text-blue-600 uppercase tracking-wider">
              Our Story
            </p>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
              A store made for everyday shopping.
            </h2>

            <p className="text-slate-600 leading-relaxed mt-5">
              NewLogo brings different kinds of products together in
              one simple shopping experience. From everyday essentials
              to products you discover along the way, we want browsing
              to feel clear and enjoyable.
            </p>

            <p className="text-slate-600 leading-relaxed mt-4">
              We're focused on making the important things easy:
              finding products, understanding what you're buying,
              adding items to your cart, and getting through checkout
              without unnecessary complications.
            </p>

          </div>


          <div className="relative">

            <div className="bg-gradient-to-br from-blue-600 to-sky-400 rounded-3xl p-8 sm:p-10 text-white shadow-xl">

              <div className="text-6xl font-black opacity-20">
                “
              </div>

              <p className="text-xl sm:text-2xl font-bold leading-relaxed -mt-5">
                Good shopping doesn't need to be complicated.
              </p>

              <div className="mt-7 h-px bg-white/20" />

              <p className="text-blue-50 text-sm mt-5">
                Simple products. Simple browsing. A better shopping
                experience.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* WHY US */}
      <section className="bg-slate-50 border-y border-slate-100">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          <div className="text-center max-w-2xl mx-auto mb-10">

            <p className="text-sm font-bold text-blue-600 uppercase tracking-wider">
              Why NewLogo
            </p>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
              Built around what matters
            </h2>

            <p className="text-slate-500 mt-3">
              We keep the experience simple so you can focus on finding
              what you actually want.
            </p>

          </div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="w-11 h-11 rounded-xl bg-sky-50 text-blue-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>

              <h3 className="font-bold text-slate-900 mt-5">
                Quality Focus
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed mt-2">
                Products are presented clearly so you can make better
                shopping decisions.
              </p>
            </div>


            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="w-11 h-11 rounded-xl bg-sky-50 text-blue-600 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>

              <h3 className="font-bold text-slate-900 mt-5">
                Easy Shopping
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed mt-2">
                Find products, add them to your cart, and move through
                the store with less friction.
              </p>
            </div>


            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="w-11 h-11 rounded-xl bg-sky-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>

              <h3 className="font-bold text-slate-900 mt-5">
                Clear Experience
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed mt-2">
                Straightforward product information and a clean
                shopping journey.
              </p>
            </div>


            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="w-11 h-11 rounded-xl bg-sky-50 text-blue-600 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>

              <h3 className="font-bold text-slate-900 mt-5">
                Customer First
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed mt-2">
                Every part of the experience is designed with shoppers
                in mind.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* SIMPLE STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="bg-slate-900 rounded-3xl overflow-hidden">

          <div className="grid md:grid-cols-3">

            <div className="p-8 sm:p-10 text-center md:border-r border-slate-700">

              <Users className="w-7 h-7 text-sky-400 mx-auto" />

              <p className="text-3xl font-black text-white mt-4">
                People First
              </p>

              <p className="text-slate-400 text-sm mt-2">
                Designed around a simple shopping experience.
              </p>

            </div>


            <div className="p-8 sm:p-10 text-center md:border-r border-slate-700">

              <ShoppingBagIcon />

              <p className="text-3xl font-black text-white mt-4">
                One Store
              </p>

              <p className="text-slate-400 text-sm mt-2">
                Different products in one convenient place.
              </p>

            </div>


            <div className="p-8 sm:p-10 text-center">

              <Heart className="w-7 h-7 text-sky-400 mx-auto" />

              <p className="text-3xl font-black text-white mt-4">
                Made With Care
              </p>

              <p className="text-slate-400 text-sm mt-2">
                A project focused on making shopping easier.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        <div className="bg-gradient-to-r from-blue-600 to-sky-500 rounded-3xl px-6 py-10 sm:px-10 text-center text-white">

          <h2 className="text-2xl sm:text-3xl font-black">
            Ready to explore?
          </h2>

          <p className="text-blue-50 mt-2">
            Find something you'll love.
          </p>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full font-bold mt-6 hover:bg-blue-50 transition-colors"
          >
            Browse Products
            <ArrowRight className="w-4 h-4" />
          </Link>

        </div>

      </section>

    </main>
  );
}


function ShoppingBagIcon() {
  return (
    <div className="flex justify-center">
      <div className="w-7 h-7 rounded-lg bg-sky-400/10 flex items-center justify-center">
        <span className="text-sky-400 text-sm font-black">
          N
        </span>
      </div>
    </div>
  );
}