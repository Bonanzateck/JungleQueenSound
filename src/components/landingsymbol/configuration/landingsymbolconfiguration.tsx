import { frameworkLandingSymbol } from "@bonanzainteractive/slote_core";
import { configGame } from "../../../slot/data/config";

frameworkLandingSymbol.data = {
    "SYMBOL_WIDTH": configGame.SYMBOL_WIDTH,
    "SYMBOL_HEIGHT": configGame.SYMBOL_HEIGHT,
    "SINGLE_SYMBOL_DELAY_IN_ANIM": 1,
    "SYMBOL_ANIMATION_GRP_WISE": false,
    "SYMBOL_ANIMATION_EFFECT": [],

    "symbols": [],
    "symbolsAnimation": [
        {
            "id": "12",
            "name": "symbol_scatter",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "id": "bonus_sym_anim",
                    "name": "bonus_sym_anim",
                    "type": "Spine",
                    "width": 376,
                    "height": 477.31,
                    "image": "ani_scatterLanding",
                    "animationSpeed": 0.8,
                    "playing": false,
                    "loop": false,
                    "visible": true,
                    "effectType": "abc",
                    "maskHeight": 0,
                    "spineAnimName": "scatter",
                    "x": 105,
                    "y": 105,
                    "spinedata": {
                        "spinename": "ani_scatterLanding",
                        "animationname": "scatter_landing",
                        "loop": false,
                         "timeScale": 1
                    },
                },
            ],
            "loop": false,
            "visible": true,
        },
       
    ]

}