const setToken = token => localStorage.setItem('token', token);

const getToken = () => localStorage.getItem('token');

const removeToken = () => localStorage.removeItem('token');

const setUserInfo = user => localStorage.setItem('user', JSON.stringify(user));

const getUserInfo = () => JSON.parse(localStorage.getItem('user'));

const removeUserInfo = () => localStorage.removeItem('user');

const removeInfo = () => {
  removeToken();
  removeUserInfo();
};

// TODO set token to cookies

export {
  setToken,
  getToken,
  removeToken,
  setUserInfo,
  getUserInfo,
  removeUserInfo,
  removeInfo
};
