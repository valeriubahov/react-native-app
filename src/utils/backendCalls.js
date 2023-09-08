import {request} from './request';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signup = async values => {
  try {
    const response = await request({
      url: '/user/register',
      method: 'POST',
      data: values,
    });

    if (response) {
      const {email, password} = values;
      const loginResponse = await login({email, password});
      return loginResponse;
    }
  } catch (e) {
    console.log('Error :>> ', e);
  }
};

export const login = async values => {
  try {
    const response = await request({
      url: '/user/login',
      method: 'POST',
      data: values,
    });

    if (response?.data?.token) {
      await AsyncStorage.setItem('auth_token', response?.data?.token);

      return response?.data?.token;
    }
  } catch (e) {
    console.log('Error :>> ', e);
  }
};

export const getProfile = async () => {
  try {
    const response = await request({
      url: '/user/profile',
      method: 'GET',
    });

    if (response) {
      return response?.data;
    }
  } catch (e) {
    console.log('Error :>> ', e);
  }
};
