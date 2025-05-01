import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/moleculs/Header';
import TextInput from '../../components/moleculs/TextInput';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';
import BackButton from '../../components/atoms/BackButton';


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