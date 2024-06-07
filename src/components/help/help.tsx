import React, {Component} from "react";
import {withPixiApp} from "@inlet/react-pixi";
import {connect} from "react-redux";
import { IStore } from "../../core/store/IStore";
import {Dispatch} from "redux";
import { paytableActions } from "@bonanzainteractive/slote_core";
import withHelpConfiguration from "../help/configuration/withHelpConfiguration";
interface IProps {
    [x: string]: any;
}

interface IStateToProps {
}

interface IDispatchToProps {
}

interface IState {
    index: number,

    width: number | string,
    height: number | string,


}

class Help extends Component<IProps, IState> {
    protected app: PIXI.Application;

    constructor(props: IProps) {
        super(props);

        this.app = props.app;

        this.state = {
            index: 0,
            width: this.props.width,
            height: this.props.height,
        }
    }

    render() {
        if (!this.props.showHelp) {
            return (<></>)
        }
        return (
            <div className="container-fluid p-0 help-main">
                <div className="help-container">
                    <div className="help-content ">

                        <div className="helpcentered text-white" style={{pointerEvents: "auto"}}>
                            <div className="overflow-paytable">
                                <div className="help-main-content">
                                    <h5 className="text-uppercase text-yellow">Draco Pachinko.</h5>
                                    <p className="help-content-paragraph margin-top-4">Lorem ipsum, or lipsum as it is
                                        sometimes known, is dummy text used in laying out print, graphic or web designs.
                                        The passage is attributed to an unknown typesetter in the 15th century who is
                                        thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for
                                        use in a type specimen book.</p>

                                    <img src="../../assets/help/help-img-1.jpg"
                                         className="img-fluid margin-top-4 help-img-shadow"/>
                                    <h5 className="text-uppercase text-yellow margin-top-4">Learn to play</h5>
                                    <p className="help-content-paragraph margin-top-4">Lorem ipsum, or lipsum as it is
                                        sometimes known, is dummy text used in laying out print, graphic or web designs.
                                        The passage is attributed to an unknown typesetter in the 15th century who is
                                        thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for
                                        use in a type specimen book.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withPixiApp(connect(
    (state: Pick<IStore, 'helpState'>): IStateToProps =>
        ({
            showHelp: state.helpState.showHelp,
        }),
    (dispatch: Dispatch): IDispatchToProps => ({
        hidePaytable: (): any => dispatch(paytableActions.hidePaytable()),
    }))(withHelpConfiguration(Help)));