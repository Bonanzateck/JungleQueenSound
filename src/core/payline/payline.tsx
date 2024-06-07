import React, { Component, Ref } from "react";
import { _ReactPixi, Container, Graphics, withPixiApp } from "@inlet/react-pixi";
import withPaylineConfiguration from "./configuration/withPaylineConfiguration";
import * as PIXI from "pixi.js";
import { UIManager, GSAPTimer } from "@bonanzainteractive/core";
import { connect } from "react-redux";
import { IStore } from "../store/IStore";
import { Dispatch } from "redux";
import { flowManagerAction, freegameActions, reelsActions, baseGameAction } from "@bonanzainteractive/slote_core";
import { reelsGridActions } from "@bonanzainteractive/slote_core";
import { gridActions } from "@bonanzainteractive/slote_core";
import { winpresentationAction } from "@bonanzainteractive/slote_core";
import { symbolActions } from "@bonanzainteractive/slote_core";
import { isMobile } from "react-device-detect";
import { layoutssActions } from "@bonanzainteractive/slote_core";


interface IProps {
    [x: string]: any;
}

interface IState {
    changeLine: boolean
}

interface IDispatchToProps {
}


interface IStateToProps {
}

interface IProps extends IStateToProps {
}

class Payline extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected LINE_COORDINATES_LIST: any;
    protected paylineContainer: _ReactPixi.IContainer | Ref<any>;
    protected LINE_DRAW_COORDINATES_LIST: any;
    protected PAYLINE_ANIMATION_END_COUNT: number;
    protected ui_mode: string;
    protected displayUI: Object[] = [];
    protected displayLine: boolean = false;
    private removeFlowManager: boolean = false;


    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.paylineContainer = {};
        this.PAYLINE_ANIMATION_END_COUNT = 0;
        if (isMobile) {
            this.ui_mode = "mobile"
        } else {
            this.ui_mode = "desktop"
        }
        this.init()
        this.displayLine = false;
        this.removeFlowManager = false;
        this.displayUI = this.props.data.PAYLINE_ANIMATION.filter(this.checkUiMode.bind(this));
    }
    checkUiMode(uimodeobj: any) {

        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both"
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }
    init() {
        if (this.props.data.PAYLINE_TYPE === "CUSTOM" || this.props.data.PAYLINE_TYPE === "BLANK") {
            this.LINE_DRAW_COORDINATES_LIST = [
                [
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 0,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 1,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 2 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 3 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 4 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 5,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    }
                ],
                [
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 0,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 1,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 2 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 3 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 4 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 5,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    }
                ],
                [
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 0,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 1,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 2 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 3 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 4 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 5,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    }
                ],
                [
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 0,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 1,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 2 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 3 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 4 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 5,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    }
                ],
                [
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 0,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 1,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 2 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 3 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 4 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 5,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    }
                ],
                [
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 0,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 1,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 2 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 3 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 4 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 5,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    }
                ],
                [
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 0,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 1,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 2 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 3 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 4 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 5,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    }
                ],
                [
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 0,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 1,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 2 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 3 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 4 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 5,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    }
                ],
                [
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 0,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 1,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 1 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 2 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 1 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 3 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 1 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 4 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 1 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 5,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 1 + this.props.data.SYMBOL_HEIGHT / 2
                    }
                ],
                [
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 0,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 2 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 1,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 2 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 2 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 2 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 3 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 2 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 4 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 2 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 5,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 2 + this.props.data.SYMBOL_HEIGHT / 2
                    }
                ],
                [
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 0,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 3 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 1,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 3 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 2 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 3 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 3 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 3 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 4 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 3 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 5,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 3 + this.props.data.SYMBOL_HEIGHT / 2
                    }
                ],
                [
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 0,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 4 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 1,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 4 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 2 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 4 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 3 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 4 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 4 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 4 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 5,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 4 + this.props.data.SYMBOL_HEIGHT / 2
                    }
                ],
                [
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 0,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 1 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 1 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 1 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 2 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 2 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 3 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 3 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 4 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 3 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 5,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    }
                ],
                [
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 0,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 1,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 2 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 3 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 4 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 5,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    }
                ],
                [
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 0,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 1,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 2 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 3 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 4 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 5,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    }
                ],
            ]
        }
    }

    tick = () => {


    }

    gradient(from: any, to: any): any | null {
        const c = document.createElement("canvas") as HTMLCanvasElement;
        const ctx = c.getContext("2d");
        if (ctx) {
            const grd = ctx.createLinearGradient(0, 0, 500, 50);
            grd.addColorStop(0, from);
            grd.addColorStop(1, to);
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, 1000, 1000);
            return PIXI.Texture.from(c);
        }
        return null
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.spinResponseReceived != this.props.spinResponseReceived
            || nextProps.allSpinComplete !== this.props.allSpinComplete
            || nextProps.phaseCount !== this.props.phaseCount
            || nextProps.endToggling !== this.props.endToggling
            || nextProps.currentToggleId !== this.props.currentToggleId
            || nextProps.winCycleComplete !== this.props.winCycleComplete
            || nextProps.winPresentationStart !== this.props.winPresentationStart
            || nextProps.winPresentationStop !== this.props.winPresentationStop
            || nextProps.layoutMode !== this.props.layoutMode
        ) {
            if (nextProps.endToggling === true && (nextProps.configGame["SPIN_TYPE"] === 0 || nextProps.configGame["SPIN_TYPE"] === 1)) {
                this.props.resetAnimationConfig()
                //this.props.setWinSymbolCoOrdinate([]);
            }
            if (nextProps.winCycleComplete) {
                this.props.setPhaseCount(2);
                if (nextProps.winCycleComplete !== this.props.winCycleComplete) {
                    if (nextProps.configGame["SPIN_TYPE"] === 0) {
                        if (this.props.stopAutoplayOnAnyWin) {
                            this.props.stopAutoplay();
                        }
                        // these lines were calling next spin before win celebration()
                        // this.props.nextAutoplay();
                        // this.props.nextFreegame();
                    }
                    if (this.props.featureType == "BONUS" || this.props.featureType == "FREEGAME" && (nextProps.configGame["SPIN_TYPE"] === 0 || nextProps.configGame["SPIN_TYPE"] === 1)) {
                        this.props.resetAnimationConfig()
                        this.props.setWinSymbolCoOrdinate([]);
                    }
                    //custom change 
                    // if (nextProps.configGame["SPIN_TYPE"] === 0) {
                    //     this.props.flowManagerCalled(true);
                    // }
                }
                if (nextProps.data.WIN_PRESENTATION_PHASE[nextProps.phaseCount] === "idleLine") {
                    if (nextProps.configGame["SPIN_TYPE"] === 0) {
                        nextProps.winPresentationStart && this.props.startToggle();
                    } else {
                        this.props.blastStart();
                    }
                }
            }
            if (nextProps.layoutMode !== this.props.layoutMode) {
                this.layoutChange(nextProps.layoutMode)

            }
            if (nextProps.allSpinComplete && nextProps.allSpinComplete !== this.props.allSpinComplete) {
                this.props.setPhaseCount(0);

                if (nextProps.winningList.length != 0) {
                    this.props.startWinPresentation();
                }
                if (nextProps.configGame["SPIN_TYPE"] === 0) {
                    this.props.setDisplayAllWinTogether();
                }


                return false;//#
            }
            if (nextProps.data.WIN_PRESENTATION_PHASE[nextProps.phaseCount] === "singleLine" && nextProps.currentToggleId !== this.props.currentToggleId
                || nextProps.data.WIN_PRESENTATION_PHASE[nextProps.phaseCount] === "idleLine" && nextProps.currentToggleId !== this.props.currentToggleId
            ) {
                if (nextProps.endToggling === false && nextProps.startToggling === true) {
                    this.onShowSymbolAnimation({
                        "lineId": nextProps.currentToggleId,
                        "currentwinposition": nextProps.currentwinpositions
                    });
                    return true;
                } else {
                    return false;
                }
            }
            if (nextProps.data.WIN_PRESENTATION_PHASE[nextProps.phaseCount] === "singleLine" && nextProps.currentToggleIndex == -1
                || nextProps.data.WIN_PRESENTATION_PHASE[nextProps.phaseCount] === "singleLine" && nextProps.endToggling) {
                nextProps.winPresentationStart && this.props.startToggle();
                if (nextProps.endToggling === true) {
                    return false;
                } else {
                    this.onShowSymbolAnimation({
                        "lineId": nextProps.currentToggleId,
                        "currentwinposition": nextProps.currentwinpositions
                    });

                }
                return true;
            }
            if (nextProps.data.WIN_PRESENTATION_PHASE[nextProps.phaseCount] === "idleLine" && nextProps.currentToggleIndex == 0
                || nextProps.data.WIN_PRESENTATION_PHASE[nextProps.phaseCount] === "idleLine" && nextProps.endToggling) {
                nextProps.winPresentationStart && this.props.startToggle();
                if (nextProps.endToggling === true) {
                    return false;
                } else {
                    this.onShowSymbolAnimation({
                        "lineId": nextProps.currentToggleId,
                        "currentwinposition": nextProps.currentwinpositions
                    });

                    return true;
                }
            }
            if (nextProps.winPresentationStart !== this.props.winPresentationStart) {
                this.onShowSymbolAnimation({
                    "lineId": nextProps.currentToggleId,
                    "currentwinposition": nextProps.currentwinpositions
                });
                return true;
            }
            if (nextProps.winPresentationStop) {
                this.props.setPhaseCount(0);

            }
            if (nextProps.phaseCount !== this.props.phaseCount) {
                if (nextProps.data.WIN_PRESENTATION_PHASE[nextProps.phaseCount] === "idleLine") {
                    nextProps.winPresentationStart && this.props.startToggle();
                }
                this.onShowSymbolAnimation({
                    "lineId": nextProps.currentToggleId,
                    "currentwinposition": nextProps.currentwinpositions
                });

            }
            return false;
        } else {
            if (nextProps.winPresentationStop) {
                this.props.setPhaseCount(0);

            }
            return false;
        }

    }

    componentDidMount() {
        this.props.setLineWinpresentationType();
        this.layoutChange(this.props.layoutMode);
    }

    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any, j: number) => {
            this.props.setApplicationLayoutObject(data.name)
        });
    }

    onCompleteCustomCallBack() {
        let scope = this;
        scope.PAYLINE_ANIMATION_END_COUNT++;
        if (scope.props.data.WIN_PRESENTATION_PHASE[scope.props.phaseCount] === "allLine") {
            if (scope.props.configGame["SPIN_TYPE"] === 1) {
                let wincordinate: any = [];
                scope.props.blastPosition.forEach((data: any, index: number) => {
                    wincordinate.push({
                        "reelId": data[0],
                        "rowId": data[1],
                    });
                });
                scope.props.resetAnimationConfig()
                scope.props.setWinSymbolCoOrdinate(wincordinate);
            }
            scope.PAYLINE_ANIMATION_END_COUNT = 0;
            GSAPTimer.getInstance().addTimer((scope.props.configGame.DISPLAY_ALL_WIN_DURATION | 1) / 1000, () => {
                scope.props.setPhaseCount(1);
            });
        }
        if (scope.props.data.WIN_PRESENTATION_PHASE[scope.props.phaseCount] === "singleLine") {
            scope.PAYLINE_ANIMATION_END_COUNT = 0;
            GSAPTimer.getInstance().addTimer((scope.props.data.TOGGLE_WIN_DURATION | 1) / 1000, () => {
                scope.props.endToggle();
            });
        }
        if (scope.props.data.WIN_PRESENTATION_PHASE[scope.props.phaseCount] === "idleLine") {
            scope.PAYLINE_ANIMATION_END_COUNT = 0;

            GSAPTimer.getInstance().addTimer((scope.props.data.TOGGLE_WIN_DURATION_IDLE | 1) / 1000, () => {
                // scope.props.endToggle();
            });
        }
    }

    onCompleteCallBack(e: any, scope: any) {
        // console.log(scope,"scope");

        scope.PAYLINE_ANIMATION_END_COUNT++;
        if (scope.props.winningList.length === scope.PAYLINE_ANIMATION_END_COUNT && scope.props.data.WIN_PRESENTATION_PHASE[scope.props.phaseCount] === "allLine") {
            scope.PAYLINE_ANIMATION_END_COUNT = 0;
            if (scope.props.configGame["SPIN_TYPE"] === 1) {
                let wincordinate: any = [];
                scope.props.blastPosition.forEach((data: any, index: number) => {
                    wincordinate.push({
                        "reelId": data.reelId,
                        "rowId": data.rowId,
                    })
                })
                scope.props.resetAnimationConfig()
                scope.props.setWinSymbolCoOrdinate(wincordinate);
            }
            // scope.props.setPhaseCount(1);
            GSAPTimer.getInstance().addTimer((scope.props.configGame.DISPLAY_ALL_WIN_DURATION) / 1000, () => {
                scope.props.setPhaseCount(1);
            });
        }
        //!SECTION Multiple animation effects
        if (scope.props.data.WIN_PRESENTATION_PHASE[scope.props.phaseCount] === "singleLine") {
            scope.PAYLINE_ANIMATION_END_COUNT = 0;
            GSAPTimer.getInstance().addTimer((scope.props.data.TOGGLE_WIN_DURATION) / 1000, () => {
                if (!this.removeFlowManager) {
                    this.removeFlowManager = true;
                    GSAPTimer.getInstance().addTimer(2, () => {
                        scope.props.stopWinPresentation();
                        scope.props.setWinSymbolCoOrdinate([]);
                        scope.props.endToggle();

                    });
                    scope.props.flowManagerCalled(true);
                }
            });
        }
        if (scope.props.data.WIN_PRESENTATION_PHASE[scope.props.phaseCount] === "idleLine") {
            scope.PAYLINE_ANIMATION_END_COUNT = 0;

            GSAPTimer.getInstance().addTimer((scope.props.data.TOGGLE_WIN_DURATION_IDLE) / 1000, () => {
                //scope.props.endToggle();
                //  scope.props.flowManagerCalled(true);

            });
        }
    }

    onShowSymbolAnimation(evt_data: any) {
        let winSymbolCoOrdinate;//  = this.getWinSymbolByLineId(evt_data.lineId, evt_data.currentwinposition);
        if (this.props.configGame["SPIN_TYPE"] === 0) {
            winSymbolCoOrdinate = this.getWinSymbolForAllLineIDs(evt_data.lineId, evt_data.currentwinposition);
        } else {
            winSymbolCoOrdinate = this.getWinSymbolByLineId(evt_data.lineId, evt_data.currentwinposition);
        }

        if (this.props.configGame["SPIN_TYPE"] === 0 || this.props.configGame["SPIN_TYPE"] === 1) {
            if (winSymbolCoOrdinate.length > 0) {
                this.removeFlowManager = false;
                this.props.resetAnimationConfig()
                this.props.setWinSymbolCoOrdinate(winSymbolCoOrdinate);
                this.props.playSymbolAnim();
                this.props.flowManagerCalled(true);
            }
        }
    }

    getWinSymbolByLineId(lineId: any, winposition: any = []) {
        let winSymbolCoOrdinate = [];
        for (let j = 0; j < this.props.data.LINE_COORDINATES_LIST.length; j++) {
            for (let i = 0; i < this.props.data.WIN_SYMBOL_IN_LINE_LIST.length; i++) {

                if (j === lineId && this.props.data.WIN_SYMBOL_IN_LINE_LIST[j][i] === 1 && i < winposition.length) {

                    winSymbolCoOrdinate.push({
                        "reelId": i,
                        "rowId": this.props.data.LINE_COORDINATES_LIST[j][i],
                    });
                }
            }
        }
        return winSymbolCoOrdinate;
    }

    getWinSymbolForAllLineIDs(lineId: number, winposition: any = []) {
        let winSymbolCoOrdinate: any[] = [];
        this.displayLine = false;
        let displayLine = false;
        let allWinPosition = this.props.winpositions.flat(Infinity)
        for (let j = 0; j < this.props.data.REEL_COLUMN; j++) {
            for (let i = 0; i < this.props.data.REEL_ROWS; i++) {
                if (lineId !== -1) {
                    displayLine = true;
                    allWinPosition.forEach((data: any) => {
                        let animPosition = {
                            reelId: data.reelId, rowId: data.rowId
                        }
                        if (data.reelId === j && data.rowId === i && winSymbolCoOrdinate.indexOf(animPosition) === -1) {
                            winSymbolCoOrdinate.push({
                                "reelId": j,
                                "rowId": i,
                            });
                        }

                    });

                }
            }
        }
        if (displayLine) {
            this.displayLine = true;
        }

        return winSymbolCoOrdinate;
    }


    render() {
        if (!this.props.winLineType || !this.props.winPresentationStart) {
            return null
        }
        const payline: any = [];
        let currentwinpositions: any = [];
        if (this.props.currentwinpositions) {
            currentwinpositions = this.props.currentwinpositions.length
        }
        if (this.props.data.PAYLINE_TYPE === "CUSTOM") {
            let visibleAllPayLine = false;
            for (let i = 0; i < this.props.data.NO_OF_LINE; i++) {
                visibleAllPayLine = true;
                if (this.props.data.WIN_PRESENTATION_PHASE[this.props.phaseCount] === "allLine" && this.props.winningList.indexOf(i) > -1
                    || this.props.data.WIN_PRESENTATION_PHASE[this.props.phaseCount] === "singleLine" && this.props.currentToggleId === i
                    || this.props.data.WIN_PRESENTATION_PHASE[this.props.phaseCount] === "idleLine" && this.props.currentToggleId === i
                ) {
                    GSAPTimer.getInstance().addTimer(1 / 1000, () => {
                        this.onCompleteCustomCallBack.call(this);
                    });
                    const isPortraitMobile = (isMobile && window.innerHeight > window.innerWidth) ? true : false;
                    const scalingOfReelContainer = isPortraitMobile ? this.props.data.REEL_CONTAINER_SCALE_IN_PORTRAIT : this.props.data.REEL_CONTAINER_SCALE
                    payline.push(<Container key={`lineContainer-${Math.random()}`} name={"lineContainer" + i}
                        visible={visibleAllPayLine}
                        x={isPortraitMobile ? this.props.data.REEL_CONTAINER_X_IN_PORTRAIT : this.props.data.REEL_CONTAINER_X}
                        y={isPortraitMobile ? this.props.data.REEL_CONTAINER_Y_IN_PORTRAIT : this.props.data.REEL_CONTAINER_Y}
                        scale={scalingOfReelContainer}
                        filters={[new PIXI.filters.AlphaFilter()]}>
                        <Graphics key={`line-${Math.random()}`} name={"line" + i}
                            draw={g => {
                                g.lineStyle(5).moveTo(this.LINE_DRAW_COORDINATES_LIST[i][0].x, this.LINE_DRAW_COORDINATES_LIST[i][0].y)
                                    .lineTo(this.LINE_DRAW_COORDINATES_LIST[i][1].x, this.LINE_DRAW_COORDINATES_LIST[i][1].y)
                                    .lineTo(this.LINE_DRAW_COORDINATES_LIST[i][2].x, this.LINE_DRAW_COORDINATES_LIST[i][2].y)
                                    .lineTo(this.LINE_DRAW_COORDINATES_LIST[i][3].x, this.LINE_DRAW_COORDINATES_LIST[i][3].y)
                                    .lineTo(this.LINE_DRAW_COORDINATES_LIST[i][4].x, this.LINE_DRAW_COORDINATES_LIST[i][4].y)
                                    .lineTo(this.LINE_DRAW_COORDINATES_LIST[i][5].x, this.LINE_DRAW_COORDINATES_LIST[i][5].y);
                            }}>
                            <Graphics blendMode={21} draw={
                                g => {
                                    g.beginTextureFill(this.gradient(this.props.data.LINE_COLOR_LIST[i], '#ffffff'))
                                        .drawRect(-5, -5, this.props.data.CANVAS_WIDTH, this.props.data.CANVAS_HEIGHT);
                                }
                            }></Graphics>
                        </Graphics>
                        {this.props.data.lineMaskType === "symbolBox" && (
                            this.props.data.onWinMask.map((da: any, n: number) => da === true &&
                                <Graphics key={`mask-${Math.random()}`} blendMode={PIXI.BLEND_MODES.ERASE} draw={
                                    gr => {
                                        gr.beginFill(0xDE3249)
                                            .drawRect(n * (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP), (this.props.data.SYMBOL_SIZE + this.props.data.REEL_HEIGHT_GAP) * this.props.data.LINE_COORDINATES_LIST[i][n], this.props.data.REEL_WIDTH, this.props.data.SYMBOL_SIZE)
                                    }
                                }></Graphics>)
                        )}
                    </Container>)
                }
            }
        }
        if (this.props.data.PAYLINE_TYPE === "ANIMATION") {
            this.props.data.PAYLINE_ANIMATION.map((i: any, m: number) => {
                let visibleAllPayLine = false;
                if (this.props.data.WIN_PRESENTATION_PHASE[this.props.phaseCount] === "allLine" && this.props.winningList.indexOf(m) > -1
                    || this.props.data.WIN_PRESENTATION_PHASE[this.props.phaseCount] === "singleLine" && this.props.currentToggleId === m
                    || this.props.data.WIN_PRESENTATION_PHASE[this.props.phaseCount] === "idleLine" && this.props.currentToggleId === m
                ) {
                    //custom change 
                    visibleAllPayLine = true;
                    let isPortraitMobile = (isMobile && window.innerHeight > window.innerWidth) ? true : false;
                    let scalingOfReelContainer = isPortraitMobile ? this.props.data.REEL_CONTAINER_SCALE_IN_PORTRAIT : this.props.data.REEL_CONTAINER_SCALE
                    payline.push(<Container key={`lineContainer-${Math.random()}`} name={"lineContainer" + i}
                        visible={!this.displayLine}
                        x={isPortraitMobile ? this.props.data.REEL_CONTAINER_X_IN_PORTRAIT : this.props.data.REEL_CONTAINER_X}
                        y={isPortraitMobile ? this.props.data.REEL_CONTAINER_Y_IN_PORTRAIT : this.props.data.REEL_CONTAINER_Y}
                        scale={scalingOfReelContainer}
                        filters={[new PIXI.filters.AlphaFilter()]}>
                        <UIManager key={`UIManager-${Math.random()}`} type={i.type}
                            id={i.id} {...i} onComplete={this.onCompleteCallBack.bind(this)} scope={this} app={this.app}>
                        </UIManager>
                        {this.props.data.lineMaskType === "symbolBox" && (
                            this.props.data.onWinMask.map((da: any, n: number) => da === true &&
                                n < currentwinpositions && <Graphics key={`mask-${Math.random()}`} blendMode={PIXI.BLEND_MODES.ERASE} draw={
                                    gr => {
                                        gr.beginFill(0xDE3249)
                                            .drawRect(n * (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP), (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * this.props.data.LINE_COORDINATES_LIST[m][n], this.props.data.REEL_WIDTH, this.props.data.SYMBOL_HEIGHT)
                                    }
                                }></Graphics>)
                        )}
                    </Container>)
                }
            })
        }
        if (this.props.data.PAYLINE_TYPE === "BLANK") {
            let visibleAllPayLine = false;
            for (let i = 0; i < this.props.data.NO_OF_LINE; i++) {
                visibleAllPayLine = false

                if (this.props.data.WIN_PRESENTATION_PHASE[this.props.phaseCount] === "allLine" && this.props.winningList.indexOf(i) > -1
                    || this.props.data.WIN_PRESENTATION_PHASE[this.props.phaseCount] === "singleLine" && this.props.currentToggleId === i
                    || this.props.data.WIN_PRESENTATION_PHASE[this.props.phaseCount] === "idleLine" && this.props.currentToggleId === i
                ) {
                    if (this.props.winningList.indexOf(-1) > -1) {

                    } else {
                        this.onCompleteCustomCallBack.call(this);
                    }
                    let isPortraitMobile = (isMobile && window.innerHeight > window.innerWidth) ? true : false;
                    let scalingOfReelContainer = isPortraitMobile ? this.props.data.REEL_CONTAINER_SCALE_IN_PORTRAIT : this.props.data.REEL_CONTAINER_SCALE
                    payline.push(<Container key={`lineContainer-${Math.random()}`} name={"lineContainer" + i}
                        visible={visibleAllPayLine}
                        x={isPortraitMobile ? this.props.data.REEL_CONTAINER_X_IN_PORTRAIT : this.props.data.REEL_CONTAINER_X}
                        y={isPortraitMobile ? this.props.data.REEL_CONTAINER_Y_IN_PORTRAIT : this.props.data.REEL_CONTAINER_Y}
                        scale={scalingOfReelContainer}
                        filters={[new PIXI.filters.AlphaFilter()]}
                    >
                    </Container>)
                }
            }
        }
        return (<Container ref={i => this.paylineContainer = i}>
            {payline}
        </Container>)
    }
}



export default withPixiApp(connect(
    (state: Pick<IStore, 'applicationState' | 'autoplayState' | 'winpresentationState' | 'reelgridState' | 'reelsState' | 'gridsState' | 'basegameState'>, ownProps?: any): IStateToProps =>
    ({
        allSpinComplete: ownProps && ownProps.configGame["SPIN_TYPE"] === 0 && state.reelsState.allSpinComplete || ownProps && ownProps.configGame["SPIN_TYPE"] === 2 && state.reelgridState.allSpinComplete || ownProps && ownProps.configGame["SPIN_TYPE"] === 1 && state.gridsState.allSpinComplete,
        blastPosition: ownProps && ownProps && ownProps.configGame["SPIN_TYPE"] === 2 && state.reelgridState.blastPosition || ownProps && ownProps.configGame["SPIN_TYPE"] === 1 && state.gridsState.blastPosition,
        displayAllWintogether: state.winpresentationState.displayAllWintogether,
        winLineType: state.winpresentationState.lineType,
        winningList: state.winpresentationState.winningList,
        phaseCount: state.winpresentationState.phaseCount,
        currentToggleIndex: state.winpresentationState.currentToggleIndex,
        endToggling: state.winpresentationState.endToggle,
        startToggling: state.winpresentationState.startToggle,
        winCycleComplete: state.winpresentationState.winCycleComplete,
        winPresentationStart: state.winpresentationState.winPresentationStart,
        winPresentationStop: state.winpresentationState.winPresentationStop,
        currentwinpositions: state.winpresentationState.currentwinpositions,
        winpositions: state.winpresentationState.winpositions,
        currentToggleId: state.winpresentationState.currentToggleId,
        featureType: state.basegameState.featureType,
        isSpinning: state.reelsState.isSpinning,
        stopAutoplayOnAnyWin: state.autoplayState.stopAutoplayOnAnyWin,
        stopAutoplayOnBonus: state.autoplayState.stopAutoplayOnBonus,
        stopAutoplayOnFreegame: state.autoplayState.stopAutoplayOnFreegame,
        layoutMode: state.applicationState.layoutMode,
        spinResponseReceived: ownProps && ownProps.configGame["SPIN_TYPE"] === 0 && state.reelsState.spinResponseReceived || state.gridsState.spinResponseReceived
    }),
    (dispatch: Dispatch, ownProps): IDispatchToProps => ({
        resetReelState: (): any => dispatch(ownProps && ownProps.configGame["SPIN_TYPE"] === 0 && reelsActions.resetReelState() || ownProps && ownProps.configGame["SPIN_TYPE"] === 1 && gridActions.resetReelState() || ownProps && ownProps.configGame["SPIN_TYPE"] === 2 && reelsGridActions.resetReelState()),
        setSpinComplete: (allSpinComplete: boolean): any => dispatch(ownProps && ownProps.configGame["SPIN_TYPE"] === 0 && reelsActions.setSpinComplete(allSpinComplete) || gridActions.setSpinComplete(allSpinComplete)),
        setLineWinpresentationType: (): any => dispatch(winpresentationAction.setLineWinpresentationType()),
        setWinLineCount: (winlinecount: number): any => dispatch(winpresentationAction.setWinLineCount(winlinecount)),
        setWinSymbolCoOrdinate: (winSymbolCoOrdinate: any): any => dispatch(winpresentationAction.setWinSymbolCoOrdinate(winSymbolCoOrdinate)),
        setWinningIdList: (winlineList: number): any => dispatch(winpresentationAction.setWinningIdList(winlineList)),
        setPhaseCount: (phasecount: number): any => dispatch(winpresentationAction.setPhaseCount(phasecount)),
        setDisplayAllWinTogether: (): any => dispatch(winpresentationAction.setDisplayAllWinTogether()),
        startToggle: (): any => dispatch(winpresentationAction.startToggle()),
        endToggle: (): any => dispatch(winpresentationAction.endToggle()),
        startWinPresentation: (): any => dispatch(winpresentationAction.startWinPresentation()),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        nextAutoplay: (): any => dispatch(baseGameAction.nextAutoplay()),
        nextFreegame: (): any => dispatch(freegameActions.nextFreegame()),
        setApplicationToBaseGameState: (basegamestate: boolean): any => dispatch(baseGameAction.setApplicationToBaseGameState(basegamestate)),
        playSymbolAnim: (): any => dispatch(winpresentationAction.playSymbolAnim()),
        blastStart: (): any => dispatch(ownProps && ownProps.configGame["SPIN_TYPE"] === 1 && gridActions.blastStart() || ownProps && ownProps.configGame["SPIN_TYPE"] === 2 && reelsGridActions.blastStart()),
        stopAutoplay: (): any => dispatch(baseGameAction.stopAutoplay()),
        resetAnimationConfig: (): any => dispatch(symbolActions.resetAnimationConfig()),
        displayWinBox: (displayWinBox: boolean): any => dispatch(winpresentationAction.displayWinBox(displayWinBox)),
        setApplicationLayoutObject: (layoutobjectlist: string): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        flowManagerCalled: (callFlowManager: boolean): any => dispatch(flowManagerAction.flowManagerCalled(callFlowManager)),
    }))(withPaylineConfiguration(Payline)));