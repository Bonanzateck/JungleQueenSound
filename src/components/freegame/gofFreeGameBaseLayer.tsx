import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { flowManagerAction, layoutssActions, soundActions, reelsActions, withFreeGameConfiguration } from "@bonanzainteractive/slote_core";
import { GSAPTween, ItweenProps, GSAPTimer, UIManager } from "@bonanzainteractive/core";
import { isMobile } from "react-device-detect";
import { configGame, constant } from "../../slot/data/config";
import { actions as asyncServerAction } from "../../core/reducers/asyncServerResponseReducer";
import { winpresentationAction } from "@bonanzainteractive/slote_core";
import { applicationActions } from "@bonanzainteractive/slote_core";
import { actions as multiplierActions } from "../../gamereducer/multiplierReducer";
import { playSoundLoop } from "../../core/sounds/SoundControler";
interface IProps {
    [x: string]: any;
}

interface IStore {
    [x: string]: any;
}

interface IStateToProps {
    layoutMode: string,
    inFreeGame: boolean,
    freegameNextSpin: boolean,
    spinResponseReceived: boolean,
    freeSpinRewards: number,
    freegameSpinCountWin: number,
    level: number;
    freeSpinAdd: number;
    totalNumMysterySym: number;
    allSoundSFXStop: any;

}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class GofFreeGameBaseLayer extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected gofFreeGameBaseLayerContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: Object[] = [];
    protected logoAnimIntervalTime: number;
    protected freeGameFramesInsidePortionImage: any;
    protected freeGameLevelUpText: any;
    private UIManagerRef: any;
    private UIManagerSetText: any = UIManager.setText;
    protected originalScalingOfObject: number = 1;
    protected frameInsideScalingX: number = 0.83;
    protected frameInsideScalingY: number = 0.83;
    private minFullHDWidth: number = 1024;
    private HDReadyWidth: number = 1280;
    private fullHDWidth: number = 1920;
    private minFullHDPxRatio: number = 2;
    private canvasBgImagePage: string = "";
    private levelCollectedArr = [0, -10, -25, -45, -70, -100, -135, -175, -220, -270, -325];
    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            uiElements: [],
            lang: "en",
            isSpinning: false,
        }
        this.gofFreeGameBaseLayerContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }
        this.logoAnimIntervalTime = 11050;
        this.displayUI = this.props.child.filter(this.checkUiMode.bind(this));
        this.chooseAssets();
        this.UIManagerRef = UIManager.getRef
        this.props.setApplicationButtonpanelVisibility(false);
        // GSAPTimer.getInstance().addTimer(0.1, () => {
        //     this.setTurboSpinBtn();
        // })
    }

    /*
     here is turbo spin 
     if freegame trigger with turbo spin 
     then turbo spin will be same in thoughout freegame 
    */
    static getDerivedStateFromProps(newProp: IProps, newState: IState): IState {
        if (newProp.isSpinning) {
            return {
                ...newState,
                isSpinning: newProp.isSpinning
            }
        }
        return newState;
    }
    private freeSpinUpdate(): Promise<any> {
        // Free Game Entry with Feature Win        
        if (this.props.freeSpinRewards && this.props.inFreeGame && this.props.freeSpinAdd > 0) {
            UIManager.getRef("bgGraphic_for_FG").alpha = 0;
            UIManager.getRef("bgGraphic_for_FG").visible = true;
            const tweenP: ItweenProps = {
                alpha: 0.52,
                duration: 0.5,
                ease: "none"
            }
            GSAPTween.getInstance().gsapTween(UIManager.getRef("bgGraphic_for_FG"), tweenP);
            this.freeGameLevelUpText = this.UIManagerRef("text_FreeGame_levelUp");
            this.freeGameLevelUpText.scale.set(0, 0);
            this.freeGameLevelUpText.text = "Level Up";
            this.freeGameLevelUpText.visible = true;
            // this.props.playSound([{ name: "jq_sx_level_up_message", vol: 1, loop: false }]);
            if (!this.props.allSoundSFXStop) {
                playSoundLoop("jq_sx_level_up_message", "jq_sx_level_up_message", false);
            }
            this.freeGameLevelUpText.alpha = 1;
            !UIManager.getRef("collecter_bg_feature").visible && (UIManager.getRef("collecter_bg_feature").visible = true);
            UIManager.getRef("collecter_bg_feature").alpha <= 0 && (UIManager.getRef("collecter_bg_feature").alpha = 1);
            let scalingObject = { x: 0, y: 0 };
            return new Promise<any>(resolve => {
                const tweenProps: ItweenProps = {
                    duration: 0.5,
                    x: 1,
                    ease: "none",
                    value: this.freeGameLevelUpText.text,
                    onUpdate: (y: any) => {
                        this.freeGameLevelUpText.visible = true;
                        this.freeGameLevelUpText.scale.set(scalingObject.x, scalingObject.x);
                    },
                    onComplete: () => {
                        let scalingObject = { x: 1, y: 1 }
                        const tweenProps: ItweenProps = {
                            duration: 0.5,
                            ease: "none",
                            x: 0,
                            delay: 1,
                            value: this.freeGameLevelUpText.text,
                            onUpdate: (y: any) => {
                                this.freeGameLevelUpText.visible = true;
                                this.freeGameLevelUpText.scale.set(scalingObject.x, scalingObject.x);
                            },
                            onComplete: () => {
                                this.freeGameLevelUpText.scale.set(0);
                                this.freeGameLevelUpText.visible = true;
                                // add 3 spins message  sound
                                // this.props.playSound([{ name: "jq_sx_3_spins_message", vol: 1, loop: false }]);

                                if (!this.props.allSoundSFXStop) {
                                    playSoundLoop("jq_sx_3_spins_message", "jq_sx_3_spins_message", false);
                                }
                                this.freeGameLevelUpText.text = `+ ${this.props.freeSpinAdd} Spins`;

                                const tweenProps: ItweenProps = {
                                    duration: 0.5,
                                    ease: "none",
                                    x: 1,
                                    value: this.freeGameLevelUpText.text,
                                    onUpdate: (y: any) => {
                                        this.freeGameLevelUpText.visible = true;
                                        this.freeGameLevelUpText.scale.set(scalingObject.x, scalingObject.x);
                                    },
                                    onComplete: () => {
                                        let scalingObject = { alpha: 1 }
                                        const tweenProps: ItweenProps = {
                                            alpha: 0,
                                            duration: 0.8,
                                            delay: 0.5,
                                            ease: 'none',
                                            onUpdate: () => {
                                                this.freeGameLevelUpText.alpha = scalingObject.alpha;
                                                UIManager.getRef("collecter_bg_feature").alpha = scalingObject.alpha;
                                            },
                                            onComplete: () => {
                                                const tweenP: ItweenProps = {
                                                    alpha: 0,
                                                    duration: 0.6,
                                                    ease: "none"
                                                }
                                                GSAPTween.getInstance().gsapTween(UIManager.getRef("bgGraphic_for_FG"), tweenP);
                                                this.updateFreeGameTopCounterText(resolve);
                                            }
                                        }
                                        GSAPTween.getInstance().gsapTween(scalingObject, tweenProps);
                                    }
                                }
                                GSAPTween.getInstance().gsapTween(scalingObject, tweenProps);
                            }
                        }
                        GSAPTween.getInstance().gsapTween(scalingObject, tweenProps);
                    }
                }
                GSAPTween.getInstance().gsapTween(scalingObject, tweenProps);
            });
        }
        return new Promise<any>(resolve => {
            resolve('success');
        });
    }

    resetPosition() {
        this.freeGameLevelUpText.x = isMobile ? (window.innerHeight > window.innerWidth ? 540.5 : 949.9) : 950;
        this.freeGameLevelUpText.y = isMobile ? (window.innerHeight > window.innerWidth ? 1086 : 520.1) : 500;
        this.freeGameLevelUpText.visible = false;
        this.freeGameLevelUpText.scaleX = 1;
        this.freeGameLevelUpText.scaleX = 1;
    }
    private updateFreeGameTopCounterText(resolve: any) {
        // this.resetPosition();
        this.UIManagerRef("text_FreeGame_value2") && (this.UIManagerSetText("text_FreeGame_value2", this.props.freegameSpinCountWin));
        this.UIManagerSetText("totalCounter", Number(Number(this.props.level) * 5 + 10));
        this.UIManagerSetText("currentCounter", this.props.totalNumMysterySym + this.levelCollectedArr[this.props.level]);
        this.props.setFreeSpinRewards(false);
        this.props.setProsData({ freeSpinRewards: false, pr: resolve });

    }
    async onSpin() {
        await this.freeSpinUpdate().then((res) => {
            this.props.getApplicationFreeSpinResponse();
            this.props.stopWinPresentation();
            this.props.resetReelState();
            this.props.setCspStart(true);
        });

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

    //when layout changes, this method will be called
    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        }
        )
        // this.setLayout();
    }
    // setLayout(){
    //     if (isMobile) {
    //         if (window.innerWidth < window.innerHeight) {
    //             this.UIManagerRef("frame_FG_Image_Mob") && (this.UIManagerRef("frame_FG_Image_Mob").scale.set(1));
    //         } else {
    //             this.UIManagerRef("frame_FG_Image_Mob") && (this.UIManagerRef("frame_FG_Image_Mob").scale.set(1));
    //         }
    //     }
    // }


    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.layoutMode !== this.props.layoutMode || nextProps.inFreeGame !== this.props.inFreeGame
            || nextProps.freegameNextSpin !== this.props.freegameNextSpin
            || nextProps.spinResponseReceived !== this.props.spinResponseReceived
        ) {
            if (nextProps.layoutMode !== this.props.layoutMode) {
                this.layoutChange(nextProps.layoutMode);
            }
            if (nextProps.freegameNextSpin && nextProps.inFreeGame && nextProps.freegameNextSpin !== this.props.freegameNextSpin) {
                this.onSpin();
            }
            if (nextProps.spinResponseReceived && nextProps.spinResponseReceived !== this.props.spinResponseReceived) {
                this.props.flowManagerCalled(false);
                const {
                    startSpin
                } = nextProps;
                startSpin();
            }
            return false;
        }
        return true;
    }

    //this method will call after the first rendering for scaling and logo animation looping
    bindUI() {
        this.layoutChange(this.props.layoutMode);
        // this.setLayout();
    }

    handleEvent = (e: any) => {
    }

    componentDidUpdate() {
        this.layoutChange(this.props.layoutMode);
        if (isMobile) {
            this.freeGameFramesInsidePortionImage = UIManager.getRef("frameReel_FG_Image_Mob");
            if (window.innerWidth < window.innerHeight) {
                this.freeGameFramesInsidePortionImage && (this.freeGameFramesInsidePortionImage.scale.x = this.frameInsideScalingX);
                this.freeGameFramesInsidePortionImage && (this.freeGameFramesInsidePortionImage.scale.y = this.frameInsideScalingY);
            }
            else {
                this.freeGameFramesInsidePortionImage && (this.freeGameFramesInsidePortionImage.scale.x = this.originalScalingOfObject);
                this.freeGameFramesInsidePortionImage && (this.freeGameFramesInsidePortionImage.scale.y = this.originalScalingOfObject);
            }
        }

    }

    componentDidMount() {
        this.bindUI();
    }

    chooseAssets() {
        let screen = window.screen;
        let isFullHD = false;
        if (((screen.width >= this.minFullHDWidth || screen.height >= this.minFullHDWidth) && window.devicePixelRatio >= this.minFullHDPxRatio) ||
            (screen.width >= this.HDReadyWidth || screen.height >= this.HDReadyWidth)) {
            isFullHD = true;
        }
        if (isFullHD) {
            this.canvasBgImagePage = "HD/assets/commongame/freegame_2048.webp";
        } else {
            this.canvasBgImagePage = "LD/assets/commongame/freegame_2048.webp";
        }
    }

    render() {
        return (
            <UIManager id={"freeGameGenericUIContainer"} type={"Container"} name={"freeGameGenericUIContainer"} app={this.app}
                ref={i => this.gofFreeGameBaseLayerContainer = i}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            app={this.app} configGame={configGame}
                            id={i.id} {...i} ClickHandler={this.handleEvent} />)
                }
            </UIManager>)
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'freegameState' | 'applicationState' | 'soundState' | 'reelsState' | 'MultiplierState' | 'revealFeatureState' | 'basegameState'>): IStateToProps =>
    ({
        inFreeGame: state.freegameState.inFreeGame,
        layoutMode: state.applicationState.layoutMode,
        freegameNextSpin: state.freegameState.freegameNextSpin,
        spinResponseReceived: state.reelsState.spinResponseReceived,
        freeSpinRewards: state.MultiplierState.freeSpinRewards,
        freegameSpinCountWin: state.freegameState.freegameSpinCountWin,
        freeSpinAdd: state.revealFeatureState.freeSpinAdd,
        level: state.revealFeatureState.level,
        totalNumMysterySym: state.revealFeatureState.totalNumMysterySym,
        allSoundSFXStop: state.soundState.allSoundSFXStop,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        getApplicationFreeSpinResponse: (): any => dispatch(asyncServerAction.getApplicationFreeSpinResponse()),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        startSpin: (): any => dispatch(reelsActions.startSpin()),
        flowManagerCalled: (callFlowManager: boolean): any => dispatch(flowManagerAction.flowManagerCalled(callFlowManager)),
        resetReelState: (): any => dispatch(reelsActions.resetReelState()),
        setApplicationButtonpanelVisibility: (visible: boolean): any => dispatch(applicationActions.setApplicationButtonpanelVisibility(visible)),
        setCspStart: (cspStart: boolean): any => dispatch(reelsActions.setCspStart(cspStart)),
        setProsData: (freeSpinRewards: any): any => dispatch(multiplierActions.setProsData(freeSpinRewards)),
        setFreeSpinRewards: (freeSpinRewards: boolean): any => dispatch(multiplierActions.setFreeSpinRewards(freeSpinRewards)),
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
    }))(withFreeGameConfiguration(GofFreeGameBaseLayer)));