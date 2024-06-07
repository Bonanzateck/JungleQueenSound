import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { paytableActions, withButtonPanelConfiguration, buttonActions, layoutssActions, soundActions } from "@bonanzainteractive/slote_core";
import { UIManager } from "@bonanzainteractive/core";
import { withPixiApp } from "@inlet/react-pixi";
import { configGame } from "../../slot/data/config";
import buttonBase from "./buttonBase";
interface IProps {
    [x: string]: any;
}
interface IStore {
    [x: string]: any;
}
interface IDispatchToProps {
}
interface IState {
    [x: string]: any;
}
interface IStateToProps {
    allSpinComplete: boolean,
    paytableBtnVisibility: boolean,
    showHelpText: boolean;
    allButtonEnable: boolean,
    inAutoplay: boolean,
    isActiveAll: boolean,
    freezeGame: boolean,
    selectedCoin: number,
    coinList: any,
    balance: number,
    currentBetIndex: number,
    stopGameMinBlance: boolean,
    cspStart: boolean,
    showWinCelebration: boolean,
    layoutMode: string;
}
class hamburgerMenu extends buttonBase {
    protected button_name_2: string;
    protected dragging = false;
    protected originalPosition: any;
    protected payTableContainerMaxY: number = 5050;
    protected sliderYGap: number = 450;
    protected sliderMoveStep: number = 1;

    // protected payTableContainer: any;
    constructor(props: IProps, state: IState) {
        super(props, state);
        this.button_name_2 = "btn_paytable";
        this.state = {
            [this.button_name_2]: { enable: true },
        }
        this.setVisibilityOfButtonAccordingToBackend(this.button_name_2, this.props.paytableBtnVisibility);
        this.layoutChange(this.props.layoutMode);
    }

    calculateYForSlider() {
        //For one step sliding
        return this.payTableContainerMaxY / this.sliderYGap;
    }

    handleScrollBAr(e: any) {
        const page_slider_cylinder: any = UIManager.getRef("page_slider_cylinder");
        page_slider_cylinder.on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove);
    }

    onDragStart(e: any) {
        this.dragging = true;
        this.originalPosition = e.data.global.y;
    }

    onDragEnd(e: any) {
        this.dragging = false;
    }

    onDragMove(e: any) {
        const page_slider_cylinder: any = UIManager.getRef("page_slider_cylinder");
        let payTableContainer: any = UIManager.getRef("payTableContainer");

        if (this.dragging) {
            const newPosition = e.data.global.y;
            const delta = newPosition - this.originalPosition;
            if (page_slider_cylinder.y < 600 && delta > 0) {
                //sliding with 5 step
                page_slider_cylinder.y += 5;
                this.originalPosition = newPosition;
                payTableContainer.y -= 56.1;
            } else if (delta < 0 && page_slider_cylinder.y > 150) {
                page_slider_cylinder.y -= 5;
                this.originalPosition = newPosition;
                payTableContainer.y += 56.1;
            }
        }
    }

    // scroll while using mouse wheel
    handleMouseWheel(e: any) {
        let element: any = document.getElementById('payTableDiv');
        let payTableContainer: any = UIManager.getRef("payTableContainer");
        const page_slider_cylinder: any = UIManager.getRef("page_slider_cylinder");
        const steps = this.calculateYForSlider();

        element.addEventListener('wheel', (e: any) => {
            if (e.deltaY > 0 && page_slider_cylinder.y < 600) {
                //sliding with 10 step
                page_slider_cylinder.y += (this.sliderMoveStep * 10);
                payTableContainer.y -= (steps * 10);
            }
            if (e.deltaY < 0 && page_slider_cylinder.y > 150 && page_slider_cylinder.y <= 600) {
                page_slider_cylinder.y -= (this.sliderMoveStep * 10);
                payTableContainer.y += (steps * 10);
            }
        });
    }

    //creating mask for scrollable data
    payTableMask() {
        const payTableContainer: any = UIManager.getRef("mainPayTableContainer");
        const thing = new PIXI.Graphics();
        thing.beginFill(0xDE3249);
        thing.drawRect(425, 200, 1070, 600);
        thing.endFill();
        payTableContainer.addChild(thing);
        thing.x = 0;
        thing.y = 0;
        payTableContainer.mask = thing;
    }

    // onReelMaskOff() {
    //     this.payTableContainer.mask = null;
    // }

    // handle scroll bar button clicks 
    handleScrollUpDownBtn = (e: any) => {
        const page_arrow_down: any = UIManager.getRef("page_arrow_down");
        const page_arrow_up: any = UIManager.getRef("page_arrow_up");
        const page_slider_cylinder: any = UIManager.getRef("page_slider_cylinder");
        const payTableContainer: any = UIManager.getRef("payTableContainer");
        const steps = this.calculateYForSlider();

        page_arrow_down.on('click', () => {
            if (page_slider_cylinder.y < 600) {
                //sliding with 10 step
                page_slider_cylinder.y += (this.sliderMoveStep * 10);
                payTableContainer.y -= (steps * 10);
            }
        });
        page_arrow_up.on('click', () => {
            if (page_slider_cylinder.y > 150 && page_slider_cylinder.y <= 600) {
                page_slider_cylinder.y -= (this.sliderMoveStep * 10);
                payTableContainer.y += (steps * 10);
            }
        });
    }


    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        if (this.props.layoutMode) {
            this.layoutChange(this.props.layoutMode);
        }
    }

    //this method will be called when a button gets clicked
    handleEvent = (e: any) => {
        e.stopPropagation();
        switch (e.target.name) {
            case this.button_name_2:
                this.props.setAllButtonDisable();
                this.onClickSound();
                this.props.showPaytable();
                // if (!this.isMobile) {
                //     this.payTableMask();
                //     this.handleScrollUpDownBtn(e);
                //     this.handleMouseWheel(e);
                //     this.handleScrollBAr(e)
                // }
                return;

            default:
                return 'No buttons';
        }
    }

    helptextDisplayFunctionality() {
        if (!this.props.showHelpText) {
            this.props.setApplicationShowHelpText(true);
            this.props.setAllButtonDisable();
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        return this.checkUpdateState(nextProps) ? true : false;
    }

    checkUpdateState(nextProps: any) {
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode);
            return true;
        }
        if (nextProps.showWinCelebration !== this.props.showWinCelebration) {
            nextProps.showWinCelebration && this.toggleSettingButton(false);
        }

        // Freeze Game
        let freezeRes: any = this.freezeGameFun(nextProps);
        if (freezeRes) {
            freezeRes === true && this.toggleSettingButton(false);
            (freezeRes === "ACTIVE_BUTTON" || freezeRes === "ACTIVE_BUTTON_ON_POPUP") && this.toggleSettingButton(true);
            return false;
        }
        else if (nextProps.inAutoplay && nextProps.inAutoplay !== this.props.inAutoplay) {
            this.toggleSettingButton(false);
        }
        else if (!nextProps.inAutoplay && !nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable) {
            this.toggleSettingButton(false);
        }
        else if (!nextProps.inAutoplay && nextProps.allButtonEnable && !nextProps.cspStart) {
            this.toggleSettingButton(true);
        }
        else if (!nextProps.inAutoplay && ((nextProps.isActiveAll && nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable) || (nextProps.clickedButtonName !== this.props.clickedButtonName && nextProps.clickedButtonName === "postIntro_continueButton_desktop"))) {
            this.toggleSettingButton(true);
        }
        else if (!nextProps.inAutoplay && nextProps.allButtonEnable && ((nextProps.isActiveAll !== this.props.isActiveAll && nextProps.isActiveAll && nextProps.allSpinComplete) || (nextProps.showHelpText !== this.props.showHelpText) || (nextProps.paytableBtnVisibility !== this.props.paytableBtnVisibility) || (nextProps.clickedButtonName !== this.props.clickedButtonName && nextProps.clickedButtonName === "postIntro_continueButton_desktop"))) {
            this.toggleSettingButton(true);
        }
        return false;
    }

    /**
     * Enable and disable Increase Button UI
     */
    toggleSettingButton(isEnable: boolean) {
        this.setState((prevState) => {
            return {
                ...prevState,
                [this.button_name_2]: { enable: isEnable },
            }
        });
        this.forceUpdate();
    }


    render() {
        const { langObj } = this.props;
        return (
            <UIManager id={"GenericUIComponenthamburgerMenu"}
                type={"Container"}
                ref={i => this.buttonPanelGenericUIContainer = i}
                app={this.app}
                configGame={configGame}>
                {
                    this.displayUI.map((data: any) => {

                        let isdisable = false;

                        if (this.props.cspStart || this.state[data.name].enable === false || this.props.inAutoplay) {
                            isdisable = true;
                        }
                        return (
                            <UIManager
                                key={`UIManager-${Math.random()}`}
                                type={data.type}
                                app={this.app}
                                ClickHandler={this.handleEvent}
                                langObj={langObj}
                                disabled={isdisable}
                                id={data.id}
                                {...data}
                            />
                        )
                    })
                }
            </UIManager>
        )
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'applicationState' | 'reelgridState' | 'winCelebrationState' | 'buttonPanelState' | 'reelsState' | 'basegameState' | 'betPanelState' | 'behaviourState'>): IStateToProps =>
    ({
        allSpinComplete: state.reelgridState.allSpinComplete,
        paytableBtnVisibility: state.applicationState.showPaytable,
        showHelpText: state.applicationState.showHelpText,
        allButtonEnable: state.buttonPanelState.allButtonEnable,
        inAutoplay: state.basegameState.inAutoplay,
        isActiveAll: state.basegameState.isActiveAll,
        freezeGame: state.buttonPanelState.freezeGame,
        selectedCoin: state.betPanelState.selectedCoin,
        coinList: state.betPanelState.coinList,
        balance: state.basegameState.balance,
        currentBetIndex: state.basegameState.currentBetIndex,
        stopGameMinBlance: state.buttonPanelState.stopGameMinBlance,
        cspStart: state.reelsState.cspStart,
        showWinCelebration: state.winCelebrationState.showWinCelebration,
        layoutMode: state.applicationState.layoutMode,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        showPaytable: (): any => dispatch(paytableActions.showPaytable()),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
    }))(withButtonPanelConfiguration(hamburgerMenu)));    