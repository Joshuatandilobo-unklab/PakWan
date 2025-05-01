import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from '../../components/moleculs/Header';
import {AddPhoto} from '../../assets';
import TextInput from '../../components/moleculs/TextInput';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';
import BackButton from '../../components/atoms/BackButton';
import {launchImageLibrary} from 'react-native-image-picker';

const SignUp = () => {
  return (
    <View style={styles.pageContainer}>
      <ScrollView>
        <BackButton />
        <Header title="Sign Up" />
        <View style={styles.contentContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.profile}>
              <View style={styles.addPhoto}>
                <TouchableOpacity style={styles.profile} activeOpacity={0.7}>
                  <Image source={AddPhoto} style={styles.avatar} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TextInput label="Full Name" placeholder="Type your full name" />
          <Gap height={15} />

          <TextInput
            label="Email Address"
            placeholder="Type your email address"
          />
          <Gap height={15} />

          <TextInput
            label="Password"
            placeholder="Type your password"
            secureTextEntry
            withIcon
          />
          <Gap height={15} />

          <TextInput
            label="Confirm Password"
            placeholder="Type again to confirm your password"
            secureTextEntry
            withIcon
          />
          <Gap height={5} />

          <Button
            label="Continue"
            color="#328E6E"
            textColor="#FFFFFF"
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#E1EEBC',
  },
  contentContainer: {
    marginTop: 25,
    flex: 1,
    paddingHorizontal: 24,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  addPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
});
