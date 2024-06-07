import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { withButtonPanelConfiguration, buttonActions, layoutssActions, soundActions } from "@bonanzainteractive/slote_core";
import { UIManager } from "@bonanzainteractive/core";
import { withPixiApp } from "@inlet/react-pixi";
import { actions as gameLevelResponseActions } from "../../gamereducer/asyncGameLevelServerResponseReducer";
import { actions as betPanelAction } from "../../core/reducers/betPanelReducer";
import { constant } from "../../slot/data/config";
import { Texture } from "pixi.js";
import buttonBase from "./buttonBase";
import { baseGameAction } from "@bonanzainteractive/slote_core";
import { configGame } from "../../slot/data/config";
import { isMobile } from "react-device-detect";
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
    allButtonEnable: boolean;
    exceptBtnList: Array<string>;
    currentBetIndex: number;
    layoutMode: string;
    increaseBetBtnVisibility: boolean;
    selectedCoin: number;
    coinList: any;
    allSpinComplete: boolean;
    increaseBetResult: Object;
    languageCode: any;
    isActiveAll: boolean;
    clickedButtonName: string;
    betBoxCount: number,
    balance: number;
    jurisdictionKey: string,
    inAutoplay: boolean,
    freezeGame: boolean,
    cspStart: boolean,
    buyFeatureVisible: boolean;
    autoplayCount: number;

}

class increaseButtonUI extends buttonBase {
    protected button_name_3: string;
    constructor(props: IProps, state: IState) {
        super(props, state);
        this.button_name_3 = "btn_bet_increase";
        this.state = {
            [this.button_name_3]: { enable: true },
            firstLoad: 1,
            updateStateObj: {},
            selectedCoin: this.props.selectedCoin
        }
        this.setVisibilityOfButtonAccordingToBackend(this.button_name_3, this.props.increaseBetBtnVisibility);
        this.layoutChange(this.props.layoutMode);
    }

    //this method will increase the bet
    onBetIncrease(updateStateObj: any) {

        let currentBetIndex = this.props.currentBetIndex + 1;
        let betValuesLen = constant.configGame.betValues.length - 1
        this.setState((prevState) => {
            return {
                ...prevState,
                updateStateObj: updateStateObj,
                [this.button_name_3]: { enable: currentBetIndex >= betValuesLen ? false : true },
                selectedCoin: currentBetIndex

            }
        });
        this.props.setApplicationCurrentBetIndex(currentBetIndex);
        this.props.setSelectedCoin(currentBetIndex);
        this.forceUpdate();
        if (this.props.currentBetIndex >= constant.configGame.betValues.length - 1) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    updateStateObj: updateStateObj,
                    [this.button_name_3]: { enable: false }
                }
            });
            this.forceUpdate();
            return;
        }
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        if (this.props.layoutMode) {
            this.layoutChange(this.props.layoutMode);
        }
    }

    //this method will be called when a button gets clicked
    handleBetActionEvent = (e: any) => {
        e.stopPropagation();
        let updateState = this.state.updateStateObj;
        let condition;
        if (!this.props.voucherIsRunning) {
            condition = ((this.props.clickedButtonName !== e.target.name) || (this.props.clickedButtonName === "btn_bet_increase" || this.props.clickedButtonName === "btn_bet_decrease"));
        }
        else {
            condition = ((this.props.clickedButtonName !== e.target.name) && (e.target.name !== "btn_bet_increaseVoucher" && e.target.name !== "btn_bet_decreaseVoucher" && e.target.name !== "btn_maxbetVoucher"));
        }
        if (condition) {
            this.props.setApplicationButtonClicked(true);
            updateState['buttonClickedSound'] = false;
            updateState['clickedButtonName'] = e.target.name;
        }
        let betValueButton: any = UIManager.getRef("text_coinValue_value");
        switch (e.target.name) {

            case this.button_name_3:
                UIManager.getRef(this.button_name_3).texture = Texture.from("bet_plus_disable.png");
                UIManager.getRef(this.button_name_3).interactive = false;
                // betValueButton = UIManager.getRef("text_coinValue_value");
                // betValueButton.visible = true;
                //this.props.getApplicationIncreaseBetResponse();
                this.onBetIncrease(updateState);
                // this.props.buttonPanelUpdateState(this.state.updateStateObj);
                this.props.setAllButtonEnable();
                this.onClickSound();
                return;
            default:
                return 'No buttons';
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        return this.checkUpdateState(nextProps) ? true : false;
    }

    checkUpdateState(nextProps: any) {
        if (nextProps.buyFeatureVisible !== this.props.buyFeatureVisible && !nextProps.buyFeatureVisible && !nextProps.inAutoplay) {
            this.toggleIncButton(nextProps, true);
            return false;
        }
        if (nextProps.buyFeatureVisible) {
            return false;
        }
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode);
            return true;
        }

        if (nextProps.inAutoplay) {
            this.durionAutoplay(nextProps)
            return;
        }
        this.textVisibility(nextProps, { OFF: [this.button_name_3], ON: [] });
        // Freeze Game
        let freezeRes: any = this.freezeGameFun(nextProps);
        if (freezeRes) {
            freezeRes === true && this.toggleIncButton(nextProps, false);
            freezeRes === "ACTIVE_BUTTON" && this.toggleIncButton(nextProps, false);
            freezeRes === "ACTIVE_BUTTON_ON_POPUP" && this.toggleIncButton(nextProps, true);
            return false;
        }
        
        else if (nextProps.inAutoplay && nextProps.inAutoplay !== this.props.inAutoplay) {
            this.toggleIncButton(nextProps, false);
        }
        else if (!nextProps.inAutoplay && !nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable) {
            this.toggleIncButton(nextProps, false);
        }
        else if (!nextProps.inAutoplay && nextProps.allButtonEnable && !nextProps.cspStart) {
            this.toggleIncButton(nextProps, true);
        }
        else if (!nextProps.inAutoplay && nextProps.allButtonEnable && ((nextProps.isActiveAll && nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable) || (nextProps.clickedButtonName !== this.props.clickedButtonName && nextProps.clickedButtonName === "postIntro_continueButton_desktop"))) {
            let flg: boolean = this.props.currentBetIndex >= constant.configGame.betValues.length - 1 ? false : true;
            this.toggleIncButton(nextProps, flg);
        }
        else if (nextProps.currentBetIndex !== this.props.currentBetIndex) {
            this.toggleIncButton(nextProps, true);
        }
        return false;
    }

    durionAutoplay(nextProps: any) {
        this.setState((prevState) => {
            return {
                ...prevState,
                [this.button_name_3]: { enable: false }
            }
        });

        this.forceUpdate();
    }
    /**
     * Enable and disable Increase Button UI
     */
    toggleIncButton(nextProps: any, disableButtonForce: boolean = true) {
        // let currentBalance = nextProps.balance - nextProps.coinList[nextProps.currentBetIndex + 1];
        // this.setState((prevState) => {
        //     return {
        //         ...prevState,
        //         [this.button_name_3]: { enable: !disableButtonForce ? false : (nextProps.coinList.length - 1 === nextProps.currentBetIndex || currentBalance < 0 || nextProps.balance < nextProps.coinList[nextProps.currentBetIndex + 1] || nextProps.coinList[nextProps.currentBetIndex + 1] <= 0) ? false : true }
        //     }
        // });

        let currentBetIndex = nextProps.currentBetIndex;
        let betValuesLen = constant.configGame.betValues.length - 1;
        this.setState((prevState) => {
            return {
                ...prevState,
                [this.button_name_3]: { enable: currentBetIndex >= betValuesLen ? false : true },

            }
        });

        this.forceUpdate();
    }

    // setScale(data:any){
    //     if (isMobile) {
    //         if (window.innerHeight > window.innerWidth) {
    //             data.width = 63;
    //             data.height = 63;
    //         } else {
    //             data.width = 84.5;
    //             data.height = 84.5;
    //         }
    //     }
    // }

    render() {
        const { langObj, enableAutoPlay } = this.props;
        return (
            <UIManager id={"GenericUIComponentincreaseButtonUI"}
                type={"Container"}
                ref={i => this.buttonPanelGenericUIContainer = i}
                app={this.app}
                configGame={configGame}>
                {
                    this.displayUI.map((data: any) => {
                        // this.setScale(data)
                        return (
                            <UIManager
                                key={`UIManager-${Math.random()}`}
                                type={data.type}
                                app={this.app}
                                ClickHandler={this.handleBetActionEvent}
                                langObj={langObj}
                                disabled={this.props.cspStart ? true : !this.state.btn_bet_increase.enable}

                                //disabled={!enableAutoPlay ? ((data.name == this.autoPlayButtonName) ? true : this.state[data.name] && !this.state[data.name].enable) : this.state[data.name] && !this.state[data.name].enable}
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
    (state: Pick<IStore, 'asyncGameLevelSeverState' | 'reelgridState' | 'reelsState' | 'betPanelState' | 'buttonPanelState' | 'basegameState' | 'applicationState' | 'behaviourState'>): IStateToProps =>
    ({
        allButtonEnable: state.buttonPanelState.allButtonEnable,
        exceptBtnList: state.buttonPanelState.exceptBtnList,
        currentBetIndex: state.basegameState.currentBetIndex,
        layoutMode: state.applicationState.layoutMode,
        increaseBetBtnVisibility: state.applicationState.increaseBet,
        selectedCoin: state.betPanelState.selectedCoin,
        coinList: state.betPanelState.coinList,
        allSpinComplete: state.reelgridState.allSpinComplete,
        increaseBetResult: state.asyncGameLevelSeverState.result,
        languageCode: state.applicationState.languageCode,
        isActiveAll: state.basegameState.isActiveAll,
        clickedButtonName: state.buttonPanelState.clickedButtonName,
        jurisdictionKey: state.applicationState.jurisdictionKey,
        betBoxCount: state.behaviourState.betBoxCount,
        balance: state.basegameState.balance,
        inAutoplay: state.basegameState.inAutoplay,
        freezeGame: state.buttonPanelState.freezeGame,
        cspStart: state.reelsState.cspStart,
        buyFeatureVisible: state.behaviourState.buyFeatureVisible,
        autoplayCount: state.basegameState.autoplayCount,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        setSelectedCoin: (selectedCoin: number): any => dispatch(betPanelAction.setSelectedCoin(selectedCoin)),
        buttonClickedName: (clickedButtonName: string): any => dispatch(buttonActions.buttonClickedName(clickedButtonName)),
        getApplicationIncreaseBetResponse: (): any => dispatch(gameLevelResponseActions.getApplicationIncreaseBetResponse()),
        getApplicationDecreaseBetResponse: (): any => dispatch(gameLevelResponseActions.getApplicationDecreaseBetResponse()),
        buttonPanelUpdateState: (updateStateObj: string): any => dispatch(buttonActions.buttonPanelUpdateState(updateStateObj)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        setApplicationCurrentBetIndex: (betIndex: number): any => dispatch(baseGameAction.setApplicationCurrentBetIndex(betIndex)),
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
    }))(withButtonPanelConfiguration(increaseButtonUI)));