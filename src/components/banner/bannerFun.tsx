import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { UIManager, GSAPTimer } from "@bonanzainteractive/core";
import { actions as soundGameLevelAction } from "../../gamereducer/soundGameLevelReducer";
import PIXI from "pixi.js";
import { configGame } from "../../slot/data/config";
import { actions as multiplierActions } from "../../gamereducer/multiplierReducer";
import {actions as  asyncServerAction} from "../../core/reducers/asyncServerResponseReducer";
import {
    reelsGridActions, winpresentationAction, soundActions,
    flowManagerAction,layoutssActions,baseGameAction,freegameActions, reelsActions
} from "@bonanzainteractive/slote_core";;


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
}

interface IDispatchToProps {
}

interface IState {

}

class BannerFun extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected playingSound: any = [];
    protected spinSound: any = '';
    protected playScatterLandingCount: number;
    protected valueToBeUpdatedBy: number = 0.05;
    protected timer: number = 50;   
    private UIManagerRef: any;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.playScatterLandingCount = 0;
        this.UIManagerRef = UIManager.getRef;
        this.freegameBannerClicked();

    }

    freegameBannerClicked() {
        this.props.isIntrobannerComplete(false);
        this.props.setApplicationToBaseGameState(false);
        this.props.buttonClickedIntro(true);   
         this.UIManagerRef("introGraphic").visible = false;
        this.props.flowManagerCalled(false);
        this.props.setIntroDone();
        this.props.setMultiplierValue(this.props.storeMultiplierCurrentValue);
        this.props.startFreegame();
        GSAPTimer.getInstance().addTimer(.5, () => {
            this.startVeryfisrtFreeSpin();

        });

    }
    private startVeryfisrtFreeSpin(): void {
        this.props.getApplicationFreeSpinResponse();
        this.props.stopWinPresentation();
        this.props.resetReelState();
        this.props.setCspStart(true);
    }
      

    backgroundSound() {
        if (this.props.basegamestate) {
            this.muteBackgroundLoopSound(this.props);
        }
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
            if (window.innerWidth < window.innerHeight) {
                this.UIManagerRef("introGraphic").width = configGame.CANVAS_HEIGHT;
                this.UIManagerRef("introGraphic").height = configGame.CANVAS_WIDTH;
                if (this.UIManagerRef("introGraphic").visible === true) {
                    this.UIManagerRef("introGraphic").width = configGame.CANVAS_HEIGHT;
                    this.UIManagerRef("introGraphic").height = configGame.CANVAS_WIDTH;
                }
            } else {
                if (this.UIManagerRef("introGraphic")) {
                    this.UIManagerRef("introGraphic").width = configGame.CANVAS_WIDTH;
                    this.UIManagerRef("introGraphic").height = configGame.CANVAS_HEIGHT;
                }
            }
            return false;
        }
        return true;
    }

    //logic to decreace sound vol
    changeBgVolume(name: string, currentVol: number, nextVol: number) {

    }
    muteBackgroundLoopSound(nextProps: any) {
        if (nextProps.basegamestate) {
            // this.props.playSound([{ name: "bgloop", loop: true, vol: 0.01 }]);
        } else {
            // this.props.playSound([{ name: "fgloop", loop: true, vol: 0.01 }]);
        }
    }
    playBackgroundLoop(nextProps: any) {
        if (nextProps.basegamestate) {
            // this.props.playSound([{ name: "bgloop", loop: true, vol: 0.2 }]);
        } else {
            // this.props.playSound([{ name: "fgloop", loop: true, vol: 0.3 }]);
        }
    }
    render() {
        return null
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'freegameState' | 'applicationState' | 'MultiplierState' | 'behaviourState' | 'flowManagerState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        freegameSpinCountWin: state.freegameState.freegameSpinCountWin,
        storeMultiplierCurrentValue: state.MultiplierState.storeMultiplierCurrentValue,
        callFlowManager: state.flowManagerState.callFlowManager,
        languageCode: state.applicationState.languageCode,
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
        resetReelState: (): any => dispatch(reelsActions.resetReelState()),
        setCspStart: (cspStart: boolean): any => dispatch(reelsActions.setCspStart(cspStart)),
    }))(BannerFun));
