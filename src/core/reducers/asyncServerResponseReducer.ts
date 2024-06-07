import { actionTypes } from '@bonanzainteractive/slote_core';

export interface IApplicationState {
    isResponseReceived: boolean,
    isRequestSent: boolean,
    result: object,
    allhistoryresult: object,
    spinspecifichistoryresult: object,
    error: object,
    currentVoucherResult: object,

}

const initialState: IApplicationState = {

    isResponseReceived: false,
    isRequestSent: false,
    result: {},
    allhistoryresult: [],
    spinspecifichistoryresult: {},
    error: {},
    currentVoucherResult: {},

};

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { result_spin, bet, error, currentVoucherResult, } = action;
    switch (action.type) {
        case actionTypes.GET_APPLICATION_SPIN_RESPONSE:
            return { ...state, isRequestSent: true };
        case actionTypes.GET_APPLICATION_SPIN_FAILURE:
            let error_disconnection =
            {
                "error": {
                    "status": 500,
                }
            }
            let errorDisplay;
            error.error === undefined ? errorDisplay = error_disconnection : errorDisplay = error;
            return { ...state, error: errorDisplay, isResponseReceived: false, isRequestSent: false, result: error_disconnection };
        case actionTypes.GET_APPLICATION_SPIN_SUCCESS:
            return { ...state, result: result_spin, currentVoucherResult: currentVoucherResult, isResponseReceived: true, isRequestSent: false };

        case actionTypes.GET_APPLICATION_CASCADE_SUCCESS:

            return { ...state, result: result_spin, currentVoucherResult: currentVoucherResult, isResponseReceived: true, isRequestSent: false };
        case actionTypes.GET_APPLICATION_HISTORY_SUCCESS:

            return { ...state, allhistoryresult: result_spin };
        default:
            return state;
    }
}

export const actions = {
    getApplicationSpinResponse: (): any => ({ type: actionTypes.GET_APPLICATION_SPIN_RESPONSE }),
    getApplicationSpinCascadeResponse: (): any => ({ type: actionTypes.GET_APPLICATION_SPIN_CASCADE_RESPONSE }),
    getApplicationFreeSpinResponse: (): any => ({ type: actionTypes.GET_APPLICATION_FREE_SPIN_RESPONSE }),
    getApplicationHistoryResponse: (): any => ({ type: actionTypes.GET_APPLICATION_HISTORY_RESPONSE }),
    getApplicationSpecificHistoryResponse: (): any => ({ type: actionTypes.GET_APPLICATION_SPECIFIC_HISTORY_RESPONSE }),
    getApplicationBonusResponse: (): any => ({ type: actionTypes.GET_APPLICATION_BONUS_RESPONSE }),
    getApplicationBonusResponseForColor: (): any => ({ type: actionTypes.GET_APPLICATION_BONUS_RESPONSE_FOR_COLOR }),
};