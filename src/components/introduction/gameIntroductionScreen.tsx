import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { UIManager, GSAPTimer } from "@bonanzainteractive/core";
import PIXI from "pixi.js";
import { isMobile } from "react-device-detect";
import { constant } from "../../slot/data/config";
import { soundActions, withBannerConfiguration, } from "@bonanzainteractive/slote_core";
import { cloneDeep } from "lodash";
import { configGame } from "../../slot/data/config";
import { playSoundLoop } from "../../core/sounds/SoundControler";


interface IProps {
  [x: string]: any;
}
interface IStore {
  [x: string]: any;
}

interface IStateToProps {
  layoutMode: string;
  allSoundSFXStop: any

}
interface IDispatchToProps {
}

interface IState {
  [x: string]: any;
}

class GameIntroductionScreen extends Component<IProps, IState> {
  protected app: PIXI.Application;
  protected gameIntrodunctionContainer: _ReactPixi.IContainer | Ref<any>;
  protected ui_mode: string;
  protected displayUI: Object[] = [];
  protected objName: string;
  private UIManagerRef: any;
  protected storeWinAmount: number = 0;
  private count: number = 1;
  constructor(props: IProps) {
    super(props);
    this.app = props.app;
    this.state = {
      uiElements: [],
      lang: "en"
    }
    this.gameIntrodunctionContainer = {}
    if (isMobile) {
      this.ui_mode = "mobile";
      this.objName = "_mobile";
    } else {
      this.ui_mode = "desktop";
      this.objName = "_desktop";
    }
    this.UIManagerRef = UIManager.getRef;
    this.count = 1;
    this.displayUI = this.props.child.filter(this.checkUiMode.bind(this));
    this.autoScrollScreens();

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

  //this method will call when layout changes
  layoutChange(currentLayout: string) {
    this.displayUI.forEach((data: any) => {
      if (data.layout === true) {
        this.props.setApplicationLayoutObject(data.name);
      }
    }
    )
  }

  checkIntroMobileUi() {
    if (isMobile && window.innerHeight < window.innerWidth) {

      this.UIManagerRef("backgroundImageOfIntroductionPage_portrait").width = 1920;
      this.UIManagerRef("backgroundImageOfIntroductionPage_portrait").height = 1080;
      // LOGO Landscape
      this.UIManagerRef("image_game_logo").x = 800;
      this.UIManagerRef("image_game_logo").width = 451;
      this.UIManagerRef("image_game_logo").height = 290;

      //-----------------First Slide---------------------------------------

      this.UIManagerRef("page1Image1").x = 130;
      this.UIManagerRef("page1Image1").y = 291;
      this.UIManagerRef("page1Image1").width = 796.38;
      this.UIManagerRef("page1Image1").height = 524.94;

      this.UIManagerRef("page1Image1Text1").x = 1500;
      this.UIManagerRef("page1Image1Text1").y = 400;
      this.UIManagerRef("page1Image1Text2").x = 1500;
      this.UIManagerRef("page1Image1Text2").y = 500;
      this.UIManagerRef("page1Image1Text3").x = 1500;
      this.UIManagerRef("page1Image1Text3").y = 670;

      this.UIManagerRef("Intro_page_inActive_1").x = 880;
      this.UIManagerRef("Intro_page_inActive_1").y = 880;
      this.UIManagerRef("Intro_page_active_1").x = 880;
      this.UIManagerRef("Intro_page_active_1").y = 880;

      //-----------------Second Slide------------------------------------------

      this.UIManagerRef("page2Image1").x = 130;
      this.UIManagerRef("page2Image1").y = 291;
      this.UIManagerRef("page2Image1").width = 796.38;
      this.UIManagerRef("page2Image1").height = 524.94;

      this.UIManagerRef("page2Image1Text1").x = 1500;
      this.UIManagerRef("page2Image1Text1").y = 400;
      this.UIManagerRef("page2Image1Text2").x = 1500;
      this.UIManagerRef("page2Image1Text2").y = 500;
      this.UIManagerRef("page2Image1Text3").x = 1500;
      this.UIManagerRef("page2Image1Text3").y = 670;

      this.UIManagerRef("Intro_page_inActive_2").x = 920;
      this.UIManagerRef("Intro_page_inActive_2").y = 880;
      this.UIManagerRef("Intro_page_active_2").x = 920;
      this.UIManagerRef("Intro_page_active_2").y = 880;

      //-----------------Third Slide-------------------------------------------

      this.UIManagerRef("page3Image1").x = 130;
      this.UIManagerRef("page3Image1").y = 291;
      this.UIManagerRef("page3Image1").width = 796.38;
      this.UIManagerRef("page3Image1").height = 524.94;

      this.UIManagerRef("page3Image1Text1").x = 1500;
      this.UIManagerRef("page3Image1Text1").y = 400;
      this.UIManagerRef("page3Image1Text2").y = 500;
      this.UIManagerRef("page3Image1Text2").x = 1500;

      this.UIManagerRef("Intro_page_inActive_3").x = 960;
      this.UIManagerRef("Intro_page_inActive_3").y = 880;
      this.UIManagerRef("Intro_page_active_3").x = 960;
      this.UIManagerRef("Intro_page_active_3").y = 880;

      //-----------------Fourth Slide-----------------------------------------

      this.UIManagerRef("page4Image1").x = 130;
      this.UIManagerRef("page4Image1").y = 291;
      this.UIManagerRef("page4Image1").width = 796.38;
      this.UIManagerRef("page4Image1").height = 524.94;

      this.UIManagerRef("page4Image1Text1").x = 1500;
      this.UIManagerRef("page4Image1Text1").y = 400;
      this.UIManagerRef("page4Image1Text2").y = 500;
      this.UIManagerRef("page4Image1Text2").x = 1500;

      this.UIManagerRef("Intro_page_inActive_4").x = 1000;
      this.UIManagerRef("Intro_page_inActive_4").y = 880;
      this.UIManagerRef("Intro_page_active_4").x = 1000;
      this.UIManagerRef("Intro_page_active_4").y = 880;

      //-----------------Fifth Slide------------------------------------------

      this.UIManagerRef("page5Image1").x = 130;
      this.UIManagerRef("page5Image1").y = 291;
      this.UIManagerRef("page5Image1").width = 796.38;
      this.UIManagerRef("page5Image1").height = 524.94;

      this.UIManagerRef("page5Image1Text1").x = 1500;
      this.UIManagerRef("page5Image1Text1").y = 400;
      this.UIManagerRef("page5Image1Text2").y = 500;
      this.UIManagerRef("page5Image1Text2").x = 1500;

      this.UIManagerRef("Intro_page_inActive_5").x = 1040;
      this.UIManagerRef("Intro_page_inActive_5").y = 880;
      this.UIManagerRef("Intro_page_active_5").x = 1040;
      this.UIManagerRef("Intro_page_active_5").y = 880;
    }
  }


  shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
    return false;
  }

  functionActivePage(par1: boolean, par2: boolean, par3: boolean, par4: boolean, par5: boolean) {
    this.UIManagerRef("Intro_page_active_1").visible = par1;
    this.UIManagerRef("Intro_page_active_2").visible = par2;
    this.UIManagerRef("Intro_page_active_3").visible = par3;
    this.UIManagerRef("Intro_page_active_4").visible = par4;
    this.UIManagerRef("Intro_page_active_5").visible = par5;
    this.UIManagerRef("postIntro_Page1").visible = par1;
    this.UIManagerRef("postIntro_Page2").visible = par2;
    this.UIManagerRef("postIntro_Page3").visible = par3;
    this.UIManagerRef("postIntro_Page4").visible = par4;
    this.UIManagerRef("postIntro_Page5").visible = par5;

  }

  buttonVisibilityFuc(par1: boolean, par2: boolean, par3: boolean, par4: boolean, par5: boolean) {
    this.UIManagerRef("Intro_page_inActive_1").visible = par1;
    this.UIManagerRef("Intro_page_inActive_2").visible = par2;
    this.UIManagerRef("Intro_page_inActive_3").visible = par3;
    this.UIManagerRef("Intro_page_inActive_4").visible = par4;
    this.UIManagerRef("Intro_page_inActive_5").visible = par5;
  }

  //this method will be called when a button will clicked
  onClick(evt: any) {
    // this.props.playSound([{ name: "jq_sx_generic_button", loop: false, vol: 0.6 }]);
    if (!this.props.allSoundSFXStop) {
      playSoundLoop("jq_sx_generic_button", "jq_sx_generic_button", false, 0.6);
    }
    if (evt.target.name === "Intro_page_inActive_1") {
      this.functionActivePage(true, false, false, false, false)
      this.buttonVisibilityFuc(false, true, true, true, true)
      this.count = 1
    } else if (evt.target.name === "Intro_page_inActive_2") {
      this.functionActivePage(false, true, false, false, false);
      this.buttonVisibilityFuc(true, false, true, true, true)
      this.count = 2
    } else if (evt.target.name === "Intro_page_inActive_3") {
      this.functionActivePage(false, false, true, false, false)
      this.buttonVisibilityFuc(true, true, false, true, true)
      this.count = 3
    } else if (evt.target.name === "Intro_page_inActive_4") {
      this.functionActivePage(false, false, false, true, false)
      this.buttonVisibilityFuc(true, true, true, false, true)
      this.count = 4
    } else if (evt.target.name === "Intro_page_inActive_5") {
      this.functionActivePage(false, false, false, false, true)
      this.buttonVisibilityFuc(true, true, true, true, false)
      this.count = 5
    }
  }

  componentDidMount() {
    this.checkIntroMobileUi();
  }


  autoScrollScreens() {
    GSAPTimer.getInstance().addTimer(4, () => {
      this.count++;
      this.count = this.count > 5 ? 1 : this.count;
      for (var i = 1; i <= constant.configGame.NOOFTOTALSCREEN; i++) {
        this.UIManagerRef("postIntro_Page" + i) && (this.UIManagerRef("postIntro_Page" + i).visible = false);
        this.UIManagerRef("Intro_page_inActive_" + i) && (this.UIManagerRef("Intro_page_inActive_" + i).visible = true);
        this.UIManagerRef("Intro_page_active_" + i) && (this.UIManagerRef("Intro_page_active_" + i).visible = false);
        if (i == this.count) {
          this.UIManagerRef("postIntro_Page" + this.count) && (this.UIManagerRef("postIntro_Page" + this.count).visible = true);
          this.UIManagerRef("Intro_page_inActive_" + this.count) && (this.UIManagerRef("Intro_page_inActive_" + this.count).visible = false);
          this.UIManagerRef("Intro_page_active_" + this.count) && (this.UIManagerRef("Intro_page_active_" + this.count).visible = true);
        }
      }


      UIManager.getRef("introductionScreenContainer").visible && this.autoScrollScreens();
    });
  }

  setLayout() {
    this.layoutChange(this.props.layoutMode);
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
    this.setLayout();
  }

  render() {
    return (
      <UIManager id={"gameIntrodunctionContainer"} name={"gameIntrodunctionContainer"} type={"Container"}
        app={this.app} configGame={configGame}
        ref={i => this.gameIntrodunctionContainer = i}>
        {
          this.displayUI && this.displayUI.map((i: any) =>
            <UIManager key={`UIManager-${Math.random()}`} ClickHandler={this.onClick.bind(this)}
              scope={this}
              langObj={this.props.langObj} type={i.type} group={this.props.group} app={this.app}
              configGame={configGame}
              id={i.id} {...i} />)
        }
      </UIManager>)
  }
}

export default withPixiApp(connect(
  (state: Pick<IStore, 'applicationState' | 'soundState'>): IStateToProps => ({
    layoutMode: state.applicationState.layoutMode,
    allSoundSFXStop: state.soundState.allSoundSFXStop,

  }),
  (dispatch: Dispatch): IDispatchToProps => ({
    playSound: (soundName: string[]): any => dispatch(soundActions.playSound(soundName)),
  }))(withBannerConfiguration(GameIntroductionScreen)));
