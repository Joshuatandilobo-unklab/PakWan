import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, StyleSheet, TextInput, Alert} from 'react-native';
import ProfileHeader from '../../components/moleculs/ProfileHeader';
import ProfileInfo from '../../components/moleculs/ProfileInfo';
import Button from '../../components/atoms/Button';
import BottomNavigator from '../../components/moleculs/BottomNavigator/BottomNavigator';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref, get, update} from 'firebase/database';
import {signOut} from 'firebase/auth';

const ProfilePage = ({navigation}) => {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    photo: '',
  });
  const [editablePhone, setEditablePhone] = useState('');
  const [editableAddress, setEditableAddress] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const db = getDatabase();
          const userRef = ref(db, 'users/' + user.uid);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const data = snapshot.val();
            setUserData({
              fullName: data.fullName || '',
              email: data.email || '',
              phone: data.phone || '',
              address: data.address || '',
              photo: data.photo || '',
            });
            setEditablePhone(data.phone || '');
            setEditableAddress(data.address || '');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const onSubmitProfileSetting = () => {
    navigation.navigate('ProfileSettings');
  };

  const onSubmitLogOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);

      navigation.reset({
        index: 0,
        routes: [{name: 'SignIn'}],
      });
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Gagal logout');
    }
  };

  const onSaveChanges = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const db = getDatabase();
        const userRef = ref(db, 'users/' + user.uid);
        await update(userRef, {
          phone: editablePhone,
          address: editableAddress,
        });

        Alert.alert('Success', 'Profile updated successfully');

        setUserData(prevState => ({
          ...prevState,
          phone: editablePhone,
          address: editableAddress,
        }));

        setEditablePhone('');
        setEditableAddress('');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ProfileHeader name={userData.fullName} photo={userData.photo} />

        <ProfileInfo
          email={userData.email}
          phone={userData.phone}
          address={userData.address}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={editablePhone}
          onChangeText={text => setEditablePhone(text)}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Address"
          value={editableAddress}
          onChangeText={text => setEditableAddress(text)}
        />

        <View style={{width: 350, alignSelf: 'center', marginBottom: 20}}>
          <Button
            label="Save Changes"
            color="#328E6E"
            textColor="#FFFFFF"
            onPress={onSaveChanges}
          />
        </View>

        <View style={{width: 350, alignSelf: 'center', marginBottom: 20}}>
          <Button
            label="Settings"
            color="#3CB371"
            textColor="#fff"
            onPress={onSubmitProfileSetting}
          />
        </View>

        <View style={{width: 350, alignSelf: 'center'}}>
          <Button
            label="Log Out"
            color="#FF3B30"
            textColor="#fff"
            onPress={onSubmitLogOut}
          />
        </View>
      </View>

      <View style={styles.bottomNav}>
        <BottomNavigator navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;
