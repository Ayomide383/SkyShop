import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { supabase } from '../lib/supabase';

export default function AdminRoute() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setCheckingAdmin(false);
        return;
      }

      const { data, error } = await supabase.rpc('is_admin');

      if (error) {
        console.error('Admin check error:', error);
        setIsAdmin(false);
      } else {
        setIsAdmin(data);
      }

      setCheckingAdmin(false);
    };

    checkAdmin();
  }, [user]);

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">
          Checking admin access...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}