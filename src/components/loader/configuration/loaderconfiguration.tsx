import React from "react";
 import { loadingAssetConfig } from "../../../slot/data/loader/assetconfig"
 import { AllAssetLoader } from "../../../slot/data/loader/assetconfig"
import { IframeworkLoader } from "@bonanzainteractive/core";


export let frameworkLoader: IframeworkLoader;
frameworkLoader = {
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

export const LoaderConfigurationContext = React.createContext(
    {}
);