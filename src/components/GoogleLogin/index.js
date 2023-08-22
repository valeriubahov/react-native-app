import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
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
      const userInfo = await GoogleSignin.signIn();
      console.log('UserInfo => :', userInfo);
      // this.setState({userInfo});
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Error cancelled');

        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Error in progress');

        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('Error service not available');
      } else {
        // some other error happened
        console.log('Error something else');
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
