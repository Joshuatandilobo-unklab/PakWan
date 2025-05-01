import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const ProductCard = ({image, name, price, stock, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        {price !== undefined && (
          <Text style={styles.price}>Rp {price.toLocaleString('id-ID')}</Text>
        )}
        <Text style={styles.stock}>Stok: {stock}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    padding: 10,
    alignItems: 'center',
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  info: {
    marginTop: 10,
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Inder-Regular',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  price: {
    fontFamily: 'Inder-Regular',
    fontSize: 15,
    color: '#4CAF50',
    marginTop: 4,
  },
  stock: {
    fontFamily: 'Inder-Regular',
    fontSize: 15,
    color: '#888',
    marginTop: 2,
  },
});
