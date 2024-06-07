import React from "react";
import { configGame } from "../../../slot/data/config";


interface IframeworkGameReel {
    data: {
        "REEL_COLUMN": number,
        "REEL_WIDTH": number,
        "REEL_ROWS": number,
        "REEL_GAP": number,
        "SYMBOL_WIDTH": number,
        "SYMBOL_HEIGHT": number,
        "LANDING_SYMBOL_ID_LIST": any,
        "REEL_BLUR": boolean,
        "SPIN_SPEED": Array<number>,
        "ANTICIPATION_SPIN_SPEED": Array<number>,
        "createPosition": {
            "x": number,
            "y": number
        },
        "endPosition": {
            "x": number,
            "y": number
        },
        "singlePositionDropDuration": number,
        "delayDropDuration": number,
        "staggerColumnDelay": number,
        "staggerDropDelay": number,

        "gridPositionIds": any,
        "gridPositions": any,
        "WOBBLE_HEIGHT": Array<number>,
        "WOBBLE_SPEED": Array<number>,
        "CURRENT_WOBBLE_HEIGHT": Array<number>,
        "WIND_SPEED": Array<number>,
        "WIND_HEIGHT": Array<number>,
        "SYMBOL_NUMBER_OFFSET": Array<number>,
        "REEL_STOP_DIFFERENCE": Array<number>,
        "SPIN_SYMBOL_COUNT": Array<number>,
        "SYMBOL_IN_VIEW_COUNT": Array<number>,
        "SPIN_SYMBOL_LENGTH": Array<number>,
        "TURBO_SPIN_SYMBOL_LENGTH": Array<number>,
        "ANTICIPATION_SYMBOL_LENGTH": Array<number>,
        "FPS": Array<number>,
        "FPS_INTERVAL": Array<number>,
        "FRAME_COUNT": Array<number>,
        "START_TIME": Array<number>,
        "NOW": Array<number>,
        "THEN": Array<number>,
        "Y_OFFSET": Array<number>,
        "TURBO": Array<boolean>,
        "STOP_TICK": Array<boolean>,
        "ELAPSED": Array<number>,
        "STOPABLE": Array<boolean>,
        "SYMBOLS_BETWEEN_STOP": Array<number>,
        "SPINNING": Array<boolean>,
        "ENABLED": Array<boolean>,
        "SYMBOL_HEIGHT_MAPPING_LIST": any,
        "TIMERS": Array<any>,
        "REELSTIMERS": Array<any>,
        "REELSTIMERSFORQUICKSPIN": Array<any>,
        "REELSTIMERSFORSLAM": Array<any>,
        "FRAMEANIMATIONREQUEST": Array<any>,
        "REELSNO": number,
        "REELSNOSTOP": number,
        "ISSLAMCLICK": boolean,
        "CALLBACKSTORE": Array<any>,
        "TICKUPSTORE": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    }

}

export const frameworkGameReel: IframeworkGameReel = {
    data: {
        "REEL_COLUMN": 5,
        "REEL_WIDTH": configGame.REEL_WIDTH,
        "REEL_ROWS": 3,
        "REEL_GAP": configGame.REEL_GAP,
        "SYMBOL_WIDTH": configGame.SYMBOL_WIDTH,
        "SYMBOL_HEIGHT": configGame.SYMBOL_HEIGHT,
        "LANDING_SYMBOL_ID_LIST": [],
        "REEL_BLUR": false,     
        "SPIN_SPEED": [10, 10, 10, 10, 10],
        "ANTICIPATION_SPIN_SPEED": [8, 8, 8, 8, 8],
        "staggerDropDelay": 180,
        "staggerColumnDelay": 180,
        "singlePositionDropDuration": 80,
        "delayDropDuration": 2000,
        "createPosition": {
            "x": 64,
            "y": -104
        },
        "endPosition": {
            "x": 64,
            "y": 764
        },
        "gridPositionIds": [4, 3, 2, 1, 0],
        "gridPositions": [
            {
                "x": 64,
                "y": 504
            },
            {
                "x": 64,
                "y": 394
            },
            {
                "x": 64,
                "y": 284
            },
            {
                "x": 64,
                "y": 174
            },
            {
                "x": 64,
                "y": 64
            }
        ],

        "WOBBLE_HEIGHT": [50, 50, 50, 50, 50],
        "WOBBLE_SPEED": [0.5, 0.5, 0.5, 0.5, 0.5],
        "CURRENT_WOBBLE_HEIGHT": [0, 0, 0, 0, 0],
        "WIND_SPEED": [0.5, 0.5, 0.5, 0.5, 0.5],
        "WIND_HEIGHT": [50, 50, 50, 50, 50],
        "SYMBOL_NUMBER_OFFSET": [0, 0, 0, 0, 0],
        "REEL_STOP_DIFFERENCE": [1, 2, 3, 4, 5],
        "SPIN_SYMBOL_COUNT": [0, 0, 0, 0, 0],
        "SYMBOL_IN_VIEW_COUNT": [4, 4, 4, 4, 4],
        "SPIN_SYMBOL_LENGTH": [9, 9, 9, 9, 9],
        "TURBO_SPIN_SYMBOL_LENGTH": [5, 5, 5, 5, 5],
        "ANTICIPATION_SYMBOL_LENGTH": [25, 25, 25, 25, 25],
        "FPS": [30, 30, 30, 30, 30],
        "FPS_INTERVAL": [30, 30, 30, 30, 30],
        "FRAME_COUNT": [30, 30, 30, 30, 30],
        "START_TIME": [30, 30, 30, 30, 30],
        "NOW": [30, 30, 30, 30, 30],
        "THEN": [30, 30, 30, 30, 30],
        "Y_OFFSET": [0, 0, 0, 0, 0],
        "TURBO": [false, false, false, false, false],
        "STOP_TICK": [false, false, false, false, false],
        "ELAPSED": [0, 0, 0, 0, 0],
        "STOPABLE": [false, false, false, false, false],
        "SYMBOLS_BETWEEN_STOP": [1, 1, 1, 1, 1],
        "SPINNING": [false, false, false, false, false],
        "ENABLED": [false, false, false, false, false],
        "SYMBOL_HEIGHT_MAPPING_LIST": [
            { symbolOnReel: 3, height: configGame.SYMBOL_HEIGHT },
        ],

        "TIMERS": [0],
        "REELSTIMERS": [0],
        "REELSTIMERSFORQUICKSPIN": [0],
        "REELSTIMERSFORSLAM": [0],
        "REELSNO": 0,
        "FRAMEANIMATIONREQUEST": [0],
        "REELSNOSTOP": 0,
        "ISSLAMCLICK": false,
        "CALLBACKSTORE": [],
        "TICKUPSTORE": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    }
};

export const GameReelConfigurationContext = React.createContext(
    {}
);