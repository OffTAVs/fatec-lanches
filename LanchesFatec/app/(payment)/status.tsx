import { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import BasePage from "@/components/BasePage";
import TextFont from '@/components/TextFont';
import { useRouter } from 'expo-router';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function OrderStatus() {
    const router = useRouter();
    const [statusText, setStatusText] = useState("Carregando...");
    const [iconName, setIconName] = useState<any>("clock-outline");

    useEffect(() => {
        const checkStatus = async () => {
            const horaPedido = await SecureStore.getItemAsync('hora_pedido');
            
            if (!horaPedido) {
                setStatusText("Nenhum pedido em andamento");
                setIconName("close-circle-outline");
                return;
            }

            const agora = new Date().getTime();
            const diffMinutos = (agora - parseInt(horaPedido)) / 1000 / 60;

            if (diffMinutos < 2) {
                setStatusText("Recebido pela cozinha");
                setIconName("file-document-edit-outline");
            } else if (diffMinutos < 10) {
                setStatusText("Sendo preparado");
                setIconName("chef-hat");
            } else if (diffMinutos < 20) {
                setStatusText("Pronto para retirar!");
                setIconName("shopping-outline");
            } else {
                setStatusText("Pedido Finalizado");
                setIconName("check-circle-outline");
                // Opcional: Limpar o pedido concluído da memória
                // await SecureStore.deleteItemAsync('hora_pedido');
            }
        };

        checkStatus();
        
        // Atualiza a tela a cada 30 segundos
        const interval = setInterval(checkStatus, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <BasePage title="Meu Pedido" subtitle="Acompanhe o status">
            <View style={styles.container}>
                
                <MaterialCommunityIcons name={iconName} size={80} color="#b00000" style={styles.icon} />
                
                <TextFont style={styles.statusTitle}>Status atual:</TextFont>
                <TextFont style={styles.statusText}>{statusText}</TextFont>

                <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/menu')}>
                    <TextFont style={styles.backBtnText}>
                        <Octicons name="home" size={16} /> Voltar ao Menu
                    </TextFont>
                </TouchableOpacity>

            </View>
        </BasePage>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
    },
    icon: {
        marginBottom: 20,
    },
    statusTitle: {
        fontSize: 18,
        color: '#555',
    },
    statusText: {
        fontSize: 28,
        color: '#b00000',
        fontFamily: 'Roboto_700Bold',
        marginTop: 10,
        textAlign: 'center'
    },
    backBtn: {
        marginTop: 50,
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    backBtnText: {
        fontSize: 16,
        color: '#333'
    }
});