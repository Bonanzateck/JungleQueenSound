import React from "react";
import { Texture } from "pixi.js";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { GSAPTimer, UIManager } from "@bonanzainteractive/core";
import { withPixiApp } from "@inlet/react-pixi";
import { configGame, constant } from "../../slot/data/config";
import buttonBase from "./buttonBase";
import {
    flowManagerAction, gridActions, reelsActions, reelsGridActions,
    buttonActions, winpresentationAction, asyncActions,
    withButtonPanelConfiguration,
    layoutssActions,
    keyboardListenerActions
} from "@bonanzainteractive/slote_core";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
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
    buyFeaturePageVisible: boolean;
    buyFeatureVisible: boolean;
    inAutoplay: boolean;
    layoutMode: string;
    currentBetIndex: number;
    betList: any;
}
class buyFeatureButtonUI extends buttonBase {
    protected button_name_1: string;
    constructor(props: IProps, state: IState) {
        super(props, state);
        this.button_name_1 = "btn_buy_feature";
        let isEnableSpinbtn = this.props.allButtonEnable ? false : true;
        this.state = {
            [this.button_name_1]: isEnableSpinbtn,
        }
        this.layoutChange(this.props.layoutMode);
    }

    changeTexture(btnName: any, texture: any) {
        let dataName: any = UIManager.getRef(btnName);
        dataName.texture = Texture.from(texture);
        dataName.interactive = false;
    }

    //this method will be called when a button gets clicked
    handleEvent = (e: any) => {
        this.onClickSound();
        switch (e.target.name) {
            case this.button_name_1:
                this.props.showBuyFeatureScreen(true);
                this.props.setWinCelebrationForKeyboardListener(true);
                this.UIManagerRef("btn_spin") && (this.UIManagerRef("btn_spin").interactive = false);
                this.UIManagerRef("btn_turDisable") && (this.UIManagerRef("btn_turDisable").interactive = false);
                this.UIManagerRef("btn_autoplay_desktop") && (this.UIManagerRef("btn_autoplay_desktop").interactive = false);
                this.UIManagerRef("btn_turboEnable") && (this.UIManagerRef("btn_turboEnable").interactive = false);
                this.UIManagerRef("btn_paytable") && (this.UIManagerRef("btn_paytable").interactive = false);
                this.UIManagerRef("btn_sound") && (this.UIManagerRef("btn_sound").interactive = false);
                this.UIManagerRef("btn_menu") && (this.UIManagerRef("btn_menu").interactive = false);
                this.UIManagerRef("btn_soundOff") && (this.UIManagerRef("btn_soundOff").interactive = false);
                this.UIManagerRef("btn_bet_increase") && (this.UIManagerRef("btn_bet_increase").interactive = false);
                this.UIManagerRef("btn_bet_decrease") && (this.UIManagerRef("btn_bet_decrease").interactive = false);

                if (this.props.currentBetIndex === this.props.betList.length - 1) {
                    this.changeTexture("btn_bet_Increase", "bet_plus_disable.png");
                } else if (this.props.currentBetIndex === 0) {
                    this.changeTexture("btn_bet_Decrease", "bet_minus_disable.png");
                }
                break;
            default:
                break;
        }
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        if (this.props.layoutMode) {
            this.layoutChange(this.props.layoutMode);
        }
    }

    componentDidMount(): void {
        !this.props.buyFeaturePageVisible ? this.UIManagerRef("btn_buy_feature") && (this.UIManagerRef("btn_buy_feature").visible = true) : this.UIManagerRef("btn_buy_feature") && (this.UIManagerRef("btn_buy_feature").visible = false);
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        // Buy Feature   
        if (nextProps.inAutoplay || this.props.inAutoplay) {
            !this.state[this.button_name_1] && this.setState((prevState) => {
                return { ...prevState, [this.button_name_1]: true }
            });
            !this.state[this.button_name_1] && this.forceUpdate();
        }
        if ((nextProps.buyFeatureVisible !== this.props.buyFeatureVisible && !constant.configGame.BUY_FEATURE_ACTIVE)) {
            this.setState((prevState) => {
                return { ...prevState, [this.button_name_1]: nextProps.buyFeatureVisible }
            });
            this.forceUpdate();
        }
        if ((!nextProps.inAutoplay && !nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable) || (nextProps.inAutoplay && nextProps.inAutoplay !== this.props.inAutoplay)) {
            this.setState((prevState) => {
                return { ...prevState, [this.button_name_1]: true }
            });
            this.forceUpdate();
        }
        else if (!nextProps.inAutoplay && nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable) {
            this.setState((prevState) => {
                return { ...prevState, [this.button_name_1]: false }
            });
            this.forceUpdate();
        }
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode);
        }
        //  Feature Script hide
        return false;
    }

    render() {

        const { langObj, enableAutoPlay } = this.props;
        return (
            <UIManager id={"GenericUIComponentBuyFeatureButtonUI"}
                type={"Container"}
                ref={i => this.buttonPanelGenericUIContainer = i}
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
                                disabled={!enableAutoPlay && data.name === this.autoPlayButtonName ? true : this.state[data.name]}
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
    (state: Pick<IStore, 'reelsState' | 'basegameState' | 'applicationState' | 'buyFeatureState' | 'buttonPanelState' | 'behaviourState'>): IStateToProps =>
    ({
        spinResponseReceived: state.reelsState.spinResponseReceived,
        allSpinComplete: state.reelsState.allSpinComplete,
        allButtonEnable: state.buttonPanelState.allButtonEnable,
        buyFeaturePageVisible: state.buyFeatureState.buyFeaturePageVisible,
        buyFeatureVisible: state.behaviourState.buyFeatureVisible,
        inAutoplay: state.basegameState.inAutoplay,
        layoutMode: state.applicationState.layoutMode,
        currentBetIndex: state.basegameState.currentBetIndex,
        betList: state.basegameState.betList,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        showBuyFeatureScreen: (buyFeatureVisible: boolean): any => dispatch(behaviourAction.showBuyFeatureScreen(buyFeatureVisible)),
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        setWinCelebrationForKeyboardListener: (winCelebrationForKeyBoardListener: boolean): any => dispatch(keyboardListenerActions.setWinCelebrationForKeyboardListener(winCelebrationForKeyBoardListener)),

    }))(withButtonPanelConfiguration(buyFeatureButtonUI)));    