import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withCanvasMobileBetConfiguration from "./configuration/withCanvasMobileBetConfiguration";
import { UIManager, GSAPTimer } from "@bonanzainteractive/core";

import { isMobile } from "react-device-detect";
import { actions as betPanelAction } from "../../core/reducers/betPanelReducer";
import { actions as gameLevelResponseActions } from "../../gamereducer/asyncGameLevelServerResponseReducer";
import { autoplayActions, baseGameAction, layoutssActions, paytableActions, reelsGridActions , applicationActions ,buttonActions , desktopSettingPanelActions ,winpresentationAction , asyncActions, reelsActions } from "@bonanzainteractive/slote_core";
import { actions as paytableGofActions } from "./../../gamereducer/paytableBMReducer";
import { actions as menuActions } from "../../core/reducers/menuReducer";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { Texture } from "pixi.js";
import { configGame } from "../../slot/data/config";


interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;

}

interface IStateToProps {
    layoutMode: string;
    showMenu: boolean;
    currentBetIndex: number;
    betList: any;
    selectedCoin: number;
    coinList: any;
    balance: number;
    transitionBalance: number;
    firstSpinAfterLoad: boolean;
    jurisdictionKey: string;
    currentVoucherResult: object;
}

interface IDispatchToProps {

}

interface IState {
    [x: string]: any;
}

class CanvasMobileBet extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected CanvasMobileBetContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: Object[] = [];
    protected ui_mobileMode: string = "";
    protected storeCurrentBet: number = 0;
    public totalBetButtons: number = 9;
    public divider: number = this.props.jurisdictionKey === "social" ? 1 : 2000;
    private UIManagerRef: any;
    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            uiElements: [],
            lang: "en",
        }
        this.CanvasMobileBetContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }
        this.UIManagerRef = UIManager.getRef;
        this.displayUI = this.props.data.COMPONENTS.filter(this.checkUiMode.bind(this));
    }

    checkUiMode(uimodeobj: any) {
        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both";
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    setLayout() {
        if (window.innerWidth > window.innerHeight) {
            this.ui_mobileMode = '_landscape';
        }
        else {
            this.ui_mobileMode = '_portrait';
        }
    }

    componentDidMount() {
        this.layoutChange(this.props.layoutMode);
        this.updateUi();
    }

    scaled() {
        if (this.UIManagerRef("bet_text_Bg_image")) {
            (window.innerWidth > window.innerHeight) && (this.UIManagerRef("bet_text_Bg_image").scale.set(0.8));
            (window.innerWidth < window.innerHeight) && (this.UIManagerRef("bet_text_Bg_image").scale.set(1));
        }
    }

    updateUi() {
        if (isMobile) {
            this.UIManagerRef("bet_text") && UIManager.setText("bet_text", String(this.props.coinList[this.props.selectedCoin] / this.divider));
            let balance;
            this.props.transitionBalance === 0 ? balance = this.props.balance : balance = this.props.transitionBalance;
            if ((this.props.betList[this.props.selectedCoin] >= balance)) {
                this.UIManagerRef("maxbetBtn") && (this.UIManagerRef("maxbetBtn").texture = Texture.from("max_disable.png"));
            }
            this.scaled();
        }
    }

    onSpin() {
        GSAPTimer.getInstance().addTimer(100 / 1000, () => {
            let condition;
            if (this.props.firstSpinAfterLoad) {
                condition = ((this.props.balance - this.props.coinList[this.props.selectedCoin] >= this.props.coinList[this.props.selectedCoin]) || (this.props.balance - this.props.coinList[this.props.selectedCoin]) === 0) || ((this.props.balance - this.props.coinList[this.props.selectedCoin]) >= 0);
                this.props.spinAfterLoad(false);
            }
            else {
                condition = ((this.props.balance - this.props.coinList[this.props.selectedCoin] >= this.props.coinList[this.props.selectedCoin]));
            }
            if (condition) {
                this.storeCurrentBet = this.props.coinList[this.props.selectedCoin];
                this.props.getApplicationSpinResponse();
                this.props.setStopActive(true);
                this.props.stopWinPresentation()
                this.props.setAllButtonDisable();
                this.props.resetReelState();
                this.props.setCspStart(true);
            }
        });
    }

    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
            return false;
        });
        this.orientationChange();
        this.setCoinValue();
        this.setLayout();
        this.scaled();
    }
    orientationChange() {
        if (window.innerWidth > window.innerHeight) {
            this.UIManagerRef("betContent") && (this.UIManagerRef("betContent").scale.x = 1);
            this.UIManagerRef("betContent") && (this.UIManagerRef("betContent").scale.y = 1);
        } else {
            this.UIManagerRef("betContent") && (this.UIManagerRef("betContent").scale.x = 0.75);
            this.UIManagerRef("betContent") && (this.UIManagerRef("betContent").scale.y = 0.8);
        }
    }

    setCoinValue() {
        if (this.props.jurisdictionKey === "social") {
            this.UIManagerRef("Bet_button_Coin_Value") && (this.UIManagerRef("Bet_button_Coin_Value").visible = false);
            this.UIManagerRef("Bet_button_Bet") && (this.UIManagerRef("Bet_button_Bet").visible = true);
        }
        else {
            this.UIManagerRef("Bet_button_Coin_Value") && (this.UIManagerRef("Bet_button_Coin_Value").visible = true);
            this.UIManagerRef("Bet_button_Bet") && (this.UIManagerRef("Bet_button_Bet").visible = false);
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode);
            return false;
        }
        if (nextProps.selectedCoin !== this.props.selectedCoin) {
            this.UIManagerRef("bet_text") && UIManager.setText("bet_text", String(nextProps.coinList[nextProps.selectedCoin] / this.divider));
        }
        if (nextProps.showMenu !== this.props.showMenu) {
            return true;
        }
        return false;
    }

    //this method will decrease the bet
    onBetDecrease() {
        // this.props.setApplicationCurrentBetIndex(this.props.selectedCoin - 1);
        this.props.setSelectedCoin(this.props.selectedCoin - 1);
    }

    //this method will increase the bet
    onBetIncrease() {
        this.props.setApplicationCurrentBetIndex(this.props.selectedCoin + 1);
        this.props.setSelectedCoin(this.props.selectedCoin + 1);
    }

    maxbet(maxBet: number, index: number) {
        this.props.setApplicationCurrentBetIndex(index);
        this.props.setSelectedCoin(index);
        this.props.getApplicationMaxBetResponse();
    }

    setButtonState(balance: number) {
        if (this.props.selectedCoin === 0) {
            this.UIManagerRef("countMinus").texture = Texture.from("minus_disable_p.png");
            this.UIManagerRef("countPlus").texture = Texture.from("plus_p.png");
        }
        else {
            this.UIManagerRef("countMinus") && (this.UIManagerRef("countMinus").texture = Texture.from("minus_p.png"));
        }

        if (this.props.selectedCoin + 1 === this.props.coinList.length || this.props.betList[this.props.selectedCoin + 1] > balance) {
            this.UIManagerRef("countPlus") && (this.UIManagerRef("countPlus").texture = Texture.from("plus_disable_p.png"));
            this.UIManagerRef("countMinus") && (this.UIManagerRef("countMinus").texture = Texture.from("minus_p.png"));
        }
        else {
            this.UIManagerRef("countPlus").texture = Texture.from("plus_p.png");
        }
    }

    buttonSound(buttonName: any) {
        this.props.setApplicationButtonClicked(true);
        this.props.setApplicationButtonClicked(false);
        this.props.buttonClickedName(buttonName);
    }

    maxButtonState() {
        this.UIManagerRef("maxbetBtn") && (this.UIManagerRef("maxbetBtn").texture = Texture.from("max.png"));
    }

    handleEvent = (e: any) => {
        let balance;
        this.props.transitionBalance === 0 ? balance = this.props.balance : balance = this.props.transitionBalance;
        switch (e.target.name) {
            case "countMinus":
                if (this.props.selectedCoin !== 0) {
                    this.props.getApplicationDecreaseBetResponse();
                    this.onBetDecrease();
                    this.buttonSound(e.target.name);
                }
                this.maxButtonState();
                break;
            case "countPlus":
                if (this.props.selectedCoin + 1 !== this.props.coinList.length && this.props.betList[this.props.selectedCoin + 1] <= balance) {
                    this.props.getApplicationIncreaseBetResponse();
                    this.onBetIncrease();
                    this.buttonSound(e.target.name);
                } else {
                    this.setButtonState(balance);
                }
                break;
            case "maxbetBtn":
                let maxBet = 0, index = 0;
                for (let i = this.props.coinList.length - 1; i >= 0; i--) {
                    if (this.props.betList[i] > balance) {
                        maxBet = this.props.betList[i - 1];
                        index = i - 1;
                    }
                }

                if ((maxBet === 0 && index === 0) || (maxBet === undefined && index === undefined)) {
                    maxBet = this.props.betList[this.props.coinList.length - 1];
                    index = this.props.coinList.length - 1;
                }

                if ((this.props.selectedCoin === index)) {
                    this.props.setApplicationSpinButtonClicked(true);
                    this.onSpin();
                    this.props.showDesktopSettingPanelUI(false);
                    this.props.setApplicationShowHelpText(false);
                    this.props.hidePaytable();
                    this.props.mobilePaytableShow(false);
                    this.props.hideAutoplay();
                    this.props.hideMenuUI();
                    this.props.setAllButtonEnable();
                    this.props.setMobMenuVisibility(false);
                    this.props.setApplicationButtonpanelVisibility(true);
                }
                else if ((maxBet > balance)) {
                    this.UIManagerRef("maxbetBtn") && (this.UIManagerRef("maxbetBtn").texture = Texture.from("max_disable.png"));
                }
                else {
                    ((maxBet === 0 && index === 0) || (maxBet === undefined && index === undefined)) ? this.props.setSelectedCoin(this.props.coinList.length - 1) : this.props.setSelectedCoin(index);
                    this.maxbet(maxBet, index);
                    this.buttonSound(e.target.name);
                }
                break;
            default:
                return 'No buttons';
        }
        this.setButtonState(balance);
    }

    componentDidUpdate() {
        this.updateUi();
        let balance;
        this.props.transitionBalance === 0 ? balance = this.props.balance : balance = this.props.transitionBalance;
        this.layoutChange(this.props.layoutMode);
        this.props.showMenu && this.setButtonState(balance);
    }

    render() {
        if (!this.props.showMenu) {
            return (<></>)
        }

        return (
            <UIManager id={"CanvasMobileBetContainer"} type={"Container"} ref={i => this.CanvasMobileBetContainer = i}
                configGame={this.props.configGame}
                app={this.app}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            id={i.id} {...i} app={this.app} configGame={this.props.configGame}
                            ClickHandler={this.handleEvent} scope={this} />
                    )
                }
            </UIManager>
        )
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'gameactionstate' | 'applicationState' | 'menuState' | 'basegameState' | 'betPanelState' | 'behaviourState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        showMenu: state.menuState.showMenu,
        currentBetIndex: state.basegameState.currentBetIndex,
        betList: state.basegameState.betList,
        selectedCoin: state.betPanelState.selectedCoin,
        coinList: state.betPanelState.coinList,
        balance: state.basegameState.balance,
        transitionBalance: state.behaviourState.transitionBalance,
        firstSpinAfterLoad: state.basegameState.firstSpinAfterLoad,
        jurisdictionKey: state.applicationState.jurisdictionKey,
        currentVoucherResult: state.gameactionstate.currentVoucherResult,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        setApplicationSpinButtonClicked: (isClicked: boolean): any => dispatch(buttonActions.setApplicationSpinButtonClicked(isClicked)),
        setSelectedCoin: (selectedCoin: number): any => dispatch(betPanelAction.setSelectedCoin(selectedCoin)),
        getApplicationIncreaseBetResponse: (): any => dispatch(gameLevelResponseActions.getApplicationIncreaseBetResponse()),
        getApplicationDecreaseBetResponse: (): any => dispatch(gameLevelResponseActions.getApplicationDecreaseBetResponse()),
        setApplicationCurrentBetIndex: (betIndex: number): any => dispatch(baseGameAction.setApplicationCurrentBetIndex(betIndex)),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        getApplicationMaxBetResponse: (): any => dispatch(gameLevelResponseActions.getApplicationMaxBetResponse()),
        spinAfterLoad: (firstSpinAfterLoad: boolean): any => dispatch(baseGameAction.spinAfterLoad(firstSpinAfterLoad)),
        getApplicationSpinResponse: (): any => dispatch(asyncActions.getApplicationSpinResponse()),
        setStopActive: (stopActive: boolean): any => dispatch(buttonActions.setStopActive(stopActive)),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        resetReelState: (): any => dispatch(Number(configGame["SPIN_TYPE"]) === 2 && reelsGridActions.resetReelState()),
        showDesktopSettingPanelUI: (showSettingPanel: boolean): any => dispatch(desktopSettingPanelActions.showDesktopSettingPanelUI(showSettingPanel)),
        setApplicationShowHelpText: (showHelpText: boolean): any => dispatch(applicationActions.setApplicationShowHelpText(showHelpText)),
        hidePaytable: (): any => dispatch(paytableActions.hidePaytable()),
        mobilePaytableShow: (showPaytableMobile: boolean): any => dispatch(paytableGofActions.mobilePaytableShow(showPaytableMobile)),
        hideAutoplay: (): any => dispatch(autoplayActions.hideAutoplayUI()),
        hideMenuUI: (): any => dispatch(menuActions.hideMenuUI()),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        setMobMenuVisibility: (showMobileMenuPanel: boolean): any => dispatch(behaviourAction.setMobMenuVisibility(showMobileMenuPanel)),
        setApplicationButtonpanelVisibility: (visible: boolean): any => dispatch(applicationActions.setApplicationButtonpanelVisibility(visible)),
        buttonClickedName: (clickedButtonName: string): any => dispatch(buttonActions.buttonClickedName(clickedButtonName)),
        setCspStart: (cspStart: boolean): any => dispatch(Number(configGame["SPIN_TYPE"]) === 0 && reelsActions.setCspStart(cspStart)),

    }))(withCanvasMobileBetConfiguration(CanvasMobileBet)));
