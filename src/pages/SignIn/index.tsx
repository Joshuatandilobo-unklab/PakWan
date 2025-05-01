import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/moleculs/Header';
import TextInput from '../../components/moleculs/TextInput';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';
import BackButton from '../../components/atoms/BackButton';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {showMessage} from 'react-native-flash-message';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        navigation.navigate('Dashboard', {uid: user.uid});
      })
      .catch(error => {
        showMessage({
          message: 'Incorrect Email or Password',
          type: 'danger',
        });
      });
  };

  const onSubmitSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.pageContainer}>
      <View>
        <BackButton />
        <Header title="Sign In" />
        <View style={styles.contentContainer}>
          <Gap height={26} />
          <TextInput
            label="Email Address"
            placeholder="Type your email address"
            value={email}
            onChangeText={e => setEmail(e)}
          />
          <Gap height={16} />
          <TextInput
            label="Password"
            placeholder="Type your password"
            secureTextEntry
            withIcon
            value={password}
            onChangeText={e => setPassword(e)}
          />
          <Gap height={24} />
          <Button
            label="Sign In"
            color="#328E6E"
            textColor="#FFFFFF"
            onPress={onSubmit}
          />
          <Gap height={12} />
          <TouchableOpacity onPress={onSubmitSignUp}>
            <Text style={styles.textAccount}>Don’t Have an Account?</Text>
          </TouchableOpacity>
          <Gap height={10} />
          <Button
            label="Sign Up"
            color="#328E6E"
            textColor="#FFFFFF"
            onPress={onSubmitSignUp}
          />
        </View>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#E1EEBC',
  },
  contentContainer: {
    borderRadius: 10,
    margin: 20,
    paddingTop: 50,
  },
  textAccount: {
    marginTop: 20,
    color: '#67AE6E',
    fontSize: 20,
    textAlign: 'center',
  },
  Header: {
    paddingTop: 40,
  },
});
