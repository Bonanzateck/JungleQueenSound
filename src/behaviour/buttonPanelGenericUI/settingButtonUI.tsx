import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { withButtonPanelConfiguration, buttonActions, desktopSettingPanelActions, applicationActions } from "@bonanzainteractive/slote_core";
import { UIManager } from "@bonanzainteractive/core";

import { withPixiApp } from "@inlet/react-pixi";
import { configGame } from "../../slot/data/config";
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
    showSettingPanelUI: boolean,
    allButtonEnable: boolean,
    allSpinComplete: boolean,
    showSettingsControl: boolean,
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

}
class settingButtonUI extends buttonBase {
    protected button_name_11: string;
    private gameSettings: any;
    private gameControl: any;
    private gameSettings_yellow: any;
    private gameSettingMain: any;
    private gameSettings_white: any;
    protected dragging = false;
    protected originalPosition: any;



    constructor(props: IProps, state: IState) {
        super(props, state);
        this.button_name_11 = "btn_setting";
        this.state = {
            [this.button_name_11]: { enable: true },
        }
     
    }

    //this method will be called when a button gets clicked
    handleEvent = (e: any) => {
        e.stopPropagation();
        this.onClickSound();
        switch (e.target.name) {
            /*  case this.button_name_11:
                 !this.props.showSettingPanelUI && this.props.showDesktopSettingPanelUI(true);
                 this.props.showSettingPanelUI && this.props.setAllButtonDisable();
                 return; */
            case this.button_name_11:
                this.props.setApplicationShowSettingsControl(true);
                this.handleSettingBtnClick();
                this.handleVolumeClick(e);
                this.handleVolumeSlider(e);
                break;
            default:
                return 'No buttons';
        }
    }
    handleVolumeSlider(e: any) {
        const volume_slider_circle: any = UIManager.getRef("volume_slider_circle");
         volume_slider_circle.on('pointerdown', this.onDragStart.bind(this))
         
     }
     onDragStart(e: any) {
        const volume_slider_circle: any = UIManager.getRef("volume_slider_circle");
         volume_slider_circle.on('pointermove', this.onDragMove.bind(this))
        this.dragging = true;
       // this.originalPosition = e.data.global.x;
    }

    onDragEnd(e: any) {
        const volume_slider_circle: any = UIManager.getRef("volume_slider_circle");
        volume_slider_circle.off('pointermove', this.onDragMove)
        volume_slider_circle.off('pointerup', this.onDragEnd)
        volume_slider_circle.off('pointerupoutside', this.onDragEnd)
        this.dragging = false;
    }

    onDragMove(e: any) {
        const volume_slider_circle: any = UIManager.getRef("volume_slider_circle");
        volume_slider_circle.on('pointerup', this.onDragEnd.bind(this))
        volume_slider_circle.on('pointerupoutside', this.onDragEnd.bind(this))
       
        const volume_slider_active: any = UIManager.getRef("volume_slider_active");

        if (this.dragging) {
            if ( this.originalPosition > 1360 || e.data.global.x <= 1085) {
                volume_slider_circle.off('pointermove', this.onDragMove)
                this.dragging = false
            } else {
                const newPosition = e.data.global.x;
                const delta = newPosition - this.originalPosition;
                if(newPosition > 1360){
                    volume_slider_circle.x = 1359;
                    this.originalPosition = 1359;
                }else {
                    volume_slider_circle.x = newPosition;
                    this.originalPosition = newPosition;
                }
                
                volume_slider_active && (volume_slider_active.width = this.originalPosition - 1085);
            }
           
       
        }
    }

    handleVolumeClick(e: any) {
        let oldX = 1090;
        let newX = e.data.global.x - oldX;

        const volume_slider_base: any = UIManager.getRef("volume_slider_base");
        const volume_slider_circle: any = UIManager.getRef("volume_slider_circle");
        const volume_slider_active: any = UIManager.getRef("volume_slider_active");

        // For increase volume on click 
        volume_slider_base.on('pointerdown', () => {
            if (volume_slider_circle.x >= 1085) {
                if (e.data.global.x > volume_slider_circle.x) {
                    volume_slider_circle.x = e.data.global.x;
                    volume_slider_active && (volume_slider_active.width = (e.data.global.x - 1100));
                    if (volume_slider_circle.x > 1360) {
                        volume_slider_circle.x = 1360;
                    }
                }
            }
        });

        // For decrease volume on click 
        volume_slider_active.on('pointerdown', () => {
            if (e.data.global.x < volume_slider_circle.x) {
                volume_slider_circle.x = e.data.global.x;
                volume_slider_active.width = volume_slider_circle.x - 1090;
                if (volume_slider_circle.x < 1090) {
                    volume_slider_circle.x = 1090;
                }
            }
        });
    }


    handleSettingBtnClick() {
        UIManager.getRef("gameSettingsMainContainer") && (UIManager.getRef("gameSettingsMainContainer").visible = true);
        UIManager.getRef("btn_setting").visible = false;
        UIManager.getRef("btn_setting_highlighted").visible = true;
        UIManager.getRef("btn_game_highlighted") && (UIManager.getRef("btn_game_highlighted").visible = false);
        UIManager.getRef("btn_gameRule") && (UIManager.getRef("btn_gameRule").visible = true);
        UIManager.getRef("btn_history_highlighted") && (UIManager.getRef("btn_history_highlighted").visible = false);
        UIManager.getRef("btn_history") && (UIManager.getRef("btn_history").visible = true);
        UIManager.getRef("historyContainer") && (UIManager.getRef("historyContainer").visible = false);
        UIManager.getRef("gameRuleContainer") && (UIManager.getRef("gameRuleContainer").visible = false);

        this.props.showSettingGameRules(false);
        this.props.setShowGameSettings(false);
        this.openGameSettigsPanel();
        this.rightHandButtonVisibility(false);
        this.visibilityOfHighlightedButtons();
        this.visibilityOfButtons();
    }

    showSettingUI() {

    }

    openGameSettigsPanel() {
        this.props.setShowGameSettings(true);
    }

    // This function will control visibility of Menu panel buttons(History and Game-rule butttons)
    visibilityOfButtons() {
        UIManager.getRef("btn_gameRule").visible = true;
        UIManager.getRef("btn_history").visible = true;
    }

    // This function will control visibility of Menu panel highlighted buttons and Bet-History panel
    visibilityOfHighlightedButtons() {
        UIManager.getRef("btn_game_highlighted").visible = false;
        UIManager.getRef("btn_history_highlighted").visible = false;
        this.props.showBetHistory(false);
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        return this.checkUpdateState(nextProps) ? true : false;
    }
    checkUpdateState(nextProps: any) {
        if (nextProps.showWinCelebration !== this.props.showWinCelebration) {
            nextProps.showWinCelebration && this.btnIsEnable(false);
        }
        if (nextProps.inAutoplay && nextProps.inAutoplay === this.props.inAutoplay) {
            this.state[this.button_name_11].enable && this.btnIsEnable(false);
            return false;
        }
        // Freeze Game
        let freezeRes: any = this.freezeGameFun(nextProps);
        if (freezeRes) {
            freezeRes === true && this.btnIsEnable(false);
            (freezeRes === "ACTIVE_BUTTON" || freezeRes === "ACTIVE_BUTTON_ON_POPUP") && this.btnIsEnable(true);
            return false;
        }
        else if (nextProps.inAutoplay && nextProps.inAutoplay !== this.props.inAutoplay ) {
            this.toggleSettingButton(false);
        }
        else if (!nextProps.inAutoplay && !nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable ) {
            this.btnIsEnable(false);
        }
        else if (!nextProps.inAutoplay && nextProps.allButtonEnable && ((nextProps.isActiveAll && nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable) || (nextProps.clickedButtonName !== this.props.clickedButtonName && nextProps.clickedButtonName === "postIntro_continueButton_desktop")) ) {
            this.toggleSettingButton(true);
        }
        else if (nextProps.isMenuOpen !== this.props.isMenuOpen) {
            this.displayUI.map((data: any) => {
                data.visible = nextProps.isMenuOpen;
            });
            return true;
        }

        return false;
    }

    rightHandButtonVisibility(visible: boolean) {
        UIManager.getRef("btn_spin").visible = visible;
        UIManager.getRef("btn_autoplay").visible = visible;
        // UIManager.getRef("btn_stake").visible = visible;
        UIManager.getRef("btn_setting").visible = visible;

    }
    /**
     * Enable and disable Increase Button UI
     */
    toggleSettingButton(isEnable: boolean) {
        this.btnIsEnable(isEnable);
        if (!this.isMobile) {
            this.displayUI.map((data: any) => {
                if (this.props.showSettingsControl) {
                    data.visible = true;
                }
                else {
                    data.visible = false;
                }
            });
        }

    }
    btnIsEnable(isEnable: boolean) {
        this.setState((prevState) => {
            return {
                ...prevState,
                [this.button_name_11]: { enable: isEnable }
            }
        });
        this.forceUpdate();
    }
    render() {
        const { langObj, enableAutoPlay } = this.props;
        return (
            <UIManager id={"GenericUIComponentsettingButtonUI"}
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
                                disabled={false}
                                visibile={data.visible}
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
    (state: Pick<IStore, 'buttonPanelState' | 'desktopSettingPanelState' | 'winCelebrationState' | 'reelgridState' | 'applicationState' | 'basegameState' | 'betPanelState' | 'behaviourState'>): IStateToProps =>
    ({
        allButtonEnable: state.buttonPanelState.allButtonEnable,
        showSettingPanelUI: state.desktopSettingPanelState.showSettingPanel,
        allSpinComplete: state.reelgridState.allSpinComplete,
        showSettingsControl: state.applicationState.showSettingsControl,
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
        

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        showDesktopSettingPanelUI: (showSettingPanel: boolean): any => dispatch(desktopSettingPanelActions.showDesktopSettingPanelUI(showSettingPanel)),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        setShowGameSettings: (showGameSettings: any): any => dispatch(behaviourAction.setShowGameSettings(showGameSettings)),
        showBetHistory: (showHistory: any): any => dispatch(behaviourAction.showBetHistory(showHistory)),
        showSettingGameRules: (showGameRules: any): any => dispatch(behaviourAction.showSettingGameRules(showGameRules)),
        setApplicationShowSettingsControl: (showSettingsControl: boolean): any => dispatch(applicationActions.setApplicationShowSettingsControl(showSettingsControl)),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        
    }))(withButtonPanelConfiguration(settingButtonUI)));    