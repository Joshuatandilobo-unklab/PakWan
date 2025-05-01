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
    // Simulasi data user (tanpa Firebase)
    setUserData({
      fullName: 'Nama Pengguna',
      email: 'user@example.com',
      photo: '',
      address: 'Jl. Contoh Alamat, Indonesia',
    });
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
    try {
      // Simulasi penyimpanan data checkout
      console.log('Checkout success with data: ', {
        userData,
        selectedPayment,
        cartItems,
        total: totalAmount,
      });

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

// Styles remain unchanged...
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
