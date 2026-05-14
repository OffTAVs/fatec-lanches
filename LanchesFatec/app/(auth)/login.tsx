import { useState } from 'react';
import { View, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import Input from '@/components/Input';
import BlueBtn from '@/components/Btn';
import styles from '../styles/authStyle';
import api from '@/utils/api';
import * as SecureStore from 'expo-secure-store';
import TextFont from '@/components/TextFont';

export default function LoginRoute() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function saveToken(token: string) {
    await SecureStore.setItemAsync('token', token)
  }

  const onChangePasswordHandler = (password: string) => {
    setPassword(password)
  }

  const onChangeEmailHandler = (email: string) => {
    setEmail(email)
  }

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/usuarios/login', {
        email: email,
        senha: password
      });

      if (response.status === 200) {
        const token = response.data.token;
        await saveToken(token);
        router.replace('/menu')

      } else if (response.status === 404 || response.status === 401) {
        Alert.alert('Erro', 'Email ou senha incorretos.');
      } else {
        Alert.alert('Erro', 'Não foi possível realizar o login.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível realizar o login.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/icon/logo_fatec_br.png')}
          style={styles.headerLogo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <TextFont style={styles.title}>Lanches Fatec</TextFont>

        <View>
          <TextFont style={styles.label}>Faça seu login:</TextFont>
          <Input label="E-mail" placeholder="fulano.silva@fatec.sp.gov.br" value={email} onChangeText={onChangeEmailHandler} />
          <Input label="Senha" placeholder="Senha" secureTextEntry value={password} onChangeText={onChangePasswordHandler} />
          <BlueBtn onPress={() => { handleLogin() }}>Entrar</BlueBtn>
        </View>

        <TouchableOpacity onPress={() => router.push('/register')}>
          <TextFont style={styles.link}>Faça seu cadastro</TextFont>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size="large" color="#B20000" style={{marginTop: 15}} />
        ) : null
        }
      </View>
    </View>
  );
}
