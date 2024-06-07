import React, { Component } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withMobViewPanelConfiguration from "./configuration/withMobViewPanelConfiguration";
import { buttonActions , autoplayActions , baseGameAction} from "@bonanzainteractive/slote_core";
import { actions as menuActions } from "../../core/reducers/menuReducer";
import { actions as asyncActions } from "../../core/reducers/asyncServerResponseReducer";

interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}

interface IState {

}

interface IState {
    buttonSelected: any,
    showAutoplay: boolean,
    showBet: boolean,
    showSetting: boolean,
    showRules: boolean

}

interface IStateToProps {
}

interface IDispatchToProps {
}

class MobViewPanel extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected mobViewPanelContainer: any;
    protected headingContainerBgColor: any;
    protected mainContainerBgColor: any;
    protected textColor: any;
    protected insideBorderColor: any;
    protected bottomButtonBarBgColor: any;
    protected enableAutoplayButtonX: number;
    protected enableAutoplayButtonY: number;
    protected disableAutoplayButtonX: number;
    protected disableAutoplayButtonY: number;
    protected enableBetButtonX: number;
    protected enableBetButtonY: number;
    protected disableBetButtonX: number;
    protected disableBetButtonY: number;
    protected enableSettingButtonX: number;
    protected enableSettingButtonY: number;
    protected disableSettingButtonX: number;
    protected disableSettingButtonY: number;
    protected enableRuleButtonX: number;
    protected enableRuleButtonY: number;
    protected disableRuleButtonX: number;
    protected disableRuleButtonY: number;
    protected enableCloseButtonX: number;
    protected enableCloseButtonY: number;

    constructor(props: IProps) {
        super(props);

        this.app = props.app;
        this.mobViewPanelContainer = {};
        this.state = {
            buttonSelected: "b1",
            showAutoplay: true,
            showBet: false,
            showSetting: false,
            showRules: false


        }
        this.headingContainerBgColor = '#93fd01'
        this.textColor = '#f5f3ec'
        this.mainContainerBgColor = '#000000'
        this.insideBorderColor = '#808080'
        this.bottomButtonBarBgColor = '#272424'

        this.enableAutoplayButtonX = -304;
        this.enableAutoplayButtonY = -85;
        this.disableAutoplayButtonX = -263;
        this.disableAutoplayButtonY = -85;

        this.enableBetButtonX = -366
        this.enableBetButtonY = -43;
        this.disableBetButtonX = -341;
        this.disableBetButtonY = -1;

        this.enableSettingButtonX = -345
        this.enableSettingButtonY = -85;
        this.disableSettingButtonX = -325;
        this.disableSettingButtonY = -43;

        this.enableRuleButtonX = -378
        this.enableRuleButtonY = -1;
        this.disableRuleButtonX = -386;
        this.disableRuleButtonY = -85;

        this.enableCloseButtonX = -417
        this.enableCloseButtonY = -84;
    }

    reset() {
        this.setState((prevState) => {
            return {
                ...prevState,
                buttonSelected: "b1",
                showAutoplay: true,
                showBet: false,
                showRules: false,
                showSetting: false
            }
        })
    }

    onClick(name: any) {
        this.setState((prevState) => {
            return {
                ...prevState,
                buttonSelected: name

            }
        })

    }

    showBet() {
        this.setState((prevState) => {
            return {
                ...prevState,
                showAutoplay: false,
                showBet: true,
                showRules: false,
                showSetting: false
            }
        })
    }

    showRules() {
        this.setState((prevState) => {
            return {
                ...prevState,
                showAutoplay: false,
                showBet: false,
                showRules: true,
                showSetting: false
            }
        })
    }

    showSetting() {
        this.setState((prevState) => {
            return {
                ...prevState,
                showAutoplay: false,
                showBet: false,
                showRules: false,
                showSetting: true
            }
        })
    }

    showAutoplay() {
        this.setState((prevState) => {
            return {
                ...prevState,
                showAutoplay: true,
                showBet: false,
                showRules: false,
                showSetting: false

            }
        })
    }


    render() {
        if (!this.props.showAutoplay) {
            return (<></>)
        }
        const { showAutoplay, showBet, showRules, showSetting } = this.state;
        let autoplayButtonX, autoplayButtonY, betButtonX, betButtonY, settingButtonX, settingButtonY, rulesButtonX,
            rulesButtonY;
        if (showAutoplay) {
            autoplayButtonX = this.enableAutoplayButtonX
            autoplayButtonY = this.enableAutoplayButtonY
        } else {
            autoplayButtonX = this.disableAutoplayButtonX
            autoplayButtonY = this.disableAutoplayButtonY
        }
        if (showBet) {
            betButtonX = this.enableBetButtonX
            betButtonY = this.enableBetButtonY
        } else {
            betButtonX = this.disableBetButtonX
            betButtonY = this.disableBetButtonY
        }
        if (showSetting) {
            settingButtonX = this.enableSettingButtonX
            settingButtonY = this.enableSettingButtonY
        } else {
            settingButtonX = this.disableSettingButtonX
            settingButtonY = this.disableSettingButtonY
        }
        if (showRules) {
            rulesButtonX = this.enableRuleButtonX
            rulesButtonY = this.enableRuleButtonY
        } else {
            rulesButtonX = this.disableRuleButtonX
            rulesButtonY = this.disableRuleButtonY
        }
        const PROPS_TO_SEND_Autoplay = {
            langObj: this.props.langObj,
        }
        return (<></>)
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'autoplayState' | 'menuState' | 'applicationState'>): IStateToProps =>
    ({
        showAutoplay: state.autoplayState.showAutoplay,
        autoplayStopped: state.autoplayState.autoplayStopped,
        resizeWidth: state.applicationState.resizeWidth,
        resizeHeight: state.applicationState.resizeHeight,
        scaleX: state.applicationState.scaleX,
        scaleY: state.applicationState.scaleY,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        hideMenuUI: (): any => dispatch(menuActions.hideMenuUI()),
        showMenuUI: (): any => dispatch(menuActions.showMenuUI()),
        hideAutoplay: (): any => dispatch(autoplayActions.hideAutoplayUI()),
        setAutoplay: (autoplayCount: number): any => dispatch(autoplayActions.setAutoplayCount(autoplayCount)),
        startAutoplay: (): any => dispatch(baseGameAction.startAutoplay()),
        setApplicationAutoplayCount: (autoplaycount: number): any => dispatch(baseGameAction.setApplicationAutoplayCount(autoplaycount)),
        getApplicationSpinResponse: (): any => dispatch(asyncActions.getApplicationSpinResponse()),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        stoppedAutoplayUI: (autoplayStopped: boolean): any => dispatch(autoplayActions.stoppedAutoplayUI(autoplayStopped)),
    }))(withMobViewPanelConfiguration(MobViewPanel)));