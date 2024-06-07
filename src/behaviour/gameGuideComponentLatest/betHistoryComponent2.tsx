import React, { Component } from "react";
import * as PIXI from "pixi.js";
import { UIManager } from "@bonanzainteractive/core";

import { withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withBetHistoryComponent2Configuration from "./configuration/withbetHistoryComponent2Configuration";
import { isMobile } from "react-device-detect";
//import { Scrollbox } from 'pixi-scrollbox'



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

class BetHistoryComponent2 extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected displayUI: any;
    protected betHistoryComponent2: any;
    protected betHistoryComponent2Container: any;
    protected scope: any;
    protected ui_mode: string;
    protected betHistoryComponent2List: Array<any>

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.betHistoryComponent2 = React.createRef();
        this.betHistoryComponent2Container = React.createRef();
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
        this.betHistoryComponent2List = []
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

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.showSettingGameRules !== this.props.showSettingGameRules) {
            if (nextProps.showSettingGameRules) {
                this.betHistoryComponent2.COMPONENT.visible = true;
            } else {
                this.betHistoryComponent2.COMPONENT.visible = false;
            }
            return false;
        }
        return true;
    }
    render() {
        return (<UIManager id={"betHistoryComponent2"} name={"betHistoryComponent2"} type={"Container"}
            ref={i => this.betHistoryComponent2 = i }
            x={0} y={0} visible = {false}>
            {
                this.displayUI && this.displayUI.map((i: any) =>
                    <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                        id={i.id} {...i} app={this.app} />)
            }
        </UIManager>)
    }
}


export default withPixiApp(connect(
    (state: Pick<IStore, 'applicationState'| 'behaviourState'>): IStateToProps =>
    ({
        showSettingGameRules: state.behaviourState.showSettingGameRules
    }),
    (dispatch: Dispatch): IDispatchToProps => ({

    }))(withBetHistoryComponent2Configuration(BetHistoryComponent2)));