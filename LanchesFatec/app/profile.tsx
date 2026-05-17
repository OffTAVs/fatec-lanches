import { StyleSheet, TouchableOpacity, View, Alert, Linking } from "react-native";
import BasePage from "@/components/BasePage";
import Btn from "@/components/Btn";
import TextFont from '@/components/TextFont';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from "expo-router";
import ProfileCard from "@/components/profileCard";
import { useState, useEffect } from 'react';
import api from '@/utils/api';

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState({
        nome: '',
        email: '',
        profileImage: null,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await SecureStore.getItemAsync('token');
                if (!token) {
                    router.replace('/login');
                    return;
                }
                const response = await api.get('/usuarios/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser({
                    nome: response.data.nome,
                    email: response.data.email,
                    profileImage: response.data.foto || null,
                });
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
                Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
            <BasePage title="Perfil" subtitle="Gerencie suas informações" showCart={false}>
                <TextFont>Carregando...</TextFont>
            </BasePage>
        );
    }

    function issues() {
        Alert.alert('Aviso!', 'Você será redirecionado para nosso suporte', [
            { text: "Ficar no Fatec Lanches", style: "cancel" },
            {
                text: "Ok",
                onPress: () =>
                    Linking.openURL('https://github.com/Lizandraferrari/fatec-lanches/issues')
            }
        ]);
    }

    function confirm() {
        Alert.alert('Você quer mesmo sair?', '', [
            { text: "Não", style: "cancel" },
            { text: "Sim", onPress: async () => {
                await SecureStore.deleteItemAsync('token');
                router.push('/login');
            }}
        ]);
    }

    return (
        <BasePage title="Perfil" subtitle="Gerencie suas informações" showCart={false}>
            <ProfileCard
                nome={user.nome}
                email={user.email}
                profileImage={user.profileImage} // apenas exibe
            />

            <View style={styles.options}>
                <Btn variant="cyan" onPress={() => router.push('/editProfile')}>Editar Perfil</Btn>
                <Btn variant="red" onPress={confirm}>Sair</Btn>

                <TouchableOpacity>
                    <TextFont style={styles.link}>Excluir Conta</TextFont>
                </TouchableOpacity>

                <TouchableOpacity onPress={issues}>
                    <TextFont style={styles.link}>Relatar um Problema</TextFont>
                </TouchableOpacity>
            </View>
        </BasePage>
    );
}

const styles = StyleSheet.create({
    options: {
        
        gap: 8,
        margin: 10,
        alignItems: 'center'
    },
    link: {
        color: '#0000EE',
        textDecorationLine: 'underline',
        fontSize: 14,
    },
});
