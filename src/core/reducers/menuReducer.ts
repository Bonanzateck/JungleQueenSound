import { actionTypes } from "@bonanzainteractive/slote_core";
export interface IApplicationState {
    showMenu: boolean;
    TotalBet: number;
}

const initialState: IApplicationState = {
    showMenu: false,
    TotalBet: 0,
};


export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    switch (action.type) {
        case actionTypes.SHOW_MENU:
            return {...state, showMenu: true};
        case actionTypes.HIDE_MENU:
            return {
                ...state, showMenu: false,
            };
        default:
            return state;
    }
}

export const actions = {
    showMenuUI: (): any => ({type: actionTypes.SHOW_MENU}),
    hideMenuUI: (): any => ({type: actionTypes.HIDE_MENU}),
};
