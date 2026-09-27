import React from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Send,
  Camera,
  Share2,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">

          {/* Brand */}
          <div className="lg:col-span-4">

            <Link
              to="/"
              className="inline-block text-2xl font-extrabold italic tracking-tight text-sky-400"
            >
              SKYSHOP
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              Discover quality products, great prices, and a simple shopping
              experience built for you.
            </p>

            {/* Social */}
            <div className="mt-7 flex items-center gap-3">

              <a
                href="https://wa.link/9vqixg"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 text-slate-400 transition hover:border-sky-500 hover:bg-sky-500 hover:text-white"
              >
                <MessageCircle size={18} />
              </a>

              <a
                href="#"
                aria-label="Social media"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 text-slate-400 transition hover:border-sky-500 hover:bg-sky-500 hover:text-white"
              >
                <Camera size={18} />
              </a>

              <a
                href="#"
                aria-label="Share"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 text-slate-400 transition hover:border-sky-500 hover:bg-sky-500 hover:text-white"
              >
                <Share2 size={18} />
              </a>

              <a
                href="mailto:taiwoabdulfatai45@gmail.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 text-slate-400 transition hover:border-sky-500 hover:bg-sky-500 hover:text-white"
              >
                <Send size={18} />
              </a>

            </div>

          </div>


          {/* Shop */}
          <div className="lg:col-span-2">

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Shop
            </h3>

            <nav className="mt-5 flex flex-col gap-3 text-sm">

              <Link
                to="/"
                className="text-slate-400 transition hover:text-sky-400"
              >
                Home
              </Link>

              <Link
                to="/shop"
                className="text-slate-400 transition hover:text-sky-400"
              >
                Shop All
              </Link>

              <Link
                to="/deals"
                className="text-slate-400 transition hover:text-sky-400"
              >
                Deals
              </Link>

              <Link
                to="/about"
                className="text-slate-400 transition hover:text-sky-400"
              >
                About Us
              </Link>

            </nav>

          </div>


          {/* Customer Care */}
          <div className="lg:col-span-3">

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Customer Care
            </h3>

            <nav className="mt-5 flex flex-col gap-3 text-sm">

              <a
                href="https://wa.link/9vqixg"
                className="flex items-center gap-2 text-slate-400 transition hover:text-sky-400"
              >
                Contact Us
                <ArrowUpRight size={14} />
              </a>

              <Link
                to="/about"
                className="text-slate-400 transition hover:text-sky-400"
              >
                FAQs
              </Link>

              <Link
                to="/about"
                className="text-slate-400 transition hover:text-sky-400"
              >
                Shopping Policies
              </Link>

              <Link
                to="/about"
                className="text-slate-400 transition hover:text-sky-400"
              >
                Returns & Refunds
              </Link>

            </nav>

          </div>


          {/* Contact */}
          <div className="lg:col-span-3">

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Get In Touch
            </h3>

            <div className="mt-5 flex flex-col gap-4 text-sm">

              <a
                href="mailto:taiwoabdulfatai45@gmail.com"
                className="flex items-start gap-3 text-slate-400 transition hover:text-sky-400"
              >
                <Mail
                  size={17}
                  className="mt-0.5 shrink-0"
                />

                <span>
                  taiwoabdulfatai45@gmail.com
                </span>
              </a>

              <a
                href="tel:+2348109434666"
                className="flex items-center gap-3 text-slate-400 transition hover:text-sky-400"
              >
                <Phone
                  size={17}
                  className="shrink-0"
                />

                <span>
                  +234 810 943 4666
                </span>
              </a>

              <div className="flex items-center gap-3 text-slate-400">
                <MapPin
                  size={17}
                  className="shrink-0"
                />

                <span>
                  Lagos, Nigeria
                </span>
              </div>

            </div>

          </div>

        </div>


        {/* Bottom */}
        <div className="mt-14 border-t border-slate-800 pt-6">

          <div className="flex flex-col gap-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © {new Date().getFullYear()} SkyShop. All rights reserved.
            </p>

            <p>
              Shop smarter. Shop SkyShop.
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;