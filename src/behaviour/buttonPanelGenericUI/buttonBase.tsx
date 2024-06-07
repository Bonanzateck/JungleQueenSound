import { Component, Ref } from "react";
import { UIManager } from "@bonanzainteractive/core";

import { isMobile } from "react-device-detect";
import { Texture } from "pixi.js";
import { _ReactPixi } from "@inlet/react-pixi";
interface IProps {
    [x: string]: any;
}
interface IState {
    [x: string]: any;
}

export default class buttonBase extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected ui_mode: string;
    protected displayUI: Object[] = [];
    protected isButtonClicked: boolean = false;
    protected UIManagerRef: any = UIManager.getRef;
    protected storeCurrentBet: number = 0;
    protected buttonPanelGenericUIContainer: _ReactPixi.IContainer | Ref<any>;
    protected autoPlayButtonName: string = "";
    protected autoplayStopButtonX: number = 685;
    protected autoplayStopButtonY: number = 1648;
    protected autoplayCounterX: number = 734;
    protected autoplayCounterY: number = 1699;
    protected isMobile: any = isMobile;
    constructor(props: IProps, state: IState) {
        super(props);
        this.app = props.app;
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";            
        }
        this.autoPlayButtonName = `btn_autoplay_${this.ui_mode}`;
        this.displayUI = this.props.child.filter(this.checkUiMode.bind(this));
        this.buttonPanelGenericUIContainer = {};
    }    
    //this method is setting visibility of button from coming backend
    setVisibilityOfButtonAccordingToBackend(btn_name: string, BetBtnVisibility: boolean) {
        this.displayUI.map((data: any) => {
            if (data.name === btn_name) {
               data.visible = BetBtnVisibility;
            }
        });
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
    
     //when layout changes, this method will be called
     layoutChange(currentLayout: string) {
        this.displayUI.forEach((data: any) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
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

    /**
     * 
     * @param visibleArr... manage text visiblity true or false behalf of pass Object
     */
    textVisibility(nextProps: any, visibleArr: any) {
        if (!nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable) {
            if (visibleArr) {
                for (let typeOfVisiblity in visibleArr) {
                    for (let nameOfText of visibleArr[typeOfVisiblity]) {
                        if (this.UIManagerRef(nameOfText) && this.UIManagerRef(nameOfText)) {
                            this.UIManagerRef(nameOfText).visible = typeOfVisiblity === 'ON' ? true : false;
                        }
                    }
                }
            }
        }
    }
    /**
     * Spin Start Or Game Start
    */
    onSpin(stateObj: object) {
        let condition = true;
        if (this.props.firstSpinAfterLoad) {
           // condition = ((this.props.balance - this.props.coinList[this.props.currentBetIndex] >= this.props.coinList[this.props.currentBetIndex]) || (this.props.balance - this.props.coinList[this.props.currentBetIndex]) === 0) || ((this.props.balance - this.props.coinList[this.props.currentBetIndex]) >= 0);
            this.props.spinAfterLoad(false);
        }
        else {
           // condition = ((this.props.balance >= this.props.coinList[this.props.currentBetIndex]));

        }
        if (condition) {
          //  this.storeCurrentBet = this.props.coinList[this.props.currentBetIndex];
            this.props.setButtonPanelUpdateState(stateObj);
            this.playGame();//Play Command            
        }
        /*       this.setStakeVisibility();        */
    }

    // This Function  is used to Set Sound on UI-Buttons
    onClickSound() {
        this.props.setApplicationButtonClicked(true);
        this.props.setApplicationButtonClicked(false);
    }

    /**
     * Play Game Action call
     */
    playGame() {
        this.props.getApplicationSpinResponse();
        this.props.stopWinPresentation();
        this.props.resetReelState();        
        this.props.setCspStart(true);
    }
    /*  
     setStakeVisibility() {
         this.UIManagerRef("btn_stake") && (this.UIManagerRef("btn_stake").texture = Texture.from("stake_disable.png"));
         } */


    freezeGameFun(nextProps: any) {
        let componentListArr = ["decreaseButtonUI", "increaseButtonUI"];
        let currentBalance = this.props.balance - this.props.coinList[this.props.selectedCoin];
        if ((nextProps.freezeGame && nextProps.freezeGame !== this.props.freezeGame)) {
            return true;
        }
        else if ((nextProps.selectedCoin !== this.props.selectedCoin || nextProps.currentBetIndex !== this.props.currentBetIndex) && currentBalance > this.props.coinList[nextProps.currentBetIndex] && !componentListArr.includes(nextProps.name) && !nextProps.stopGameMinBlance && nextProps.stopGameMinBlance !== this.props.stopGameMinBlance) {
            return 'ACTIVE_BUTTON';//On All Button. Expect Increase Button
        }
        else if ( !nextProps.inAutoplay && !nextProps.allButtonEnable && nextProps.cspStart && nextProps.cspStart !== this.props.cspStart) {
            return nextProps.name !== "spinButtonUI" ? true : false;
        }
        else if (nextProps.inAutoplay && !nextProps.allButtonEnable && nextProps.cspStart && nextProps.cspStart !== this.props.cspStart) {
            return nextProps.name === "autoPlayButtonUI" ? true : false;
        }
        else if (!nextProps.inAutoplay && nextProps.isActiveAll !== this.props.isActiveAll && nextProps.isActiveAll && currentBalance < this.props.coinList[nextProps.currentBetIndex] && nextProps.stopGameMinBlance) {
            return nextProps.name !== "decreaseButtonUI" ? true : false;
        }
        else {
            return false;
        }
    }
}
