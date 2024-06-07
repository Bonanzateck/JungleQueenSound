import React, { Component } from "react";
import { withPixiApp } from "@inlet/react-pixi";
import {withAutoplayConfiguration} from "@bonanzainteractive/slote_core";
import { isMobile } from "react-device-detect";
import * as PIXI from "pixi.js";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { CURRENCY } from "@bonanzainteractive/core";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import "react-toggle/style.css";
// import moment from "moment-timezone";






interface IProps {
    [x: string]: any;
}

interface IState {

}
interface IStore {
    [x: string]: any;
}
interface IState {
    [x: string]: any;
}

interface IStateToProps {
}

interface IDispatchToProps {
}

class BetHistoryUI extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected showFixedPanelPage: boolean;
    protected DB: any;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            show: false,
            value: null,
            spn: true,
            parentId: null,
            spnmob: true,
            spnmobi: 0,

        };
        this.showFixedPanelPage = false;
        this.DB = [this.props.allhistoryresult];
    }

    componentDidMount() {
        this.DB = [];
    }
    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        this.DB = nextProps.allhistoryresult;
        return true;
    }
    getCorrectDateTime(date: any) {
        // let correctTime: any = this.getDate(date);
        // return moment.parseZone(correctTime).local().format("YYYY-MM-DD hh:mm:ss");

    }

    getDate(v: any) {
        let d = new Date(`${v.replace(" ", "T")}Z`);  //Convert value to Date
        //If BST is in effect
        if (this.isBst()) {
            d.setHours(d.getHours() - 1); //Deduct hours by 1 (Prevents backend & front end both taking into account BST & duplicating timezone calculation)
        }
        return `${d} `; //Return date string
    }



    isBst() {
        const d = new Date();
        let lSoM: any;
        let lSoO: any;

        // Loop over the 31 days of March for the current year
        for (let i = 31; i > 0; i--) {
            const tmp = new Date(d.getFullYear(), 2, i);

            // If it's Sunday
            if (tmp.getDay() === 0) {
                // last Sunday of March
                lSoM = tmp;
                // And stop the loop
                break;
            }
        }

        // Loop over the 31 days of October for the current year
        for (let k = 31; k > 0; k--) {
            const tmp1 = new Date(d.getFullYear(), 9, k);

            // If it's Sunday
            if (tmp1.getDay() === 0) {
                // last Sunday of October
                lSoO = tmp1;

                // And stop the loop
                break;
            }
        }

        if (d < lSoM || d > lSoO) {
            return false; //BST isn't in effect (GMT+0)
        } else {
            return true; //BST is in effect (GMT+1)
        }
    }

    mobileView() {
        return (
            <>
                <div className="table-box-mobile">
                    {
                        this.DB.map((e: any, index: number) => {

                            let betDetailsSelected: any = e;
                            let numReelResultsData: any = betDetailsSelected.spins;
                            let queryString = "mode=history&accountID=" + (window as any).GAME_INFO.accountID +
                                "&path=" + (window as any).GAME_INFO.path +
                                "&gameID=" + (window as any).GAME_INFO.gameID +
                                "&accountID=" + (window as any).GAME_INFO.accountID +
                                "&clientName=" + (window as any).GAME_INFO.clientName +
                                "&lang=" + (window as any).GAME_INFO.lang +
                                "&site=" + (window as any).GAME_INFO.site +
                                "&version=" + (window as any).GAME_INFO.version +
                                "&username=" + (window as any).GAME_INFO.username +
                                //"&channel=" + betDetailsSelected.mobile_desktop +
                                "&betID=" + betDetailsSelected.id +
                                "&stake=" + betDetailsSelected.stake / 100 +
                                "&currency=" + betDetailsSelected.currency +
                                "&whenplaced=" + betDetailsSelected.placed +
                                "&whensettled=" + betDetailsSelected.settled +
                                "&status=" + betDetailsSelected.status +
                                "&returns=" + betDetailsSelected.winnings / 100 +
                                "&numReelResults=" + numReelResultsData.length +
                                "&buyInPrice=" + (betDetailsSelected.buyInPrice !== undefined ? betDetailsSelected.buyInPrice / 100 : undefined) +
                                "&inGame=true";
                            if (numReelResultsData.length > 0) {
                                if (this.state.parentId == betDetailsSelected.id) {
                                    queryString = queryString + "&spinIds=" + numReelResultsData[this.state.spnmobi].id +
                                        "&listSpinTypes=" + numReelResultsData[this.state.spnmobi].type
                                } else {
                                    queryString = queryString + "&spinIds=" + numReelResultsData[0].id +
                                        "&listSpinTypes=" + numReelResultsData[0].type
                                }

                            }

                            if (betDetailsSelected.mobile_desktop == 1) {
                                queryString = queryString + "&channel=desktop"
                            } else {
                                queryString = queryString + "&channel=mobile"
                            }
                            return (
                                <>
                                    <div className="content-table-mobile" key={index} onClick={() => { this.handleClickMobile(index) }} >
                                        <div ><p style={{ border: "none" }}>{e.status === "COMPLETE" ? <img src="./LD/assets/betHistory/right_bh.png" height="20" width="20" /> : <img src="./HD/assets/betHistory/closed_bh.png" height="20" width="20" />} &nbsp;  &nbsp; ID | {e.id}</p></div>
                                        <div><p>{this.getCorrectDateTime(e.placed)}</p></div>
                                        <div><p>{e.buyInPrice !== undefined ? CURRENCY.CurrencyManager.formatCurrencyString(e.buyInPrice / 100, true, true, true, true) : CURRENCY.CurrencyManager.formatCurrencyString(e.stake / 100, true, true, true, true)}</p></div>
                                        <div><p className={e.winnings > 0 ? "last-td-win" : "last-td"} > {CURRENCY.CurrencyManager.formatCurrencyString(e.winnings / 100, true, true, true, true)}<a target="iframe_a" style={{ color: "#a9a9a9" }}> &nbsp; &nbsp; &#62;</a></p></div>
                                    </div>

                                    {this.state.show === index ? <div className="content-table-mobile-toggle" >
                                        {
                                            e.spins.map((s: any, i: number) => this.state.spnmob ? <div className="child-table-mobile" onClick={() => { this.handleClickMobileSpin(i, e) }}>
                                                <div>{s.id}</div>
                                                <div>{this.props.langObj["bet-history_spin-type_" + s.type]}</div>
                                                <div>{this.props.langObj["bet-history_spin-outcome_" + s.outcome]}</div>

                                            </div> : this.state.spnmobi === i && <div style={{ width: "100%" }} >
                                                <p className="iframe-id" onClick={() => { this.setState({ spnmob: true }) }} >{e.id}</p>
                                                <iframe
                                                    src={(window as any).GAME_INFO.pathCDN + "/infrastr_slots_betdetails/?" + queryString}
                                                    name="iframe_a"
                                                    height="190"
                                                    width="100%"
                                                >
                                                </iframe>
                                            </div>
                                            )
                                        }
                                    </div> : null}
                                </>
                            )
                        }
                        )}
                </div>
            </>
        )
    }
    handleClickMobileSpin(i: any, data: any) {
        this.setState(() => ({
            spnmobi: i,
            spnmob: false,
            parentId: data.id

        }));
    }
    handleClickMobile(index: any) {
        if (this.state.show === index) {
            return this.setState({ show: null });
        }
        this.setState(() => ({
            show: index,
            spnmob: true

        }));
    }

    desktopView() {
        return (
            <>
                <div className="table-box">
                    <table className="content-table">
                        <tbody>
                            {
                                this.DB.map((e: any, index: number) =>
                                    <tr key={index} onClick={() => { this.hClick(e) }}>
                                        <td><p style={{ borderLeft: "none" }}>{e.status === "COMPLETE" ? <img src="./HD/assets/betHistory/right_bh.png" height="30" width="30" /> : <img src="./HD/assets/betHistory/closed_bh.png" height="30" width="30" />} &nbsp;  &nbsp; ID | {e.id}</p></td>
                                        <td><p>{this.getCorrectDateTime(e.placed)}</p> </td>
                                        <td><p>{e.buyInPrice !== undefined ? CURRENCY.CurrencyManager.formatCurrencyString(e.buyInPrice / 100, true, true, true, true) : CURRENCY.CurrencyManager.formatCurrencyString(e.stake / 100, true, true, true, true)}</p></td>
                                        <td><p className={e.winnings > 0 ? "last-td-win" : "last-td"} > {CURRENCY.CurrencyManager.formatCurrencyString(e.winnings / 100, true, true, true, true)} <a target="iframe_a" style={{ color: "#a9a9a9" }}> &nbsp; &#62;&nbsp;</a></p></td>
                                    </tr>


                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="iframe-container">
                    {
                        this.state.show ?
                            <>
                                {
                                    this.state.spn ? <span>
                                        <table className="content-table-spins">
                                            <tbody>
                                                <tr>
                                                    <th  >{this.state.value.id}</th>
                                                    <th ></th>
                                                    <th onClick={() => { this.setState({ show: false }) }}>&#10060;</th>
                                                </tr>
                                                {
                                                    this.state.value.spins.map((v: any, index: number) =>
                                                        <tr onClick={() => { this.handleClick(this.state.value, index) }}>
                                                            <td>{v.id}</td>
                                                            <td>{this.props.langObj["bet-history_spin-type_" + v.type]}</td>
                                                            <td>{this.props.langObj["bet-history_spin-outcome_" + v.outcome]}</td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </span> : <span >
                                        <div className="iframe-data">
                                            <p onClick={() => { this.setState({ show: true, spn: true }) }} className="iframe-hide">&#10060;	</p>
                                        </div>
                                        <iframe
                                            src={(window as any).GAME_INFO.pathCDN + "/infrastr_slots_betdetails/?" + this.state.value.queryString}
                                            name="iframe_a"
                                            className="i-frame"
                                        >
                                        </iframe>
                                    </span>
                                }
                            </>
                            : null
                    }
                </div>
            </>
        )
    }
    hClick(e: any) {
        this.setState(() => ({
            show: true,
            value: e,
            spn: true

        }));
    }

    handleClick(e: any, index: number) {
        //alert(e);
        if (e) {
            let betDetailsSelected: any = e;
            let numReelResultsData: any = betDetailsSelected.spins;
            let queryString = "mode=history&accountID=" + (window as any).GAME_INFO.accountID +
                "&path=" + (window as any).GAME_INFO.path +
                "&gameID=" + (window as any).GAME_INFO.gameID +
                "&accountID=" + (window as any).GAME_INFO.accountID +
                "&clientName=" + (window as any).GAME_INFO.clientName +
                "&lang=" + (window as any).GAME_INFO.lang +
                "&site=" + (window as any).GAME_INFO.site +
                "&version=" + (window as any).GAME_INFO.version +
                "&username=" + (window as any).GAME_INFO.username +
                //"&channel=" + betDetailsSelected.mobile_desktop +
                "&betID=" + betDetailsSelected.id +
                "&stake=" + betDetailsSelected.stake / 100 +
                "&currency=" + betDetailsSelected.currency +
                "&whenplaced=" + betDetailsSelected.placed +
                "&whensettled=" + betDetailsSelected.settled +
                "&status=" + betDetailsSelected.status +
                "&returns=" + betDetailsSelected.winnings / 100 +
                "&numReelResults=" + numReelResultsData.length +
                "&spinIds=" + numReelResultsData[index].id +
                // "&listSpinTypes=" + this.props.langObj["bet-history_spin-type_" + numReelResultsData[0].type] +
                "&listSpinTypes=" + numReelResultsData[index].type +
                "&buyInPrice=" + (betDetailsSelected.buyInPrice !== undefined ? betDetailsSelected.buyInPrice / 100 : undefined) +
                "&inGame=true";
            if (betDetailsSelected.mobile_desktop == 1) {
                queryString = queryString + "&channel=desktop"
            } else {
                queryString = queryString + "&channel=mobile"
            }
            e.queryString = queryString;
            this.setState(() => ({
                show: true,
                value: e,
                spn: false
            }));
        }
    }
    render() {
        if (!this.props.showBetHistory) {
            return (<></>)
        }
        if (isMobile) {
            this.showFixedPanelPage = true;
        }

        return (
            <div id={"BetHistoryUI"} className={!this.showFixedPanelPage ? "BetHistoryUIstyle-desktop" : "BetHistoryUIstyle"}>
                <div className={!this.showFixedPanelPage ? "BetHistoryUIstyle-child-desktop" : "BetHistoryUIstyle-child"} >
                    {!this.showFixedPanelPage && this.desktopView()}
                    {this.showFixedPanelPage && this.mobileView()}
                </div>
            </div>
        )
    }
}


export default withPixiApp(connect(
    (state: Pick<IStore, 'behaviourState' | 'asyncServerAction'>): IStateToProps =>
    ({
        showBetHistory: state.behaviourState.showBetHistory,
        allhistoryresult: state.asyncServerAction.allhistoryresult

    }),
    (dispatch: Dispatch): IDispatchToProps => ({

    }))(withAutoplayConfiguration(BetHistoryUI)));
