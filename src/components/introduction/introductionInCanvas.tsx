import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { UIManager, GSAPTimer, GSAPTween, ItweenProps } from "@bonanzainteractive/core";

import { layoutssActions, soundActions, withIntroductionScreenConfiguration } from "@bonanzainteractive/slote_core";
import { actions as introductionActions1 } from "../../gamereducer/introductionPageReducer";
import { isAndroid, isMobile, isTablet } from "react-device-detect";

import { buttonActions } from "@bonanzainteractive/slote_core";
import { introductionActions } from "@bonanzainteractive/slote_core";
import { Texture } from "pixi.js";
import { applicationActions } from "@bonanzainteractive/slote_core";
import { actions as behaviourAction } from '../../gamereducer/behaviourReducer';
import { toggleFullScreen } from "@bonanzainteractive/core";


interface IStore {
  [x: string]: any;
}

interface IProps {
  [x: string]: any;
}

interface IStateToProps {
  layoutMode: string;
  showIntroductionPage: boolean;
  resizeWidth: number;
  introductionScreenVisible: boolean;
  freegameSpinCountRemaining: number;
  gameBroken: boolean;
  startRendering: boolean;
  showIntroScreen: boolean;
  soundOnOff: boolean;
}

interface IDispatchToProps { }

interface IState {
  [x: string]: any;
}

class IntroductionInCanvas extends Component<IProps, IState> {
  protected app: PIXI.Application;
  protected introductionContainer: _ReactPixi.IContainer | Ref<any>;
  private backgroundImagePortrait: any;
  private backgroundImage: any;
  protected ui_mode: string;
  protected displayUI: Object[] = [];
  private minFullHDWidth: number = 1024;
  private HDReadyWidth: number = 1280;
  private minFullHDPxRatio: number = 2;
  private canvasBgImagePage: string = "";
  private tweenTimer: number = 0.001;
  protected textScaling: number = 0.9;
  private blackmaskVisibility = false;
  protected UIManagerRef: any;
  private totalSlides: number = 5;
  private autoSlideMovement: boolean = true;
  private disableActionContinue: boolean = true;
  constructor(props: IProps) {
    super(props);
    this.app = props.app;
    this.state = {
      uiElements: [],
      lang: "en",
      width: this.props.width,
      height: this.props.height,
      pixelRatio: window.devicePixelRatio,
      resizing: false,
    };
    if (isMobile) {
      this.ui_mode = "mobile";
    } else {
      this.ui_mode = "desktop";
    }
    this.introductionContainer = {}
   // this.displayUI = this.props.data.COMPONENTS.filter(this.checkUiMode.bind(this));
    this.displayUI = this.props.child.filter(this.checkUiMode.bind(this));
    this.blackmaskVisibility = true;
    this.UIManagerRef = UIManager.getRef;
  }
  //while first rendering, this method will check the mode first
  checkUiMode(uimodeobj: any) {
    if (uimodeobj.uimode === undefined) {
      uimodeobj.uimode = "both";
    }
    if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
      return uimodeobj;
    }
  }

  componentDidMount() {

    this.blackmaskVisibility = false;
    this.UIManagerRef("Text_WinMultiplier") && UIManager.setText("Text_WinMultiplier", this.props.langObj["introductionText_7"]);
    this.layoutChange(this.props.layoutMode);
    //!Show Continue Button After Mount Component
    this.disableActionContinue = false;

  }

  //this method will initialize object to variables
  initializeObjectInVariable() {
    this.backgroundImage = this.UIManagerRef("backgroundImageOfIntroductionPage");
    this.backgroundImagePortrait = this.UIManagerRef("backgroundImageOfIntroductionPage_portrait");
  }


  //when layout changes, this method will be called
  layoutChange(currentLayout: string) {
    this.chooseAssets();
    this.displayUI.map((data: any) => {
      if (data.layout === true) {
        this.props.setApplicationLayoutObject(data.name);
      }
    });
  }


  continueButtonVisibility() {
    if ( this.UIManagerRef("postIntro_continueButton_" + this.ui_mode)) {
      this.UIManagerRef("postIntro_continueButton_" + this.ui_mode).texture = Texture.from("continue_disable.png");
      this.UIManagerRef("postIntro_continueButton_" + this.ui_mode).interactive = false;
    }
    if ( this.UIManagerRef("postIntro_continueButton_" + this.ui_mode)) {
      this.UIManagerRef("postIntro_continueButton_" + this.ui_mode).texture = Texture.from("continue_up.png");
      this.UIManagerRef("postIntro_continueButton_" + this.ui_mode).interactive = true;

    }
  }

  shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
    if (nextProps.layoutMode !== this.props.layoutMode) {
      this.layoutChange(nextProps.layoutMode);
      return false;
    }
    if (nextProps.introductionScreenVisible !== this.props.introductionScreenVisible || nextProps.gameBroken !== this.props.gameBroken ||
      nextProps.showIntroductionPage !== this.props.showIntroductionPage
      || nextProps.freegameSpinCountRemaining !== this.props.freegameSpinCountRemaining
    ) {
      if (nextProps.gameBroken) {
        nextProps.hideIntroductionPage();
      }
      return false;
    }
    if (nextProps.showIntroScreen && nextProps.showIntroScreen !== this.props.showIntroScreen) {
      GSAPTimer.getInstance().addTimer(50 / 1000, () => {
        if (this.UIManagerRef("UIManager-blackGraphic")) {
          const tweenProps: ItweenProps = {
            alpha: 0,
            duration: 0.9,
            onComplete: () => {
              this.blackmaskVisibility = false;
              GSAPTween.getInstance().killTween(this.UIManagerRef("UIManager-blackGraphic"));
            }
          }

          GSAPTween.getInstance().gsapTween(this.UIManagerRef("UIManager-blackGraphic"), tweenProps);
        }
      });
    }
    return true;
  }

  chooseAssets() {
    let screen = window.screen;
    let isFullHD = false;
    if (((screen.width >= this.minFullHDWidth || screen.height >= this.minFullHDWidth) && window.devicePixelRatio >= this.minFullHDPxRatio) || screen.width >= this.HDReadyWidth || screen.height >= this.HDReadyWidth) {
      isFullHD = true;
    }
    if (isFullHD) {
      this.canvasBgImagePage = "HD/assets/commongame/basegame_2048.webp";
    } else {
      this.canvasBgImagePage = "LD/assets/commongame/basegame_2048.webp";
    }
  }


  //this method will be called when a button gets clicked
  handleEvent = (e: any) => {
    if ((e.target.name === "postIntro_continueButton_desktop" || e.target.name === "postIntro_continueButton_mobile") && this.disableActionContinue === false) {
      if (isTablet || isAndroid) {
        toggleFullScreen();
      }
      this.props.setApplicationButtonClicked(true);
      this.props.setApplicationButtonClicked(false);
      this.props.buttonClickedName(e.target.name);
      this.props.setApplicationShowHelpText(true);

      this.props.setApplicationShowHelpText(false);
      (document.getElementsByClassName("canvasBgImage")[0] as any).src = this.canvasBgImagePage;
      this.UIManagerRef("introductionContainer").visible = true;
      this.UIManagerRef("introductionContainer").alpha = 1;
      this.UIManagerRef("UIManager-blackGraphic").visible = true;
      this.UIManagerRef("UIManager-blackGraphic").alpha = 1;
      this.props.setAllButtonEnable();
     // this.props.introScreenVisible(false);
      const tweenProps: ItweenProps = {
        alpha: 0,
        duration: 0.1,
        ease: "cubic",
        onComplete: () => {
          this.props.hideIntroductionPage();
          this.playGameSound();
          if (this.UIManagerRef("UIManager-blackGraphic")) {
            const tweenProps: ItweenProps = {
              alpha: 0,
              duration: 0.6,
              ease: "cubic",
              onComplete: () => {
                GSAPTween.getInstance().killTween(this.UIManagerRef("UIManager-blackGraphic"));
              }
            }
            GSAPTween.getInstance().gsapTween(this.UIManagerRef("UIManager-blackGraphic"), tweenProps);
          }
          GSAPTween.getInstance().killTween(this.UIManagerRef("introductionContainer"));
        }
      }
      GSAPTween.getInstance().gsapTween(this.UIManagerRef("introductionContainer"), tweenProps);
    }
    else if (e.target.name === "dotDisable1" || e.target.name === "dotDisable2" || e.target.name === "dotDisable3" || e.target.name === "dotDisable4" || e.target.name === "dotDisable5") {
      this.changeSliderIndex(e.target.name.at(10));
    }
  };

  changeSliderIndex(index: number) {
    if (this.props.showIntroScreen) {
      index = Number(index);
      this.setState((prevState) => {
        return {
          ...prevState,
          sliderIndex: index,

        }
      })
      this.UIManagerRef("button_Container").children.map((data: any) => {
        if (data.name.endsWith(this.state.sliderIndex)) {
          this.UIManagerRef(data.name).visible = false;
          this.UIManagerRef("dotEnable" + this.state.sliderIndex).visible = true;
        } else {
          data.name.startsWith("dotEnable") && (this.UIManagerRef(data.name).visible = false);
        }

      })
      this.showSliderContent();
      if (this.autoSlideMovement) {
        GSAPTimer.getInstance().addTimer(5000 / 1000, () => {
          if (this.totalSlides > this.state.sliderIndex) {

            this.changeSliderIndex(this.state.sliderIndex + 1);

          } else {

            this.changeSliderIndex(1);
          }
        });
      }
    }
  }
  showSliderContent() {
    for (let i = 1; i <= this.totalSlides; i++) {
      this.UIManagerRef("postIntro_Page" + i) && (this.UIManagerRef("postIntro_Page" + i).visible = false);
    }
    this.UIManagerRef("postIntro_Page" + this.state.sliderIndex) && (this.UIManagerRef("postIntro_Page" + this.state.sliderIndex).visible = true);
  }

  playGameSound() {
    if (this.props.soundOnOff) {
      if (((localStorage.getItem("playerId-sound-" + this.useQuery().get("token")) === "true") ? true : false)) {
        this.props.soundLoadStartFunction(true);
        this.props.playingSound(true);
      } else {
        this.props.soundLoadStartFunction(true);
        this.props.playingSound(false);
      }
    }

  }

  useQuery = () => {
    let search = window.location.search;

    return new URLSearchParams(search);
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
    this.initializeObjectInVariable();
    if (isMobile) {
      this.UIManagerRef("UIManager-blackGraphic") && (this.UIManagerRef("UIManager-blackGraphic").width = this.props.resizeWidth);
      if (this.props.layoutMode === "Portrait") {
        this.UIManagerRef("UIManager-blackGraphic") && (this.UIManagerRef("UIManager-blackGraphic").height = this.props.resizeWidth);
      } else {
        this.UIManagerRef("UIManager-blackGraphic") && (this.UIManagerRef("UIManager-blackGraphic").height = this.props.resizeWidth);
      }
    }
    if (isMobile && window.innerWidth < window.innerHeight) {
      this.backgroundImagePortrait && (this.backgroundImagePortrait.visible = true);
      this.backgroundImage && (this.backgroundImage.visible = false);
      this.layoutChange(this.props.layoutMode);

      this.UIManagerRef("assetsContainerOfIntroWithoutBg") && (this.UIManagerRef("assetsContainerOfIntroWithoutBg").scale.x = 0.6);
      this.UIManagerRef("assetsContainerOfIntroWithoutBg") && (this.UIManagerRef("assetsContainerOfIntroWithoutBg").scale.y = 0.6);
      this.UIManagerRef("assetsContainerOfIntroWithoutBg") && (this.UIManagerRef("assetsContainerOfIntroWithoutBg").x = -42);
      this.UIManagerRef("assetsContainerOfIntroWithoutBg") && (this.UIManagerRef("assetsContainerOfIntroWithoutBg").y = 284);
    }
    if (isMobile && window.innerWidth > window.innerHeight) {
      this.backgroundImagePortrait && (this.backgroundImagePortrait.visible = false);
      this.backgroundImage && (this.backgroundImage.visible = true);
    }

    if (this.UIManagerRef("Text_Continue_" + this.ui_mode)) {
      let continueText = this.UIManagerRef("Text_Continue_" + this.ui_mode);
      this.UIManagerRef("postIntro_continueButton_" + this.ui_mode).mousedown = (event: any) => {
        continueText.scale.set(this.textScaling);
      };
      this.UIManagerRef("postIntro_continueButton_" + this.ui_mode).mouseup = (event: any) => {
        continueText.scale.set(1);
      };

      this.UIManagerRef("postIntro_continueButton_" + this.ui_mode).mouseout = (event: any) => {
        continueText.scale.set(1);
      };
    }
    this.continueButtonVisibility();
  }

  render() {
    if (this.props.freegameSpinCountRemaining !== undefined) {
      return <></>;
    }

    if (!this.props.showIntroScreen) {
      return <></>;
    } 

    const blackAreaConfig = {
      name: "UIManager-blackGraphic",
      type: "Graphic",
      shape: "rectangle",
      visible: this.blackmaskVisibility,
      alpha: 1,
      color: "0x000000",
      x: 0,
      y: 0,
      width: 1920,
      height: 1080,
    };

    return (
      <UIManager
        visible={this.props.startRendering}
        id={"mainintroductionContainer"}
        name={"mainintroductionContainer"}
        type={"Container"}
        app={this.app}
        configGame={this.props.configGame}
      >
        <UIManager
          visible={this.props.startRendering}
          id={"introductionContainer"}
          name={"introductionContainer"}
          type={"Container"}
          configGame={this.props.configGame}
          app={this.app}
          ref={(i) => (this.introductionContainer = i)}
        >
          {this.displayUI &&
            this.displayUI.map((i: any) => (
              <UIManager
                key={`UIManager-Introduction-${Math.random()}`}
                langObj={this.props.langObj}
                type={i.type}
                id={i.id}
                {...i}
                app={this.app}
                ClickHandler={this.handleEvent}
                configGame={this.props.configGame}
              />
            ))}
        </UIManager>
        <UIManager
          key={`UIManager-blackGraphic`}
          langObj={this.props.langObj}
          id={"UIManager-blackGraphic"}
          {...blackAreaConfig}
          app={this.app}
          configGame={this.props.configGame}
        />

      </UIManager>
    );
  }
}

export default withPixiApp(
  connect((state: Pick<IStore, | "introductionState" | "applicationState" | "freegameState" | "asyncInitAction" | "introductionScreenState" | "behaviourState">): IStateToProps => ({
    showIntroductionPage: state.introductionState.showIntroductionPage,
    layoutMode: state.applicationState.layoutMode,
    resizeWidth: state.applicationState.resizeWidth,
    introductionScreenVisible: state.introductionState.introductionScreenVisible,
    freegameSpinCountRemaining: state.freegameState.freegameSpinCountRemaining,
    gameBroken: state.asyncInitAction.gameBroken,
    startRendering: state.asyncInitAction.startRendering,
    showIntroScreen: state.introductionScreenState.showIntroScreen,
    soundOnOff: state.applicationState.soundOnOff,
  }),
    (dispatch: Dispatch): IDispatchToProps => ({
      hideIntroductionPage: (): any => dispatch(introductionActions1.hideIntroductionPage()),
      setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
      setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
      soundLoadStartFunction: (soundLoadStart: boolean): any => dispatch(soundActions.soundLoadStartFunction(soundLoadStart)),
      playingSound: (soundIsPlaying: any): any => dispatch(soundActions.playingSound(soundIsPlaying)),
      introScreenVisible: (showIntroScreen: boolean): any => dispatch(introductionActions.introScreenVisible(showIntroScreen)),
      setApplicationShowHelpText: (showHelpText: boolean): any => dispatch(applicationActions.setApplicationShowHelpText(showHelpText)),
      buttonClickedName: (clickedButtonName: string): any => dispatch(buttonActions.buttonClickedName(clickedButtonName)),
      realityCheckResume: (resumeRealityCheck: boolean): any => dispatch(behaviourAction.realityCheckResume(resumeRealityCheck)),
      setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),


    }))(withIntroductionScreenConfiguration(IntroductionInCanvas)));
