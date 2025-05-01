import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProfileInfo = ({email, phone, address}) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.infoText}>Email : {email}</Text>
      <Text style={styles.infoText}>Nomor : {phone}</Text>
      <Text style={styles.infoText}>Alamat : {address}</Text>
    </View>
  );
};
