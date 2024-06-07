import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {withButtonPanelConfiguration}  from "@bonanzainteractive/slote_core";

import { UIManager } from "@bonanzainteractive/core";

import { withPixiApp } from "@inlet/react-pixi";
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
    currentBetIndex: number;
    selectedCoin: number;
    coinList: any;
    increaseBetResult: Object;
    betBoxCount: number,
    balance: number;
    jurisdictionKey: string,
    currencyDecimalSeparator: string;
    currencyGroupingSeparator: string;
}
class textCoinValueUI extends buttonBase {
    constructor(props: IProps, state: IState) {
        super(props, state);
        this.state = {
            text_coinValue_value: this.textValueCal(),
        }
    }
    textValueCal() {
        return this.numberWithCommasAndDeciaml(this.props.coinList[this.props.selectedCoin] / 2000);
    }
    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.selectedCoin !== this.props.selectedCoin) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    text_coinValue_value: this.textValueCal()
                }
            });
            this.forceUpdate();
        }
        return false;
    }
    render() {
        const { langObj, enableAutoPlay } = this.props;
        if (this.props.jurisdictionKey === "social") {
            return null;
        }
        return (
            <UIManager id={"GenericUIComponenttextCoinValueUI"}
                type={"Container"}
                ref={i => this.buttonPanelGenericUIContainer = i}
                app={this.app}
                configGame={configGame}>
                {
                    this.displayUI.map((data: any) => {
                        if (data.name === 'text_coinValue_value') {
                            data.text = this.state[data.name];
                        }
                        return (
                            <UIManager
                                key={`UIManager-${Math.random()}`}
                                type={data.type}
                                app={this.app}
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
    (state: Pick<IStore, 'asyncGameLevelSeverState' | 'betPanelState' | 'basegameState' | 'applicationState' | 'behaviourState'>): IStateToProps =>
    ({
        currentBetIndex: state.basegameState.currentBetIndex,
        selectedCoin: state.betPanelState.selectedCoin,
        coinList: state.betPanelState.coinList,
        increaseBetResult: state.asyncGameLevelSeverState.result,
        jurisdictionKey: state.applicationState.jurisdictionKey,
        betBoxCount: state.behaviourState.betBoxCount,
        balance: state.basegameState.balance,
        currencyDecimalSeparator: state.applicationState.currencyDecimalSeparator,
        currencyGroupingSeparator: state.applicationState.currencyGroupingSeparator,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({}))(withButtonPanelConfiguration(textCoinValueUI)));