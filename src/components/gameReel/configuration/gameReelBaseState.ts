import React, { Component } from "react";
import * as PIXI from "pixi.js";
import { UIManager,GSAPTimer } from "@bonanzainteractive/core";
import { IStateToProps } from "../interface/IstateProps";
import { constant } from "../../../slot/data/config";
interface IDispatchToProps {
    [x: string]: any;
}
interface IProps extends IStateToProps {
    [x: string]: any;
}
interface IState {
    symbolList: any
    stickysymbolList: any
}

class GameReelBaseState extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected subReelContainer: any;
    protected eventEmitter: any;
    protected REEL_STOPS: Array<Array<number>>;
    protected tweening: any;
    protected serverResponseReceived: Boolean;
    protected updateSymbol: Boolean;
    protected reelRunning: Boolean;
    protected blurReel: Boolean;
    protected spinMidCalled: Boolean;
    protected minimummSpinTimeComplete: Boolean;
    protected SPIN_MOVE_VALUE: number;
    protected totalCascadeCount: number;
    protected gamePause: boolean;
    protected tickupRequest: any;
    stoppingReelSequence: any;
    protected symbolHeightMappingList: any = [];

    protected stopReelIndexByForce: number[] = [];
    protected countStopReelByIndex: number[] = []
    protected customSpinSymbolCount: number[] = [];
    protected count: number = 0;
    protected isSlamClicked: boolean = false;

    //new var
    protected reelStripSymbolIndex: number;
    protected symbolInViewCount: number;
    protected spinSymbolLength: number;
    protected anticipationSymbolLength: number;
    protected reelstate: number;
    protected fps: number;
    protected fpsInterval: number;
    protected frameCount: number;
    protected startTime: number;
    protected now: number;
    protected stopTick: boolean;
    protected then: number;
    protected spinSpeed: number;
    protected anticipationSpinSpeed: number;
    protected elapsed: number;
    protected yOffset: number;
    protected spinSymbolCount: number;
    protected reelStopDifference: number;
    protected totalSpinSymbolLength: number;
    protected turbospinSymbolLength: number;
    protected symbolNumberOffset: number;
    protected symbolsBetweenStop: number;
    protected windSpeed: number;
    protected windHeight: number;
    protected wobbleSpeed: number;
    protected currentWobbleHeight: number;
    protected wobbleHeight: number;
    protected juststoppedReelId: number;
    protected countStopReel: number;
    protected stopable: any;
    protected spinning: boolean;
    protected enabled: boolean;
    protected symbols: any;
    protected symbolsToDisplay: any;
    protected popSymbols: any;
    protected popDropSymbols: any;
    protected setSymbolFinalPosition: boolean;
    protected forceSpinStopReels: boolean;
    protected reelShouldMove: boolean;
    protected responseReceivedAfterBlast: boolean;
    constructor(props: IProps) {
        super(props);
        this.reelstate = GameReelBaseState.REEL_STATE_STATIC;
        // this.init();
        this.app = props.app;
        this.REEL_STOPS = [];
        this.tweening = [];
        this.popSymbols = [];
        this.popDropSymbols = [];
        this.gamePause = false;
        this.stoppingReelSequence = [0, 1, 2, 3, 4, 5];
        this.minimummSpinTimeComplete = false;
        this.spinMidCalled = false;
        this.serverResponseReceived = false;
        this.updateSymbol = false;
        this.reelRunning = false;
        this.responseReceivedAfterBlast = false;
        this.blurReel = false;
        this.forceSpinStopReels = false;
        this.setSymbolFinalPosition = false;
        this.reelShouldMove = false;
        this.SPIN_MOVE_VALUE = 0;
        this.countStopReel = 0;
        this.subReelContainer = {};
        this.totalCascadeCount = this.props.totalCascadeCount;

        //new var
        this.reelStripSymbolIndex = 0;
        this.wobbleHeight = this.props.data.WOBBLE_HEIGHT[this.props.ReelIndex];
        this.wobbleSpeed = this.props.data.WOBBLE_SPEED[this.props.ReelIndex];
        this.currentWobbleHeight = this.props.data.CURRENT_WOBBLE_HEIGHT[this.props.ReelIndex];
        this.windSpeed = this.props.data.WIND_SPEED[this.props.ReelIndex];
        this.windHeight = this.props.data.WIND_HEIGHT[this.props.ReelIndex];
        this.symbolNumberOffset = this.props.data.SYMBOL_NUMBER_OFFSET[this.props.ReelIndex];
        this.reelStopDifference = this.props.data.REEL_STOP_DIFFERENCE[this.props.ReelIndex];
        this.spinSymbolCount = this.props.data.SPIN_SYMBOL_COUNT[this.props.ReelIndex];
        this.symbolInViewCount = this.props.data.SYMBOL_IN_VIEW_COUNT[this.props.ReelIndex];
        this.spinSymbolLength = this.props.data.SPIN_SYMBOL_LENGTH[this.props.ReelIndex];
        this.turbospinSymbolLength = this.props.data.TURBO_SPIN_SYMBOL_LENGTH[this.props.ReelIndex];
        this.anticipationSymbolLength = this.props.data.ANTICIPATION_SYMBOL_LENGTH[this.props.ReelIndex];
        // this.reelstate = Reels.REEL_STATE_STATIC;
        this.symbols = [];
        this.fps = this.props.data.FPS[this.props.ReelIndex];
        this.fpsInterval = this.props.data.FPS_INTERVAL[this.props.ReelIndex];
        this.frameCount = this.props.data.FRAME_COUNT[this.props.ReelIndex];
        this.startTime = this.props.data.START_TIME[this.props.ReelIndex];
        this.now = this.props.data.NOW[this.props.ReelIndex];
        this.spinSpeed = this.props.data.SPIN_SPEED[this.props.ReelIndex] / 2;
        this.anticipationSpinSpeed = this.props.data.ANTICIPATION_SPIN_SPEED[this.props.ReelIndex] / 2;
        this.then = this.props.data.THEN[this.props.ReelIndex];
        this.yOffset = this.props.data.Y_OFFSET[this.props.ReelIndex];

        this.stopTick = this.props.data.STOP_TICK[this.props.ReelIndex];
        this.elapsed = this.props.data.ELAPSED[this.props.ReelIndex];
        this.symbolsToDisplay = [];
        this.stopable = this.props.data.STOPABLE;
        this.juststoppedReelId = 0;
        this.totalSpinSymbolLength = this.spinSymbolLength;
        this.symbolsBetweenStop = this.props.data.SYMBOLS_BETWEEN_STOP[this.props.ReelIndex];
        this.spinning = this.props.data.SPINNING[this.props.ReelIndex];
        this.enabled = this.props.data.ENABLED[this.props.ReelIndex];
        this.state = {
            symbolList: [],
            stickysymbolList: []
        };
        this.symbolHeightMappingList = this.props.data.SYMBOL_HEIGHT_MAPPING_LIST;
        this.init();
    }

    init() {
        this.bindEvent();
        this.props.setSpinType();
        this.onInitializeReelStop();
    }

    onInitializeReelStop() {
        this.REEL_STOPS = this.props.reel_data.stopReels;
    }


    destroy() { }

    bindEvent() { }

    onGameResume() {
        this.gamePause = false;
        this.then = performance.now();
    }

    static get REEL_STATE_STATIC() {
        return 0;
    }

    static get REEL_STATE_WINDING() {
        return 1;
    }

    static get REEL_STATE_SPINNING() {
        return 2;
    }

    static get REEL_STATE_WOBBLE_UP() {
        return 3;
    }

    static get REEL_STATE_WOBBLE_DOWN() {
        return 4;
    }

    static get REEL_STATE_NUDGE() {
        return 5;
    }

    static get REEL_STATE_NUDGE_WOBBLE_UP() {
        return 6;
    }

    static get REEL_STATE_NUDGE_WOBBLE_DOWN() {
        return 7;
    }

    static get REEL_STATE_WINDING_BACKWARDS() {
        return 8;
    }

    static get REEL_STATE_SPINNING_BACKWARDS() {
        return 9;
    }

    static get REEL_STATE_WOBBLE_UP_BACKWARDS() {
        return 10;
    }

    static get REEL_STATE_WOBBLE_DOWN_BACKWARDS() {
        return 11;
    }

    protected resetAll(): void {
        this.fpsInterval = 0
        this.then = 0
        this.startTime = 0;
        this.now = 0;
        this.elapsed = 0;
        this.forceSpinStopReels = false;
        this.customSpinSymbolCount = [0, 0, 0, 0, 0, 0, 0];
        this.REEL_STOPS = [];
        this.tweening = [];
        this.popSymbols = [];
        this.popDropSymbols = [];
        this.gamePause = false;
        this.stoppingReelSequence = [0, 1, 2, 3, 4, 5];
        this.props.data.REELSNOSTOP = -1;
        this.minimummSpinTimeComplete = false;
        this.spinMidCalled = false;
        this.serverResponseReceived = false;
        this.updateSymbol = false;
        this.reelRunning = false;
        this.responseReceivedAfterBlast = false;
        this.blurReel = false;
        this.forceSpinStopReels = false;
        this.setSymbolFinalPosition = false;
        this.reelShouldMove = false;
        this.SPIN_MOVE_VALUE = 0;
        this.countStopReelByIndex = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
        this.stopReelIndexByForce = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.customSpinSymbolCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.props.data.REELSNO = 0;
        this.props.data.REELSNOSLAP = 0;
        this.subReelContainer = {};
        this.totalCascadeCount = this.props.totalCascadeCount;
        this.reelStripSymbolIndex = 0;
        this.isSlamClicked = false;
    }

    setLandingAnimationVisibility(reelId: number) {
        for (let i = 0; i < UIManager.getRef("landingsymbolanimationcontainer").children.length; i++) {
            this.props.landingAnimPositions.forEach((position: any, index: any) => {
                if (this.props.landingAnimPositions[index].reelId === reelId) {
                    let landingContainer = UIManager.getRef("landingsymbolanimationcontainer").children[i];
                    let reel = this.props.landingAnimPositions[index].reelId;
                    let row = this.props.landingAnimPositions[index].rowId
                    if (landingContainer.name === `landing_animation_${reel}_${row}`) {
                        landingContainer.visible = true;
                        GSAPTimer.getInstance().addTimer((this.props.configGame.LANDING_ANIM_HIDE_DURATION), () => {
                            landingContainer.visible = false;
                        });
                    }
                }
            });
        }
    }

    protected checkScatterSymbolsForTeaser(): boolean {
        let scaterFound: boolean = false;
        if (!this.props.inFreeGame) {
            if (Number(this.REEL_STOPS[0][0]) === constant.configGame.SCATTER || Number(this.REEL_STOPS[0][1]) === constant.configGame.SCATTER || Number(this.REEL_STOPS[0][2]) === constant.configGame.SCATTER) {
                scaterFound = true;
            }
            if (Number(this.REEL_STOPS[2][0]) === constant.configGame.SCATTER || Number(this.REEL_STOPS[2][1]) === constant.configGame.SCATTER || Number(this.REEL_STOPS[2][2]) === constant.configGame.SCATTER) {
                scaterFound = true;
            }
            if (Number(this.REEL_STOPS[4][0]) === constant.configGame.SCATTER || Number(this.REEL_STOPS[4][1]) === constant.configGame.SCATTER || Number(this.REEL_STOPS[4][2]) === constant.configGame.SCATTER) {
                scaterFound = true;
            }
            if (Number(this.REEL_STOPS[4][0]) === constant.configGame.WILD || Number(this.REEL_STOPS[4][1]) === constant.configGame.WILD || Number(this.REEL_STOPS[4][2]) === constant.configGame.WILD) {
                scaterFound = true;
            }


        }
        return scaterFound;
    }


    compare_prop_y(a: any, b: any) {
        // a should come before b in the sorted order
        if (a.COMPONENT.y < b.COMPONENT.y) {
            return -1;
            // a should come after b in the sorted order
        } else if (a.COMPONENT.y > b.COMPONENT.y) {
            return 1;
            // a and b are the same
        } else {
            return 0;
        }
    }



}


export { GameReelBaseState };
