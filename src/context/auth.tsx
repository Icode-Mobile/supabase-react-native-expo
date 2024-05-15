import { Session } from '@supabase/supabase-js';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { supabase } from '@/utils/supabase';
import { router } from 'expo-router';

interface AuthContextProps {
  session: Session | null;
  isAuthenticated: boolean;
  handleSignOut: () => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const handleSignOut = async () => {
    supabase.auth.signOut();
    setSession(null);
    router.replace('/');
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: !!session,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
