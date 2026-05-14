import { View, Image, StyleSheet } from 'react-native';
import TextFont from '@/components/TextFont';

interface ProfileCardProps {
  nome: string;
  email: string;
  profileImage?: string | null;
  onPickImage?: () => void;
}

export default function ProfileCard({
  nome,
  email,
  profileImage,
}: ProfileCardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={
          profileImage
            ? { uri: profileImage }
            : { uri: 'https://cdn-icons-png.flaticon.com/512/3106/3106921.png'}
        }
        style={styles.image}
      />

      <TextFont style={styles.title}>{nome}</TextFont>
      <TextFont style={styles.email}>{email}</TextFont>
      <TextFont style={styles.fatec}>Fatec Mauá</TextFont>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#F0F0F0', borderRadius: 10, padding: 15, height: 420, width: 300, alignItems: 'center', justifyContent: 'space-around', margin: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5, }, image: { width: 250, height: 250, borderRadius: 8, marginBottom: 10, }, title: { fontSize: 20, fontFamily: 'Roboto_700Bold', marginBottom: 5, textAlign: 'center', }, email: { fontSize: 16, marginBottom: 10, textDecorationLine: 'underline', }, fatec: { fontSize: 16, marginBottom: 10, fontFamily: 'Roboto_400Regular', },
});
