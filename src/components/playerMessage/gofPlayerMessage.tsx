import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { layoutssActions, withPlayerMessageConfiguration, baseGameAction } from "@bonanzainteractive/slote_core";
import { UIManager, GSAPTimer, ItweenProps, GSAPTween, } from "@bonanzainteractive/core";
import PIXI from "pixi.js";
import { isMobile } from "react-device-detect";
import { CURRENCY } from "@bonanzainteractive/core";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { constant } from "../../slot/data/config";
import { actions as featureAction } from "../../gamereducer/revealFeatureReducer";

interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}

interface IStateToProps {
    inFreeGame: string;
    reconstrcutionInFreegame: boolean;
    layoutMode: string;
    jurisdictionKey: string;
    spinStart: any;
    allSpinComplete: any;
    betList: any;
    currentBetIndex: any;
    selectedCoin: any;
    coinList: any;
    winAmount: any;
    isLastWinSame: boolean;
    balance: any;
    allButtonEnable: any;
    transitionBalance: any;
    previousBalance: any;
    winAmountEmpty: any;
    basegamestate: any;
    totalCreditWinAmount: any;
    totalWinAmountInFreeGame: number;
    showTime: any;
    showRTP: boolean;
    storeRtp: string;
    maxWinOddsCount: number;
    showTopWinOdds: any;
    currencyIgnoreDecimals: boolean;
    languageCode: any;
    currentVoucherResult: object;
    currentVoucherSpinResult: object;
    increaseBetResult: Object;
    cspStart: boolean;
    updateWin: boolean;
    freegameSpinCountRemaining: number;
    totalWinAmount: number;
    callFlowManager: boolean;
    freeSpinAdd: number;

}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class GofPlayerMessage extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected gofPlayerMessageContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: Object[] = [];
    protected leftContainerChildCurrentIndex: number;
    protected rightContainerChildCurrentIndex: number;
    protected messagesRunInLoopLeftContainer: any;
    protected messagesNotRunInLoopLeftContainer: any;
    protected messagesRunInLoopRightContainer: any;
    protected messagesNotRunInLoopRightContainer: any;
    protected coinValueDivider: number = 2000;
    protected constantT1: number = 100;
    protected winValueStore: number = 0;
    protected winCelebrationMinimumValue: number = 25;
    private UIManagerRef: any;
    private UIManagerSetText: any = UIManager.setText;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            leftContainer: false,
            rightContainer: false,
            uiElements: [],
            lang: "en"
        }
        this.UIManagerRef = UIManager.getRef;
        this.gofPlayerMessageContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }

        this.displayUI = this.props.child.filter(this.checkUiMode.bind(this))
        this.leftContainerChildCurrentIndex = 0;
        this.rightContainerChildCurrentIndex = 0;
        this.messagesRunInLoopLeftContainer = [];
        this.messagesNotRunInLoopLeftContainer = [];
        this.messagesRunInLoopRightContainer = [];
        this.messagesNotRunInLoopRightContainer = [];
        this.displayUI.map((data: any) => {
            if (data.name === "leftInfoContainer") {
                for (let i = 0; i < data.child.length; i++) {
                    if (data.child[i].messageInLoop) {
                        this.messagesRunInLoopLeftContainer.push(data.child[i]);
                    } else {
                        this.messagesNotRunInLoopLeftContainer.push(data.child[i]);
                    }
                }
            } else if (data.name === "rightInfoContainer") {
                for (let i = 0; i < data.child.length; i++) {
                    if (data.child[i].messageInLoop) {
                        this.messagesRunInLoopRightContainer.push(data.child[i]);
                    } else {
                        this.messagesNotRunInLoopRightContainer.push(data.child[i]);
                    }
                }
            }
        });

    }
    //when voucher is finished or voucher hasn't been set, then this function will be called----------------
    setBetNormally(bet: string) {
        this.UIManagerRef("text_bet_value") && (this.UIManagerSetText("text_bet_value", bet));
    }

    setBalance(nextProps: any) {
        let balanceValueInCurrency = CURRENCY.CurrencyManager.formatCurrencyString(constant.configGame.balance, true, true, true, true);
        this.UIManagerRef("text_Balance_value_withSign") && (this.UIManagerSetText("text_Balance_value_withSign", balanceValueInCurrency));

        //WILL UNCOMMENT AFTER GETTING ACCURATE BALANCE  this.props.setApplicationBalance(nextProps.transitionBalance);

    }
    checkUiMode(uimodeobj: any) {

        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both";
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    setBetTextSize(nextProps: any) {
        let toString = (this.props.betList[nextProps.currentBetIndex]).toString();
        let bet = CURRENCY.CurrencyManager.formatCurrencyString(Number(toString), true, true, true, true);
        this.setBetNormally(bet);

    }

    bindUI() {
        this.layoutChange(this.props.layoutMode);
        if (this.props.currencyIgnoreDecimals) {
            let toString = (this.props.betList[this.props.currentBetIndex]);
            let bet = CURRENCY.CurrencyManager.formatCurrencyString(toString, true, true, true, true);
            this.setBetNormally(bet);

        } else {
            this.setBetTextSize(this.props);
        }
        this.setBalance(this.props);


    }

    getMobileText(trueString: string, falseString: string) {
        this.UIManagerRef(trueString) && (this.UIManagerRef(trueString).visible = true);
        this.UIManagerRef(falseString) && (this.UIManagerRef(falseString).visible = false);
    }

    setGameRtpText(setTextString: string) {
        let setGameRtpText = this.UIManagerRef(setTextString);
        setGameRtpText && this.UIManagerSetText(setTextString, this.props.storeRtp);
        setGameRtpText && (setGameRtpText.visible = true);
    }

    setGameRtp() {
        if (this.props.showRTP) {
            if (!isMobile) {
                this.UIManagerSetText("game_rtp", " " + this.props.storeRtp);
                this.UIManagerRef("game_rtp").visible = true;
            }
            else {
                if (window.innerWidth > window.innerHeight) {
                    this.getMobileText("game_rtp_m_text", "game_rtp_m_text_portrait");
                    this.getMobileText("game_rtp_m", "game_rtp_m_portrait");
                    this.setGameRtpText("game_rtp_m");
                } else {
                    this.getMobileText("game_rtp_m_text_portrait", "game_rtp_m_text");
                    this.getMobileText("game_rtp_m_portrait", "game_rtp_m");
                    this.setGameRtpText("game_rtp_m_portrait");
                }
            }
        }
        else {
            if (!isMobile) {
                this.UIManagerRef("game_rtp_text").visible = false;
            }
            else {
                this.UIManagerRef("game_rtp_m_text").visible = false;
                this.UIManagerRef("game_rtp_m_text_portrait").visible = false;
            }
        }
    }

    setMaxWinOddText(setTextString: string) {
        let setMaxWinOddText = this.UIManagerRef(setTextString);
        setMaxWinOddText && this.UIManagerSetText(setTextString, this.props.maxWinOddsCount);
        setMaxWinOddText && (setMaxWinOddText.visible = true);
    }


    setMaxWinOdd() {
        if (this.props.showTopWinOdds) {
            if (!isMobile) {
                this.UIManagerSetText("setMaxWinOdd", this.props.maxWinOddsCount);
                this.UIManagerRef("setMaxWinOdd").visible = true;
            }
            else {
                if (window.innerWidth > window.innerHeight) {
                    this.UIManagerSetText("setMaxWinOdd_m2", this.props.maxWinOddsCount);
                    this.UIManagerRef("setMaxWinOdd_m2").visible = true;
                    this.getMobileText("setMaxWinOdd_m", "setMaxWinOdd_portrait");
                    this.setMaxWinOddText("setMaxWinOdd_m2");

                } else {
                    this.UIManagerSetText("setMaxWinOdd_m2_portrait", this.props.maxWinOddsCount);
                    this.UIManagerRef("setMaxWinOdd_m2_portrait").visible = true;
                    this.getMobileText("setMaxWinOdd_portrait", "setMaxWinOdd_m");
                    this.setMaxWinOddText("setMaxWinOdd_m2_portrait");
                }
            }
        }

        else {
            if (!isMobile) {
                this.UIManagerRef("setMaxWinOdd_text").visible = false;
                this.UIManagerRef("setMaxWinOdd").visible = false;
            }
            else {
                this.UIManagerRef("setMaxWinOdd_m").visible = false;
                this.UIManagerRef("setMaxWinOdd_portrait").visible = false;
                this.UIManagerRef("setMaxWinOdd_m2").visible = false;
                this.UIManagerRef("setMaxWinOdd_m2_portrait").visible = false;
            }
        }
    }

    desktopSocial1(props: any) {

        if (props.basegamestate) {

            if (this.props.jurisdictionKey === "social") {

                this.UIManagerRef("text_Balance_label") && (this.UIManagerRef("text_Balance_label").visible = true);
                this.UIManagerRef("text_Balance_label") && (this.UIManagerRef("text_Balance_label")._anchor._x = 0.5)
                this.UIManagerRef("text_Balance_label") && (this.UIManagerRef("text_Balance_label").x = 465) && (this.UIManagerRef("text_Balance_label").y = -105);
                this.UIManagerRef("text_Balance_value_withSign") && (this.UIManagerRef("text_Balance_value_withSign")._anchor._x = 0.5)
                this.UIManagerRef("text_Balance_value_withSign") && (this.UIManagerRef("text_Balance_value_withSign").x = 465) && (this.UIManagerRef("text_Balance_value_withSign").y = -60);

                this.UIManagerRef("text_Win_label_desktop") && (this.UIManagerRef("text_Win_label_desktop").x = 400) && (this.UIManagerRef("text_Win_label_desktop").y = 32);
                this.UIManagerRef("text_colonSymbol3_desktop") && (this.UIManagerRef("text_colonSymbol3_desktop").x = 405) && (this.UIManagerRef("text_colonSymbol3_desktop").y = 30);
                this.UIManagerRef("text_Win_value_desktop") && (this.UIManagerRef("text_Win_value_desktop").x = 425) && (this.UIManagerRef("text_Win_value_desktop").y = 32);

                this.UIManagerRef("text_bet_label") && (this.UIManagerRef("text_bet_label")._anchor._x = .5);
                this.UIManagerRef("text_bet_label") && (this.UIManagerRef("text_bet_label").x = 450) && (this.UIManagerRef("text_bet_label").y = -105);
                this.UIManagerRef("text_colonSymbol1") && (this.UIManagerRef("text_colonSymbol1").visible = false);
                this.UIManagerRef("text_bet_value") && (this.UIManagerRef("text_bet_value")._anchor._x = 0.5)
                this.UIManagerRef("text_bet_value") && (this.UIManagerRef("text_bet_value").x = 450) && (this.UIManagerRef("text_bet_value").y = -60);
            }
            else {

                this.UIManagerRef("text_Balance_label") && (this.UIManagerRef("text_Balance_label").x = 590) && (this.UIManagerRef("text_Balance_label").y = 32);
                this.UIManagerRef("text_Balance_value_withSign") && (this.UIManagerRef("text_Balance_value_withSign").x = 615) && (this.UIManagerRef("text_Balance_value_withSign").y = 32);

                this.UIManagerRef("text_Win_label_desktop") && (this.UIManagerRef("text_Win_label_desktop").x = 190) && (this.UIManagerRef("text_Win_label_desktop").y = 32);
                this.UIManagerRef("text_Win_value_desktop") && (this.UIManagerRef("text_Win_value_desktop").x = 215) && (this.UIManagerRef("text_Win_value_desktop").y = 32);

                this.UIManagerRef("text_bet_label") && (this.UIManagerRef("text_bet_label").x = 530) && (this.UIManagerRef("text_bet_label").y = 32);
                this.UIManagerRef("text_colonSymbol1") && (this.UIManagerRef("text_colonSymbol1").x = 535) && (this.UIManagerRef("text_colonSymbol1").y = 30);
                this.UIManagerRef("text_bet_value") && (this.UIManagerRef("text_bet_value").x = 555) && (this.UIManagerRef("text_bet_value").y = 32);
            }
        }
        else {

            if (this.props.jurisdictionKey === "social") {
                this.UIManagerRef("text_Balance_value_withSign") && (this.UIManagerRef("text_Balance_value_withSign")._anchor._x = 0)
                this.UIManagerRef("text_Balance_label") && (this.UIManagerRef("text_Balance_label")._anchor._x = 1)
                this.UIManagerRef("text_bet_label") && (this.UIManagerRef("text_bet_label")._anchor._x = 1);
                this.UIManagerRef("text_bet_value") && (this.UIManagerRef("text_bet_value")._anchor._x = 0)

                this.UIManagerRef("text_Balance_label") && (this.UIManagerRef("text_Balance_label").x = 590) && (this.UIManagerRef("text_Balance_label").y = 32);
                this.UIManagerRef("text_Balance_value_withSign") && (this.UIManagerRef("text_Balance_value_withSign").x = 615) && (this.UIManagerRef("text_Balance_value_withSign").y = 32);

                this.UIManagerRef("text_Win_label_desktop") && (this.UIManagerRef("text_Win_label_desktop").x = 190) && (this.UIManagerRef("text_Win_label_desktop").y = 32);
                this.UIManagerRef("text_colonSymbol3_desktop") && (this.UIManagerRef("text_colonSymbol3_desktop").x = 195) && (this.UIManagerRef("text_colonSymbol3_desktop").y = 30);
                this.UIManagerRef("text_Win_value_desktop") && (this.UIManagerRef("text_Win_value_desktop").x = 215) && (this.UIManagerRef("text_Win_value_desktop").y = 32);

                this.UIManagerRef("text_bet_label") && (this.UIManagerRef("text_bet_label").x = 545) && (this.UIManagerRef("text_bet_label").y = 32);
                this.UIManagerRef("text_colonSymbol1") && (this.UIManagerRef("text_colonSymbol1").visible = true);
                this.UIManagerRef("text_colonSymbol1") && (this.UIManagerRef("text_colonSymbol1").x = 550) && (this.UIManagerRef("text_colonSymbol1").y = 30);
                this.UIManagerRef("text_bet_value") && (this.UIManagerRef("text_bet_value").x = 570) && (this.UIManagerRef("text_bet_value").y = 32);
            }
            else {

                this.UIManagerRef("text_Balance_label") && (this.UIManagerRef("text_Balance_label").x = 590) && (this.UIManagerRef("text_Balance_label").y = 32);
                this.UIManagerRef("text_Balance_value_withSign") && (this.UIManagerRef("text_Balance_value_withSign").x = 615) && (this.UIManagerRef("text_Balance_value_withSign").y = 32);

                this.UIManagerRef("text_Win_label_desktop") && (this.UIManagerRef("text_Win_label_desktop").x = 190) && (this.UIManagerRef("text_Win_label_desktop").y = 32);
                this.UIManagerRef("text_colonSymbol3_desktop") && (this.UIManagerRef("text_colonSymbol3_desktop").x = 195) && (this.UIManagerRef("text_colonSymbol3_desktop").y = 30);
                this.UIManagerRef("text_Win_value_desktop") && (this.UIManagerRef("text_Win_value_desktop").x = 215) && (this.UIManagerRef("text_Win_value_desktop").y = 32);

                this.UIManagerRef("text_bet_label") && (this.UIManagerRef("text_bet_label").x = 580) && (this.UIManagerRef("text_bet_label").y = 32);
                this.UIManagerRef("text_colonSymbol1") && (this.UIManagerRef("text_colonSymbol1").x = 585) && (this.UIManagerRef("text_colonSymbol1").y = 30);
                this.UIManagerRef("text_bet_value") && (this.UIManagerRef("text_bet_value").x = 605) && (this.UIManagerRef("text_bet_value").y = 32);

            }
        }
    }

    setgraphics() {
        if (this.props.jurisdictionKey === "de")
            if (!isMobile) {
                this.UIManagerRef("graphic_maxodd").visible = true;
                this.UIManagerRef("graphic_RTP").visible = true;
            }
            else {


                if (window.innerWidth > window.innerHeight) {
                    this.UIManagerRef("graphic_maxodd_mobile").visible = true;
                    this.UIManagerRef("graphic_RTP_mobile") && (this.UIManagerRef("graphic_RTP_mobile").visible = true);
                }
                else {
                    this.UIManagerRef("graphic_maxodd_portrait").visible = true;
                    this.UIManagerRef("graphic_RTP_portrait") && (this.UIManagerRef("graphic_RTP_portrait").visible = true);
                }
            }
    }




    setMaxTextPosition() {
        if (!isMobile) {
            switch (this.props.languageCode) {
                case 'bg':
                    this.UIManagerRef("MaxWinOdd_text") && (this.UIManagerRef("MaxWinOdd_text").x = 210);
                    break;
                case 'de':
                    this.UIManagerRef("MaxWinOdd_text") && (this.UIManagerRef("MaxWinOdd_text").x = 165);
                    break;
                case 'it':
                case 'es':
                    this.UIManagerRef("MaxWinOdd_text") && (this.UIManagerRef("MaxWinOdd_text").x = 135);
                    break;
                case 'gr':
                    this.UIManagerRef("MaxWinOdd_text") && (this.UIManagerRef("MaxWinOdd_text").x = 85);
                    break;
                case 'nl':
                    this.UIManagerRef("MaxWinOdd_text") && (this.UIManagerRef("MaxWinOdd_text").x = -40);
                    break;
                case 'ro':
                    this.UIManagerRef("MaxWinOdd_text") && (this.UIManagerRef("MaxWinOdd_text").x = 140);
                    break;
            }
        }

        else {
            if (window.innerWidth > window.innerHeight) {
                switch (this.props.languageCode) {
                    case 'bg':
                        this.UIManagerRef("MaxWinOdd_text_landscape") && (this.UIManagerRef("MaxWinOdd_text_landscape").x = -30);
                        break;
                    case 'de':
                        this.UIManagerRef("MaxWinOdd_text_landscape") && (this.UIManagerRef("MaxWinOdd_text_landscape").x = -90);
                        break;
                    case 'es':
                        this.UIManagerRef("MaxWinOdd_text_landscape") && (this.UIManagerRef("MaxWinOdd_text_landscape").x = -120);
                        break;
                    case 'gr':
                        this.UIManagerRef("MaxWinOdd_text_landscape") && (this.UIManagerRef("MaxWinOdd_text_landscape").x = -180);
                        break;
                    case 'it':
                        this.UIManagerRef("MaxWinOdd_text_landscape") && (this.UIManagerRef("MaxWinOdd_text_landscape").x = -125);
                        break;
                    case 'nl':
                        this.UIManagerRef("MaxWinOdd_text_landscape") && (this.UIManagerRef("MaxWinOdd_text_landscape").x = -330);
                        break;
                    case 'ro':
                        this.UIManagerRef("MaxWinOdd_text_landscape") && (this.UIManagerRef("MaxWinOdd_text_landscape").x = -115);
                        break;
                }
            }
            else {
                switch (this.props.languageCode) {
                    case 'bg':
                        this.UIManagerRef("MaxWinOdd_text_portrait") && (this.UIManagerRef("MaxWinOdd_text_portrait").x = 240);
                        break;
                    case 'de':
                        this.UIManagerRef("MaxWinOdd_text_portrait") && (this.UIManagerRef("MaxWinOdd_text_portrait").x = 185);
                        break;
                    case 'es':
                    case 'it':
                        this.UIManagerRef("MaxWinOdd_text_portrait") && (this.UIManagerRef("MaxWinOdd_text_portrait").x = 145);
                        break;
                    case 'gr':
                        this.UIManagerRef("MaxWinOdd_text_portrait") && (this.UIManagerRef("MaxWinOdd_text_portrait").x = 90);
                        break;
                    case 'nl':
                        this.UIManagerRef("MaxWinOdd_text_portrait") && (this.UIManagerRef("MaxWinOdd_text_portrait").x = -60);
                        break;
                    case 'ro':
                        this.UIManagerRef("MaxWinOdd_text_portrait") && (this.UIManagerRef("MaxWinOdd_text_portrait").x = 155);
                        break;
                }
            }
        }
    }

    setGameClockTime() {
        if (this.props.showTime) {
            GSAPTimer.getInstance().addRepeatTimer((100) / 1000, () => {
                let today = new Date();
                let minutes = today.getMinutes()
                let newMinutes
                if (minutes < 10) {
                    newMinutes = "0" + minutes;
                }
                else {
                    newMinutes = minutes;
                }
                if (isMobile) {
                    let time = today.getHours() + ":" + newMinutes;
                    if (window.innerWidth > window.innerHeight) {
                        let game_clock = this.UIManagerRef("game_clock_m");
                        game_clock && (game_clock.text = time);
                        this.getMobileText("game_clock_m", "game_clock_m_portrait");
                    } else {
                        let game_clock = this.UIManagerRef("game_clock_m_portrait");
                        game_clock && (game_clock.text = time);
                        this.getMobileText("game_clock_m_portrait", "game_clock_m");
                    }
                } else {
                    let time = today.getHours() + ":" + newMinutes;
                    let game_clock = this.UIManagerRef("game_clock");
                    game_clock && (game_clock.text = time);
                    this.UIManagerRef("game_clock").visible = true;
                }
            }, () => {

                this.UIManagerRef("game_clock").visible = true;
            });



        }
    }

    componentDidMount() {
        this.setGameClockTime();
        this.setGameRtp();
        this.setMaxWinOdd();
        this.orientationChange();
        this.bindUI();
        this.setMaxWinOdd();

        this.winValueStore = this.winValueStore + this.props.winAmount;
        //good_Luck_Text
        if (this.props.jurisdictionKey === "social") {
            this.UIManagerRef("good_Luck_Text") && (this.UIManagerRef("good_Luck_Text").visible = true);
        }
        !this.props.inFreeGame && this.updateWin(this.props, 0);
        this.props.inFreeGame && this.updateWin(this.props, this.props.totalWinAmountInFreeGame - this.props.totalWinAmount);
    }

    //when layout changes, this methhod will be called
    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        })
        this.orientationChange();
    }

    orientationChange() {
        this.setMaxTextPosition();
        this.setgraphics();
        if (this.props.jurisdictionKey === "social") {
            if (window.innerWidth > window.innerHeight) {
                this.UIManagerRef("setMaxWinOdd_m") && (this.UIManagerRef("setMaxWinOdd_m").visible = true);
                this.UIManagerRef("setMaxWinOdd_portrait") && (this.UIManagerRef("setMaxWinOdd_portrait").visible = false);

                this.UIManagerRef("setMaxWinOdd_m2") && (this.UIManagerRef("setMaxWinOdd_m2").visible = true);
                this.UIManagerRef("setMaxWinOdd_m2_portrait") && (this.UIManagerRef("setMaxWinOdd_m2_portrait").visible = false);

                this.UIManagerRef("Mobiletext_win_value") && (this.UIManagerRef("Mobiletext_win_value").visible = false);
                this.UIManagerRef("Mobiletext_win_label") && (this.UIManagerRef("Mobiletext_win_label").visible = false);

                this.UIManagerRef("text_Win_label_mobile") && (this.UIManagerRef("text_Win_label_mobile").x = 880) && (this.UIManagerRef("text_Win_label_mobile").y = -95);
                this.UIManagerRef("text_colonSymbol3_mobile") && (this.UIManagerRef("text_colonSymbol3_mobile").x = 885) && (this.UIManagerRef("text_colonSymbol3_mobile").y = -97);
                this.UIManagerRef("text_Win_value_mobile") && (this.UIManagerRef("text_Win_value_mobile").x = 905) && (this.UIManagerRef("text_Win_value_mobile").y = -95);
            } else {
                this.UIManagerRef("setMaxWinOdd_m") && (this.UIManagerRef("setMaxWinOdd_m").visible = false);
                this.UIManagerRef("setMaxWinOdd_portrait") && (this.UIManagerRef("setMaxWinOdd_portrait").visible = true);

                this.UIManagerRef("setMaxWinOdd_m2") && (this.UIManagerRef("setMaxWinOdd_m2").visible = false);
                this.UIManagerRef("setMaxWinOdd_m2_portrait") && (this.UIManagerRef("setMaxWinOdd_m2_portrait").visible = true);

                this.UIManagerRef("Mobiletext_win_value") && (this.UIManagerRef("Mobiletext_win_value").visible = false);
                this.UIManagerRef("Mobiletext_win_label") && (this.UIManagerRef("Mobiletext_win_label").visible = false);


                this.UIManagerRef("text_Win_label_mobile") && (this.UIManagerRef("text_Win_label_mobile").x = 720) && (this.UIManagerRef("text_Win_label_mobile").y = 585);
                this.UIManagerRef("text_colonSymbol3_mobile") && (this.UIManagerRef("text_colonSymbol3_mobile").x = 725) && (this.UIManagerRef("text_colonSymbol3_mobile").y = 583);
                this.UIManagerRef("text_Win_value_mobile") && (this.UIManagerRef("text_Win_value_mobile").x = 735) && (this.UIManagerRef("text_Win_value_mobile").y = 585);
            }
            if (this.props.inFreeGame) {
                if (window.innerHeight > window.innerWidth) {
                    this.UIManagerRef("text_Win_label_mobile") && (this.UIManagerRef("text_Win_label_mobile").x = 750) && (this.UIManagerRef("text_Win_label_mobile").y = 750);
                    this.UIManagerRef("text_colonSymbol3_mobile") && (this.UIManagerRef("text_colonSymbol3_mobile").x = 755) && (this.UIManagerRef("text_colonSymbol3_mobile").y = 748);
                    this.UIManagerRef("text_Win_value_mobile") && (this.UIManagerRef("text_Win_value_mobile").x = 765) && (this.UIManagerRef("text_Win_value_mobile").y = 750);
                }
                else {
                    this.UIManagerRef("text_Win_label_mobile") && (this.UIManagerRef("text_Win_label_mobile").x = 100) && (this.UIManagerRef("text_Win_label_mobile").y = 29);
                    this.UIManagerRef("text_colonSymbol3_mobile") && (this.UIManagerRef("text_colonSymbol3_mobile").x = 955) && (this.UIManagerRef("text_colonSymbol3_mobile").y = 27);
                    this.UIManagerRef("text_Win_value_mobile") && (this.UIManagerRef("text_Win_value_mobile").x = 975) && (this.UIManagerRef("text_Win_value_mobile").y = 29);
                }
            }
        }
        else {
            if (window.innerWidth > window.innerHeight) {
                if (isMobile) {
                    //   BET Text in landscape
                    this.UIManagerRef("text_bet_label") &&
                      (this.UIManagerRef("text_bet_label").x = 1388) &&
                      (this.UIManagerRef("text_bet_label").y = -40);
                    //   BET Value in landscape
                    this.UIManagerRef("text_bet_value") &&
                      (this.UIManagerRef("text_bet_value").x = 1566) &&
                      (this.UIManagerRef("text_bet_value").y = -40);
                    // WIN TEXT in landscape
                    this.UIManagerRef("text_Win_label_mobile") &&
                        (this.UIManagerRef("text_Win_label_mobile").x = 950) &&
                        (this.UIManagerRef("text_Win_label_mobile").y = -40);
                    // WIN Value in landscape
                    this.UIManagerRef("text_Win_value_mobile") &&
                        (this.UIManagerRef("text_Win_value_mobile").x = 1010) &&
                        (this.UIManagerRef("text_Win_value_mobile").y = -40);
                    // CREDIT TEXT in landscape
                    this.UIManagerRef("text_Balance_label") &&
                        (this.UIManagerRef("text_Balance_label").x = 340) &&
                        (this.UIManagerRef("text_Balance_label").y = -40);
                    // CREDIT Value in landscape
                    this.UIManagerRef("text_Balance_value_withSign") &&
                        (this.UIManagerRef("text_Balance_value_withSign").x = 357) &&
                        (this.UIManagerRef("text_Balance_value_withSign").y = -40);
                    //NOTE - Win Text in basegame in landscape
                    this.UIManagerRef("text_Win_label_mobile") && (this.UIManagerRef("text_Win_label_mobile").x = 923.5) && (this.UIManagerRef("text_Win_label_mobile").y = -39.5);
                    //NOTE - Win Value in basegame in landscape
                    this.UIManagerRef("text_Win_value_mobile") && (this.UIManagerRef("text_Win_value_mobile").x = 988.5) && (this.UIManagerRef("text_Win_value_mobile").y = -40);
                }
                this.UIManagerRef("setMaxWinOdd_m") && (this.UIManagerRef("setMaxWinOdd_m").visible = true);
                this.UIManagerRef("setMaxWinOdd_portrait") && (this.UIManagerRef("setMaxWinOdd_portrait").visible = false);

                this.UIManagerRef("setMaxWinOdd_m2") && (this.UIManagerRef("setMaxWinOdd_m2").visible = true);
                this.UIManagerRef("setMaxWinOdd_m2_portrait") && (this.UIManagerRef("setMaxWinOdd_m2_portrait").visible = false);

                this.UIManagerRef("text_colonSymbol3_mobile") && (this.UIManagerRef("text_colonSymbol3_mobile").x = 955) && (this.UIManagerRef("text_colonSymbol3_mobile").y = 27);
            } else {
                if (isMobile) {
                    // WIN TEXT in portrait
                    this.UIManagerRef("text_Win_label_mobile") &&
                        (this.UIManagerRef("text_Win_label_mobile").x = 804.5) &&
                        (this.UIManagerRef("text_Win_label_mobile").y = 739);
                    // BET Text in portrait
                    this.UIManagerRef("text_bet_label") &&
                        (this.UIManagerRef("text_bet_label").x = 1070.3) &&
                        (this.UIManagerRef("text_bet_label").y = 744.5);
                    // BET Value in portrait
                    this.UIManagerRef("text_bet_value") &&
                        (this.UIManagerRef("text_bet_value").x = 1070.1) &&
                        (this.UIManagerRef("text_bet_value").y = 790);
                    // CREDIT TEXT in portrait
                    this.UIManagerRef("text_Balance_label") &&
                        (this.UIManagerRef("text_Balance_label").x = 509.5) &&
                        (this.UIManagerRef("text_Balance_label").y = 743);
                    // CREDIT Value in portrait
                    this.UIManagerRef("text_Balance_value_withSign") &&
                        (this.UIManagerRef("text_Balance_value_withSign").x = 387.5) &&
                        (this.UIManagerRef("text_Balance_value_withSign").y = 788.5);
                    //NOTE - Win Text in basegame in portrait
                    this.UIManagerRef("text_Win_label_mobile") && (this.UIManagerRef("text_Win_label_mobile").x = 805.1) && (this.UIManagerRef("text_Win_label_mobile").y = 736.6);
                    //NOTE - Win Value in basegame in portrait
                    this.UIManagerRef("text_Win_value_mobile") && (this.UIManagerRef("text_Win_value_mobile").x = 770.1) && (this.UIManagerRef("text_Win_value_mobile").y = 788.2);
                }
                this.UIManagerRef("setMaxWinOdd_m") && (this.UIManagerRef("setMaxWinOdd_m").visible = false);
                this.UIManagerRef("setMaxWinOdd_portrait") && (this.UIManagerRef("setMaxWinOdd_portrait").visible = true);

                this.UIManagerRef("setMaxWinOdd_m2") && (this.UIManagerRef("setMaxWinOdd_m2").visible = false);
                this.UIManagerRef("setMaxWinOdd_m2_portrait") && (this.UIManagerRef("setMaxWinOdd_m2_portrait").visible = true);
                this.UIManagerRef("text_colonSymbol3_mobile") && (this.UIManagerRef("text_colonSymbol3_mobile").x = 823) && (this.UIManagerRef("text_colonSymbol3_mobile").y = 698);
            }
            if (this.props.inFreeGame) {

                if (window.innerHeight > window.innerWidth) {
                    this.UIManagerRef("text_Win_label_mobile") && (this.UIManagerRef("text_Win_label_mobile").x = 818) && (this.UIManagerRef("text_Win_label_mobile").y = 740.5);
                    this.UIManagerRef("text_colonSymbol3_mobile") && (this.UIManagerRef("text_colonSymbol3_mobile").x = 823) && (this.UIManagerRef("text_colonSymbol3_mobile").y = 848);
                    this.UIManagerRef("text_Win_value_mobile") && (this.UIManagerRef("text_Win_value_mobile").x = 785) && (this.UIManagerRef("text_Win_value_mobile").y = 783);
                }
                else {

                    this.UIManagerRef("text_Win_label_mobile") && (this.UIManagerRef("text_Win_label_mobile").x = 900) && (this.UIManagerRef("text_Win_label_mobile").y = -38);
                    this.UIManagerRef("text_colonSymbol3_mobile") && (this.UIManagerRef("text_colonSymbol3_mobile").x = 955) && (this.UIManagerRef("text_colonSymbol3_mobile").y = 27);
                    this.UIManagerRef("text_Win_value_mobile") && (this.UIManagerRef("text_Win_value_mobile").x = 975) && (this.UIManagerRef("text_Win_value_mobile").y = -38);
                }
            }
        }
    }

    updateValues(nextProps: any) {
        // console.log("balance updated == >")
        // let balanceValueInCurrency1 = CURRENCY.CurrencyManager.formatCurrencyString(constant.configGame.balance, true, true, true, true);
        //this.UIManagerRef("text_Balance_value_withSign") && (this.UIManagerSetText("text_Balance_value_withSign", balanceValueInCurrency1));
        //let balanceValueInCurrency = CURRENCY.CurrencyManager.formatCurrencyString((this.props.previousBalance - this.props.betList[this.props.currentBetIndex]) / this.constantT1, true, true, true, true);
    }
    updateWinText(winAmountInCurrency: any, colorCode: string, isOnlyColor: boolean = false) {
        !isOnlyColor && this.UIManagerRef("text_Win_value_" + this.ui_mode) && (this.UIManagerSetText("text_Win_value_" + this.ui_mode, winAmountInCurrency));
        this.UIManagerRef("text_Win_value_" + this.ui_mode) && (this.UIManagerRef("text_Win_value_" + this.ui_mode).style.fill = [colorCode]);
    }
    updateWin(nextProps: any, defaultVal: number) {
        let winAmountInCurrency: any;
        let dur: number = 0.4;
        this.UIManagerRef("text_Win_label_" + this.ui_mode).visible = false;
        if (defaultVal) {
            winAmountInCurrency = CURRENCY.CurrencyManager.formatCurrencyString(defaultVal, true, true, true, true);
            this.UIManagerRef("text_Win_label_" + this.ui_mode).visible = this.props.inFreeGame ? true : false;
            dur = 0.1;
        }
        //!SECTION
        if (defaultVal > 0 && !this.props.inFreeGame) {
            return new Promise<void>(resolve => {
                GSAPTimer.getInstance().addTimer(dur, () => {
                    this.UIManagerRef("text_Win_label_" + this.ui_mode).visible = true;
                    this.updateWinText(winAmountInCurrency, "#e2be20");
                    const tweenProps: ItweenProps = {
                        duration: 0.1,
                        ease: "none",
                        onComplete: () => {
                            GSAPTween.getInstance().killTween(this.UIManagerRef("text_Win_value_" + this.ui_mode));
                            if (nextProps.basegamestate && (!this.props.inFreeGame || this.props.freegameSpinCountRemaining === 0)) {
                                this.setBalance(nextProps)//B
                                GSAPTimer.getInstance().addTimer(0.210, () => {
                                    this.updateWinText(winAmountInCurrency, "#ffffff", true);
                                });
                            }
                            // Free Spin Active
                            //   nextProps.inFreeGame && this.props.setFreeSpinPopUpActive(true);
                            resolve();
                        }
                    }
                    GSAPTween.getInstance().gsapTween(this.UIManagerRef("text_Win_value_" + this.ui_mode), tweenProps);
                });
            });
        }
        else if (this.props.inFreeGame) {
            this.UIManagerRef("text_Win_label_" + this.ui_mode).visible = true;
            this.updateWinText(winAmountInCurrency, "#e2be20");


        } else if (!nextProps.inFreeGame) {
            return new Promise<void>(resolve => {
                this.updateWinText(winAmountInCurrency, "#ffffff");

                resolve();
            });
        }
        //ANCHOR - 
    }

    setFormatForText(nextProps: any, betvalue: number) {
        let toString = (betvalue);
        if (toString > 0) {
            this.UIManagerRef("text_bet_value") && (this.UIManagerRef("text_bet_value").text = CURRENCY.CurrencyManager.formatCurrencyString(toString, true, true, true, true));
            let bet = CURRENCY.CurrencyManager.formatCurrencyString(toString, true, true, true, true);
            this.UIManagerRef("text_bet_value") && this.UIManagerSetText("text_bet_value", bet);
        }
    }

    setBet(nextProps: any, betvalue: number) {
        let value = betvalue;
        if (value > 0) {
            this.UIManagerRef("text_bet_value") && (this.UIManagerRef("text_bet_value").text = betvalue);
            this.UIManagerRef("text_bet_value") && (this.UIManagerRef("text_bet_value").text = CURRENCY.CurrencyManager.formatCurrencyString(value, true, true, true, true));
            this.setFormatForText(nextProps, betvalue);
        }
    }
    private setBalanceBeforeSpin(nextProps: any): void {
        if (!nextProps.inFreeGame) {
            constant.configGame.balance = (constant.configGame.balance - constant.configGame.currentBet)
            this.props.setApplicationBalance(constant.configGame.balance);
            this.setBalance(nextProps)
        }

    }
    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.spinStart !== this.props.spinStart || nextProps.allSpinComplete !== this.props.allSpinComplete || nextProps.layoutMode !== this.props.layoutMode
            || nextProps.allButtonEnable !== this.props.allButtonEnable || nextProps.currentBetIndex != this.props.currentBetIndex || nextProps.winAmount != this.props.winAmount
            || nextProps.winAmountEmpty != this.props.winAmountEmpty
            || nextProps.basegamestate != this.props.basegamestate
            || nextProps.increaseBetResult !== this.props.increaseBetResult
            || nextProps.isLastWinSame != this.props.isLastWinSame
            || nextProps.updateBalanceAfterSpin != this.props.updateBalanceAfterSpin
            || nextProps.selectedCoin !== this.props.selectedCoin
            || nextProps.cspStart !== this.props.cspStart
            || nextProps.updateWin !== this.props.updateWin
        ) {

            if (nextProps.selectedCoin !== -1 && nextProps.selectedCoin !== this.props.selectedCoin) {

                const betValues: Number[] = constant.configGame.betValues;
                const currentBet: Number = betValues[nextProps.selectedCoin];
                constant.configGame.currentBet = Number(currentBet);
                let balanceValueInCurrency = CURRENCY.CurrencyManager.formatCurrencyString(Number(currentBet), true, true, true, true);
                this.setBetNormally(balanceValueInCurrency);
            }
            if (nextProps.cspStart && nextProps.cspStart !== this.props.cspStart) {
                !this.props.inFreeGame && this.updateWin(nextProps, 0);
                this.setBalanceBeforeSpin(nextProps);
                this.winValueStore = 0;
                !nextProps.inFreeGame && this.updateValues(nextProps);

            }
            if (nextProps.updateWin && nextProps.updateWin !== this.props.updateWin) {
                this.updateWin(nextProps, this.props.inFreeGame ? this.props.totalWinAmountInFreeGame : this.props.totalCreditWinAmount);
            }
            if (nextProps.basegamestate && nextProps.basegamestate !== this.props.basegamestate && !this.props.inFreeGame) {
                this.updateWin(nextProps, this.props.totalWinAmountInFreeGame);
            }
            if (nextProps.allSpinComplete && nextProps.allSpinComplete !== this.props.allSpinComplete) {
                nextProps.winAmoun === 0 && (this.winValueStore = 0);
            }


            if (nextProps.winAmountEmpty) {
                this.props.setWinAmount(false);
            }
            if (nextProps.winAmount !== this.props.winAmount) {
                this.winValueStore = nextProps.winAmount + this.winValueStore;
            }
            if (nextProps.isLastWinSame !== this.props.isLastWinSame && nextProps.isLastWinSame) {
                this.winValueStore = nextProps.winAmount + this.winValueStore;
            }
            if (nextProps.increaseBetResult !== undefined && nextProps.increaseBetResult !== this.props.increaseBetResult && !isMobile) {
                this.setBet(nextProps, nextProps.increaseBetResult.stake);
                return false;
            }

            if (nextProps.layoutMode !== this.props.layoutMode) {
                this.layoutChange(nextProps.layoutMode);
                this.setGameRtp();
                this.setMaxWinOdd();

            }
            if (nextProps.basegamestate !== this.props.basegamestate) {
                if (nextProps.basegamestate) {
                    if ((nextProps.totalCreditWinAmount / 100) >= this.winCelebrationMinimumValue * this.props.betList[this.props.currentBetIndex] / 100) {
                    }
                }
            }
            return false;
        }
        return false;
    }


    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        this.bindUI();
        this.orientationChange();
    }

    render() {
        return (
            <UIManager id={"gofPlayerMessageContainer"} type={"Container"} ref={i => this.gofPlayerMessageContainer = i}
                app={this.app}>
                <UIManager id={"playerMessage"} type={"Container"} name={"playerMessage"} app={this.app}>
                    {
                        this.displayUI && this.displayUI.map((i: any) =>
                            <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                                id={i.id} {...i} app={this.app} />
                        )
                    }
                </UIManager>
            </UIManager>
        )
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'asyncServerAction' | 'asyncGameLevelSeverState' | 'reelsState' | 'gameactionstate' | 'paytableBMState' | 'basegameState' | 'freegameState' | 'applicationState' | 'reelgridState' | 'betPanelState' | 'buttonPanelState' | 'behaviourState' | 'flowManagerState' | 'revealFeatureState'>, ownProps?: any): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        spinStart: state.reelgridState.spinStart,
        allSpinComplete: state.reelgridState.allSpinComplete,
        betList: state.basegameState.betList,
        currentBetIndex: state.basegameState.currentBetIndex,
        selectedCoin: state.betPanelState.selectedCoin,
        coinList: state.betPanelState.coinList,
        winAmount: state.basegameState.winAmount,
        isLastWinSame: state.basegameState.isLastWinSame,
        inFreeGame: state.freegameState.inFreeGame,
        reconstrcutionInFreegame: state.freegameState.reconstrcutionInFreegame,
        balance: state.basegameState.balance,
        basegamestate: state.basegameState.basegamestate,
        transitionBalance: state.behaviourState.transitionBalance,
        previousBalance: state.behaviourState.previousBalance,
        winAmountEmpty: state.behaviourState.winAmountEmpty,
        totalCreditWinAmount: state.behaviourState.totalCreditWinAmount,
        totalWinAmountInFreeGame: state.behaviourState.totalWinAmountInFreeGame,
        showTime: state.applicationState.showTime,
        showRTP: state.applicationState.showRTP,
        storeRtp: state.paytableBMState.storeRtp,
        maxWinOddsCount: state.behaviourState.maxWinOddsCount,
        updateWin: state.behaviourState.updateWin,
        showTopWinOdds: state.applicationState.showTopWinOdds,
        currencyIgnoreDecimals: state.applicationState.currencyIgnoreDecimals,
        languageCode: state.applicationState.languageCode,
        jurisdictionKey: state.applicationState.jurisdictionKey,
        currentVoucherResult: state.gameactionstate.currentVoucherResult,
        currentVoucherSpinResult: state.asyncServerAction.currentVoucherResult,
        increaseBetResult: state.asyncGameLevelSeverState.result,
        allButtonEnable: state.buttonPanelState.allButtonEnable,
        cspStart: state.reelsState.cspStart,
        freegameSpinCountRemaining: state.freegameState.freegameSpinCountRemaining,
        totalWinAmount: state.behaviourState.totalWinAmount,
        callFlowManager: state.flowManagerState.callFlowManager,
        freeSpinAdd: state.revealFeatureState.freeSpinAdd,

    }),
    (dispatch: Dispatch, ownProps): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        setWinAmount: (winAmountEmpty: boolean): any => dispatch(behaviourAction.setWinAmount(winAmountEmpty)),
        setApplicationBalance: (balance: number): any => dispatch(baseGameAction.setApplicationBalance(balance)),
        setFreeSpinPopUpActive: (freeSpinPopUpActive: boolean): any => dispatch(featureAction.setFreeSpinPopUpActive(freeSpinPopUpActive)),
    }))(withPlayerMessageConfiguration(GofPlayerMessage)));
