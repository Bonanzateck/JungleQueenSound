import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
    baseGameAction, freegameActions, landingSymbolAction, keyboardListenerActions, winpresentationAction, buttonActions,
    reelsActions, withFlowManagerConfiguration, soundActions
} from "@bonanzainteractive/slote_core";
import { UIManager } from "@bonanzainteractive/core";

import { isMobile } from "react-device-detect";
import { constant } from "../../slot/data/config";
import { actions as winCelebrationActions } from "../../gamereducer/winCelebrationReducer";
import { actions as horizontalSymbolActions } from "../../gamereducer/horizontalSymbolReducer"
import { actions as winShowerActions } from "../../gamereducer/winShowerReducer";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import NoSleep from 'nosleep.js';
import { GSAPTimer, GSAPTween, ItweenProps } from "@bonanzainteractive/core";
import { configGame } from "../../slot/data/config";
import { playSoundLoop } from "../../core/sounds/SoundControler";


interface IProps {
    [x: string]: any;
}

interface IStore {
    [x: string]: any;
}


interface IStateToProps {
    reel_data: any,
    displayReelGridSymbolCount: Array<number>,
    callFlowManager: boolean,
    winAmount: number,
    totalCreditWinAmount: number,
    currentBetIndex: number,
    featureJustReTriggered: boolean,
    betList: Array<number>,
    featureJustFinished: boolean,
    freegameSpinCountRemaining: number,
    featureType: string,
    freegameSpinCountWin: number,
    scatterDataBeforeFG: Array<Array<number>>,
    scatterDataAnticipation: Array<Array<number>>,
    inFreeGame: boolean,
    selectedCoin: number,
    coinList: Array<number>,
    inAutoplay: boolean,
    storeAmountForAutoplay: number,
    transitionBalance: number,
    stopIfBalanceDecreasedBy: number,
    blastStart: boolean,
    playAnticipation: boolean,
    freegameSpinCount: number,
    showWinCelebration: boolean,
    showWinShower: boolean,
    basegamestate: boolean,
    autoPlayAbortOnFreeGameWinEnabled: boolean,
    suppressCelebrationForWinsBelowStake: boolean,
    balance: number,
    screenOnOff: boolean,
    layoutMode: string,
    currentVoucherSpinResult: object,
    reConstruction: boolean,
    completeWinShower: boolean,
    completeWinCelebration: boolean,
    cspStart: boolean,
    winSymbolCoOrdinate: any;
    allSpinComplete: boolean;
    winningList: any,
    allSoundSFXStop:any
}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}


interface IWinCordinateObj {
    "reelId": number,
    "rowId": number
}

class GofFlowManager extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected gofFlowManagerContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: Object[] = [];
    protected winCelebrationMinimumValue: number = 20;
    protected storePreviousFreeSpinCount: number = 0;
    protected constantT1: number = 100;
    protected constantT2: number = 2000;
    protected noSleep: any = new NoSleep();
    protected screenOnOffCheck: boolean = false;
    private UIManagerRef: any;
    protected isDirectWinAdded: boolean = false;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            uiElements: [],
            lang: "en"
        }
        this.gofFlowManagerContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }
        this.displayUI = this.props.child.filter(this.checkUiMode.bind(this));
        this.storePreviousFreeSpinCount = this.props.freegameSpinCountWin;
        this.UIManagerRef = UIManager.getRef;
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

    //this method will be called when a button gets clicked
    handleEvent(e: any) {
    }

    //when layout changes, this method will be called
    layoutChange(currentLayout: string) {
        if ((this.props.inAutoplay || this.props.inFreeGame) && this.screenOnOffCheck === false) {
            this.screenSleepOnOff(true);
        }
    }

    compare_prop_y(a: any, b: any) {
        // a should come before b in the sorted order
        if (a.y < b.y) {
            return -1;
            // a should come after b in the sorted order
        } else if (a.y > b.y) {
            return 1;
            // a and b are the same
        } else {
            return 0;
        }
    }

    startWinCelebration(nextProps: any) {
        let multiTimer = 10;
        if (nextProps.winSymbolCoOrdinate && nextProps.winSymbolCoOrdinate.length) {
            multiTimer = 1;
        }
        nextProps.winCelebrationShow(true);
        nextProps.setWinCelebrationForKeyboardListener(true);
        GSAPTimer.getInstance().addTimer(0.1, () => {
            nextProps.winCelebrationStart(true, "Cash");
        });
        nextProps.setAllButtonDisable();
    }

    showBlackScreen() {
        let graphicName: string;
        if (isMobile && window.innerWidth < window.innerHeight) {
            graphicName = "freeGameBlackScreenPortrait";
        }
        else {
            graphicName = "freeGameBlackScreen";
        }
        this.UIManagerRef(graphicName) && (this.UIManagerRef(graphicName).visible = true);
        this.UIManagerRef(graphicName) && (this.UIManagerRef(graphicName).alpha = 0);

        const tweenProps: ItweenProps = {
            alpha: 0,
            duration: 0.5,
            onComplete: () => {
                this.UIManagerRef(graphicName) && (this.UIManagerRef(graphicName).visible = false);
                GSAPTween.getInstance().killTween(this.UIManagerRef(graphicName));
            }
        }
        GSAPTween.getInstance().gsapTween(this.UIManagerRef(graphicName), tweenProps);
    }

    private winShowerForSmallWin(totalWinAmount: number): void {
        this.props.winShowerShow(true);
        if (this.props.featureJustReTriggered) {
            this.playScatterAnimations();
        }
        // GSAPTimer.getInstance().addTimer(100 / 1000, () => {
        if (totalWinAmount > 0) {
            this.props.winShowerStart(true, totalWinAmount);
            this.props.winShowerShow(false)
        } else {
            this.props.nextFreegame();
        }
        // this.props.balanceUpdateAfterSpin(true);
        // });

    }

    private winCelebrationForBigWin(nextProps: any): void {
        if (this.props.featureJustReTriggered) {
            this.playScatterAnimations();
        }
        if (this.props.inFreeGame) {
            GSAPTimer.getInstance().addTimer(1000 / 1000, () => {
                this.startWinCelebration(nextProps);
            });
        }
        else {
            this.startWinCelebration(nextProps);
        }
    }

    playLadyAnimation() {
        //     if(!isMobile){
        //     this.UIManagerRef("juqu_character_desk").visible = false;
        //     this.UIManagerRef("juqu_character_desk_trigger").visible = true;
        //     GSAPTimer.getInstance().addTimer(2.7, () => {
        //         this.UIManagerRef("juqu_character_desk").visible = true;
        //         this.UIManagerRef("juqu_character_desk_trigger").visible = false;
        //     });
        // }
    }

    queenPlayFun(): Promise<any> {
        return new Promise<any>(resolve => {
            // resolve('success');
            this.props.setQueenWinAnimation({ startQueenAnimation: true, pr: resolve });
        });
    }

    async flowStart(nextProps: any) {
        if (nextProps.winAmount > 0) {
            await this.queenPlayFun().then((res: any) => {
                this.isDirectWinAdded = false;
                nextProps.balanceUpdateAfterSpin(false);
                nextProps.stopWinPresentation();
                this.props.winCelebrationComplete(false);
                this.props.winShowerComplete(false);
                this.props.setAllButtonDisable();
                let totalWinAmount = nextProps.totalCreditWinAmount / this.constantT1;
                if (!this.props.allSoundSFXStop) {
                    if (nextProps.winningList.length) {
                        playSoundLoop("symbolWinSound", "jq_sx_symbol_win_1", false);
                    }
                }
                let storeBetValue = this.props.betList[this.props.currentBetIndex] / this.constantT1;
                let setWinParam;
                if (!this.props.suppressCelebrationForWinsBelowStake) {
                    setWinParam = true;
                } else {
                    (totalWinAmount > storeBetValue) ? setWinParam = true : setWinParam = false;
                }
                if ((nextProps.totalCreditWinAmount / this.constantT1 < this.winCelebrationMinimumValue * nextProps.betList[nextProps.currentBetIndex] / this.constantT1 && setWinParam)) {

                    this.winShowerForSmallWin(nextProps.totalCreditWinAmount);
                } else if (nextProps.totalCreditWinAmount >= this.winCelebrationMinimumValue * nextProps.betList[nextProps.currentBetIndex]) {
                    this.winCelebrationForBigWin(nextProps);
                } else {
                    this.props.setIsDirectWinAdded(true);
                    this.isDirectWinAdded = true;
                    this.nextPlayCommand(nextProps);
                    nextProps.balanceUpdateAfterSpin(true);
                    !nextProps.inFreeGame && nextProps.spinMode(false);

                    if (((this.props.balance >= this.props.coinList[this.props.selectedCoin]))) {
                        this.props.setActiveall(true);
                        this.props.setAllButtonEnable();

                    }
                    else {
                        if ((this.props.balance) > 0) {
                            nextProps.particularButtonEnable(true);
                        }
                        else {
                            nextProps.setAllButtonDisable();
                        }
                    }
                }
            });
        } else if (nextProps.featureType === "BONUS" || nextProps.featureType === "FREEGAME") {
            // this.playLadyAnimation();

            if (nextProps.featureJustReTriggered) {
                this.freegameTriggered(nextProps);
            } else {
                if (nextProps.featureJustFinished) {
                    this.freeGameToBaseGameState(nextProps);
                } else {
                    this.nextPlayCommand(nextProps);
                }
                // GSAPTimer.getInstance().addTimer(100 / 1000, () => {

                // });
            }
        }
        else {
            this.enableAllButtonAndreadyToNextcommand(nextProps);
            !nextProps.inFreeGame && nextProps.spinMode(false);
        }
    }

    private freegameTriggered(nextProps: any): void {
        this.playScatterAnimations();
        if (nextProps.freegameSpinCountWin === nextProps.freegameSpinCountRemaining) {
            GSAPTimer.getInstance().addTimer(1.5, () => {
                this.nextPlayCommand(nextProps);
            });
        }
    }
    private enableAllButtonAndreadyToNextcommand(nextProps: any): void {
        if (nextProps.featureJustFinished) {
            this.freeGameToBaseGameState(nextProps);
        } else {
            if (nextProps.inAutoplay || this.props.inAutoplay) {
                this.nextPlayCommand(nextProps);
            }
            if (((this.props.balance >= nextProps.coinList[nextProps.currentBetIndex]) || this.props.winAmount > 0)) {
                nextProps.setAllButtonEnable();
                nextProps.balanceUpdateAfterSpin(true);
            }
            else {
                if ((this.props.balance) > 0) {
                    if (nextProps.voucherIsRunning) {
                        nextProps.reConstruction ? this.props.setAllButtonDisable() : this.props.setAllButtonEnable();
                    } else {
                        nextProps.particularButtonEnable(true);
                    }
                }
                else {
                    nextProps.setAllButtonDisable();
                }
            }
        }
    }

    private nextPlayCommand(nextProps: any): void {

        let storeBetValue = this.props.betList[this.props.currentBetIndex] / this.constantT1;
        if (nextProps.featureJustFinished) {
            this.freeGameToBaseGameState(nextProps);
        } else if (!(nextProps.featureJustReTriggered && nextProps.winAmount / this.constantT1 < storeBetValue)) {
            nextProps.nextAutoplay();
            nextProps.nextFreegame();
        }
        else if (!this.props.inFreeGame || nextProps.featureJustReTriggered) {
            if (nextProps.featureJustReTriggered && this.isDirectWinAdded) {
                this.playScatterAnimations();
                GSAPTimer.getInstance().addTimer(1500 / 1000, () => {
                    nextProps.nextAutoplay();
                    nextProps.nextFreegame();

                });
            } else {
                nextProps.nextAutoplay();
                nextProps.nextFreegame();
                // this.props.playSound([{ name: "jq_mx_freegame_intro", loop: false, vol: 1 },/*  { name: "jq_mx_basegame", loop: true,  vol: 0.1 } */]);
                if (!this.props.allSoundSFXStop) {
                    playSoundLoop("jq_mx_freegame_intro", "jq_mx_freegame_intro", false);
                }
            }
        }


    }

    freeGameToBaseGameState(nextProps: any) {
        this.props.stopFreegame();
        this.showBlackScreen();
        if (!this.props.allSoundSFXStop) {
            playSoundLoop("jq_mx_freegame_outro", "jq_mx_freegame_outro", false);
        }
        // this.props.playSound([{ name: "jq_mx_freegame_outro", loop: false, vol: 1 },/*  { name: "jq_mx_freegame_music_loop", loop: true,  vol: 0.1 } */]);
        this.props.setShowOutrobanner(true);
        this.props.setOutroDone();
        if (this.props.autoPlayAbortOnFreeGameWinEnabled) {
            nextProps.stopAutoplay();
        } else if (!this.props.showWinShower) {
            nextProps.nextAutoplay();
        }

    }

    setScatterData(reelGrid: Array<Array<number>>): Array<Array<number>> {
        let scatterPositions: Array<Array<number>> = [];
        reelGrid && reelGrid.forEach((singleReelData: Array<number>, i: any) => {
            for (let j: any = 0; j < this.props.displayReelGridSymbolCount[i]; j++) {
                if (singleReelData[j] < 30) {
                    scatterPositions.push([i, j])
                }
            }
        });
        return scatterPositions;
    }

    setScatterDataInsideFG(reelGrid: Array<Array<number>>): Array<Array<number>> {
        let scatterPositions: Array<Array<number>> = [];
        let horizontalGrid: Array<number> = reelGrid[reelGrid.length - 1];
        horizontalGrid && horizontalGrid.forEach((symbolId: number, i: any) => {
            if (symbolId === 92 && i < 4) {
                scatterPositions.push([0, 3 - i])
            }
        });
        return scatterPositions;
    }

    playScatterAnimations() {
        this.props.setLandingPosition([])
        if (this.props.inFreeGame) {
            let scatterPositions: Array<Array<number>> = this.setScatterDataInsideFG(this.props.scatterDataBeforeFG);
            let reel_data = this.props.reel_data;
            scatterPositions.forEach((pos: Array<number>, i: any) => {
                let reelGrid = this.UIManagerRef("reelgrid" + pos[0]);
                reel_data.stopReels[pos[0]][pos[1]] = reelGrid.children[pos[1] + 1].symbolId;
            });
            this.props.updateReelData(reel_data);
            let symbolBgAnimList: Array<Array<number>> = scatterPositions;
            this.props.setSymbolAnimationPosition([symbolBgAnimList]);
            let wincordinate: IWinCordinateObj[] = []
            symbolBgAnimList.forEach((data: Array<number>, index: number) => {
                wincordinate.push({
                    "reelId": data[0],
                    "rowId": data[1],
                })
            })
            this.props.setWinHorizontalSymbolCoOrdinate(wincordinate);
            this.props.playSymbolAnim();
        }
        else {
            let scatterPositions: Array<Array<number>> = this.setScatterData(this.props.scatterDataBeforeFG);
            let reel_data = this.props.reel_data;
            scatterPositions.forEach((pos: Array<number>, i: any) => {
                let reelGrid = this.UIManagerRef("reelgrid" + pos[0]);
                reelGrid.children.sort(this.compare_prop_y)
                reel_data.stopReels[pos[0]][pos[1]] = reelGrid.children[pos[1] + 1].symbolId;
            });
            this.props.updateReelData(reel_data);
            let symbolBgAnimList: Array<Array<number>> = scatterPositions;
            this.props.setSymbolAnimationPosition([symbolBgAnimList]);
            let wincordinate: IWinCordinateObj[] = []
            this.props.reel_data.stopReels.forEach((data: any, reelId: number) => {
                data.forEach((symbId: any, rowId: number) => {
                    if (symbId === constant.configGame.SCATTER && rowId < constant.configGame.REEL_ROW) {
                        wincordinate.push({
                            "reelId": reelId,
                            "rowId": rowId,
                        })
                    }
                })
            })
            this.props.setWinSymbolCoOrdinate(wincordinate);
            this.props.playSymbolAnim();

        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.callFlowManager !== this.props.callFlowManager) {
            !nextProps.callFlowManager && nextProps.balanceUpdateAfterSpin(false);
            if (nextProps.callFlowManager) {
                if (nextProps.freegameSpinCount === 1) {
                    nextProps.fgFeaturetrigger(true);
                }
                let balance = nextProps.balance;
                if (((balance === 0 || balance < nextProps.betList[0] || balance + this.props.totalCreditWinAmount < nextProps.betList[0])) && !nextProps.voucherIsRunning) {
                    nextProps.visibleNoInternetPopUp(true, "noInternetPopUpText3", true, false);
                    nextProps.setAllButtonDisable();
                    nextProps.setFreezeGame(true);
                }
                //This condition will only if voucher is selected from side bar-----------
                nextProps.betList[nextProps.currentBetIndex] > balance ? nextProps.balanceIsLow(true) : nextProps.balanceIsLow(false);
                this.flowStart(nextProps);

                // nextProps.reConstruction && nextProps.setReConstruction(false);
            }
            return false;
        }

        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode)
        }
        if (nextProps.blastStart !== this.props.blastStart || nextProps.playAnticipation !== this.props.playAnticipation) {
            if (nextProps.playAnticipation && nextProps.blastStart && nextProps.blastStart !== this.props.blastStart) {
                GSAPTimer.getInstance().addTimer(2500 / 1000, () => {
                    this.playScatterAniamtion(nextProps);

                })
                GSAPTimer.getInstance().addTimer(4000 / 1000, () => {
                    this.playScatterBgAniamtion(nextProps);

                })
            }
            return false;
        }
        if (nextProps.storeAmountForAutoplay - nextProps.transitionBalance / 100 >= this.props.stopIfBalanceDecreasedBy && this.props.stopIfBalanceDecreasedBy !== -1) {
            nextProps.stopAutoplay();
        }

        if ((nextProps.completeWinShower && nextProps.completeWinShower !== this.props.completeWinShower) || (nextProps.completeWinCelebration && nextProps.completeWinCelebration !== this.props.completeWinCelebration)) {
            if (nextProps.featureJustFinished) {
                this.freeGameToBaseGameState(nextProps);
            }
        }
        if (nextProps.basegamestate && nextProps.basegamestate !== this.props.basegamestate) {
            let totalWinAmount = nextProps.totalCreditWinAmount / this.constantT1;
            let storeBetValue = this.props.betList[this.props.currentBetIndex] / this.constantT1;
            let setWinParam;
            if (!this.props.suppressCelebrationForWinsBelowStake) {
                setWinParam = true;
            }
            else {
                (totalWinAmount > storeBetValue) ? setWinParam = true : setWinParam = false;
            }
            if (nextProps.totalCreditWinAmount / this.constantT1 >= this.winCelebrationMinimumValue * nextProps.betList[nextProps.currentBetIndex] / this.constantT1) {
                //  nextProps.setAllButtonDisable();
                //this.startWinCelebration(nextProps);
            }

            else if ((nextProps.totalCreditWinAmount / this.constantT1 < this.winCelebrationMinimumValue * nextProps.betList[nextProps.currentBetIndex] / this.constantT1 && setWinParam)) {
                // nextProps.setAllButtonDisable();
                //  this.winShowerForSmallWin(totalWinAmount);
            }
        }
        if (nextProps.inFreeGame !== this.props.inFreeGame) {
            if (nextProps.inFreeGame) {
                this.props.setIsScreenOnOff(true);
            } else {
                if (!this.props.inAutoplay) {
                    this.props.setIsScreenOnOff(false);
                }
            }
        }
        if (isMobile && nextProps.screenOnOff !== this.props.screenOnOff) {
            this.screenSleepOnOff(nextProps.screenOnOff);
        }
        return false;
    }

    screenSleepOnOff(screenOnOff: boolean) {
        if (screenOnOff) {
            this.noSleep.enable();
            this.screenOnOffCheck = true;
        }
        else {
            this.noSleep.disable();
            this.screenOnOffCheck = false;
        }
    }

    private playScatterAniamtion(nextProps: any): void {
        let scatterPositions: Array<Array<number>> = this.setScatterData(nextProps.scatterDataAnticipation);
        let reel_data = this.props.reel_data;
        scatterPositions.forEach((pos: Array<number>, i: any) => {
            let reelGrid = this.UIManagerRef("reelgrid" + pos[0]);
            reelGrid.children.sort(this.compare_prop_y);
            reel_data.stopReels[pos[0]][pos[1]] = reelGrid.children[pos[1] + 1].symbolId;
        });
        this.props.updateReelData(reel_data);

        let symbolBgAnimList: any = [];
        for (let i = 0; i < 6; i++) {
            let reelsInUi = this.UIManagerRef("reelgrid" + i);
            let countOnreel = 0;
            for (let j: any = 0; j < reelsInUi.children.length; j++) {
                if (reelsInUi.children[j].symbolId > -1 && reelsInUi.children[j].symbolId < 30 && reelsInUi.children[j].y > -80 && countOnreel < this.props.displayReelGridSymbolCount[i]) {
                    symbolBgAnimList.push([i, j - 1])
                }
                if (reelsInUi.children[j].y > -80) {
                    countOnreel++;
                }
            }
        }
        this.props.setWinSymbolCoOrdinate([]);
        let wincordinate: IWinCordinateObj[] = []

        wincordinate.push({
            "reelId": 1,
            "rowId": 1,
        })
        wincordinate.push({
            "reelId": 2,
            "rowId": 0,
        })
        wincordinate.push({
            "reelId": 2,
            "rowId": 1,
        })
        this.props.setWinSymbolCoOrdinate(wincordinate);
        this.props.playSymbolAnim();
    }

    private playScatterBgAniamtion(nextProps: any): void {
        let symbolBgAnimList: any = [];
        for (let i = 0; i < 6; i++) {
            let reelsInUi = this.UIManagerRef("reelgrid" + i);
            let countOnreel = 0;
            for (let j: any = 0; j < reelsInUi.children.length; j++) {
                if (reelsInUi.children[j].symbolId > -1 && reelsInUi.children[j].symbolId < 30 && reelsInUi.children[j].y > -80 && countOnreel < this.props.displayReelGridSymbolCount[i]) {
                    symbolBgAnimList.push([i, j - 1])
                }
                if (reelsInUi.children[j].y > -80) {
                    countOnreel++;
                }
            }
        }
        this.props.setWinSymbolCoOrdinate([]);
        let wincordinate: IWinCordinateObj[] = []
        symbolBgAnimList.forEach((data: any, index: number) => {
            wincordinate.push({
                "reelId": data[0],
                "rowId": data[1],
            })
        })
        this.props.setWinSymbolCoOrdinate(wincordinate);
        this.props.playSymbolAnim();
    }

    render() {
        if (!this.props.callFlowManager) {
            return (<></>);
        }

        return (
            <UIManager id={"gofFlowManagerContainer"} type={"Container"} ref={i => this.gofFlowManagerContainer = i}
                name={"gofFlowManagerContainer"}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            id={i.id} {...i} app={this.app} configGame={configGame}
                            ClickHandler={this.handleEvent.bind(this)} />)
                }
            </UIManager>)
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'soundState'|'asyncServerAction' | 'buttonPanelState' | 'winShowerState' | 'winCelebrationState' | 'autoplayState' | 'betPanelState' | 'flowManagerState' | 'applicationState' | 'basegameState' | 'behaviourState' | 'freegameState' | 'reelgridState' | 'reelsState' | 'winpresentationState'>): IStateToProps =>
    ({
        callFlowManager: state.flowManagerState.callFlowManager,
        winAmount: state.basegameState.winAmount,
        totalCreditWinAmount: state.behaviourState.totalCreditWinAmount,
        currentBetIndex: state.basegameState.currentBetIndex,
        betList: state.basegameState.betList,
        freegameSpinCountRemaining: state.freegameState.freegameSpinCountRemaining,
        featureJustReTriggered: state.freegameState.featureJustReTriggered,
        featureType: state.basegameState.featureType,
        reel_data: state.reelsState.reel_data,
        displayReelGridSymbolCount: state.reelsState.displayReelGridSymbolCount,
        freegameSpinCountWin: state.freegameState.freegameSpinCountWin,
        featureJustFinished: state.freegameState.featureJustFinished,
        scatterDataBeforeFG: state.behaviourState.scatterDataBeforeFG,
        scatterDataAnticipation: state.behaviourState.scatterDataAnticipation,
        inFreeGame: state.freegameState.inFreeGame,
        selectedCoin: state.betPanelState.selectedCoin,
        coinList: state.betPanelState.coinList,
        inAutoplay: state.basegameState.inAutoplay,
        storeAmountForAutoplay: state.behaviourState.storeAmountForAutoplay,
        transitionBalance: state.behaviourState.transitionBalance,
        stopIfBalanceDecreasedBy: state.autoplayState.stopIfBalanceDecreasedBy,
        blastStart: state.reelsState.blastStart,
        playAnticipation: state.reelsState.playAnticipation,
        showWinCelebration: state.winCelebrationState.showWinCelebration,
        freegameSpinCount: state.freegameState.freegameSpinCount,
        showWinShower: state.winShowerState.showWinShower,
        basegamestate: state.basegameState.basegamestate,
        autoPlayAbortOnFreeGameWinEnabled: state.applicationState.autoPlayAbortOnFreeGameWinEnabled,
        suppressCelebrationForWinsBelowStake: state.applicationState.suppressCelebrationForWinsBelowStake,
        balance: state.basegameState.balance,
        screenOnOff: state.buttonPanelState.screenOnOff,
        layoutMode: state.applicationState.layoutMode,
        currentVoucherSpinResult: state.asyncServerAction.currentVoucherResult,
        reConstruction: state.basegameState.reConstruction,
        completeWinShower: state.winShowerState.completeWinShower,
        completeWinCelebration: state.winCelebrationState.completeWinCelebration,
        cspStart: state.reelgridState.cspStart,
        winSymbolCoOrdinate: state.winpresentationState.winSymbolCoOrdinate,
        allSpinComplete: state.reelsState.allSpinComplete,
        winningList: state.reelsState.winningList,
        allSoundSFXStop: state.soundState.allSoundSFXStop,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        stopSound: (soundName: any): any => dispatch(soundActions.stopSound(soundName)),
        setApplicationToBaseGameState: (basegamestate: boolean): any => dispatch(baseGameAction.setApplicationToBaseGameState(basegamestate)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        nextAutoplay: (): any => dispatch(baseGameAction.nextAutoplay()),
        nextFreegame: (): any => dispatch(freegameActions.nextFreegame()),
        winCelebrationStart: (startWinCelebration: boolean, showAmount: string): any => dispatch(winCelebrationActions.winCelebrationStart(startWinCelebration, showAmount)),
        winCelebrationShow: (showWinCelebration: boolean): any => dispatch(winCelebrationActions.winCelebrationShow(showWinCelebration)),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        setWinSymbolCoOrdinate: (winSymbolCoOrdinate: any): any => dispatch(winpresentationAction.setWinSymbolCoOrdinate(winSymbolCoOrdinate)),
        playSymbolAnim: (): any => dispatch(winpresentationAction.playSymbolAnim()),
        setSymbolAnimationPosition: (symbolAnimationPosition: any): any => dispatch(winpresentationAction.setSymbolAnimationPosition(symbolAnimationPosition)),
        updateReelData: (result_reel: any): any => dispatch(reelsActions.updateReelData(result_reel)),
        setWinHorizontalSymbolCoOrdinate: (winSymbolCoOrdinate: any): any => dispatch(horizontalSymbolActions.setWinSymbolCoOrdinate(winSymbolCoOrdinate)),
        stopFreegame: (): any => dispatch(freegameActions.stopFreegame()),
        winShowerStart: (startWinShower: boolean, winShowerAmount: number): any => dispatch(winShowerActions.winShowerStart(startWinShower, winShowerAmount)),
        winShowerShow: (showWinShower: boolean): any => dispatch(winShowerActions.winShowerShow(showWinShower)),
        stopAutoplay: (): any => dispatch(baseGameAction.stopAutoplay()),
        setWinCelebrationForKeyboardListener: (winCelebrationForKeyBoardListener: boolean): any => dispatch(keyboardListenerActions.setWinCelebrationForKeyboardListener(winCelebrationForKeyBoardListener)),
        fgFeaturetrigger: (featureTriggered: boolean): any => dispatch(behaviourAction.FgFeaturetrigger(featureTriggered)),
        particularButtonEnable: (enableParticularButton: boolean): any => dispatch(buttonActions.particularButtonEnable(enableParticularButton)),
        setLandingPosition: (landingPosition: any): any => dispatch(landingSymbolAction.setLandingPosition(landingPosition)),
        setIsScreenOnOff: (screenOnOff: boolean): any => dispatch(buttonActions.setIsScreenOnOff(screenOnOff)),
        setActiveall: (isActiveAll: boolean): any => dispatch(baseGameAction.setActiveall(isActiveAll)),
        visibleNoInternetPopUp: (noInternetPopupVisible: boolean, text: string, closeButton: boolean, continueButton: boolean): any => dispatch(behaviourAction.visibleNoInternetPopUp(noInternetPopupVisible, text, closeButton, continueButton)),
        setFreezeGame: (freezeGame: boolean): any => dispatch(buttonActions.setFreezeGame(freezeGame)),
        setIsDirectWinAdded: (isDirectWinAdded: boolean): any => dispatch(baseGameAction.setIsDirectWinAdded(isDirectWinAdded)),
        setReConstruction: (reConstruction: boolean): any => dispatch(baseGameAction.setReConstruction(reConstruction)),
        balanceUpdateAfterSpin: (updateBalanceAfterSpin: boolean): any => dispatch(behaviourAction.balanceUpdateAfterSpin(updateBalanceAfterSpin)),
        spinMode: (inSpinMode: boolean): any => dispatch(behaviourAction.spinMode(inSpinMode)),
        balanceIsLow: (balanceLow: boolean): any => dispatch(behaviourAction.balanceIsLow(balanceLow)),
        winShowerComplete: (completeWinShower: boolean): any => dispatch(winShowerActions.winShowerComplete(completeWinShower)),
        winCelebrationComplete: (completeWinCelebration: boolean): any => dispatch(winCelebrationActions.winCelebrationComplete(completeWinCelebration)),
        setOutroDone: (): any => dispatch(freegameActions.setOutroDone()),
        setShowOutrobanner: (showOutroBanner: boolean): any => dispatch(freegameActions.setShowOutrobanner(showOutroBanner)),
        setQueenWinAnimation: (data: any): any => dispatch(behaviourAction.setQueenWinAnimation(data)),


    }))(withFlowManagerConfiguration(GofFlowManager)));
