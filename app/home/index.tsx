import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { ButtonStyle, TextStyle, ViewStyle } from '@/utils/tailwindcss';

import { useAuth } from '@/context/auth';

export default function Home() {
  const { handleSignOut, session } = useAuth();

  let email = session?.user.email;
  let id = session?.user.id;

  return (
    <ViewStyle className='flex flex-1 flex-col items-center pt-20 bg-zinc-800'>
      <StatusBar style='light' backgroundColor='transparent' translucent />
      <TextStyle className='font-bold text-[22px] text-white'>
        Usuário Logado
      </TextStyle>
      <ViewStyle className='mt-10'>
        <TextStyle className='text-zinc-300 text-[16px]'>ID: {id}</TextStyle>
        <TextStyle className='text-zinc-300 text-[16px]'>
          Email: {email}
        </TextStyle>
      </ViewStyle>

      <ButtonStyle
        onPress={handleSignOut}
        className='mt-10 flex flex-row items-center absolute bottom-10'
      >
        <MaterialIcons name='logout' size={22} color={'#fff'} />
        <TextStyle className='text-white ml-2'>Sair da conta</TextStyle>
      </ButtonStyle>
    </ViewStyle>
  );
}
