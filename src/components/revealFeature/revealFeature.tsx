import React, { Component } from "react";
import { withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withRevealFeatureConfiguration from "./configuration/withRevealFeatureConfiguration";
import { UIManager, GSAPTimer, } from "@bonanzainteractive/core";
import * as PIXI from "pixi.js";
import { layoutssActions, symbolActions, winpresentationAction, flowManagerAction, soundActions, reelsActions } from "@bonanzainteractive/slote_core";
import { isMobile } from "react-device-detect";
import { actions as featureReducer } from "../../gamereducer/revealFeatureReducer";
import { actions as featureAction } from "../../gamereducer/revealFeatureReducer";
import { actions as multiplierActions } from "../../gamereducer/multiplierReducer";
import { playSoundLoop } from "../../core/sounds/SoundControler";

interface IStore {
  [x: string]: any;
}

interface IProps {
  [x: string]: any;
}

interface IStateToProps {
  allSoundSFXStop: any;
  soundIsPlaying: any;
  level: any;
  transformTo: any;
  totalNumMysterySym: any;
  currentMysterySym: any;
  allSpinComplete: any;
  reel_data: any;
  inFreeGame: any;
  spinStart: any;
  isPostFeature: any;
  layoutMode: any;
  multiplierCurrentValue: number;
  isGameBroken: boolean;
  freegameSpinCountRemaining: number;
  freegameSpinCount: number;
  storeMultiplierCurrentValue: number;
  updateCollectionFreegameCounter: boolean;
  buyInSelected: boolean;
  fillpreviuosspindata: boolean;
  winningList: any;
  convertMysterySymFg: boolean;
  mysteryCoinList: any;
  revealFeatureStart: boolean;
  resultWinSpinInFG: any;
}

interface IDispatchToProps { }

interface IState {
  [x: string]: any;
}

class RevealFeature extends Component<IProps, IState> {
  protected app: PIXI.Application;
  protected ui_mode: string;
  protected displayUI: any;
  protected head_meter_bar_mask: any;
  protected currentMysteryCount: number = 0;
  protected targetMysteryCount: number = 10;
  protected lastcurrentMysteryCount: number = 0;
  protected lastTargetMysteryCount: number = 0;
  protected storingCounterForIncreasingBar: boolean = false;
  protected storingBarIconCount: number = 0;
  protected storeMultiplierValue: number = 1;
  protected barCount: number = 0;
  protected barStartingXFg: number = 0;
  protected counter: number = 0;
  private collectionCounter: number = 0;

  constructor(props: IProps) {
    super(props);

    this.app = props.app;
    if (isMobile) {
      this.ui_mode = "mobile";
    } else {
      this.ui_mode = "desktop";
    }
    this.displayUI = this.props.data.COMPONENTS.filter(
      this.checkUiMode.bind(this)
    );
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
    for (let i = 1; i < 10; i++) {
      UIManager.getRef("bg_reveal_sym" + i).visible = false;
      UIManager.getRef("ani_bg_reveal_sym" + i).scale.set(0.3);
      UIManager.getRef("ani_bg_reveal_sym" + i).visible = false;
    }
    UIManager.getRef("head_meter_bar") && (UIManager.getRef("head_meter_bar").visible = false);
  }
  bindUI() {
    this.layoutChange(this.props.layoutMode);
  }

  componentDidMount() {
    this.initializeObjectInVariable();
    this.bindUI();
    if (!this.props.isGameBroken && this.props.level > 0) {
      this.setTragetMysteryCount(this.props.level);
    }
  }
  layoutChange(currentLayout: string) {
    this.displayUI.forEach((data: any) => {
      if (data.layout === true) {
        this.props.setApplicationLayoutObject(data.name);
      }
    });
  }

  componentDidUpdate() {
    this.bindUI();
  }
  setTopBar(barLength: number) {
    if (this.counter === 0) {
      this.counter++;
      this.storeMultiplierValue = this.props.multiplierCurrentValue;
      this.addScaleTweenFg(barLength);
    } else {
      this.counter++;
    }
  }
  //all anim
  showMisteryLevel(featureLevel: number) {
    if (featureLevel !== -1) {
      let symContainer = [];
      for (let i = 1; i < 10; i++) {
        symContainer.push(UIManager.getRef("ani_bg_reveal_sym" + i));
      }
      for (let i = 0; i < symContainer.length; i++) {
        symContainer[i].visible = true;
        UIManager.getRef("ani_bg_reveal_sym" + (i + 1)).alpha = 1;
        symContainer[i].children[0].state.setAnimation(
          0,
          "reveal_sym_meter",
          false
        );
        symContainer[8].children[0].state.onComplete = () => { };
      }
    }
  }

  revealTopBar(featureLevel: number) {
    for (let i = 1; i <= featureLevel; i++) {
      UIManager.getRef("bg_reveal_sym" + i).visible = true;
      UIManager.getRef("head_meter_bar").visible = true;
    }
    for (let i = 1; i < 10; i++) {
      UIManager.getRef("ani_bg_reveal_sym" + i).alpha = 0;
    }
  }

  revealTopBarForFreeGame(featureLevel: number) {
    let symContainer = [];
    for (let i = featureLevel; i < featureLevel + 1; i++) {
      symContainer.push(UIManager.getRef("ani_bg_reveal_sym" + i));
    }
    for (let i = featureLevel - 1; i < featureLevel; i++) {
      symContainer[0].visible = true;
      UIManager.getRef("ani_bg_reveal_sym" + (i + 1)).alpha = 1;
      symContainer[0].children[0].state.setAnimation(0, "reveal_sym_meter", false);
    }
  }

  addScaleTween(obj: any, featureLevel: any) {
    if (obj) {
      obj.x = -720;
    }
  }
  addScaleTweenFg(addOnX: number) {
    UIManager.getRef("head_meter_bar").addChild(this.head_meter_bar_mask);
    UIManager.getRef("head_meter_bar").mask = this.head_meter_bar_mask;
    UIManager.getRef("head_meter_bar").visible = true;
  }

  showUpdatedMeter() {
    this.head_meter_bar_mask = new PIXI.Graphics();
    this.head_meter_bar_mask.beginFill(0xde3249);
    this.head_meter_bar_mask.drawRect(0, 0, UIManager.getRef("head_meter_bar").width, UIManager.getRef("head_meter_bar").height);
    this.head_meter_bar_mask.endFill();
    if (this.props.isGameBroken) {
      let currentlevet = this.props.level === -1 ? 0 : this.props.level;
      this.head_meter_bar_mask.x = -720 + currentlevet * 80;
      UIManager.getRef("head_meter_bar").visible = true;
    } else {
      this.head_meter_bar_mask.x = -720;
    }
    this.head_meter_bar_mask.y = 0;
    this.head_meter_bar_mask.alpha = 0.0001;
    UIManager.getRef("head_meter_bar").addChild(this.head_meter_bar_mask);
    UIManager.getRef("head_meter_bar").mask = this.head_meter_bar_mask;
    if (this.props.soundIsPlaying && !this.props.allSoundSFXStop) {
      // this.props.stopSound([{ name: "jq_sx_level_up_message" }]);
      // this.props.playSound([ { name: "jq_sx_level_up_message", loop: false, vol: 1 },]);
      
      playSoundLoop("jq_sx_level_up_message", "jq_sx_level_up_message", false);

    }
  }



  convertMysterySymbols(convertSymbol: any): Promise<any> {
    // console.log("yes..yhi h");
    let mysterySymbol: any = { 0: [], 1: [], 2: [], 3: [], 4: [] };
    if (this.props.mysteryCoinList && this.props.mysteryCoinList.length > 0) {
      return new Promise<void>(async (resolve) => {
        this.props.mysteryCoinList.forEach((s: Array<any>) => {
          mysterySymbol[s[0]].push(s[1]);
        });
        const dp = [0, 1, 2, 3, 4];
        for await (const i of dp) {
          let reel = UIManager.getRef("reel" + i);
          for await (const rc of reel.children) {
            const matchReelRow = Number(rc.rowId) - Number(1);
            if (mysterySymbol && mysterySymbol[i].length > 0 && mysterySymbol[i].includes(matchReelRow)) {
              //for Butterfly reveal  audio except on Queen being revealed
              // this.props.playSound([{ name: "Mystery_Symbol_Reveal_audio", loop: false, vol: 1 }]);
              if (convertSymbol === 14) {
                // this.props.playSound([{ name: "jq_sx_golden_queen_reveal", loop: false, vol: 0.8 }]);

                if (!this.props.allSoundSFXStop) {
                  playSoundLoop("jq_sx_golden_queen_reveal", "jq_sx_golden_queen_reveal", false);
                }
              } else {
                // this.props.playSound([{ name: "jq_sx_butterfly_reveal", loop: false, vol: 0.4 }]);
                if (!this.props.allSoundSFXStop) {
                  playSoundLoop("jq_sx_butterfly_reveal", "jq_sx_butterfly_reveal", false);
                }
              }
              // Please check this condition tomarrow
              await this.updateReelDataSymbols(
                [i, rc.rowId],
                convertSymbol
              );
            }
          }
        }
        resolve();
      });

    }

    return Promise.resolve();

  }

  getSymbolByReelID(reel: any, rowID: any) {
    for (let i: number = 0; i < reel.children.length; i++) {
      if (reel.children[i].rowId === rowID) {
        return reel.children[i];
      }
    }
  }

  updateReelDataSymbols(wildPos: any, convertSymbol: any): Promise<any> {
    let reelGrid = UIManager.getRef("reel" + wildPos[0]);
    let symbolContainer: any = this.getSymbolByReelID(reelGrid, wildPos[1]);
    let ypos = symbolContainer.y;
    return new Promise(async (resolve) => {
      await this.updateStopReelData(convertSymbol);
      this.props.onUpdateSymbolOnReel(symbolContainer, convertSymbol, false);
      symbolContainer.y = ypos;//
      symbolContainer.visible = false;
      resolve(ypos);
    });
  }

  private setTragetMysteryCount(no: number): void {

    this.targetMysteryCount = [10, 15, 20, 25, 30, 35, 40, 45, 50, 99][no];

  }
  // Update Freegame collectionCounter ////
  private updateFreegameCounter(props: any): void {
    this.collectionCounter = this.collectionCounter + 1;
    this.setTextUpdatedValue();
    this.updateMultiplier();
    if (this.checkOverFlowCollection()) {
      this.alertMessage();
      this.setTragetMysteryCount(props.level);
      this.collectionCounter = 0;
      this.setTextUpdatedValue();

    }
  }

  private setTextUpdatedValue(): void {
    UIManager.getRef("collected_digit").text = this.collectionCounter + "/" + this.targetMysteryCount;
  }

  /*
   this is used whenever over the collection freegame counter 
  */

  private alertMessage(): void {
    UIManager.getRef("FreeSpinePopUpContainer").visible = true;
    UIManager.getRef("FreeSpinePopUpContainer").alpha = 0;
  }
  private checkOverFlowCollection(): boolean {
    if (this.collectionCounter >= this.targetMysteryCount) {
      return true;
    }
    return false;
  }
  //////////////////////////////////+++++ update multiplier and bar upadte ++++++++++++////////////

  private updateMultiplier(): void {
    if (this.props.multiplierCurrentValue !== this.storeMultiplierValue && !this.props.isGameBroken) {
      if (this.props.inFreeGame) {
        this.storingCounterForIncreasingBar = true;
        this.storingBarIconCount = this.props.level;
      }
      this.storeMultiplierValue = this.props.multiplierCurrentValue;
      UIManager.getRef("FreeSpinetext1").text = "x" + this.props.multiplierCurrentValue;
    }
    if (this.storingCounterForIncreasingBar) {
      this.storingCounterForIncreasingBar = false;
      this.revealTopBarForFreeGame(this.props.level);
    }

  }
  async updateStopReelData(convertSymbol: any) {
    let reel_data = this.props.reel_data;
    for await (const reelStopRow of reel_data.stopReels) {
      reelStopRow.includes(13) && this.element_replace(reelStopRow, 13, convertSymbol);
    }
    this.props.updateReelData(reel_data);
    return reel_data;
  }
  element_replace(ele: any, checkNum: number, convertSymbol: any) {
    ele[ele.map((x: any, i: any) => [i, x]).filter(
      (x: number[]) => x[1] == checkNum)[0][0]] = convertSymbol;
    return ele
  }
  playWinPresentation() {
    this.props.stopSound([{ name: "jq_sx_butterfly_reveal" }]);
    if (this.props.winningList.length === 0) {
      this.onRevealfinished();
    } else {

      //NOTE - for showing win boxes
      // this.props.displayWinBox(true);
      // this.props.startWinPresentation();
      GSAPTimer.getInstance().addTimer(0.1, () => {
        this.props.startWinPresentation();
      });
    }
  }
  freeGameFLowManager() {
    this.playWinPresentation();
  }
  onRevealfinished() {
    GSAPTimer.getInstance().addTimer(0.8, () => {
      this.props.flowManagerCalled(true);
    });
  }

  onOrientationChange() {
    if (isMobile && window.innerHeight > window.innerWidth) {
      UIManager.getRef("mobileMainContainerReveal") &&
        UIManager.getRef("mobileMainContainerReveal").scale.set(1);
    } else {
      UIManager.getRef("mobileMainContainerReveal") &&
        UIManager.getRef("mobileMainContainerReveal").scale.set(1);
    }
  }


  mysterySymbol(nextProps: any): Promise<any> {
    return new Promise(() => this.convertMysterySymbols(nextProps.transformTo).then(() => {
      GSAPTimer.getInstance().addTimer(0.88, async () => {
        const dp = [0, 1, 2, 3, 4];
        for await (const i of dp) {
          let reelGrid = UIManager.getRef("reel" + i);
          for await (const rc of reelGrid.children) {
            rc.visible = true;
          }
        }

        GSAPTimer.getInstance().addTimer(800 / 1000, () => {
          if (this.props.inFreeGame) {
            this.props.multiplierShow(true);
          } else {
            this.props.setWinsSucces(this.props.resultWinSpinInFG);
            this.playWinPresentation();
          }
        });
      });
    }));
  }
  shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
    if (nextProps.allSpinComplete !== this.props.allSpinComplete || nextProps.reel_data !== this.props.reel_data ||
      nextProps.layoutMode !== this.props.layoutMode || nextProps.level !== this.props.level ||
      nextProps.transformTo !== this.props.transformTo || nextProps.spinStart !== this.props.spinStart ||
      nextProps.soundIsPlaying !== this.props.soundIsPlaying || nextProps.allSoundSFXStop !== this.props.allSoundSFXStop ||
      nextProps.updateCollectionFreegameCounter !== this.props.updateCollectionFreegameCounter
      || nextProps.fillpreviuosspindata !== this.props.fillpreviuosspindata
      || nextProps.revealFeatureStart !== this.props.revealFeatureStart
    ) {
      if (nextProps.spinStart && nextProps.spinStart !== this.props.spinStart) {
        nextProps.inFreeGame && this.props.setIsGameBroken(false);
        !nextProps.inFreeGame && !nextProps.isPostFeature && this.initializeObjectInVariable();
        this.storingCounterForIncreasingBar = false;
        this.barCount = 0;
      }
      if (nextProps.revealFeatureStart && nextProps.revealFeatureStart !== this.props.revealFeatureStart) {
        this.mysterySymbol(nextProps);
        nextProps.setButterflyCollect(false);
        this.props.setRevealFeatureStart(false);
      }
      return false;
    }
    return false;
  }

  render() {
    return (
      <UIManager
        id={"revealFeature"} name={"desktopMainContainer"} type={"Container"} app={this.app}      >
        {this.displayUI &&
          this.displayUI.map((i: any) => (<UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj}
            type={i.type} id={i.id}  {...i} app={this.app} configGame={this.props.configGame} scope={this} />
          ))}
      </UIManager>
    );
  }
}

export default withPixiApp(
  connect(
    (
      state: Pick<
        IStore, | "MultiplierState" | "winpresentationState" | "applicationState" | "soundState" | "revealFeatureState"
        | "reelsState" | "freegameState" | 'behaviourState'>, ownProps?: any
    ): IStateToProps => ({
      level: state.revealFeatureState.level,
      layoutMode: state.applicationState.layoutMode,
      transformTo: state.revealFeatureState.transformTo,
      totalNumMysterySym: state.revealFeatureState.totalNumMysterySym,
      currentMysterySym: state.revealFeatureState.currentMysterySym,
      reel_data: state.reelsState.reel_data,
      allSpinComplete: state.reelsState.allSpinComplete,
      inFreeGame: state.freegameState.inFreeGame,
      spinStart: state.reelsState.spinStart,
      isPostFeature: state.winpresentationState.isPostFeatureRequired,
      allSoundSFXStop: state.soundState.allSoundSFXStop,
      soundIsPlaying: state.soundState.soundIsPlaying,
      multiplierCurrentValue: state.MultiplierState.multiplierCurrentValue,
      isGameBroken: state.revealFeatureState.isGameBroken,
      freegameSpinCountRemaining: state.freegameState.freegameSpinCountRemaining,
      freegameSpinCount: state.freegameState.freegameSpinCount,
      storeMultiplierCurrentValue: state.MultiplierState.storeMultiplierCurrentValue,
      updateCollectionFreegameCounter: state.freegameState.updateCollectionFreegameCounter,
      buyInSelected: state.behaviourState.buyInSelected,
      fillpreviuosspindata: state.freegameState.fillpreviuosspindata,
      winningList: state.reelsState.winningList,
      convertMysterySymFg: state.revealFeatureState.convertMysterySymFg,
      mysteryCoinList: state.revealFeatureState.mysteryCoinList,
      revealFeatureStart: state.revealFeatureState.revealFeatureStart,
      resultWinSpinInFG: state.revealFeatureState.resultWinSpinInFG,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
      setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
      updateReelData: (result_reel: any): any => dispatch(reelsActions.updateReelData(result_reel)),
      onUpdateSymbolOnReel: (symbol: any, symbolId: number, randomSymbol: boolean): any => dispatch(symbolActions.setUpdatedSymbol(symbol, symbolId, randomSymbol)),
      playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
      stopSound: (soundName: any): any => dispatch(soundActions.stopSound(soundName)),
      setIsGameBroken: (isGameBroken: any): any => dispatch(featureReducer.setIsGameBroken(isGameBroken)),
      startWinPresentation: (): any => dispatch(winpresentationAction.startWinPresentation()),
      displayWinBox: (displayWinBox: boolean): any => dispatch(winpresentationAction.displayWinBox(displayWinBox)),
      featureExists: (containsFeature: boolean): any => dispatch(featureReducer.featureExists(containsFeature)),
      flowManagerCalled: (callFlowManager: boolean): any => dispatch(flowManagerAction.flowManagerCalled(callFlowManager)),
      setButterflyCollect: (convertMysterySymFg: boolean): any => dispatch(featureReducer.setButterflyCollect(convertMysterySymFg)),
      setWinsSucces: (result_reel: any): any => dispatch(winpresentationAction.setWinsSucces(result_reel)),
      setRevealFeatureStart: (revealFeatureStart: boolean): any => dispatch(featureAction.setRevealFeatureStart(revealFeatureStart)),
      multiplierShow: (showMultiplier: boolean): any =>
        dispatch(multiplierActions.multiplierShow(showMultiplier)),
    })
  )(withRevealFeatureConfiguration(RevealFeature))
);