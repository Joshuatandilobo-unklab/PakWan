import React from 'react';
import {View, StyleSheet, Text, Image, SafeAreaView} from 'react-native';
import {useProducts} from '../../contexts/ProductContext';
import {useCart} from '../../contexts/CartContext';
import {useRoute} from '@react-navigation/native';
import Button from '../../components/atoms/Button';
import BottomNavigator from '../../components/moleculs/BottomNavigator/BottomNavigator';
import {showMessage} from 'react-native-flash-message';

const ProductDetail = ({navigation}) => {
  const {params} = useRoute();
  const {getProductById} = useProducts();
  const {addToCart} = useCart();

  // Debug log
  console.log('params.id:', params?.id);

  const product = getProductById(params?.id);

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text>Loading product...</Text>
      </View>
    );
  }

  const handleBuy = () => {
    if (product.stock <= 0) {
      showMessage({
        message: 'Stok habis!',
        type: 'danger',
        duration: 2000,
      });
      return;
    }

    addToCart(product);
    showMessage({
      message: 'Produk berhasil ditambahkan ke keranjang',
      type: 'success',
      duration: 2000,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={{uri: product.imageUrl}} style={styles.productImage} />

        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.priceText}>
            Rp {product.price.toLocaleString('id-ID')}
          </Text>

          <Text style={styles.descriptionTitle}>Product description:</Text>
          <Text style={styles.productDescription}>{product.description}</Text>

          <Text style={styles.stockText}>Stock Available: {product.stock}</Text>

          <View style={{width: 350, height: 250}}>
            <Button
              label="Beli"
              color="#2E7D32"
              textColor="#FFFFFF"
              onPress={handleBuy}
            />
          </View>
        </View>
      </View>

      <View style={styles.bottomNav}>
        <BottomNavigator navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E1EEBC',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingBottom: 0,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1EEBC',
  },
  productImage: {
    width: 200,
    height: 200,
    marginTop: 20,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#E1EEBC',
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  productName: {
    fontFamily: 'Inder-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  priceText: {
    fontFamily: 'Inder-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  descriptionTitle: {
    fontFamily: 'Inder-Regular',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  productDescription: {
    fontFamily: 'Inder-Regular',
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  stockText: {
    fontFamily: 'Inder-Regular',
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 15,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  bottomNav: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});
