import React from "react";
// import { defaultframeworkconfigGame } from "@bonanzainteractive/slote_core/lib/data/config";
import { defaultframeworkconfigGame } from "@bonanzainteractive/slote_core/lib/data/config";
import { Ianimation } from "@bonanzainteractive/core";

interface IframeworkPayline {
    data: {

        "PAYLINE_TYPE": string,//custom , image , animation
        "NO_OF_LINE": number,
        "WIN_PRESENTATION_PHASE": Array<string>,
        "DISPLAY_ALL_WIN_DURATION": number,
        "TOGGLE_WIN_DURATION": number,
        "TOGGLE_WIN_DURATION_IDLE": number,
        "CANVAS_WIDTH": number,
        "CANVAS_HEIGHT": number,
        "REEL_CONTAINER_X": number,
        "REEL_CONTAINER_Y": number,
        "REEL_CONTAINER_X_IN_PORTRAIT": number,
        "REEL_CONTAINER_Y_IN_PORTRAIT": number,
        "SYMBOL_WIDTH": number,
        "SYMBOL_HEIGHT": number,
        "REEL_WIDTH": number,
        "REEL_COLUMN": number,
        "REEL_ROWS": number,
        "REEL_WIDTH_GAP": number,
        "onWinMask": Array<boolean>,
        "lineMaskType": string,
        "REEL_HEIGHT_GAP": number,
        "LINE_COLOR_LIST": Array<string>,
        "PAYLINE_ANIMATION": Array<Ianimation>,
        "LINE_COORDINATES_LIST": Array<Array<number>>,
        "REEL_CONTAINER_SCALE": number,
        "REEL_CONTAINER_SCALE_IN_PORTRAIT": number,
        "WIN_SYMBOL_IN_LINE_LIST": Array<Array<number>>,
        "REEL_POST_STOP_FEATURE_TIMER": number,
    }

}
export const frameworkPayline: IframeworkPayline = {
    data: {
        "PAYLINE_TYPE": "BLANK",//custom , image , animation
        "NO_OF_LINE": 20,
        "WIN_PRESENTATION_PHASE": ["allLine", "singleLine", "idleLine"],
        "DISPLAY_ALL_WIN_DURATION":  defaultframeworkconfigGame.DISPLAY_ALL_WIN_DURATION,
        "TOGGLE_WIN_DURATION":  defaultframeworkconfigGame.DISPLAY_ALL_WIN_DURATION ,
        "TOGGLE_WIN_DURATION_IDLE":  defaultframeworkconfigGame.DISPLAY_ALL_WIN_DURATION ,
        "CANVAS_WIDTH": defaultframeworkconfigGame.DISPLAY_ALL_WIN_DURATION ,
        "CANVAS_HEIGHT": defaultframeworkconfigGame.DISPLAY_ALL_WIN_DURATION,
        "REEL_CONTAINER_X": defaultframeworkconfigGame.DISPLAY_ALL_WIN_DURATION ,
        "REEL_CONTAINER_Y":  defaultframeworkconfigGame.DISPLAY_ALL_WIN_DURATION ,
        "REEL_CONTAINER_X_IN_PORTRAIT":  defaultframeworkconfigGame.DISPLAY_ALL_WIN_DURATION ,
        "REEL_CONTAINER_Y_IN_PORTRAIT": defaultframeworkconfigGame.DISPLAY_ALL_WIN_DURATION,
        "REEL_CONTAINER_SCALE":  defaultframeworkconfigGame.DISPLAY_ALL_WIN_DURATION ,
        "REEL_CONTAINER_SCALE_IN_PORTRAIT":  defaultframeworkconfigGame.REEL_CONTAINER_SCALE_IN_PORTRAIT,
        "SYMBOL_WIDTH": defaultframeworkconfigGame.DISPLAY_ALL_WIN_DURATION,
        "SYMBOL_HEIGHT": defaultframeworkconfigGame.DISPLAY_ALL_WIN_DURATION ,
        "REEL_WIDTH": defaultframeworkconfigGame.DISPLAY_ALL_WIN_DURATION ,
        "REEL_COLUMN":  defaultframeworkconfigGame.DISPLAY_ALL_WIN_DURATION ,
        "REEL_WIDTH_GAP":  defaultframeworkconfigGame.DISPLAY_ALL_WIN_DURATION ,
        "onWinMask": defaultframeworkconfigGame.onWinMask, // [false, false, false, false, false],
        "REEL_ROWS":  defaultframeworkconfigGame.REEL_ROWS,// [false, false, false, false, false],
        "lineMaskType": "symbolBox",
        "REEL_HEIGHT_GAP": 0,
        "LINE_COLOR_LIST":defaultframeworkconfigGame.LINE_COLOR_LIST ,// [false, false, false, false, false],
        "PAYLINE_ANIMATION": [],
        "LINE_COORDINATES_LIST": [],
        "WIN_SYMBOL_IN_LINE_LIST": [],
        "REEL_POST_STOP_FEATURE_TIMER": defaultframeworkconfigGame.REEL_POST_STOP_FEATURE_TIMER ,

    }


}
export const PaylineConfigurationContext = React.createContext(
    {}
);