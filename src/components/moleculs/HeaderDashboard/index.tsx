import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {UserIcon} from 'lucide-react-native';

const HeaderDashboard = ({name, email, welcome, photo}) => {
  return (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        {photo ? (
          <Image source={{uri: photo}} style={styles.profileImage} />
        ) : (
          <UserIcon size={40} />
        )}
        <View style={{marginLeft: 10}}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <Text style={styles.welcome}>{welcome}</Text>
    </View>
  );
};

export default HeaderDashboard;
