import {
  StyleSheet,
  Text,
  View,
  TextInput as Input,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
const TextInput = ({
  label,
  placeholder,
  secureTextEntry,
  withIcon,
  value,
  onChangeText,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={{marginBottom: 16}}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          style={[styles.input, isFocused && styles.inputFocused]}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {withIcon && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon
              name={isPasswordVisible ? 'eye' : 'eye-off'}
              size={20}
              color="#6C6C6C"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Inder-Regular',
    fontSize: 24,
    marginBottom: 6,
    color: '#67AE6E',
  },
  input: {
    borderWidth: 1.7,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    paddingRight: 40,
    marginTop: 3,
  },
  inputFocused: {
    borderColor: 'blue',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -10}],
  },
});
