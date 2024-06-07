import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { GSAPTimer, GSAPTween, CURRENCY, ItweenProps } from "@bonanzainteractive/core";
import { UIManager } from "@bonanzainteractive/core";
import withWinShowerConfiguration from "./configuration/withWinShowerConfiguration";
import { isMobile } from "react-device-detect";
import { constant } from "../../slot/data/config";
import { actions as winShowerActions } from "../../gamereducer/winShowerReducer";
import { actions as multiplierActions } from "../../gamereducer/multiplierReducer";
import { BaseAnimatedparticle } from "@bonanzainteractive/core";
import {
    baseGameAction,
    freegameActions, buttonActions, layoutssActions, winpresentationAction, soundActions
} from "@bonanzainteractive/slote_core";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { configGame } from "../../slot/data/config";
import gsap from "gsap";
import { playSoundLoop, stopSoundLoop } from "../../core/sounds/SoundControler";


interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}

interface IStateToProps {
    layoutMode: string;
    startWinShower: boolean;
    showWinShower: boolean;
    winShowerAmount: number;
    betList: any;
    currentBetIndex: number;
    totalCreditWinAmount: number;
    featureJustReTriggered: boolean;
    featureType: string;
    balance: number;
    coinList: any;
    selectedCoin: number;
    currencyGroupingSeparator: string;
    inFreeGame: boolean;
    storeMultiplierCurrentValue: number;
    freeSpinRewards: boolean;
    // InTurboMode: boolean;
}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class WinShower extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected winShowerContainer: _ReactPixi.IContainer | Ref<any>;
    protected tweening: any;
    protected ui_mode: string;
    protected displayUI: Object[] = [];
    protected thresholdSuperWin: any
    protected thresholdMegaWin: any
    protected thresholdLegendaryWin: any
    protected Baseparticle: any
    protected wincelebrationText: any
    protected freeGameLevelUpText: any;
    private level_1: number = 2000;
    private level_2: number = 3000;
    private level_3: number = 4000;
    private level_4: number = 5000;
    private threshold_level_1 = 5;
    private threshold_level_2 = 10;
    private threshold_level_3 = 20;
    private threshold_level_4 = 25;
    private constantValue: number = 100;
    private storeBetValue: number = 0;
    private isClicked: boolean = false;
    private checker: boolean = false;

    private UIManagerRef: any;
    protected multiplierText: any;
    private isFinished: boolean;

    private coinConfig = {

        "alpha": {
            "start": 1,
            "end": 1
        },
        "scale": {
            "start": 0.3,
            "end": 0.6
        },
        "speed": {
            "start": 2000,
            "end": 2000
        },
        "acceleration": {
            "x": 10,
            "y": 1830
        },
        "startRotation": {
            "min": 250,
            "max": 290
        },
        "rotationSpeed": {
            "min": 100,
            "max": 150
        },
        "lifetime": {
            "min": 2,
            "max": 4
        },
        "frequency": 0.1,
        "emitterLifetime": -1,

        "maxParticles": 20,
        "pos": {
            "x": 900,
            "y": 1200
        },
        "addAtBack": false,
        "spawnType": "circle",
        "spawnCircle": {
            "x": 0,
            "y": 0,
            "r": 100
        }
    }
    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            uiElements: [],
            lang: "en",
            width: this.props.width,
            height: this.props.height,
            pixelRatio: window.devicePixelRatio,
            resizing: false,
        }
        this.winShowerContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";

        }
        this.tweening = [];
        this.thresholdSuperWin = 100;
        this.thresholdMegaWin = 200;
        this.thresholdLegendaryWin = 500;
        this.isFinished = false;
        this.displayUI = this.props.data.COMPONENTS.filter(this.checkUiMode.bind(this));
        this.UIManagerRef = UIManager.getRef;

    }

    checkUiMode(uimodeobj: any) {
        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both"
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    layoutChange(currentLayout: string) {
        this.displayUI.forEach((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        });
    }


    componentDidMount() {
        this.layoutChange(this.props.layoutMode);
        this.multiplierText = UIManager.getRef("multiplierText");
    }

    coinShower(nextProps: any) {
        // let animmationconfig = {
        //     framerate: 30,
        //     loop: true,
        //     textures: this.UIManagerRef("coins_Anim").textures
        // }
        // this.Baseparticle = new BaseAnimatedparticle(this.UIManagerRef("winShower_Container_" + this.ui_mode), animmationconfig, this.coinConfig)
        // // this.props.playSound([{ name: "mw_sx_counter", loop: true, vol: 1 },{ name: "mw_sx_winsound_1", loop: true, vol: 1 },{ name: 'mw_sx_coins', loop: true, vol: 1 } ]);
        // this.Baseparticle.startTickUp(nextProps.winShowerAmount, 5);
    }


    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.soundIsPlaying !== this.props.soundIsPlaying
            || nextProps.showWinShower !== this.props.showWinShower
            || nextProps.startWinShower !== this.props.startWinShower
            || nextProps.layoutMode !== this.props.layoutMode) {
            if (nextProps.soundIsPlaying !== this.props.soundIsPlaying) {
                return false;
            }
            if (nextProps.layoutMode !== this.props.layoutMode) {
                this.layoutChange(nextProps.layoutMode);
            }
            if (nextProps.showWinShower && nextProps.showWinShower !== this.props.showWinShower) {
                this.isClicked = false;
                this.props.winShowerSoundStop(false);
                return true;
            }
            if (nextProps.startWinShower && nextProps.startWinShower !== this.props.startWinShower) {
                const duration = 1;
                this.checker = false;
                this.activeWinShower(true);
                this.isFinished = false;
                this.props.winShowerSoundStop(false);
                this.storeBetValue = this.props.betList[this.props.currentBetIndex] / this.constantValue;
                duration && this.coinShower(nextProps);
                this.interactivityTrue(true);

                this.setTimeOfWin();

                if (this.props.inFreeGame && this.props.storeMultiplierCurrentValue > 1) {
                    this.props.setMultiplierBlast(true);
                    constant.configGame.CURRENT_WINAMOUNT = constant.configGame.CURRENT_WINAMOUNT / this.props.storeMultiplierCurrentValue;
                }

                // if (!this.props.InTurboMode) {
                let amountTickUp = this.UIManagerRef("amount_tickup_" + this.ui_mode);
                amountTickUp.visible = true;
                amountTickUp.alpha = 0;
                amountTickUp.text = 0.01;

                GSAPTimer.getInstance().addTimer(0.1, () => {
                    amountTickUp.objectInstance.startTickup(constant.configGame.CURRENT_WINAMOUNT, 0.5);
                });
                const tweenProps: ItweenProps = {
                    alpha: 1,
                    duration: 0.5,
                    ease: "none",
                    onUpdate: () => {
                        amountTickUp.scale.x = amountTickUp.scale.y = amountTickUp.alpha;

                        if (this.checker) {
                            amountTickUp.scale.x = amountTickUp.scale.y = 1;
                            this.UIManagerRef("amount_tickup_" + this.ui_mode).alpha = 1;
                        }
                    },
                    onComplete: () => {
                        stopSoundLoop("jq_sx_counter");

                        // GSAPTimer.getInstance().addTimer(duration, () => {
                        // this.props.stopSound([{ name: "jq_sx_counter" }])
                        // this.props.setUpdateWinAfterWinAnimation(true);
                        // });
                        if (this.checker) {
                            amountTickUp.scale.x = amountTickUp.scale.y = 1;
                            this.UIManagerRef("amount_tickup_" + this.ui_mode).alpha = 1;
                        }
                    }
                }
                GSAPTween.getInstance().gsapTween(amountTickUp, tweenProps);
                // } 
                // else {
                //     this.UIManagerRef("amount_tickup_" + this.ui_mode).visible = true;
                //     this.UIManagerRef("amount_tickup_" + this.ui_mode).objectInstance.startTickup(constant.configGame.CURRENT_WINAMOUNT, duration);
                // }
            }
            return false;
        }
        return true;
    }
    // private getWinDuration(totalCreditWinAmount: number): number {
    //     let duration: number = 0;
    //     if (!this.props.InTurboMode) {
    //         if (totalCreditWinAmount <= this.props.betList[this.props.currentBetIndex]) {
    //             duration = 0;
    //         } else if (totalCreditWinAmount > this.props.betList[this.props.currentBetIndex] && totalCreditWinAmount < this.props.betList[this.props.currentBetIndex] * 5) {
    //             duration = 1;
    //         } else {
    //             duration = 2.5;
    //         }
    //     }
    //     return duration;
    // }


    private activeWinShower(flg: boolean) {
        if (this.UIManagerRef("winShowerContainer")) {
            this.UIManagerRef("winShowerContainer").visible = flg;
        }

    }

    interactivityTrue(value: boolean) {
        this.UIManagerRef("winShowerContainer").interactive = true;
        if (isMobile) {
            this.UIManagerRef("winShowerContainer").addListener('touchend', (evt: MouseEvent): void => {
                this.handleEvents();
            })
        } else {
            this.UIManagerRef("winShowerContainer").click = (event: any) => {
                this.handleEvents();
            }
        }
    }
    handleEventMouseOver() { }
    handleEventMouseOut() { }
    handleEvents() {
        if (this.isClicked) {
            return
        }
        this.isClicked = true;
        this.checker = true;
        this.UIManagerRef("amount_tickup_" + this.ui_mode).scale.x = this.UIManagerRef("amount_tickup_" + this.ui_mode).scale.y = 1;
        this.UIManagerRef("amount_tickup_" + this.ui_mode).alpha = 1;
        this.props.setUpdateWinAfterWinAnimation(true);
        this.onSkip();
    }
    setTimeOfWin() {
        if (this.props.totalCreditWinAmount / this.constantValue < this.threshold_level_1 * this.storeBetValue) {
            this.UIManagerRef("amount_tickup_" + this.ui_mode).tickuptime = this.level_1;
            // this.props.playSound([{ name: "jq_sx_win_sound_1", loop: false, vol: 1 }]);
        }
        else if (this.props.totalCreditWinAmount / this.constantValue >= this.threshold_level_1 * this.storeBetValue && this.props.totalCreditWinAmount / this.constantValue < this.threshold_level_2 * this.storeBetValue) {
            this.UIManagerRef("amount_tickup_" + this.ui_mode).tickuptime = this.level_2;
            // this.props.playSound([{ name: "jq_sx_win_sound_2", loop: false, vol: 1 }]);
        }
        else if (this.props.totalCreditWinAmount / this.constantValue >= this.threshold_level_2 * this.storeBetValue && this.props.totalCreditWinAmount / this.constantValue < this.threshold_level_3 * this.storeBetValue) {
            this.UIManagerRef("amount_tickup_" + this.ui_mode).tickuptime = this.level_3;
            // this.props.playSound([{ name: "jq_sx_win_sound_3", loop: false, vol: 1 }]);
        }
        else if (this.props.totalCreditWinAmount / this.constantValue >= this.threshold_level_4 * this.storeBetValue) {
            this.UIManagerRef("amount_tickup_" + this.ui_mode).tickuptime = this.level_4;
            // this.props.playSound([{ name: "jq_sx_win_sound_3", loop: false, vol: 1 }]);
        }
    }

    onTickupUpdate(e?: any) {
        if (e == constant.configGame.CURRENT_WINAMOUNT) {
            this.props.stopSound([{ name: "jq_sx_counter" }])
            if (this.props.storeMultiplierCurrentValue <= 1) {
                this.props.setUpdateWinAfterWinAnimation(true);
            }
        }
        if (this.isClicked) {
            let tickUpValue = CURRENCY.CurrencyManager.formatCurrencyString(Number(this.props.winShowerAmount), true, true, true, true);
            this.UIManagerRef("amount_tickup_" + this.ui_mode) && (UIManager.setText("amount_tickup_" + this.ui_mode, tickUpValue));
        }
    }

    blastMultiplierInFG(): Promise<any> {
        if (this.props.inFreeGame && this.props.storeMultiplierCurrentValue > 1) {
            // this.props.stopSound([{ name: "jq_sx_counter" }])
            return new Promise<any>(resolve => {
                const tweenProps: ItweenProps = {
                    duration: 0.5,
                    ease: "none",
                    onComplete: () => {
                        this.props.setMulitplierProsData({ multiplierBlastStart: true, pr: resolve });
                    }
                }
                GSAPTween.getInstance().gsapTween(this.freeGameLevelUpText, tweenProps);
            });
        }
        else {
            return new Promise(resolve => {
                GSAPTimer.getInstance().addTimer(0.5, () => {
                    resolve('success');
                });

            })
        }
    }
    async onTickupComplete() {
        stopSoundLoop("jq_sx_counter");
        await this.blastMultiplierInFG();
        // this.props.inFreeGame && this.props.storeMultiplierCurrentValue > 1 && this.props.setUpdateWinAfterWinAnimation(true);
        this.props.winShowerSoundStop(true);
        if (this.props.currencyGroupingSeparator === ' ') {
            let tickUpValue = CURRENCY.CurrencyManager.formatCurrencyString(Number(this.props.winShowerAmount), true, true, true, true).split(" ");
            this.UIManagerRef("amount_tickup_" + this.ui_mode) && (UIManager.setText("amount_tickup_" + this.ui_mode, tickUpValue[0] + " " + tickUpValue[1] + " " + tickUpValue[2]));
        } else {
            let tickUpValue = CURRENCY.CurrencyManager.formatCurrencyString(Number(this.props.winShowerAmount), true, true, true, true);
            this.UIManagerRef("amount_tickup_" + this.ui_mode) && (UIManager.setText("amount_tickup_" + this.ui_mode, tickUpValue));
        }

        let timer;
        this.props.storeMultiplierCurrentValue > 1 ? timer = 0.7 : timer = 0.2;
        GSAPTimer.getInstance().addTimer(timer, () => {
            this.UIManagerRef("amount_tickup_" + this.ui_mode).alpha = 1;
            const tweenProps: ItweenProps = {
                alpha: 0,
                duration: 0.3,
                ease: "none",
                onComplete: () => {
                    // this.UIManagerRef("amount_tickup_" + this.ui_mode).visible = false;
                    this.UIManagerRef("amount_tickup_" + this.ui_mode).alpha = 0;
                    GSAPTween.getInstance().killTween(this.UIManagerRef("amount_tickup_" + this.ui_mode));
                }
            }
            GSAPTween.getInstance().gsapTween(this.UIManagerRef("amount_tickup_" + this.ui_mode), tweenProps);
            // this.props.setUpdateWinAfterWinAnimation(true);
            // this.waitForcoinfalldown();
            if (!this.isFinished) {
                this.isFinished = true;
                this.waitForcoinfalldown();
            }
            // this.isClicked = false;
        });
    }

    private waitForcoinfalldown(): void {
        GSAPTimer.getInstance().addTimer(0.5, () => {
            this.props.stopWinPresentation();
            this.props.winShowerStart(false);
            this.props.startIncreasingCounter(true);
            this.props.winShowerShow(false);
            this.props.setActiveall(true);
            this.props.removeKeyBoardEvent(false);
            this.props.winShowerSoundStop(false);
            this.activeWinShower(false);
            if ((this.props.featureType === "BONUS" || this.props.featureType === "FREEGAME") || !this.props.featureJustReTriggered) {
                this.nextPlayCommand();

            }
            if (((this.props.balance >= this.props.coinList[this.props.selectedCoin]) || this.props.winAmount > 0)) {
                this.props.setAllButtonEnable();
                !this.props.inFreeGame && this.props.spinMode(false);
            }
            else {
                if ((this.props.balance) > 0) {
                    this.props.particularButtonEnable(true);
                }
                else {
                    this.props.setAllButtonDisable();
                }
            }
            this.clearAllChild();
        });
    }

    private onSkip(): void {
        // this.isClicked = false;
        this.UIManagerRef("amount_tickup_" + this.ui_mode).objectInstance.onSkip();
    }


    private nextPlayCommand(): void {
        this.props.winShowerComplete(true);
        this.props.setMultiplierBlast(false);
        if (!this.props.featureJustReTriggered || !this.props.inFreeGame) {
            this.props.nextAutoplay();
            this.props.nextFreegame();
        }
    }

    private clearAllChild(): void {
        for (let i = 0; i < this.UIManagerRef("winShowerContainer").children.length; i++) {
            this.UIManagerRef("winShowerContainer").children[i].removeChildren();;
        }
        this.UIManagerRef("winShowerContainer").removeChildren();
        this.UIManagerRef("winShowerContainer").visible = false;
        this.winShowerContainer = {};
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        this.UIManagerRef("winShowerContainer") && (this.UIManagerRef("winShowerContainer").visible = true);
        this.layoutChange(this.props.layoutMode);
    }


    render() {
        if (!this.props.showWinShower) {
            return null
        }
        return (
            <UIManager id={"winShowerContainer"} name={"winShowerContainer"} type={"Container"} app={this.app}
                ref={i => this.winShowerContainer = i}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            app={this.app} configGame={configGame} constant={constant}
                            id={i.id} name={i.name} {...i} tickupUpdate={this.onTickupUpdate.bind(this)}
                            tickupComplete={this.onTickupComplete.bind(this)} mouseOver={this.handleEventMouseOver} mouseOut={this.handleEventMouseOut} />)
                }
            </UIManager>
        );
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'betPanelState' | 'freegameState' | 'winShowerState' | 'behaviourState' | 'applicationState' | 'basegameState' | 'MultiplierState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        startWinShower: state.winShowerState.startWinShower,
        showWinShower: state.winShowerState.showWinShower,
        winShowerAmount: state.winShowerState.winShowerAmount,
        betList: state.basegameState.betList,
        currentBetIndex: state.basegameState.currentBetIndex,
        totalCreditWinAmount: state.behaviourState.totalCreditWinAmount,
        featureJustReTriggered: state.freegameState.featureJustReTriggered,
        featureType: state.basegameState.featureType,
        balance: state.basegameState.balance,
        coinList: state.betPanelState.coinList,
        selectedCoin: state.betPanelState.selectedCoin,
        currencyGroupingSeparator: state.applicationState.currencyGroupingSeparator,
        inFreeGame: state.freegameState.inFreeGame,
        storeMultiplierCurrentValue: state.MultiplierState.storeMultiplierCurrentValue,
        freeSpinRewards: state.MultiplierState.freeSpinRewards,
        // InTurboMode: state.reelsState.InTurboMode,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        nextAutoplay: (): any => dispatch(baseGameAction.nextAutoplay()),
        nextFreegame: (): any => dispatch(freegameActions.nextFreegame()),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        winShowerStart: (startWinShower: boolean, winShowerAmount: number): any => dispatch(winShowerActions.winShowerStart(startWinShower, winShowerAmount)),
        winShowerShow: (showWinShower: boolean): any => dispatch(winShowerActions.winShowerShow(showWinShower)),
        winShowerSoundStop: (stopWinShowerSound: boolean): any => dispatch(winShowerActions.winShowerSoundStop(stopWinShowerSound)),
        startIncreasingCounter: (counterStartIncreasing: boolean): any => dispatch(behaviourAction.startIncreasingCounter(counterStartIncreasing)),
        setActiveall: (isActiveAll: boolean): any => dispatch(baseGameAction.setActiveall(isActiveAll)),
        removeKeyBoardEvent: (isRemoveKeyBoardEvent: boolean): any => dispatch(baseGameAction.removeKeyBoardEvent(isRemoveKeyBoardEvent)),
        particularButtonEnable: (enableParticularButton: boolean): any => dispatch(buttonActions.particularButtonEnable(enableParticularButton)),
        balanceUpdateAfterSpin: (updateBalanceAfterSpin: boolean): any => dispatch(behaviourAction.balanceUpdateAfterSpin(updateBalanceAfterSpin)),
        spinMode: (inSpinMode: boolean): any => dispatch(behaviourAction.spinMode(inSpinMode)),
        winShowerComplete: (completeWinShower: boolean): any => dispatch(winShowerActions.winShowerComplete(completeWinShower)),
        setUpdateWinAfterWinAnimation: (updateWin: boolean): any => dispatch(behaviourAction.setUpdateWinAfterWinAnimation(updateWin)),
        setMulitplierProsData: (data: any): any => dispatch(multiplierActions.setMulitplierProsData(data)),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        stopSound: (soundName: any): any => dispatch(soundActions.stopSound(soundName)),
        fadeOutSound: (soundName: any): any => dispatch(soundActions.fadeOutSound(soundName)),
        setMultiplierBlast: (multiplierBlastStart: boolean): any => dispatch(multiplierActions.setMultiplierBlast(multiplierBlastStart)),

    }))(withWinShowerConfiguration(WinShower)));
