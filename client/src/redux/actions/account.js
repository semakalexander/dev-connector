import { SIGN_IN, SIGN_UP } from '../types/account';

const signIn = body => ({ type: SIGN_IN, body });

const signUp = body => ({ type: SIGN_UP, body });

export { signIn, signUp };