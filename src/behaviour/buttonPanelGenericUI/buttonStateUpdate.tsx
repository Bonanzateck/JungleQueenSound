import { withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
    autoplayActions, flowManagerAction, gridActions, layoutssActions, winpresentationAction, asyncActions, baseGameAction, buttonActions,
    reelsActions, reelsGridActions, withButtonPanelConfiguration
} from "@bonanzainteractive/slote_core";


import { actions as menuActions } from "../../core/reducers/menuReducer";
import { actions as betPanelAction } from "../../core/reducers/betPanelReducer";
import { configGame } from "../../slot/data/config";
import { actions as gameLevelResponseActions } from "../../gamereducer/asyncGameLevelServerResponseReducer";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { ButtonPanelGenericUISuper, isMobile } from "./configuration/buttonPanelGenericUIBase";
import { IStateToProps } from "./interface/IStateToProps";

interface IProps {
    [x: string]: any;
}

interface IStore {
    [x: string]: any;
}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class buttonStateUpdate extends ButtonPanelGenericUISuper {


    constructor(props: IProps, state: IState) {
        super(props);
        this.startSpinByMaxClicked = false;
    }

    buttonStateAccordingToBet() {
        if (this.props.balance < this.props.coinList[this.props.selectedCoin] || this.props.balance < this.props.coinList[this.props.currentBetIndex + 1]) {
            this.props.setSelectedCoin(this.props.currentBetIndex - 1)
        }
    }
    //this method helps to set the property true for spinning
    onSpin() {
        let condition = true;
        if (this.props.firstSpinAfterLoad) {
            condition = ((this.props.balance - this.props.coinList[this.props.selectedCoin] >= this.props.coinList[this.props.selectedCoin]) || (this.props.balance - this.props.coinList[this.props.selectedCoin]) == 0) || ((this.props.balance - this.props.coinList[this.props.selectedCoin]) >= 0);
            this.props.spinAfterLoad(false);
        }
        else {
            condition = ((this.props.balance >= this.props.coinList[this.props.selectedCoin]));
        }
        if (condition) {
            this.storeCurrentBet = this.props.coinList[this.props.selectedCoin];
            this.props.getApplicationSpinResponse();
            this.props.setStopActive(true);
            this.props.stopWinPresentation();
            this.props.setAllButtonDisable();
            this.props.resetReelState();
        }
        else {
            if ((this.props.balance - this.props.coinList[this.props.selectedCoin]) > 0) {
                this.disableAllBtn(["btn_bet_decrease"]);
            }
            else {
                this.disableAllBtn();
            }
        }
        this.props.setCspStart(true);
    }


    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.enableParticularButton !== this.props.enableParticularButton) {
            return false;
        }
        if (nextProps.currentBetIndex !== this.props.currentBetIndex || nextProps.allButtonEnable !== this.props.allButtonEnable ||
            nextProps.showWinCelebration !== this.props.showWinCelebration || nextProps.autoplayCount !== this.props.autoplayCount ||
            nextProps.autoplayNextSpin !== this.props.autoplayNextSpin || nextProps.inAutoplay !== this.props.inAutoplay ||
            nextProps.showAutoplayUI !== this.props.showAutoplayUI || nextProps.feature !== this.props.feature ||
            nextProps.spinResponseReceived !== this.props.spinResponseReceived || nextProps.layoutMode !== this.props.layoutMode ||
            nextProps.spinStart !== this.props.spinStart || nextProps.allSpinComplete !== this.props.allSpinComplete ||
            nextProps.selectedCoin !== this.props.selectedCoin || nextProps.featureJustFinished !== this.props.featureJustFinished ||
            nextProps.increaseBetResult !== this.props.increaseBetResult || nextProps.isSlamSpin !== this.props.isSlamSpin ||
            nextProps.isRemoveKeyBoardEvent !== this.props.isRemoveKeyBoardEvent || nextProps.startSpinBySpaceBar !== this.props.startSpinBySpaceBar ||
            nextProps.reConstruction !== this.props.reConstruction || nextProps.betIncrease !== this.props.betIncrease ||
            nextProps.betDecrease !== this.props.betDecrease) {

            if (nextProps.reConstruction && nextProps.reConstruction !== this.props.reConstruction) {
                this.intrectionOff(true);
                this.props.data.betresult = nextProps.resultStack;
                this.props.setAllButtonDisable();
                this.props.setCspStart(true);
                return false;
            }
            if (nextProps.layoutMode !== this.props.layoutMode) {
                this.layoutChange(nextProps.layoutMode);
                return true;
            }
            if (nextProps.spinStart) {
                nextProps.particularButtonEnable(false);
                this.props.flowManagerCalled(false);
                // Enable only Decrease Balance Button and stop spin @11 May 2023
                let currentBalance = this.props.balance - this.props.coinList[this.props.currentBetIndex];
                if (this.props.winAmount !== 0) {
                    currentBalance = (this.props.balance - this.props.coinList[this.props.currentBetIndex]) + nextProps.storeTotalWinAmountForBaseGame;
                }
                if (nextProps.reConstruction) {
                    currentBalance = this.props.balance;
                }
                if (currentBalance <= this.props.coinList[this.props.currentBetIndex]) {
                    if ((currentBalance > this.props.coinList[this.props.currentBetIndex]) || (currentBalance < this.props.coinList[this.props.currentBetIndex])) {
                        this.props.buttonPanelUpdateState({ stopGameMinBlance: true });
                        this.props.stopAutoplay();
                        (currentBalance === 0 || (this.props.currentBetIndex === 0 && this.props.coinList[this.props.currentBetIndex] > currentBalance)) ? this.disableAllBtn() : this.disableAllBtn(["btn_bet_decrease"]);
                    }
                    if (currentBalance === this.props.coinList[0]) {
                        if (nextProps.reConstruction) {
                            this.disableAllBtn(["btn_autoplay"]);
                        }

                    } else if (currentBalance < this.props.coinList[this.props.currentBetIndex] && currentBalance < this.props.coinList[0]) {
                        this.props.stopAutoplay();
                    }
                }
                else if (currentBalance <= this.props.coinList[this.props.currentBetIndex] && nextProps.reConstruction) {
                    this.props.stopAutoplay();

                }
                else if (nextProps.reConstruction && this.props.balance - this.props.coinList[this.props.currentBetIndex] < this.props.coinList[this.props.currentBetIndex]) {
                    this.props.stopAutoplay();

                }
            }
            if (nextProps.allSpinComplete) {
                this.props.setApplicationSpinButtonClicked(false);
            }
            if (nextProps.spinResponseReceived && nextProps.spinResponseReceived !== this.props.spinResponseReceived) {
                nextProps.startSpin();
            }
            if (nextProps.autoplayCount > 0 && nextProps.inAutoplay && nextProps.autoplayNextSpin
                || nextProps.autoplayCount > 0 && nextProps.featureJustFinished) {

                !nextProps.enableParticularButton && this.disableAllBtn();
                if (!nextProps.inFreeGame) {
                    if (nextProps.featureJustReTriggered === false && !nextProps.showWinCelebration) {
                        if (nextProps.allSpinComplete && !nextProps.winPresentationStart) {
                            this.spinCallingWhileAutoplay(nextProps);
                        }
                    }
                }
            }
            if (this.props.inFreeGame) {
                this.disableAllBtn();
            }
            if (nextProps.showWinCelebration !== this.props.showWinCelebration) {
                nextProps.showWinCelebration && this.disableAllBtn();
            }


        }
        return false;
    }
    protected intrectionOff(flg: boolean = false): void {

        this.UIManagerRef(this.button_name_1) && (this.UIManagerRef(this.button_name_1).interactive = flg);
        this.UIManagerRef(this.button_name_2) && (this.UIManagerRef(this.button_name_2).interactive = flg)
        this.UIManagerRef(this.button_name_3) && (this.UIManagerRef(this.button_name_3).interactive = flg);
        this.UIManagerRef(this.button_name_4) && (this.UIManagerRef(this.button_name_4).interactive = flg);

        this.UIManagerRef(this.button_name_5) && (this.UIManagerRef(this.button_name_5).interactive = flg);
        this.UIManagerRef(this.button_name_6) && (this.UIManagerRef(this.button_name_6).interactive = flg);
        this.UIManagerRef(this.button_name_7) && (this.UIManagerRef(this.button_name_7).interactive = flg);
        this.UIManagerRef(this.button_name_8) && (this.UIManagerRef(this.button_name_8).interactive = flg);

        // this.UIManagerRef(this.button_name_9) && (this.UIManagerRef(this.button_name_9).interactive = flg);
        this.UIManagerRef(this.button_name_10) && (this.UIManagerRef(this.button_name_10).interactive = flg);
        this.UIManagerRef(this.button_name_11) && (this.UIManagerRef(this.button_name_11).interactive = flg);
        this.UIManagerRef(this.button_name_12) && (this.UIManagerRef(this.button_name_12).interactive = flg);

        this.UIManagerRef(this.button_name_13) && (this.UIManagerRef(this.button_name_13).interactive = flg);
        this.UIManagerRef(this.button_name_14) && (this.UIManagerRef(this.button_name_14).interactive = flg);
        this.UIManagerRef(this.button_name_16) && (this.UIManagerRef(this.button_name_16).interactive = flg);
        this.UIManagerRef(this.button_name_17) && (this.UIManagerRef(this.button_name_17).interactive = flg);
        this.UIManagerRef(this.button_name_18) && (this.UIManagerRef(this.button_name_18).interactive = flg);
        this.UIManagerRef(this.button_name_19) && (this.UIManagerRef(this.button_name_19).interactive = flg);
        this.UIManagerRef(this.button_name_20) && (this.UIManagerRef(this.button_name_20).interactive = flg);
        this.UIManagerRef(this.button_name_21) && (this.UIManagerRef(this.button_name_21).interactive = flg);
        this.UIManagerRef(this.button_name_22) && (this.UIManagerRef(this.button_name_22).interactive = flg);
        this.UIManagerRef('btn_introBanner_desktop') && (this.UIManagerRef('btn_introBanner_desktop').interactive = flg);
        this.UIManagerRef('btn_introBanner_mobile') && (this.UIManagerRef('btn_introBanner_mobile').interactive = flg);
    }

    // this method will call spin method as much time as autoSpin Count left
    spinCallingWhileAutoplay(nextProps: any) {
        this.onSpin();
        let remainingAutoplay = nextProps.autoplayCount - 1;
        if (remainingAutoplay <= 0) {
            this.props.stopAutoplay();
        }
        this.props.setApplicationAutoplayCount(remainingAutoplay);
    }

    //NOTE - 3 set initial Sound 
    setSound() {
        if (!isMobile && !this.props.soundOnOff) {
            this.UIManagerRef(this.button_name_16) && (this.UIManagerRef(this.button_name_16).visible = true);
            this.UIManagerRef(this.button_name_5) && (this.UIManagerRef(this.button_name_5).visible = true);
            this.UIManagerRef(this.button_name_13) && (this.UIManagerRef(this.button_name_13).visible = true);
        } else {
            this.UIManagerRef(this.button_name_16) && (this.UIManagerRef(this.button_name_16).visible = true);
        }
    }

    componentDidMount() {
        this.layoutChange(this.props.layoutMode);
        this.highlightedButtonsvisibility(false);
        this.setHelpButtonVisibility();
        // this.coinValue();
        this.visibilityBetPanel(false);
        this.setButtontextPostion();
        this.setResponsibleGammingIcon();
        this.setButtontextPostion();
        this.setPalyerMsgTextPostion();
        this.displayUI.map((data: any) => {
            let obj = this.state[data.name];
            if (obj) {
                obj.enable = data.interactive;
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        [data.name]: obj
                    }
                });
            }
        });
        this.setSound();
        this.props.spinAfterLoad(true);
      //  !isMobile ? this.props.balance == 0 && this.props.betList[0] > this.props.balance && this.disableAllBtn() : this.props.setAllButtonEnable();
        this.orientation();
      
    }

    //this method will disable the buttons which is passed as a argument, if nothing is passed then all buttons will be disable
    disableAllBtn(exceptList: Array<string> = []) {
        this.props.setAllButtonDisable(exceptList);
    }
    render() {
        return null;
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'asyncServerAction' | 'gameactionstate' | 'asyncGameLevelSeverState' | 'reelgridState' | 'freegameState' | 'winCelebrationState' | 'winpresentationState' | 'betPanelState' | 'reelsState' | 'buttonPanelState' | 'soundState' | 'basegameState' | 'autoplayState' | 'applicationState' | 'desktopSettingPanelState' | 'behaviourState'>): IStateToProps =>
    ({
        spinResponseReceived: state.reelsState.spinResponseReceived,
        spinStart: state.reelsState.spinStart,
        showAutoplayUI: state.autoplayState.showAutoplay,
        allButtonEnable: state.buttonPanelState.allButtonEnable,
        exceptBtnList: state.buttonPanelState.exceptBtnList,
        currentBetIndex: state.basegameState.currentBetIndex,
        betList: state.basegameState.betList,
        autoplayCount: state.basegameState.autoplayCount,
        autoplayNextSpin: state.basegameState.autoplayNextSpin,
        basegamestate: state.basegameState.basegamestate,
        inAutoplay: state.basegameState.inAutoplay,
        feature: state.basegameState.feature,
        layoutMode: state.applicationState.layoutMode,
        decreaseBetBtnVisibility: state.applicationState.decreaseBet,
        increaseBetBtnVisibility: state.applicationState.increaseBet,
        maxBetBtnVisibility: state.applicationState.maxBet,
        paytableBtnVisibility: state.applicationState.showPaytable,
        spinBtnVisibility: state.applicationState.spin,
        showSettingPanelUI: state.desktopSettingPanelState.showSettingPanel,
        selectedCoin: state.betPanelState.selectedCoin,
        coinList: state.betPanelState.coinList,
        allSpinComplete: state.reelsState.allSpinComplete,
        winAmount: state.basegameState.winAmount,
        balance: state.basegameState.balance,
        inFreeGame: state.freegameState.inFreeGame,
        winPresentationStart: state.winpresentationState.winPresentationStart,
        featureJustFinished: state.freegameState.featureJustFinished,
        showWinCelebration: state.winCelebrationState.showWinCelebration,
        featureJustReTriggered: state.freegameState.featureJustReTriggered,
        showSettingsControl: state.applicationState.showSettingsControl,
        showHelpButton: state.applicationState.showHelpButton,
        enableAutoPlay: state.applicationState.enableAutoPlay,
        autoPlaySimpleMode: state.applicationState.autoPlaySimpleMode,
        showResponsibleGamingIcon: state.applicationState.showResponsibleGamingIcon,
        responsibleGamingUrl: state.applicationState.responsibleGamingUrl,
        responsibleGamingIconPath: state.applicationState.responsibleGamingIconPath,
        showHelpText: state.applicationState.showHelpText,
        increaseBetResult: state.asyncGameLevelSeverState.result,
        languageCode: state.applicationState.languageCode,
        stopButtonActive: state.buttonPanelState.stopButtonActive,
        disableQuickStop: state.applicationState.disableQuickStop,
        InTurboMode: state.reelgridState.InTurboMode,
        isSlamSpin: state.reelgridState.isSlamSpin,
        isActiveAll: state.basegameState.isActiveAll,
        enableParticularButton: state.buttonPanelState.enableParticularButton,
        isRemoveKeyBoardEvent: state.basegameState.isRemoveKeyBoardEvent,
        startSpinBySpaceBar: state.basegameState.startSpinBySpaceBar,
        firstSpinAfterLoad: state.basegameState.firstSpinAfterLoad,
        storeStake: state.basegameState.storeStake,
        jurisdictionKey: state.applicationState.jurisdictionKey,
        currencyDecimalSeparator: state.applicationState.currencyDecimalSeparator,
        currencyGroupingSeparator: state.applicationState.currencyGroupingSeparator,
        noInternetPopupVisible: state.behaviourState.noInternetPopupVisible,
        clickedButtonName: state.buttonPanelState.clickedButtonName,
        reConstruction: state.basegameState.reConstruction,
        homeUrl: state.applicationState.homeUrl,
        betBoxCount: state.behaviourState.betBoxCount,
        reConstructionSpinComplete: state.reelgridState.reConstructionSpinComplete,
        storeTotalWinAmountForBaseGame: state.behaviourState.storeTotalWinAmountForBaseGame,
        betIncrease: state.asyncGameLevelSeverState.betIncrease,
        betDecrease: state.asyncGameLevelSeverState.betDecrease,
        resultStack: state.buttonPanelState.resultStack,
        freezeGame: state.buttonPanelState.freezeGame,


    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        resetReelState: (): any => dispatch(Number(configGame["SPIN_TYPE"]) === 0 && reelsActions.resetReelState()),
        startSpin: (): any => dispatch(reelsActions.startSpin()),
        startRGSpin: (): any => dispatch(reelsGridActions.startSpin()),
        startGridSpin: (): any => dispatch(gridActions.startSpin()),
        startAutoplay: (): any => dispatch(baseGameAction.startAutoplay()),
        stopAutoplay: (): any => dispatch(baseGameAction.stopAutoplay()),
        setApplicationAutoplayCount: (autoplaycount: number): any => dispatch(baseGameAction.setApplicationAutoplayCount(autoplaycount)),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        setApplicationSpinButtonClicked: (isClicked: boolean): any => dispatch(buttonActions.setApplicationSpinButtonClicked(isClicked)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        getApplicationSpinResponse: (): any => dispatch(asyncActions.getApplicationSpinResponse()),
        showAutoplay: (): any => dispatch(autoplayActions.showAutoplayUI()),
        showMenuUI: (): any => dispatch(menuActions.showMenuUI()),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        setApplicationLayoutObject: (layoutobjectlist: string): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        setSelectedCoin: (selectedCoin: number): any => dispatch(betPanelAction.setSelectedCoin(selectedCoin)),
        getApplicationMaxBetResponse: (): any => dispatch(gameLevelResponseActions.getApplicationMaxBetResponse()),
        flowManagerCalled: (callFlowManager: boolean): any => dispatch(flowManagerAction.flowManagerCalled(callFlowManager)),
        setMobMenuVisibility: (showMobileMenuPanel: boolean): any => dispatch(behaviourAction.setMobMenuVisibility(showMobileMenuPanel)),
        setAmountForAutoplay: (storeAmountForAutoplay: number): any => dispatch(behaviourAction.setAmountForAutoplay(storeAmountForAutoplay)),
        hideAutoplay: (): any => dispatch(autoplayActions.hideAutoplayUI()),
        setAutoplay: (autoplayCount: number): any => dispatch(autoplayActions.setAutoplayCount(autoplayCount)),
        setSlamSpin: (isSlamSpin: any): any => dispatch(reelsGridActions.setSlamSpin(isSlamSpin)),
        setStopActive: (stopActive: boolean): any => dispatch(buttonActions.setStopActive(stopActive)),
        setActiveall: (isActiveAll: boolean): any => dispatch(baseGameAction.setActiveall(isActiveAll)),
        particularButtonEnable: (enableParticularButton: boolean): any => dispatch(buttonActions.particularButtonEnable(enableParticularButton)),
        spinAfterLoad: (firstSpinAfterLoad: boolean): any => dispatch(baseGameAction.spinAfterLoad(firstSpinAfterLoad)),
        setIsScreenOnOff: (screenOnOff: boolean): any => dispatch(buttonActions.setIsScreenOnOff(screenOnOff)),
        setCspStart: (cspStart: boolean): any => dispatch(reelsGridActions.setCspStart(cspStart)),
        buttonPanelUpdateState: (updateStateObj: string): any => dispatch(buttonActions.buttonPanelUpdateState(updateStateObj)),

    }))(withButtonPanelConfiguration(buttonStateUpdate)));