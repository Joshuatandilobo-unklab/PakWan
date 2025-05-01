import {StyleSheet, View, Image} from 'react-native';

import React, {useEffect} from 'react';
import {Logo} from '../../assets';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => navigation.replace('SignIn'), 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={Logo} />
    </View>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E1EEBC',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
