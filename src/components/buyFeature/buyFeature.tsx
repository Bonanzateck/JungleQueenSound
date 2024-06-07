import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { UIManager } from "@bonanzainteractive/core";
import { CURRENCY } from "@bonanzainteractive/core";
import { baseGameAction, asyncActions, reelsActions, winpresentationAction, keyboardListenerActions } from "@bonanzainteractive/slote_core";
import { buttonActions } from "@bonanzainteractive/slote_core";
import withBuyFeatureConfiguration from "./configuration/withBuyFeatureConfiguration";
import { isMobile } from "react-device-detect";
import { configGame, constant } from "../../slot/data/config";
import { layoutssActions } from "@bonanzainteractive/slote_core";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { actions as betPanelAction } from "../../core/reducers/betPanelReducer";
import { Texture } from "pixi.js";
interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}

interface IStateToProps {
    layoutMode: string;
    buyFeatureVisible: boolean;
    currentBetIndex: number;
    betList: any;
    buyFeatureValue: number;
}

interface IDispatchToProps { }

interface IState {
    [x: string]: any;
}

class BuyFeature extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected buyFeatureContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: Object[] = [];
    private UIManagerRef: any;
    private UIManagerSetText: any = UIManager.setText;


    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            uiElements: [],
            lang: "en",
        }
        this.UIManagerRef = UIManager.getRef;
        this.buyFeatureContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";

        }
        this.displayUI = this.props.data.COMPONENTS.filter(this.checkUiMode.bind(this));
    }

    checkUiMode(uimodeobj: any) {
        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both"
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        });
        isMobile && (window.innerWidth < window.innerHeight) ? this.mobileAlignment(true, false, -389, 508, 845, 1013) : this.mobileAlignment(false, true, 0, 0, 1685, 480)
    }

    componentDidMount() { }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.currentBetIndex !== this.props.currentBetIndex) {
            this.betvalueaupdate();
            return true;
        }
        if (nextProps.buyFeatureVisible !== this.props.buyFeatureVisible) {
            return true;
        }
        if (nextProps.layoutMode !== this.props.layoutMode) {
            if (nextProps.layoutMode) {
                this.layoutChange(nextProps.layoutMode);
            }
            return false;
        }
        return false;
    }


    mobileAlignment(parm1: any, parm2: any, parm3: any, parm4: any, parm5: any, parm6: any,) {
        if (isMobile && this.UIManagerRef("buyFeatureContainer") && this.UIManagerRef("buyFeatureContainer").transform !== null) {
            this.UIManagerRef("backgroundGraphicPopPortrait").visible = parm1;
            this.UIManagerRef("backgroundGraphicPopupLandscape").visible = parm2;
            this.UIManagerRef("backgroundGraphicBuyFeature_p").visible = parm1;
            this.UIManagerRef("backgroundGraphicBuyFeature").visible = parm2;
            this.UIManagerRef("buyFeatureContainer").position.set(parm3, parm4);
            this.UIManagerRef("buyScreen_closeButton").position.set(parm5, parm6);
        }
        if (!isMobile) {
            this.UIManagerRef("backgroundGraphicPopPortrait") && (this.UIManagerRef("backgroundGraphicPopPortrait").visible = false);
        }
    }

    betvalueaupdate() {
        // if (this.props.currentBetIndex !== this.props.betList.length) {
        let toString = (this.props.betList[this.props.currentBetIndex]).toString();
        let bet = CURRENCY.CurrencyManager.formatCurrencyString(Number(toString), true, true, true, true);
        this.UIManagerRef("betLevel_textValue") && (this.UIManagerSetText("betLevel_textValue", bet));
        let toString1 = (this.props.buyFeatureValue).toString();
        let bet1 = CURRENCY.CurrencyManager.formatCurrencyString(Number(toString1 * toString), true, true, true, true);
        this.UIManagerRef("betvalue_text") && (this.UIManagerSetText("betvalue_text", bet1));
        this.UIManagerRef("balance_text") && (this.UIManagerSetText("balance_text", bet1));
        // }
    }
    // This Function  is used to Set Sound on BUY buttons
    onClickSound() {
        this.props.setApplicationButtonClicked(true);
        this.props.setApplicationButtonClicked(false);
    }
    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        this.betvalueaupdate();
        isMobile && (window.innerWidth < window.innerHeight) ? this.mobileAlignment(true, false, -389, 508, 845, 1013) : this.mobileAlignment(false, true, 0, 0, 1685, 480);
    }

    funtionBetUpdate(e: any) {
        this.props.setAllButtonDisable();
        let currentBetIndexupdate = e.target.name === "btn_bet_Increase" ? (this.props.currentBetIndex === this.props.betList.length - 1 ? this.props.currentBetIndex : (this.props.currentBetIndex + 1)) :
            (this.props.currentBetIndex === 0 ? this.props.currentBetIndex : (this.props.currentBetIndex - 1));
        let toString = (this.props.betList[currentBetIndexupdate]).toString();
        let bet = CURRENCY.CurrencyManager.formatCurrencyString(Number(toString), true, true, true, true);
        this.UIManagerRef("betLevel_textValue") && (this.UIManagerSetText("betLevel_textValue", bet));
        this.props.setApplicationCurrentBetIndex(currentBetIndexupdate);
        this.props.setSelectedCoin(currentBetIndexupdate);
        this.UIManagerRef("btn_sound") && (this.UIManagerRef("btn_sound").interactive = false);
        this.UIManagerRef("btn_soundOff") && (this.UIManagerRef("btn_soundOff").interactive = false);
        if (e.target.name === "btn_bet_Increase") {
            if (this.props.currentBetIndex === this.props.betList.length - 1) {
                this.changeTexture("btn_bet_Increase", "bet_plus_disable.png");
            }
        } else {
            if (this.props.currentBetIndex === 0) {
                this.changeTexture("btn_bet_Decrease", "bet_minus_disable.png");
            }
        }
    }

    changeTexture(obj: any, texture: any) {
        let btn_bet_Decrease: any = UIManager.getRef(obj);
        btn_bet_Decrease.texture = Texture.from(texture);
        btn_bet_Decrease.interactive = false;
        // this.props.setAllButtonEnable([obj]);
    }
    functionPopup(param1: boolean, param2: boolean, e: any) {
        UIManager.getRef("popUpContainer").visible = param1;
        UIManager.getRef("buyScreen_closeButton").interactive = param2;
        UIManager.getRef("Buy_BuyFeature_popup").interactive = param2;
        UIManager.getRef("btn_bet_Decrease").interactive = param2;
        UIManager.getRef("btn_bet_Increase").interactive = param2;

        if (e.target.name === "buyScreen_closeButton2") {
            if (this.props.currentBetIndex === this.props.betList.length - 1) {
                this.changeTexture("btn_bet_Increase", "bet_plus_disable.png");
            } else if (this.props.currentBetIndex === 0) {
                this.changeTexture("btn_bet_Decrease", "bet_minus_disable.png");
            }
        }
    }

    freegameTrigger() {
        constant.configGame.BUY_FEATURE_ACTIVE = true;
        this.props.getApplicationSpinResponse();
        this.props.stopWinPresentation();
        this.props.resetReelState();
        this.props.setCspStart(true);
        this.props.showBuyFeatureScreen(false);
        this.props.setAllButtonDisable();
    }

    private creditValueUpdateOnBuyButton(){
        constant.configGame.balance = (constant.configGame.balance - (this.props.betList[this.props.currentBetIndex] * 100) + this.props.betList[this.props.currentBetIndex])
        this.props.setApplicationBalance(constant.configGame.balance);
    }

    //close_BuyFeature
    handleEvent = (e: any) => {
        if (!constant.configGame.BUY_FEATURE_ACTIVE) {
            this.onClickSound();
            switch (e.target.name) {
                case "buyScreen_closeButton":
                    this.props.showBuyFeatureScreen(false);
                    this.props.setWinCelebrationForKeyboardListener(false);
                    this.UIManagerRef("btn_spin") && (this.UIManagerRef("btn_spin").interactive = true);
                    this.UIManagerRef("btn_autoplay_desktop") && (this.UIManagerRef("btn_autoplay_desktop").interactive = true);
                    this.UIManagerRef("btn_turboEnable") && (this.UIManagerRef("btn_turboEnable").interactive = true);
                    this.UIManagerRef("btn_paytable") && (this.UIManagerRef("btn_paytable").interactive = true);
                    this.UIManagerRef("btn_sound") && (this.UIManagerRef("btn_sound").interactive = true);
                    this.UIManagerRef("btn_menu") && (this.UIManagerRef("btn_menu").interactive = true);
                    this.UIManagerRef("btn_soundOff") && (this.UIManagerRef("btn_soundOff").interactive = true);
                    this.props.setAllButtonEnable();
                    // if (this.props.currentBetIndex === this.props.betList.length - 1) {
                    //     this.UIManagerRef("btn_bet_increase") && (this.UIManagerRef("btn_bet_increase").interactive = false);
                    //     this.changeTexture("btn_bet_increase", "bet_plus_disable.png");
                    // } else if (this.props.currentBetIndex === 0) {
                    //     this.UIManagerRef("btn_bet_decrease") && (this.UIManagerRef("btn_bet_decrease").interactive = false);
                    //     this.changeTexture("btn_bet_decrease", "bet_minus_disable.png");
                    // }else{
                    //     (this.UIManagerRef("btn_bet_increase").interactive = true);
                    //    (this.UIManagerRef("btn_bet_decrease").interactive = true);
                    // }
                    break;
                case "buyScreen_closeButton2":
                    this.functionPopup(false, true, e);
                    break;
                case "Buy_BuyFeature_popup":
                    this.functionPopup(true, false, e);
                    break;
                case "done_BuyFeature":
                    this.creditValueUpdateOnBuyButton();
                    this.freegameTrigger();
                    break;
                case "btn_bet_Increase":
                    this.funtionBetUpdate(e);
                    break;
                case "btn_bet_Decrease":
                    this.funtionBetUpdate(e);
                    break;
                default:
                    return 'No buttons';
            }
        }
    }

    render() {
        if (!this.props.buyFeatureVisible) {
            return (<></>)
        }
        return (
            <UIManager id={"buyFeatureContainer"} name={"buyFeatureContainer"} type={"Container"}
                ref={i => this.buyFeatureContainer = i}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            app={this.app} configGame={configGame} constant={constant}
                            id={i.id} name={i.name} {...i} ClickHandler={this.handleEvent}
                        />)
                }
            </UIManager>
        );
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'applicationState' | 'behaviourState' | 'basegameState' | "betPanelState" | 'buttonPanelState' | 'buyFeatureState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        buyFeatureVisible: state.behaviourState.buyFeatureVisible,
        currentBetIndex: state.basegameState.currentBetIndex,
        betList: state.basegameState.betList,
        buyFeatureValue: state.buyFeatureState.buyFeatureValue
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        showBuyFeatureScreen: (buyFeatureVisible: boolean): any => dispatch(behaviourAction.showBuyFeatureScreen(buyFeatureVisible)),
        setApplicationCurrentBetIndex: (betIndex: number): any => dispatch(baseGameAction.setApplicationCurrentBetIndex(betIndex)),
        setSelectedCoin: (selectedCoin: number): any => dispatch(betPanelAction.setSelectedCoin(selectedCoin)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        getApplicationSpinResponse: (): any => dispatch(asyncActions.getApplicationSpinResponse()),
        setCspStart: (cspStart: boolean): any => dispatch(reelsActions.setCspStart(cspStart)),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        resetReelState: (): any => dispatch((Number(configGame["SPIN_TYPE"]) === 0 && reelsActions.resetReelState())),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        setApplicationBalance: (balance: number): any => dispatch(baseGameAction.setApplicationBalance(balance)),
        setWinCelebrationForKeyboardListener: (winCelebrationForKeyBoardListener: boolean): any => dispatch(keyboardListenerActions.setWinCelebrationForKeyboardListener(winCelebrationForKeyBoardListener)),

    }))(withBuyFeatureConfiguration(BuyFeature)));
