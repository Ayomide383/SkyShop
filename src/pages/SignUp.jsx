
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function SignUp() {
  const navigate = useNavigate();

const [formData, setFormData] = useState({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const [error, setError] = useState('');
const [loading, setLoading] = useState(false);


  const handleSignUp = async (e) => {
  e.preventDefault();

  setError('');

  if (!formData.fullName.trim()) {
    setError('Please enter your full name.');
    return;
  }

  if (!formData.email.trim()) {
    setError('Please enter your email.');
    return;
  }

  if (formData.password.length < 6) {
    setError('Password must be at least 6 characters.');
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setError('Passwords do not match.');
    return;
  }

  setLoading(true);

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,

    options: {
      data: {
        full_name: formData.fullName,
      },
    },
  });

  setLoading(false);

  if (error) {
    setError(error.message);
    return;
  }

  if (data.user && !data.session) {
  setError('');
  alert('Account created! Please check your email to confirm your account.');
  navigate('/login');
}
};

  const handleGoogleSignUp = async () => {
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
  
  return (
    <div className="min-h-screen bg-sky-50 px-4 py-12 flex items-center justify-center">

      <div className="w-full max-w-md">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="text-3xl font-bold text-sky-500"
          >
            SkyShop
          </Link>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Join SkyShop and start shopping today.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-lg border border-gray-100">

          {/* Google */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-50 transition"
            onClick={handleGoogleSignUp}
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
            onSubmit={handleSignUp}
            className="space-y-5"
          >

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={19}
                />

                <input
                  value={formData.fullName}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    fullName: e.target.value,
                      })
                  }
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={19}
                />

                <input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={19}
                />

                <input
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  type="password"
                  placeholder="Create a password"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <Eye size={19} />
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={19}
                />

                <input
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <Eye size={19} />
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1 accent-sky-500"
              />

              <p className="text-xs text-gray-500">
                I agree to the SkyShop Terms of Service and Privacy Policy.
              </p>
            </div>

            {error && (
  <p className="text-sm text-red-500">
    {error}
  </p>
)}

            {/* Create Account */}
            <button
  type="submit"
  disabled={loading}
  className="w-full rounded-lg bg-sky-500 py-3 font-semibold text-white hover:bg-sky-600 transition disabled:opacity-50"
>
  {loading ? 'Creating account...' : 'Create Account'}
</button>

          </form>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-sky-500 hover:text-sky-600"
            >
              Log in
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}