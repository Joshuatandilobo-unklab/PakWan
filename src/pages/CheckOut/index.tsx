import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import HeaderDashboard from '../../components/moleculs/HeaderDashboard';
import BottomNavigator from '../../components/moleculs/BottomNavigator/BottomNavigator';
import Button from '../../components/atoms/Button';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref, get, push, update} from 'firebase/database';
import {useCart} from '../../contexts/CartContext';

const CheckoutPage = ({navigation}) => {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    photo: '',
    address: '',
  });

  const {cartItems = [], clearCart} = useCart();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentInput, setPaymentInput] = useState('');

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

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
              address: data.address || 'No address available',
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleConfirmCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Keranjang kosong', 'Silakan tambahkan produk ke keranjang.');
      return;
    }

    if (!selectedPayment) {
      Alert.alert(
        'Pilih Metode Pembayaran',
        'Silakan pilih metode pembayaran.',
      );
      return;
    }

    setModalVisible(true);
  };

  const processCheckout = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getDatabase();

    if (!user) {
      Alert.alert('User tidak ditemukan');
      return;
    }

    try {
      const checkoutRef = ref(db, 'success/');

      const checkoutItems = [];
      for (const item of cartItems) {
        const productRef = ref(db, `products/${item.id}`);
        const snapshot = await get(productRef);
        let productName = item.name;

        if (snapshot.exists()) {
          const productData = snapshot.val();
          productName = productData.name || productName;
        }

        checkoutItems.push({
          id: item.id,
          name: productName,
          quantity: item.quantity,
          price: item.price,
        });

        const stock = snapshot.val()?.stock || 0;
        await update(ref(db, `products/${item.id}`), {
          stock: stock - item.quantity,
        });
      }

      const checkoutData = {
        userId: user.uid,
        name: userData.fullName,
        address: userData.address,
        paymentMethod: selectedPayment,
        items: checkoutItems,
        total: totalAmount,
        timestamp: new Date().toISOString(),
      };

      await push(checkoutRef, checkoutData);

      clearCart();
      setModalVisible(false);
      Alert.alert('Sukses', 'Checkout berhasil!');
      navigation.navigate('PaymentSuccess');
    } catch (error) {
      console.error('Checkout error:', error);
      Alert.alert('Gagal', 'Terjadi kesalahan saat checkout.');
      navigation.navigate('PaymentFailed');
    }
  };

  const handleDummyPayment = () => {
    if (paymentInput.trim().toLowerCase() === 'yes') {
      processCheckout();
    } else {
      Alert.alert('Pembayaran gagal', 'Silakan coba lagi.');
      setModalVisible(false);
      navigation.navigate('PaymentFailed');
    }
  };