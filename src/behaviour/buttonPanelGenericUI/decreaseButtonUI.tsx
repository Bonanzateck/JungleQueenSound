import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { withButtonPanelConfiguration, baseGameAction, buttonActions, layoutssActions, soundActions } from "@bonanzainteractive/slote_core";
import { UIManager } from "@bonanzainteractive/core";
import { withPixiApp } from "@inlet/react-pixi";
import { actions as gameLevelResponseActions } from "../../gamereducer/asyncGameLevelServerResponseReducer";
import { actions as betPanelAction } from "../../core/reducers/betPanelReducer";
import { constant } from "../../slot/data/config";
import buttonBase from "./buttonBase";
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
    currentBetIndex: number,
    layoutMode: string,
    decreaseBetBtnVisibility: boolean,
    selectedCoin: number,
    coinList: any,
    allSpinComplete: boolean,
    languageCode: any,
    isActiveAll: boolean,
    clickedButtonName: string,
    betBoxCount: number,
    balance: number;
    increaseBetResult: Object,
    jurisdictionKey: string,
    allButtonEnable: boolean,
    inAutoplay: boolean,
    currencyDecimalSeparator: string;
    currencyGroupingSeparator: string;
    betList: Array<number>;
    freezeGame: boolean;
    cspStart: boolean;
    exceptBtnList: Array<string>;
    enableParticularButton: boolean;
    buyFeatureVisible: boolean;

}

class decreaseButtonUI extends buttonBase {
    protected button_name_4: string;
    protected isButtonClicked: boolean = false;
    protected UIManagerRef: any = UIManager.getRef;
    protected autoPlayButtonName: string = "";
    protected storeCurrentBet: number = 0;
    constructor(props: IProps, state: IState) {
        super(props, state);
        this.app = props.app;
        this.button_name_4 = "btn_bet_decrease";
        this.state = {
            [this.button_name_4]: { enable: true },
            firstLoad: 1,
            updateStateObj: {}
        }
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }
        this.setVisibilityOfButtonAccordingToBackend(this.button_name_4, this.props.decreaseBetBtnVisibility);
        this.layoutChange(this.props.layoutMode); //show on load
        // this.displayUI = this.props.child.filter(this.checkUiMode.bind(this));
    }

    // layoutBtn() {
    //     this.displayUI.map((data: any) => {
    //     });
    // }



    //this method will decrease the bet
    onBetDecrease(updateStateObj: any) {

        if (this.props.currentBetIndex === 0) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    updateStateObj: updateStateObj,
                    [this.button_name_4]: { enable: false }
                }
            });
            this.forceUpdate();
            return;
        }

        let currentBetIndex = this.props.currentBetIndex - 1;
        this.setState((prevState) => {
            return {
                ...prevState,
                updateStateObj: updateStateObj,
                [this.button_name_4]: { enable: currentBetIndex === 0 ? false : true }
            }
        });
        this.forceUpdate();
        this.props.setApplicationCurrentBetIndex(currentBetIndex);
        this.props.setSelectedCoin(currentBetIndex);
    }

    setIncreaseButtonDisable(props: any) {
        let index;
        props.currentBetIndex + 1 === props.betList.length ? index = props.currentBetIndex : index = props.currentBetIndex + 1;
        if ((props.betList[index] > props.balance - this.storeCurrentBet)) {
        }
    }

    

    //this method will be called when a button gets clicked
    handleBetActionEvent = (e: any) => {


        e.stopPropagation();
        if (this.props.currentBetIndex > 0) {

        }
        let updateState = this.state.updateStateObj;
        let condition;
        condition = ((this.props.clickedButtonName !== e.target.name) || (this.props.clickedButtonName === "btn_bet_increase" || this.props.clickedButtonName === "btn_bet_decrease"));


        if (condition) {
            this.props.setApplicationButtonClicked(true);
            updateState['buttonClickedSound'] = false;
            updateState['clickedButtonName'] = e.target.name;
        }
        // let betValueButton: any = UIManager.getRef("text_coinValue_value");
        switch (e.target.name) {
            case this.button_name_4:
                this.onClickSound();
                // betValueButton = UIManager.getRef("text_coinValue_value");
                // betValueButton.visible = true;
                if (this.props.balance - this.props.coinList[this.props.currentBetIndex] < this.props.coinList[this.props.currentBetIndex - 1]) {
                    this.props.stopAutoplay();
                    this.setIncreaseButtonDisable(this.props);
                    this.props.setAllButtonEnable();
                    // this.props.getApplicationDecreaseBetResponse();
                    this.onBetDecrease(updateState);
                }
                else {
                    // this.props.getApplicationDecreaseBetResponse();
                    this.onBetDecrease(updateState);
                    this.props.buttonPanelUpdateState(this.state.updateStateObj);
                    this.props.setAllButtonEnable();
                }
                return;
            default:
                return 'No buttons';
        }
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        if (this.props.layoutMode) {
            this.layoutChange(this.props.layoutMode); //update on click
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        return this.checkUpdateState(nextProps) ? true : false;
    }

    checkUpdateState(nextProps: any) {
        if (nextProps.buyFeatureVisible !== this.props.buyFeatureVisible && !nextProps.buyFeatureVisible && !nextProps.inAutoplay) {
            this.toggleDecButton(nextProps, true);
            return false;
        }
        if (nextProps.buyFeatureVisible ) {
            return false;
        }
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode);  // on orientation/ set in layout
            return true;
        }
        if (nextProps.inAutoplay) {
            this.durionAutoplay(nextProps);
            return false;
        }
        if (nextProps.cspStart) {
            this.durionAutoplay(nextProps);
            return false;
        }

        if (this.props.currentBetIndex > 0 && nextProps.allButtonEnable) {
            this.toggleDecButton(nextProps, true);
            return false;
        }
        if (nextProps.enableParticularButton !== this.props.enableParticularButton) {
            nextProps.enableParticularButton && this.decreaseButtonEnable(nextProps);
            return false;
        }
        this.textVisibility(nextProps, { OFF: [this.button_name_4], ON: [] });



        // Freeze Game
        let freezeRes: any = this.freezeGameFun(nextProps);
        if (freezeRes) {
            freezeRes === "ACTIVE_BUTTON_ON_POPUP" ? this.toggleDecButton(nextProps, true) : this.toggleDecButton(nextProps, false);
            return false;
        }
        else if (nextProps.inAutoplay && nextProps.inAutoplay !== this.props.inAutoplay) {
            this.toggleDecButton(nextProps, false);
        }
        else if (!nextProps.inAutoplay && !nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable) {
            this.toggleDecButton(nextProps, false);
        }
        else if (!nextProps.inAutoplay && nextProps.allButtonEnable && ((nextProps.isActiveAll && nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable) || (nextProps.clickedButtonName !== this.props.clickedButtonName && nextProps.clickedButtonName === "postIntro_continueButton_desktop"))) {
            this.toggleDecButton(nextProps, true);
        }
        else if (nextProps.exceptBtnList.includes('btn_bet_decrease') && !nextProps.cspStart && nextProps.balance > nextProps.coinList[0] && ((nextProps.isActiveAll && nextProps.isActiveAll !== this.props.isActiveAll) || (nextProps.allSpinComplete))) {
            this.toggleDecButton(nextProps, true);
        }
        else if (nextProps.currentBetIndex !== this.props.currentBetIndex && !nextProps.cspStart) {
            this.toggleDecButton(nextProps, true);
            this.props.buttonPanelUpdateState({ stopGameMinBlance: false });
        }
        return false;
    }

    durionAutoplay(nextProps: any) {
        this.setState((prevState) => {
            return {
                ...prevState,
                [this.button_name_4]: { enable: false }
            }
        });

        this.forceUpdate();
    }

    decreaseButtonEnable(nextProps: any) {
        if (nextProps.balance >= this.props.coinList[nextProps.currentBetIndex + 1] || nextProps.balance >= this.props.coinList[nextProps.currentBetIndex]) {
            this.props.setAllButtonEnable();
        }
        else if ((this.props.balance - this.props.coinList[this.props.currentBetIndex]) - this.props.coinList[this.props.currentBetIndex] >= 0) {
        }
        else {
            if (this.props.balance > 0) {
                this.toggleDecButton(nextProps, true);
            }
            else {
                this.props.setAllButtonDisable();
            }
        }
    }

    /**
     * Enable and disable Decrease Button UI
     * disableButtonForce is false then it will disable button 
     */
    toggleDecButton(nextProps: any, disableButtonForce: boolean = true) {
        let isDisableButton = nextProps.currentBetIndex > 0 && disableButtonForce ? true : false;

        if (nextProps.balance > nextProps.coinList[nextProps.currentBetIndex] && !disableButtonForce && !nextProps.isActiveAll && nextProps.exceptBtnList['btn_bet_decrease']) {
            isDisableButton = true;
        }

        if (this.state[this.button_name_4] !== isDisableButton) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    [this.button_name_4]: { enable: isDisableButton }
                }
            });
            this.forceUpdate();
        }

    }
    // setScale(data: any) {
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
            <UIManager id={"GenericUIComponentdecreaseButtonUI"}
                type={"Container"}
                ref={i => this.buttonPanelGenericUIContainer = i}
                app={this.app}
                configGame={configGame}>
                {
                    this.displayUI.map((data: any) => {
                        // this.setScale(data)
                        return (<UIManager
                            key={`UIManager-${Math.random()}`}
                            type={data.type}
                            app={this.app}
                            ClickHandler={this.handleBetActionEvent}
                            langObj={langObj}
                            disabled={!this.state.btn_bet_decrease.enable}
                            // disabled={!enableAutoPlay ? ((data.name == this.autoPlayButtonName) ? true : this.state[data.name] && !this.state[data.name].enable) : this.state[data.name] && !this.state[data.name].enable}
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
    (state: Pick<IStore, 'asyncServerAction' | 'gameactionstate' | 'asyncGameLevelSeverState' | 'reelgridState' | 'freegameState' | 'winCelebrationState' | 'winpresentationState' | 'betPanelState' | 'reelsState' | 'buttonPanelState' | 'soundState' | 'basegameState' | 'autoplayState' | 'applicationState' | 'desktopSettingPanelState' | 'behaviourState'>): IStateToProps =>
    ({
        allButtonEnable: state.buttonPanelState.allButtonEnable,
        currentBetIndex: state.basegameState.currentBetIndex,
        layoutMode: state.applicationState.layoutMode,
        decreaseBetBtnVisibility: state.applicationState.decreaseBet,
        selectedCoin: state.betPanelState.selectedCoin,
        coinList: state.betPanelState.coinList,
        allSpinComplete: state.reelgridState.allSpinComplete,
        languageCode: state.applicationState.languageCode,
        isActiveAll: state.basegameState.isActiveAll,
        clickedButtonName: state.buttonPanelState.clickedButtonName,
        jurisdictionKey: state.applicationState.jurisdictionKey,
        betBoxCount: state.behaviourState.betBoxCount,
        balance: state.basegameState.balance,
        increaseBetResult: state.asyncGameLevelSeverState.result,
        inAutoplay: state.basegameState.inAutoplay,
        currencyDecimalSeparator: state.applicationState.currencyDecimalSeparator,
        currencyGroupingSeparator: state.applicationState.currencyGroupingSeparator,
        freezeGame: state.buttonPanelState.freezeGame,
        betList: state.basegameState.betList,
        cspStart: state.reelgridState.cspStart,
        exceptBtnList: state.buttonPanelState.exceptBtnList,
        enableParticularButton: state.buttonPanelState.enableParticularButton,
        buyFeatureVisible: state.behaviourState.buyFeatureVisible,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        setSelectedCoin: (selectedCoin: number): any => dispatch(betPanelAction.setSelectedCoin(selectedCoin)),
        getApplicationDecreaseBetResponse: (): any => dispatch(gameLevelResponseActions.getApplicationDecreaseBetResponse()),
        buttonPanelUpdateState: (updateStateObj: string): any => dispatch(buttonActions.buttonPanelUpdateState(updateStateObj)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        stopAutoplay: (): any => dispatch(baseGameAction.stopAutoplay()),
        setApplicationCurrentBetIndex: (betIndex: number): any => dispatch(baseGameAction.setApplicationCurrentBetIndex(betIndex)),
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
	    playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
    }))(withButtonPanelConfiguration(decreaseButtonUI)));