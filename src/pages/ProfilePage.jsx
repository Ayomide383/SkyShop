import { useAuth } from '../context/AuthContext.jsx';
import { supabase } from '../lib/supabase';
import React, { useEffect, useRef, useState } from 'react';
import {
  UserRound,
  Mail,
  Phone,
  Pencil,
  Check,
  X,
  ShoppingCart,
  ShoppingBag,
  ArrowRight,
  Box,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const initialProfile = {
  name: 'User',
  email: 'user@gmail.com',
  phone: '00000000000',
};

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(initialProfile);
  const [formData, setFormData] = useState(initialProfile);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarSuccess, setAvatarSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
    setSaved(false);
  };

  const handleAvatarUpload = async (e) => {
  const file = e.target.files?.[0];

  if (!file || !user) return;

  setAvatarLoading(true);
  setError('');

  const oldAvatarUrl = profile.avatar_url;

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.refreshSession();

  if (sessionError || !session) {
    setError('Your session has expired. Please log in again.');
    setAvatarLoading(false);
    return;
  }

  const fileExt = file.name.split('.').pop();
  const filePath = `${user.id}/avatar-${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Avatar upload error:', uploadError);
    setError(uploadError.message);
    setAvatarLoading(false);
    return;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath);

  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      avatar_url: publicUrl,
    })
    .eq('id', user.id);

  if (profileError) {
    console.error('Profile avatar error:', profileError);
    setError('Image uploaded, but your profile could not be updated.');
    setAvatarLoading(false);
    return;
  }

  setProfile((prev) => ({
  ...prev,
  avatar_url: publicUrl,
}));

setAvatarSuccess(true);

if (oldAvatarUrl) {
  const oldPath = oldAvatarUrl.split('/avatars/')[1];

  if (oldPath) {
    const { error: deleteError } = await supabase.storage
      .from('avatars')
      .remove([oldPath]);

    if (deleteError) {
      console.error('Old avatar delete error:', deleteError);
      setError(`Old avatar could not be deleted: ${deleteError.message}`);
    }
  }
}

setAvatarLoading(false);
};

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleSave = async (e) => {
  e.preventDefault();

  if (!user) return;

  setError('');
  setSaved(false);

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: formData.name,
      phone: formData.phone,
    })
    .eq('id', user.id);

  if (error) {
    console.error('Save profile error:', error);
    setError('Failed to save your profile. Please try again.');
    return;
  }

  setProfile(formData);
  setIsEditing(false);
  setSaved(true);
};
  
  useEffect(() => {
  const loadProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, phone, avatar_url')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Profile error:', error);
      setLoading(false);
      return;
    }

    const loadedProfile = {
  name: data.full_name || '',
  email: user.email || '',
  phone: data.phone || '',
  avatar_url: data.avatar_url || '',
};

    setProfile(loadedProfile);
    setFormData(loadedProfile);
    setLoading(false);
  };

  loadProfile();
}, [user]);

  const displayValue = (value, fallback) => value.trim() || fallback;

  const getInitial = () => {
    const name = profile.name.trim();

    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* PAGE HEADING */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-sky-600">
            SKYSHOP ACCOUNT
          </p>

          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Welcome back! Manage your personal information here.
          </p>
        </div>

        {/* PROFILE HEADER */}
        <section className="mb-6 overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm">
          <div className="h-2 bg-gradient-to-r from-sky-500 to-blue-600" />

          <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleAvatarUpload}
              className="hidden"
            />

          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-7">
            <button
                  type="button"
                  className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sky-100 text-2xl font-extrabold text-sky-700 ring-4 ring-sky-50"
                  onClick={() => {
  if (!avatarLoading) {
    fileInputRef.current?.click();
  }
}}
                >
                  {avatarLoading ? (
  <span className="text-sm font-semibold">
    ...
  </span>
) : profile.avatar_url ? (
  <img
    src={profile.avatar_url}
    alt="Profile"
    className="h-full w-full rounded-full object-cover"
  />
) : (
  getInitial()
)}
            </button>

            <div className="min-w-0 flex-1">
              <p className="text-sm text-slate-500">Hello,</p>

              <h2 className="break-words text-xl font-extrabold text-slate-900 sm:text-2xl">
                {displayValue(profile.name, 'Your Name')}
              </h2>

              {/*  <p className="mt-1 text-sm text-slate-500">
                Your NewLogo account
              </p> */}
            </div>

            {!isEditing && (
              <button
                type="button"
                onClick={handleEdit}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-sky-200 bg-white px-5 py-2.5 text-sm font-semibold text-sky-700 transition hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                <Pencil className="h-4 w-4" />
                Edit Profile
              </button>
            )}
          </div>
        </section>

        {/* PERSONAL INFORMATION */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
              <UserRound className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Personal Information
              </h2>

              <p className="text-sm text-slate-500">
                Your contact details
              </p>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly
                  placeholder="Enter your email address"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                  <Check className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* NAME */}
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-400">
                    <UserRound className="h-4 w-4" />
                    <span className="text-xs font-medium">Full Name</span>
                  </div>

                  <p className="break-words font-semibold text-slate-800">
                    {displayValue(profile.name, 'Not added yet')}
                  </p>
                </div>

                {/* EMAIL */}
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-400">
                    <Mail className="h-4 w-4" />
                    <span className="text-xs font-medium">Email Address</span>
                  </div>

                  <p className="break-words font-semibold text-slate-800">
                    {displayValue(profile.email, 'Not added yet')}
                  </p>
                </div>

                {/* PHONE */}
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 sm:col-span-2">
                  <div className="mb-2 flex items-center gap-2 text-slate-400">
                    <Phone className="h-4 w-4" />
                    <span className="text-xs font-medium">Phone Number</span>
                  </div>

                  <p className="break-words font-semibold text-slate-800">
                    {displayValue(profile.phone, 'Not added yet')}
                  </p>
                </div>
              </div>

              {saved && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  <Check className="h-4 w-4" />
                  Profile changes saved.
                </div>
              )}
              {error && (
              <p className="mt-2 text-sm text-red-500">
                {error}
              </p>
            )}
            </>
          )}
        </section>

        {/* QUICK LINKS */}
        <section className="mt-6">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            Quick Links
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              to="/cart"
              className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                <ShoppingCart className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-slate-900">My Cart</h3>
                <p className="mt-1 text-sm text-slate-500">
                  View the items you've added
                </p>
              </div>

              <ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-600" />
            </Link>

            <Link
              to="/shop"
              className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                <ShoppingBag className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-slate-900">Continue Shopping</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Explore products in our shop
                </p>
              </div>

              <ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-600" />
            </Link>


            <Link
              to="/orders"
              className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                <Box className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-slate-900">Your Orders</h3>
                <p className="mt-1 text-sm text-slate-500">
                  View your orders
                </p>
              </div>

              <ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-600" />
            </Link>
          </div>
          {user && (
  <button
    onClick={async () => {
      const { error } = await logout();

      if (error) {
        console.error(error);
      }
    }}
    className="text-sm text-red-500"
  >
    Logout
  </button>
)}
        </section>

        {/*}    {/* SMALL FOOTNOTE 
        <p className="mt-6 text-center text-xs leading-relaxed text-slate-400">
          Your profile details are currently stored in React state and will
          reset when the page reloads. Account storage can be added later.
        </p> */}

      </div>
    </main>
  );
}
