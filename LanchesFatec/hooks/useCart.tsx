import { useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Produto } from '@/components/types/produto';

const CART_KEY = '@fatec-lanches:cart';

export default function useCart() {
  const [cartItems, setCartItems] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      const raw = await AsyncStorage.getItem(CART_KEY);
      const parsed: Produto[] = raw ? JSON.parse(raw) : [];
      setCartItems(parsed);
    } catch (error) {
      console.log('Erro ao carregar carrinho (useCart):', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeItem = useCallback(
    async (_id: string) => {
      try {
        const raw = await AsyncStorage.getItem(CART_KEY);
        const parsed: Produto[] = raw ? JSON.parse(raw) : [];
        const filtered = parsed.filter((it) => it._id !== _id);
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(filtered));
        setCartItems(filtered);
      } catch (error) {
        console.log('Erro ao remover item do carrinho (useCart):', error);
      }
    },
    []
  );

  const updateItemQuantity = useCallback(
    async (_id: string, newQuantity: number) => {
      try {
        const raw = await AsyncStorage.getItem(CART_KEY);
        const parsed: Produto[] = raw ? JSON.parse(raw) : [];
        const updatedItems = parsed.map((item) =>
          item._id === _id ? { ...item, quantity: newQuantity } : item
        );
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(updatedItems));
        setCartItems(updatedItems);
      } catch (error) {
        console.log('Erro ao atualizar quantidade do item (useCart):', error);
      }
    },
    []
  );
  const clearCart = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(CART_KEY);
      setCartItems([]);
    } catch (error) {
      console.log('Erro ao limpar carrinho (useCart):', error);
    }
  }, []);

  const addItem = useCallback(
    async (product: Produto) => {
      try {
        const raw = await AsyncStorage.getItem(CART_KEY);
        const parsed: Produto[] = raw ? JSON.parse(raw) : [];
        const idx = parsed.findIndex((p) => p._id === product._id);
        if (idx >= 0) {
          parsed[idx].quantity = (Number(parsed[idx].quantity) || 0) + (Number(product.quantity) || 1);
        } else {
          parsed.push({ ...product, quantity: Number(product.quantity) || 1 });
        }
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(parsed));
        setCartItems(parsed);
      } catch (error) {
        console.log('Erro ao adicionar item no carrinho (useCart):', error);
      }
    },
    []
  );

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const total = useMemo(() => {
    return cartItems.reduce((sum, it) => {
      const qtd = Number(it.quantity ?? 1);
      const preco = Number(it.preco ?? 0);
      return sum + preco * qtd;
    }, 0);
  }, [cartItems]);

  return {
    cartItems,
    loading,
    total,
    loadCart,
    addItem,
    removeItem,
    clearCart,
    updateItemQuantity,
  };
}