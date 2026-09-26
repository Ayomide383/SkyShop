import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const [error, setError] = useState('');
const [loading, setLoading] = useState(false);


  const handleGoogleLogin = async () => {
  setError('');

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/`,
    },
  });

  if (error) {
    setError(error.message);
  }
};

  

  const handleLogin = async (e) => {
  e.preventDefault();

  setError('');

  if (!email || !password) {
    setError('Please enter your email and password.');
    return;
  }

  setLoading(true);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  setLoading(false);

  if (error) {
    setError(error.message);
    return;
  }

  navigate('/');
};

  return (
    <div className="min-h-screen bg-sky-50 px-4 py-12 flex items-center justify-center">

      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="text-3xl font-bold text-sky-500"
          >
            SkyShop
          </Link>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Log in to your SkyShop account.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-lg border border-gray-100">

          {/* Google */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-50 transition"
            onClick={handleGoogleLogin}
          >
            
            <span className="text-lg font-bold">G</span>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-gray-200"></div>

            <span className="text-xs text-gray-400">
              OR CONTINUE WITH EMAIL
            </span>

            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          <form
  onSubmit={handleLogin}
  className="space-y-5"
>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
/>
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-sky-500 hover:text-sky-600"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <Lock
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  value={password}
onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-11 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>
            {error && (
  <p className="text-sm text-red-500">
    {error}
  </p>
)}

            {/* Login */}
            <button
  type="submit"
  disabled={loading}
  className="w-full rounded-lg bg-sky-500 py-3 font-semibold text-white hover:bg-sky-600 transition disabled:opacity-50"
>
  {loading ? 'Logging in...' : 'Log In'}
</button>

          </form>

          {/* Sign Up */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-sky-500 hover:text-sky-600"
            >
              Create account
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}