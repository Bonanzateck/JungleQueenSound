import React, { Component } from "react";
import * as PIXI from "pixi.js";
import { UIManager } from "@bonanzainteractive/core";

import { withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withGameSettingsContainerConfiguration from "./configuration/withGameSettingsContainerConfiguration";
import { isMobile } from "react-device-detect";


interface IStore {
    [x: string]: any;
}
interface IProps {
    [x: string]: any;
}

interface IState {

}

interface IStateToProps {
}

interface IDispatchToProps {
}

class GameSettingsContainer extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected displayUI: any;
    protected gameSettingsContainer: any;
    protected gameSettingsComponentContainer: any;
    protected gameSettings_component_container: any;
    protected scope: any;
    protected ui_mode: string;
    protected gameSettingsComponentList: Array<any>
    private gameSettings: any;
    private gameControl: any;
    private gameSettings_yellow: any;
    private gameSettings_white: any;
    private gameSettingsBtn: any;
    private controlBtn: any;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.gameSettingsContainer = React.createRef();
        this.gameSettingsComponentContainer = React.createRef();
        this.state = {
            uiElements: [],
            lang: "en"
        }

        if (isMobile) {
            this.ui_mode = "mobile"
        } else {
            this.ui_mode = "desktop"
        }
        //reel,row
        this.gameSettingsComponentList = []
        this.displayUI = this.props.data.COMPONENTS[0].child.filter(this.checkUiMode.bind(this));
    }

    checkUiMode(uimodeobj: any) {
        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both"
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    bindUI() {
        // this.gameSettingsBtn = UIManager.getRef("gameSettingsBtn");
        // this.controlBtn = UIManager.getRef("controlBtn");
        // // this.gameSettings_yellow = UIManager.getRef("gameSettingsCont_yellow");
        // this.gameSettings_white = UIManager.getRef("gameSettingsCont_white");
        // this.gameSettings = UIManager.getRef("gameGeneralContent");
        // // this.gameControl = UIManager.getRef("gameAutoplayComponent");

        // this.gameSettings.visible = true;
        // this.gameControl.visible = false;
    }

    showGameSettings() {
        // this.gameSettings_yellow.visible = true;
        // this.gameSettings_white.visible = false;
        // this.gameSettings.visible = true;
        // // this.gameControl.visible = false;
    }

    showautoplay() {
        // this.gameSettings_yellow.visible = false;
        // this.gameSettings_white.visible = true;
        // this.gameSettings.visible = false;
        // this.gameControl.visible = true;
    }

    handleEvent = (e: any) => {
        switch (e.target.name) {
            case "gameSettingsBtn":
                // this.showGameSettings();
                break;
            case "autoplayBtn":
                break;
            default:
                return 'No buttons';
        }
    }
    mouseOver() {
        //alert("mouseOver")
    }
    mouseOut() {
        //alert("mouseOut")
    }

    componentDidMount() {
        this.bindUI();
    }
    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.showGameSettings !== this.props.showGameSettings) {
            if (nextProps.showGameSettings) {
                this.gameSettingsContainer.COMPONENT.visible = true;
            } else {
                this.gameSettingsContainer.COMPONENT.visible = false;
            }
            return false;
        }
        return true;
    }
    render() {

        return (<UIManager id={"gameSettingsContainer"} name={"gameSettingsContainer"} type={"Container"}
            ref={i => this.gameSettingsContainer = i}
            x={0} y={0} visible={false}>
            {
                this.displayUI && this.displayUI.map((i: any) =>
                    <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                        id={i.id} {...i} app={this.app} ClickHandler={this.handleEvent} mouseOver={this.mouseOver} mouseOut={this.mouseOut} />)
            }
        </UIManager>)
    }
}


export default withPixiApp(connect(
    (state: Pick<IStore, 'applicationState' | 'behaviourState'>): IStateToProps =>
    ({
        showGameSettings: state.behaviourState.showGameSettings
    }),
    (dispatch: Dispatch): IDispatchToProps => ({

    }))(withGameSettingsContainerConfiguration(GameSettingsContainer)));