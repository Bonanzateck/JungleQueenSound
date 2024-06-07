import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp, Container } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withLeftRevealMeterConfiguration from "./configuration/withLeftRevealMeterConfiguration";
import { UIManager, GSAPTimer, GSAPTween, ItweenProps } from "@bonanzainteractive/core";
import * as PIXI from 'pixi.js';
import { layoutssActions, soundActions } from "@bonanzainteractive/slote_core";
import { isMobile } from "react-device-detect";
import { actions as featureAction } from "../../gamereducer/revealFeatureReducer";
import { playSoundLoop } from "../../core/sounds/SoundControler";




interface IStore {
    [x: string]: any;
}
interface IProps {
    [x: string]: any;
}
interface IStateToProps {

}

interface IDispatchToProps {
}
interface IState {
    [x: string]: any;
}

class LeftRevealMeter extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected ui_mode: string;
    protected displayUI: any;
    protected leftRevealMeterContainer: _ReactPixi.IContainer | Ref<any>;
    protected positionsArr: any;
    protected resetPositionsArr: any;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }
        this.leftRevealMeterContainer = {};
        this.positionsArr = [[591, 200], [675, 200], [750, 200], [830, 200], [910, 200], [988, 200], [1070, 200], [1150, 200], [1230, 200], [1313, 200]];
        this.resetPositionsArr = this.props.basegamestate ? [[700, 515], [1100, 315], [470, 715], [1300, 515], [900, 715], [700, 315], [1100, 315], [1300, 715], [470, 515], [1300, 715]] : [[900, 500], [900, 500], [900, 500], [900, 500], [900, 500], [900, 500], [900, 500], [900, 500], [900, 500], [900, 500]];
        this.displayUI = this.props.data.COMPONENTS.filter(this.checkUiMode.bind(this));
        this.setButterflyPositionArry();
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
        this.onOrientationChange();
    }

    componentDidMount() {
        this.bindUI();
    }

    setButterflyPositionArry() {
        if (isMobile) {
            if (this.props.layoutMode === 'Portrait') {
                this.positionsArr = [[175, 590], [265, 590], [345, 590], [425, 590], [505, 590], [585, 590], [665, 590], [745, 590], [825, 590], [905, 590]];
                this.resetPositionsArr = this.props.basegamestate ? [[520, 1100], [520, 800], [820, 1100], [320, 800], [320, 1100], [820, 800], [20, 1100], [950, 900], [950, 1100], [70, 800]] : [[485, 925], [485, 925], [485, 925], [485, 925], [485, 925], [485, 925], [485, 925], [485, 925], [485, 925], [485, 925]];
            }
            else if (this.props.layoutMode === 'Landscape') {
                this.positionsArr = [[595, 195], [673, 195], [751, 195], [829, 195], [907, 195], [985, 195], [1063, 195], [1141, 195], [1219, 195], [1297, 195]];
                this.resetPositionsArr = this.props.basegamestate ? [[886, 700], [670, 470], [1136, 310], [1400, 700], [470, 470], [886, 310], [1136, 470], [1400, 470], [670, 700], [470, 700]] : [[900, 520], [900, 520], [900, 520], [900, 520], [900, 520], [900, 520], [900, 520], [900, 520], [900, 520], [900, 520]];
            }
        }
    }

    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any,) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
                data.child.map((data: any,) => {
                    if (data.layout === true) {
                        this.props.setApplicationLayoutObject(data.name);
                    }
                });
            }
            this.setButterflyPositionArry();
            this.movingButterFly_OnLevelUp_Position("meterButterfly_0");
        });
    }

    movingButterFly_OnLevelUp_Position(str: string) {
        for (let i = 0; i < 10; i++) {
            isMobile && (window.innerHeight > window.innerWidth) ? (UIManager.getRef("meterButterfly_0" + i).x = 488.5) && (UIManager.getRef("meterButterfly_0" + i).y = 915.5) :
                (UIManager.getRef("meterButterfly_0" + i).x = 950) && (UIManager.getRef("meterButterfly_0" + i).y = 530)
        }
    }
    componentDidUpdate() {
        this.bindUI();
    }
    onOrientationChange() {
        this.butterflyTest();
    }


    async movingButterFly(butterFly: any, glowAnim: any, butterFlyAnim: any, startButterFlyCount: number) {
        let xAxis: any, yAxis: any;
        const arr = Array.from({ length: this.props.level - startButterFlyCount + 0 }, (_, a) => a + startButterFlyCount);
        for await (const butterFlyCount of arr) {
            const butterFly = UIManager.getRef("meterButterfly_0" + butterFlyCount);
            const glowAnim = UIManager.getRef("animGlowMeter_0" + butterFlyCount);
            const butterFlyAnim = UIManager.getRef("animMeterButterfly_0" + butterFlyCount);
            butterFly.visible = true;
            xAxis = this.positionsArr[butterFlyCount][0];
            yAxis = this.positionsArr[butterFlyCount][1];
            // this.props.playSound([{ name: 'jq_sx_butterfly_sit_meter', loop: false, vol: 1 }]);
            if (!this.props.allSoundSFXStop) {
                playSoundLoop("jq_sx_butterfly_sit_meter", "jq_sx_butterfly_sit_meter", false);
            }
            await this.flyingButterFly(butterFly, glowAnim, butterFlyAnim, xAxis, yAxis, butterFlyCount);

        }
    }

    flyingButterFly(butterFly: any, glowAnim: any, butterFlyAnim: any, xAxis: any, yAxis: any, butterFlyCount: number): Promise<any> {
        let duration = 0.5;
        if (this.props.level && this.props.basegamestate) {
            duration = this.props.level * 0.12;
        }
        if (this.props.level && !this.props.basegamestate) {
            duration = 1;
        }
        return new Promise((resolve) => {
            const tweenProps: ItweenProps = {
                x: xAxis,
                y: yAxis,
                duration: duration,
                ease: "circ",
                onComplete: () => {
                    butterFly.visible = false;
                    butterFlyAnim.visible = true;
                    glowAnim.visible = true;
                    butterFlyAnim.children[0].state.setAnimation(0, "win_panel_butterfly", true);
                    glowAnim.children[0].state.setAnimation(0, "win_panel_butterfly_glow", true);
                    const showButterFly = UIManager.getRef("meterButterfly_00_" + butterFlyCount);

                    GSAPTimer.getInstance().addTimer(0.2, async () => {
                        UIManager.getRef("meterSymbol_0" + butterFlyCount).visible = false;
                        // add Butterfly sit on meter sound
                        // this.props.playSound([{ name: 'jq_sx_butterfly_sit_meter', loop: false, vol: 1 }])
                        // this.props.playSound([{ name: "jq_sx_butterfly_feature_activate", vol: 1, loop: false }]);
                        if (!this.props.allSoundSFXStop) {
                            playSoundLoop("jq_sx_butterfly_feature_activate", "jq_sx_butterfly_feature_activate", false);
                        }

                    });
                    GSAPTimer.getInstance().addTimer(0.4, async () => {
                        butterFlyAnim.visible = false;
                        showButterFly.visible = true;
                    });
                    glowAnim.children[0].state.onComplete = () => {
                        glowAnim.visible = false;
                        GSAPTimer.getInstance().addTimer(0.3, async () => {
                            resolve('success');
                        });
                        butterFlyCount === this.props.level - 1 && this.props?.resolve && this.props?.resolve?.data && this.props?.resolve?.data?.pr && this.props.resolve.data.pr('done');
                    }

                }
            }
            GSAPTween.getInstance().gsapTween(butterFly, tweenProps);
        })
    }

    butterflyTest() {
        GSAPTimer.getInstance().addTimer(0.1, () => {
            if (this.props.level) {
                for (let i = 0; i < this.props.level; i++) {
                    UIManager.getRef("meterSymbol_0" + i).visible = false;
                    UIManager.getRef("meterButterfly_00_" + i).visible = true;
                }
            }
        })
    }

    staticButterFlyVisible() {
        //
        const startButterFlyCount = this.props.prevLevel > 0 ? this.props.prevLevel : 0;
        if (this.props.level && this.props.basegamestate) {
            UIManager.getRef("btn_spinStop") && (UIManager.getRef("btn_spinStop").interactive = false);
            GSAPTimer.getInstance().addTimer(2, () => {
                this.props.level > 0 && this.movingButterFly(UIManager.getRef("meterButterfly_0" + startButterFlyCount), UIManager.getRef("animGlowMeter_0" + startButterFlyCount), UIManager.getRef("animMeterButterfly_0" + startButterFlyCount), startButterFlyCount);
            });
        } else {
            this.props.level > 0 && this.movingButterFly(UIManager.getRef("meterButterfly_0" + startButterFlyCount), UIManager.getRef("animGlowMeter_0" + startButterFlyCount), UIManager.getRef("animMeterButterfly_0" + startButterFlyCount), startButterFlyCount);
        }

    }

    resetLeftPanel() {
        //this for loop will reset the butterfly position as it was in initial phase-------------------------
        for (let i = 0; i < this.resetPositionsArr.length; i++) {
            UIManager.getRef("meterButterfly_0" + i).x = this.resetPositionsArr[i][0];
            UIManager.getRef("meterButterfly_0" + i).y = this.resetPositionsArr[i][1];
        }
        this.displayUI[0].child.map((data: any) => {
            //it will hide butterfly static image,butterfly spine & meter glow---------------------------
            if (data.name.startsWith("meterButterfly") || data.name.startsWith("animMeterButterfly") || data.name.startsWith("animGlowMeter")) {
                UIManager.getRef(data.name).visible = false;
            }
            //symbol on meter will be visible again----------------------
            if (data.name.startsWith("meterSymbol")) {
                UIManager.getRef(data.name).visible = true;
            }
        });
        // black screen run 
        if (this.props.level > 0) {
            UIManager.getRef("common_bgGraphic_for_feature").alpha = 0;
            UIManager.getRef("common_bgGraphic_for_feature").visible = true;
            // GSAPTimer.getInstance().addTimer(1.5, () => {
            //     this.props.playSound([{ name: "jq_sx_butterfly_feature_activate", vol: 1, loop: false }]);
            // });
            const tweenProps: ItweenProps = {
                alpha: 0.82,
                duration: 0.6,
                ease: "none"
            }
            GSAPTween.getInstance().gsapTween(UIManager.getRef("common_bgGraphic_for_feature"), tweenProps);
        }


    }
    setInitialPosition() {
        this.displayUI[0].child.map((data: any) => {
            //it will change  the initial position of butterfly to the centre---------------------
            if (data.name.startsWith("meterButterfly")) {
                UIManager.getRef(data.name).x = 900;
                UIManager.getRef(data.name).y = 500;
            }
        })
    }
    visibleButterFlyFreeGame(nextProps: any) {
        this.movingButterFlyFG(nextProps);
    }

    movingButterFlyFG(nextProps: any) {
        let level = parseInt(nextProps.level) - 1;
        this.movingButterFly(UIManager.getRef("meterButterfly_0" + level), UIManager.getRef("animGlowMeter_0" + level), UIManager.getRef("animMeterButterfly_0" + level), level);
    }

    reConstructionStaticLevel() {
        for (let i = 0; i < this.props.prevLevel; i++) {
            UIManager.getRef("meterButterfly_00_" + i) && (UIManager.getRef("meterButterfly_00_" + i).visible = true);
            UIManager.getRef("meterSymbol_0" + i) && (UIManager.getRef("meterSymbol_0" + i).visible = false);
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.layoutMode !== this.props.layoutMode
            || nextProps.spinStart !== this.props.spinStart
            || nextProps.freeSpinRewards !== this.props.freeSpinRewards
            || nextProps.allSpinComplete !== this.props.allSpinComplete || nextProps.reConstruction !== this.props.reConstruction) {
            if (nextProps.layoutMode !== this.props.layoutMode) {
                this.layoutChange(nextProps.layoutMode);
                return true
            }
            if (nextProps.reConstruction && nextProps.reConstruction !== this.props.reConstruction) {
                nextProps.prevLevel > 0 && this.reConstructionStaticLevel();
            } else if (!nextProps.freeSpinRewards && nextProps.freeSpinRewards != this.props.freeSpinRewards && !nextProps.basegamestate) {
                // butterfly feature activates sound for freegame
                // this.props.playSound([{ name: "jq_sx_butterfly_feature_activate", vol: 1, loop: false }]);
                nextProps.level > 0 && this.visibleButterFlyFreeGame(nextProps);
                nextProps.level == 0 && this.setInitialPosition();
            }
            if (nextProps.spinStart) {
                if (nextProps.basegamestate) {
                    this.resetLeftPanel();
                    // butterfly feature activates sound for basegame
                    nextProps.level > -1 && this.staticButterFlyVisible();
                }
            }
            return false;
        }

        return false;
    }

    render() {
        return (
            <Container name={"leftRevealMeterContainer"}
                ref={i => this.leftRevealMeterContainer = i}
                key={`Container-${Math.random() * 10000}`}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            id={i.id} {...i} app={this.app} configGame={this.props.configGame}
                            scope={this} name={'leftRevealMeterContainer'} />
                    )
                }
            </Container>)
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'behaviourState' | 'basegameState' | 'revealFeatureState' | 'soundState' | 'winpresentationState' | 'applicationState' | 'freegameState' | 'reelsState' | 'MultiplierState'>, ownProps?: any): IStateToProps => ({
        layoutMode: state.applicationState.layoutMode,
        spinStart: state.reelsState.spinStart,
        level: state.revealFeatureState.level,
        prevLevel: state.revealFeatureState.prevLevel,
        basegamestate: state.basegameState.basegamestate,
        allSpinComplete: state.reelsState.allSpinComplete,
        freeSpinRewards: state.MultiplierState.freeSpinRewards,
        resolve: state.MultiplierState.resolve,
        reConstruction: state.basegameState.reConstruction,
        allSoundSFXStop: state.soundState.allSoundSFXStop,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        isButterFliesPlaced: (butterFliesPlaced: boolean): any => dispatch(featureAction.isButterFliesPlaced(butterFliesPlaced)),
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
    }))(withLeftRevealMeterConfiguration(LeftRevealMeter)));