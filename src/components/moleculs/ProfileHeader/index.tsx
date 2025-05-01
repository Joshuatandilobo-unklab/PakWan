import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const ProfileHeader = ({name, photo}) => {
  return (
    <View style={styles.header}>
      {photo ? (
        <Image source={{uri: photo}} style={styles.profileImage} />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 200,
    backgroundColor: '#ddd',
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  name: {
    fontFamily: 'Inder-Regular',
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
