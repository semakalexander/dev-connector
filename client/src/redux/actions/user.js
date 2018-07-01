import { SET_CURRENT_USER } from '../types/user';

const _setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

export { _setCurrentUser };
