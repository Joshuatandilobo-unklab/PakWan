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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  leftContainer: {
    marginRight: 10,
  },
  image: {
    width: 60,
    height: 60,
    marginLeft: 15,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 15,
  },
  productName: {
    fontFamily: 'Inder-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  priceText: {
    fontFamily: 'Inder-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontFamily: 'Inder-Regular',
    fontSize: 16,
    marginHorizontal: 8,
  },
});
