import axios from 'axios';
import { getToken, removeInfo } from './authorization';

const token = getToken();

if (token) {
  axios.defaults.headers.authorization = token;
}

axios.defaults.validateStatus = status => {
  if (status === 401) {
    removeInfo();
  }
  return status === 200;
};
