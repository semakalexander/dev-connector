import axios from 'axios';

import notifications from '../utilities/notifications';

import { setToken, setUserInfo } from '../utilities/authorization';

const _fetchCurrentUser = () =>
  axios
    .get('/api/users/current')
    .then(res => console.log(res))
    .catch(err => console.log(err));

// todo save user to redux
const signIn = body =>
  axios
    .post('/api/users/login', { ...body })
    .then(res => {
      console.log(res);
      const {
        data: { token, user }
      } = res;

      axios.defaults.headers.authorization = token;

      setToken(token);
      setUserInfo(user);

      notifications.success('You are successfully signed in');
    })
    .catch(err => {
      console.err(err);
      if (err.response) {
        notifications.error(Object.values(err.response.data).join('\n'));
      } else {
        notifications.error(JSON.stringify(err));
      }
    });

export { signIn };
