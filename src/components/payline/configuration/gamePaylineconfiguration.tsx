// import { frameworkPayline } from "@bonanzainteractive/slote_core";
import { frameworkPayline } from "../../../core/payline/configuration/paylineconfiguration";

import { paylineAssetConfig } from "../../../data/payline";
import { configGame } from "../../../slot/data/config";

frameworkPayline.data = {

    "PAYLINE_TYPE": "ANIMATION",//custom , image , animation
    "NO_OF_LINE": 20,
    "WIN_PRESENTATION_PHASE": ["allLine", "singleLine", "idleLine"],
    "DISPLAY_ALL_WIN_DURATION": configGame.DISPLAY_ALL_WIN_DURATION,
    "TOGGLE_WIN_DURATION": configGame.TOGGLE_WIN_DURATION,
    "TOGGLE_WIN_DURATION_IDLE": configGame.TOGGLE_WIN_DURATION_IDLE,
    "CANVAS_WIDTH": configGame.CANVAS_WIDTH,
    "CANVAS_HEIGHT": configGame.CANVAS_HEIGHT,
    "REEL_CONTAINER_X": configGame.REEL_CONTAINER_X,
    "REEL_CONTAINER_Y": configGame.REEL_CONTAINER_Y+100,
    "REEL_CONTAINER_X_IN_PORTRAIT": configGame.REEL_CONTAINER_X_IN_PORTRAIT,
    "REEL_CONTAINER_Y_IN_PORTRAIT": configGame.REEL_CONTAINER_Y_IN_PORTRAIT+100,
    "REEL_CONTAINER_SCALE": configGame.REEL_CONTAINER_SCALE,
    "REEL_CONTAINER_SCALE_IN_PORTRAIT": configGame.REEL_CONTAINER_SCALE_IN_PORTRAIT,
    "SYMBOL_WIDTH": configGame.SYMBOL_WIDTH,
    "SYMBOL_HEIGHT": configGame.SYMBOL_HEIGHT,
    "REEL_WIDTH": configGame.REEL_WIDTH,
    "REEL_COLUMN": configGame.REEL_COLUMN,
    "REEL_ROWS": configGame.REEL_ROWS,
    "REEL_WIDTH_GAP": configGame.REEL_GAP,
    "onWinMask": [false, false, false, false, false],
    "lineMaskType": "symbolBox",
    "REEL_HEIGHT_GAP": 0,
    "LINE_COLOR_LIST": ["#860", "#8c56c2", "#c2c256", "#56c2c2", "#c25656", "#8c8c8c"],
    "REEL_POST_STOP_FEATURE_TIMER": configGame.REEL_POST_STOP_FEATURE_TIMER,
    /*    "REEL_POST_STOP_GOLDEN_FEATURE_TIMER":configGame.REEL_POST_STOP_GOLDEN_FEATURE_TIMER, */
    "PAYLINE_ANIMATION": [
        {
            "id": "payline1",
            "name": "payline1",
            "image": paylineAssetConfig["PAYLINE_1_2_3_5_10_11"],
            "type": "Animation",
            "width": 1299,
            "height": 16,
            "animationSpeed": 0.05,
            "playing": true,
            "loop": false,
            "visible": true,
            "x": -6,
            "y": 11,
            "currentFrames": [
                "payline_01.webp"
                // "payline_01.png"
            ]
        },
        {
            "id": "payline2",
            "name": "payline2",
            "image": paylineAssetConfig["PAYLINE_1_2_3_5_10_11"],
            "type": "Animation",
            "width": 1299,
            "height": 16,
            "animationSpeed": 0.05,
            "playing": true,
            "loop": false,
            "visible": true,
            "x": -6,
            "y": 11,
            "currentFrames": [
                "payline_02.webp"
                // "payline_02.png"
            ]
        },
        {
            "id": "payline3",
            "name": "payline3",
            "image": paylineAssetConfig["PAYLINE_1_2_3_5_10_11"],
            "type": "Animation",
            "width": 1299,
            "height": 16,
            "animationSpeed": 0.05,
            "playing": true,
            "loop": false,
            "visible": true,
            "x": -6,
            "y": 11,
            "currentFrames": [
                "payline_03.webp"
                // "payline_03.png"
            ]
        },
        {
            "id": "payline4",
            "name": "payline4",
            "image": paylineAssetConfig["PAYLINE_4_16_18_19"],
            "type": "Animation",
            "width": 1299,
            "height": 577,
            "x": -6,
            "y": 11,
            "animationSpeed": 0.05,
            "playing": true,
            "loop": false,
            "visible": true,

            "currentFrames": [
                // "payline_04.png"
                "payline_04.webp"
            ]
        },
        {
            "id": "payline5",
            "name": "payline5",
            "image": paylineAssetConfig["PAYLINE_1_2_3_5_10_11"],
            "type": "Animation",
            "width": 1299,
            "height": 577,
            "x": -6,
            "y": 11,
            "animationSpeed": 0.05,
            "playing": true,
            "loop": false,
            "visible": true,
            "currentFrames": [
                "payline_05.webp"
                // "payline_05.png"
            ]
        },
        {
            "id": "payline6",
            "name": "payline6",
            "image": paylineAssetConfig["PAYLINE_6_7_12_13_14_17"],
            "type": "Animation",
            "width": 1295,
            "height": 274,
            "x": -6,
            "y": 11,
            "animationSpeed": 0.05,
            "playing": true,
            "loop": false,
            "visible": true,
            "currentFrames": [
                "payline_06.webp"
                // "payline_06.png"
            ]
        },
        {
            "id": "payline7",
            "name": "payline7",
            "image": paylineAssetConfig["PAYLINE_6_7_12_13_14_17"],
            "type": "Animation",
            "width": 1295,
            "height": 274,
            "x": -6,
            "y": 11,
            "animationSpeed": 0.05,
            "playing": true,
            "loop": false,
            "visible": true,
            "currentFrames": [
                "payline_07.webp"
                // "payline_07.png"
            ]
        },
        {
            "id": "payline8",
            "name": "payline8",
            "image": paylineAssetConfig["PAYLINE_8_9_15_20"],
            "type": "Animation",
            "width": 1295,
            "height": 138,
            "x": -6,
            "y": 11,
            "animationSpeed": 0.05,
            "playing": true,
            "loop": false,
            "visible": true,
            "currentFrames": [
                "payline_08.webp"
                // "payline_08.png"
            ]
        },
        {
            "id": "payline9",
            "name": "payline9",
            "image": paylineAssetConfig["PAYLINE_8_9_15_20"],
            "type": "Animation",
            "width": 1299,
            "height": 698,
            "x": -6,
            "y": 11,
            "animationSpeed": 0.05,
            "playing": true,
            "loop": false,
            "visible": true,
            "currentFrames": [
                "payline_09.webp"
                // "payline_09.png"
            ]
        },
        {
            "id": "payline10",
            "name": "payline10",
            "image": paylineAssetConfig["PAYLINE_1_2_3_5_10_11"],
            "type": "Animation",
            "width": 1298,
            "height": 257,
            "x": -6,
            "y": 11,
            "animationSpeed": 0.05,
            "playing": true,
            "loop": false,
            "visible": true,
            "currentFrames": [
                "payline_10.webp"
                // "payline_10.png"
            ]
        },
        {
            "id": "payline11",
            "name": "payline11",
            "image": paylineAssetConfig["PAYLINE_1_2_3_5_10_11"],
            "type": "Animation",
            "width": 1298,
            "height": 257,
            "x": -6,
            "y": 11,
            "animationSpeed": 0.05,
            "playing": true,
            "loop": false,
            "visible": true,
            "currentFrames": [
                "payline_11.webp"
                // "payline_11.png"
            ]
        },
        {
            "id": "payline12",
            "name": "payline12",
            "image": paylineAssetConfig["PAYLINE_6_7_12_13_14_17"],
            "type": "Animation",
            "width": 1298,
            "height": 288,
            "x": -6,
            "y": 11,
            "animationSpeed": 0.05,
            "playing": true,
            "loop": false,
            "visible": true,
            "currentFrames": [
                "payline_12.webp"
                // "payline_12.png"
            ]
        },
        {
            "id": "payline13",
            "name": "payline13",
            "image": paylineAssetConfig["PAYLINE_6_7_12_13_14_17"],
            "type": "Animation",
            "width": 1298,
            "height": 288,
            "x": -6,
            "y": 11,
            "animationSpeed": 0.05,
            "playing": true,
            "loop": false,
            "visible": true,
            "currentFrames": [
                "payline_13.webp"
                // "payline_13.png"
            ]
        },
        {
            "id": "payline14",
            "name": "payline14",
            "image": paylineAssetConfig["PAYLINE_6_7_12_13_14_17"],
            "type": "Animation",
            "width": 1298,
            "height": 326,
            "x": -6,
            "y": 11,
            "animationSpeed": 0.05,
            "playing": true,
            "loop": false,
            "visible": true,
            "currentFrames": [
                "payline_14.webp"
                // "payline_14.png"
            ]
        },
        {
            "id": "payline15",
            "name": "payline15",
            "image": paylineAssetConfig["PAYLINE_8_9_15_20"],
            "type": "Animation",
            "width": 1298,
            "height": 326,
            "x": -6,
            "y": 11,
            "animationSpeed": 0.05,
            "playing": true,
            "loop": false,
            "visible": true,
            "currentFrames": [
                "payline_15.webp"
                // "payline_15.png"
            ]
        },
        {
            "id": "payline16",
            "name": "payline16",
            "image": paylineAssetConfig["PAYLINE_4_16_18_19"],
            "type": "Animation",
            "width": 1298,
            "height": 198,
            "x": -6,
            "y": 11,
            "animationSpeed": 0.05,
            "playing": true,
            "loop": false,
            "visible": true,
            "currentFrames": [
                "payline_16.webp"
                // "payline_16.png"
            ]
        },
        {
            "id": "payline17",
            "name": "payline17",
            "image": paylineAssetConfig["PAYLINE_6_7_12_13_14_17"],
            "type": "Animation",
            "width": 1298,
            "height": 198,
            "x": -6,
            "y": 11,
            "animationSpeed": 0.05,
            "playing": true,
            "loop": false,
            "visible": true,
            "currentFrames": [
                "payline_17.webp"
                // "payline_17.png"
            ]
        },
        {
            "id": "payline18",
            "name": "payline18",
            "image": paylineAssetConfig["PAYLINE_4_16_18_19"],
            "type": "Animation",
            "width": 1298,
            "height": 595,
            "x": -6,
            "y": 11,
            "animationSpeed": 0.05,
            "playing": true,
            "loop": false,
            "visible": true,
            "currentFrames": [
                "payline_18.webp"
                // "payline_18.png"
            ]
        },
        {
            "id": "payline19",
            "name": "payline19",
            "image": paylineAssetConfig["PAYLINE_4_16_18_19"],
            "type": "Animation",
            "width": 1298,
            "height": 595,
            "x": -6,
            "y": 11,
            "animationSpeed": 0.05,
            "playing": true,
            "loop": false,
            "visible": true,
            "currentFrames": [
                "payline_19.webp"
                // "payline_19.png"
            ]
        },
        {
            "id": "payline20",
            "name": "payline20",
            "image": paylineAssetConfig["PAYLINE_8_9_15_20"],
            "type": "Animation",
            "width": 1298,
            "height": 493,
            "x": -6,
            "y": 11,
            "animationSpeed": 0.05,
            "playing": true,
            "loop": false,
            "visible": true,
            "currentFrames": [
                "payline_20.webp"
                // "payline_20.png"
            ]
        },

    ],
    "LINE_COORDINATES_LIST": [
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
        [2, 2, 2, 2, 2],
        [0, 1, 2, 1, 0],
        [2, 1, 0, 1, 2],
        [1, 0, 0, 0, 1],
        [1, 2, 2, 2, 1],
        [0, 0, 1, 2, 2],
        [2, 2, 1, 0, 0],
        [1, 2, 1, 0, 1],
        [1, 0, 1, 2, 1],
        [0, 1, 1, 1, 0],
        [2, 1, 1, 1, 2],
        [0, 1, 0, 1, 0],
        [2, 1, 2, 1, 2],
        [1, 1, 0, 1, 1],
        [1, 1, 2, 1, 1],
        [0, 0, 2, 0, 0],
        [2, 2, 0, 2, 2],
        [0, 2, 2, 2, 0],

    ],
    "WIN_SYMBOL_IN_LINE_LIST": [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],

    ]
}