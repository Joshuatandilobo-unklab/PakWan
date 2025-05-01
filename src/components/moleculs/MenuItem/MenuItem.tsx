import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ShoppingBag, ShoppingCart} from 'lucide-react-native';

const MenuItem = ({icon, title, onPress}) => {
  const Icon = icon === 'bag' ? ShoppingBag : ShoppingCart;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon size={40} />
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MenuItem;
