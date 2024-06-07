import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
    reelsGridActions, withButtonPanelConfiguration, winpresentationAction, asyncActions,
    buttonActions
} from "@bonanzainteractive/slote_core";
import { UIManager } from "@bonanzainteractive/core";

import { withPixiApp } from "@inlet/react-pixi";
import { actions as gameLevelResponseActions } from "../../gamereducer/asyncGameLevelServerResponseReducer";
import { actions as betPanelAction } from "../../core/reducers/betPanelReducer";
import { configGame } from "../../slot/data/config";
import { Texture } from "pixi.js";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import buttonBase from "./buttonBase";
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
interface IStateToProps {
    currentBetIndex: number;
    layoutMode: string;
    maxBetBtnVisibility: boolean;
    selectedCoin: number;
    coinList: any;
    allSpinComplete: boolean;
    languageCode: any;
    isActiveAll: boolean;
    clickedButtonName: string;
    reConstruction: boolean,
    betBoxCount: number,
    balance: number;
    increaseBetResult: Object,
    betList: Array<number>,
    inAutoplay: boolean,
    allButtonEnable: boolean;
    jurisdictionKey: string;
    freezeGame: boolean;
    stopGameMinBlance: boolean;
    cspStart: boolean,
}

class maxButtonUI extends buttonBase {
    protected button_name_10: string;
    protected button_name_17: string;
    constructor(props: IProps, state: IState) {
        super(props, state);
        this.app = props.app;
        this.button_name_10 = "btn_maxbet";
        this.button_name_17 = "btn_minbet";
        this.state = {
            [this.button_name_10]: { enable: true },
            [this.button_name_17]: { enable: true },
            updateStateObj: {}
        }
        this.setVisibilityOfButtonAccordingToBackend(this.button_name_10, this.props.maxBetBtnVisibility);
        // this.setVisibilityOfButtonAccordingToBackend(this.button_name_17, true);
    }


    disableBetButtons() {
        let btn_bet_increaseBtn: any = UIManager.getRef("btn_bet_increase");
        let btn_bet_decreaseBtn: any = UIManager.getRef("btn_bet_decrease");
        let btn_minbetBtn: any = UIManager.getRef("btn_minbet");
        let btn_maxbetBtn: any = UIManager.getRef("btn_maxbet");
        btn_bet_increaseBtn.texture = Texture.from("plus_up.png");
        btn_bet_increaseBtn.interactive = true;
        btn_maxbetBtn.texture = Texture.from("max_up.png");
        btn_maxbetBtn.interactive = true;
        btn_bet_decreaseBtn.texture = Texture.from("minus_up.png");
        btn_bet_decreaseBtn.interactive = true;
        btn_minbetBtn.texture = Texture.from("min_up.png");
        btn_minbetBtn.interactive = true;

        if (this.props.selectedCoin === 0) {
            btn_bet_decreaseBtn.texture = Texture.from("minus_disable.png");
            btn_bet_decreaseBtn.interactive = false;
            btn_minbetBtn.texture = Texture.from("min_disable.png");
            btn_minbetBtn.interactive = false;
            btn_bet_increaseBtn.texture = Texture.from("plus_up.png");
            btn_bet_increaseBtn.interactive = true;
            btn_maxbetBtn.texture = Texture.from("max_up.png");
            btn_maxbetBtn.interactive = true;

        } else if (this.props.selectedCoin === this.props.coinList.length - 1) {
            btn_bet_increaseBtn.texture = Texture.from("bet_plus_disable.png");
            btn_bet_increaseBtn.interactive = false;
            btn_maxbetBtn.texture = Texture.from("max_disable.png");
            btn_maxbetBtn.interactive = false;
            btn_bet_decreaseBtn.texture = Texture.from("minus_up.png");
            btn_bet_decreaseBtn.interactive = true;
            btn_minbetBtn.texture = Texture.from("min_up.png");
            btn_minbetBtn.interactive = true;
        }
    }


    /*
    here is reel spin by max button clicked multoiple times 
    */

    startSpinByClickedOnMaxBtn(): void {
        let maxBet = 0, index = 0;
        for (let i = this.props.coinList.length - 1; i >= 0; i--) {
            if (this.props.betList[i] > this.props.balance) {
                maxBet = this.props.betList[i - 1];
                index = i - 1;
            }
        }
        if ((maxBet === 0 && index === 0) || (maxBet === undefined && index === undefined)) {
            maxBet = this.props.betList[this.props.coinList.length - 1];
            index = this.props.coinList.length - 1;
        }
        if (this.props.selectedCoin === index || maxBet === this.props.balance) {
            this.toggleMaxButton(false);
            this.props.setApplicationSpinButtonClicked(true);
            this.onSpin({ allButtonEnable: false, stopButtonActive: true, spinButtonClicked: true });
        }
        else if (maxBet > this.props.balance) {
            this.toggleMaxButton(false);
        }
        else {
            ((maxBet === 0 && index === 0) || (maxBet === undefined && index === undefined)) ? this.props.setSelectedCoin(this.props.coinList.length - 1) : this.props.setSelectedCoin(index);
            this.props.getApplicationMaxBetResponse();
        }
    }


    //this method will be called when a button gets clicked
    handleEvent = (e: any) => {
        e.stopPropagation();
        let updateState = this.state.updateStateObj;
        let condition;
        if (!this.props.voucherIsRunning) {
            condition = ((this.props.clickedButtonName !== e.target.name));
        }
        if (condition) {
            this.props.setApplicationButtonClicked(true);
            this.props.setButtonPanelUpdateState({ buttonClickedSound: false, clickedButtonName: e.target.name });
            updateState['buttonClickedSound'] = false;
            updateState['clickedButtonName'] = e.target.name;
        }


        let betValueButton: any = UIManager.getRef("text_coinValue_value");

        switch (e.target.name) {

            case this.button_name_10:
                this.startSpinByClickedOnMaxBtn();
                this.disableBetButtons();
                betValueButton = UIManager.getRef("text_coinValue_value");
                betValueButton.visible = true
                return;
            case this.button_name_17:
                this.props.setSelectedCoin(0);
                this.props.setInsufficientFunds(false);
                this.props.setBuyFeatureStakeExceeds(false);
                this.disableBetButtons();
                betValueButton = UIManager.getRef("text_coinValue_value");
                betValueButton.visible = true
                return;
            default:
                return 'No buttons';
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.enableParticularButton !== this.props.enableParticularButton) {
            return false;
        }
        return this.checkUpdateState(nextProps) ? true : false;
    }
    checkUpdateState(nextProps: any) {
        // Freeze Game
        let freezeRes: any = this.freezeGameFun(nextProps);
        if (freezeRes) {
            freezeRes === true && this.toggleMaxButton(false);
            (freezeRes === "ACTIVE_BUTTON" || freezeRes === "ACTIVE_BUTTON_ON_POPUP") && this.toggleMaxButton(true);
            return false;
        }
        else if (nextProps.inAutoplay && nextProps.inAutoplay !== this.props.inAutoplay ) {
            this.toggleMaxButton(false);
        }
        else if (!nextProps.inAutoplay && !nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable ) {
            this.toggleMaxButton(false);
        }
        else if (!nextProps.inAutoplay && nextProps.allButtonEnable && ((nextProps.isActiveAll && nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable) || (nextProps.clickedButtonName !== this.props.clickedButtonName && nextProps.clickedButtonName === "postIntro_continueButton_desktop"))) {
            this.toggleMaxButton(true);
        }
        return false;
    }
    /**
     * Enable and disable Decrease Button UI
     */
    toggleMaxButton(isEnable: boolean) {
        this.setState((prevState) => {
            return {
                ...prevState,
                [this.button_name_10]: { enable: isEnable },
                [this.button_name_17]: { enable: isEnable }
            }
        });
        this.forceUpdate();
    }

    render() {
        if (!this.displayUI) {
            return null;
        }
        const { langObj } = this.props;
        return (
            <UIManager id={"GenericUIComponentmaxButtonUI"}
                type={"Container"}
                ref={i => this.buttonPanelGenericUIContainer = i}
                app={this.app}
                configGame={configGame}>
                {
                    this.displayUI.map((data: any) => {
                        /*  if (data.name === this.button_name_10)
                         {
                             data.visible=false;
                         }  
                         else if (data.name === this.button_name_17)
                         {
                             data.visible=false;
                         }  */
                        //! Hide Text button conditions
                        // if (data.name !== this.button_name_10) {
                        //     data.visible = ['text_maxBet_label1', 'text_maxBet_label2'].includes(data.name) ? this.state[this.button_name_10].enable : !this.state[this.button_name_10].enable;
                        // }
                        return (<UIManager
                            key={`UIManager-${Math.random()}`}
                            type={data.type}
                            app={this.app}
                            ClickHandler={this.handleEvent}
                            langObj={langObj}
                            disabled={this.state[data.name] && this.state[data.name].enable ? !this.state[data.name].enable : true}
                            id={data.id}
                            {...data}
                        />
                        )
                    }
                    )
                }
            </UIManager>
        )
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'asyncGameLevelSeverState' | 'reelgridState' | 'betPanelState' | 'buttonPanelState' | 'basegameState' | 'applicationState' | 'behaviourState'>): IStateToProps =>
    ({
        currentBetIndex: state.basegameState.currentBetIndex,
        layoutMode: state.applicationState.layoutMode,
        maxBetBtnVisibility: state.applicationState.maxBet,
        selectedCoin: state.betPanelState.selectedCoin,
        coinList: state.betPanelState.coinList,
        allSpinComplete: state.reelgridState.allSpinComplete,
        languageCode: state.applicationState.languageCode,
        isActiveAll: state.basegameState.isActiveAll,
        clickedButtonName: state.buttonPanelState.clickedButtonName,
        jurisdictionKey: state.applicationState.jurisdictionKey,
        reConstruction: state.basegameState.reConstruction,
        betBoxCount: state.behaviourState.betBoxCount,
        balance: state.basegameState.balance,
        increaseBetResult: state.asyncGameLevelSeverState.result,
        allButtonEnable: state.buttonPanelState.allButtonEnable,
        betList: state.basegameState.betList,
        inAutoplay: state.basegameState.inAutoplay,
        freezeGame: state.buttonPanelState.freezeGame,
        stopGameMinBlance: state.buttonPanelState.stopGameMinBlance,
        cspStart: state.reelgridState.cspStart,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        setSelectedCoin: (selectedCoin: number): any => dispatch(betPanelAction.setSelectedCoin(selectedCoin)),
        setApplicationSpinButtonClicked: (isClicked: boolean): any => dispatch(buttonActions.setApplicationSpinButtonClicked(isClicked)),
        getApplicationMaxBetResponse: (): any => dispatch(gameLevelResponseActions.getApplicationMaxBetResponse()),
        resetReelState: (): any => dispatch(Number(configGame["SPIN_TYPE"]) === 2 && reelsGridActions.resetReelState()),
        setInsufficientFunds: (insuffFunds: any): any => dispatch(behaviourAction.setInsufficientFunds(insuffFunds)),
        setBuyFeatureStakeExceeds: (betExceeds: any): any => dispatch(behaviourAction.setBuyFeatureStakeExceeds(betExceeds)),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        setStopActive: (stopActive: boolean): any => dispatch(buttonActions.setStopActive(stopActive)),
        getApplicationSpinResponse: (): any => dispatch(asyncActions.getApplicationSpinResponse()),
        setCspStart: (cspStart: boolean): any => dispatch(reelsGridActions.setCspStart(cspStart)),
        setButtonPanelUpdateState: (objState: object): any => dispatch(buttonActions.buttonPanelUpdateState(objState)),
    }))(withButtonPanelConfiguration(maxButtonUI)));