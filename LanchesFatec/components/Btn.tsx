import React from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps, ViewStyle } from 'react-native';
import TextFont from '@/components/TextFont';

type ButtonVariant = 'blue' | 'red' | 'cyan';

interface BtnProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: ButtonVariant; 
}

export default function Btn({ children, style, variant = 'blue', ...props }: BtnProps) {
  const backgroundColors: Record<ButtonVariant, string> = {
    blue: '#005C6D',
    red: '#B00000',
    cyan: '#00C1CF',
  };

  const textColors: Record<ButtonVariant, string> = {
    blue: '#fff',
    red: '#fff',
    cyan: '#000',
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColors[variant] }, style]}
      {...props}
    >
      <TextFont style={[styles.buttonText, { color: textColors[variant] }]}>{children}</TextFont>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    width: 150,
    alignItems: 'center',
    margin: 5,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
  },
});
