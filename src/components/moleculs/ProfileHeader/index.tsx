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
