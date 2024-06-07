import { any } from "prop-types";

export interface IApplicationState {
    transitionBalance: number;
    previousBalance: number;
    freeGameEnded: boolean;
    betList: any;
    winAmountEmpty: boolean;
    totalCreditWinAmount: number;
    totalWinAmount: number;
    scatterDataBeforeFG: any;
    scatterDataAnticipation: any;
    resetManyWaysTextToInitial: boolean;
    storeAmountForAutoplay: number;
    betBoxCount: number;
    featureTriggered: boolean;
    counterStartIncreasing: boolean;
    showMobileMenuPanel: boolean;
    maxWinOddsCount: number;
    storeCurrentTimeForRC: number;
    noInternetPopupVisible: boolean;
    storeWinningSymbolData: any;
    requestSent: boolean;
    text: string;
    closeButton: Boolean;
    continueButton: Boolean;
    storeTotalWinAmountForBaseGame: number;
    updateBalanceAfterSpin: boolean;
    resumeRealityCheck: boolean;
    inSpinMode: boolean;
    balanceLow: boolean;
    insufficientFunds: boolean;
    buyFeatureStakeExceeds: boolean;
    menuBtnClicked: boolean;
    showSettingGameRules: boolean;
    isMenuOpen: boolean;
    showBetHistory: boolean;
    showGameSettings: boolean;
    showBetHistory2: boolean;
    updateWin: boolean,
    totalWinAmountInFreeGame: number,
    coinQueenWins: Array<any>,
    spinStopButtonActive: Boolean,
    deActivate: boolean,
    startQueenAnimation: boolean,
    resolve: any,
    buyFeatureVisible: boolean;
    checkGameTurboMode: boolean,
}

const initialState: IApplicationState = {
    transitionBalance: 0,
    previousBalance: 0,
    freeGameEnded: false,
    betList: [],
    winAmountEmpty: false,
    totalCreditWinAmount: 0,
    totalWinAmount: 0,
    scatterDataBeforeFG: [],
    scatterDataAnticipation: [],
    resetManyWaysTextToInitial: false,
    storeAmountForAutoplay: 0,
    betBoxCount: 0,
    featureTriggered: false,
    counterStartIncreasing: true,
    showMobileMenuPanel: false,
    maxWinOddsCount: 0,
    storeCurrentTimeForRC: 0,
    noInternetPopupVisible: false,
    storeWinningSymbolData: [],
    requestSent: false,
    text: "",
    closeButton: false,
    continueButton: false,
    storeTotalWinAmountForBaseGame: 0,
    updateBalanceAfterSpin: false,
    resumeRealityCheck: false,
    inSpinMode: false,
    balanceLow: false,
    insufficientFunds: false,
    buyFeatureStakeExceeds: false,
    menuBtnClicked: false,
    showSettingGameRules: false,
    isMenuOpen: false,
    showBetHistory: false,
    showBetHistory2: false,
    showGameSettings: false,
    updateWin: false,
    totalWinAmountInFreeGame: 0,
    coinQueenWins: [],
    spinStopButtonActive: false,
    deActivate: false,
    startQueenAnimation: false,
    resolve: any,
    buyFeatureVisible: false,
    checkGameTurboMode: false
};

export enum actionTypes {
    SET_GAME_TURBO_MODE = '@@behaviour/SET_GAME_TURBO_MODE',
    SET_TRANSITION_BALANCE = '@@behaviour/SET_TRANSITION_BALANCE',
    SET_PREVIOUS_BALANCE = '@@behaviour/SET_PREVIOUS_BALANCE',
    SET_FREE_GAME_ENDED = '@@behaviour/SET_FREE_GAME_STATE_TRUE',
    SET_BET_LIST = '@@behaviour/SET_BET_LIST',
    SET_SCATTER_DATA_BEFORE_FG = '@@behaviour/SET_SCATTER_DATA_BEFORE_FG',
    SET_SCATTER_DATA_ANTICIPATION = '@@behaviour/SET_SCATTER_DATA_ANTICIPATION',
    SET_WIN_AMOUNT_EMPTY = '@@behaviour/SET_WIN_AMOUNT_EMPTY',
    SET_TOTAL_CREDITED_WIN_AMOUNT = '@@behaviour/SET_TOTAL_CREDITED_WIN_AMOUNT',
    SET_TOTAL_CREDITED_WIN_AMOUNT_IN_FREE_GAME = '@@behaviour/SET_TOTAL_CREDITED_WIN_AMOUNT_IN_FREE_GAME',
    SET_TOTAL_WIN_AMOUNT = '@@behaviour/SET_TOTAL_WIN_AMOUNT',
    RESET_INITIAL_MANYWAYS_TEXT = '@@behaviour/RESET_INITIAL_MANYWAYS_TEXT',
    STORE_AMOUNT_FOR_AUTOPLAY = '@@behaviour/STORE_AMOUNT_FOR_AUTOPLAY',
    SET_BET_BOX_COUNT = '@@behaviour/SET_BET_BOX_COUNT',
    SET_FEATURE_TRIGGERED = '@@behaviour/SET_FEATURE_TRIGGERED',
    SET_COUNTER_START_INCREASING = '@@behaviour/SET_COUNTER_START_INCREASING',
    SET_MOBILE_MENU_PANEL_VISIBILITLY = '@@behaviour/SET_MOBILE_MENU_PANEL_VISIBILITLY',
    SET_MAX_WIN_ODDS_COUNT = '@@behaviour/SET_MAX_WIN_ODDS_COUNT',
    SET_REALITY_CHECK_VISIBILITTY = '@@behaviour/SET_REALITY_CHECK_VISIBILITTY',
    SET_CURRENT_TIME_FOR_REALITY_CHECK = '@@behaviour/SET_CURRENT_TIME_FOR_REALITY_CHECK',
    SET_NO_INTERNET_POPUP_VISIBLE = '@@behaviour/SET_NO_INTERNET_POPUP_VISIBLE',
    STORE_WINNING_SYMBOL_DATA = '@@behaviour/STORE_WINNING_SYMBOL_DATA',
    SET_REQUEST_SENT = '@@behaviour/SET_REQUEST_SENT',
    STORE_TOTAL_WIN_AMOUNT_FOR_BASEGAME = '@@behaviour/STORE_TOTAL_WIN_AMOUNT_FOR_BASEGAME',
    UPDATE_BALANCE_AFTER_SPIN = '@@behaviour/UPDATE_BALANCE_AFTER_SPIN',
    UPDATE_WIN_AFTER_WINANIMATION = '@@behaviour/UPDATE_WIN_AFTER_WINANIMATION',
    PAUSE_REALITY_CHECK = '@@behaviour/PAUSE_REALITY_CHECK',
    RESUME_REALITY_CHECK = '@@behaviour/RESUME_REALITY_CHECK',
    IN_SPINNING_MODE = '@@behaviour/IN_SPINNING_MODE',
    LOW_BALANCE_THEN_BET = '@@behaviour/LOW_BALANCE_THEN_BET',
    SET_AUTOPLAY_LIST = '@@behaviour/SET_AUTOPLAY_LIST',
    SET_INSUFFICIENT_FUNDS = '@@behaviour/SET_INSUFFICIENT_FUNDS',
    SET_BUY_FEATURE_STAKE_EXCEEDS = '@@behaviour/SET_BUY_FEATURE_STAKE_EXCEEDS',
    MENU_BUTTON_CLICKED = '@@behaviour/MENU_BUTTON_CLICKED',
    SHOW_SETTING_GAME_RULES = '@@behaviour/SHOW_SETTING_GAME_RULES',
    SHOW_BET_HISTORY = '@@behaviour/SHOW_BET_HISTORY',
    SHOW_BET_HISTORY2 = '@@behaviour/SHOW_BET_HISTORY2',
    SHOW_GAME_SETTINGS = '@@behaviour/SHOW_GAME_SETTINGS',
    SET_COIN_QUEEN_WINS = '@@behaviour/SET_COIN_QUEEN_WINS',
    SPIN_STOPBUTTON_ACTIVE = '@@behaviour/SPIN_STOPBUTTON_ACTIVE',
    SPIN_STOPBUTTON_DEACTIVATE = '@@behaviour/SPIN_STOPBUTTON_DEACTIVATE',
    START_QUEEN_ANIMATION = '@@behaviour/START_QUEEN_ANIMATION',
    SET_QUEEN_ANIMATION_PROMISE = '@@behaviour/SET_QUEEN_ANIMATION_PROMISE',
    BUT_FEATURE_SCREEN_VISIBLE = '@@behaviour/BUT_FEATURE_SCREEN_VISIBLE'
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { maxWinOddsCount, showMobileMenuPanel, counterStartIncreasing, betBoxCount, transitionBalance, previousBalance, freeGameEnded, betList, storeAmountForAutoplay,
        winAmountEmpty, totalCreditWinAmount, totalWinAmount, scatterDataBeforeFG, resetManyWaysTextToInitial, scatterDataAnticipationAction,
        featureTriggered, storeCurrentTimeForRC, noInternetPopupVisible, storeWinningSymbolData, requestSent, text, closeButton, continueButton
        , storeTotalWinAmountForBaseGame, updateBalanceAfterSpin, resumeRealityCheck, inSpinMode, balanceLow, insufficientFunds,
        buyFeatureStakeExceeds, menuBtnClicked, showSettingGameRules, isMenuOpen, updateWin, spinStopButtonActive,
        checkGameTurboMode, showBetHistory, showBetHistory2, showGameSettings, totalWinAmountInFreeGame, coinQueenWins, deActivate, startQueenAnimation, resolve, buyFeatureVisible } = action;

    switch (action.type) {
        case actionTypes.SET_GAME_TURBO_MODE:
            return {
                ...state, checkGameTurboMode: checkGameTurboMode,
            };
        case actionTypes.SET_TRANSITION_BALANCE:
            return {
                ...state, transitionBalance: transitionBalance,
            };
        case actionTypes.SET_FEATURE_TRIGGERED:
            return {
                ...state, featureTriggered: featureTriggered,
            };
        case actionTypes.SET_BET_BOX_COUNT:
            return {
                ...state, betBoxCount: betBoxCount,
            };
        case actionTypes.STORE_AMOUNT_FOR_AUTOPLAY:
            return {
                ...state, storeAmountForAutoplay: storeAmountForAutoplay,
            };
        case actionTypes.SET_PREVIOUS_BALANCE:
            return {
                ...state, previousBalance: previousBalance,
            };
        case actionTypes.SET_FREE_GAME_ENDED:
            return {
                ...state, freeGameEnded: freeGameEnded,
            };
        case actionTypes.SET_BET_LIST:
            return {
                ...state, betList: betList,
            };
        case actionTypes.SET_WIN_AMOUNT_EMPTY:
            return {
                ...state, winAmountEmpty: winAmountEmpty,
            };
        case actionTypes.SET_TOTAL_CREDITED_WIN_AMOUNT:
            return {
                ...state, totalCreditWinAmount: totalCreditWinAmount,
            };
        case actionTypes.SET_TOTAL_CREDITED_WIN_AMOUNT_IN_FREE_GAME:
            return {
                ...state, totalWinAmountInFreeGame: totalWinAmountInFreeGame,
            };
        case actionTypes.SET_COIN_QUEEN_WINS:
            return {
                ...state, coinQueenWins: coinQueenWins,
            };
        case actionTypes.SET_TOTAL_WIN_AMOUNT:
            return {
                ...state, totalWinAmount: totalWinAmount,
            };
        case actionTypes.RESET_INITIAL_MANYWAYS_TEXT:
            return {
                ...state, resetManyWaysTextToInitial: resetManyWaysTextToInitial,
            };
        case actionTypes.SET_SCATTER_DATA_BEFORE_FG:
            return {
                ...state, scatterDataBeforeFG: scatterDataBeforeFG,
            };
        case actionTypes.SET_SCATTER_DATA_ANTICIPATION:
            return {
                ...state, scatterDataAnticipation: scatterDataAnticipationAction,
            };
        case actionTypes.SET_COUNTER_START_INCREASING:
            return {
                ...state, counterStartIncreasing: counterStartIncreasing,
            };
        case actionTypes.SET_MOBILE_MENU_PANEL_VISIBILITLY:
            return {
                ...state, showMobileMenuPanel: showMobileMenuPanel,
            };
        case actionTypes.SET_MAX_WIN_ODDS_COUNT:
            return {
                ...state, maxWinOddsCount: maxWinOddsCount,
            };

        case actionTypes.SET_CURRENT_TIME_FOR_REALITY_CHECK:
            return {
                ...state, storeCurrentTimeForRC: storeCurrentTimeForRC,
            };
        case actionTypes.SET_NO_INTERNET_POPUP_VISIBLE:
            return {
                ...state, noInternetPopupVisible: noInternetPopupVisible, text: text, closeButton: closeButton, continueButton: continueButton,
            };
        case actionTypes.STORE_WINNING_SYMBOL_DATA:
            return {
                ...state, storeWinningSymbolData: storeWinningSymbolData,
            };
        case actionTypes.SET_REQUEST_SENT:
            return {
                ...state, requestSent: requestSent,
            };
        case actionTypes.STORE_TOTAL_WIN_AMOUNT_FOR_BASEGAME:
            return {
                ...state, storeTotalWinAmountForBaseGame: storeTotalWinAmountForBaseGame,
            };
        case actionTypes.UPDATE_BALANCE_AFTER_SPIN:
            return {
                ...state, updateBalanceAfterSpin: updateBalanceAfterSpin,
            };

        case actionTypes.RESUME_REALITY_CHECK:
            return {
                ...state, resumeRealityCheck: resumeRealityCheck,
            };
        case actionTypes.IN_SPINNING_MODE:
            return {
                ...state, inSpinMode: inSpinMode,
            };
        case actionTypes.LOW_BALANCE_THEN_BET:
            return {
                ...state, balanceLow: balanceLow,
            };
        case actionTypes.SET_INSUFFICIENT_FUNDS:
            return {
                ...state, insufficientFunds: insufficientFunds,
            };
        case actionTypes.SET_BUY_FEATURE_STAKE_EXCEEDS:
            return {
                ...state, buyFeatureStakeExceeds: buyFeatureStakeExceeds,
            };
        case actionTypes.MENU_BUTTON_CLICKED:
            return {
                ...state, menuBtnClicked: menuBtnClicked, isMenuOpen: isMenuOpen,
            };

        case actionTypes.SHOW_SETTING_GAME_RULES:
            return {
                ...state, showSettingGameRules: showSettingGameRules,
            };
        case actionTypes.SHOW_BET_HISTORY:
            return {
                ...state, showBetHistory: showBetHistory,
            };
        case actionTypes.SHOW_BET_HISTORY2:
            return {
                ...state, showBetHistory2: showBetHistory2,
            };
        case actionTypes.SHOW_GAME_SETTINGS:
            return {
                ...state, showGameSettings: showGameSettings,
            };
        case actionTypes.UPDATE_WIN_AFTER_WINANIMATION:
            return {
                ...state, updateWin: updateWin,
            };
        case actionTypes.SPIN_STOPBUTTON_ACTIVE:
            return {
                ...state, spinStopButtonActive: spinStopButtonActive,
            };
        case actionTypes.SPIN_STOPBUTTON_DEACTIVATE:
            return {
                ...state, deActivate: deActivate,
            };
        case actionTypes.START_QUEEN_ANIMATION:
            return {
                ...state, startQueenAnimation: startQueenAnimation
            };
        case actionTypes.SET_QUEEN_ANIMATION_PROMISE:

            return {
                ...state, startQueenAnimation: state.coinQueenWins.length > 0 ? true : false, resolve: action
            };
        case actionTypes.BUT_FEATURE_SCREEN_VISIBLE:
            return {
                ...state, buyFeatureVisible: buyFeatureVisible,
            };
        default:
            return state;
    }
}

export const actions = {

    realityCheckResume: (resumeRealityCheck: boolean): any => ({
        type: actionTypes.RESUME_REALITY_CHECK,
        resumeRealityCheck
    }),
    balanceUpdateAfterSpin: (updateBalanceAfterSpin: boolean): any => ({
        type: actionTypes.UPDATE_BALANCE_AFTER_SPIN,
        updateBalanceAfterSpin
    }),
    totalWinAmountForBaseGame: (storeTotalWinAmountForBaseGame: number): any => ({
        type: actionTypes.STORE_TOTAL_WIN_AMOUNT_FOR_BASEGAME,
        storeTotalWinAmountForBaseGame
    }),
    currentTimeForRC: (storeCurrentTimeForRC: number): any => ({
        type: actionTypes.SET_CURRENT_TIME_FOR_REALITY_CHECK,
        storeCurrentTimeForRC
    }),
    visibleNoInternetPopUp: (noInternetPopupVisible: boolean, text: string, closeButton: boolean, continueButton: boolean): any => ({
        type: actionTypes.SET_NO_INTERNET_POPUP_VISIBLE,
        noInternetPopupVisible, text, closeButton, continueButton
    }),
    setMaxWinOddsCount: (maxWinOddsCount: number): any => ({
        type: actionTypes.SET_MAX_WIN_ODDS_COUNT,
        maxWinOddsCount
    }),
    setTransitionBalance: (transitionBalance: number): any => ({
        type: actionTypes.SET_TRANSITION_BALANCE,
        transitionBalance
    }),
    setAmountForAutoplay: (storeAmountForAutoplay: number): any => ({
        type: actionTypes.STORE_AMOUNT_FOR_AUTOPLAY,
        storeAmountForAutoplay
    }),
    setPreviousBalance: (previousBalance: number): any => ({ type: actionTypes.SET_PREVIOUS_BALANCE, previousBalance }),
    setFreeGameEnded: (freeGameEnded: any): any => ({ type: actionTypes.SET_FREE_GAME_ENDED, freeGameEnded }),
    setBetList: (betList: any): any => ({ type: actionTypes.SET_BET_LIST, betList }),
    setWinAmount: (winAmountEmpty: boolean): any => ({ type: actionTypes.SET_WIN_AMOUNT_EMPTY, winAmountEmpty }),
    setTotalCreditWinAmount: (totalCreditWinAmount: number): any => ({
        type: actionTypes.SET_TOTAL_CREDITED_WIN_AMOUNT,
        totalCreditWinAmount
    }),
    setTotalCreditWinAmountInFreeGame: (totalWinAmountInFreeGame: number): any => ({
        type: actionTypes.SET_TOTAL_CREDITED_WIN_AMOUNT_IN_FREE_GAME,
        totalWinAmountInFreeGame
    }),
    setCoinQueenSymbolWins: (coinQueenWins: Array<any>): any => ({
        type: actionTypes.SET_COIN_QUEEN_WINS,
        coinQueenWins
    }),
    setTotalWinAmount: (totalWinAmount: number): any => ({ type: actionTypes.SET_TOTAL_WIN_AMOUNT, totalWinAmount }),
    setScatterDataBeforeFG: (scatterDataBeforeFG: any): any => ({ type: actionTypes.SET_SCATTER_DATA_BEFORE_FG, scatterDataBeforeFG }),
    setScatterDataAnticipation: (scatterDataAnticipationAction: any): any => ({ type: actionTypes.SET_SCATTER_DATA_ANTICIPATION, scatterDataAnticipationAction }),
    resetManywaysValue: (resetManyWaysTextToInitial: boolean): any => ({ type: actionTypes.RESET_INITIAL_MANYWAYS_TEXT, resetManyWaysTextToInitial }),
    setBetBoxCount: (betBoxCount: number): any => ({ type: actionTypes.SET_BET_BOX_COUNT, betBoxCount }),
    FgFeaturetrigger: (featureTriggered: boolean): any => ({ type: actionTypes.SET_FEATURE_TRIGGERED, featureTriggered }),
    startIncreasingCounter: (counterStartIncreasing: boolean): any => ({ type: actionTypes.SET_COUNTER_START_INCREASING, counterStartIncreasing }),
    setMobMenuVisibility: (showMobileMenuPanel: boolean): any => ({
        type: actionTypes.SET_MOBILE_MENU_PANEL_VISIBILITLY,
        showMobileMenuPanel
    }),

    setUpdateWinAfterWinAnimation: (updateWin: boolean): any => ({
        type: actionTypes.UPDATE_WIN_AFTER_WINANIMATION,
        updateWin
    }),
    winningSymbolDataStored: (storeWinningSymbolData: any): any => ({
        type: actionTypes.STORE_WINNING_SYMBOL_DATA,
        storeWinningSymbolData
    }),
    setRequestSent: (requestSent: boolean): any => ({
        type: actionTypes.SET_REQUEST_SENT,
        requestSent
    }),
    spinMode: (inSpinMode: boolean): any => ({
        type: actionTypes.IN_SPINNING_MODE,
        inSpinMode
    }),
    balanceIsLow: (balanceLow: boolean): any => ({
        type: actionTypes.LOW_BALANCE_THEN_BET,
        balanceLow
    }),
    setAutoplayList: (autoplayList: any): any => ({ type: actionTypes.SET_AUTOPLAY_LIST, autoplayList }),
    setInsufficientFunds: (insufficientFunds: any): any => ({ type: actionTypes.SET_INSUFFICIENT_FUNDS, insufficientFunds }),
    setBuyFeatureStakeExceeds: (buyFeatureStakeExceeds: any): any => ({ type: actionTypes.SET_BUY_FEATURE_STAKE_EXCEEDS, buyFeatureStakeExceeds }),

    setMenuButtonClicked: (menuBtnClicked: any, isMenuOpen: boolean): any => ({ type: actionTypes.MENU_BUTTON_CLICKED, menuBtnClicked, isMenuOpen }),
    showSettingGameRules: (showSettingGameRules: any): any => ({ type: actionTypes.SHOW_SETTING_GAME_RULES, showSettingGameRules }),
    showBetHistory: (showBetHistory: any): any => ({ type: actionTypes.SHOW_BET_HISTORY, showBetHistory }),
    showBetHistory2: (showBetHistory2: any): any => ({ type: actionTypes.SHOW_BET_HISTORY2, showBetHistory2 }),
    setShowGameSettings: (showGameSettings: any): any => ({ type: actionTypes.SHOW_GAME_SETTINGS, showGameSettings }),
    setSpinStopButtonActive: (spinStopButtonActive: boolean): any => ({ type: actionTypes.SPIN_STOPBUTTON_ACTIVE, spinStopButtonActive }),
    setSpinStopButtonDeActivate: (deActivate: boolean): any => ({ type: actionTypes.SPIN_STOPBUTTON_DEACTIVATE, deActivate }),
    setQueenWinAnimationActivate: (startQueenAnimation: boolean): any => ({ type: actionTypes.START_QUEEN_ANIMATION, startQueenAnimation }),
    setQueenWinAnimation: (data: any): any => ({ type: actionTypes.SET_QUEEN_ANIMATION_PROMISE, data }),
    showBuyFeatureScreen: (buyFeatureVisible: boolean): any => ({
        type: actionTypes.BUT_FEATURE_SCREEN_VISIBLE,
        buyFeatureVisible
    }),
    setGameTurboMode: (checkGameTurboMode: boolean): any => ({ type: actionTypes.SET_GAME_TURBO_MODE, checkGameTurboMode }),
};
