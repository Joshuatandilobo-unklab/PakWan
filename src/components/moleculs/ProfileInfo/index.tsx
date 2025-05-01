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

export default ProfileInfo;

const styles = StyleSheet.create({
  infoContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 20,
  },
  infoText: {
    fontFamily: 'Inder-Regular',
    fontSize: 15,
    color: '#333',
    marginBottom: 10,
  },
});
