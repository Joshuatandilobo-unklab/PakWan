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
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Checkout error:', error);
      Alert.alert('Gagal', 'Terjadi kesalahan saat checkout.');
      navigation.navigate('Dashboard');
    }
  };

  const handleDummyPayment = () => {
    if (paymentInput.trim().toLowerCase() === 'yes') {
      processCheckout();
    } else {
      Alert.alert('Pembayaran gagal', 'Silakan coba lagi.');
      setModalVisible(false);
      navigation.navigate('Dashboard');
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.headerContainer}>
        <HeaderDashboard
          name={userData.fullName}
          email={userData.email}
          photo={userData.photo}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📍 Shipping Information</Text>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{userData.fullName}</Text>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{userData.address}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>💳 Payment Method</Text>
          <View
            style={[
              styles.paymentBox,
              selectedPayment === 'CASH' && styles.selectedPayment,
            ]}
            onTouchEnd={() =>
              setSelectedPayment(prev => (prev === 'CASH' ? '' : 'CASH'))
            }>
            <Text style={styles.paymentText}>💵 CASH</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🧾 Order Summary</Text>
          {cartItems.map((item, index) => (
            <Text key={index} style={styles.value}>
              {item.name} x{item.quantity} = Rp{' '}
              {(item.price * item.quantity).toLocaleString('id-ID')}
            </Text>
          ))}
          <Text style={[styles.value, {marginTop: 10, fontWeight: 'bold'}]}>
            Total: Rp {totalAmount.toLocaleString('id-ID')}
          </Text>
        </View>

        <Button
          label="Confirm Checkout"
          color="#328E6E"
          textColor="#FFFFFF"
          onPress={handleConfirmCheckout}
        />
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Masukkan 'Yes' untuk sukses, 'No' untuk gagal:
            </Text>
            <TextInput
              style={styles.modalInput}
              value={paymentInput}
              onChangeText={setPaymentInput}
              placeholder="Yes / No"
            />
            <Button
              label="Submit"
              color="#4CAF50"
              textColor="#fff"
              onPress={handleDummyPayment}
              style={{width: '100%', marginTop: 15}}
            />
          </View>
        </View>
      </Modal>

      <BottomNavigator navigation={navigation} />
    </View>
  );
};

export default CheckoutPage;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#DFF2B2',
    paddingTop: 30,
    paddingBottom: 10,
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#328E6E',
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  value: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 5,
    color: '#222',
  },
  paymentBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  selectedPayment: {
    borderColor: 'green',
    borderWidth: 2,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
});