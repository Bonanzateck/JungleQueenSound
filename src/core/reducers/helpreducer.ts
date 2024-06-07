import { actionTypes } from "@bonanzainteractive/slote_core";
export interface IApplicationState {

    showHelp: boolean;

}

const initialState: IApplicationState = {
    showHelp: false,
};


export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {

    switch (action.type) {
        case actionTypes.SHOW_HELP:
            return {...state, showHelp: true};
        case actionTypes.HIDE_Help:

            return {
                ...state, showHelp: false,
            };

        default:
            return state;
    }
}

export const actions = {
    showHelp: (): any => ({type: actionTypes.SHOW_HELP}),
    hideHelp: (): any => ({type: actionTypes.HIDE_Help}),

};
