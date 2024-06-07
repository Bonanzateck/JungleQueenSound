import { combineReducers, Reducer } from 'redux';
import { IStore } from '../store/IStore';
import { reducer as asyncInitReducer } from './asyncInitAction';
import { reducer as asyncServerReducer } from './asyncServerResponseReducer';
import {
    reelsStateReducer, freegameReducer, applicationReducer, basegameReducer,
    reelgridStateReducer, gridStateReducer, winPresentationReducer, autoplayReducer,
    flowManagerReducer, symbolStateReducer, introductionScreenReducer, desktopSettingPanelReducer,
    paytableReducer, currencymanagerReducer, layoutsReducer,
    soundreducer, playerMessageReducer, keyboardListenerReducer,
    landingSymbolReducer, buttonPanelReducer, overlayReducer

} from '@bonanzainteractive/slote_core';
import { reducer as helpreducer } from './helpreducer';
import { reducer as betpanelreducer } from './betPanelReducer';
import { reducer as menuReducer } from './menuReducer';

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
    betPanelState: betpanelreducer,
    helpState: helpreducer,
    soundState: soundreducer,
    desktopSettingPanelState: desktopSettingPanelReducer,
    currencyManagerState: currencymanagerReducer,
    playerMessageState: playerMessageReducer,
    keyboardListenerState: keyboardListenerReducer,
    flowManagerState: flowManagerReducer,
    landingState: landingSymbolReducer,
    overlaySymbolState: overlayReducer,
    introductionScreenState: introductionScreenReducer,
}

const combineReducerData = { ...rootReducerData }
const rootReducer: Reducer<IStore> = combineReducers<IStore>(combineReducerData);

export default rootReducer;
