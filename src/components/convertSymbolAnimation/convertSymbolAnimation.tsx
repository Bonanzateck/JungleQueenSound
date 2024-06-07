import React, { Component, Ref } from "react";
import { Container, _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withConvertSymbolAnimationConfiguration from "./configuration/withConvertSymbolAnimationConfiguration";
import { GSAPTimer, UIManager } from "@bonanzainteractive/core";

import * as PIXI from 'pixi.js';
import { layoutssActions, symbolActions, reelsActions, soundActions, winpresentationAction, flowManagerAction } from "@bonanzainteractive/slote_core";
import { isMobile } from "react-device-detect";
import { actions as featureAction } from "../../gamereducer/revealFeatureReducer";
import { configGame } from "../../slot/data/config";


interface IStore {
    [x: string]: any;
}
interface IProps {
    [x: string]: any;
}
interface IStateToProps {

}

interface IDispatchToProps {
}
interface IState {
    [x: string]: any;
}

class ConvertSymbolAnimation extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected ui_mode: string;
    protected displayUI: any;
    protected con_pos: any;
    protected savePositionLength: number = 0;
    protected animX: number = 0;
    protected animY: number = 0;
    protected xAxis: number = configGame.REEL_CONTAINER_X;
    protected yAxis: number = configGame.REEL_CONTAINER_Y;
    protected xAxisMob: number = 48;
    protected yAxisMob: number = 618;
    protected mystry_pos: any= [];
    protected golden_pos: any;
    protected goldenCoinList: any;
    protected convertSymbolAnimationContainer: any;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }
        // this.displayUI = this.props.data.COMPONENTS.filter(this.checkUiMode.bind(this));
        this.displayUI = this.props.data.COMPONENTS[0].child.filter(this.checkUiMode.bind(this));
    }

    checkUiMode(uimodeobj: any) {
        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both";
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }
    //this method will initialize object to variables
    initializeObjectInVariable() {
        this.con_pos = [];
    }
    bindUI() {
        this.layoutChange(this.props.layoutMode);
    }

    componentDidMount() {
        this.initializeObjectInVariable();
        this.bindUI();
        this.onOrientationChange();
    }
    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any,) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        });
    }

    componentDidUpdate() {
        this.bindUI();
    }
    onOrientationChange() {

    }
    //22222222222222222222222222222222222222
    setRevealSymbolAnimation(nextProps: any = []) {
        let reel_data = this.props.reel_data;
        this.mystry_pos = [];
        this.golden_pos = [];
        nextProps.mysteryCoinList.length;
        let mysterySymbol: any = {0: [], 1: [], 2: [], 3: [], 4: []};
        if (nextProps.mysteryCoinList && nextProps.mysteryCoinList.length > 0){
            nextProps.mysteryCoinList.forEach((s: Array<any>) => {
                mysterySymbol[s[0]].push(s[1]);
            });
        }
        for (let i: number = 0; i < reel_data.stopReels.length; i++) {
            for (let j = 0; j < reel_data.stopReels[i].length - 1; j++) {
                if (mysterySymbol[i].includes(j)) {
                    this.con_pos.push("ani_reveal" + i + j);
                }
            }
        }
    }

    //   This function is used to mystry symbols playing animation  
    private playMystrySymbolsAnimations(inFreegame: boolean): any {
        return new Promise<void>((resolve)=>{
            GSAPTimer.getInstance().addTimer(50 / 1000, () => {
                this.con_pos.forEach((element: any) => {
                    UIManager.getRef(element).visible = true;
                    isMobile && ( window.innerHeight > window.innerWidth ) && UIManager.getRef(element).scale.set(0.8);
                    UIManager.getRef(element).children[0].state.setAnimation(0, "reveal", true);
                    UIManager.getRef(element).children[0].state.onComplete = () => {
                        UIManager.getRef(element).visible = false;
                        resolve();

                        
                    }
                });
                this.props.setRevealFeatureStart(true);
            });        
            
        });
    }

   
    ///+++++++++++++++++++++++++++++++++++++++++++++++++++** END GOLDEN FEATURE ++++++++++++++++++++++++++++++++++++++++++
    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
       if (nextProps.mysteryCoinList.length === 0  && (nextProps.allSpinComplete && nextProps.allSpinComplete !== this.props.allSpinComplete)) {
            return false;
        }
        if (nextProps.layoutMode !== this.props.layoutMode
            || nextProps.allSpinComplete !== this.props.allSpinComplete
            || nextProps.mysteryCoinList !== this.props.mysteryCoinList
            || nextProps.fillpreviuosspindata !== this.props.fillpreviuosspindata
            || nextProps.playMysterySymbolAnimFg !== this.props.playMysterySymbolAnimFg || nextProps.butterFlyCollected !== this.props.butterFlyCollected) {
            if (nextProps.layoutMode !== this.props.layoutMode) {
                this.layoutChange(nextProps.layoutMode);
            }
            if (nextProps.butterFlyCollected && nextProps.butterFlyCollected !== this.props.butterFlyCollected && nextProps.inFreeGame && nextProps.mysteryCoinList.length > 0) {
                this.playMystrySymbolsAnimations(nextProps.inFreeGame);
            } else if (!this.props.inFreeGame && nextProps.allSpinComplete && nextProps.allSpinComplete !== this.props.allSpinComplete  && nextProps.mysteryCoinList.length > 0) {                
                this.playMystrySymbolsAnimations(nextProps.inFreeGame);
            } else if (nextProps.mysteryCoinList && nextProps.mysteryCoinList !== this.props.mysteryCoinList && nextProps.mysteryCoinList.length) {
                this.initializeObjectInVariable();
                this.setRevealSymbolAnimation(nextProps);
            }           
            return false;
        }
        return true;
    }



    render() {
        let reelContainerX = this.props.data.REEL_CONTAINER_X, reelContainerY = this.props.data.REEL_CONTAINER_Y,
        scalingOfReelContainer = this.props.data.REEL_CONTAINER_SCALE
        if (isMobile) {
            if (window.innerHeight > window.innerWidth) {
                reelContainerX = this.props.data.REEL_CONTAINER_X_IN_PORTRAIT
                reelContainerY = this.props.data.REEL_CONTAINER_Y_IN_PORTRAIT
                scalingOfReelContainer = this.props.data.REEL_CONTAINER_SCALE_IN_PORTRAIT
            }
        }
        return (
            <Container
            ref={i => this.convertSymbolAnimationContainer = i}
            height={100}
            name={`symbolanimationcontainer`}
            x={reelContainerX}
            y={reelContainerY}
            key={`symbolanimationcontainer-${Math.random() * 10000}`} >
            <UIManager id={"convertSymbolAnimationContainer"} name={"convertSymbolAnimationContainer"} type={"Container"}
                app={this.app}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            id={i.id} {...i} app={this.app} configGame={this.props.configGame}
                            scope={this} />
                    )
                }
            </UIManager>
            </Container>)
    }

}

export default withPixiApp(connect(
    (state: Pick<IStore, 'behaviourState' | 'basegameState' | 'revealFeatureState' | 'soundState' | 'winpresentationState' | 'applicationState' | 'freegameState' | 'reelsState'>, ownProps?: any): IStateToProps => ({
        reel_data: state.reelsState.reel_data,
        layoutMode: state.applicationState.layoutMode,
        allSpinComplete: state.reelsState.allSpinComplete,
        inFreeGame: state.freegameState.inFreeGame,
        isPostGoldenFeatureRequired: state.winpresentationState.isPostGoldenFeatureRequired,
        goldenCoinList: state.revealFeatureState.goldenCoinList,
        mysteryCoinList: state.revealFeatureState.mysteryCoinList,
        featureJustFinished: state.freegameState.featureJustFinished,
        winAmount: state.basegameState.winAmount,
        fillpreviuosspindata: state.freegameState.fillpreviuosspindata,
        winningList: state.reelsState.winningList,
        containsFeature: state.revealFeatureState.containsFeature,
        playMysterySymbolAnimFg: state.revealFeatureState.playMysterySymbolAnimFg,
        transformTo: state.revealFeatureState.transformTo,
        butterFlyCollected: state.revealFeatureState.butterFlyCollected,
        resultWinSpinInFG: state.revealFeatureState.resultWinSpinInFG,        
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        updateReelData: (result_reel: any): any => dispatch(reelsActions.updateReelData(result_reel)),
        onUpdateSymbolOnReel: (symbol: any, symbolId: number, randomSymbol: boolean): any => dispatch(symbolActions.setUpdatedSymbol(symbol, symbolId, randomSymbol)),
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        stopSound: (soundName: any): any => dispatch(soundActions.stopSound(soundName)),
        goldenFeatureComplete: (isGoldenFetureComplete: boolean): any => dispatch(featureAction.goldenFeatureComplete(isGoldenFetureComplete)),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        mysPositionStored: (storeMysPosition: any): any => dispatch(featureAction.mysPositionStored(storeMysPosition)),
        mysterySymAnimPlayFg: (playMysterySymbolAnimFg: boolean): any => dispatch(featureAction.mysterySymAnimPlayFg(playMysterySymbolAnimFg)),
        setRevealFeatureStart: (revealFeatureStart: boolean): any => dispatch(featureAction.setRevealFeatureStart(revealFeatureStart)),
        setWinsSucces: (result_reel: any): any => dispatch(winpresentationAction.setWinsSucces(result_reel)),
        flowManagerCalled: (callFlowManager: boolean): any => dispatch(flowManagerAction.flowManagerCalled(callFlowManager)),      
    }))(withConvertSymbolAnimationConfiguration(ConvertSymbolAnimation)));