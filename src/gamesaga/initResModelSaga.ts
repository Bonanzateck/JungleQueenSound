import { takeLatest, put, call } from 'redux-saga/effects';
import { actionTypes } from "@bonanzainteractive/slote_core";

import { initResponseService } from './../gameservice/initResponseService'
import { constant } from "../slot/data/config/index";
export function* initSaga(): Generator<any, any, any> {
    yield takeLatest(actionTypes.GET_APPLICATION_INIT_RESPONSE, fireInitResponse);
}

function* fireInitResponse(): Generator<any, any, any> {
    try {
        const result = yield call(initResponseService.sendInitResponse);
        constant.configGame.cheatModifiedRequest = "";
        yield put({
            type: actionTypes.GET_APPLICATION_INIT_SUCCESS,
            result
        });

    } catch (error) {
        console.log("Error", error);
        yield put({
            type: actionTypes.GET_APPLICATION_INIT_FAILURE,
            error
        });
    }
}

