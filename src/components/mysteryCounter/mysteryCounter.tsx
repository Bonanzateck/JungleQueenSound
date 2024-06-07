import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withMysteryCounterConfiguration from "./configuration/withMysteryCounterConfiguration";
import {
  UIManager,
  GSAPTimer,
  GSAPTween,
  ItweenProps,
} from "@bonanzainteractive/core";

import * as PIXI from "pixi.js";
import { isMobile } from "react-device-detect";
import { actions as featureAction } from "../../gamereducer/revealFeatureReducer";
import { actions as multiplierActions } from "../../gamereducer/multiplierReducer";
import { layoutssActions, soundActions } from "@bonanzainteractive/slote_core";
import { configGame } from "../../slot/data/config";
import { playSoundLoop } from "../../core/sounds/SoundControler";
interface IStore {
  [x: string]: any;
}
interface IProps {
  [x: string]: any;
}
interface IStateToProps { }

interface IDispatchToProps { }
interface IState {
  [x: string]: any;
}

// Butterfly collection sound can be added in this comp 
class MysteryCounter extends Component<IProps, IState> {
  protected app: PIXI.Application;
  protected ui_mode: string;
  protected displayUI: any;
  protected mysteryCounterContainer: _ReactPixi.IContainer | Ref<any>;
  protected positionsArr: any;
  protected resetPositionsArr: any;
  protected currentMystCount: any;
  protected totalMystCount: any;
  protected xAxis: number = configGame.REEL_CONTAINER_X;
  protected yAxis: number = configGame.REEL_CONTAINER_Y;
  private levelCollectedArr = [0, -10, -25, -45, -70, -100, -135, -175, -220, -270, -325,];
  constructor(props: IProps) {
    super(props);
    this.app = props.app;
    if (isMobile) {
      this.ui_mode = "mobile";
    } else {
      this.ui_mode = "desktop";
    }
    this.mysteryCounterContainer = {};
    this.xAxis = configGame.REEL_CONTAINER_X;
    this.yAxis = configGame.REEL_CONTAINER_Y;
    this.setXYforAnimation();
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

  setXYforAnimation() {
    if (isMobile) {
      if (window.innerHeight > window.innerWidth) {
        this.xAxis = 106;
        this.yAxis = 106;
      } else {
        this.xAxis = 500;
        this.yAxis = -270;
      }
    }
  }

  bindUI() {
  }

  componentDidMount() {
    this.layoutChange(this.props.layoutMode);
    this.onOrientationChange();
    this.initializeText();
  }

  layoutChange(currentLayout: string) {
    this.displayUI.map((data: any) => {
      if (data.layout === true) {
        this.props.setApplicationLayoutObject(data.name);
      }
    });
    this.setXYforAnimation();
  }

  initializeText() {
    this.currentMystCount = UIManager.getRef("currentCounter");
    this.totalMystCount = UIManager.getRef("totalCounter");
    if (this.props.level >= 0) {
      const totalNumMysterySym =
        this.props.totalNumMysterySym >= 0 ? this.props.totalNumMysterySym : 0;
      const currentMysterySym =
        this.props.currentMysterySym >= 0 ? this.props.currentMysterySym : 0;
      this.updateCounterText(
        "currentCounter",
        totalNumMysterySym -
        currentMysterySym +
        this.levelCollectedArr[
        this.props.prevLevel >= 0 ? this.props.prevLevel : this.props.level
        ]
      );
      this.totalCollectorUpdate(
        this.props.prevLevel >= 0 ? this.props.prevLevel : this.props.level
      );
    } else {
      if (this.props.level < 0) {
        this.updateCounterText(
          "currentCounter",
          this.props.totalNumMysterySym -
          this.props.currentMysterySym +
          this.levelCollectedArr[0]
        );
      } else {
        this.updateCounterText(
          "currentCounter",
          this.props.storeMultiplierCurrentValue - 1 > 0
            ? this.props.totalNumMysterySym +
            this.levelCollectedArr[this.props.storeMultiplierCurrentValue]
            : this.props.totalNumMysterySym > 0
              ? this.props.totalNumMysterySym
              : 0
        );
      }
    }
  }
  updateCounterText(name: string, property: any) {
    UIManager.setText(name, property);
  }
  totalCollectorUpdate(level: number) {
    this.updateCounterText("totalCounter", Number(Number(level) * 5 + 10));
  }
  componentDidUpdate() {
    this.layoutChange(this.props.layoutMode);
    this.onOrientationChange();
  }

  onOrientationChange() {

  }

  processItem(butterFly: any, item: number, resolve: any) {
    let totalNumMysterySym = 0;
    if (
      (this.props.level !== this.props.prevLevel ||
        this.props.level === this.props.prevLevel) &&
      this.currentMystCount.text >= 0
    ) {
      totalNumMysterySym =
        this.props.prevLevel >= 0
          ? this.props.totalNumMysterySym +
          this.levelCollectedArr[this.props.prevLevel]
          : this.props.totalNumMysterySym;
    }
    GSAPTimer.getInstance().addTimer(0.01 + item / 10, () => {
      const tweenProps: ItweenProps = {
        x: isMobile ? window.innerHeight > window.innerWidth ? 88 : 430 : 1656.5,
        y: isMobile ? window.innerHeight > window.innerWidth ? -250 : -565 : 515,
        duration: 0.8,
        ease: "circ",
        onComplete: () => {
          GSAPTimer.getInstance().addTimer(0.1, () => {
            butterFly.visible = false;
            this.updateCounterText("currentCounter", totalNumMysterySym);
            resolve(item);
          });
        },
      };
      GSAPTween.getInstance().gsapTween(butterFly, tweenProps);
    });
  }

  storePromise(child: any, storeMysPosition: any, index: number) {
    return new Promise(async (resolve, reject) => {
      if (
        child.name.startsWith("butterFLy_") &&
        index <= storeMysPosition.length - 1
      ) {
        UIManager.getRef(child.name).x = storeMysPosition[index].x;
        UIManager.getRef(child.name).y = storeMysPosition[index].y;
        UIManager.getRef(child.name).visible = true;
        return this.processItem(UIManager.getRef(child.name), index, resolve);
      } else {
        return resolve("success");
      }
    });
  }

  setInitialPositionForButterFlies(storeMysPosition: any) {
    this.displayUI[0].child.map((data: any, index: number) =>
      this.storePromise(data, storeMysPosition, index)
    )
    this.props.setButterflyCollect(true)
    // this.props.multiplierShow(true);
  }

  // async setInitialPositionForButterFlies(storeMysPosition: any): Promise<any> {
  //   return await Promise.all(
  //     this.displayUI[0].child.map((data: any, index: number) =>
  //       this.storePromise(data, storeMysPosition, index)
  //     )
  //   ).then((res) => {
  //     this.props.multiplierShow(true);
  //   });
  // }

  startbutterFliesMoving(storeMysPosition: any) {
    // this.props.playSound([{ name: 'jq_sx_butterfly_collection', loop: false, vol: 1 }]);

    if (!this.props.allSoundSFXStop) {
      playSoundLoop("jq_sx_butterfly_collection", "jq_sx_butterfly_collection", false);
    }

    this.setInitialPositionForButterFlies(storeMysPosition);
  }

  async mysterySymbolPosition(): Promise<any> {
    let reel_data = this.props.reel_data;
    let pos = [];
    let reelId = 0;
    for await (const columnStopReel of reel_data.stopReels) {
      let rowId = 0;
      for await (const rowReelStopReel of columnStopReel) {
        if (rowReelStopReel === 13) {
          let x_pos = this.xAxis + reelId * configGame.SYMBOL_WIDTH + configGame.SYMBOL_WIDTH / 2;
          let y_pos = this.yAxis + rowId * configGame.SYMBOL_HEIGHT + configGame.SYMBOL_HEIGHT / 2;
          if (isMobile) {
            if (window.innerHeight > window.innerWidth) {
              x_pos = this.xAxis + (reelId * configGame.SYMBOL_WIDTH);
              y_pos = this.yAxis + (rowId * configGame.SYMBOL_HEIGHT);
            } else {
              x_pos = this.xAxis + (reelId * configGame.SYMBOL_WIDTH);
              y_pos = this.yAxis + (rowId * configGame.SYMBOL_HEIGHT);
            }
          }
          pos.push({ x: x_pos, y: y_pos });
        }
        rowId++;
      }
      reelId++;
    }
    pos.length !== 0 && this.startbutterFliesMoving(pos);
    pos.length === 0 && this.forwardToNextStep();
  }
  forwardToNextStep() {
    this.props.setButterflyCollect(true);
  }
  shouldComponentUpdate(
    nextProps: Readonly<IProps>,
    nextState: Readonly<IState>,
    nextContext: any
  ): boolean {
    if (
      nextProps.layoutMode !== this.props.layoutMode ||
      nextProps.spinStart !== this.props.spinStart ||
      nextProps.containsFeature !== this.props.containsFeature ||
      nextProps.allSpinComplete !== this.props.allSpinComplete
    ) {
      if (nextProps.layoutMode !== this.props.layoutMode) {
        this.layoutChange(nextProps.layoutMode);
      }
      if (
        nextProps.containsFeature &&
        nextProps.allSpinComplete &&
        nextProps.allSpinComplete !== this.props.allSpinComplete
      ) {
        //butterflies will start moving from symbols---------------------------
        this.props.setButterflyCollect(false);
        this.props.setRevealFeatureStart(false);
        this.mysterySymbolPosition();
      }
    }
    if (
      this.props.level !== this.props.prevLevel &&
      this.totalMystCount.text <= 0
    ) {
      if (nextProps.reConstruction) {
        this.updateCounterText(
          "currentCounter",
          this.props.totalNumMysterySym -
          this.props.currentMysterySym +
          this.levelCollectedArr[
          nextProps.prevLevel > 0 ? nextProps.prevLevel : nextProps.level
          ]
        );
      }
      this.updateCounterText(
        "totalCounter",
        this.totalCollectorUpdate(
          nextProps.prevLevel >= 0 ? nextProps.prevLevel : nextProps.level
        )
      );
    }
    return false;
  }

  render() {
    return (
      <UIManager
        id={"mysteryCounterContainer"}
        name={"mysteryCounterContainer"}
        type={"Container"}
        app={this.app}
        ref={(i) => (this.mysteryCounterContainer = i)}
      >
        {this.displayUI &&
          this.displayUI.map((i: any) => (
            <UIManager
              key={`UIManager-${Math.random()}`}
              langObj={this.props.langObj}
              type={i.type}
              id={i.id}
              {...i}
              app={this.app}
              configGame={this.props.configGame}
              scope={this}
            />
          ))}
      </UIManager>
    );
  }
}

export default withPixiApp(
  connect(
    (
      state: Pick<
        IStore,
        | "behaviourState"
        | "basegameState"
        | "revealFeatureState"
        | "soundState"
        | "winpresentationState"
        | "applicationState"
        | "freegameState"
        | "reelsState"
        | "MultiplierState"
      >,
      ownProps?: any
    ): IStateToProps => ({
      reel_data: state.reelsState.reel_data,
      layoutMode: state.applicationState.layoutMode,
      spinStart: state.reelsState.spinStart,
      level: state.revealFeatureState.level,
      prevLevel: state.revealFeatureState.prevLevel,
      basegamestate: state.basegameState.basegamestate,
      allSpinComplete: state.reelsState.allSpinComplete,
      currentMysterySym: state.revealFeatureState.currentMysterySym,
      totalNumMysterySym: state.revealFeatureState.totalNumMysterySym,
      containsFeature: state.revealFeatureState.containsFeature,
      storeMultiplierCurrentValue:
        state.MultiplierState.storeMultiplierCurrentValue,
      reConstruction: state.basegameState.reConstruction,
      allSoundSFXStop: state.soundState.allSoundSFXStop,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
      setApplicationLayoutObject: (layoutobjectlist: any): any =>
        dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
      isButterFliesPlaced: (butterFliesPlaced: boolean): any =>
        dispatch(featureAction.isButterFliesPlaced(butterFliesPlaced)),
      multiplierShow: (showMultiplier: boolean): any =>
        dispatch(multiplierActions.multiplierShow(showMultiplier)),
      setButterflyCollect: (butterFlyCollected: boolean): any =>
        dispatch(featureAction.setButterflyCollect(butterFlyCollected)),
      setRevealFeatureStart: (revealFeatureStart: boolean): any =>
        dispatch(featureAction.setRevealFeatureStart(revealFeatureStart)),
      playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),

    })
  )(withMysteryCounterConfiguration(MysteryCounter))
);
export { MysteryCounter };
