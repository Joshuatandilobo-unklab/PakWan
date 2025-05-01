import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
      <Icon name="chevron-left" size={40} color="#5E9B6F" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    top: 10,
    left: 5,
    padding: 10,
  },
});

export default BackButton;
