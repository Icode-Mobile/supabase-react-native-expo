import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  ButtonStyle,
  ImageStyle,
  TextInputStyle,
  TextStyle,
  ViewStyle,
} from '@/utils/tailwindcss';

import { supabase } from '@/utils/supabase';

export default function App() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId:
      '245389036455-v4g7tj083c2ofr94vigr36fdj84h06g0.apps.googleusercontent.com',
  });

  const handleSignInWithEmailPass = async () => {
    setLoading(true);
    if (!email || email.length <= 0) {
      Alert.alert('Email Inválido', 'Preencha um email correto!');
    } else if (!password || password.length <= 0) {
      Alert.alert('Senha Inválida', 'Preencha uma senha correta!');
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        if (error.message == 'Invalid login credentials') {
          const { error: e } = await supabase.auth.signUp({
            email,
            password,
          });
          if (e) {
            Alert.alert('Erro', 'Algo de errado aconteceu');
            console.log('ERROR', error.message);
          } else {
            Alert.alert(
              'Cadastrado!',
              'Você foi cadastrado, mas é preciso confirmar o seu email por favor!'
            );
          }
        }
      } else {
        Alert.alert('Sucesso!', 'Seja bem vindo');
        router.push('/home');
      }
    }
    setLoading(false);
  };

  const handleSignInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.idToken) {
        // Info do usuário sem gravar no auth supabase
        // Porém, pode ser uma boa estratégia guardar no database supabase
        console.log(userInfo);

        const { error, data } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.idToken,
        });
        console.log(error, data);
      } else {
        throw new Error('No ID Token present!');
      }
    } catch (e: any) {
      switch (e.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          console.log('User cancelled the login flow');
          break;
        case statusCodes.IN_PROGRESS:
          console.log('Flow in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log('Play services not available');
          break;
        default:
          console.log('Something happened', e);
      }
    }
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
            {loading ? (
              <ActivityIndicator size={'small'} color={'#fff'} />
            ) : (
              <TextStyle className='text-white text-[14px] font-bold'>
                ENTRAR
              </TextStyle>
            )}
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
