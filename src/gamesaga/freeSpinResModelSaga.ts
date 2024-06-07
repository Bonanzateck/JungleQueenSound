import { takeLatest, put, call } from 'redux-saga/effects';
import { freeSpinResponseService } from './../gameservice/freeSpinResponseService';
import { actionTypes } from '@bonanzainteractive/slote_core';

export function* freeSpinSaga(): Generator<any, any, any> {
    yield takeLatest(actionTypes.GET_APPLICATION_FREE_SPIN_RESPONSE, fireSpinResponse);
}

function* fireSpinResponse(): Generator<any, any, any> {
    try {
        let result_spin = yield call(freeSpinResponseService.sendFreeSpinResponse);
        yield put({
            type: actionTypes.GET_APPLICATION_SPIN_SUCCESS,
            result_spin
        });

    } catch (error) {
        yield put({
            type: actionTypes.GET_APPLICATION_SPIN_FAILURE,
            error
        });
    }
}

