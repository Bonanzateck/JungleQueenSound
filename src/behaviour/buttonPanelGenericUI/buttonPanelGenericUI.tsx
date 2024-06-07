import React from "react";
import { withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { withButtonPanelConfiguration, buttonActions } from "@bonanzainteractive/slote_core";
import { UIManager } from "@bonanzainteractive/core";
import { configGame } from "../../slot/data/config";
import { ButtonPanelGenericUISuper } from "./configuration/buttonPanelGenericUIBase";

export interface IStateToProps {
    allButtonEnable: boolean;
    exceptBtnList: Array<string>;
    enableAutoPlay: boolean;
    responsibleGamingUrl: string;
    languageCode: any;
    firstSpinAfterLoad: boolean;
    clickedButtonName: string;
    homeUrl: any;
}
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

class ButtonPanelGenericUI extends ButtonPanelGenericUISuper {
    constructor(props: IProps, state: IState) {
        super(props);
    }

    //this method will be called when a button gets clicked
    handleEvent = (e: any) => {
        e.stopPropagation();
        let condition;
        if (!this.props.voucherIsRunning) {
            condition = ((this.props.clickedButtonName !== e.target.name) || (this.props.clickedButtonName === "btn_bet_increase" || this.props.clickedButtonName === "btn_bet_decrease"));
        }
        else {
            condition = ((this.props.clickedButtonName !== e.target.name) && (e.target.name !== "btn_bet_increaseVoucher" && e.target.name !== "btn_bet_decreaseVoucher" && e.target.name !== "btn_maxbetVoucher"));
        }
        if (condition) {
            this.props.setApplicationButtonClicked(true);
            this.props.setApplicationButtonClicked(false);
            this.props.buttonClickedName(e.target.name);
        }
        switch (e.target.name) {
            // case this.button_name_9:
            //     this.openUrl(this.props.homeUrl);
            //     return;
            case this.button_name_14:
                this.openUrl(this.props.responsibleGamingUrl);
                return;
            default:
                return 'No buttons';
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        return false;
    }

    render() {
        const { alwaysEnableButtonNameList, exceptBtnList, langObj, enableAutoPlay, allButtonEnable } = this.props;
        return (
            <UIManager id={"buttonPanelGenericUIContainer"}
                type={"Container"}
                ref={i => this.buttonPanelGenericUIContainer = i}
                app={this.app}
                configGame={configGame}>
                {
                    this.displayUI.map((data: any) => {
                        return (

                            (alwaysEnableButtonNameList.includes(data.name) || exceptBtnList.includes(data.name)) && (
                                (alwaysEnableButtonNameList.includes(data.name)) &&
                                <UIManager
                                    key={`UIManager-${Math.random()}`}
                                    type={data.type}
                                    ClickHandler={this.handleEvent}
                                    langObj={langObj}
                                    disabled={!enableAutoPlay ? ((data.name === this.autoPlayButtonName) ? true : !this.state[data.name].enable) : !this.state[data.name].enable}
                                    id={data.id}
                                    {...data}
                                    app={this.app} />
                                ||
                                (allButtonEnable && exceptBtnList.includes(data.name)) &&
                                <UIManager
                                    key={`UIManager-${Math.random()}`}
                                    type={data.type}
                                    app={this.app}
                                    ClickHandler={this.handleEvent}
                                    langObj={langObj}
                                    disabled={!enableAutoPlay ? ((data.name === this.autoPlayButtonName) ? true : !this.state[data.name].enable) : !this.state[data.name].enable}
                                    id={data.id}
                                    {...data}
                                />
                                ||
                                <UIManager key={`UIManager-${Math.random()}`}
                                    type={data.type}
                                    app={this.app}
                                    ClickHandler={this.handleEvent}
                                    langObj={langObj}
                                    disabled={!enableAutoPlay ? ((data.name === this.autoPlayButtonName) ? true : !this.state[data.name].enable) : !this.state[data.name].enable}
                                    id={data.id}
                                    {...data}
                                />
                            )
                            ||
                            (
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
                        )
                    }
                    )
                }
            </UIManager>
        )
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'buttonPanelState' | 'basegameState' | 'applicationState'>): IStateToProps =>
    ({
        allButtonEnable: state.buttonPanelState.allButtonEnable,
        exceptBtnList: state.buttonPanelState.exceptBtnList,
        enableAutoPlay: state.applicationState.enableAutoPlay,
        responsibleGamingUrl: state.applicationState.responsibleGamingUrl,
        languageCode: state.applicationState.languageCode,
        firstSpinAfterLoad: state.basegameState.firstSpinAfterLoad,
        clickedButtonName: state.buttonPanelState.clickedButtonName,
        homeUrl: state.applicationState.homeUrl,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        buttonClickedName: (clickedButtonName: string): any => dispatch(buttonActions.buttonClickedName(clickedButtonName)),
    }))(withButtonPanelConfiguration(ButtonPanelGenericUI)));