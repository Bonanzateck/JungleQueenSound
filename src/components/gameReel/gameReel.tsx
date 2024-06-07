import React, { Component } from "react";
import withGameReelConfiguration from "../gameReel/configuration/withGameReelConfiguration";
import * as PIXI from "pixi.js";
import { Symbol } from "@bonanzainteractive/slote_core";
import { withPixiApp } from "@inlet/react-pixi";
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { GSAPTween, ItweenProps, UIManager } from "@bonanzainteractive/core";
import { winpresentationAction } from "@bonanzainteractive/slote_core";
import { reelsActions, symbolActions, landingSymbolAction, flowManagerAction } from "@bonanzainteractive/slote_core";
import { baseGameAction, freegameActions } from "@bonanzainteractive/slote_core";
import { GSAPTimer } from "@bonanzainteractive/core";
import { GameReelBaseState } from "./configuration/gameReelBaseState";
import { actions as paytableAction } from "../../gamereducer/paytableBMReducer";
import { soundActions } from "@bonanzainteractive/slote_core";
import { constant } from "../../slot/data/config";
import { playSoundLoop } from "../../core/sounds/SoundControler";



interface IStore {
    [x: string]: any;
}
interface IProps {
    [x: string]: any;
}
export interface IStateToProps {
    reel_data: any
    winningList: any
    stoppingReel: number
    isSpinning: boolean
    spinStart: boolean
    spinStop: boolean
    spinResponseReceived: boolean,
    reelStrips: any,
    stopable: any,
    currentReelStripIndex: number,
    countStopReels: any,
    cspStart: boolean,
    InTurboMode: boolean,
    slamActivate: boolean,
    isSlamSpin: boolean,
    mysteryCoinList: any;
    level: number;
    inFreeGame: boolean,
    winSymbolCoOrdinate: any,
    coinQueenWins: any;
    transformTo: Number,
    landingAnimPositions: any,
    allSoundSFXStop:any
}

interface IDispatchToProps {
}
interface IState {
    symbolList: any
    stickysymbolList: any
}
class GameReel extends GameReelBaseState {
    protected coinText: any;
    private duplicateArr: number[] = [];
    onGamePause() {
        this.gamePause = true;
        this.then = performance.now();
        this.coinText = {};
    }

    onServerReelStop() {
        this.serverResponseReceived = true;
    }

    componentDidMount() {
        const reel = {
            container: this.getSubReelContainer(),
            Id: this.props.ReelIndex,
            symbols: [],
            position: 0,
            previousPosition: 0,
        };


        this.props.reelList.push(reel);
        if (this.props.reelList.length > 5) {
            this.props.reelList.shift(reel);
        }
        this.randomizeSymbols(reel);
        this.addTextOnSymbol();
        this.duplicateArr = [];
    }
    shuffleArry(array: number[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    setReelStripData(gameLevel: number) {
        if (gameLevel === -1) {
            gameLevel = 0;
        }
        let reelStrip: any = [];
        for (let i = 0; i < 25; i++) {
            let randomStrip = Math.floor(Math.random() * (14 - gameLevel) + gameLevel);
            if (randomStrip) {
                reelStrip[i] = randomStrip;
            }
        }
        // this.props.setReelStrips([[reelStrip, reelStrip, reelStrip, reelStrip, reelStrip]]);
        this.props.setReelStrips([[this.shuffleArry(reelStrip), this.shuffleArry(reelStrip), this.shuffleArry(reelStrip), this.shuffleArry(reelStrip), this.shuffleArry(reelStrip)]]);
        this.props.setReelStripsIndex(0);
    }
    async addTextOnSymbol() {
        this.coinText = {};
        const animationCoinInfo: any = [];
        for (const data of this.props.coinQueenWins) {
            for (const innerdata of data.coinWinPositions) {
                animationCoinInfo.push({
                    symbolRow: innerdata.rowId,
                    symbolColumn: innerdata.reelId,
                    symbolId: data.payId,
                    coinNum: data.coinNum
                });
            }
        }
        if (animationCoinInfo.length > 0) {
            const listOfQueenAnimation = this.removeDuplicateCordinate(animationCoinInfo);
            listOfQueenAnimation.map((data: any, i: any) => {
                const sym_name = `${data.symbolColumn}_${data.symbolRow}`;
                const priceString = data.coinNum;
                const regex = /£(\d+(\.\d{1,2})?)/; // Regular expression to match the numeric part
                const match = priceString.match(regex);
                if (match) {
                    const priceNumber = match[1];
                    this.coinText[sym_name] = priceNumber;
                }
            });

            //!SECTION
            for await (let i of this.range(0, 5)) {
                const reel = UIManager.getRef("reel" + Number(i));
                reel.children && this.showSymbolTextByReel(reel, i);
            }
        }
    }

    range(start: number, end: number, step = 1) {
        let output = [];
        if (typeof end === 'undefined') {
            end = start;
            start = 0;
        }
        for (let i = start; i < end; i += step) {
            output.push(i);
        }
        return output;
    }

    setTextWidth(text: any) {
        // const amountNumber = parseFloat(text._text.slice(1).replace(/,/g, ""));
        const amountNumber = text._text;
        if (amountNumber < 10) {
            text._fontSize = 80;
        } else if (amountNumber < 99) {
            text._fontSize = 75;
        } else if (amountNumber < 999) {
            text._fontSize = 65;
        } else if (amountNumber < 9999) {
            text._fontSize = 55;
        } else if (amountNumber < 99999) {
            text._fontSize = 50;
        } else if (amountNumber < 999999) {
            text._fontSize = 40;
        } else if (amountNumber < 9999999) {
            text._fontSize = 35;
        } else {
            text._fontSize = 25;
        }
    }

    showSymbolTextByReel(reel: any, rowID: any, isOnload: boolean = false) {
        for (let i: number = 0; i < reel.children.length; i++) {
            if (reel.children[i].children && reel.children[i].children[1]) {
                const symbolChild = reel.children[i].children;
                if (symbolChild && symbolChild[1] && this.coinText[`${rowID}_${i}`] > 0) {
                    symbolChild[1].text = this.coinText[`${rowID}_${i}`];
                    this.setTextWidth(symbolChild[1]);
                }
            }
        }
    }

    private removeDuplicateCordinate(listOfQueenAnimation: any): Array<object> {
        let uniqueArr: any[] = [];
        listOfQueenAnimation.forEach((parentelement: any) => {
            let isDuplicateValue: boolean = false;
            uniqueArr.forEach((childelement: any) => {
                if (JSON.stringify(parentelement) === JSON.stringify(childelement)) {
                    isDuplicateValue = true;
                }
            });
            if (!isDuplicateValue) {
                uniqueArr.push(parentelement);
            }
        });
        return uniqueArr;
    }

    // This Function will play scatter landing, Wild symbol and Reel stop sound
    reelStopSound(reels: any) {
        if ((this.props.InTurboMode && this.props.ReelIndex > 0 && this.props.level < 1) || (this.props.ReelIndex > 0 && this.props.isSlamSpin)) {
            return
        }
        if (!this.props.inFreeGame && !this.props.InTurboMode) {
            if (Number(this.REEL_STOPS[this.props.ReelIndex][0]) === constant.configGame.SCATTER || Number(this.REEL_STOPS[this.props.ReelIndex][1]) === constant.configGame.SCATTER || Number(this.REEL_STOPS[this.props.ReelIndex][2]) === constant.configGame.SCATTER) {
                // this.props.playSound([{ name: "jq_sx_scatter_landing", loop: false, vol: 1 }]);

                if (!this.props.allSoundSFXStop) {
                    playSoundLoop("jq_sx_scatter_landing", "jq_sx_scatter_landing", false);
                }
            }
            else if (Number(this.REEL_STOPS[this.props.ReelIndex][0]) === 0 || Number(this.REEL_STOPS[this.props.ReelIndex][1]) === 0 || Number(this.REEL_STOPS[this.props.ReelIndex][2]) === 0) {
                // this.props.playSound([{ name: "jq_sx_wild_landing", loop: false, vol: 1 }]);

                if (!this.props.allSoundSFXStop) {
                    playSoundLoop("jq_sx_wild_landing", "jq_sx_wild_landing", false);
                }
            } else {
                // this.props.playSound([{ name: "jq_sx_reel_stop", loop: false, vol: 0.5 }]);
                if (!this.props.allSoundSFXStop) {
                    playSoundLoop("jq_sx_reel_stop", "jq_sx_reel_stop", false);
                }
            }
        } else {
            if (Number(this.REEL_STOPS[this.props.ReelIndex][0]) === 0 || Number(this.REEL_STOPS[this.props.ReelIndex][1]) === 0 || Number(this.REEL_STOPS[this.props.ReelIndex][2]) === 0) {
                // this.props.playSound([{ name: "jq_sx_wild_landing", loop: false, vol: 1 }]);
                if (!this.props.allSoundSFXStop) {
                    playSoundLoop("jq_sx_wild_landing", "jq_sx_wild_landing", false);
                }
            }
            // this.props.playSound([{ name: "jq_sx_reel_stop", loop: false, vol: 0.5 }]);
            if (!this.props.allSoundSFXStop) {
                playSoundLoop("jq_sx_reel_stop", "jq_sx_reel_stop", false);
            }
        }

    }



    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.isSpinning !== this.props.isSpinning
            || nextProps.spinStart !== this.props.spinStart
            || nextProps.spinResponseReceived !== this.props.spinResponseReceived
            || nextProps.stoppingReel !== this.props.stoppingReel
            || nextProps.countStopReels !== this.props.countStopReels
            || nextProps.cspStart !== this.props.cspStart
            || nextProps.isSlamSpin !== this.props.isSlamSpin
            || nextProps.reel_data !== this.props.reel_data
            || nextProps.gamePause !== this.props.gamePause
            || nextProps.winSymbolCoOrdinate.length !== this.props.winSymbolCoOrdinate.length
        ) {
            if (nextProps.reel_data !== this.props.reel_data) {
                if (nextProps.reel_data) {
                    let array = nextProps.data.STOPABLE
                    for (let n = 0; n < this.props.reelList.length; n++) {
                        array[n] = false
                    }
                    this.props.setReelStopable(array);
                    this.REEL_STOPS = nextProps.reel_data.stopReels;
                }
            }

            if (nextProps.gamePause !== this.props.gamePause) {
                if (!nextProps.gamePause) {
                    this.onGameResume();
                } else {
                    this.onGamePause();
                }
            }


            if (nextProps.spinResponseReceived) {
                this.onServerReelStop();
            }
            if (nextProps.isSlamSpin && nextProps.isSlamSpin !== this.props.isSlamSpin) {
                this.isSlamClicked = true;
                return false;
            }
            if (nextProps.spinStart && nextProps.spinStart != this.props.spinStart) {
                this.props.data.inSpinning = false;
                // if (nextProps.ReelIndex === nextProps.data.REEL_COLUMN - 1) {
                //     !this.props.InTurboMode && this.props.playSound([{ name: "jq_sx_reel_spin_loop", vol: 0.2, loop: false }]);
                // }
                if (nextProps.ReelIndex === nextProps.data.REEL_COLUMN - 1) {
                    this.props.data.inSpinning = true;
                }
                this.spinStartAfterResponse(nextProps);
                // if (nextProps.ReelIndex === constant.configGame.REEL_COLUMN - 1) {
                //     this.changeSpeed();
                // }
                this.spinSpeed = constant.configGame.generalReelSpeed;
                return false;
            }
            if (nextProps.cspStart && nextProps.cspStart !== this.props.cspStart) {
                this.props.data.REELSTIMERSFORQUICKSPIN[0] = nextProps.InTurboMode;
                this.spinSpeed = constant.configGame.generalReelSpeed;
                if (nextProps.ReelIndex === nextProps.data.REEL_COLUMN - 1) {
                    this.setReelStripData(1)
                    // !this.props.InTurboMode && this.props.playSound([{ name: "jq_sx_reel_spin_loop", vol: 0.2, loop: false }]);
                }
                this.showSymbols(nextProps)
                this.props.data.REELSTIMERS[nextProps.ReelIndex] = new Promise((resolve, reject) => {
                    resolve(nextProps.ReelIndex)
                });
                this.props.data.TIMERS = [];
                this.resetAll();
                if (nextProps.InTurboMode) {
                    this.customSpinSymbolCount[nextProps.ReelIndex] = 0;
                    this.totalSpinSymbolLength = this.turbospinSymbolLength;
                }
                nextProps.setSpinComplete(false);
                this.onReelSpinStart(nextProps);

                return false;
            }


            if (nextProps.winSymbolCoOrdinate.length && nextProps.winSymbolCoOrdinate.length !== this.props.winSymbolCoOrdinate.length) {
                if (nextProps.ReelIndex === 4) {
                    let animationInfo: any[] = [];
                    nextProps.winSymbolCoOrdinate.forEach((data: any, index: number) => {
                        animationInfo.push({
                            rowId: data.rowId,
                            reelId: data.reelId,
                            symbolId: nextProps.reel_data.stopReels[data.reelId][data.rowId]
                        })
                    })
                    this.hideReelSymbols(nextProps, animationInfo);
                }
            }
            if (nextProps.stoppingReel == nextProps.ReelIndex && nextProps.stoppingReel != this.props.stoppingReel) {
                this.spinSymbolCount = 0;
                let array = this.props.data.STOPABLE;
                array[nextProps.ReelIndex] = true
                this.countStopReel = nextProps.ReelIndex;
                this.props.setReelStopable(array)
            }


            if (nextProps.countStopReels === nextProps.data.REEL_COLUMN) {
                this.props.setStoppedReel(-1);

                Promise.all([this.props.data.REELSTIMERS[0], this.props.data.REELSTIMERS[1], this.props.data.REELSTIMERS[2],
                this.props.data.REELSTIMERS[3], this.props.data.REELSTIMERS[4]
                ]).then((values) => {
                    this.props.data.REELSTIMERS = [];
                    this.delayforscatterAnimation().then((res: any) => {
                        // this.props.stopSound([{ name: "jq_sx_reel_stop" }]);
                        // this.props.stopSound([{ name: "jq_sx_anticipation" }]);
                        this.onReelMotionFinished(nextProps);

                    });


                });
            }
            return false;
        }
        return false;
    }

    async delayforscatterAnimation() {
        UIManager.getRef("anticipation_Scatter") && (UIManager.getRef("anticipation_Scatter").visible = false);
        UIManager.getRef("anticipation_Scatter2") && (UIManager.getRef("anticipation_Scatter2").visible = false);
        let duration: any;
        if (this.props.InTurboMode) {
            duration = this.checkScatterSymbolsForTeaser() ? 0.1 : 0.1;
        } else {
            duration = this.checkScatterSymbolsForTeaser() ? .1 : 0.1;
        }
        return new Promise<any>(resolve => {
            GSAPTimer.getInstance().addTimer(duration, () => {
                resolve('success')
            });

        });
    }


    private hideReelSymbols(nextProps: any, WINNINGSYMBOLS: any): void {
        WINNINGSYMBOLS.forEach((data: any) => {
            if (data) {
                let reels = this.props.reelList[data.reelId];
                let symbolContainer = reels.symbols[data.rowId + 1].COMPONENT;
                symbolContainer.symbolId !== constant.configGame.SCATTER && (symbolContainer.visible = false);
            }
        })
    }
    private showSymbols(nextProps: any): void {
        let gridSymbols = nextProps.reelList[nextProps.ReelIndex].symbols;
        let reels = nextProps.reelList[nextProps.ReelIndex];
        for (let j = 0; j < reels.symbols.length; j++) {
            let symbolContainer = gridSymbols[j].COMPONENT;
            symbolContainer.visible = true;
        }
    }



    async spinStartAfterResponse(nextProps: any) {
        if (constant.configGame.isReconstruction) {
            this.startSpinByForce(nextProps);
        }
        else {
            Promise.all([this.props.data.REELSTIMERS[0], this.props.data.REELSTIMERS[1], this.props.data.REELSTIMERS[2],
            this.props.data.REELSTIMERS[3], this.props.data.REELSTIMERS[4]
            ]).then((values) => {
                this.startSpinByForce(nextProps);
            });
        }
    }

    private startSpinByForce(nextProps: any): void {
        if (constant.configGame.isReconstruction) {
            this.onReelSpinStart(nextProps);
        } else {
            let symbolIds = this.REEL_STOPS[this.props.ReelIndex];
            this.symbolsToDisplay = symbolIds;
            for (let i = 0; i < this.symbolsToDisplay.length; i++) {
                this.symbolsToDisplay[i] = this.symbolsToDisplay[i] - this.symbolNumberOffset;
            }
        }
        this.storeReelStopFunction(nextProps);

    }
    /*
     Here store the all stop reels 
     and calling one by one 
     this shluld be after getting response 
     */
    private storeReelStopFunction(nextProps: any): void {
        // this.props.setNextReelStoppedId(nextProps.ReelIndex);
        // let array = nextProps.data.STOPABLE
        // for (let n = 0; n < this.props.reelList.length; n++) {
        //     array[n] = false
        // }
        // this.props.setReelStopable(array);
        // if (nextProps.stopable == 0) {
        //     for (let i = 0; i < this.props.reelList.length; i++) {
        //         array[i] = false;
        //     }
        // } else {
        //     array = nextProps.stopable;
        // }
        this.onGeneralReelStop(nextProps, nextProps.ReelIndex);
        let turboMode = this.props.InTurboMode && this.props.level > 0 && !nextProps.inFreeGame ? true : !this.props.InTurboMode;

        if (nextProps.ReelIndex === this.props.data.REEL_COLUMN - 1 && turboMode) {
            this.stopReelOneByOne();
        }
    }

    onReelMotionFinished(nextProps: any): void {
        this.props.resetLandingAnim();
        this.props.setSlamSpin(false);
        cancelAnimationFrame(this.tickupRequest);
        this.onResetGrid(nextProps);
        nextProps.setSpinComplete(true);
        nextProps.isSkipWin(false);
        nextProps.setStartSpinBySpaceBar(false)
        this.cancelledAllRequest();
        this.onFinished(nextProps);
        if (nextProps.winningList.length == 0) {
            this.props.stopWinPresentation();
        }
    }
    onFinished(nextProps: any) {
        let reslt: any = constant.configGame.Result
        this.props.setCspStart(false);

        this.props.data.REELSTIMERSFORQUICKSPIN[0] = this.props.InTurboMode;
        if (nextProps.mysteryCoinList.length <= 0 && nextProps.winningList.length === 0) {
            GSAPTimer.getInstance().addTimer(0.350, () => {
                this.props.flowManagerCalled(true);

            });
        }
        if (reslt.state.status === "FREESPINS_TRIGGER") {
            // this.props.playSound([{ name: "jq_sx_freegame_trigger", loop: false, vol: 0.7 }]);

            if (!this.props.allSoundSFXStop) {
                playSoundLoop("jq_sx_freegame_trigger", "jq_sx_freegame_trigger", false, 0.7);
            }
        }

    }

    protected cancelledAllRequest(): void {
        cancelAnimationFrame(this.tickupRequest);
        while (this.props.data.FRAMEANIMATIONREQUEST.length) {
            let req = this.props.data.FRAMEANIMATIONREQUEST.pop();
            window.cancelAnimationFrame(req);
            req = '';
        }
        this.props.data.FRAMEANIMATIONREQUEST = [];

    }


    onResetGrid(PROPS: any) {
        PROPS.setWinSymbolCoOrdinate([]);
        let gridSymbols = PROPS.reelList[this.props.ReelIndex].symbols;
        for (let i = this.popDropSymbols.length - 1; i >= 0; i--) {
            gridSymbols.push(this.popDropSymbols[i]);
        }
        this.popDropSymbols = [];
        PROPS.app.ticker.remove(this.tick);

    }

    getSubReelContainer() {
        return this.subReelContainer;
    }

    onReelSpinStart(nextProps: any) {

        this.props.setNextReelStoppedId(nextProps.ReelIndex);
        let array = nextProps.data.STOPABLE
        for (let n = 0; n < this.props.reelList.length; n++) {
            array[n] = false
        }
        this.props.setReelStopable(array);
        if (nextProps.stopable == 0) {
            for (let i = 0; i < this.props.reelList.length; i++) {
                array[i] = false;
            }
        } else {
            array = nextProps.stopable;
        }


        if (this.reelRunning) return;
        this.stopTick = false;
        this.setSymbolFinalPosition = false;
        this.popSymbols = [];
        this.props.stopWinPresentation();
        this.reelStripSymbolIndex = Math.floor(Math.random() * (this.props.reelStrips[this.props.currentReelStripIndex][this.props.ReelIndex].length - 1) + 1);
        this.spinAndDisplay(nextProps, this.REEL_STOPS[this.props.ReelIndex], this.props.ReelIndex === 0 ? true : false, true, false, this.symbolsBetweenStop)
    }



    reelsComplete() {
        // this.stopReelOneByOne();
        this.props.setSpinning(false);
        this.reelRunning = false;
        let reels = this.props.reelList[this.props.ReelIndex];
        this.reelStopSound(reels);
        this.props.setStoppedReel(this.props.ReelIndex);
        this.props.playLandingAnim();
        this.setLandingAnimationVisibility(this.props.ReelIndex)
        this.props.app.ticker.remove(this.tick);
        let symbolWiseHeight: any = []
        let symbolsCount = this.symbolHeightMappingList.map((data: any) => {
            symbolWiseHeight.push(data.height);
        })

        let symbolslist = reels.symbols;
        for (let i = 0; i < symbolslist.length; i++) {
            let symbol = symbolslist[i];
            symbol.gridPosition = i;
            symbol.rowId = i;
            symbol.reelId = symbol.reelId;
            symbol.COMPONENT.gridPosition = i;
            symbol.COMPONENT.rowId = i;
            symbol.COMPONENT.reelId = symbol.reelId;
        }
        if (this.props.winningList.length == 0) {
            cancelAnimationFrame(this.tickupRequest);
        }
        this.props.data.REELSTIMERS[this.props.ReelIndex] = new Promise((resolve, reject) => {
            resolve(this.props.ReelIndex)
        });

        GSAPTimer.getInstance().addTimer(0.1, () => {
            if (this.props.ReelIndex === 4) {
                // this.props.stopSound([{ name: "jq_sx_reel_stop" }]);
                // this.props.stopSound([{ name: "jq_sx_anticipation" }]);
                // this.props.stopSound([{ name: "jq_sx_reel_spin_loop" }]);
            }
        });
    }

    spinAndDisplay(nextProps: any, symbolIds: any, stopable: boolean, forward: boolean, substitute: boolean, reelStopDifference: number) {
        this.symbolsToDisplay = symbolIds || [];
        for (let i = 0; i < this.symbolsToDisplay.length; i++) {
            this.symbolsToDisplay[i] = this.symbolsToDisplay[i] - this.symbolNumberOffset;
        }
        let arr = [10, 14, 18, 22, 26, 30]
        this.totalSpinSymbolLength = this.spinSymbolLength;
        // this.totalSpinSymbolLength =arr[nextProps.ReelIndex]

        if (this.spinning === false) {
            this.spinning = true;
            if (forward !== null) {
                if (forward === true) {
                    this.startWind(nextProps);
                } else {
                    this.startWindBackwards();
                }
            } else {
                this.startWind(nextProps);
            }
            this.enabled = true;
        }
    }

    startWindBackwards() {
        this.reelstate = GameReel.REEL_STATE_WINDING_BACKWARDS;
    }

    startWind(nextProps: any) {
        this.reelstate = GameReel.REEL_STATE_WINDING;
        this.tick.call(this);
    }


    private onGeneralReelStop(nextProps: any, n: number): void {
        const callBack = () => {
            this.stopReelIndexByForce[n] = 1;
            for (let k = 0; k <= n; k++) {
                this.customSpinSymbolCount[k] = 0;
                let array = nextProps.data.STOPABLE;
                array[k] = true;
                this.countStopReelByIndex[k] = k;
                nextProps.setReelStopable(array);
            }
            nextProps.data.REELSNO = nextProps.data.REELSNO + 1;
            //  this.stopReelOneByOne();
        }
        nextProps.data.CALLBACKSTORE[nextProps.ReelIndex] = callBack;
    }

    private checkScatterSymbols(): boolean {
        let scaterFound: boolean = false;
        if (!this.props.inFreeGame) {
            if (Number(this.REEL_STOPS[0][0]) === constant.configGame.SCATTER || Number(this.REEL_STOPS[0][1]) === constant.configGame.SCATTER || Number(this.REEL_STOPS[0][2]) === constant.configGame.SCATTER) {
                if (Number(this.REEL_STOPS[2][0]) === constant.configGame.SCATTER || Number(this.REEL_STOPS[2][1]) === constant.configGame.SCATTER || Number(this.REEL_STOPS[2][2]) === constant.configGame.SCATTER) {
                    scaterFound = true;
                }
            }

        }
        return scaterFound;
    }

    /* 
   store timer will execute one by one 
   if slam button clicked then all times will execute one by one  
  */
    private stopReelOneByOne(isSlam: boolean = false): void {
        if (this.props.data.CALLBACKSTORE.length && !this.props.isSlamSpin) {
            let duration = this.props.data.REELSNO === 0 ? 0.4 : 100;
            if (this.props.level > 0 && !this.props.inFreeGame) {
                duration = this.props.data.REELSNO === 0 ? duration = this.props.level * 2 : 0.2;
            }
            if (this.checkScatterSymbols() && !this.props.isSlamSpin && !this.props.InTurboMode) {
                duration = this.props.data.REELSNO === 4 ? 2 : duration;
                if (this.props.data.REELSNO === 4) {
                    UIManager.getRef("anticipation_Scatter").visible = true;
                    UIManager.getRef("anticipation_Scatter2").visible = true;
                    // this.props.playSound([{ name: "jq_sx_anticipation", loop: false, vol: 1 }]);

                    if (!this.props.allSoundSFXStop) {
                        playSoundLoop("jq_sx_anticipation", "jq_sx_anticipation", false);
                    }
                }
            }
            duration = isSlam ? 0.1 : duration;
            if (duration === 100) {
                let pops = this.props.data.CALLBACKSTORE.shift();
                pops();
                return;
            }
            GSAPTimer.getInstance().addTimer(duration, () => {
                // if (!this.props.isSlamSpin) {
                if (this.props.data.CALLBACKSTORE.length) {
                    let pops = this.props.data.CALLBACKSTORE.shift();
                    if (typeof pops === 'function') {
                        if (this.props.level > 0 && UIManager.getRef("common_bgGraphic_for_feature")) {
                            const tweenProps: ItweenProps = {
                                alpha: 0,
                                duration: 0.6,
                                ease: "none"
                            }
                            GSAPTween.getInstance().gsapTween(UIManager.getRef("common_bgGraphic_for_feature"), tweenProps);
                        }
                        pops();
                    }

                }

            });
        }

    }

    private stopByQuickSpin(): void {
        GSAPTimer.getInstance().addTimer(0.1, () => {
            while (this.props.data.CALLBACKSTORE.length) {
                let pops = this.props.data.CALLBACKSTORE.shift();
                if (typeof pops === 'function') {
                    pops();
                }
            }
        });
    }

    startWobbleDown(symbolId: number, symbol: any) {
        this.addSymbolToStart(false, symbolId, symbol, true);
        this.currentWobbleHeight = 0;
        this.reelstate = GameReel.REEL_STATE_WOBBLE_DOWN;
    }

    positionSymbolAtIndex(symbol: any, index: number) {
        symbol.COMPONENT.y = symbol.COMPONENT.height * index - (symbol.COMPONENT.offsetY * index);
        if (symbol.COMPONENT.y === 242) {
            symbol.COMPONENT.y = 250;
        } else if (symbol.COMPONENT.y === 484) {
            symbol.COMPONENT.y = 500;
        }
        symbol.COMPONENT.y += this.yOffset;// + 244;Y_OFFSET

    }

    repositionSymbols() {
        this.setSymbolFinalPosition = true;
        let reels = this.props.reelList[this.props.ReelIndex];

        let symbols = reels.symbols;
        let offset = 0;
        if (symbols.length > this.symbolInViewCount) {
            offset = this.symbolInViewCount - symbols.length;
        }
        for (let i = 0; i < symbols.length; i++) {
            this.positionSymbolAtIndex(symbols[i], i + offset);
        }
    }

    stopSpin() {
        this.removeSymbolFromEnd();
        this.repositionSymbols();
    }

    removeSymbolFromEnd() {
        let reels = this.props.reelList[this.props.ReelIndex];
        if (reels) {
            const r = reels;
            let symbol = r.symbols.pop();
            if (this.setSymbolFinalPosition) {
                this.popSymbols.push(symbol)
            }
        }
    }

    addSymbolToStart(blurred: boolean, symbolId: number, symbol: any, israndom: boolean) {
        let _symbolId = symbolId + (blurred ? this.props.transformTo > 0 ? 16 : 16 : 0);
        //  let _symbolId = symbolId + (blurred ? 16 : 0);
        if (this.duplicateArr && this.duplicateArr.length && blurred) {
            if (this.duplicateArr[0] === _symbolId) {
                _symbolId = Math.floor(Math.random() * (5)) + 16;
            }
        }
        this.duplicateArr[0] = _symbolId;
        if (this.props.ReelIndex === 1 || this.props.ReelIndex === 3) {
            if (_symbolId === 28) {
                _symbolId = Math.floor(Math.random() * (27 - 16 + 1)) + 16;
            }
        }

        if (_symbolId === 30 || _symbolId === 31) {
            _symbolId = Math.floor(Math.random() * (29 - 16 + 1)) + 16;
        }

        this.props.onUpdateSymbolOnReel(symbol, _symbolId, israndom)
        symbol.COMPONENT.visible = true;
        let reels = this.props.reelList[this.props.ReelIndex];
        if (reels) {
            const r = reels;
            symbol.COMPONENT.y = r.symbols[0].COMPONENT.y - (symbol.COMPONENT.height) + (symbol.COMPONENT.offsetY);// - 5;
            r.symbols.unshift(symbol);
        }
    }

    tick = () => {
        cancelAnimationFrame(this.tickupRequest);
        this.fpsInterval = 1000 / 60;
        this.then = performance.now();
        this.startTime = this.then;
        this.onUpdateTick.call(this);
    }

    private stopSpinbySlamBtn(): void {
        const turboMode = this.props.InTurboMode && this.props.level > 0 && !this.props.inFreeGame ? false : this.props.InTurboMode;
        if (this.props.slamActivate && !this.props.isSlamSpin && this.props.data.inSpinning && !this.props.InTurboMode && this.serverResponseReceived) {
            this.props.data.REELSNO = 0;
            this.props.setSlamActivited(false);
            this.props.data.inSpinning = false;
            this.props.setSlamSpin(true);
            // this.changeSpeedForTurboandSlam();
            this.stopByQuickSpin();
        }
        if (this.serverResponseReceived && turboMode && this.props.data.inSpinning && this.props.InTurboMode) {
            this.props.data.REELSNO = 0;
            this.props.data.inSpinning = false;
            this.stopByQuickSpin();
        }
    }
    onUpdateTick() {
        cancelAnimationFrame(this.tickupRequest);
        this.stopSpinbySlamBtn()
        this.tickupRequest = ''

        let req = this.tickupRequest = window.requestAnimationFrame(this.onUpdateTick.bind(this));
        this.props.data.FRAMEANIMATIONREQUEST.push(req);
        if (this.gamePause) {
            return;
        }
        this.now = performance.now();
        this.elapsed = this.now - this.then;
        // if (this.elapsed > this.fpsInterval) {
        this.then = this.now - (this.elapsed % this.fpsInterval);
        let reels = this.props.reelList[this.props.ReelIndex];
        switch (this.reelstate) {
            case GameReel.REEL_STATE_WINDING:
                this.updateWind(reels);
                break;
            case GameReel.REEL_STATE_SPINNING:
                this.updateSpin(reels);
                break;
            case GameReel.REEL_STATE_WOBBLE_UP:
                this.updateWobbleUp(reels);
                break;
            case GameReel.REEL_STATE_WOBBLE_DOWN:
                this.updateWobbleDown(reels);
                break;
        }
        // }
    }

    updateWobbleUp(reels: any) {
        const decVal = this.wobbleSpeed * this.elapsed;
        const curWobbleHeight = this.currentWobbleHeight;
        this.currentWobbleHeight -= decVal;
        if (this.currentWobbleHeight > 0) {
            if (reels && !this.props.data.REELSTIMERSFORQUICKSPIN[0]) {
                const r = reels;
                for (let j = 0; j < r.symbols.length; j++) {
                    const s = r.symbols[j].COMPONENT;
                    if (s.parent !== null) {
                        s.y -= decVal;
                    }
                }
            }
        } else {
            let reels = this.props.reelList[this.props.ReelIndex];
            if (reels && !this.props.data.REELSTIMERSFORQUICKSPIN[0]) {
                const r = reels;
                for (let j = 0; j < r.symbols.length; j++) {
                    const s = r.symbols[j].COMPONENT;
                    if (s.parent !== null) {
                        s.y -= curWobbleHeight;
                    }
                }
            }
            this.currentWobbleHeight = 0;
            this.stopWobbleUp();
        }
    }

    stopWobbleUp() {
        this.reelstate = GameReel.REEL_STATE_STATIC;
        this.spinning = false;
        this.enabled = false;
        this.reelsComplete();
    }



    updateWind(reels: any) {
        let delta = -(this.windSpeed * this.elapsed);
        let calculateDiff = 0;
        if (reels) {
            let r = reels;
            for (let j = 0; j < r.symbols.length; j++) {
                let s = r.symbols[j].COMPONENT;
                if (s) {
                    s.visible = true;
                    if (s.parent != null) {
                        s.y += delta;
                    }
                }
            }
        }
        // new Promise((resolve, reject) => {
        //     resolve('solve')
        // }).then((value) => {
        //     this.startSpin();
        // });

        GSAPTimer.getInstance().addTimer(0.1, () => {
            this.startSpin();
        });


    }

    startSpin() {
        this.reelRunning = true;
        this.reelstate = GameReel.REEL_STATE_SPINNING;
    }

    updateWobbleDown(reels: any) {
        this.props.setSpinningReelStop(this.props.ReelIndex);
        let i = 0,
            difference = 0,
            incVal = this.spinSpeed * this.elapsed,
            curWobbleHeight = this.currentWobbleHeight;
        this.currentWobbleHeight += incVal;

        if (this.currentWobbleHeight < this.wobbleHeight) {
            if (reels && !this.props.data.REELSTIMERSFORQUICKSPIN[0]) {
                const r = reels;
                for (let j = 0; j < r.symbols.length; j++) {
                    const s = r.symbols[j].COMPONENT;
                    if (s.parent !== null) {
                        s.y += incVal;
                    }
                }
            }
        } else {
            if (reels && !this.props.data.REELSTIMERSFORQUICKSPIN[0]) {
                difference = this.wobbleHeight - curWobbleHeight;
                const r = reels;
                for (let j = 0; j < r.symbols.length; j++) {
                    const s = r.symbols[j].COMPONENT;
                    if (s.parent !== null) {
                        s.y += difference;
                    }
                }
                this.currentWobbleHeight = this.wobbleHeight;
            }
        }

        this.startWobbleUp();
        this.props.setStoppingReel(this.props.ReelIndex)
    }

    startWobbleUp() {
        this.reelstate = GameReel.REEL_STATE_WOBBLE_UP;
    }


    updateSpin(reels: any) {
        // this.spinSpeed = this.props.InTurboMode ? constant.configGame.maxReelSpeed : this.props.data.SPIN_SPEED[this.props.ReelIndex];
        if (this.props.InTurboMode || this.props.isSlamSpin) {
            this.spinSpeed = constant.configGame.maxReelSpeed;
        }
        this.spinSpeed = 4;
        this.elapsed = 26.66666666666424;
        // this.elapsed = this.props.InTurboMode ? 34.76666669086262 : this.elapsed;
        // this.spinSpeed =  this.props.data.SPIN_SPEED[this.props.ReelIndex];
        let delta = this.spinSpeed * this.elapsed;
        if (this.props.ReelIndex == 0) {
            // console.log("hello == > delta",delta,'this.elapsed==>',this.elapsed)

        }
        if (reels) {
            const r = reels;
            for (let j = 0; j < r.symbols.length; j++) {
                const s = r.symbols[j].COMPONENT;
                if (s && s.parent != null) {
                    s.y += delta;
                }
            }
            this.dowhileLoop(r);
        }
    }

    dowhileLoop(r: any) {
        let symbolsToEnd = 0, index = -1, symbolId = -1;

        while (!this.gamePause && r.symbols[r.symbols.length - 1] && r.symbols[r.symbols.length - 1].COMPONENT.y - this.yOffset > this.props.reelHeight && this.reelRunning) {

            if (this.props.ReelIndex === this.countStopReelByIndex[this.props.ReelIndex]) {
                this.customSpinSymbolCount[this.props.ReelIndex]++;
                if (this.customSpinSymbolCount[this.props.ReelIndex] === this.totalSpinSymbolLength) {
                    this.stopReelOneByOne();
                }
            }
            this.reelStripSymbolIndex++;
            if (this.reelStripSymbolIndex >= this.props.reelStrips[this.props.currentReelStripIndex][this.props.ReelIndex].length) {
                this.reelStripSymbolIndex = 0;
            }
            let symbol = r.symbols[r.symbols.length - 1];
            if (this.customSpinSymbolCount[this.props.ReelIndex] === this.totalSpinSymbolLength) {
                this.countStopReelByIndex[this.props.ReelIndex] = -1;
                this.reelRunning = false;
                this.stopSpin();
                this.startWobbleDown(this.props.reelStrips[this.props.currentReelStripIndex][this.props.ReelIndex][this.reelStripSymbolIndex], symbol);

            } else if (this.customSpinSymbolCount[this.props.ReelIndex] >= this.totalSpinSymbolLength - this.symbolInViewCount) {
                this.removeSymbolFromEnd();
                symbolsToEnd = this.totalSpinSymbolLength - this.customSpinSymbolCount[this.props.ReelIndex] - 1;
                index = symbolsToEnd;
                if (index >= 0 && index < this.symbolsToDisplay.length) {
                    symbolId = this.symbolsToDisplay[index];
                    const symbolChild = symbol.COMPONENT.children;
                    this.addSymbolToStart(false, symbolId, symbol, false);
                    for (let k = 0; k < symbolChild.length; k++) {
                        symbolChild[k].visible = true
                    }
                } else {
                    this.removeSymbolFromEnd();
                    this.addSymbolToStart(true, symbol.symbolId, symbol, false);
                }
            } else {
                this.removeSymbolFromEnd();
                this.addSymbolToStart(true, this.props.reelStrips[this.props.currentReelStripIndex][this.props.ReelIndex][this.reelStripSymbolIndex], symbol, true);
            }
        }
    }

    // new code
    createSymbol(symbolId: number, row: number, reel: any, yoffset: number = 0) {
        let symbolWiseHeight: any = [];
        let symbolsCount = this.symbolHeightMappingList.map((data: any) => {
            symbolWiseHeight.push(data.height);
        })

        let PROPS_TO_SEND_Symbol = {
            key: "symbol_" + Math.random() + this.props.ReelIndex + "_" + row,
            yoffset: row * symbolWiseHeight[0],
            app: this.app,
            configGame: this.props.configGame,
            SYMBOL_ID: symbolId === 14 ? 15 : symbolId,
            ROW_ID: row,
            REEL_ID: this.props.ReelIndex,
            REEL: reel,
            anchor: [0, 0]
        }
        return <Symbol {...PROPS_TO_SEND_Symbol} />
    }

    randomizeSymbols(reel: any) {
        this.symbols = [];
        for (let j = 0; j < constant.configGame.REEL_COLUMN; j++) {
            let symbolId = this.REEL_STOPS[this.props.ReelIndex][j];
            if (symbolId == -1) {
                break;
            }
            if (symbolId == undefined) {
                symbolId = symbolId = this.props.reelStrips[this.props.currentReelStripIndex][this.props.ReelIndex][this.reelStripSymbolIndex];
            }
            this.symbols.push(this.createSymbol(symbolId, j, reel));
        }
        this.setState((prevState) => {
            return {
                ...prevState,
                symbolList: this.symbols,
            }
        })
        this.forceUpdate();
    }

    render() {
        if (this.REEL_STOPS.length === 0) {
            console.error("reels are empty")
            return <></>;
        }
        const { symbolList } = this.state;
        return (
            <UIManager
                type={"Container"}
                ref={(i: any) => this.subReelContainer = i}
                id={"reel" + this.props.ReelIndex}
                name={"reel" + this.props.ReelIndex}
                app={this.app}
                configGame={this.props.configGame}
                x={this.props.ReelIndex * this.props.data.REEL_WIDTH + this.props.ReelIndex * this.props.data.REEL_GAP}>
                {symbolList}
            </UIManager>
        );
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'soundState'|'revealFeatureState' | 'winpresentationState' | "landingState" | 'freegameState' | 'basegameState' | 'reelsState' | 'behaviourState'>): IStateToProps =>
    ({
        isSpinning: state.reelsState.isSpinning,
        spinStart: state.reelsState.spinStart,
        spinStop: state.reelsState.spinStop,
        spinResponseReceived: state.reelsState.spinResponseReceived,
        winningList: state.reelsState.winningList,
        reel_data: state.reelsState.reel_data,
        reelStrips: state.reelsState.reelStrips,
        currentReelStripIndex: state.reelsState.currentReelStripIndex,
        stoppingReel: state.reelsState.stoppingReel,
        stopable: state.reelsState.stopable,
        countStopReels: state.reelsState.countStopReels,
        cspStart: state.reelsState.cspStart,
        InTurboMode: state.reelsState.InTurboMode,
        slamActivate: state.reelsState.slamActivate,
        isSlamSpin: state.reelsState.isSlamSpin,
        inFreeGame: state.freegameState.inFreeGame,
        winSymbolCoOrdinate: state.winpresentationState.winSymbolCoOrdinate,
        mysteryCoinList: state.revealFeatureState.mysteryCoinList,
        level: state.revealFeatureState.level,
        coinQueenWins: state.behaviourState.coinQueenWins,
        transformTo: state.revealFeatureState.transformTo,
        landingAnimPositions: state.landingState.landingAnimPositions,
        allSoundSFXStop: state.soundState.allSoundSFXStop,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        displayWinBox: (displayWinBox: boolean): any => dispatch(winpresentationAction.displayWinBox(displayWinBox)),
        setReelStopable: (stopable: any): any => dispatch(reelsActions.setReelStopable(stopable)),
        stopSpin: (): any => dispatch(reelsActions.stopSpin()),
        setSpinType: (): any => dispatch(reelsActions.setSpinType()),
        setSpinningReelStart: (reelId: number): any => dispatch(reelsActions.setSpinningReelStart(reelId)),
        setSpinningReelStop: (reelId: number): any => dispatch(reelsActions.setSpinningReelStop(reelId)),
        nextFreegame: (): any => dispatch(freegameActions.nextFreegame()),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        setStoppedReel: (stoppedReel: number): any => dispatch(reelsActions.setStoppedReel(stoppedReel)),
        setSpinning: (spinning: boolean): any => dispatch(reelsActions.setSpinningState(spinning)),
        setSpinComplete: (allSpinComplete: boolean): any => dispatch(reelsActions.setSpinComplete(allSpinComplete)),
        setStoppingReel: (stoppingReel: number): any => dispatch(reelsActions.setStoppingReel(stoppingReel)),
        setNextReelStoppedId: (stopNextReelId: number): any => dispatch(reelsActions.setNextReelStoppedId(stopNextReelId)),
        onUpdateSymbolOnReel: (symbol: any, symbolId: number, randomSymbol: boolean): any => dispatch(symbolActions.setUpdatedSymbol(symbol, symbolId, randomSymbol)),
        setWinSymbolCoOrdinate: (winSymbolCoOrdinate: any): any => dispatch(winpresentationAction.setWinSymbolCoOrdinate(winSymbolCoOrdinate)),
        flowManagerCalled: (callFlowManager: boolean): any => dispatch(flowManagerAction.flowManagerCalled(callFlowManager)),
        isSkipWin: (skipWin: boolean): any => dispatch(paytableAction.isSkipWin(skipWin)),
        setCspStart: (cspStart: boolean): any => dispatch(reelsActions.setCspStart(cspStart)),
        setSlamActivited: (slamActivate: any): any => dispatch(reelsActions.setSlamActivited(slamActivate)),
        setSlamSpin: (isSlamSpin: boolean): any => dispatch(reelsActions.setSlamSpin(isSlamSpin)),
        setStartSpinBySpaceBar: (startSpinBySpaceBar: boolean): any => dispatch(baseGameAction.setStartSpinBySpaceBar(startSpinBySpaceBar)),
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        endToggle: (): any => dispatch(winpresentationAction.endToggle()),
        playLandingAnim: (): any => dispatch(landingSymbolAction.playLandingAnim()),
        resetLandingAnim: (): any => dispatch(landingSymbolAction.resetLandingAnim()),
        stopSound: (soundName: any): any => dispatch(soundActions.stopSound(soundName)),
        setReelStrips: (reelStrips: any): any => dispatch(reelsActions.setReelStrips(reelStrips)),
        setReelStripsIndex: (currentReelStripIndex: number): any => dispatch(reelsActions.setReelStripsIndex(currentReelStripIndex)),

    }))(withGameReelConfiguration(GameReel)));
