import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';

import {
  ButtonStyle,
  ImageStyle,
  TextInputStyle,
  TextStyle,
  ViewStyle,
} from '@/utils/tailwindcss';

export default function App() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignInWithEmailPass = async () => {
    if (!email || email.length <= 0) {
      Alert.alert('Email Inválido', 'Preencha um email correto!');
    } else if (!password || password.length <= 0) {
      Alert.alert('Senha Inválida', 'Preencha uma senha correta!');
    } else {
      Alert.alert('Sucesso', 'Fazer Login Com Email e Senha!');
    }
  };

  const handleSignInWithGoogle = async () => {
    router.push('/home');
    //alert('Fazer Login Com Google');
  };

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={{
        flex: 1,
        backgroundColor: '#27272a',
      }}
    >
      <ViewStyle className='flex flex-1 flex-col items-center justify-center bg-zinc-800'>
        <StatusBar style='light' backgroundColor='transparent' translucent />
        <TextStyle className='text-white font-bold text-[18px]'>
          Entre com sua conta
        </TextStyle>
        <ViewStyle className='w-full flex flex-col items-center mt-2'>
          <TextInputStyle
            placeholder='Seu Email'
            onChangeText={setEmail}
            value={email}
            placeholderTextColor={'#999'}
            cursorColor={'#60a5fa'}
            className='bg-zinc-700 pl-2 text-zinc-300 border border-blue-400 w-[90%] h-12 rounded-md'
          />
          <TextInputStyle
            placeholder='Sua Senha'
            onChangeText={setPassword}
            value={password}
            placeholderTextColor={'#999'}
            cursorColor={'#60a5fa'}
            className='mt-4 bg-zinc-700 pl-2 text-zinc-300 border border-blue-400 w-[90%] h-12 rounded-md'
          />
          <ButtonStyle
            activeOpacity={0.7}
            onPress={handleSignInWithEmailPass}
            className='mt-3 bg-blue-400 w-[90%] h-12 rounded-md flex flex-col items-center justify-center'
          >
            <TextStyle className='text-white text-[14px] font-bold'>
              ENTRAR
            </TextStyle>
          </ButtonStyle>
        </ViewStyle>
        <ViewStyle className='bg-zinc-700 w-[80%] h-[1px] mt-10' />
        <ViewStyle className='mt-2'>
          <ButtonStyle
            activeOpacity={0.7}
            onPress={handleSignInWithGoogle}
            className='bg-white flex flex-row items-center p-2 rounded-full'
          >
            <ImageStyle
              defaultSource={require('../assets/google-icon.png')}
              source={require('../assets/google-icon.png')}
              className='w-5 h-5'
            />
            <TextStyle className='ml-2'>Login com Google</TextStyle>
          </ButtonStyle>
        </ViewStyle>
      </ViewStyle>
    </TouchableWithoutFeedback>
  );
}
