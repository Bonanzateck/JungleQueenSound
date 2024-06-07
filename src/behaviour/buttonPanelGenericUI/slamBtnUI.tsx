import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { buttonActions, withButtonPanelConfiguration } from "@bonanzainteractive/slote_core";
import { UIManager } from "@bonanzainteractive/core";

import { withPixiApp } from "@inlet/react-pixi";
import { actions as gameLevelResponseActions } from "../../gamereducer/asyncGameLevelServerResponseReducer";
import { actions as betPanelAction } from "../../core/reducers/betPanelReducer";
import { configGame } from "../../slot/data/config";
import buttonBase from "./buttonBase";
import { soundActions } from "@bonanzainteractive/slote_core";
import { layoutssActions } from "@bonanzainteractive/slote_core";
// import { actions as reelsGridActions, actions as reelGridActions } from "../../core/reducers/reelgridStateReducer";
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
    layoutMode: string,
    decreaseBetBtnVisibility: boolean,       
    clickedButtonName: string,
    reConstruction: boolean,    
    stopButtonActive: boolean,
    jurisdictionKey: string,
    cspStart: boolean,
    inFreeGame: boolean,
    isRemoveKeyBoardEvent: boolean,
    onReelGridMotionFinished: boolean,
    InTurboMode: boolean
}

class slamBtnUI extends buttonBase {
    protected button_name_4: string;
    private slamClicked: boolean = false;  
    protected isButtonClicked: boolean = false;
    protected AllTimer: any[] = [];
    protected autoPlayButtonName: string = "";
    protected storeCurrentBet: number = 0;
    constructor(props: IProps, state: IState) {
        super(props, state);      
        this.app = props.app;
        this.button_name_4 = "btn_spinStop";
        this.state = {
            [this.button_name_4]: { enable: false },
            firstLoad: 1,
            updateStateObj: {}
        }
        this.setVisibilityOfButtonAccordingToBackend(this.button_name_4, this.props.decreaseBetBtnVisibility);


    }
    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {       
        if(this.props.layoutMode){
            this.layoutChange(this.props.layoutMode);
        }

    }
    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        }
        )
    }



    //this method will be called when a button gets clicked
    handleBetActionEvent = (e: any) => {
        e.stopPropagation();
        switch (e.target.name) {
            case this.button_name_4:
                this.onClickSound();
                this.onStopSpin();
                return;
            default:
                return 'No buttons';
        }
    }

    onStopSpin() {
        if (!this.props.isSlamSpin) {
            this.props.setSlamActivited(true);
            this.slamClicked = true;
            this.toggleDecButton(this.props, true);
        }
    }



    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.cspStart != this.props.cspStart ||  nextProps.layoutMode !== this.props.layoutMode
            || nextProps.isRemoveKeyBoardEvent != this.props.isRemoveKeyBoardEvent
            || nextProps.onReelGridMotionFinished != this.props.onReelGridMotionFinished
        ) {
            if (nextProps.layoutMode) {
                this.layoutChange(nextProps.layoutMode);
            }
            if (nextProps.cspStart && nextProps.cspStart != this.props.cspStart) {
                this.toggleDecButton(nextProps, false);
            }
            if (nextProps.isRemoveKeyBoardEvent && nextProps.isRemoveKeyBoardEvent !== this.props.isRemoveKeyBoardEvent) {
                this.onStopSpin();
            }           
        }

        return true;
    }
   
   
    /**
     * Enable and disable Decrease Button UI
     * disableButtonForce is false then it will disable button 
     */
    toggleDecButton(nextProps: any, disableButtonForce: boolean = false) {
        this.setState((prevState) => {
            return {
                ...prevState,
                [this.button_name_4]: { disabled: disableButtonForce }
            }
        });

    }

    render() {

        if (this.props.inFreeGame || this.props.onReelGridMotionFinished || this.props.jurisdictionKey === 'de' ) {
            return (<></>);
        }  
        if (this.props.InTurboMode ) {
            return (<></>);
        }       
        
        const { langObj, enableAutoPlay } = this.props;
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
                            ClickHandler={this.handleBetActionEvent}
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
    (state: Pick<IStore, 'asyncServerAction' | 'gameactionstate' |  'asyncGameLevelSeverState' | 'reelgridState' | 'freegameState' | 'winCelebrationState' | 'winpresentationState' | 'betPanelState' | 'reelsState' | 'buttonPanelState' | 'soundState' | 'basegameState' | 'autoplayState' | 'applicationState' | 'desktopSettingPanelState' | 'behaviourState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        decreaseBetBtnVisibility: state.applicationState.decreaseBet,      
        clickedButtonName: state.buttonPanelState.clickedButtonName,
        jurisdictionKey: state.applicationState.jurisdictionKey,
        reConstruction: state.basegameState.reConstruction,       
        stopButtonActive: state.buttonPanelState.stopButtonActive,
        cspStart: state.reelgridState.cspStart,
        inFreeGame: state.freegameState.inFreeGame,
        isRemoveKeyBoardEvent: state.basegameState.isRemoveKeyBoardEvent,       
        onReelGridMotionFinished: state.reelgridState.onReelGridMotionFinished,
        InTurboMode: state.reelgridState.InTurboMode,      
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        setSelectedCoin: (selectedCoin: number): any => dispatch(betPanelAction.setSelectedCoin(selectedCoin)),
        getApplicationDecreaseBetResponse: (): any => dispatch(gameLevelResponseActions.getApplicationDecreaseBetResponse()),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        
    }))(withButtonPanelConfiguration(slamBtnUI)));