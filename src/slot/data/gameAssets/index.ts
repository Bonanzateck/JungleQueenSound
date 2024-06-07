
import { setLoadingData } from "@bonanzainteractive/core";
import { loadingAssetConfig } from "../loader/assetconfig"
import { AllAssetLoader } from "../loader/assetconfig";
 import { frameworkReelContainer, frameworkWinbox} from "@bonanzainteractive/slote_core";
 import { slotgameconfigGame } from "@bonanzainteractive/slote_core";
import { configGame } from "../config";


export function setLoadData() {

    let frameworkLoader = {
        data: {
            loader: {
                "baseUrl": "",
                "loadingScreenType1": {
                    "loaderImage": "loaderLandscapeBG",
                    "progressBar": {
                        "offsetX": -530,
                        "offsetY": 240,
                        "type": "graphic",
                        "baseRect": {
                            "height": 5,
                            "width": 500,
                            "color": "0xFFFFFF",
                            "radius": 0
                        },
                        "rect": {
                            "height": 5,
                            "width": 690,
                            "color": "0x22DF22",
                            "radius": 0
                        },
                        "text": {
                            "value": 0,
                            "offsetX": 320,
                            "offsetY": -35,
                            "style": {
                                fontFamily: 'Arial',
                                fontSize: 24,
                                fill: '#ffffff',
                            }
                        },
                        "displayTextOne": {
                            "text": "loaderText_1"
                        },
                        "displayTextTwo": {
                            "text": "loaderText_2"
                        }
                    }
                },
                "loadingScreenType2": {},
                config: loadingAssetConfig,
                "manifest": AllAssetLoader,
            }
        }
    };
    setLoadingData(frameworkLoader);
}
export function slotConfigData() {
   
    slotgameconfigGame.CANVAS_WIDTH = configGame.CANVAS_WIDTH;
    slotgameconfigGame.CANVAS_HEIGHT = configGame.CANVAS_HEIGHT;
    slotgameconfigGame.SPIN_TYPE =1;//REEL;GRID
    slotgameconfigGame.SYMBOL_COUNT_MAX= configGame.SYMBOL_COUNT_MAX;//REEL;GRID
    slotgameconfigGame.REEL_ROWS = configGame.REEL_ROWS;
    slotgameconfigGame.REEL_HEIGHT=  configGame.REEL_HEIGHT;
    slotgameconfigGame.REEL_COLUMN =  configGame.REEL_COLUMN;
    slotgameconfigGame.REEL_CONTAINER_X =  configGame.REEL_CONTAINER_X;
    slotgameconfigGame.REEL_CONTAINER_Y =  configGame.REEL_CONTAINER_Y;
    slotgameconfigGame.REEL_CONTAINER_X_IN_PORTRAIT =  configGame.REEL_CONTAINER_X_IN_PORTRAIT;
    slotgameconfigGame.REEL_CONTAINER_Y_IN_PORTRAIT =  configGame.REEL_CONTAINER_Y_IN_PORTRAIT;
    slotgameconfigGame.REEL_CONTAINER_SCALE =  configGame.REEL_CONTAINER_SCALE;
    slotgameconfigGame.REEL_CONTAINER_SCALE_IN_PORTRAIT =  configGame.REEL_CONTAINER_SCALE_IN_PORTRAIT;
    slotgameconfigGame.REEL_WIDTH =  configGame.REEL_WIDTH;
    slotgameconfigGame.REEL_GAP = configGame.REEL_GAP;
    slotgameconfigGame.SYMBOL_WIDTH =  configGame.SYMBOL_WIDTH;
    slotgameconfigGame.SYMBOL_HEIGHT =  configGame.SYMBOL_HEIGHT;
    slotgameconfigGame.DISPLAY_ALL_WIN_DURATION =  configGame.DISPLAY_ALL_WIN_DURATION;
    slotgameconfigGame.TOGGLE_WIN_DURATION =  configGame.TOGGLE_WIN_DURATION;
    slotgameconfigGame.TOGGLE_WIN_DURATION_IDLE =  configGame.TOGGLE_WIN_DURATION_IDLE;
    slotgameconfigGame.AUTOPLAY_UI_IN_CANVAS =  configGame.AUTOPLAY_UI_IN_CANVAS;
    slotgameconfigGame.MENU_UI_IN_CANVAS =  configGame.MENU_UI_IN_CANVAS;
    slotgameconfigGame.SHOW_GROUP_WIN_SYMBOL_DELAY =  1;
    slotgameconfigGame.LANDING_ANIM_HIDE_DURATION =  configGame.LANDING_ANIM_HIDE_DURATION;
    slotgameconfigGame.REEL_POST_STOP_FEATURE_TIMER= configGame.REEL_POST_STOP_FEATURE_TIMER;   

    frameworkReelContainer.data={
        "REEL_COLUMN": configGame.REEL_COLUMN,
        "REEL_ROWS": configGame.REEL_ROWS,
        "REEL_WIDTH" : configGame.REEL_WIDTH,
        "REEL_GAP": configGame.REEL_GAP,
        "SYMBOL_WIDTH":configGame.SYMBOL_WIDTH,
        "SYMBOL_HEIGHT":configGame.SYMBOL_HEIGHT,
        "REEL_CONTAINER_X": configGame.REEL_CONTAINER_X,
        "REEL_CONTAINER_Y": configGame.REEL_CONTAINER_Y,
        "REEL_HEIGHT": configGame.REEL_HEIGHT,
        "REEL_CONTAINER_X_IN_PORTRAIT":configGame.REEL_CONTAINER_X_IN_PORTRAIT,
        "REEL_CONTAINER_Y_IN_PORTRAIT":configGame.REEL_CONTAINER_Y_IN_PORTRAIT,
        "REEL_CONTAINER_SCALE":configGame.REEL_CONTAINER_SCALE,
        "REEL_CONTAINER_SCALE_IN_PORTRAIT": configGame.REEL_CONTAINER_SCALE_IN_PORTRAIT,
        "IS_STICKY_WILD_PRESENT": false,
        "DARKINGLEYEROPACITY":configGame.DARKINGLEYEROPACITY,
        "DARKINGLEYERBEGINFILL":'0x000000',

        child: [], 

        
    },
    frameworkWinbox.data = {

        "WINBOX_TYPE": "ANIMATION",//custom , image , animation
        "CANVAS_WIDTH": 1280,
        "CANVAS_HEIGHT": 720,
    
        "REEL_CONTAINER_X": 324,
        "REEL_CONTAINER_Y": 135,
        "SYMBOL_WIDTH": 250,
        "SYMBOL_HEIGHT": 250,
        "REEL_WIDTH": 246,
        "REEL_COLUMN": 5,
        "REEL_WIDTH_GAP": 7,
        "onWinMask": [true, true, true, true, true],
        "REEL_HEIGHT_GAP": 0,
        "ALPHA_OF_NON_HIGHLIGHTED_SYMBOL": 0,
        "LINE_COLOR_LIST":["#860", "#8c56c2", "#c2c256", "#56c2c2", "#c25656", "#8c8c8c"],
        "REEL_CONTAINER_X_IN_PORTRAIT": 12,
        "REEL_CONTAINER_Y_IN_PORTRAIT": 795,
        "REEL_CONTAINER_SCALE": 1,
        "REEL_CONTAINER_SCALE_IN_PORTRAIT": 0.83,
    
        "WINBOX_ANIMATION": [
            // {
            //     "name": "winbox",
            //     "type": "Spine",
            //      "image" :"",
            //     "x": 125,
            //     "y": 131,
            //     "width": 1334,
            //     "height": 1092,
            //     "visible": true,
            //     "anchor": [0, 0],
            //     "spinedata": {
            //         "spinename": "winFrames",
            //         "animationname": "animation",
            //         "loop": true,
            //         "timeScale": 0.9
            //     },
            // },
        ],
        "LINE_COORDINATES_LIST": [
            [1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0],
            [2, 2, 2, 2, 2],
            [0, 1, 2, 1, 0],
            [2, 1, 0, 1, 2],
            [0, 0, 1, 0, 0],
            [2, 2, 1, 2, 2],
            [1, 2, 2, 2, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 1, 0, 1],
            [1, 2, 1, 2, 1],
            [0, 1, 0, 1, 0],
            [2, 1, 2, 1, 2],
            [1, 1, 0, 1, 1],
            [1, 1, 2, 1, 1],
            [0, 1, 1, 1, 0],
            [2, 1, 1, 1, 2],
            [0, 1, 2, 2, 2],
            [2, 1, 0, 0, 0],
            [0, 2, 0, 2, 0],
    
    
        ]
        
    }

};
