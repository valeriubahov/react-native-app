import React, {useContext, useState} from 'react';
import {styles} from './styles';
import AuthHeader from '../../../components/AuthHeader';
import {ScrollView, Text} from 'react-native';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Separator from '../../../components/Separator';
import GoogleLogin from '../../../components/GoogleLogin';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UserContext} from '../../../../App';
import {login} from '../../../utils/backendCalls';

const Signin = ({navigation}) => {
  const [values, setValues] = useState({});
  const {setUser} = useContext(UserContext);

  const onSignUp = () => {
    navigation.navigate('Signup');
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onChange = (key, value) => {
    setValues(v => ({...v, [key]: value}));
  };

  const onSubmit = async () => {
    const token = await login(values);
    setUser({token});
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Sign In" />

        <Input
          value={values.email}
          onChangeText={email => onChange('email', email)}
          label="Email"
          placeholder="example@example.com"
        />
        <Input
          value={values.password}
          onChangeText={pwd => onChange('password', pwd)}
          isPassword
          label="Password"
          placeholder="********"
        />

        <Button onPress={onSubmit} style={styles.button} title="Sign In" />

        <Separator text="Or sign in with" />

        <GoogleLogin />

        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text onPress={onSignUp} style={styles.footerLink}>
            Sign Up
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(Signin);
