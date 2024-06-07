import { any } from "prop-types";

export enum configGame {
    "CANVAS_WIDTH" = 1920,
    "CANVAS_HEIGHT" = 1080,
    "SPIN_TYPE" = 0,
    "SYMBOL_COUNT_MAX" = 8,
    "REEL_ROWS" = 3,
    "REEL_COLUMN" = 5,
    "REEL_HEIGHT" = 627,
    "REEL_CONTAINER_X" = 421,//324,
    "REEL_CONTAINER_Y" = 243,
    "REEL_CONTAINER_X_IN_PORTRAIT" = 10,
    "REEL_CONTAINER_Y_IN_PORTRAIT" = 640,
    "REEL_CONTAINER_SCALE" = 1,
    // "REEL_CONTAINER_SCALE_IN_PORTRAIT" = 0.83,
    "REEL_CONTAINER_SCALE_IN_PORTRAIT" = 1,
    "REEL_GRID_X" = 0,
    "REEL_GRID_Y" = 0,
    "REEL_GRID_X_IN_PORTRAIT" = 8,
    "REEL_GRID_Y_IN_PORTRAIT" = 544,
    "REEL_GRID_SCALE" = 1,
    "REEL_GRID_SCALE_IN_PORTRAIT" = 0.86,
    "REEL_WIDTH" = 209,
    "REEL_GAP" = 4,
    "SYMBOL_WIDTH" = 209,
    "SYMBOL_HEIGHT" = 209,
    "DISPLAY_ALL_WIN_DURATION" = 1,
    "TOGGLE_WIN_DURATION" = 100,
    "TOGGLE_WIN_DURATION_IDLE" = 1,
    "AUTOPLAY_UI_IN_CANVAS" = 0,
    "MENU_UI_IN_CANVAS" = 0,
    "HORIZONTAL_REEL_CONTAINER_X" = 1166,
    "HORIZONTAL_REEL_CONTAINER_Y" = 90,
    "HORIZONTAL_REEL_CONTAINER_X_IN_PORTRAIT" = 719,
    "HORIZONTAL_REEL_CONTAINER_Y_IN_PORTRAIT" = 396,
    "HORIZONTAL_REEL_CONTAINER_X_IN_LANDSCAPE" = 1166,
    "HORIZONTAL_REEL_CONTAINER_Y_IN_LANDSCAPE" = 89,
    "HORIZONTAL_REEL_CONTAINER_SCALE_IN_LANDSCAPE" = 1,
    "HORIZONTAL_REEL_CONTAINER_SCALE_IN_PORTRAIT" = 0.88,
    "HORIZONTAL_REEL_CONTAINER_X_ANIM_IN_PORTRAIT" = 886,
    "LANDING_ANIM_HIDE_DURATION" = .5,
    "HORIZONTAL_REEL_CONTAINER_Y_ANIM_IN_PORTRAIT" = 315,
    "REEL_POST_STOP_FEATURE_TIMER" = 1,
    "TIMERS" = 0,
    "IS_PAYLINE_LOADED" = 1,
    "REEL_COLUMN_FG" = 1,
    "REEL_ROWS_FG" = 1,
    "DARKINGLEYEROPACITY" = 0.60,
}

export const constant = {
    configGame: {
        "landscapeCanvasWidth": 1920,
        "landscapeCanvasHeight": 1080,
        "portraitCanvasWidth": 1080,
        "portraitCanvasHeight": 1920,
        "canvasWidth": 1920,
        "canvasHeight": 1080,
        "fillWindow": false,
        "fullscreen": false,
        "fullscreenMode": "FULLSCREEN_MODE_AUTO_PREFER_HEIGHT",
        "centered": true,
        "showLoaderText": false,
        "cheatModifiedRequest": "",
        "CheatPannel": false,
        "Printsound": false,
        "langCode": "en",
        "currCode": "GBP",
        "gameVersion": "0.0.0",
        "playerId": "",
        "sessionid": '',
        "betValues": [],
        "autoPlayValues": [],
        "defaultBetVal": 0,
        "currentBet": 1,
        "currentTotalWin": 0,
        "balance": 0,
        "isFirstSpin": true,
        "isFreegame": false,
        "isReconstruction": false,
        "manifestCheat": 1,
        "loaderBarWidth": 658,
        "loaderBarMaskX": -655,
        "loaderBarMaskY": 0,
        "loaderBarHeight": 72,
        "loaderBarX": 185,
        "loaderBarY": 180,
        "loaderBarBGX": 185,
        "loaderBarBGY": 180,
        "loaderBarPortraitX": 200,
        "loaderBarPortraitY": 78,
        "loaderBarBGPortraitX": 210,
        "loaderBarBGPortraitY": 90,
        "SCATTER": 12,
        "WILD": 0,
        "REEL_ROW": 3,
        "REEL_COLUMN": 5,
        "NOOFTOTALSCREEN": 5,
        "CURRENT_WINAMOUNT": 0,
        "isCheatRun": 0,
        "REEL_COLUMN_FG": 1,
        "REEL_ROWS_FG": 1,
        "movingImgX": 602,
        "movingImgY": 980,
        "movingImgPortraitX": 190,
        "movingImgPortraitY": 1300,
        "movingImglandscapeX": 602,
        "movingImglandscapeY": 980,
        "Result": any,
        "Text_COUNT_AP": '00',
        "gameCheatString": Array<Number>,
        "BUY_FEATURE_ACTIVE": false,
        "isMountData": false,
        "maxReelSpeed": 6,
        "generalReelSpeed": 4,
    },
    loader: {
        "frameWidth": 418,
        "frameHeight": 95,
        "frameLTR": 740,
        "frameTTB": 950,
        "baseWidth": 354,
        "baseHeight": 67,
        "baseLTR": 785,
        "baseTTB": 965,
        "loaderBarWidth": 356,
        "loaderBarHeight": 72,
        "BarX": 783,
        "BarY": 965,
        "loaderBarPortraitX": 155,
        "loaderBarPortraitY": 80,
        "loaderBarBGPortraitX": 155,
        "loaderBarBGPortraitY": 80,

    },
    reelgridConfig: {
        "LANDING_SYMBOL_ID_LIST": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        "ANTICIPATION_SYMBOL_LIST": ["SC"],
        "ANTICIPATION_TRIGGERING_SYMBOL_MIN_COUNT": 3,
        "ANTICIPATION_TRIGGERING_SYMBOL_MAX_COUNT": 4,
    },
}

declare type IMockOnlineCheat = Array<any>;
export const mockDataCheats: IMockOnlineCheat = [
    { name: "No Win", data: "771, 175, 42, 134, 13, 109, 131, 0" },
    { name: "high win ", data: "11,1,141,45,115,83,81,888,13 " },
    { name: "Traser and Suspense ", data: "402, 450, 69, 82, 112, 26, 20, 6" },
    { name: "Big win", data: "24,1,152,31,103,31,96,708,48,17,702,10,996,51,2037,97,1167,424,2360,2275,428" },
    { name: "Single Line Cheat", data: "10,0,64,116,140,145,35,104,55" },
    { name: "Reveal Feature Trigger", data: "34, 0, 120, 4, 157, 28, 84, 878, 30" },
    { name: "reveal wih coin win", data: "31, 1, 21, 36, 127, 155, 65, 164, 82, 6, 953, 71, 2829, 72, 2849" },
    { name: "Full Board win", data: "0,0,15,27,15,70,13,0,89" },
    { name: "Free Game Trigger", data: "500, 0, 5, 0, 0, 0, 6" },
];

export const server = {
    ///for build=====///
    configGame: {
        "endpoint": "/junglequeen/",
        "gamename": '/junglequeen/',
        "port": 0,// 8080
        "method": "get",//"get","post"
        "postfixpath": "/init",//"get","post"
        "postfixpathToSend": "/init",//"get","post"
        "accountId": "/init",//"get","post",
        "overBuild": false,

    },

}

export const getConnection = {

    getbuildURL(server: any) {
        return server.configGame.endpoint + ":" + server.configGame.port + server.configGame.gamename + "play";
    },
    getbuildInit(server: any) {
        return server.configGame.endpoint + ":" + server.configGame.port + server.configGame.gamename + "config";
    },
    getLocalURL(server: any) {
        if (server.configGame.port === 0) {
            return server.configGame.endpoint + "play";
        } else {
            return server.configGame.endpoint + ":" + server.configGame.port + "action?token=" + localStorage.getItem("playerId");
        }
    },
    getLocalInit(server: any) {
        if (server.configGame.port === 0) {
            return server.configGame.endpoint + "config";
        } else {
            return server.configGame.endpoint + ":" + server.configGame.port + "init?token=" + localStorage.getItem("playerId");
        }
    },
}

