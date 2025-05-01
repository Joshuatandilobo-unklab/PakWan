import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Home, Package, ShoppingCart, User} from 'lucide-react-native';

const BottomNavigator = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Dashboard')}>
        <Home size={24} color="#000" />
        <Text style={styles.label}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Product')}>
        <Package size={24} color="#000" />
        <Text style={styles.label}>Product</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Cart')}>
        <ShoppingCart size={24} color="#000" />
        <Text style={styles.label}>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Profile')}>
        <User size={24} color="#000" />
        <Text style={styles.label}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigator;
