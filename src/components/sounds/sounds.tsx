import React, { Component } from "react";
import { withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { soundActions } from "@bonanzainteractive/slote_core";
import PIXI from "pixi.js";
import { actions as behaviourAction } from '../../gamereducer/behaviourReducer';
import { actions as soundGameLevelAction } from "../../gamereducer/soundGameLevelReducer";
import { actions as winShowerActions } from "../../gamereducer/winShowerReducer";
import { GSAPTimer } from "@bonanzainteractive/core"
import { constant } from "../../slot/data/config";
import { playSoundLoop, stopSoundLoop } from "../../core/sounds/SoundControler";

interface IStore {
    [x: string]: any;
}
interface IProps {
    [x: string]: any;
}

interface IStateToProps {
    soundIsPlaying: boolean;
    blastStart: boolean;
    basegamestate: boolean;
    spinStart: boolean;
    startWinShower: boolean;
    allSpinComplete: boolean;
    playLandingAnimation: boolean;
    landingAnimPositions: any;
    featureJustTriggered: boolean;
    playSymbolAnimation: boolean;
    playAnticipation: boolean;
    startWinCelebration: boolean;
    featureTriggered: boolean;
    spinButtonClicked: boolean;
    buttonClickedSound: boolean;
    multiplierCurrentValue: number;
    reTriggerBlastCount: number;
    introContinueButtonClick: boolean;
    stopWinShowerSound: boolean;
    sound: any;
    isDirectWinAdded: boolean;
    gamePause: boolean;
    inFreeGame: boolean;
    diamondIsMoving: boolean;
    allSoundBGMStop: boolean;
    countStopReels: boolean;
    reel_data: any;
    updatedSymbol: any;
    cspStart: boolean;
    betList: any,
    currentBetIndex: any,
    allSoundSFXStop: boolean,


}

interface IDispatchToProps {
}

interface IState {

}

class GAMESounds extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected playingSound: any = [];
    protected spinSound: any = '';
    protected playScatterLandingCount: number;
    protected valueToBeUpdatedBy: number = 0.05;
    protected timer: number = 50;
    private AllTimer: any[] = [];
    protected soundChecker: boolean = true;
    protected baseGameSoundChecker: boolean = true;
    constructor(props: IProps) {
        super(props);
        this.AllTimer = [];
        this.app = props.app;
        this.playScatterLandingCount = 0;

    }
    componentDidMount() {
        playSoundLoop("baseGameLoop", "jq_mx_basegame", true, 0.6);
    }

    onButtonClickSound() {
        this.props.playSound([{ name: "jq_sx_generic_button", loop: false, vol: 0.6 }]);
    }

    backgroundSound() {
        if (this.props.basegamestate) {
            this.muteBackgroundLoopSound(this.props);
        }
    }

    // This function will set scatter sound
    reelScatter() {
        let reel_data = this.props.reel_data;
        for (let i: number = 0; i < reel_data.stopReels.length; i++) {
            for (let j = 0; j < reel_data.stopReels[i].length - 1; j++) {
                if (reel_data.stopReels[i][j] === 12) {
                    if (!this.props.allSoundSFXStop) {
                        playSoundLoop("jq_sx_scatter_landing", "jq_sx_scatter_landing", false);
                    }
                    // this.props.playSound([{ name: "jq_sx_scatter_landing", vol: 0.7, loop: false }]);
                }
            }
        }
    }


    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.soundIsPlaying !== this.props.soundIsPlaying || nextProps.spinStart !== this.props.spinStart
            || nextProps.basegamestate !== this.props.basegamestate || nextProps.blastStart !== this.props.blastStart
            || nextProps.startWinShower !== this.props.startWinShower
            || nextProps.allSpinComplete !== this.props.allSpinComplete
            || nextProps.playLandingAnimation !== this.props.playLandingAnimation ||
            nextProps.landingAnimPositions !== this.props.landingAnimPositions || nextProps.countStopReels !== this.props.countStopReels
            || nextProps.featureJustTriggered !== this.props.featureJustTriggered
            || nextProps.playSymbolAnimation !== this.props.playSymbolAnimation
            || nextProps.startWinCelebration !== this.props.startWinCelebration
            || nextProps.featureTriggered !== this.props.featureTriggered
            || nextProps.spinButtonClicked !== this.props.spinButtonClicked
            || nextProps.buttonClickedSound !== this.props.buttonClickedSound
            || nextProps.multiplierCurrentValue !== this.props.multiplierCurrentValue
            || nextProps.reTriggerBlastCount !== this.props.reTriggerBlastCount
            || nextProps.introContinueButtonClick !== this.props.introContinueButtonClick
            || nextProps.stopWinShowerSound !== this.props.stopWinShowerSound
            || nextProps.isDirectWinAdded !== this.props.isDirectWinAdded
            || nextProps.gamePause !== this.props.gamePause
            || nextProps.inFreeGame !== this.props.inFreeGame
            || nextProps.diamondIsMoving !== this.props.diamondIsMoving
            || nextProps.allSoundBGMStop !== this.props.allSoundBGMStop
            || nextProps.trophyOnReel !== this.props.trophyOnReel
            || nextProps.cspStart !== this.props.cspStart
        ) {

            if (nextProps.soundIsPlaying && !nextProps.gamePause) {

                // if (!this.props.basegamestate && this.soundChecker) {
                //     stopSoundLoop("baseGameLoop");
                //     playSoundLoop("freeGameLoop", "jq_mx_freegame_music_loop", true, 0.6);
                //     this.soundChecker = false;
                //     console.log("free game m aaya");
                // } else if (this.props.basegamestate && this.baseGameSoundChecker) {
                //     stopSoundLoop("freeGameLoop");
                //     playSoundLoop("baseGameLoop", "jq_mx_basegame", true, 0.6);
                //     this.baseGameSoundChecker = false;
                //     console.log("base game m aaya");
                // }

                // for spin button sound
                if (nextProps.spinButtonClicked && nextProps.spinButtonClicked !== this.props.spinButtonClicked) {
                    // this.props.playSound([{ name: "jq_sx_spin_button", loop: false, vol: 0.7 }]);
                    if (!this.props.allSoundSFXStop) {
                        playSoundLoop("jq_sx_spin_button", "jq_sx_spin_button", false, 0.7);
                    }
                }

                // All game general button sound will play from this condition.
                if (nextProps.buttonClickedSound && nextProps.buttonClickedSound !== this.props.buttonClickedSound) {
                    this.onButtonClickSound();
                }

                if (nextProps.multiplierCurrentValue !== this.props.multiplierCurrentValue) {
                    // this.props.playSound([{ name: "multiplierSound", loop: false, vol: 0.7 }]);
                    if (!this.props.allSoundSFXStop) {
                        playSoundLoop("multiplierSound", "multiplierSound", false, 0.7);
                    }
                }

                if (nextProps.reTriggerBlastCount >= 0 && nextProps.reTriggerBlastCount !== this.props.reTriggerBlastCount) {
                    // this.props.stopSound([{ name: "reTriggerBlastSound" }]);
                    // this.props.playSound([{ name: "reTriggerBlastSound", loop: false, vol: 0.7 }]);
                }

                // if (nextProps.featureTriggered && nextProps.featureTriggered !== this.props.featureTriggered) {

                // }

                // for playing big win sound
                if (nextProps.startWinCelebration && nextProps.startWinCelebration !== this.props.startWinCelebration) {
                    this.playBackgroundLoop(nextProps);
                }

                // for playing background Music after big wins
                if (!nextProps.startWinCelebration && nextProps.startWinCelebration !== this.props.startWinCelebration) {
                    this.playNativeBackgroundSound(nextProps);
                }

                if (nextProps.featureJustTriggered && nextProps.featureJustTriggered !== this.props.featureJustTriggered) {
                    // this.props.stopSound([{ name: "jq_mx_basegame" }]);
                    // this.props.playSound([{ name: "jq_mx_freegame_music_loop", vol: 0.1, loop: true }]);
                }

                //for turning background music on/off through setting panel
                if (!nextProps.allSoundBGMStop && nextProps.allSoundBGMStop !== this.props.allSoundBGMStop) {
                    if (nextProps.basegamestate) {
                        // this.props.stopSound([{ name: "jq_mx_freegame_music_loop" }]);
                        // this.props.playSound([{ name: "jq_mx_basegame", vol: 0.5, loop: true }]);
                    } else {
                        // this.props.stopSound([{ name: "jq_mx_basegame" }]);
                        // this.props.playSound([{ name: "jq_mx_freegame_music_loop", vol: 0.7, loop: true }]);
                    }
                }

                //end
                if (nextProps.introContinueButtonClick && nextProps.introContinueButtonClick !== this.props.introContinueButtonClick) {
                    this.props.buttonClickedIntro(false);
                }

                if (nextProps.allSpinComplete && nextProps.allSpinComplete !== this.props.allSpinComplete && !nextProps.featureTriggered) {
                    this.playScatterLandingCount = 0;
                    // this.props.stopSound([{ name: this.spinSound }]);
                    if (nextProps.basegamestate) {
                        this.playBackgroundLoop(nextProps);
                    } else {
                        // this.props.playSound([{ name: "jq_mx_freegame_music_loop", vol: 0.3, loop: true }]);
                    }
                }

                //tickup sound for small wins
                if (nextProps.startWinShower && nextProps.startWinShower !== this.props.startWinShower) {
                    if (constant.configGame.CURRENT_WINAMOUNT > 0) {
                        GSAPTimer.getInstance().addTimer(0.1, () => {
                            this.props.playSound([{ name: "jq_sx_counter", loop: true, vol: 1 }]);
                            if (!this.props.allSoundSFXStop && this.props.soundIsPlaying) {
                                playSoundLoop("jq_sx_counter", "jq_sx_counter", true);
                            }
                        });
                    }
                }
                //end

                //to play background Music after small wins
                if (!nextProps.startWinShower && nextProps.startWinShower !== this.props.startWinShower) {
                    this.props.winShowerSoundStop(false);
                    this.playNativeBackgroundSound(nextProps);
                }

                if (nextProps.basegamestate !== this.props.basegamestate) {
                    if (nextProps.basegamestate) {
                        // this.props.fadeOutSound([{ name: "jq_mx_freegame_music_loop" }]);
                        GSAPTimer.getInstance().addTimer(200 / 1000, () => {
                            // this.props.playSound([{ name: "jq_mx_basegame", loop: true, vol: 0.7 }]);
                        });
                    }
                    else {
                        this.playBackgroundLoop(nextProps);
                    }
                }

                if (nextProps.soundIsPlaying && nextProps.soundIsPlaying !== this.props.soundIsPlaying) {
                    this.playBackgroundLoop(nextProps);
                }

                if (nextProps.isDirectWinAdded && nextProps.isDirectWinAdded !== this.props.isDirectWinAdded) {
                    this.playBackgroundLoop(nextProps);
                }

            }

            return false;
        }
        return false;
    }

    //logic to decreace sound vol
    changeBgVolume(name: string, currentVol: number, nextVol: number) {

    }

    playNativeBackgroundSound(nextProps: any) {
        if (nextProps.basegamestate) {
            // this.props.playSound([{ name: "jq_mx_basegame", vol: 0.5, loop: true }]);
        } else {
            // this.props.playSound([{ name: "jq_mx_freegame_music_loop", vol: 0.7, loop: true }]);
        }
    }
    muteBackgroundLoopSound(nextProps: any) {
        if (nextProps.basegamestate) {
            // this.props.playSound([{ name: "jq_mx_basegame", loop: true, vol: 0.01 }]);
        } else {
            // this.props.playSound([{ name: "jq_mx_freegame_music_loop", vol: 0.01, loop: true }]);
        }
    }

    playBackgroundLoop(nextProps: any) {
        if (nextProps.basegamestate) {
            // this.props.playSound([{ name: "jq_mx_basegame", loop: true, vol: 0.7 }]);
        } else {
            // this.props.playSound([{ name: "jq_mx_freegame_music_loop", vol: 0.7, loop: true }]);
        }
    }
    render() {
        return null
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'applicationState' | 'symbolState' | 'reelsState' | 'soundGameLevelState' | 'MultiplierState' | 'soundState' | 'reelgridState' | 'winCelebrationState' | 'basegameState' | 'freegameState' | 'buttonPanelState' | 'winShowerState' | 'landingState' | 'winpresentationState' | 'behaviourState' | 'featureState'>): IStateToProps =>
    ({
        soundIsPlaying: state.soundState.soundIsPlaying,
        blastStart: state.reelgridState.blastStart,
        basegamestate: state.basegameState.basegamestate,
        spinStart: state.reelsState.spinStart,
        startWinShower: state.winShowerState.startWinShower,
        allSpinComplete: state.reelgridState.allSpinComplete,
        playLandingAnimation: state.landingState.playLandingAnimation,
        landingAnimPositions: state.landingState.landingAnimPositions,
        featureJustTriggered: state.basegameState.featureJustTriggered,
        playSymbolAnimation: state.winpresentationState.playSymbolAnimation,
        playAnticipation: state.reelgridState.playAnticipation,
        startWinCelebration: state.winCelebrationState.startWinCelebration,
        featureTriggered: state.behaviourState.featureTriggered,
        spinButtonClicked: state.buttonPanelState.spinButtonClicked,
        buttonClickedSound: state.buttonPanelState.buttonClickedSound,
        multiplierCurrentValue: state.MultiplierState.multiplierCurrentValue,
        reTriggerBlastCount: state.soundGameLevelState.reTriggerBlastCount,
        introContinueButtonClick: state.soundGameLevelState.introContinueButtonClick,
        stopWinShowerSound: state.winShowerState.stopWinShowerSound,
        sound: state.soundState.sound,
        isDirectWinAdded: state.basegameState.isDirectWinAdded,
        gamePause: state.applicationState.gamePause,
        inFreeGame: state.freegameState.inFreeGame,
        diamondIsMoving: state.soundState.diamondIsMoving,
        allSoundBGMStop: state.soundState.allSoundBGMStop,
        countStopReels: state.reelsState.countStopReels,
        reel_data: state.reelsState.reel_data,
        updatedSymbol: state.symbolState.updatedSymbol,
        cspStart: state.reelsState.cspStart,
        betList: state.basegameState.betList,
        currentBetIndex: state.basegameState.currentBetIndex,
        allSoundSFXStop: state.soundState.allSoundSFXStop,


    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        stopSound: (soundName: any): any => dispatch(soundActions.stopSound(soundName)),
        playingSound: (soundIsPlaying: any): any => dispatch(soundActions.playingSound(soundIsPlaying)),
        fadeOutSound: (soundObject: any): any => dispatch(soundActions.fadeOutSound(soundObject)),
        changeVolume: (soundObject: any): any => dispatch(soundActions.changeVolume(soundObject)),
        fgFeaturetrigger: (featureTriggered: boolean): any => dispatch(behaviourAction.FgFeaturetrigger(featureTriggered)),
        reTriggerCountBlast: (reTriggerBlastCount: any): any => dispatch(soundGameLevelAction.reTriggerCountBlast(reTriggerBlastCount)),
        buttonClickedIntro: (introContinueButtonClick: any): any => dispatch(soundGameLevelAction.buttonClickedIntro(introContinueButtonClick)),
        winShowerSoundStop: (stopWinShowerSound: boolean): any => dispatch(winShowerActions.winShowerSoundStop(stopWinShowerSound)),
    }))(GAMESounds));