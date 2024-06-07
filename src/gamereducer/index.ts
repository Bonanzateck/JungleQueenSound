import { combineReducers, Reducer } from 'redux';
import { IStore } from '../core/store/IStore';
import { reducer as asyncInitReducer } from '../core/reducers/asyncInitAction';
import { reducer as asyncServerReducer } from '../core/reducers/asyncServerResponseReducer';
import {
    symbolStateReducer, reelgridStateReducer, winPresentationReducer, autoplayReducer,introductionScreenReducer,desktopSettingPanelReducer,
    gridStateReducer, reelsStateReducer, flowManagerReducer, applicationReducer, basegameReducer, freegameReducer,keyboardListenerReducer,
    buttonPanelReducer,playerMessageReducer,soundreducer,landingSymbolReducer , overlayReducer,paytableReducer ,currencymanagerReducer,
    layoutsReducer
} from '@bonanzainteractive/slote_core';
import { reducer as menuReducer } from './../core/reducers/menuReducer';
import { reducer as ActionReducer } from "../gamereducer/actionReducer";
import { reducer as introductionpagereducer } from '../gamereducer/introductionPageReducer';
import { reducer as paytableBMreducer } from "../gamereducer/paytableBMReducer"
import { reducer as betpanelreducer } from "../core/reducers/betPanelReducer";
import { reducer as helpreducer } from "../core/reducers/helpreducer";
import { reducer as winCelebrationreducer } from "../gamereducer/winCelebrationReducer";
import { reducer as winShowerreducer } from "../gamereducer/winShowerReducer";
import { reducer as horizontalSymbolStateReducer } from "../gamereducer/horizontalSymbolStateReducer";
import { reducer as desktopSettingPanelGameLevelStateReducer } from "../gamereducer/desktopSettingPanelGameLevelReducer";
import { reducer as MultiplierReducer } from '../gamereducer/multiplierReducer';
import { reducer as horizontalSymbolReducer } from '../gamereducer/horizontalSymbolReducer';
import { reducer as behaviourReducer } from '../gamereducer/behaviourReducer';
import { reducer as asyncGameLevelSeverReducer } from '../gamereducer/asyncGameLevelServerResponseReducer';
import { reducer as autoplayKeyBoardListenerReducer } from '../gamereducer/autoplayKeyboardListenerReducer';
import { reducer as soundGameLevelReducer } from '../gamereducer/soundGameLevelReducer';
import { reducer as wrapperReducer } from "../gamereducer/wrapperReducer";
import { reducer as revealFeatureReducer } from './revealFeatureReducer';
import { reducer as buyFeatureReducer } from '../gamereducer/buyFeatureReducer';

const rootReducerData = {
    asyncInitAction: asyncInitReducer,
    asyncServerAction: asyncServerReducer,
    applicationState: applicationReducer,
    layoutsState: layoutsReducer,
    reelsState: reelsStateReducer,
    reelgridState: reelgridStateReducer,
    gridsState: gridStateReducer,
    basegameState: basegameReducer,
    autoplayState: autoplayReducer,
    buttonPanelState: buttonPanelReducer,
    freegameState: freegameReducer,
    menuState: menuReducer,
    symbolState: symbolStateReducer,
    winpresentationState: winPresentationReducer,
    paytableState: paytableReducer,
    soundState: soundreducer,
    gameactionstate: ActionReducer,
    introductionState: introductionpagereducer,
    paytableBMState: paytableBMreducer,
    desktopSettingPanelState: desktopSettingPanelReducer,
    currencyManagerState: currencymanagerReducer,
    playerMessageState: playerMessageReducer,
    betPanelState: betpanelreducer,
    helpState: helpreducer,
    winCelebrationState: winCelebrationreducer,
    winShowerState: winShowerreducer,
    horizontalSymbolState: horizontalSymbolStateReducer,
    keyboardListenerState: keyboardListenerReducer,
    MultiplierState: MultiplierReducer,
    horizontalGridState: horizontalSymbolReducer,
    desktopSettingPanelGameLevel: desktopSettingPanelGameLevelStateReducer,
    behaviourState: behaviourReducer,
    asyncGameLevelSeverState: asyncGameLevelSeverReducer,
    flowManagerState: flowManagerReducer,
    autoplayKeyBoardListenerState: autoplayKeyBoardListenerReducer,
    landingState: landingSymbolReducer,
    soundGameLevelState: soundGameLevelReducer,
    wrapperState: wrapperReducer,
    overlaySymbolState: overlayReducer,
    introductionScreenState: introductionScreenReducer,
    revealFeatureState: revealFeatureReducer,
    buyFeatureState: buyFeatureReducer
}

const combineReducerData = { ...rootReducerData }
const gamerootReducer: Reducer<IStore> = combineReducers<IStore>(combineReducerData);
export default gamerootReducer;
