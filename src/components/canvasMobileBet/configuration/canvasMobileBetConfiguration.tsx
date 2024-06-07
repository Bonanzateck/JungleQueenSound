import React from "react";
import { objectTypes }  from "@bonanzainteractive/slote_core";


interface IframeworkCanvasMobileBet {
    data: {}

}
export const frameworkCanvasMobileBet: IframeworkCanvasMobileBet = {
    data: {
        "COMPONENTS": [
            {
                "id": "betContent",
                "name": "betContent",
                "type": "Container",
                "x": 37,
                "y": 81,
                "visible": true,
                "layout": true,
                "uimode": "mobile",
                "filterTypes": [],
                child: [
                    {
                        id: "Bet_Container1Mobile",
                        "name": "Bet_Container1Mobile",
                        "type": "Container",
                        "class": "",
                        "visible": true,
                        "x": 0,
                        "y": 0,
                        "width": 1920,
                        "height": 1080,
                        "filterTypes": [],
                        child: [
                            {
                                "id": "Bet_button_Coin_Value",
                                "name": "Bet_button_Coin_Value",
                                "type": "Text",
                                "x": 963,
                                "y": 160,
                                "visible": true,
                                "text": "menuText_5",
                                "width": 1150,
                                "anchor": [0.5, 0.5],
                                "scaleToFit": true,
                                "textStyle": {
                                    fontFamily: 'Helvetica',
                                    fontSize: 50,
                                    fontWeight: 'bold',
                                    fill: ['#ffffff'],
                                },
                                "parentLayer": "specialAnimationLayer",
                            },
                            {
                                "id": "Bet_button_Bet",
                                "name": "Bet_button_Bet",
                                "type": "Text",
                                "x": 963,
                                "y": 160,
                                "visible": true,
                                "text": "menuText_4",
                                "width": 1150,
                                "anchor": [0.5, 0.5],
                                "scaleToFit": true,
                                "textStyle": {
                                    fontFamily: 'Helvetica',
                                    fontSize: 50,
                                    fontWeight: 'bold',
                                    fill: ['#ffffff'],
                                },
                                "parentLayer": "specialAnimationLayer",
                            },
                            {
                                "name": "bet_text_Bg_image",
                                "image": "bet_btn_p.png",
                                "type": "Image",
                                "anchor": [0.5, 0.5],
                                "visible": true,
                                "width": 466,
                                "height": 149,
                                "x": 918,
                                "y": 306,
                            },
                            {
                                "id": "bet_text",
                                "name": "bet_text",
                                "type": "Text",
                                "x": 902,
                                "y": 308,
                                "visible": true,
                                "text": "",
                                "anchor": [0.5, 0.5],
                                "width": 280,
                                "scaleToFit": true,
                                "textStyle": {
                                    fontFamily: 'Helvetica',
                                    fontSize: 52,
                                    fontWeight: 'normal',
                                    fill: ['#ffffff'],
                                },
                            },
                            {
                                "id": "countMinus",
                                "name": "countMinus",
                                "type": objectTypes.Sprite,
                                "interactive": false,
                                "width": 91,
                                "height": 94,
                                "x": 598,
                                "y": 304,
                                "textStyle": {
                                    fontFamily: 'Arial',
                                    fontSize: 48,
                                    fontStyle: 'normal',
                                    fontWeight: 'bold',
                                    fill: ['#ffffff'],
                                },
                                "anchor": [0.5, 0.5],
                                "visible": true,
                                "buttonMode": true,
                                "buttonState": {
                                    up: 'minus_p.png',
                                    out: 'minus_p.png',
                                    down: 'minus_p.png',
                                    disable: 'minus_disable_p.png',
                                    enable: 'minus_p.png',
                                    hover: 'minus_p.png'
                                },
                                "hitareaVisible": false,
                                "shapeVisible": false,
                                "shape": {}
                            },
                            {
                                "id": "countPlus",
                                "name": "countPlus",
                                "type": objectTypes.Sprite,
                                "interactive": false,
                                "x": 1246,
                                "y": 304,
                                "width": 91,
                                "height": 94,
                                "textStyle": {
                                    fontFamily: 'Arial',
                                    fontSize: 48,
                                    fontStyle: 'normal',
                                    fontWeight: 'bold',
                                    fill: ['#ffffff'],
                                },
                                "anchor": [0.5, 0.5],
                                "visible": true,
                                "buttonMode": true,
                                "buttonState": {
                                    up: 'plus_p.png',
                                    out: 'plus_p.png',
                                    down: 'plus_p.png',
                                    disable: 'plus_disable_p.png',
                                    enable: 'plus_p.png',
                                    hover: 'plus_p.png'
                                },
                                "hitareaVisible": false,
                                "shapeVisible": false,
                                "shape": {}
                            },

                            {
                                "id": "maxbetBtn",
                                "name": "maxbetBtn",
                                "type": objectTypes.Sprite,
                                "interactive": false,
                                "x": 454,
                                "y": 17,
                                "width": 119,
                                "height": 119,
                                "textStyle": {
                                    fontFamily: 'Arial',
                                    fontSize: 48,
                                    fontStyle: 'normal',
                                    fontWeight: 'bold',
                                    fill: ['#ffffff'],
                                },
                                "anchor": [0.5, 0.5],
                                "visible": true,
                                "buttonMode": true,
                                "buttonState": {
                                    up: 'max_up.png',
                                    out: 'max_up.png',
                                    down: 'max_up.png',
                                    disable: 'max_disable.png',
                                    enable: 'max_up.png',
                                    hover: 'max_over.png'

                                },
                                "hitareaVisible": false,
                                "shapeVisible": false,
                                "shape": {}
                            },

                            {
                                "id": "btn_minbet",
                                "name": "btn_minbet",
                                "type": objectTypes.Sprite,
                                "buttonMode": true,
                                "uimode": "desktop",
                                "interactive": true,
                                "layout": true,
                                "x": 35,
                                "y": 17,
                                "height": 60,
                                "width": 60,
                                "text": "",
                                "visible": true,
                                "buttonState": {
                                    up: 'min_up.png',
                                    out: 'min_up.png',
                                    down: 'min_up.png',
                                    disable: 'min_disable.png',
                                    enable: 'min_up.png',
                                    hover: 'min_over.png'
                                },

                            },

                            {
                                "id": "countMinusVoucher",
                                "name": "countMinusVoucher",
                                "type": objectTypes.Sprite,
                                "interactive": false,
                                "width": 91,
                                "height": 94,
                                "x": 598,
                                "y": 304,
                                "textStyle": {
                                    fontFamily: 'Arial',
                                    fontSize: 48,
                                    fontStyle: 'normal',
                                    fontWeight: 'bold',
                                    fill: ['#ffffff'],
                                },
                                "anchor": [0.5, 0.5],
                                "visible": false,
                                "buttonMode": false,
                                "buttonState": {
                                    up: 'minus_disable_p.png',
                                    out: 'minus_disable_p.png',
                                    down: 'minus_disable_p.png',
                                    disable: 'minus_disable_p.png',
                                    enable: 'minus_disable_p.png',
                                    hover: 'minus_disable_p.png'
                                },
                                "hitareaVisible": false,
                                "shapeVisible": false,
                                "shape": {}
                            },
                            {
                                "id": "countPlusVoucher",
                                "name": "countPlusVoucher",
                                "type": objectTypes.Sprite,
                                "interactive": false,
                                "x": 1246,
                                "y": 304,
                                "width": 91,
                                "height": 94,
                                "textStyle": {
                                    fontFamily: 'Arial',
                                    fontSize: 48,
                                    fontStyle: 'normal',
                                    fontWeight: 'bold',
                                    fill: ['#ffffff'],
                                },
                                "anchor": [0.5, 0.5],
                                "visible": false,
                                "buttonMode": false,
                                "buttonState": {
                                    up: 'plus_disable_p.png',
                                    out: 'plus_disable_p.png',
                                    down: 'plus_disable_p.png',
                                    disable: 'plus_disable_p.png',
                                    enable: 'plus_disable_p.png',
                                    hover: 'plus_disable_p.png'
                                },
                                "hitareaVisible": false,
                                "shapeVisible": false,
                                "shape": {}
                            },
                            {
                                "id": "MobileViewSettingPanelUI",
                                "name": "MobileViewSettingPanelUI",
                                "type": "Tag",
                                "class": "",
                                "parentLayer": "specialAnimationLayer",
                                "filterTypes": [],
                                child: []
                            },
                        ]

                    },
                ]
            },
        ]
    }
};
export const CanvasMobileBetConfigurationContext = React.createContext(
    {}
);