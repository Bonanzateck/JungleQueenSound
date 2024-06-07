import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { layoutssActions, soundActions, withBaseGameConfiguration, baseGameAction, applicationActions, frameworkReelGrid, buttonActions } from "@bonanzainteractive/slote_core";
import PIXI, { Texture } from "pixi.js";
import { isMobile, isTablet } from "react-device-detect";
import { configGame } from "../../slot/data/config";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { CURRENCY, GSAPTimer, GSAPTween, ItweenProps, UIManager } from "@bonanzainteractive/core";

interface IProps {
  [x: string]: any;
}

interface IStore {
  [x: string]: any;
}


interface IStateToProps {
  soundOnOff: boolean;
  languageCode: string;
  layoutMode: string;
  jurisdictionKey: string;
  balance: number;
  winAmount: number;
  allSpinComplete: boolean;
  stopIfSingleWinExceed: number;
  stopIfBalanceIncreasedBy: number;
  stopIfBalanceDecreasedBy: number;
  stopAutoplayOnAnyWin: boolean;
  basegamestate: boolean;
  spinStart: boolean;
  currentBetIndex: number;
  betList: object;
  allButtonEnable: boolean;
  transitionBalance: number;
  previousBalance: number;
  selectedCoin: number;
  coinList: object;
  spinStopID: number;
  displayReelGridSymbolCount: object;
  winAmountEmpty: boolean;
  InTurboMode: boolean;
  resetManyWaysTextToInitial: boolean;
  totalCreditWinAmount: number;
  featureJustReTriggered: boolean;
  storeAmountForAutoplay: number;
  blastStart: boolean;
  freegameSpinCountRemaining: any;
  currencyGroupingSeparator: string;
  currencyDecimalSeparator: string;
  currentVoucherResult: object;
  currentVoucherSpinResult: object;
  isLastWinSame: boolean;
}

interface IDispatchToProps { }

interface IState {
  [x: string]: any;
}

class GofBaseGame extends Component<IProps, IState> {
  protected app: PIXI.Application;
  protected gofBaseGameContainer: _ReactPixi.IContainer | Ref<any>;
  protected ui_mode: string;
  protected displayUI: Object[] = [];
  protected logoAnimIntervalTime: number;

  protected originalScalingOfObject: number = 1;
  protected frameBorderScaling: number = 0.88;
  protected manywaysTextPortraitScalingX: number = 0.7;
  protected manywaysTextPortraitScalingY: number = 0.8;
  protected cavePortraitScalingX: number = 0.9;
  protected cavePortraitScalingY: number = 0.89;
  protected constantT1: number = 2000;
  protected constantT2: number = 100;
  protected mwTextValue: number = 1;
  protected winValueStore: number = 0;
  protected reelGridSymbolsArray: any = [];
  protected winCelebration: boolean = true;
  protected mwIntialValue: number = 2880;
  protected logoAnimDelay: number = 1000;
  private AllTimer: any[] = [];
  private UIManagerRef: any;
  private UIManagerSetText: any = UIManager.setText;
  constructor(props: IProps) {
    super(props);
    this.app = props.app;
    this.state = {
      uiElements: [],
      lang: "en",
    };
    this.gofBaseGameContainer = {};
    if (isMobile) {
      this.ui_mode = "mobile";
    } else {
      this.ui_mode = "desktop";
    }
    this.UIManagerRef = UIManager.getRef;
    this.logoAnimIntervalTime = 11050;
    this.displayUI = this.props.child.filter(this.checkUiMode.bind(this));
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

  symbolDroping() {
    frameworkReelGrid.data.delayDropDuration = 200;
  }


  useQuery = () => {
    let search = window.location.search;
    return new URLSearchParams(search);
  }

  componentDidMount() {
    if (this.props.basegamestate && this.props.soundOnOff) {
      if (((localStorage.getItem("playerId-sound-" + this.useQuery().get("token")) === "true") ? true : false)) {
        this.props.playingSound(true);
      } else {
        this.props.playingSound(false);
      }
      this.symbolDroping();
      if (this.props.freegameSpinCountRemaining !== undefined) {
        let graphicName: string;
        if (isMobile && window.innerWidth < window.innerHeight) {
          graphicName = "baseGameBlackScreenPortrait";
        } else {
          graphicName = "baseGameBlackScreen";
        }
        this.UIManagerRef(graphicName) && (this.UIManagerRef(graphicName).visible = true);
        GSAPTimer.getInstance().addTimer(50 / 1000, () => {
          const tweenProps: ItweenProps = {
            alpha: 0,
            duration: 0.5,
            onComplete: () => {
              this.UIManagerRef(graphicName).visible = false;
              GSAPTween.getInstance().killTween(this.UIManagerRef(graphicName));
            }
          }
          GSAPTween.getInstance().gsapTween(this.UIManagerRef(graphicName), tweenProps);

        });

      }
    }
    this.layoutChange(this.props.layoutMode);
    this.bindUI();
    this.setManywaysInitially();
    this.onOrientationChange();
    this.wintextposition();
    if (this.props.jurisdictionKey === "social") {
      this.UIManagerRef("good_Luck_Text") && (this.UIManagerRef("good_Luck_Text").visible = true);
    }
    this.UIManagerRef("voucherGraphic_4") && (this.UIManagerRef("voucherGraphic_4").visible = false);
    this.anticipationScaling();
  }

  anticipationScaling(){
    this.UIManagerRef("anticipation_Scatter2") && (this.UIManagerRef("anticipation_Scatter2").scale.set(-1));
  }

  wintextposition() {
    if (this.props.jurisdictionKey === "social") {
      if (window.innerHeight > window.innerWidth) {
        //this.UIManagerRef("text_Win_label_mobile") && (this.UIManagerRef("text_Win_label_mobile").x = 804.5) && (this.UIManagerRef("text_Win_label_mobile").y = 739);
        this.UIManagerRef("text_colonSymbol3_mobile") && (this.UIManagerRef("text_colonSymbol3_mobile").x = 725) && (this.UIManagerRef("text_colonSymbol3_mobile").y = 583);
        this.UIManagerRef("text_Win_value_mobile") && (this.UIManagerRef("text_Win_value_mobile").x = 735) && (this.UIManagerRef("text_Win_value_mobile").y = 585);
      } else {
        this.UIManagerRef("text_Win_label_mobile") && (this.UIManagerRef("text_Win_label_mobile").x = 880) && (this.UIManagerRef("text_Win_label_mobile").y = -95);
        this.UIManagerRef("text_colonSymbol3_mobile") && (this.UIManagerRef("text_colonSymbol3_mobile").x = 885) && (this.UIManagerRef("text_colonSymbol3_mobile").y = -97);
        this.UIManagerRef("text_Win_value_mobile") && (this.UIManagerRef("text_Win_value_mobile").x = 905) && (this.UIManagerRef("text_Win_value_mobile").y = -95);
      }
    } else {
      if (window.innerWidth > window.innerHeight) {
        this.UIManagerRef("text_Win_label_mobile") && (this.UIManagerRef("text_Win_label_mobile").x = 926.7) && (this.UIManagerRef("text_Win_label_mobile").y = -33);
        this.UIManagerRef("text_colonSymbol3_mobile") && (this.UIManagerRef("text_colonSymbol3_mobile").x = 955) && (this.UIManagerRef("text_colonSymbol3_mobile").y = 27);
        this.UIManagerRef("text_Win_value_mobile") && (this.UIManagerRef("text_Win_value_mobile").x = 990.2) && (this.UIManagerRef("text_Win_value_mobile").y = -33.1);
      } else {
        this.UIManagerRef("text_Win_label_mobile") && (this.UIManagerRef("text_Win_label_mobile").x = 804.5) && (this.UIManagerRef("text_Win_label_mobile").y = 739);
        this.UIManagerRef("text_colonSymbol3_mobile") && (this.UIManagerRef("text_colonSymbol3_mobile").x = 823) && (this.UIManagerRef("text_colonSymbol3_mobile").y = 698);
        this.UIManagerRef("text_Win_value_mobile") && (this.UIManagerRef("text_Win_value_mobile").x = 777.1) && (this.UIManagerRef("text_Win_value_mobile").y = 781.6);
      }
    }
  }

  setManywaysInitially() {
    this.symbolsCountRearrangeCount(this.props);
    let totalmwCount = 1;
    for (let j = 0; j < this.reelGridSymbolsArray.length; j++) {
      totalmwCount = totalmwCount * this.reelGridSymbolsArray[j];
    }
    this.UIManagerRef("BG_manywaysText_desktop") && (this.UIManagerRef("BG_manywaysText_desktop").text = totalmwCount);
    this.UIManagerRef("BG_manywaysText_mobile") && (this.UIManagerRef("BG_manywaysText_mobile").text = totalmwCount);
  }

  symbolsCountRearrangeCount(nextProps: any) {
    for (let i = 0; i < nextProps.displayReelGridSymbolCount.length; i++) {
      let data;
      if (i === 0 || i === nextProps.displayReelGridSymbolCount.length - 1) {
        data = nextProps.displayReelGridSymbolCount[i];
      } else if (i > 0) {
        data = nextProps.displayReelGridSymbolCount[i] + 1;
      }
      this.reelGridSymbolsArray.push(data);
    }
  }

  totalBalanceShow() {
    this.props.totalCreditWinAmount && (this.UIManagerRef("Mobiletext_win_value").visible = true);
    this.props.totalCreditWinAmount && this.UIManagerSetText("Mobiletext_win_value", this.numberWithCommasAndDeciaml(Math.round((this.props.totalCreditWinAmount / this.constantT2 / this.props.coinList[this.props.selectedCoin]) * this.constantT1)));
  }

  //this method will call after the first rendering for scaling and logo animation looping
  bindUI() {
    if (isMobile) {
      if (window.innerWidth < window.innerHeight) {
        this.totalBalanceShow();
      } else {
        this.totalBalanceShow();
      }

      let balanceMob;
      if (this.props.freegameSpinCountRemaining !== undefined) {
        balanceMob = this.props.transitionBalance;
      } else {
        balanceMob = this.props.balance;
      }
      let balanceValueInCurrency = CURRENCY.CurrencyManager.formatCurrencyString(balanceMob / this.constantT2, true, true, true, true);
      let betValueInCurrency = CURRENCY.CurrencyManager.formatCurrencyString(this.props.betList[this.props.currentBetIndex] / this.constantT2, true, true, true, true);
      this.UIManagerRef("Mobiletext_balance_value") && this.UIManagerSetText("Mobiletext_balance_value", balanceValueInCurrency);
      (this.props.currentVoucherResult === undefined) ? this.UIManagerRef("Mobiletext_bet_value") && this.UIManagerSetText("Mobiletext_bet_value", betValueInCurrency) : this.UIManagerRef("Mobiletext_bet_value") && (this.UIManagerSetText("Mobiletext_bet_value", this.props.currentVoucherResult.bet));
    }
  }

   // This Function  is used to Set Sound on BUY button
   onClickSound() {
    this.props.setApplicationButtonClicked(true);
    this.props.setApplicationButtonClicked(false);
}

  numberWithCommasAndDeciaml(x: any) {
    try {
      x = x.toString().replace(".", this.props.currencyDecimalSeparator);
      let parts = x.split(this.props.currencyDecimalSeparator);
      parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.props.currencyGroupingSeparator);
      return parts.join(".");
    } catch {
      return x;
    }
  }

  //this method will be called when a button gets clicked
  handleEvent(e: any) {
  }

  desktopSocial() {
    if (this.props.jurisdictionKey === "social") {
      this.UIManagerRef("BG_balance_Text_Bg_Image") && (this.UIManagerRef("BG_balance_Text_Bg_Image").visible = false);
      this.UIManagerRef("BG_balance_Text_Bg_Image_Social") && (this.UIManagerRef("BG_balance_Text_Bg_Image_Social").visible = true);
      this.UIManagerRef("BG_win_Text_Bg_Image") && (this.UIManagerRef("BG_win_Text_Bg_Image").visible = false);
      this.UIManagerRef("text_balance_label") && (this.UIManagerRef("text_balance_label").visible = false);
      this.UIManagerRef("text_balance_value_desktop") && (this.UIManagerRef("text_balance_value_desktop").visible = false);
      this.UIManagerRef("text_win_label") && (this.UIManagerRef("text_win_label").visible = false);
    } else {
      this.UIManagerRef("BG_balance_Text_Bg_Image") && (this.UIManagerRef("BG_balance_Text_Bg_Image").visible = true);
      this.UIManagerRef("BG_balance_Text_Bg_Image_Social") && (this.UIManagerRef("BG_balance_Text_Bg_Image_Social").visible = false);
      this.UIManagerRef("BG_win_Text_Bg_Image") && (this.UIManagerRef("BG_win_Text_Bg_Image").visible = true);
      this.UIManagerRef("text_balance_label") && (this.UIManagerRef("text_balance_label").visible = true);
      this.UIManagerRef("text_balance_value_desktop") && (this.UIManagerRef("text_balance_value_desktop").visible = true);
      this.UIManagerRef("text_win_label") && (this.UIManagerRef("text_win_label").visible = true);
    }
  }

  landscapeTextAlignment() {
    if (window.innerWidth > window.innerHeight) {
      if (this.props.jurisdictionKey === "social") {
        this.UIManagerRef("Mobiletext_bet_label") && (this.UIManagerRef("Mobiletext_bet_label").x = 350) && (this.UIManagerRef("Mobiletext_bet_label").y = 1050);
        this.UIManagerRef("Mobiletext_mobColonSymbol3") && (this.UIManagerRef("Mobiletext_mobColonSymbol3").x = 355) && (this.UIManagerRef("Mobiletext_mobColonSymbol3").y = 1048);
        
        this.UIManagerRef("Mobiletext_win_label") && (this.UIManagerRef("Mobiletext_win_label").visible = false);
        this.UIManagerRef("Mobiletext_mobColonSymbol1") && (this.UIManagerRef("Mobiletext_mobColonSymbol1").visible = false);
        this.UIManagerRef("Mobiletext_win_value") && (this.UIManagerRef("Mobiletext_win_value").visible = false);
        this.UIManagerRef("Mobiletext_mobColonSymbol1") && (this.UIManagerRef("Mobiletext_mobColonSymbol1").visible = false);
        this.UIManagerRef("Mobiletext_mobColonSymbol5") && (this.UIManagerRef("Mobiletext_mobColonSymbol5").visible = false);
        this.UIManagerRef("text_balance_label_mobile") && (this.UIManagerRef("text_balance_label_mobile").visible = false);
        this.UIManagerRef("text_balance_value_mobile") && (this.UIManagerRef("text_balance_value_mobile").visible = false);
      }
      else {
        this.UIManagerRef("Mobiletext_bet_label") && (this.UIManagerRef("Mobiletext_bet_label").x = 1495) && (this.UIManagerRef("Mobiletext_bet_label").y = 1050);
        this.UIManagerRef("Mobiletext_mobColonSymbol3") && (this.UIManagerRef("Mobiletext_mobColonSymbol3").x = 1500) && (this.UIManagerRef("Mobiletext_mobColonSymbol3").y = 1048);
       this.UIManagerRef("Mobiletext_win_label") && (this.UIManagerRef("Mobiletext_win_label").x = 950) && (this.UIManagerRef("Mobiletext_win_label").y = 940);
        this.UIManagerRef("Mobiletext_mobColonSymbol1") && (this.UIManagerRef("Mobiletext_mobColonSymbol1").x = 955) && (this.UIManagerRef("Mobiletext_mobColonSymbol1").y = 938);
        this.UIManagerRef("Mobiletext_win_value") && (this.UIManagerRef("Mobiletext_win_value").x = 975) && (this.UIManagerRef("Mobiletext_win_value").y = 940);

        this.UIManagerRef("Mobiletext_mobColonSymbol5") && (this.UIManagerRef("Mobiletext_mobColonSymbol5").visible = true);
        
        this.UIManagerRef("text_balance_label_mobile") && (this.UIManagerRef("text_balance_label_mobile").x = 500) && (this.UIManagerRef("text_balance_label_mobile").y = 936);
        this.UIManagerRef("Mobiletext_mobColonSymbol5") && (this.UIManagerRef("Mobiletext_mobColonSymbol5").x = 505) && (this.UIManagerRef("Mobiletext_mobColonSymbol5").y = 934);
        this.UIManagerRef("text_balance_value_mobile") && (this.UIManagerRef("text_balance_value_mobile").x = 525) && (this.UIManagerRef("text_balance_value_mobile").y = 936);
      }
    }
  }

  //this method will scale reelgrid according to the screen size
  portraitTextAlignment() {
    if (window.innerHeight > window.innerWidth) {
      if (this.props.jurisdictionKey === "social") {
        this.UIManagerRef("Mobiletext_balance_label") && (this.UIManagerRef("Mobiletext_balance_label").x = 760) && (this.UIManagerRef("Mobiletext_balance_label").y = 1754);
        this.UIManagerRef("Mobiletext_mobColonSymbol2") && (this.UIManagerRef("Mobiletext_mobColonSymbol2").x = 765) && (this.UIManagerRef("Mobiletext_mobColonSymbol2").y = 1752);
        this.UIManagerRef("Mobiletext_balance_value") && (this.UIManagerRef("Mobiletext_balance_value").x = 775) && (this.UIManagerRef("Mobiletext_balance_value").y = 1754);

        this.UIManagerRef("Mobiletext_bet_label") && (this.UIManagerRef("Mobiletext_bet_label").x = 230) && (this.UIManagerRef("Mobiletext_bet_label").y = 1754);
        this.UIManagerRef("Mobiletext_mobColonSymbol3") && (this.UIManagerRef("Mobiletext_mobColonSymbol3").x = 235) && (this.UIManagerRef("Mobiletext_mobColonSymbol3").y = 1752);
        this.UIManagerRef("Mobiletext_mobColonSymbol5") && (this.UIManagerRef("Mobiletext_mobColonSymbol5").visible = false);
        this.UIManagerRef("text_balance_label_mobile") && (this.UIManagerRef("text_balance_label_mobile").visible = false);
        this.UIManagerRef("text_balance_value_mobile") && (this.UIManagerRef("text_balance_value_mobile").visible = false);

        this.UIManagerRef("Mobiletext_win_label") && (this.UIManagerRef("Mobiletext_win_label").visible = false);
        this.UIManagerRef("Mobiletext_mobColonSymbol1") && (this.UIManagerRef("Mobiletext_mobColonSymbol1").visible = false);
        this.UIManagerRef("Mobiletext_win_value") && (this.UIManagerRef("Mobiletext_win_value").visible = false);
      }
      else {
        this.UIManagerRef("Mobiletext_balance_label") && (this.UIManagerRef("Mobiletext_balance_label").x = 200) && (this.UIManagerRef("Mobiletext_balance_label").y = 1800);
        this.UIManagerRef("Mobiletext_mobColonSymbol2") && (this.UIManagerRef("Mobiletext_mobColonSymbol2").x = 205) && (this.UIManagerRef("Mobiletext_mobColonSymbol2").y = 1752);
        this.UIManagerRef("Mobiletext_balance_value") && (this.UIManagerRef("Mobiletext_balance_value").x = 80) && (this.UIManagerRef("Mobiletext_balance_value").y = 1850);

        this.UIManagerRef("Mobiletext_bet_label") && (this.UIManagerRef("Mobiletext_bet_label").x = 960) && (this.UIManagerRef("Mobiletext_bet_label").y = 1800);
        this.UIManagerRef("Mobiletext_mobColonSymbol3") && (this.UIManagerRef("Mobiletext_mobColonSymbol3").x = 965) && (this.UIManagerRef("Mobiletext_mobColonSymbol3").y = 1752);
       
        this.UIManagerRef("Mobiletext_win_label") && (this.UIManagerRef("Mobiletext_win_label").visible = false);
        this.UIManagerRef("Mobiletext_win_label") && (this.UIManagerRef("Mobiletext_win_label").x = 585) && (this.UIManagerRef("Mobiletext_win_label").y = 1800);
        this.UIManagerRef("Mobiletext_mobColonSymbol1") && (this.UIManagerRef("Mobiletext_mobColonSymbol1").x = 590) && (this.UIManagerRef("Mobiletext_mobColonSymbol1").y = 1633);
        this.UIManagerRef("Mobiletext_win_value") && (this.UIManagerRef("Mobiletext_win_value").x = 480) && (this.UIManagerRef("Mobiletext_win_value").y = 1850);

        this.UIManagerRef("Mobiletext_mobColonSymbol5") && (this.UIManagerRef("Mobiletext_mobColonSymbol5").visible = true);
        this.UIManagerRef("text_balance_label_mobile") && (this.UIManagerRef("text_balance_label_mobile").x = 200) && (this.UIManagerRef("text_balance_label_mobile").y = 1632);
        this.UIManagerRef("Mobiletext_mobColonSymbol5") && (this.UIManagerRef("Mobiletext_mobColonSymbol5").x = 205) && (this.UIManagerRef("Mobiletext_mobColonSymbol5").y = 1630);
        this.UIManagerRef("text_balance_value_mobile") && (this.UIManagerRef("text_balance_value_mobile").x = 500) && (this.UIManagerRef("text_balance_value_mobile").y = 1632);

        if (this.props.languageCode === 'pl'
          || this.props.languageCode === 'da'
          || this.props.languageCode === 'hr'
          || this.props.languageCode === 'sv'
          || this.props.languageCode === 'nb') {
          this.UIManagerRef("Mobiletext_balance_label") && (this.UIManagerRef("Mobiletext_balance_label").x = 200) && (this.UIManagerRef("Mobiletext_balance_label").y = 1754);
          this.UIManagerRef("Mobiletext_mobColonSymbol2") && (this.UIManagerRef("Mobiletext_mobColonSymbol2").x = 205) && (this.UIManagerRef("Mobiletext_mobColonSymbol2").y = 1752);
          this.UIManagerRef("Mobiletext_balance_value") && (this.UIManagerRef("Mobiletext_balance_value").x = 215) && (this.UIManagerRef("Mobiletext_balance_value").y = 1754);
        }
      }
    }
    else {
      if (window.innerWidth > window.innerHeight) {
        if (this.props.jurisdictionKey === "social") {
          this.UIManagerRef("Mobiletext_balance_label") && (this.UIManagerRef("Mobiletext_balance_label").x = 1495) && (this.UIManagerRef("Mobiletext_balance_label").y = 1050);
          this.UIManagerRef("Mobiletext_mobColonSymbol2") && (this.UIManagerRef("Mobiletext_mobColonSymbol2").x = 1500) && (this.UIManagerRef("Mobiletext_mobColonSymbol2").y = 1048);
          this.UIManagerRef("Mobiletext_balance_value") && (this.UIManagerRef("Mobiletext_balance_value").x = 1520) && (this.UIManagerRef("Mobiletext_balance_value").y = 1050);
          this.UIManagerRef("Mobiletext_mobColonSymbol5") && (this.UIManagerRef("Mobiletext_mobColonSymbol5").visible = false);
          this.UIManagerRef("Mobiletext_win_value") && (this.UIManagerRef("Mobiletext_win_value").visible = false);
          this.UIManagerRef("Mobiletext_win_label") && (this.UIManagerRef("Mobiletext_win_label").visible = false);
          this.UIManagerRef("Mobiletext_win_label") && (this.UIManagerRef("Mobiletext_win_label").visible = false);
          this.UIManagerRef("Mobiletext_mobColonSymbol1") && (this.UIManagerRef("Mobiletext_mobColonSymbol1").visible = false);
          this.UIManagerRef("Mobiletext_win_value") && (this.UIManagerRef("Mobiletext_win_value").visible = false);
        } else {
          this.UIManagerRef("Mobiletext_balance_label") && (this.UIManagerRef("Mobiletext_balance_label").x = 500) && (this.UIManagerRef("Mobiletext_balance_label").y = 1050);
          this.UIManagerRef("Mobiletext_mobColonSymbol2") && (this.UIManagerRef("Mobiletext_mobColonSymbol2").x = 505) && (this.UIManagerRef("Mobiletext_mobColonSymbol2").y = 1048);
          this.UIManagerRef("Mobiletext_balance_value") && (this.UIManagerRef("Mobiletext_balance_value").x = 525) && (this.UIManagerRef("Mobiletext_balance_value").y = 1050);

          if (this.props.languageCode === 'pl'
            || this.props.languageCode === 'da'
            || this.props.languageCode === 'hr'
            || this.props.languageCode === 'sv'
            || this.props.languageCode === 'nb') {
            this.UIManagerRef("Mobiletext_balance_label") && (this.UIManagerRef("Mobiletext_balance_label").x = 500) && (this.UIManagerRef("Mobiletext_balance_label").y = 1050);
            this.UIManagerRef("Mobiletext_mobColonSymbol2") && (this.UIManagerRef("Mobiletext_mobColonSymbol2").x = 505) && (this.UIManagerRef("Mobiletext_mobColonSymbol2").y = 1048);
            this.UIManagerRef("Mobiletext_balance_value") && (this.UIManagerRef("Mobiletext_balance_value").x = 525) && (this.UIManagerRef("Mobiletext_balance_value").y = 1050);
            this.UIManagerRef("Mobiletext_mobColonSymbol5") && (this.UIManagerRef("Mobiletext_mobColonSymbol5").visible = true);
          }
        }
      }
    }
  }

  onOrientationChange() {
    // this.desktopSocial();
    this.landscapeTextAlignment()
    this.portraitTextAlignment();
    let reelGrid = this.UIManagerRef("reelgridLayer");
    !isTablet && this.UIManagerRef("BG_gameLogo_Anim_mobile") && (this.UIManagerRef("BG_gameLogo_Anim_mobile").scale.set(2));
    this.UIManagerRef("BG_reelOfFrame_Image_Desktop") && (this.UIManagerRef("BG_reelOfFrame_Image_Desktop").scale.set(2));
    if (isMobile && window.innerHeight > window.innerWidth) {
      reelGrid && reelGrid.scale.set(configGame.REEL_GRID_SCALE_IN_PORTRAIT);
      reelGrid &&
        reelGrid.position.set(
          configGame.REEL_GRID_X_IN_PORTRAIT,
          configGame.REEL_GRID_Y_IN_PORTRAIT
        );
    } else {
      reelGrid && reelGrid.scale.set(configGame.REEL_GRID_SCALE);
      reelGrid &&
        reelGrid.position.set(configGame.REEL_GRID_X, configGame.REEL_GRID_Y);
    }
  }
 
  //when layout changes, this method will be called
  layoutChange(currentLayout: string) {
    this.displayUI.forEach((data: any) => {
      if (data.layout === true) {
        this.props.setApplicationLayoutObject(data.name);
      }
    });
    this.anticipationScaling();
  }



  setVoucherCount(props: any, visible: boolean) {
    this.UIManagerRef("voucherGraphic_4").visible = visible;
    this.UIManagerRef("voucherText5").visible = visible;
    props.currentVoucherSpinResult && this.UIManagerSetText("voucherText5", props.currentVoucherSpinResult.used);

  }

  shouldComponentUpdate(
    nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
    if (nextProps.allButtonEnable !== this.props.allButtonEnable ||
      nextProps.layoutMode !== this.props.layoutMode ||
      nextProps.allSpinComplete !== this.props.allSpinComplete ||
      nextProps.spinStart !== this.props.spinStart ||
      nextProps.winAmount !== this.props.winAmount ||
      nextProps.selectedCoin !== this.props.selectedCoin ||
      nextProps.currentBetIndex !== this.props.currentBetIndex ||
      nextProps.spinStopID !== this.props.spinStopID ||
      nextProps.displayReelGridSymbolCount !== this.props.displayReelGridSymbolCount ||
      nextProps.winAmountEmpty !== this.props.winAmountEmpty ||
      nextProps.basegamestate !== this.props.basegamestate ||
      nextProps.isLastWinSame !== this.props.isLastWinSame ||
      nextProps.blastStart !== this.props.blastStart
    ) {
      if (nextProps.basegamestate) {
        this.setVoucherCount(nextProps, false);
        if (this.props.resetManyWaysTextToInitial) {
          this.UIManagerRef("BG_manywaysText_desktop") && (this.UIManagerRef("BG_manywaysText_desktop").text = this.mwIntialValue);
          this.UIManagerRef("BG_manywaysText_mobile") && (this.UIManagerRef("BG_manywaysText_mobile").text = this.mwIntialValue);
          this.props.resetManywaysValue(false);
        }
      }
      if (!nextProps.basegamestate && nextProps.basegamestate !== this.props.basegamestate) {

        this.props.setApplicationButtonpanelVisibility(true);
      }
      if (nextProps.basegamestate && nextProps.basegamestate !== this.props.basegamestate) {
        let balanceValueInCurrency = CURRENCY.CurrencyManager.formatCurrencyString(nextProps.transitionBalance / this.constantT2, true, true, true, true);
        this.UIManagerRef("Mobiletext_balance_value") && this.UIManagerSetText("Mobiletext_balance_value", balanceValueInCurrency);
      }
      if (nextProps.allButtonEnable) {
        let balanceValueInCurrency = CURRENCY.CurrencyManager.formatCurrencyString(nextProps.transitionBalance / this.constantT2, true, true, true, true);

        this.UIManagerRef("Mobiletext_balance_value") && this.UIManagerSetText("Mobiletext_balance_value", balanceValueInCurrency);
        this.props.setPreviousBalance(nextProps.transitionBalance);
      }

      if (nextProps.winAmountEmpty) {
        this.UIManagerRef("Mobiletext_win_value") && (this.UIManagerRef("Mobiletext_win_value").visible = false);
      }
      if (nextProps.layoutMode !== this.props.layoutMode) {
        this.layoutChange(nextProps.layoutMode);
        this.onOrientationChange();
      }

      if (this.props.totalCreditWinAmount) {
        this.checkAutoplayConditions(nextProps);
      }

      if (nextProps.allSpinComplete && nextProps.allSpinComplete !== this.props.allSpinComplete) {
        if (nextProps.winAmount !== 0) {
          GSAPTimer.getInstance().addTimer(210 / 1000, () => {
            this.winValueStore = this.winValueStore + this.props.winAmount;
            this.reflectWinAmount(nextProps, nextProps.winAmount);
          });

        } else {
          this.winValueStore = 0;
        }
      }
      if (nextProps.spinStart) {
        if (nextProps.spinStart && nextProps.spinStart !== this.props.spinStart) {
          nextProps.spinMode(true);
          this.UIManagerRef("BG_manywaysText_" + this.ui_mode).alpha = 1;
          this.setVoucherCount(nextProps, false);
          if (!nextProps.InTurboMode || !this.props.InTurboMode) {
            GSAPTimer.getInstance().addRepeatTimer(100 / 1000, () => {
              if (this.UIManagerRef("BG_manywaysText_" + this.ui_mode).alpha > 0) {
                if (!isMobile) {
                  this.UIManagerRef("BG_manywaysText_desktop") && (this.UIManagerRef("BG_manywaysText_desktop").alpha -= 0.1);
                  this.UIManagerRef("BG_textManyWays_Image_Desktop") && (this.UIManagerRef("BG_textManyWays_Image_Desktop").alpha -= 0.1);
                } else {
                  this.UIManagerRef("BG_manywaysText_mobile") && (this.UIManagerRef("BG_manywaysText_mobile").alpha -= 0.1);
                  this.UIManagerRef("BG_textManyWays_Image_mobile") && (this.UIManagerRef("BG_textManyWays_Image_mobile").alpha -= 0.1);
                }
              }
            }, () => {
              this.UIManagerRef("BG_manywaysText_desktop") && (this.UIManagerRef("BG_manywaysText_desktop").alpha = 0);
              this.UIManagerRef("BG_textManyWays_Image_Desktop") && (this.UIManagerRef("BG_textManyWays_Image_Desktop").alpha = 0);
              this.UIManagerRef("BG_manywaysText_mobile") && (this.UIManagerRef("BG_manywaysText_mobile").alpha = 0);
              this.UIManagerRef("BG_textManyWays_Image_mobile") && (this.UIManagerRef("BG_textManyWays_Image_mobile").alpha = 0);
            });



          } else {
            this.UIManagerRef("BG_manywaysText_desktop") && (this.UIManagerRef("BG_manywaysText_desktop").alpha = 0);
            this.UIManagerRef("BG_textManyWays_Image_Desktop") && (this.UIManagerRef("BG_textManyWays_Image_Desktop").alpha = 0);
            this.UIManagerRef("BG_manywaysText_mobile") && (this.UIManagerRef("BG_manywaysText_mobile").alpha = 0);
            this.UIManagerRef("BG_textManyWays_Image_mobile") && (this.UIManagerRef("BG_textManyWays_Image_mobile").alpha = 0);
          }
        }
        this.winValueStore = 0;
        this.UIManagerRef("Mobiletext_win_value") && (this.UIManagerRef("Mobiletext_win_value").visible = false);
        this.updateValues(nextProps);
      }
      if (nextProps.winAmount !== this.props.winAmount) {
        if (nextProps.winAmount === 0) {
          this.UIManagerRef("Mobiletext_win_value") && (this.UIManagerRef("Mobiletext_win_value").visible = false);
        }
        this.winValueStore = nextProps.winAmount + this.winValueStore;
        this.reflectWinAmount(nextProps, this.winValueStore);
      }
      if (nextProps.isLastWinSame !== this.props.isLastWinSame) {
        if (nextProps.winAmount === 0) {
          this.UIManagerRef("Mobiletext_win_value") && (this.UIManagerRef("Mobiletext_win_value").visible = false);
        }
        this.winValueStore = nextProps.winAmount + this.winValueStore;
        this.reflectWinAmount(nextProps, this.winValueStore);
      }
      if (nextProps.displayReelGridSymbolCount !== this.props.displayReelGridSymbolCount) {
        this.mwTextValue = 1;
        this.reelGridSymbolsArray = [];
        this.symbolsCountRearrangeCount(nextProps);
        if (nextProps.basegamestate && nextProps.basegamestate !== this.props.basegamestate) {
          this.setManywaysInitially();
        }
      }
      if (nextProps.spinStopID > -1 && nextProps.spinStopID !== this.props.spinStopID) {
        if (!isMobile) {
          this.UIManagerRef("BG_manywaysText_desktop") && (this.UIManagerRef("BG_manywaysText_desktop").alpha = 1);
          this.UIManagerRef("BG_textManyWays_Image_Desktop") && (this.UIManagerRef("BG_textManyWays_Image_Desktop").alpha = 1);
        } else {
          this.UIManagerRef("BG_manywaysText_mobile") && (this.UIManagerRef("BG_manywaysText_mobile").alpha = 1);
          this.UIManagerRef("BG_textManyWays_Image_mobile") && (this.UIManagerRef("BG_textManyWays_Image_mobile").alpha = 1);
        }
        this.mwTextValue = this.mwTextValue * this.reelGridSymbolsArray[nextProps.spinStopID];
        this.UIManagerRef("BG_manywaysText_desktop") && (this.UIManagerRef("BG_manywaysText_desktop").text = this.mwTextValue);
        this.UIManagerRef("BG_manywaysText_mobile") && (this.UIManagerRef("BG_manywaysText_mobile").text = this.mwTextValue);
      }
      return false;
    }
    return false;
  }

  updateValues(nextProps: any) {
    if (nextProps.currentVoucherSpinResult === undefined) {
      let balanceValueInCurrency = CURRENCY.CurrencyManager.formatCurrencyString((this.props.previousBalance - this.props.betList[this.props.currentBetIndex]) / this.constantT2, true, true, true, true);
      this.UIManagerRef("Mobiletext_balance_value") && this.UIManagerSetText("Mobiletext_balance_value", balanceValueInCurrency);

    }
  }


  reflectWinAmount(nextProps: any, lastWinStore: number) {
    if (!isMobile) {
      let winText = this.UIManagerRef("text_win_value1");
      if (nextProps.winAmount !== 0) {
        winText && (winText.visible = true);
      }
    } else {
      if (this.props.jurisdictionKey !== "social") {
        let winText = this.UIManagerRef("Mobiletext_win_value");
        if (this.props.winAmount !== 0) {
          winText && (winText.visible = false);
          let winValueInCurrency;
          if (lastWinStore === 0) {
            winValueInCurrency = this.numberWithCommasAndDeciaml(Math.round((this.winValueStore / this.constantT2 / this.props.coinList[this.props.selectedCoin]) * this.constantT1));
          } else {
            winValueInCurrency = this.numberWithCommasAndDeciaml(Math.round((lastWinStore / this.constantT2 / this.props.coinList[this.props.selectedCoin]) * this.constantT1));
          }
          winText && this.UIManagerSetText("Mobiletext_win_value", winValueInCurrency);
        } else {
          this.winValueStore = 0;
          winText && (winText.visible = false);
        }
      }
    }
  }

  checkAutoplayConditions(nextProps: any) {
    if (
      (this.props.totalCreditWinAmount / 100 >= this.props.stopIfBalanceIncreasedBy &&
        this.props.stopIfBalanceIncreasedBy !== -1) ||
      (this.props.totalCreditWinAmount / 100 >= this.props.stopIfBalanceDecreasedBy &&
        this.props.stopIfBalanceDecreasedBy !== -1) ||
      (this.props.totalCreditWinAmount / 100 > this.props.stopIfSingleWinExceed &&
        this.props.stopIfSingleWinExceed !== -1) ||
      (nextProps.totalCreditWinAmount / 100 > 0 && nextProps.stopAutoplayOnAnyWin) ||
      (nextProps.featureJustReTriggered && nextProps.stopAutoplayOnAnyWin)
    ) {
      this.props.stopAutoplay();
    }
  }


  render() {
    return (
      <UIManager
        id={"gofBaseGameContainer"}
        type={"Container"}
        ref={(i) => (this.gofBaseGameContainer = i)}
        name={"gofBaseGameContainer"}
        app={this.app}
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
              configGame={configGame}
              ClickHandler={this.handleEvent.bind(this)}
            />
          ))}
      </UIManager>
    );
  }
}

export default withPixiApp(
  connect(
    (
      state: Pick<IStore,  "gameactionstate" | "asyncServerAction" | "freegameState" | "basegameState" | "applicationState" | "reelgridState" | "autoplayState" | "buttonPanelState" | "behaviourState" | "betPanelState">
    ): IStateToProps => ({
      balance: state.basegameState.balance,
      layoutMode: state.applicationState.layoutMode,
      winAmount: state.basegameState.winAmount,
      isLastWinSame: state.basegameState.isLastWinSame,
      basegamestate: state.basegameState.basegamestate,
      allSpinComplete: state.reelgridState.allSpinComplete,
      spinStart: state.reelgridState.spinStart,
      stopIfSingleWinExceed: state.autoplayState.stopIfSingleWinExceed,
      stopIfBalanceIncreasedBy: state.autoplayState.stopIfBalanceIncreasedBy,
      stopIfBalanceDecreasedBy: state.autoplayState.stopIfBalanceDecreasedBy,
      stopAutoplayOnAnyWin: state.autoplayState.stopAutoplayOnAnyWin,
      currentBetIndex: state.basegameState.currentBetIndex,
      betList: state.basegameState.betList,
      allButtonEnable: state.buttonPanelState.allButtonEnable,
      transitionBalance: state.behaviourState.transitionBalance,
      totalCreditWinAmount: state.behaviourState.totalCreditWinAmount,
      previousBalance: state.behaviourState.previousBalance,
      selectedCoin: state.betPanelState.selectedCoin,
      coinList: state.betPanelState.coinList,
      spinStopID: state.reelgridState.spinStopID,
      displayReelGridSymbolCount: state.reelgridState.displayReelGridSymbolCount,
      winAmountEmpty: state.behaviourState.winAmountEmpty,
      InTurboMode: state.reelgridState.InTurboMode,
      resetManyWaysTextToInitial: state.behaviourState.resetManyWaysTextToInitial,
      featureJustReTriggered: state.freegameState.featureJustReTriggered,
      storeAmountForAutoplay: state.behaviourState.storeAmountForAutoplay,
      blastStart: state.reelgridState.blastStart,
      freegameSpinCountRemaining: state.freegameState.freegameSpinCountRemaining,
      languageCode: state.applicationState.languageCode,
      soundOnOff: state.applicationState.soundOnOff,
      jurisdictionKey: state.applicationState.jurisdictionKey,
      currencyDecimalSeparator: state.applicationState.currencyDecimalSeparator,
      currencyGroupingSeparator: state.applicationState.currencyGroupingSeparator,
      currentVoucherResult: state.gameactionstate.currentVoucherResult,
      currentVoucherSpinResult: state.asyncServerAction.currentVoucherResult,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
      setApplicationButtonpanelVisibility: (visible: boolean): any => dispatch(applicationActions.setApplicationButtonpanelVisibility(visible)),
      setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
      stopAutoplay: (): any => dispatch(baseGameAction.stopAutoplay()),
      playingSound: (soundIsPlaying: any): any => dispatch(soundActions.playingSound(soundIsPlaying)),
      setPreviousBalance: (previousBalance: number): any => dispatch(behaviourAction.setPreviousBalance(previousBalance)),
      resetManywaysValue: (resetManyWaysTextToInitial: boolean): any => dispatch(behaviourAction.resetManywaysValue(resetManyWaysTextToInitial)),
      spinMode: (inSpinMode: boolean): any => dispatch(behaviourAction.spinMode(inSpinMode)),
      setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
    })
  )(withBaseGameConfiguration(GofBaseGame))
);
