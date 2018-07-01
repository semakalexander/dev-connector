import { SET_CURRENT_USER } from '../types/user';

const defaultState = {
  current: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        current: action.user
      };
    default:
      return state;
  }
};
