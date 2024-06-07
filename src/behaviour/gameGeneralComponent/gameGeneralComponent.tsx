import React, { Component } from "react";
import * as PIXI from "pixi.js";
import { UIManager } from "@bonanzainteractive/core";
import { withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withGameGeneralComponentConfiguration from "./configuration/withgameGeneralComponentConfiguration";
import { isMobile } from "react-device-detect";
import { configGame } from "../../slot/data/config";
import { gridActions, keyboardListenerActions, applicationActions, buttonActions, desktopSettingPanelActions, layoutssActions, reelsActions, reelsGridActions, soundActions } from "@bonanzainteractive/slote_core";
import { actions as desktopSettingPanelGameLevel } from "../../gamereducer/desktopSettingPanelGameLevelReducer";
import { actions as introductionActions } from "../../gamereducer/introductionPageReducer";

interface IStore {
    [x: string]: any;
}
interface IProps {
    [x: string]: any;
}
interface IState { }
interface IStateToProps { }
interface IDispatchToProps { }

class GameGeneralComponent extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected displayUI: any;
    protected gameGeneralComponent: any;
    protected gameGeneralComponentContainer: any;
    protected scope: any;
    protected ui_mode: string;
    protected gameGeneralComponentList: Array<any>
    protected containerX: number = 551;
    protected dragging = false;
    protected originalPosition: any;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.gameGeneralComponent = React.createRef();
        this.gameGeneralComponentContainer = React.createRef();
        this.state = {
            uiElements: [],
            lang: "en",
        }

        if (isMobile) {
            this.ui_mode = "mobile"
        } else {
            this.ui_mode = "desktop"
        }
        //reel,row
        this.gameGeneralComponentList = []
        this.displayUI = this.props.data.COMPONENTS[0].child.filter(this.checkUiMode.bind(this));
        let heightGap = 150;

        if (this.props.jurisdictionKey == "uk" || this.props.jurisdictionKey == "es"
            || this.props.jurisdictionKey == "de"
            || this.props.jurisdictionKey == "gr"
            || this.props.jurisdictionKey == "se"
            || this.props.jurisdictionKey == "on"
            || this.props.jurisdictionKey == "dk") {
            this.displayUI && this.displayUI[1].child.splice(4, 1);
        }
        if (this.props.jurisdictionKey == "co") {
            this.displayUI && this.displayUI[1].child.splice(3, 1);
        }
        this.displayUI && this.displayUI[1].child.map((i: any, index: any) => {
            i.y = heightGap * index
        })
    }

    checkUiMode(uimodeobj: any) {
        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both"
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    radioController(currentToggleState: any, nextToggleState: any) {
        UIManager.getRef(currentToggleState) && (UIManager.getRef(currentToggleState).visible = false);
        UIManager.getRef(currentToggleState) && (UIManager.getRef(nextToggleState).visible = true);
    }

    handleEvent = (e: any) => {
        switch (e.target.name) {
            case "crossButton":
                this.props.showDesktopSettingPanelUI(false);
                this.props.setAllButtonEnable();
                return;
            case "introScreenRadioButtonOn":
                this.props.visibleIntroductionScreen(false);
                this.radioController("introScreenRadioButtonOn", "introScreenRadioButtonOff");
                return;
            case "introScreenRadioButtonOff":
                this.props.visibleIntroductionScreen(true);
                this.radioController("introScreenRadioButtonOff", "introScreenRadioButtonOn");
                return;
            case "musicRadioButtonOn":
                // this.props.stopAllSFXSound(true);
                this.props.playingSound(false);
                this.radioController("musicRadioButtonOn", "musicRadioButtonOff");
                return;
            case "musicRadioButtonOff":
                // this.props.soundLoadStartFunction(true);
                // this.props.stopAllSFXSound(false)
                this.props.playingSound(true);
                this.radioController("musicRadioButtonOff", "musicRadioButtonOn");
                return;
            case "bgMusic_enable":
                // this.props.playBgSound(false);
                // this.props.stopAllBGMSound(true);
                // this.props.playingSound(false);
                this.radioController("bgMusic_enable", "bgMusic_disable");
                return;
            case "bgMusic_disable":
                // this.props.soundLoadStartFunction(true);
                // this.props.stopAllBGMSound(false);
                // this.props.playBgSound(true);
                // this.props.playingSound(true);
                this.radioController("bgMusic_disable", "bgMusic_enable");
                return
            case "displayCoin_enable":
                this.radioController("displayCoin_enable", "displayCoin_disable");
                this.props.setDisplayInCoins(false);
                return;
            case "displayCoin_disable":
                if (!this.props.disableCoins) {
                    this.radioController("displayCoin_disable", "displayCoin_enable");
                    this.props.setDisplayInCoins(true);
                }
                else {
                    UIManager.getRef("displayCoin_disable").interactive = false;
                }
                return;
            case "spaceBarToSpinRadioButtonOn":
                this.props.spaceBarSpin(false);
                this.radioController("spaceBarToSpinRadioButtonOn", "spaceBarToSpinRadioButtonOff");
                return;
            case "spaceBarToSpinRadioButtonOff":
                this.props.spaceBarSpin(true);
                this.radioController("spaceBarToSpinRadioButtonOff", "spaceBarToSpinRadioButtonOn");
                return;
            case "turboSpinRadioButtonOn":
                this.props.setReelTurboMode(false);
                this.handleReelSpinType(false);
                this.props.turboToggleButton(false);
                this.radioController("turboSpinRadioButtonOn", "turboSpinRadioButtonOff");
                return;
            case "turboSpinRadioButtonOff":
                this.props.setReelTurboMode(true);
                this.handleReelSpinType(true);
                this.props.turboToggleButton(true);
                this.radioController("turboSpinRadioButtonOff", "turboSpinRadioButtonOn");
                return;
            default:
                return 'No buttons';
        }
    }
    handleSoundRadioButtons(isSoundPlaying?: any) {
        UIManager.getRef("musicRadioButtonOn") && (UIManager.getRef("musicRadioButtonOn").visible = !isSoundPlaying);
        UIManager.getRef("musicRadioButtonOff") && (UIManager.getRef("musicRadioButtonOff").visible = isSoundPlaying);
    }
    handleBgMusicRadioButtons(isSoundPlaying?: any) {
        if (!isSoundPlaying) {
            this.radioController("bgMusic_disable", "bgMusic_enable");
        } else {
            this.radioController("bgMusic_enable", "bgMusic_disable");
        }
    }

    componentDidMount() {
        if (isMobile && window.innerWidth > window.innerHeight) {
            UIManager.getRef("pressSbacebarContainer") && (UIManager.getRef("pressSbacebarContainer").visible = false);
        }
        else if (!isMobile) {
            UIManager.getRef("pressSbacebarContainer") && (UIManager.getRef("pressSbacebarContainer").visible = true);
            if (this.props.spacebarDisabled) {
                UIManager.getRef("spaceBarToSpinRadioButtonOn").visible = false;
                UIManager.getRef("spaceBarToSpinRadioButtonOff").interactive = false;
            }
        }

        if (!isMobile || (isMobile && window.innerWidth > window.innerHeight)) {
            if (this.props.disableCoins) {
                UIManager.getRef("displayCoin_enable") && (UIManager.getRef("displayCoin_enable").visible = false);
                UIManager.getRef("displayCoin_disable") && (UIManager.getRef("displayCoin_disable").interactive = false);
            }
        }

        if (this.props.displayInCoins) {
            this.radioController("displayCoin_disable", "displayCoin_enable");
        } else {
            this.radioController("displayCoin_enable", "displayCoin_disable");
        }

        if (this.props.jurisdictionKey == "uk" || this.props.jurisdictionKey == "es"
            || this.props.jurisdictionKey == "de"
            || this.props.jurisdictionKey == "gr"
            || this.props.jurisdictionKey == "se") {
            this.handleReelSpinType(false);
            UIManager.getRef("turboSpinRadioButtonOff") && (UIManager.getRef("turboSpinRadioButtonOff").visible = true);
            UIManager.getRef("turboSpinRadioButtonOff") && (UIManager.getRef("turboSpinRadioButtonOff").interactive = false);
        }

        if (this.props.handMode === "left") {
            UIManager.getRef("switchControl_enable") && (UIManager.getRef("switchControl_enable").visible = true);
            UIManager.getRef("switchControl_disable") && (UIManager.getRef("switchControl_disable").visible = false);
        }
        if (this.props.handMode === "right") {
            UIManager.getRef("switchControl_enable") && (UIManager.getRef("switchControl_enable").visible = false);
            UIManager.getRef("switchControl_disable") && (UIManager.getRef("switchControl_disable").visible = true);
        }

        this.handleIntroScreenButtonState(this.props.introductionScreenVisible);
        if (this.props.turboToggle) {
            if (this.props.jurisdictionKey == "uk" || this.props.jurisdictionKey == "es"
                || this.props.jurisdictionKey == "de"
                || this.props.jurisdictionKey == "gr"
                || this.props.jurisdictionKey == "se") {
                this.handleReelSpinType(false);
            }
            else {
                this.handleReelSpinType(true);
            }
        }
        if (this.props.soundIsPlaying) {
            this.radioController("musicRadioButtonOff", "musicRadioButtonOn");
        }
        if (this.props.spinWithSpaceBar) {
            this.radioController("spaceBarToSpinRadioButtonOff", "spaceBarToSpinRadioButtonOn");
        }
    }

    handleReelSpinType(value: any) {
        if (Number(configGame["SPIN_TYPE"]) === 0) {
            const {
                setReelTurboMode
            } = this.props;
            setReelTurboMode(value);
        } else if (Number(configGame["SPIN_TYPE"]) === 2) {
            const {
                setReelGridTurboMode
            } = this.props;
            setReelGridTurboMode(value);
        } else {
            const {
                setGridTurboMode
            } = this.props;
            setGridTurboMode(value);
        }
    }

    componentDidUpdate() {
        if (this.props.handMode === "left") {
            UIManager.getRef("switchControl_enable") && (UIManager.getRef("switchControl_enable").visible = false);
            UIManager.getRef("switchControl_disable") && (UIManager.getRef("switchControl_disable").visible = true);
        }
        if (this.props.handMode === "right") {
            UIManager.getRef("switchControl_enable") && (UIManager.getRef("switchControl_enable").visible = true);
            UIManager.getRef("switchControl_disable") && (UIManager.getRef("switchControl_disable").visible = false);
        }

        if (this.props.turboToggle) {
            UIManager.getRef("turboSpinRadioButtonOn") && (UIManager.getRef("turboSpinRadioButtonOn").visible = true);
            UIManager.getRef("turboSpinRadioButtonOff") && (UIManager.getRef("turboSpinRadioButtonOff").visible = false);
        }
        else {
            UIManager.getRef("turboSpinRadioButtonOff") && (UIManager.getRef("turboSpinRadioButtonOff").visible = true);
            UIManager.getRef("turboSpinRadioButtonOn") && (UIManager.getRef("turboSpinRadioButtonOn").visible = false);
        }
    }

    handleIntroScreenButtonState(value?: any) {
        UIManager.getRef("introScreenRadioButtonOn") && (UIManager.getRef("introScreenRadioButtonOn").visible = value);
        UIManager.getRef("introScreenRadioButtonOff") && (UIManager.getRef("introScreenRadioButtonOff").visible = !value);
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (
            nextProps.allSoundSFXStop !== this.props.allSoundSFXStop
            || nextProps.allSoundBGMStop !== this.props.allSoundBGMStop
            || nextProps.displayInCoins !== this.props.displayInCoins
            || nextProps.handMode !== this.props.handMode
            || nextProps.introductionScreenVisible !== this.props.introductionScreenVisible
            || nextProps.turboToggle !== this.props.turboToggle
            || nextProps.showGameSettings !== this.props.showGameSettings
            || nextProps.showSettingPanelForMobile !== this.props.showSettingPanelForMobile
        ) {

            if (nextProps.showGameSettings || nextProps.showSettingPanelForMobile) {
                if (nextProps.turboToggle) {
                    UIManager.getRef("turboSpinRadioButtonOn") && (UIManager.getRef("turboSpinRadioButtonOn").visible = true);
                    UIManager.getRef("turboSpinRadioButtonOff") && (UIManager.getRef("turboSpinRadioButtonOff").visible = false);
                }
                else {
                    UIManager.getRef("turboSpinRadioButtonOff") && (UIManager.getRef("turboSpinRadioButtonOff").visible = true);
                    UIManager.getRef("turboSpinRadioButtonOn") && (UIManager.getRef("turboSpinRadioButtonOn").visible = false);
                }
            }

            if (nextProps.allSoundSFXStop !== this.props.allSoundSFXStop) {
                this.handleSoundRadioButtons(nextProps.allSoundSFXStop);
                if (nextProps.allSoundBGMStop) {
                    nextProps.playingSound(false);
                }
            }
            if (nextProps.allSoundBGMStop !== this.props.allSoundBGMStop) {

                this.handleBgMusicRadioButtons(nextProps.allSoundBGMStop);
                if (nextProps.allSoundSFXStop) {
                    nextProps.playingSound(false);
                }
            }
            if (nextProps.introductionScreenVisible !== this.props.introductionScreenVisible) {
                this.handleIntroScreenButtonState(nextProps.introductionScreenVisible);
                return true;
            }
            return false;
        }
        return false;
    }

    render() {
        return (<UIManager id={"gameGeneralComponent"} name={"gameGeneralComponent"} type={"Container"}
            ref={i => this.gameGeneralComponent = i}
            x={this.containerX} y={0}>
            {
                this.displayUI && this.displayUI.map((i: any) =>
                    <UIManager key={`UIManager-${Math.random()}`} ClickHandler={this.handleEvent} langObj={this.props.langObj} type={i.type}
                        id={i.id} {...i} app={this.app} />)
            }
        </UIManager>)
    }
}


export default withPixiApp(connect(
    (state: Pick<IStore, 'keyboardListenerState' | 'mainSettingPanelState' | 'desktopSettingPanelGameLevel' | 'gameLevelSoundState' | 'introductionState' | 'applicationState' | 'behaviourState' | 'wrapperState' | 'soundState'>): IStateToProps =>
    ({
        spacebarDisabled: state.wrapperState.spacebarDisabled,
        jurisdictionKey: state.applicationState.jurisdictionKey,
        disableCoins: state.wrapperState.disableCoins,
        allSoundSFXStop: state.soundState.allSoundSFXStop,
        allSoundBGMStop: state.soundState.allSoundBGMStop,
        displayInCoins: state.behaviourState.displayInCoins,
        handMode: state.applicationState.handMode,
        introductionScreenVisible: state.introductionState.introductionScreenVisible,
        turboToggle: state.desktopSettingPanelGameLevel.turboToggle,
        showGameSettings: state.behaviourState.showGameSettings,
        spinWithSpaceBar: state.keyboardListenerState.spinWithSpaceBar,
        soundIsPlaying: state.soundState.soundIsPlaying,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationHandMode: (handmode: string): any => dispatch(applicationActions.setApplicationHandMode(handmode)),
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        showDesktopSettingPanelUI: (showSettingPanel: boolean): any => dispatch(desktopSettingPanelActions.showDesktopSettingPanelUI(showSettingPanel)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        spaceBarSpin: (spinWithSpaceBar: boolean): any => dispatch(keyboardListenerActions.spaceBarSpin(spinWithSpaceBar)),
        turboToggleButton: (turboToggle: any): any => dispatch(desktopSettingPanelGameLevel.turboToggleButton(turboToggle)),
        fullScreenToggleButton: (fullScreenToggle: any): any => dispatch(desktopSettingPanelGameLevel.fullScreenToggleButton(fullScreenToggle)),
        playingSound: (soundIsPlaying: any): any => dispatch(soundActions.playingSound(soundIsPlaying)),
        stopAllBGMSound: (stopBgSound: any): any => dispatch(soundActions.stopAllBGMSound(stopBgSound)),
        stopAllSFXSound: (stopSfxSound: any): any => dispatch(soundActions.stopAllSFXSound(stopSfxSound)),
        visibleIntroductionScreen: (value: boolean): any => dispatch(introductionActions.visibleIntroductionScreen(value)),
        soundLoadStartFunction: (soundLoadStart: boolean): any => dispatch(soundActions.soundLoadStartFunction(soundLoadStart)),
        resetReelState: (): any => dispatch(Number(configGame["SPIN_TYPE"]) === 0 && reelsActions.resetReelState() || Number(configGame["SPIN_TYPE"]) === 1 && gridActions.resetReelState() || Number(configGame["SPIN_TYPE"]) === 2 && reelsGridActions.resetReelState()),
    }))(withGameGeneralComponentConfiguration(GameGeneralComponent)));