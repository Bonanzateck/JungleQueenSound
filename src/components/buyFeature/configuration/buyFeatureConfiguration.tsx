import React from "react";
import { frameworkButtonPanel, objectTypes } from "@bonanzainteractive/slote_core";

interface IframeworkBuyFeature {
    data: {}
}

export const frameworkBuyFeature: IframeworkBuyFeature = {
    data: {
        "COMPONENTS": [
          
            {
                "name": "backgroundGraphicBuyFeature",
                "type": "Graphic",
                "shape": "rectangle",
                "visible": true,
                "alpha": 0.93,
                "color": "0x131313",
                "x": 0,
                "y": 0,
                "width": 1920,
                "height": 1080,
            },
            {
                "name": "backgroundGraphicBuyFeature_p",
                "type": "Graphic",
                "shape": "rectangle",
                "visible": true,
                "uimode": "mobile",
                "alpha": 0.89,
                "color": "0x000000",
                "x": 389,
                "y": -508,
                "width": 1200,
                "height": 1920,
            },


            {
                "name": "buyFeatureContainer",
                "type": "Container",
                "x": 0,
                "y": 0,
                child: [
                 

                    {
                        "name": "buyFeature_text",
                        "type": "Text",
                        "x": 950,
                        "y": 88,
                        "height": 100,
                        "width": 600,
                        "visible": true,
                        "text": "buyFeatureText1",
                        "scaleToFit": true,
                        "anchor": [0.5, 0.5],
                        "textStyle": {
                            fontFamily: 'MYP Bold',
                            fontSize: 60,
                            fontStyle: 'Bold',
                            align: 'center',
                            fill: ['#e2be20'],
                        }
                    },

                    {
                        "name": "bet_amount_base",
                        "image": "bet_amount_base.png",
                        "type": "Image",
                        "visible": true,
                        "width":282,                  
                        "height":64,             
                        "x": 795,
                        "y": 155,
                    },
                    {
                        "name": "bet_amount_base",
                        "image": "buy_feature_base.png",
                        "type": "Image",
                        "visible": true,
                        "width":594,                  
                        "height":511,             
                        "x": 640,
                        "y": 250,
                    },

                    {
                        "name": "betLevel_text",
                        "type": "Text",
                        "x": 850,
                        "y": 188,
                        "height": 100,
                        "width": 200,
                        "visible": true,
                        "text": "buttonPanelText_1",
                        "scaleToFit": true,
                        "anchor": [0.5, 0.5],
                        "textStyle": {
                            fontFamily: 'MYP Bold',
                            fontSize: 48,
                            fontStyle: 'Bold',
                            align: 'center',
                            fill: ['#e2be20'],
                        }
                    },
                    {
                        "name": "betLevel_textValue",
                        "type": "Text",
                        "x": 980,
                        "y": 188,
                        "height": 100,
                        "width": 200,
                        "visible": true,
                        "text": "",
                        "scaleToFit": true,
                        "anchor": [0.5, 0.5],
                        "textStyle": {
                            fontFamily: 'MYP Bold',
                            fontSize: 48,
                            fontStyle: 'Bold',
                            align: 'center',
                            fill: ['#ffffff'],
                         
                        }
                    },
                    {
                        "name": "buyFeatureText_Heading",
                        "type": "Text",
                        "x": 930,
                        "y": 320,
                        "height": 100,
                        "width": 600,
                        "visible": true,
                        "text": "buyFeatureText_1",
                        "scaleToFit": true,
                        "anchor": [0.5, 0.5],
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 30,
                            fontStyle: 'normal',
                            align: 'center',
                            fill: ['#ffffff'],
                        }
                    },

                    {
                        "name": "betvalue_text",
                        "type": "Text",
                        "x": 930,
                        "y": 722,
                        "height": 100,
                        "width": 600,
                        "visible": true,
                        "text": "$ 1999",
                        "scaleToFit": true,
                        "anchor": [0.5, 0.5],
                        "textStyle": {
                            fontFamily: 'MYP Bold',
                            fontSize: 60,
                            fontStyle: 'bold',
                            align: 'center',
                            fill: ['#ffffff'],
                        }
                    },
                    {
                        "name": "buy_feature_popup",
                        "image": "buy_feature_popup",
                        "type": "Image",
                        "visible": true,
                        "width": 450,                   //30% scaled
                        "height": 299,               //30% scaled
                        "x": 706.5,
                        "y": 350,
                    },


                    {
                        "name": "btn_bet_Decrease",
                        "type": objectTypes.Sprite,
                        "buttonMode": true,
                        "uimode": "desktop",
                        "interactive": true,
                        "x": 725,
                        "y": 165,
                        "height": 42,
                        "width": 42,
                        "text": "",
                        "visible": true,
                        "buttonState": {
                            up: 'bet_minus_standard.png',
                            out: 'bet_minus_standard.png',
                            down: 'bet_minus_down.png',
                            disable: 'bet_minus_disable.png',
                            enable: 'bet_minus_standard.png',
                            hover: 'bet_minus_hover.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "name": "btn_bet_Increase",
                        "type": objectTypes.Sprite,
                        "buttonMode": true,
                        "uimode": "desktop",
                        "interactive": true,
                        "x": 1100,
                        "y": 165,
                        "height": 42,
                        "width": 42,
                        "text": "",
                        "visible": true,
                        "buttonState": {
                            up: 'bet_plus_standard.png',
                            out: 'bet_plus_standard.png',
                            down: 'bet_plus_down.png',
                            disable: 'bet_plus_disable.png',
                            enable: 'bet_plus_standard.png',
                            hover: 'bet_plus_hover.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },


                    {
                        "name": "buyScreen_closeButton",
                        "type": objectTypes.Sprite,
                        "interactive": true,
                        "layout": true,
                        "x": 1685,
                        "y": 480,
                        "height": 141,
                        "width": 141,
                        "visible": true,
                        "buttonMode": true,
                        "buttonState": {
                            up: 'close_button_standard.png',
                            out: 'close_button_standard.png',
                            down: 'close_button_down.png',
                            disable: 'close_button_down.png',
                            enable: 'close_button_standard.png',
                            hover: 'close_button_standard.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "name": "Buy_BuyFeature_popup",
                        "type": objectTypes.Sprite,
                        "buttonMode": true,
                        "uimode": "desktop",
                        "interactive": true,
                        "x": 840,
                        "y": 806,
                        "height": 71,
                        "width": 180,
                        "text": "",
                        "visible": true,
                        "buttonState": {
                            up: 'bet_button_standard.png',
                            out: 'bet_button_standard.png',
                            down: 'bet_button_down.png',
                            disable: 'bet_button_down.png',
                            enable: 'bet_button_standard.png',
                            hover: 'bet_button_hover.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },

                ]
            },
            {
                "name": "popUpContainer",
                "type": "Container",
                "x": 0,
                "y": 0,
                "visible": false,
                child: [
                    {
                        "name": "backgroundGraphicPopupLandscape",
                        "type": "Graphic",
                        "shape": "rectangle",
                        "visible": true,
                        "alpha": 0.93,
                        "color": "0x131313",
                        "x": 0,
                        "y": 0,
                        "width": 1920,
                        "height": 1080,
                    },
                    {
                        "name": "backgroundGraphicPopPortrait",
                        "type": "Graphic",
                        "shape": "rectangle",
                        "visible": true,
                        "uimode": "mobile",
                        "alpha": 0.93,
                        "color": "0x131313",
                        "x": 390,
                        "y": -505,
                        "width": 1080,
                        "height": 1920,
                    },
                    {
                        "name": "bet_amount_base",
                        "image": "buy_feature_base_2.png",
                        "type": "Image",
                        "visible": true,
                        "width":594,                  
                        "height":511,             
                        "x": 640,
                        "y": 250,
                    },
                    {
                        "name": "buyFeatureText_Heading",
                        "type": "Text",
                        "x": 930,
                        "y": 305,
                        "height": 100,
                        "width": 600,
                        "visible": true,
                        "text": "buyFeatureText_12",
                        "scaleToFit": true,
                        "anchor": [0.5, 0.5],
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 30,
                            fontStyle: 'normal',
                            align: 'center',
                            fill: ['#ffffff'],
                        }
                    },
                    {
                        "name": "balance_text",
                        "type": "Text",
                        "x": 930,
                        "y": 680,
                        "height": 100,
                        "width": 600,
                        "visible": true,
                        "text": "$300",
                        "scaleToFit": true,
                        "anchor": [0.5, 0.5],
                        "textStyle": {
                            fontFamily: 'MYP Bold',
                            fontSize: 60,
                            fontStyle: 'bold',
                            align: 'center',
                            fill: ['#e2be20'],
                        }
                    },
                    {
                        "name": "buyFeatureText_Heading2",
                        "type": "Text",
                        "x": 930,
                        "y": 720,
                        "height": 100,
                        "width": 600,
                        "visible": true,
                        "text": "buyFeatureText_11",
                        "scaleToFit": true,
                        "anchor": [0.5, 0.5],
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 30,
                            fontStyle: 'normal',
                            align: 'center',
                            fill: ['#ffffff'],
                        }
                    },
                    {
                        "name": "buy_feature_popup",
                        "image": "buy_feature_popup",
                        "type": "Image",
                        "visible": true,
                        "width": 510,                   //30% scaled
                        "height": 299,                  //30% scaled
                        "x": 680,
                        "y": 340,
                    },
                    {
                        "name": "buyScreen_closeButton2",
                        "type": objectTypes.Sprite,
                        "interactive": true,
                        "layout": true,
                        "x": 1000,
                        "y": 780,
                        "height": 69,
                        "width": 150,
                        "visible": true,
                        "buttonMode": true,
                        "buttonState": {
                            up: 'no_button_standard.png',
                            out: 'no_button_standard.png',
                            down: 'no_button_down.png',
                            disable: 'no_button_down.png',
                            enable: 'no_button_standard.png',
                            hover: 'no_button_hover.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    //done_BuyFeature
                    {
                        "name": "done_BuyFeature",
                        "type": objectTypes.Sprite,
                        "interactive": true,
                        "layout": true,
                        "x": 730,
                        "y": 780,
                        "height": 69,
                        "width": 150,
                        "visible": true,
                        "buttonMode": true,
                        "buttonState": {
                            up: 'yes_button_standard.png',
                            out: 'yes_button_standard.png',
                            down: 'yes_button_down.png',
                            disable: 'yes_button_down.png',
                            enable: 'yes_button_standard.png',
                            hover: 'yes_button_hover.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                ]
            },
          

        ],
    }

};
export const buyFeatureConfigurationContext = React.createContext(
    {}
);