import { configGame } from "../../../slot/data/config";
import { frameworkSymbol } from "@bonanzainteractive/slote_core";
frameworkSymbol.data = {
    "SYMBOL_WIDTH": configGame.SYMBOL_WIDTH,
    "SYMBOL_HEIGHT": configGame.SYMBOL_HEIGHT,
    "SINGLE_SYMBOL_DELAY_IN_ANIM": 1,
    "SYMBOL_ANIMATION_GRP_WISE": false,
    "SYMBOL_ANIMATION_EFFECT": [],
    "OVERLAY_SYMBOL_LIST": [],

    "symbols": [
       
        {
            "id": "15",
            "name": "symbol_Coin",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "symbol_Coin",
                    "visible": true,
                },
                {
                    id: "textOnSymbol",
                    name: "textOnSymbol",
                    type: "BitMapText",
                    alpha: 0,
                    x: 105,
                    y: 95,
                    width: 100,
                    visible: true,
                    text: "999",
                    scaleToFit: true,
                    anchor: [0.5, 0.5],
                    textStyle: {
                      font: "100px coin_digits-export"
                    }
                  }
            ],
            "visible": true,
        },
        {
            "id": "14",
            "name": "symbol_GoldenQueen",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "symbol_GoldenQueen",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "13",
            "name": "symbol_reveal",
            "width": 300,
            "height": 300,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 91,
            "child": [
                {
                    "type": "Image",
                    "width": 300,
                    "height": 300,
                    "x": -45.5,
                    "y": -45.5,
                    "image": "symbol_reveal",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "12",
            "name": "symbol_scatter",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "symbol_scatter",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "11",
            "name": "symbol_lv6",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "symbol_lv6",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "10",
            "name": "symbol_lv5",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "symbol_lv5",
                    "visible": true,
                }                
            ],
            "visible": true,
        },
        {
            "id": "9",
            "name": "symbol_lv4",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "symbol_lv4",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "8",
            "name": "symbol_lv3",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "symbol_lv3",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "7",
            "name": "symbol_lv2",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "symbol_lv2",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "6",
            "name": "symbol_lv1",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "symbol_lv1",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "5",
            "name": "symbol_hv5",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "symbol_hv5",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "4",
            "name": "symbol_hv4",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "symbol_hv4",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "3",
            "name": "symbol_hv3",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "symbol_hv3",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "2",
            "name": "symbol_hv2",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "symbol_hv2",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "1",
            "name": "symbol_hv1",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "symbol_hv1",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "0",
            "name": "symbol_wild",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "symbol_wild",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        //NOTE - Blur Symbol ----------------------------------------------------
        {
            "id": "31",
            "name": "blr_symbol_Coin",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": configGame.SYMBOL_WIDTH,
                    "height": configGame.SYMBOL_HEIGHT,
                    "image": "blr_symbol_Coin",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "30",
            "name": "blr_symbol_GoldenQueen",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": configGame.SYMBOL_WIDTH,
                    "height": configGame.SYMBOL_HEIGHT,
                    "image": "blr_symbol_GoldenQueen",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "29",
            "name": "blr_symbol_reveal",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 91,
            "child": [
                {
                    "type": "Image",
                    "width": 300,
                    "height": 300,
                    "x": -45.5,
                    "y": -45.5,
                    "image": "blr_symbol_reveal",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "28",
            "name": "blr_symbol_scatter",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": configGame.SYMBOL_WIDTH,
                    "height": configGame.SYMBOL_HEIGHT,
                    "image": "blr_symbol_scatter",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "27",
            "name": "blr_symbol_lv6",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "blr_symbol_lv6",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "26",
            "name": "blr_symbol_lv5",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "blr_symbol_lv5",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "25",
            "name": "blr_symbol_lv4",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "blr_symbol_lv4",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "24",
            "name": "blr_symbol_lv3",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "blr_symbol_lv3",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "23",
            "name": "blr_symbol_lv2",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "blr_symbol_lv2",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "22",
            "name": "blr_symbol_lv1",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "blr_symbol_lv1",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "21",
            "name": "blr_symbol_hv5",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "blr_symbol_hv5",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "20",
            "name": "blr_symbol_hv4",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "blr_symbol_hv4",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "19",
            "name": "blr_symbol_hv3",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "blr_symbol_hv3",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "18",
            "name": "blr_symbol_hv2",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "blr_symbol_hv2",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "17",
            "name": "blr_symbol_hv1",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "blr_symbol_hv1",
                    "visible": true,
                },
            ],
            "visible": true,
        },
        {
            "id": "16",
            "name": "blr_symbol_wild",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "type": "Image",
                    "width": 209,
                    "height": 209,
                    "image": "blr_symbol_wild",
                    "visible": true,
                },
            ],
            "visible": true,
        },
    ],

    "symbolsAnimation": [
        {
            "id": "15",
            "name": "symbol_scatter",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "offsetX": 0,
            "offsetY": 0,
            "child": [
            ],
            "loop": true,
            "visible": true,
        },
        {
            "id": "14",
            "name": "coinSymb",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "id": "queen_coin_Glow_sym_anim",
                    "name": "symbols_blast_animQueen",
                    "type": "Spine",
                    "width": configGame.SYMBOL_WIDTH,
                    "height": configGame.SYMBOL_HEIGHT,
                    "image": "ani_coin_queen",
                    "animationSpeed": 0.8,
                    "playing": false,
                    "loop": true,
                    "visible": true,
                    "effectType": "abc",
                    "maskHeight": 0,
                    "spineAnimName": "animation",
                    "x": 104.5,
                    "y": 104.5,
                    "spinedata": {
                        "spinename": "ani_coin_queen",
                        "animationname": "animation",
                        "loop": true,
                         "timeScale": 1
                    },
                },
            ],
            "loop": true,
            "visible": true,
        },   
        {
            "id": "13",
            "name": "symbol_reveal",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "id": "wildx2_symGlow_anim",
                    "name": "symbols_blast_anim",
                    "type": "Spine",
                    "width": 356.85,
                    "height": 279,
                    "image": "ani_reveal",
                    "animationSpeed": 0.8,
                    "playing": false,
                    "loop": true,
                    "visible": true,
                    "effectType": "abc",
                    "maskHeight": 0,
                    "spineAnimName": "landing",
                    "x": 104.5,
                    "y": 104.5,
                    "spinedata": {
                        "spinename": "ani_reveal",
                        "animationname": "landing",
                        "loop": true,
                         "timeScale": 1
                    },
                },
            ],
            "loop": true,
            "visible": true,
        },
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
                    "image": "ani_scatter",
                    "animationSpeed": 0.8,
                    "playing": false,
                    "loop": true,
                    "visible": true,
                    "effectType": "abc",
                    "maskHeight": 0,
                    "spineAnimName": "scatter",
                    "x": 104.5,
                    "y": 104.5,
                    "spinedata": {
                        "spinename": "ani_scatter",
                        "animationname": "scatter",
                        "loop": true,
                         "timeScale": 1
                    },
                },
            ],
            "loop": true,
            "visible": true,
        },
        {
            "id": "11",
            "name": "symbol_lv6",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "id": "lv6_Glow_sym_anim",
                    "name": "symbols_blast_anim",
                    "type": "Spine",
                    "width": configGame.SYMBOL_WIDTH,
                    "height": configGame.SYMBOL_HEIGHT,
                    "image": "ani_lv6",
                    "animationSpeed": 0.8,
                    "playing": false,
                    "loop": true,
                    "visible": true,
                    "effectType": "abc",
                    "maskHeight": 0,
                    "spineAnimName": "lv6",
                    "x": 104.5,
                    "y": 104.5,
                    "spinedata": {
                        "spinename": "ani_lv6",
                        "animationname": "lv6",
                        "loop": true,
                        "timeScale": 1
                    },
                },
            ],
            "loop": true,
            "visible": true,
        },
        {
            "id": "10",
            "name": "symbol_lv5",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "anchor": [0, 0],
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "id": "lv5_Glow_sym_anim",
                    "name": "symbols_blast_anim",
                    "type": "Spine",
                    "width": configGame.SYMBOL_WIDTH,
                    "height": configGame.SYMBOL_HEIGHT,
                    "image": "ani_lv5",
                    "animationSpeed": 0.8,
                    "playing": false,
                    "loop": true,
                    "visible": true,
                    "effectType": "abc",
                    "maskHeight": 0,
                    "spineAnimName": "lv5",
                    "x": 104.5,
                    "y": 104.5,
                    "spinedata": {
                        "spinename": "ani_lv5",
                        "animationname": "lv5",
                        "loop": true,
                        "timeScale": 1
                    },
                },
            ],
            "loop": true,
            "visible": true,
        },
        {
            "id": "9",
            "name": "symbol_lv4",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "id": "lv4_Glow_sym_anim",
                    "name": "symbols_blast_anim",
                    "type": "Spine",
                    "width": configGame.SYMBOL_WIDTH,
                    "height": configGame.SYMBOL_HEIGHT,
                    "image": "ani_lv4",
                    "animationSpeed": 0.8,
                    "playing": false,
                    "loop": true,
                    "visible": true,
                    "effectType": "abc",
                    "maskHeight": 0,
                    "spineAnimName": "lv4",
                    "x": 104.5,
                    "y": 104.5,
                    "spinedata": {
                        "spinename": "ani_lv4",
                        "animationname": "lv4",
                        "loop": true,
                         "timeScale": 1
                    },
                },
            ],
            "loop": true,
            "visible": true,
        },
        {
            "id": "8",
            "name": "symbol_lv3",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "id": "lv3_Glow_sym_anim",
                    "name": "symbols_blast_anim",
                    "type": "Spine",
                    "width": configGame.SYMBOL_WIDTH,
                    "height": configGame.SYMBOL_HEIGHT,
                    "image": "ani_lv3",
                    "animationSpeed": 0.8,
                    "playing": false,
                    "loop": true,
                    "visible": true,
                    "effectType": "abc",
                    "maskHeight": 0,
                    "spineAnimName": "lv3",
                    "x": 104.5,
                    "y": 104.5,
                    "spinedata": {
                        "spinename": "ani_lv3",
                        "animationname": "lv3",
                        "loop": true,
                        "timeScale": 1
                    },
                },
            ],
            "loop": true,
            "visible": true,
        },
        {
            "id": "7",
            "name": "symbol_lv2",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "id": "lv2_Glow_sym_anim",
                    "name": "symbols_blast_anim",
                    "type": "Spine",
                    "width": configGame.SYMBOL_WIDTH,
                    "height": configGame.SYMBOL_HEIGHT,
                    "image": "ani_lv2",
                    "animationSpeed": 0.8,
                    "playing": false,
                    "loop": true,
                    "visible": true,
                    "effectType": "abc",
                    "maskHeight": 0,
                    "spineAnimName": "lv2",
                    "x": 104.5,
                    "y": 104.5,
                    "spinedata": {
                        "spinename": "ani_lv2",
                        "animationname": "lv2",
                        "loop": true,
                        "timeScale": 1
                    },
                },
            ],
            "loop": true,
            "visible": true,
        },
        {
            "id": "6",
            "name": "symbol_lv1",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "id": "lv1_Glow_sym_anim",
                    "name": "symbols_blast_anim",
                    "type": "Spine",
                    "width": configGame.SYMBOL_WIDTH,
                    "height": configGame.SYMBOL_HEIGHT,
                    "image": "ani_lv1",
                    "animationSpeed": 0.8,
                    "playing": false,
                    "loop": true,
                    "visible": true,
                    "effectType": "abc",
                    "maskHeight": 0,
                    "spineAnimName": "lv1",
                    "x": 104.5,
                    "y": 104.5,
                    "spinedata": {
                        "spinename": "ani_lv1",
                        "animationname": "lv1",
                        "loop": true,
                        "timeScale": 1
                    },
                },
            ],
            "loop": true,
            "visible": true,
        },
        {
            "id": "5",
            "name": "symbol_hv5",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "id": "hv5_Glow_sym_anim",
                    "name": "ani_hv5",
                    "type": "Spine",
                    "width": configGame.SYMBOL_WIDTH,
                    "height": configGame.SYMBOL_HEIGHT,
                    "image": "ani_hv5",
                    "animationSpeed": 0.8,
                    "playing": false,
                    "loop": true,
                    "visible": true,
                    "effectType": "abc",
                    "maskHeight": 0,
                    "spineAnimName": "hv5",
                    "x": 104.5,
                    "y": 104.5,
                    "spinedata": {
                        "spinename": "ani_hv5",
                        "animationname": "hv5",
                        "loop": true,
                         "timeScale": 1
                    },
                },
            ],
            "loop": true,
            "visible": true,
        },
        {
            "id": "4",
            "name": "symbol_hv4",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "id": "hv4_Glow_sym_anim",
                    "name": "symbols_blast_anim",
                    "type": "Spine",
                    "width": configGame.SYMBOL_WIDTH,
                    "height": configGame.SYMBOL_HEIGHT,
                    "image": "ani_hv4",
                    "animationSpeed": 0.8,
                    "playing": false,
                    "loop": true,
                    "visible": true,
                    "effectType": "abc",
                    "maskHeight": 0,
                    "spineAnimName": "hv4",
                    "x": 104.5,
                    "y": 104.5,
                    "spinedata": {
                        "spinename": "ani_hv4",
                        "animationname": "hv4",
                        "loop": true,
                         "timeScale": 1
                    },
                },
            ],
            "loop": true,
            "visible": true,
        },
        {
            "id": "3",
            "name": "symbol_hv3",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "id": "hv3_Glow_sym_anim",
                    "name": "symbols_blast_anim",
                    "type": "Spine",
                    "width": configGame.SYMBOL_WIDTH,
                    "height": configGame.SYMBOL_HEIGHT,
                    "image": "ani_hv3",
                    "animationSpeed": 0.8,
                    "playing": false,
                    "loop": true,
                    "visible": true,
                    "effectType": "abc",
                    "maskHeight": 0,
                    "spineAnimName": "hv3",
                    "x": 104.5,
                    "y": 104.5,
                    "spinedata": {
                        "spinename": "ani_hv3",
                        "animationname": "hv3",
                        "loop": true,
                         "timeScale": 1
                    },
                },
            ],
            "loop": true,
            "visible": true,
        },
        {
            "id": "2",
            "name": "symbol_hv2",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "id": "hv2_Glow_sym_anim",
                    "name": "symbols_blast_anim",
                    "type": "Spine",
                    "width": configGame.SYMBOL_WIDTH,
                    "height": configGame.SYMBOL_HEIGHT,
                    "image": "ani_hv2",
                    "animationSpeed": 0.8,
                    "playing": false,
                    "loop": true,
                    "visible": true,
                    "effectType": "abc",
                    "maskHeight": 0,
                    "spineAnimName": "hv2",
                    "x": 104.5,
                    "y": 104.5,
                    "spinedata": {
                        "spinename": "ani_hv2",
                        "animationname": "hv2",
                        "loop": true,
                         "timeScale": 1
                    },
                },

            ],
            "loop": true,
            "visible": true,
        },
        {
            "id": "1",
            "name": "symbol_hv1",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "id": "hv1_Glow_sym_anim",
                    "name": "symbols_blast_anim",
                    "type": "Spine",
                    "width": configGame.SYMBOL_WIDTH,
                    "height": configGame.SYMBOL_HEIGHT,
                    "image": "ani_hv1",
                    "animationSpeed": 0.8,
                    "playing": true,
                    "loop": true,
                    "visible": true,
                    "effectType": "abc",
                    "maskHeight": 0,
                    "spineAnimName": "hv1",
                    "x": 104.5,
                    "y": 104.5,
                    "spinedata": {
                        "spinename": "ani_hv1",
                        "animationname": "hv1",
                        "loop": true,
                         "timeScale": 1
                    },
                },
            ],
            "loop": true,
            "visible": true,
        },

        {
            "id": "0",
            "name": "symbol_wild",
            "width": configGame.SYMBOL_WIDTH,
            "height": configGame.SYMBOL_HEIGHT,
            "offsetX": 0,
            "offsetY": 0,
            "child": [
                {
                    "id": "wildx1_symGlow_anim",
                    "name": "symbols_blast_anim",
                    "type": "Spine",
                    "width": configGame.SYMBOL_WIDTH,
                    "height": configGame.SYMBOL_HEIGHT,
                    "image": "ani_wild",
                    "animationSpeed": 0.8,
                    "playing": false,
                    "loop": true,
                    "visible": true,
                    "effectType": "abc",
                    "maskHeight": 0,
                    "spineAnimName": "animation",
                    "x": 104.5,
                    "y": 104.5,
                    "spinedata": {
                        "spinename": "ani_wild",
                        "animationname": "animation",
                        "loop": true,
                         "timeScale": 1
                    },
                },
            ],
            "loop": true,
            "visible": true,
        },
       
       
                
       
    ]
}