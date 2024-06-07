import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { actions as asyncServerActions } from "../../core/reducers/asyncServerResponseReducer";
import withWrapperCommConfiguration from "./configuration/withWrapperCommConfiguration";
import { applicationActions,soundActions,paytableActions ,baseGameAction,buttonActions,
    keyboardListenerActions} from "@bonanzainteractive/slote_core";
import { isMobile } from "react-device-detect";
import { UIManager, GSAPTimer } from "@bonanzainteractive/core";


interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}

interface IStateToProps {
    isRequestSent: boolean;
    gamePause: boolean;
    loadingPercent: number;
    initResult: object;
    balanceResult: object;
    balanceInGame: number;
    spinResult: object;
    selectedCoin: number;
    coinList: any;
    spinStart: boolean;
    callFlowManager: boolean;
    inFreeGame: boolean;
    inAutoplay: boolean;
    autoplayCount: number;
    soundLoadStart: boolean;
    soundIsPlaying: boolean;
    InTurboMode: boolean;
    showPaytable: boolean;
    showSettingGameRules: any;
    isshowBetHistory: any;
    buyInFeatureDeductAmt: any;
    blastStart: boolean;
    startWinShower: boolean;
    startWinCelebration: boolean;
}

interface IDispatchToProps {
    [x: string]: any;
}

interface IState {
    [x: string]: any;
}

class WrapperComm extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected callback: any;
    protected netProfitloss: number;
    protected UIManagerRef: any;
    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.netProfitloss = 0;
        this.callback = () => { };
        this.UIManagerRef = UIManager.getRef;
    }

    hideOtherControls() {
        this.UIManagerRef("btn_history").visible = false;
        this.UIManagerRef("btn_setting").visible = true;
        this.UIManagerRef("btn_game_rules").visible = true;
        this.props.showSettingGameRules(false);
        this.props.setShowGameSettings(false);
        let ui_mode = ";"
        if (isMobile) {
            ui_mode = "mobile";
        } else {
            ui_mode = "desktop";
        }
        this.UIManagerRef("btn_spin") && (UIManager.getRef("btn_spin").visible = false);
        this.UIManagerRef("btn_autoplay_stop" + ui_mode) && (UIManager.getRef("btn_autoplay_stop" + ui_mode).visible = false);
        this.UIManagerRef("btn_autoplay_start") && (UIManager.getRef("btn_autoplay_start").visible = false);
        this.UIManagerRef("btn_autoplay") && (UIManager.getRef("btn_autoplay").visible = false);
        this.UIManagerRef("btn_stake") && (UIManager.getRef("btn_stake").visible = false);
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        return true;
    }

    shouldComponentUpdate_(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.gamePause != this.props.gamePause) {
            if (!nextProps.gamePause) {
                this.props.setBlockLayer(false);
            } else {
                this.props.setBlockLayer(true);
            }
        }
        if (nextProps.initResult != this.props.initResult
            || nextProps.isRequestSent != this.props.isRequestSent
            || nextProps.balanceResult != this.props.balanceResult
            || nextProps.selectedCoin != this.props.selectedCoin
            || nextProps.loadingPercent != this.props.loadingPercent
            || nextProps.spinStart != this.props.spinStart
            || nextProps.callFlowManager != this.props.callFlowManager
            || nextProps.inFreeGame != this.props.inFreeGame
            || nextProps.blastStart != this.props.blastStart
            || nextProps.autoplayCount != this.props.autoplayCount
            || nextProps.inAutoplay != this.props.inAutoplay
            || nextProps.InTurboMode != this.props.InTurboMode
            || nextProps.soundLoadStart != this.props.soundLoadStart
            || nextProps.soundIsPlaying != this.props.soundIsPlaying
            || nextProps.isshowBetHistory != this.props.isshowBetHistory
            || nextProps.showSettingGameRules != this.props.showSettingGameRules
            || nextProps.showPaytable != this.props.showPaytable
            || nextProps.balanceInGame != this.props.balanceInGame
            || nextProps.startWinCelebration != this.props.startWinCelebration
            || nextProps.startWinShower != this.props.startWinShower
            || nextProps.spinResult != this.props.spinResult) {
            if (nextProps.spinResult != this.props.spinResult && nextProps.spinResult && nextProps.spinResult.data.response.errorcode) {
                if (nextProps.spinResult.data.response.errorcode == -500) {
                }

                if (Number(nextProps.spinResult.data.response.errorcode) > -800 && Number(nextProps.spinResult.data.response.errorcode) < -699 && (window as any).GAME_INFO.playingForReal && (window as any).MESSAGE_HANDLER_INIT.use()) {
                    this.props.setApplicationPause(true);
                    (window as any).MESSAGE_HANDLER_INIT.check(() => {
                        this.props.setApplicationPause(false);
                        // reset state
                        this.props.setAllButtonEnable();
                    }, 'error')
                }

                (window as any).CLIENT_WRAPPER_INIT.send("error", [nextProps.spinResult.data.response.errorcode, nextProps.spinResult.data.response.errordesc]);
                !((window as any).GAME_INFO.NYX && (window as any).CLIENT_WRAPPER_INIT.use) && (window as any).GAME_INFO.UI.error.show(nextProps.spinResult.data.response.errorcode, nextProps.spinResult.data.response.errordesc);
                return false
            }
            if (nextProps.initResult != this.props.initResult && nextProps.initResult && nextProps.initResult.data.response.errorcode) {
                if (nextProps.initResult.data.response.errorcode == -500) {

                }
                (window as any).CLIENT_WRAPPER_INIT.send('load-fail');
                (window as any).CLIENT_WRAPPER_INIT.send("error", [nextProps.initResult.data.response.errorcode, nextProps.initResult.data.response.errordesc]);
                !((window as any).GAME_INFO.NYX && (window as any).CLIENT_WRAPPER_INIT.use) && (window as any).GAME_INFO.UI.error.show(nextProps.spinResult.data.response.errorcode, nextProps.spinResult.data.response.errordesc);

                return false
            }
            if (nextProps.autoplayCount > 0 && nextProps.autoplayCount != this.props.autoplayCount) {
                (window as any).CLIENT_WRAPPER_INIT.send('autoplay-remaining', nextProps.autoplayCount);
            }
            if (nextProps.isshowBetHistory && nextProps.isshowBetHistory != this.props.isshowBetHistory) {
                (window as any).CLIENT_WRAPPER_INIT.send('history-open');
                this.props.spaceBarSpin(false);
            }
            if (!nextProps.isshowBetHistory && nextProps.isshowBetHistory != this.props.isshowBetHistory) {
                (window as any).CLIENT_WRAPPER_INIT.send('history-close');
            }
            if (nextProps.showSettingGameRules && nextProps.showSettingGameRules != this.props.showSettingGameRules) {
                (window as any).CLIENT_WRAPPER_INIT.send('help-open');
                this.props.spaceBarSpin(false);
            }
            if (!nextProps.showSettingGameRules && nextProps.showSettingGameRules != this.props.showSettingGameRules) {
                (window as any).CLIENT_WRAPPER_INIT.send('help-close');
            }
            if (nextProps.showPaytable && nextProps.showPaytable != this.props.showPaytable) {
                (window as any).CLIENT_WRAPPER_INIT.send('paytable-open');
            }
            if (!nextProps.showPaytable && nextProps.showPaytable != this.props.showPaytable) {
                (window as any).CLIENT_WRAPPER_INIT.send('paytable-close');
            }
            if (nextProps.inAutoplay && nextProps.inAutoplay != this.props.inAutoplay) {
                (window as any).CLIENT_WRAPPER_INIT.send('autoplay-start');
            }
            if (!nextProps.inAutoplay && nextProps.inAutoplay != this.props.inAutoplay) {
                (window as any).CLIENT_WRAPPER_INIT.send('autoplay-end');
            }
            if (nextProps.blastStart && nextProps.blastStart != this.props.blastStart) {
                if ((window as any).GAME_INFO.UI && (window as any).GAME_INFO.UI.realityCheck) {
                    (window as any).GAME_INFO.UI.realityCheck.delay = true;   //Delay reality check from being displayed whilst in tumble/bonus
                }
            }
            if (nextProps.startWinShower && nextProps.startWinShower != this.props.startWinShower
                || nextProps.startWinCelebration && nextProps.startWinCelebration != this.props.startWinCelebration
            ) {
                if ((window as any).GAME_INFO.UI && (window as any).GAME_INFO.UI.realityCheck) {
                    (window as any).GAME_INFO.UI.realityCheck.delay = true;   //Delay reality check from being displayed whilst in tumble/bonus
                }
            }
            if (!nextProps.startWinShower && nextProps.startWinShower != this.props.startWinShower
                || !nextProps.startWinCelebration && nextProps.startWinCelebration != this.props.startWinCelebration
            ) {
                if (!nextProps.inFreeGame) {
                    (window as any).GAME_INFO.UI && (window as any).GAME_INFO.UI.realityCheck && (window as any).GAME_INFO.UI.realityCheck.delayAction.dispatch();
                }
            }
            if (nextProps.inFreeGame && nextProps.inFreeGame != this.props.inFreeGame) {
                if ((window as any).GAME_INFO.UI && (window as any).GAME_INFO.UI.realityCheck) {
                    (window as any).GAME_INFO.UI.realityCheck.delay = true;   //Delay reality check from being displayed whilst in tumble/bonus
                }
                (window as any).CLIENT_WRAPPER_INIT.send('feature-start');
            }
            if (!nextProps.inFreeGame && !nextProps.startWinShower && !nextProps.startWinCelebration && nextProps.inFreeGame != this.props.inFreeGame) {
                GSAPTimer.getInstance().addTimer(1000 / 1000, () => {
                    (window as any).GAME_INFO.UI && (window as any).GAME_INFO.UI.realityCheck && (window as any).GAME_INFO.UI.realityCheck.delayAction.dispatch();
                    (window as any).CLIENT_WRAPPER_INIT.send('feature-end');
                });
            }
            if (nextProps.InTurboMode && nextProps.InTurboMode != this.props.InTurboMode) {

                (window as any).CLIENT_WRAPPER_INIT.send('quickspin-enable');
            }
            if (!nextProps.InTurboMode && nextProps.InTurboMode != this.props.InTurboMode) {

                (window as any).CLIENT_WRAPPER_INIT.send('quickspin-disable');
            }
            if (nextProps.spinStart && nextProps.spinStart != this.props.spinStart) {
                // (window as any).CLIENT_WRAPPER_INIT.send('play-start');
            }
            if (nextProps.callFlowManager && nextProps.callFlowManager != this.props.callFlowManager) {

                if (!nextProps.inFreeGame && !nextProps.startWinShower && !nextProps.startWinCelebration) {
                    (window as any).GAME_INFO.UI && (window as any).GAME_INFO.UI.realityCheck && (window as any).GAME_INFO.UI.realityCheck.delayAction.dispatch();
                }
                if (nextProps.spinResult.data && nextProps.spinResult.data.response.bet.addBalance) {
                    let SESSION_BAR = (window as any).f1x2.SESSION_BAR;
                    SESSION_BAR && SESSION_BAR.updateNet(nextProps.spinResult.data.response.bet.addBalance);
                }

                if (nextProps.buyInFeatureDeductAmt == 0) {

                    if (nextProps.balanceInGame != null) {
                        let balcObj: any;
                        balcObj = {
                            balance: Number(nextProps.balanceInGame), // balance current in game balance
                            mode: "stake", // 'place' start of round | 'settle' end of round 
                            stake: Number(nextProps.coinList[nextProps.selectedCoin])// current in game stake
                        };

                        (window as any).CLIENT_WRAPPER_INIT.send("value-balance", balcObj);

                    }
                    (window as any).CLIENT_WRAPPER_INIT.send("value-win", nextProps.spinResult.data.response.bet.addBalance);
                    if ((window as any).GAME_INFO.playingForReal && (window as any).MESSAGE_HANDLER_INIT.use()) {
                        this.props.setApplicationPause(true);
                        (window as any).MESSAGE_HANDLER_INIT.check(() => {
                            this.props.setApplicationPause(false);
                            // continue game play
                        }, 'results');
                    }
                }
                (window as any).CLIENT_WRAPPER_INIT.send('play-end');
            }
            if (nextProps.soundIsPlaying && nextProps.soundIsPlaying != this.props.soundIsPlaying) {

                (window as any).CLIENT_WRAPPER_INIT.send('audio-enable');
            }
            if (!nextProps.soundIsPlaying && nextProps.soundIsPlaying != this.props.soundIsPlaying) {

                (window as any).CLIENT_WRAPPER_INIT.send('audio-disable');
            }
            if (nextProps.soundLoadStart && nextProps.soundLoadStart != this.props.soundLoadStart) {

                (window as any).CLIENT_WRAPPER_INIT.send('audio-enable');
            }
            if (!nextProps.soundLoadStart && nextProps.soundLoadStart != this.props.soundLoadStart) {

                (window as any).CLIENT_WRAPPER_INIT.send('audio-disable');
            }
            if (nextProps.isRequestSent && nextProps.isRequestSent != this.props.isRequestSent) {
                let SESSION_BAR = (window as any).f1x2.SESSION_BAR;
                SESSION_BAR && SESSION_BAR.updateNet(-nextProps.coinList[nextProps.selectedCoin]);
                (window as any).CLIENT_WRAPPER_INIT.send('play-start');
                (window as any).CLIENT_WRAPPER_INIT.send("value-win", 0);
            }
            if (nextProps.spinStart && nextProps.spinStart != this.props.spinStart) {
                if (nextProps.balanceInGame != null) {
                    let balcObj: any;
                    balcObj = {
                        balance: Number(nextProps.balanceInGame), // balance current in game balance
                        mode: "stake", // 'place' start of round | 'settle' end of round 
                        stake: Number(nextProps.coinList[nextProps.selectedCoin])// current in game stake
                    };

                    (window as any).CLIENT_WRAPPER_INIT.send("value-balance", balcObj);
                    if ((window as any).GAME_INFO.playingForReal && (window as any).MESSAGE_HANDLER_INIT.use()) {
                        this.props.setApplicationPause(true);
                        (window as any).MESSAGE_HANDLER_INIT.check(() => {
                            this.props.setApplicationPause(false);
                            // continue game play
                        }, 'place');
                    } else {
                        // continue game play
                    }
                }
            }

            if (nextProps.selectedCoin != this.props.selectedCoin) {
                let convert_Number = Number((nextProps.coinList[nextProps.selectedCoin]).toFixed(2) * 100);
                (window as any).GAME_INFO.stake = convert_Number.toFixed(0);
                (window as any).CLIENT_WRAPPER_INIT.send("value-stake", Number(nextProps.coinList[nextProps.selectedCoin]));
            }
            if (nextProps.loadingPercent > 0 && nextProps.loadingPercent != this.props.loadingPercent) {

                (window as any).CLIENT_WRAPPER_INIT.send('load-progress', Math.floor(nextProps.loadingPercent));
            }
            if (nextProps.initResult != this.props.initResult) {
                let balcObj: any;
                balcObj = {
                    balance: Number(nextProps.balanceInGame), // balance current in game balance
                    mode: "stake", // 'place' start of round | 'settle' end of round 
                    stake: Number(nextProps.coinList[nextProps.selectedCoin])  // current in game stake
                };

                (window as any).CLIENT_WRAPPER_INIT.send("value-balance", balcObj);
                (window as any).CLIENT_WRAPPER_INIT.send("value-stake", Number(nextProps.coinList[nextProps.selectedCoin]));
                (window as any).GAME_INFO.UI.realityCheck && (window as any).GAME_INFO.UI.realityCheck.timeout();
                (window as any).GAME_INFO.UI.realityCheck && (window as any).GAME_INFO.UI.realityCheck.onVisibilityChange.add((v_: any) => {
                    if (v_) {
                        this.props.spaceBarSpin(false);
                        this.props.setApplicationPause(true);
                    } else {
                        this.props.spaceBarSpin(true);
                        this.props.setApplicationPause(false);
                    }

                });
                (window as any).GAME_INFO.UI.realityCheck && (window as any).GAME_INFO.UI.realityCheck.onShowHistory.add((close_: any) => {
                    this.props.setBlockLayer(false);
                    this.props.spaceBarSpin(false);
                    this.hideOtherControls();
                    if (isMobile) {
                        this.props.showSettingPanelContainerForMobile(true, 'history');
                        this.props.setApplicationButtonpanelVisibility(false);
                    } else {
                        this.props.getApplicationHistoryResponse();
                        this.props.setMenuButtonClicked(true);
                        this.props.showBetHistory(true);
                    }
                    this.callback = close_;
                });
                if (nextProps.initResult != undefined) {

                    (window as any).GAME_INFO.playingForReal && (window as any).GAME_INFO.messageHandler();
                }
                let aams = new (window as any).GAME_INFO.UI.AAMSBar(
                    (window as any).GAME_INFO.jurisdiction,
                    (window as any).GAME_INFO.fun_real,
                    (window as any).GAME_INFO.AAMS_LINK,
                    (window as any).GAME_INFO.RESPONSIBLE_LINK,
                    (window as any).GAME_INFO.SHOW_AAMS_TICKET === 'true',
                    (window as any).GAME_INFO.AAMS_TICKET_LABEL,
                    (window as any).GAME_INFO.AAMS_TICKET,
                    (window as any).GAME_INFO.SHOW_AAMS_SESSION === 'true',
                    (window as any).GAME_INFO.AAMS_SESSION_LABEL,
                    (window as any).GAME_INFO.AAMS_SESSION
                );
                aams.render(document.getElementById('root'));
                let rtp = new (window as any).GAME_INFO.UI.RTP(
                    (window as any).GAME_INFO.gameID,
                    (window as any).GAME_INFO.jurisdiction,
                    (window as any).GAME_INFO.site,
                    (window as any).GAME_INFO.path,
                    (window as any).GAME_INFO.lang,
                    (window as any).GAME_INFO.fun_real,
                    (window as any).GAME_INFO.clientName,
                    (window as any).GAME_INFO.channel,
                    (window as any).GAME_INFO.currency,
                    (window as any).GAME_INFO.ex_rate
                );
                rtp.render(document.getElementById('root'));
                (window as any).CLIENT_WRAPPER_INIT.send('load-end');
                (window as any).CLIENT_WRAPPER_INIT.send("value-win", 0);
            }
            return false
        }
        return true
    }

    render() {
        return (<></>);
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'winShowerState' | 'winCelebrationState' | 'betPanelState' | 'behaviourState' | 'paytableState' | 'soundState' | 'basegameState' | 'applicationState' | 'freegameState' | 'asyncServerAction' | 'asyncInitAction' | 'reelgridState' | 'flowManagerState'>): IStateToProps =>
    ({
        isRequestSent: state.asyncServerAction.isRequestSent,
        gamePause: state.applicationState.gamePause,
        loadingPercent: state.asyncInitAction.loadingPercent,
        initResult: state.asyncInitAction.result,
        balanceResult: state.asyncInitAction.balanceResult,
        balanceInGame: state.basegameState.balance,
        spinResult: state.asyncServerAction.result,
        selectedCoin: state.betPanelState.selectedCoin,
        coinList: state.betPanelState.coinList,
        spinStart: state.reelgridState.spinStart,
        callFlowManager: state.flowManagerState.callFlowManager,
        inFreeGame: state.freegameState.inFreeGame,
        inAutoplay: state.basegameState.inAutoplay,
        autoplayCount: state.basegameState.autoplayCount,
        soundLoadStart: state.soundState.soundLoadStart,
        soundIsPlaying: state.soundState.soundIsPlaying,
        InTurboMode: state.reelgridState.InTurboMode,
        showPaytable: state.paytableState.showPaytable,
        showSettingGameRules: state.behaviourState.showSettingGameRules,
        isshowBetHistory: state.behaviourState.isshowBetHistory,
        buyInFeatureDeductAmt: state.behaviourState.buyInFeatureDeductAmt,
        blastStart: state.reelgridState.blastStart,
        startWinShower: state.winShowerState.startWinShower,
        startWinCelebration: state.winCelebrationState.startWinCelebration,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationAutoplayCount: (autoplaycount: number): any => dispatch(baseGameAction.setApplicationAutoplayCount(autoplaycount)),
        getApplicationHistoryResponse: (): any => dispatch(asyncServerActions.getApplicationHistoryResponse()),
        setApplicationBalance: (balanceResult: any): any => dispatch(baseGameAction.setApplicationBalance(balanceResult)),
        showPaytable: (): any => dispatch(paytableActions.showPaytable()),
        playingSound: (soundIsPlaying: boolean): any => dispatch(soundActions.playingSound(soundIsPlaying)),
        setApplicationButtonpanelVisibility: (visible: boolean): any => dispatch(applicationActions.setApplicationButtonpanelVisibility(visible)),
        spaceBarSpin: (spinWithSpaceBar: boolean): any => dispatch(keyboardListenerActions.spaceBarSpin(spinWithSpaceBar)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),

    }))(withWrapperCommConfiguration(WrapperComm)));