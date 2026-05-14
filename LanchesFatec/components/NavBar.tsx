import { useRouter, usePathname } from 'expo-router';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import TextFont from '@/components/TextFont';

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  // DEBUG: Abra o terminal do VS Code e veja o que aparece aqui ao entrar no PIX
  // console.log("Rota atual:", pathname);

  // Verificação melhorada:
  // Esconde se a rota contiver 'payment', 'pix', 'card' ou se for o próprio 'cart'
  const shouldHideCart = 
    pathname.includes('payment') || 
    pathname.includes('Payment') || 
    pathname.includes('pix') || 
    pathname.includes('cart');

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.icon} onPress={() => router.push('/salgados')}>
          <MaterialCommunityIcons name="silverware-fork-knife" size={26} color="white" />
          <TextFont style={styles.text}>Lanches</TextFont>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} onPress={() => router.push('/bebidas')}>
          <SimpleLineIcons name="cup" size={26} color="white" />
          <TextFont style={styles.text}>Bebidas</TextFont>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} onPress={() => router.push('/bomboniere')}>
          <MaterialCommunityIcons name="cake-variant-outline" size={26} color="white" />
          <TextFont style={styles.text}>Bomboniere</TextFont>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} onPress={() => router.push('/profile')}>
          <Ionicons name="person-outline" size={26} color="white" />
          <TextFont style={styles.text}>Perfil</TextFont>
        </TouchableOpacity>
      </View>

      {/* Só renderiza o botão se shouldHideCart for FALSE */}
      {!shouldHideCart && (
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => router.push('/cart')}
        >
          <MaterialCommunityIcons name="cart-outline" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}

// ... (seus estilos permanecem os mesmos)

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  navbar: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#b00000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icon: {
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    marginTop: 4,
    fontSize: 12,
    fontFamily: 'Roboto_700Bold',
  },
  cartButton: {
    position: 'absolute',
    right: 15,
    top: -80,
    backgroundColor: '#b00000',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});