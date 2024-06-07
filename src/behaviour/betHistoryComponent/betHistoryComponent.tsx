import React, { Component } from "react";
import * as PIXI from "pixi.js";
import { UIManager } from "@bonanzainteractive/core";

import { withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withBetHistoryComponentConfiguration from "./configuration/withbetHistoryComponentConfiguration";
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

class BetHistoryComponent extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected displayUI: any;
    protected betHistoryComponent: any;
    protected betHistoryComponentContainer: any;
    protected scope: any;
    protected ui_mode: string;
    protected betHistoryComponentList: Array<any>

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.betHistoryComponent = React.createRef();
        this.betHistoryComponentContainer = React.createRef();
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
        this.betHistoryComponentList = []
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
        if (nextProps.showBetHistory !== this.props.showBetHistory) {
            if (nextProps.showBetHistory) {
                this.betHistoryComponent.COMPONENT.visible = true;
            } else {
                this.betHistoryComponent.COMPONENT.visible = false;
            }
            return false;
        }
        return true;
    }
    render() {
        return (<UIManager id={"betHistoryComponent"} name={"betHistoryComponent"} type={"Container"}
            ref={i => this.betHistoryComponent = i }
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
        showBetHistory: state.behaviourState.showBetHistory
    }),
    (dispatch: Dispatch): IDispatchToProps => ({

    }))(withBetHistoryComponentConfiguration(BetHistoryComponent)));