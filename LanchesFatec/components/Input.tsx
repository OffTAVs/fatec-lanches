
import { View, TextInput , StyleSheet , TextInputProps} from 'react-native';
import TextFont from '@/components/TextFont';

interface InputProps extends TextInputProps {
  label?: string;
}

export default function Input({ label, ...props }: InputProps) {
  
  return (
    <View style={styles.wrapper}>
      {label && <TextFont style={styles.label}>{label}</TextFont>}
      <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 8,
  },
  label: {
    color: '#222',
    marginBottom: 4,
    marginLeft: 12
  },
  input: {
    width: 250,
    fontFamily: 'Roboto_300Light',
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: "#b2b2b2",
    color: '#000'
  },
});
