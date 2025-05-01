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


        const getImage = async () => {
            try {
              const result = await launchImageLibrary({
                mediaType: 'photo',
                maxWidth: 100,
                maxHeight: 100,
                quality: 0.5,
                includeBase64: true,
              });
        
              if (result.didCancel) {
                showMessage({
                  message: 'Cancelled Pick a Photo',
                  type: 'warning',
                });
              } else if (result.assets && result.assets.length > 0) {
                const asset = result.assets[0];
                const base64 = `data:${asset.type};base64,${asset.base64}`;
                const source = {uri: base64};
                setPhoto(source);
                setPhotoBase64(base64);
              }
            } catch (error) {
              showMessage({
                message: 'Error, while picking a Photo',
                type: 'danger',
              });
            }
          };
        
          return (
            <View style={styles.pageContainer}>
              <ScrollView>
                <BackButton />
                <Header title="Sign Up" />
                <View style={styles.contentContainer}>
                  <View style={styles.profileContainer}>
                    <View style={styles.profile}>
                      <View style={styles.addPhoto}>
                        <TouchableOpacity
                          style={styles.profile}
                          activeOpacity={0.7}
                          onPress={getImage}>
                          <Image source={photo} style={styles.avatar} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
        
                  <TextInput
                    label="Full Name"
                    placeholder="Type your full name"
                    value={fullName}
                    onChangeText={setFullName}
                  />
                  <Gap height={15} />
        
                  <TextInput
                    label="Email Address"
                    placeholder="Type your email address"
                    value={email}
                    onChangeText={setEmail}
                  />
                  <Gap height={15} />
        
                  <TextInput
                    label="Password"
                    placeholder="Type your password"
                    secureTextEntry
                    withIcon
                    value={password}
                    onChangeText={setPassword}
                  />
                  <Gap height={15} />
        
                  <TextInput
                    label="Confirm Password"
                    placeholder="Type again to confirm your password"
                    secureTextEntry
                    withIcon
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <Gap height={5} />
        
                  <Button
                    label="Continue"
                    color="#328E6E"
                    textColor="#FFFFFF"
                    onPress={onSubmit}
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