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
    protected button_name_16: string;
    protected button_name_17: string;
    protected button_name_18: string;
    protected button_name_19: string;
    protected button_name_20: string;
    protected button_name_21: string;
    protected button_name_22: string;

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
        this.button_name_16 = "btn_sounddisable";
        this.button_name_17 = "btn_minbet";
        this.button_name_18 = "btn_stake";
        this.button_name_19 = "btn_menu";
        this.button_name_20 = "btn_menu_close";
        this.button_name_21 = "btn_game_exit";
        this.button_name_22 = "btn_history";

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
            [this.button_name_16]: { enable: false },
            [this.button_name_17]: { enable: false },
            [this.button_name_18]: { enable: false },
            [this.button_name_19]: { enable: false },
            [this.button_name_20]: { enable: false },
            [this.button_name_21]: { enable: false },
            [this.button_name_22]: { enable: false },

            firstLoad: 1,
            updateStateObj: {}
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

   

    //this method is setting visibility of button from coming backend
    setVisibilityOfButtonAccordingToBackend() {
        this.displayUI.map((data: any) => {
            if (data.name === this.button_name_2) {
                data.visible = this.props.paytableBtnVisibility;
            }
        });
    }

    //when layout changes, this method will be called
  layoutChange(currentLayout: string) {
    this.displayUI.map((data: any) => {
      if (data.layout === true) {
        this.props.setApplicationLayoutObject(data.name);
      }
    });
  }

    openUrl(path: string) {
        (window as any).top.location.href = path;
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

    // coinValue() {

    //         this.setTextValue("text_coinValue_value", (this.props.coinList[this.props.selectedCoin] / 2000));

    // }

    //this method will set the text
    setTextValue(name: string, property: any) {
        this.UIManagerRef(name) && (UIManager.setText(name, property));
    }

    setButtonsAccordingToVoucher() {
        this.UIManagerRef(this.button_name_3 + "Voucher") && (this.UIManagerRef(this.button_name_3 + "Voucher").visible = false);
        this.UIManagerRef(this.button_name_4 + "Voucher") && (this.UIManagerRef(this.button_name_4 + "Voucher").visible = false);
        this.UIManagerRef(this.button_name_10 + "Voucher") && (this.UIManagerRef(this.button_name_10 + "Voucher").visible = false);
        this.UIManagerRef(this.button_name_17 + "Voucher") && (this.UIManagerRef(this.button_name_17 + "Voucher").visible = false);
    }

    setResponsibleGammingIcon() {
        GSAPTimer.getInstance().addTimer(100 / 1000, () => {
            !this.props.showResponsibleGamingIcon && this.UIManagerRef("btn_responsibleGammingIcon") && (this.UIManagerRef("btn_responsibleGammingIcon").visible = false);
            this.props.showResponsibleGamingIcon && this.UIManagerRef("btn_responsibleGammingIcon") && (this.UIManagerRef("btn_responsibleGammingIcon").visible = true);
            this.props.responsibleGamingIconPath && this.props.showResponsibleGamingIcon && this.UIManagerRef("btn_responsibleGammingIcon") && (this.UIManagerRef("btn_responsibleGammingIcon").texture = Texture.from(this.props.responsibleGamingIconPath));
        });
    }

    // This funtion will hide the highlighted button visibility (menu-butttons)
    highlightedButtonsvisibility(value: boolean) {
        UIManager.getRef("btn_history_highlighted") && (UIManager.getRef("btn_history_highlighted").visible = value);
        UIManager.getRef("btn_game_highlighted") && (UIManager.getRef("btn_game_highlighted").visible = value);
        UIManager.getRef("btn_setting_highlighted") && (UIManager.getRef("btn_setting_highlighted").visible = value);
    }

    // This funtion will controll Visibility of BetPanel
    visibilityBetPanel(value: boolean) {
        // this.UIManagerRef("btn_bet_decrease") && (this.UIManagerRef("btn_bet_decrease").visible = value);
        // this.UIManagerRef("btn_bet_increase") && (this.UIManagerRef("btn_bet_increase").visible = value);

        this.UIManagerRef("btn_maxbet") && (this.UIManagerRef("btn_maxbet").visible = value);
        this.UIManagerRef("btn_minbet") && (this.UIManagerRef("btn_minbet").visible = value);
    }


    orientation() {
        if (window.innerHeight < window.innerWidth) {
            if (this.props.jurisdictionKey === "social") {

                this.UIManagerRef("text_bet_label_button_mobile") && (this.UIManagerRef("text_bet_label_button_mobile").visible = false);
                this.UIManagerRef("text_bet_value1_mobile") && (this.UIManagerRef("text_bet_value1_mobile").visible = false);
            }
            else {
                this.UIManagerRef("text_bet_label_button_mobile") && (this.UIManagerRef("text_bet_label_button_mobile").x = 1495) && (this.UIManagerRef("text_bet_label_button_mobile").y = 938);
                this.UIManagerRef("text_bet_value1_mobile") && (this.UIManagerRef("text_bet_value1_mobile").x = 1520) && (this.UIManagerRef("text_bet_value1_mobile").y = 938);
            }
        } else if (window.innerWidth < window.innerHeight) {
            if (this.props.jurisdictionKey === "social") {
                this.UIManagerRef("text_bet_label_button_mobile") && (this.UIManagerRef("text_bet_label_button_mobile").visible = false);
                this.UIManagerRef("text_bet_value1_mobile") && (this.UIManagerRef("text_bet_value1_mobile").visible = false);
            }
            else {

                this.UIManagerRef("text_bet_label_button_mobile") && (this.UIManagerRef("text_bet_label_button_mobile").x = 960) && (this.UIManagerRef("text_bet_label_button_mobile").y = 1633);
                this.UIManagerRef("text_bet_value1_mobile") && (this.UIManagerRef("text_bet_value1_mobile").x = 975) && (this.UIManagerRef("text_bet_value1_mobile").y = 1633);
            }
        }
    }


    // this function will work on visibilty of menu buttons
    setHelpButtonVisibility() {
        if (!isMobile) {
            if (this.props.showHelpButton) {


                this.UIManagerRef("btn_gameRule").visible = false;
                this.UIManagerRef("btn_history").visible = false;
            } else {

                this.UIManagerRef("btn_gameRule").visible = false;
                this.UIManagerRef("btn_history").visible = false;
            }
        }
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

    //while first rendering, this method will check the mode first
    checkUiMode(uimodeobj: any) {
        if (uimodeobj.uimode === undefined) {
          uimodeobj.uimode = "both";
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
          return uimodeobj;
        }
      }
}
export { ButtonPanelGenericUISuper, isMobile };
