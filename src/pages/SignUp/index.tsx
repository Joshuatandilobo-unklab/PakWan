import React, {useState} from 'react';

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
import {showMessage} from 'react-native-flash-message';

const SignUp = ({navigation}) => {
    const [photo, setPhoto] = useState(AddPhoto);
    const [photoBase64, setPhotoBase64] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
     const onSubmit = () => {
        if (!email) {
          showMessage({message: 'Email must not be empty', type: 'danger'});
          return;
        }
    
        if (!password) {
          showMessage({message: 'Password must not be empty', type: 'danger'});
          return;
        }
    
        if (password !== confirmPassword) {
          showMessage({
            message: 'Password and Confirm Password do not match',
            type: 'danger',
          });
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showMessage({message: 'Invalid email format', type: 'danger'});
          return;
        }