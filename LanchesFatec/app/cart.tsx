import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
import BasePage from "@/components/BasePage";
import ItemCart from "@/components/ItemCart";
import Seletor from "@/components/Seletor";
import BlueBtn from "@/components/Btn";
import TextFont from '@/components/TextFont';
import { useRouter } from "expo-router";
import useCart from "@/hooks/useCart";

const CART_KEY = '@fatec-lanches:cart';

export default function Cart() {
  const { cartItems, loading, total, removeItem, updateItemQuantity, loadCart } = useCart();
  const [pagamento, setPagamento] = useState<'Pix' | 'Cartão de Crédito'>('Pix');
  const router = useRouter();

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  function finalizarPedido() {
    if (pagamento === 'Pix') {
      router.push('/pixPayment');
    } else {
      router.push('/cardPayment');
    }
  }

  return (
    <BasePage title="Carrinho" subtitle="Verifique seu Pedido">
      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#B20000" />
        ) : cartItems.length === 0 ? (
          <TextFont style={styles.empty}>Seu carrinho está vazio, adicione algum item!</TextFont>
        ) : (
          <View>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <ItemCart
                  nome={item.nome}
                  preco={Number(item.preco)}
                  quantity={Number(item.quantity)}
                  imagemUrl={item.imagemUrl}
                  onRemove={() => removeItem(item._id)}
                  onUpdateQuantity={(newQuantity) => updateItemQuantity(item._id, newQuantity)}
                ></ItemCart>
              )}
              showsVerticalScrollIndicator={false}
            ></FlatList>
            <View style={styles.info}>
              <TextFont style={styles.sumPrice}>Total: R$ {total.toFixed(2).replace('.', ',')}</TextFont>

              <Seletor style={{ marginHorizontal: 8 }} label="Forma de Pagamento:" options={['Pix', 'Cartão de Crédito']} onChange={(value) => setPagamento(value)} />

              <BlueBtn onPress={finalizarPedido}>
                Finalizar Pedido
              </BlueBtn>
            </View>
          </View>
        )}
      </View>


    </BasePage>
  );
}

const styles = StyleSheet.create({
  sumPrice: {
    fontSize: 24,
    fontFamily: 'Roboto_700Bold',
    color: '#B20000',
    textDecorationLine: 'underline',
  },
  empty: {
    flex: 1,
    textAlign: 'center',
    margin: 30,
    fontSize: 24,
    color: '#666666',
  },
  info: {
    alignItems: 'center',
    gap: 8,
    marginVertical: 12,
  }
});
