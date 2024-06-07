import {basegameAssetConfig} from "../../../slot/data/basegame/index"
import {buttonpanelAssetConfig} from "../../../slot/data/buttonpanel/index"
import {symbolAssetConfig} from "../../../slot/data/symbol"
import {paylineAssetConfig} from "../../../slot/data/payline"
import {introAssetConfig} from "../../../slot/data/intro"
import {soundAssetConfig} from "../../../slot/data/sounds"
import {loadingGameConfig} from "../../../data/loader"
import { autoplayAssetConfig } from "../../../slot/data/autoplay"


export enum loadingAssetConfig {
    loaderLandscapeBG = "assets/loader/landscapeloading_bg.webp",
    loaderPortraitBg = "assets/loader/portraitloading_bg.webp",
    loaderloadingBar = "assets/loader/bar.webp",
    loaderloadingBarBG = "assets/loader/loading_base.webp",
    loaderBarButterfly = "assets/loader/loading_butterfly.webp",

}


export enum loadsetforset1 {
}

export let AllAssetLoader = {
    loadsetforset1,
    basegameAssetConfig,
    symbolAssetConfig,
    autoplayAssetConfig,
    buttonpanelAssetConfig,
    paylineAssetConfig,
    introAssetConfig,
    soundAssetConfig,
    loadingGameConfig
    
    
    
   
}
