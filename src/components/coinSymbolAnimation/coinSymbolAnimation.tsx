import React, { Component, Ref } from "react";
import { Container, _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withCoinSymbolAnimationConfiguration from "./configuration/withCoinSymbolAnimationConfiguration";
import { GSAPTimer, GSAPTween, ItweenProps, UIManager } from "@bonanzainteractive/core";

import * as PIXI from 'pixi.js';
import { layoutssActions, soundActions, symbolActions } from "@bonanzainteractive/slote_core";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { isMobile } from "react-device-detect";
import { configGame, constant } from "../../slot/data/config";
import { playSoundLoop, stopSoundLoop } from "../../core/sounds/SoundControler";

interface IStore {
    [x: string]: any;
}
interface IProps {
    [x: string]: any;
}
interface IStateToProps {
}

interface IDispatchToProps { }
interface IState {
    [x: string]: any;
}

class CoinSymbolAnimation extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected ui_mode: string;
    protected displayUI: any;
    protected con_pos: any;
    protected coinText: any;
    protected CoinSymbolAnimationContainer: any;
    protected coinData: any = [];
    protected coinTextData: any = [];
    private UIManagerSetText: any = UIManager.setText;
    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }
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
        this.coinText = {};
    }
    bindUI() {
        this.layoutChange(this.props.layoutMode);
    }

    componentDidMount() {
        this.initializeObjectInVariable();
        this.bindUI();
        this.onOrientationChange();
        // this.addTextOnSymbol();
    }
    async addTextOnSymbol(currentLayout: string = "") {
        this.coinText = {};
        const animationCoinInfo: any = [];
        for (const data of this.props.coinQueenWins) {
            for (const innerdata of data.coinWinPositions) {
                animationCoinInfo.push({
                    symbolRow: innerdata.rowId,
                    symbolColumn: innerdata.reelId,
                    symbolId: data.payId,
                    coinNum: data.coinNum
                });
            }
        }
        if (animationCoinInfo.length > 0) {
            const listOfQueenAnimation = this.removeDuplicateCordinate(animationCoinInfo);
            listOfQueenAnimation.map((data: any, i: any) => {
                const sym_name = `${data.symbolColumn}_${data.symbolRow}`;
                this.coinText[sym_name] = data.coinNum;

            });

            //!SECTION
            for await (let i of this.range(0, 5)) {
                const reel = UIManager.getRef("reel" + Number(i));
                reel.children && this.showSymbolTextByReel(reel, i, currentLayout);
            }
        }

    }

    range(start: number, end: number, step = 1) {
        let output = [];
        if (typeof end === 'undefined') {
            end = start;
            start = 0;
        }
        for (let i = start; i < end; i += step) {
            output.push(i);
        }
        return output;
    }
    showSymbolTextByReel(reel: any, rowID: any, currentLayout: string = "") {
        for (let i: number = 0; i < reel.children.length; i++) {
            if (reel.children[i].children && reel.children[i].children[1]) {
                const symbolChild = reel.children[i].children;
                // if(symbolChild && symbolChild[1] && this.coinText[`${rowID}_${i}`] > 0 && constant.configGame.isMountData) {
                if (symbolChild && symbolChild[1] && this.coinText[`${rowID}_${i}`] > 0) {
                    symbolChild[1].text = this.coinText[`${rowID}_${i}`];
                }
            }
        }
    }
    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any,) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        });
        this.addTextOnSymbol(currentLayout);
    }

    componentDidUpdate() {
        this.bindUI();
    }
    onOrientationChange() { }

    private startCoinAnimation(nextProps: any) {
        const resolve = this.props.reolve;
        const animationCoinInfo: any = [];
        for (const data of nextProps.coinQueenWins) {
            for (const innerdata of data.coinWinPositions) {
                animationCoinInfo.push({
                    symbolRow: innerdata.rowId,
                    symbolColumn: innerdata.reelId,
                    symbolId: 14, /*uniqueWimSymbols && uniqueWimSymbols[innerdata.reelId] && uniqueWimSymbols[innerdata.reelId].includes(innerdata.rowId)? 0: data.payId*/
                    coinNum: data.coinNum
                });
            }
        }

        //!SECTION
        if (animationCoinInfo.length > 0) {
            this.coinText = {};
            this.con_pos = [];
            const listOfQueenAnimation = this.removeDuplicateCordinate(animationCoinInfo);
            this.darkLayer();
            listOfQueenAnimation.map((data: any, i: any) => {
                const sym_name = `ani_coin${data.symbolColumn}_${data.symbolRow}`;
                this.con_pos.push(sym_name);
                this.coinText[sym_name] = data.coinNum;
                // if (this.props.winningList.length > 0) {
                const coins = UIManager.getRef(`coin_symbol${data.symbolColumn}_${data.symbolRow}`);
                const coinsText = UIManager.getRef(`coin_symbol${data.symbolColumn}_${data.symbolRow}_text`);
                this.coinData.push(coins);
                this.coinTextData.push(coinsText);
                GSAPTimer.getInstance().addTimer(1.2, () => {
                    if (coinsText) {
                        coinsText.text = data.coinNum;
                        coinsText.visible = true;
                        this.setTextWidth(coinsText);
                    }
                });

                this.coinData.forEach((data: any, i: any) => {
                    GSAPTimer.getInstance().addTimer(1.2, () => {
                        data.visible = true;
                        if (isMobile && window.innerHeight > window.innerWidth) {
                            data.width = 210;
                            data.height = 210;
                        }
                    });
                })
                // }

            });
            this.con_pos.length > 0 && this.playQueenSymbolsAnimations(nextProps, resolve);
        } else {
            // nextProps.resolve.data.pr('success');
        }
    }

    darkLayer() {
        if (this.props.mysteryCoinList.length > 0 && this.props.winSymbolCoOrdinate.length === 0) {
            let UIdarkinglayer = UIManager.getRef("UIdarkinglayer");
            UIdarkinglayer.visible = true;
            UIdarkinglayer.alpha = 0;
            const tweenProps: ItweenProps = {
                alpha: 1,
                duration: 0.5,
                ease: "none",
                onComplete: () => {
                    UIManager.getRef(UIdarkinglayer) && (UIdarkinglayer.visible = true);
                }
            }
            GSAPTween.getInstance().gsapTween(UIdarkinglayer, tweenProps);
        }
    }

    private removeDuplicateCordinate(listOfQueenAnimation: any): Array<object> {
        let uniqueArr: any[] = [];
        listOfQueenAnimation.forEach((parentelement: any) => {
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

    private playQueenSymbolsAnimations(nextProps: any, resolve: any): any {
        if (this.con_pos.length > 0) {
            return new Promise<void>(() => {
                let i = 1;
                this.con_pos.forEach((element: any) => {
                    UIManager.getRef(element).visible = true;
                    // UIManager.getRef(element).alpha = 1;
                    //queen is converted in to coin
                    // (i=== 1) &&  this.props.playSound([{ name: "Golden_coin_Spinning_audio", loop: false, vol: 1 }]);
                    // (i === 1) && this.props.playSound([{ name: "jq_sx_golden_coin_cash_reveal", loop: false, vol: 1 }]);
                    if (!this.props.allSoundSFXStop) {
                        (i === 1) && playSoundLoop("jq_sx_golden_coin_cash_reveal", "jq_sx_golden_coin_cash_reveal", false);
                    }
                    UIManager.getRef(element).children[0].state.setAnimation(0, "animation", false);
                    isMobile && (window.innerHeight > window.innerWidth) && UIManager.getRef(element).scale.set(0.9);
                    // if(i==1){
                    //     GSAPTimer.getInstance().addTimer(1, () => {
                    //         this.props.playSound([{ name: "Coin_Prize_Collection_audio", loop: false, vol: 1 }]);   
                    //     });
                    // }
                    GSAPTimer.getInstance().addTimer(1, () => {
                        this.addCoinTxt(element);
                    });
                    UIManager.getRef(element).children[0].state.onComplete = () => {
                        // this.props.stopSound([{ name: "jq_sx_golden_coin_cash_reveal" }]);
                        stopSoundLoop("jq_sx_golden_coin_cash_reveal");
                        // UIManager.getRef(element).alpha = 0;
                        // UIManager.getRef(element).visible = false;
                        if (this.con_pos.length === i) {
                            nextProps.resolve.data.pr('success');
                        }
                        i++;
                    }
                });
            });
        }
    }

    addCoinTxt(symbol: any) {
        const np = symbol.replace("ani_coin", "");
        const ep = np.split("_");
        if (UIManager.getRef("reel" + Number(ep[0]))) {
            let reelGrid = UIManager.getRef("reel" + Number(ep[0]));
            let symbolContainer: any = this.getSymbolByReelID(reelGrid, Number(ep[1]) + Number(1));
            if (symbolContainer) {
                let ypos = symbolContainer.y;
                this.props.onUpdateSymbolOnReel(symbolContainer, 15, false);
                symbolContainer.y = ypos;
                const symbolChild = symbolContainer.children;
                if (symbolChild && symbolChild[1]) {
                    symbolChild[1].text = this.coinText[symbol];
                    this.setTextWidth(symbolChild[1]);
                }
            }
        }
    }

    setTextWidth(text: any) {
        const amountNumber = parseFloat(text._text.slice(1).replace(/,/g, ""));
        if (amountNumber < 10) {
            text._fontSize = 80;
        } else if (amountNumber < 99) {
            text._fontSize = 75;
        } else if (amountNumber < 999) {
            text._fontSize = 65;
        } else if (amountNumber < 9999) {
            text._fontSize = 55;
        } else if (amountNumber < 99999) {
            text._fontSize = 50;
        } else if (amountNumber < 999999) {
            text._fontSize = 40;
        } else if (amountNumber < 9999999) {
            text._fontSize = 35;
        } else {
            text._fontSize = 25;
        }
    }

    getSymbolByReelID(reel: any, rowID: any) {
        for (let i: number = 0; i < reel.children.length; i++) {
            if (reel.children[i].rowId === rowID) {
                return reel.children[i];
            }
        }
    }

    ///+++++++++++++++++++++++++++++++++++++++++++++++++++** END GOLDEN FEATURE ++++++++++++++++++++++++++++++++++++++++++
    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode);
            return true;
        }
        if (nextProps.startQueenAnimation && (nextProps.layoutMode !== this.props.layoutMode || nextProps.startQueenAnimation !== this.props.startQueenAnimation) && nextProps.coinQueenWins.length > 0) {
            this.props.setQueenWinAnimationActivate(false);
            this.startCoinAnimation(nextProps);
            return false;
        } else if (nextProps.coinQueenWins.length === 0) {
            nextProps.resolve && nextProps.resolve.data && nextProps.resolve.data.pr('done');
        }
        if (nextProps.cspStart && nextProps.cspStart !== this.props.cspStart) {
            this.coinData.forEach((data: any, i: any) => {
                data.visible = false;
            });
            this.coinTextData.forEach((data: any, i: any) => {
                data.visible = false;
            });
            this.coinData = [];
            this.coinTextData = [];
            UIManager.getRef("collecter_bg_feature").visible = false;

        }
        return false;
    }



    render() {
        return (
            <Container
                ref={i => this.CoinSymbolAnimationContainer = i}
                height={100}
                name={`coinsymbolanimationcontainer`}
                key={`coinsymbolanimationcontainer-${Math.random() * 10000}`} >
                <UIManager id={"CoinSymbolAnimationContainer"} name={"CoinSymbolAnimationContainer"} type={"Container"}
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
    (state: Pick<IStore, 'MultiplierState' | 'behaviourState' | 'basegameState' | 'winpresentationState' | 'revealFeatureState' | 'soundState' | 'winpresentationState' | 'applicationState' | 'freegameState' | 'reelsState'>, ownProps?: any): IStateToProps => ({
        layoutMode: state.applicationState.layoutMode,
        startQueenAnimation: state.behaviourState.startQueenAnimation,
        coinQueenWins: state.behaviourState.coinQueenWins,
        resolve: state.behaviourState.resolve,
        currentBetIndex: state.basegameState.currentBetIndex,
        betList: state.basegameState.betList,
        cspStart: state.reelsState.cspStart,
        winningList: state.reelsState.winningList,
        freeSpinRewards: state.MultiplierState.freeSpinRewards,
        inFreeGame: state.freegameState.inFreeGame,
        mysteryCoinList: state.revealFeatureState.mysteryCoinList,
        winSymbolCoOrdinate: state.winpresentationState.winSymbolCoOrdinate,
        allSoundSFXStop: state.soundState.allSoundSFXStop,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        onUpdateSymbolOnReel: (symbol: any, symbolId: number, randomSymbol: boolean): any => dispatch(symbolActions.setUpdatedSymbol(symbol, symbolId, randomSymbol)),
        setQueenWinAnimationActivate: (startQueenAnimation: boolean): any => dispatch(behaviourAction.setQueenWinAnimationActivate(startQueenAnimation)),
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        stopSound: (soundName: any): any => dispatch(soundActions.stopSound(soundName)),
    }))(withCoinSymbolAnimationConfiguration(CoinSymbolAnimation)));
