import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withMobileSettingPanelConfiguration from "./configuration/withMobileSettingPanelConfiguration";
import {
    applicationActions, buttonActions, autoplayActions, layoutssActions, paytableActions,
    desktopSettingPanelActions
} from "@bonanzainteractive/slote_core";
import { actions as menuActions } from "../../core/reducers/menuReducer";
import { UIManager, GSAPTimer } from "@bonanzainteractive/core";
import { isMobile } from "react-device-detect";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { actions as paytableGofActions } from "./../../gamereducer/paytableBMReducer";
import * as PIXI from "pixi.js";
import { configGame } from "../../slot/data/config";



interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}

interface IStateToProps {
    showAutoplay: boolean;
    layoutMode: string;
    showMenu: boolean;
    enableAutoPlay: boolean;
    showMobileMenuPanel: boolean;
    showPaytable: boolean;
    showSettingPanelUI: any;
    autoPlaySimpleMode: boolean;
    autoPlayExpertMode: boolean;
    jurisdictionKey: string;
    clickedButtonName: string;
}

interface IDispatchToProps {

}

interface IState {
    [x: string]: any;
}

class MobileSettingPanel extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected mobileSettingPanelContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected ui_mobileMode: string = "";
    protected displayUI: Object[] = [];
    protected previousStateValue: any;
    protected prevTextName: string = "";
    protected panelHeight: number = 1920;
    protected panelWidth: number = 1080;
    protected timerValue: number = 50;
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
        this.mobileSettingPanelContainer = {};
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
    setLayout() {
        if (window.innerWidth > window.innerHeight) {
            this.ui_mobileMode = '_landscape';
            this.visibilitlyOfcontainer('_landscape', '_portrait');
            this.UIManagerRef("mobileButtonUi" + this.ui_mobileMode) && (this.UIManagerRef("mobileButtonUi" + this.ui_mobileMode).visible = true);
        }
        else {
            this.ui_mobileMode = '_portrait';
            this.visibilitlyOfcontainer('_portrait', '_landscape');
        }
    }

    visibilitlyOfcontainer(current: string, previous: string) {
        this.UIManagerRef("mobileButtonUi" + current) && (this.UIManagerRef("mobileButtonUi" + current).visible = true);
        this.UIManagerRef("mobileButtonUi" + previous) && (this.UIManagerRef("mobileButtonUi" + previous).visible = false);
    }
    componentDidMount() {
        this.bindUI();
        this.autoplaydisabletexture();
    }



    layoutChange(currentLayout: string) {
        this.displayUI.forEach((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        }
        )
        this.setLayout();

    }
    autoplaydisabletexture() {
        if (!this.props.enableAutoPlay || !this.props.autoPlayExpertMode) {
            this.UIManagerRef("btn_mobileAutoplayButtonDisable" + this.ui_mobileMode) && (this.UIManagerRef("btn_mobileAutoplayButtonDisable" + this.ui_mobileMode).visible = false);
            this.UIManagerRef("btn_mobileAutoplayButtonEnable" + this.ui_mobileMode) && (this.UIManagerRef("btn_mobileAutoplayButtonEnable" + this.ui_mobileMode).visible = false);

        }
    }
    orientationChange() {
        if (isMobile && window.innerWidth < window.innerHeight) {
            this.UIManagerRef("mobileSettingPanelBg").width = configGame.CANVAS_HEIGHT;
            this.UIManagerRef("mobileSettingPanelBg").height = this.panelHeight;
        } else {
            this.UIManagerRef("mobileSettingPanelBg").width = configGame.CANVAS_WIDTH;
            this.UIManagerRef("mobileSettingPanelBg").height = this.panelWidth;
        }
        this.autoplaydisabletexture();
    }


    setScreenWhileRotate() {
        // if (this.props.showAutoplay) {
        //     this.updateButtonsState("btn_mobileAutoplayButtonEnable" + this.ui_mobileMode, "btn_mobileAutoplayButtonDisable" + this.ui_mobileMode);
        //     GSAPTimer.getInstance().addTimer(this.timerValue / 1000, () => {
        //         this.showContent("autoplayHeading_mobile");
        //     });
        // }
        // else if (this.props.showMenu) {
        //     this.updateButtonsState("btn_mobileBetButtonEnable" + this.ui_mobileMode, "btn_mobileBetButtonDisable" + this.ui_mobileMode);
        //     GSAPTimer.getInstance().addTimer(this.timerValue / 1000, () => {
        //         this.showContent("betHeading_mobile");
        //     });
        // }
        // else if (this.props.showSettingPanelUI) {
        //     this.updateButtonsState("btn_mobileGameGuideEnable" + this.ui_mobileMode, "btn_mobileGameGuideDisable" + this.ui_mobileMode);
        //     GSAPTimer.getInstance().addTimer(this.timerValue / 1000, () => {
        //         this.showContent("GameGuideHeading_mobile");
        //     });
        // }
        // else if (this.props.showPaytable) {
        //     this.updateButtonsState("btn_mobilePayTableButtonEnable" + this.ui_mobileMode, "btn_mobilePayTableButtonDisable" + this.ui_mobileMode);
        //     GSAPTimer.getInstance().addTimer(this.timerValue / 1000, () => {
        //         this.showContent("payTableHeading_mobile");
        //     });
        // }
    }
    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.clickedButtonName !== this.props.clickedButtonName) {
            if (nextProps.clickedButtonName.startsWith("auto") && isMobile) {
                this.setUI(false);
            }
            return false;
        }
        if (nextProps.layoutMode !== this.props.layoutMode) {

            this.layoutChange(nextProps.layoutMode);
            nextProps.showMobileMenuPanel && this.orientationChange();
            this.setScreenWhileRotate();
            return false;
        }
        if (nextProps.showMobileMenuPanel !== this.props.showMobileMenuPanel) {
            return true;
        }

        return false;
    }

    // showContent(textName: string) {
    //     this.prevTextName !== "" && (this.UIManagerRef(this.prevTextName).visible = false);
    //     this.UIManagerRef(textName).visible = true;
    //     this.prevTextName = textName;
    // }

    handleEvent = (e: any) => {

        // switch (e.target.name) {
        //     case "btn_mobileAutoplayButtonDisable" + this.ui_mobileMode:
        //         if (this.props.enableAutoPlay && !this.props.autoPlaySimpleMode) {
        //             this.updateButtonsState("btn_mobileAutoplayButtonEnable" + this.ui_mobileMode, "btn_mobileAutoplayButtonDisable" + this.ui_mobileMode);
        //             // this.showContent("autoplayHeading_mobile");
        //             this.props.setApplicationShowHelpText(false);
        //             this.props.showAutoplayUI();
        //             this.props.showDesktopSettingPanelUI(false);
        //             this.props.hideMenuUI();
        //             this.props.mobilePaytableShow(false);
        //         }
        //         return;
        //     case "btn_mobileBetButtonDisable" + this.ui_mobileMode:
        //         this.updateButtonsState("btn_mobileBetButtonEnable" + this.ui_mobileMode, "btn_mobileBetButtonDisable" + this.ui_mobileMode);
        //         this.showContent("betHeading_mobile");
        //         this.props.setApplicationShowHelpText(false);
        //         this.props.showMenuUI();
        //         this.props.showDesktopSettingPanelUI(true);
        //         this.props.mobilePaytableShow(false);
        //         this.props.hideAutoplay();
        //         return;
        //     case "btn_mobileGameGuideDisable" + this.ui_mobileMode:
        //         this.showContent("GameGuideHeading_mobile");
        //         this.updateButtonsState("btn_mobileGameGuideEnable" + this.ui_mobileMode, "btn_mobileGameGuideDisable" + this.ui_mobileMode);
        //         this.props.showDesktopSettingPanelUI(true);
        //         this.props.setApplicationShowHelpText(true);
        //         this.props.setAllButtonEnable();
        //         this.props.mobilePaytableShow(false);
        //         this.props.hideAutoplay();
        //         this.props.hideMenuUI();
        //         return;
        //     case "btn_mobilePayTableButtonDisable" + this.ui_mobileMode:
        //         this.props.mobilePaytableShow(true);
        //         this.updateButtonsState("btn_mobilePayTableButtonEnable" + this.ui_mobileMode, "btn_mobilePayTableButtonDisable" + this.ui_mobileMode);
        //         this.showContent("payTableHeading_mobile");
        //         this.props.setApplicationShowHelpText(false);
        //         this.props.showDesktopSettingPanelUI(false);
        //         this.props.hideAutoplay();
        //         this.props.hideMenuUI();
        //         return;
        //     case "mobileCloseButton" + this.ui_mobileMode:
        //         this.props.showDesktopSettingPanelUI(false);
        //         this.props.setApplicationShowHelpText(false);
        //         this.props.hidePaytable();
        //         this.props.mobilePaytableShow(false);
        //         this.props.hideAutoplay();
        //         this.props.hideMenuUI();
        //         this.props.setAllButtonEnable();
        //         this.props.setMobMenuVisibility(false);
        //         this.props.setApplicationButtonpanelVisibility(true);
        //         return;
        //     default:
        //         return 'No buttons';
        // }

    }
    updateButtonsState(clickedButton: string, previousButton: string) {
        this.displayUI.forEach((data: any) => {
            if (isMobile) {
                if (window.innerWidth > window.innerHeight) {
                    data.name.endsWith(this.ui_mobileMode) && this.setButtonPanelVisibility(data, clickedButton, previousButton);
                }
                else {
                    data.name.endsWith(this.ui_mobileMode) && this.setButtonPanelVisibility(data, clickedButton, previousButton);
                }
                this.autoplaydisabletexture();
            }
        }
        )
    }

    setButtonPanelVisibility(data: any, clickedButton: string, previousButton: string) {
        data.child && data.child.forEach((innerData: any) => {
            let buttonName = innerData.name;
            if (buttonName.startsWith("btn_")) {
                if (buttonName.includes("Disable")) {
                    this.UIManagerRef(buttonName) && (this.UIManagerRef(buttonName).visible = true);
                }
                else {
                    this.UIManagerRef(buttonName) && (this.UIManagerRef(buttonName).visible = false);
                }
                this.UIManagerRef(clickedButton) && (this.UIManagerRef(clickedButton).visible = true);
                this.UIManagerRef(clickedButton) && (this.UIManagerRef(previousButton).visible = false);
            }
        })
    }

    setAccToCondition(condition: any, value: boolean) {
        if (condition) {
            this.props.showMenu && this.showBet(value);
        }
        else if (this.props.enableAutoPlay) {

            !this.props.autoPlaySimpleMode && this.props.showAutoplay && this.showAutoplay(value);
            this.props.showMenu && this.props.autoPlaySimpleMode && this.showBet(value);
        }
    }
    setUI(value: boolean) {
        if (this.props.clickedButtonName === "btn_autoplay2") {
            this.setAccToCondition((!this.props.enableAutoPlay), value);
        } else {
            this.setAccToCondition((!this.props.enableAutoPlay || (this.props.enableAutoPlay && (this.props.jurisdictionKey === "es" || this.props.jurisdictionKey === "nl"))), value);

        }

        this.orientationChange();
        this.props.setApplicationButtonpanelVisibility(value);
    }
    showAutoplay(value: boolean) {
        this.updateButtonsState("btn_mobileAutoplayButtonEnable" + this.ui_mobileMode, "btn_mobileAutoplayButtonDisable" + this.ui_mobileMode);
        GSAPTimer.getInstance().addTimer(this.timerValue / 1000, () => {
            // this.showContent("autoplayHeading_mobile");
        });
    }
    showBet(value: boolean) {
        this.updateButtonsState("btn_mobileBetButtonEnable" + this.ui_mobileMode, "btn_mobileBetButtonDisable" + this.ui_mobileMode);
        GSAPTimer.getInstance().addTimer(this.timerValue / 1000, () => {
            // this.showContent("betHeading_mobile");
        });
    }
    componentDidUpdate() {
        this.layoutChange(this.props.layoutMode);
        this.setUI(false);
        this.orientationChange();
       // this.props.showMobileMenuPanel && this.props.showPaytableUI();
    }
    render() {
        if (!this.props.showMobileMenuPanel) {
            return (<></>)
        }
        return (
            <UIManager id={"mobileSettingPanelContainer"} type={"Container"}
                ref={i => this.mobileSettingPanelContainer = i}
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
    (state: Pick<IStore, 'buttonPanelState' | "desktopSettingPanelState" | 'paytableState' | 'autoplayState' | 'menuState' | 'applicationState' | 'behaviourState'>): IStateToProps =>
    ({
        showAutoplay: state.autoplayState.showAutoplay,
        layoutMode: state.applicationState.layoutMode,
        showMenu: state.menuState.showMenu,
        enableAutoPlay: state.applicationState.enableAutoPlay,
        showMobileMenuPanel: state.behaviourState.showMobileMenuPanel,
        showPaytable: state.paytableState.showPaytable,
        showSettingPanelUI: state.desktopSettingPanelState.showSettingPanel,
        autoPlaySimpleMode: state.applicationState.autoPlaySimpleMode,
        autoPlayExpertMode: state.applicationState.autoPlayExpertMode,
        jurisdictionKey: state.applicationState.jurisdictionKey,
        clickedButtonName: state.buttonPanelState.clickedButtonName,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationButtonpanelVisibility: (visible: boolean): any => dispatch(applicationActions.setApplicationButtonpanelVisibility(visible)),
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        hideMenuUI: (): any => dispatch(menuActions.hideMenuUI()),
        hideAutoplay: (): any => dispatch(autoplayActions.hideAutoplayUI()),
        showPaytableUI: (): any => dispatch(paytableActions.showPaytable()),
        showAutoplayUI: (): any => dispatch(autoplayActions.showAutoplayUI()),
        showMenuUI: (): any => dispatch(menuActions.showMenuUI()),
        hidePaytable: (): any => dispatch(paytableActions.hidePaytable()),
        showDesktopSettingPanelUI: (showSettingPanel: boolean): any => dispatch(desktopSettingPanelActions.showDesktopSettingPanelUI(showSettingPanel)),
        setMobMenuVisibility: (showMobileMenuPanel: boolean): any => dispatch(behaviourAction.setMobMenuVisibility(showMobileMenuPanel)),
        setApplicationShowHelpText: (showHelpText: boolean): any => dispatch(applicationActions.setApplicationShowHelpText(showHelpText)),
        mobilePaytableShow: (showPaytableMobile: boolean): any => dispatch(paytableGofActions.mobilePaytableShow(showPaytableMobile)),

    }))(withMobileSettingPanelConfiguration(MobileSettingPanel)));