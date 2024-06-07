import React, { Component } from "react";

interface IGameSettingsContainer {
    data: {}
}
export const gameSettingsContainer: IGameSettingsContainer = {
    data: {
        "COMPONENTS": [
            {
                child: [
                    {
                        "id": "gameSettingsMainContainer",
                        "name": "gameSettingsMainContainer",
                        "type": "Container",
                        "x": 0,
                        "y": 0,
                        "visible": true,
                        "filterTypes": [],
                        "parentLayer": "specialAnimationLayer",
                        child: [
                            // {
                            //     "name": "backgroundGraphic",
                            //     "type": "Graphic",
                            //     "shape": "rectangle",
                            //     "visible": true,
                            //     "alpha": 1,
                            //     "color": "0x131313",
                            //     "x": 0,
                            //     "y": 0,
                            //     "width": 1920,
                            //     "height": 1080,

                            // },
                            {
                                "id": "gameSettingsCont_white",
                                "name": "gameSettingsCont_white",
                                "type": "Container",
                                "x": 0,
                                "y": 190,
                                "visible": false,
                                "filterTypes": [],
                                child: [
                                    // {
                                    //     "id": "gameSettingsText_white",
                                    //     "name": "gameSettingsText_white",
                                    //     "type": "Text",
                                    //     "x": 750,
                                    //     "y": 130,
                                    //     "width": 500,
                                    //     "visible": true,
                                    //     "text": "menu-title_settings_general",
                                    //     "scaleToFit": true,
                                    //     "anchor": [0.5, 0.5],
                                    //     "textStyle": {
                                    //         fontFamily: 'Oswald-Regular',
                                    //         fontSize: 50,
                                    //         fontStyle: 'normal',
                                    //         fill: ['#ffffff'],
                                    //     },
                                    // },
                                ]
                            },

                            /*      {
                                     "id": "autoplayCont_white",
                                     "name": "autoplayCont_white",
                                     "type": "Container",
                                     "x": 0,
                                     "y": 0,
                                     "visible": true,
                                     "filterTypes": [],
                                     child: [
                                         {
                                             "id": "autoplayText_white",
                                             "name": "autoplayText_white",
                                             "type": "Text",
                                             "x": 1150,
                                             "y": 130,
                                             "width": 500,
                                             "visible": true,
                                             "text": "game-guide_control_heading_autoplay",
                                             "scaleToFit": true,
                                             "anchor": [0.5, 0.5],
                                             "textStyle": {
                                                 fontFamily: 'Oswald-Regular',
                                                 fontSize: 50,
                                                 fontStyle: 'normal',
                                                 fill: ['#ffffff'],
                                             },
                                         },
                                     ]
                                 },
      */
                            {
                                "id": "gameSettingsCont_yellow",
                                "name": "gameSettingsCont_yellow",
                                "type": "Container",
                                "x": 190,
                                "y": 0,
                                "visible": true,
                                "filterTypes": [],
                                child: [
                                    {
                                        // "id": "gameSettingsText_yellow",
                                        // "name": "gameSettingsText_yellow",
                                        // "type": "Text",
                                        // "x": 750,
                                        // "y": 130,
                                        // "width": 500,
                                        // "visible": true,
                                        // "text": "GAME-SETTINGS",
                                        // "scaleToFit": true,
                                        // "anchor": [0.5, 0.5],
                                        // "textStyle": {
                                        //     fontFamily: 'Oswald-Regular',
                                        //     fontSize: 50,
                                        //     fontStyle: 'normal',
                                        //     fill: ['#f59c06'],
                                        // },
                                    },
                                    /* {
                                        "name": "selected_underline",
                                        "image": "selected_underline.png",
                                        "type": "Image",
                                        "class": "",
                                        "layout": false,
                                        "uimode": "desktop",
                                        "visible": true,
                                        "width": 300,
                                        "height": 4,
                                        "anchor": [0, 0],
                                        "x": 602,
                                        "y": 175,
                                    }, */
                                ]
                            },

                            /*        {
                                       "id": "autoplayCont_yellow",
                                       "name": "autoplayCont_yellow",
                                       "type": "Container",
                                       "x": 0,
                                       "y": 0,
                                       "visible": false,
                                       "filterTypes": [],
                                       child: [
                                           {
                                               "id": "autoplayText_yellow",
                                               "name": "autoplayText_yellow",
                                               "type": "Text",
                                               "x": 1150,
                                               "y": 130,
                                               "width": 500,
                                               "visible": true,
                                               "text": "game-guide_control_heading_autoplay",
                                               "scaleToFit": true,
                                               "anchor": [0.5, 0.5],
                                               "textStyle": {
                                                   fontFamily: 'Oswald-Regular',
                                                   fontSize: 50,
                                                   fontStyle: 'normal',
                                                   fill: ['#f59c06'],
                                               },
                                           },
                                           {
                                               "name": "selected_underline",
                                               "image": "selected_underline.png",
                                               "type": "Image",
                                               "class": "",
                                               "layout": false,
                                               "uimode": "desktop",
                                               "visible": true,
                                               "width": 300,
                                               "height": 4,
                                               "anchor": [0, 0],
                                               "x": 1004,
                                               "y": 175,
                                           },
                                       ]
                                   },
        */
                            {
                                "name": "gameSettingsBtn",
                                "type": "Graphic",
                                "shape": "rectangle",
                                "interactive": true,
                                "buttonMode": true,
                                "visible": true,
                                "alpha": 0.01,
                                "color": "0xffffff",
                                "x": 793,
                                "y": 80,
                                "width": 300,
                                "height": 100,

                            },
                            /*  {
                                 "name": "autoplayBtn",
                                 "type": "Graphic",
                                 "shape": "rectangle",
                                 "interactive": true,
                                 "buttonMode": true,
                                 "visible": true,
                                 "alpha": 0.01,
                                 "color": "0xffffff",
                                 "x": 1008,
                                 "y": 80,
                                 "width": 300,
                                 "height": 100,
 
                             }, */
                            {
                                "id": "GameGeneralComponent",
                                "name": "GameGeneralComponent",
                                "type": "Tag",
                                "class": "",
                                "parentLayer": "specialAnimationLayer",
                                "filterTypes": [],
                                child: []
                            },


                            // {
                            //     "id": "GameAutoplayComponent",
                            //     "name": "GameAutoplayComponent",
                            //     "type": "Tag",
                            //     "class": "",
                            //     "visible": false,
                            //     "parentLayer": "specialAnimationLayer",
                            //     "filterTypes": [],
                            //     child: []
                            // },

                        ]
                    },
                ]
            },

        ],
    }


};

export const GameSettingsContainerConfigurationContext = React.createContext(
    {}
);