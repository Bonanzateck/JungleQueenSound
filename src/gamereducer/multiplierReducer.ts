import { any } from "prop-types";

export interface IApplicationState {
    showMultiplier: boolean;
    multiplierCurrentValue: number;
    storeMultiplierCurrentValue: number;
    preMultiplier: number,
    multiplierBlastStart: boolean,
    freeSpinRewards: boolean,
    resolve: any,
}

const initialState: IApplicationState = {
    showMultiplier: false,
    multiplierCurrentValue: 0,
    storeMultiplierCurrentValue: 0,
    preMultiplier: 1,
    multiplierBlastStart: false,
    freeSpinRewards: false,
    resolve: any
};

export enum actionTypes {
    SHOW_MULTIPLIER = '@@multiplier/SHOW_MULTIPLIER',
    SET_MULTIPLIER_VALUE = '@@multiplier/SET_MULTIPLIER_VALUE',
    STORE_MULTIPLIER_VALUE = '@@multiplier/STORE_MULTIPLIER_VALUE',
    SET_PREV_MULTIPLIER_ACTION = '@@multiplier/SET_PREV_MULTIPLIER_ACTION',
    SET_MULTIPLIER_BLAST_ACTION = '@@multiplier/SET_MULTIPLIER_BLAST_ACTION',
    SET_FREE_SPIN_REWARDS_ACTION = '@@multiplier/SET_FREE_SPIN_REWARDS_ACTION',
    SET_FREE_PROMISE = '@@multiplier/SET_FREE_PROMISE',
    SET_MULTIPLIER_PROMISE = '@@multiplier/SET_MULTIPLIER_PROMISE',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { showMultiplier, multiplierCurrentValue, storeMultiplierCurrentValue, preMultiplier, multiplierBlastStart, freeSpinRewards } = action;
    switch (action.type) {
        case actionTypes.SHOW_MULTIPLIER:
            return {
                ...state, showMultiplier: showMultiplier
            };
        case actionTypes.SET_MULTIPLIER_VALUE:
            return {
                ...state, multiplierCurrentValue: multiplierCurrentValue
            };
        case actionTypes.STORE_MULTIPLIER_VALUE:
            return {
                ...state, storeMultiplierCurrentValue: storeMultiplierCurrentValue
            };
        case actionTypes.SET_PREV_MULTIPLIER_ACTION:
            return {
                ...state, preMultiplier: preMultiplier
            };
        case actionTypes.SET_MULTIPLIER_BLAST_ACTION:
            return {
                ...state, multiplierBlastStart: multiplierBlastStart
            };
        case actionTypes.SET_FREE_SPIN_REWARDS_ACTION:
            return {
                ...state, freeSpinRewards: freeSpinRewards, resolve: action.resolve,
            };
        case actionTypes.SET_FREE_PROMISE:
            return {
                ...state, freeSpinRewards: false, resolve: action,
            };
        case actionTypes.SET_MULTIPLIER_PROMISE:
            return {
                ...state, multiplierBlastStart: true, resolve: action,
            };
        default:
            return state;
    }
}

export const actions = {
    multiplierShow: (showMultiplier: boolean): any => ({ type: actionTypes.SHOW_MULTIPLIER, showMultiplier }),
    setMultiplierValue: (multiplierCurrentValue: number): any => ({ type: actionTypes.SET_MULTIPLIER_VALUE, multiplierCurrentValue }),
    storeMultiplierValue: (storeMultiplierCurrentValue: number): any => ({ type: actionTypes.STORE_MULTIPLIER_VALUE, storeMultiplierCurrentValue }),
    setPreMultiplier: (preMultiplier: number): any => ({ type: actionTypes.SET_PREV_MULTIPLIER_ACTION, preMultiplier }),
    setMultiplierBlast: (multiplierBlastStart: boolean): any => ({ type: actionTypes.SET_MULTIPLIER_BLAST_ACTION, multiplierBlastStart }),
    setFreeSpinRewards: (freeSpinRewards: boolean, resolve: any= any): any => ({ type: actionTypes.SET_FREE_SPIN_REWARDS_ACTION, freeSpinRewards }),
    setProsData: (data: any): any => ({ type: actionTypes.SET_FREE_PROMISE, data }),
    setMulitplierProsData: (data: any): any => ({ type: actionTypes.SET_MULTIPLIER_PROMISE, data }),
};
