export interface IApplicationState {
    autoplayKeyboardListenerActive: boolean;
    clickedInputBox: string;
    digitToDisplay: number;
    storeSliderValue: number;

}

const initialState: IApplicationState = {
    autoplayKeyboardListenerActive: false,
    clickedInputBox: "",
    digitToDisplay: 0,
    storeSliderValue: 0
};

export enum actionTypes {
    ACTIVE_AUTOPLAY_KEYBOARD_LISTENER = '@@autoplayKeyboardListener/ACTIVE_AUTOPLAY_KEYBOARD_LISTENER',
    CLICKED_INPUT_BOX = '@@autoplayKeyboardListener/CLICKED_INPUT_BOX',
    SET_VALUE_TO_DISPLAY = '@@autoplayKeyboardListener/SET_VALUE_TO_DISPLAY',
    SET_SLIDER_VALUE = '@@autoplayKeyboardListener/SET_SLIDER_VALUE',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { autoplayKeyboardListenerActive, clickedInputBox, digitToDisplay, storeSliderValue } = action;
    switch (action.type) {
        case actionTypes.ACTIVE_AUTOPLAY_KEYBOARD_LISTENER:
            return {
                ...state,
                autoplayKeyboardListenerActive: autoplayKeyboardListenerActive
            };
        case actionTypes.CLICKED_INPUT_BOX:
            return {
                ...state,
                clickedInputBox: clickedInputBox
            };
        case actionTypes.SET_VALUE_TO_DISPLAY:
            return {
                ...state,
                digitToDisplay: digitToDisplay
            };
        case actionTypes.SET_SLIDER_VALUE:
            return {
                ...state,
                storeSliderValue: storeSliderValue
            };
        default:
            return state;
    }
}

export const actions = {
    setAutoplayKeyboardListenerActive: (autoplayKeyboardListenerActive: boolean): any => ({ type: actionTypes.ACTIVE_AUTOPLAY_KEYBOARD_LISTENER, autoplayKeyboardListenerActive }),
    setNameOfClickedInputBox: (clickedInputBox: any): any => ({ type: actionTypes.CLICKED_INPUT_BOX, clickedInputBox }),
    setDigitToDisplay: (digitToDisplay: any): any => ({ type: actionTypes.SET_VALUE_TO_DISPLAY, digitToDisplay }),
    setSliderValue: (storeSliderValue: number): any => ({ type: actionTypes.SET_SLIDER_VALUE, storeSliderValue }),
};
