import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useCart} from '../../../contexts/CartContext';

const CartItem = ({image, name, price, id, quantity}) => {
  const {increaseQuantity, decreaseQuantity} = useCart();

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {image ? (
          <Image
            source={{uri: image}}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <Text>No Image</Text>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.priceText}>Rp {price.toLocaleString('id-ID')}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => increaseQuantity(id)}>
            <Icon name="add-box" size={30} color="lightgreen" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => decreaseQuantity(id)}>
            <Icon name="indeterminate-check-box" size={30} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
