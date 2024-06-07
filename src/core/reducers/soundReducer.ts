import {actionTypes} from "@bonanzainteractive/slote_core";
export interface IApplicationState {

    sound: any;
    isMute: boolean;
    allSoundSFXStop: boolean;
    allSoundBGMStop: boolean;
    currentbgm: string;
    currentvol: number;
    playsoundobjList: Array<string>;
    stopsoundobjList: Array<string>;
    fadesoundobjList: Array<string>;
    changeVolumesoundobjList: Array<string>;
    watchsfx: string;
    soundcount: number;
    soundIsPlaying: boolean;
    soundLoadStart: boolean;
    diamondIsMoving: boolean;
    updateSpinMeter: boolean;
}

const initialState: IApplicationState = {
    sound: {},
    isMute: false,
    allSoundSFXStop: false,
    allSoundBGMStop: true,
    currentbgm: "",
    currentvol: 1,
    watchsfx: "",
    changeVolumesoundobjList: [],
    playsoundobjList: [],
    stopsoundobjList: [],
    fadesoundobjList: [],
    soundcount: 0,
    soundIsPlaying: false,
    soundLoadStart: false,
    diamondIsMoving: false,
    updateSpinMeter: false
};


export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {

    const { soundComponent, volume, soundObject, isMute, stopBgSound, stopSfxSound, soundIsPlaying, soundLoadStart, diamondIsMoving, updateSpinMeter } = action;
    switch (action.type) {
        case actionTypes.SOUND_ADD:
            return { ...state, sound: soundComponent };
        case actionTypes.PLAY_SOUND:
            return { ...state, playsoundobjList: soundObject };
        case actionTypes.PLAY_BGM:
            return {
                ...state,
            };
        case actionTypes.STOP:
            return {
                ...state, stopsoundobjList: soundObject
            };
        case actionTypes.SOUND_START_LOADING:
            return {
                ...state, soundLoadStart: soundLoadStart
            };
        case actionTypes.SOUND_IS_PLAYING:
            return {
                ...state, soundIsPlaying: soundIsPlaying
            };
        case actionTypes.CHANGE_VOLUME_SOUNDLIST:
            return {
                ...state, changeVolumesoundobjList: soundObject
            };
        case actionTypes.FADE_OUT:
            return {
                ...state, fadesoundobjList: soundObject
            };
        case actionTypes.STOP_ALL_SFX:
            return {
                ...state, allSoundSFXStop: stopSfxSound,
            };
        case actionTypes.STOP_ALL_BGM:
            return {
                ...state, allSoundBGMStop: stopBgSound,
            };
        case actionTypes.EVENT_SOUND_END:
            return {
                ...state
            };
        case actionTypes.SET_VOLUME:
            return {
                ...state, currentvol: volume
            };
        case actionTypes.SET_MUTE_SOUND:
            let vol: number = 0;
            if (isMute) {
                vol = 0;
            } else {
                vol = 1;
            }
            return {
                ...state, isMute: isMute, currentvol: vol
            };
        case actionTypes.SOUND_ACTION:
            return {
                ...state, ...action.updateStateObj,
            };
        default:
            return state;
    }
}

export const actions = {
    addSound: (soundComponent: any): any => ({ type: actionTypes.SOUND_ADD, soundComponent }),
    playSound: (soundObject: Array<string>): any => ({ type: actionTypes.PLAY_SOUND, soundObject }),
    stopSound: (soundObject: Array<string>): any => ({ type: actionTypes.STOP, soundObject }),
    fadeOutSound: (soundObject: Array<string>): any => ({ type: actionTypes.FADE_OUT, soundObject }),
    changeVolume: (soundObject: Array<string>): any => ({ type: actionTypes.CHANGE_VOLUME_SOUNDLIST, soundObject }),
    setVolume: (volume: number): any => ({ type: actionTypes.SET_VOLUME, volume }),
    setMute: (isMute: boolean): any => ({ type: actionTypes.SET_MUTE_SOUND, isMute }),
    stopAllBGMSound: (stopBgSound: boolean): any => ({ type: actionTypes.STOP_ALL_BGM, stopBgSound }),
    stopAllSFXSound: (stopSfxSound: boolean): any => ({ type: actionTypes.STOP_ALL_SFX, stopSfxSound }),
    endSound: (): any => ({ type: actionTypes.EVENT_SOUND_END }),
    setVolumeSound: (volume: number): any => ({ type: actionTypes.SET_VOLUME, volume }),
    playingSound: (soundIsPlaying: boolean): any => ({ type: actionTypes.SOUND_IS_PLAYING, soundIsPlaying }),
    soundLoadStartFunction: (soundLoadStart: boolean): any => ({ type: actionTypes.SOUND_START_LOADING, soundLoadStart }),
    soundButtonUpdateState: (updateStateObj: any): any => ({
        type: actionTypes.SOUND_ACTION,
        updateStateObj
    }),
}; 
