import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
    flowManagerAction, gridActions, reelsActions, reelsGridActions,
    buttonActions, winpresentationAction, asyncActions,
    withButtonPanelConfiguration,
    layoutssActions
} from "@bonanzainteractive/slote_core";
import { UIManager } from "@bonanzainteractive/core";
import { withPixiApp } from "@inlet/react-pixi";
import { configGame } from "../../slot/data/config";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { actions as asyncServerAction } from "../../core/reducers/asyncServerResponseReducer";
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
    spinResponseReceived: boolean,
    allSpinComplete: boolean,
    allButtonEnable: boolean,
    spinBtnVisibility: boolean,
    selectedCoin: number,
    balance: number,
    coinList: any,
    inAutoplay: boolean,
    isActiveAll: boolean,
    freezeGame: boolean,
    currentBetIndex: number,
    stopGameMinBlance: boolean,
    startSpinBySpaceBar: boolean,
    cspStart: boolean,
    layoutMode: string;
    spinStopButtonActive: boolean,
}
class spinButtonUI extends buttonBase {
    protected button_name_1: string;
    private isRemoveSpin: boolean = false;
    constructor(props: IProps, state: IState) {
        super(props, state);
        this.button_name_1 = "btn_spin";
        this.isRemoveSpin = false;
        this.setVisibilityOfButtonAccordingToBackend(this.button_name_1, this.props.spinBtnVisibility);
        let isEnableSpinbtn = this.props.spinBtnVisibility && this.props.allButtonEnable ? true : false;
        this.state = {
            [this.button_name_1]: { enable: isEnableSpinbtn },
        }
        this.layoutChange(this.props.layoutMode);
    }

    //this method will be called when a button gets clicked
    handleEvent = (e: any) => {
        e.stopPropagation();
        switch (e.target.name) {
            case this.button_name_1:
                navigator.onLine ? this.props.visibleNoInternetPopUp(false, "", false, false) : this.props.visibleNoInternetPopUp(true, "noInternetPopUpText2", true, false);
                this.props.setApplicationSpinButtonClicked(true);
                this.onSpin({ allButtonEnable: false, stopButtonActive: false, spinButtonClicked: true });
                this.setVisibilityDuringSpin();

                return;
            default:
                return 'No buttons';
        }
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        if (this.props.layoutMode) {
            this.layoutChange(this.props.layoutMode);
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        return this.checkUpdateState(nextProps) ? true : false;
    }

    checkUpdateState(nextProps: any) {
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode);
            return true;
        }
        // Freeze Game
        if (nextProps.spinStopButtonActive && nextProps.spinStopButtonActive !== this.props.spinStopButtonActive) {
            this.removeSpinButton(true);
        }
        if (!nextProps.spinStopButtonActive && nextProps.spinStopButtonActive !== this.props.spinStopButtonActive) {
            this.removeSpinButton(false);
        }

        let freezeRes: any = this.freezeGameFun(nextProps);

        if (nextProps.inAutoplay && nextProps.inAutoplay === this.props.inAutoplay) {
            this.state[this.button_name_1] && this.state[this.button_name_1].enable && this.toggleButton(false);
            return false;
        }
        if (freezeRes) {
            freezeRes === true && this.toggleButton(false);
            (freezeRes === "ACTIVE_BUTTON" || freezeRes === "ACTIVE_BUTTON_ON_POPUP") && this.toggleButton(true);
            return false;
        }
        else if (nextProps.inAutoplay && nextProps.inAutoplay !== this.props.inAutoplay) {
            this.toggleButton(false);
        }
        else if (!nextProps.inAutoplay && !nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable) {
            this.toggleButton(false);
        }
        else if (!nextProps.inAutoplay && ((nextProps.isActiveAll && nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable) || (nextProps.clickedButtonName !== this.props.clickedButtonName && nextProps.clickedButtonName === "postIntro_continueButton_desktop"))) {
            this.toggleButton(true);
        }
        if (nextProps.startSpinBySpaceBar && nextProps.startSpinBySpaceBar !== this.props.startSpinBySpaceBar) {
            this.props.setApplicationSpinButtonClicked(true);
            this.onSpin({ allButtonEnable: false, stopButtonActive: true, spinButtonClicked: true });
            this.props.flowManagerCalled(false);
        }
        return false;
    }

    setVisibilityDuringSpin() {
        // Bet-Buttons(Stake-Buttons)
        // UIManager.getRef("btn_bet_increase") && (UIManager.getRef("btn_bet_increase").visible = false);
        // UIManager.getRef("btn_bet_decrease") && (UIManager.getRef("btn_bet_decrease").visible = false);
        UIManager.getRef("btn_maxbet") && (UIManager.getRef("btn_maxbet").visible = false);
        UIManager.getRef("btn_minbet") && (UIManager.getRef("btn_minbet").visible = false);

        // Menu-Highlighted buttons
        UIManager.getRef("btn_game_highlighted") && (UIManager.getRef("btn_game_highlighted").visible = false);
        UIManager.getRef("btn_setting_highlighted") && (UIManager.getRef("btn_setting_highlighted").visible = false);
        UIManager.getRef("btn_history_highlighted") && (UIManager.getRef("btn_history_highlighted").visible = false);
        // Menu Buttons
        // (UIManager.getRef("btn_menu").visible = false);
        UIManager.getRef("btn_menu_close") && (UIManager.getRef("btn_menu_close").visible = false);
        UIManager.getRef("btn_gameRule") && (UIManager.getRef("btn_gameRule").visible = false);
        UIManager.getRef("btn_setting") && (UIManager.getRef("btn_setting").visible = false);
        UIManager.getRef("btn_history") && (UIManager.getRef("btn_history").visible = false);
    }

    /**
     * Enable and disable Increase Button UI
     */
    toggleButton(isEnable: boolean) {
        this.setState((prevState) => {
            return {
                ...prevState,
                [this.button_name_1]: { enable: isEnable }
            }
        });
        this.forceUpdate();
    }
    removeSpinButton(flg: boolean): void {
        this.isRemoveSpin = flg;
        this.forceUpdate();
    }

    render() {
        if (this.isRemoveSpin) {

            return false;
        }
        const { langObj, enableAutoPlay } = this.props;
        return (
            <UIManager id={"GenericUIComponentspinButtonUI"}
                type={"Container"}
                ref={i => this.buttonPanelGenericUIContainer = i}
                app={this.app}
                configGame={configGame}>
                {
                    this.displayUI.map((data: any) => {
                      if (!this.isMobile && data.name === "btn_spin") {
                            this.setVisibilityDuringSpin();

                        }
                        return (
                            <UIManager
                                key={`UIManager-${Math.random()}`}
                                type={data.type}
                                app={this.app}
                                ClickHandler={this.handleEvent}
                                langObj={langObj}
                                disabled={!enableAutoPlay ? ((data.name === this.autoPlayButtonName) ? true : this.state[data.name] && !this.state[data.name].enable) : this.state[data.name] && !this.state[data.name].enable}
                                id={data.id}
                                {...data}
                            />
                        )
                    })
                }
            </UIManager>
        )
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'reelgridState' | 'reelsState' | 'basegameState' | 'applicationState' | 'betPanelState' | 'buttonPanelState' | 'behaviourState'>): IStateToProps =>
    ({
        spinResponseReceived: state.reelsState.spinResponseReceived,
        allSpinComplete: state.reelsState.allSpinComplete,
        allButtonEnable: state.buttonPanelState.allButtonEnable,
        spinBtnVisibility: state.applicationState.spin,
        selectedCoin: state.betPanelState.selectedCoin,
        balance: state.basegameState.balance,
        coinList: state.betPanelState.coinList,
        inAutoplay: state.basegameState.inAutoplay,
        isActiveAll: state.basegameState.isActiveAll,
        freezeGame: state.buttonPanelState.freezeGame,
        currentBetIndex: state.basegameState.currentBetIndex,
        stopGameMinBlance: state.buttonPanelState.stopGameMinBlance,
        startSpinBySpaceBar: state.basegameState.startSpinBySpaceBar,
        cspStart: state.reelgridState.cspStart,
        layoutMode: state.applicationState.layoutMode,
        spinStopButtonActive: state.behaviourState.spinStopButtonActive,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        visibleNoInternetPopUp: (noInternetPopupVisible: boolean, text: string, closeButton: boolean, continueButton: boolean): any => dispatch(behaviourAction.visibleNoInternetPopUp(noInternetPopupVisible, text, closeButton, continueButton)),
        setApplicationSpinButtonClicked: (isClicked: boolean): any => dispatch(buttonActions.setApplicationSpinButtonClicked(isClicked)),
        // Spin Start
        resetReelState: (): any => dispatch(Number(configGame["SPIN_TYPE"]) === 0 && reelsActions.resetReelState() || Number(configGame["SPIN_TYPE"]) === 1 && gridActions.resetReelState() || Number(configGame["SPIN_TYPE"]) === 2 && reelsGridActions.resetReelState()),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        setStopActive: (stopActive: boolean): any => dispatch(buttonActions.setStopActive(stopActive)),
        getApplicationSpinResponse: (): any => dispatch(asyncServerAction.getApplicationSpinResponse()),
        setCspStart: (cspStart: boolean): any => dispatch(Number(configGame["SPIN_TYPE"]) === 0 && reelsActions.setCspStart(cspStart) || reelsGridActions.setCspStart(cspStart)),
        setButtonPanelUpdateState: (objState: object): any => dispatch(buttonActions.buttonPanelUpdateState(objState)),
        flowManagerCalled: (callFlowManager: boolean): any => dispatch(flowManagerAction.flowManagerCalled(callFlowManager)),
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),

    }))(withButtonPanelConfiguration(spinButtonUI)));    