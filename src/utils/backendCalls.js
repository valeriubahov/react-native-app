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
    console.log('Error signup :>> ', e);
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
    console.log('Error login :>> ', e);
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
    console.log('Error getProfile :>> ', e);
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
    console.log('Error updateProfile :>> ', e);
  }
};

/**
 * Get services
 * @returns profile
 */
export const getServices = async () => {
  try {
    const response = await request({
      url: '/services',
      method: 'GET',
    });

    if (response) {
      return response?.data;
    }
  } catch (e) {
    console.log('Error getServices :>> ', e);
  }
};

export const updateService = async (id, data) => {
  try {
    const response = await request({
      url: '/services',
      method: 'PATCH',
      data: {
        servicesId: id,
        ...data,
      },
    });

    if (response) {
      const services = await getServices();
      return services;
    }
  } catch (e) {
    console.log('Erro getServices :>> ', e);
  }
};

export const addService = async data => {
  try {
    console.log('data', data.image);
    const formData = new FormData();
    const objKeys = Object.keys(data);
    objKeys.forEach(key => {
      formData.append(key, data[key]);
    });
    console.log('formData', formData);
    const response = await request({
      url: '/services',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
    console.log(response);

    if (response) {
      const services = await getServices();
      return services;
    }
  } catch (e) {
    console.log('e add services :>> ', e);
  }
};

export const deleteService = async id => {
  try {
    const response = await request({
      url: '/services',
      method: 'DELETE',
      data: {
        servicesId: id,
      },
    });

    if (response) {
      const services = await getServices();
      return services;
    }
  } catch (e) {
    console.log('Erro getServices :>> ', e);
  }
};
