import React from 'react'
import { withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { buttonActions, paytableActions } from "@bonanzainteractive/slote_core";
import { actions as behaviourAction } from "../../../gamereducer/behaviourReducer";
import { language } from "../../../data/lang/text/text";
import GamePayTable from '../GamePayTable';

interface IDispatchToProps { }

interface IStore {
    [x: string]: any;
}

interface IStateToProps {
    locale: string;
    paytablePayoutArray: any;
    betList : any
    currentBetIndex:Number
}

function PayTableContainer(props: any) {
    const { locale, paytablePayoutArray ,currentBetIndex, betList} = props;
    const localeKey = locale as keyof typeof language;
    const langCode = language[localeKey];

    function handleButtonClick() {
        // props.setWinAmount(false);
        props.hidePaytable();
        props.setAllButtonEnable();
        onClickSound();
    }

    function onClickSound() {
        props.setApplicationButtonClicked(true);
        props.setApplicationButtonClicked(false);
    }

    return (
        <React.Fragment>
            <GamePayTable
                handleButtonClick={handleButtonClick}
                langCode={langCode}
                payout={paytablePayoutArray}
                betList = {betList}
                currentBetIndex={currentBetIndex}
            >
            </GamePayTable>
        </React.Fragment>
    )
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'applicationState' | 'basegameState' | 'paytableBMState'>): IStateToProps =>
    ({
        locale: state.applicationState.locale,
        paytablePayoutArray: state.paytableBMState.paytablePayoutArray,
        currentBetIndex: state.basegameState.currentBetIndex,
        betList: state.basegameState.betList,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setWinAmount: (winAmountEmpty: boolean): any => dispatch(behaviourAction.setWinAmount(winAmountEmpty)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        hidePaytable: (): any => dispatch(paytableActions.hidePaytable()),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),

    }))((PayTableContainer)));