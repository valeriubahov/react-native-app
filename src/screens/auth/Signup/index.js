import React, {useContext, useState} from 'react';
import {styles} from './styles';
import AuthHeader from '../../../components/AuthHeader';
import {Alert, ScrollView, Text, View} from 'react-native';
import Input from '../../../components/Input';
import Checkbox from '../../../components/Checkbox';
import Button from '../../../components/Button';
import Separator from '../../../components/Separator';
import GoogleLogin from '../../../components/GoogleLogin';
import {SafeAreaView} from 'react-native-safe-area-context';

import {signup} from '../../../utils/backendCalls';
import {UserContext} from '../../../../App';

const Signup = ({navigation}) => {
  const [checked, setChecked] = useState(false);
  const [values, setValues] = useState({});
  const {user, setUser} = useContext(UserContext);

  const onCheck = () => {
    setChecked(!checked);
  };

  const onSignIn = () => {
    navigation.navigate('Signin');
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onChange = (key, value) => {
    setValues(v => ({...v, [key]: value}));
  };

  const onSubmit = async () => {
    try {
      if (
        !values?.password ||
        !values?.confirmPassword ||
        !values?.fullName ||
        !values?.email
      ) {
        Alert.alert('All fields are required');
        return;
      }

      if (values?.password !== values?.confirmPassword) {
        Alert.alert('Passwords do not match');
        return;
      }

      if (!checked) {
        Alert.alert('Please agree to the terms');
        return;
      }

      const token = await signup(values);

      setUser({token});

      console.log(token);
    } catch (err) {
      console.log('error', err);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Sign Up" />

        <Input
          value={values.fullName}
          onChangeText={fullName => onChange('fullName', fullName)}
          label="Name"
          placeholder="Cippo Pippo"
        />
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
        <Input
          value={values.confirmPassword}
          onChangeText={pwd => onChange('confirmPassword', pwd)}
          isPassword
          label="Confirm Password"
          placeholder="********"
        />

        <View style={styles.agreeRow}>
          <Checkbox checked={checked} onCheck={onCheck} />
          <Text style={styles.agreeText}>
            I agree with <Text style={styles.agreeTextBold}>Terms</Text> &{' '}
            <Text style={styles.agreeTextBold}>Privacy</Text>
          </Text>
        </View>

        <Button onPress={onSubmit} style={styles.button} title="Sign Up" />

        <Separator text="Or sign up with" />

        <GoogleLogin />

        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text onPress={onSignIn} style={styles.footerLink}>
            Sign In
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(Signup);
