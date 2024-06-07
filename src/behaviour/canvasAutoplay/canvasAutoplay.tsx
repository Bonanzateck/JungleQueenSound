import withCanvasAutoplayConfiguration from "./configuration/withCanvasAutoplayConfiguration";
import { Component } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";

interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}

interface IStateToProps {
    autoplayCount: number;
}

interface IDispatchToProps { }
interface IState {
    [x: string]: any;
}

class CanvasAutoplay extends Component<IProps, IState> {
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
    ({
        autoplayCount: state.basegameState.autoplayCount
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
    }))(withCanvasAutoplayConfiguration(CanvasAutoplay)));