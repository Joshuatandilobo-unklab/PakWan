import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Buttom from '../../components/atoms/Buttom';
import chek from '../../assets/index';

const PaymentSuccess = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <Text style={styles.title}>Succes</Text>
      <Image source={chek} style={styles.image} />
      <Buttom title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf2c5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#4a7856',
    fontWeight: '600',
    marginVertical: 4,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 20,
    resizeMode: 'contain',
  },
});

export default PaymentSuccess;
