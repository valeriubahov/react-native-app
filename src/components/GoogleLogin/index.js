import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    console.log('Logging with google');

    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Error: SIGN_IN_CANCELLED', error);

        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Error: IN_PROGRESS', error);

        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('Error: PLAY_SERVICES_NOT_AVAILABLE', error);
      } else {
        // some other error happened
        console.log('UNEXPECTED ERROR:', error);
      }
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={handleGoogleLogin}
      style={styles.container}>
      <Image style={styles.image} source={require('../../assets/google.png')} />
    </TouchableOpacity>
  );
};

export default React.memo(GoogleLogin);
