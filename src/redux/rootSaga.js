// sagas.js

import { all, fork } from 'redux-saga/effects';
import accountSaga from './account/saga';

// Define your sagas here

function* rootSaga() {
  yield all([
    // List your sagas here
    fork(accountSaga)
  ]);
}

export default rootSaga;
