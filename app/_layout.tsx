import { AuthContextProvider } from '@/context/auth';
import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <AuthContextProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </AuthContextProvider>
  );
}
