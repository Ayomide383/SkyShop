import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Give Supabase a moment to process the OAuth
        // tokens from the URL hash.
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth callback error:', error);
          navigate('/login', { replace: true });
          return;
        }

        if (!session?.user) {
          console.error('No user session found.');
          navigate('/login', { replace: true });
          return;
        }

        const {
          data: isAdmin,
          error: adminError,
        } = await supabase.rpc('is_admin');

        if (adminError) {
          console.error(
            'Admin check error:',
            adminError
          );

          navigate('/', { replace: true });
          return;
        }

        if (isAdmin === true) {
          navigate('/admin', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error(
          'Authentication callback error:',
          error
        );

        navigate('/login', { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-sky-200 border-t-sky-500" />

        <p className="mt-4 text-sm font-medium text-slate-600">
          Signing you in...
        </p>
      </div>
    </div>
  );
}