import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withCanvasMobilePaytablePortraitConfiguration from "./configuration/withCanvasMobilePaytablePortraitConfiguration";
import { UIManager ,GSAPTimer,CURRENCY} from "@bonanzainteractive/core";
import { isMobile } from "react-device-detect";
import { layoutssActions } from "@bonanzainteractive/slote_core";


interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}

interface IStateToProps {
    layoutMode: string;
    showPaytable: boolean;
    currentBetIndex: number;
    betList: any;
    paytablePayoutArray: any;
    storeWinningSymbolData: any;
    showPaytableMobile: boolean;
}

interface IDispatchToProps {

}

interface IState {
    [x: string]: any;
}

interface Symbol {
    symbol: string
}

class CanvasMobilePaytablePortrait extends Component<IProps, IState>
{
    protected app: PIXI.Application;
    protected canvasMobilePaytablePortraitContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: Object[] = [];
    protected boxWidth = 0;
    protected boxHeight = 0;
    protected symbolsList: Array<Symbol> = [];
    private UIManagerRef: any;
    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            uiElements: [],
            lang: "en",
        }
        this.canvasMobilePaytablePortraitContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }
        this.symbolsList = [
            { symbol: "HV1" },
            { symbol: "HV2" },
            { symbol: "HV3" },
            { symbol: "HV4" },
            { symbol: "LV1" },
            { symbol: "LV2" },
            { symbol: "LV3" },
            { symbol: "LV4" },
            { symbol: "LV5" },
            { symbol: "LV6" },
        ]
        this.displayUI = this.props.data.COMPONENTS.filter(this.checkUiMode.bind(this));
        this.UIManagerRef = UIManager.getRef;
    }

    checkUiMode(uimodeobj: any) {
        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both";
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }


    componentDidMount() {
        this.layoutChange(this.props.layoutMode);
        this.orientationChange(this.props);
    }

    layoutChange(currentLayout: string) {
        this.displayUI.forEach((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        });
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.paytablePayoutArray !== this.props.paytablePayoutArray) {
            return false;
        }
        if (nextProps.showPaytableMobile !== this.props.showPaytableMobile) {
            this.orientationChange(nextProps);
            return false;
        }
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode);
            this.orientationChange(nextProps);
            return false;
        }
        if (nextProps.showPaytable !== this.props.showPaytable) {
            return true;
        }
        if (nextProps.currentBetIndex !== this.props.currentBetIndex) {
            return true
        }
        return false;
    }

    handleEvent = (e: any) => {
    }

    componentDidUpdate() {
        if (isMobile) {
            this.addScrollBar();
            this.setPayoutsValue();
            for (let i = 0; i < this.props.storeWinningSymbolData.length; i++) {
                this.setSymbolHighlighted(this.props.storeWinningSymbolData[i]);
            }
            this.orientationChange(this.props);
            GSAPTimer.getInstance().addTimer(20 / 1000, () => {
                this.UIManagerRef("portrait_paytableContent") && (this.UIManagerRef("portrait_paytableContent").visible = false);
            });

        }
    }

    setSymbolHighlighted(arr: any) {
        this.UIManagerRef("portrait_mob_graphic_" + arr[0] + "_" + arr[1]) && (this.UIManagerRef("portrait_mob_graphic_" + arr[0] + "_" + arr[1]).visible = true);
    }

    setPayoutsValue() {
        let bet = this.props.betList[this.props.currentBetIndex];
        let symbolId: string;
        this.symbolsList.map((innerData: Symbol) => {
            let selectedPayout = this.props.paytablePayoutArray.filter(
                function (data: any) {
                    return data.betStep === bet;
                }
            )
            symbolId = innerData.symbol;
        })
    }

    orientationChange(props: any) {
        if (props.showPaytableMobile) {
            if (window.innerWidth < window.innerHeight) {
                this.UIManagerRef("landscape_paytableContent") && (this.UIManagerRef("landscape_paytableContent").visible = false);
                this.UIManagerRef("portrait_paytableContent") && (this.UIManagerRef("portrait_paytableContent").visible = true);
                this.UIManagerRef("gameScrollComponentMob_landscape") && (this.UIManagerRef("gameScrollComponentMob_landscape").visible = false);
                this.UIManagerRef("gameScrollComponentMob_portrait") && (this.UIManagerRef("gameScrollComponentMob_portrait").visible = true);
            } else {
                this.UIManagerRef("gameScrollComponentMob_landscape") && (this.UIManagerRef("gameScrollComponentMob_landscape").visible = true);
                this.UIManagerRef("gameScrollComponentMob_portrait") && (this.UIManagerRef("gameScrollComponentMob_portrait").visible = false);
                this.UIManagerRef("landscape_paytableContent") && (this.UIManagerRef("landscape_paytableContent").visible = true);
                this.UIManagerRef("portrait_paytableContent") && (this.UIManagerRef("portrait_paytableContent").visible = false);
            }
        }
        else {
            this.UIManagerRef("gameScrollComponentMob_landscape") && (this.UIManagerRef("gameScrollComponentMob_landscape").visible = false);
            this.UIManagerRef("gameScrollComponentMob_portrait") && (this.UIManagerRef("gameScrollComponentMob_portrait").visible = false);
            this.UIManagerRef("landscape_paytableContent") && (this.UIManagerRef("landscape_paytableContent").visible = false);
            this.UIManagerRef("portrait_paytableContent") && (this.UIManagerRef("portrait_paytableContent").visible = false);
        }
    }

    addScrollBar() {
        // let portrait_paytableContent: any = this.UIManagerRef("portrait_paytableContent");
        // let gameScrollComponent: any = this.UIManagerRef("gameScrollComponentMob_portrait");
        // const Scrollbox = require('pixi-scrollbox').Scrollbox;
        // const scrollbox = new Scrollbox({ boxWidth: 1050, boxHeight: 1500 })
        // scrollbox.x = 0;
        // scrollbox.y = 200;
        // gameScrollComponent && gameScrollComponent.addChild(scrollbox);
        // const sprite = scrollbox.content.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
        // sprite.width = 1500;
        // sprite.height = 3000;
        // isMobile && (sprite.alpha = 0.01);
        // sprite.tint = 0x131313;
        // scrollbox.dragScroll = true;
        // scrollbox.overflowX = "none";
        // scrollbox.content.addChild(portrait_paytableContent);
        // scrollbox.update();
    }

    render() {
        if (!this.props.showPaytable) {
            return (<></>)
        }

        return (
            <UIManager id={"canvasMobilePaytablePortraitContainer"} type={"Container"} ref={i => this.canvasMobilePaytablePortraitContainer = i}
                configGame={this.props.configGame}
                app={this.app}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            id={i.id} {...i} app={this.app} configGame={this.props.configGame}
                            ClickHandler={this.handleEvent} scope={this} />
                    )
                }
            </UIManager>
        )
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'applicationState' | 'paytableState' | 'basegameState' | 'paytableBMState' | 'behaviourState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        showPaytable: state.paytableState.showPaytable,
        currentBetIndex: state.basegameState.currentBetIndex,
        betList: state.basegameState.betList,
        paytablePayoutArray: state.paytableBMState.paytablePayoutArray,
        storeWinningSymbolData: state.behaviourState.storeWinningSymbolData,
        showPaytableMobile: state.paytableBMState.showPaytableMobile,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
    }))(withCanvasMobilePaytablePortraitConfiguration(CanvasMobilePaytablePortrait)));
