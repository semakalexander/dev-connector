import { all } from 'redux-saga/effects';

import account from './account';

const rootSaga = function* () {
    yield all([
        ...account.map(saga => saga())
    ]);
};

export default rootSaga;
