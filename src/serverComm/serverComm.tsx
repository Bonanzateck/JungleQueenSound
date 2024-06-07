import React, { Component } from "react";
import { withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { GJIStore } from "../gamestore/IStore";
import { Dispatch } from "redux";
import { actions as asyncInitAction } from "../core/reducers/asyncInitAction"
import { actions as tokenAction } from "../gamereducer/actionReducer";
import { actions as betPanelAction } from "../core/reducers/betPanelReducer";
import { actions as paytableAction } from "../gamereducer/paytableBMReducer";
import { actions as behaviourAction } from '../gamereducer/behaviourReducer';
import { isMobile } from "react-device-detect";
import { actions as multiplierActions } from "../gamereducer/multiplierReducer";
import { actions as featureAction } from "../gamereducer/revealFeatureReducer";
import { constant } from "../slot/data/config"
import { actions as desktopSettingPanelActions } from "../gamereducer/desktopSettingPanelGameLevelReducer";
import { CURRENCY, ICurrencyProps } from "@bonanzainteractive/core";
import { actions as revealFeatureState } from "../gamereducer/revealFeatureReducer";
import { symbolLevel1, symbolLevel2, symbolMappingList } from "./dataMappingConfig";
import { playNextFreeCommand, setFreeGameConfig, showErrorMessage } from "./serverCommunication";
import { actions as buyFeatureActions } from "../gamereducer/buyFeatureReducer";
import { actions as keyBoardAction } from "../gamereducer/autoplayKeyboardListenerReducer";


import {
    reelsActions, landingSymbolAction, soundActions,
    winpresentationAction, freegameActions, applicationActions, baseGameAction,
    buttonActions, introductionActions,
} from "@bonanzainteractive/slote_core";


interface IProps {
    [x: string]: any;
}

interface IStateToProps {
    [x: string]: any;
}

interface IDispatchToProps {
    [x: string]: any;
}

interface IState {
    [x: string]: any;
}

class ServerComm extends Component<IProps, IState> {
    protected symbolsArrayLength: number = 9;
    protected scatterCounter: number = 0;
    protected scatterCounterForSpin: number = 0;
    protected counterScatterSymbolForSpin: number = 0;
    protected symbolsNoOfSizes: number = 6;
    protected lastScatterSymbolID: number = 30;
    protected storePreviousFreeGameCount: number = 0;
    protected secToMiliSecConvert: number = 1000;
    protected filteredreelData: any;
    protected filteredreelDataSpinBeforeBlast: any;
    protected filteredreelDataSpinAfterBlast: any;
    protected blastPositionArray: any = [];
    protected winningPosition: any = [];
    protected symbolForAnticipationArray: any = [];
    protected storeReelsData: any;
    protected setReelsTrue: boolean = false;
    protected storeBetFromVoucherData: number = 0;
    protected lineWins: any;
    private isApplicationBroken: boolean = false;
    protected winAmountDisplay: any;
    protected counterScatterCount = 0;
    private reCostruction: boolean = false;
    protected autoplayLengthAccToUI: number = 9;
    protected storePaytableWin: any;
    protected preWinAmount: number = 0;
    private gameBalance: number = 100000;
    private initResult: any;
    private freeSpinCounter: number = 0;
    protected totalWinAmountFG: any;
    private count: number = 0;

    constructor(props: IProps) {
        super(props);
        this.initResult = {};
        this.storePaytableWin = [];
        document.removeEventListener("visibilitychange", this.visibilitychange.bind(this));
        document.addEventListener("visibilitychange", this.visibilitychange.bind(this));
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        const { isInitResponseReceived, initResult, basegamestate, actionResult, introductionScreenVisible,
            reConstruction, spinResult, increaseBetResult, soundIsPlaying, isResponseReceived, error, setReConstruction } = nextProps;

        if (isInitResponseReceived !== this.props.isInitResponseReceived) {

            this.winAmountDisplay = 0;
            // this.totalWinAmountFG = 0;
            constant.configGame.sessionid = initResult?.data?.session;
            localStorage.setItem("session", initResult.data.session);
            constant.configGame.betValues = initResult?.data?.config?.betValues;
            constant.configGame.autoPlayValues = initResult?.data?.config?.autoPlayValues;
            constant.configGame.defaultBetVal = initResult?.data?.config?.defaultBetVal;
            let betValues = initResult?.data?.config?.betValues;
            let defaultBetVal = initResult?.data?.config?.defaultBetVal;
            const betIndex: Number = betValues.indexOf(defaultBetVal)
            this.initResult = initResult.data;
            this.initResult.state.feature && this.props.setLevel(this.initResult.state.feature[0]?.level === 'R' ? 0 : this.initResult.state.feature[0]?.level);
            constant.configGame.isReconstruction = initResult?.data?.config?.isReload;
            if (constant.configGame.isReconstruction) {
                constant.configGame.defaultBetVal = initResult?.data?.bets?.stake;
                if (initResult.data.config && initResult.data.state.status === "FREESPINS") {
                    this.props.startFreegame();
                }
            }
            //!SECTION
            let coinQueenWins: any = [];
            let winsArr: any = [];
            let winsObj: object = {};
            let coinWinPositions: any = [];
            let symbols = initResult.data.results.win.symbolWin.symbols;
            symbols.forEach((data: any, index: any) => {
                coinWinPositions = [];
                let pos = data.pos;
                let animPosition: object = {};
                winsArr = [];
                if (data.lineID === 0) {
                    pos.forEach((innerData: any, innerIndex: any) => {
                        animPosition = {
                            reelId: innerData[0], rowId: innerData[1]
                        }
                        coinWinPositions.push(animPosition);
                    });
                    winsObj = {
                        id: data.lineID - 1,
                        multiplier: 0,
                        payId: data.smbID,
                        coinNum: data.mult.toFixed(2),
                        coinWinPositions: coinWinPositions,
                        positions: winsArr,
                        prize: 0
                    }
                    coinQueenWins.push(winsObj);
                }
            });
            this.props.setCoinQueenSymbolWins(coinQueenWins);
            this.props.setSelectedCoin(betIndex);
            //!SECTION
            initResult.data.state.status === 'NORMAL' && this.props.introScreenVisible(true);
            this.setOnloadState(initResult.data);
            this.parseInitData(initResult.data);
            this.setReconstructionData(initResult.data);


            constant.configGame.currentBet = Number(defaultBetVal);
            constant.configGame.balance = Number(initResult.data.balance);

            return false;
        }
        if (isResponseReceived !== this.props.isResponseReceived) {
            !isResponseReceived && nextProps.visibleNoInternetPopUp(true, "noInternetPopUpText6", true, false);
        }

        if (Object.keys(error).length) {
            showErrorMessage(error.error.status, this.props);
        }
        if (basegamestate !== this.props.basegamestate) {
            this.setReelsTrue = !basegamestate ? true : false
            this.setReelStrip();
        }
        if (actionResult !== this.props.actionResult) {

            this.parseInitData(actionResult);
            return false;
        }

        if (soundIsPlaying !== this.props.soundIsPlaying) {
            this.setRadioSoundButtonLocalStorageValue(soundIsPlaying);
        }

        if (introductionScreenVisible !== this.props.introductionScreenVisible || reConstruction !== this.props.reConstruction) {
            if (introductionScreenVisible !== this.props.introductionScreenVisible) {
                this.setRadioButtonLocalStorageValue(introductionScreenVisible);
            }
            if (reConstruction && reConstruction !== this.props.reConstruction) {
                // this.setFreeGameReConstruction(this.initResult);
                this.props.resetReelState(true);
                setFreeGameConfig(nextProps);
                this.reCostruction = true;
                this.props.featureExists(false);
                this.parseSpinData(this.initResult);
                playNextFreeCommand(this.initResult);
                this.props.introScreenVisible(false);
            }
            return false;
        }

        if (nextProps.spinResult !== this.props.spinResult) {
            this.winAmountDisplay = 0;
            //   this.clearBuyFeatureLocalStorage();
            this.symbolForAnticipationArray = [];
            // this.props.setTurboMode(true);
            this.counterScatterCount = 0;
            if (nextProps.spinResult.data.results) {
                this.winAmountDisplay = this.winAmountDisplay + nextProps.spinResult.data.results.win.total / 20 * nextProps.spinResult.data.bets.stake;
                this.totalWinAmountFG = this.totalWinAmountFG + nextProps.spinResult.data.results.win.total / 20 * nextProps.spinResult.data.bets.stake;
            }
            if (nextProps?.spinResult?.data?.state?.hasCapped) {
                this.winAmountDisplay = 0
                this.winAmountDisplay = nextProps.spinResult.data.state.cap / 20 * nextProps.spinResult.data.bets.stake;
                this.totalWinAmountFG = nextProps.spinResult.data.state.cap / 20 * nextProps.spinResult.data.bets.stake;
                //  nextProps.spinResult.data.state.wonAdditionalSpins = 0;
                nextProps.spinResult.data.results.win.total = 0;
                nextProps.spinResult.data.state.freespinsRemaining = nextProps.spinResult.data.state.totalFSAwarded;
                this.props.setWinSymbolCoOrdinate([]);
            }
            this.props.setWinSymbolCoOrdinate([]);
            this.parseSpinData(nextProps.spinResult.data);
            reConstruction && setReConstruction(false);
            return false;
        }

        if (increaseBetResult && increaseBetResult !== this.props.increaseBetResult) {
            if (!isMobile && this.props.betListGameLevel.indexOf(increaseBetResult.stake) !== -1) {
                this.props.setApplicationCurrentBetIndex(this.props.betListGameLevel.indexOf(increaseBetResult.stake));
                nextProps.stakeTore(this.props.betListGameLevel.indexOf(increaseBetResult.stake));
            }
            return false;
        }
        return true;
    }



    setGameModel(Result: any) {
        const { setApplicationDecreaseBet, setApplicationIncreaseBet, setApplicationMaxBet, setApplicationShowPaytable, setApplicationSpin } = this.props;
        setApplicationShowPaytable(true);
        setApplicationSpin(true);
        setApplicationMaxBet(true);
        setApplicationDecreaseBet(true);
        setApplicationIncreaseBet(true);
        this.props.setResultForBetVAlue(Result);
        // this.props.setApplicationLocale(navigator.languages[1]);      
        this.props.setApplicationLocale('en');
        this.props.setSliderValue(0.7);
    }

    setCurrencyForApplication(Result: any) {
        const CurrencyProps: ICurrencyProps = {
            currencyCode: Result.gameOptions.currencyCode,
            majorSymbol: "?",
            minorSymbol: "p",
            thouSeperator: Result.gameOptions.currencyGroupingSeparator ? Result.gameOptions.currencyGroupingSeparator : ",",
            thouPlaces: 3,
            dpSeperator: Result.gameOptions.currencyDecimalSeparator ? Result.gameOptions.currencyDecimalSeparator : ".",
            decimalPlaces: Result.gameOptions.currencyIgnoreDecimals ? 0 : 2,
            currencyScale: Result.gameOptions.currencyCode ? 1 : 100,
            prefixMajor: !Result.gameOptions.currencySymbolPrintedBefore,
            baseValue: 0
        }
        CURRENCY.CurrencyManager.setCurrency(CurrencyProps);
    }


    reelDataInitMapping(Result: any, index: any) {
        let reelData, filteredreelData;
        const { relGridSymbolCountDisplay } = this.props;

        if (Result.transition !== undefined) {
            reelData = Result.transition.goddessOfFire.subSpins[0].reels;
        }
        else {
            reelData = Result.state.goddessOfFire.subSpins[index].reels;
        }
        let reelDataArraysCount = reelData.map((data: any, index: any) => {
            return data.length;
        })
        reelDataArraysCount.pop();
        relGridSymbolCountDisplay(reelDataArraysCount);
        filteredreelData = reelData.map((data: any, index: any) => {
            let filteredData = data.map((innerdata: any, innerindex: any) => {
                let updateIds = symbolMappingList.map((mapdata: any, mapindex: any) => {
                    if (mapdata.name === innerdata) {
                        let length;
                        length = data.length - 2;
                        if (innerdata === "WILD") {
                            mapdata.id = 91;
                            return mapdata.id;
                        } else {
                            return mapdata.id + length;
                        }
                    }
                });
                updateIds = updateIds.filter((name: string) => {
                    return name !== undefined;
                });
                return updateIds[0];

            });
            let filteredData_1 = filteredData.map((innerdata: any, innerindex: any) => {
                if (innerdata >= 1 && innerdata <= this.symbolsNoOfSizes) {
                    if (this.scatterCounter > 0) {
                        innerdata = innerdata + (this.symbolsNoOfSizes * this.scatterCounter);
                        if (innerdata > this.lastScatterSymbolID) {
                            innerdata = innerdata - this.symbolsNoOfSizes;
                            return innerdata;
                        }
                    }
                    this.scatterCounter++;
                }
                return innerdata;
            })
            if (filteredData_1.length < this.symbolsArrayLength) {
                for (let i = 0; i < filteredData_1.length; i++) {
                    filteredData_1.push(filteredData_1[Math.floor(filteredData_1.length * Math.random())]);
                    if (filteredData_1.length === this.symbolsArrayLength) {
                        break;
                    }
                }
            }
            return filteredData_1;
        });
        if (Result.transition !== undefined) {
            if (Result.transition && Result.transition.goddessOfFire.freeGame !== undefined) {
                Result.transition && this.props.storeMultiplierValue(Result.transition.goddessOfFire.subSpins[Result.transition.goddessOfFire.subSpins.length - 1].winnings.multiplier);
                let filteredreelData_11 = filteredreelData.map((data: any, index: any) => {
                    let filteredreelData_12 = data.map((innerData: number) => {
                        if (innerData >= 1 && innerData <= 30) {
                            if (index === 6) {
                                innerData = 92;
                            }
                            return innerData;
                        } else {
                            return innerData;
                        }
                    });

                    return filteredreelData_12;
                });
                this.filteredreelData = filteredreelData_11;
                return filteredreelData_11;
            }
        }
        else {
            this.filteredreelData = filteredreelData;
        }
    }

    parseSpinData(Result: any) {
        this.winningPosition = [];
        this.counterScatterSymbolForSpin = 0;
        this.scatterCounterForSpin = 0;
        this.symbolForAnticipationArray = [];
        this.props.setMysteryCoinList([]);
        this.setSpinData(Result);
        this.props.setPreviousBalance(Number(this.gameBalance));
        this.props.introScreenVisible(false);
    }

    setReelStripData(gameLevel: number) {
        if (gameLevel === -1) {
            gameLevel = 0;
        }
        let reelStrip: any = [];
        for (let i = 0; i < 25; i++) {
            let randomStrip = Math.floor(Math.random() * (13 - gameLevel) + gameLevel);
            if (randomStrip) {
                reelStrip[i] = randomStrip;
        }
        }
        this.props.setReelStrips([[reelStrip, reelStrip, reelStrip, reelStrip, reelStrip]]);
        this.props.setReelStripsIndex(0);
    }
    setOnloadState(Result: any) {
        if (Result?.config) {
            constant.configGame.isMountData = true
        } else {
            constant.configGame.isMountData = false
        }
    }
    setSpinData(Result: any) {
        constant.configGame.Result = Result;
        this.setOnloadState(Result);
        this.props.setApplicationBroken(false);
        this.props.setScatterDataBeforeFG([]);
        this.props.setUpdateWinAfterWinAnimation(false);
        constant.configGame.CURRENT_WINAMOUNT = Number(Result.results.win.total);
        this.lineWins = [];
        this.blastPositionArray = [];
        let trasformtoSymbol = false;
        let stateData = Result.state;
       
        if (stateData.status !== "FREESPINS") {     
            this.props.setTrasformSymbol(-1);     
            constant.configGame.isFreegame = false;
        } else {
            constant.configGame.isFreegame = true;
            this.props.storeMultiplierValue(Result.state.mult);
            this.props.setPreMultiplier(Result.state.preMult);
        }

        this.props.setPostFeature(false);
        if (stateData.feature && stateData.feature[0]) {
            trasformtoSymbol = true;
            this.props.featureExists(true);
            this.props.setPostFeature(true);
            this.props.setTrasformSymbol(stateData.feature[0].transformTo);
        }

        if (stateData?.level) {
            this.props.setLevel(stateData.level === 'R' ? 0 : stateData.level);
            this.props.setPrevLevel(stateData.prevlevel);
        } else {
            if (stateData.status === "NORMAL" && stateData.feature && stateData.feature[0]) {
                this.props.setLevel(stateData.feature[0]?.level === 'R' ? 0 : stateData.feature[0]?.level);
            } else {
                this.props.setLevel(0);
            }
            this.props.setPrevLevel(-1);
        }
        let wildPositions: any = [];
        let scatterPositions: any = [];
        let scatterReelId: any = [];
        let coinList: any = [];
        let mysteryList: any = [];
        let coinWinPositions: any = [];
        if (Result.results.reels) {
            let reelGrid: any = [];
            let reelGrid_1: any = [];
            let reels = Result.results.reels;
            reels.forEach((data: any, reelId: any) => {
                let singleReel: any = [];
                let singleReel_1: any = [];
                data.forEach((symbolId: any, rowId: any) => {
                    if (stateData.feature && stateData.feature[0] !== 'R' && symbolId.prevSmbID) {
                        // singleReel.push(symbolId.prevSmbID);
                        singleReel_1.push(13)// Custom Manage
                        mysteryList.push([reelId, rowId]);
                    } else {
                        singleReel.push(symbolId.smbID)
                        singleReel_1.push(symbolId.smbID)
                    }
                    // if (trasformtoSymbol && symbolId.prevSmbID) {
                    //     // singleReel.push(symbolId.prevSmbID);
                    //     symbolId?.prevSmbID && singleReel.push(13)// Custom Manage
                    //     mysteryList.push([reelId, rowId]);
                    // }
                    if (symbolId.smbID === 11) {
                        scatterPositions.push([reelId, rowId]);
                        scatterReelId.push(1);
                    }
                    if (symbolId.smbID === 0) {
                        wildPositions.push([reelId, rowId]);
                    }
                    // console.log("reelGrid singleReel=>", singleReel);
                });
                reelGrid.push(singleReel);
                reelGrid_1.push(singleReel_1);
            });
            // console.log("reelGrid=>", reelGrid, reelGrid_1);
            reelGrid.map((data: any) => {
                data.push(Math.floor(Math.random() * 10))
            })
            reelGrid_1.map((data: any) => {
                data.push(Math.floor(Math.random() * 10))
            })
            // this.filteredreelData = reelGrid;
            this.filteredreelData = reelGrid_1;
        }
        (stateData?.feature[0]?.level !== 'R' && mysteryList.length > 0) ? this.props.setSpinStopButtonDeActivate(true) : this.props.setSpinStopButtonDeActivate(false);
        // Set win response for animation
        let winningsInCascade = Result.results.win.total / 20 * Result.bets.stake;
        let isGoldenSymbols: boolean = false;
        let coinQueenWins: any = [];
        if (winningsInCascade > 0) {
            let winsArr: any = [];
            let blastArr: any = [];
            let symbols = Result.results.win.symbolWin.symbols
            let winsObj: object = {};
            symbols.forEach((data: any, index: any) => {
                coinWinPositions = [];
                if (data.lineID === 0 || data.smbID === 14) {
                    isGoldenSymbols = true;
                }
                let pos = data.pos;
                let animPosition: object = {};
                winsArr = [];
                pos.forEach((innerData: any, innerIndex: any) => {
                    animPosition = {
                        reelId: innerData[0], rowId: innerData[1]
                    }
                    data.lineID !== 0 && winsArr.push(animPosition);
                    data.lineID === 0 && coinWinPositions.push(animPosition);
                });
                winsObj = {
                    id: data.lineID - 1,
                    multiplier: 0,
                    payId: data.smbID,
                    coinNum: CURRENCY.CurrencyManager.formatCurrencyString(data.amt, true, true, true, true),
                   
                    // coinNum:Result?.config?.isReload? CURRENCY.CurrencyManager.formatCurrencyString(Result?.state?.mult * Result?.config?.betValues[Result?.config.defaultBetVal], true, true, true, true):
                    //  CURRENCY.CurrencyManager.formatCurrencyString(data.mult * this.props.betList[this.props.currentBetIndex], true, true, true, true),
                    // wildPositions: wildPositions,
                    coinWinPositions: coinWinPositions,
                    positions: winsArr,
                    prize: 0
                }
                data.lineID !== 0 && blastArr.push(winsObj);
                data.lineID === 0 && coinQueenWins.push(winsObj);
            });
            this.lineWins = blastArr;
            /*!SECTION
            for Skip result 
            */
            if (isGoldenSymbols) {
                this.props.isSkipWin(true);
            }
        } else {
            this.lineWins = [];
        }
        // ! End win response
        let hasfeature: any = [];
        if (Result.state) {
            if (Result?.state?.hasCapped) {
                this.props.setHasCapped(Result.state.hasCapped);
            }
            if (Result.state.cap) {
                this.props.setCappedAmount(Result.state.cap);
            }
        }
        if (Result.state && Result.state.status === "FREESPINS_TRIGGER") {
            this.props.reTriggeredFreegame(true);
            // this.props.featureJustTriggered(true);
        } else {
            this.props.reTriggeredFreegame(false);
            this.props.featureJustTriggered(false);
        }

        // this.props.setCurrentMysterySym(Result.state.currentMysterySym);
        if (Result.state && (Result.state.status === "FREESPINS_TRIGGER")) {
            this.totalWinAmountFG = 0;
            let countOfFreeGames = Result.state.totalFSAwarded - Result.state.wonAdditionalSpins;
            this.props.setCurrentMysterySym(Result.state.currentMysterySym);
            this.props.setTotalNumberMysterySymbol(Result.state.totalNumMysterySym);
            this.freeSpinCounter = 0;

            if (countOfFreeGames > 0) {
                hasfeature = [1];
                this.storePreviousFreeGameCount = countOfFreeGames;
                this.props.setScatterDataBeforeFG(this.filteredreelData)
            }

            if (Result.state.retrriggerFreeSpin) {
                this.props.reTriggeredFreegame();
            }
            // this.props.setTotalWinAmount(this.winAmountDisplay);
            this.props.setTotalWinAmount(Result.state.totalWin);
        }
        else if (Result.state && Result.state.status === "FREESPINS") {
            this.props.setCurrentMysterySym(Result.state.currentMysterySym);
            this.props.setTotalNumberMysterySymbol(Result.state.totalNumMysterySym);
            let countOfFreeGames = Result.state.totalFSAwarded - Result.state.wonAdditionalSpins;
            if (stateData.feature) {
                //FEATURE
                this.props.featureExists(true);
            }
            if (countOfFreeGames > 0) {
                hasfeature = [1];
                this.storePreviousFreeGameCount = countOfFreeGames;
            }
            if (Result.state.retrriggerFreeSpin) {
                this.props.reTriggeredFreegame();
            }

            // let count = Result.state.freespinsRemaining;
            if (Result.state.freespinsRemaining === 0) {
                // this.props.setShowOutrobanner(true);
                this.storePreviousFreeGameCount = 0;
                this.props.setFeatureJustFinished();
            }
            // this.props.setTotalWinAmount(this.winAmountDisplay);
            this.props.setTotalWinAmount(Result.state.totalWin);
            this.props.setTotalNumberMysterySymbol(stateData.totalNumMysterySym);
            this.props.setCurrentMysterySym(stateData.currentMysterySym);

        } else {
            this.storePreviousFreeGameCount = 0;
            hasfeature = [];
        }
        let freeGameCount = Result.state.totalFSAwarded - Result.state.freespinsRemaining;

        if (freeGameCount > -1 && this.props.inFreeGame) {
            this.freeSpinCounter++;
        }
        if (Result.state && Result.state.status === "FREESPINS_TRIGGER") {
            if (Result.state.totalFSAwarded === Result.state.freespinsRemaining) {
                this.totalWinAmountFG = this.winAmountDisplay;
            }
        }
        if (this.isApplicationBroken) {
            this.freeSpinCounter = Result.state.totalFSAwarded - Result.state.freespinsRemaining;
            this.isApplicationBroken = false;
        }
        let FWReelData;

        FWReelData = {
            stopReelsAfterWin: this.filteredreelData,
            stopReels: this.filteredreelData,
            wins: this.lineWins,
            coinQueenWins,
            balance: Result.bets.balance ? Result.bets.balance : this.gameBalance,
            winAmount: this.winAmountDisplay,
            feature: hasfeature,
            featureType: hasfeature && (hasfeature.length > 0 ? "FREEGAME" : ""),
            freegameSpinCount: this.freeSpinCounter,
            freegameSpinCountWin: Result.state.totalFSAwarded,
            freegameSpinCountRemaining: Result.state.freespinsRemaining
        }
        this.props.storeMultiplierValue(Result.state.mult);
        this.props.setTotalCreditWinAmountInFreeGame(Number(Result.state.totalWin));
        this.props.setTotalCreditWinAmount(Number(Result.results.win.total));
        this.props.setApplicationWinAmount(FWReelData.winAmount, FWReelData.wins);
        this.props.setCoinQueenSymbolWins(FWReelData.coinQueenWins);
        this.props.setBaseGameSpinSucces(FWReelData);
        this.props.setFreeeGameSpinSucces(FWReelData);
        this.props.setReelSpinSucces(FWReelData);
        this.props.setSymbolAnimationPosition([]);
        if (Result.state.totalWin > 0 && mysteryList.length === 0) {
            this.props.setWinsSucces(FWReelData);
        } else {
            this.props.setWinsSucces({ wins: [] })
        }
        this.props.setWinsStoreDataForFG(FWReelData)
        this.props.setFreeSpinAdded(Result?.state?.wonAdditionalSpins ? Result?.state?.wonAdditionalSpins : 0);
        constant.configGame.currentTotalWin = Result.state.totalWin;
        // nextProps.spinResult.data.results.win.symbolWin.coins
        // if (!this.props.inFreeGame) {
        if (Result.balance) {
            // this.props.setApplicationBalance(Number(Result.balance));
            constant.configGame.balance = Number(Result.balance)
        } else {
            //this.props.setApplicationBalance(Number(this.gameBalance));
            constant.configGame.balance = Number(this.gameBalance)
        }
        // }
        // this.setReelStripData(1);
        this.blastPositionArray = [];
        //will be uncomment later
        if (stateData.feature && stateData.feature[0]) {
            this.props.setTrasformSymbol(stateData.feature[0].transformTo);
        }
        this.props.setMysteryCoinList(mysteryList);

        if (this.props.isGameBroken && this.count === 0) {
            this.count++;
        }
        if (this.props.stopButtonActive) {
            this.props.setReelFast(false);
        }
        this.setLandingSymbolData(FWReelData.stopReels);

    }


    getReelFilterData(Reels: any, scatterList: any) {
        this.scatterCounterForSpin = this.counterScatterSymbolForSpin;
        let filteredreelData = Reels.map((data: any, index: any) => {
            let filteredData = data.map((innerdata: any, innerindex: any) => {
                let updateIds = symbolMappingList.map((mapdata: any, mapindex: any) => {
                    if (mapdata.name === innerdata) {
                        let length;
                        length = data.length - 2;
                        if (innerdata === "WILD") {
                            mapdata.id = 91;
                            return mapdata.id;
                        } else {
                            return mapdata.id + length;
                        }
                    }
                })
                updateIds = updateIds.filter((name: string) => {
                    return name !== undefined;
                })
                return updateIds[0];
            })

            let filteredData_1 = filteredData.map((innerdata: any, innerindex: any) => {
                if (innerdata >= 1 && innerdata <= this.symbolsNoOfSizes) {
                    scatterList.push({ reel: index, row: innerindex, used: false })
                }
                return innerdata;
            })

            if (filteredData_1.length < this.symbolsArrayLength) {
                for (let i = 0; i < filteredData_1.length; i++) {
                    filteredData_1.push(filteredData_1[Math.floor(filteredData_1.length * Math.random())]);
                    if (filteredData_1.length === this.symbolsArrayLength) {
                        break;
                    }
                }
            }
            return filteredData_1;
        })
        if (!this.props.basegamestate || (this.props.actionResult && this.reCostruction && this.props.actionResult.transition && this.props.actionResult.transition.goddessOfFire.freeGame && this.props.actionResult.transition.goddessOfFire.freeGame.currentNumber && this.props.actionResult.transition.goddessOfFire.freeGame.totalNumber)) {
            let filteredreelData_11 = filteredreelData.map((data: any) => {
                let filteredreelData_12 = data.map((innerData: any) => {
                    if (innerData >= 1 && innerData <= 30) {
                        innerData = 92;
                        return innerData;
                    } else {
                        return innerData;
                    }
                });
                return filteredreelData_12;
            })
            return filteredreelData_11;
        }
        else {
            return filteredreelData;
        }
    }


    // private setWinAmount(amount: number): void {
    //     this.props.setTotalWinAmount(amount);
    // }
    /*
    Landing or teaser animation will '
    play only first and second reel . 
    if scatter will not appear on first reel then will no play on second reel 
    */
    setLandingSymbolData(stopReels: any) {
        let landingCoordinate: any = [];
        let firstScatter: boolean = true
        if (stopReels[0][0] === constant.configGame.SCATTER || stopReels[0][1] === constant.configGame.SCATTER || stopReels[0][2] === constant.configGame.SCATTER) {
            firstScatter = true;
        }
        firstScatter && stopReels.forEach((singleReelData: any, i: number) => {
            for (let j: any = 0; j < singleReelData.length; j++) {
                if (singleReelData[j] === constant.configGame.SCATTER) {
                    landingCoordinate.push({
                        "reelId": i,
                        "rowId": j,
                    });
                }
            }
        });
        this.props.setLandingPosition(landingCoordinate)
    }


    parseInitData(Result: any) {
        // this.setBuyFeatureData(Result);
        if (Result.results.reels) {
            let reel: any = []
            let reelData = Result.results.reels;
            reelData.forEach((data: any, reelId: any) => {
                let singleReel: any = [];
                data.forEach((symbolId: any, index: any) => {
                    singleReel.push(symbolId.smbID)
                });
                reel.push(singleReel)
            });
            this.filteredreelData = reel;

        }
        constant.configGame.isReconstruction = Result?.config?.isReload;
        let balance = Result.balance ? Result.balance : this.gameBalance;
        let coinList = [0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.4, 3, 4, 5, 6, 7, 8, 10, 12, 15, 17, 20, 25, 30, 40, 50];
        let temp_maxStake = this.props.maximumStake;

        if (temp_maxStake) {
            let maxIndex = coinList.indexOf(temp_maxStake)
            if (maxIndex > -1) {
                let updatedCoinList: any = [];
                coinList.forEach((data: any, index: any) => {
                    if (index <= maxIndex) {
                        updatedCoinList.push(data)
                    }

                });
                coinList = updatedCoinList
            }
        }
        let coinIndex;
        if (temp_maxStake > 0) {
            coinIndex = Result.bets.stake > (temp_maxStake && Result.config.betValues.indexOf(temp_maxStake))
                || (Result.config.betValues.indexOf(Result.bets.stake || Result.config.defaultBetVal));
        } else {
            coinIndex = Result.config.betValues.indexOf(Result.bets.stake || Result.config.defaultBetVal);
        }
        this.props.visibleBuyFeatureScreen(Result?.config?.disableBuyIn);
        this.props.valueBuyFeatureScreen(Result?.config?.buyBonus?.buybonus)
        let hasfeature: any = [1];
        this.isApplicationBroken = false;
        let stateData = Result.state;
        if (stateData?.level) {
            this.props.setLevel(stateData.level);
            this.props.setPrevLevel(stateData.prevlevel);
        } else if (Result.state.status === "FREESPINS_TRIGGER" || Result.state.status === "FREESPINS") {
            this.props.setLevel(0);
            this.props.setPrevLevel(-1);
        }
        if (Result.state && Result.state.status === "FREESPINS_TRIGGER") {
            Result.bets.buyIn && this.props.setBuyInFeatureAmtDeduct(Result.bets.buyInValue / 100);
            constant.configGame.isFreegame = true;
            this.props.setApplicationBroken(true);
            this.isApplicationBroken = true;
            let countOfFreeGames = Result.state.totalFSAwarded;
            if (countOfFreeGames > 0) {
                hasfeature = [1];
                this.storePreviousFreeGameCount = countOfFreeGames;
            }
            let count = Result.state.freespinsRemaining;
            if (count === 0) {
                this.storePreviousFreeGameCount = 0;
            }
            this.props.storeMultiplierValue(Result.state.mult);
            this.props.setTotalWinAmount(Result.state.totalWin);

            this.props.setCurrentMysterySym(Result.state.currentMysterySym);

        } else {
            this.storePreviousFreeGameCount = 0;
            constant.configGame.isFreegame = false;
            hasfeature = [];
        }

        let freeGameCount = Result.state.totalFSAwarded - Result.state.freespinsRemaining;
        if (freeGameCount === 0) {
            freeGameCount = 1;
        }
        this.freeSpinCounter = Result.state.totalFSAwarded - Result.state.freespinsRemaining;
        if (Result.state.totalFSAwarded > 0) {

            this.props.setTotalCreditWinAmountInFreeGame(Number(Result.state.totalWin) - Number(Result.results.win.total));
        }
        let winningsInCascade = Result.results.win.total / 20 * Result.bets.stake;
        if (winningsInCascade > 0) {
            //  this.props.setApplicationBroken(true);
            if (Result.results.reels) {
                let reels = Result.results.reels;
                reels.forEach((data: any, reelId: any) => {
                    data.forEach((symbolId: any, rowId: any) => {
                        if (symbolId.payout) {
                            let blastPosition: object = {};
                            blastPosition = {
                                rowId: rowId + 1, reelId: reelId
                            }
                            this.blastPositionArray.push(2);
                        }
                    });
                });
            }

            this.lineWins = [
                {
                    id: 0,
                    multiplier: 0,
                    payId: '',
                    wildPositions: [],
                    positions: [],
                    coinWinPositions: [],
                    prize: 0
                }
            ];

        } else {
            this.lineWins = [];
        }

        this.winAmountDisplay = this.winAmountDisplay + Result.state.totalWin / 20 * Result.bets.stake;
        this.totalWinAmountFG = this.winAmountDisplay;
        let FWReelData = {
            stopReels: this.filteredreelData,
            reel_data: this.filteredreelData,
            feature: hasfeature,
            featureType: Result.state && (Result.state.status === "FREESPINS" ? "FREEGAME" : ""),
            betList: Result.config.betValues,
             currentBetIndex: Result.config.betValues.indexOf(Result.bets.stake || Result.config.defaultBetVal),
            //  currentBetIndex: Result.config.betValues.indexOf(Result.config.defaultBetVal),
            freegameSpinCount: this.freeSpinCounter,
            winAmount: this.winAmountDisplay,
            scatterWinnings: Result.state && (Result.state.totalWin),
            freegameSpinCountWin: Result.state.totalFSAwarded,
            freegameSpinCountRemaining: Result.state.freespinsRemaining,
        }
        if (Result.state.status === "FREESPINS") {

        }


        /*    if (this.props.maximumAutoplay !== 0) {
               if (this.props.maximumAutoplay === 50) {
                   this.props.setAutoplayList([5, 10, 20, 30, 50]);
               } else {
                   this.props.setAutoplayList(Result.config.autoPlayValues);
               }
           } else { */
        this.props.setAutoplayList(Result.config.autoPlayValues);
       /*  } */ let paytablePayoutsArray = Result.config.paytable;
        this.props.setBetList(FWReelData.betList);
        this.props.storeMultiplierValue(Result.state.mult);
        this.props.setPreMultiplier(Result.state.preMult);
        this.setReelStripData(0);

        //INIT
        // this.props.setApplicationBalance(balance);
        constant.configGame.balance = Number(balance)
        this.props.setReelInitSucces(FWReelData);
        this.props.setBaseGameInitSucces(FWReelData);
        this.props.setFreeeGameSpinSucces(FWReelData);
        this.props.setCoinList(coinList);
        this.props.setSelectedCoin(coinIndex);
        this.props.arrayOfPaytablePayouts(paytablePayoutsArray);
        this.setGameModel(Result);

        if (Result.state && Result.state.status === "FREESPINS_TRIGGER") {
            let count = Result.state.freespinsRemaining;
            // this.props.featureJustTriggered(true)
            if (count === 1) {
                this.props.setFeatureJustFinished();
            }
            // this.props.reconstructionScenario(true);

        }
        this.props.setApplicationWinAmount(FWReelData.winAmount);
        this.props.renderingStart(true);
        // UIManager.setDynamicComponent(DC, configGame);
        let wincordinate = [];
        //    (window as any).PROMO_ROUNDS_HANDLER._use && this.setPromotionalFreeRoundsData();
    }


    private setReconstructionData(Result: any): void {
        const { nextFreegame, startFreegame, setApplicationToBaseGameState, setTotalWinAmount, storeMultiplierValue } = this.props;



        if (constant.configGame.isReconstruction) {
            if (Result.config) {
                if (Result.state.status === "FREESPINS") {
                    this.props.setReconstrcutionInfreegame(true);
                    this.props.setCurrentMysterySym(Result.state.currentMysterySym);
                    this.props.setTotalNumberMysterySymbol(Result.state.totalNumMysterySym);
                    this.props.set_freegameSpinCountWinDuringReconstrcution(Result.state.totalFSAwarded - Result.state.wonAdditionalSpins);
                    setApplicationToBaseGameState(false);
                    startFreegame();

                    if (Result.state.freespinsRemaining === 0) {
                        this.props.setTotalWinAmount(Result.state.totalWin);
                    }
                    this.props.setReConstruction(true);
                } else if (Result.state.status === "FREESPINS_TRIGGER") {
                    this.props.setReConstruction(true);
                } else {
                    this.props.setReConstruction(false);
                }
            }
        } else {

            this.props.setReConstruction(false);
            this.props.setAllButtonEnable();
        }
    }



    setReelStrip() {
        const { setReelStrips } = this.props;
        const symbolsArray: any[] = [];
        if (!this.setReelsTrue) {
            symbolLevel1.forEach((symbolObject: any) => {
                // Get the property name (e.g., 'symbols_level_1')
                const propertyName = Object.keys(symbolObject)[0];
                symbolsArray.push(symbolObject[propertyName]);
            });
        }
        else if (this.setReelsTrue) {
            symbolLevel2.forEach((symbolObject: any) => {
                // Get the property name (e.g., 'symbols_level_2')
                const propertyName = Object.keys(symbolObject)[0];
                symbolsArray.push(symbolObject[propertyName]);
            });
        }
        const shuffle = (array: string[]) => { 
            for (let i = array.length - 1; i > 0; i--) { 
              const j = Math.floor(Math.random() * (i + 1)); 
              [array[i], array[j]] = [array[j], array[i]]; 
            } 
            return array; 
          }; 
          for (let i = 0; i < symbolsArray.length; i++) {
             symbolsArray[i] = shuffle(symbolsArray[i]);
           
        }
        const reelstrip: any = [];
        for (let i = 0; i < symbolsArray.length; i++) {           
            reelstrip.push(...symbolsArray[i]);
        }

        const finalReelStrip = Array.from({ length: 6 }, () => reelstrip);
        setReelStrips([finalReelStrip]);
    }

    useQuery = () => {
        let search = window.location.search;
        return new URLSearchParams(search);
    }

    setRadioButtonLocalStorageValue(introductionScreenVisible: any) {
        if (introductionScreenVisible) {
            localStorage.setItem("playerId-postIntro-" + this.useQuery().get("token"), "true");
        } else {
            localStorage.setItem("playerId-postIntro-" + this.useQuery().get("token"), "false");
        }
    }

    setRadioSoundButtonLocalStorageValue(soundIsPlaying: any) {
        if (soundIsPlaying) {
            localStorage.setItem("playerId-sound-" + this.useQuery().get("token"), "true");
        } else {
            localStorage.setItem("playerId-sound-" + this.useQuery().get("token"), "false");
        }
    }

    visibilitychange() {
        if (document.visibilityState === 'visible') {
            this.props.setApplicationPause(false);
        } else {
            this.props.setApplicationPause(true);
        }
    }

    render() {
        if (localStorage.getItem("playerId-postIntro-" + this.useQuery().get("token")) === null ||
            localStorage.getItem("playerId-postIntro-" + this.useQuery().get("token")) === undefined) {
            localStorage.setItem("playerId-postIntro-" + this.useQuery().get("token"), "true");
        }
        if (localStorage.getItem("playerId-sound-" + this.useQuery().get("token")) === null ||
            localStorage.getItem("playerId-sound-" + this.useQuery().get("token")) === undefined) {
            localStorage.setItem("playerId-sound-" + this.useQuery().get("token"), "true");
        }

        localStorage.setItem("playerId", this.useQuery().get("token") || "free");
        localStorage.setItem("bridgeUrl", this.useQuery().get("bridgeUrl") || "noURL");
        return (<div></div>)
    }
}



export default withPixiApp(connect(
    (state: Pick<GJIStore, 'soundState' | 'applicationState' | 'basegameState' | 'introductionState' | 'gameactionstate' | 'asyncInitAction' | 'asyncServerAction' | 'asyncGameLevelSeverState' | 'behaviourState' | 'freegameState'>): IStateToProps =>
    ({
        isInitResponseReceived: state.asyncInitAction.isInitResponseReceived,
        initResult: state.asyncInitAction.result,
        actionResult: state.gameactionstate.result,
        spinResult: state.asyncServerAction.result,
        error: state.asyncServerAction.error,
        featureType: state.basegameState.featureType,
        feature: state.basegameState.feature,
        basegamestate: state.basegameState.basegamestate,
        currentBetIndex: state.basegameState.currentBetIndex,
        betList: state.basegameState.betList,
        isResponseReceived: state.asyncServerAction.isResponseReceived,
        betListGameLevel: state.behaviourState.betList,
        inFreeGame: state.freegameState.inFreeGame,
        introductionScreenVisible: state.introductionState.introductionScreenVisible,
        reConstruction: state.basegameState.reConstruction,
        currencySymbolPrintedBefore: state.applicationState.currencySymbolPrintedBefore,
        currencyCode: state.applicationState.currencyCode,
        currencyGroupingSeparator: state.applicationState.currencyGroupingSeparator,
        currencyDecimalSeparator: state.applicationState.currencyDecimalSeparator,
        soundIsPlaying: state.soundState.soundIsPlaying,
        currentVoucherResult: state.gameactionstate.currentVoucherResult,
        currentVoucherSpinResult: state.asyncServerAction.currentVoucherResult,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        applicationResponsesend: (): any => dispatch(tokenAction.getApplicationActionResponse()),
        setBaseGameInitSucces: (result_reel: any): any => dispatch(baseGameAction.setBaseGameInitSucces(result_reel)),
        setReelInitSucces: (result_reel: any): any => dispatch(reelsActions.setReelInitSucces(result_reel)),
        setReConstruction: (reConstruction: boolean): any => dispatch(baseGameAction.setReConstruction(reConstruction)),
        setReelSpinSucces: (result_reel: any): any => dispatch(reelsActions.setReelSpinSucces(result_reel)),
        updateReelData: (result_reel: any): any => dispatch(reelsActions.updateReelData(result_reel)),
        setScatterDataBeforeFG: (scatterData: any): any => dispatch(behaviourAction.setScatterDataBeforeFG(scatterData)),
        setScatterDataAnticipation: (scatterData: any): any => dispatch(behaviourAction.setScatterDataAnticipation(scatterData)),
        setReelStrips: (reelStrips: any): any => dispatch(reelsActions.setReelStrips(reelStrips)),
        setReelStripsIndex: (currentReelStripIndex: number): any => dispatch(reelsActions.setReelStripsIndex(currentReelStripIndex)),
        setTopwinOddsShow: (showTopWinOdds: boolean): any => dispatch(applicationActions.setTopwinOddsShow(showTopWinOdds)),
        setApplicationEnableRiskLadder: (enableRiskLadder: boolean): any => dispatch(applicationActions.setApplicationEnableRiskLadder(enableRiskLadder)),
        setApplicationDecreaseBet: (decreaseBet: boolean): any => dispatch(applicationActions.setApplicationDecreaseBet(decreaseBet)),
        setApplicationIncreaseBet: (increaseBet: boolean): any => dispatch(applicationActions.setApplicationIncreaseBet(increaseBet)),
        setApplicationMaxBet: (maxBet: boolean): any => dispatch(applicationActions.setApplicationMaxBet(maxBet)),
        setApplicationShowPaytable: (showPaytable: boolean): any => dispatch(applicationActions.setApplicationShowPaytable(showPaytable)),
        setApplicationSpin: (spin: boolean): any => dispatch(applicationActions.setApplicationSpin(spin)),
        setApplicationAutoPlayLossLimitEnabled: (autoPlayLossLimitEnabled: boolean): any => dispatch(applicationActions.setApplicationAutoPlayLossLimitEnabled(autoPlayLossLimitEnabled)),
        setApplicationCurrencyAdditionalMultiplier: (currencyAdditionalMultiplier: number): any => dispatch(applicationActions.setApplicationCurrencyAdditionalMultiplier(currencyAdditionalMultiplier)),
        setApplicationDebugEnabled: (debugEnabled: boolean): any => dispatch(applicationActions.setApplicationDebugEnabled(debugEnabled)),
        setApplicationAutoPlaySpinStartValue: (autoPlaySpinStartValue: number): any => dispatch(applicationActions.setApplicationAutoPlaySpinStartValue(autoPlaySpinStartValue)),
        setApplicationAutoPlayLossLimitMandatory: (autoPlayLossLimitMandatory: boolean): any => dispatch(applicationActions.setApplicationAutoPlayLossLimitMandatory(autoPlayLossLimitMandatory)),
        setApplicationAutoPlaySingleWinLimitEnabled: (autoPlaySingleWinLimitEnabled: boolean): any => dispatch(applicationActions.setApplicationAutoPlaySingleWinLimitEnabled(autoPlaySingleWinLimitEnabled)),
        setApplicationAutoPlaySingleWinLimitMandatory: (autoPlaySingleWinLimitMandatory: boolean): any => dispatch(applicationActions.setApplicationAutoPlaySingleWinLimitMandatory(autoPlaySingleWinLimitMandatory)),
        setApplicationAutoPlayWinLimitEnabled: (autoPlayWinLimitEnabled: boolean): any => dispatch(applicationActions.setApplicationAutoPlayWinLimitEnabled(autoPlayWinLimitEnabled)),
        setApplicationAutoPlayWinLimitMandatory: (autoPlayWinLimitMandatory: boolean): any => dispatch(applicationActions.setApplicationAutoPlayWinLimitMandatory(autoPlayWinLimitMandatory)),
        setApplicationCheatingEnabled: (cheatingEnabled: boolean): any => dispatch(applicationActions.setApplicationCheatingEnabled(cheatingEnabled)),
        setApplicationCountryCode: (countryCode: string): any => dispatch(applicationActions.setApplicationCountryCode(countryCode)),
        setApplicationCurrencyCode: (currencyCode: string): any => dispatch(applicationActions.setApplicationCurrencyCode(currencyCode)),
        setApplicationCurrencyDecimalSeparator: (currencyDecimalSeparator: string): any => dispatch(applicationActions.setApplicationCurrencyDecimalSeparator(currencyDecimalSeparator)),
        setApplicationCurrencyGroupingSeparator: (currencyGroupingSeparator: string): any => dispatch(applicationActions.setApplicationCurrencyGroupingSeparator(currencyGroupingSeparator)),
        setApplicationCurrencyIgnoreDecimals: (currencyIgnoreDecimals: boolean): any => dispatch(applicationActions.setApplicationCurrencyIgnoreDecimals(currencyIgnoreDecimals)),
        setApplicationDisableQuickSpin: (disableQuickSpin: boolean): any => dispatch(applicationActions.setApplicationDisableQuickSpin(disableQuickSpin)),
        setApplicationDisableQuickStop: (disableQuickStop: boolean): any => dispatch(applicationActions.setApplicationDisableQuickStop(disableQuickStop)),
        setApplicationEnableAutoPlay: (enableAutoPlay: boolean): any => dispatch(applicationActions.setApplicationEnableAutoPlay(enableAutoPlay)),
        setApplicationEnableRiskCard: (enableRiskCard: boolean): any => dispatch(applicationActions.setApplicationEnableRiskCard(enableRiskCard)),
        setApplicationHistoryUrl: (historyUrl: string): any => dispatch(applicationActions.setApplicationHistoryUrl(historyUrl)),
        setApplicationHomeUrl: (homeUrl: string): any => dispatch(applicationActions.setApplicationHomeUrl(homeUrl)),
        setApplicationLanguageCode: (languageCode: string): any => dispatch(applicationActions.setApplicationLanguageCode(languageCode)),
        setApplicationRealityCheckTimePassedInSeconds: (realityCheckTimePassedInSeconds: number): any => dispatch(applicationActions.setApplicationRealityCheckTimePassedInSeconds(realityCheckTimePassedInSeconds)),
        setApplicationRealityCheckTimeoutInSeconds: (realityCheckTimeoutInSeconds: number): any => dispatch(applicationActions.setApplicationRealityCheckTimeoutInSeconds(realityCheckTimeoutInSeconds)),
        setApplicationSessionTimeoutInSeconds: (sessionTimeoutInSeconds: number): any => dispatch(applicationActions.setApplicationSessionTimeoutInSeconds(sessionTimeoutInSeconds)),
        setApplicationShowCloseButton: (showCloseButton: boolean): any => dispatch(applicationActions.setApplicationShowCloseButton(showCloseButton)),
        setApplicationShowFullScreenButton: (showFullScreenButton: boolean): any => dispatch(applicationActions.setApplicationShowFullScreenButton(showFullScreenButton)),
        setApplicationShowHelpButton: (showHelpButton: boolean): any => dispatch(applicationActions.setApplicationShowHelpButton(showHelpButton)),
        setApplicationShowRTP: (showRTP: boolean): any => dispatch(applicationActions.setApplicationShowRTP(showRTP)),
        setApplicationShowSettingsControl: (showSettingsControl: boolean): any => dispatch(applicationActions.setApplicationShowSettingsControl(showSettingsControl)),
        setApplicationShowTime: (showTime: boolean): any => dispatch(applicationActions.setApplicationShowTime(showTime)),
        setApplicationShowVolumeControl: (showVolumeControl: boolean): any => dispatch(applicationActions.setApplicationShowVolumeControl(showVolumeControl)),
        setBaseGameSpinSucces: (result_spin: any): any => dispatch(baseGameAction.setBaseGameSpinSucces(result_spin)),
        setApplicationToBaseGameState: (basegamestate: boolean): any => dispatch(baseGameAction.setApplicationToBaseGameState(basegamestate)),
        nextFreegame: (): any => dispatch(freegameActions.nextFreegame()),

        startFreegame: (): any => dispatch(freegameActions.startFreegame()),
        setReconstrcutionInfreegame: (reconstrcutionInFreegame: boolean): any => dispatch(freegameActions.setReconstrcutionInfreegame(reconstrcutionInFreegame)),

        setWinsSucces: (result_reel: any): any => dispatch(winpresentationAction.setWinsSucces(result_reel)),

        setApplicationWinAmount: (winAmount: number, wins: any): any => dispatch(baseGameAction.setApplicationWinAmount(winAmount, wins)),
        setCoinQueenSymbolWins: (coinQueenWins: any): any => dispatch(behaviourAction.setCoinQueenSymbolWins(coinQueenWins)),
        setCoinList: (coinList: any): any => dispatch(betPanelAction.setCoinList(coinList)),
        setSelectedCoin: (selectedCoin: number): any => dispatch(betPanelAction.setSelectedCoin(selectedCoin)),
        arrayOfPaytablePayouts: (paytablePayoutArray: any): any => dispatch(paytableAction.arrayOfPaytablePayouts(paytablePayoutArray)),
        setGameRtp: (storeRtp: string): any => dispatch(paytableAction.setGameRtp(storeRtp)),
        isSkipWin: (skipWin: boolean): any => dispatch(paytableAction.isSkipWin(skipWin)),
        relGridSymbolCountDisplay: (displayReelGridSymbolCount: any): any => dispatch(reelsActions.relGridSymbolCountDisplay(displayReelGridSymbolCount)),
        renderingStart: (startRendering: any): any => dispatch(asyncInitAction.renderingStart(startRendering)),
        setApplicationBroken: (gameBroken: any): any => dispatch(asyncInitAction.setApplicationBroken(gameBroken)),
        setTransitionBalance: (transitionBalance: number): any => dispatch(behaviourAction.setTransitionBalance(transitionBalance)),
        setMaxWinOddsCount: (maxWinOddsCount: number): any => dispatch(behaviourAction.setMaxWinOddsCount(maxWinOddsCount)),
        blastStart: (): any => dispatch(reelsActions.blastStart()),
        setPreviousBalance: (previousBalance: number): any => dispatch(behaviourAction.setPreviousBalance(previousBalance)),
        setBetList: (betList: any): any => dispatch(behaviourAction.setBetList(betList)),
        setFreeeGameSpinSucces: (result_spin: any): any => dispatch(freegameActions.setFreeeGameSpinSucces(result_spin)),
        set_freegameSpinCountWinDuringReconstrcution: (freegameSpinCountWinDuringReconstrcution: number): any => dispatch(freegameActions.set_freegameSpinCountWinDuringReconstrcution(freegameSpinCountWinDuringReconstrcution)),
        reTriggeredFreegame: (featureJustReTriggered: boolean): any => dispatch(freegameActions.reTriggeredFreegame(featureJustReTriggered)),
        featureJustTriggered: (featureJustTrigger: boolean): any => dispatch(freegameActions.featureJustTriggered(featureJustTrigger)),

        setTotalCreditWinAmount: (totalCreditWinAmount: number): any => dispatch(behaviourAction.setTotalCreditWinAmount(totalCreditWinAmount)),
        setTotalCreditWinAmountInFreeGame: (totalWinAmountInFreeGame: number): any => dispatch(behaviourAction.setTotalCreditWinAmountInFreeGame(totalWinAmountInFreeGame)),
        setTotalWinAmount: (totalWinAmount: number): any => dispatch(behaviourAction.setTotalWinAmount(totalWinAmount)),
        setFeatureJustFinished: (): any => dispatch(freegameActions.setFeatureJustFinished()),
        setApplicationCurrentBetIndex: (betIndex: number): any => dispatch(baseGameAction.setApplicationCurrentBetIndex(betIndex)),
        storeMultiplierValue: (storeMultiplierCurrentValue: number): any => dispatch(multiplierActions.storeMultiplierValue(storeMultiplierCurrentValue)),
        setPreMultiplier: (preMultiplier: number): any => dispatch(multiplierActions.setPreMultiplier(preMultiplier)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        setLandingPosition: (landingPosition: any): any => dispatch(landingSymbolAction.setLandingPosition(landingPosition)),
        introScreenOptionEnabled: (EnableIntroScreenOption: boolean): any => dispatch(desktopSettingPanelActions.introScreenOptionEnabled(EnableIntroScreenOption)),
        turboModeOptionEnabled: (EnableTurboModeOption: boolean): any => dispatch(desktopSettingPanelActions.turboModeOptionEnabled(EnableTurboModeOption)),
        setBetBoxCount: (betBoxCount: number): any => dispatch(behaviourAction.setBetBoxCount(betBoxCount)),
        playSymbolAnim: (): any => dispatch(winpresentationAction.playSymbolAnim()),
        setWinSymbolCoOrdinate: (winSymbolCoOrdinate: any): any => dispatch(winpresentationAction.setWinSymbolCoOrdinate(winSymbolCoOrdinate)),
        setApplicationAutoPlaySingleWinLimitPercentage: (autoPlaySingleWinLimitPercentage: number): any => dispatch(applicationActions.setApplicationAutoPlaySingleWinLimitPercentage(autoPlaySingleWinLimitPercentage)),
        setApplicationCurrencySymbolPrintedBefore: (currencySymbolPrintedBefore: boolean): any => dispatch(applicationActions.setApplicationCurrencySymbolPrintedBefore(currencySymbolPrintedBefore)),
        setApplicationShowSlotSessionStatistics: (showSlotSessionStatistics: boolean): any => dispatch(applicationActions.setApplicationShowSlotSessionStatistics(showSlotSessionStatistics)),
        setApplicationMinimumGameDurationMs: (minimumGameDurationMs: number): any => dispatch(applicationActions.setApplicationMinimumGameDurationMs(minimumGameDurationMs)),
        setApplicationMaxWinMultiplier: (maxWinMultiplier: number): any => dispatch(applicationActions.setApplicationMaxWinMultiplier(maxWinMultiplier)),
        setApplicationAutoPlayExpertMode: (autoPlayExpertMode: boolean): any => dispatch(applicationActions.setApplicationAutoPlayExpertMode(autoPlayExpertMode)),
        setApplicationAutoPlaySpinSteps: (autoPlaySpinSteps: object): any => dispatch(applicationActions.setApplicationAutoPlaySpinSteps(autoPlaySpinSteps)),
        setApplicationAutoPlaySimpleMode: (autoPlaySimpleMode: boolean): any => dispatch(applicationActions.setApplicationAutoPlaySimpleMode(autoPlaySimpleMode)),
        setApplicationLocale: (locale: string): any => dispatch(applicationActions.setApplicationLocale(locale)),
        setApplicationAutoPlaySpinResetToStartValue: (autoPlaySpinResetToStartValue: boolean): any => dispatch(applicationActions.setApplicationAutoPlaySpinResetToStartValue(autoPlaySpinResetToStartValue)),
        setApplicationAutoPlayWinLimitPercentage: (autoPlayWinLimitPercentage: number): any => dispatch(applicationActions.setApplicationAutoPlayWinLimitPercentage(autoPlayWinLimitPercentage)),
        setApplicationResponsibleGamingUrl: (responsibleGamingUrl: string): any => dispatch(applicationActions.setApplicationResponsibleGamingUrl(responsibleGamingUrl)),
        setApplicationShowResponsibleGamingIcon: (showResponsibleGamingIcon: boolean): any => dispatch(applicationActions.setApplicationShowResponsibleGamingIcon(showResponsibleGamingIcon)),
        setApplicationAutoPlayFreeGamesAutoStart: (autoPlayFreeGamesAutoStart: boolean): any => dispatch(applicationActions.setApplicationAutoPlayFreeGamesAutoStart(autoPlayFreeGamesAutoStart)),
        setApplicationAutoPlayLossLimitPercentage: (autoPlayLossLimitPercentage: number): any => dispatch(applicationActions.setApplicationAutoPlayLossLimitPercentage(autoPlayLossLimitPercentage)),
        setApplicationCurrencySymbol: (currencySymbol: string): any => dispatch(applicationActions.setApplicationCurrencySymbol(currencySymbol)),
        setSuppressCelebrationForWinsBelowStake: (suppressCelebrationForWinsBelowStake: Boolean): any => dispatch(applicationActions.setSuppressCelebrationForWinsBelowStake(suppressCelebrationForWinsBelowStake)),
        setApplicationResponsibleGamingIconPath: (responsibleGamingIconPath: string): any => dispatch(applicationActions.setApplicationResponsibleGamingIconPath(responsibleGamingIconPath)),
        setApplicationAutoPlayAbortOnFreeGameWinEnabled: (autoPlayAbortOnFreeGameWinEnabled: boolean): any => dispatch(applicationActions.setApplicationAutoPlayAbortOnFreeGameWinEnabled(autoPlayAbortOnFreeGameWinEnabled)),
        setApplicationRequestCommand: (requestCommand: boolean): any => dispatch(applicationActions.setApplicationRequestCommand(requestCommand)),
        setUpdateWinAfterWinAnimation: (updateWin: boolean): any => dispatch(behaviourAction.setUpdateWinAfterWinAnimation(updateWin)),
        currentTimeForRC: (storeCurrentTimeForRC: number): any => dispatch(behaviourAction.currentTimeForRC(storeCurrentTimeForRC)),
        setApplicationPause: (pause: boolean): any => dispatch(applicationActions.setApplicationPause(pause)),
        introScreenVisible: (showIntroScreen: boolean): any => dispatch(introductionActions.introScreenVisible(showIntroScreen)),
        introductionVisibleScreen: (introductionScreenVisible: boolean): any => dispatch(introductionActions.introductionVisibleScreen(introductionScreenVisible)),
        setTurboMode: (IsTurboMode: boolean): any => dispatch(reelsActions.setTurboMode(IsTurboMode)),
        turboToggleButton: (turboToggle: any): any => dispatch(desktopSettingPanelActions.turboToggleButton(turboToggle)),
        setIsGameSettingFirstTime: (isGameSettingFirstTime: Boolean): any => dispatch(applicationActions.setIsGameSettingFirstTime(isGameSettingFirstTime)),
        resetReelState: (): any => dispatch(reelsActions.resetReelState()),
        setApplicationJurisdictionKey: (jurisdictionKey: string): any => dispatch(applicationActions.setApplicationJurisdictionKey(jurisdictionKey)),
        stakeTore: (storeStake: number): any => dispatch(baseGameAction.stakeTore(storeStake)),
        setIsSoundPrint: (isSoundPrint: boolean): any => dispatch(applicationActions.setIsSoundPrint(isSoundPrint)),
        setIsSoundOnOff: (soundOnOff: boolean): any => dispatch(applicationActions.setIsSoundOnOff(soundOnOff)),
        winningSymbolDataStored: (storeWinningSymbolData: any): any => dispatch(behaviourAction.winningSymbolDataStored(storeWinningSymbolData)),
        setRequestSent: (requestSent: boolean): any => dispatch(behaviourAction.setRequestSent(requestSent)),
        setApplicationGameVersion: (gameVersion: string): any => dispatch(applicationActions.setApplicationGameVersion(gameVersion)),
        visibleNoInternetPopUp: (noInternetPopupVisible: boolean, text: string, closeButton: boolean, continueButton: boolean): any => dispatch(behaviourAction.visibleNoInternetPopUp(noInternetPopupVisible, text, closeButton, continueButton)),

        setIsLastWinSame: (isLastWinSame: boolean): any => dispatch(baseGameAction.setIsLastWinSame(isLastWinSame)),
        setIsDirectWinAdded: (isDirectWinAdded: boolean): any => dispatch(baseGameAction.setIsDirectWinAdded(isDirectWinAdded)),
        setCurrentVoucherResult: (currentVoucherResult: any): any => dispatch(tokenAction.setCurrentVoucherResult(currentVoucherResult)),
        totalWinAmountForBaseGame: (storeTotalWinAmountForBaseGame: number): any => dispatch(behaviourAction.totalWinAmountForBaseGame(storeTotalWinAmountForBaseGame)),
        setResultForBetVAlue: (RESULTSTACK: any): any => dispatch(buttonActions.setResultForBetVAlue(RESULTSTACK)),
        setAutoplayList: (autoplayList: any): any => dispatch(behaviourAction.setAutoplayList(autoplayList)),
        setLevel: (levelValue: any): any => dispatch(revealFeatureState.setLevel(levelValue)),
        setPrevLevel: (prevLevel: any): any => dispatch(revealFeatureState.setPrevLevel(prevLevel)),
        setTrasformSymbol: (setTramsform: any): any => dispatch(revealFeatureState.setTrasformSymbol(setTramsform)),
        setTotalNumberMysterySymbol: (totalMystery: number): any => dispatch(revealFeatureState.setTotalNumberMysterySymbol(totalMystery)),
        setCurrentMysterySym: (currentMystery: number): any => dispatch(revealFeatureState.setCurrentMysterySym(currentMystery)),
        setPostFeature: (isPostFeature: boolean): any => dispatch(revealFeatureState.setPostFeature(isPostFeature)),
        setMysteryCoinList: (mysteryCoinList: any): any => dispatch(revealFeatureState.setMysteryCoinList(mysteryCoinList)),
        featureExists: (containsFeature: boolean): any => dispatch(featureAction.featureExists(containsFeature)),
        setShowOutrobanner: (showOutroBanner: boolean): any => dispatch(freegameActions.setShowOutrobanner(showOutroBanner)),
        setWinsStoreDataForFG: (resultWinSpinInFG: any): any => dispatch(featureAction.setWinsStoreDataForFG(resultWinSpinInFG)),
        setSymbolAnimationPosition: (symbolAnimationPosition: any): any => dispatch(winpresentationAction.setSymbolAnimationPosition(symbolAnimationPosition)),
        setFreeSpinAdded: (freeSpinAdd: number): any => dispatch(featureAction.setFreeSpinAdded(freeSpinAdd)),
        setSpinStopButtonDeActivate: (deActivate: boolean): any => dispatch(behaviourAction.setSpinStopButtonDeActivate(deActivate)),
        visibleBuyFeatureScreen: (value: boolean): any => dispatch(buyFeatureActions.visibleBuyFeatureScreen(value)),
        valueBuyFeatureScreen: (value: number): any => dispatch(buyFeatureActions.valueBuyFeatureScreen(value)),
        setSliderValue: (storeSliderValue: number): any => dispatch(keyBoardAction.setSliderValue(storeSliderValue)),
    }))(ServerComm));
