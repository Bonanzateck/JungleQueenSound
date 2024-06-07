import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
    withButtonPanelConfiguration, baseGameAction, buttonActions, winpresentationAction, asyncActions, desktopSettingPanelActions,
    reelsGridActions, autoplayActions, reelsActions, layoutssActions
} from "@bonanzainteractive/slote_core";
import { UIManager, toggleFullScreen } from "@bonanzainteractive/core";

import { withPixiApp } from "@inlet/react-pixi";
import { configGame } from "../../slot/data/config";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { actions as menuActions } from "../../core/reducers/menuReducer";
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
    currentBetIndex: number,
    layoutMode: string,
    selectedCoin: number,
    coinList: any,
    allSpinComplete: boolean,
    languageCode: any,
    isActiveAll: boolean,
    clickedButtonName: string,
    betBoxCount: number,
    balance: number,
    increaseBetResult: Object,
    betList: Array<number>,
    autoPlaySimpleMode: boolean,
    winAmount: number,
    transitionBalance: number,
    inAutoplay: boolean,
    enableAutoPlay: boolean,
    allButtonEnable: boolean;
    stopGameMinBlance: boolean;
    jurisdictionKey: string;
    autoplayCount: number;
    autoplayNextSpin: boolean;
    featureJustFinished: boolean;
    enableParticularButton: boolean;
    inFreeGame: boolean;
    featureJustReTriggered: boolean;
    showWinCelebration: boolean;
    winPresentationStart: boolean;
    cspStart: boolean,
    freezeGame: boolean,
}

class autoPlayButtonUI extends buttonBase {
    protected button_name_7: string;
    protected button_name_8: string;
    protected isButtonClicked: boolean = false;
    protected autoPlayButtonName: string = "";
    protected storeCurrentBet: number = 0;
    constructor(props: IProps, state: IState) {
        super(props, state);
        this.app = props.app;
        this.button_name_7 = "btn_autoplay_stop";
        this.button_name_8 = `btn_autoplay_${this.ui_mode}`;
        this.state = {
            [this.button_name_7]: { enable: this.props.inFreeGame ? true : false },
            [this.button_name_8]: { enable: true },
            updateStateObj: {}

        }
        // this.isMobile && this.autoPlayButtonMobileUI();
        this.layoutChange(this.props.layoutMode);
    }
    /**
     * AutoPlay button position update in mobile
     */
    autoPlayButtonMobileUI() {
        if (window.innerHeight < window.innerWidth) {
            this.displayUI.map((data: any) => {
                if (data.name === this.button_name_8) {
                    data.x = 1612;
                    data.y = 252;
                }
            });
        } else if (window.innerWidth < window.innerHeight) {
            this.displayUI.map((data: any) => {
                if (data.name === this.button_name_8) {
                    data.x = 404;
                    data.y = 1180;
                }

                else if (data.name === this.button_name_7) {
                    data.x = this.autoplayStopButtonX;
                    data.y = this.autoplayStopButtonY;
                    // data.visible = false;
                }
            });
        }
    }
    /**
     * {Play Game in AutoPlay}
    */
    simpleAutoplayStart() {
        this.props.setIsScreenOnOff(true);// let the screen turn on.       
        let visibleObjArr: any = { "ON": [], "OFF": [] };
        if (this.isMobile) {
            visibleObjArr['ON'].push(this.button_name_8);
            visibleObjArr['ON'].push(this.button_name_7);
        }
        this.toggleAutoButton(this.button_name_7, true, this.button_name_8, visibleObjArr);
        this.props.hideAutoplaySetAutoplay({ showAutoplay: false, AutoplayCount: Number.POSITIVE_INFINITY });
        this.props.setApplicationAutoplayCountStartAutoPlay({ autoplayCount: Number.POSITIVE_INFINITY, autoplayNextSpin: false, inAutoplay: true });
        this.playGame();//Play Command
        this.props.setAllButtonDisable();//
    }
    /***
     *  Stop AutoPlay 
    */
    onAutoplayStop() {
        // let the screen turn off.
        this.props.setAllButtonDisable();
        let visibleObjArr: any = { "ON": [], "OFF": [] };
        if (this.isMobile) {
            visibleObjArr['OFF'].push(this.button_name_7);
        }
        this.toggleAutoButton(this.button_name_8, false, this.button_name_7, visibleObjArr);
        this.props.setApplicationAutoplayCountStartAutoPlay({ autoplayCount: 0, autoplayNextSpin: false, inAutoplay: false });// stop autoPlay
    }
    /**
     * mobile method
     */
    showAutoPlay() {
        if (this.isMobile) {
            if (!this.props.enableAutoPlay || (this.props.enableAutoPlay && (this.props.jurisdictionKey === "es" || this.props.jurisdictionKey === "nl"))) {
                // this.props.showMenuUI();

                //for mobile
                this.onAutoplayShow();
            } else if (this.props.enableAutoPlay) {
                this.onAutoplayShow();
            }
            this.props.setMobMenuVisibility(true);
        } else {
            this.onAutoplayShow();
        }
    }
    //this method will show autoplay
    onAutoplayShow() {
        this.props.showAutoplay();
        this.props.setAllButtonDisable();
    }
    //this method will be called when a button gets clicked
    handleEvent = (e: any) => {
        e.stopPropagation();
        let condition = true;

        if (condition) {
            this.props.setApplicationButtonClicked(true);
            this.props.setApplicationButtonClicked(false);
            this.props.buttonClickedName(e.target.name);
        }

        switch (e.target.name) {
            case this.button_name_7:
                this.onAutoplayStop();
                return;
            case this.button_name_8:
                if (this.props.autoPlaySimpleMode) {
                    if (this.isMobile) {
                        this.props.showMenuUI();
                        this.props.setMobMenuVisibility(true);
                    }
                    else {
                        this.simpleAutoplayStart();
                    }
                }
                else {
                    if (this.isMobile) {
                        if (this.props.autoPlaySimpleMode || (this.props.jurisdictionKey === "es" || this.props.jurisdictionKey === "nl")) {
                            this.props.showMenuUI();
                            this.props.setMobMenuVisibility(true);
                        }
                        else {
                            this.showAutoPlay();
                        }
                    } else {
                        this.showAutoPlay();
                        // this.simpleAutoplayStart();
                    }
                }
                this.isMobile && this.props.showDesktopSettingPanelUI(true);
                return;
            case "btn_fullscreen":
                this.fullScreen();
                return;
            default:
                return 'No buttons';
        }
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        if (this.props.layoutMode) {
            this.layoutChange(this.props.layoutMode);
            this.updatePixel();
        }
    }

    fullScreen() {
        toggleFullScreen();
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        return this.checkUpdateState(nextProps) ? true : false;
    }

    checkUpdateState(nextProps: any) {
        // Freeze Game
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode);
            return true;
        }
        if (nextProps.cspStart && nextProps.cspStart !== this.props.cspStart) {
            this.toggleAutoButton(this.button_name_8, false, this.button_name_7, {"ON": [], "OFF": []});
        }   

        let freezeRes: any = this.freezeGameFun(nextProps);
        if (freezeRes) {
            if (freezeRes === true) {
                if (nextProps.autoplayCount > 0) {
                    let visibleObjArr: any = { "ON": [], "OFF": [] };
                    if (this.isMobile) {
                        visibleObjArr['ON'].push(this.button_name_8);
                        visibleObjArr['ON'].push(this.button_name_7);
                    }
                    this.toggleAutoButton(this.button_name_7, true, this.button_name_8, visibleObjArr);
                }
            }
            return false;
        }
        
        else if (!nextProps.inAutoplay && !nextProps.cspStart && nextProps.allButtonEnable && ((nextProps.isActiveAll && nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable) || (nextProps.clickedButtonName !== this.props.clickedButtonName && nextProps.clickedButtonName === "postIntro_continueButton_desktop"))) {
            this.toggleAutoButton(this.button_name_8, true, this.button_name_7, { "ON": [], "OFF": [] });
        }
        else if (!nextProps.inAutoplay && nextProps.allButtonEnable && !nextProps.cspStart) {
            this.toggleAutoButton(this.button_name_8, true, this.button_name_7, { "ON": [], "OFF": [] });
        }
     
        return false;
    }

    /**
     * AutoPlay Enable and Disable
     */

    // this.toggleAutoButton(this.button_name_7, true, this.button_name_8, visibleObjArr);
    toggleAutoButton(btnActive: string, isEnable: boolean, btnDeactive: string, textVisibilityObj: any) {
        isEnable = !this.props.enableAutoPlay ? isEnable : false;
        this.setState((prevState) => {
            return {
                ...prevState,
                [btnActive]: { enable: isEnable },
                [btnDeactive]: { enable: false }
            }
        });

        this.displayUI.map((data: any) => {
            if (data.name === btnActive || textVisibilityObj && textVisibilityObj.ON.includes(data.name)) {
                data.visible = true
            }
            else if (data.name === btnDeactive || textVisibilityObj && textVisibilityObj.OFF.includes(data.name)) {
                data.visible = true;
            }
        });
        this.forceUpdate();
    }
    updatePixel() {
        if (this.isMobile) {
            if (window.innerWidth < window.innerHeight) {
                // this.UIManagerRef("btn_autoplay_stop").visible = true;
                this.UIManagerRef("btn_autoplay_stop").x = this.autoplayStopButtonX;
                this.UIManagerRef("btn_autoplay_stop").y = this.autoplayStopButtonY;
            }
        }
    }
    render() {
        const { langObj, enableAutoPlay } = this.props;
        return (<UIManager
            id={"GenericUIComponentautoPlayButtonUI"}
            type={"Container"}
            ref={i => this.buttonPanelGenericUIContainer = i}
            app={this.app}
            configGame={configGame}>
            {
                this.displayUI.map((data: any) => {
                    if (data.name === `btn_autoplay_${this.ui_mode}` && this.props.inAutoplay) {
                        data.visible = false;
                    }
                    if (data.name === "btn_autoplay_stop" && !this.props.inAutoplay) {
                        data.visible = false;
                    }


                    if (this.isMobile) {
                        if (data.name === `btn_autoplay_${this.ui_mode}`) {
                            if (window.innerHeight > window.innerWidth) {
                                data.x = 685;
                                data.y = 1648;
                            } else {
                                data.x = 1705;
                                data.y = 240;
                            }
                        }

                        if (data.name === "btn_autoplay_stop") {
                            if (window.innerHeight > window.innerWidth) {
                                data.x = 685;
                                data.y = 1648;
                            } else {
                                data.x = 1705;
                                data.y = 240;
                            }
                        }
                    }
                    return (
                        <UIManager
                            key={`UIManager-${Math.random()}`}
                            type={data.type}
                            app={this.app}
                            ClickHandler={this.handleEvent}
                            langObj={langObj}
                            visible={false}
                            disabled={this.props.inFreeGame ? true : !enableAutoPlay ? ((data.name === this.autoPlayButtonName) ? true : this.state[data.name] && !this.state[data.name].enable) : this.state[data.name] && !this.state[data.name].enable}
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
        currentBetIndex: state.basegameState.currentBetIndex,
        layoutMode: state.applicationState.layoutMode,
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
        allButtonEnable: state.buttonPanelState.allButtonEnable,
        stopGameMinBlance: state.buttonPanelState.stopGameMinBlance,
        betList: state.basegameState.betList,
        autoPlaySimpleMode: state.applicationState.autoPlaySimpleMode,
        winAmount: state.basegameState.winAmount,
        transitionBalance: state.behaviourState.transitionBalance,
        inAutoplay: state.basegameState.inAutoplay,
        enableAutoPlay: state.applicationState.enableAutoPlay,
        //es
        autoplayCount: state.basegameState.autoplayCount,
        autoplayNextSpin: state.basegameState.autoplayNextSpin,
        featureJustFinished: state.freegameState.featureJustFinished,
        enableParticularButton: state.buttonPanelState.enableParticularButton,
        inFreeGame: state.freegameState.inFreeGame,
        featureJustReTriggered: state.freegameState.featureJustReTriggered,
        showWinCelebration: state.winCelebrationState.showWinCelebration,
        winPresentationStart: state.winpresentationState.winPresentationStart,
        cspStart: state.reelgridState.cspStart,
        freezeGame: state.buttonPanelState.freezeGame,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        buttonClickedName: (clickedButtonName: string): any => dispatch(buttonActions.buttonClickedName(clickedButtonName)),
        setApplicationSpinButtonClicked: (isClicked: boolean): any => dispatch(buttonActions.setApplicationSpinButtonClicked(isClicked)),
        // Play Action
        resetReelState: (): any => dispatch((Number(configGame["SPIN_TYPE"]) === 0 && reelsActions.resetReelState())),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        getApplicationSpinResponse: (): any => dispatch(asyncActions.getApplicationSpinResponse()),
        setCspStart: (cspStart: boolean): any => dispatch(reelsGridActions.setCspStart(cspStart)),
        // For AutoPlay request
        setIsScreenOnOff: (screenOnOff: boolean): any => dispatch(buttonActions.setIsScreenOnOff(screenOnOff)),
        hideAutoplaySetAutoplay: (hideAutoplayAutoplayCount: object): any => dispatch(autoplayActions.setHideAutoplaySetAutoplayCount(hideAutoplayAutoplayCount)),
        setApplicationAutoplayCountStartAutoPlay: (autoplayCountaAutoplayNextSpinInAutoplay: object): any => dispatch(baseGameAction.setApplicationAutoplayCountStartAutoPlay(autoplayCountaAutoplayNextSpinInAutoplay)),
        //
        showMenuUI: (): any => dispatch(menuActions.showMenuUI()),
        setMobMenuVisibility: (showMobileMenuPanel: boolean): any => dispatch(behaviourAction.setMobMenuVisibility(showMobileMenuPanel)),
        //
        showDesktopSettingPanelUI: (showSettingPanel: boolean): any => dispatch(desktopSettingPanelActions.showDesktopSettingPanelUI(showSettingPanel)),
        showAutoplay: (): any => dispatch(autoplayActions.showAutoplayUI()),
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),

    }))(withButtonPanelConfiguration(autoPlayButtonUI)));

