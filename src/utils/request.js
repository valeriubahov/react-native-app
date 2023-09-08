import axios from 'axios';
import Config from 'react-native-config';

export const request = ({url, method, data}) => {
  return axios({
    method: method || 'GET',
    url: `${Config.API_URL}${url}`,
    data,
  });
};
