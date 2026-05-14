import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@fateclanches_favs';

export default function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const stored = await AsyncStorage.getItem(FAVORITES_KEY);
    if (stored) setFavorites(JSON.parse(stored));
  };

  const toggleFavorite = async (id: string) => {
    let newFavs = [...favorites];
    if (favorites.includes(id)) {
      newFavs = newFavs.filter(favId => favId !== id);
    } else {
      newFavs.push(id);
    }
    setFavorites(newFavs);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavs));
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { toggleFavorite, isFavorite };
}