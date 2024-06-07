import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { actions as soundGameLevelAction } from "../../gamereducer/soundGameLevelReducer";
import PIXI from "pixi.js";
import { actions as multiplierActions } from "../../gamereducer/multiplierReducer";
import { actions as asyncServerAction } from "../../core/reducers/asyncServerResponseReducer";
import {
    reelsGridActions, winpresentationAction,layoutssActions,baseGameAction, freegameActions,
    flowManagerAction, soundActions,buttonActions
} from "@bonanzainteractive/slote_core";;
import { actions as winShowerActions } from "../../gamereducer/winShowerReducer";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";

interface IStore {
    [x: string]: any;
}
interface IProps {
    [x: string]: any;
}

interface IStateToProps {
    layoutMode: string;
    freegameSpinCountWin: number;
    storeMultiplierCurrentValue: number;
    callFlowManager: boolean;
    languageCode: string;
    autoPlayAbortOnFreeGameWinEnabled: any,
    showWinShower: boolean;
}

interface IDispatchToProps {
}

interface IState {

}

class EndBannerFun extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected playingSound: any = [];
    protected spinSound: any = '';
    protected playScatterLandingCount: number;
    protected valueToBeUpdatedBy: number = 0.05;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.playScatterLandingCount = 0;
        this.freegameOutroBannerClicked();

    }

    freegameOutroBannerClicked() {
        this.props.setActiveall(true);
        this.props.winShowerStart(false);
        this.props.startIncreasingCounter(true);
        this.props.winShowerShow(false);
        this.props.setActiveall(true);
        this.props.removeKeyBoardEvent(false);
        this.props.winShowerSoundStop(false);
        this.props.balanceUpdateAfterSpin(true);
        this.props.nextAutoplay();
        this.props.nextFreegame();
        this.props.setAllButtonEnable();
    }

    componentDidMount() {

    }

    onButtonClickSound() {

    }

    backgroundSound() {

    }
    layoutChange(currentLayout: string) {
        this.props.data.COMPONENTS.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name)
            }
        }
        )
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {

        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode);
            return false;
        }
        return true;
    }

    //logic to decreace sound vol
    changeBgVolume(name: string, currentVol: number, nextVol: number) {

    }
    muteBackgroundLoopSound(nextProps: any) {
        if (nextProps.basegamestate) {
            this.props.playSound([{ name: "bgloop", loop: true, vol: 0.01 }]);
        } else {
            this.props.playSound([{ name: "fgloop", loop: true, vol: 0.01 }]);
        }
    }
    playBackgroundLoop(nextProps: any) {
        if (nextProps.basegamestate) {
            this.props.playSound([{ name: "bgloop", loop: true, vol: 0.2 }]);
        } else {
            this.props.playSound([{ name: "fgloop", loop: true, vol: 0.3 }]);
        }
    }
    render() {
        return null
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'freegameState' | 'applicationState' | 'MultiplierState' | 'behaviourState' | 'flowManagerState' | 'winShowerState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        freegameSpinCountWin: state.freegameState.freegameSpinCountWin,
        storeMultiplierCurrentValue: state.MultiplierState.storeMultiplierCurrentValue,
        callFlowManager: state.flowManagerState.callFlowManager,
        languageCode: state.applicationState.languageCode,
        autoPlayAbortOnFreeGameWinEnabled: state.applicationState.autoPlayAbortOnFreeGameWinEnabled,
        showWinShower: state.winShowerState.showWinShower,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        setApplicationToBaseGameState: (basegamestate: boolean): any => dispatch(baseGameAction.setApplicationToBaseGameState(basegamestate)),
        setApplicationLayoutObject: (layoutobjectlist: string): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        stopSound: (soundName: any): any => dispatch(soundActions.stopSound(soundName)),
        setIntroDone: (): any => dispatch(baseGameAction.setIntroDone()),
        isIntrobannerComplete: (onIntroBannerComplete: boolean): any => dispatch(baseGameAction.isIntrobannerComplete(onIntroBannerComplete)),
        startFreegame: (): any => dispatch(freegameActions.startFreegame()),
        nextFreegame: (): any => dispatch(freegameActions.nextFreegame()),
        flowManagerCalled: (callFlowManager: boolean): any => dispatch(flowManagerAction.flowManagerCalled(callFlowManager)),
        updateReelData: (result_reel: any): any => dispatch(reelsGridActions.updateReelData(result_reel)),
        setMultiplierValue: (multiplierCurrentValue: any): any => dispatch(multiplierActions.setMultiplierValue(multiplierCurrentValue)),
        buttonClickedIntro: (introContinueButtonClick: any): any => dispatch(soundGameLevelAction.buttonClickedIntro(introContinueButtonClick)),
        getApplicationFreeSpinResponse: (): any => dispatch(asyncServerAction.getApplicationFreeSpinResponse()),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        setCspStart: (cspStart: boolean): any => dispatch(reelsGridActions.setCspStart(cspStart)),
        stopAutoplay: (): any => dispatch(baseGameAction.stopAutoplay()),
        nextAutoplay: (): any => dispatch(baseGameAction.nextAutoplay()),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        setActiveall: (isActiveAll: boolean): any => dispatch(baseGameAction.setActiveall(isActiveAll)),
        winShowerStart: (startWinShower: boolean, winShowerAmount: number): any => dispatch(winShowerActions.winShowerStart(startWinShower, winShowerAmount)),
        winShowerShow: (showWinShower: boolean): any => dispatch(winShowerActions.winShowerShow(showWinShower)),
        winShowerSoundStop: (stopWinShowerSound: boolean): any => dispatch(winShowerActions.winShowerSoundStop(stopWinShowerSound)),
        startIncreasingCounter: (counterStartIncreasing: boolean): any => dispatch(behaviourAction.startIncreasingCounter(counterStartIncreasing)),
        removeKeyBoardEvent: (isRemoveKeyBoardEvent: boolean): any => dispatch(baseGameAction.removeKeyBoardEvent(isRemoveKeyBoardEvent)),
        particularButtonEnable: (enableParticularButton: boolean): any => dispatch(buttonActions.particularButtonEnable(enableParticularButton)),
        balanceUpdateAfterSpin: (updateBalanceAfterSpin: boolean): any => dispatch(behaviourAction.balanceUpdateAfterSpin(updateBalanceAfterSpin)),
        spinMode: (inSpinMode: boolean): any => dispatch(behaviourAction.spinMode(inSpinMode)),
        winShowerComplete: (completeWinShower: boolean): any => dispatch(winShowerActions.winShowerComplete(completeWinShower)),

    }))(EndBannerFun));