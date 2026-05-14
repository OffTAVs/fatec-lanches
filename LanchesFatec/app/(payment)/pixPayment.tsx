import { StyleSheet, TouchableOpacity, View, ActivityIndicator, Alert } from "react-native";
import BasePage from "@/components/BasePage";
import Octicons from '@expo/vector-icons/Octicons';
import { useRouter } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Clipboard from 'expo-clipboard';
import * as SecureStore from 'expo-secure-store'; // Importação necessária para o status
import { useEffect, useMemo, useState } from 'react';
import TextFont from '@/components/TextFont';
import { createStaticPix } from 'pix-utils';
import useCart from '@/hooks/useCart';
import QRCode from 'react-native-qrcode-svg';

export default function PixPayment() {
  const router = useRouter();
  const { total, loading: cartLoading, loadCart } = useCart();
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [isVerifying, setIsVerifying] = useState(false); // Estado para o loading do botão

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const generatePix = useMemo(() => {
    if (!total || total <= 0) return null;
    try {
      return createStaticPix({
        pixKey: 'lizandra.ferrari@fatec.sp.gov.br',
        isTransactionUnique: true,
        merchantName: 'Lanches Fatec',
        merchantCity: 'MAUA',
        transactionAmount: total,
      }).throwIfError();
    } catch (err) {
      console.log('Erro ao gerar PIX:', err);
      return null;
    }
  }, [total]);

  const pix = generatePix ? generatePix.toBRCode() : '';

  const copyToClipboard = async () => {
    if (!pix) return;
    await Clipboard.setStringAsync(pix);
    Alert.alert("Copiado!", "Código PIX copiado com sucesso. Use o 'Pix Copia e Cola' no seu banco.");
  };

  // Função para simular a confirmação e salvar o horário do pedido
  const handleConfirmPayment = async () => {
    setIsVerifying(true);

    // Simula uma espera de 2 segundos de consulta ao servidor
    setTimeout(async () => {
      try {
        const agora = new Date().getTime();
        // Salva o timestamp para a tela de status usar depois
        await SecureStore.setItemAsync('hora_pedido', agora.toString());
        
        setIsVerifying(false);

        Alert.alert(
          "Pagamento Confirmado!", 
          "Recebemos seu PIX. Seu lanche já começou a ser preparado!",
          [{ text: "Acompanhar Pedido", onPress: () => router.push('/status') }]
        );
      } catch (error) {
        setIsVerifying(false);
        Alert.alert("Erro", "Não foi possível registrar o pedido.");
      }
    }, 2500);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const time = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (cartLoading) {
    return (
      <BasePage title="Pagamento" subtitle="Conclua seu pagamento:">
        <View style={styles.options}><ActivityIndicator size="large" color="#B20000" /></View>
      </BasePage>
    );
  }

  return (
    <BasePage title="Pagamento" subtitle="Conclua seu pagamento:">
      <View style={styles.options}>
        <View style={styles.line}>
          <TextFont style={styles.price}>Total: R$ {Number(total ?? 0).toFixed(2).replace('.', ',')}</TextFont>
          <TouchableOpacity onPress={() => router.push('/cart')}>
            <TextFont style={{ fontSize: 20 }}>Voltar <Octicons name="undo" size={20} /></TextFont>
          </TouchableOpacity>
        </View>

        {total <= 0 ? (
          <View style={styles.info}>
            <TextFont style={styles.fail}>Carrinho vazio.</TextFont>
          </View>
        ) : timeLeft > 0 ? (
          <View style={{ alignItems: 'center', width: '100%' }}>
            
            {pix ? (
              <View style={styles.qrContainer}>
                <QRCode value={pix} size={200} color="black" backgroundColor="white" />
              </View>
            ) : null}

            <TextFont style={styles.copy}>Clique no código para copiar:</TextFont>
            
            <TouchableOpacity style={styles.box} onPress={copyToClipboard} activeOpacity={0.7}>
              <MaterialCommunityIcons style={styles.icon} name="clipboard-multiple-outline" size={24} color="#b00000" />
              <TextFont selectable numberOfLines={3} style={styles.pixCodeText}>{pix}</TextFont>
            </TouchableOpacity>

            <TextFont style={styles.timerText}>Tempo restante para pagamento: {time}</TextFont>
            
            <TouchableOpacity 
              style={[styles.finishBtn, isVerifying && { opacity: 0.7 }]} 
              onPress={handleConfirmPayment}
              disabled={isVerifying}
            >
              {isVerifying ? (
                <ActivityIndicator color="white" />
              ) : (
                <TextFont style={styles.finishBtnText}>Já realizei o pagamento</TextFont>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ alignItems: 'center' }}>
            <TextFont style={styles.fail}>QR code expirado!</TextFont>
            <TouchableOpacity onPress={() => setTimeLeft(5 * 60)} style={{ marginTop: 20 }}>
              <TextFont style={{ color: '#b00000', textDecorationLine: 'underline' }}>Gerar novo código</TextFont>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </BasePage>
  );
}

const styles = StyleSheet.create({
  options: {
    gap: 8,
    marginHorizontal: 10,
    alignItems: 'center'
  },
  qrContainer: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  price: {
    color: '#b00000',
    fontSize: 24,
    fontFamily: 'Roboto_700Bold',
    textDecorationLine: 'underline',
  },
  box: {
    width: '90%',
    marginVertical: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
    position: 'relative'
  },
  pixCodeText: {
    fontSize: 12,
    color: '#555',
    paddingRight: 10
  },
  line: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
    alignItems: 'center'
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1
  },
  copy: {
    fontSize: 18,
    fontFamily: 'Roboto_400Regular',
    marginTop: 10
  },
  timerText: {
    color: '#b00000',
    fontSize: 16,
    marginBottom: 20
  },
  finishBtn: {
    backgroundColor: '#b00000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
    minWidth: 200,
    alignItems: 'center'
  },
  finishBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  fail: {
    color: '#b00000',
    fontSize: 24,
    fontFamily: 'Roboto_700Bold',
    marginTop: 50,
  },
  info: {
    alignItems: 'center',
    marginTop: 40,
  },
});