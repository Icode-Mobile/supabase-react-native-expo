import { StatusBar } from 'expo-status-bar';

import { TextStyle, ViewStyle } from '@/utils/tailwindcss';

export default function Home() {
  let email = 'caio@gmail.com';
  let password = 'caio123';

  return (
    <ViewStyle className='flex flex-1 flex-col items-center pt-20 bg-zinc-800'>
      <StatusBar style='light' backgroundColor='transparent' translucent />
      <TextStyle className='font-bold text-[22px] text-white'>
        Usuário Logado
      </TextStyle>
      <ViewStyle className='mt-10'>
        <TextStyle className='text-zinc-300 text-[16px]'>
          Email: {email}
        </TextStyle>
        <TextStyle className='text-zinc-300 text-[16px]'>
          Password: {password}
        </TextStyle>
      </ViewStyle>
    </ViewStyle>
  );
}
