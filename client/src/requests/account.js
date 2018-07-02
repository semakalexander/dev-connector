import axios from 'axios';

import notifications from '../utilities/notifications';

import { setToken, setUserInfo } from '../utilities/authorization';

const errorHandler = err => {
  console.error(err);
  if (err.response) {
    notifications.error(Object.values(err.response.data).join('\n'));
  } else {
    notifications.error(JSON.stringify(err));
  }
};

// todo redirect to developers page and change navbar menu
const signIn = (body) =>
  axios
    .post('users/login', body)
    .then(res => {
      const {
        data: { token, user }
      } = res;

      axios.defaults.headers.authorization = token;

      setToken(token);
      setUserInfo(user);

      notifications.success('You are successfully signed in');
    })
    .catch(errorHandler);


const signUp = body => 
  axios.post('users/register', body)
  .then(res => signIn({ email: body.email, password: body.password }))
  .catch(errorHandler)

export { signIn, signUp };
