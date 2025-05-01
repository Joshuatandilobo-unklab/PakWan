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

  