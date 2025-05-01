import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfilePicture = ({photoUri, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.uploadButton} onPress={onPress}>
        {photoUri ? (
          <Image source={{uri: photoUri}} style={styles.photo} />
        ) : (
          <>
            <Icon name="add-a-photo" size={32} color="#888" />
            <Text style={styles.uploadText}>Add Photo</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePicture;
