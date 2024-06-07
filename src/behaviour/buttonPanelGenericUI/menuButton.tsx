import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { paytableActions, withButtonPanelConfiguration, buttonActions, applicationActions, keyboardListenerActions, layoutssActions } from "@bonanzainteractive/slote_core";
import { UIManager, GSAPTween, GSAPTimer, ItweenProps } from "@bonanzainteractive/core";
import { soundActions } from "@bonanzainteractive/slote_core";
import { withPixiApp } from "@inlet/react-pixi";
import { configGame } from "../../slot/data/config";
import { isMobile } from "react-device-detect";
import { actions as asyncServerAction } from "../../core/reducers/asyncServerResponseReducer";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
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
    showWinCelebration: boolean,
    isMenuOpen: boolean,
    exceptBtnList: Array<string>;
    inFreeGame: boolean,
    menuBtnClicked: boolean;
    layoutMode: string;
}

class menuButton extends buttonBase {
    protected button_name_6: string;
    protected button_name_19: string;
    protected button_name_20: string;
    protected button_name_21: string;
    protected button_name_22: string;

    protected menuBtnClicked: boolean;
    constructor(props: IProps, state: IState) {
        super(props, state);
        this.button_name_6 = "btn_gameRule";
        this.button_name_19 = "btn_menu";
        this.button_name_20 = "btn_menu_close";
        this.button_name_21 = "btn_game_exit";
        this.button_name_22 = "btn_history";

        this.state = {
            [this.button_name_6]: { enable: true },
            [this.button_name_19]: { enable: true },
            [this.button_name_20]: { enable: true },
            [this.button_name_21]: { enable: false },
            [this.button_name_22]: { enable: true },
            setbutton: false,
        }
        this.menuBtnClicked = false;
        this.layoutChange(this.props.layoutMode);
    }

    //this method will be called when a button gets clicked
    handleEvent = (e: any) => {
        this.showHighLightedButton(e.target.name)
        this.onClickSound();
        switch (e.target.name) {
            case this.button_name_6:
                this.openHelpFile();
                this.rightHandButtonVisibility(false);
                return;
            case this.button_name_19:
                this.props.setMenuButtonClicked(true, true);
                this.setVisibilityOfButtonAccordingToBackend(this.button_name_20, true);
                this.toggleSettingButton(true);
                this.openMenuPanel(true);
                return;
            case this.button_name_20:
                this.openMenuPanel(false);
                this.props.setMenuButtonClicked(true, false);
                this.setVisibilityOfButtonAccordingToBackend(this.button_name_20, false);
                this.toggleSettingButton(true);
                this.closeMenuPanel();
                this.props.showSettingGameRules(false);
                this.props.setApplicationShowSettingsControl(false);
                return;
            case this.button_name_22:
                this.rightHandButtonVisibility(false);
                this.openBetHistory();
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

    rightHandButtonVisibility(visible: boolean) {
        this.UIManagerRef("btn_spin").visible = visible;
        this.UIManagerRef("btn_autoplay").visible = visible;
    }

    // This funtion will hide the highlighted button visibility
    highlightedButtonsVisibility(value: boolean) {
        UIManager.getRef("btn_game_highlighted").visible = value;
        UIManager.getRef("btn_setting_highlighted").visible = value;
        UIManager.getRef("btn_history_highlighted").visible = value;
    }

    betButtonVisibility(visible: boolean) {
        this.UIManagerRef("btn_minbet").visible = visible;
        this.UIManagerRef("btn_bet_decrease").visible = visible;
        this.UIManagerRef("btn_bet_increase").visible = visible;
        this.UIManagerRef("btn_maxbet").visible = visible;
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        return this.checkUpdateState(nextProps) ? true : false;
    }

    checkUpdateState(nextProps: any) {
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode);
            return true;
        }
        if (nextProps.cspStart) {
            this.toggleSettingButton(false);
            return false;
        }
        if (nextProps.showWinCelebration !== this.props.showWinCelebration) {
            nextProps.showWinCelebration && this.toggleSettingButton(false);
        }

        if (nextProps.inAutoplay && nextProps.inAutoplay === this.props.inAutoplay) {
            this.state[this.button_name_6] && this.state[this.button_name_6].enable && this.toggleSettingButton(false);
            return false;
        }
        // Freeze Game
        let freezeRes: any = this.freezeGameFun(nextProps);
        if (freezeRes) {
            freezeRes === true && this.toggleSettingButton(false);
            (freezeRes === "ACTIVE_BUTTON" || freezeRes === "ACTIVE_BUTTON_ON_POPUP") && this.toggleSettingButton(true);
            return false;
        }
        else if (nextProps.inAutoplay && nextProps.inAutoplay !== this.props.inAutoplay) {
            this.toggleSettingButton(false);
        }
        else if (!nextProps.inAutoplay && !nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable) {
            this.toggleSettingButton(false);
        }
        else if (!nextProps.inAutoplay && ((nextProps.isActiveAll && nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable) || (nextProps.clickedButtonName !== this.props.clickedButtonName && nextProps.clickedButtonName === "postIntro_continueButton_desktop"))) {
            this.toggleSettingButton(true);
        }
        else if (!nextProps.inAutoplay && nextProps.allButtonEnable && ((nextProps.isActiveAll !== this.props.isActiveAll && nextProps.isActiveAll && nextProps.allSpinComplete) || (nextProps.showHelpText !== this.props.showHelpText) || (nextProps.paytableBtnVisibility !== this.props.paytableBtnVisibility) || (nextProps.clickedButtonName !== this.props.clickedButtonName && nextProps.clickedButtonName === "postIntro_continueButton_desktop"))) {
            this.toggleSettingButton(true);
        }
        else if (!nextProps.inAutoplay && nextProps.allButtonEnable && !nextProps.cspStart) {
            this.toggleSettingButton(true);
        }
        if (nextProps.menuBtnClicked !== this.props.menuBtnClicked) {
            if (nextProps.menuBtnClicked) {
                this.openMenuFromWrapper();
            } else {
                this.closeMenuFromWrapper();
            }
            return false;
        }
        return false;
    }

    openBetHistory() {
        this.props.getApplicationHistoryResponse();
        this.props.showBetHistory(true);
    }

    openHelpFile() {
        this.props.showSettingGameRules(true);
    }


    helptextDisplayFunctionality() {
        if (!this.props.showHelpText) {
            this.props.setApplicationShowHelpText(true);
            this.props.setAllButtonDisable();
        }
    }

    openMenuFromWrapper() {
        UIManager.getRef("btn_menu").visible = false;
        this.openMenuPanel(true);
    }

    closeMenuFromWrapper() {
        this.closeMenuPanel();
        this.toggleSettingButton(true);
    }

    openMenuPanel(visible: any) {
        // For black screen
        const popup_black: any = UIManager.getRef("popup_black");
        popup_black && (popup_black.visible = true);

        // For btn_menu visibility 
        const menu_btn: any = UIManager.getRef("btn_menu");
        menu_btn && (menu_btn.visible = false);

        const rightInfoContainer: any = UIManager.getRef("rightInfoContainer");
        rightInfoContainer && (rightInfoContainer.visible = false);


        const btn_menu_close: any = UIManager.getRef("btn_menu_close");
        btn_menu_close && (btn_menu_close.visible = true);

        const GenericUIContainer: any = UIManager.getRef("GenericUIContainer");
        isMobile ? GenericUIContainer && (GenericUIContainer.visible = false) : null


        this.menuBtnClicked = visible;
        GSAPTimer.getInstance().addTimer(500, () => {
            this.menuBtnClicked = false;
        });
    }

    closeMenuPanel() {
        let popup_black: any = UIManager.getRef("popup_black");
        popup_black && (popup_black.visible = false);

        const rightInfoContainer: any = UIManager.getRef("rightInfoContainer");
        rightInfoContainer && (rightInfoContainer.visible = true);


        const GenericUIContainer: any = UIManager.getRef("GenericUIContainer");
        isMobile ? GenericUIContainer && (GenericUIContainer.visible = true) : null
    }

    addTweenToButtons(btn: any, ypos: number, duration: number) {
        if (btn) {
            const tweenProps: ItweenProps = {
                y: ypos,
                duration: duration,
                ease: 'power2',
                // delay: 0.1,
                onComplete: () => {
                    this.UIManagerRef(btn) && (this.UIManagerRef(btn).visible = true);
                    GSAPTween.getInstance().killTween(this.UIManagerRef(btn));
                    btn && (btn.y = ypos);
                }
            }
            GSAPTween.getInstance().gsapTween(this.UIManagerRef(btn), tweenProps);
        }
    }

    handleHistoryBtnClick() {
        UIManager.getRef("gameSettingsMainContainer") && (UIManager.getRef("gameSettingsMainContainer").visible = false);
        UIManager.getRef("btn_history").visible = false;
        UIManager.getRef("btn_history_highlighted").visible = true;
        UIManager.getRef("btn_setting").visible = true;
        UIManager.getRef("btn_gameRule").visible = true;
        UIManager.getRef("historyContainer").visible = true;
        UIManager.getRef("gameRuleContainer") && (UIManager.getRef("gameRuleContainer").visible = false);
        this.props.showSettingGameRules(false);
        this.props.setShowGameSettings(false);
    }

    handleGameRuleBtnClick() {
        UIManager.getRef("gameSettingsMainContainer") && (UIManager.getRef("gameSettingsMainContainer").visible = false);
        UIManager.getRef("btn_gameRule").visible = false;
        UIManager.getRef("btn_game_highlighted").visible = true;
        UIManager.getRef("btn_history").visible = true;
        UIManager.getRef("btn_setting").visible = true;
        UIManager.getRef("historyContainer") && (UIManager.getRef("historyContainer").visible = false);
        UIManager.getRef("gameRuleContainer").visible = true;
        this.props.showBetHistory(false);
        this.props.setShowGameSettings(false);
    }


    // This funtion will work for highlighting the menu buttons---------------------------
    showHighLightedButton(btnName: any) {
        switch (btnName) {
            case "btn_history":
                // this.handleHistoryBtnClick();
                break;
            case "btn_gameRule":
                // this.handleGameRuleBtnClick();
                break;
            default:
                break;
        }
    }

    showOtherControls() {
        UIManager.getRef("btn_spin") && (UIManager.getRef("btn_spin").visible = true);
        UIManager.getRef("btn_autoplay") && (UIManager.getRef("btn_autoplay").visible = true);
        UIManager.getRef("btn_stake") && (UIManager.getRef("btn_stake").visible = true);
    }

    /**
     * Enable and disable Increase Button UI
     */
    toggleSettingButton(isEnable: boolean) {
        const handleMenuBtn = this.props.isMenuOpen ? false : isEnable;
        if (!this.props.inFreeGame) {
            this.props.isMenuOpen ? this.props.setWinCelebrationForKeyboardListener(true) : this.props.setWinCelebrationForKeyboardListener(false);
        }

        this.setState((prevState) => {
            return {
                ...prevState,
                [this.button_name_6]: { enable: isEnable },
                [this.button_name_19]: { enable: isEnable },
                // [this.button_name_20]: { enable: isEnable },
                [this.button_name_22]: { enable: isEnable }
            }
        });
        this.forceUpdate();
    }

    render() {
        const { langObj, enableAutoPlay } = this.props;

        return (
            <UIManager id={"GenericUIComponentmenuButtonUI"}
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
    (state: Pick<IStore, 'keyboardListenerState' | 'freegameState' | 'applicationState' | 'winCelebrationState' | 'buttonPanelState' | 'reelgridState' | 'basegameState' | 'betPanelState' | 'behaviourState'>): IStateToProps =>
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
        isMenuOpen: state.behaviourState.isMenuOpen,
        exceptBtnList: state.buttonPanelState.exceptBtnList,
        inFreeGame: state.freegameState.inFreeGame,
        menuBtnClicked: state.behaviourState.menuBtnClicked,
        layoutMode: state.applicationState.layoutMode,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        showPaytable: (): any => dispatch(paytableActions.showPaytable()),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        setApplicationShowHelpText: (showHelpText: boolean): any => dispatch(applicationActions.setApplicationShowHelpText(showHelpText)),
        setMenuButtonClicked: (menuBtnClicked: any, isMenuOpen: boolean): any => dispatch(behaviourAction.setMenuButtonClicked(menuBtnClicked, isMenuOpen)),
        showSettingGameRules: (showGameRules: any): any => dispatch(behaviourAction.showSettingGameRules(showGameRules)),
        showBetHistory: (showHistory: any): any => dispatch(behaviourAction.showBetHistory(showHistory)),
        setShowGameSettings: (showGameSettings: any): any => dispatch(behaviourAction.setShowGameSettings(showGameSettings)),
        getApplicationHistoryResponse: (): any => dispatch(asyncServerAction.getApplicationHistoryResponse()),
        setWinCelebrationForKeyboardListener: (winCelebrationForKeyBoardListener: boolean): any => dispatch(keyboardListenerActions.setWinCelebrationForKeyboardListener(winCelebrationForKeyBoardListener)),
        setApplicationShowSettingsControl: (showSettingsControl: boolean): any => dispatch(applicationActions.setApplicationShowSettingsControl(showSettingsControl)),
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
    }))(withButtonPanelConfiguration(menuButton)));    