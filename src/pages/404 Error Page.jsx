import React from 'react';
import { Home, ShoppingBag, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Left Column - Text Content */}
        <div className="flex flex-col items-start max-w-lg mx-auto lg:mx-0 text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/60 text-blue-600 text-xs font-bold tracking-wide mb-6">
            <AlertCircle className="w-3.5 h-3.5 fill-blue-600 text-blue-100" />
            <span>Page Not Found</span>
          </div>

          {/* 404 Headline */}
          <h1 className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 tracking-tight leading-none mb-4">
            404
          </h1>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Oops! The page you’re looking for can’t be found.
          </h2>

          {/* Subtitle */}
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8">
            The link might be broken, the page may have been removed, or you typed the wrong address.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              <span>Go Home</span>
            </Link>

            <Link
              to="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 active:scale-[0.98] text-blue-600 font-bold text-sm rounded-xl border border-blue-600 transition-all duration-200"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Right Column - Box Character Illustration */}
        <div className="relative flex items-center justify-center w-full max-w-lg mx-auto">
          <svg
            viewBox="0 0 600 450"
            className="w-full h-auto drop-shadow-md select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Soft Glow */}
            <ellipse cx="300" cy="225" rx="220" ry="160" fill="#E0F2FE" opacity="0.6" />

            {/* Clouds */}
            <path d="M120 100 C120 85 135 75 150 80 C160 65 185 65 195 80 C210 75 225 85 220 100 Z" fill="#BAE6FD" opacity="0.8" />
            <path d="M420 200 C420 185 435 175 450 180 C460 165 485 165 495 180 C510 175 525 185 520 200 Z" fill="#BAE6FD" opacity="0.8" />

            {/* Floor Oval / Shadow */}
            <ellipse cx="300" cy="380" rx="200" ry="25" fill="#38BDF8" opacity="0.15" />
            <ellipse cx="300" cy="380" rx="140" ry="15" fill="#0284C7" opacity="0.1" />

            {/* Decorative Blue Plants / Leaves */}
            <g fill="#38BDF8">
              <path d="M110 380 Q100 320 120 300 Q130 330 110 380 Z" />
              <path d="M125 380 Q135 310 150 290 Q150 330 125 380 Z" />
              <path d="M140 380 Q160 330 175 320 Q165 350 140 380 Z" />
            </g>

            <g fill="#38BDF8">
              <path d="M490 380 Q510 320 480 300 Q470 330 490 380 Z" />
              <path d="M465 380 Q455 310 440 290 Q440 330 465 380 Z" />
            </g>

            {/* Character Shadow */}
            <ellipse cx="290" cy="370" rx="90" ry="12" fill="#94A3B8" opacity="0.3" />

            {/* Character Feet */}
            <ellipse cx="240" cy="370" rx="18" ry="10" fill="#0284C7" />
            <ellipse cx="240" cy="367" rx="14" ry="7" fill="#38BDF8" />

            <ellipse cx="340" cy="370" rx="18" ry="10" fill="#0284C7" />
            <ellipse cx="340" cy="367" rx="14" ry="7" fill="#38BDF8" />

            {/* Cardboard Box Body */}
            <g id="box-body">
              {/* Main Front Face */}
              <path d="M200 220 L350 200 L350 350 L200 370 Z" fill="#E5A96A" />
              {/* Top Face */}
              <path d="M200 220 L270 170 L410 155 L350 200 Z" fill="#F4C48C" />
              {/* Side Face */}
              <path d="M350 200 L410 155 L410 300 L350 350 Z" fill="#C88A4A" />

              {/* Tape / Box Details */}
              <path d="M275 190 L275 360" stroke="#C88A4A" strokeWidth="2" strokeDasharray="4 4" />
              {/* Up Arrows Stamp */}
              <path d="M320 230 L320 250 M320 230 L315 236 M320 230 L325 236" stroke="#A36A32" strokeWidth="2" strokeLinecap="round" />
              <path d="M328 230 L328 250 M328 230 L323 236 M328 230 L333 236" stroke="#A36A32" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Sad Face Features */}
            <g id="face">
              {/* Eyebrows */}
              <path d="M235 242 Q245 235 255 245" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M285 245 Q295 235 305 242" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />

              {/* Eyes */}
              <ellipse cx="245" cy="255" rx="6" ry="8" fill="#0F172A" />
              <ellipse cx="295" cy="255" rx="6" ry="8" fill="#0F172A" />

              {/* Sad Mouth */}
              <path d="M255 285 Q270 270 285 285" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </g>

            {/* Left Arm (Resting) */}
            <path d="M200 290 Q170 310 160 340" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="160" cy="342" r="8" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />

            {/* Right Arm (Holding Sign) */}
            <path d="M370 270 Q420 250 425 220" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="425" cy="215" r="8" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />

            {/* Sign Stick */}
            <rect x="420" y="180" width="8" height="110" rx="3" fill="#334155" transform="rotate(12 420 180)" />

            {/* 404 Blue Sign Board */}
            <g transform="rotate(-8 420 120)">
              <rect x="380" y="100" width="130" height="80" rx="14" fill="#2563EB" />
              <rect x="384" y="104" width="122" height="72" rx="11" fill="#3B82F6" />
              <text x="445" y="155" textAnchor="middle" fill="#FFFFFF" fontSize="42" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">
                404
              </text>
            </g>
          </svg>
        </div>

      </div>
    </div>
  );
}