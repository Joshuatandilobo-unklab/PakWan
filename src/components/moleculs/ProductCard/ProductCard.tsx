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
