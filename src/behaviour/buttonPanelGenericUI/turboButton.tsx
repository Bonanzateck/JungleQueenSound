import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
    paytableActions, withButtonPanelConfiguration, buttonActions, applicationActions, reelsActions
} from "@bonanzainteractive/slote_core";
import { UIManager, GSAPTween, ItweenProps } from "@bonanzainteractive/core";
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
class turboButton extends buttonBase {
    protected button_name_19: string;
    protected button_name_20: string;
    protected hitAreaGraphic: any;
    constructor(props: IProps, state: IState) {
        super(props, state);
        this.button_name_19 = "btn_turboEnable";
        this.button_name_20 = "btn_turbodisable";
        this.state = {
            [this.button_name_19]: { enable: false},
            [this.button_name_20]: { enable: false },

            setbutton: false,
        }
        this.setVisibilityOfButtonAccordingToBackend(this.button_name_19, true);
    }

    //this method will be called when a button gets clicked
    handleEvent = (e: any) => {
        e.stopPropagation();      
        switch (e.target.name) {
            case this.button_name_19:           
                this.props.setTurboMode(true);           
                UIManager.getRef(this.button_name_20).visible = true;
                UIManager.getRef(this.button_name_19).visible = false;          
                return;
            case this.button_name_20:         
                this.props.setTurboMode(false);             
                UIManager.getRef(this.button_name_20).visible = false;
                UIManager.getRef(this.button_name_19).visible = true;
                return;

            default:
                return 'No buttons';
        }
    }
    updateBtn(on:boolean,off:boolean){
        this.setState((prevState) => {
            return {
                ...prevState,            
                [this.button_name_19]: { enable: off },
                [this.button_name_20]: { enable: on },
              
            }
        });
        this.forceUpdate();
    }
    // This funtion is used to open Bet Panel.
    hitAreaDeactivate() {
         this.hitAreaGraphic.interactive = false;
         this.hitAreaGraphic.buttonMode = false;
    }
   
    checkUpdateState(nextProps: any) {
        if (nextProps.showWinCelebration !== this.props.showWinCelebration) {
            nextProps.showWinCelebration && this.toggleSettingButton(false);
        }

        if (nextProps.inAutoplay && nextProps.inAutoplay === this.props.inAutoplay) {
            this.state[this.button_name_19] && this.state[this.button_name_19].enable && this.toggleSettingButton(false);
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
        else if (!nextProps.inAutoplay && !nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable ) {
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
                [this.button_name_19]: { enable: isEnable },
                // [this.button_name_6]: { enable: isEnable }
            }
        });
        this.forceUpdate();
    }

    render() {
        
        const { langObj, enableAutoPlay } = this.props;
        return (

            <UIManager id={"GenericUIComponentTurboButton"}
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
                                disabled={false}
                                id={data.id}
                                visible={false}
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
        setTurboMode: (IsTurboMode: boolean): any => dispatch(reelsActions.setTurboMode(IsTurboMode)),

    }))(withButtonPanelConfiguration(turboButton)));    