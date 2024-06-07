
import { frameworkPaytableCore, objectTypes } from "@bonanzainteractive/slote_core"

frameworkPaytableCore.data = {
    "COMPONENTS": [

        {
            "id": "DesktopPaytable",
            "name": "DesktopPaytable",
            "type": "Tag",
            "class": "",
            "filterTypes": [],
            "child": [
                // {
                //     "id": "paytablePage_Graphic",
                //     "name": "paytablePage_Graphic",
                //     "image": 'popup_black.png',
                //     "type": "Image",
                //     "uimode": "desktop",
                //     "class": "",
                //     "filterTypes": [],
                //     "visible": true,
                //     "interactive": false,
                //     "x": 0,
                //     "y": 0,
                //     "height": 1080,
                //     "width": 1920,
                // },

                // {
                //     "id": "FirstSlideText1",
                //     "name": "Text_paytable",
                //     "type": "Text",
                //     "x": 963,
                //     "y": 90,
                //     "visible": true,
                //     "text": "INFO",
                //     "width": 150,
                //     "anchor": [0.5, 0.5],
                //     "textStyle": {
                //         fontFamily: 'Myriad Pro',
                //         fontSize: 52,
                //         fontWeight: 'BOLD',
                //         fill: ['#e2be20'],
                //     },
                //     "parentLayer": "specialAnimationLayer",
                // },
                // {
                //     "name": "Heading_divider",
                //     "type": "Graphic",
                //     "shape": "rectangle",
                //     "visible": true,
                //     "alpha": 1,
                //     "color": "0xe2be20",
                //     "x": 885,
                //     "y": 120,
                //     "width": 155,
                //     "height": 5,
                // },
                {
                    "id": "mainPayTableContainer",
                    "name": "mainPayTableContainer",
                    "type": "Container",
                    "x": 0,
                    "y": 0,
                    "visible": true,
                    // "buttonMode": true,
                    "interactive": true,
                    "filterTypes": [],
                    "parentLayer": "specialAnimationLayer",
                    child: [
                        {
                            "id": "payTableContainer",
                            "name": "payTableContainer",
                            "type": "Container",
                            "x": 0,
                            "y": 0,
                            "visible": true,
                            // "buttonMode": true,
                            "interactive": true,
                            "filterTypes": [],
                            "parentLayer": "specialAnimationLayer",
                            // child: [
                            //     {
                            //         "id": "thirdSlideText1",
                            //         "name": "Text_paytable",
                            //         "type": "Text",
                            //         "x": 963,
                            //         "y": 230,
                            //         "visible": true,
                            //         "text": "paytableHeading1",
                            //         "width": 200,
                            //         "anchor": [0.5, 0.5],
                            //         "textStyle": {
                            //             fontFamily: 'Myriad Pro',
                            //             fontSize: 56,
                            //             fontWeight: 'BOLD',
                            //             fill: ['#ffcc00'],
                            //             /*   stroke: '#9c290c',
                            //               strokeThickness: 4, */
                            //         },
                            //         "parentLayer": "specialAnimationLayer",
                            //     },
                            //     {
                            //         "name": "Heading_divider",
                            //         "type": "Graphic",
                            //         "shape": "rectangle",
                            //         "visible": true,
                            //         "alpha": 1,
                            //         "color": "0xe2be20",
                            //         "x": 857,
                            //         "y": 260,
                            //         "width": 215,
                            //         "height": 5,
                            //     },

                            //     {
                            //         "name": "ThirdSlideImage1",
                            //         "image": "ThirdSlideImage1",
                            //         "type": "Image",
                            //         "class": "",
                            //         "visible": true,
                            //         "width": 258,
                            //         "height": 253,
                            //         "x": 470,
                            //         "y": 287,
                            //     },

                            //     {
                            //         "name": "ThirdSlideImage2",
                            //         "image": "ThirdSlideImage2",
                            //         "type": "Image",
                            //         "class": "",
                            //         "visible": true,
                            //         "width": 258,
                            //         "height": 262,

                            //         "x": 470,
                            //         "y": 628,
                            //     },
                            //     {
                            //         "id": "thirdSlideText1",
                            //         "name": "thirdSlideText1",
                            //         "type": "Text",
                            //         "x": 600,
                            //         "y": 575,
                            //         "width": 240,
                            //         "visible": true,
                            //         "text": "paytablePage3_1",
                            //         "scaleToFit": true,
                            //         "anchor": [0.5, 0.5],
                            //         "textStyle": {
                            //             fontFamily: 'Myriad Pro',
                            //             fontSize: 38,
                            //             fontWeight: 'normal',
                            //             fill: ['#e2be20'],
                            //         }
                            //     },
                            //     {
                            //         "id": "thirdSlideText3",
                            //         "name": "thirdSlideText3",
                            //         "type": "Text",
                            //         "x": 600,
                            //         "y": 920,
                            //         "width": 240,
                            //         "visible": true,
                            //         "text": "paytablePage3_5",
                            //         "scaleToFit": true,
                            //         "anchor": [0.5, 0.5],
                            //         "textStyle": {
                            //             fontFamily: 'Myriad Pro',
                            //             fontSize: 38,
                            //             fontWeight: 'normal',
                            //             fill: ['#e2be20'],

                            //         }
                            //     },
                            //     {
                            //         "id": "thirdSlideText5",
                            //         "name": "thirdSlideText5",
                            //         "type": "Text",
                            //         "x": 1150,
                            //         "y": 760,
                            //         "width": 800,
                            //         "visible": true,
                            //         "anchor": [0.5, 0.5],
                            //         "text": "paytablePage3_6",
                            //         "scaleToFit": true,
                            //         "textStyle": {
                            //             fontFamily: 'ARIAL',
                            //             fontSize: 42,
                            //             fontStyle: 'normal',
                            //             fill: ['#ffffff'],
                            //             align: 'center',
                            //             wordWrap: true,
                            //             wordWrapWidth: 600,
                            //             breakWords: true,

                            //         }
                            //     },

                            //     {
                            //         "id": "thirdSlideText7",
                            //         "name": "thirdSlideText7",
                            //         "type": "Text",
                            //         "x": 1150,
                            //         "y": 430,
                            //         "width": 800,
                            //         "visible": true,
                            //         "text": "paytablePage3_2",
                            //         "scaleToFit": true,
                            //         "textStyle": {
                            //             fontFamily: 'ARIAL',
                            //             fontSize: 42,
                            //             fontStyle: 'normal',
                            //             fill: ['#ffffff'],
                            //             align: 'center',
                            //             wordWrap: true,
                            //             wordWrapWidth: 600,
                            //             breakWords: true,

                            //         }
                            //     },

                            //     //!SECTION second slide
                            //     {
                            //         "name": "ThirdSlideImage1",
                            //         "image": "butterfly_symbol",
                            //         "type": "Image",
                            //         "class": "",
                            //         "visible": true,
                            //         "width": 365,
                            //         "height": 303,
                            //         "x": 410,
                            //         "y": 920,
                            //     },

                            //     {
                            //         "name": "ThirdSlideImage2",
                            //         "image": "golden_queen_symbol",
                            //         "type": "Image",
                            //         "class": "",
                            //         "visible": true,
                            //         "width": 249,
                            //         "height": 247,
                            //         "x": 470,
                            //         "y": 1220,
                            //     },
                            //     {
                            //         "id": "thirdSlideText1",
                            //         "name": "thirdSlideText1",
                            //         "type": "Text",
                            //         "x": 600,
                            //         "y": 1190,
                            //         "width": 240,
                            //         "visible": true,
                            //         "text": "paytablePage3_3",
                            //         "scaleToFit": true,
                            //         "anchor": [0.5, 0.5],
                            //         "textStyle": {
                            //             fontFamily: 'Myriad Pro',
                            //             fontSize: 38,
                            //             fontWeight: 'normal',
                            //             fill: ['#e2be20'],
                            //         }
                            //     },
                            //     {
                            //         "id": "thirdSlideText3",
                            //         "name": "thirdSlideText3",
                            //         "type": "Text",
                            //         "x": 600,
                            //         "y": 1490,
                            //         "width": 240,
                            //         "visible": true,
                            //         "text": "paytablePage3_7",
                            //         "scaleToFit": true,
                            //         "anchor": [0.5, 0.5],
                            //         "textStyle": {
                            //             fontFamily: 'Myriad Pro',
                            //             fontSize: 38,
                            //             fontWeight: 'normal',
                            //             fill: ['#e2be20'],

                            //         }
                            //     },
                            //     {
                            //         "id": "thirdSlideText5",
                            //         "name": "thirdSlideText5",
                            //         "type": "Text",
                            //         "x": 1150,
                            //         "y": 1365,
                            //         "width": 800,
                            //         "visible": true,
                            //         "anchor": [0.5, 0.5],
                            //         "text": "paytablePage3_8",
                            //         "scaleToFit": true,
                            //         "textStyle": {
                            //             fontFamily: 'Myriad Pro',
                            //             fontSize: 42,
                            //             fontStyle: 'normal',
                            //             fill: ['#ffffff'],
                            //             align: 'center',
                            //             wordWrap: true,
                            //             wordWrapWidth: 600,
                            //             breakWords: true,
                            //         }
                            //     },
                            //     {
                            //         "id": "thirdSlideText7",
                            //         "name": "thirdSlideText7",
                            //         "type": "Text",
                            //         "x": 1150,
                            //         "y": 1100,
                            //         "width": 800,
                            //         "visible": true,
                            //         "text": "paytablePage3_4",
                            //         "scaleToFit": true,
                            //         "textStyle": {
                            //             fontFamily: 'ARIAL',
                            //             fontSize: 42,
                            //             fontStyle: 'normal',
                            //             fill: ['#ffffff'],
                            //             align: 'center',
                            //             wordWrap: true,
                            //             wordWrapWidth: 600,
                            //             breakWords: true,

                            //         }
                            //     },

                            //     //!SECTION THIRD slide
                            //     {
                            //         "name": "secondSlideImage1",
                            //         "image": "SecondSlideImage",
                            //         "type": "Image",
                            //         "class": "",
                            //         "visible": true,
                            //         "width": 743,
                            //         "height": 690,
                            //         "anchor": [0.5, 0.5],
                            //         "x": 963,
                            //         "y": 1900,
                            //     },
                            //     {
                            //         id: "hv_1PayoutContainer",
                            //         "name": "hv_1PayoutContainer",
                            //         "type": "Container",
                            //         "class": "",
                            //         "visible": true,
                            //         "x": -460,
                            //         "y": 1645,
                            //         "filterTypes": [],
                            //         child: [
                            //             {
                            //                 "id": "secondSlideText12",
                            //                 "name": "secondSlideText12",
                            //                 "type": "Text",
                            //                 "x": 1289,
                            //                 "y": 193,
                            //                 "width": 80,
                            //                 "visible": true,
                            //                 "text": "firstSlideText5",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0.5, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText13",
                            //                 "name": "secondSlideText13",
                            //                 "type": "Text",
                            //                 "x": 1289,
                            //                 "y": 239,
                            //                 "width": 80,
                            //                 "visible": true,
                            //                 "text": "firstSlideText4",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0.5, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText14",
                            //                 "name": "secondSlideText14",
                            //                 "type": "Text",
                            //                 "x": 1289,
                            //                 "y": 285,
                            //                 "width": 80,
                            //                 "visible": true,
                            //                 "text": "firstSlideText3",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0.5, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText15",
                            //                 "name": "secondSlideText15",
                            //                 "type": "Text",
                            //                 "x": 1289,
                            //                 "y": 331,
                            //                 "width": 80,
                            //                 "visible": true,
                            //                 "text": "firstSlideText2",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0.5, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff'],

                            //                 }
                            //             },


                            //             {
                            //                 "id": "secondSlideText16",
                            //                 "name": "payout_23",
                            //                 "type": "Text",
                            //                 "x": 1315,
                            //                 "y": 193,
                            //                 "width": 170,
                            //                 "visible": true,
                            //                 "text": "100",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText17",
                            //                 "name": "payout_22",
                            //                 "type": "Text",
                            //                 "x": 1315,
                            //                 "y": 239,
                            //                 "width": 170,
                            //                 "visible": true,
                            //                 "text": "100",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText18",
                            //                 "name": "payout_21",
                            //                 "type": "Text",
                            //                 "x": 1315,
                            //                 "y": 285,
                            //                 "width": 170,
                            //                 "visible": true,
                            //                 "text": "100",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText19",
                            //                 "name": "payout_20",
                            //                 "type": "Text",
                            //                 "x": 1315,
                            //                 "y": 331,
                            //                 "width": 170,
                            //                 "visible": true,
                            //                 "text": "100",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                 }
                            //             },
                            //         ]
                            //     },
                            //     {
                            //         id: "hv_2PayoutContainer",
                            //         "name": "hv_2PayoutContainer",
                            //         "type": "Container",
                            //         "class": "",
                            //         "visible": true,
                            //         "x": 555,
                            //         "y": 1580,
                            //         "filterTypes": [],
                            //         child: [
                            //             {
                            //                 "id": "secondSlideText20",
                            //                 "name": "secondSlideText20",
                            //                 "type": "Text",
                            //                 "x": 824,
                            //                 "y": 491,
                            //                 "width": 80,
                            //                 "visible": true,
                            //                 "text": "firstSlideText5",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0.5, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText21",
                            //                 "name": "secondSlideText21",
                            //                 "type": "Text",
                            //                 "x": 824,
                            //                 "y": 537,
                            //                 "width": 80,
                            //                 "visible": true,
                            //                 "text": "firstSlideText4",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0.5, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText22",
                            //                 "name": "secondSlideText22",
                            //                 "type": "Text",
                            //                 "x": 824,
                            //                 "y": 583,
                            //                 "width": 80,
                            //                 "visible": true,
                            //                 "text": "firstSlideText3",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0.5, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText23",
                            //                 "name": "secondSlideText23",
                            //                 "type": "Text",
                            //                 "x": 824,
                            //                 "y": 629,
                            //                 "width": 80,
                            //                 "visible": true,
                            //                 "text": "firstSlideText2",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0.5, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff'],

                            //                 }
                            //             },


                            //             {
                            //                 "id": "secondSlideText24",
                            //                 "name": "payout_53",
                            //                 "type": "Text",
                            //                 "x": 850,
                            //                 "y": 491,
                            //                 "width": 170,
                            //                 "visible": true,
                            //                 "text": "100",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff', '#ffffff', '#ffffff'],
                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText25",
                            //                 "name": "payout_52",
                            //                 "type": "Text",
                            //                 "x": 850,
                            //                 "y": 537,
                            //                 "width": 170,
                            //                 "visible": true,
                            //                 "text": "100",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText26",
                            //                 "name": "payout_51",
                            //                 "type": "Text",
                            //                 "x": 850,
                            //                 "y": 583,
                            //                 "width": 170,
                            //                 "visible": true,
                            //                 "text": "100",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText27",
                            //                 "name": "payout_50",
                            //                 "type": "Text",
                            //                 "x": 850,
                            //                 "y": 629,
                            //                 "width": 170,
                            //                 "visible": true,
                            //                 "text": "100",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff', '#ffffff', '#ffffff'],
                            //                 }
                            //             },
                            //         ]
                            //     },
                            //     {
                            //         id: "hv_3PayoutContainer",
                            //         "name": "hv_3PayoutContainer",
                            //         "type": "Container",
                            //         "class": "",
                            //         "visible": true,
                            //         "x": 900,
                            //         "y": 1470,
                            //         "filterTypes": [],
                            //         child: [
                            //             {
                            //                 "id": "secondSlideText2",
                            //                 "name": "secondSlideText2_hv_11",
                            //                 "type": "Text",
                            //                 "x": 476,
                            //                 "y": 374,
                            //                 "visible": true,
                            //                 "text": "firstSlideText5",
                            //                 "width": 80,
                            //                 "scaleToFit": true,
                            //                 "anchor": [0.5, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText3",
                            //                 "name": "secondSlideText3_hv_12",
                            //                 "type": "Text",
                            //                 "x": 476,
                            //                 "y": 420,
                            //                 "visible": true,
                            //                 "text": "firstSlideText4",
                            //                 "width": 80,
                            //                 "scaleToFit": true,
                            //                 "anchor": [0.5, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText4",
                            //                 "name": "secondSlideText3_hv_13",
                            //                 "type": "Text",
                            //                 "x": 476,
                            //                 "y": 460,
                            //                 "width": 80,
                            //                 "visible": true,
                            //                 "text": "firstSlideText3",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0.5, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText5",
                            //                 "name": "secondSlideText3_hv_14",
                            //                 "type": "Text",
                            //                 "x": 476,
                            //                 "y": 500,
                            //                 "width": 80,
                            //                 "visible": true,
                            //                 "text": "firstSlideText2",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0.5, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff'],

                            //                 }
                            //             },


                            //             {
                            //                 "id": "symid_hv_1_mul_6",
                            //                 "name": "payout_33",
                            //                 "type": "Text",
                            //                 "x": 500,
                            //                 "y": 374,
                            //                 "width": 170,
                            //                 "visible": true,
                            //                 "text": "100",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     align: 'left',
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "symid_hv_1_mul_5",
                            //                 "name": "payout_32",
                            //                 "type": "Text",
                            //                 "x": 500,
                            //                 "y": 420,
                            //                 "width": 170,
                            //                 "visible": true,
                            //                 "text": "100",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     align: 'left',
                            //                     fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "symid_hv_1_mul_4",
                            //                 "name": "payout_31",
                            //                 "type": "Text",
                            //                 "x": 500,
                            //                 "y": 460,
                            //                 "width": 170,
                            //                 "visible": true,
                            //                 "text": "100",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     align: 'left',
                            //                     fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "symid_hv_1_mul_3",
                            //                 "name": "payout_30",
                            //                 "type": "Text",
                            //                 "x": 500,
                            //                 "y": 500,
                            //                 "width": 170,
                            //                 "visible": true,
                            //                 "text": "100",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     align: 'left',
                            //                     fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                 }
                            //             },

                            //         ]
                            //     },
                            //     {
                            //         id: "hv_4PayoutContainer",
                            //         "name": "hv_4PayoutContainer",
                            //         "type": "Container",
                            //         "class": "",
                            //         "visible": true,
                            //         "x": -462,
                            //         "y": 1580,

                            //         "filterTypes": [],
                            //         child: [
                            //             {
                            //                 "id": "secondSlideText28",
                            //                 "name": "secondSlideText28",
                            //                 "type": "Text",
                            //                 "x": 1289,
                            //                 "y": 491,
                            //                 "width": 80,
                            //                 "visible": true,
                            //                 "text": "firstSlideText5",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0.5, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText29",
                            //                 "name": "secondSlideText29",
                            //                 "type": "Text",
                            //                 "x": 1289,
                            //                 "y": 537,
                            //                 "width": 80,
                            //                 "visible": true,
                            //                 "text": "firstSlideText4",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0.5, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText30",
                            //                 "name": "secondSlideText30",
                            //                 "type": "Text",
                            //                 "x": 1289,
                            //                 "y": 583,
                            //                 "width": 80,
                            //                 "visible": true,
                            //                 "text": "firstSlideText3",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0.5, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText31",
                            //                 "name": "secondSlideText31",
                            //                 "type": "Text",
                            //                 "x": 1289,
                            //                 "y": 629,
                            //                 "width": 80,
                            //                 "visible": true,
                            //                 "text": "firstSlideText2",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0.5, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff'],
                            //                 }
                            //             },


                            //             {
                            //                 "id": "secondSlideText32",
                            //                 "name": "payout_43",
                            //                 "type": "Text",
                            //                 "x": 1315,
                            //                 "y": 491,
                            //                 "width": 170,
                            //                 "visible": true,
                            //                 "text": "100",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText33",
                            //                 "name": "payout_42",
                            //                 "type": "Text",
                            //                 "x": 1315,
                            //                 "y": 537,
                            //                 "width": 170,
                            //                 "visible": true,
                            //                 "text": "100",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText34",
                            //                 "name": "payout_41",
                            //                 "type": "Text",
                            //                 "x": 1315,
                            //                 "y": 583,
                            //                 "width": 170,
                            //                 "visible": true,
                            //                 "text": "100",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText35",
                            //                 "name": "payout_40",
                            //                 "type": "Text",
                            //                 "x": 1315,
                            //                 "y": 629,
                            //                 "width": 170,
                            //                 "visible": true,
                            //                 "text": "100",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                 }
                            //             },

                            //         ]
                            //     },
                            //     {
                            //         id: "hv_5PayoutContainer",
                            //         "name": "hv_5PayoutContainer",
                            //         "type": "Container",
                            //         "class": "",
                            //         "visible": true,
                            //         "x": -182,
                            //         "y": 1106,
                            //         "filterTypes": [],
                            //         child: [
                            //             {
                            //                 "id": "secondSlideText28",
                            //                 "name": "secondSlideText28",
                            //                 "type": "Text",
                            //                 "x": 1289,
                            //                 "y": 491,
                            //                 "width": 80,
                            //                 "visible": true,
                            //                 "text": "firstSlideText5",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0.5, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText29",
                            //                 "name": "secondSlideText29",
                            //                 "type": "Text",
                            //                 "x": 1289,
                            //                 "y": 537,
                            //                 "width": 80,
                            //                 "visible": true,
                            //                 "text": "firstSlideText4",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0.5, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText30",
                            //                 "name": "secondSlideText30",
                            //                 "type": "Text",
                            //                 "x": 1289,
                            //                 "y": 583,
                            //                 "width": 80,
                            //                 "visible": true,
                            //                 "text": "firstSlideText3",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0.5, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText31",
                            //                 "name": "secondSlideText31",
                            //                 "type": "Text",
                            //                 "x": 1289,
                            //                 "y": 629,
                            //                 "width": 80,
                            //                 "visible": true,
                            //                 "text": "firstSlideText2",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0.5, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff'],
                            //                 }
                            //             },


                            //             {
                            //                 "id": "secondSlideText32",
                            //                 "name": "payout_13",
                            //                 "type": "Text",
                            //                 "x": 1315,
                            //                 "y": 491,
                            //                 "width": 170,
                            //                 "visible": true,
                            //                 "text": "100",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText33",
                            //                 "name": "payout_12",
                            //                 "type": "Text",
                            //                 "x": 1315,
                            //                 "y": 537,
                            //                 "width": 170,
                            //                 "visible": true,
                            //                 "text": "100",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText34",
                            //                 "name": "payout_11",
                            //                 "type": "Text",
                            //                 "x": 1315,
                            //                 "y": 583,
                            //                 "width": 170,
                            //                 "visible": true,
                            //                 "text": "100",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                 }
                            //             },
                            //             {
                            //                 "id": "secondSlideText35",
                            //                 "name": "payout_10",
                            //                 "type": "Text",
                            //                 "x": 1315,
                            //                 "y": 629,
                            //                 "width": 170,
                            //                 "visible": true,
                            //                 "text": "100",
                            //                 "scaleToFit": true,
                            //                 "anchor": [0, 0.5],
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                 }
                            //             },

                            //         ]
                            //     },

                            //     //!SECTION FOURTH slide

                            //     {
                            //         id: "fourth_slide",
                            //         "name": "fourth_slide",
                            //         "type": "Container",
                            //         "class": "",
                            //         "visible": true,
                            //         "x": -8,
                            //         "y": 2100,
                            //         "width": 1920,
                            //         "height": 1080,
                            //         "filterTypes": [],
                            //         child: [

                            //             {
                            //                 "name": "FirstSlideImage",
                            //                 "image": "FirstSlideImage",
                            //                 "type": "Image",
                            //                 "class": "",
                            //                 "visible": true,
                            //                 "width": 682,
                            //                 "height": 529,
                            //                 "anchor": [0.5, 0.5],
                            //                 "x": 963,
                            //                 "y": 460,
                            //             },


                            //             {
                            //                 id: "APayoutContainer",
                            //                 "name": "APayoutContainer",
                            //                 "type": "Container",
                            //                 "class": "",
                            //                 "visible": true,
                            //                 "x": 81,
                            //                 "y": 418,

                            //                 "filterTypes": [],
                            //                 child: [
                            //                     {
                            //                         "id": "FirstSlideText12",
                            //                         "name": "FirstSlideText12",
                            //                         "type": "Text",
                            //                         "x": 1300,
                            //                         "y": 193,
                            //                         "width": 80,
                            //                         "visible": true,
                            //                         "text": "secondSlideText2",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0.5, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText13",
                            //                         "name": "FirstSlideText13",
                            //                         "type": "Text",
                            //                         "x": 1300,
                            //                         "y": 239,
                            //                         "width": 80,
                            //                         "visible": true,
                            //                         "text": "secondSlideText3",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0.5, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText14",
                            //                         "name": "FirstSlideText14",
                            //                         "type": "Text",
                            //                         "x": 1300,
                            //                         "y": 285,
                            //                         "width": 80,
                            //                         "visible": true,
                            //                         "text": "secondSlideText4",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0.5, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff'],

                            //                         }
                            //                     },



                            //                     {
                            //                         "id": "FirstSlideText16",
                            //                         "name": "payout_112",
                            //                         "type": "Text",
                            //                         "x": 1325,
                            //                         "y": 193,
                            //                         "width": 170,
                            //                         "visible": true,
                            //                         "text": "100",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText17",
                            //                         "name": "payout_111",
                            //                         "type": "Text",
                            //                         "x": 1325,
                            //                         "y": 239,
                            //                         "width": 170,
                            //                         "visible": true,
                            //                         "text": "100",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText18",
                            //                         "name": "payout_110",
                            //                         "type": "Text",
                            //                         "x": 1325,
                            //                         "y": 285,
                            //                         "width": 170,
                            //                         "visible": true,
                            //                         "text": "100",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                         }
                            //                     },

                            //                 ]
                            //             },


                            //             {
                            //                 id: "KPayoutContainer",
                            //                 "name": "KPayoutContainer",
                            //                 "type": "Container",
                            //                 "class": "",
                            //                 "visible": true,
                            //                 "x": -455,
                            //                 "y": 417,

                            //                 "filterTypes": [],
                            //                 child: [
                            //                     {
                            //                         "id": "FirstSlideText12",
                            //                         "name": "FirstSlideText12",
                            //                         "type": "Text",
                            //                         "x": 1300,
                            //                         "y": 193,
                            //                         "width": 80,
                            //                         "visible": true,
                            //                         "text": "secondSlideText2",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0.5, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText13",
                            //                         "name": "FirstSlideText13",
                            //                         "type": "Text",
                            //                         "x": 1300,
                            //                         "y": 239,
                            //                         "width": 80,
                            //                         "visible": true,
                            //                         "text": "secondSlideText3",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0.5, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText14",
                            //                         "name": "FirstSlideText14",
                            //                         "type": "Text",
                            //                         "x": 1300,
                            //                         "y": 285,
                            //                         "width": 80,
                            //                         "visible": true,
                            //                         "text": "secondSlideText4",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0.5, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff'],

                            //                         }
                            //                     },



                            //                     {
                            //                         "id": "FirstSlideText16",
                            //                         "name": "payout_102",
                            //                         "type": "Text",
                            //                         "x": 1325,
                            //                         "y": 193,
                            //                         "width": 170,
                            //                         "visible": true,
                            //                         "text": "100",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText17",
                            //                         "name": "payout_101",
                            //                         "type": "Text",
                            //                         "x": 1325,
                            //                         "y": 239,
                            //                         "width": 170,
                            //                         "visible": true,
                            //                         "text": "100",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText18",
                            //                         "name": "payout_100",
                            //                         "type": "Text",
                            //                         "x": 1325,
                            //                         "y": 285,
                            //                         "width": 170,
                            //                         "visible": true,
                            //                         "text": "100",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                         }
                            //                     },

                            //                 ]
                            //             },

                            //             {
                            //                 id: "QPayoutContainer",
                            //                 "name": "QPayoutContainer",
                            //                 "type": "Container",
                            //                 "class": "",
                            //                 "visible": true,
                            //                 "x": 81,
                            //                 "y": 212,

                            //                 "filterTypes": [],
                            //                 child: [
                            //                     {
                            //                         "id": "FirstSlideText12",
                            //                         "name": "FirstSlideText12",
                            //                         "type": "Text",
                            //                         "x": 1300,
                            //                         "y": 193,
                            //                         "width": 80,
                            //                         "visible": true,
                            //                         "text": "secondSlideText2",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0.5, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText13",
                            //                         "name": "FirstSlideText13",
                            //                         "type": "Text",
                            //                         "x": 1300,
                            //                         "y": 239,
                            //                         "width": 80,
                            //                         "visible": true,
                            //                         "text": "secondSlideText3",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0.5, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText14",
                            //                         "name": "FirstSlideText14",
                            //                         "type": "Text",
                            //                         "x": 1300,
                            //                         "y": 285,
                            //                         "width": 80,
                            //                         "visible": true,
                            //                         "text": "secondSlideText4",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0.5, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff'],

                            //                         }
                            //                     },



                            //                     {
                            //                         "id": "FirstSlideText16",
                            //                         "name": "payout_92",
                            //                         "type": "Text",
                            //                         "x": 1325,
                            //                         "y": 193,
                            //                         "width": 170,
                            //                         "visible": true,
                            //                         "text": "100",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText17",
                            //                         "name": "payout_91",
                            //                         "type": "Text",
                            //                         "x": 1325,
                            //                         "y": 239,
                            //                         "width": 170,
                            //                         "visible": true,
                            //                         "text": "100",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText18",
                            //                         "name": "payout_90",
                            //                         "type": "Text",
                            //                         "x": 1325,
                            //                         "y": 285,
                            //                         "width": 170,
                            //                         "visible": true,
                            //                         "text": "100",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                         }
                            //                     },

                            //                 ]
                            //             },


                            //             {
                            //                 id: "JPayoutContainer",
                            //                 "name": "JPayoutContainer",
                            //                 "type": "Container",
                            //                 "class": "",
                            //                 "visible": true,
                            //                 "x": -455,
                            //                 "y": 212,

                            //                 "filterTypes": [],
                            //                 child: [
                            //                     {
                            //                         "id": "FirstSlideText12",
                            //                         "name": "FirstSlideText12",
                            //                         "type": "Text",
                            //                         "x": 1300,
                            //                         "y": 193,
                            //                         "width": 80,
                            //                         "visible": true,
                            //                         "text": "secondSlideText2",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0.5, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText13",
                            //                         "name": "FirstSlideText13",
                            //                         "type": "Text",
                            //                         "x": 1300,
                            //                         "y": 239,
                            //                         "width": 80,
                            //                         "visible": true,
                            //                         "text": "secondSlideText3",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0.5, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText14",
                            //                         "name": "FirstSlideText14",
                            //                         "type": "Text",
                            //                         "x": 1300,
                            //                         "y": 285,
                            //                         "width": 80,
                            //                         "visible": true,
                            //                         "text": "secondSlideText4",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0.5, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff'],

                            //                         }
                            //                     },



                            //                     {
                            //                         "id": "FirstSlideText16",
                            //                         "name": "payout_82",
                            //                         "type": "Text",
                            //                         "x": 1325,
                            //                         "y": 193,
                            //                         "width": 170,
                            //                         "visible": true,
                            //                         "text": "100",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText17",
                            //                         "name": "payout_81",
                            //                         "type": "Text",
                            //                         "x": 1325,
                            //                         "y": 239,
                            //                         "width": 170,
                            //                         "visible": true,
                            //                         "text": "100",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText18",
                            //                         "name": "payout_80",
                            //                         "type": "Text",
                            //                         "x": 1325,
                            //                         "y": 285,
                            //                         "width": 170,
                            //                         "visible": true,
                            //                         "text": "100",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                         }
                            //                     },

                            //                 ]
                            //             },

                            //             {
                            //                 id: "9_10PayoutContainer",
                            //                 "name": "9_10PayoutContainer",
                            //                 "type": "Container",
                            //                 "class": "",
                            //                 "visible": true,
                            //                 "x": 10,
                            //                 "y": -280,

                            //                 "filterTypes": [],
                            //                 child: [
                            //                     {
                            //                         "id": "FirstSlideText20",
                            //                         "name": "FirstSlideText20",
                            //                         "type": "Text",
                            //                         "x": 838,
                            //                         "y": 491,
                            //                         "width": 80,
                            //                         "visible": true,
                            //                         "text": "secondSlideText2",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0.5, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText21",
                            //                         "name": "FirstSlideText21",
                            //                         "type": "Text",
                            //                         "x": 838,
                            //                         "y": 537,
                            //                         "width": 80,
                            //                         "visible": true,
                            //                         "text": "secondSlideText3",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0.5, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText22",
                            //                         "name": "FirstSlideText22",
                            //                         "type": "Text",
                            //                         "x": 838,
                            //                         "y": 583,
                            //                         "width": 80,
                            //                         "visible": true,
                            //                         "text": "secondSlideText4",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0.5, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff'],

                            //                         }
                            //                     },



                            //                     {
                            //                         "id": "FirstSlideText24",
                            //                         "name": "payout_62",
                            //                         "type": "Text",
                            //                         "x": 861,
                            //                         "y": 491,
                            //                         "width": 170,
                            //                         "visible": true,
                            //                         "text": "100",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff', '#ffffff', '#ffffff'],
                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText25",
                            //                         "name": "payout_61",
                            //                         "type": "Text",
                            //                         "x": 861,
                            //                         "y": 537,
                            //                         "width": 170,
                            //                         "visible": true,
                            //                         "text": "100",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText26",
                            //                         "name": "payout_60",
                            //                         "type": "Text",
                            //                         "x": 861,
                            //                         "y": 583,
                            //                         "width": 170,
                            //                         "visible": true,
                            //                         "text": "100",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                         }
                            //                     },

                            //                 ]
                            //             },

                            //             {
                            //                 id: "9_11PayoutContainer",
                            //                 "name": "9_11PayoutContainer",
                            //                 "type": "Container",
                            //                 "class": "",
                            //                 "visible": true,
                            //                 "x": 542,
                            //                 "y": -280,

                            //                 "filterTypes": [],
                            //                 child: [
                            //                     {
                            //                         "id": "FirstSlideText20",
                            //                         "name": "FirstSlideText20",
                            //                         "type": "Text",
                            //                         "x": 838,
                            //                         "y": 491,
                            //                         "width": 80,
                            //                         "visible": true,
                            //                         "text": "secondSlideText2",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0.5, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText21",
                            //                         "name": "FirstSlideText21",
                            //                         "type": "Text",
                            //                         "x": 838,
                            //                         "y": 537,
                            //                         "width": 80,
                            //                         "visible": true,
                            //                         "text": "secondSlideText3",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0.5, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText22",
                            //                         "name": "FirstSlideText22",
                            //                         "type": "Text",
                            //                         "x": 838,
                            //                         "y": 583,
                            //                         "width": 80,
                            //                         "visible": true,
                            //                         "text": "secondSlideText4",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0.5, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText24",
                            //                         "name": "payout_72",
                            //                         "type": "Text",
                            //                         "x": 861,
                            //                         "y": 491,
                            //                         "width": 170,
                            //                         "visible": true,
                            //                         "text": "100",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff', '#ffffff', '#ffffff'],
                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText25",
                            //                         "name": "payout_71",
                            //                         "type": "Text",
                            //                         "x": 861,
                            //                         "y": 537,
                            //                         "width": 170,
                            //                         "visible": true,
                            //                         "text": "100",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "FirstSlideText26",
                            //                         "name": "payout_70",
                            //                         "type": "Text",
                            //                         "x": 861,
                            //                         "y": 583,
                            //                         "width": 170,
                            //                         "visible": true,
                            //                         "text": "100",
                            //                         "scaleToFit": true,
                            //                         "anchor": [0, 0.5],
                            //                         "textStyle": {
                            //                             fontFamily: 'Myriad Pro',
                            //                             fontSize: 32,
                            //                             fontStyle: 'normal',
                            //                             fill: ['#ffffff', '#ffffff', '#ffffff'],

                            //                         }
                            //                     },
                            //                 ]
                            //             },
                            //         ]
                            //     },

                            //     //!SECTION FIFTH slide

                            //     {
                            //         id: "fifth_slide",
                            //         "name": "fifth_slide",
                            //         "type": "Container",
                            //         "class": "",
                            //         "visible": true,
                            //         "x": 0,
                            //         "y": 2700,
                            //         "width": 1920,
                            //         "height": 1080,
                            //         "filterTypes": [],
                            //         child: [
                            //             {
                            //                 "id": "forthSlideText1",
                            //                 "name": "Text_paytable",
                            //                 "type": "Text",
                            //                 "x": 963,
                            //                 "y": 230,
                            //                 "width": 800,
                            //                 "visible": true,
                            //                 "text": "paytableHeading2",
                            //                 "scaleToFit": true,
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 56,
                            //                     fontWeight: 'BOLD',
                            //                     fill: ['#ffcc00'],
                            //                 },
                            //                 "parentLayer": "specialAnimationLayer",
                            //             },
                            //             {
                            //                 "name": "Heading_divider",
                            //                 "type": "Graphic",
                            //                 "shape": "rectangle",
                            //                 "visible": true,
                            //                 "alpha": 1,
                            //                 "color": "0xe2be20",
                            //                 "x": 700,
                            //                 "y": 260,
                            //                 "width": 525,
                            //                 "height": 5,
                            //             },

                            //             {
                            //                 "name": "forthSlideImage1",
                            //                 "image": "forthSlideImage1",
                            //                 "type": "Image",
                            //                 "class": "",
                            //                 "visible": true,
                            //                 "width": 563,
                            //                 "height": 327,
                            //                 "x": 670,
                            //                 "y": 250,
                            //             },

                            //             {
                            //                 "id": "forthSlideText4",
                            //                 "name": "forthSlideText4",
                            //                 "type": "Text",
                            //                 "x": 978,
                            //                 "y": 718,
                            //                 "width": 1300,
                            //                 "visible": true,
                            //                 "text": "paytablePage4_1",
                            //                 "scaleToFit": true,
                            //                 "textStyle": {
                            //                     fontFamily: 'ARIAL',
                            //                     fontSize: 42,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff'],
                            //                     align: 'center',
                            //                     wordWrap: true,
                            //                     wordWrapWidth: 986,
                            //                     breakWords: true,
                            //                 }
                            //             },

                            //             {
                            //                 "name": "butterfly_feature_all_symbols",
                            //                 "image": "butterfly_feature_all_symbols",
                            //                 "type": "Image",
                            //                 "class": "",
                            //                 "visible": true,
                            //                 "width": 573,
                            //                 "height": 91,
                            //                 "x": 670,
                            //                 "y": 875,
                            //             },
                            //         ]
                            //     },

                            //     //!SECTION SIXTH slide

                            //     {
                            //         id: "sixth_slide",
                            //         "name": "sixth_slide",
                            //         "type": "Container",
                            //         "class": "",
                            //         "visible": true,
                            //         "x": 0,
                            //         "y": 3530,
                            //         "width": 1920,
                            //         "height": 1080,
                            //         "filterTypes": [],
                            //         child: [
                            //             {
                            //                 "id": "fifthSlideText1",
                            //                 "name": "Text_paytable",
                            //                 "type": "Text",
                            //                 "x": 963,
                            //                 "y": 225,
                            //                 "width": 800,
                            //                 "visible": true,
                            //                 "text": "paytableHeading3",
                            //                 "anchor": [0.5, 0.5],
                            //                 "scaleToFit": true,
                            //                 "textStyle": {
                            //                     fontFamily: 'Myriad Pro',
                            //                     fontSize: 56,
                            //                     fontWeight: 'BOLD',
                            //                     fill: ['#ffcc00'],

                            //                 },
                            //                 "parentLayer": "specialAnimationLayer",
                            //             },
                            //             {
                            //                 "name": "Heading_divider",
                            //                 "type": "Graphic",
                            //                 "shape": "rectangle",
                            //                 "visible": true,
                            //                 "alpha": 1,
                            //                 "color": "0xe2be20",
                            //                 "x": 645,
                            //                 "y": 260,
                            //                 "width": 636,
                            //                 "height": 5,
                            //             },


                            //             {
                            //                 "name": "fifthSlideImage1",
                            //                 "image": "fifthSlideImage1",
                            //                 "type": "Image",
                            //                 "class": "",
                            //                 "visible": true,
                            //                 "width": 700,
                            //                 "height": 243,
                            //                 "anchor": [0.5, 0.5],
                            //                 "x": 958,
                            //                 "y": 380,
                            //             },
                            //             {
                            //                 "id": "fifthSlideText4",
                            //                 "name": "thirdSlideText4",
                            //                 "type": "Text",
                            //                 "x": 963,
                            //                 "y": 536,
                            //                 "width": 850,
                            //                 "visible": true,
                            //                 "text": "paytablePage5_1",
                            //                 "scaleToFit": true,
                            //                 "textStyle": {
                            //                     fontFamily: 'ARIAL',
                            //                     fontSize: 32,
                            //                     fontStyle: 'normal',
                            //                     fill: ['#ffffff'],
                            //                     align: 'center',
                            //                     wordWrap: true,
                            //                     wordWrapWidth: 850,
                            //                     breakWords: true,
                            //                 }
                            //             },
                            //         ]
                            //     },

                            //     //!SECTION SEVENTH slide

                            //     // {
                            //     //     id: "seventh_slide",
                            //     //     "name": "seventh_slide",
                            //     //     "type": "Container",
                            //     //     "class": "",
                            //     //     "visible": true,
                            //     //     "x": 0,
                            //     //     "y": 3920,
                            //     //     "width": 1920,
                            //     //     "height": 1080,
                            //     //     "filterTypes": [],
                            //     //     child: [
                            //     //         {
                            //     //             "id": "sixthSlideText1",
                            //     //             "name": "Text_paytable",
                            //     //             "type": "Text",
                            //     //             "x": 963,
                            //     //             "y": 240,
                            //     //             "width": 800,
                            //     //             "visible": true,
                            //     //             "text": "paytableHeading4",
                            //     //             "anchor": [0.5, 0.5],
                            //     //             "scaleToFit": true,
                            //     //             "textStyle": {
                            //     //                 fontFamily: 'Myriad Pro',
                            //     //                 fontSize: 56,
                            //     //                 fontWeight: 'BOLD',
                            //     //                 fill: ['#ffcc00'],

                            //     //             },
                            //     //             "parentLayer": "specialAnimationLayer",
                            //     //         },
                            //     //         {
                            //     //             "name": "Heading_divider",
                            //     //             "type": "Graphic",
                            //     //             "shape": "rectangle",
                            //     //             "visible": true,
                            //     //             "alpha": 1,
                            //     //             "color": "0xe2be20",
                            //     //             "x": 698,
                            //     //             "y": 265,
                            //     //             "width": 530,
                            //     //             "height": 5,
                            //     //         },


                            //     //         {
                            //     //             "name": "freespin_feature",
                            //     //             "image": "freespin_feature",
                            //     //             "type": "Image",
                            //     //             "class": "",
                            //     //             "visible": true,
                            //     //             "width": 480,
                            //     //             "height": 270,
                            //     //             "anchor": [0.5, 0.5],
                            //     //             "x": 958,
                            //     //             "y": 440,
                            //     //         },


                            //     //         {
                            //     //             "id": "sixthSlideText4",
                            //     //             "name": "fifthSlideText4",
                            //     //             "type": "Text",
                            //     //             "x": 970,
                            //     //             "y": 806,
                            //     //             "width": 1920,
                            //     //             "visible": true,
                            //     //             "text": "paytablePage6_1",
                            //     //             "scaleToFit": true,
                            //     //             "textStyle": {
                            //     //                 fontFamily: 'ARIAL',
                            //     //                 fontSize: 42,
                            //     //                 fontStyle: 'normal',
                            //     //                 fill: ['#ffffff'],
                            //     //                 align: "center",
                            //     //                 wordWrap: true,
                            //     //                 wordWrapWidth: 1000
                            //     //             }
                            //     //         },


                            //     //     ]

                            //     // },

                            //     // //!SECTION Eight slide

                            //     // {
                            //     //     id: "eight_slide",
                            //     //     "name": "eight_slide",
                            //     //     "type": "Container",
                            //     //     "class": "",
                            //     //     "visible": true,
                            //     //     "x": 0,
                            //     //     "y": 4735,
                            //     //     "width": 1920,
                            //     //     "height": 1080,
                            //     //     "filterTypes": [],
                            //     //     child: [
                            //     //         {
                            //     //             "id": "seventhSlideText1",
                            //     //             "name": "Text_paytable",
                            //     //             "type": "Text",
                            //     //             "x": 963,
                            //     //             "y": 240,
                            //     //             "width": 500,
                            //     //             "visible": true,
                            //     //             "text": "paytableHeading5",
                            //     //             "anchor": [0.5, 0.5],
                            //     //             "scaleToFit": true,
                            //     //             "textStyle": {
                            //     //                 fontFamily: 'Myriad Pro',
                            //     //                 fontSize: 56,
                            //     //                 fontWeight: 'BOLD',
                            //     //                 fill: ['#ffcc00'],

                            //     //             },
                            //     //             "parentLayer": "specialAnimationLayer",
                            //     //         },
                            //     //         {
                            //     //             "name": "Heading_divider",
                            //     //             "type": "Graphic",
                            //     //             "shape": "rectangle",
                            //     //             "visible": true,
                            //     //             "alpha": 1,
                            //     //             "color": "0xe2be20",
                            //     //             "x": 835,
                            //     //             "y": 265,
                            //     //             "width": 254,
                            //     //             "height": 5,
                            //     //         },

                            //     //         {
                            //     //             "name": "seventhSlideImage1",
                            //     //             "image": "seventhSlideImage1",
                            //     //             "type": "Image",
                            //     //             "class": "",
                            //     //             "visible": true,
                            //     //             "width": 604,
                            //     //             "height": 646,
                            //     //             "x": 660,
                            //     //             "y": 294,
                            //     //         },
                            //     //     ]
                            //     // },

                            //     // //!SECTION NINE slide
                            //     // {
                            //     //     id: "eight_slide",
                            //     //     "name": "eight_slide",
                            //     //     "type": "Container",
                            //     //     "class": "",
                            //     //     "visible": true,
                            //     //     "x": 0,
                            //     //     "y": 5500,
                            //     //     "width": 1920,
                            //     //     "height": 1080,
                            //     //     "filterTypes": [],
                            //     //     child: [
                            //     //         {
                            //     //             "id": "NineSlideText1",
                            //     //             "name": "Text_paytable",
                            //     //             "type": "Text",
                            //     //             "x": 963,
                            //     //             "y": 240,
                            //     //             "width": 500,
                            //     //             "visible": true,
                            //     //             "text": "FREE GAME BUY FEATURES",
                            //     //             "anchor": [0.5, 0.5],
                            //     //             "scaleToFit": true,
                            //     //             "textStyle": {
                            //     //                 fontFamily: 'Myriad Pro',
                            //     //                 fontSize: 56,
                            //     //                 fontWeight: 'BOLD',
                            //     //                 fill: ['#ffcc00'],

                            //     //             },
                            //     //             "parentLayer": "specialAnimationLayer",
                            //     //         },
                            //     //         {
                            //     //             "name": "Heading_divider",
                            //     //             "type": "Graphic",
                            //     //             "shape": "rectangle",
                            //     //             "visible": true,
                            //     //             "alpha": 1,
                            //     //             "color": "0xe2be20",
                            //     //             "x": 706,
                            //     //             "y": 265,
                            //     //             "width": 510,
                            //     //             "height": 5,
                            //     //         },
                            //     //         {
                            //     //             "id": "NineSlideText2",
                            //     //             "name": "Text_paytable",
                            //     //             "type": "Text",
                            //     //             "x": 963,
                            //     //             "y": 300,
                            //     //             "width": 500,
                            //     //             "visible": true,
                            //     //             "text": "Cost of Free Game Buy Feature is 100x.",
                            //     //             "anchor": [0.5, 0.5],
                            //     //             "scaleToFit": true,
                            //     //             "textStyle": {
                            //     //                 fontFamily: 'Myriad Pro',
                            //     //                 fontSize: 56,
                            //     //                 fontWeight: 'BOLD',
                            //     //                 fill: ['#fff'],

                            //     //             },
                            //     //             "parentLayer": "specialAnimationLayer",
                            //     //         },
                            //     //     ]
                            //     // }


                            //     // TEST DATA

                            //     // {
                            //     //     "name": "ThirdSlideImage1",
                            //     //     "image": "ThirdSlideImage1",
                            //     //     "type": "Image",
                            //     //     "class": "",
                            //     //     "visible": true,
                            //     //     "width": 258,
                            //     //     "height": 253,
                            //     //     "x": 470,
                            //     //     "y": 287,
                            //     // },
                            //     // {
                            //     //     "name": "ThirdSlideImage2",
                            //     //     "image": "ThirdSlideImage2",
                            //     //     "type": "Image",
                            //     //     "class": "",
                            //     //     "visible": true,
                            //     //     "width": 258,
                            //     //     "height": 253,
                            //     //     "x": 470,
                            //     //     "y": 587,
                            //     // },
                            //     // {
                            //     //     "name": "ThirdSlideImage1",
                            //     //     "image": "ThirdSlideImage1",
                            //     //     "type": "Image",
                            //     //     "class": "",
                            //     //     "visible": true,
                            //     //     "width": 258,
                            //     //     "height": 253,
                            //     //     "x": 470,
                            //     //     "y": 887,
                            //     // },
                            //     // {
                            //     //     "name": "ThirdSlideImage1",
                            //     //     "image": "ThirdSlideImage1",
                            //     //     "type": "Image",
                            //     //     "class": "",
                            //     //     "visible": true,
                            //     //     "width": 258,
                            //     //     "height": 253,
                            //     //     "x": 470,
                            //     //     "y": 1187,
                            //     // },
                            //     // {
                            //     //     "name": "ThirdSlideImage1",
                            //     //     "image": "ThirdSlideImage1",
                            //     //     "type": "Image",
                            //     //     "class": "",
                            //     //     "visible": true,
                            //     //     "width": 258,
                            //     //     "height": 253,
                            //     //     "x": 470,
                            //     //     "y": 1487,
                            //     // },
                            //     // {
                            //     //     "name": "ThirdSlideImage1",
                            //     //     "image": "ThirdSlideImage1",
                            //     //     "type": "Image",
                            //     //     "class": "",
                            //     //     "visible": true,
                            //     //     "width": 258,
                            //     //     "height": 253,
                            //     //     "x": 470,
                            //     //     "y": 1787,
                            //     // },
                            //     // {
                            //     //     "name": "ThirdSlideImage1",
                            //     //     "image": "ThirdSlideImage1",
                            //     //     "type": "Image",
                            //     //     "class": "",
                            //     //     "visible": true,
                            //     //     "width": 258,
                            //     //     "height": 253,
                            //     //     "x": 470,
                            //     //     "y": 2087,
                            //     // },
                            //     // {
                            //     //     id: "thirdSlide_Container",
                            //     //     "name": "slide_Container1",
                            //     //     "type": "Container",
                            //     //     "class": "",
                            //     //     "visible": false,
                            //     //     "x": 0,
                            //     //     "y": -70,
                            //     //     "width": 1920,
                            //     //     "height": 1080,
                            //     //     "filterTypes": [],
                            //     //     child: [
                            //     //         {
                            //     //             "id": "thirdSlideText1",
                            //     //             "name": "Text_paytable",
                            //     //             "type": "Text",
                            //     //             "x": 963,
                            //     //             "y": 230,
                            //     //             "visible": true,
                            //     //             "text": "paytableHeading1",
                            //     //             "width": 200,
                            //     //             "anchor": [0.5, 0.5],
                            //     //             "textStyle": {
                            //     //                  fontFamily: 'Myriad Pro',
                            //     //                 fontSize: 56,
                            //     //                 fontWeight: 'BOLD',
                            //     //                 fill: ['#ffcc00'],
                            //     //                 /*   stroke: '#9c290c',
                            //     //                   strokeThickness: 4, */


                            //     //             },
                            //     //             "parentLayer": "specialAnimationLayer",
                            //     //         },



                            //     //         {
                            //     //             "name": "ThirdSlideImage1",
                            //     //             "image": "ThirdSlideImage1",
                            //     //             "type": "Image",
                            //     //             "class": "",
                            //     //             "visible": true,
                            //     //             "width": 258,
                            //     //             "height": 253,
                            //     //             "x": 470,
                            //     //             "y": 287,
                            //     //         },

                            //     //         {
                            //     //             "name": "ThirdSlideImage2",
                            //     //             "image": "ThirdSlideImage2",
                            //     //             "type": "Image",
                            //     //             "class": "",
                            //     //             "visible": true,
                            //     //             "width": 258,
                            //     //             "height": 262,

                            //     //             "x": 470,
                            //     //             "y": 628,
                            //     //         },






                            //     //         {
                            //     //             "id": "thirdSlideText1",
                            //     //             "name": "thirdSlideText1",
                            //     //             "type": "Text",
                            //     //             "x": 600,
                            //     //             "y": 560,
                            //     //             "width": 240,
                            //     //             "visible": true,
                            //     //             "text": "paytablePage3_1",
                            //     //             "scaleToFit": true,
                            //     //             "anchor": [0.5, 0.5],
                            //     //             "textStyle": {
                            //     //                  fontFamily: 'Myriad Pro',
                            //     //                 fontSize: 38,
                            //     //                 fontWeight: 'normal',
                            //     //                 fill: ['#e2be20'],

                            //     //             }
                            //     //         },
                            //     //         {
                            //     //             "id": "thirdSlideText3",
                            //     //             "name": "thirdSlideText3",
                            //     //             "type": "Text",
                            //     //             "x": 600,
                            //     //             "y": 910,
                            //     //             "width": 240,
                            //     //             "visible": true,
                            //     //             "text": "paytablePage3_5",
                            //     //             "scaleToFit": true,
                            //     //             "anchor": [0.5, 0.5],
                            //     //             "textStyle": {
                            //     //                  fontFamily: 'Myriad Pro',
                            //     //                 fontSize: 38,
                            //     //                 fontWeight: 'normal',
                            //     //                 fill: ['#e2be20'],

                            //     //             }
                            //     //         },


                            //     //         {
                            //     //             "id": "thirdSlideText5",
                            //     //             "name": "thirdSlideText5",
                            //     //             "type": "Text",
                            //     //             "x": 1150,
                            //     //             "y": 760,
                            //     //             "width": 800,
                            //     //             "visible": true,
                            //     //             "anchor": [0.5, 0.5],
                            //     //             "text": "paytablePage3_6",
                            //     //             "scaleToFit": true,
                            //     //             "textStyle": {
                            //     //                 fontFamily: 'Myriad Pro',
                            //     //                 fontSize: 42,
                            //     //                 fontStyle: 'normal',
                            //     //                 fill: ['#ffffff'],
                            //     //                 align: 'left',
                            //     //                 wordWrap: true,
                            //     //                 wordWrapWidth: 600,
                            //     //                 breakWords: true,

                            //     //             }
                            //     //         },

                            //     //         {
                            //     //             "id": "thirdSlideText7",
                            //     //             "name": "thirdSlideText7",
                            //     //             "type": "Text",
                            //     //             "x": 1150,
                            //     //             "y": 390,
                            //     //             "width": 800,
                            //     //             "visible": true,
                            //     //             "text": "paytablePage3_2",
                            //     //             "scaleToFit": true,

                            //     //             "textStyle": {
                            //     //                 fontFamily: 'Myriad Pro',
                            //     //                 fontSize: 42,
                            //     //                 fontStyle: 'normal',
                            //     //                 fill: ['#ffffff'],
                            //     //                 align: 'left',
                            //     //                 wordWrap: true,
                            //     //                 wordWrapWidth: 600,
                            //     //                 breakWords: true,

                            //     //             }
                            //     //         },



                            //     //     ]


                            //     // },
                            // ]
                        },
                    ]
                },

                {
                    "id": "paytableScrollbarContainer",
                    "name": "paytableScrollbarContainer",
                    "type": "Container",
                    "x": 230,
                    "y": 100,
                    "visible": true,
                    "filterTypes": [],
                    "parentLayer": "specialAnimationLayer",
                    child: [
                        // {
                        //     "id": "page_slider_line",
                        //     "name": "page_slider_line",
                        //     "image": 'scroll_bar.png',
                        //     "type": objectTypes.Sprite,
                        //     "uimode": "desktop",
                        //     "class": "",
                        //     "filterTypes": [],
                        //     "visible": true,
                        //     "interactive": true,
                        //     "buttonMode": true,
                        //     "x": 1310,
                        //     "y": 150,
                        //     "height": 500,
                        //     "width": 3,
                        // },
                        // {
                        //     "id": "page_slider_cylinder",
                        //     "name": "page_slider_cylinder",
                        //     "type": objectTypes.Sprite,
                        //     "uimode": "desktop",
                        //     "class": "",
                        //     "filterTypes": [],
                        //     "visible": true,
                        //     "interactive": true,
                        //     "buttonMode": true,
                        //     "x": 1303,
                        //     "y": 150,
                        //     "height": 61,
                        //     "width": 18,
                        //     "buttonState": {
                        //         up: 'scroll_slider.png',
                        //         out: 'scroll_slider.png',
                        //         down: 'scroll_slider.png',
                        //         disable: 'scroll_slider.png',
                        //         enable: 'scroll_slider.png',
                        //         hover: 'scroll_slider.png'
                        //     },
                        //     "hitareaVisible": false,
                        //     "shapeVisible": false,
                        //     "shape": {}
                        // },
                        // {
                        //     "id": "page_arrow_up",
                        //     "name": "page_arrow_up",
                        //     "type": objectTypes.Sprite,
                        //     "uimode": "desktop",
                        //     "class": "",
                        //     "filterTypes": [],
                        //     "visible": true,
                        //     "interactive": false,
                        //     "x": 1302,
                        //     "y": 120,
                        //     "height": 11,
                        //     "width": 19,
                        //     "buttonMode": true,
                        //     "buttonState": {
                        //         up: 'arrow_top.png',
                        //         out: 'arrow_top.png',
                        //         down: 'arrow_top.png',
                        //         disable: 'arrow_top.png',
                        //         enable: 'arrow_top.png',
                        //         hover: 'arrow_top.png'
                        //     },
                        //     "hitareaVisible": false,
                        //     "shapeVisible": false,
                        //     "shape": {}
                        // },
                        // {
                        //     "id": "page_arrow_down",
                        //     "name": "page_arrow_down",
                        //     "type": objectTypes.Sprite,
                        //     "uimode": "desktop",
                        //     "class": "",
                        //     "filterTypes": [],
                        //     "visible": true,
                        //     "interactive": true,
                        //     "x": 1301,
                        //     "y": 680,
                        //     "height": 11,
                        //     "width": 19,
                        //     "buttonMode": true,
                        //     "buttonState": {
                        //         up: 'arrow_bottom.png',
                        //         out: 'arrow_bottom.png',
                        //         down: 'arrow_bottom.png',
                        //         disable: 'arrow_bottom.png',
                        //         enable: 'arrow_bottom.png',
                        //         hover: 'arrow_bottom.png'
                        //     },
                        //     "hitareaVisible": false,
                        //     "shapeVisible": false,
                        //     "shape": {}
                        // },
                    ]
                },

                // third Slide---------------------------
                // {
                //     id: "secondSlide_Container",
                //     "name": "slide_Container3",
                //     "type": "Container",
                //     "class": "",
                //     "visible": false,
                //     "x": 0,
                //     "y": -70,
                //     "width": 1920,
                //     "height": 1080,
                //     "filterTypes": [],
                //     child: [

                //         {
                //             "name": "secondSlideImage1",
                //             "image": "SecondSlideImage",
                //             "type": "Image",
                //             "class": "",
                //             "visible": true,
                //             "width": 743,
                //             "height": 690,
                //             "anchor": [0.5, 0.5],
                //             "x": 963,
                //             "y": 595,
                //         },

                //         // {
                //         //     id: "hv_2PayoutContainer",
                //         //     "name": "hv_2PayoutContainer",
                //         //     "type": "Container",
                //         //     "class": "",
                //         //     "visible": true,
                //         //     "x": -455,
                //         //     "y": 338,
                //         //     "filterTypes": [],
                //         //     child: [
                //         //         {
                //         //             "id": "secondSlideText12",
                //         //             "name": "secondSlideText12",
                //         //             "type": "Text",
                //         //             "x": 1289,
                //         //             "y": 193,
                //         //             "width": 80,
                //         //             "visible": true,
                //         //             "text": "firstSlideText5",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0.5, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff'],

                //         //             }
                //         //         },
                //         //         {
                //         //             "id": "secondSlideText13",
                //         //             "name": "secondSlideText13",
                //         //             "type": "Text",
                //         //             "x": 1289,
                //         //             "y": 239,
                //         //             "width": 80,
                //         //             "visible": true,
                //         //             "text": "firstSlideText4",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0.5, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff'],

                //         //             }
                //         //         },
                //         //         {
                //         //             "id": "secondSlideText14",
                //         //             "name": "secondSlideText14",
                //         //             "type": "Text",
                //         //             "x": 1289,
                //         //             "y": 285,
                //         //             "width": 80,
                //         //             "visible": true,
                //         //             "text": "firstSlideText3",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0.5, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff'],

                //         //             }
                //         //         },
                //         //         {
                //         //             "id": "secondSlideText15",
                //         //             "name": "secondSlideText15",
                //         //             "type": "Text",
                //         //             "x": 1289,
                //         //             "y": 331,
                //         //             "width": 80,
                //         //             "visible": true,
                //         //             "text": "firstSlideText2",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0.5, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff'],

                //         //             }
                //         //         },


                //         //         {
                //         //             "id": "secondSlideText16",
                //         //             "name": "payout_23",
                //         //             "type": "Text",
                //         //             "x": 1315,
                //         //             "y": 193,
                //         //             "width": 170,
                //         //             "visible": true,
                //         //             "text": "100",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff', '#ffffff', '#ffffff'],

                //         //             }
                //         //         },
                //         //         {
                //         //             "id": "secondSlideText17",
                //         //             "name": "payout_22",
                //         //             "type": "Text",
                //         //             "x": 1315,
                //         //             "y": 239,
                //         //             "width": 170,
                //         //             "visible": true,
                //         //             "text": "100",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff', '#ffffff', '#ffffff'],

                //         //             }
                //         //         },
                //         //         {
                //         //             "id": "secondSlideText18",
                //         //             "name": "payout_21",
                //         //             "type": "Text",
                //         //             "x": 1315,
                //         //             "y": 285,
                //         //             "width": 170,
                //         //             "visible": true,
                //         //             "text": "100",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff', '#ffffff', '#ffffff'],

                //         //             }
                //         //         },
                //         //         {
                //         //             "id": "secondSlideText19",
                //         //             "name": "payout_20",
                //         //             "type": "Text",
                //         //             "x": 1315,
                //         //             "y": 331,
                //         //             "width": 170,
                //         //             "visible": true,
                //         //             "text": "100",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff', '#ffffff', '#ffffff'],

                //         //             }
                //         //         },
                //         //     ]
                //         // },

                //         // {
                //         //     id: "hv_3PayoutContainer",
                //         //     "name": "hv_3PayoutContainer",
                //         //     "type": "Container",
                //         //     "class": "",
                //         //     "visible": true,
                //         //     "x": 550,
                //         //     "y": 280,

                //         //     "filterTypes": [],
                //         //     child: [
                //         //         {
                //         //             "id": "secondSlideText20",
                //         //             "name": "secondSlideText20",
                //         //             "type": "Text",
                //         //             "x": 824,
                //         //             "y": 491,
                //         //             "width": 80,
                //         //             "visible": true,
                //         //             "text": "firstSlideText5",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0.5, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff'],

                //         //             }
                //         //         },
                //         //         {
                //         //             "id": "secondSlideText21",
                //         //             "name": "secondSlideText21",
                //         //             "type": "Text",
                //         //             "x": 824,
                //         //             "y": 537,
                //         //             "width": 80,
                //         //             "visible": true,
                //         //             "text": "firstSlideText4",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0.5, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff'],

                //         //             }
                //         //         },
                //         //         {
                //         //             "id": "secondSlideText22",
                //         //             "name": "secondSlideText22",
                //         //             "type": "Text",
                //         //             "x": 824,
                //         //             "y": 583,
                //         //             "width": 80,
                //         //             "visible": true,
                //         //             "text": "firstSlideText3",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0.5, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff'],

                //         //             }
                //         //         },
                //         //         {
                //         //             "id": "secondSlideText23",
                //         //             "name": "secondSlideText23",
                //         //             "type": "Text",
                //         //             "x": 824,
                //         //             "y": 629,
                //         //             "width": 80,
                //         //             "visible": true,
                //         //             "text": "firstSlideText2",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0.5, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff'],

                //         //             }
                //         //         },


                //         //         {
                //         //             "id": "secondSlideText24",
                //         //             "name": "payout_53",
                //         //             "type": "Text",
                //         //             "x": 850,
                //         //             "y": 491,
                //         //             "width": 170,
                //         //             "visible": true,
                //         //             "text": "100",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff', '#ffffff', '#ffffff'],
                //         //             }
                //         //         },
                //         //         {
                //         //             "id": "secondSlideText25",
                //         //             "name": "payout_52",
                //         //             "type": "Text",
                //         //             "x": 850,
                //         //             "y": 537,
                //         //             "width": 170,
                //         //             "visible": true,
                //         //             "text": "100",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff', '#ffffff', '#ffffff'],

                //         //             }
                //         //         },
                //         //         {
                //         //             "id": "secondSlideText26",
                //         //             "name": "payout_51",
                //         //             "type": "Text",
                //         //             "x": 850,
                //         //             "y": 583,
                //         //             "width": 170,
                //         //             "visible": true,
                //         //             "text": "100",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff', '#ffffff', '#ffffff'],

                //         //             }
                //         //         },
                //         //         {
                //         //             "id": "secondSlideText27",
                //         //             "name": "payout_50",
                //         //             "type": "Text",
                //         //             "x": 850,
                //         //             "y": 629,
                //         //             "width": 170,
                //         //             "visible": true,
                //         //             "text": "100",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff', '#ffffff', '#ffffff'],
                //         //             }
                //         //         },
                //         //     ]
                //         // },

                //         // {
                //         //     id: "hv_4PayoutContainer",
                //         //     "name": "hv_4PayoutContainer",
                //         //     "type": "Container",
                //         //     "class": "",
                //         //     "visible": true,
                //         //     "x": -180,
                //         //     "y": -198,

                //         //     "filterTypes": [],
                //         //     child: [
                //         //         {
                //         //             "id": "secondSlideText28",
                //         //             "name": "secondSlideText28",
                //         //             "type": "Text",
                //         //             "x": 1289,
                //         //             "y": 491,
                //         //             "width": 80,
                //         //             "visible": true,
                //         //             "text": "firstSlideText5",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0.5, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff'],

                //         //             }
                //         //         },
                //         //         {
                //         //             "id": "secondSlideText29",
                //         //             "name": "secondSlideText29",
                //         //             "type": "Text",
                //         //             "x": 1289,
                //         //             "y": 537,
                //         //             "width": 80,
                //         //             "visible": true,
                //         //             "text": "firstSlideText4",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0.5, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff'],

                //         //             }
                //         //         },
                //         //         {
                //         //             "id": "secondSlideText30",
                //         //             "name": "secondSlideText30",
                //         //             "type": "Text",
                //         //             "x": 1289,
                //         //             "y": 583,
                //         //             "width": 80,
                //         //             "visible": true,
                //         //             "text": "firstSlideText3",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0.5, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff'],

                //         //             }
                //         //         },
                //         //         {
                //         //             "id": "secondSlideText31",
                //         //             "name": "secondSlideText31",
                //         //             "type": "Text",
                //         //             "x": 1289,
                //         //             "y": 629,
                //         //             "width": 80,
                //         //             "visible": true,
                //         //             "text": "firstSlideText2",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0.5, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff'],
                //         //             }
                //         //         },


                //         //         // {
                //         //         //     "id": "secondSlideText32",
                //         //         //     "name": "payout_13",
                //         //         //     "type": "Text",
                //         //         //     "x": 1315,
                //         //         //     "y": 491,
                //         //         //     "width": 170,
                //         //         //     "visible": true,
                //         //         //     "text": "100",
                //         //         //     "scaleToFit": true,
                //         //         //     "anchor": [0, 0.5],
                //         //         //     "textStyle": {
                //         //         //         fontFamily: 'Myriad Pro',
                //         //         //         fontSize: 32,
                //         //         //         fontStyle: 'normal',
                //         //         //         fill: ['#ffffff', '#ffffff', '#ffffff'],

                //         //         //     }
                //         //         // },
                //         //         // {
                //         //         //     "id": "secondSlideText33",
                //         //         //     "name": "payout_12",
                //         //         //     "type": "Text",
                //         //         //     "x": 1315,
                //         //         //     "y": 537,
                //         //         //     "width": 170,
                //         //         //     "visible": true,
                //         //         //     "text": "100",
                //         //         //     "scaleToFit": true,
                //         //         //     "anchor": [0, 0.5],
                //         //         //     "textStyle": {
                //         //         //         fontFamily: 'Myriad Pro',
                //         //         //         fontSize: 32,
                //         //         //         fontStyle: 'normal',
                //         //         //         fill: ['#ffffff', '#ffffff', '#ffffff'],

                //         //         //     }
                //         //         // },
                //         //         // {
                //         //         //     "id": "secondSlideText34",
                //         //         //     "name": "payout_11",
                //         //         //     "type": "Text",
                //         //         //     "x": 1315,
                //         //         //     "y": 583,
                //         //         //     "width": 170,
                //         //         //     "visible": true,
                //         //         //     "text": "100",
                //         //         //     "scaleToFit": true,
                //         //         //     "anchor": [0, 0.5],
                //         //         //     "textStyle": {
                //         //         //         fontFamily: 'Myriad Pro',
                //         //         //         fontSize: 32,
                //         //         //         fontStyle: 'normal',
                //         //         //         fill: ['#ffffff', '#ffffff', '#ffffff'],

                //         //         //     }
                //         //         // },
                //         //         // {
                //         //         //     "id": "secondSlideText35",
                //         //         //     "name": "payout_10",
                //         //         //     "type": "Text",
                //         //         //     "x": 1315,
                //         //         //     "y": 629,
                //         //         //     "width": 170,
                //         //         //     "visible": true,
                //         //         //     "text": "100",
                //         //         //     "scaleToFit": true,
                //         //         //     "anchor": [0, 0.5],
                //         //         //     "textStyle": {
                //         //         //         fontFamily: 'Myriad Pro',
                //         //         //         fontSize: 32,
                //         //         //         fontStyle: 'normal',
                //         //         //         fill: ['#ffffff', '#ffffff', '#ffffff'],

                //         //         //     }
                //         //         // },

                //         //     ]
                //         // },

                //         // {
                //         //     id: "hv_5PayoutContainer",
                //         //     "name": "hv_5PayoutContainer",
                //         //     "type": "Container",
                //         //     "class": "",
                //         //     "visible": true,
                //         //     "x": -456,
                //         //     "y": 280,

                //         //     "filterTypes": [],
                //         //     child: [
                //         //         {
                //         //             "id": "secondSlideText28",
                //         //             "name": "secondSlideText28",
                //         //             "type": "Text",
                //         //             "x": 1289,
                //         //             "y": 491,
                //         //             "width": 80,
                //         //             "visible": true,
                //         //             "text": "firstSlideText5",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0.5, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff'],

                //         //             }
                //         //         },
                //         //         {
                //         //             "id": "secondSlideText29",
                //         //             "name": "secondSlideText29",
                //         //             "type": "Text",
                //         //             "x": 1289,
                //         //             "y": 537,
                //         //             "width": 80,
                //         //             "visible": true,
                //         //             "text": "firstSlideText4",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0.5, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff'],

                //         //             }
                //         //         },
                //         //         {
                //         //             "id": "secondSlideText30",
                //         //             "name": "secondSlideText30",
                //         //             "type": "Text",
                //         //             "x": 1289,
                //         //             "y": 583,
                //         //             "width": 80,
                //         //             "visible": true,
                //         //             "text": "firstSlideText3",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0.5, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff'],

                //         //             }
                //         //         },
                //         //         {
                //         //             "id": "secondSlideText31",
                //         //             "name": "secondSlideText31",
                //         //             "type": "Text",
                //         //             "x": 1289,
                //         //             "y": 629,
                //         //             "width": 80,
                //         //             "visible": true,
                //         //             "text": "firstSlideText2",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0.5, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff'],
                //         //             }
                //         //         },


                //         //         {
                //         //             "id": "secondSlideText32",
                //         //             "name": "payout_43",
                //         //             "type": "Text",
                //         //             "x": 1315,
                //         //             "y": 491,
                //         //             "width": 170,
                //         //             "visible": true,
                //         //             "text": "100",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff', '#ffffff', '#ffffff'],

                //         //             }
                //         //         },
                //         //         {
                //         //             "id": "secondSlideText33",
                //         //             "name": "payout_42",
                //         //             "type": "Text",
                //         //             "x": 1315,
                //         //             "y": 537,
                //         //             "width": 170,
                //         //             "visible": true,
                //         //             "text": "100",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff', '#ffffff', '#ffffff'],

                //         //             }
                //         //         },
                //         //         {
                //         //             "id": "secondSlideText34",
                //         //             "name": "payout_41",
                //         //             "type": "Text",
                //         //             "x": 1315,
                //         //             "y": 583,
                //         //             "width": 170,
                //         //             "visible": true,
                //         //             "text": "100",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff', '#ffffff', '#ffffff'],

                //         //             }
                //         //         },
                //         //         {
                //         //             "id": "secondSlideText35",
                //         //             "name": "payout_40",
                //         //             "type": "Text",
                //         //             "x": 1315,
                //         //             "y": 629,
                //         //             "width": 170,
                //         //             "visible": true,
                //         //             "text": "100",
                //         //             "scaleToFit": true,
                //         //             "anchor": [0, 0.5],
                //         //             "textStyle": {
                //         //                 fontFamily: 'Myriad Pro',
                //         //                 fontSize: 32,
                //         //                 fontStyle: 'normal',
                //         //                 fill: ['#ffffff', '#ffffff', '#ffffff'],

                //         //             }
                //         //         },

                //         //     ]
                //         // },


                //     ]

                // },

                // first Slide---------------------------
                // {
                //     id: "thirdSlide_Container",
                //     "name": "slide_Container1",
                //     "type": "Container",
                //     "class": "",
                //     "visible": false,
                //     "x": 0,
                //     "y": -70,
                //     "width": 1920,
                //     "height": 1080,
                //     "filterTypes": [],
                // },
                // {
                //     id: "thirdSlide_Container",
                //     "name": "slide_Container2",
                //     "type": "Container",
                //     "class": "",
                //     "visible": false,
                //     "x": 0,
                //     "y": -70,
                //     "width": 1920,
                //     "height": 1080,
                //     "filterTypes": [],
                // },

                // {
                //     id: "seventhSlide_Container",
                //     "name": "slide_Container9",
                //     "type": "Container",
                //     "class": "",
                //     "visible": false,
                //     "x": 0,
                //     "y": -70,
                //     "width": 1920,
                //     "height": 1080,
                //     "filterTypes": [],
                //     child: [
                //         {
                //             "id": "seventhSlideText1",
                //             "name": "Text_paytable",
                //             "type": "Text",
                //             "x": 963,
                //             "y": 260,
                //             "width": 500,
                //             "visible": true,
                //             "text": "paytableHeading7",
                //             "anchor": [0.5, 0.5],
                //             "scaleToFit": true,
                //             "textStyle": {
                //                 fontFamily: 'Myriad Pro',
                //                 fontSize: 56,
                //                 fontWeight: 'BOLD',
                //                 fill: ['#ffcc00'],

                //             },
                //             "parentLayer": "specialAnimationLayer",
                //         },

                //         {
                //             "id": "sixthSlideText4",
                //             "name": "fifthSlideText4",
                //             "type": "Text",
                //             "x": 959,
                //             "y": 350,
                //             "width": 1900,
                //             "visible": true,
                //             "text": "paytablePage6_3",
                //             "scaleToFit": true,
                //             "textStyle": {
                //                 fontFamily: 'ARIAL',
                //                 fontSize: 42,
                //                 fontStyle: 'normal',
                //                 fill: ['#ffffff'],
                //                 align: "center",
                //                 wordWrap: true,
                //                 wordWrapWidth: 1270,
                //                 breakWords: true,
                //             }
                //         },
                //     ]

                // },
                // {
                //     "id": "Button_3",
                //     "name": "paytable_closeButton",
                //     "type": objectTypes.Sprite,
                //     "interactive": false,
                //     "layout": true,
                //     "x": 1685,
                //     "y": 480,
                //     "height": 141,
                //     "width": 141,
                //     "text": "",
                //     "visible": true,
                //     "buttonMode": true,
                //     "buttonState": {
                //         up: 'close_button_standard.png',
                //         out: 'close_button_standard.png',
                //         down: 'close_button_down.png',
                //         disable: 'close_button_down.png',
                //         enable: 'close_button_standard.png',
                //         hover: 'close_button_standard.png'
                //     },
                //     "hitareaVisible": false,
                //     "shapeVisible": false,
                //     "shape": {}
                // },
                // dot Enable-Disable-----------------------------

            ]
        }
    ]
}