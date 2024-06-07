import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withNoInternetPopUpConfiguration from "./configuration/withNoInternetPopUpConfiguration";
import { UIManager, GSAPTimer } from "@bonanzainteractive/core";

import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { isMobile } from "react-device-detect";
import { layoutssActions, buttonActions } from "@bonanzainteractive/slote_core";


interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}

interface IStateToProps {
    layoutMode: string;
    noInternetPopupVisible: boolean;
    text: string;
    closeButton: boolean;
    continueButton: boolean;
    spinStart: boolean;
    homeUrl: string;
}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class NoInternetPopUp extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected noInternetPopUpContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: Object[] = [];
    protected xnoInternetPopUpContainerMobile: number = -480;
    protected ynoInternetPopUpContainerMobile: number = 250;
    protected xcloseButtonPopUp: number = 840;
    protected xcloseButtonPopUp_text: number = 960;
    private UIManagerRef: any;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            uiElements: [],
            lang: "en"
        }
        this.noInternetPopUpContainer = {};
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

    //this method will call after the first rendering for scaling and logo animation looping
    bindUI() {
        this.layoutChange(this.props.layoutMode);
    }

    componentDidMount() {
        this.bindUI();
    }

    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any,) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        }
        )
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
       
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode);
            return false;
        }
        if (nextProps.spinStart !== this.props.spinStart) {
            this.UIManagerRef("noInternetPopUpContainer") && nextProps.spinStart && (this.UIManagerRef("noInternetPopUpContainer").visible = false);
            return false;
        }
        return true;
    }
    openUrl(path: string) {
        (window as any).top.location.href = path;
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        if (this.props.noInternetPopupVisible) {
            this.UIManagerRef("noInternetPopUpContainer").visible = true;
            if (isMobile && window.innerWidth < window.innerHeight) {
                this.UIManagerRef("noInternetPopUpContainerMobile") && (this.UIManagerRef("noInternetPopUpContainerMobile").x = this.xnoInternetPopUpContainerMobile);
                this.UIManagerRef("noInternetPopUpContainerMobile") && (this.UIManagerRef("noInternetPopUpContainerMobile").y = this.ynoInternetPopUpContainerMobile);
            }
            UIManager.setText("noInternetPopUpText2", this.props.langObj[this.props.text]);
            !this.props.closeButton && (this.UIManagerRef("closeButtonPopUp").visible = false);
            !this.props.continueButton && (this.UIManagerRef("continueButtonPopUp").visible = false);
            !this.props.continueButton && (this.UIManagerRef("continueButtonPopUp_text").visible = false);
            if (!this.props.continueButton) {
                this.UIManagerRef("closeButtonPopUp") && (this.UIManagerRef("closeButtonPopUp").x = this.xcloseButtonPopUp);
                this.UIManagerRef("closeButtonPopUp_text") && (this.UIManagerRef("closeButtonPopUp_text").x = this.xcloseButtonPopUp_text);
            }
            this.props.setAllButtonDisable();

        }
        else {
            this.UIManagerRef("noInternetPopUpContainer").visible = false;
        }

    }
    handleEvent(e: any) {
     

        switch (e.currentTarget.name) {
            case "closeButtonPopUp":
                if (this.props.homeUrl === "") {
                    if (this.props.text !== "noInternetPopUpText3") {
                        this.openUrl(window.location.href);
                    } else {
                        this.props.visibleNoInternetPopUp(false, "", false, false);
                    }

                } else {
                    this.openUrl(this.props.homeUrl);
                }
                break;
            case "continueButtonPopUp":
                this.props.setAllButtonEnable();
                this.props.visibleNoInternetPopUp(false, "", false, false);
                break;



            default:
                return 'No buttons';
        }
    }
    render() {
        if (!this.props.noInternetPopupVisible) {
            return (<></>)
        }
        return (
            <UIManager id={"noInternetPopUpContainer"} name={"noInternetPopUpContainer"} type={"Container"}
                ref={i => this.noInternetPopUpContainer = i} configGame={this.props.configGame}
                app={this.app}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            id={i.id} {...i} app={this.app} configGame={this.props.configGame}
                            scope={this} ClickHandler={this.handleEvent.bind(this)} />
                    )
                }
            </UIManager>)
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'behaviourState' | 'applicationState' | 'reelgridState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        noInternetPopupVisible: state.behaviourState.noInternetPopupVisible,
        text: state.behaviourState.text,
        closeButton: state.behaviourState.closeButton,
        continueButton: state.behaviourState.continueButton,
        spinStart: state.reelgridState.spinStart,
        homeUrl: state.applicationState.homeUrl,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        visibleNoInternetPopUp: (noInternetPopupVisible: boolean, text: string, closeButton: boolean, continueButton: boolean): any => dispatch(behaviourAction.visibleNoInternetPopUp(noInternetPopupVisible, text, closeButton, continueButton)),
        realityCheckResume: (resumeRealityCheck: boolean): any => dispatch(behaviourAction.realityCheckResume(resumeRealityCheck)),

    }))(withNoInternetPopUpConfiguration(NoInternetPopUp)));
