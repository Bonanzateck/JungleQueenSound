import {all, AllEffect, fork} from 'redux-saga/effects';
import {initSaga} from "./initResModelSaga";
import {actionSaga} from "./gameResModelSaga";
import {spinSaga} from "./spinResModelSaga";
import {freeSpinSaga} from "./freeSpinResModelSaga";
// not using this saga
export default function* gamerootSaga(): IterableIterator<AllEffect<any>> {
    yield all([
        fork(initSaga),
        fork(actionSaga),
        fork(spinSaga),
        fork(freeSpinSaga),
    ]);
}
