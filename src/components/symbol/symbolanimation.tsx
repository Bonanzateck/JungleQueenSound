import React, { Component } from "react";
import { symbolActions, soundActions, withSymbolConfiguration } from "@bonanzainteractive/slote_core";
import { UIManager, GSAPTimer, GSAPTween, ItweenProps } from "@bonanzainteractive/core";
import { Container, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { isMobile } from "react-device-detect";

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

class SymbolAnimation extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected symbolImage: any = [];
    protected symbolanimationcontainer: any;
    protected symbolId: number;
    protected rowId: number;
    protected reelId: number;
    protected reel: any;
    protected playAnimation: boolean;
    protected startBlastAnim: boolean;
    protected animationName: string;
    protected SINGLE_SYMBOL_DELAY_IN_ANIM: number;
    protected SHOW_GROUP_WIN_SYMBOL_DELAY: number;
    protected SYMBOL_ANIMATION_GRP_WISE: boolean;
    protected LOOP: boolean;
    private forCleanMask: any[] = [];
    private topSymbolArr: any[] = [];
    private showSymbolsAnmation: boolean = false;
    protected UIManagerRef: any;

    constructor(props: IProps) {
        super(props);
        this.symbolImage = [];
        this.forCleanMask = [];
        this.topSymbolArr = [];
        this.showSymbolsAnmation = false;
        this.app = props.app;
        this.symbolId = props.SYMBOL_ID;
        this.rowId = props.ROW_ID;
        this.reelId = props.REEL_ID;
        this.reel = props.REEL;
        this.playAnimation = false;
        this.startBlastAnim = false;
        this.animationName = "anim";
        this.SINGLE_SYMBOL_DELAY_IN_ANIM = this.props.data.SINGLE_SYMBOL_DELAY_IN_ANIM;
        this.SHOW_GROUP_WIN_SYMBOL_DELAY = this.props.configGame.SHOW_GROUP_WIN_SYMBOL_DELAY;
        this.SYMBOL_ANIMATION_GRP_WISE = this.props.data.SYMBOL_ANIMATION_GRP_WISE;
        this.LOOP = false;
        this.symbolanimationcontainer = {};
        this.state = {
            listOfanimationSymbol: []
        }
        this.init();
        this.UIManagerRef = UIManager.getRef;
        // this.UIManagerRef("symbolanimationcontainer") &&  (this.UIManagerRef("symbolanimationcontainer").x = -10);
        // this.UIManagerRef("symbolanimationcontainer") &&( this.UIManagerRef("symbolanimationcontainer").y = -18);

    }

    init() {
        for (let i = 0; i < this.props.data.symbolsAnimation.length; i++) {
            this.symbolImage.push(this.props.data.symbolsAnimation[i]);
        }
        this.props.setChangeAnimationConfig(this.LOOP, this.SINGLE_SYMBOL_DELAY_IN_ANIM, this.SHOW_GROUP_WIN_SYMBOL_DELAY, this.SYMBOL_ANIMATION_GRP_WISE, 'anim')
        this.bindEvent();
    }

    bindEvent() {
    }

    changeSymbolConfig(nextProps: any) {
        this.SINGLE_SYMBOL_DELAY_IN_ANIM = nextProps.singleSymbolAnimDelay || this.props.data.SINGLE_SYMBOL_DELAY_IN_ANIM;
        this.SHOW_GROUP_WIN_SYMBOL_DELAY = nextProps.groupSymbolAnimDelay || this.props.configGame.SHOW_GROUP_WIN_SYMBOL_DELAY;
        this.SYMBOL_ANIMATION_GRP_WISE = nextProps.symbolAnimGroupWise || this.props.data.SYMBOL_ANIMATION_GRP_WISE;
        this.LOOP = nextProps.animLoop;
        this.animationName = nextProps.animationName;
    }

    onDeletesymbolonreel(symbol: any) {

    }


    onUpdateSymbolAnimationName(animationName: string) {
        this.animationName = animationName;
    }

    playSymbolAnimation(symbol: any) {
        if (symbol && symbol.animationSpeed) {
            symbol.loop = this.LOOP;

            if (symbol.effectType === "zoomIn") {
                this.playZoomInOutAnim(symbol)
            }
            if (symbol.maskHeight) {
                this.addMaskToSymbolAnimations(symbol)
            }
            if (symbol.spineAnimName) {
                symbol.children[0].state.setAnimation(0, symbol.spineAnimName, false);
                symbol.children[0].state.onComplete = () => {
                    //symbol.children[0].parent && symbol.children[0].parent.removeChild(symbol);
                    // symbol && symbol.parent && symbol.parent.removeChild(symbol);
                    // symbol = null;
                }
            } else {
                this.playAnimationWithEffects(symbol)
            }

        }
    }

    playAnimationWithEffects(topSymbol: any) {
        let counter = 0;
        if (topSymbol.effectType === "topLoop") {
            topSymbol.play()
            topSymbol.onComplete = () => {
                counter++
                if (counter === 1) {
                    this.addZoomFadeIn(topSymbol)
                }
                if (counter < 3) {
                    topSymbol.gotoAndPlay(0);
                }
            }
        } else if (topSymbol.effectType == "bgBreak") {
            GSAPTimer.getInstance().addTimer(0.8, () => {
                topSymbol.play();
            });

        } else {
            this.topSymbolArr.push(topSymbol)
            this.hidebackGroundSymbol(topSymbol)
            topSymbol.play();
            topSymbol.onComplete = (e: any, obj: any) => {
                topSymbol.onComplete = null;
                topSymbol.onFrameChange = null;
                topSymbol.onLoop = null;
                if (this.props.configGame['SPIN_TYPE'] === 2) {
                    topSymbol.visible = false;
                    topSymbol.parent && topSymbol.parent.removeChild(topSymbol);
                    topSymbol = null;
                }
            };
        }

    }
    hidebackGroundSymbol(topSymbol: any) {
        let splitName = topSymbol.name.split("_");
        if (this.props.gridSymbols) {
            this.props.gridSymbols.forEach((symbolContainer: any) => {
                if (symbolContainer.reelId === Number(splitName[2]) && symbolContainer.rowId === Number(splitName[3])) {
                    symbolContainer.visible = false;
                }
            });
        }
    }


    addZoomFadeIn(symbolObj: any) {
        let storeSymbolScaleX: any = symbolObj.scale.x
        let storeSymbolScaleY: any = symbolObj.scale.y
        symbolObj && symbolObj.anchor.set(0.5)
        symbolObj.x = symbolObj.x + symbolObj.width / 2
        symbolObj.y = symbolObj.y + symbolObj.height / 2
        if (symbolObj.children.length && symbolObj.children[0].name == "mask") {
            symbolObj.children[0].position.set(-(this.props.data.SYMBOL_WIDTH / 2), -symbolObj.height / 2)
        }

        const tweenProps1: ItweenProps = {
            scaleX: symbolObj.scale.x + 0.3,
            scaleY: symbolObj.scale.y + 0.3,
            duration: 0.3,
            onUpdate: () => {
                if (symbolObj.children[0]) {
                    symbolObj.children[0].position.set(-(this.props.data.SYMBOL_WIDTH / 2), -(symbolObj.height / 2) / symbolObj.scale.y)
                }
            },
            onComplete: () => {
                GSAPTween.getInstance().killTween(symbolObj.scale);
                if (symbolObj) {
                    symbolObj.anchor.set(0)
                    symbolObj.scale.set(storeSymbolScaleX, storeSymbolScaleY)
                    symbolObj.x = symbolObj.x - symbolObj.width / 2
                    symbolObj.y = symbolObj.y - symbolObj.height / 2
                }
            }
        }
        GSAPTween.getInstance().gsapTween(symbolObj.scale, tweenProps1);
        const tweenProps: ItweenProps = {
            alpha: 1,
            duration: 0.2,
            onComplete: () => {
                GSAPTween.getInstance().killTween(symbolObj);
            }
        }
        GSAPTween.getInstance().gsapTween(symbolObj, tweenProps);
    }
    addMaskToSymbolAnimations(symbolObj: any) {
        let symbolHeight: number = symbolObj.maskHeight;
        const animMask = new PIXI.Graphics();
        animMask.beginFill(0xDE3249);
        animMask.name = "mask"
        animMask.drawRect(0, 0, this.props.data.SYMBOL_WIDTH, symbolHeight);
        animMask.endFill();
        symbolObj.children.pop();
        symbolObj.addChild(animMask);
        symbolObj.mask = animMask
        this.forCleanMask.push(animMask);
    }
    playZoomInOutAnim(symbolObj: any) {
        this.addScaleTween(symbolObj);
    }

    addScaleTween(symbolObj: any) {
        symbolObj.anchor.set(0.5)
        symbolObj.x = symbolObj.x + symbolObj.width / 2;
        symbolObj.y = symbolObj.y + symbolObj.height / 2;
        const tweenProps: ItweenProps = {
            scaleX: symbolObj.scale.x + 0.1,
            scaleY: symbolObj.scale.y + 0.1,
            duration: 0.3,
            onUpdate: () => {
            },
            onComplete: () => {
                GSAPTween.getInstance().killTween(symbolObj.scale);
                const tweenProps: ItweenProps = {
                    scaleX: symbolObj.scale.x - 0.1,
                    scaleY: symbolObj.scale.y - 0.1,
                    duration: 0.3,
                    onUpdate: () => {
                    },
                    onComplete: () => {
                        GSAPTween.getInstance().killTween(symbolObj.scale);
                    }
                }
                GSAPTween.getInstance().gsapTween(symbolObj.scale, tweenProps);
            }
        }
        GSAPTween.getInstance().gsapTween(symbolObj.scale, tweenProps);
    }

    componentDidUpdate() {
        if (!this.props.playSymbolAnimation) {
            return;
        }
        if (!this.showSymbolsAnmation) {
            return;
        }
        if (this.SYMBOL_ANIMATION_GRP_WISE) {
            this.props.SymbolAnimationPositions.forEach((data: any, index: number) => {
                GSAPTimer.getInstance().addTimer((1 + index * this.SHOW_GROUP_WIN_SYMBOL_DELAY) / 1000, () => {
                    data.forEach((subdata: any, subindex: any) => {
                        for (let i = 0; i < this.UIManagerRef("symbolanimationcontainer").children.length; i++) {
                            if (this.UIManagerRef("symbolanimationcontainer").children[i].name == "symbol_animation_" + subdata[0] + "_" + subdata[1]) {
                                this.playSymbolAnimation(this.UIManagerRef("symbolanimationcontainer").children[i]);
                            }
                        }
                    });
                });
            });
        }
        else {
            for (let i = 0; i < this.UIManagerRef("symbolanimationcontainer").children.length; i++) {
                if (this.SINGLE_SYMBOL_DELAY_IN_ANIM == 1) {
                    this.playSymbolAnimation(this.UIManagerRef("symbolanimationcontainer").children[i]);
                }
                else {
                    GSAPTimer.getInstance().addTimer((i * 150) / 1000, () => {
                        this.playSymbolAnimation(this.UIManagerRef("symbolanimationcontainer").children[i]);
                    });
                }
            }
        }

    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.winSymbolCoOrdinate.length !== this.props.winSymbolCoOrdinate.length
            || nextProps.reel_data !== this.props.reel_data || nextProps.SymbolAnimationPositions !== this.props.SymbolAnimationPositions
            || nextProps.playSymbolAnimation !== this.props.playSymbolAnimation || nextProps.animLoop !== this.props.animLoop
            || nextProps.resetAnimConfig && nextProps.resetAnimConfig !== this.props.resetAnimConfig || nextProps.singleSymbolAnimDelay !== this.props.singleSymbolAnimDelay
            || nextProps.groupSymbolAnimDelay !== this.props.groupSymbolAnimDelay || nextProps.symbolAnimGroupWise !== this.props.symbolAnimGroupWise
            || nextProps.animLoop !== this.props.animLoop || nextProps.singleSymbolAnimDelay !== this.props.singleSymbolAnimDelay
            || nextProps.groupSymbolAnimDelay !== this.props.groupSymbolAnimDelay || nextProps.symbolAnimGroupWise !== this.props.symbolAnimGroupWise
            || nextProps.animationName != this.props.animationName
            || nextProps.cspStart != this.props.cspStart) {
            let animationInfo: any = [];

            if (nextProps.animLoop !== this.props.animLoop || nextProps.singleSymbolAnimDelay !== this.props.singleSymbolAnimDelay
                || nextProps.groupSymbolAnimDelay !== this.props.groupSymbolAnimDelay || nextProps.symbolAnimGroupWise !== this.props.symbolAnimGroupWise
                || nextProps.animationName !== this.props.animationName
            ) {
                this.changeSymbolConfig(nextProps);

            }
            if (nextProps.resetAnimConfig && nextProps.resetAnimConfig !== this.props.resetAnimConfig) {
                this.SINGLE_SYMBOL_DELAY_IN_ANIM = this.props.data.SINGLE_SYMBOL_DELAY_IN_ANIM;
                this.SHOW_GROUP_WIN_SYMBOL_DELAY = this.props.configGame.SHOW_GROUP_WIN_SYMBOL_DELAY;
                this.SYMBOL_ANIMATION_GRP_WISE = this.props.data.SYMBOL_ANIMATION_GRP_WISE;
                this.animationName = "anim";
                this.props.setChangeAnimationConfig(this.LOOP, this.SINGLE_SYMBOL_DELAY_IN_ANIM, this.SHOW_GROUP_WIN_SYMBOL_DELAY, this.SYMBOL_ANIMATION_GRP_WISE, 'anim')
            }
            if (nextProps.cspStart && nextProps.cspStart !== this.props.cspStart) {
                if (nextProps.winSymbolCoOrdinate.length == 0) {
                    animationInfo = [];
                    this.clearAllChild();
                }
            }

            if (nextProps.animationName !== this.props.animationName) {
                this.onUpdateSymbolAnimationName(nextProps.animationName);
            }
            if (nextProps.winSymbolCoOrdinate.length) {
                if (nextProps.winSymbolCoOrdinate.length !== this.props.winSymbolCoOrdinate.length) {
                    this.showSymbolsAnmation = true;
                    // this.UIManagerRef("UIdarkinglayer") && (this.UIManagerRef("UIdarkinglayer").visible = true);
                    // isMobile && this.UIManagerRef("UIdarkinglayer") && (this.UIManagerRef("UIdarkinglayer").alpha = 0.5) ;
                  
                    this.darkLayer();
                    if (nextProps.winSymbolCoOrdinate.length == 0) {
                        //  animationInfo = [];
                        // this.clearAllChild();
                    }
                    let uniqueWimSymbols: any;
                    nextProps.winSymbolCoOrdinate && nextProps.winSymbolCoOrdinate.length > 0 && (uniqueWimSymbols = this.getUniqueWinSymbolsWithWilds(nextProps.reel_data.wins));
                    nextProps.winSymbolCoOrdinate && nextProps.winSymbolCoOrdinate.length > 0 && nextProps.reel_data.wins.forEach((data: any, index: number) => {

                        data.positions.forEach((innerdata: any, index: number) => {

                            animationInfo.push({
                                symbolRow: innerdata.rowId,
                                symbolColumn: innerdata.reelId,
                                // symbolId: uniqueWimSymbols && uniqueWimSymbols[innerdata.reelId] && uniqueWimSymbols[innerdata.reelId].includes(innerdata.rowId) ? 0 : data.payId  symbolId: uniqueWimSymbols && uniqueWimSymbols[innerdata.reelId] && uniqueWimSymbols[innerdata.reelId].includes(innerdata.rowId) ? 0 : data.payId,,
                                 symbolId: nextProps.reel_data.stopReels[innerdata.reelId][innerdata.rowId],

                            })
                        })
                    });
                    if (nextProps.winSymbolCoOrdinate && nextProps.winSymbolCoOrdinate.length > 0 && nextProps.reel_data.wins.length === 0) {
                        nextProps.winSymbolCoOrdinate.forEach((innerdata: any, index: number) => {
                            animationInfo.push({
                                symbolRow: innerdata.rowId,
                                symbolColumn: innerdata.reelId,
                                symbolId: uniqueWimSymbols && uniqueWimSymbols[innerdata.reelId] && uniqueWimSymbols[innerdata.reelId].includes(innerdata.rowId) ? 0 : 12,
                            })
                        });
                        if (!nextProps.playSymbolAnimation) {
                            this.setState((prevState) => {
                                return {
                                    ...prevState,
                                    listOfanimationSymbol: animationInfo,
                                }
                            })
                        }
                    };
                }
            }
            if (nextProps.playSymbolAnimation) {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        listOfanimationSymbol: animationInfo
                    }
                })
            }
            return false;
        }
        return true;
    }
    darkLayer() {
        let UIdarkinglayer = this.UIManagerRef("UIdarkinglayer");
        UIdarkinglayer.visible = true;
        UIdarkinglayer.alpha = 0;
        const tweenProps: ItweenProps = {
            alpha: 1,
            duration: 0.5,
            ease: "none",
            onComplete: () => {
                this.UIManagerRef(UIdarkinglayer) && (UIdarkinglayer.visible = true);
            }
        }
        GSAPTween.getInstance().gsapTween(UIdarkinglayer, tweenProps);
    }

    private getUniqueWinSymbolsWithWilds(rewards: any) {
        const matchPositionObj: any = { 0: [], 1: [], 2: [], 3: [], 4: [] };
        let wildPositionsArr: any = [];
        if (rewards && rewards[0]) {
            const wildPositions: number[][] = rewards[0].wildPositions;
            if (wildPositions && wildPositions.length > 0) {
                wildPositionsArr = [...wildPositions];
            }
            if (wildPositionsArr && wildPositionsArr.length > 0) {
                wildPositionsArr.forEach((positionsRow: any) => {
                    matchPositionObj[positionsRow[0]].push(positionsRow[1]);
                });
            }
         
            return matchPositionObj;
        }
    }
    private clearAllChild(): void {
        this.UIManagerRef("UIdarkinglayer") && (this.UIManagerRef("UIdarkinglayer").visible = false);
        if (this.UIManagerRef("symbolanimationcontainer")) {
            for (let i = 0; i < this.UIManagerRef("symbolanimationcontainer").children.length; i++) {
                this.UIManagerRef("symbolanimationcontainer").children[i].removeChildren();
            }
            this.UIManagerRef("symbolanimationcontainer").removeChildren();
            this.UIManagerRef("symbolanimationcontainer").visible = false;
            this.symbolanimationcontainer && this.symbolanimationcontainer.COMPONENT && this.symbolanimationcontainer.COMPONENT.removeChildren();
            this.showSymbolsAnmation = false;
        }

        while (this.forCleanMask.length) {
            let pop = this.forCleanMask.pop();
            pop && pop.parent && pop.parent.removeChild();
            pop = null;
        }

        while (this.topSymbolArr.length) {
            let topSymbol = this.topSymbolArr.pop();
            topSymbol.onComplete = null;
            topSymbol.onFrameChange = null;
            topSymbol.onLoop = null;
            topSymbol.visible = false;
            topSymbol.parent && topSymbol.parent.removeChild(topSymbol);
            topSymbol = null;
        }
        this.forCleanMask = [];
        this.topSymbolArr = [];
        this.state = { listOfanimationSymbol: [] }
        this.symbolanimationcontainer = [];

    }



    onCompleteCallBack(e: any, scope: any) {

    }
    getSymbolIndex(symbolId: number) {
        let symbolIndex = -1;
        this.symbolImage.filter((data: any, index: number) => {
            if (data.id == symbolId) {
                symbolIndex = index;
                return index;
            }
        });
        return symbolIndex;
    }

    private removeDuplicateCordinate(listOfanimationSymbol: any): Array<object> {
        let uniqueArr: any[] = [];
        listOfanimationSymbol.forEach((parentelement: any) => {
            let isDuplicateValue: boolean = false;
            uniqueArr.forEach((childelement: any) => {
                if (JSON.stringify(parentelement) === JSON.stringify(childelement)) {
                    isDuplicateValue = true;
                }
            });
            if (!isDuplicateValue) {
                uniqueArr.push(parentelement);
            }
        });
        return uniqueArr;
    }
    render() {
        if (!this.showSymbolsAnmation) {
            return null;
        }
        let { listOfanimationSymbol } = this.state;
        const symbolChild_array: any = [];
        listOfanimationSymbol = this.removeDuplicateCordinate(listOfanimationSymbol);
        listOfanimationSymbol.map((data: any, i: any) => {
            const symbolIndex = this.getSymbolIndex(data.symbolId);
            const symbolContainer = this.symbolImage[symbolIndex];
            symbolContainer && symbolContainer.child.map((data: any, j: any) => {
                if (symbolContainer.child[j].x == undefined) {
                    symbolContainer.child[j].x = 0;
                }
                if (symbolContainer.child[j].y == undefined) {
                    symbolContainer.child[j].y = 0;
                }
                this.LOOP = symbolContainer.loop;
                symbolChild_array.push(
                    <UIManager type="Animation"
                        key={`UIManager-${Math.random() * 10000}`}   {
                        ...symbolContainer.child[j]}
                        playanimname={this.animationName || "anim"}
                        name={"symbol_animation_" + listOfanimationSymbol[i].symbolColumn + "_" + listOfanimationSymbol[i].symbolRow}
                        playing={this.playAnimation} scope={this}
                        x={symbolContainer.child[j].x + symbolContainer.offsetX + listOfanimationSymbol[i].symbolColumn * this.props.REEL_WIDTH + listOfanimationSymbol[i].symbolColumn * this.props.REEL_GAP}
                        reelId={listOfanimationSymbol[i].symbolColumn}
                        rowId={listOfanimationSymbol[i].symbolRow}
                        onComplete={() => {
                            this.onCompleteCallBack(symbolContainer.child[j], this)
                        }}
                        anchor={symbolContainer.child[j].anchor === undefined ? [0, 0] : symbolContainer.child[j].anchor}
                        y={symbolContainer.child[j].y + symbolContainer.offsetY + symbolContainer.height * listOfanimationSymbol[i].symbolRow}
                        app={this.app} configGame={this.props.configGame} visible={true} />
                );
            });
        });
        return (
            <Container
                ref={i => this.symbolanimationcontainer = i}
                height={100}
                name={`symbolanimationcontainer`}
                key={`symbolanimationcontainer-${Math.random() * 10000}`} >
                <UIManager ref={i => this.symbolanimationcontainer = i} type={"Container"} id={"symbolanimationcontainer"}
                    app={this.app}
                    configGame={this.props.configGame}
                    name={"symbolanimationcontainer"} x={this.props.posx}
                    y={this.props.posy} visible={true} scale={this.props.scale === undefined ? 1 : this.props.scale}>
                    {symbolChild_array}
                </UIManager>
            </Container>
        )
    }

}

export default withPixiApp(connect(
    (state: Pick<IStore, 'soundState' | 'symbolState' | 'winpresentationState' | 'reelgridState' | 'gridsState' | 'reelsState' | 'basegameState'>, ownProps?: any): IStateToProps =>
    ({
        SymbolAnimationPositions: state.winpresentationState.SymbolAnimationPositions,
        onComplete: state.symbolState.onComplete,
        animationName: state.symbolState.animationName,
        resetAnimConfig: state.symbolState.resetAnimConfig,
        animLoop: state.symbolState.animLoop,
        singleSymbolAnimDelay: state.symbolState.singleSymbolAnimDelay,
        groupSymbolAnimDelay: state.symbolState.groupSymbolAnimDelay,
        symbolAnimGroupWise: state.symbolState.symbolAnimGroupWise,
        winSymbolCoOrdinate: state.winpresentationState.winSymbolCoOrdinate,
        playSymbolAnimation: state.winpresentationState.playSymbolAnimation,
        cspStart: state.reelsState.cspStart,
        gridSymbols: state.winpresentationState.gridSymbols,
        reel_data: ownProps && ownProps.configGame["SPIN_TYPE"] === 1 && state.gridsState.reel_data || ownProps && ownProps.configGame["SPIN_TYPE"] === 2 && state.reelgridState.reel_data || state.reelsState.reel_data,
        basegamestate: state.basegameState.basegamestate,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setChangeAnimationConfig: (animLoop: any, singleSymbolAnimDelay: any, groupSymbolAnimDelay: any, symbolAnimGroupWise: any, animationname: string): any => dispatch(symbolActions.setChangeAnimationConfig(animLoop, singleSymbolAnimDelay, groupSymbolAnimDelay, symbolAnimGroupWise, animationname)),
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        stopSound: (soundName: any): any => dispatch(soundActions.stopSound(soundName)),

    }))(withSymbolConfiguration(SymbolAnimation)));
