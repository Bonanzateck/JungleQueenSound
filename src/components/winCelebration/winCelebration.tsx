import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { UIManager } from "@bonanzainteractive/core";
import withWinCelebrationConfiguration from "./configuration/withWinCelebrationConfiguration";
import { isMobile } from "react-device-detect";
import { constant } from "../../slot/data/config";
import { actions as winCelebrationActions } from "../../gamereducer/winCelebrationReducer";
import { BaseAnimatedparticle } from "@bonanzainteractive/core";
import { buttonActions, freegameActions, baseGameAction, keyboardListenerActions, layoutssActions, soundActions, winpresentationAction } from "@bonanzainteractive/slote_core";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { GSAPTimer, GSAPTween, ItweenProps, CURRENCY } from "@bonanzainteractive/core";
import { configGame } from "../../slot/data/config";
import { playSoundLoop, stopSoundLoop } from "../../core/sounds/SoundControler";


interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}

interface IStateToProps {
    layoutMode: string;
    startWinCelebration: boolean;
    showAmount: string;
    showWinCelebration: boolean;
    soundIsPlaying: boolean;
    betList: any;
    currentBetIndex: number;
    winAmount: number;
    totalCreditWinAmount: number;
    featureJustReTriggered: boolean;
    featureType: string;
    balance: number;
    coinList: any;
    selectedCoin: number;
    spinStart: boolean;
    currencyGroupingSeparator: string;
    inFreeGame: boolean;
    basegamestate: boolean;
    allSoundSFXStop: boolean;
}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class WinCelebration extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected winCelebrationContainer: _ReactPixi.IContainer | Ref<any>;
    protected tweening: any;
    protected ui_mode: string;
    protected displayUI: Object[] = [];
    protected thresholdSuperWin: number
    protected thresholdMegaWin: any
    protected thresholdLegendaryWin: any
    protected Baseparticle: any
    protected wincelebrationText: any
    private lowerTargetValue: number = 0.5;
    private higherTargetValue: number = 1.5;
    protected currentCelebrationState: any
    private T2000: number = 2000;
    private tickupScale: number = 0.002;
    private tickUpValue: number = 0;
    private T100: number = 100;
    private toConvertInSec: number = 1000;
    private previousSound: string = "";
    private startWinSound: boolean = false;
    private isClicked: boolean = false;
    private tickUpScalingTimer: number = 50;
    private handleEventTimer: number = 1000;
    private tickUpStartingScaling: number = 0.70;
    private tickUpActualScaling: number = 1;
    private coinContainerX: number = -400;
    private coinContainerY: number = 300;
    private decreasingAlpha: number = 0.18;
    private decreasingAlphaTimer: number = 100;
    private storeBetValue: number = 0;
    private bigWinValue: number = 25;
    private finalTextOnClick: any;
    private constantValue: number = 100;
    private bigWinTimer: number = 3000;
    private superWinTimer: number = 7000;
    private megaWinTime: number = 12000;
    private legendaryWinTime: number = 25000;
    private playEndSound: boolean = true;
    private winCelebrationStart: boolean = false;
    private screenClickOneTime: boolean = true;
    private UIManagerRef: any;
    private UIManagerSetText: any = UIManager.setText;
    private bigWinAmountBondry: number = 20;
    private superWinAmountBondry: number = 40;
    private meghaWinAmountBondry: number = 80;

    private bgSpine_desktop_collectorin: boolean = false;
    private bgBigWin: boolean = false;
    private bgSuperWin: boolean = false;
    private bgMegaWin: boolean = false;
    private finishedAnimation: string = 'bgSpine_desktopclose_1';
    private currentAnimation: string = 'currentAnimation';
    private WinCollection: any[] = [];
    private hasPlayed: boolean = false;
    private sWinId: any;
    // private bWinId: any;
    // private mWinId: any;
    private safari: any;


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
            "max": 2
        },
        "blendMode": "normal",
        "frequency": 0.1,
        "emitterLifetime": -1,
        "maxParticles": 30,
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
        this.winCelebrationContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";

        }
        this.tweening = [];
        this.UIManagerRef = UIManager.getRef;
        this.thresholdSuperWin = 100;
        this.thresholdMegaWin = 200;
        this.thresholdLegendaryWin = 500;

        this.bgSpine_desktop_collectorin = false;
        this.bgBigWin = false;
        this.bgSuperWin = false;
        this.bgMegaWin = false;

        this.displayUI = this.props.data.COMPONENTS.filter(this.checkUiMode.bind(this));
        this.WinCollection[0] = UIManager.getRef(`bgSpine_desktop`);
        this.WinCollection[1] = UIManager.getRef(`bgSpine_desktopclose_1`);
        this.WinCollection[2] = UIManager.getRef(`bgSpine_desktopclose_2`);
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
        this.setPortraitPosition();
        this.displayUI.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        });
        this.setUiOfAnimation()
    }

    setUiOfAnimation() {
        if (isMobile) {
            //NOTE - Win Animations Scalling----
            this.UIManagerRef("bgSpine_desktop").scale.set(0.8) && this.UIManagerRef("bgSpine_desktop1").scale.set(0.8) && this.UIManagerRef("bgSpine_desktop2").scale.set(0.6) && this.UIManagerRef("bgSpine_desktopclose_1").scale.set(0.8) && this.UIManagerRef("bgSpine_desktopclose_2").scale.set(0.6) && this.UIManagerRef("bgSpine_desktopclose_3").scale.set(0.8) && this.UIManagerRef("collecter_bg").scale.set(0.8);
            if (window.innerHeight > window.innerWidth) {
                this.UIManagerRef("bgSpine_desktop").position.set(565, 820);
                this.UIManagerRef("bgSpine_desktop1").position.set(565, 820);
                this.UIManagerRef("bgSpine_desktop2").position.set(565, 820);
                this.UIManagerRef("bgSpine_desktopclose_1").position.set(565, 820);
                this.UIManagerRef("bgSpine_desktopclose_2").position.set(565, 820);
                this.UIManagerRef("bgSpine_desktopclose_3").position.set(565, 820);
                this.UIManagerRef("bgSpine_desktop_collectorin").position.set(565, 820);
                this.UIManagerRef("bgSpine_desktop_collectorout").position.set(565, 820);
                this.UIManagerRef("collecter_bg").position.set(537.5, 1150);
            } else {
                this.UIManagerRef("bgSpine_desktop").position.set(932, 420);
                this.UIManagerRef("bgSpine_desktop1").position.set(932, 420);
                this.UIManagerRef("bgSpine_desktop2").position.set(932, 420);
                this.UIManagerRef("bgSpine_desktopclose_1").position.set(932, 420);
                this.UIManagerRef("bgSpine_desktopclose_2").position.set(932, 420);
                this.UIManagerRef("bgSpine_desktopclose_3").position.set(932, 420);
                this.UIManagerRef("bgSpine_desktop_collectorin").position.set(932, 420);
                this.UIManagerRef("bgSpine_desktop_collectorout").position.set(932, 420);
                this.UIManagerRef("collecter_bg").position.set(955, 750);
            }
        }
    }



    componentDidMount() {
        if (this.props.showWinCelebration) {
            this.layoutChange(this.props.layoutMode);
        }
    }

    textTweening() {
        this.startWinSound = true;
        if (isMobile && window.innerWidth < window.innerHeight) {
            this.wincelebrationText = this.UIManagerRef("text_WinCelebration_label_mobile_portrait");
        } else {
            this.wincelebrationText = this.UIManagerRef("text_WinCelebration_label_" + this.ui_mode);
        }
        this.wincelebrationText.scale.set(this.lowerTargetValue);
        const tweenProps: ItweenProps = {
            x: this.higherTargetValue,
            y: this.higherTargetValue,
            duration: this.T2000 / this.toConvertInSec,
            ease: "elastic",
            onComplete: () => {
                GSAPTween.getInstance().killTween(this.UIManagerRef(this.wincelebrationText.scale));
            }
        }
        GSAPTween.getInstance().gsapTween(this.wincelebrationText.scale, tweenProps);
    }


    coinShower(totalCreditWinAmount: any, duration: number) {
        let coinConfig = {
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
                "max": 2
            },
            "blendMode": "normal",
            "frequency": 0.1,
            "emitterLifetime": -1,
            "maxParticles": 30,
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

        let animmationconfig = {
            //framerate is required. It is the animation speed of the particle in frames per
            //second.
            //A value of "matchLife" causes the animation to match the lifetime of an individual
            //particle, instead of at a constant framerate. This causes the animation to play
            //through one time, completing when the particle expires.
            framerate: 30,
            //loop is optional, and defaults to false.
            loop: true,
            //textures is required, and can be an array of any (non-zero) length.
            textures: this.UIManagerRef("coins_Anim").textures
        }
        this.Baseparticle = new BaseAnimatedparticle(this.UIManagerRef("winCelebration_Container_" + this.ui_mode), animmationconfig, this.coinConfig)
        this.Baseparticle.startTickUp(totalCreditWinAmount, duration + 2);

    }

    setPortraitPosition() {
        let coinCointainer: any = this.UIManagerRef("winCelebration_Container_" + this.ui_mode);
        if (isMobile && window.innerWidth < window.innerHeight) {
            coinCointainer && (coinCointainer.x = this.coinContainerX);
            coinCointainer && (coinCointainer.y = this.coinContainerY);
        } else {
            coinCointainer && (coinCointainer.x = 0);
            coinCointainer && (coinCointainer.y = 0);
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {



        if (nextProps.spinStart !== this.props.spinStart) {
            return false;
        }

        if (nextProps.layoutMode !== this.props.layoutMode && nextProps.showWinCelebration) {
            this.layoutChange(nextProps.layoutMode)
            this.onOrientationChange();
            this.wincelebrationText.scale.set(this.higherTargetValue);
            return false;
        }
        if (nextProps.showWinCelebration && nextProps.showWinCelebration !== this.props.showWinCelebration) {
            return true;
        }
        if (nextProps.startWinCelebration && nextProps.startWinCelebration !== this.props.startWinCelebration) {
            this.bgSpine_desktop_collectorin = false;
            this.bgBigWin = false;
            this.bgSuperWin = false;
            this.bgMegaWin = false;
            this.activeWinCelebration(true);
            this.winCelebrationStart = true;
            this.screenClickOneTime = true;
            this.storeBetValue = this.props.betList[this.props.currentBetIndex] / this.constantValue;
            this.layoutChange(this.props.layoutMode);
            this.textTweening()
            // this.tickupTextScaling();
            this.initialize();
            this.onOrientationChange();
            this.props.setActiveall(false);
            if (this.UIManagerRef("Text_amount_tickup_" + this.ui_mode) !== undefined) {
                this.UIManagerRef("winCelebrationContainer").alpha = 1;
                this.interactivityTrue(true);
                this.setTimeOfWin();
                this.UIManagerRef("Text_amount_tickup_" + this.ui_mode).visible = true;
                this.playEndSound = true;
                this.isClicked = false;
                this.WinCollection[0] = UIManager.getRef(`bgSpine_desktop`);
                this.WinCollection[1] = UIManager.getRef(`bgSpine_desktopclose_1`);
                this.WinCollection[2] = UIManager.getRef(`bgSpine_desktopclose_2`);
                this.showBigWin();
            }
            return false;
        }
        return true;
    }

    private showBigWin(): void {
        const totalCreditWinAmount = this.props.totalCreditWinAmount;
        const obje: any = this.getWinDuration(totalCreditWinAmount);
        const forWinduration = obje.duration === 6 ? 2 : obje.duration === 12 ? 4 : 6;
        this.UIManagerRef("Text_amount_tickup_" + this.ui_mode).objectInstance.startTickup(totalCreditWinAmount, obje.duration);
        this.coinShower(totalCreditWinAmount, obje.duration);
        this.hasPlayed = false;
        GSAPTimer.getInstance().addTimer(0.8, () => {
            this.bigWin();
        });
        if (obje.type === 'superWin' || obje.type === 'meghaWin') {
            GSAPTimer.getInstance().addTimer(forWinduration, () => {
                this.superWin();
            });
        }
        if (obje.type === 'meghaWin') {
            GSAPTimer.getInstance().addTimer(forWinduration * 2, () => {
                this.megaWin()
            });
        }
        GSAPTimer.getInstance().addTimer(obje.duration, () => {
            this.props.setUpdateWinAfterWinAnimation(true);
        });
    }

    private getWinDuration(totalCreditWinAmount: number): object {
        let obje = { duration: 0, type: 'nonne' };
        if (totalCreditWinAmount < this.superWinAmountBondry * this.props.betList[this.props.currentBetIndex]) {
            this.finishedAnimation = 'bgSpine_desktopclose_1';
            obje.duration = 6;
            obje.type = 'bigWin';
        } if (totalCreditWinAmount > this.superWinAmountBondry * this.props.betList[this.props.currentBetIndex] && totalCreditWinAmount <= this.meghaWinAmountBondry * this.props.betList[this.props.currentBetIndex]) {
            this.finishedAnimation = 'bgSpine_desktopclose_2';
            obje.duration = 12;
            obje.type = 'superWin'
        } if (totalCreditWinAmount > this.meghaWinAmountBondry * this.props.betList[this.props.currentBetIndex]) {
            this.finishedAnimation = 'bgSpine_desktopclose_3';
            obje.duration = 18;
            obje.type = 'meghaWin'
        }
        return obje;
    }

    setTimeOfWin() {
        // this.props.playSound([{ name: "jq_sx_big_win_intro", loop: false, vol: 1 }]);
        if (this.props.totalCreditWinAmount < this.thresholdSuperWin * this.storeBetValue) {
            this.UIManagerRef("Text_amount_tickup_" + this.ui_mode).tickuptime = this.bigWinTimer;
            if (this.storeBetValue < 1) {
                this.UIManagerRef("Text_amount_tickup_" + this.ui_mode).tickuptime = this.bigWinTimer
            }
        }
        else if (this.props.totalCreditWinAmount >= this.thresholdSuperWin * this.storeBetValue && this.props.totalCreditWinAmount / this.constantValue < this.thresholdMegaWin * this.storeBetValue) {
            this.UIManagerRef("Text_amount_tickup_" + this.ui_mode).tickuptime = this.superWinTimer;
            if (this.storeBetValue < 1) {
                this.UIManagerRef("Text_amount_tickup_" + this.ui_mode).tickuptime = this.superWinTimer;
            }
        }
        else if (this.props.totalCreditWinAmount >= this.thresholdMegaWin * this.storeBetValue && this.props.totalCreditWinAmount / this.constantValue < this.thresholdLegendaryWin * this.storeBetValue) {
            this.UIManagerRef("Text_amount_tickup_" + this.ui_mode).tickuptime = this.megaWinTime;
            if (this.storeBetValue < 1) {
                this.UIManagerRef("Text_amount_tickup_" + this.ui_mode).tickuptime = this.megaWinTime;
            }
        }
        else if (this.props.totalCreditWinAmount >= this.thresholdLegendaryWin * this.storeBetValue) {
            this.UIManagerRef("Text_amount_tickup_" + this.ui_mode).tickuptime = this.legendaryWinTime;
            if (this.storeBetValue < 1) {
                this.UIManagerRef("Text_amount_tickup_" + this.ui_mode).tickuptime = this.legendaryWinTime;
            }
        }
    }

    interactivityTrue(value: boolean) {
        this.UIManagerRef("winCelebrationContainer").interactive = true;
        UIManager.getRef("winCelebration_Graphic").visible = true;
        if (isMobile) {
            this.UIManagerRef("winCelebration_Graphic").parent.addListener('touchend', (evt: any) => {
                this.handleEvents();
            })
        } else {
            this.UIManagerRef("winCelebration_Graphic").parent.click = (event: any) => {
                this.handleEvents();
            }
        }
    }

    onOrientationChange() {
        if (isMobile && window.innerWidth < window.innerHeight) {
            this.UIManagerRef("text_WinCelebration_label_mobile_portrait").visible = true;
            this.wincelebrationText = this.UIManagerRef("text_WinCelebration_label_mobile_portrait");
            this.UIManagerRef("text_WinCelebration_label_" + this.ui_mode).visible = false;
            this.UIManagerRef("winCelebration_Graphic") && (this.UIManagerRef("winCelebration_Graphic").width = configGame.CANVAS_HEIGHT);
            this.UIManagerRef("winCelebration_Graphic") && (this.UIManagerRef("winCelebration_Graphic").height = configGame.CANVAS_WIDTH);
        } else {
            this.wincelebrationText = this.UIManagerRef("text_WinCelebration_label_" + this.ui_mode);
            this.UIManagerRef("text_WinCelebration_label_" + this.ui_mode) && (this.UIManagerRef("text_WinCelebration_label_" + this.ui_mode).visible = true);
            this.UIManagerRef("text_WinCelebration_label_mobile_portrait") && (this.UIManagerRef("text_WinCelebration_label_mobile_portrait").visible = false);
            this.UIManagerRef("winCelebration_Graphic") && (this.UIManagerRef("winCelebration_Graphic").width = configGame.CANVAS_WIDTH);
            this.UIManagerRef("winCelebration_Graphic") && (this.UIManagerRef("winCelebration_Graphic").height = configGame.CANVAS_HEIGHT);
        }
    }

    tickupTextScaling() {
        const textTickup = this.UIManagerRef("Text_amount_tickup_" + this.ui_mode);
        if (textTickup) {
            textTickup.scale.set(this.tickUpStartingScaling);
            GSAPTimer.getInstance().addTimer((this.tickUpScalingTimer * 2) / 1000, () => {
                if (textTickup && textTickup.scale && textTickup.scale.x && textTickup.scale.y) {
                    textTickup.scale.x += this.tickupScale;
                    textTickup.scale.y += this.tickupScale;
                }
                textTickup.scale.x = this.tickUpActualScaling
            })
        }
    }

    initialize() {
        this.UIManagerRef("text_WinCelebration_label_mobile_portrait") && (this.UIManagerSetText("text_WinCelebration_label_mobile_portrait", this.props.langObj["winCelebration_bigWin"]));
        this.UIManagerRef("text_WinCelebration_label_" + this.ui_mode) && (this.UIManagerSetText("text_WinCelebration_label_" + this.ui_mode, this.props.langObj["winCelebration_bigWin"]));
        this.UIManagerRef("text_WinCelebration_label_" + this.ui_mode) && this.UIManagerRef("text_WinCelebration_label_" + this.ui_mode).scale.set(this.lowerTargetValue);
        this.UIManagerRef("text_WinCelebration_label_mobile_portrait") && this.UIManagerRef("text_WinCelebration_label_mobile_portrait").scale.set(this.lowerTargetValue);
    }


    selectTextWithRange() {
        let finalAmount = this.props.totalCreditWinAmount;
        if (finalAmount >= this.bigWinValue * this.storeBetValue && finalAmount < this.thresholdSuperWin * this.storeBetValue) {
            this.finalTextOnClick = this.props.langObj["winCelebration_bigWin"];
        }
        else if (finalAmount >= this.thresholdSuperWin * this.storeBetValue && finalAmount < this.thresholdMegaWin * this.storeBetValue) {
            this.finalTextOnClick = this.props.langObj["winCelebration_superWin"];
        }
        else if (finalAmount >= this.thresholdMegaWin * this.storeBetValue && finalAmount < this.thresholdLegendaryWin * this.storeBetValue) {
            this.finalTextOnClick = this.props.langObj["winCelebration_megaWin"];
        }
        else if (finalAmount >= this.thresholdLegendaryWin * this.storeBetValue) {
            this.finalTextOnClick = this.props.langObj["winCelebration_legendaryWin"];
        }
    }
    onTickupUpdate(value: number) {
        this.storeBetValue = this.props.betList[this.props.currentBetIndex] / this.constantValue;
        if (value == constant.configGame.CURRENT_WINAMOUNT) {
            // this.props.stopSound([{ name: "jq_sx_counter" }])

        }
        if (value >= 0 && value < this.bigWinAmountBondry * this.props.betList[this.props.currentBetIndex] && !this.bgSpine_desktop_collectorin) {
            this.bgSpine_desktop_collectorin = true;
            // this.props.playSound([{ name: "jq_sx_counter", loop: true, vol: 1 }]);
            // this.props.playSound([{ name: "jq_sx_super_win_loop", loop: true, vol: 1 }]);

            if (!this.props.allSoundSFXStop) {
                // let chromeAgent = window.navigator.userAgent.indexOf("Chrome") > -1
                this.safari = window.navigator.userAgent.indexOf("Safari") > -1;
                !this.props.inFreeGame && this.props.stopSound([{ name: "jq_mx_basegame" }]);
                this.props.inFreeGame && this.props.stopSound([{ name: "jq_mx_freegame_music_loop" }]);
                playSoundLoop("counterSound", "jq_sx_counter", true); //NOTE - WIN TICK UP SOUND
                GSAPTimer.getInstance().addTimer(1.2, () => {
                    playSoundLoop("bigWinSound", "jq_sx_super_win_loop", true);
                });

                // if (this.safari || isMobile) {
                //     this.props.playSound([{ name: "jq_sx_counter", loop: true, vol: 1 }]);
                //     GSAPTimer.getInstance().addTimer(1.2, () => {
                //         this.props.playSound([{ name: "jq_sx_super_win_loop", loop: true, vol: 1 }]);
                //     });
                // } else {
                //     playSoundLoop("counterSound", "sound/jq_sx_counter.wav", true); //NOTE - WIN TICK UP SOUND
                //     GSAPTimer.getInstance().addTimer(1.2, () => {
                //         playSoundLoop("bigWinSound", "sound/jq_sx_super_win_loop.mp3", true);
                //     });
                // }

                // if (!isMobile) {
                //     playSoundLoop("counterSound", "sound/jq_sx_counter.wav", true); //NOTE - WIN TICK UP SOUND
                //     playSoundLoop("bigWinSound", "sound/jq_sx_super_win_loop.mp3", true);
                // } else {
                //     this.props.playSound([{ name: "jq_sx_counter", loop: true, vol: 1 }]);
                //     this.props.playSound([{ name: "jq_sx_super_win_loop", loop: true, vol: 1 }]);
                // }
            }

        }
        if (value >= 0 && value >= this.bigWinAmountBondry * this.props.betList[this.props.currentBetIndex] && !this.bgBigWin) {
            // let bgSpine_desktop_collectorout = UIManager.getRef("bgSpine_desktop_collectorout");

            let bigWin_anim = UIManager.getRef("bgSpine_desktop");
            this.currentAnimation = 'bgSpine_desktop';

            // if (bigWin_anim) {
            //     bigWin_anim.visible = true;
            //     // this.props.stopSound([{ name: 'jq_sx_big_win_intro' }]);
            //     this.props.playSound([{ name: "jq_sx_big_win_intro", vol: 1, loop: false }]);
            //     this.props.playSound([{ name: "jq_sx_big_win_loop", loop: true, vol: 1 }]);
            //      bigWin_anim.children[0].state.onComplete = () => {
            //         bigWin_anim.children[0].state.setAnimation(0, "desktop_big_loop", false);
            //     }
            // }

        } else if (value >= 0 && value > this.superWinAmountBondry * this.props.betList[this.props.currentBetIndex] && !this.bgSuperWin) {

            // this.bgSuperWin = true;
            // this.currentCelebrationState = "BIGWIN";

            // let bigWin_animbig = UIManager.getRef(`bgSpine_desktop`);
            // bigWin_animbig.visible = false;
            // this.WinCollection[0].visible = false;
            // let bigwinClose = UIManager.getRef(`bgSpine_desktopclose_1`);
            // if (bigWin_animbig.visible == false) {

            //     if (bigwinClose) {
            //         bigwinClose.visible = true;
            //         bigwinClose.children[0].state.onComplete = () => {
            //             let SuperWin = UIManager.getRef("bgSpine_desktop1");
            //             this.currentAnimation = 'bgSpine_desktop1';
            //             if (SuperWin) {
            //                 (SuperWin.visible = true);                       

            //                 this.props.playSound([{ name: "jq_sx_super_win_intro", vol: 1, loop: false }]);
            //                 this.props.playSound([{ name: "jq_sx_super_win_loop", loop: true, vol: 1 }]);                          
            //                 SuperWin.children[0].state.onComplete = () => {
            //                     SuperWin.children[0].state.setAnimation(0, "desktop_huge_loop", false);
            //                 }
            //             }
            //         }
            //     }
            // }

        } else if (value >= 0 && value > this.meghaWinAmountBondry * this.props.betList[this.props.currentBetIndex] && !this.bgMegaWin) {

            // this.bgMegaWin = false;
            // this.currentCelebrationState = "BIGWIN";
            // let bigWin_animhuge = UIManager.getRef("bgSpine_desktop1");
            // bigWin_animhuge.visible = false;
            // let SuperWinCLose = UIManager.getRef("bgSpine_desktopclose_2");
            // this.WinCollection[0].visible = false;
            // this.WinCollection[1].visible = false;

            // if (SuperWinCLose) {
            //     SuperWinCLose.visible = true;
            //     SuperWinCLose.children[0].state.onComplete = () => {
            //         let megaWin = UIManager.getRef("bgSpine_desktop2");
            //         this.currentAnimation = 'bgSpine_desktop2';                
            //         megaWin.visible = true;

            //         this.props.playSound([{ name: "jq_sx_mega_win_intro", vol: 1, loop: false }]);
            //         this.props.playSound([{ name: "jq_sx_mega_win_loop", loop: true, vol: 1 }]);

            //         megaWin.children[0].state.onComplete = () => {
            //             megaWin.children[0].state.setAnimation(0, "desktop_mega_loop", false);
            //         }

            //     }
            // }
        }
        this.tickUpValue = value;
        this.onOrientationChange();
    }

    private bigWin(): void {
        this.bgBigWin = true;
        UIManager.getRef("collecter_bg").visible = true;
        UIManager.getRef("winCelebration_Graphic").visible = true;
        const tweenProps: ItweenProps = {
            duration: 0.5,
            ease: "none",
            alpha: 1,
        }
        GSAPTween.getInstance().gsapTween(UIManager.getRef("winCelebration_Graphic"), tweenProps);
        this.currentCelebrationState = "BIGWIN";

        let bigWin_anim = UIManager.getRef("bgSpine_desktop");
        this.currentAnimation = 'bgSpine_desktop';

        if (bigWin_anim) {
            bigWin_anim.visible = true;
            // GSAPTimer.getInstance().addTimer(0.5, () => {
            //     this.props.stopSound([{ name: 'jq_sx_symbol_win_1' }]);
            // })
            // !this.hasPlayed && this.props.playSound([{ name: "jq_sx_big_win_intro", vol: 1, loop: false }]);
            if (!this.props.allSoundSFXStop) {
                !this.hasPlayed && playSoundLoop("bigWinintro", "jq_sx_big_win_intro", false);
                GSAPTimer.getInstance().addTimer(2, () => {
                    stopSoundLoop("bigWinintro");
                });
            }
            bigWin_anim.children[0].state.onComplete = () => {
                // !this.hasPlayed && this.props.playSound([{ name: "jq_sx_big_win_loop", loop: true, vol: 1 }]);
                if (!this.props.allSoundSFXStop) {
                    // !this.hasPlayed && (this.bWinId = playSoundLoop("sound/jq_sx_big_win_loop.mp3", true));
                }
                bigWin_anim.children[0].state.setAnimation(0, "desktop_big_loop", false);
                this.hasPlayed = true;
            }
        }
    }

    private superWin(): void {
        this.bgSuperWin = true;
        this.currentCelebrationState = "BIGWIN";
        let bigWin_animbig = UIManager.getRef(`bgSpine_desktop`);
        bigWin_animbig.visible = false;
        this.WinCollection[0].visible = false;
        let bigwinClose = UIManager.getRef(`bgSpine_desktopclose_1`);
        if (bigWin_animbig.visible == false) {
            if (bigwinClose) {
                bigwinClose.visible = true;
                // this.props.stopSound([{ name: 'jq_sx_big_win_loop' }]);
                // stopSoundLoop(this.bWinId);
                if (!this.props.allSoundSFXStop) {
                    playSoundLoop("superWinIntro", "jq_sx_super_win_intro", false);
                }
                // this.props.playSound([{ name: "jq_sx_super_win_intro", vol: 1, loop: false }]);
                bigwinClose.children[0].state.onComplete = () => {
                    let SuperWin = UIManager.getRef("bgSpine_desktop1");
                    this.currentAnimation = 'bgSpine_desktop1';
                    if (SuperWin) {
                        (SuperWin.visible = true);
                        // this.props.playSound([{ name: "jq_sx_super_win_loop", loop: true, vol: 1 }]);
                        if (!this.props.allSoundSFXStop) {
                            // this.sWinId = playSoundLoop("sound/jq_sx_super_win_loop.mp3", true);
                        }
                        SuperWin.children[0].state.onComplete = () => {
                            SuperWin.children[0].state.setAnimation(0, "desktop_huge_loop", false);
                        }
                    }
                }
            }
        }
    }

    private megaWin(): void {
        this.bgMegaWin = false;
        this.currentCelebrationState = "BIGWIN";
        // this.props.stopSound([{ name: 'jq_sx_super_win_loop' }]);
        // stopSoundLoop(this.sWinId);
        let bigWin_animhuge = UIManager.getRef("bgSpine_desktop1");
        bigWin_animhuge.visible = false;
        let SuperWinCLose = UIManager.getRef("bgSpine_desktopclose_2");
        this.WinCollection[0].visible = false;
        this.WinCollection[1].visible = false;
        if (SuperWinCLose) {
            SuperWinCLose.visible = true;
            // this.props.playSound([{ name: "jq_sx_mega_win_intro", vol: 1, loop: false }]);
            if (!this.props.allSoundSFXStop) {
                playSoundLoop("megaWinSound", "jq_sx_mega_win_intro", false);
            }
            SuperWinCLose.children[0].state.onComplete = () => {
                let megaWin = UIManager.getRef("bgSpine_desktop2");
                this.currentAnimation = 'bgSpine_desktop2';
                // this.props.stopSound([{ name: 'jq_sx_mega_win_intro' }]);
                megaWin.visible = true;

                if (!this.props.allSoundSFXStop) {
                    // this.mWinId = playSoundLoop("sound/jq_sx_mega_win_loop.mp3", true);
                }
                // this.props.playSound([{ name: "jq_sx_mega_win_loop", loop: true, vol: 1 }]);
                megaWin.children[0].state.onComplete = () => {
                    megaWin.children[0].state.setAnimation(0, "desktop_mega_loop", false);
                }
            }
        }
    }

    playEndingSound(finishedAnimation: any) {
        let duration = 0.3;
        if (this.isClicked) {
            duration = isMobile ? 0.3 : 0.5;
        }
        if (finishedAnimation === 'bgSpine_desktopclose_1') {
            GSAPTimer.getInstance().addTimer(duration, () => {
                // this.props.stopSound([{ name: "jq_sx_big_win_loop" }]);
                // stopSoundLoop(this.bWinId);
                // this.props.playSound([{ name: "jq_sx_big_win_outro", vol: 1, loop: false }]);
                // if (this.isClicked && isMobile || this.safari) {
                //     if (!this.props.allSoundSFXStop) {
                //     }
                // }
                if (!this.props.allSoundSFXStop) {
                    playSoundLoop("bigWinOutro", "jq_sx_big_win_outro", false);
                }

            });
        }
        if (finishedAnimation === 'bgSpine_desktopclose_2') {
            GSAPTimer.getInstance().addTimer(duration, () => {
                UIManager.getRef("bgSpine_desktop").visible = false;
                UIManager.getRef("bgSpine_desktopclose_1").visible = false;
                // stopSoundLoop(this.sWinId);
                // this.props.stopSound([{ name: "jq_sx_super_win_loop" }]);
                // this.props.playSound([{ name: "jq_sx_super_win_outro", vol: 1, loop: false }]);
                // if (this.isClicked && isMobile || this.safari) {
                // }
                if (!this.props.allSoundSFXStop) {
                    playSoundLoop("megaWinOutro", "jq_sx_super_win_outro", false);
                }
            });


        }
        if (finishedAnimation === 'bgSpine_desktopclose_3') {
            GSAPTimer.getInstance().addTimer(duration, () => {
                UIManager.getRef("bgSpine_desktop").visible = false;
                UIManager.getRef("bgSpine_desktopclose_1").visible = false;
                UIManager.getRef("bgSpine_desktop1").visible = false;
                UIManager.getRef("bgSpine_desktopclose_2").visible = false;

                // this.props.stopSound([{ name: "jq_sx_mega_win_loop" }]);
                // stopSoundLoop(this.mWinId);
                // this.props.playSound([{ name: "jq_sx_mega_win_outro", vol: 1, loop: false }]);
                // if (this.isClicked && isMobile || this.safari) {
                // }
                if (!this.props.allSoundSFXStop) {
                    playSoundLoop("superWinOutro", "jq_sx_mega_win_outro", false);
                }
            });
        }
        // this.props.stopSound([{ name: "jq_sq_coin_tick_up" }]);
        // this.props.stopSound([{ name: "jq_sx_counter" }]);
        stopSoundLoop("bigWinintro");
        stopSoundLoop("superWinIntro");
        stopSoundLoop("megaWinSound");

    }

    onWinAniamtionFinished() {
        if (!this.isClicked) {
            this.playEndingSound(this.finishedAnimation);
        }
        let finishedAnimation = UIManager.getRef(this.finishedAnimation);
        let currentAnimation = UIManager.getRef(this.currentAnimation);
        UIManager.getRef(this.currentAnimation) && (currentAnimation.visible = false);

        if (finishedAnimation) {
            finishedAnimation.visible = true;
            finishedAnimation.children[0].state.onComplete = () => {
                GSAPTimer.getInstance().addTimer(0.5, () => {
                    this.onFinished();
                });
            }
        }
    }

    onFinished(): void {
        let value: number = Number((this.props.totalCreditWinAmount).toFixed(2));
        if (!this.isClicked) {
            if (value !== null) {
                value = 0;
                this.CloseScreen.call(this);
            }
        }
    }

    onTickupComplete() {
        // if (this.safari || isMobile) {
        //     this.props.stopSound([{ name: "jq_sx_counter" }]);
        // }
        let duration = 0.6;
        if (this.isClicked) {
            duration = isMobile ? 0.2 : 0.3;
        }
        this.onWinAniamtionFinished();
        stopSoundLoop("counterSound");

        GSAPTimer.getInstance().addTimer(duration, () => {
            stopSoundLoop("bigWinSound");
            // if (this.safari || isMobile) {
            //     this.props.stopSound([{ name: "jq_sx_super_win_loop" }]);
            // }
        })
    }

    // This funtion will hide buttons during big win--------------
    setVisibilityDuringBigWin() {
        // Bet-Buttons(Stake-Buttons)
        UIManager.getRef("btn_maxbet") && (UIManager.getRef("btn_maxbet").visible = false);
        UIManager.getRef("btn_minbet") && (UIManager.getRef("btn_minbet").visible = false);

        // Menu-Highlighted buttons
        UIManager.getRef("btn_game_highlighted") && (UIManager.getRef("btn_game_highlighted").visible = false);
        UIManager.getRef("btn_setting_highlighted") && (UIManager.getRef("btn_setting_highlighted").visible = false);
        UIManager.getRef("btn_history_highlighted") && (UIManager.getRef("btn_history_highlighted").visible = false);
        // Menu Buttons
        UIManager.getRef("btn_menu_close") && (UIManager.getRef("btn_menu_close").visible = false);
        UIManager.getRef("btn_gameRule") && (UIManager.getRef("btn_gameRule").visible = false);
        UIManager.getRef("btn_setting") && (UIManager.getRef("btn_setting").visible = false);
        UIManager.getRef("btn_history") && (UIManager.getRef("btn_history").visible = false);
    }

    handleEvents() {
        if (!this.isClicked) {
            this.isClicked = true;
            this.playEndingSound(this.finishedAnimation);
            this.tickUpValue = this.props.totalCreditWinAmount;
            this.UIManagerRef("Text_amount_tickup_" + this.ui_mode).objectInstance.onSkip();
            let finishedAnimation = UIManager.getRef(this.finishedAnimation);
            let currentAnimation = UIManager.getRef(this.currentAnimation);
            UIManager.getRef(this.currentAnimation) && (currentAnimation.visible = false);
            finishedAnimation && (finishedAnimation.visible = true);
            GSAPTimer.getInstance().addTimer(1.5, () => {
                this.CloseScreen();
            });
            this.props.setUpdateWinAfterWinAnimation(true);
        }
    }

    private activeWinCelebration(flg: boolean) {
        this.setVisibilityDuringBigWin();
        if (this.UIManagerRef("winCelebrationContainer")) {
            this.UIManagerRef("winCelebrationContainer").visible = flg;
        }

    }


    async removeWinCelebration(): Promise<any> {
        this.UIManagerRef("winCelebrationContainer").alpha = 1;
        return new Promise<any>(resolve => {
            const tweenProps: ItweenProps = {
                alpha: 0,
                duration: 0.5,
                ease: "none",
                onComplete: () => {
                    GSAPTween.getInstance().killTween(this.UIManagerRef("winCelebrationContainer"));
                    resolve('success')
                },
            }
            GSAPTween.getInstance().gsapTween(this.UIManagerRef("winCelebrationContainer"), tweenProps);
        });
    }


    CloseScreen() {
        this.Baseparticle.emit = false;
        this.props.stopWinPresentation();
        // this.props.stopSound([{ name: this.previousSound }]);
        if (this.playEndSound && this.props.soundIsPlaying) {
            // this.props.playSound([{ name: "winCelebrationStartSound", loop: false, vol: 0.7 }]);
            this.playEndSound = false;
        }
        this.removeWinCelebration().then((res: any) => {
            this.onCompleteFadeOut();
        });

        GSAPTimer.getInstance().addTimer(0.2, () => {
            if ((this.props.featureType === "BONUS" || this.props.featureType === "FREEGAME") || !this.props.featureJustReTriggered) {
                this.winCelebrationStart && this.nextPlayCommand();
            }
            this.props.setActiveall(true);
        });
    }

    private onCompleteFadeOut(): void {
        this.tickUpValue = 0;
        if (((this.props.balance >= this.props.coinList[this.props.selectedCoin])) || this.props.winAmount > 0) {
            this.props.setAllButtonEnable();
            !this.props.inFreeGame && this.props.spinMode(false);
        }
        else {
            if ((this.props.balance) > 0) {
                !this.props.spinStart && this.props.particularButtonEnable(true);
            }
            else {
                this.props.setAllButtonDisable();
            }
        }
        this.props.winCelebrationShow(false);
        this.props.setActiveall(true);
        this.props.removeKeyBoardEvent(false);
        this.props.winCelebrationStart(false, "Cash");
        this.props.startIncreasingCounter(true);
        this.activeWinCelebration(false);
        this.UIManagerRef("text_WinCelebration_label_" + this.ui_mode).text = "";
        this.UIManagerRef("winCelebrationContainer").alpha = 1;
        this.props.setWinCelebrationForKeyboardListener(false);
        this.props.setUpdateWinAfterWinAnimation(true);

    }

    private nextPlayCommand(): void {
        this.winCelebrationStart = false;
        this.tickUpValue = 0;
        this.props.winCelebrationShow(false);
        this.props.winCelebrationStart(false, "Cash");
        this.props.startIncreasingCounter(true);
        this.UIManagerRef("text_WinCelebration_label_" + this.ui_mode).text = "";
        this.UIManagerRef("winCelebrationContainer").alpha = 1;

        for (let i = 0; i < this.UIManagerRef("winCelebrationContainer").children.length; i++) {
            this.UIManagerRef("winCelebrationContainer").children[i].removeChildren();;
        }
        this.UIManagerRef("winCelebrationContainer").removeChildren();
        this.UIManagerRef("winCelebrationContainer").visible = false;
        this.winCelebrationContainer = {};
        this.props.setWinCelebrationForKeyboardListener(false);
        this.forNextFreegamePLay();
    }
    private forNextFreegamePLay(): void {
        this.props.winCelebrationComplete(true);
        if (!this.props.featureJustReTriggered || !this.props.inFreeGame) {
            this.props.nextAutoplay();
            this.props.nextFreegame();
        }
    }

    render() {
        if (!this.props.showWinCelebration) {
            return null
        }
        return (
            <UIManager id={"winCelebrationContainer"} name={"winCelebrationContainer"} type={"Container"} app={this.app}
                ref={i => this.winCelebrationContainer = i} alpha={0}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            app={this.app} configGame={configGame} constant={constant}
                            id={i.id} name={i.name === undefined ? 'i_name' : i.name} {...i} tickupUpdate={this.onTickupUpdate.bind(this)}
                            tickupComplete={this.onTickupComplete.bind(this)} />)
                }
            </UIManager>
        );
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'reelsState' | 'betPanelState' | 'freegameState' | 'winCelebrationState' | 'applicationState' | 'soundState' | 'basegameState' | 'behaviourState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        startWinCelebration: state.winCelebrationState.startWinCelebration,
        showAmount: state.winCelebrationState.showAmount,
        showWinCelebration: state.winCelebrationState.showWinCelebration,
        soundIsPlaying: state.soundState.soundIsPlaying,
        betList: state.basegameState.betList,
        currentBetIndex: state.basegameState.currentBetIndex,
        winAmount: state.basegameState.winAmount,
        totalCreditWinAmount: state.behaviourState.totalCreditWinAmount,
        featureJustReTriggered: state.freegameState.featureJustReTriggered,
        featureType: state.basegameState.featureType,
        balance: state.basegameState.balance,
        coinList: state.betPanelState.coinList,
        selectedCoin: state.betPanelState.selectedCoin,
        spinStart: state.reelsState.spinStart,
        currencyGroupingSeparator: state.applicationState.currencyGroupingSeparator,
        inFreeGame: state.freegameState.inFreeGame,
        basegamestate: state.basegameState.basegamestate,
        allSoundSFXStop: state.soundState.allSoundSFXStop,


    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        winCelebrationShow: (showWinCelebration: boolean): any => dispatch(winCelebrationActions.winCelebrationShow(showWinCelebration)),
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        winCelebrationStart: (startWinCelebration: boolean, showAmount: string): any => dispatch(winCelebrationActions.winCelebrationStart(startWinCelebration, showAmount)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        stopSound: (soundName: any): any => dispatch(soundActions.stopSound(soundName)),
        nextAutoplay: (): any => dispatch(baseGameAction.nextAutoplay()),
        nextFreegame: (): any => dispatch(freegameActions.nextFreegame()),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        setWinCelebrationForKeyboardListener: (winCelebrationForKeyBoardListener: boolean): any => dispatch(keyboardListenerActions.setWinCelebrationForKeyboardListener(winCelebrationForKeyBoardListener)),
        startIncreasingCounter: (counterStartIncreasing: boolean): any => dispatch(behaviourAction.startIncreasingCounter(counterStartIncreasing)),
        setActiveall: (isActiveAll: boolean): any => dispatch(baseGameAction.setActiveall(isActiveAll)),
        removeKeyBoardEvent: (isRemoveKeyBoardEvent: boolean): any => dispatch(baseGameAction.removeKeyBoardEvent(isRemoveKeyBoardEvent)),
        particularButtonEnable: (enableParticularButton: boolean): any => dispatch(buttonActions.particularButtonEnable(enableParticularButton)),
        balanceUpdateAfterSpin: (updateBalanceAfterSpin: boolean): any => dispatch(behaviourAction.balanceUpdateAfterSpin(updateBalanceAfterSpin)),
        spinMode: (inSpinMode: boolean): any => dispatch(behaviourAction.spinMode(inSpinMode)),
        winCelebrationComplete: (completeWinCelebration: boolean): any => dispatch(winCelebrationActions.winCelebrationComplete(completeWinCelebration)),
        setUpdateWinAfterWinAnimation: (updateWin: boolean): any => dispatch(behaviourAction.setUpdateWinAfterWinAnimation(updateWin)),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
    }))(withWinCelebrationConfiguration(WinCelebration)));
