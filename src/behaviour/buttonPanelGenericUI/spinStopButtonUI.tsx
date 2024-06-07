import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
    layoutssActions, reelsGridActions, buttonActions,
    withButtonPanelConfiguration,
    reelsActions
} from "@bonanzainteractive/slote_core";
import { UIManager } from "@bonanzainteractive/core";

import { withPixiApp } from "@inlet/react-pixi";
import { configGame } from "../../slot/data/config";
import buttonBase from "./buttonBase";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
interface IProps {
    [x: string]: any;
}

interface IStore {
    [x: string]: any;
}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}
interface IStateToProps {
    spinStart: boolean,
    spinResponseReceived: boolean,
    stopButtonActive: boolean,
    cspStart: boolean,
    inFreeGame: boolean,
    isRemoveKeyBoardEvent: boolean,
    InTurboMode: boolean,
    layoutMode: string,
    isSlamSpin: boolean,
    deActivate: boolean
}
class spinStopButtonUI extends buttonBase {
    protected button_name_15: string;
    private setSpinStopButtonActive: boolean = false;
    constructor(props: IProps, state: IState) {
        super(props, state);
        this.button_name_15 = "btn_spinStop";
        this.state = {
            [this.button_name_15]: { enable: true, visible: false },
        }

    }
    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        if (this.props.layoutMode) {
            this.layoutChange(this.props.layoutMode);
        }
        if (!this.setSpinStopButtonActive) {
            this.props.setSpinStopButtonActive(false);
        }
        if (this.setSpinStopButtonActive) {
            this.props.setSpinStopButtonActive(true);
        }
    }
    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        });
    }
    onStopSpin() {
        if (!this.props.isSlamSpin) {
            this.props.setSlamActivited(true);
            this.toggleButton(true, true);
        }
    }
    //this method will be called when a button gets clicked
    handleEvent = (e: any) => {
        e.stopPropagation();
        this.props.setApplicationButtonClicked(true);
        this.props.setApplicationButtonClicked(false);
        switch (e.target.name) {
            case this.button_name_15:
                this.onStopSpin();
                return;
            default:
                return 'No buttons';
        }
    }
    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.cspStart !== this.props.cspStart || nextProps.layoutMode !== this.props.layoutMode
            || nextProps.isRemoveKeyBoardEvent !== this.props.isRemoveKeyBoardEvent
            || nextProps.onReelGridMotionFinished !== this.props.onReelGridMotionFinished
        ) {
            if (nextProps.layoutMode) {
                this.layoutChange(nextProps.layoutMode);
            }
            if (nextProps.cspStart && nextProps.cspStart !== this.props.cspStart) {
                this.toggleDecButton(nextProps, false);
            }
            if (nextProps.isRemoveKeyBoardEvent && nextProps.isRemoveKeyBoardEvent !== this.props.isRemoveKeyBoardEvent) {
                this.onStopSpin();
            }
        }
        return nextProps.deActivate ? false: true;
    }
    toggleDecButton(nextProps: any, disableButtonForce: boolean = false) {
        this.setState((prevState) => {
            return {
                ...prevState,
                [this.button_name_15]: { disabled: disableButtonForce }
            }
        });
    }
    checkUpdateState(nextProps: any) {
        if (nextProps.InTurboMode !== this.props.InTurboMode) {
            !nextProps.InTurboMode && this.toggleButton(true);
            nextProps.InTurboMode && this.toggleButton(false);
        }
        else if (nextProps.isRemoveKeyBoardEvent && nextProps.isRemoveKeyBoardEvent !== this.props.isRemoveKeyBoardEvent) {
            this.onStopSpin();
            this.props.setStopActive(false);
            this.props.flowManagerCalled(false);
        }
        else if (!nextProps.InTurboMode && nextProps.cspStart && nextProps.cspStart !== this.props.cspStart) {
            this.toggleButton(true);
        }
        else if (!nextProps.cspStart && nextProps.cspStart !== this.props.cspStart) {
            this.toggleButton(false);
        }
        return false;
    }
    /**
     * Enable and disable Increase Button UI
     */
    toggleButton(isEnable: boolean = false, isStop: boolean = false) {
        isStop = this.props.InTurboMode ? false : isStop;
        this.setState((prevState) => {
            return {
                ...prevState,
                [this.button_name_15]: { enable: isStop ? isStop : !isEnable, visible: isEnable }
            }
        });
        this.forceUpdate();
    }

    render() {
        let _forReturn: boolean = true;
        if (!this.props.spinResponseReceived) {
            _forReturn = false;
        }
        if (this.props.inFreeGame || this.props.InTurboMode) {
            _forReturn = false;
        }
        if (!this.props.cspStart || this.props.isSlamSpin) {
            _forReturn = false;
        }
        if (!_forReturn) {          
            this.setSpinStopButtonActive = false;
            return _forReturn
        }       
        this.setSpinStopButtonActive = true;
        const { langObj } = this.props;
        let buttonState = this.state.btn_spinStop.disabled === undefined ? true : this.state.btn_spinStop.disabled;
        return (
            <UIManager id={"GenericUIComponentdecreaseButtonUI"}
                type={"Container"}
                ref={i => this.buttonPanelGenericUIContainer = i}
                app={this.app}
                configGame={configGame}>
                {
                    this.displayUI.map((data: any) => {
                        return (<UIManager
                            key={`UIManager-${Math.random()}`}
                            type={data.type}
                            app={this.app}
                            ClickHandler={this.handleEvent}
                            langObj={langObj}
                            disabled={buttonState}
                            id={data.id}
                            {...data}
                        />
                        )
                    }
                    )
                }
            </UIManager>
        )

    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'reelgridState' | 'reelsState' | 'buttonPanelState' | 'freegameState' | 'basegameState' | 'applicationState' | 'behaviourState'>): IStateToProps =>
    ({
        spinStart: Number(configGame["SPIN_TYPE"]) === 2 && (state.reelgridState.spinStart || state.reelsState.spinStart),
        spinResponseReceived: Number(configGame["SPIN_TYPE"]) === 0 && (state.reelsState.spinResponseReceived),
        stopButtonActive: state.buttonPanelState.stopButtonActive,
        cspStart: state.reelgridState.cspStart,
        inFreeGame: state.freegameState.inFreeGame,
        isRemoveKeyBoardEvent: state.basegameState.isRemoveKeyBoardEvent,

        InTurboMode: state.reelsState.InTurboMode,
        layoutMode: state.applicationState.layoutMode,
        isSlamSpin: state.reelsState.isSlamSpin,
        deActivate: state.behaviourState.deActivate



    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        setSlamSpin: (isSlamSpin: any): any => dispatch(reelsGridActions.setSlamSpin(isSlamSpin)),
        setSlamActivited: (slamActivate: any): any => dispatch(reelsActions.setSlamActivited(slamActivate)),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        setSpinStopButtonActive: (spinStopButtonActive: boolean): any => dispatch(behaviourAction.setSpinStopButtonActive(spinStopButtonActive)),
    }))(withButtonPanelConfiguration(spinStopButtonUI)));