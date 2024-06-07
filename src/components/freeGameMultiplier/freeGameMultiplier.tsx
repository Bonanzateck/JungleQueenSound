import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withFreegameMultiplierConfiguration from "./configuration/withFreeGameMultiplierConfiguration";
import { UIManager, GSAPTween, ItweenProps, CURRENCY, GSAPTimer } from "@bonanzainteractive/core";
import * as PIXI from 'pixi.js';
import { flowManagerAction, layoutssActions, soundActions, winpresentationAction } from "@bonanzainteractive/slote_core";
import { isMobile } from "react-device-detect";
import { actions as featureAction } from "../../gamereducer/revealFeatureReducer";
import { actions as multiplierActions } from "../../gamereducer/multiplierReducer";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { playSoundLoop, stopSoundLoop } from "../../core/sounds/SoundControler";
import { constant } from "../../slot/data/config";

interface IStore {
    [x: string]: any;
}
interface IProps {
    [x: string]: any;
}
interface IStateToProps {

}

interface IDispatchToProps {
}
interface IState {
    [x: string]: any;
}

// Multiplier enhancement  and   Multiplier Awarded  sound

class FreegameMultiplier extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected ui_mode: string;
    protected displayUI: any;
    protected freegameMultiplierContainer: _ReactPixi.IContainer | Ref<any>;
    protected multiplierText: any;
    protected multiplierIncreaseText: any;
    protected multiplierTopText: any;
    private UIManagerRef: any;
    private Checker: boolean = true;
    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }
        this.freegameMultiplierContainer = {};
        this.displayUI = this.props.data.COMPONENTS.filter(this.checkUiMode.bind(this));
        this.UIManagerRef = UIManager.getRef;
    }

    checkUiMode(uimodeobj: any) {
        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both";
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    bindUI() {
        this.layoutChange(this.props.layoutMode);
    }

    componentDidMount() {
        this.bindUI();
        this.onOrientationChange();
        this.initializeObject();
    }
    initializeObject() {
        this.multiplierText = UIManager.getRef("multiplierText");
        this.multiplierIncreaseText = UIManager.getRef("multiplierIncreaseText");
        this.multiplierTopText = UIManager.getRef("multiplierTopText");
        if (this.props.storeMultiplierCurrentValue) {
            if (this.props.storeMultiplierCurrentValue > 1 && this.props.storeMultiplierCurrentValue !== this.props.preMultiplier) {
                this.multiplierTopText.text = `x${this.props.preMultiplier}`;
            } else {
                this.multiplierTopText.text = `x${this.props.storeMultiplierCurrentValue}`;
            }
        }
    }
    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any,) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
                data.child.map((data: any) => {
                    if (data.layout === true) {
                        this.props.setApplicationLayoutObject(data.name);
                    }
                })
            }
        });
    }
    componentDidUpdate() {
        this.bindUI();

    }
    onOrientationChange() {

    }

    resetPosition() {
        this.multiplierText.x = 1000;
        this.multiplierText.y = 500;
        this.multiplierText.visible = false;
        this.multiplierText.rotation = 0;
    }
    showText() {
        UIManager.getRef("collecter_bg_feature").alpha = 0;
        UIManager.getRef("collecter_bg_feature").visible = true;
        UIManager.getRef("bgGraphic_for_FG").alpha = 0;
        UIManager.getRef("bgGraphic_for_FG").visible = true;
        this.resetPosition();
        this.multiplierIncreaseText.text = "x" + this.props.storeMultiplierCurrentValue;
        // this.props.playSound([{ name: "jq_multiplier_enhancement", vol: 1, loop: false }]);
        if (!this.props.allSoundSFXStop) {
            playSoundLoop("jq_multiplier_enhancement", "jq_multiplier_enhancement", false);
        }
        this.multiplierIncreaseText.alpha = 0;
        const tweenProps: ItweenProps = {
            alpha: 1,
            duration: 0.8,
            ease: 'none',
            onUpdate: () => {
                UIManager.getRef("bgGraphic_for_FG").alpha = this.multiplierIncreaseText.alpha / 2;
                UIManager.getRef("collecter_bg_feature").alpha = this.multiplierIncreaseText.alpha;
                !this.multiplierIncreaseText.visible && (this.multiplierIncreaseText.visible = true);
            },
            onComplete: () => {
                const tweenProps: ItweenProps = {
                    alpha: 0,
                    duration: 0.8,
                    delay: 0.6,
                    ease: "none",
                    onUpdate: () => {
                        UIManager.getRef("bgGraphic_for_FG").alpha = this.multiplierIncreaseText.alpha / 2;
                        UIManager.getRef("collecter_bg_feature").alpha = this.multiplierIncreaseText.alpha;
                    },
                    onComplete: () => {
                        UIManager.getRef("collecter_bg_feature").alpha = 0;
                        const glowAnimAnim = UIManager.getRef("multiplierIncreaseAnim");
                        glowAnimAnim.visible = true;
                        // this.props.playSound([{ name: "jq_multiplier_enhancement", vol: 1, loop: false }]);
                        if (!this.props.allSoundSFXStop) {
                            playSoundLoop("jq_multiplier_enhancement", "jq_multiplier_enhancement", false);
                        }
                        glowAnimAnim.children[0].state.setAnimation(0, "win_panel_butterfly_glow", true);
                        const glowAnim = UIManager.getRef("multiplierIncreaseAnimButterFly");
                        GSAPTimer.getInstance().addTimer(0.1, () => {
                            glowAnim.visible = true;
                            glowAnim.children[0].state.setAnimation(0, "collectd_mtr_butterfly_blast", true);
                            glowAnim.children[0].state.onComplete = () => {
                                glowAnim.visible = false;
                            }
                        });
                        glowAnimAnim.children[0].state.onComplete = () => {
                            this.multiplierTopText.text = `x${this.props.storeMultiplierCurrentValue}`;
                            glowAnimAnim.visible = false;
                            this.nextForwardStep();
                        }
                    }
                }
                GSAPTween.getInstance().gsapTween(this.multiplierIncreaseText, tweenProps);
            }
        }
        GSAPTween.getInstance().gsapTween(this.multiplierIncreaseText, tweenProps);
    }

    nextForwardStep() {
        // this.props.setButterflyCollect(true);
        this.props.multiplierShow(false);
        this.props.setWinsSucces(this.props.resultWinSpinInFG);
        this.props.inFreeGame ? this.freeGameFLowManager() : this.playWinPresentation();
    }

    playWinPresentation() {
        if (this.props.winningList.length === 0) {
            this.onRevealfinished();
        } else {
            // this.props.displayWinBox(true);
            GSAPTimer.getInstance().addTimer(0.1, () => {
                this.props.startWinPresentation();
            });
            // this.props.startWinPresentation();
        }
    }
    freeGameFLowManager() {
        this.playWinPresentation();
    }

    onRevealfinished() {
        GSAPTimer.getInstance().addTimer(0.8, () => {
            this.props.flowManagerCalled(true);
        });
    }

    //! Start Blast
    resetTweenText() {
        this.tweenObj(0, 1.5, 0.2);
        let playedBlast = false;
        const tweenProps: ItweenProps = {
            x: 880,
            y: 615,
            duration: 0.2,
            ease: "power4",
            onUpdate: (e: any) => {
                if (this.multiplierText.y > 400 && !playedBlast) {
                    let blastSpine = this.UIManagerRef("blast");
                    this.UIManagerRef("multiplierText").visible = false;
                    blastSpine.visible = true;
                    blastSpine.children[0].state.setAnimation(0, "animation", false);
                    this.startMultiplierMovement();
                    blastSpine.children[0].state.onComplete = () => {
                        blastSpine.visble = false;
                        // this.props.resolve.data.pr('done');
                        this.props.resolve && this.props.resolve.data && this.props.resolve.data.pr && this.props.resolve.data.pr('done');
                        if (UIManager.getRef("bgGraphic_for_FG")) {
                            const tweenProps: ItweenProps = {
                                alpha: 0,
                                duration: 0.5,
                                ease: "none"
                            }
                            GSAPTween.getInstance().gsapTween(UIManager.getRef("bgGraphic_for_FG"), tweenProps);
                        }
                        // this.props.setMultiplierBlast(false);
                    }
                    playedBlast = true;
                    GSAPTween.getInstance().killTween(this.UIManagerRef("multiplierText"));
                }
            },
            onComplete: () => {
            }
        }
        GSAPTween.getInstance().gsapTween(this.UIManagerRef("multiplierText"), tweenProps);

    }
    startMultiplierMovement() {
        // this.props.playSound([{ name: "jq_multiplier_awarded", vol: 1, loop: false }]);


        // }
        if (!constant.configGame.isReconstruction)
            this.UIManagerRef("multiplierWintickup").objectInstance.props.value = constant.configGame.CURRENT_WINAMOUNT;

        this.UIManagerRef("multiplierWintickup").objectInstance.startTickup(this.props.winShowerAmount, 0.5);
        if (!this.props.allSoundSFXStop) {
            playSoundLoop("jq_sx_counter", "jq_sx_counter", true);
        }
        GSAPTimer.getInstance().addTimer(0.5, () => {
            this.props.setUpdateWinAfterWinAnimation(true);
            stopSoundLoop("jq_sx_counter")
        });
    }
    tweenObj(to: number, from: number, dur: number) {
        let obj = { x: from };
        const tweenProps: ItweenProps = {
            x: to,
            duration: dur,
            ease: "power4",
            onUpdate: () => {
                this.UIManagerRef("multiplierText").scale.set(obj.x);
            },
            onComplete: () => {
                GSAPTween.getInstance().killTween(obj);
            }
        }
        GSAPTween.getInstance().gsapTween(obj, tweenProps);
    }

    multiplierBlast() {
        if (!this.props.allSoundSFXStop) {
            GSAPTimer.getInstance().addTimer(0.1, () => {
                playSoundLoop("jq_multiplier_awarded", "jq_multiplier_awarded", false);
            });
        }
        this.multiplierText.x = isMobile ? (window.innerHeight > window.innerWidth ? 450 : 655.5) : 1860;
        this.multiplierText.y = isMobile ? (window.innerHeight > window.innerWidth ? 600 : 100) : 505;
        this.multiplierText.rotation = 0;
        this.UIManagerRef("multiplierText").scale.set(0);
        this.tweenObj(1.5, 0, 0.5);
        this.UIManagerRef("multiplierText").visible = true;
        this.multiplierText.text = "x" + this.props.storeMultiplierCurrentValue;
        const tweenProps: ItweenProps = {
            rotation: 19,
            x: isMobile ? (window.innerHeight > window.innerWidth ? 565 : 1000) : 970,
            y: isMobile ? (window.innerHeight > window.innerWidth ? 950 : 440) : 510,
            duration: 1.5,
            ease: "power4",
            onComplete: () => {
                this.Checker = true;
                GSAPTween.getInstance().killTween(this.UIManagerRef("multiplierText"));
                this.resetTweenText();
            }
        }
        GSAPTween.getInstance().gsapTween(this.UIManagerRef("multiplierText"), tweenProps);
    }
    //!End Blast    

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.layoutMode !== this.props.layoutMode
            || nextProps.showMultiplier !== this.props.showMultiplier
            || nextProps.multiplierBlastStart !== this.props.multiplierBlastStart) {
            if (nextProps.layoutMode !== this.props.layoutMode) {
                this.layoutChange(nextProps.layoutMode);
            }
            if (nextProps.showMultiplier && nextProps.showMultiplier !== this.props.showMultiplier) {
                if (this.props.storeMultiplierCurrentValue > 1 && this.props.storeMultiplierCurrentValue !== this.props.preMultiplier) {
                    nextProps.showMultiplier && this.showText();
                } else {
                    this.nextForwardStep();
                }

            } if (nextProps.multiplierBlastStart && nextProps.multiplierBlastStart !== this.props.multiplierBlastStart) {
                this.multiplierBlast();

            }
            return false;
        }
        return false;
    }


    render() {
        return (
            <UIManager id={"freegameMultiplierContainer"} name={"freegameMultiplierContainer"} type={"Container"}
                app={this.app} ref={i => this.freegameMultiplierContainer = i}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            id={i.id} {...i} app={this.app} configGame={this.props.configGame}
                            scope={this}
                        />
                    )
                }
            </UIManager>)
    }

}

export default withPixiApp(connect(
    (state: Pick<IStore, 'MultiplierState' | 'behaviourState' | 'basegameState' | 'revealFeatureState' | 'soundState' | 'winpresentationState' | 'applicationState' | 'freegameState' | 'reelsState' | 'winShowerState'>, ownProps?: any): IStateToProps => ({
        layoutMode: state.applicationState.layoutMode,
        showMultiplier: state.MultiplierState.showMultiplier,
        storeMultiplierCurrentValue: state.MultiplierState.storeMultiplierCurrentValue,
        multiplierBlastStart: state.MultiplierState.multiplierBlastStart,
        preMultiplier: state.MultiplierState.preMultiplier,
        level: state.revealFeatureState.level,
        winShowerAmount: state.winShowerState.winShowerAmount,
        resolve: state.MultiplierState.resolve,
        resultWinSpinInFG: state.revealFeatureState.resultWinSpinInFG,
        inFreeGame: state.freegameState.inFreeGame,
        winningList: state.reelsState.winningList,
        completeWinShower: state.winShowerState.completeWinShower,
        allSoundSFXStop: state.soundState.allSoundSFXStop,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        isButterFliesPlaced: (butterFliesPlaced: boolean): any => dispatch(featureAction.isButterFliesPlaced(butterFliesPlaced)),
        multiplierShow: (showMultiplier: boolean): any => dispatch(multiplierActions.multiplierShow(showMultiplier)),
        setMultiplierBlast: (multiplierBlastStart: boolean): any => dispatch(multiplierActions.setMultiplierBlast(multiplierBlastStart)),
        setButterflyCollect: (butterFlyCollected: boolean): any => dispatch(featureAction.setButterflyCollect(butterFlyCollected)),
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        setWinsSucces: (result_reel: any): any => dispatch(winpresentationAction.setWinsSucces(result_reel)),
        startWinPresentation: (): any => dispatch(winpresentationAction.startWinPresentation()),
        flowManagerCalled: (callFlowManager: boolean): any => dispatch(flowManagerAction.flowManagerCalled(callFlowManager)),
        setUpdateWinAfterWinAnimation: (updateWin: boolean): any => dispatch(behaviourAction.setUpdateWinAfterWinAnimation(updateWin)),
        stopSound: (soundName: any): any => dispatch(soundActions.stopSound(soundName)),
    }))(withFreegameMultiplierConfiguration(FreegameMultiplier)));
