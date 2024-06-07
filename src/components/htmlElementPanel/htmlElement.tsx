import React, { Component } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { isMobile } from "react-device-detect";
import Menu from "../menu/menu";
import withHtmlElementConfiguration from "./configuration/withHtmlElementConfiguration";
import MobViewPanel from "./../mobViewPanel/mobViewPanel";
import { DesktopSettingPanel } from "@bonanzainteractive/slote_core";


interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}

interface IState {

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

interface IStateToProps {
}

interface IDispatchToProps {
}

class HtmlElement extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected HtmlElement: any;


    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            width: this.props.width,
            height: this.props.height,
            pixelRatio: window.devicePixelRatio,
            isGameLoaded: false,
            resizing: false,
            GameType: "BASE",
            lang: this.props.langcode
        }
    }


    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();
    }

    updateDimensions = () => {

        this.setState((prevState) => {
            return {
                ...prevState,
                width: window.innerWidth,
                height: window.innerHeight,
                pixelRatio: window.devicePixelRatio || 1
            }
        })
        if (window.innerHeight > window.innerWidth) {
            // this.props.setApplicationLayoutMode("Portrait");
        } else {
            //   this.props.setApplicationLayoutMode("Landscape");
        }
        this.calculateCanvas();
    };

    calculateCanvas() {
        this.handleResizeChange()
    }

    handleResizeChange() {
        const {
            pixelRatio
        } = this.state;
        let
            width = 0,
            height = 0,
            scaleX = 0,
            scaleY = 0,
            resizeEvent = null,
            scaleFactor = 0,
            fullscreenMode = null,
            viewWidth,
            viewHeight;
        let viewportWidth, viewportHeight: any;


        if (isMobile) {
            if (window.innerHeight > window.innerWidth) {
                //  this.props.setApplicationLayoutMode("Portrait");
                viewportWidth = this.props.constant.configGame.portraitCanvasWidth;
                viewportHeight = this.props.constant.configGame.portraitCanvasHeight;
            } else {
                // this.props.setApplicationLayoutMode("Landscape");
                viewportWidth = this.props.constant.configGame.landscapeCanvasWidth;
                viewportHeight = this.props.constant.configGame.landscapeCanvasHeight;
            }
        } else {
            viewportWidth = this.props.constant.configGame.canvasWidth;
            viewportHeight = this.props.constant.configGame.canvasHeight;

        }

        //isMobile
        if (this.props.detectDevices.isHandheld() === true && this.props.detectDevices.isSafariBrowser() === false) {
            if (this.props.detectDevices.isIOS9Mobile() === true) {
                viewWidth = window.innerWidth;
                viewHeight = window.innerHeight;
            } else {
                viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            }
        } else {
            viewWidth = window.innerWidth;
            viewHeight = window.innerHeight;
        }
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

        const CAN_WIDTH = viewportWidth * Math.min(pixelRatio, 2);  // Width of the viewport
        const CAN_HEIGHT = viewportHeight * Math.min(pixelRatio, 2);  // Height of the viewport

        this.HtmlElement.style.width = width + "px";
        this.HtmlElement.style.height = height + "px";
        if (isMobile) {
            if (window.innerHeight > window.innerWidth) {
                this.HtmlElement.style.height = width;
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        height: width,
                    }
                })
            } else {

                this.HtmlElement.style.height = viewportHeight;
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        height: viewportHeight,
                    }
                })
            }
        }


        if (this.props.constant.configGame.centered === true) {
            this.HtmlElement.style.position = "fixed";
            if (viewHeight > height) {
                this.HtmlElement.style.top = (viewHeight / 2 - height / 2) + "px";
            } else {
                this.HtmlElement.style.top = 0 + "px";
            }
            if (viewWidth > width) {
                this.HtmlElement.style.left = (viewWidth / 2 - width / 2) + "px";
            } else {
                this.HtmlElement.style.left = 0 + "px";
            }
        }

    }

    render() {
        let showMobViewPanelPage = false, pointerEventController = true;
        if (isMobile) {
            showMobViewPanelPage = true;
        }
        if (this.props.showAutoplay || this.props.showMenu) {
            if (isMobile) {
                pointerEventController = false
            }
        }


        const PROPS_TO_SEND_MobViewPanel = {
            width: this.props.configGame.CANVAS_WIDTH,
            height: this.props.configGame.CANVAS_HEIGHT,
            langObj: this.props.langObj,
        }
        const PROPS_TO_SEND_Menu = {
            langcode: this.props.langcode,
            langObj: this.props.langObj,
            InCanvas: this.props.configGame.MENU_UI_IN_CANVAS,
            width: this.props.configGame.CANVAS_WIDTH,
            height: this.props.configGame.CANVAS_HEIGHT,
        }

        return (
            <div ref={i => this.HtmlElement = i} className="htmlElementContainer" style={{
                pointerEvents: pointerEventController ? 'none' : 'auto'
            }}>
                {
                    showMobViewPanelPage &&
                    <MobViewPanel {...PROPS_TO_SEND_MobViewPanel}></MobViewPanel>
                }
                {
                    this.props.configGame.MENU_UI_IN_CANVAS === 0 && !showMobViewPanelPage &&
                    <Menu {...PROPS_TO_SEND_Menu}></Menu>
                }
                <DesktopSettingPanel  {...PROPS_TO_SEND_Menu}></DesktopSettingPanel>
            </div >)
    }

}


export default withPixiApp(connect(
    (state: Pick<IStore, 'autoplayState' | 'menuState' | 'applicationState'>): IStateToProps =>
    ({
        showAutoplay: state.autoplayState.showAutoplay,
        showMenu: state.menuState.showMenu,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({}))(withHtmlElementConfiguration(HtmlElement)));