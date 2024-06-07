import { frameworkReels } from "@bonanzainteractive/slote_core";
import { configGame } from "../../slot/data/config";

import { frameworkReelContainer } from "@bonanzainteractive/slote_core";

frameworkReels.data = {
    "REEL_COLUMN": configGame.REEL_COLUMN,
    "REEL_WIDTH": configGame.REEL_WIDTH,
    "REEL_ROWS": configGame.REEL_ROWS,
    "REEL_GAP": configGame.REEL_GAP,
    "SYMBOL_WIDTH": configGame.SYMBOL_WIDTH,
    "SYMBOL_HEIGHT": configGame.SYMBOL_HEIGHT,
    "LANDING_SYMBOL_ID_LIST": [],
    "REEL_BLUR": false,
    "SPIN_SPEED":[8, 8, 8, 8, 8],
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
    "REELSNOSTOP": [0],
    "ISSLAMCLICK": false,
    "CALLBACKSTORE": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "TICKUPSTORE": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

}



frameworkReelContainer.data = {
    "REEL_COLUMN": configGame.REEL_COLUMN,
    "REEL_WIDTH": configGame.REEL_WIDTH,
    "REEL_ROWS": configGame.REEL_ROWS,
    "REEL_GAP": configGame.REEL_GAP,
    "SYMBOL_WIDTH": configGame.SYMBOL_WIDTH,
    "SYMBOL_HEIGHT": configGame.SYMBOL_HEIGHT,
    "REEL_CONTAINER_X": configGame.REEL_CONTAINER_X,
    "REEL_CONTAINER_Y": configGame.REEL_CONTAINER_Y,
    "REEL_HEIGHT": configGame.REEL_HEIGHT,
    "REEL_CONTAINER_X_IN_PORTRAIT": configGame.REEL_CONTAINER_X_IN_PORTRAIT,
    "REEL_CONTAINER_Y_IN_PORTRAIT": configGame.REEL_CONTAINER_Y_IN_PORTRAIT,
    "REEL_CONTAINER_SCALE": configGame.REEL_CONTAINER_SCALE,
    "REEL_CONTAINER_SCALE_IN_PORTRAIT": configGame.REEL_CONTAINER_SCALE_IN_PORTRAIT,
    "IS_STICKY_WILD_PRESENT": false,
     "DARKINGLEYEROPACITY":configGame.DARKINGLEYEROPACITY,
     "DARKINGLEYERBEGINFILL":'0x000000',
    child: [
      
    ]
}



