import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withMobileViewSettingPanelUIConfiguration from "./configuration/withMobileViewSettingPanelUIConfiguration";
import { UIManager,GSAPTimer } from "@bonanzainteractive/core";
import { isMobile } from "react-device-detect";
import { actions as introductionActions } from "../../gamereducer/introductionPageReducer";
import { actions as desktopSettingPanelGameLevel } from "../../gamereducer/desktopSettingPanelGameLevelReducer";
import { layoutssActions, reelsGridActions, soundActions } from "@bonanzainteractive/slote_core";



interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}

interface IStateToProps {
    showSettingPanelUI: any;
    introductionScreenVisible: boolean;
    layoutMode: string;
    soundIsPlaying: boolean;
    turboToggle: boolean;
    disableQuickSpin: boolean;
    soundOnOff: boolean;
}

interface IDispatchToProps {

}

interface IState {
    [x: string]: any;
}

class MobileViewSettingPanelUI extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected mobileViewSettingPanelUIContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected ui_mobileMode: string = "";
    protected displayUI: Object[] = [];
    protected prevTextName: string = "";
    private AllTimer: any[] = [];
    private UIManagerRef: any;


    constructor(props: IProps) {
        super(props);       
        this.app = props.app;
        this.state = {
            buttonPanelEnable: true,
            allContainerList: [],
            uiElements: [],
            lang: "en",
        }
        this.mobileViewSettingPanelUIContainer = {};
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

    bindUI() {
        this.layoutChange(this.props.layoutMode);
    }
   

    componentDidMount() {
        this.bindUI();
        if (this.props.showSettingPanelUI && isMobile) {
            this.conditionCheckForToggles();
            if (!this.props.soundOnOff) {

                this.UIManagerRef("musicRadioButtonMobileDisable") && (this.UIManagerRef("musicRadioButtonMobileDisable").visible = true);
                this.UIManagerRef("musicRadioButtonMobileOn") && (this.UIManagerRef("musicRadioButtonMobileOn").visible = false);
                this.UIManagerRef("musicRadioButtonMobileOff") && (this.UIManagerRef("musicRadioButtonMobileOff").visible = false);

            } else {
                this.UIManagerRef("musicRadioButtonMobileDisable") && (this.UIManagerRef("musicRadioButtonMobileDisable").visible = false);
            }
        }
    }

    layoutChange(currentLayout: string) {
        this.displayUI.forEach((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        }
        )
        this.orientationChange();
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode);
            this.orientationChange();
            this.setLayout();
            return false;
        }
        if (nextProps.showSettingPanelUI !== this.props.showSettingPanelUI) {           
            return true;
        }
        return false;
    }
    radioController(currentToggleState: string, nextToggleState: string) {
        GSAPTimer.getInstance().addTimer(10 / 1000, () => {
            this.UIManagerRef(currentToggleState) && (this.UIManagerRef(currentToggleState).visible = false);
            this.UIManagerRef(currentToggleState) && (this.UIManagerRef(nextToggleState).visible = true);

        });

    }

    conditionCheckForToggles() {
        this.props.soundIsPlaying && this.radioController("musicRadioButtonMobileOff", "musicRadioButtonMobileOn");
        !this.props.soundIsPlaying && this.radioController("musicRadioButtonMobileOn", "musicRadioButtonMobileOff");
        this.props.introductionScreenVisible && this.radioController("showIntroScreenRadioButtonMobileOff", "showIntroScreenRadioButtonMobileOn");
        !this.props.introductionScreenVisible && this.radioController("showIntroScreenRadioButtonMobileOn", "showIntroScreenRadioButtonMobileOff");
        if (this.props.turboToggle) {
            this.props.setTurboMode(true);
            this.radioController("mobile_turboSpinRadioButtonOff", "mobile_turboSpinRadioButtonOn");
        } else if (!this.props.turboToggle) {
            this.props.setTurboMode(false);
            this.radioController("mobile_turboSpinRadioButtonOn", "mobile_turboSpinRadioButtonOff");
        }
    }

    radioButtonClicked(currentButtonName: string, nextButtonName: string) {
        this.UIManagerRef(currentButtonName).visible = false;
        this.UIManagerRef(nextButtonName).visible = true;
    }
    useQuery = () => {
        let search = window.location.search;
        return new URLSearchParams(search);
    }

    handleEvent = (e: any) => {
        switch (e.target.name) {
            case "showIntroScreenRadioButtonMobileOn":
                this.props.visibleIntroductionScreen(false);
                this.radioController("showIntroScreenRadioButtonMobileOn", "showIntroScreenRadioButtonMobileOff");
                this.radioButtonClicked("showIntroScreenRadioButtonMobileOn", "showIntroScreenRadioButtonMobileOff");
                return;
            case "showIntroScreenRadioButtonMobileOff":
                this.props.visibleIntroductionScreen(true);
                this.radioController("showIntroScreenRadioButtonMobileOff", "showIntroScreenRadioButtonMobileOn");
                this.radioButtonClicked("showIntroScreenRadioButtonMobileOff", "showIntroScreenRadioButtonMobileOn");
                return;
            case "musicRadioButtonMobileOn":
                if (this.props.soundOnOff) {
                    this.props.stopAllBGMSound(true);
                    this.props.stopAllSFXSound(true);
                    this.props.playingSound(false);
                    this.radioController("musicRadioButtonMobileOn", "musicRadioButtonMobileOff");
                    this.radioButtonClicked("musicRadioButtonMobileOn", "musicRadioButtonMobileOff");
                }
                return;
            case "musicRadioButtonMobileOff":
                if (this.props.soundOnOff) {
                    this.props.stopAllBGMSound(false);
                    this.props.stopAllSFXSound(false);
                    this.props.playingSound(true);
                    this.radioController("musicRadioButtonMobileOff", "musicRadioButtonMobileOn");
                    this.radioButtonClicked("musicRadioButtonMobileOff", "musicRadioButtonMobileOn");
                }
                return;
            case "mobile_turboSpinRadioButtonOn":
                if (!this.props.disableQuickSpin) {
                    this.props.setTurboMode(false);
                    this.props.turboToggleButton(false);
                    this.radioController("mobile_turboSpinRadioButtonOn", "mobile_turboSpinRadioButtonOff");
                    this.radioButtonClicked("mobile_turboSpinRadioButtonOn", "mobile_turboSpinRadioButtonOff");
                    localStorage.setItem("playerId-TurboMode-" + this.useQuery().get("token"), "false");
                }
                return;
            case "mobile_turboSpinRadioButtonOff":
                if (!this.props.disableQuickSpin) {
                    this.props.setTurboMode(true);
                    this.props.turboToggleButton(true);
                    this.radioController("mobile_turboSpinRadioButtonOff", "mobile_turboSpinRadioButtonOn");
                    this.radioButtonClicked("mobile_turboSpinRadioButtonOff", "mobile_turboSpinRadioButtonOn");
                    localStorage.setItem("playerId-TurboMode-" + this.useQuery().get("token"), "true");
                }
                return;
            default:
                return 'No buttons';
        }
    }
    orientationChange() {
        if (isMobile && window.innerWidth < window.innerHeight) {
            this.UIManagerRef("turboSpinRadioButtonMobDisable") && (this.UIManagerRef("turboSpinRadioButtonMobDisable").x = 534);
            this.UIManagerRef("turboSpinRadioButtonMobDisable") && (this.UIManagerRef("turboSpinRadioButtonMobDisable").y = 1060);

            this.UIManagerRef("musicRadioButtonMobileDisable") && (this.UIManagerRef("musicRadioButtonMobileDisable").x = 535);
            this.UIManagerRef("musicRadioButtonMobileDisable") && (this.UIManagerRef("musicRadioButtonMobileDisable").y = 917);
        } else {
            this.UIManagerRef("turboSpinRadioButtonMobDisable") && (this.UIManagerRef("turboSpinRadioButtonMobDisable").x = 530);
            this.UIManagerRef("turboSpinRadioButtonMobDisable") && (this.UIManagerRef("turboSpinRadioButtonMobDisable").y = 758);

            this.UIManagerRef("musicRadioButtonMobileDisable") && (this.UIManagerRef("musicRadioButtonMobileDisable").x = 536);
            this.UIManagerRef("musicRadioButtonMobileDisable") && (this.UIManagerRef("musicRadioButtonMobileDisable").y = 633);
        }
    }


    componentDidUpdate() {
        this.setLayout();
        this.orientationChange();
        this.props.disableQuickSpin ? this.UIManagerRef("turboSpinRadioButtonMobDisable").visible = true : this.UIManagerRef("turboSpinRadioButtonMobDisable").visible = false;
        !this.props.soundOnOff ? this.UIManagerRef("musicRadioButtonMobileDisable").visible = true : this.UIManagerRef("musicRadioButtonMobileDisable").visible = false;
    }

    setLayout() {
        this.layoutChange(this.props.layoutMode);
        if (this.props.showSettingPanelUI && isMobile) {
            GSAPTimer.getInstance().addTimer(10 / 1000, () => {
                this.conditionCheckForToggles();
            });
        }
    }
    render() {
        if (!isMobile) {
            return (
                <></>
            )
        }
        if (!this.props.showSettingPanelUI) {
            return (<></>)
        }
        return (
            <UIManager id={"mobileViewSettingPanelUIContainer"} type={"Container"}
                ref={i => this.mobileViewSettingPanelUIContainer = i}
                configGame={this.props.configGame}
                app={this.app}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            id={i.id} {...i} app={this.app} configGame={this.props.configGame}
                            ClickHandler={this.handleEvent} scope={this} />
                    )
                }
            </UIManager>)
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, "desktopSettingPanelGameLevel" | 'soundState' | 'applicationState' | 'desktopSettingPanelState' | 'introductionState'>): IStateToProps =>
    ({
        showSettingPanelUI: state.desktopSettingPanelState.showSettingPanel,
        introductionScreenVisible: state.introductionState.introductionScreenVisible,
        layoutMode: state.applicationState.layoutMode,
        soundIsPlaying: state.soundState.soundIsPlaying,
        turboToggle: state.desktopSettingPanelGameLevel.turboToggle,
        disableQuickSpin: state.applicationState.disableQuickSpin,
        soundOnOff: state.applicationState.soundOnOff,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        visibleIntroductionScreen: (value: boolean): any => dispatch(introductionActions.visibleIntroductionScreen(value)),
        stopAllBGMSound: (stopBgSound: any): any => dispatch(soundActions.stopAllBGMSound(stopBgSound)),
        stopAllSFXSound: (stopAllSfxSound: boolean): any => dispatch(soundActions.stopAllSFXSound(stopAllSfxSound)),
        playingSound: (soundIsPlaying: any): any => dispatch(soundActions.playingSound(soundIsPlaying)),
        setTurboMode: (IsTurboMode: any): any => dispatch(reelsGridActions.setTurboMode(IsTurboMode)),
        turboToggleButton: (turboToggle: any): any => dispatch(desktopSettingPanelGameLevel.turboToggleButton(turboToggle)),
    }))(withMobileViewSettingPanelUIConfiguration(MobileViewSettingPanelUI)));