import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useFavorites from '@/hooks/useFavorites';
import useCart from '@/hooks/useCart';
import TextFont from './TextFont';
import Btn from './Btn';
import { Produto } from './types/produto';

interface ItemCardProps {
  _id: string;
  imagemUrl: string;
  nome: string;
  preco: number;
}

export default function ItemCard({ _id, imagemUrl, nome, preco }: ItemCardProps) {
  const [quantity, setQuantity] = useState<number>(0);
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(_id);

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => (q > 0 ? q - 1 : 0));

  async function addCart() {
    if (quantity <= 0) {
      Alert.alert('Atenção', 'Selecione ao menos 1 item.');
      return;
    }
    const itemToAdd: Produto = { _id, imagemUrl, preco, nome, quantity };
    try {
      await addItem(itemToAdd);
      setQuantity(0); // Reseta para 0 na VITRINE após adicionar
      Alert.alert('Sucesso', 'Item adicionado ao carrinho.');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar.');
    }
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(_id)}>
        <Ionicons name={favorited ? "heart" : "heart-outline"} size={22} color={favorited ? "#b20000" : "#555"} />
      </TouchableOpacity>

      <View style={styles.topRow}>
        <Image source={{ uri: imagemUrl }} style={styles.image} />
        <View style={styles.info}>
          <TextFont style={styles.nome} numberOfLines={2}>{nome}</TextFont>
          <TextFont style={styles.preco}>R$ {preco.toFixed(2).replace('.', ',')}</TextFont>
        </View>
        <View style={styles.quantityWrapper}>
          <TouchableOpacity onPress={decreaseQuantity} style={styles.qBtn}><TextFont style={styles.qBtnText}>-</TextFont></TouchableOpacity>
          <TextFont style={styles.qValue}>{quantity}</TextFont>
          <TouchableOpacity onPress={increaseQuantity} style={styles.qBtn}><TextFont style={styles.qBtnText}>+</TextFont></TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <Btn onPress={addCart} style={styles.addBtn}>Adicionar ao Carrinho</Btn>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, marginVertical: 8, marginHorizontal: 15, padding: 12, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  topRow: { flexDirection: 'row', alignItems: 'center' },
  image: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#f0f0f0' },
  info: { marginLeft: 12, flex: 1, paddingRight: 10 },
  nome: { fontSize: 15, fontFamily: 'Roboto_700Bold', color: '#333' },
  preco: { color: '#b20000', fontSize: 14, fontFamily: 'Roboto_700Bold' },
  favoriteButton: { position: 'absolute', top: -5, right: -5, zIndex: 10, padding: 10 },
  quantityWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 8, padding: 4 },
  qBtn: { width: 28, height: 28, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderRadius: 4 },
  qBtnText: { fontSize: 18, fontFamily: 'Roboto_700Bold' },
  qValue: { paddingHorizontal: 10, fontSize: 16, fontFamily: 'Roboto_700Bold' },
  footer: { marginTop: 10, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 8 },
  addBtn: { height: 40 }
});