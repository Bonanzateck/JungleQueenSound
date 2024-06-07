import React, { Component } from "react";
import {Text} from "@inlet/react-pixi";

interface IProps {
    [x: string]: any;
}

interface IStateToProps {
}

interface IDispatchToProps {
}

interface IState {


}

export class STARTTEXTCODE extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }


    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        return true;
    }


    componentDidMount() {
    }

    render() {
        return (<>
            <Text
                style={{
                    fontFamily: 'Arial',
                    fontSize: this.props.fontOfText,
                    fontWeight: 'bold',
                    fill: this.props.colofOfText
                }}
                x={this.props.xaxis}
                y={this.props.yaxis}
                text={this.props.textToDisplay}
            />
        </>

        )
    }
}
