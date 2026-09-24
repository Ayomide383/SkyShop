import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-sky-600 w-full px-4 sm:px-8 lg:px-12 py-10 text-white">

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">

        {/* Brand */}
        <div className="flex flex-col space-y-5">
          <h2 className="italic text-white font-bold text-2xl">
            SKYSHOP
          </h2>

          <p className="text-sm text-sky-100">
            Your one-stop shop for the best products online.
          </p>

          <div>
            social icons
          </div>
        </div>


        {/* Quick Links */}
        <div className="flex flex-col space-y-5">
          <h2 className="font-bold">
            Quick Links
          </h2>

          <nav className="flex flex-col space-y-2 text-sm">
            <Link to="/" className="hover:text-sky-200 transition">
              Home
            </Link>

            <Link to="/shop" className="hover:text-sky-200 transition">
              Shop
            </Link>

            <Link to="" className="hover:text-sky-200 transition">
              Categories
            </Link>

            <Link to="/deals" className="hover:text-sky-200 transition">
              Deals
            </Link>

            <Link to="/about" className="hover:text-sky-200 transition">
              About Us
            </Link>
          </nav>
        </div>


        {/* Customer Services */}
        <div className="flex flex-col space-y-5">
          <h2 className="font-bold">
            Customer Services
          </h2>

          <nav className="flex flex-col space-y-2 text-sm">
            <a href="https://wa.link/9vqixg" className="hover:text-sky-200 transition">
              Contact Us
            </a>

            <a href="#" className="hover:text-sky-200 transition">
              FAQs
            </a>

            <a href="#" className="hover:text-sky-200 transition">
              Shopping Policies
            </a>

            <a href="#" className="hover:text-sky-200 transition">
              Return & Refund
            </a>

            <a href="#" className="hover:text-sky-200 transition">
              Terms & Conditions
            </a>
          </nav>
        </div>


        {/* Contact */}
        <div className="flex flex-col space-y-5">
          <h2 className="font-bold">
            Contact
          </h2>

          <nav className="flex flex-col space-y-2 text-sm">
            <a href="mailto:taiwoabdulfatai45@gmail.com" className="hover:text-sky-200 transition">
              taiwoabdulfatai45@/gmail.com
            </a>

            <a href="tel:+2348109434666" className="hover:text-sky-200 transition">
              +234 810 943 4666
            </a>

            <p className="text-sky-100">
              Lagos, Nigeria
            </p>
          </nav>
        </div>

      </div>

    </footer>
  )
}

export default Footer