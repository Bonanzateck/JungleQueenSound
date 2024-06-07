import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
    paytableActions, withButtonPanelConfiguration, buttonActions, applicationActions, reelsActions, layoutssActions, soundActions
} from "@bonanzainteractive/slote_core";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { UIManager  } from "@bonanzainteractive/core";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { configGame } from "../../slot/data/config";
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
    // allSpinComplete: boolean,
    // paytableBtnVisibility: boolean,
    // showHelpText: boolean;
    allButtonEnable: boolean,
    // inAutoplay: boolean,
    // isActiveAll: boolean,
    // freezeGame: boolean,
    // selectedCoin: number,
    // coinList: any,
    // balance: number,
    // currentBetIndex: number,
    // stopGameMinBlance: boolean,
    cspStart: boolean,
    // showWinCelebration: boolean,
    InTurboMode: boolean,
    layoutMode: string;
    buyFeatureVisible: boolean;
    checkGameTurboMode: boolean;
}
class turboButtonEnable extends buttonBase {
    protected button_name_19: string;
    protected hitAreaGraphic: any;
    constructor(props: IProps, state: IState) {
        super(props, state);
        this.button_name_19 = "btn_turboEnable";
        this.state = {
            [this.button_name_19]: { enable: false },

            setbutton: false,
        }
        this.setVisibilityOfButtonAccordingToBackend(this.button_name_19, true);
        this.layoutChange(this.props.layoutMode);
    }

    //this method will be called when a button gets clicked
    handleEvent = (e: any) => {
        e.stopPropagation();

        switch (e.target.name) {
            case this.button_name_19:
                if (this.props.cspStart || this.props.allButtonEnable) {
                    this.props.setTurboMode(true);
                    this.props.setGameTurboMode(true);
                    this.updateBtn(true);
                    this.onClickSound();
                }
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

    updateBtn(enable: boolean) {
        this.setState((prevState) => {
            return {
                ...prevState,
                [this.button_name_19]: { enable: false },
                setbutton: enable

            }
        });
        this.forceUpdate();
    }

    hitAreaDeactivate() {
        this.hitAreaGraphic.interactive = false;
        this.hitAreaGraphic.buttonMode = false;
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        return nextProps.buyFeatureVisible ? false : true;
    }

    render() {
        const { langObj, enableAutoPlay } = this.props;
        if (this.props.InTurboMode) {
            return <></>
        }
        return (

            <UIManager id={"GenericUIComponentTurboButton"}
                type={"Container"}
                ref={(i: _ReactPixi.IContainer | React.Ref<any>) => this.buttonPanelGenericUIContainer = i}
                app={this.app}
                configGame={configGame}>
                {
                    this.displayUI.map((data: any) => {
                        // if(!this.state.setbutton && data.id === 'btn_turboEnable' || this.state.setbutton && data.id === 'btn_turbodisable' ){
                        return (
                            <UIManager
                                key={`UIManager-${Math.random()}`}
                                type={data.type}
                                app={this.app}
                                ClickHandler={this.handleEvent}
                                langObj={langObj}
                                // disabled={data.id === "btn_turboEnable" ?!this.state.btn_turboEnable.enable:!this.state.btn_turbodisable.enable}
                                disabled={false}
                                // disabled={!enableAutoPlay ? ((data.name == this.autoPlayButtonName) ? true : this.state[data.name] && !this.state[data.name].enable) : this.state[data.name] && !this.state[data.name].enable}
                                id={data.id}

                                {...data}
                            />
                        )
                        //  }else{
                        //     <></>
                        //  }


                    })
                }
            </UIManager>
        )

    }

}

export default withPixiApp(connect(
    (state: Pick<IStore, 'applicationState' | 'winCelebrationState' | 'buttonPanelState' | 'reelsState' | 'reelgridState' | 'basegameState' | 'betPanelState' | 'behaviourState'>): IStateToProps =>
    ({
        // allSpinComplete: state.reelgridState.allSpinComplete,
        // paytableBtnVisibility: state.applicationState.showPaytable,
        // showHelpText: state.applicationState.showHelpText,
        // inAutoplay: state.basegameState.inAutoplay,
        // isActiveAll: state.basegameState.isActiveAll,
        // freezeGame: state.buttonPanelState.freezeGame,
        // selectedCoin: state.betPanelState.selectedCoin,
        // coinList: state.betPanelState.coinList,
        // balance: state.basegameState.balance,
        // currentBetIndex: state.basegameState.currentBetIndex,
        // stopGameMinBlance: state.buttonPanelState.stopGameMinBlance,
        // showWinCelebration: state.winCelebrationState.showWinCelebration,
        allButtonEnable: state.buttonPanelState.allButtonEnable,
        cspStart: state.reelgridState.cspStart,
        InTurboMode: state.reelsState.InTurboMode,
        layoutMode: state.applicationState.layoutMode,
        buyFeatureVisible: state.behaviourState.buyFeatureVisible,
        checkGameTurboMode: state.behaviourState.checkGameTurboMode,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        showPaytable: (): any => dispatch(paytableActions.showPaytable()),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        setApplicationShowHelpText: (showHelpText: boolean): any => dispatch(applicationActions.setApplicationShowHelpText(showHelpText)),
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        setTurboMode: (InTurboMode: boolean): any => dispatch(reelsActions.setTurboMode(InTurboMode)),
        setGameTurboMode: (checkGameTurboMode: boolean): any => dispatch(behaviourAction.setGameTurboMode(checkGameTurboMode)),
    }))(withButtonPanelConfiguration(turboButtonEnable)));    