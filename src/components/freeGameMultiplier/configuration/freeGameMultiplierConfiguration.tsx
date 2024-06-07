import React from "react";
interface IframeworkFreegameMultiplierConfiguration {
    data: {

    }

}

export const frameworkFreegameMultiplierConfiguration: IframeworkFreegameMultiplierConfiguration = {

    data: {
        "COMPONENTS": [
            {
                "name": "freegameMultiplierDesktop",
                "type": "Container",
                "x": 0,
                "y": 0,
                "layout": false,
                "uimode": "desktop",
                child: [
                    {
                        "id": "multiplierTopText",
                        "name": "multiplierTopText",
                        "type": "Text",
                        "x": 1862,
                        "y": 505,
                        "width": 66,
                        "layout": false,
                        "uimode": "desktop",
                        "visible": true,
                        "text": "x1",
                        "scaleToFit": true,
                        "anchor": [0.5, 0.5],
                        "textStyle": {
                            fontFamily: 'Impact',
                            fontSize: 35,
                            fontStyle: 'Normal',
                            align: 'center',
                            fill: ['#fff000', '#f19901'],
                            stroke: '#1b3201',
                            strokeThickness: 1,
                            dropShadow: true,
                            dropShadowColor: '#101f00',
                            dropShadowDistance: 2,
                            letterSpacing: 5
                        }
                    },
                    {
                        "name": "multiplierIncreaseAnim",
                        "type": "Spine",
                        "width": 3000,
                        "height": 523,
                        "image": "leftMeterAnim",
                        "animationSpeed": 0.9,
                        "playing": false,
                        "loop": false,
                        "visible": false,
                        "spineAnimName": "win_panel_butterfly_glow",
                        "anchor": [0.5, 0.5],
                        "x": 1860,
                        "y": 505,
                        "spinedata": {
                            "spinename": "leftMeterAnim",
                            "animationname": "win_panel_butterfly_glow",
                            "loop": false,
                            "timeScale": 0.5,
                        },
                    },
                   
                    {
                        "name": "multiplierIncreaseAnimButterFly",
                        "type": "Spine",
                        "width": 2001,
                        "height": 523,
                        "image": "leftMeterAnim",
                        "animationSpeed": 0.9,
                        "playing": true,
                        "loop": true,
                        "visible": false,
                        "spineAnimName": "collectd_mtr_butterfly_blast",
                        "x": 1860,
                        "y": 505,
                        "spinedata": {
                            "spinename": "leftMeterAnim",
                            "animationname": "collectd_mtr_butterfly_blast",
                            "loop": true,
                            "timeScale": 0.9,
                        },
                    },
                    {
                        "name": "multiplierText",
                        "type": "Text",
                        "x": 920,
                        "y": 65,
                        "width": 500,
                        "text": "2X",
                        "visible": false,
                        "scaleToFit": true,
                        "anchor": [0.5, 0.5],
                        "textStyle": {
                            fontFamily: 'Impact',
                            fontSize: 100,
                            fill: ['#fff000', '#f19901'],
                            stroke: '#1b3201',
                            strokeThickness: 1,
                            dropShadow: true,
                            dropShadowColor: '#101f00',
                            dropShadowDistance: 2,
                            letterSpacing: 5
                        }
                    },
                    
                    {
                        "id": "multiplierIncreaseText",
                        "name": "multiplierIncreaseText",
                        "type": "Text",
                        "x": 953,
                        "y": 547,
                        "width": 250,
                        "class": "",
                        "layout": false,
                        "uimode": "desktop",
                        "visible": false,
                        "text": "x2",
                        "scaleToFit": true,
                        "anchor": [0.5, 0.5],
                        "textStyle": {
                            fontFamily: 'Impact',
                            fontSize: 188,
                            fontStyle: 'Normal',
                            align: 'center',
                            fill: ['#fff600', '#f19901'],
                            stroke: '#fafd00',
                            strokeThickness: 10,
                            dropShadow: true,
                            dropShadowColor: '#101f00',
                            letterSpacing: 25,
                            dropShadowDistance: 8,
                            dropShadowSize: 4
                        }
                    },
                    {
                        "id": "blast",
                        "name": "blast",
                        "type": "Spine",
                        "x": 952,
                        "y": 532,
                        "width": 4096,
                        "height": 3838,
                        "visible": false,
                        "spinedata": {
                            "spinename": "blastAnim",
                            "animationname": "animation",
                            "loop": false,
                            "timeScale": 1
                        },
                    },
                    {
                        "name": "multiplierWintickup",
                        "type": "NumberText",
                        "x": 955,
                        "y": 537,
                        "width": 1000,
                        "scaleToFit": true,
                        "text": "",
                        "value": 0,
                        "textType": "BitMapText",
                        "visible": false,
                        "prefix": "",
                        "postfix": "",
                        "anchor": [0.5, 0.5],
                        "numberaddup": false,
                        "skiptickup": false,
                        "runonvalue": false,
                        "tickupvalue": 1000,
                        "tickupspeed": 32,
                        "tickuptime": 600,
                        "decimaldigit": 0,
                        "textStyle": {
                            font: '90px celebration_win_num-export',
                            letterSpacing: 10
                        },
                    },                      
                ]

            },
            //ANCHOR - Mobile Container -------------------------
            {
            "name": "freegameMultiplierMobile",
            "type": "Container",
            "x": 0,
            "y": 0,
            "layout": true,
            "uimode": "mobile",
            child: [
                {
                    "id": "multiplierTopText",
                    "name": "multiplierTopText",
                    "type": "Text",
                    "x": 433.5,
                    "y": 588,
                    "width": 66,
                    "layout": true,
                    "uimode": "mobile",
                    "visible": true,
                    "text": "x1",
                    "scaleToFit": true,
                    "anchor": [0.5, 0.5],
                    "textStyle": {
                        fontFamily: 'MYP Bold',
                        fontSize: 35,
                        fontStyle: 'Normal',
                        align: 'center',
                        fill: ['#fff000', '#f19901'],
                        stroke: '#1b3201',
                        strokeThickness: 1,
                        dropShadow: true,
                        dropShadowColor: '#101f00',
                        dropShadowDistance: 2,
                        letterSpacing: 5
                    }
                },
                {
                    "name": "multiplierIncreaseAnim",
                    "type": "Spine",
                    "width": 3000,
                    "height": 523,
                    "image": "leftMeterAnim",
                    "animationSpeed": 0.9,
                    "playing": false,
                    "loop": false,
                    "visible": false,
                    "layout": true,
                    "uimode": "mobile",
                    "spineAnimName": "win_panel_butterfly_glow",
                    "anchor": [0.5, 0.5],
                    "x": 433.5,
                    "y": 588,
                    "spinedata": {
                        "spinename": "leftMeterAnim",
                        "animationname": "win_panel_butterfly_glow",
                        "loop": false,
                        "timeScale": 0.5,
                    },
                },
                {
                    "name": "multiplierIncreaseAnimButterFly",
                    "type": "Spine",
                    "width": 2001,
                    "height": 523,
                    "image": "leftMeterAnim",
                    "animationSpeed": 0.9,
                    "playing": true,
                    "loop": true,
                    "visible": false,
                    "layout": true,
                    "uimode": "mobile",
                    "spineAnimName": "collectd_mtr_butterfly_blast",
                    "x": 433.5,
                    "y": 588,
                    "spinedata": {
                        "spinename": "leftMeterAnim",
                        "animationname": "collectd_mtr_butterfly_blast",
                        "loop": true,
                        "timeScale": 0.9,
                    },
                },
                //NOTE - Multiplier Text that hits into win amount and blast
                {
                    "name": "multiplierText",
                    "type": "Text",
                    "x": 540.5,
                    "y": 1102,
                    "width": 500,
                    "text": "2X",
                    "visible": false,
                    "layout": true,
                    "uimode": "mobile",
                    "scaleToFit": true,
                    "anchor": [0.5, 0.5],
                    "textStyle": {
                        fontFamily: 'Impact',
                        fontSize: 100,
                        fill: ['#fff000', '#f19901'],
                        stroke: '#1b3201',
                        strokeThickness: 1,
                        dropShadow: true,
                        dropShadowColor: '#101f00',
                        dropShadowDistance: 2,
                        letterSpacing: 5
                    }
                    
                }, 
                //NOTE - X2 Text written on Level up
                {
                    "id": "multiplierIncreaseText",
                    "name": "multiplierIncreaseText",
                    "type": "Text",
                    "x": 540.5,
                    "y": 1102,
                    "width": 250,
                    "class": "",
                    "layout": true,
                    "uimode": "mobile",
                    "visible": false,
                    "text": "x2",
                    "scaleToFit": true,
                    "anchor": [0.5, 0.5],
                    "textStyle": {
                        fontFamily: 'MYP Bold',
                        // fontFamily: 'Impact',
                        fontSize: 124,
                        fontStyle: 'Normal',
                        align: 'center',
                        fill: ['#fff600', '#f19901'],
                        stroke: '#fafd00',
                        strokeThickness: 10,
                        dropShadow: true,
                        dropShadowColor: '#101f00',
                        letterSpacing: 25,
                        dropShadowDistance: 8,
                        dropShadowSize: 4
                    }
                },
                {
                    "id": "blast",
                    "name": "blast",
                    "type": "Spine",
                    "x": 529,
                    "y": 1106,
                    "width": 4096,
                    "height": 3838,
                    "visible": false,
                    "layout": true,
                    "uimode": "mobile",
                    "spinedata": {
                        "spinename": "blastAnim",
                        "animationname": "animation",
                        "loop": false,
                        "timeScale": 1
                    },
                },
                {
                    "name": "multiplierWintickup",
                    "type": "NumberText",
                    "x": 955,
                    "y": 537,
                    "width": 1000,
                    "scaleToFit": true,
                    "text": "",
                    "value": 0,
                    "textType": "BitMapText",
                    "visible": false,
                    "prefix": "",
                    "postfix": "",
                    "anchor": [0.5, 0.5],
                    "numberaddup": false,
                    "skiptickup": false,
                    "runonvalue": false,
                    "tickupvalue": 1000,
                    "tickupspeed": 32,
                    "tickuptime": 600,
                    "decimaldigit": 0,
                    "textStyle": {
                        font: '90px celebration_win_num-export',
                        letterSpacing: 10
                    },
                }, 
            
            ]     
            }                  
        ],
    }

};

export const FreegameMultiplierContext = React.createContext(
    {}
);
