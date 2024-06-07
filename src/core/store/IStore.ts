
import { IApplicationAsynchInitState as IAsyncInitAction } from '../reducers/asyncInitAction';
import { IApplicationState as IAsyncServerAction } from '../reducers/asyncServerResponseReducer';
import {
    IApplicationWinpresenationState as winPresentationReducer, IApplicationBasegameState as basegamereducer, IApplicationFreegameState as freegamereducer,
    IAutoplayState as autoplayReducer, IApplicationState, IApplicationReelsState as reelsStateReducer, IApplicationReelgridState as reelgridStateReducer,
    IApplicationGridState as gridStateReducer, IApplicationSymbolState as ISymbolReducer, IApplicationflowManagerState as flowManagerReducer,
    IApplicationDesktopSettingState as desktopSettingPanelReducer, IApplicationIntroductionState as introductionScreenReducer,
    IApplicationKeyBoardListnerState as keyboardListenerReducer, IApplicationButtonPanelState as buttonPanelReducer,
    IApplicationPaytableState as paytableReducer,IApplicationSoundState as soundReducer, IApplicationCurrencyState as currencymanagerReducer,
    IApplicationPlayerMassageState as playerMessageReducer,
    IApplicationLayoutsState,IApplicationLandingSymbolsState as landingsymbolreducer, 
} from '@bonanzainteractive/slote_core';

import { IApplicationState as IhelpReducer } from '../reducers/helpreducer'
import { IApplicationState as IbetpanelReducer } from '../reducers/betPanelReducer'


import { IApplicationState as IMenuReducer } from '../reducers/menuReducer'

export interface IStore {
    applicationState: IApplicationState,
    layoutsState: IApplicationLayoutsState,
    menuState: IMenuReducer,
    basegameState: basegamereducer,
    freegameState: freegamereducer,
    autoplayState: autoplayReducer,
    asyncInitAction: IAsyncInitAction,
    asyncServerAction: IAsyncServerAction,
    buttonPanelState: buttonPanelReducer,
    reelsState: reelsStateReducer,
    reelgridState: reelgridStateReducer,
    gridsState: gridStateReducer,
    symbolState: ISymbolReducer,
    winpresentationState: winPresentationReducer,
    paytableState: paytableReducer,
    helpState: IhelpReducer,
    betPanelState: IbetpanelReducer,
    soundState: soundReducer,
    desktopSettingPanelState: desktopSettingPanelReducer,
    currencyManagerState: currencymanagerReducer,
    playerMessageState: playerMessageReducer,
    keyboardListenerState: keyboardListenerReducer,
    flowManagerState: flowManagerReducer,
    landingState: landingsymbolreducer,
    introductionScreenState: introductionScreenReducer,

}
