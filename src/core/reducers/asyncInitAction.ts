import { actionTypes } from '@bonanzainteractive/slote_core';

export interface IApplicationAsynchInitState {
    isInitResponseReceived: boolean,
    startRendering: boolean,
    result: object,
    error: object,
    balanceResult: object,
    isBalanceResponseReceived: boolean,
    gameBroken: boolean,
    loadingPercent: number,

}

const initialState: IApplicationAsynchInitState = {

    isInitResponseReceived: false,
    isBalanceResponseReceived: false,
    startRendering: false,
    gameBroken: false,
    result: {},
    balanceResult: {},
    loadingPercent: 0,
    error: {}

};

export function reducer(
    state: IApplicationAsynchInitState = initialState,
    action: any,
): IApplicationAsynchInitState {
    const { result, balanceResult, bet, error, startRendering,gameBroken ,loadingPercent} = action;
    switch (action.type) {
        case actionTypes.GET_APPLICATION_INIT_FAILURE:
            return { ...state, error, isInitResponseReceived: false };
        case actionTypes.GET_APPLICATION_INIT_SUCCESS:
            return { ...state, result, isInitResponseReceived: true };
        case actionTypes.SET_APPLICATION_INIT_BALANCE_SUCCESS:
            return { ...state, balanceResult:balanceResult, isBalanceResponseReceived: true };
        case actionTypes.GET_APPLICATION_START_RENDERING:
            return { ...state, result, startRendering: startRendering };
        case actionTypes.SET_APPLICATION_BROKEN:
            return { ...state, result, gameBroken: gameBroken };
        case actionTypes.SET_LOADING_PERCENT:
            return { ...state, result, loadingPercent: loadingPercent };
        default:
            return state;
    }
}

export const actions = {
    getApplicationInitResponse: (): any => ({ type: actionTypes.GET_APPLICATION_INIT_RESPONSE }),
    setApplicationInitBalanceResponse: (balanceResult:any): any => ({ type: actionTypes.SET_APPLICATION_INIT_BALANCE_SUCCESS ,balanceResult}),
    renderingStart: (startRendering: boolean): any => ({ type: actionTypes.GET_APPLICATION_START_RENDERING, startRendering }),
    setApplicationBroken: (gameBroken: boolean): any => ({ type: actionTypes.SET_APPLICATION_BROKEN, gameBroken }),
    setLoadingPercent: (loadingPercent: number): any => ({ type: actionTypes.SET_LOADING_PERCENT, loadingPercent }),

};