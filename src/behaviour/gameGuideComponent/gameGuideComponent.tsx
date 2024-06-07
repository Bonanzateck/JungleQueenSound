import React, { Component } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withHelpConfiguration from "../../components/help/configuration/withHelpConfiguration";
import { isMobile } from "react-device-detect";
import * as PIXI from "pixi.js";
import { buttonActions, applicationActions } from "@bonanzainteractive/slote_core";
import { configGame } from "../../slot/data/config";
import { actions as behaviourAction } from '../../gamereducer/behaviourReducer';
import { CURRENCY } from "@bonanzainteractive/core";

interface IStore {
    [x: string]: any;
}
interface IProps {
    [x: string]: any;
}
interface IStateToProps {
    showHelpText: boolean;
    storeRtp: string;
    betList: string;
    layoutMode: string;
    jurisdictionKey: string;
    enableAutoPlay: boolean;
    gameVersion: string;
}
interface IDispatchToProps {
}
interface IState {
    [x: string]: any;
}

class GameGuideComponent extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected showFixedPanelPage: boolean;
    protected showFixedPanelPagePort: boolean;
    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            lang: "en",
        }
        this.showFixedPanelPage = false;
        this.showFixedPanelPagePort = false;
    }

    helpTextDisplayFunctionality(buttonName: string) {
        this.props.setApplicationButtonClicked(true);
        this.props.setApplicationButtonClicked(false);
        this.props.buttonClickedName(buttonName);
        this.props.setApplicationShowHelpText(false);
        this.props.setAllButtonEnable();
    }
    shouldComponentUpdate(nextProps: Readonly<IProps>): boolean {
        if (nextProps.layoutMode !== this.props.layoutMode) {
            if (window.innerHeight > window.innerWidth) {
                this.showFixedPanelPagePort = true;
            } else {
                this.showFixedPanelPagePort = false;
            }
            return true;
        }
        if (nextProps.showHelpText !== this.props.showHelpText) {
            return true;
        }
        return false;
    }

    render() {
        const { showHelpText, langObj, storeRtp, betList, enableAutoPlay, jurisdictionKey, gameVersion } = this.props;
        if (!showHelpText) {
            return (<></>)
        }
        if (isMobile) {
            this.showFixedPanelPage = true;
            if (window.innerHeight > window.innerWidth) {
                this.showFixedPanelPagePort = true;
            }
        }
        return (
            <div style={{ width: "100%", height: !this.showFixedPanelPage ? "100%" : "95.8%", backgroundColor: " rgba(0,0,0,0.85)" }} className="helptext_cls">
                {!this.showFixedPanelPage ? <div className="help_text_container_box">
                    <span className="cancle_btn" onClick={() => this.helpTextDisplayFunctionality("cancle_btn")}></span>
                    <div className="help_text_container">
                        {/* <h1 className="S0H1">{langObj["gameGuideintro1"]}</h1> */}
                        {/* <p className="S1P1">{langObj["gameGuideintro1_1"]}</p> */}
                        <div className="S0I1" id="image gamescreen">
                        </div>
                        {/* <h1 className="S1H1" id="gameGuideHeading">1. {langObj["gameGuideHeading2"]}</h1> */}
                        <div className="overview_en">
                            {/* <h2 className="S1H2">1.1 {langObj["gameGuideText2_1"]}</h2> */}
                            {/* <p className="S1P1">{langObj["gameGuideText2_2"]} {configGame.REEL_COLUMN}</p> */}
                            {/* <p className="S1P1">{langObj["gameGuideText2_3"]}</p> */}
                            {/* <p className="S1P1">{langObj["gameGuideText2_4"]}</p> */}
                            {/* <p className="S1P1">{langObj["gameGuideText2_5"]}</p> */}
                            {/* <p className="S1P1">{langObj["gameGuideText2_6"]}</p> */}
                            {/* <p className="S1P1">{langObj["gameGuideText2_7"]} {storeRtp}</p> */}
                            {/* <p className="S1P1">{langObj["gameGuideText2_8"]} {CURRENCY.CurrencyManager.formatCurrencyString(betList[0] / 100, true, true, true, true)}</p> */}
                            {/* <p className="S1P1">{langObj["gameGuideText2_9"]} {CURRENCY.CurrencyManager.formatCurrencyString(betList[betList.length - 1] / 100, true, true, true, true)}</p> */}
                        </div>
                        <br />
                        {/* <h2 className="S1H3">1.2 {langObj["gameGuideHeading3"]}</h2> */}
                        {/* <p className="S1P1">{langObj["gameGuideText3_1"]}</p> */}
                        <img src="HD\assets\paytable\lady.webp" height="12%" width="10%" alt="img1" draggable="false"></img>
                        <img src="HD\assets\paytable\red_sym.webp" height="16%" width="9%" alt="img1" draggable="false"></img>
                        <img src="HD\assets\paytable\blue_sym.webp" height="17%" width="9%" alt="img1" draggable="false"></img>
                        <img src="HD\assets\paytable\green_sym.webp" height="19%" width="9%" alt="img1" draggable="false"></img>
                        <img src="HD\assets\paytable\a.webp" height="10%" width="8%" alt="img1" draggable="false"></img>
                        <img src="HD\assets\paytable\k.webp" height="10%" width="8%" alt="img1" draggable="false"></img>
                        <img src="HD\assets\paytable\q.webp" height="10%" width="8%" alt="img1" draggable="false"></img>
                        <img src="HD\assets\paytable\j.webp" height="10%" width="8%" alt="img1" draggable="false"></img>
                        <img src="HD\assets\paytable\10.webp" height="10%" width="8%" alt="img1" draggable="false"></img>
                        <img src="HD\assets\paytable\9.webp" height="12%" width="10%" alt="img1" draggable="false"></img>
                        {/* <p className="S1P1">{langObj["gameGuideText3_2"]}</p> */}
                        <img src="HD\assets\paytable\wild.webp" height="30%" width="20%" alt="img1" draggable="false"></img>
                        <br></br><br></br>
                        {/* <h2 className="S1H3">1.3 {langObj["gameGuideHeading4"]}</h2> */}
                        {/* <p className="S1P1"> {langObj["gameGuideText4_1"]}</p> */}
                        <img src="HD\assets\paytable\cavereel.webp" height="27%" width="70%" alt="img1" draggable="false"></img>
                        <br></br><br></br>
                        {/* <h2 className="S1H3">1.4 {langObj["gameGuideHeading5"]}</h2> */}
                        {/* <p className="S1P1">{langObj["gameGuideText5_1"]}</p> */}
                        <br></br>
                        {/* <h2 className="S1H3">1.5 {langObj["gameGuideHeading6"]}</h2>
                        <p className="S1P1">{langObj["gameGuideText6_1"]}</p> */}
                        <img src="HD\assets\paytable\fire_sym.webp" height="37%" width="50%" alt="img1" draggable="false"></img>
                        {/* <p className="S1P1">{langObj["gameGuideText6_2"]}</p> */}
                        <img src="HD\assets\paytable\5.webp" height="37%" width="11.8%" alt="img1" draggable="false"></img>
                        <br></br>  <br></br>
                        {/* <h2 className="S1H3">1.6 {langObj["gameGuideHeading7"]}</h2>
                        <p className="S1P1">{langObj["gameGuideText7_1"]}</p> */}
                        <img src="HD\assets\paytable\freegame_screen.webp" height="40%" width="40%" alt="img1" draggable="false"></img>
                        <br></br>   <br></br>
                        {/* <h2 className="S1H3">1.7 {langObj["gameGuideHeading8"]}</h2>
                        <p className="S1P1">{langObj["gameGuideText8_1"]}</p>
                        <p className="S1P1">{langObj["gameGuideText8_2"]}</p>
                        <p className="S1P1">{langObj["gameGuideText8_3"]}</p> */}
                        <img src="HD\assets\paytable\scatter.webp" height="38%" width="30%" alt="img1" draggable="false" style={{ marginLeft: "-2.6%" }}></img>
                        <br />
                        {/* <h1 className="S2H1">2. {langObj["gameGuideHeading9_0"]}</h1>
                        <p className="S2P1">{langObj["gameGuideHeading9_1_1"]}</p>
                        <p className="S2P1">{langObj["gameGuideHeading9_1_2"]}</p> */}

                        {
                            // (jurisdictionKey !== "social") ? <p className="S2P1">{langObj["gameGuideHeading9_1_2_0"]}</p> : " "
                        }
                        {/* <p className="S2P1">{langObj["gameGuideHeading9_1_3"]}</p>
                        <p className="S2P1">{langObj["gameGuideHeading9_1_4"]}</p>
                        <p className="S2P1">{langObj["gameGuideHeading9_1_5"]}</p>
                        <p className="S2P1">{langObj["gameGuideHeading9_1_6"]}</p>
                        <p className="S2P1">{langObj["gameGuideHeading9_1_7"]}</p> */}
                        {
                            // enableAutoPlay ? <p className="S2P1">{langObj["gameGuideHeading9_1_8"]}</p> : ""
                        }
                        {/* <p className="S2P1">{langObj["gameGuideHeading9_1_9"]}</p>
                        <p className="S2P1">{langObj["gameGuideHeading9_1_10"]}</p> */}
                        {
                            // (jurisdictionKey !== "social") ? <p className="S2P1">{langObj["gameGuideHeading9_1_11"]}</p> : ""
                        }

                        {/* <p className="S2P1">{langObj["gameGuideHeading9_1_12"]}</p>
                        <br></br>
                        <h1 className="S2H1">3. {langObj["gameGuideHeading9"]}</h1>
                        <p className="S2P1">{langObj["gameGuideText9_1"]}</p>
                        <p className="S2P1">{langObj["gameGuideText9_2"]}</p>
                        <p className="S2P1">{langObj["gameGuideText9_3"]}</p>
                        <p className="S2P1">{langObj["gameGuideText9_4"]}</p>
                        <p className="S2P1">{langObj["gameGuideText9_5"]}</p>
                        <p className="S2P1">{langObj["gameGuideText9_6"]}</p>
                        <p className="S2P1">{langObj["gameGuideText9_7"]}</p> */}
                        <br></br>
                        <img src="HD\assets\paytable\basegame_screen.webp" height="40%" width="40%" alt="img1" draggable="false"></img>
                        <br></br><br></br>
                        {/* <h2 className="S3H2">4. {langObj["gameGuideHeading10"]}</h2> */}
                        <div className="cnt_elements">
                            {/* <p className="S2P1">{langObj["gameGuideText10_1"]}</p>
                            <p className="S2P1">{langObj["gameGuideText10_2"]}</p>
                            <p className="S2P1">{langObj["gameGuideText10_3"]}</p>
                            <p className="S2P1">{langObj["gameGuideText10_4"]}</p>
                            <p className="S2P1">{langObj["gameGuideText10_5"]}</p> */}
                        </div>
                        <br />
                        {/* <h3 className="shAll" >4.1 {langObj["gameGuideText10_6"]}</h3> */}
                        <div className="cnt_elements">
                            {/* <p className="S2P1">{langObj["gameGuideText10_7"]}</p>
                            <p className="S2P1">{langObj["gameGuideText10_8"]}</p>
                            <p className="S2P1">{langObj["gameGuideText10_9"]}</p>
                            <p className="S2P1">{langObj["gameGuideText10_10"]}</p>
                            <p className="S2P1">{langObj["gameGuideText10_11"]}</p> */}
                        </div>
                        <br />
                        {
                            enableAutoPlay ? <>
                                {/* <h2 className="S3H3">5. {langObj["gameGuideHeading11"]}</h2> */}
                                <div className="cnt_elements">
                                    {/* <p className="S2P1">{langObj["gameGuideText11_0"]}</p>
                                    <p className="S2P1">{langObj["gameGuideText11_1"]}</p>
                                    <p className="S2P1">{langObj["gameGuideText11_2"]}</p>
                                    <p className="S2P1">{langObj["gameGuideText11_3"]}</p>
                                    <p className="S2P1">{langObj["gameGuideText11_4"]}</p> */}
                                </div>
                                <br />
                                {/* <h2 className="shAll">5.1  {langObj["gameGuideHeading12"]}</h2> */}
                                <div className="cnt_elements">
                                    {/* <p className="S2P1">{langObj["gameGuideText12_1"]}</p> */}
                                    {/* <p className="S2P1">{langObj["gameGuideText12_2"]}</p> */}
                                </div>
                                <br />
                                {/* <h2 className="shAll" >5.2  {langObj["gameGuideHeading13"]}</h2> */}
                                <div className="cnt_elements">
                                    {/* <p className="S2P1">{langObj["gameGuideText13_1"]}</p>
                                    <p className="S2P1">{langObj["gameGuideText13_2"]}</p>
                                    <p className="S2P1">{langObj["gameGuideText13_3"]}</p>
                                    <p className="S2P1">{langObj["gameGuideText13_4"]}</p>
                                    <p className="S2P1">{langObj["gameGuideText13_5"]}</p>
                                    <p className="S2P1">{langObj["gameGuideText13_6"]}</p>
                                    <p className="S2P1">{langObj["gameGuideText13_7"]}</p>
                                    <p className="S2P1">{langObj["gameGuideText13_8"]}</p>
                                    <p className="S2P1">{langObj["gameGuideText13_9"]}</p>
                                    <p className="S2P1">{langObj["gameGuideText13_10"]}</p> */}
                                </div>
                                <br />
                                {/* <h2 className="shAll" >5.3 {langObj["gameGuideHeading14"]}</h2> */}
                                <div className="cnt_elements">
                                    {/* <p className="S2P1">{langObj["gameGuideText14_1"]}</p> */}
                                    {/* <p className="S2P1">{langObj["gameGuideText14_2"]}</p> */}
                                </div>
                                <br />
                            </> : ""
                        }
                        {/* <h2 className="S3H3">{enableAutoPlay ? 6 : 5}. {langObj["gameGuideHeading15"]}</h2> */}

                        <div className="cnt_elements1">
                            {/* <p className="S2P1">{langObj["gameGuideText15_1"]}</p> */}
                            <ul>
                                {/* <li className="S2P1">{langObj["gameGuideText15_2"]}</li>
                                <li className="S2P1">{langObj["gameGuideText15_3"]}</li>
                                <li className="S2P1">{langObj["gameGuideText15_4"]}</li>
                                <li className="S2P1">{langObj["gameGuideText15_5"]}</li>
                                <li className="S2P1">{langObj["gameGuideText15_6"]}</li>
                                <li className="S2P1">{langObj["gameGuideText15_7"]}</li>
                                <li className="S2P1">{langObj["gameGuideText15_8"]}</li> */}
                            </ul>
                        </div>
                        <br></br>
                        <div className="SSES">
                            <p className="SRTP">
                                <i>
                                    {/* {langObj["gameGuideText16"]}  {storeRtp}{"."}<br /> */}
                                    {/* {langObj["gameGuideText16_1"]}<br /> */}
                                    {/* {langObj["gameGuideText17"]} */}
                                </i>
                                <br></br><br></br>
                                {/* <span> {langObj["gameGuideText18"]}</span> */}
                            </p>
                        </div>
                        <div className="VTEXT">
                            <p className="VERSION"> {gameVersion}</p>
                        </div>
                    </div>
                </div> : <div className="help_text_container_box_mob">
                    <div className="help_text_container_mob">
                        <h1 className="S0H1">{langObj["gameGuideintro1"]}</h1>
                        <p className="S2P11">{langObj["gameGuideintro1_1"]}</p>
                        <div className="S0I1" id="image gamescreen">

                        </div>
                        <h1 className="S1H1" id="gameGuideHeading">1. {langObj["gameGuideHeading2"]}</h1>
                        <div className="overview_en">
                            <h2 className="S1H2">1.1 {langObj["gameGuideText2_1"]}</h2>
                            <p className="S2P11">{langObj["gameGuideText2_2"]} {configGame.REEL_COLUMN}</p>
                            <p className="S2P11">{langObj["gameGuideText2_3"]}</p>
                            <p className="S2P11">{langObj["gameGuideText2_4"]}</p>
                            <p className="S2P11">{langObj["gameGuideText2_5"]}</p>
                            <p className="S2P11">{langObj["gameGuideText2_6"]}</p>
                            <p className="S2P11">{langObj["gameGuideText2_7"]} {storeRtp}</p>
                            <p className="S2P11">{langObj["gameGuideText2_8"]} {CURRENCY.CurrencyManager.formatCurrencyString(betList[0] / 100, true, true, true, true)}</p>
                            <p className="S2P11">{langObj["gameGuideText2_9"]} {CURRENCY.CurrencyManager.formatCurrencyString(betList[betList.length - 1] / 100, true, true, true, true)}</p>
                        </div>
                        <br />
                        <h2 className="S1H3">1.2 {langObj["gameGuideHeading3"]}</h2>
                        <p className="S2P11">{langObj["gameGuideText3_1"]}</p>
                        {
                            !this.showFixedPanelPagePort ? <div className="imgboxx">
                                <img src="LD\assets\paytable\lady.webp" height="12%" width="10%" alt="img1" ></img>
                                <img src="LD\assets\paytable\red_sym.webp" height="14%" width="10%" alt="img1"></img>
                                <img src="LD\assets\paytable\blue_sym.webp" height="14%" width="10%" alt="img1"></img>
                                <img src="LD\assets\paytable\green_sym.webp" height="14%" width="10%" alt="img1"></img>
                                <img src="LD\assets\paytable\a.webp" height="10%" width="8%" alt="img1"></img>
                                <img src="LD\assets\paytable\k.webp" height="10%" width="8%" alt="img1"></img>
                                <img src="LD\assets\paytable\q.webp" height="10%" width="8%" alt="img1"></img>
                                <img src="LD\assets\paytable\j.webp" height="10%" width="8%" alt="img1"></img>
                                <img src="LD\assets\paytable\10.webp" height="10%" width="8%" alt="img1"></img>
                                <img src="LD\assets\paytable\9.webp" height="12%" width="10%" alt="img1"></img>
                            </div> : <>
                                <img src="LD\assets\paytable\lady.webp" height="14%" width="17%" alt="img1"></img>
                                <img src="LD\assets\paytable\red_sym.webp" height="14%" width="16%" alt="img1"></img>
                                <img src="LD\assets\paytable\blue_sym.webp" height="14%" width="15%" alt="img1"></img>
                                <img src="LD\assets\paytable\green_sym.webp" height="14%" width="15%" alt="img1"></img>
                                <img src="LD\assets\paytable\a.webp" height="10%" width="15%" alt="img1"></img>
                                <img src="LD\assets\paytable\k.webp" height="10%" width="15%" alt="img1"></img><br></br>
                                <img src="LD\assets\paytable\q.webp" height="10%" width="15%" alt="img1"></img>
                                <img src="LD\assets\paytable\j.webp" height="10%" width="15%" alt="img1"></img>
                                <img src="LD\assets\paytable\10.webp" height="10%" width="15%" alt="img1"></img>
                                <img src="LD\assets\paytable\9.webp" height="12%" width="15%" alt="img1"></img>
                            </>
                        }
                        <p className="S2P11">{langObj["gameGuideText3_2"]}</p>
                        {
                            this.showFixedPanelPagePort ? <img src="LD\assets\paytable\wild.webp" alt="img1" height="22%" width="30%"></img> : <img src="LD\assets\paytable\wild.webp" height="48%" width="17%" alt="img1" ></img>
                        }
                        <br></br><br></br>
                        <h2 className="S1H3">1.3 {langObj["gameGuideHeading4"]}</h2>
                        <p className="S2P11"> {langObj["gameGuideText4_1"]}</p>
                        {
                            this.showFixedPanelPagePort ? <img src="LD\assets\paytable\cavereel.webp" height="19%" width="97%" alt="img1" ></img> : <img src="LD\assets\paytable\cavereel.webp" height="70%" width="92%" alt="img1" ></img>
                        }

                        <br></br><br></br>
                        <h2 className="S1H3">1.4 {langObj["gameGuideHeading5"]}</h2>
                        <p className="S2P11">{langObj["gameGuideText5_1"]}</p>
                        <br></br>
                        <h2 className="S1H3">1.5 {langObj["gameGuideHeading6"]}</h2>
                        <p className="S2P11">{langObj["gameGuideText6_1"]}</p>
                        {
                            this.showFixedPanelPagePort ? <img src="LD\assets\paytable\fire_sym.webp" alt="img1" height="28%" width="97%" className="help_img_box1"></img> : <img src="LD\assets\paytable\fire_sym.webp" alt="img1" height="70%" width="60%" className="help_img_box1"></img>
                        }

                        <p className="S2P11">{langObj["gameGuideText6_2"]}</p>
                        {
                            this.showFixedPanelPagePort ? <img src="LD\assets\paytable\5.webp" alt="img1" height="28%" width="23%" className="help_img_box1"></img> : <img src="LD\assets\paytable\5.webp" alt="img1" height="70%" width="14%" className="help_img_box1"></img>
                        }

                        <br></br><br></br>
                        <h2 className="S1H3">1.6 {langObj["gameGuideHeading7"]}</h2>
                        <p className="S2P11">{langObj["gameGuideText7_1"]}</p>
                        {
                            this.showFixedPanelPagePort ? <img src="LD\assets\paytable\freegame_screen.webp" alt="img1" height="33%" width="75%" ></img> : <img src="LD\assets\paytable\freegame_screen.webp" alt="img1" height="90%" width="50%" ></img>
                        }

                        <br></br><br></br>
                        <h2 className="S1H3">1.7 {langObj["gameGuideHeading8"]}</h2>
                        <p className="S2P11">{langObj["gameGuideText8_1"]}</p>
                        <p className="S2P11">{langObj["gameGuideText8_2"]}</p>
                        <p className="S2P11">{langObj["gameGuideText8_3"]}</p>
                        {
                            this.showFixedPanelPagePort ? <img src="LD\assets\paytable\scatter.webp" alt="img1" height="33%" width="55%" style={{ marginLeft: "-4.7%" }}></img> : <img src="LD\assets\paytable\scatter.webp" alt="img1" height="83%" width="35%" style={{ marginLeft: "-3%" }} ></img>
                        }

                        <br></br><br></br>
                        <h1 className="S2H1">2. {langObj["gameGuideHeading9_0"]}</h1>
                        <p className="S2P11">{langObj["gameGuideHeading9_1_1"]}</p>
                        <p className="S2P11">{langObj["gameGuideHeading9_1_2"]}</p>
                        {
                            (jurisdictionKey !== "social") ? <p className="S2P11">{langObj["gameGuideHeading9_1_2_0"]}</p> : " "
                        }

                        <p className="S2P11">{langObj["gameGuideHeading9_1_3"]}</p>
                        <p className="S2P11">{langObj["gameGuideHeading9_1_4"]}</p>
                        <p className="S2P11">{langObj["gameGuideHeading9_1_5"]}</p>
                        <p className="S2P11">{langObj["gameGuideHeading9_1_6"]}</p>
                        <p className="S2P11">{langObj["gameGuideHeading9_1_7"]}</p>
                        {
                            enableAutoPlay ? <p className="S2P11">{langObj["gameGuideHeading9_1_8"]}</p> : ""
                        }
                        <p className="S2P11">{langObj["gameGuideHeading9_1_9"]}</p>
                        <p className="S2P11">{langObj["gameGuideHeading9_1_10"]}</p>
                        {
                            (jurisdictionKey !== "social") ? <p className="S2P11">{langObj["gameGuideHeading9_1_11"]}</p> : " "
                        }

                        <p className="S2P11">{langObj["gameGuideHeading9_1_12"]}</p>
                        <br></br>
                        <h1 className="S2H1">3. {langObj["gameGuideHeading9"]}</h1>
                        <p className="S2P11">{langObj["gameGgameGuideText9_1uideText2_0"]}</p>
                        <p className="S2P11">{langObj["gameGuideText9_2"]}</p>
                        <p className="S2P11">{langObj["gameGuideText9_3"]}</p>
                        <p className="S2P11">{langObj["gameGuideText9_4"]}</p>
                        <p className="S2P11">{langObj["gameGuideText9_5"]}</p>
                        <p className="S2P11">{langObj["gameGuideText9_6"]}</p>
                        <p className="S2P11">{langObj["gameGuideText9_7"]}</p>
                        {
                            this.showFixedPanelPagePort ? <img src="LD\assets\paytable\basegame_screen.webp" alt="img1" height="33%" width="75%" ></img> : <img src="LD\assets\paytable\basegame_screen.webp" alt="img1" height="90%" width="50%"  ></img>
                        }
                        <br></br><br></br>
                        <h2 className="S3H2">4. {langObj["gameGuideHeading10"]}</h2>
                        <div className="cnt_elements">
                            <p className="S2P11">{langObj["gameGuideText10_1"]}</p>
                            <p className="S2P11">{langObj["gameGuideText10_2"]}</p>
                            <p className="S2P11">{langObj["gameGuideText10_3"]}</p>
                            <p className="S2P11">{langObj["gameGuideText10_4"]}</p>
                            <p className="S2P11">{langObj["gameGuideText10_5"]}</p> </div>
                        <br></br>
                        <h3 className="shAll" >4.1 {langObj["gameGuideText10_6"]}</h3>
                        <div className="cnt_elements">
                            <p className="S2P11">{langObj["gameGuideText10_7"]}</p>
                            <p className="S2P11">{langObj["gameGuideText10_8"]}</p>
                            <p className="S2P11">{langObj["gameGuideText10_9"]}</p>
                            <p className="S2P11">{langObj["gameGuideText10_10"]}</p>
                            <p className="S2P11">{langObj["gameGuideText10_11"]}</p>
                        </div>
                        <br></br>
                        {
                            enableAutoPlay ? <>
                                <h2 className="S3H3">5. {langObj["gameGuideHeading11"]}</h2>
                                <div className="cnt_elements">
                                    <p className="S2P11">{langObj["gameGuideText11_0"]}</p>
                                    <p className="S2P11">{langObj["gameGuideText11_1"]}</p>
                                    <p className="S2P11">{langObj["gameGuideText11_2"]}</p>
                                    <p className="S2P11">{langObj["gameGuideText11_3"]}</p>
                                    <p className="S2P11">{langObj["gameGuideText11_4"]}</p>
                                </div>
                                <br></br>
                                <h2 className="shAll">5.1  {langObj["gameGuideHeading12"]}</h2>
                                <div className="cnt_elements">
                                    <p className="S2P11">{langObj["gameGuideText12_1"]}</p>
                                    <p className="S2P11">{langObj["gameGuideText12_2"]}</p>
                                </div>
                                <br></br>
                                <h2 className="shAll">5.2 {langObj["gameGuideHeading13"]}</h2>
                                <div className="cnt_elements">
                                    <p className="S2P11">{langObj["gameGuideText13_1"]}</p>
                                    <p className="S2P11">{langObj["gameGuideText13_2"]}</p>
                                    <p className="S2P11">{langObj["gameGuideText13_3"]}</p>
                                    <p className="S2P11">{langObj["gameGuideText13_4"]}</p>
                                    <p className="S2P11">{langObj["gameGuideText13_5"]}</p>
                                    <p className="S2P11">{langObj["gameGuideText13_6"]}</p>
                                    <p className="S2P11">{langObj["gameGuideText13_7"]}</p>
                                    <p className="S2P11">{langObj["gameGuideText13_8"]}</p>
                                    <p className="S2P11">{langObj["gameGuideText13_9"]}</p>
                                    <p className="S2P11">{langObj["gameGuideText13_10"]}</p>
                                </div>
                                <br></br>
                                <h2 className="shAll">5.3 {langObj["gameGuideHeading14"]}</h2>
                                <div className="cnt_elements">
                                    <p className="S2P11">{langObj["gameGuideText14_1"]}</p>
                                    <p className="S2P11">{langObj["gameGuideText14_2"]}</p>
                                </div><br />
                            </> : ""
                        }
                        <h2 className="S3H3">{enableAutoPlay ? 6 : 5}. {langObj["gameGuideHeading15"]}</h2>
                        <div className="cnt_elements1">
                            <p className="S2P11">{langObj["gameGuideText15_1"]}</p>
                            <ul>
                                <li className="S2P11">{langObj["gameGuideText15_2"]}</li>
                                <li className="S2P11">{langObj["gameGuideText15_3"]}</li>
                                <li className="S2P11">{langObj["gameGuideText15_4"]}</li>
                                <li className="S2P11">{langObj["gameGuideText15_5"]}</li>
                                <li className="S2P11">{langObj["gameGuideText15_6"]}</li>
                                <li className="S2P11">{langObj["gameGuideText15_7"]}</li>
                                <li className="S2P11">{langObj["gameGuideText15_8"]}</li>
                            </ul>

                        </div>
                        <br></br>
                        <div className="SSES">
                            <p className="SRTP">
                                <i>
                                    {langObj["gameGuideText16"]}  {storeRtp}{"."}<br />
                                    {langObj["gameGuideText16_1"]}<br />
                                    {langObj["gameGuideText17"]}
                                </i>
                                <br></br><br></br>
                                <span> {langObj["gameGuideText18"]}</span>
                            </p>
                        </div>
                        <div className="VTEXT">
                            <p className="VERSION"> {gameVersion}</p>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }

}

export default withPixiApp(connect(
    (state: Pick<IStore, | 'applicationState' | 'basegameState' | 'paytableBMState' | 'behaviourState'>): IStateToProps =>
    ({
        showHelpText: state.applicationState.showHelpText,
        storeRtp: state.paytableBMState.storeRtp,
        betList: state.basegameState.betList,
        layoutMode: state.applicationState.layoutMode,
        jurisdictionKey: state.applicationState.jurisdictionKey,
        enableAutoPlay: state.applicationState.enableAutoPlay,
        gameVersion: state.applicationState.gameVersion,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        setApplicationShowHelpText: (showHelpText: boolean): any => dispatch(applicationActions.setApplicationShowHelpText(showHelpText)),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        buttonClickedName: (clickedButtonName: string): any => dispatch(buttonActions.buttonClickedName(clickedButtonName)),
        realityCheckResume: (resumeRealityCheck: boolean): any => dispatch(behaviourAction.realityCheckResume(resumeRealityCheck)),
    }))(withHelpConfiguration(GameGuideComponent)));