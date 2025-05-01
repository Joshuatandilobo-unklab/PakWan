import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Button from '../../components/atoms/Button';
import {Failed} from '../../assets/index';

const PaymentFailed = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <Text style={styles.title}>Failed</Text>
      <Image source={Failed} style={styles.image} />
      <Button
        label="Got It"
        color="#328E6E"
        textColor="#FFFFFF"
        onPress={() => navigation.navigate('Dashboard')}
        style={{width: '100%', marginTop: 15}}
      />
    </View>
  );
};

export default PaymentFailed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1EEBC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#328E6E',
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
