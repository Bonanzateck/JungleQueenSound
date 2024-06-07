import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { withCommonGameConfiguration ,layoutssActions} from "@bonanzainteractive/slote_core";
import { UIManager,GSAPTween,ItweenProps,GSAPTimer } from "@bonanzainteractive/core";

import { isMobile } from "react-device-detect";
import { configGame } from "../../slot/data/config";


interface IProps {
    [x: string]: any;
}

interface IStore {
    [x: string]: any;
}

interface IStateToProps {
    basegamestate: boolean,
    layoutMode: string,
    resizeWidth: any,   //not used
    inFreeGame: boolean
}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class GofCommonGame extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected gofCommonGameContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: Object[] = [];
    protected cloudScale: number = 1.6;
    protected cloudAInitialX: number = -711;
    protected cloudBInitialX: number = 565;
    protected cloudALastX: number = 590;
    protected cloudBLastX: number = 1700;
    protected timerAmount: number = 100;
    protected thunderTimerAmount: number = 10000;
    protected thunderDelayAmount: number = 2000;
    protected thunderReactWidth: number = 160;
    protected thunderReactHeight: number = 100;
    protected thunderReactX: number = 950;
    protected thunderReactY: number = 100;
    protected thunderPortraitReactX: number = 685;
    protected thunderPortraitReactY: number = 713;
    protected rotationMultiplyValue: number = 50;
    protected colorCode: any = '0xDE3249';
    private portrait: boolean = false;
    private AllTimer: any[] = [];
    private UIManagerRef: any;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            uiElements: [],
            lang: "en",
            width: this.props.width,
            height: this.props.height,
            pixelRatio: window.devicePixelRatio,
            resizing: false,
        }
        this.portrait = this.props.layoutMode === 'Portrait' ? true : false;
        this.gofCommonGameContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }
        this.displayUI = this.props.child.filter(this.checkUiMode.bind(this));
        this.UIManagerRef = UIManager.getRef;
    }

    checkUiMode(uimodeobj: any) {
        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both";
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    bindUI() {
        this.layoutChange(this.props.layoutMode);
        this.imageChangingMethod();
    }

    layoutChange(currentLayout: string) {
        this.displayUI.forEach((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        }
        )
    }

    imageChangingMethod() {
        if (this.props.basegamestate) {
            if (this.ui_mode === "mobile") {
                if (!this.portrait) {
                    this.UIManagerRef("image_freegame-fg1").visible = false;
                    this.UIManagerRef("image_basegame-bg1").visible = true;
                    this.UIManagerRef("image_basegameSky-bg_mobile").visible = true;
                } else {
                    this.UIManagerRef("image_commongame-potrait-bg").visible = true;
                    this.UIManagerRef("image_commongame-potrait-fg").visible = false;
                }
            } else {
                this.UIManagerRef("image_freegame-fg").visible = false;
                this.UIManagerRef("image_basegame-bg").visible = true;
                this.UIManagerRef("image_basegameSky-bg_desktop").visible = true;
            }
        } else {
            if (this.ui_mode === "mobile") {
                if (window.innerWidth > window.innerHeight) {
                    this.UIManagerRef("image_freegame-fg1").visible = true;
                    this.UIManagerRef("image_basegame-bg1").visible = false;
                    this.UIManagerRef("image_basegameSky-bg_mobile").visible = false;
                } else {
                    this.UIManagerRef("image_commongame-potrait-bg").visible = false;
                    this.UIManagerRef("image_commongame-potrait-fg").visible = true;
                }
            } else {
                this.UIManagerRef("image_freegame-fg").visible = true;
                this.UIManagerRef("image_basegame-bg").visible = false;
                this.UIManagerRef("image_basegameSky-bg_desktop").visible = false;
            }
        }
    }

    movingCloud() {
        let cloud_A_Image = this.UIManagerRef("image_cloud_a_" + this.ui_mode);
        let cloud_B_Image = this.UIManagerRef("image_cloud_b_" + this.ui_mode);
        cloud_A_Image.x += this.cloudScale;
        cloud_B_Image.x += this.cloudScale;
        if (cloud_A_Image.x > this.cloudALastX) {
            cloud_A_Image.x = this.cloudAInitialX;
        }
        if (cloud_B_Image.x > this.cloudBLastX) {
            cloud_B_Image.x = this.cloudBInitialX;
        }
    }

    addCloudTween(displayObj: any, endPoint: any, initialPoint: any) {
        if (displayObj) {
            const tweenProps: ItweenProps = {
                x: endPoint,
                duration: 30 / 1000,
                onUpdate: () => {

                },
                onComplete: () => {
                    displayObj.x = initialPoint;
                    this.addCloudTween(displayObj, endPoint, initialPoint);
                    GSAPTween.getInstance().killTween(displayObj);
                }
            }
            GSAPTween.getInstance().gsapTween(displayObj, tweenProps);
        }
    }

    componentDidMount() {
        this.bindUI();
        this.movingCloudFun();

        GSAPTimer.getInstance().addTimer(50 / 1000, () => {
            this.bindUI();
        });
    }

    movingCloudFun() {
        GSAPTimer.getInstance().addTimer(0.1, () => {
            if (window.innerWidth > window.innerHeight) {
                this.movingCloud();
                this.movingCloudFun();
            }
        });
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.layoutMode !== this.props.layoutMode
            || nextProps.basegamestate !== this.props.basegamestate
            || nextProps.inFreeGame !== this.props.inFreeGame
        ) {
            if (nextProps.layoutMode !== this.props.layoutMode) {
                this.portrait = nextProps.layoutMode === 'Portrait' ? true : false;
                this.layoutChange(nextProps.layoutMode);
                GSAPTimer.getInstance().addTimer(200 / 1000, () => {
                    this.imageChangingMethod();
                });
                return false;
            }

            if (nextProps.inFreeGame) {
                this.imageChangingMethod();
            }

            if (nextProps.basegamestate) {
                if (isMobile) {
                    if (window.innerWidth > window.innerHeight) {
                        this.UIManagerRef("image_freegame-fg1").visible = false;
                        this.UIManagerRef("image_basegame-bg1").visible = true;
                        this.UIManagerRef("image_basegameSky-bg_mobile").visible = true;
                    } else {
                        this.UIManagerRef("image_commongame-potrait-bg").visible = true;
                        this.UIManagerRef("image_commongame-potrait-fg").visible = false;
                    }
                } else {
                    this.UIManagerRef("image_freegame-fg").visible = false;
                    this.UIManagerRef("image_basegame-bg").visible = true;
                    this.UIManagerRef("image_basegameSky-bg_desktop").visible = true;
                }
                if (window.innerWidth > window.innerHeight) {
                    GSAPTimer.getInstance().addRepeatTimer((this.timerAmount * 2) / 1000, () => {
                        if (window.innerWidth > window.innerHeight) {
                            if (!this.props.basegamestate) {
                                this.UIManagerRef("image_cloud_a_" + this.ui_mode).visible = false;
                                this.UIManagerRef("image_cloud_b_" + this.ui_mode).visible = false;

                            } else {
                                this.UIManagerRef("image_cloud_a_" + this.ui_mode).visible = true;
                                this.UIManagerRef("image_cloud_b_" + this.ui_mode).visible = true;
                                this.movingCloud();
                            }
                        }
                    }, () => {
                    });
                }
            }
            if (!nextProps.basegamestate) {
                if (isMobile) {
                    if (window.innerWidth > window.innerHeight) {
                        this.UIManagerRef("image_freegame-fg1").visible = true;
                        // this.UIManagerRef("image_freegameTop-fg_mobile").visible = true;
                        this.UIManagerRef("image_basegame-bg1").visible = false;
                        this.UIManagerRef("image_basegameSky-bg_mobile").visible = false;
                    } else {
                        this.UIManagerRef("image_commongame-potrait-bg").visible = false;
                        this.UIManagerRef("image_commongame-potrait-fg").visible = true;
                    }
                } else {
                    this.UIManagerRef("image_freegame-fg").visible = true;
                    // this.UIManagerRef("image_freegameTop-fg_desktop").visible = true;
                    this.UIManagerRef("image_basegame-bg").visible = false;
                    this.UIManagerRef("image_basegameSky-bg_desktop").visible = false;
                }
                if (!isMobile || (isMobile && window.innerWidth > window.innerHeight)) {
                    // this.thunderWithChangingBg();
                }
            }
            if (!nextProps.basegamestate || window.innerWidth < window.innerHeight) {
                this.UIManagerRef("image_cloud_a_" + this.ui_mode).visible = false;
                this.UIManagerRef("image_cloud_b_" + this.ui_mode).visible = false;
            }
            return false;
        }
        return true;
    }
  

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        this.imageChangingMethod.call(this);
        if (!this.props.basegamestate || window.innerWidth < window.innerHeight) {
            this.UIManagerRef("image_cloud_a_" + this.ui_mode).visible = false;
            this.UIManagerRef("image_cloud_b_" + this.ui_mode).visible = false;
        }
    }

    render() {
        return (
            <UIManager id={"gofCommonGameContainer"} name={"gofCommonGameContainer"} type={"Container"} app={this.app}
                ref={i => this.gofCommonGameContainer = i} configGame={configGame}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            app={this.app} configGame={configGame}
                            id={i.id} {...i} />)
                }
            </UIManager>)
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'basegameState' | 'applicationState' | 'freegameState'>): IStateToProps =>
    ({
        basegamestate: state.basegameState.basegamestate,
        layoutMode: state.applicationState.layoutMode,
        resizeWidth: state.applicationState.resizeWidth,
        inFreeGame: state.freegameState.inFreeGame,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
    }))(withCommonGameConfiguration(GofCommonGame)));
