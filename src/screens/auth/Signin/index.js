import React, {useState} from 'react';
import {styles} from './styles';
import AuthHeader from '../../../components/AuthHeader';
import {ScrollView, Text, View} from 'react-native';
import Input from '../../../components/Input';
import Checkbox from '../../../components/Checkbox';
import Button from '../../../components/Button';
import Separator from '../../../components/Separator';
import GoogleLogin from '../../../components/GoogleLogin';
const Signin = () => {
  const onSignUp = () => {};

  return (
    <ScrollView style={styles.container}>
      <AuthHeader title="Sign In" />

      <Input label="Email" placeholder="example@example.com" />
      <Input isPassword label="Password" placeholder="********" />

      <Button style={styles.button} title="Sign In" />

      <Separator text="Or sign in with" />

      <GoogleLogin />

      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text onPress={onSignUp} style={styles.footerLink}>
          Sign Up
        </Text>
      </Text>
    </ScrollView>
  );
};

export default React.memo(Signin);
