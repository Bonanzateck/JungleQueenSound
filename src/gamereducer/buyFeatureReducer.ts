export interface IApplicationState {

    buyFeaturePageVisible: boolean;
    buyFeatureValue:number;
}

const initialState: IApplicationState = {

    buyFeaturePageVisible: true,
    buyFeatureValue:0

};

export enum actionTypes {

    VISIBILITY_OF_BUYFEATURE = '@@introduction/VISIBILITY_OF_BUYFEATURE',
    VALUE_OF_BUYFEATURE= '@@introduction/VALUE_OF_BUYFEATURE',

}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { buyFeaturePageVisible,buyFeatureValue } = action;
    switch (action.type) {

        case actionTypes.VISIBILITY_OF_BUYFEATURE:
            return {
                ...state, buyFeaturePageVisible: buyFeaturePageVisible,
            };
        case actionTypes.VALUE_OF_BUYFEATURE:
            return {
                ...state, buyFeatureValue: buyFeatureValue,
            };
        default:
            return state;
    }
}

export const actions = {

    visibleBuyFeatureScreen: (buyFeaturePageVisible: boolean): any => ({ type: actionTypes.VISIBILITY_OF_BUYFEATURE, buyFeaturePageVisible }),
    valueBuyFeatureScreen: (buyFeatureValue: number): any => ({ type: actionTypes.VALUE_OF_BUYFEATURE, buyFeatureValue }),


};
