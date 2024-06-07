export interface IApplicationState {
    level: number;
    prevLevel: number;
    transformTo: number,
    totalNumMysterySym: number,
    currentMysterySym: number,
    goldenCoinList: any,
    mysteryCoinList: any,
    containsFeature: boolean,
    isGoldenFetureComplete: boolean,
    isGameBroken: boolean,
    isPostFeatureRequired: boolean,
    butterFliesPlaced: boolean,
    storeMysPosition: any,
    startFgMysteryCounter: boolean,
    playMysterySymbolAnimFg: boolean,
    revealFeatureStart: boolean,
    butterFlyCollected: boolean,
    resultWinSpinInFG: any,
    freeSpinAdd: number,
    freeSpinPopUpActive: boolean,
}

const initialState: IApplicationState = {
    level: -1,
    prevLevel: -1,
    transformTo: -1,
    totalNumMysterySym: -1,
    currentMysterySym: -1,
    goldenCoinList: [],
    mysteryCoinList: [],
    containsFeature: false,
    isGoldenFetureComplete: false,
    isGameBroken: false,
    isPostFeatureRequired: false,
    butterFliesPlaced: false,
    storeMysPosition: [],
    startFgMysteryCounter: false,
    playMysterySymbolAnimFg: false,
    revealFeatureStart: false,
    butterFlyCollected: false,
    resultWinSpinInFG: Object,
    freeSpinAdd: 0,
    freeSpinPopUpActive: false
};

export enum actionTypes {
    LEVEL_ACTIVE = '@@revealFeature/LEVEL_ACTIVE',
    PREV_LEVEL_ACTION = '@@revealFeature/PREV_LEVEL_ACTION',
    TRASN_FORM_TO = '@@revealFeature/TRASN_FORM_TO',
    TOTAL_NUM_MYSTERY_SYMBOL = '@@revealFeature/TOTAL_NUM_MYSTERY_SYMBOL',
    CURRENT_MYSTERY_SYM = '@@revealFeature/CURRENT_MYSTERY_SYM',
    GOLDEN_COIN_LIST = '@@revealFeature/GOLDEN_COIN_LIST',
    FEATURE_IS_ACTIVATED = '@@revealFeature/FEATURE_IS_ACTIVATED',
    MYSTERY_COINLIST = '@@revealFeature/MYSTERY_COINLIST',
    GOLDEN_FETURE_COMPLTER = '@@revealFeature/GOLDEN_FETURE_COMPLTER',
    SET_GAME_BROKEN = '@@revealFeature/SET_GAME_BROKEN',
    IS_POST_FEATURE_REQUIRED = '@@revealFeature/IS_POST_FEATURE_REQUIRED',
    BUTTERFLIES_PLACED_ON_POSITION = '@@revealFeature/BUTTERFLIES_PLACED_ON_POSITION',
    STORE_MYSTERY_SYMBOL_POSITION = '@@revealFeature/STORE_MYSTERY_SYMBOL_POSITION',
    START_FG_MYSTERY_SYMBOL_COUNTER = '@@revealFeature/START_FG_MYSTERY_SYMBOL_COUNTER',
    PLAY_MYSTERY_SYMBOL_ANIMATION_FOR_FREE_GAME = '@@revealFeature/PLAY_MYSTERY_SYMBOL_ANIMATION_FOR_FREE_GAME',
    REVEAL_FEATURE_START = '@@revealFeature/REVEAL_FEATURE_START',
    BUTTERFLY_COLLECTED_ACTION = '@@revealFeature/BUTTERFLY_COLLECTED_ACTION',
    SET_WIN_DATA = '@@revealFeature/SET_WIN_DATA',
    SET_FREE_SPIN_ADDED_ACTION = '@@revealFeature/SET_FREE_SPIN_ADDED_ACTION',
    SET_FREE_SPIN_POPUP_ACTIVE_ACTION = '@@revealFeature/SET_FREE_SPIN_POPUP_ACTIVE_ACTION',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { revealFeatureStart, playMysterySymbolAnimFg, startFgMysteryCounter, storeMysPosition, butterFliesPlaced, levelActive, trasnFromActive, totalNumMysterySymActive, isPostFeatureRequired, currentMysterySymActive, goldenCoinListActive, containsFeature, mysteryCoinListActive, isGoldenFetureComplete, isGameBroken, butterFlyCollected, resultWinSpinInFG, freeSpinAdd, freeSpinPopUpActive, prevLevel } = action;
    switch (action.type) {


        case actionTypes.IS_POST_FEATURE_REQUIRED:
            return {
                ...state,
                isPostFeatureRequired: isPostFeatureRequired
            }

        case actionTypes.LEVEL_ACTIVE:
            return {
                ...state, level: levelActive
            };
        case actionTypes.PREV_LEVEL_ACTION:
            return {
                ...state, prevLevel: prevLevel
            };

        case actionTypes.TRASN_FORM_TO:
            return {
                ...state, transformTo: trasnFromActive
            };

        case actionTypes.TOTAL_NUM_MYSTERY_SYMBOL:
            return {
                ...state, totalNumMysterySym: totalNumMysterySymActive
            };

        case actionTypes.CURRENT_MYSTERY_SYM:
            return {
                ...state, currentMysterySym: currentMysterySymActive
            };

        case actionTypes.GOLDEN_COIN_LIST:
            return {
                ...state, goldenCoinList: goldenCoinListActive
            };
        case actionTypes.FEATURE_IS_ACTIVATED:
            return {
                ...state, containsFeature: containsFeature
            };

        case actionTypes.MYSTERY_COINLIST:
            return {
                ...state, mysteryCoinList: mysteryCoinListActive
            };

        case actionTypes.GOLDEN_FETURE_COMPLTER:
            return {
                ...state, isGoldenFetureComplete: isGoldenFetureComplete
            };
        case actionTypes.SET_GAME_BROKEN:
            return {
                ...state, isGameBroken: isGameBroken
            };
        case actionTypes.BUTTERFLIES_PLACED_ON_POSITION:
            return {
                ...state,
                butterFliesPlaced: butterFliesPlaced
            }
        case actionTypes.STORE_MYSTERY_SYMBOL_POSITION:
            return {
                ...state,
                storeMysPosition: storeMysPosition
            }
        case actionTypes.START_FG_MYSTERY_SYMBOL_COUNTER:
            return {
                ...state,
                startFgMysteryCounter: startFgMysteryCounter
            }
        case actionTypes.PLAY_MYSTERY_SYMBOL_ANIMATION_FOR_FREE_GAME:
            return {
                ...state,
                playMysterySymbolAnimFg: playMysterySymbolAnimFg
            }
        case actionTypes.REVEAL_FEATURE_START:
            return {
                ...state,
                revealFeatureStart: revealFeatureStart
            }
        case actionTypes.BUTTERFLY_COLLECTED_ACTION:
            return {
                ...state,
                butterFlyCollected: butterFlyCollected
            }
        case actionTypes.SET_WIN_DATA:
            return {
                ...state,
                resultWinSpinInFG: resultWinSpinInFG
            }
        case actionTypes.SET_FREE_SPIN_ADDED_ACTION:
            return {
                ...state,
                freeSpinAdd: freeSpinAdd
            }
        case actionTypes.SET_FREE_SPIN_POPUP_ACTIVE_ACTION:
            return {
                ...state,
                freeSpinPopUpActive: freeSpinPopUpActive
            }
        default:
            return state;
    }
}

export const actions = {
    setRevealFeatureStart: (revealFeatureStart: boolean): any => ({ type: actionTypes.REVEAL_FEATURE_START, revealFeatureStart }),
    mysterySymAnimPlayFg: (playMysterySymbolAnimFg: boolean): any => ({ type: actionTypes.PLAY_MYSTERY_SYMBOL_ANIMATION_FOR_FREE_GAME, playMysterySymbolAnimFg }),
    featureExists: (containsFeature: boolean): any => ({ type: actionTypes.FEATURE_IS_ACTIVATED, containsFeature }),
    setLevel: (levelActive: any): any => ({ type: actionTypes.LEVEL_ACTIVE, levelActive }),
    setPrevLevel: (prevLevel: any): any => ({ type: actionTypes.PREV_LEVEL_ACTION, prevLevel }),
    setTrasformSymbol: (trasnFromActive: any): any => ({ type: actionTypes.TRASN_FORM_TO, trasnFromActive }),
    setTotalNumberMysterySymbol: (totalNumMysterySymActive: number): any => ({ type: actionTypes.TOTAL_NUM_MYSTERY_SYMBOL, totalNumMysterySymActive }),
    setCurrentMysterySym: (currentMysterySymActive: number): any => ({ type: actionTypes.CURRENT_MYSTERY_SYM, currentMysterySymActive }),
    setGoldenCoinList: (goldenCoinListActive: any): any => ({ type: actionTypes.GOLDEN_COIN_LIST, goldenCoinListActive }),
    setMysteryCoinList: (mysteryCoinListActive: any): any => ({ type: actionTypes.MYSTERY_COINLIST, mysteryCoinListActive }),
    goldenFeatureComplete: (isGoldenFetureComplete: any): any => ({ type: actionTypes.GOLDEN_FETURE_COMPLTER, isGoldenFetureComplete }),
    setIsGameBroken: (isGameBroken: boolean): any => ({ type: actionTypes.SET_GAME_BROKEN, isGameBroken }),
    setPostFeature: (isPostFeatureRequired: boolean): any => ({ type: actionTypes.IS_POST_FEATURE_REQUIRED, isPostFeatureRequired }),
    isButterFliesPlaced: (butterFliesPlaced: boolean): any => ({ type: actionTypes.BUTTERFLIES_PLACED_ON_POSITION, butterFliesPlaced }),
    mysPositionStored: (storeMysPosition: any): any => ({ type: actionTypes.STORE_MYSTERY_SYMBOL_POSITION, storeMysPosition }),
    fgMysteryCounterStart: (startFgMysteryCounter: boolean): any => ({ type: actionTypes.START_FG_MYSTERY_SYMBOL_COUNTER, startFgMysteryCounter }),
    setButterflyCollect: (butterFlyCollected: boolean): any => ({ type: actionTypes.BUTTERFLY_COLLECTED_ACTION, butterFlyCollected }),
    setWinsStoreDataForFG: (resultWinSpinInFG: any): any => ({ type: actionTypes.SET_WIN_DATA, resultWinSpinInFG }),
    setFreeSpinAdded: (freeSpinAdd: number): any => ({ type: actionTypes.SET_FREE_SPIN_ADDED_ACTION, freeSpinAdd }),
    setFreeSpinPopUpActive: (freeSpinPopUpActive: boolean): any => ({ type: actionTypes.SET_FREE_SPIN_POPUP_ACTIVE_ACTION, freeSpinPopUpActive }),
};
