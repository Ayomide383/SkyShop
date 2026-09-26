import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    setMessage('');
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/reset-password`,
      }
    );

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage(
      'If an account exists with this email, a password reset link has been sent.'
    );
  };

  return (
    <div className="min-h-screen bg-sky-50 px-4 py-12">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm">
        
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="text-2xl font-bold text-sky-500"
          >
            SkyShop
          </Link>

          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Forgot your password?
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-5">
          
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          {message && (
            <p className="text-sm text-green-600">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-sky-500 py-3 font-semibold text-white transition hover:bg-sky-600 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <Link
          to="/login"
          className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-700"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </div>
    </div>
  );
}