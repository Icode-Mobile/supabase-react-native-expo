import { Redirect, Slot } from 'expo-router';
import React from 'react';

import { AuthContextProvider, useAuth } from '@/context/auth';

export default function HomeLayout() {
  const { isAuthenticated, session } = useAuth();

  if (!isAuthenticated) {
    return Redirect({
      href: '/',
    });
  }

  return (
    <AuthContextProvider>
      <Slot />
    </AuthContextProvider>
  );
}
