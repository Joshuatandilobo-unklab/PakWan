import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#EC221F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 100,
    width: 362,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Button;
