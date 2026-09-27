import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted) {
        if (session?.user) {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('is_active')
    .eq('id', session.user.id)
    .single();

  if (error) {
    console.error('Profile status error:', error);
    setUser(null);
  } else if (profile.is_active === false) {
    await supabase.auth.signOut();
    setUser(null);
  } else {
    setUser(session.user);
  }
} else {
  setUser(null);
}

setLoading(false);
      }
    };

    getSession();

    const {
  data: { subscription },
} = supabase.auth.onAuthStateChange(
  async (_event, session) => {
    if (!session?.user) {
      setUser(null);
      return;
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('is_active')
      .eq('id', session.user.id)
      .single();

    if (error) {
      console.error('Profile status error:', error);
      setUser(null);
      return;
    }

    if (profile.is_active === false) {
      await supabase.auth.signOut();
      setUser(null);
      return;
    }

    setUser(session.user);
  }
);

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}