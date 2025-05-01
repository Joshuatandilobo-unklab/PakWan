import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import HeaderDashboard from '../../components/moleculs/HeaderDashboard';
import CartItem from '../../components/moleculs/CartItem/CartItem';
import Button from '../../components/atoms/Button';
import BottomNavigator from '../../components/moleculs/BottomNavigator/BottomNavigator';
import {useCart} from '../../contexts/CartContext';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref, get} from 'firebase/database';

const CartPage = ({navigation}) => {
  const {cartItems, removeFromCart} = useCart();
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    photo: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const db = getDatabase();
          const userRef = ref(db, 'users/' + user.uid);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const data = snapshot.val();
            setUserData({
              fullName: data.fullName || '',
              email: data.email || '',
              photo: data.photo || '',
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <View style={styles.page}>
      <View style={styles.userInfoContainer}>
        <HeaderDashboard
          name={userData.fullName}
          email={userData.email}
          photo={userData.photo}
        />
      </View>

      <ScrollView style={styles.cartList}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        ) : (
          cartItems.map((item, index) => (
            <View key={index} style={styles.cartItemContainer}>
              <CartItem
                id={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
              />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.id)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.checkoutSection}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>
            Rp {totalPrice.toLocaleString('id-ID')}
          </Text>
        </View>

        <Button
          label="Checkout"
          color="#328E6E"
          textColor="#FFFFFF"
          onPress={() => {
            navigation.navigate('Checkout');
          }}
        />
      </View>

      <BottomNavigator navigation={navigation} />
    </View>
  );
};

export default CartPage;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userInfoContainer: {
    backgroundColor: '#DFF2B2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 10,
  },
  cartList: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  emptyText: {
    fontFamily: 'Inder-Regular',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  cartItemContainer: {
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
  },
  removeButton: {
    backgroundColor: '#ff5c5c',
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
});
