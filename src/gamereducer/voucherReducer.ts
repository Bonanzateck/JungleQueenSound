export interface IApplicationState {
    inVoucherState: boolean;
    currentVoucherResult: object;
    voucherIsRunning: boolean;
    voucherSetFromSideBar: boolean;
}

const initialState: IApplicationState = {
    inVoucherState: false,
    currentVoucherResult: {},
    voucherIsRunning: false,
    voucherSetFromSideBar: false,
};

export enum actionTypes {
    IN_VOUCHER_STATE = '@@voucher/IN_VOUCHER_STATE',
    CURRENT_VOUCHER_RESULT_STORE = '@@voucher/CURRENT_VOUCHER_RESULT_STORE',
    VOUCHER_IS_RUNNING = '@@voucher/VOUCHER_IS_RUNNING',
    VOUCHER_SET_FROM_SIDE_BAR = '@@voucher/VOUCHER_SET_FROM_SIDE_BAR',

}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { inVoucherState, currentVoucherResult, voucherIsRunning, voucherSetFromSideBar } = action;
    switch (action.type) {
        case actionTypes.IN_VOUCHER_STATE:
            return {
                ...state, inVoucherState: inVoucherState
            };
        case actionTypes.CURRENT_VOUCHER_RESULT_STORE:
            return {
                ...state, currentVoucherResult: currentVoucherResult
            };


        case actionTypes.VOUCHER_IS_RUNNING:
            return {
                ...state, voucherIsRunning: voucherIsRunning
            };
        case actionTypes.VOUCHER_SET_FROM_SIDE_BAR:
            return {
                ...state, voucherSetFromSideBar: voucherSetFromSideBar
            };
        default:
            return state;
    }
}

export const actions = {
    setVoucherFromSideBar: (voucherSetFromSideBar: boolean): any => ({ type: actionTypes.VOUCHER_SET_FROM_SIDE_BAR, voucherSetFromSideBar }),
    runVoucher: (voucherIsRunning: boolean): any => ({ type: actionTypes.VOUCHER_IS_RUNNING, voucherIsRunning }),
    voucherState: (inVoucherState: boolean): any => ({ type: actionTypes.IN_VOUCHER_STATE, inVoucherState }),
    storeCurrentVoucherResult: (currentVoucherResult: object): any => ({ type: actionTypes.CURRENT_VOUCHER_RESULT_STORE, currentVoucherResult }),

};
