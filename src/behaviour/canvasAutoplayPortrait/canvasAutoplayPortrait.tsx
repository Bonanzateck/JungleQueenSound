import { Component } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withCanvasAutoplayConfiguration from "./configuration/withCanvasAutoplayPortraitConfiguration";

interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}
interface IStateToProps { }
interface IDispatchToProps { }
interface IState {
    [x: string]: any;
}

class CanvasAutoplayPortrait extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
    render() {
        return (
            null
        )
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'betPanelState' | 'autoplayState' | 'applicationState' | 'basegameState' | 'behaviourState'>): IStateToProps =>
        ({}),
    (dispatch: Dispatch): IDispatchToProps => ({
    }))(withCanvasAutoplayConfiguration(CanvasAutoplayPortrait)));