import {request} from './request';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Register the user
 * @param {*} values
 * @returns Auth Token
 */
export const signup = async values => {
  try {
    const response = await request({
      url: '/user/register',
      method: 'POST',
      data: values,
    });

    if (response) {
      const {email, password} = values;
      return login({email, password});
    }
  } catch (e) {
    console.log('Error :>> ', e);
  }
};

/**
 * Login the user and returns auth_token
 * @param {*} values
 * @returns Auth Token
 */
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

/**
 * Get user information
 * @returns profile
 */
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

/**
 * Update the user information
 * @param {*} data
 * @returns profile
 */
export const updateProfile = async data => {
  try {
    const response = await request({
      url: '/user/profile',
      method: 'PATCH',
      data,
    });

    if (response) {
      return getProfile();
    }
  } catch (e) {
    console.log('Error :>> ', e);
  }
};
