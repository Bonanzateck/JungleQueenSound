import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { layoutssActions, soundActions, withFreeGameConfiguration, baseGameAction, freegameActions, buttonActions, reelsActions } from "@bonanzainteractive/slote_core";
import { isMobile, isTablet } from "react-device-detect";
import { CURRENCY, GSAPTimer, UIManager } from "@bonanzainteractive/core";
import { constant } from "../../slot/data/config";
import { actions as multiplierActions } from "../../gamereducer/multiplierReducer";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { actions as horizontalSymbolActions } from "../../gamereducer/horizontalSymbolReducer";
import { actions as soundGameLevelAction } from "../../gamereducer/soundGameLevelReducer";
import { configGame } from "../../slot/data/config";
import { playSoundLoop, stopSoundLoop } from "../../core/sounds/SoundControler";

interface IProps {
    [x: string]: any;
}

interface IStore {
    [x: string]: any;
}

interface IStateToProps {
    languageCode: string;
    soundOnOff: boolean;
    layoutMode: string,
    jurisdictionKey: string,
    inFreeGame: boolean,
    soundIsPlaying: boolean,
    freegameSpinCountRemaining: number,
    freegameSpinCountWin: number,
    freegameSpinCountWinDuringReconstrcution: number,
    freegameSpinCount: number,
    displayReelGridSymbolCount: Array<number>,
    spinStopID: number,
    allSpinComplete: boolean,
    featureJustReTriggered: boolean,
    callFlowManager: boolean,
    featureJustFinished: boolean,
    totalWinAmount: number,
    totalCreditWinAmount: number,
    transitionBalance: number,
    balance: number,
    betList: Array<number>;
    currentBetIndex: number;
    multiplierActive: any;
    storeMultiplierCurrentValue: number;
    spinStart: boolean;
    blastStart: boolean;
    winAmount: number;
    InTurboMode: boolean;
    showWinShower: boolean;
    counterStartIncreasing: boolean;
    reConstruction: boolean;
    currentVoucherResult: object;
    showWinCelebration: boolean;
    cspStart: boolean;
    level: number;
    preMultiplier: number;
    checkGameTurboMode: boolean;

}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class GofFreeGameSpecialLayer extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected gofFreeGameSpecialLayerContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: Object[] = [];
    protected logoAnimIntervalTime: number;
    private minFullHDWidth: number = 1024;
    private HDReadyWidth: number = 1280;
    private minFullHDPxRatio: number = 2;
    private canvasBgImagePage: string = "";
    protected mwTextValue: number = 1;
    protected storeWinAmount: number = 0;
    protected delayTimerOfMultiplierWithAnticipation: number = 7500;
    protected delayTimerOfMultiplierWithOutAnticipation: number = 2200;
    protected alphaOfManyways: number = 0.1;
    protected reelGridSymbolsArray: Array<number> = [];
    protected logoAnimDelay: number = 1000;
    protected constantT11: number = 100;
    private AllTimer: any[] = [];
    private _retriggertimer: any;
    private UIManagerRef: any;
    private UIManagerSetText: any = UIManager.setText;
    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            uiElements: [],
            lang: "en",
            isSpinning: false,
        }
        this.gofFreeGameSpecialLayerContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }
        this.logoAnimIntervalTime = 11050;
        this.displayUI = this.props.child.filter(this.checkUiMode.bind(this));
        this.chooseAssets();
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

    //when layout changes, this method will be called
    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        });
        this.bgGraphicLayout();
        this.setButtonActivitedInFG();
        if (isMobile) {
            if (this.UIManagerRef("btn_turDisable")) {
                this.UIManagerRef("btn_turDisable").visible = true;
            } else {
                this.UIManagerRef("btn_turboEnable").visible = true;
            }
        }
    }

    portraitTextAlignmentFG() {
        if (this.props.jurisdictionKey === "social") {
            if (isMobile && window.innerHeight > window.innerWidth) {
                this.UIManagerRef("Mobiletext_balance_labelFG") && (this.UIManagerRef("Mobiletext_balance_labelFG").x = 770) && (this.UIManagerRef("Mobiletext_balance_labelFG").y = 1900);
                this.UIManagerRef("Mobiletext_mobColonSymbol2FG") && (this.UIManagerRef("Mobiletext_mobColonSymbol2FG").x = 775) && (this.UIManagerRef("Mobiletext_mobColonSymbol2FG").y = 1898);
                this.UIManagerRef("Mobiletext_balance_valueFG") && (this.UIManagerRef("Mobiletext_balance_valueFG").x = 785) && (this.UIManagerRef("Mobiletext_balance_valueFG").y = 1900);

                if (this.props.languageCode === 'pl' ||
                    this.props.languageCode === 'da' ||
                    this.props.languageCode === 'hr' ||
                    this.props.languageCode === 'sv' ||
                    this.props.languageCode === 'nb') {
                    this.UIManagerRef("Mobiletext_balance_labelFG") && (this.UIManagerRef("Mobiletext_balance_labelFG").x = 770) && (this.UIManagerRef("Mobiletext_balance_labelFG").y = 1900);
                    this.UIManagerRef("Mobiletext_mobColonSymbol2FG") && (this.UIManagerRef("Mobiletext_mobColonSymbol2FG").x = 775) && (this.UIManagerRef("Mobiletext_mobColonSymbol2FG").y = 1898);
                    this.UIManagerRef("Mobiletext_balance_valueFG") && (this.UIManagerRef("Mobiletext_balance_valueFG").x = 785) && (this.UIManagerRef("Mobiletext_balance_valueFG").y = 1900);
                }
            } else {
                this.UIManagerRef("Mobiletext_balance_labelFG") && (this.UIManagerRef("Mobiletext_balance_labelFG").x = 1550) && (this.UIManagerRef("Mobiletext_balance_labelFG").y = 1050);
                this.UIManagerRef("Mobiletext_mobColonSymbol2FG") && (this.UIManagerRef("Mobiletext_mobColonSymbol2FG").x = 1555) && (this.UIManagerRef("Mobiletext_mobColonSymbol2FG").y = 1048);
                this.UIManagerRef("Mobiletext_balance_valueFG") && (this.UIManagerRef("Mobiletext_balance_valueFG").x = 1575) && (this.UIManagerRef("Mobiletext_balance_valueFG").y = 1050);

                if (this.props.languageCode === 'pl' ||
                    this.props.languageCode === 'da' ||
                    this.props.languageCode === 'hr' ||
                    this.props.languageCode === 'sv' ||
                    this.props.languageCode === 'nb') {
                    this.UIManagerRef("Mobiletext_balance_labelFG") && (this.UIManagerRef("Mobiletext_balance_labelFG").x = 1550) && (this.UIManagerRef("Mobiletext_balance_labelFG").y = 1050);
                    this.UIManagerRef("Mobiletext_mobColonSymbol2FG") && (this.UIManagerRef("Mobiletext_mobColonSymbol2FG").x = 1555) && (this.UIManagerRef("Mobiletext_mobColonSymbol2FG").y = 1048);
                    this.UIManagerRef("Mobiletext_balance_valueFG") && (this.UIManagerRef("Mobiletext_balance_valueFG").x = 1575) && (this.UIManagerRef("Mobiletext_balance_valueFG").y = 1050);
                }
            }
        }
        else {

            if (isMobile && window.innerHeight > window.innerWidth) {
                this.UIManagerRef("Mobiletext_balance_labelFG") && (this.UIManagerRef("Mobiletext_balance_labelFG").x = 200) && (this.UIManagerRef("Mobiletext_balance_labelFG").y = 1900);
                this.UIManagerRef("Mobiletext_mobColonSymbol2FG") && (this.UIManagerRef("Mobiletext_mobColonSymbol2FG").x = 205) && (this.UIManagerRef("Mobiletext_mobColonSymbol2FG").y = 1898);
                this.UIManagerRef("Mobiletext_balance_valueFG") && (this.UIManagerRef("Mobiletext_balance_valueFG").x = 215) && (this.UIManagerRef("Mobiletext_balance_valueFG").y = 1900);

                if (this.props.languageCode === 'pl' ||
                    this.props.languageCode === 'da' ||
                    this.props.languageCode === 'hr' ||
                    this.props.languageCode === 'sv' ||
                    this.props.languageCode === 'nb') {
                    this.UIManagerRef("Mobiletext_balance_labelFG") && (this.UIManagerRef("Mobiletext_balance_labelFG").x = 210) && (this.UIManagerRef("Mobiletext_balance_labelFG").y = 1900);
                    this.UIManagerRef("Mobiletext_mobColonSymbol2FG") && (this.UIManagerRef("Mobiletext_mobColonSymbol2FG").x = 215) && (this.UIManagerRef("Mobiletext_mobColonSymbol2FG").y = 1898);
                    this.UIManagerRef("Mobiletext_balance_valueFG") && (this.UIManagerRef("Mobiletext_balance_valueFG").x = 225) && (this.UIManagerRef("Mobiletext_balance_valueFG").y = 1900);
                }
            } else {
                this.UIManagerRef("Mobiletext_balance_labelFG") && (this.UIManagerRef("Mobiletext_balance_labelFG").x = 465) && (this.UIManagerRef("Mobiletext_balance_labelFG").y = 1050);
                this.UIManagerRef("Mobiletext_mobColonSymbol2FG") && (this.UIManagerRef("Mobiletext_mobColonSymbol2FG").x = 470) && (this.UIManagerRef("Mobiletext_mobColonSymbol2FG").y = 1048);
                this.UIManagerRef("Mobiletext_balance_valueFG") && (this.UIManagerRef("Mobiletext_balance_valueFG").x = 490) && (this.UIManagerRef("Mobiletext_balance_valueFG").y = 1050);

                if (this.props.languageCode === 'pl' ||
                    this.props.languageCode === 'da' ||
                    this.props.languageCode === 'hr' ||
                    this.props.languageCode === 'sv' ||
                    this.props.languageCode === 'nb') {
                    this.UIManagerRef("Mobiletext_balance_labelFG") && (this.UIManagerRef("Mobiletext_balance_labelFG").x = 420) && (this.UIManagerRef("Mobiletext_balance_labelFG").y = 1050);
                    this.UIManagerRef("Mobiletext_mobColonSymbol2FG") && (this.UIManagerRef("Mobiletext_mobColonSymbol2FG").x = 425) && (this.UIManagerRef("Mobiletext_mobColonSymbol2FG").y = 1048);
                    this.UIManagerRef("Mobiletext_balance_valueFG") && (this.UIManagerRef("Mobiletext_balance_valueFG").x = 445) && (this.UIManagerRef("Mobiletext_balance_valueFG").y = 1050);
                }
            }
        }
    }

    socialPosition() {
        if (this.props.jurisdictionKey === "social") {
            if (window.innerHeight > window.innerWidth) {
                this.UIManagerRef("text_TotalWin_label_mobileFG") && (this.UIManagerRef("text_TotalWin_label_mobileFG").x = 1400) && (this.UIManagerRef("text_TotalWin_label_mobileFG").y = 940);
                this.UIManagerRef("text_TotalWin_value_mobileFG") && (this.UIManagerRef("text_TotalWin_value_mobileFG").x = 539) && (this.UIManagerRef("text_TotalWin_value_mobileFG").y = 1642);

                this.UIManagerRef("Mobiletext_bet_labelFG") && (this.UIManagerRef("Mobiletext_bet_labelFG").x = 200) && (this.UIManagerRef("Mobiletext_bet_labelFG").y = 1900);
                this.UIManagerRef("Mobiletext_mobColonSymbol3FG") && (this.UIManagerRef("Mobiletext_mobColonSymbol3FG").x = 205) && (this.UIManagerRef("Mobiletext_mobColonSymbol3FG").y = 1898);
                this.UIManagerRef("Mobiletext_bet_valueFG") && (this.UIManagerRef("Mobiletext_bet_valueFG").x = 215) && (this.UIManagerRef("Mobiletext_bet_valueFG").y = 1900);

                this.UIManagerRef("text_FreeGame_value1_mobileFG") && (this.UIManagerRef("text_FreeGame_value1_mobileFG").x = 548) && (this.UIManagerRef("text_FreeGame_value1_mobileFG").y = 1550);
                this.UIManagerRef("text_FreeGame_label_mobileFG") && (this.UIManagerRef("text_FreeGame_label_mobileFG").visible = false);

                this.UIManagerRef("text_Win_label_mobile") && (this.UIManagerRef("text_Win_label_mobile").x = 800) && (this.UIManagerRef("text_Win_label_mobile").y = 750);
                this.UIManagerRef("text_colonSymbol3_mobile") && (this.UIManagerRef("text_colonSymbol3_mobile").x = 805) && (this.UIManagerRef("text_colonSymbol3_mobile").y = 748);
                this.UIManagerRef("text_Win_value_mobile") && (this.UIManagerRef("text_Win_value_mobile").x = 815) && (this.UIManagerRef("text_Win_value_mobile").y = 750);

                // freegame multiplier
                this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").y = 1500);
                switch (this.props.languageCode) {
                    case 'tr':
                    case 'sv':
                    case 'fi':
                    case 'pt':
                    case 'da':
                    case 'fr':
                    case 'ro':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 750);
                        break;
                    case 'bg':
                    case 'hu':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 805);
                        break;
                    case 'es':
                    case 'hr':
                    case 'sr':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 800);
                        break;
                    case 'pl':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 760);
                        break;
                    case 'it':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 755);
                        break;
                    case 'ru':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 790);
                        break;
                    case 'nb':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 690);
                        break;
                    case 'nl':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 840);
                        break;
                    case 'gr':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 825);
                        break;
                    default:
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 720);

                }
                this.UIManagerRef("mobileMainContainer") && (this.UIManagerRef("mobileMainContainer").x = -1280) && (this.UIManagerRef("mobileMainContainer").y = 766);

            }
            else {
                this.UIManagerRef("text_TotalWin_label_mobileFG") && (this.UIManagerRef("text_TotalWin_label_mobileFG").x = 1400) && (this.UIManagerRef("text_TotalWin_label_mobileFG").y = 940);
                this.UIManagerRef("text_TotalWin_value_mobileFG") && (this.UIManagerRef("text_TotalWin_value_mobileFG").x = 1290) && (this.UIManagerRef("text_TotalWin_value_mobileFG").y = 940);

                this.UIManagerRef("Mobiletext_bet_labelFG") && (this.UIManagerRef("Mobiletext_bet_labelFG").x = 400) && (this.UIManagerRef("Mobiletext_bet_labelFG").y = 1050);
                this.UIManagerRef("Mobiletext_mobColonSymbol3FG") && (this.UIManagerRef("Mobiletext_mobColonSymbol3FG").x = 405) && (this.UIManagerRef("Mobiletext_mobColonSymbol3FG").y = 1048);
                this.UIManagerRef("Mobiletext_bet_valueFG") && (this.UIManagerRef("Mobiletext_bet_valueFG").x = 425) && (this.UIManagerRef("Mobiletext_bet_valueFG").y = 1050);
                this.UIManagerRef("textFreeGamelabelmobileFG") && (this.UIManagerRef("textFreeGamelabelmobileFG").x = 190) && (this.UIManagerRef("textFreeGamelabelmobileFG").y = 1050);
                this.UIManagerRef("text_FreeGame_value1_mobileFG") && (this.UIManagerRef("text_FreeGame_value1_mobileFG").x = 620) && (this.UIManagerRef("text_FreeGame_value1_mobileFG").y = 940);
                this.UIManagerRef("text_FreeGame_label_mobileFG") && (this.UIManagerRef("text_FreeGame_label_mobileFG").visible = false);
                this.UIManagerRef("text_Win_label_mobile") && (this.UIManagerRef("text_Win_label_mobile").x = 975) && (this.UIManagerRef("text_Win_label_mobile").y = 29);
                this.UIManagerRef("text_colonSymbol3_mobile") && (this.UIManagerRef("text_colonSymbol3_mobile").x = 955) && (this.UIManagerRef("text_colonSymbol3_mobile").y = 27);
                this.UIManagerRef("text_Win_value_mobile") && (this.UIManagerRef("text_Win_value_mobile").x = 975) && (this.UIManagerRef("text_Win_value_mobile").y = 29);
                // freegame multiplier

                switch (this.props.languageCode) {
                    case 'bg':
                    case 'hr':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 880);
                        break;
                    case 'cs':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 785);
                        break;
                    case 'da':
                    case 'tr':
                    case 'it':
                    case 'pl':
                    case 'pt':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 830);
                        break;
                    case 'de':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 800);
                        break;
                    case 'ru':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 855);
                        break;
                    case 'sv':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 820);
                        break;
                    case 'es':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 810);
                        this.UIManagerRef("text_FreeGame_value1_mobileFG") && (this.UIManagerRef("text_FreeGame_value1_mobileFG").x = 580);
                        break;
                    case 'fi':
                    case 'fr':
                    case 'ro':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 810);
                        break;
                    case 'gr':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 893);
                        break;
                    case 'hu':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 830);
                        this.UIManagerRef("text_FreeGame_value1_mobileFG") && (this.UIManagerRef("text_FreeGame_value1_mobileFG").x = 580);
                        break;
                    case 'sr':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 870);
                        break;
                    case 'nl':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 925);
                        break;
                    case 'nb':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 760);
                        break;
                    default:
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 800);
                }
                this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").y = 893);
                this.UIManagerRef("mobileMainContainer") && (this.UIManagerRef("mobileMainContainer").x = -1673) && (this.UIManagerRef("mobileMainContainer").y = 0);
            }
        }
        else {
            if (window.innerHeight > window.innerWidth) {
                this.UIManagerRef("text_TotalWin_label_mobileFG") && (this.UIManagerRef("text_TotalWin_label_mobileFG").x = 586) && (this.UIManagerRef("text_TotalWin_label_mobileFG").y = 1644);
                this.UIManagerRef("text_TotalWin_value_mobileFG") && (this.UIManagerRef("text_TotalWin_value_mobileFG").x = 539) && (this.UIManagerRef("text_TotalWin_value_mobileFG").y = 1642);
                this.UIManagerRef("Mobiletext_bet_labelFG") && (this.UIManagerRef("Mobiletext_bet_labelFG").x = 970) && (this.UIManagerRef("Mobiletext_bet_labelFG").y = 1900);
                this.UIManagerRef("Mobiletext_mobColonSymbol3FG") && (this.UIManagerRef("Mobiletext_mobColonSymbol3FG").x = 975) && (this.UIManagerRef("Mobiletext_mobColonSymbol3FG").y = 1898);
                this.UIManagerRef("Mobiletext_bet_valueFG") && (this.UIManagerRef("Mobiletext_bet_valueFG").x = 985) && (this.UIManagerRef("Mobiletext_bet_valueFG").y = 1900);
                this.UIManagerRef("text_FreeGame_label_mobileFG") && (this.UIManagerRef("text_FreeGame_label_mobileFG").visible = true);
                this.UIManagerRef("text_FreeGame_value1_mobileFG") && (this.UIManagerRef("text_FreeGame_value1_mobileFG").x = 900) && (this.UIManagerRef("text_FreeGame_value1_mobileFG").y = 590);
                this.UIManagerRef("text_FreeGame_label_mobileFG") && (this.UIManagerRef("text_FreeGame_label_mobileFG").x = 538) && (this.UIManagerRef("text_FreeGame_label_mobileFG").y = 1757);
                this.UIManagerRef("text_Win_label_mobile") && (this.UIManagerRef("text_Win_label_mobile").x = 804.5) && (this.UIManagerRef("text_Win_label_mobile").y = 739);
                //this.UIManagerRef("text_colonSymbol3_mobile") && (this.UIManagerRef("text_colonSymbol3_mobile").x = 823) && (this.UIManagerRef("text_colonSymbol3_mobile").y = 848);
                this.UIManagerRef("text_Win_value_mobile") && (this.UIManagerRef("text_Win_value_mobile").x = 777.1) && (this.UIManagerRef("text_Win_value_mobile").y = 781.6);
                // this.UIManagerRef("currentCounter") && (this.UIManagerRef("currentCounter").x = 130) && (this.UIManagerRef("currentCounter").y = 590);
                // this.UIManagerRef("slashText") && (this.UIManagerRef("slashText").x = 130) && (this.UIManagerRef("slashText").y = 590);
                // this.UIManagerRef("totalCounter") && (this.UIManagerRef("totalCounter").x = 135) && (this.UIManagerRef("totalCounter").y = 590);
                // this.UIManagerRef("collectedText") && (this.UIManagerRef("collectedText").x = 180) && (this.UIManagerRef("collectedText").y = 590);

                // freegame multiplier

                switch (this.props.languageCode) {
                    case 'cs':
                    case 'fi':
                    case 'pl':
                    case 'tr':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 535);
                        break;
                    case 'da':
                    case 'de':
                    case 'gr':
                    case 'nl':
                    case 'ro':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 585);
                        break;
                    default:
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 565);
                }
                this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").y = 1757);
                this.UIManagerRef("mobileMainContainer") && (this.UIManagerRef("mobileMainContainer").x = -1656) && (this.UIManagerRef("mobileMainContainer").y = 766);

            }
            else {
                this.UIManagerRef("text_TotalWin_label_mobileFG") && (this.UIManagerRef("text_TotalWin_label_mobileFG").x = 1470) && (this.UIManagerRef("text_TotalWin_label_mobileFG").y = 940);
                this.UIManagerRef("text_TotalWin_value_mobileFG") && (this.UIManagerRef("text_TotalWin_value_mobileFG").x = 1378) && (this.UIManagerRef("text_TotalWin_value_mobileFG").y = 940);

                this.UIManagerRef("Mobiletext_bet_labelFG") && (this.UIManagerRef("Mobiletext_bet_labelFG").x = 1450) && (this.UIManagerRef("Mobiletext_bet_labelFG").y = 1050);
                this.UIManagerRef("Mobiletext_mobColonSymbol3FG") && (this.UIManagerRef("Mobiletext_mobColonSymbol3FG").x = 1455) && (this.UIManagerRef("Mobiletext_mobColonSymbol3FG").y = 1048);
                this.UIManagerRef("Mobiletext_bet_valueFG") && (this.UIManagerRef("Mobiletext_bet_valueFG").x = 1475) && (this.UIManagerRef("Mobiletext_bet_valueFG").y = 1050);

                this.UIManagerRef("text_FreeGame_label_mobileFG") && (this.UIManagerRef("text_FreeGame_label_mobileFG").visible = false);
                this.UIManagerRef("text_FreeGame_value1_mobileFG") && (this.UIManagerRef("text_FreeGame_value1_mobileFG").x = 620) && (this.UIManagerRef("text_FreeGame_value1_mobileFG").y = 940);

                this.UIManagerRef("text_Win_label_mobile") && (this.UIManagerRef("text_Win_label_mobile").x = 900) && (this.UIManagerRef("text_Win_label_mobile").y = -38);
                this.UIManagerRef("text_colonSymbol3_mobile") && (this.UIManagerRef("text_colonSymbol3_mobile").x = 955) && (this.UIManagerRef("text_colonSymbol3_mobile").y = 27);
                this.UIManagerRef("text_Win_value_mobile") && (this.UIManagerRef("text_Win_value_mobile").x = 975) && (this.UIManagerRef("text_Win_value_mobile").y = -38);

                switch (this.props.languageCode) {
                    case 'bg':
                    case 'hr':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 880);
                        break;
                    case 'cs':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 785);
                        break;
                    case 'da':
                    case 'tr':
                    case 'it':
                    case 'pl':
                    case 'pt':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 830);
                        break;
                    case 'de':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 800);
                        break;
                    case 'es':
                    case 'ru':
                    case 'sr':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 855);
                        break;
                    case 'fr':
                    case 'sv':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 820);
                        break;
                    case 'fi':
                    case 'ro':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 810);
                        break;
                    case 'gr':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 893);
                        break;
                    case 'hu':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 870);
                        break;
                    case 'nl':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 925);
                        break;
                    case 'nb':
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 760);
                        break;
                    default:
                        this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").x = 800);
                }
                this.UIManagerRef("FG_reTrigger_blast_Anim_mobile") && (this.UIManagerRef("FG_reTrigger_blast_Anim_mobile").y = 893);
                this.UIManagerRef("mobileMainContainer") && (this.UIManagerRef("mobileMainContainer").x = -1673) && (this.UIManagerRef("mobileMainContainer").y = 0);
            }
        }
    }

    onOrientationChange() {
        this.socialPosition();
        this.portraitTextAlignmentFG();
        let reelGrid = this.UIManagerRef("reelgridLayer");
        !isTablet && this.UIManagerRef("FG_gameLogo_Anim_mobile") && (this.UIManagerRef("FG_gameLogo_Anim_mobile").scale.set(2));

        if (isMobile && window.innerHeight > window.innerWidth) {
            reelGrid && reelGrid.scale.set(configGame.REEL_GRID_SCALE_IN_PORTRAIT);
            reelGrid && reelGrid.position.set(configGame.REEL_GRID_X_IN_PORTRAIT, configGame.REEL_GRID_Y_IN_PORTRAIT);
        } else {
            reelGrid && reelGrid.scale.set(configGame.REEL_GRID_SCALE);
            reelGrid && reelGrid.position.set(configGame.REEL_GRID_X, configGame.REEL_GRID_Y);
        }
    }

    //scaling for landscape mode
    landscapeScaling() {
        this.UIManagerRef("frameReel_FG_Image_Mob") && (this.UIManagerRef("frameReel_FG_Image_Mob").scale.set(1));
    }

    //scaling for portrait mode
    portraitScaling() {
        this.UIManagerRef("frameReel_FG_Image_Mob") && (this.UIManagerRef("frameReel_FG_Image_Mob").scale.x = 0.83);
        this.UIManagerRef("frameReel_FG_Image_Mob") && (this.UIManagerRef("frameReel_FG_Image_Mob").scale.y = 0.83);
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

    updateTotalWin() {
        let winAmount = ((this.storeWinAmount) / 100).toFixed(2);
        let win = CURRENCY.CurrencyManager.formatCurrencyString(Number(winAmount), true, true, true, true);
        if (!isMobile) {
            this.UIManagerRef("text_TotalWin_value").visible = false;

            this.UIManagerRef("text_TotalWin_value") && (this.UIManagerSetText("text_TotalWin_value", win));
        } else {
            let val = this.UIManagerRef("text_TotalWin_label_mobileFG").text;
            this.UIManagerRef("text_TotalWin_value_mobileFG").visible = false;
            this.UIManagerRef("text_TotalWin_value_mobileFG") && (this.UIManagerSetText("text_TotalWin_value_mobileFG", val + " " + win));
        }
    }

    funCounterText(freegameSpinCounttProps: any) {
        let textFreeGamevalue2mobileFG = (Number(this.UIManagerRef("text_FreeGame_value2_mobileFG").text));
        let textFreeGameOFlabelmobileFG = this.UIManagerRef("text_FreeGame_OF_label_mobileFG") && this.UIManagerRef("text_FreeGame_OF_label_mobileFG").text;
        let textFreeGamelabelmobileFG = this.UIManagerRef("text_FreeGame_label_mobileFG") && this.UIManagerRef("text_FreeGame_label_mobileFG").text;
        this.UIManagerRef("text_FreeGame_value1_mobileFG") && (this.UIManagerSetText("text_FreeGame_value1_mobileFG", textFreeGamelabelmobileFG + " " + freegameSpinCounttProps + " " + textFreeGameOFlabelmobileFG + " " + textFreeGamevalue2mobileFG));
    }

    funCounterTextPortrait(freegameSpinCount: any) {
        let textFreeGamevalue2mobileFG = (Number(this.UIManagerRef("text_FreeGame_value2_mobileFG").text));
        let textFreeGameOFlabelmobileFG = this.UIManagerRef("text_FreeGame_OF_label_mobileFG") && this.UIManagerRef("text_FreeGame_OF_label_mobileFG").text;
        let textFreeGamelabelmobileFG = this.UIManagerRef("text_FreeGame_label_mobileFG") && this.UIManagerRef("text_FreeGame_label_mobileFG").text;
        if (this.props.jurisdictionKey === "social") {

            this.UIManagerRef("text_FreeGame_value1_mobileFG") && (this.UIManagerSetText("text_FreeGame_value1_mobileFG", textFreeGamelabelmobileFG + " " + freegameSpinCount + " " + textFreeGameOFlabelmobileFG + " " + textFreeGamevalue2mobileFG));
        }
        else {
            this.UIManagerRef("text_FreeGame_value1_mobileFG") && (this.UIManagerSetText("text_FreeGame_value1_mobileFG", freegameSpinCount + " " + textFreeGameOFlabelmobileFG + " " + textFreeGamevalue2mobileFG));
        }
    }

    bgGraphicLayout() {
        if (isMobile && this.UIManagerRef("bgGraphic_for_FG")) {
            window.innerWidth < window.innerHeight ?
                (this.UIManagerRef("bgGraphic_for_FG").position.set(10, 646)) && (this.UIManagerRef("bgGraphic_for_FG").width = 1060) && (this.UIManagerRef("bgGraphic_for_FG").height = 618.5)
                : (this.UIManagerRef("bgGraphic_for_FG").position.set(415.5, 237)) && (this.UIManagerRef("bgGraphic_for_FG").width = 1070) && (this.UIManagerRef("bgGraphic_for_FG").height = 631.5);
        }
    }
    setLayout(nextProps: any) {
        if (isMobile) {
            if (window.innerWidth < window.innerHeight) {
                this.portraitScaling();
                this.funCounterTextPortrait(nextProps.freegameSpinCount);
            } else {
                this.landscapeScaling();
                this.funCounterText(nextProps.freegameSpinCount);
            }
        }
    }


    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (this.props.inFreeGame && (nextProps.freegameSpinCountRemaining !== this.props.freegameSpinCountRemaining || nextProps.reConstruction && nextProps.reConstruction !== this.props.reConstruction) && nextProps.storeMultiplierCurrentValue != this.props.preMultiplier) {
            nextProps.setFreeSpinRewards(true);
        }
        if (nextProps.layoutMode !== this.props.layoutMode
            || nextProps.inFreeGame !== this.props.inFreeGame || nextProps.soundIsPlaying !== this.props.soundIsPlaying
            || nextProps.freegameSpinCountRemaining !== this.props.freegameSpinCountRemaining
            || nextProps.freegameSpinCount !== this.props.freegameSpinCount
            || nextProps.displayReelGridSymbolCount !== this.props.displayReelGridSymbolCount
            || nextProps.spinStopID !== this.props.spinStopID
            || nextProps.featureJustFinished !== this.props.featureJustFinished
            || nextProps.callFlowManager !== this.props.callFlowManager
            || nextProps.spinStart !== this.props.spinStart
            || nextProps.blastStart !== this.props.blastStart
            || nextProps.allSpinComplete !== this.props.allSpinComplete
            || nextProps.showWinShower !== this.props.showWinShower
            || nextProps.counterStartIncreasing !== this.props.counterStartIncreasing
            || nextProps.freeGameFinished !== this.props.freeGameFinished
            || nextProps.showWinCelebration !== this.props.showWinCelebration
            || nextProps.cspStart !== this.props.cspStart
        ) {
            if (nextProps.layoutMode !== this.props.layoutMode) {
                this.layoutChange(nextProps.layoutMode);
                this.onOrientationChange();
                this.setLayout(this.props);
            }
            if (nextProps.cspStart && nextProps.cspStart != this.props.cspStart) {
                if (nextProps.inFreeGame) {
                    this.setPendingfreegameSpinCount(nextProps);
                }
                return false;
            }

            if (nextProps.spinStart && nextProps.spinStart !== this.props.spinStart) {
                this.updateTotalWin();
                if ((!nextProps.InTurboMode || !this.props.InTurboMode) && !nextProps.reConstruction) {
                    GSAPTimer.getInstance().addRepeatTimer(80 / 1000, () => {
                        if (this.UIManagerRef("FG_manywaysText_" + this.ui_mode).alpha > 0) {
                            this.UIManagerRef("FG_manywaysText_desktop") && (this.UIManagerRef("FG_manywaysText_desktop").alpha -= this.alphaOfManyways);
                            this.UIManagerRef("FG_manywaysText_mobile") && (this.UIManagerRef("FG_manywaysText_mobile").alpha -= this.alphaOfManyways);
                            this.UIManagerRef("FG_textManyWays_Image_mobile") && (this.UIManagerRef("FG_textManyWays_Image_mobile").alpha -= this.alphaOfManyways);
                        }
                        if (this.UIManagerRef("FG_manywaysText_" + this.ui_mode).alpha <= 0) {
                            this.UIManagerRef("FG_manywaysText_" + this.ui_mode).alpha = 0;
                        }
                    }, () => {
                        this.UIManagerRef("FG_manywaysText_" + this.ui_mode).alpha = 0;
                    });

                }
            }
            if (!nextProps.inFreeGame && nextProps.inFreeGame !== this.props.inFreeGame) {
                this.props.setTotalCreditWinAmount(this.storeWinAmount);
            }
            this.UIManagerRef("text_FreeGame_levelUp") && this.UIManagerRef("text_FreeGame_levelUp") !== 'Level Up' && (this.UIManagerSetText("text_FreeGame_levelUp", "Level Up"));


            if (nextProps.freegameSpinCount && nextProps.freegameSpinCount !== this.props.freegameSpinCount) {
                this.UIManagerRef("text_FreeGame_value1") && (this.UIManagerSetText("text_FreeGame_value1", nextProps.freegameSpinCount));
                if (isMobile) {
                    if (window.innerHeight < window.innerWidth) {
                        this.funCounterText(nextProps.freegameSpinCount);
                    } else {
                        this.funCounterTextPortrait(nextProps.freegameSpinCount);
                    }
                }
            }

            if (nextProps.displayReelGridSymbolCount !== this.props.displayReelGridSymbolCount) {
                this.mwTextValue = 1;
                this.reelGridSymbolsArray = [];
                this.symbolsCountRearrangeCount(nextProps);
            }
            if (nextProps.spinStopID > -1 && nextProps.spinStopID !== this.props.spinStopID) {
                this.UIManagerRef("FG_manywaysText_" + this.ui_mode) && (this.UIManagerRef("FG_manywaysText_" + this.ui_mode).alpha = 1);
                this.mwTextValue = this.mwTextValue * this.reelGridSymbolsArray[nextProps.spinStopID];
                this.UIManagerRef("FG_manywaysText_" + this.ui_mode) && (this.UIManagerRef("FG_manywaysText_" + this.ui_mode).text = this.mwTextValue);
            }
            return false;
        }
        return false;
    }

    setPendingfreegameSpinCount(nextProps: any): void {
        let freegameSpinCount = String(Number(nextProps.freegameSpinCount) + (constant.configGame.isReconstruction ? 0 : 1));
        this.UIManagerRef("text_FreeGame_value1") && (this.UIManagerSetText("text_FreeGame_value1", freegameSpinCount));
        if (isMobile) {
            if (window.innerHeight < window.innerWidth) {
                this.funCounterText(freegameSpinCount);
            } else {
                this.funCounterTextPortrait(freegameSpinCount);
            }
        }
    }

    //this function will show the effect of increasing free spins when 3 or more scatter trigger.
    startTextChangingEffect(nextProps: any) {
        this.incrementFreeCounter(nextProps);
    }

    incrementFreeCounter(nextProps: any) {
        let addText = "";
        if (isMobile) {
            addText = "_mobileFG";
        }
    }

    //this method will call after the first rendering for scaling and logo animation looping
    bindUI() {

        if (isMobile) {
            if (window.innerWidth < window.innerHeight) {
                this.portraitScaling();
            } else {
                this.landscapeScaling();
            }
        }
    }

    //this method will handle sounds on button's visibility accordingly
    soundOnButtonFunctionality() {
        // if (this.props.soundIsPlaying && this.props.soundOnOff) {
        if (this.props.soundIsPlaying) {
            this.props.playingSound(false);
            this.props.stopAllBGMSound(true);
            this.props.stopAllSFXSound(true);

        }

    }

    //this method will handle mute button's visibility accordingly
    soundOffButtonFunctionality() {
        if (this.props.soundIsPlaying && this.props.soundOnOff) {
            this.props.playingSound(false);
            this.props.stopAllBGMSound(true);
            this.props.stopAllSFXSound(true);
        } else {
            this.props.soundLoadStartFunction(true);
            this.props.stopAllBGMSound(false);
            this.props.stopAllSFXSound(false);
            this.props.playingSound(true);
        }
    }
    handleEvent = (e: any) => {
        // console.log("handleEvent");
        if ((e.target.name === "btn_sound" && this.props.showWinCelebration) || (e.target.name === "btn_soundOff" && this.props.showWinCelebration)) {
            return
        }
        if (e.target.name === "btn_sound") {
            this.UIManagerRef("btn_sound") && (this.UIManagerRef("btn_sound").visible = false);
            this.UIManagerRef("btn_soundOff").visible = true;
            this.soundOnButtonFunctionality();
            stopSoundLoop("freeGameLoop");
            stopSoundLoop("baseGameLoop");
        }
        if (e.target.name === "btn_soundOff") {
            this.UIManagerRef("btn_soundOff") && (this.UIManagerRef("btn_soundOff").visible = false);
            this.UIManagerRef("btn_sound").visible = true;
            playSoundLoop("freeGameLoop", "jq_mx_freegame_music_loop", true, 0.6);
            this.soundOffButtonFunctionality();
        }
        if (e.target.name === "btn_turboEnable") {
            this.props.setTurboMode(false);
            this.props.setGameTurboMode(false);
            this.UIManagerRef("btn_turboEnable") && (this.UIManagerRef("btn_turboEnable").visible = false);
            this.UIManagerRef("btn_turDisable").visible = true;
            UIManager.getRef("btn_turDisable").interactive = true;
        }
        if (e.target.name === "btn_turDisable") {
            this.props.setTurboMode(true);
            this.props.setGameTurboMode(true);
            this.UIManagerRef("btn_turDisable") && (this.UIManagerRef("btn_turDisable").visible = false);
            this.UIManagerRef("btn_turboEnable").visible = true;
            UIManager.getRef("btn_turboEnable").interactive = true;
        }

    }


    useQuery = () => {
        let search = window.location.search;
        return new URLSearchParams(search);
    }

    symbolDroping() {
        // frameworkReelGrid.data.delayDropDuration = 900;
    }

    setButtonActivitedInFG(): void {
        if (constant.configGame.Text_COUNT_AP && Number(constant.configGame.Text_COUNT_AP) > 0) {
            UIManager.getRef("Text_COUNT_AP").visible = true;
            UIManager.getRef("btn_autoplay_stop").visible = true;
            UIManager.getRef("btn_autoplay_stop").interactive = false;
            (UIManager.setText("Text_COUNT_AP", constant.configGame.Text_COUNT_AP));
            if (isMobile) {
                UIManager.getRef("btn_autoplay_stop") && (UIManager.getRef("btn_autoplay_mobile").visible = false)

                if (window.innerWidth < window.innerHeight) {
                    UIManager.getRef("Text_COUNT_AP").x = 732;
                    UIManager.getRef("Text_COUNT_AP").y = 1698.5;

                    UIManager.getRef("btn_autoplay_stop").x = 685;
                    UIManager.getRef("btn_autoplay_stop").y = 1648;


                } else {
                    UIManager.getRef("Text_COUNT_AP").x = 1752;
                    UIManager.getRef("Text_COUNT_AP").y = 292;

                    UIManager.getRef("btn_autoplay_stop").x = 1705;
                    UIManager.getRef("btn_autoplay_stop").y = 240;
                }
            }
        } else {
            if (isMobile) {
                if (window.innerWidth > window.innerHeight) {
                    UIManager.getRef("btn_autoplay_mobile").x = 1705;
                    UIManager.getRef("btn_autoplay_mobile").y = 240;
                } else {
                    UIManager.getRef("btn_autoplay_mobile").x = 685;
                    UIManager.getRef("btn_autoplay_mobile").y = 1648;
                }
            } else {
                UIManager.getRef("btn_autoplay_desktop").visible = true;
                UIManager.getRef("btn_autoplay_desktop").interactive = false;
            }
        }
    }

    componentDidMount() {
        this.setButtonActivitedInFG();
        this.layoutChange(this.props.layoutMode);
        this.symbolDroping();

        if (constant.configGame.isReconstruction) {
            this.props.playingSound(true);
            GSAPTimer.getInstance().addTimer(0.1, () => {
                this.UIManagerRef("btn_soundOff") && (this.UIManagerRef("btn_soundOff").visible = false);
                this.UIManagerRef("btn_sound").visible = true;
                if (isMobile) {
                    this.UIManagerRef("btn_turboEnable") && (this.UIManagerRef("btn_turboEnable").visible = false);
                    this.UIManagerRef("btn_turDisable").visible = true;
                }
            });
        }

        if (this.props.checkGameTurboMode) {
            this.UIManagerRef("btn_turDisable") && (this.UIManagerRef("btn_turDisable").visible = false);
            this.UIManagerRef("btn_turboEnable").visible = true;
        } else {
            GSAPTimer.getInstance().addTimer(0.1, () => {
                this.UIManagerRef("btn_turboEnable") && (this.UIManagerRef("btn_turboEnable").visible = false);
                this.UIManagerRef("btn_turDisable").visible = true;
                if (isMobile) {
                    this.UIManagerRef("btn_soundOff") && (this.UIManagerRef("btn_soundOff").visible = false);
                    this.UIManagerRef("btn_sound").visible = true;
                }
            });
        }

        if (this.props.soundIsPlaying) {
            this.UIManagerRef("btn_soundOff") && (this.UIManagerRef("btn_soundOff").visible = false);
            this.UIManagerRef("btn_sound").visible = true;
        } else {
            this.UIManagerRef("btn_sound") && (this.UIManagerRef("btn_sound").visible = false);
            this.UIManagerRef("btn_soundOff").visible = true;
        }

        if (this.props.soundOnOff) {
            if (((localStorage.getItem("playerId-sound-" + this.useQuery().get("token")) === "true") ? true : false)) {
                this.props.playingSound(true);
            } else {
                this.props.playingSound(false);
            }
        }


        this.bindUI();
        this.onOrientationChange();
        if (this.props.freegameSpinCount !== this.props.freegameSpinCountRemaining) {
            this.props.setMultiplierValue(this.props.storeMultiplierCurrentValue);
        }
        this.UIManagerRef("text_FreeGame_value1") && (this.UIManagerSetText("text_FreeGame_value1", this.props.freegameSpinCount));
        this.UIManagerRef("text_FreeGame_value2") && (this.UIManagerSetText("text_FreeGame_value2", this.props.freegameSpinCountWin));
        this.UIManagerRef("text_FreeGame_value2_mobileFG") && (this.UIManagerSetText("text_FreeGame_value2_mobileFG", this.props.freegameSpinCountWin));
        if (this.props.freegameSpinCountWinDuringReconstrcution) {
            if (isMobile) {
                this.UIManagerRef("text_FreeGame_value2_mobileFG") && (this.UIManagerSetText("text_FreeGame_value2_mobileFG", this.props.freegameSpinCountWinDuringReconstrcution));
            } else {
                this.UIManagerRef("text_FreeGame_value2") && (this.UIManagerSetText("text_FreeGame_value2", this.props.freegameSpinCountWinDuringReconstrcution));
            }

        }
        if (isMobile) {
            let textFreeGamevalue2mobileFG = (Number(this.UIManagerRef("text_FreeGame_value2_mobileFG").text));
            let textFreeGameOFlabelmobileFG = this.UIManagerRef("text_FreeGame_OF_label_mobileFG") && this.UIManagerRef("text_FreeGame_OF_label_mobileFG").text;
            let textFreeGamelabelmobileFG = this.UIManagerRef("text_FreeGame_label_mobileFG") && this.UIManagerRef("text_FreeGame_label_mobileFG").text;
            if (this.props.jurisdictionKey === "social") {
                this.UIManagerRef("text_FreeGame_value1_mobileFG") && (this.UIManagerSetText("text_FreeGame_value1_mobileFG", textFreeGamelabelmobileFG + " " + this.props.freegameSpinCount + " " + textFreeGameOFlabelmobileFG + " " + textFreeGamevalue2mobileFG));

            }
            else {
                if (window.innerHeight < window.innerWidth) {
                    this.UIManagerRef("text_FreeGame_value1_mobileFG") && (this.UIManagerSetText("text_FreeGame_value1_mobileFG", textFreeGamelabelmobileFG + " " + this.props.freegameSpinCount + " " + textFreeGameOFlabelmobileFG + " " + textFreeGamevalue2mobileFG));
                } else {
                    this.UIManagerRef("text_FreeGame_value1_mobileFG") && (this.UIManagerSetText("text_FreeGame_value1_mobileFG", this.props.freegameSpinCount + " " + textFreeGameOFlabelmobileFG + " " + textFreeGamevalue2mobileFG));
                }
            }
        }

        this.symbolsCountRearrangeCount(this.props);
        let totalmwCount = 1;
        for (let j = 0; j < this.reelGridSymbolsArray.length; j++) {
            totalmwCount = totalmwCount * this.reelGridSymbolsArray[j];
        }
        this.UIManagerRef("FG_manywaysText_" + this.ui_mode) && (this.UIManagerRef("FG_manywaysText_" + this.ui_mode).text = totalmwCount);
        let balanceInCurrency = CURRENCY.CurrencyManager.formatCurrencyString(this.props.transitionBalance / 100, true, true, true, true);
        this.UIManagerRef("Mobiletext_balance_valueFG") && (this.UIManagerSetText("Mobiletext_balance_valueFG", balanceInCurrency));
        let betInCurrency = CURRENCY.CurrencyManager.formatCurrencyString(this.props.betList[this.props.currentBetIndex] / 100, true, true, true, true);
        this.props.currentVoucherResult === undefined ? this.UIManagerRef("Mobiletext_bet_valueFG") && (this.UIManagerSetText("Mobiletext_bet_valueFG", betInCurrency)) : this.UIManagerRef("Mobiletext_bet_valueFG") && (this.UIManagerSetText("Mobiletext_bet_valueFG", this.props.currentVoucherResult.bet));

        let winAmount = ((this.props.totalWinAmount + this.storeWinAmount) / 100).toFixed(2);
        let win = CURRENCY.CurrencyManager.formatCurrencyString(Number(winAmount), true, true, true, true);

        if (!isMobile) {
            this.UIManagerRef("text_TotalWin_value").visible = false;
            this.UIManagerRef("text_TotalWin_value") && (this.UIManagerSetText("text_TotalWin_value", win));
        } else {
            let val = this.UIManagerRef("text_TotalWin_label_mobileFG").text;
            this.UIManagerRef("text_TotalWin_value_mobileFG").visible = false;
            this.UIManagerRef("text_TotalWin_value_mobileFG") && (this.UIManagerSetText("text_TotalWin_value_mobileFG", val + " " + win));
        }
        this.storeWinAmount = this.props.totalWinAmount + this.storeWinAmount;
        this.UIManagerRef("good_Luck_Text") && (this.UIManagerRef("good_Luck_Text").visible = false);
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        this.layoutChange(this.props.layoutMode);
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

    render() {
        (document.getElementsByClassName("canvasBgImage")[0] as any).src = this.canvasBgImagePage;
        return (
            <UIManager id={"freeGameGenericUIContainer"} type={"Container"} name={"freeGameGenericUIContainer"} app={this.app}
                ref={i => this.gofFreeGameSpecialLayerContainer = i}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            app={this.app} configGame={configGame}
                            id={i.id} {...i} ClickHandler={this.handleEvent} />)
                }
            </UIManager>)
    }

}

export default withPixiApp(connect(
    (state: Pick<IStore, 'gameactionstate' | 'winCelebrationState' | 'winShowerState' | 'freegameState' | 'applicationState' | 'soundState' | 'reelgridState' | 'flowManagerState' | 'behaviourState' | 'buttonPanelState' | 'behaviourState' | 'basegameState' | 'MultiplierState' | 'betPanelState' | 'revealFeatureState'>): IStateToProps =>
    ({
        inFreeGame: state.freegameState.inFreeGame,
        layoutMode: state.applicationState.layoutMode,
        soundIsPlaying: state.soundState.soundIsPlaying,
        freegameSpinCountRemaining: state.freegameState.freegameSpinCountRemaining,
        freegameSpinCount: state.freegameState.freegameSpinCount,
        freegameSpinCountWin: state.freegameState.freegameSpinCountWin,
        freegameSpinCountWinDuringReconstrcution: state.freegameState.freegameSpinCountWinDuringReconstrcution,
        spinStopID: state.reelgridState.spinStopID,
        displayReelGridSymbolCount: state.reelgridState.displayReelGridSymbolCount,
        allSpinComplete: state.reelgridState.allSpinComplete,
        featureJustReTriggered: state.freegameState.featureJustReTriggered,
        callFlowManager: state.flowManagerState.callFlowManager,
        featureJustFinished: state.freegameState.featureJustFinished,
        totalWinAmount: state.behaviourState.totalWinAmount,
        totalCreditWinAmount: state.behaviourState.totalCreditWinAmount,
        transitionBalance: state.behaviourState.transitionBalance,
        balance: state.basegameState.balance,
        betList: state.basegameState.betList,
        currentBetIndex: state.basegameState.currentBetIndex,
        multiplierActive: state.MultiplierState.multiplierActive,
        storeMultiplierCurrentValue: state.MultiplierState.storeMultiplierCurrentValue,
        spinStart: state.reelgridState.spinStart,
        blastStart: state.reelgridState.blastStart,
        winAmount: state.basegameState.winAmount,
        InTurboMode: state.reelgridState.InTurboMode,
        showWinShower: state.winShowerState.showWinShower,
        counterStartIncreasing: state.behaviourState.counterStartIncreasing,
        reConstruction: state.basegameState.reConstruction,
        languageCode: state.applicationState.languageCode,
        soundOnOff: state.applicationState.soundOnOff,
        jurisdictionKey: state.applicationState.jurisdictionKey,
        currentVoucherResult: state.gameactionstate.currentVoucherResult,
        showWinCelebration: state.winCelebrationState.showWinCelebration,
        cspStart: state.reelgridState.cspStart,
        level: state.revealFeatureState.level,
        preMultiplier: state.MultiplierState.preMultiplier,
        checkGameTurboMode: state.behaviourState.checkGameTurboMode,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        playingSound: (soundIsPlaying: any): any => dispatch(soundActions.playingSound(soundIsPlaying)),
        stopAllBGMSound: (stopBgSound: any): any => dispatch(soundActions.stopAllBGMSound(stopBgSound)),
        stopAllSFXSound: (stopAllSfxSound: boolean): any => dispatch(soundActions.stopAllSFXSound(stopAllSfxSound)),
        nextFreegame: (): any => dispatch(freegameActions.nextFreegame()),
        setMultiplierValue: (multiplierCurrentValue: number): any => dispatch(multiplierActions.setMultiplierValue(multiplierCurrentValue)),
        setTotalCreditWinAmount: (totalCreditWinAmount: number): any => dispatch(behaviourAction.setTotalCreditWinAmount(totalCreditWinAmount)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        setWinHorizontalSymbolCoOrdinate: (winSymbolCoOrdinate: any): any => dispatch(horizontalSymbolActions.setWinSymbolCoOrdinate(winSymbolCoOrdinate)),
        reTriggerCountBlast: (reTriggerBlastCount: any): any => dispatch(soundGameLevelAction.reTriggerCountBlast(reTriggerBlastCount)),
        startIncreasingCounter: (counterStartIncreasing: boolean): any => dispatch(behaviourAction.startIncreasingCounter(counterStartIncreasing)),
        soundLoadStartFunction: (soundLoadStart: boolean): any => dispatch(soundActions.soundLoadStartFunction(soundLoadStart)),
        setFreeSpinRewards: (freeSpinRewards: boolean): any => dispatch(multiplierActions.setFreeSpinRewards(freeSpinRewards)),
        setTurboMode: (InTurboMode: boolean): any => dispatch(reelsActions.setTurboMode(InTurboMode)),
        setGameTurboMode: (checkGameTurboMode: boolean): any => dispatch(behaviourAction.setGameTurboMode(checkGameTurboMode)),

    }))(withFreeGameConfiguration(GofFreeGameSpecialLayer)));
