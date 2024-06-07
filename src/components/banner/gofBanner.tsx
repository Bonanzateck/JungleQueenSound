import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { UIManager, GSAPTimer, CURRENCY, ItweenProps, GSAPTween } from "@bonanzainteractive/core";
import { actions as soundGameLevelAction } from "../../gamereducer/soundGameLevelReducer";
import PIXI, { Texture } from "pixi.js";
import { isMobile } from "react-device-detect";
import { configGame, constant } from "../../slot/data/config";
import { actions as multiplierActions } from "../../gamereducer/multiplierReducer";
import { actions as asyncServerAction } from "../../core/reducers/asyncServerResponseReducer";
import {
    winpresentationAction, soundActions, buttonActions, withBannerConfiguration, baseGameAction, freegameActions,
    layoutssActions, flowManagerAction, reelsGridActions, reelsActions, gridActions
} from "@bonanzainteractive/slote_core";
import { actions as behaviourAction } from '../../gamereducer/behaviourReducer';
import { playSoundLoop, stopSoundLoop } from "../../core/sounds/SoundControler";

interface IProps {
    [x: string]: any;
}
interface IStore {
    [x: string]: any;
}

interface IStateToProps {
    layoutMode: string;
    freegameSpinCountWin: number;
    storeMultiplierCurrentValue: number;
    callFlowManager: boolean;
    languageCode: string;
    totalWinAmount: number,
    showOutroBanner: boolean,
    featureJustTriggered: boolean,
    soundIsPlaying: boolean,
    allSoundSFXStop: any,
    allSoundBGMStop: boolean;

}
interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class GofBanner extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected gofBannerContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: Object[] = [];
    protected objName: string;
    private UIManagerRef: any;
    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            uiElements: [],
            lang: "en"
        }
        this.gofBannerContainer = {}
        if (isMobile) {
            this.ui_mode = "mobile";
            this.objName = "_mobile";
        } else {
            this.ui_mode = "desktop";
            this.objName = "_desktop";
        }
        this.UIManagerRef = UIManager.getRef;
        this.displayUI = this.props.child.filter(this.checkUiMode.bind(this));
    }

    setTotalWinAmount() {
        this.checkOutroBannerOverBalance(this.props.totalWinAmount);
    }

    betterLuckNextTimeTextVisibility() {
        if (!isMobile) {
            this.UIManagerRef("betterlucknext_desktop").visible = true;
            this.UIManagerRef("betterlucknext_mobile").visible = false;
        } else {
            this.UIManagerRef("betterlucknext_desktop").visible = false;
            this.UIManagerRef("betterlucknext_mobile").visible = true;
        }
    }
    private checkOutroBannerOverBalance(winAmount: number): void {
        if (this.UIManagerRef("gofBannerContainerOutro")) {
            let win = CURRENCY.CurrencyManager.formatCurrencyString(winAmount, true, true, true, true);
            this.UIManagerRef("gofBannerContainerOutro").visible = true
            this.UIManagerRef("Wintext_Outro_" + this.ui_mode).visible = true;
            this.UIManagerRef("Wintext_Outro_" + this.ui_mode) && (UIManager.setText("Wintext_Outro_" + this.ui_mode, win));
            if (winAmount === 0) {
                this.betterLuckNextTimeTextVisibility();
                this.UIManagerRef("outroText1_" + this.ui_mode).visible = false;
                this.UIManagerRef("outroText2_" + this.ui_mode).visible = false;
                this.UIManagerRef("betterlucknext").visible = true;

            } else {
                this.UIManagerRef("outroText1_" + this.ui_mode).visible = true;
                this.UIManagerRef("outroText2_" + this.ui_mode).visible = true;
                this.UIManagerRef("betterlucknext").visible = false;
            }

        }
    }


    //while first rendering, this method will check the mode first
    checkUiMode(uimodeobj: any) {
        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both";
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    //this method will call when layout changes
    layoutChange(currentLayout: string) {
        this.displayUI.forEach((data: any) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        }
        )
        this.orientationChange();
    }

    orientationChange() { }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.showOutroBanner && nextProps.showOutroBanner !== this.props.showOutroBanner) {
            this.setTotalWinAmount();
        }
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
        return nextProps.featureJustTriggered || nextProps.showOutroBanner ? true : false;

    }
    continueButtonSound() {
        GSAPTimer.getInstance().addTimer(0.00001, () => {
            // this.props.playSound([{ name: "jq_sx_continue_button", vol: 1, loop: false }]);
            if (!this.props.allSoundSFXStop) {
                playSoundLoop("jq_sx_continue_button", "jq_sx_continue_button", false);
            }
        });
    }

    //this method will be called when a button will clicked
    onClick(evt: any) {
        this.continueButtonSound();
        if (evt.target.name === "btn_introBanner" + this.objName) {
            if (!this.props.allSoundBGMStop) {
                stopSoundLoop("baseGameLoop");
                playSoundLoop("freeGameLoop", "jq_mx_freegame_music_loop", true, 0.6);
            }
            this.props.buttonClickedIntro(true);
            this.props.stopSound([{ name: "jq_mx_freegame_intro" }]);
            this.UIManagerRef("btn_introBanner" + this.objName) && (this.UIManagerRef("btn_introBanner" + this.objName).interactive = false);
            this.UIManagerRef("btn_introBanner" + this.objName) && (this.UIManagerRef("btn_introBanner" + this.objName).buttonMode = false);
            this.UIManagerRef("introGraphic").visible = false;
            this.props.flowManagerCalled(false);
            this.props.setIntroDone();
            this.props.setMultiplierValue(this.props.storeMultiplierCurrentValue);
            this.props.startFreegame();

            GSAPTimer.getInstance().addTimer(0.17, () => {
                this.startVeryfisrtFreeSpin();
            });
        }
        if (evt.target.name === "ContinueButton" + this.objName) {
            if (!this.props.allSoundBGMStop) {
                stopSoundLoop("freeGameLoop");
                playSoundLoop("baseGameLoop", "jq_mx_basegame", true, 0.6);
            }
            constant.configGame.BUY_FEATURE_ACTIVE = false;
            this.props.stopSound([{ name: "jq_mx_freegame_outro" }]);
            this.props.setShowOutrobanner(false)
            this.props.buttonClickedIntro(false);
            this.props.setApplicationToBaseGameState(true);
            this.UIManagerRef("gofBannerContainer").visible = false;
            this.props.flowManagerCalled(false);
            if (this.UIManagerRef("bannerContainer")) {
                this.UIManagerRef("bannerContainer").visible = false;
            }
            this.props.setAllButtonEnable();
            this.changeBasegameState(this.props);

            if (this.props.soundIsPlaying) {
                this.UIManagerRef("btn_soundOff") && (this.UIManagerRef("btn_soundOff").visible = false); 
            }
        }

    }

    private changeBasegameState(nextProps: any): void {
        this.onfinshed(nextProps)
        this.props.setUpdateWinAfterWinAnimation(true);
    }

    private onfinshed(nextProps: any): void {
        this.props.spinMode(false);
        this.props.stopFreegame();
        nextProps.setAllButtonEnable();
        nextProps.nextAutoplay();
        nextProps.nextFreegame();
    }

    private startVeryfisrtFreeSpin(): void {
        this.props.setApplicationToBaseGameState(false);
        this.props.getApplicationFreeSpinResponse();
        this.props.stopWinPresentation();
        this.props.resetReelState();
        this.props.setCspStart(true);
    }


    addFadeInTween() {
        const displayObj = this.UIManagerRef("gofBannerContainer")
        displayObj.visible = true;
        displayObj.alpha = 0;
        const tweenProps: ItweenProps = {
            alpha: 1,
            duration: 1.5,
            onComplete: () => {
                this.UIManagerRef(displayObj) && (displayObj.visible = true);
                GSAPTween.getInstance().killTween(displayObj);
            }
        }
        GSAPTween.getInstance().gsapTween(displayObj, tweenProps);

    }

    componentDidMount() {
        this.setLayout();
        this.addFadeInTween();


        if (this.props.showOutroBanner) {
            // this.props.playSound([{ name: "jq_mx_freegame_outro", loop: false, vol: 1 },/*  { name: "jq_mx_freegame_music_loop", loop: true,  vol: 0.1 } */]);
            GSAPTimer.getInstance().addTimer(0.1, async () => {
                this.setTotalWinAmount();
            });
        }
    }

    setLayout() {
        this.layoutChange(this.props.layoutMode);
        this.UIManagerRef("text_IntroScreenFG_" + this.ui_mode) && (this.UIManagerRef("text_IntroScreenFG_" + this.ui_mode).text = this.props.freegameSpinCountWin);
        if (isMobile && this.UIManagerRef("introGraphic") !== undefined) {
            if (window.innerWidth < window.innerHeight) {
                if (this.UIManagerRef("introGraphic").visible === true) {
                    this.UIManagerRef("introGraphic").width = configGame.CANVAS_HEIGHT;
                    this.UIManagerRef("introGraphic").height = configGame.CANVAS_WIDTH;
                }
            }
        }
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        this.setLayout();
        this.orientationChange();
    }

    render() {

        return (
            <UIManager id={"gofBannerContainer"} name={"gofBannerContainer"} type={"Container"}
                app={this.app} configGame={configGame}
                ref={i => this.gofBannerContainer = i}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} ClickHandler={this.onClick.bind(this)}
                            scope={this}
                            langObj={this.props.langObj} type={i.type} group={this.props.group} app={this.app}
                            configGame={configGame}
                            id={i.id} {...i} />)
                }
            </UIManager>)

    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'soundState' | 'freegameState' | 'basegameState' | 'applicationState' | 'MultiplierState' | 'behaviourState' | 'flowManagerState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        freegameSpinCountWin: state.freegameState.freegameSpinCountWin,
        storeMultiplierCurrentValue: state.MultiplierState.storeMultiplierCurrentValue,
        callFlowManager: state.flowManagerState.callFlowManager,
        languageCode: state.applicationState.languageCode,
        totalWinAmount: state.behaviourState.totalWinAmount,
        showOutroBanner: state.freegameState.showOutroBanner,
        featureJustTriggered: state.basegameState.featureJustTriggered,
        soundIsPlaying: state.soundState.soundIsPlaying,
        allSoundSFXStop: state.soundState.allSoundSFXStop,
        allSoundBGMStop: state.soundState.allSoundBGMStop,


    }),
    (dispatch: Dispatch, ownProps): IDispatchToProps => ({
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        stopSound: (soundName: any): any => dispatch(soundActions.stopSound(soundName)),
        setApplicationToBaseGameState: (basegamestate: boolean): any => dispatch(baseGameAction.setApplicationToBaseGameState(basegamestate)),
        setApplicationLayoutObject: (layoutobjectlist: string): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        setIntroDone: (): any => dispatch(baseGameAction.setIntroDone()),
        startFreegame: (): any => dispatch(freegameActions.startFreegame()),
        stopFreegame: (): any => dispatch(freegameActions.stopFreegame()),
        nextFreegame: (): any => dispatch(freegameActions.nextFreegame()),
        flowManagerCalled: (callFlowManager: boolean): any => dispatch(flowManagerAction.flowManagerCalled(callFlowManager)),
        setMultiplierValue: (multiplierCurrentValue: any): any => dispatch(multiplierActions.setMultiplierValue(multiplierCurrentValue)),
        buttonClickedIntro: (introContinueButtonClick: any): any => dispatch(soundGameLevelAction.buttonClickedIntro(introContinueButtonClick)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        nextAutoplay: (): any => dispatch(baseGameAction.nextAutoplay()),
        getApplicationFreeSpinResponse: (): any => dispatch(asyncServerAction.getApplicationFreeSpinResponse()),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        resetReelState: (): any => dispatch(Number(configGame["SPIN_TYPE"]) === 0 && reelsActions.resetReelState() || Number(configGame["SPIN_TYPE"]) === 1 && gridActions.resetReelState() || Number(configGame["SPIN_TYPE"]) === 2 && reelsGridActions.resetReelState()),
        setCspStart: (cspStart: boolean): any => dispatch(Number(configGame["SPIN_TYPE"]) === 0 && reelsActions.setCspStart(cspStart) || Number(configGame["SPIN_TYPE"]) === 2 && reelsGridActions.setCspStart(cspStart)),
        setFreeGameEnded: (freeGameEnded: any): any => dispatch(behaviourAction.setFreeGameEnded(freeGameEnded)),
        setTotalWinAmount: (totalWinAmount: number): any => dispatch(behaviourAction.setTotalWinAmount(totalWinAmount)),
        spinMode: (inSpinMode: boolean): any => dispatch(behaviourAction.spinMode(inSpinMode)),
        setShowOutrobanner: (showOutroBanner: boolean): any => dispatch(freegameActions.setShowOutrobanner(showOutroBanner)),
        setUpdateWinAfterWinAnimation: (updateWin: boolean): any => dispatch(behaviourAction.setUpdateWinAfterWinAnimation(updateWin)),
    }))(withBannerConfiguration(GofBanner)));
