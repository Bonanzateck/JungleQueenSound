import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { UIManager } from "@bonanzainteractive/core";

import { alllanguage } from "../data/lang/index";
import { Ilanguage } from "../components/interface/Icommon";
import withCheatPanelConfiguration from "./configuration/withCheatPanelConfiguration";
import { isMobile } from "react-device-detect";
import { constant } from "../slot/data/config/index";
import { actions as winCelebrationActions } from "../gamereducer/winCelebrationReducer";
import { baseGameAction, buttonActions, freegameActions } from "@bonanzainteractive/slote_core";
import { keyboardListenerActions, layoutssActions, soundActions } from "@bonanzainteractive/slote_core";
import { configGame } from "../slot/data/config/index";
interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}

interface IStateToProps {
    [x: string]: any;
}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class CheatPanel extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected cheatPanelContainer: _ReactPixi.IContainer | Ref<any>;
    private alllanguage: Ilanguage;
    protected ui_mode: string;
    protected displayUI: Object[] = [];
    private UIManagerRef: any;
    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.alllanguage = alllanguage;
        this.state = {
            uiElements: [],
            lang: "en",
            width: this.props.width,
            height: this.props.height,
            pixelRatio: window.devicePixelRatio,
            resizing: false,
        }
   
        this.cheatPanelContainer = {}
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }
        this.UIManagerRef = UIManager.getRef;
        constant.configGame.CheatPannel = false;
        this.displayUI = this.props.data.COMPONENTS.filter(this.checkUiMode.bind(this));
    }

    checkUiMode(uimodeobj: any) {
        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both"
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    layoutChange(currentLayout?: string) {
        this.displayUI.forEach((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        });
    }

    componentDidMount() {
        this.layoutChange(this.props.layoutMode);
        this.UIManagerRef("visibleCheatButtons") && (this.UIManagerRef("visibleCheatButtons").alpha = .3);
        this.addScrollBar();
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState?: Readonly<IState>, nextContext?: any): boolean {
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode)
        }
        return true;
    }


    addScrollBar() {
        let gameGuideContent: any = this.UIManagerRef("gameGuideContent")
        let gameScrollComponent: any = this.UIManagerRef("gameScrollComponent")
        const Scrollbox = require('pixi-scrollbox').Scrollbox
        const scrollbox = new Scrollbox({ boxWidth: 200, boxHeight: 800 })
        scrollbox.x = 0;
        scrollbox.y = 100;
        gameScrollComponent && gameScrollComponent.addChild(scrollbox)
        // add a sprite to the scrollbox's content

        const sprite = scrollbox.content.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
        sprite.width = 200
        sprite.height = 2200
        sprite.tint = 0x131313
        scrollbox.dragScroll = true;
        scrollbox.overflowX = "none";
        // force an update of the scrollbox's calculations after updating the children

        scrollbox.content.addChild(gameGuideContent);
        // add the viewport to the stage
        scrollbox.update()
    }

    componentDidUpdate() {
        this.addScrollBar();
    }
    handleEvent(e: any) {
        constant.configGame.CheatPannel = true;
        switch (e.currentTarget.name) {
            case "visibleCheatButtons":
                if (this.UIManagerRef("gameScrollComponent").visible) {
                    this.UIManagerRef("gameScrollComponent").visible = false;
                }
                else if (!this.UIManagerRef("gameScrollComponent").visible) {
                    this.UIManagerRef("gameScrollComponent").visible = true;
                }
                return;
            case "cheatForHv1":
                constant.configGame.cheatModifiedRequest = JSON.stringify(
                    {
                        "cheatCascadeMatrix": [
                            ["", "HV1", "HV1", "HV1", "HV3"],
                            ["HV1", "HV1", "LV2", "LV3"],
                            ["LV2", "HV1", "HV1", "LV6"],
                            ["LV1", "LV6", "HV2", "HV1"],
                            ["LV3", "HV1", "LV25", "LV1"],
                            ["", "HV1", "LV5"]
                        ],
                        "cmd": "cheatSpin"
                    }
                );
                return;
            case "cheatForHv2":
                constant.configGame.cheatModifiedRequest = JSON.stringify({
                    "cheatCascadeMatrix": [
                        ["", "HV2", "HV2", "HV1", "HV3"],
                        ["HV2", "HV2", "LV2", "LV3"],
                        ["LV2", "HV2", "HV2", "LV6"],
                        ["LV1", "LV6", "HV2", "HV2"],
                        ["LV3", "HV2", "LV25", "LV1"],
                        ["", "HV2", "LV5"]
                    ],
                    "cmd": "cheatSpin"
                });
                return;
            case "cheatForHv3":
                constant.configGame.cheatModifiedRequest = JSON.stringify({
                    "cheatCascadeMatrix": [
                        ["", "HV3", "HV2", "HV1", "HV3"],
                        ["HV3", "HV2", "LV2", "LV3"],
                        ["LV2", "LV1", "HV3", "LV6"],
                        ["LV1", "LV6", "HV3", "HV3"],
                        ["LV3", "HV3", "HV3", "LV1"],
                        ["", "HV3", "LV5"]
                    ],
                    "cmd": "cheatSpin"
                });
                return;
            case "cheatForHv4":
                constant.configGame.cheatModifiedRequest = JSON.stringify(
                    {
                        "cheatCascadeMatrix": [
                            ["", "HV4", "HV4", "HV1", "HV3"],
                            ["HV4", "HV4", "LV2", "LV3"],
                            ["LV2", "HV4", "HV3", "LV6"],
                            ["LV1", "LV6", "HV4", "HV3"],
                            ["LV3", "HV4", "LV2", "LV1"],
                            ["", "HV4", "LV5"]
                        ],
                        "cmd": "cheatSpin"
                    }
                );
                return;
            case "cheatForLv1":
                constant.configGame.cheatModifiedRequest = JSON.stringify(
                    {
                        "cheatCascadeMatrix": [
                            ["", "LV1", "HV1", "HV1", "HV3"],
                            ["LV1", "HV2", "LV2", "LV3"],
                            ["LV1", "HV4", "HV4", "LV6"],
                            ["LV1", "LV6", "HV4", "HV4"],
                            ["LV1", "HV4", "LV1", "LV1"],
                            ["", "LV1", "LV5"]
                        ],
                        "cmd": "cheatSpin"
                    }
                );
                return;
            case "cheatForLv2":
                constant.configGame.cheatModifiedRequest = JSON.stringify(
                    {
                        "cheatCascadeMatrix": [
                            ["", "LV2", "HV1", "HV1", "HV3"],
                            ["LV1", "HV2", "LV2", "LV3"],
                            ["LV2", "HV4", "HV4", "LV6"],
                            ["LV2", "LV6", "HV4", "HV4"],
                            ["LV2", "HV4", "LV25", "LV1"],
                            ["", "LV2", "LV5"]
                        ],
                        "cmd": "cheatSpin"
                    }
                );
                return;
            case "cheatForLv3":
                constant.configGame.cheatModifiedRequest = JSON.stringify(
                    {
                        "cheatCascadeMatrix": [
                            ["", "LV3", "HV1", "HV1", "HV3"],
                            ["LV3", "HV2", "LV2", "LV3"],
                            ["LV3", "HV4", "HV4", "LV6"],
                            ["LV3", "LV6", "HV4", "HV4"],
                            ["LV3", "HV4", "LV25", "LV1"],
                            ["", "LV3", "LV5"]
                        ],
                        "cmd": "cheatSpin"
                    }
                );
                return;
            case "cheatForLv4":
                constant.configGame.cheatModifiedRequest = JSON.stringify(
                    {
                        "cheatCascadeMatrix": [
                            ["", "LV4", "HV1", "HV1", "HV3"],
                            ["LV4", "HV2", "LV2", "LV3"],
                            ["LV4", "HV4", "HV4", "LV6"],
                            ["LV4", "LV6", "HV4", "HV4"],
                            ["LV4", "HV4", "LV25", "LV1"],
                            ["", "LV4", "LV5"]
                        ],
                        "cmd": "cheatSpin"
                    }
                );
                return;
            case "cheatForLv5":
                constant.configGame.cheatModifiedRequest = JSON.stringify(
                    {
                        "cheatCascadeMatrix": [
                            ["", "LV5", "HV1", "HV1", "HV3"],
                            ["LV5", "HV2", "LV2", "LV3"],
                            ["LV5", "HV4", "HV4", "LV6"],
                            ["LV5", "LV6", "HV4", "HV4"],
                            ["LV5", "HV4", "LV25", "LV1"],
                            ["", "LV5", "LV5"]
                        ],
                        "cmd": "cheatSpin"
                    }
                );
                return;
            case "cheatForLv6":
                constant.configGame.cheatModifiedRequest = JSON.stringify(
                    {
                        "cheatCascadeMatrix": [
                            ["", "LV6", "HV1", "HV1", "HV3"],
                            ["LV6", "HV2", "LV2", "LV3"],
                            ["LV6", "HV4", "HV4", "LV6"],
                            ["LV6", "LV6", "HV4", "HV4"],
                            ["LV6", "HV4", "LV25", "LV1"],
                            ["", "LV6", "LV5"]
                        ],
                        "cmd": "cheatSpin"
                    }
                );
                return;
            case "cheatForBigWin":
                constant.configGame.cheatModifiedRequest = JSON.stringify(
                    {
                        "cheatCascadeMatrix": [
                            ["", "HV1", "HV2", "HV4", "HV3"],
                            ["HV1", "LV2", "LV2", "LV3"],
                            ["HV1", "LV6", "HV4", "LV6"],
                            ["HV1", "LV6", "HV1", "HV4"],
                            ["HV1", "HV1", "LV25", "LV1"],
                            ["", "LV6", "LV5"]
                        ],
                        "cmd": "cheatSpin"
                    }
                );
                return;

            case "cheatForSuperWin":
                constant.configGame.cheatModifiedRequest = JSON.stringify(
                    {
                        "cheatCascadeMatrix": [
                            ["", "HV1", "HV1", "HV1", "HV1"],
                            ["HV1", "LV2", "LV2", "LV3"],
                            ["HV1", "LV6", "HV4", "LV6"],
                            ["HV1", "LV6", "HV1", "HV4"],
                            ["HV1", "HV1", "LV25", "LV1"],
                            ["", "LV6", "LV5"]
                        ],
                        "cmd": "cheatSpin"
                    }
                );
                return;
            case "cheatForMegaWin":
                constant.configGame.cheatModifiedRequest = JSON.stringify(
                    {
                        "cheatCascadeMatrix": [
                            ["", "HV1", "HV1", "HV1", "HV1"],
                            ["HV1", "HV1", "HV2", "HV2"],
                            ["HV1", "LV2", "HV4", "LV6"],
                            ["HV1", "LV3", "HV1", "HV4"],
                            ["HV1", "LV4", "LV25", "LV1"],
                            ["", "LV6", "LV5"]
                        ],
                        "cmd": "cheatSpin"
                    }
                );
                return;
            case "cheatForLegendaryWin":
                constant.configGame.cheatModifiedRequest = JSON.stringify(
                    {
                        "cheatCascadeMatrix": [
                            ["", "HV1", "HV1", "HV1", "HV1"],
                            ["HV1", "HV1", "HV1", "HV2"],
                            ["HV1", "LV2", "HV4", "LV6"],
                            ["HV1", "LV3", "HV1", "HV4"],
                            ["HV1", "LV4", "LV25", "LV1"],
                            ["", "HV1", "LV5"]
                        ],
                        "cmd": "cheatSpin"
                    }

                );
                return;
            case "cheatForScatterTrigger":
                constant.configGame.cheatModifiedRequest = JSON.stringify(
                    {
                        "cheatCascadeMatrix": [
                            ["", "SC", "HV1", "HV1", "HV3"],
                            ["LV1", "SC", "LV2", "LV3"],
                            ["LV2", "SC", "HV4", "LV6"],
                            ["LV6", "LV6", "SC", "HV4"],
                            ["LV6", "LV1", "LV5", "LV1"],
                            ["", "LV6", "LV5"]
                        ],
                        "cmd": "cheatSpin"
                    }

                );
                return;
            case "cheatForAnticipation":
                constant.configGame.cheatModifiedRequest = JSON.stringify(
                    {
                        "cheatCascadeMatrix": [
                            ["", "HV2", "HV1", "HV1", "SC", "LV6", "-", "", "SC", "LV5", "HV2", "SC", "LV6"],
                            ["LV1", "HV1", "LV2", "LV2", "LV2", "-", "LV2", "SC", "LV2", "LV2", "LV2"],
                            ["HV1", "LV5", "HV4", "-", "LV2", "LV3", "LV5"],
                            ["LV2", "LV3", "LV4", "-", "HV3", "LV5", "HV2"],
                            ["HV3", "LV4", "SC", "LV1", "-", "HV3", "LV4", "SC", "LV1"],
                            ["", "SC", "LV5", "-", "", "SC", "LV5"]
                        ],
                        "cmd": "cheatSpin"
                    }
                );
                return;
            case "cheatForBigWin&FG":
                constant.configGame.cheatModifiedRequest = JSON.stringify(
                    {
                        "cheatCascadeMatrix": [
                            ["", "HV1", "HV1", "HV1", "HV1"],
                            ["HV1", "HV1", "HV2", "HV2"],
                            ["HV1", "SC", "HV4", "LV6"],
                            ["HV1", "SC", "SC", "HV4"],
                            ["HV1", "SC", "LV25", "LV1"],
                            ["", "LV6", "LV5"]
                        ],
                        "cmd": "cheatSpin"
                    }
                );
                return;
            case "cheatForMultipleCascading":
                constant.configGame.cheatModifiedRequest = JSON.stringify(
                    {
                        "cheatCascadeMatrix": [
                            ["", "LV3", "LV2", "LV4", "HV3", "-", "", "LV5", "LV3", "LV3", "LV4", "-", "", "LV1", "LV3", "LV3", "LV4", "-", "", "LV2", "LV1", "LV1", "LV4"],
                            ["WILD", "HV3", "HV4", "HV4", "-", "LV6", "LV5", "HV4", "HV4", "-", "LV6", "LV3", "HV4", "HV4", "-", "LV6", "LV4", "HV4", "HV4"],
                            ["LV2", "HV3", "LV2", "LV2", "LV2", "-", "LV3", "LV6", "LV4", "LV5", "LV5", "-", "LV3", "LV1", "LV6", "LV6", "LV4", "-", "LV1", "LV1", "LV6", "LV6", "LV4"],
                            ["HV3", "LV1", "LV2", "LV2", "-", "WILD", "LV5", "LV3", "LV1", "-", "LV1", "LV3", "LV3", "LV1", "-", "LV4", "LV3", "LV4", "LV1"],
                            ["LV6", "HV1", "LV3", "HV3", "LV5", "-", "WILD", "LV5", "HV1", "LV3", "LV5", "-", "LV4", "LV5", "LV1", "HV1", "LV3", "-", "WILD", "LV1", "LV5", "LV1", "HV1"],
                            ["", "HV2", "LV3", "HV4", "-", "", "HV2", "LV3", "HV4", "-", "", "HV2", "LV3", "HV4", "-", "", "LV2", "HV2", "HV4"]
                        ],
                        "cmd": "cheatSpin"
                    }
                );
                return;

            case "clearCheat":
                constant.configGame.cheatModifiedRequest = "";
                return;
            default:
                return 'No buttons';
        }
    }
    render() {
        return (
            <UIManager id={"cheatPanelContainer"} name={"cheatPanelContainer"} type={"Container"} configGame={configGame} app={this.app}
                ref={i => this.cheatPanelContainer = i} visible={this.props.startRendering}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={Math.floor(Math.random() * 100000)} langObj={this.props.langObj} type={i.type}
                            app={this.app} configGame={configGame} constant={constant}
                            id={i.id} name={i.name} {...i} ClickHandler={this.handleEvent.bind(this)}
                        />)
                }
            </UIManager>
        );
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'asyncInitAction' | 'paytableState' | 'introductionState' | 'applicationState' | 'soundState' | 'basegameState' | 'behaviourState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        startRendering: state.asyncInitAction.startRendering,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        winCelebrationShow: (showWinCelebration: boolean): any => dispatch(winCelebrationActions.winCelebrationShow(showWinCelebration)),
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        winCelebrationStart: (startWinCelebration: boolean, showAmount: string): any => dispatch(winCelebrationActions.winCelebrationStart(startWinCelebration, showAmount)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        stopSound: (soundName: any): any => dispatch(soundActions.stopSound(soundName)),       
        nextFreegame: (): any => dispatch(freegameActions.nextFreegame()),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        setWinCelebrationForKeyboardListener: (winCelebrationForKeyBoardListener: boolean): any => dispatch(keyboardListenerActions.setWinCelebrationForKeyboardListener(winCelebrationForKeyBoardListener)),
    }))(withCheatPanelConfiguration(CheatPanel)));
