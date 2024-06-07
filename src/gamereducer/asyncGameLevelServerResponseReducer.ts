export interface IApplicationState {
    betIncrease: any,
    betDecrease: any,
    betMax: any,
    result: object,
    error: object
}

const initialState: IApplicationState = {
    betIncrease: false,
    betDecrease: false,
    betMax: false,
    result: {},
    error: {}
};

export enum actionTypes {
    BET_INCREASE = '@@response/BET_INCREASE',
    BET_INCREASE_FAILURE = '@@response/BET_INCREASE_FAILURE',
    GET_APPLICATION_INCREASE_BET_RESPONSE = '@@response/GET_APPLICATION_INCREASE_BET_RESPONSE',
    BET_DECREASE = '@@response/BET_DECREASE',
    BET_DECREASE_FAILURE = '@@response/BET_DECREASE_FAILURE',
    GET_APPLICATION_DECREASE_BET_RESPONSE = '@@response/GET_APPLICATION_DECREASE_BET_RESPONSE',
    BET_MAX = '@@response/BET_MAX',
    BET_MAX_FAILURE = '@@response/BET_MAX_FAILURE',
    GET_APPLICATION_MAX_BET_RESPONSE = '@@response/GET_APPLICATION_MAX_BET_RESPONSE',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { increase_bet, bet, error, betIncrease, betDecrease, decrease_bet, max_bet } = action;
    switch (action.type) {
        case actionTypes.BET_INCREASE_FAILURE:
            return { ...state, error, betIncrease: false };
        case actionTypes.BET_INCREASE:
            return { ...state, result: increase_bet, betIncrease: true };
        case actionTypes.BET_DECREASE_FAILURE:
            return { ...state, error, betDecrease: false };
        case actionTypes.BET_DECREASE:
            return { ...state, result: decrease_bet, betDecrease: true };
        case actionTypes.BET_MAX_FAILURE:
            return { ...state, error, betMax: false };
        case actionTypes.BET_MAX:
            return { ...state, result: max_bet, betMax: true };
        default:
            return state;
    }
}

export const actions = {
    getApplicationIncreaseBetResponse: (): any => ({ type: actionTypes.GET_APPLICATION_INCREASE_BET_RESPONSE }),
    getApplicationDecreaseBetResponse: (): any => ({ type: actionTypes.GET_APPLICATION_DECREASE_BET_RESPONSE }),
    getApplicationMaxBetResponse: (): any => ({ type: actionTypes.GET_APPLICATION_MAX_BET_RESPONSE }),
    getApplicationIncreaseBetFailure: (): any => ({ type: actionTypes.BET_INCREASE_FAILURE }),
    getApplicationDecreaseBetFailure: (): any => ({ type: actionTypes.BET_DECREASE_FAILURE }),
};