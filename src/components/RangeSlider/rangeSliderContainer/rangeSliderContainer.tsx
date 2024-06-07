import React, { useEffect } from 'react';
import { withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { configGame } from "../../../slot/data/config";
import { actions as behaviourAction } from "../../../gamereducer/behaviourReducer";
import { actions as paytableGofActions } from "../../../gamereducer/paytableBMReducer";
import { autoplayActions, baseGameAction, gridActions, paytableActions, reelsActions, reelsGridActions, buttonActions, winpresentationAction, asyncActions, applicationActions } from '@bonanzainteractive/slote_core';
import RangeSliderTemplate from '../RangeSliderTemplate/RangeSliderTemplate';
import { language } from "../../../data/lang/text/text";


interface IDispatchToProps { }

interface IStore {
    [x: string]: any;
}

interface IStateToProps {
    maxWinMultiplier: number;
    betList: Array<number>;
    currentBetIndex: number;
    autoPlaySingleWinLimitPercentage: number;
    autoPlayWinLimitPercentage: number;
    autoPlayLossLimitPercentage: number;
    transitionBalance: number;
    autoPlaySpinSteps: Object;
    showAutoplay: boolean;
    numberButtonValue: number;
    balance: number;
    selectedCoin: number;
    coinList: any;
    currencyCode: string;
    autoplayCount: number;
    stopAutoplayOnAnyWin: any;
    locale: string;

}

function RangeSliderContainer(props: any) {
    const { locale, setCspStart, currencyCode, autoPlaySpinSteps, autoPlayLossLimitPercentage, autoPlaySingleWinLimitPercentage, autoPlayWinLimitPercentage, setValueOfNumberButton, setIsScreenOnOff, hideAutoplay, balance, coinList, selectedCoin, interactivityOfStartButton, setMobMenuVisibility, setApplicationButtonpanelVisibility, numberButtonValue, mobilePaytableShow, hidePaytable, setAmountForAutoplay, setAutoplay, setApplicationAutoplayCount, getApplicationSpinResponse, transitionBalance, stopWinPresentation, resetReelState, setAllButtonDisable, betList, currentBetIndex, maxWinMultiplier, setAllButtonEnable, setBalanceDecreasedBy, setBalanceIncreasedBy, setSingleWinExceed, stoppedAutoplayOnWin } = props;
    const [isEnabled, setIsEnabled] = React.useState(true);
    const [isActiveSpinBtn, setIsActiveSpinBtn] = React.useState('');
   
    const localeKey = locale as keyof typeof language;
    const langCode = language[localeKey];

    let maxValue: number = 0;

    useEffect(() => {
        stoppedAutoplayOnWin(true);
        setBalanceIncreasedBy(-1);
        setBalanceDecreasedBy(-1);
        setSingleWinExceed(-1);
    }, []);

    function firstSlider() {
        let manWinValue = (maxWinMultiplier * autoPlaySingleWinLimitPercentage) / 100;
        maxValue = maxWinMultiplier ? (betList[currentBetIndex]) / 100 * manWinValue : (betList[currentBetIndex]) / 100 * 500;
        return maxValue;
    }

    function secondSlider() {
        let manWinValue = (maxWinMultiplier * autoPlayWinLimitPercentage) / 100;
        maxValue = maxWinMultiplier ? (betList[currentBetIndex]) / 100 * manWinValue : (betList[currentBetIndex]) / 100 * 5000;
        return maxValue;
    }

    function thirdSlider() {
        return 100;
    }

    function reset() {
        setAllButtonEnable();
        hideAutoplay();
        setBalanceIncreasedBy(-1);
        setBalanceDecreasedBy(-1);
        setSingleWinExceed(-1);
        interactivityOfStartButton(false);
        setMobMenuVisibility(false);
        setApplicationButtonpanelVisibility(true);
    }

    function startAutoplay() {

        setIsScreenOnOff(true); // let the screen turn on.
        mobilePaytableShow(false);
        hidePaytable();
        // if ((numberButtonValue !== 0) && ((balance - coinList[selectedCoin]) > 0)) {
        if ((numberButtonValue !== 0)) {
            let numberValue;
            if (numberButtonValue === -1) {
                numberValue = Number.POSITIVE_INFINITY;
            } else {
                numberValue = numberButtonValue;
            }
            setAmountForAutoplay(transitionBalance / 100);
            setAutoplay(numberValue);
            setApplicationAutoplayCount(numberValue);
            props.startAutoplay();
            getApplicationSpinResponse();
            stopWinPresentation();
            resetReelState();
            setAllButtonDisable();
            hideAutoplay();
            interactivityOfStartButton(false);
            setMobMenuVisibility(false);
            setApplicationButtonpanelVisibility(true);
            setCspStart(true);
        }
        else {
            reset();
        }

    }

    function sliderValue() {
        let arr = [];
        let bet = props.betList[props.currentBetIndex] / 100;
        let multiplierValues = [0, 1, 2, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 600, 700, 800];
        for (let i = 0; i < multiplierValues.length; i++) {
            arr.push(multiplierValues[i] * bet)
        }
        // console.log(arr)
        return arr;
    }

    function onClick(value: number) {
        if (Number(value) > 0) {
            setValueOfNumberButton(Number(value) - 1);
        } else if (Number(value) === 0) {
            setValueOfNumberButton(0);
        } else {
            setValueOfNumberButton(-1);
        }
        interactivityOfStartButton(true);
    }

    function handleToggle(e: any) {
        onClickSound();
        if (e.target.name === "checkedA") {
            props.stoppedAutoplayOnWin(false);
        }
    }

    function handleSlider(e: any) {
        e.preventDefault();
        if (e.target.id) {
            switch (e.target.id) {
                case "firstSlider":
                    let firstVal = sliderValue();
                    if (firstVal[e.target.value] > 0) {
                        setSingleWinExceed(firstVal[e.target.value]);
                    } else {
                        setSingleWinExceed(Number.POSITIVE_INFINITY);
                    }
                    break;
                case "secondSlider":
                    let secondVal = sliderValue();
                    if (secondVal[e.target.value] > 0) {
                        setBalanceIncreasedBy(secondVal[e.target.value]);
                    } else {
                        setBalanceIncreasedBy(Number.POSITIVE_INFINITY);
                    }
                    break;
                case "thirdSlider":
                    let thirdVal = e.target.value;
                    if (thirdVal > 0) {
                        setBalanceDecreasedBy((thirdVal));
                    } else {
                        setBalanceDecreasedBy(Number.POSITIVE_INFINITY);
                    }
                    break;
            }
        }

    }

    function handleClick(e: any) {
        e.preventDefault();
        onClickSound();
        if (e.target.name && e.target.name === "autoPlaySpinCount") {
            e.target.value > 0 ? setIsEnabled(false) : setIsEnabled(true)
            setIsActiveSpinBtn((e.target.value));
        }

        if (e.target.value) {
            onClick(e.target.value);
            switch (e.target.value) {
                case langCode.autoplayText_20:
                    startAutoplay();
                    break;
                case langCode.autoplayText_21:
                    reset();
                    break;
            }
        }
    }


    function firstSliderStep() {
        return 1;

    }
    function secondSliderStep() {
        return 1;
    }

    function thirdSliderStep() {
        //return ((thirdSlider() / ((props.betList[props.currentBetIndex]) / 100)) * (props.betList[props.currentBetIndex]) / 100) / 100;
        return 1;
    }

    function onClickSound() {
        props.setApplicationButtonClicked(true);
        props.setApplicationButtonClicked(false);
    }

    return (
        <React.Fragment>
            <RangeSliderTemplate
                firstSlider={firstSlider}
                secondSlider={secondSlider}
                thirdSlider={thirdSlider}
                handleClick={handleClick}
                firstSliderStep={firstSliderStep}
                secondSliderStep={secondSliderStep}
                thirdSliderStep={thirdSliderStep}
                sliderValue={sliderValue}
                isEnabled={isEnabled}
                currencyType={currencyCode}
                isActiveSpinBtn={isActiveSpinBtn}
                handleToggle={handleToggle}
                handleSlider={handleSlider}
                autoplayButtons={[5, 10, 25, 50, 100, 999]}
                langCode={langCode}
                onClickSound={onClickSound}
            />
        </React.Fragment>
    );
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'betPanelState' | 'behaviourState' | 'basegameState' | 'autoplayState' | 'menuState' | 'applicationState'>): IStateToProps =>
    ({
        stopAutoplayOnAnyWin: state.autoplayState.stopAutoplayOnAnyWin,
        maxWinMultiplier: state.applicationState.maxWinMultiplier,
        autoplayCount: state.basegameState.autoplayCount,
        showAutoplay: state.autoplayState.showAutoplay,
        autoPlaySingleWinLimitPercentage: state.applicationState.autoPlaySingleWinLimitPercentage,
        betList: state.basegameState.betList,
        currentBetIndex: state.basegameState.currentBetIndex,
        autoPlayWinLimitPercentage: state.applicationState.autoPlayWinLimitPercentage,
        autoPlayLossLimitPercentage: state.applicationState.autoPlayLossLimitPercentage,
        transitionBalance: state.behaviourState.transitionBalance,
        autoPlaySpinSteps: state.applicationState.autoPlaySpinSteps,
        numberButtonValue: state.autoplayState.numberButtonValue,
        balance: state.basegameState.balance,
        selectedCoin: state.betPanelState.selectedCoin,
        coinList: state.betPanelState.coinList,
        currencyCode: state.applicationState.currencyCode,
        locale: state.applicationState.locale,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        hideAutoplay: (): any => dispatch(autoplayActions.hideAutoplayUI()),
        setBalanceIncreasedBy: (value: number): any => dispatch(autoplayActions.setBalanceIncreasedBy(value)),
        setBalanceDecreasedBy: (value: number): any => dispatch(autoplayActions.setBalanceDecreasedBy(value)),
        setSingleWinExceed: (value: number): any => dispatch(autoplayActions.setSingleWinExceed(value)),
        interactivityOfStartButton: (startButtonInteractivity: boolean): any => dispatch(autoplayActions.interactivityOfStartButton(startButtonInteractivity)),
        setMobMenuVisibility: (showMobileMenuPanel: boolean): any => dispatch(behaviourAction.setMobMenuVisibility(showMobileMenuPanel)),
        setApplicationButtonpanelVisibility: (visible: boolean): any => dispatch(applicationActions.setApplicationButtonpanelVisibility(visible)),
        setIsScreenOnOff: (screenOnOff: boolean): any => dispatch(buttonActions.setIsScreenOnOff(screenOnOff)),
        mobilePaytableShow: (showPaytableMobile: boolean): any => dispatch(paytableGofActions.mobilePaytableShow(showPaytableMobile)),
        hidePaytable: (): any => dispatch(paytableActions.hidePaytable()),
        setAmountForAutoplay: (storeAmountForAutoplay: number): any => dispatch(behaviourAction.setAmountForAutoplay(storeAmountForAutoplay)),
        setAutoplay: (autoplayCount: number): any => dispatch(autoplayActions.setAutoplayCount(autoplayCount)),
        setApplicationAutoplayCount: (autoplaycount: number): any => dispatch(baseGameAction.setApplicationAutoplayCount(autoplaycount)),
        startAutoplay: (): any => dispatch(baseGameAction.startAutoplay()),
        getApplicationSpinResponse: (): any => dispatch(asyncActions.getApplicationSpinResponse()),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        resetReelState: (): any => dispatch((Number(configGame["SPIN_TYPE"]) === 0 && reelsActions.resetReelState()) || (Number(configGame["SPIN_TYPE"]) === 1 && gridActions.resetReelState()) || (Number(configGame["SPIN_TYPE"]) === 2 && reelsGridActions.resetReelState())),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        setValueOfNumberButton: (numberButtonValue: number): any => dispatch(autoplayActions.setValueOfNumberButton(numberButtonValue)),
        stoppedAutoplayOnWin: (reset: boolean): any => dispatch(autoplayActions.stoppedAutoplayOnWin(reset)),
        setCspStart: (cspStart: boolean): any => dispatch(reelsGridActions.setCspStart(cspStart)),
        realityCheckResume: (resumeRealityCheck: boolean): any => dispatch(behaviourAction.realityCheckResume(resumeRealityCheck)),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        
    }))((RangeSliderContainer)));