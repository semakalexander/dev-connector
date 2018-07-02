import { takeLatest, call } from 'redux-saga/effects';

import { SIGN_IN, SIGN_UP } from '../types/account';
import { signIn, signUp } from '../../requests/account';

const signInSaga = function* (action) {
    yield call(signIn, action.body);
}

const watchSignInSaga = function* () {
    yield takeLatest(SIGN_IN, signInSaga);
}

const signUpSaga = function* (action) {
    yield call(signUp, action.body);
}

const watchSignUpSaga = function* () {
    yield takeLatest(SIGN_UP, signUpSaga);
}

export default [watchSignInSaga, watchSignUpSaga];