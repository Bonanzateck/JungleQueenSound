export interface IApplicationState {
    isActionResponseReceived: boolean,
    result: object,
    currentVoucherResult: object,
    error: object,
}

const initialState: IApplicationState = {
    isActionResponseReceived: false,
    result: {},
    error: {},
    currentVoucherResult: {},
};

export enum actionTypes {
    GET_APPLICATION_ACTION_RESPONSE = '@@application_action/GET_APPLICATION_ACTION_RESPONSE',
    GET_APPLICATION_ACTION_SUCCESS = '@@application_action/GET_APPLICATION_ACTION_SUCCESS',
    GET_APPLICATION_ACTION_FAILURE = '@@application_action/GET_APPLICATION_ACTION_FAILURE',
    SET_CURRENT_VOUCHER_RESULT = '@@application_action/SET_CURRENT_VOUCHER_RESULT',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { result, error, currentVoucherResult } = action;

    switch (action.type) {
        case actionTypes.GET_APPLICATION_ACTION_FAILURE:
            return { ...state, error, isActionResponseReceived: false };
        case actionTypes.GET_APPLICATION_ACTION_SUCCESS:
            return { ...state, result, currentVoucherResult: currentVoucherResult, isActionResponseReceived: true };
        case actionTypes.SET_CURRENT_VOUCHER_RESULT:
            return { ...state, currentVoucherResult: currentVoucherResult };
        default:
            return state;
    }
}

export const actions = {
    getApplicationActionResponse: (): any => ({ type: actionTypes.GET_APPLICATION_ACTION_RESPONSE }),
    setCurrentVoucherResult: (currentVoucherResult: any): any => ({ type: actionTypes.SET_CURRENT_VOUCHER_RESULT, currentVoucherResult }),

};