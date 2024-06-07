import React from "react";
import { configGame } from "../../../slot/data/config";
import { Ianimation } from "../interface/Ianimation";

interface IframeworkReelContainer {
    data: {
        "SYMBOL_WIDTH": number,
        "SYMBOL_HEIGHT": number,
        "SINGLE_SYMBOL_DELAY_IN_ANIM": number,
        "SYMBOL_ANIMATION_GRP_WISE": boolean,
        "SYMBOL_ANIMATION_EFFECT": Array<string>
        "OVERLAY_SYMBOL_LIST": Array<number>

        "symbols": Array<{
            "id": string,
            "name": string,
            "width"?: number | string,
            "height"?: number | string,
            "x"?: number | string,
            "y"?: number | string,
            "offsetX"?: number | string,
            "offsetY"?: number | string,
            "anchor"?: any,
            "visible": boolean,
            "child": Array<Ianimation>,
        }>,
        "symbolsAnimation": Array<{
            "id": string,
            "name": string,
            "effectType"?: any,
            "spineAnimName"?: any,
            "width"?: number | string,
            "height"?: number | string,
            "x"?: number | string,
            "y"?: number | string,
            "offsetX"?: number | string,
            "offsetY"?: number | string,
            "anchor"?: any,
            "visible": boolean,
            "loop"?: boolean,
            "child": Array<Ianimation>,
        }>,

    }

}

export const frameworkSymbol: IframeworkReelContainer = {
    data: {
        "SYMBOL_WIDTH": configGame.SYMBOL_WIDTH,
        "SYMBOL_HEIGHT": configGame.SYMBOL_HEIGHT,
        "SINGLE_SYMBOL_DELAY_IN_ANIM": 100,
        "SYMBOL_ANIMATION_GRP_WISE": false,
        "SYMBOL_ANIMATION_EFFECT": [],
        "symbols": [],
        "symbolsAnimation": [],
        "OVERLAY_SYMBOL_LIST": []
    }


};

export const SymbolConfigurationContext = React.createContext(
    {}
);