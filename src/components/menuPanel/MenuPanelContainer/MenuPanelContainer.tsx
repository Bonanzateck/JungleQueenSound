import React, { useState } from 'react';
import { withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import "./MenuPanelContainer.css"
import History from '../history/History';
import Rules from '../rules/Rules';
import Settings from '../settings/Settings';
import { buttonActions, keyboardListenerActions, soundActions } from '@bonanzainteractive/slote_core';
import { isMobile } from 'react-device-detect';
import { UIManager } from '@bonanzainteractive/core';
import { actions as behaviourAction } from "../../../gamereducer/behaviourReducer";
import { actions as keyBoardAction } from "../../../gamereducer/autoplayKeyboardListenerReducer";

interface IDispatchToProps { }

interface IStore {
    [x: string]: any;
}

interface IStateToProps {
    spinWithSpaceBar: boolean,
    soundIsPlaying: boolean;
    allSoundBGMStop: boolean;
    storeSliderValue: number;
    allSoundSFXStop: boolean;

}

function MenuPanelContainer(props: any) {

    const { stopAllSFXSound, allSoundSFXStop,spaceBarSpin, spinWithSpaceBar, setMenuButtonClicked, playSound, playingSound, soundIsPlaying, allSoundBGMStop, stopAllBGMSound, storeSliderValue, setSliderValue } = props;

    // console.log(storeSliderValue);

    const [history, setHistory] = useState(true);
    const [rules, setRules] = useState(false);
    const [settings, setSettings] = useState(false);
    const [historyColor, setHistoryColor] = useState('active');
    const [ruleColor, setRuleColor] = useState('');
    const [settingColor, setSettingColor] = useState('');

    function handleHistoryBtn() {
        setHistory(true);
        setSettings(false);
        setRules(false);
        setHistoryColor('active');
        setRuleColor('');
        setSettingColor("")
        onClickSound();
    }

    function handleRuleBtn() {
        setHistory(false);
        setSettings(false);
        setRules(true);
        setHistoryColor('');
        setRuleColor('active');
        setSettingColor('')
        onClickSound();
    }

    function handleSettingBtn() {
        setHistory(false);
        setRules(false);
        setSettings(true);
        setHistoryColor('');
        setRuleColor('');
        setSettingColor('active')
        onClickSound();
    }

    function onClickSound() {
        props.setApplicationButtonClicked(true);
        props.setApplicationButtonClicked(false);
    }

    function handleCloseBtn() {
        const popup_black: any = UIManager.getRef("popup_black");
        popup_black && (popup_black.visible = false);

        const menu_btn: any = UIManager.getRef("btn_menu");
        menu_btn && (menu_btn.visible = true);
        setMenuButtonClicked(false, false);
        onClickSound();
    }

    return (
        <div className='menuPanel'>
            <div className="menuContent">
                {history ? <History></History> : null}
                {rules ? <Rules></Rules> : null}
                {
                    settings ?
                        <Settings
                            spaceBarSpin={spaceBarSpin}
                            spinWithSpaceBar={spinWithSpaceBar}
                            onClickSound={onClickSound}
                            playSound={playSound}
                            playingSound={playingSound}
                            soundIsPlaying={soundIsPlaying}
                            stopAllBGMSound={stopAllBGMSound}
                            allSoundBGMStop={allSoundBGMStop}
                            storeSliderValue={storeSliderValue}
                            setSliderValue={setSliderValue}
                            stopAllSFXSound={stopAllSFXSound}
                            allSoundSFXStop={allSoundSFXStop}
                        ></Settings> :
                        null
                }
            </div>
            <div className="menuIcons">
                <svg onClick={handleHistoryBtn} xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-history history_btn ${historyColor}`}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" /></svg>
                <svg onClick={handleRuleBtn} xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-scroll-text rule_btn ${ruleColor}`}><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" /><path d="M19 17V5a2 2 0 0 0-2-2H4" /><path d="M15 8h-5" /><path d="M15 12h-5" /></svg>
                <svg onClick={handleSettingBtn} xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 setting_btn ${settingColor} `}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </div>

            {
                isMobile ?
                    <div className="closeButton">
                        <button onClick={handleCloseBtn}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-circle"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                        </button>
                    </div> : null
            }
        </div>
    )
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'keyboardListenerState' | 'soundState' | "autoplayKeyBoardListenerState">): IStateToProps =>
    ({
        spinWithSpaceBar: state.keyboardListenerState.spinWithSpaceBar,
        soundIsPlaying: state.soundState.soundIsPlaying,
        allSoundBGMStop: state.soundState.allSoundBGMStop,
        storeSliderValue: state.autoplayKeyBoardListenerState.storeSliderValue,
        allSoundSFXStop: state.soundState.allSoundSFXStop,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        spaceBarSpin: (spinWithSpaceBar: boolean): any => dispatch(keyboardListenerActions.spaceBarSpin(spinWithSpaceBar)),
        setMenuButtonClicked: (menuBtnClicked: any, isMenuOpen: boolean): any => dispatch(behaviourAction.setMenuButtonClicked(menuBtnClicked, isMenuOpen)),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        playingSound: (soundIsPlaying: any): any => dispatch(soundActions.playingSound(soundIsPlaying)),
        stopAllBGMSound: (stopBgSound: any): any => dispatch(soundActions.stopAllBGMSound(stopBgSound)),
        setSliderValue: (storeSliderValue: number): any => dispatch(keyBoardAction.setSliderValue(storeSliderValue)),
        stopAllSFXSound: (stopAllSfxSound: boolean): any => dispatch(soundActions.stopAllSFXSound(stopAllSfxSound)),
    }))((MenuPanelContainer)));
