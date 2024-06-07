import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { UIManager } from "@bonanzainteractive/core";
import { actions as paytableGofActions } from "./../../gamereducer/paytableBMReducer";
import { buttonActions, paytableActions, withPaytableConfiguration } from "@bonanzainteractive/slote_core";
import { isMobile } from "react-device-detect";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";


interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}

interface IStateToProps {
    showPaytable: boolean;
    carouselStart: boolean;
    paytablePayoutArray: any;
    currentBetIndex: number;
    betList: any;
    storeWinningSymbolData: any;
}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class DesktopPaytable extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected paytable_Container: _ReactPixi.IContainer | Ref<any>;
    // private alllanguage: Ilanguage;
    protected slideWidth: number;
    protected slidesContainerArray: any;
    protected totalCount: number;
    protected carouselDot1: any;
    protected carouselDotDisable1: any;
    protected carouselDot2: any;
    protected carouselDotDisable2: any;
    protected carouselDot3: any;
    protected carouselDotDisable3: any;
    protected carouselDot4: any;
    protected carouselDotDisable4: any;
    protected carouselDot5: any;
    protected carouselDotDisable5: any;
    protected carouselDot6: any;
    protected carouselDotDisable6: any;
    protected ui_mode: string;
    protected displayUI: Object[] = [];
    protected baseContainerX: number = 100;
    protected baseContainerY: number = 50;
    protected baseContainerWidth: number = 970;
    protected baseContainerHeight: number = 680;
    private minFullHDWidth: number = 1024;
    private HDReadyWidth: number = 1280;
    private fullHDWidth: number = 1920;
    private minFullHDPxRatio: number = 2;
    private constantT1: number = 100;
    private canvasBgImagePage: string = "";
    protected symbolsList: any = [];
    private UIManagerRef: any;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.slideWidth = 1280;
        this.slidesContainerArray = [];
        this.totalCount = 0;
        // this.alllanguage = alllanguage;
        this.paytable_Container = {};
        this.state = {
            uiElements: [],
            lang: "en",
            currentIndex: 1,
            totalSlides: 9,
            leftIndicator: false,
            rightIndicator: false,
            [this.carouselDot1]: { enable: true },

        }
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }
        this.displayUI = this.props.child.filter(this.checkUiMode.bind(this));
        this.initializingCarousal();
        this.chooseAssets();
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

    //this method will initialize carousal state according to the page number in the beginning
    initializingCarousal() {
        this.displayUI.map((data: any) => {
            switch (data.name) {
                case "dotEnable1":
                    this.carouselDot1 = data;
                    return;
                case "dotDisable1":
                    this.carouselDotDisable1 = data;
                    return;
                case "dotEnable2":
                    this.carouselDot2 = data;
                    return;
                case "dotDisable2":
                    this.carouselDotDisable2 = data;
                    return;
                case "dotEnable3":
                    this.carouselDot3 = data;
                    return;
                case "dotDisable3":
                    this.carouselDotDisable3 = data;
                    return;
                case "dotEnable4":
                    this.carouselDot4 = data;
                    return;
                case "dotDisable4":
                    this.carouselDotDisable4 = data;
                    return;
                case "dotEnable5":
                    this.carouselDot5 = data;
                    return;
                case "dotDisable5":
                    this.carouselDotDisable5 = data;
                    return;
                case "dotEnable6":
                    this.carouselDot6 = data;
                    return;
                case "dotDisable6":
                    this.carouselDotDisable6 = data;
                    return;
                default:
                    return;
            }

        })

    }

    //this function will move slide to the left
    moveSlideLeft(currentIndexState: number) {
        let { totalSlides } = this.state;
        let currentIndex = currentIndexState;
        let displayInd = -1;

        let arrayMovingSlide = [];
        for (let i = 0; i < this.slidesContainerArray.length; i++) {
            arrayMovingSlide.push(this.slidesContainerArray[i]);
        }
        displayInd = arrayMovingSlide.length - currentIndex + 1;
        this.leftRotatebyOne(arrayMovingSlide, displayInd, arrayMovingSlide.length)
        for (let i = 1; i <= totalSlides; i++) {
            let slideObj = this.UIManagerRef("slide_Container" + i);
            slideObj.x = arrayMovingSlide[i - 1];

        }
    }


    carouselChanging() {
        let name;
        this.displayUI.map((data: any) => {
            name = data.name;
            if (name.startsWith("dotEnable")) {
                data.visible = false;
            }
            if (name.startsWith("dotDisable")) {
                data.visible = true;
            }
            if (data.name === "dotEnable" + this.state.currentIndex) {
                data.visible = true;
            }
            if (data.name === "dotDisable" + this.state.currentIndex) {
                data.visible = false;
            }
        })
    }

    carouselDot() {
        this.carouselChanging();
        this.setState((prevState) => {
            return {
                ...prevState,
                [this.carouselDot1]: { enable: false },

            }
        })

    }


    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.paytablePayoutArray !== this.props.paytablePayoutArray) {
            return false;

        }
        if (nextProps.showPaytable && nextProps.showPaytable !== this.props.showPaytable) {
            (document.getElementsByClassName("canvasBgImage")[0] as any).style.display = 'none';
            this.props.startCarousel();
            // this.moveScrollDown()
        }

        // if (nextProps.carouselStart && nextProps.carouselStart !== this.props.carouselStart) {
        //     // !isMobile && this.initialPlacedSlide();
        // }
        if (nextState.currentIndex !== this.state.currentIndex) {
            this.moveSlideLeft(nextState.currentIndex);
        }
        return true;
    }

    chooseAssets() {
        let screen = window.screen;
        let isFullHD = false;
        if (((screen.width >= this.minFullHDWidth || screen.height >= this.minFullHDWidth) && window.devicePixelRatio >= this.minFullHDPxRatio) ||
            (screen.width >= this.HDReadyWidth || screen.height >= this.HDReadyWidth)) {
            isFullHD = true;
        }
        if (isFullHD) {
            this.canvasBgImagePage = "HD/assets/commongame/basegame_2048.webp";
        } else {
            this.canvasBgImagePage = "LD/assets/commongame/basegame_2048.webp";

        }
    }

    // addScrollBar() {
    //     let gameGeneralContent: any = UIManager.getRef("gameGeneralContent")
    //     let gameGeneralScrollComponent: any = UIManager.getRef("gameGeneralScrollComponent")
    //     let rulesHeading: any = UIManager.getRef("Rules_Heading")
    //     const Scrollbox = require('pixi-scrollbox').Scrollbox
    //     let boxWith;
    //     if (isMobile && window.innerWidth > window.innerHeight) {
    //         boxWith = 1155;
    //     }
    //     else {
    //         boxWith = 800;
    //     }
    //     const scrollbox = new Scrollbox({ boxWidth: boxWith, boxHeight: 700 })
    //     scrollbox.x = 0;
    //     scrollbox.y = 200;

    //     gameGeneralScrollComponent && gameGeneralScrollComponent.addChild(scrollbox)

    //     // add a sprite to the scrollbox's content
    //     const sprite = scrollbox.content.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
    //     sprite.width = boxWith
    //     sprite.height = 700
    //     isMobile && (sprite.alpha = 0.01);
    //     sprite.tint = 0x131313
    //     scrollbox.content.addChild(gameGeneralContent);
    //     scrollbox.dragScroll = true;
    //     scrollbox.overflowX = "none";
    //     // force an update of the scrollbox's calculations after updating the children
    //     // add the viewport to the stage

    //     scrollbox.update()
    // }



    // handleScrollUpDownBtn = (e: any) => {
    //     const page_arrow_down: any = UIManager.getRef("page_arrow_down");
    //     const page_arrow_up: any = UIManager.getRef("page_arrow_up");
    //     const page_slider_cylinder: any = UIManager.getRef("page_slider_cylinder");

    //     page_arrow_down.on('click', () => {
    //         if (page_slider_cylinder.y < 600) {
    //             page_slider_cylinder.y += 50; // Change sprite tint to red on mouseover
    //         }
    //     });

    //     page_arrow_up.on('click', () => {
    //         if (page_slider_cylinder.y > 150 && page_slider_cylinder.y <= 600) {
    //             page_slider_cylinder.y -= 50; // Change sprite tint to red on mouseover
    //         }
    //     });

    //     page_slider_cylinder.on('wheel', () => {
    //         if (page_slider_cylinder.y < 600) {
    //             page_slider_cylinder.y += 50; // Change sprite tint to red on mouseover
    //         }
    //     });

    //     // page_slider_cylinder.on('mousedown', () => {
    //     //     if (page_slider_cylinder.y < 150 && page_slider_cylinder.y <= 600) {
    //     //         page_slider_cylinder.y -= 50; // Change sprite tint to red on mouseover
    //     //         console.log(page_slider_cylinder.y, "on up");
    //     //     }
    //     // });
    // }

    //when any button get clicked, we can get that button's call in this method
    handleEvent = (e: any) => {
        // this.handleScrollUpDownBtn(e);
        // this.handleScroll()
        this.props.setApplicationButtonClicked(true);
        this.props.setApplicationButtonClicked(false);
        this.props.buttonClickedName(e.target.name);
        if (e.target.name === "rightArrowButtonImage") {
            this.rightButtonState();
            this.carouselDot();
        }
        if (e.target.name === "leftArrowButtonImage") {
            this.leftButtonState();
            this.carouselDot();
        }
        if (e.target.name === "paytable_closeButton") {
            this.props.setWinAmount(false);
            (document.getElementsByClassName("canvasBgImage")[0] as any).style.display = 'inline';
            (document.getElementsByClassName("canvasBgImage")[0] as any).src = this.canvasBgImagePage;

            this.setState((prevState) => {
                return {
                    ...prevState,
                    currentIndex: 1,
                }
            })
            this.props.hidePaytable();
            // this.carouselDot1.id = this.state.currentIndex;
            this.carouselDot();
             this.props.setAllButtonEnable();
            /*  let maxButton: any = UIManager.getRef("btn_maxbet");
             let minButton: any = UIManager.getRef("btn_minbet");
             maxButton && (maxButton.visible = false);
             minButton && (minButton.visible = false); */
        }
        if (e.target.name !== "paytable_closeButton") {
            this.updateUi();
        }
    }
    
    // This Function will Update Payout.
    paytablePayouts() {
        const payoutsArray = this.props.paytablePayoutArray;
        for (let i = 0; i <= payoutsArray.length - 1; i++) {
            let payouts = payoutsArray[i];
            let payouts1 = Object.values(payoutsArray[i].payout);
            if (payouts) {
                for (let j = 0; j <= payouts1.length - 1; j++) {
                    this.UIManagerRef("payout_" + (i) + (j)) && (UIManager.setText("payout_" + (i) + (j), `${payouts1[j]}`));


                }
            }
        }
    }
    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        let bet = this.props.betList[this.props.currentBetIndex];
        this.paytablePayouts();
        /* 
         let symbolId: any;
         this.symbolsList.map((innerData: any, index: any) => {
             let selectedPayout = this.props.paytablePayoutArray.filter(
                 function (data: any) {
                     return data.betStep === bet;
                 }
             )
             symbolId = innerData.symbol;
             if (selectedPayout.length > 0) {
                 let payoutWinning = selectedPayout[0].payoutsPerBetStepAndSymbol.filter(
                     function (data: any) {
                         if (data.symbolId === symbolId) {
                             return (data.symbolId === symbolId);
                         }
                     }
                 )[0]
                 // CSSPluginclg
                 
                 for (let i = 1; i <= payoutWinning.paytable.length; i++) {
                     if (payoutWinning.paytable[payoutWinning.paytable.length - i] !== 0) {
                         this.UIManagerRef("payout" + payoutWinning.symbolId + "_" + (i - 1)) && (UIManager.setText("payout" + payoutWinning.symbolId + "_" + (i - 1), CURRENCY.CurrencyManager.formatCurrencyString(Number(((payoutWinning.paytable[payoutWinning.paytable.length - i]) / this.constantT1).toFixed(2)), true, true, true, true)))
                     }
                 }
             }
         }) */
        //to update paytable UI after resizing
        this.updateUi();
        for (let i = 0; i < this.props.storeWinningSymbolData.length; i++) {
            this.setSymbolHighlighted(this.props.storeWinningSymbolData[i]);
        }

    }

    setSymbolHighlighted(arr: any) {
        this.UIManagerRef("graphic_" + arr[0] + "_" + arr[1]) && (this.UIManagerRef("graphic_" + arr[0] + "_" + arr[1]).visible = true);
    }
    //this method will change the state for right button
    rightButtonState() {
        let selectedIndex = this.state.currentIndex;
        if (this.state.currentIndex === this.state.totalSlides) {
            selectedIndex = 0;
        }
        let calculateIndex = selectedIndex + 1;

        this.slideStateChanger(false, true, selectedIndex, calculateIndex);
    }

    slideStateChanger(leftIndicator: boolean, rightIndicator: boolean, selectedIndex: any, calculateIndex: any) {
        this.setState((prevState) => {
            return {
                ...prevState,
                currentIndex: calculateIndex,
                leftIndicator: leftIndicator,
                rightIndicator: rightIndicator
            }
        })
    }

    //this method will change the state for left button
    leftButtonState() {
        let selectedIndex = this.state.currentIndex;
        if (this.state.currentIndex === 1) {
            selectedIndex = this.state.totalSlides + 1;
        }
        let calculateIndex = selectedIndex - 1;
        this.slideStateChanger(true, false, selectedIndex, calculateIndex);
    }

    //when pages change, then UI will update by this method
    updateUi() {
        for (let i = 1; i <= this.state.totalSlides; i++) {
            let slideContainer: any = this.UIManagerRef("slide_Container" + i)
            slideContainer && (slideContainer.visible = false);
        }
        this.UIManagerRef("slide_Container" + this.state.currentIndex) && (this.UIManagerRef("slide_Container" + this.state.currentIndex).visible = true);
    }

    leftRotatebyOne(arr: any, d: number, n: number) {
        let temp = [];

        // copy first d element in array temp
        for (let i = 0; i < d; i++)
            temp[i] = arr[i];

        // move the rest element to index
        // zero to N-d
        for (let i = d; i < n; i++) {
            arr[i - d] = arr[i];
        }

        // copy the temp array element
        // in origninal array
        for (let i = 0; i < d; i++) {
            arr[i + n - d] = temp[i];
        }
    }


  


    render() {
        if (isMobile) {
            return (<></>)
        }
        if (!this.props.showPaytable) {
            return (<></>)
        }
        return (
            <UIManager id={"paytableContainer"} type={"Container"}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-Paytable-${Math.random()}`} langObj={this.props.langObj}
                            type={i.type}
                            id={i.id} {...i} app={this.app} ClickHandler={this.handleEvent} />)
                }

            </UIManager>
        );
    }


}

export default withPixiApp(connect(
    (state: Pick<IStore, 'paytableState' | 'paytableBMState' | 'basegameState' | 'behaviourState'>): IStateToProps =>
    ({
        showPaytable: state.paytableState.showPaytable,
        carouselStart: state.paytableBMState.carouselStart,
        paytablePayoutArray: state.paytableBMState.paytablePayoutArray,
        currentBetIndex: state.basegameState.currentBetIndex,
        betList: state.basegameState.betList,
        storeWinningSymbolData: state.behaviourState.storeWinningSymbolData,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        hidePaytable: (): any => dispatch(paytableActions.hidePaytable()),
        startCarousel: (): any => dispatch(paytableGofActions.startCarousel()),
        setWinAmount: (winAmountEmpty: boolean): any => dispatch(behaviourAction.setWinAmount(winAmountEmpty)),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        buttonClickedName: (clickedButtonName: string): any => dispatch(buttonActions.buttonClickedName(clickedButtonName)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
    }))(withPaytableConfiguration(DesktopPaytable)));
