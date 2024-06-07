import React, { Component } from "react";
import { withPixiApp } from "@inlet/react-pixi";
import withMenuConfiguration from "./configuration/withMenuConfiguration";
import * as PIXI from "pixi.js";
import { connect } from "react-redux";
import { IStore } from "../../core/store/IStore";
import { Dispatch } from "redux";
import { isMobile } from "react-device-detect";
import { buttonActions , soundActions } from "@bonanzainteractive/slote_core";
import { actions as menuActions } from "../../core/reducers/menuReducer";

interface IProps {
    [x: string]: any;
}

interface IState {
}

interface IState {
    isGameLoaded: boolean,
    width: number | string,
    height: number | string,
    pixelRatio: number,
    buttonSelected: any,

}

interface IStateToProps {

}

interface IDispatchToProps {

}

class Menu extends Component<IProps, IState> {
    protected app: PIXI.Application;

    protected autoplayContainer: any;
    protected scope: any;
    protected showFixedPanelPage: boolean;
    protected outerBorderColor: any;
    protected textColor: any;
    protected mainContainerBgColor: any;
    protected insideContainerBgColor: any;
    protected borderColorOfInsideContainer: any;

    constructor(props: IProps) {
        super(props);

        this.app = props.app;
        // this.autoplayContainer = React.createRef();
        this.autoplayContainer = {};
        this.state = {
            width: this.props.width,
            height: this.props.height,
            pixelRatio: 1,
            isGameLoaded: false,
            buttonSelected: "",
        }
        this.showFixedPanelPage = false
        this.outerBorderColor = '#ffffff'
        this.textColor = '#f5f3ec'
        this.mainContainerBgColor = '#000000'
        this.insideContainerBgColor = '#232222'
        this.borderColorOfInsideContainer = '#808080'

    }

    reset() {
        this.setState((prevState) => {
            return {
                ...prevState,


            }
        })
    }

    onClick(name: any, value: any) {

        this.setState((prevState) => {
            return {
                ...prevState,
                // selectedautoplayCount: value,
                buttonSelected: name,
                // enableOk: true,

            }
        })

    }


    updateDimensions = () => {

        this.setState((prevState) => {
            return {
                ...prevState,
                width: isMobile && window.screen.availWidth || window.innerWidth,
                height: isMobile && window.screen.availHeight || window.innerHeight,
                pixelRatio: window.devicePixelRatio
            }
        })


    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }


    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        return true;
    }

    mobileViewMenu() {
        return (
           <></>
        )
    }

    render() {
        if (!this.props.showMenu) {
            return (<></>)
        }
        if (isMobile) {
            this.showFixedPanelPage = true
        }
        
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'menuState' | 'soundState' | 'applicationState'>): IStateToProps =>
    ({
        showMenu: state.menuState.showMenu,
        allSoundBGMStop: state.soundState.allSoundBGMStop,
        allSoundSFXStop: state.soundState.allSoundSFXStop,
        scaleY: state.applicationState.scaleY,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        hideMenuUI: (): any => dispatch(menuActions.hideMenuUI()),
        stopAllBGMSound: (stopAllBgSound: boolean): any => dispatch(soundActions.stopAllBGMSound(stopAllBgSound)),
        stopAllSFXSound: (stopAllSfxSound: boolean): any => dispatch(soundActions.stopAllSFXSound(stopAllSfxSound)),


    }))(withMenuConfiguration(Menu)));