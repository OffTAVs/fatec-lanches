import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, ScrollView } from "react-native";
import TitleHeader from "./TitleHeader";
import NavBar from "./NavBar";
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import TextFont from '@/components/TextFont';
import api from "@/utils/api";

interface BasePageProps {
  title: string
  subtitle?: string
  children?: React.ReactNode
}

export default function BasePage({ title, subtitle, children }: BasePageProps) {
  const router = useRouter()
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  async function checkToken() {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) return false;
      
      const response = await api.get('/auth/token', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      
      if(response.data?.mensagem != 'Ok') {
        await SecureStore.deleteItemAsync('token');
        return false
      }

      const decoded: any = jwtDecode(token);
      const expirationTime = decoded.exp * 1000;
      const isExpired = Date.now() > expirationTime;

      if (isExpired) {
        Alert.alert('Sessão expirada', 'Realize novamente o Login')
        await SecureStore.deleteItemAsync('token');
        return false;
      }
      return true;

    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    async function run() {
      const result = await checkToken();
      setIsValidToken(result);
    }
    run();
  }, []);

  useEffect(() => {
    if (isValidToken === false) {
      router.replace("/login");
    }
  }, [isValidToken]); // Adicionado dependência para evitar loops

  if (isValidToken === null) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#B20000" />
      </View>
    )
  }

  if (!isValidToken) {
    return (
      <View style={[styles.container, styles.center]}>
        <TouchableOpacity onPress={() => router.replace('/login')}>
          <TextFont style={styles.link}>Deslogado! Caso não seja redirecionado automaticamente, clique aqui.</TextFont>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TitleHeader title={title} subtitle={subtitle} />
      {/* Removi o alignItems: 'center' daqui para o ItemCard 
          conseguir ocupar a largura total da tela.
      */}
      <View style={styles.children}>
        {children}
      </View>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Um fundo leve ajuda a destacar os cards brancos
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: {
    flex: 1,
    // Removido alignItems: 'center' para não esmagar os cards
    width: '100%', 
  },
  link: {
    fontSize: 18,
    color: '#0000EE',
    textAlign: 'center',
    textDecorationLine: 'underline',
    padding: 20
  },
});