import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import TextInput from '../../components/moleculs/TextInput';
import Button from '../../components/atoms/Button';
import BottomNavigator from '../../components/moleculs/BottomNavigator/BottomNavigator';
import Header from '../../components/moleculs/Header';
import {AddPhoto} from '../../assets';
import {
  getAuth,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import {getDatabase, ref, update as updateDatabase} from 'firebase/database';

const ProfileSettings = ({navigation}) => {
  const [displayName, setDisplayName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [photo, setPhoto] = useState(AddPhoto);
  const [photoBase64, setPhotoBase64] = useState('');

  const handleConfirmChanges = async () => {
    try {
      const auth = getAuth();
      let user = auth.currentUser;

      if (!user) {
        Alert.alert('Error', 'No user logged in.');
        return;
      }

      if (!displayName || !currentPassword || !newPassword) {
        Alert.alert('Error', 'All fields are required.');
        return;
      }

      if (currentPassword === newPassword) {
        Alert.alert(
          'Error',
          'New password must be different from current password.',
        );
        return;
      }

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );
      await reauthenticateWithCredential(user, credential);
      console.log('Reauthentication successful.');

      await updatePassword(user, newPassword);
      console.log('Password updated successfully.');

      await updateProfile(user, {
        displayName: displayName,
      });
      console.log('Display name updated successfully.');

      await auth.currentUser.reload();
      user = auth.currentUser;

      const db = getDatabase();
      const userRef = ref(db, 'users/' + user.uid);

      await updateDatabase(userRef, {
        fullName: displayName,
        password: newPassword,
        photo: photoBase64,
        updatedAt: new Date().toISOString(),
      });

      console.log('Database updated successfully.');

      showMessage({
        message: 'Profile updated successfully!',
        type: 'success',
      });

      setTimeout(() => {
        navigation.navigate('Profile');
      }, 500);

      setDisplayName('');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', error.message || 'Something went wrong.');
    }
  };

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
        quality: 0.7,
        includeBase64: true,
      });

      if (result.didCancel) {
        showMessage({
          message: 'You canceled picking a photo!',
          type: 'warning',
        });
      } else if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const base64Image = `data:${asset.type};base64,${asset.base64}`;
        setPhoto({uri: base64Image});
        setPhotoBase64(base64Image);
      }
    } catch (error) {
      console.error('🔥 Error updating profile:', error);
      Alert.alert('Error', error.message || 'Something went wrong.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header title="Profile Settings" />

        <TouchableOpacity onPress={pickImage} activeOpacity={0.7}>
          <Image source={photo} style={styles.profileImage} />
        </TouchableOpacity>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <TextInput
              label="Change Display Name"
              placeholder="Change Display Name"
              value={displayName}
              onChangeText={setDisplayName}
            />
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              label="Current Password"
              placeholder="Type your current password"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
              withIcon
            />
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              label="New Password"
              placeholder="Type your new password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              withIcon
            />
          </View>

          <Button
            label="Confirm Changes"
            color="#3CB371"
            textColor="#ffffff"
            onPress={handleConfirmChanges}
          />
        </View>
      </ScrollView>

      <BottomNavigator navigation={navigation} />
    </View>
  );
};

export default ProfileSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1EEBC',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
  },
  form: {
    width: '100%',
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 12,
  },
});
