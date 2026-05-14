import { StyleSheet, TouchableOpacity, View, ActivityIndicator, Alert } from "react-native";
import BasePage from "@/components/BasePage";
import Btn from "@/components/Btn";
import Input from "@/components/Input";
import Octicons from '@expo/vector-icons/Octicons';
import { useRouter } from "expo-router";
import TextFont from '@/components/TextFont';
import useCart from '@/hooks/useCart';
import { useEffect, useState } from "react";

export default function CardPayment() {
    const router = useRouter();
    const { total, loading: cartLoading, loadCart, clearCart } = useCart();

    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [cpf, setCpf] = useState('');

    useEffect(() => {
        loadCart();
    }, [loadCart]);

    const handleFinalize = async () => {
        if (!cardNumber.trim() || !cardName.trim() || !expiry.trim() || !cvv.trim() || !cpf.trim()) {
            Alert.alert('Atenção', 'Preencha todos os campos antes de finalizar o pagamento.');
            return;
        }
        try {
            await clearCart();
            Alert.alert('Sucesso', 'Pagamento realizado com sucesso.', [
                { text: 'OK', onPress: () => router.push('/menu') }
            ]);
            router.push('/menu');
        } catch (error) {
            console.log('Erro ao finalizar pagamento:', error);
            Alert.alert('Erro', 'Não foi possível finalizar o pedido.');
        }
    }

    if (cartLoading) {
        return (
            <BasePage title="Pagamento" subtitle="Insira os dados do cartão:">
                <View style={styles.options}>
                    <ActivityIndicator size="large" color="#B20000" />
                </View>
            </BasePage>
        )
    }

    return (
        <BasePage title="Pagamento" subtitle="Insira os dados do cartão:">
            <View style={styles.options}>
                <View style={styles.line}>
                    <TextFont style={styles.price}>Total: R$ {Number(total ?? 0).toFixed(2).replace('.', ',')}</TextFont>
                    <TouchableOpacity onPress={() => (router.push('/cart'))}>
                        <TextFont style={{ fontSize: 20 }}>Voltar <Octicons name="undo" size={20} color="black" /></TextFont>
                    </TouchableOpacity>
                </View>

                <Input label="Número do Cartão" placeholder="1234 5678 9012 3456" keyboardType="numeric" value={cardNumber} onChangeText={setCardNumber} />
                <Input label="Nome do Titular" placeholder="Fulano da Silva" value={cardName} onChangeText={setCardName} />
                <Input label="Data de Validade" placeholder="MM/AA" keyboardType="numeric" value={expiry} onChangeText={setExpiry} />
                <Input label="Código Segurança (CVV)" placeholder="123" keyboardType="numeric" secureTextEntry value={cvv} onChangeText={setCvv} />
                <Input label="CPF do Titular" placeholder="123.456.789-01" keyboardType="numeric" value={cpf} onChangeText={setCpf} />

                <Btn variant="red" onPress={handleFinalize}>Finalizar</Btn>
            </View>
        </BasePage>
    );
}


const styles = StyleSheet.create({
    email: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: '300',
        textDecorationLine: 'underline',
    },
    fatec: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: '400',
    },
    options: {
        gap: 8,
        margin: 10,
        alignItems: 'center'
    },
    price: {
        color: '#b00000',
        fontSize: 24,
        fontFamily: 'Roboto_700Bold',
        textDecorationLine: 'underline',
    },
    line: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        marginBottom: 30,
    },

});


