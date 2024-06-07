import React, { Ref } from "react";
import * as PIXI from 'pixi.js'

import {
    Gridcontainer, Grids, Buttonpanel, PlayerMessage, AutoplayInCanvas, Commongame, Basegame,
    Reelgrid, Freegame, Overlay, FlowManager, Paytable, LandingSymbolAnimation , // Payline
     ReelGridcontainer, Banner, applicationActions,IntroductionScreen,Reelcontainer,
     baseGameAction, Reel, Winbox,   buttonActions,introductionActions, soundActions
} from "@bonanzainteractive/slote_core";

import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { IStore } from "./core/store/IStore";
import { Dispatch } from "redux";
import Sounds from "./core/sounds/sounds";
import GAMESounds from "./components/sounds/sounds";
import { UIManager, toggleFullScreen, GSAPTimer } from "@bonanzainteractive/core";
import Loader from "./components/loader/loader";
import { isTablet, isMobile, isIOS, isAndroid } from "react-device-detect";
import { alllanguage, lanAssetConfig } from "./data/lang";
import { Detectdevices } from "@bonanzainteractive/core";
import CheatPanel from "./cheatPanel/cheatPanel";
import { actions as gameIntroductionActions } from "./gamereducer/introductionPageReducer";
import { setLoadData, slotConfigData } from "./slot/data/gameAssets";
import { actions as asyncInitAction } from "./core/reducers/asyncInitAction";
import EndBannerFun from "./components/banner/endBannerFun";
import BannerFun from "./components/banner/bannerFun";
import GameReel from "./components/gameReel/gameReel";
import SymbolAnimation from "./components/symbol/symbolanimation";
import Payline from "./core/payline/payline";
import { playSoundLoop } from "./core/sounds/SoundControler";
// import LandingSymbolAnimation from './core/landingsymbol/landingsymbol'
// import Reelcontainer from "./core/reelcontainer/reelcontainer";


interface IProps {
    app: PIXI.Application
    [x: string]: any;
}

interface IStateToProps {
    [x: string]: any;
}

interface IDispatchToProps {
    [x: string]: any;
}

interface IState {
    isGameLoaded: boolean,
    GameType: string,
    width: number | string,
    height: number | string,
    pixelRatio: number,
    resizing: boolean,
    lang: string
}

class MAINPAGE extends React.PureComponent<IProps, IState> {
    protected app: PIXI.Application;
    protected mainPageContainer: _ReactPixi.IContainer | Ref<any>;
    private onComplete: Function | null;
    constructor(props: any) {
        super(props);
        this.app = props.app;
        setLoadData();
        slotConfigData();
      
     
        this.state = {
            width: this.props.width,
            height: this.props.height,
            pixelRatio: window.devicePixelRatio,
            isGameLoaded: false,
            resizing: false,
            GameType: "BASE",
            lang: this.props.langcode
        }
        this.mainPageContainer = {};
        (window as any).__PIXI_APP__ = this.app;
        this.onComplete = null;
        window.addEventListener("resize", () => {
            this.updateDimensions("Resized");
        });
    }
   

    onLoadComplete = () => {
         const { setApplicationLoading } = this.props;
        setApplicationLoading(true);
        GSAPTimer.getInstance().addTimer(1500 / 1000, () => {
            setApplicationLoading(false);
            this.handleTouchFullScreen();
        });
        this.setState((prevState) => {
            return {
                ...prevState,
                isGameLoaded: true,
            }
        }); 
    }

    handleTouchFullScreen() {
        let element: any = document.getElementById('mainDiv');
        let touchStart: any, touchEnd: any;
        if (element) {
            if ((isTablet && isAndroid) || (isMobile && isAndroid)) {
                element.addEventListener('touchstart', (e: any) => {
                    touchStart = e.touches[0].clientY;
                });
                element.addEventListener('touchmove', (e: any) => {
                    if (!this.props.showHelpText) {

                    }
                });
                element.addEventListener('touchend', (e: any) => {
                    touchEnd = e.changedTouches[0].clientY;
                    if ((touchStart - touchEnd >= 100) || (touchStart - touchEnd <= -100)) {
                        if ((!this.props.showAutoplay) && (!this.props.showPaytable)) {
                            toggleFullScreen();
                        }
                    }
                });
            }
        }
    }

    iPhoneFullScreen() {
        if (isMobile) {
            let element2: any = document.getElementById('gameCanvas');
            let chromeAgent = window.navigator.userAgent.indexOf("CriOS") > -1;
            let sbHeight = window.innerHeight * (window.innerHeight / document.body.offsetHeight);
            if (!isTablet && (isIOS) && (window.innerHeight < window.innerWidth)) {
                if (!chromeAgent) {
                    if (sbHeight > 350) {
                        element2.classList.add('override');
                    }
                    else if (sbHeight < 350) {
                        element2.classList.remove('override');
                    }
                }
            } else {
                element2.classList.remove('override');
            }
        }
    }

    updateDimensions = (arg: any) => {
        this.iPhoneFullScreen();
        if (arg === "Resized") {
            this.setState((prevState) => {
                if (this.props.isInFrame) {
                    return {
                        ...prevState,
                        width: document.documentElement.clientWidth,
                        height: document.documentElement.clientHeight,
                        pixelRatio: window.devicePixelRatio || 1
                    }
                } else {
                    return {
                        ...prevState,
                        width: window.outerWidth,
                        height: window.outerHeight,
                        pixelRatio: window.devicePixelRatio || 1
                    }
                }
            })
            this.calculateCanvas();
        }
    };

    componentDidMount() {
        this.updateDimensions("Resized");
        this.updateDimenationByForce();
        this.props.soundLoadStartFunction(true);
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        if (this.props.isInitResponseReceived && this.onComplete) {
            this.onComplete();
            this.onComplete = null;
        }
    }

    updateDimenationByForce() {
        GSAPTimer.getInstance().addTimer(500 / 1000, () => {
            this.updateDimensions("Resized");
        });
    }



    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    iniFrame() {
        if (window.location !== window.parent.location) {
            return true
        } else {
            return false
        }
    }

    handleResizeChangeInIframe() {
        const { detectDevices, setApplicationResizeState } = this.props;
        const dpr = detectDevices.isAndroidMobile() || detectDevices.isTablet() ? window.devicePixelRatio > 2 ? 1 : window.devicePixelRatio : window.devicePixelRatio;

        const { viewportWidth, viewportHeight } = this.getViewportWidthAndHeight(dpr);
        const { viewWidth, viewHeight } = this.getViewWidthAndHeight();
        const scaleFactor = Math.min(viewWidth / viewportWidth, viewHeight / viewportHeight);
        const width = Math.round(scaleFactor * viewportWidth);
        const height = Math.round(scaleFactor * viewportHeight);
        const scaleX = scaleFactor;
        const scaleY = scaleFactor;
        this.setAlignmentForMobile(viewportWidth, viewportHeight, dpr, width, height);
        setApplicationResizeState(viewportWidth, viewportHeight, scaleX, scaleY);
        this.setAlignment(viewHeight, height, viewWidth, width);
    }

    private getViewWidthAndHeight() {
        const { detectDevices } = this.props;
        let viewWidth, viewHeight;
        if (detectDevices.isHandheld() && !detectDevices.isSafariBrowser()) {
            if (detectDevices.isIOS9Mobile()) {
                viewWidth = window.outerWidth;
                viewHeight = window.outerHeight;
            } else {
                viewWidth = Math.min(document.documentElement.clientWidth, window.outerWidth || 0);
                viewHeight = Math.min(document.documentElement.clientHeight, window.outerHeight || 0);
            }
        } else {
            if (isMobile) {
                viewWidth = Math.min(document.documentElement.clientWidth, window.outerWidth || 0);
                viewHeight = Math.min(document.documentElement.clientHeight, window.outerHeight || 0);
            } else {
                viewWidth = window.innerWidth;
                viewHeight = window.innerHeight;
            }
        }
        return { viewWidth, viewHeight };
    }

    private getViewportWidthAndHeight(dpr: number) {
        const { constant, setApplicationLayoutMode } = this.props;
        let viewportWidth, viewportHeight;
        let layoutMode = "Landscape";
        if (isMobile) {
            if (this.props.isInFrame) {
                layoutMode = document.documentElement.clientHeight > document.documentElement.clientWidth ? "Portrait" : "Landscape";
            } else {
                layoutMode = window.outerHeight > window.outerWidth ? "Portrait" : "Landscape";
            }
        }
        viewportWidth = constant.configGame[`${layoutMode.toLowerCase()}CanvasWidth`] * dpr;
        viewportHeight = constant.configGame[`${layoutMode.toLowerCase()}CanvasHeight`] * dpr;

        setApplicationLayoutMode(layoutMode);
        return { viewportWidth, viewportHeight };
    }

    private setAlignmentForMobile(viewportWidth: number, viewportHeight: number, dpr: number, width: number, height: number): void {
        const { configGame } = this.props.constant;
        const { app } = this.props;
        if (isMobile) {
            const [Can_Width, Can_Height] = window.innerHeight > window.innerWidth
                ? [configGame.portraitCanvasWidth, configGame.portraitCanvasHeight]
                : [configGame.landscapeCanvasWidth, configGame.landscapeCanvasHeight];
            this.props.setApplicationLayoutMode(
                window.innerHeight > window.innerWidth ? "Portrait" : "Landscape"
            );
            const scaleX = width / Can_Width;
            const scaleY = height / Can_Height;
            UIManager.getRef("mainPageOuterContainer").scale.set(scaleX * dpr, scaleY * dpr);
            const newWidth = viewportWidth * scaleX;
            const newHeight = viewportHeight * scaleY;
            app.renderer.resize(newWidth, newHeight);

        }
        app.view.style.width = `${width}px`;
        app.view.style.height = `${height}px`;
    }

    private setAlignment(viewHeight: number, height: number, viewWidth: number, width: number): void {
        const { app, constant } = this.props;
        const isCentered = constant.configGame.centered;

        if (isCentered) {
            const top = viewHeight > height ? `${viewHeight / 2 - height / 2}px` : '0';
            const left = viewWidth > width ? `${viewWidth / 2 - width / 2}px` : '0';
            app.view.style.position = 'fixed';
            app.view.style.top = top;
            app.view.style.left = left;
        }
    }

    handleResizeChange() {
        const { detectDevices, setApplicationResizeState } = this.props;
        let width = 0, height = 0, scaleX = 0, scaleY = 0, scaleFactor = 0;
        const dpr = detectDevices.isAndroidMobile() || detectDevices.isTablet() ? window.devicePixelRatio > 2 ? 1 : window.devicePixelRatio : window.devicePixelRatio;

        const { viewportWidth, viewportHeight } = this.getViewportWidthAndHeight(dpr);
        //isMobile
        const { viewWidth, viewHeight } = this.getViewWidthAndHeight();
        scaleFactor = viewHeight / viewportHeight;
        if (Math.round(scaleFactor * viewportWidth) > viewWidth) {
            width = viewWidth;
            scaleX = viewWidth / viewportWidth;
            height = Math.ceil(scaleX * viewportHeight);
            scaleY = scaleX;
        } else {
            height = viewHeight;
            scaleY = viewHeight / viewportHeight;
            width = Math.ceil(scaleY * viewportWidth);
            scaleX = scaleY;
        }

        this.setAlignmentForMobile(viewportWidth, viewportHeight, dpr, width, height);
        setApplicationResizeState(viewportWidth, viewportHeight, scaleX, scaleY);
        this.setAlignment(viewHeight, height, viewWidth, width);
    }

    calculateCanvas() {
        let timerVal = isTablet ? 350 : 150;
        this.iniFrame()
            ? this.handleResizeChange()
            : GSAPTimer.getInstance().addTimer(timerVal / 1000, () => {
                this.handleResizeChangeInIframe();
            });
    }
    gameLoading = () => {
        this.props.getLoading();
    }
    onGameLoadPercentage = (onGameLoadPercentage: number) => {
        this.props.setLoadingPercent(onGameLoadPercentage);
    }

    onGameAsstesLoad = (callBack: Function) => {
        this.props.getApplicationInitResponse();
        this.onComplete = callBack;
    }

    render() {
        // https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
        const {
            languageCode,
            setApplicationLanguageCode,
            constant,
            configGame,
            LOADERUI,
            startRendering,
            basegamestate,
            featureType,
            showPaytable,
            featureJustFinished,
            featureJustTriggered,
            cheatingEnabled,
            width,
            height,
            showOutroBanner,
            totalFereegameWonAmount,
            onIntroBannerComplete,
            onOutroBannerComplete,
            showIntroScreen
        } = this.props;
        const { isGameLoaded } = this.state;
        const langCode = languageCode.toLowerCase();
        let langObj = alllanguage[langCode as keyof typeof alllanguage] || alllanguage.en;

        if (typeof langObj === 'undefined') {
            setApplicationLanguageCode("en");
            langObj = alllanguage.en;
        }

        const COMMON_PROPS = {
            app: this.app,
            langObj,
            configGame,
        };

        const PROPS_TO_SEND_AUTOPLAY_IN_CANVAS = {
            InCanvas: configGame.AUTOPLAY_UI_IN_CANVAS,
            ...COMMON_PROPS
        };
        const PROPS_TO_BASEGAME = {
            ReelGridcontainer: ReelGridcontainer,
            Reelcontainer: Reelcontainer,
            Gridcontainer: Gridcontainer,
            Reelgrid: Reelgrid,
            Grids: Grids,
            Reel: GameReel,
            Symbol: Symbol,
            LandingSymbolAnimation: LandingSymbolAnimation,
            SymbolAnimation: SymbolAnimation,
            Payline: Payline,
            Winbox: Winbox,
            ...COMMON_PROPS
        };



        const PROPS_TO_SEND_INTRO_BANNER = {
            bannerType: "Intro",
            onComplete: () => {
                this.props.isIntrobannerComplete(true);
            },
            ...COMMON_PROPS
        };

        const PROPS_TO_SEND_OUTRO_BANNER = {
            bannerType: "Outro",
            totalWonAmount: totalFereegameWonAmount,
            onComplete: () => {
                this.props.isOutrobannerComplete(true);
                this.props.introductionVisibleScreen(false)
            },
            ...COMMON_PROPS
        };

        const PROPS_TO_SEND_INTRO_SCREEN = {
            langCode: langCode,
            langObj: langObj,
            constant: constant,
            detectDevices: new Detectdevices(),
            lanAssetConfig: lanAssetConfig,
            onComplete: () => {
                this.props.introScreenVisible(false);
                this.props.showCoreIntroductionPage();
                this.props.introductionVisibleScreen(false)
                this.props.setAllButtonEnable();
                this.props.playingSound(true);
                this.props.setApplicationButtonClicked(true)
                this.props.setApplicationButtonClicked(false)
                // this.props.playSound([ { name: "jq_sx_continue_button", vol: 1, loop: false }]);  
                playSoundLoop("jq_sx_continue_button", "jq_sx_continue_button", false);

            },
            width: width,
            height: height,
            configGame: configGame,
            LOADERUI: LOADERUI,
        };

        const PROPS_TO_SEND_MENU = {
            width: width,
            height: height,
            langcode: langCode,
            movingImg:isMobile ? "LD/assets/loader/loading_butterfly.webp":"HD/assets/loader/loading_butterfly.webp",
            lanAssetConfig: lanAssetConfig,
            constant: constant,
            loading: this.props.loading,
            getLoading: this.gameLoading,
            onGameLoadPercentage: this.onGameLoadPercentage,
            onGameAssetsLoad: this.onGameAsstesLoad,
            onloadingComplete: this.onLoadComplete,
            LOADERUI: LOADERUI,
            ...COMMON_PROPS
        }

        return (
            <UIManager
                type={"Container"}
                name={"mainPageOuterContainer"}
                id={"mainPageOuterContainer"}
                app={this.app}
                configGame={configGame}>
                <UIManager
                    type={"Container"}
                    id={"backgroundContainer"}
                    app={this.app}
                    name={"backgroundContainer"}
                    configGame={configGame}>
                </UIManager>
                <UIManager
                    id={"mainPageContainer"}
                    name={"mainPageContainer"}
                    type={"Container"}
                    configGame={configGame}
                    ref={i => this.mainPageContainer = i}
                    app={this.app}>
                    {!isGameLoaded ? <Loader  {...PROPS_TO_SEND_MENU} /> : isGameLoaded && startRendering && (
                        <>
                            <Commongame {...COMMON_PROPS} />
                            {basegamestate && <Basegame {...PROPS_TO_BASEGAME} />}
                            {!basegamestate && featureType === "FREEGAME" && <Freegame {...PROPS_TO_BASEGAME} />}
                            {!showIntroScreen  && <Buttonpanel {...COMMON_PROPS} />}
                            {!showPaytable && <PlayerMessage {...COMMON_PROPS} />}
                            {!showPaytable && <AutoplayInCanvas  {...PROPS_TO_SEND_AUTOPLAY_IN_CANVAS} />}
                            {<FlowManager {...COMMON_PROPS} />}
                            {!showPaytable && <Overlay {...COMMON_PROPS} />}
                            {showOutroBanner && <Banner {...PROPS_TO_SEND_OUTRO_BANNER} ></Banner>}
                            {featureJustTriggered && <Banner {...PROPS_TO_SEND_INTRO_BANNER} ></Banner>}
                            {onIntroBannerComplete && <BannerFun {...PROPS_TO_SEND_INTRO_BANNER} ></BannerFun>}
                            {onOutroBannerComplete && <EndBannerFun {...PROPS_TO_SEND_INTRO_BANNER} ></EndBannerFun>}
                            {<GAMESounds {...COMMON_PROPS}></GAMESounds>}
                            {<IntroductionScreen {...PROPS_TO_SEND_INTRO_SCREEN} ></IntroductionScreen>}
                            {<Paytable {...PROPS_TO_SEND_INTRO_SCREEN}></Paytable>}
                            {cheatingEnabled && <CheatPanel {...COMMON_PROPS}></CheatPanel>}
                        </>
                    )}
                    {<Sounds {...COMMON_PROPS}></Sounds>}
                </UIManager>
            </UIManager>
        )
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'asyncInitAction' | 'applicationState' | 'basegameState' | 'freegameState' |
     'autoplayState' | 'paytableState' | 'introductionScreenState' >): IStateToProps =>
    ({
        showPaytable: state.paytableState.showPaytable,
        layoutMode: state.applicationState.layoutMode,
        featureJustFinished: state.freegameState.featureJustFinished,
        showOutroBanner: state.freegameState.showOutroBanner,
        featureJustTriggered: state.basegameState.featureJustTriggered,
        basegamestate: state.basegameState.basegamestate,
        featureType: state.basegameState.featureType,
        startRendering: state.asyncInitAction.startRendering,
        cheatingEnabled: state.applicationState.cheatingEnabled,
        languageCode: state.applicationState.languageCode,
        showAutoplay: state.autoplayState.showAutoplay,
        showHelpText: state.applicationState.showHelpText,
        onIntroBannerComplete: state.basegameState.onIntroBannerComplete,
        isInitResponseReceived: state.asyncInitAction.isInitResponseReceived,
        loading: state.applicationState.isLoading,
        totalFereegameWonAmount: state.basegameState.totalFereegameWonAmount,
        onOutroBannerComplete: state.basegameState.onOutroBannerComplete,
        freegameSpinCountRemaining: state.freegameState.freegameSpinCountRemaining,
        showIntroScreen: state.introductionScreenState.showIntroScreen,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutMode: (layout: string): any => dispatch(applicationActions.setApplicationLayoutMode(layout)),
        setLoadingPercent: (loadingPercent: number): any => dispatch(asyncInitAction.setLoadingPercent(loadingPercent)),
        setApplicationLoading: (isLoading: boolean): any => dispatch(applicationActions.setApplicationLoading(isLoading)),
        setApplicationLanguageCode: (languageCode: string): any => dispatch(applicationActions.setApplicationLanguageCode(languageCode)),
        getLoading: (): any => dispatch(applicationActions.getApplicationLoading()),
        getApplicationInitResponse: (): any => dispatch(asyncInitAction.getApplicationInitResponse()),
        isIntrobannerComplete: (onIntroBannerComplete: boolean): any => dispatch(baseGameAction.isIntrobannerComplete(onIntroBannerComplete)),
        isOutrobannerComplete: (onOutroBannerComplete: boolean): any => dispatch(baseGameAction.isOutrobannerComplete(onOutroBannerComplete)),
        showCoreIntroductionPage: (): any => dispatch(gameIntroductionActions.showCoreIntroductionPage()),
        setApplicationResizeState: (resizewidth: number, resizeheight: number, scalex: number, scaley: number): any => dispatch(applicationActions.setApplicationResizeState(resizewidth, resizeheight, scalex, scaley)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        introScreenVisible: (showIntroScreen: boolean): any => dispatch(introductionActions.introScreenVisible(showIntroScreen)),
        introductionVisibleScreen: (introductionScreenVisible: boolean): any => dispatch(introductionActions.introductionVisibleScreen(introductionScreenVisible)),
        playingSound: (soundIsPlaying: any): any => dispatch(soundActions.playingSound(soundIsPlaying)),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        soundLoadStartFunction: (soundLoadStart: boolean): any => dispatch(soundActions.soundLoadStartFunction(soundLoadStart)),
    }))(MAINPAGE));
