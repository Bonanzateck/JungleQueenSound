import React from "react";
import MAINPAGE from "./mainpage";
import { Provider } from "react-redux";
import { Stage, Sprite, Container } from "@inlet/react-pixi";
import { alllanguage, lanAssetConfig } from "./data/lang";
import HtmlElementGenericUI from "./behaviour/htmlElementGenericUI/htmlElementGenericUI";
import { isMobile } from "react-device-detect";
import { constant } from "./slot/data/config";
import ServerComm from "./serverComm/serverComm";
import { KeyboardListener } from "@bonanzainteractive/slote_core";
import packageJson from '../package.json';
import { GSAPTimer,GSAPTween ,UIManager,Detectdevices,Layouts } from "@bonanzainteractive/core";
import { DC } from "./dynamiccomponent";
import { configGame } from "./slot/data/config";

interface IProps {
  [x: string]: any;
}

interface IState {
  [x: string]: any;
}

class GameApp extends React.Component<IProps, IState> {
  protected contentContainer: any;
  protected logoImageXInPortrait: number = 550;
  protected logoImageYInPortrait: number = 1050;
  protected logoImageXInLandscape: number = 960;
  protected logoImageYInLandscape: number = 750;

  protected NewlogoImageXInPortrait: number = 321;
  protected NewlogoImageYInPortrait: number = 1265;
  protected NewlogoImageXInLandscape: number = 770;
  protected NewlogoImageYInLandscape: number = 945;
  private minFullHDWidth: number = 1024;
  private HDReadyWidth: number = 1280;
  private minFullHDPxRatio: number = 2;
  private graphicImagePage: string = "";
  private canvasBgImagePage: string = "";
  private loadingBarCover: string = "";
  private loaderBarButterfly: any = "";



  constructor(props: any) {
    super(props);
    GSAPTween._instance = new GSAPTween();
    GSAPTimer._instance = new GSAPTimer();
    UIManager.setDynamicComponent(DC, configGame);
    this.state = {
      width: this.props.width,
      height: this.props.height,
      isInFrame: false
    };
    this.contentContainer = {};
    this.chooseAssets();

  }

  componentDidMount() {
    const isInFrame = this.inIframe();
    if (isInFrame) {
      this.setState({ isInFrame: true })
    }
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  updateDimensions() {
    this.setState((prevState) => {
      return {
        ...prevState,
      };
    });
  }

  chooseAssets() {
    const screen = window.screen;
    const isFullHD =
      (screen.width >= this.minFullHDWidth ||
        screen.height >= this.minFullHDWidth) &&
      window.devicePixelRatio >= this.minFullHDPxRatio;

    if (isFullHD || screen.width >= this.HDReadyWidth || screen.height >= this.HDReadyWidth) {
      this.graphicImagePage = "HD/assets/loader/graphic.webp";
      this.canvasBgImagePage = "HD/assets/commongame/basegame_2048.webp";
      this.loaderBarButterfly =  "HD/assets/loader/loading_butterfly.webp";
    } else {
      this.graphicImagePage = "LD/assets/loader/graphic.webp";
      this.canvasBgImagePage = "LD/assets/commongame/basegame_2048.webp";

    }
  }

  loaderUi() {
    const isPortrait = window.innerHeight > window.innerWidth;
    const loaderScreenImageX = isMobile && isPortrait ? this.logoImageXInPortrait : this.logoImageXInLandscape;
    const loaderScreenImageY = isMobile && isPortrait ? this.logoImageYInPortrait : this.logoImageYInLandscape;
    return (
      <Container>
        <Sprite
          x={loaderScreenImageX}
          y={loaderScreenImageY}
          image={this.graphicImagePage}
          anchor={[0.5, 0.5]}
          name={this.props.name === undefined ? 'sprite' : this.props.name}
          key={`sprite-${Math.random() * 10000}`}
        >
        </Sprite>
      </Container>
    );
  }

  useQuery = () => {
    return new URLSearchParams(window.location.search);
  };

  setQueryStringParameter() {
    let currCode = this.useQuery().get("currency");
    if (currCode === undefined || currCode === null || currCode === "") {
      currCode = "GBP";
    }
    constant.configGame.langCode = "en"
    constant.configGame.currCode = currCode || "GBP"
    constant.configGame.gameVersion = packageJson.version;
  }

  getGameStart() {
    this.setQueryStringParameter();
    let langCode = constant.configGame.langCode
    const langObj: Record<any, any> =
      alllanguage[langCode as keyof typeof alllanguage];
    let { width, height } = this.state;
    let PROPS_TO_SEND_MAINPAGE = {
      langCode: langCode,
      langObj: langObj,
      constant: this.props.constant,
      detectDevices: new Detectdevices(),
      lanAssetConfig: lanAssetConfig,
      width: width,
      height: height,
      configGame: this.props.configGame,
      LOADERUI: this.loaderUi(),
      isInFrame: this.state.isInFrame

    };
    let PROPS_TO_SEND_HtmlElementGenericUI = {
      langCode: langCode,
      langObj: langObj,
      constant: this.props.constant,
      detectDevices: new Detectdevices(),
      lanAssetConfig: lanAssetConfig,
      width: this.props.configGame.CANVAS_WIDTH,
      height: this.props.configGame.CANVAS_HEIGHT,
      configGame: this.props.configGame,
    };

    return (
      <div id="mainDiv">
        <div id={"bg"}>
          <img
            alt="Canvas Background"
            className={"canvasBgImage"}
            id={"canvasBgImageId"}
            src={this.canvasBgImagePage}
            width={window.innerWidth + "vw"}
            height={window.innerHeight + "vh"}
          ></img>
        </div>
        <Stage id={"gameCanvas"} width={width} height={height} >
          <Provider store={this.props.Gamestore} >
            <Container ref={(i) => (this.contentContainer = i)}  >
              <MAINPAGE {...PROPS_TO_SEND_MAINPAGE} />
            </Container>
          </Provider>
        </Stage>
        <Provider store={this.props.Gamestore}>
          <HtmlElementGenericUI
            {...PROPS_TO_SEND_HtmlElementGenericUI}
          ></HtmlElementGenericUI>
          <ServerComm></ServerComm>
          <Layouts></Layouts>
          <KeyboardListener           
           {...PROPS_TO_SEND_HtmlElementGenericUI}    
                 ></KeyboardListener>
        </Provider>
      </div>

    );
  }

  render() {
    return this.getGameStart();
  }
}

export default GameApp;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

//https://www.youtube.com/watch?v=CVpUuw9XSjY

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
