import { useState } from 'react';
import { View, TouchableOpacity, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Input from '@/components/Input';
import BlueBtn from '@/components/Btn';
import styles from '../styles/authStyle'
import api from '@/utils/api';
import TextFont from '@/components/TextFont';

export default function RegisterRoute() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const onChangeNameHandler = (nome: string) => {
    setNome(nome);
  };

  const onChangePasswordHandler = (password: string) => {
    setPassword(password)
  }

  const onChangeEmailHandler = (email: string) => {
    setEmail(email)
  }

  const onChangeConfirmHandler = (confirm: string) => {
    setConfirm(confirm)
  }

  async function handleRegister() {
    if (!email || !nome || !password || !confirm) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Atenção', 'As senhas Estão diferentes.');
      return;
    }

    try {

      const response = await api.post('/usuarios/registrar', {
        nome: nome,
        email: email,
        senha: password
      })

      const message = response.data.mensagem || 'Cadastro realizado com sucesso!';

      if (response.status === 201) {
        Alert.alert('Sucesso', message, [
          { text: 'Realize seu Login', onPress: () => router.replace('/login') },
        ]);
      }
    }
    catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível realizar o cadastro.');

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
          <TextFont style={styles.label}>Faça seu cadastro:</TextFont>
          <Input label="E-mail" placeholder="fulano.silva@fatec.sp.gov.br" value={email} onChangeText={onChangeEmailHandler} />
          <Input label="Nome" placeholder="Fulano da Silva" value={nome} onChangeText={onChangeNameHandler} />
          <Input label="Senha" placeholder="Senha" secureTextEntry value={password} onChangeText={onChangePasswordHandler} />
          <Input label="Confirmar Senha" placeholder="Confirmar Senha" secureTextEntry value={confirm} onChangeText={onChangeConfirmHandler} />

          <BlueBtn onPress={() => { handleRegister(); }}>Cadastrar</BlueBtn>
        </View>

        <TouchableOpacity onPress={() => router.replace('/login')}>
          <TextFont style={styles.link}>Fazer login</TextFont>
        </TouchableOpacity>
      </View>
    </View>
  );
}
