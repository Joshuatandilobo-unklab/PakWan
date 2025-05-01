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
});
