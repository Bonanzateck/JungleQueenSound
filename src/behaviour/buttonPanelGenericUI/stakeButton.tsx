import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {paytableActions, withButtonPanelConfiguration,buttonActions,applicationActions
} from "@bonanzainteractive/slote_core";
import { UIManager ,GSAPTween,ItweenProps} from "@bonanzainteractive/core";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { configGame } from "../../slot/data/config";
import { Texture } from "pixi.js";
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
    allSpinComplete: boolean,
    paytableBtnVisibility: boolean,
    showHelpText: boolean;
    allButtonEnable: boolean,
    inAutoplay: boolean,
    isActiveAll: boolean,
    freezeGame: boolean,
    selectedCoin: number,
    coinList: any,
    balance: number,
    currentBetIndex: number,
    stopGameMinBlance: boolean,
    cspStart: boolean,
    showWinCelebration: boolean

}
class stakeButton extends buttonBase {
    protected button_name_18: string;
    protected hitAreaGraphic: any;
    constructor(props: IProps, state: IState) {
        super(props, state);
        this.button_name_18 = "btn_stake";
        this.state = {
            [this.button_name_18]: { enable: true },
            setbutton: false,
        }
        this.setVisibilityOfButtonAccordingToBackend(this.button_name_18, true);
    }

    //this method will be called when a button gets clicked
    handleEvent = (e: any) => {
        e.stopPropagation();
        this.setState({ setbutton: !this.state.setbutton })
        let betValueButton: any = UIManager.getRef("text_coinValue_value");
        switch (e.target.name) {
            case this.button_name_18:

                if (this.state.setbutton) {
                    this.openBetPanel(true);
                    this.disableBetButtons()
                    betValueButton = UIManager.getRef("text_coinValue_value");
                    betValueButton.visible = true;
                } else {
                    this.openBetPanel(false);
                    betValueButton = UIManager.getRef("text_coinValue_value");
                    betValueButton.visible = false;
                }

                return;

            default:
                return 'No buttons';
        }
    }

    // Bet butons will be disable by this funtion.
    disableBetButtons() {
        let btn_bet_increaseBtn: any = UIManager.getRef("btn_bet_increase");
        let btn_bet_decreaseBtn: any = UIManager.getRef("btn_bet_decrease");
        // let btn_minbetBtn: any = UIManager.getRef("btn_minbet");
        // let btn_maxbetBtn: any = UIManager.getRef("btn_maxbet");
        btn_bet_increaseBtn.texture = Texture.from("bet_plus_standard.png");
        btn_bet_increaseBtn.interactive = true;
        // btn_maxbetBtn.texture = Texture.from("bet_minus_standard.png");
        // btn_maxbetBtn.interactive = true;
        btn_bet_decreaseBtn.texture = Texture.from("bet_minus_standard.png");
        btn_bet_decreaseBtn.interactive = true;
        // btn_minbetBtn.texture = Texture.from("min_up.png");
        // btn_minbetBtn.interactive = true;

        if (this.props.selectedCoin === 0) {
            btn_bet_decreaseBtn.texture = Texture.from("bet_minus_standard.png");
            btn_bet_decreaseBtn.interactive = false;
            // btn_minbetBtn.texture = Texture.from("bet_minus_disable.png");
            // btn_minbetBtn.interactive = false;
            btn_bet_increaseBtn.texture = Texture.from("bet_plus_standard.png");
            btn_bet_increaseBtn.interactive = true;
            // btn_maxbetBtn.texture = Texture.from("max_up.png");
            // btn_maxbetBtn.interactive = true;

        } else if (this.props.selectedCoin === this.props.coinList.length - 1) {
            btn_bet_increaseBtn.texture = Texture.from("bet_plus_disable.png");
            btn_bet_increaseBtn.interactive = false;
            // btn_maxbetBtn.texture = Texture.from("max_disable.png");
            // btn_maxbetBtn.interactive = false;
            btn_bet_decreaseBtn.texture = Texture.from("bet_minus_standard.png");
            btn_bet_decreaseBtn.interactive = true;
            // btn_minbetBtn.texture = Texture.from("bet_minus_standard.png");
            // btn_minbetBtn.interactive = true;
        }
    }

    // This funtion is used to open Bet Panel.
    openBetPanel(Visible: boolean) {
        let betPanelContainer: any = UIManager.getRef("betPanelContainer");
        let maxButton: any = UIManager.getRef("btn_maxbet");
        let minButton: any = UIManager.getRef("btn_minbet");
        let maxBEt: any = UIManager.getRef("maxButtonUI");
        let increaseBetButton: any = UIManager.getRef("btn_bet_increase");
        let decreaseBetButton: any = UIManager.getRef("btn_bet_decrease");
        let betValueButton: any = UIManager.getRef("text_coinValue_value");
        betValueButton.visible = true
        if (betPanelContainer) {
            betPanelContainer && (betPanelContainer.visible = Visible);
            maxBEt && (maxBEt.visible = Visible);
            maxButton && (maxButton.visible = Visible);
            minButton && (minButton.visible = Visible);
            increaseBetButton && (increaseBetButton.visible = Visible);
            decreaseBetButton && (decreaseBetButton.visible = Visible);
            // betValueButton && (betValueButton.visible = true);
            /* this.addFadeTween(betPanelContainer, 0.3, 0, 1)
            GSAPTimer.getInstance().addTimer(300, () => {
                this.hitAreaActive();
            }); */
        }
    }

    hitAreaActive() {
        this.hitAreaGraphic = UIManager.getRef("winCelebration_Graphic");
        this.hitAreaGraphic.interactive = true;
        this.hitAreaGraphic.click = (event: any) => {
            let betPanelContainer: any = UIManager.getRef("betPanelContainer");
            this.addFadeTween(betPanelContainer, 0.3, 1, 0)
            this.hitAreaDeactivate();
        }
    }

    hitAreaDeactivate() {
        this.hitAreaGraphic.interactive = false;
        this.hitAreaGraphic.buttonMode = false;
    }

    addFadeTween(displayObj: any, duration: number, startValue: number, endValue: number) {
        const tweenProps: ItweenProps = {
            alpha: 0,
            duration: duration,
            onComplete: () => {
                this.UIManagerRef(displayObj) && (this.UIManagerRef(displayObj).visible = false);
                GSAPTween.getInstance().killTween(this.UIManagerRef(displayObj));
            }
        }
        GSAPTween.getInstance().gsapTween(this.UIManagerRef(displayObj), tweenProps);
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        return this.checkUpdateState(nextProps) ? true : false;
    }
    checkUpdateState(nextProps: any) {
        if (nextProps.showWinCelebration !== this.props.showWinCelebration) {
            nextProps.showWinCelebration && this.toggleSettingButton(false);
        }

        if (nextProps.inAutoplay && nextProps.inAutoplay === this.props.inAutoplay) {
            this.state[this.button_name_18] && this.state[this.button_name_18].enable && this.toggleSettingButton(false);
            return false;
        }
        // Freeze Game
        let freezeRes: any = this.freezeGameFun(nextProps);
        if (freezeRes) {
            freezeRes === true && this.toggleSettingButton(false);
            (freezeRes === "ACTIVE_BUTTON" || freezeRes === "ACTIVE_BUTTON_ON_POPUP") && this.toggleSettingButton(true);

            return false;
        }
        else if (nextProps.inAutoplay && nextProps.inAutoplay !== this.props.inAutoplay ) {
            this.toggleSettingButton(false);
        }
        else if (!nextProps.inAutoplay && !nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable) {
            this.toggleSettingButton(false);
        }
        else if (!nextProps.inAutoplay && ((nextProps.isActiveAll && nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable) || (nextProps.clickedButtonName !== this.props.clickedButtonName && nextProps.clickedButtonName === "postIntro_continueButton_desktop")) ) {
            this.toggleSettingButton(true);
        }
        else if (!nextProps.inAutoplay && nextProps.allButtonEnable && ((nextProps.isActiveAll !== this.props.isActiveAll && nextProps.isActiveAll && nextProps.allSpinComplete) || (nextProps.showHelpText !== this.props.showHelpText) || (nextProps.paytableBtnVisibility !== this.props.paytableBtnVisibility) || (nextProps.clickedButtonName !== this.props.clickedButtonName && nextProps.clickedButtonName === "postIntro_continueButton_desktop")) ) {
            this.toggleSettingButton(true);

        }
        return false;
    }


    /**
     * Enable and disable Increase Button UI
     */
    toggleSettingButton(isEnable: boolean) {
        this.setState((prevState) => {
            return {
                ...prevState,
                [this.button_name_18]: { enable: isEnable },
                // [this.button_name_6]: { enable: isEnable }
            }
        });
        this.forceUpdate();
    }

    render() {
        const { langObj, enableAutoPlay } = this.props;
        return (

            <UIManager id={"GenericUIComponentstakeButton"}
                type={"Container"}
                ref={(i: _ReactPixi.IContainer | React.Ref<any>) => this.buttonPanelGenericUIContainer = i}
                app={this.app}
                configGame={configGame}>
                {
                    this.displayUI.map((data: any) => {

                        return (
                            <UIManager
                                key={`UIManager-${Math.random()}`}
                                type={data.type}
                                app={this.app}
                                ClickHandler={this.handleEvent}
                                langObj={langObj}
                                disabled={!enableAutoPlay ? ((data.name == this.autoPlayButtonName) ? true : this.state[data.name] && !this.state[data.name].enable) : this.state[data.name] && !this.state[data.name].enable}
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
    (state: Pick<IStore, 'applicationState' | 'winCelebrationState' | 'buttonPanelState' | 'reelgridState' | 'basegameState' | 'betPanelState' | 'behaviourState'>): IStateToProps =>
    ({
        allSpinComplete: state.reelgridState.allSpinComplete,
        paytableBtnVisibility: state.applicationState.showPaytable,
        showHelpText: state.applicationState.showHelpText,
        allButtonEnable: state.buttonPanelState.allButtonEnable,
        inAutoplay: state.basegameState.inAutoplay,
        isActiveAll: state.basegameState.isActiveAll,
        freezeGame: state.buttonPanelState.freezeGame,
        selectedCoin: state.betPanelState.selectedCoin,
        coinList: state.betPanelState.coinList,
        balance: state.basegameState.balance,
        currentBetIndex: state.basegameState.currentBetIndex,
        stopGameMinBlance: state.buttonPanelState.stopGameMinBlance,
        cspStart: state.reelgridState.cspStart,
        showWinCelebration: state.winCelebrationState.showWinCelebration,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        showPaytable: (): any => dispatch(paytableActions.showPaytable()),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        setApplicationShowHelpText: (showHelpText: boolean): any => dispatch(applicationActions.setApplicationShowHelpText(showHelpText)),

    }))(withButtonPanelConfiguration(stakeButton)));    