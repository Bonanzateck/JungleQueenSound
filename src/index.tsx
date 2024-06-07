import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Gamestore } from './gamestore';

import { } from "./components/commongame/configuration/gofCommongameconfiguration";
import { } from "./components/buttonpanel/configuration/gofButtonpanelconfiguration";
import { } from "./components/basegame/configuration/gofBasegameconfiguration";
import { } from "./components/layout/configuration/gofLayoutconfiguration";
import { } from "./components/symbol/configuration/gofSymbolconfiguration";
import { } from "./components/landingsymbol/configuration/landingsymbolconfiguration";
import { } from "./components/autoplay/configuration/gofAutoplayConfiguration";
import { } from "./components/freegame/configuration/gofFreegameconfiguration";
import { } from "./components/winCelebration/configuration/winCelebrationConfiguration";
import { } from "./components/paytable/configuration/gofPaytableconfiguration";
import { } from "./components/overlay/configuration/gofOverlayconfiguration";
import { } from "./components/desktopSettingPanel/configuration/gofDesktopSettingPanelconfiguration";
import { } from "./components/mobViewPanel/configuration/gofMobViewPanelconfiguration";
import { } from "./components/playerMessage/configuration/gofPlayerMessageconfiguration";
import { } from "./components/flowManager/configuration/gofFlowManagerConfiguration";
import './customCss/mobViewPanel.css';
import { } from "./components/sounds/configuration/GAMEsoundconfiguration";
import { } from "./components/banner/configuration/gofBannerConfiguration";
import { } from "./components/introduction/configuration/introductionconfiguration";
import { } from "./components/payline/configuration/gamePaylineconfiguration";

import { } from "./data/config";
import { constant } from "./slot/data/config";
import 'pixi-spine';
import GameApp from "./gameApp";
import { configGame } from './slot/data/config';

class CoreGame  {

   
    getGameStart(langCode: string = "en"): JSX.Element {
        return (<></>);
    }
}

ReactDOM.render(
    <div>
        <div>

            {<GameApp width={configGame.CANVAS_WIDTH} height={configGame.CANVAS_HEIGHT} configGame={configGame}
                constant={constant} Gamestore={Gamestore} getGameStart={() => {
                }} />}
        </div>
    </div>
    ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
