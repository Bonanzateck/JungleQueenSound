import React, { Component, Ref } from "react";
import { UIManager } from "@bonanzainteractive/core";

import { isMobile } from "react-device-detect";
import { Texture } from "pixi.js";

import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";

import { GSAPTimer } from "@bonanzainteractive/core";

//this method will call when autoplay has false,this will enable all buttons and un hide autoplay button
interface IProps {
    [x: string]: any;
}
interface IState {
    [x: string]: any;
}
class ButtonPanelGenericUISuper extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected buttonPanelGenericUIContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: Object[] = [];
    protected button_name_1: string;
    protected button_name_2: string;
    protected button_name_3: string;
    protected button_name_4: string;
    protected button_name_5: string;
    protected button_name_6: string;
    protected button_name_7: string;
    protected button_name_8: string;
    // protected button_name_9: string;
    protected button_name_10: string;
    protected button_name_11: string;
    protected button_name_12: string;
    protected button_name_13: string;
    protected button_name_14: string;
     protected button_name_15: string;
    protected button_name_16: string;
    protected button_name_17: string;
    protected button_name_18: string;
    protected button_name_19: string;
    protected button_name_20: string;

    protected balanceValueObject: any;
    protected autoplayStopButtonX: number = 290;
    protected autoplayStopButtonY: number = 1420;
    protected autoplayCounterX: number = 790;
    protected autoplayCounterY: number = 1420;
    protected textScaling: number = 0.9;
    protected autoPlayButtonName: string = "";
    protected storeCurrentBet: number = 0;
    protected AllTimer: any[] = [];
    protected countReRender: number = 0;
    protected shouldReRenderForce: boolean = false;
    protected reRender: boolean = true;
    protected autoPlayStart: boolean = false;
    protected previousBtnName: string = 'BonazzaBtn0009';
    protected UIManagerRef: any = UIManager.getRef;
    protected isButtonClicked: boolean = false;
    protected button_autoPlayHide: boolean = false;
    protected startSpinByMaxClicked: boolean = false;
    protected isTimeGoingOn: boolean = false;
    protected forBetChangeUpdate: boolean = false;
    protected maxBetSet: boolean = false;
    protected inVoucher: boolean = false;


    protected betresult: any;

    protected timesArr: any[] = [];

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.button_name_1 = "btn_spin";
        this.button_name_2 = "btn_paytable";
        this.button_name_3 = "btn_bet_increase";
        this.button_name_4 = "btn_bet_decrease";
        this.button_name_5 = "btn_sound";
        this.button_name_6 = "btn_gameRule";
        this.button_name_7 = "btn_autoplay_stop";
        this.button_name_8 = "btn_autoplay";
        // this.button_name_9 = "btn_home";
        this.button_name_10 = "btn_maxbet";
        this.button_name_11 = "btn_setting";
        this.button_name_12 = "btn_autoplay2";
        this.button_name_13 = "btn_soundOff";
        this.button_name_14 = "btn_responsibleGammingIcon";
     this.button_name_15 = "btn_spinStop";
        this.button_name_16 = "btn_sounddisable";
        this.button_name_17 = "btn_minbet";
        this.button_name_18 = "btn_stake";
        this.button_name_19 = "btn_menu";
        this.button_name_20 = "btn_menu_close";
        this.buttonPanelGenericUIContainer = {};
        this.state = {
            [this.button_name_1]: { enable: false },
            [this.button_name_2]: { enable: false },
            [this.button_name_3]: { enable: false },
            [this.button_name_4]: { enable: false },
            [this.button_name_5]: { enable: false },
            [this.button_name_6]: { enable: false },
            [this.button_name_7]: { enable: false },
            [this.button_name_8]: { enable: false },
            // [this.button_name_9]: { enable: false },
            [this.button_name_10]: { enable: false },
            [this.button_name_11]: { enable: false },
            [this.button_name_12]: { enable: false },
            [this.button_name_13]: { enable: false },
            [this.button_name_14]: { enable: false },
            // [this.button_name_15]: { enable: false },
            [this.button_name_16]: { enable: false },
            [this.button_name_17]: { enable: false },
            [this.button_name_18]: { enable: false },
            [this.button_name_19]: { enable: false },
            [this.button_name_20]: { enable: false },
            firstLoad: 1
        }
        if (isMobile) {
            this.ui_mode = "mobile";
            this.autoPlayButtonName = "btn_autoplay2";

        } else {
            this.ui_mode = "desktop";
            this.autoPlayButtonName = "btn_autoplay";
        }

        this.displayUI = this.props.child.filter(this.checkUiMode.bind(this));
        this.setVisibilityOfButtonAccordingToBackend();
        this.countReRender = 0;
        this.timesArr = [];
        this.isTimeGoingOn = false;

    }

    protected intrectionOff(flg: boolean = false): void {

        this.UIManagerRef(this.button_name_1) && (this.UIManagerRef(this.button_name_1).interactive = flg);
        this.UIManagerRef(this.button_name_2) && (this.UIManagerRef(this.button_name_2).interactive = flg)
        this.UIManagerRef(this.button_name_3) && (this.UIManagerRef(this.button_name_3).interactive = flg);
        this.UIManagerRef(this.button_name_4) && (this.UIManagerRef(this.button_name_4).interactive = flg);

        this.UIManagerRef(this.button_name_5) && (this.UIManagerRef(this.button_name_5).interactive = flg);
        this.UIManagerRef(this.button_name_6) && (this.UIManagerRef(this.button_name_6).interactive = flg);
        this.UIManagerRef(this.button_name_7) && (this.UIManagerRef(this.button_name_7).interactive = flg);
        this.UIManagerRef(this.button_name_8) && (this.UIManagerRef(this.button_name_8).interactive = flg);

        // this.UIManagerRef(this.button_name_9) && (this.UIManagerRef(this.button_name_9).interactive = flg);
        this.UIManagerRef(this.button_name_10) && (this.UIManagerRef(this.button_name_10).interactive = flg);
        this.UIManagerRef(this.button_name_11) && (this.UIManagerRef(this.button_name_11).interactive = flg);
        this.UIManagerRef(this.button_name_12) && (this.UIManagerRef(this.button_name_12).interactive = flg);

        this.UIManagerRef(this.button_name_13) && (this.UIManagerRef(this.button_name_13).interactive = flg);
        this.UIManagerRef(this.button_name_14) && (this.UIManagerRef(this.button_name_14).interactive = flg);
        // this.UIManagerRef(this.button_name_15) && (this.UIManagerRef(this.button_name_15).interactive = flg);
        this.UIManagerRef(this.button_name_16) && (this.UIManagerRef(this.button_name_16).interactive = flg);
        this.UIManagerRef(this.button_name_17) && (this.UIManagerRef(this.button_name_17).interactive = flg);
        this.UIManagerRef(this.button_name_18) && (this.UIManagerRef(this.button_name_18).interactive = flg);
        this.UIManagerRef(this.button_name_19) && (this.UIManagerRef(this.button_name_19).interactive = flg);
        this.UIManagerRef(this.button_name_20) && (this.UIManagerRef(this.button_name_20).interactive = flg);
        this.UIManagerRef('btn_introBanner_desktop') && (this.UIManagerRef('btn_introBanner_desktop').interactive = flg);
        this.UIManagerRef('btn_introBanner_mobile') && (this.UIManagerRef('btn_introBanner_mobile').interactive = flg);
    }
    
    //this method is setting visibility of button from coming backend
    setVisibilityOfButtonAccordingToBackend() {
        this.displayUI.map((data: any) => {
            if (data.name === this.button_name_1) {
                data.visible = this.props.spinBtnVisibility;
            }
            if (data.name === this.button_name_2) {
                data.visible = this.props.paytableBtnVisibility;
            }
            if (data.name === this.button_name_3) {
                data.visible = this.props.increaseBetBtnVisibility;
            }
            if (data.name === this.button_name_4) {
                data.visible = this.props.decreaseBetBtnVisibility;
            }
            if (data.name === this.button_name_10) {
                data.visible = this.props.maxBetBtnVisibility;
            }
            // if (data.name === this.button_name_17) {
            //     data.visible = true;
            // }
            if (data.name === "btn_autoplay") {
                data.visible = true;
            }
            if (data.name === "btn_autoplay_stop") {
                data.visible = false;
            }
            if (isMobile) {
                if (data.name === "btn_autoplay_stop") {
                    data.visible = false;
                }
            }
        });

    }
    //this method will show autoplay
    onAutoplayShow() {
        this.props.showAutoplay();
        this.props.setAllButtonDisable();
    }
    //this method helps to set the property true for showing paytable
    onPaytable() {
        this.props.showPaytable();
    }
    //this method will handle sounds on button's visibility accordingly
    soundOnButtonFunctionality() {
        if (this.props.soundIsPlaying && this.props.soundOnOff) {
            this.props.soundLoadStartFunction(true);
            this.props.playingSound(false);
            this.props.stopAllBGMSound(true);
            this.props.stopAllSFXSound(true);
        }
    }
    //this method will handle mute button's visibility accordingly
    soundOffButtonFunctionality() {
        if (this.props.soundIsPlaying && this.props.soundOnOff) {
            this.props.soundLoadStartFunction(true);
            this.props.playingSound(false);
            this.props.stopAllBGMSound(true);
            this.props.stopAllSFXSound(true);
        } else {
            this.props.stopAllBGMSound(false);
            this.props.stopAllSFXSound(false);
            this.props.playingSound(true);
        }
    }
    openUrl(path: string) {
        (window as any).top.location.href = path;
    }
    
    //when layout changes, this method will be called
    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name)
            }
        });
        this.orientation();

        if (isMobile) {
            if (window.innerWidth < window.innerHeight) {
                this.UIManagerRef("btn_autoplay_stop").x = this.autoplayStopButtonX;
                this.UIManagerRef("btn_autoplay_stop").y = this.autoplayStopButtonY;
                this.UIManagerRef("Text_COUNT_AP").x = this.autoplayCounterX;
                this.UIManagerRef("Text_COUNT_AP").y = this.autoplayCounterY;
                // this.UIManagerRef("auto_play_text_Image") && (this.UIManagerRef("auto_play_text_Image").x = 738.5);
                // this.UIManagerRef("auto_play_text_Image") && (this.UIManagerRef("auto_play_text_Image").y = 1641.5);
                this.UIManagerRef("auto_play_Stop_Image_text") && (this.UIManagerRef("auto_play_Stop_Image_text").x = 290);
                this.UIManagerRef("auto_play_Stop_Image_text") && (this.UIManagerRef("auto_play_Stop_Image_text").y = 1420);
            }
        }
    }


    helptextDisplayFunctionality() {
        if (!this.props.showHelpText) {
            this.props.setApplicationShowHelpText(true);
            this.props.setAllButtonDisable();
             this.UIManagerRef("btn_spinStop").visible = false;
        }
    }

    //this panel will hit the property by which setting panel will display or hide
    settingPanelDisplayFunctionality() {
        if (this.props.showSettingPanelUI) {
            this.props.showDesktopSettingPanelUI(false);
            this.props.setAllButtonEnable();
        } else {
            this.props.showDesktopSettingPanelUI(true);
            this.props.setAllButtonDisable();
        }
    }
    textEnableVisibility() {
        this.displayUI.map((data: any) => {
            if (data.name === "text_maxBet_label1" || data.name === "text_maxBet_label2" || data.name === "text_AUTOPLAY_label1" || data.name === "text_AUTOPLAY_label2") {
                data.visible = true;
            }
            if (data.name === "text_maxBet_label1_grey" || data.name === "text_maxBet_label2_grey" || data.name === "text_AUTOPLAY_label1_grey") {
                data.visible = false;
            }
        });
    }
    setButtontextPostion() {
        if (this.props.languageCode === 'sr' ||
            this.props.languageCode === 'hr' ||
            this.props.languageCode === 'ru' ||
            this.props.languageCode === 'it' ||
            this.props.languageCode === 'es' ||
            this.props.languageCode === 'bg' ||
            this.props.languageCode === 'ro' ||
            this.props.languageCode === 'fr') {
            this.UIManagerRef("text_coin_value_LABEL") && (this.UIManagerRef("text_coin_value_LABEL").y = 900);
        }
    }

    //for Button palnel text
    setPalyerMsgTextPostion() {
        if (this.props.jurisdictionKey !== "social") {
            switch (this.props.languageCode) {
                case 'pl':
                case 'nb':
                case 'ru':
                case 'hr':
                case 'hu':
                    this.UIManagerRef("text_balance_label") && (this.UIManagerRef("text_balance_label").y = 900);
                    break;
                default:
                    this.UIManagerRef("text_balance_label") && (this.UIManagerRef("text_balance_label").y = 910);
            }
        }
    }

    setButtonsAccordingToVoucher() {
        this.UIManagerRef(this.button_name_3 + "Voucher") && (this.UIManagerRef(this.button_name_3 + "Voucher").visible = false);
        this.UIManagerRef(this.button_name_4 + "Voucher") && (this.UIManagerRef(this.button_name_4 + "Voucher").visible = false);
        this.UIManagerRef(this.button_name_10 + "Voucher") && (this.UIManagerRef(this.button_name_10 + "Voucher").visible = false);
    }

    //NOTE - 2 voucher Result  
    voucherResult() {
        if (!this.props.voucherIsRunning && !isMobile) {
            // if ((Object.keys(this.props.currentVoucherSpinResult).length === 0 || this.props.currentVoucherSpinResult === undefined || this.props.currentVoucherSpinResult.count - this.props.currentVoucherSpinResult.used == 0) && !isMobile) {
            this.setButtonsAccordingToVoucher();
        } else if (this.props.currentVoucherSpinResult && !isMobile) {
            this.UIManagerRef("text_maxBet_label1_grey") && (this.UIManagerRef("text_maxBet_label1_grey").visible = true);
            this.UIManagerRef("text_maxBet_label2_grey") && (this.UIManagerRef("text_maxBet_label2_grey").visible = true);
            this.UIManagerRef("text_maxBet_label1") && (this.UIManagerRef("text_maxBet_label1").visible = false);
            this.UIManagerRef("text_maxBet_label2") && (this.UIManagerRef("text_maxBet_label2").visible = false);
        }
    }

    //NOTE - checking for sound is playing or not 
    checkForSound() {
        if (!isMobile) {
            if (this.props.soundIsPlaying) {
                this.UIManagerRef(this.button_name_5).visible = true;
                this.UIManagerRef(this.button_name_13).visible = false;
            } else {
                this.UIManagerRef(this.button_name_5).visible = false;
                this.UIManagerRef(this.button_name_13).visible = true;
            }
        }
    }



    autoPlayText() {
        // this.UIManagerRef("text_AUTOPLAY_label1_grey").visible = false;
        // this.UIManagerRef("text_AUTOPLAY_label1").visible = false;
        if (isMobile) {
            this.UIManagerRef("btn_autoplay").texture = Texture.from("mobilehamburger_disable.png");
        } else {
            this.UIManagerRef("btn_autoplay").texture = Texture.from("autoplay_disable.png");
        }
    }
    setResponsibleGammingIcon() {
        GSAPTimer.getInstance().addTimer(100 / 1000, () => {
            !this.props.showResponsibleGamingIcon && (this.UIManagerRef("btn_responsibleGammingIcon").visible = false);
            this.props.showResponsibleGamingIcon && (this.UIManagerRef("btn_responsibleGammingIcon").visible = true);
            this.props.responsibleGamingIconPath && this.props.showResponsibleGamingIcon && (this.UIManagerRef("btn_responsibleGammingIcon").texture = Texture.from(this.props.responsibleGamingIconPath));
        });
    }

    setSettingButtonVisibility() {
        if (!isMobile) {
            if (this.props.showSettingsControl) {
                this.UIManagerRef("btn_setting").visible = true;
            } else {
                this.UIManagerRef("btn_setting").visible = false;
            }
        }
    }
    setHelpButtonVisibility() {
        if (!isMobile) {
            if (this.props.showHelpButton) {
                this.UIManagerRef("btn_gameRule").visible = false;
            } else {
                this.UIManagerRef("btn_gameRule").visible = false;
            }
        }
    }
    orientation() {
        if (window.innerHeight < window.innerWidth) {
            if (this.props.jurisdictionKey === "social") {
                this.UIManagerRef(this.button_name_12) && (this.UIManagerRef(this.button_name_12).x = 1612) && (this.UIManagerRef(this.button_name_12).y = 252);
                this.UIManagerRef("text_bet_label_button_mobile") && (this.UIManagerRef("text_bet_label_button_mobile").visible = false);
                this.UIManagerRef("text_bet_value1_mobile") && (this.UIManagerRef("text_bet_value1_mobile").visible = false);
            }
            else {
                this.UIManagerRef(this.button_name_12) && (this.UIManagerRef(this.button_name_12).x = 1612) && (this.UIManagerRef(this.button_name_12).y = 252);
                this.UIManagerRef("text_bet_label_button_mobile") && (this.UIManagerRef("text_bet_label_button_mobile").x = 1495) && (this.UIManagerRef("text_bet_label_button_mobile").y = 938);
                this.UIManagerRef("text_bet_value1_mobile") && (this.UIManagerRef("text_bet_value1_mobile").x = 1520) && (this.UIManagerRef("text_bet_value1_mobile").y = 938);
            }
        } else if (window.innerWidth < window.innerHeight) {
            if (this.props.jurisdictionKey === "social") {
                this.UIManagerRef(this.button_name_12) && (this.UIManagerRef(this.button_name_12).x = 404) && (this.UIManagerRef(this.button_name_12).y = 1180);
                this.UIManagerRef("text_bet_label_button_mobile") && (this.UIManagerRef("text_bet_label_button_mobile").visible = false);
                this.UIManagerRef("text_bet_value1_mobile") && (this.UIManagerRef("text_bet_value1_mobile").visible = false);
            }
            else {
                this.UIManagerRef(this.button_name_12) && (this.UIManagerRef(this.button_name_12).x = 404) && (this.UIManagerRef(this.button_name_12).y = 1180);
                this.UIManagerRef("text_bet_label_button_mobile") && (this.UIManagerRef("text_bet_label_button_mobile").x = 960) && (this.UIManagerRef("text_bet_label_button_mobile").y = 1633);
                this.UIManagerRef("text_bet_value1_mobile") && (this.UIManagerRef("text_bet_value1_mobile").x = 975) && (this.UIManagerRef("text_bet_value1_mobile").y = 1633);

            }
        }
    }

    //this method will enable the buttons which is passed as a argument, if nothing is passed then all buttons will be enable
    enableAllBtn(exceptList: Array<string> = []) {
        //prevent rerender
        this.reRender = true;
        //
        this.delayToEnableAllbutton(exceptList);
    }
    //this method will disable the buttons which is passed as a argument, if nothing is passed then all buttons will be disable
    disableAllBtn(exceptList: Array<string> = []) {
        //prevent rerender
        if (this.autoPlayStart == false)
            this.reRender = true;
        //
        this.props.setAllButtonDisable(exceptList);
        this.displayUI.map((data: any) => {
            let obj = this.state[data.name];

            if (obj) {
                if (exceptList.length > 0 && exceptList.indexOf(data.name) > -1 || (this.props.alwaysEnableButtonNameList.indexOf(data.name) > -1)) {
                    obj.enable = true;
                } else {
                    obj.enable = false;
                }
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        [data.name]: obj
                    }
                });
            }
        });
    }
    protected delayToEnableAllbutton(exceptList: Array<string> = []) {
        if (!this.props.inAutoplay) {
            // this.textEnableVisibility();
        }
        this.props.setAllButtonEnable(exceptList);
        this.displayUI.map((data: any) => {
            let obj = this.state[data.name];
            if (obj) {
                if (exceptList.length > 0 && exceptList.indexOf(data.name) > -1 && (this.props.alwaysEnableButtonNameList.indexOf(data.name) === -1)) {
                    obj.enable = false;
                } else {
                    obj.enable = true;
                }
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        [data.name]: obj
                    }
                });
            }
        });
    }


    setHomeButtonVisibility(homeUrl: string, homeButton: any) {
        let state;
        isMobile ? state = "mobilehome_disable.png" : state = "home_disable.png";
        if (homeUrl === "") {
            (homeButton.texture = Texture.from(state));
            homeButton.buttonMode = false;
            homeButton.interactive = false;
        }
    }

    //this method will initially bind values to text
    bindUI() {

        if (this.props.selectedCoin < this.props.coinList.length && this.props.selectedCoin >= 0 && !Number.isNaN(this.props.coinList[this.props.selectedCoin] / 2000)) {
            this.setTextValue("text_coinValue_value", this.numberWithCommasAndDeciaml(this.props.coinList[this.props.selectedCoin] / 2000));
            this.props.voucherIsRunning ? this.setTextValue("text_coinValue_value", this.numberWithCommasAndDeciaml(this.props.currentVoucherResult.bet / 2000)) : this.setTextValue("text_coinValue_value", this.numberWithCommasAndDeciaml(this.props.coinList[this.props.selectedCoin] / 2000));
        }
        // this.setHomeButtonVisibility(this.props.homeUrl, this.UIManagerRef("btn_home"));
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
    //this method will set the text
    setTextValue(name: string, property: any) {
        this.UIManagerRef(name) && (UIManager.setText(name, property));
    }
    //while first rendering, this method will check the mode first
    checkUiMode(uimodeobj: any) {
        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both"
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }
}



export { ButtonPanelGenericUISuper, isMobile };
