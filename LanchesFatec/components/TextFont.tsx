import { Text, TextProps } from 'react-native';

export default function TextFont(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        { fontFamily: 'Roboto_300Light', color: '#000' },
        props.style
      ]}
    />
  );
}
