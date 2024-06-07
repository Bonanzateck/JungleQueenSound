import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { buttonActions, layoutssActions, soundActions, withButtonPanelConfiguration } from "@bonanzainteractive/slote_core";
import { GSAPTimer, UIManager } from "@bonanzainteractive/core";
import { withPixiApp } from "@inlet/react-pixi";
import { configGame } from "../../slot/data/config";
import buttonBase from "./buttonBase";
import { playSoundLoop, stopSoundLoop } from "../../core/sounds/SoundControler";
import { actions as keyBoardAction } from "../../gamereducer/autoplayKeyboardListenerReducer";

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
    allSpinComplete: boolean;
    languageCode: any;
    inAutoplay: boolean;
    isActiveAll: boolean;
    soundIsPlaying: boolean,
    soundOnOff: boolean,
    allButtonEnable: boolean,
    freezeGame: boolean,
    selectedCoin: number,
    coinList: any,
    balance: number,
    currentBetIndex: number,
    stopGameMinBlance: boolean,
    cspStart: boolean,
    layoutMode: string;
    enableAutoPlay: boolean,
    showWinCelebration: boolean,
}
class soundButtonUI extends buttonBase {
    protected button_name_5: string;
    protected button_name_13: string;
    protected button_name_16: string;
    constructor(props: IProps, state: IState) {
        super(props, state);
        this.button_name_5 = "btn_sound";
        this.button_name_13 = "btn_soundOff";
        this.button_name_16 = "btn_sounddisable";
        this.state = {
            [this.button_name_5]: { enable: this.props.soundIsPlaying },
            [this.button_name_13]: { enable: !this.props.soundIsPlaying },
            [this.button_name_16]: { enable: false },
        }
        this.layoutChange(this.props.layoutMode);
    }

    //Sound Handle
    soundToggleButtonFunctionality() {
        if (this.props.soundIsPlaying && this.props.soundOnOff) {
            this.props.playingSound(false);
            this.props.soundButtonAction({ soundLoadStart: true, soundIsPlaying: false, allSoundBGMStop: true, allSoundSFXStop: true });
        } else if (this.props.soundIsPlaying && !this.props.soundOnOff) {
            this.props.playingSound(false);
            stopSoundLoop("baseGameLoop");
            this.props.setSliderValue(Number(0));
            this.props.soundButtonAction({ soundLoadStart: false, soundIsPlaying: false, allSoundBGMStop: true, allSoundSFXStop: true });
        } else {
            this.props.playingSound(true);
            playSoundLoop("baseGameLoop", "jq_mx_basegame", true, 0.6);
            this.props.setSliderValue(Number(0.7));
            this.props.soundButtonAction({ soundIsPlaying: true, allSoundBGMStop: false, allSoundSFXStop: false });
        }
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        if (this.props.layoutMode) {
            this.layoutChange(this.props.layoutMode);
            if (this.isMobile) {
                GSAPTimer.getInstance().addTimer(0.1, async () => {
                    this.UIManagerRef(this.button_name_5).visible = this.state[this.button_name_5].enable;
                    this.UIManagerRef(this.button_name_13).visible = !this.state[this.button_name_5].enable;
                });
            }
        }
    }



    componentDidMount(): void {
        GSAPTimer.getInstance().addTimer(0.1, async () => {
            this.UIManagerRef(this.button_name_5).visible = this.props.soundIsPlaying;
            !this.isMobile && (this.UIManagerRef(this.button_name_16).visible = false);
        });
    }
    //this method will be called when a button gets clicked
    handleEvent = (e: any) => {
        if (this.props.showWinCelebration) {
            return true;
        }
        e.stopPropagation();
        this.onClickSound();
        switch (e.target.name) {
            case this.button_name_5:
            case this.button_name_13:
                this.soundToggleButtonFunctionality();
                return;
            default:
                return 'No buttons';
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        return this.checkUpdateState(nextProps) ? true : false;
    }
    checkUpdateState(nextProps: any) {
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode);
            return true;
        }
        if (nextProps.showWinCelebration && nextProps.showWinCelebration !== this.props.showWinCelebration) {
            this.toggleSoundButton(this.button_name_5, nextProps.soundIsPlaying, true);
            return false;
        }
        // Freeze Game
        let freezeRes: any = this.freezeGameFun(nextProps);
        if (freezeRes) {
            freezeRes === true && this.toggleSoundButton(this.button_name_5, nextProps.soundIsPlaying, true);
            (freezeRes === "ACTIVE_BUTTON" || freezeRes === "ACTIVE_BUTTON_ON_POPUP") && this.toggleSoundButton(this.button_name_5, nextProps.soundIsPlaying, false);
            return false;
        }
        else if (nextProps.inAutoplay && nextProps.inAutoplay !== this.props.inAutoplay) {
            this.toggleSoundButton(this.button_name_5, nextProps.soundIsPlaying, true);
            return false;
        }
        else if (!nextProps.inAutoplay && !nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable) {
            this.toggleSoundButton(this.button_name_5, nextProps.soundIsPlaying, true);
        }
        else if (!nextProps.inAutoplay && nextProps.allButtonEnable && ((nextProps.isActiveAll !== this.props.isActiveAll && nextProps.isActiveAll && nextProps.allSpinComplete) || (nextProps.soundIsPlaying !== this.props.soundIsPlaying) || (nextProps.clickedButtonName !== this.props.clickedButtonName && nextProps.clickedButtonName === "postIntro_continueButton_desktop"))) {
            this.toggleSoundButton(this.button_name_5, nextProps.soundIsPlaying, false);
        }
        else if (nextProps.soundIsPlaying !== this.props.soundIsPlaying) {
            this.toggleSoundButton(this.button_name_5, nextProps.soundIsPlaying, false);
        }
        else if (!nextProps.inAutoplay && nextProps.allButtonEnable && ((nextProps.isActiveAll && nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable) || (nextProps.clickedButtonName !== this.props.clickedButtonName && nextProps.clickedButtonName === "postIntro_continueButton_desktop"))) {
            this.toggleSoundButton(this.button_name_5, nextProps.soundIsPlaying, false);
        }
        return false;
    }
    /**
     * Enable and disable Increase Button UI
     */
    toggleSoundButton(btnActive: string, isEnable: boolean, isDisable: boolean = false) {
        this.setState((prevState) => {
            return {
                ...prevState,
                [this.button_name_5]: { enable: isEnable },
                [this.button_name_13]: { enable: !isEnable },
                [this.button_name_16]: { enable: isDisable }
            }
        });
        this.displayUI.map((data: any) => {
            if (data.name === btnActive) {
                data.visible = isEnable;
            }
            else if (data.name === this.button_name_13) {
                data.visible = !isEnable;
            }
            else if (data.name === this.button_name_16) {
                data.visible = isDisable;
            }
        });
        this.forceUpdate();
    }

    render() {
        const { langObj, enableAutoPlay, showWinCelebration } = this.props;
        // const {} = this.props
        return (
            <UIManager id={"GenericUIComponentsoundButtonUI"}
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

                                disabled={showWinCelebration ? true : !enableAutoPlay ? ((data.name == this.autoPlayButtonName) ? true : this.state[data.name] && !this.state[data.name].enable) : this.state[data.name] && !this.state[data.name].enable}
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
    (state: Pick<IStore, 'reelgridState' | 'betPanelState' | 'winCelebrationState' | 'buttonPanelState' | 'soundState' | 'basegameState' | 'applicationState' | 'desktopSettingPanelState' | 'behaviourState'>): IStateToProps =>
    ({
        allSpinComplete: state.reelgridState.allSpinComplete,
        languageCode: state.applicationState.languageCode,
        inAutoplay: state.basegameState.inAutoplay,
        isActiveAll: state.basegameState.isActiveAll,
        soundIsPlaying: state.soundState.soundIsPlaying,
        soundOnOff: state.applicationState.soundOnOff,
        allButtonEnable: state.buttonPanelState.allButtonEnable,
        freezeGame: state.buttonPanelState.freezeGame,
        selectedCoin: state.betPanelState.selectedCoin,
        coinList: state.betPanelState.coinList,
        balance: state.basegameState.balance,
        currentBetIndex: state.basegameState.currentBetIndex,
        stopGameMinBlance: state.buttonPanelState.stopGameMinBlance,
        cspStart: state.reelgridState.cspStart,
        enableAutoPlay: state.applicationState.enableAutoPlay,
        layoutMode: state.applicationState.layoutMode,
        showWinCelebration: state.winCelebrationState.showWinCelebration,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        soundButtonAction: (updateStateObj: string): any => dispatch(soundActions.soundButtonUpdateState(updateStateObj)),
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        playingSound: (soundIsPlaying: any): any => dispatch(soundActions.playingSound(soundIsPlaying)),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        setSliderValue: (storeSliderValue: number): any => dispatch(keyBoardAction.setSliderValue(storeSliderValue)),

    }))(withButtonPanelConfiguration(soundButtonUI)));    
