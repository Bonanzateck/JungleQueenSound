import React, { Component } from "react";
import { withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { IStore } from "../store/IStore";
import { Dispatch } from "redux";
import { soundActions } from "@bonanzainteractive/slote_core";
import withSoundConfiguration from "../sounds/configuration/withSoundConfiguration";
import { Howl, Howler } from "howler"
import PIXI from "pixi.js";

interface IProps {
    [x: string]: any;
}

interface IStateToProps { }
interface IDispatchToProps { }
interface IState { }

class Sounds extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected _currentvol: number = 1;
    protected playingSound: any = [];
    constructor(props: IProps) {
        super(props);
        this.app = props.app;
    }
    private createNewSound(urls: [], spriteData: any): any {
        return new Howl({
            src: urls,
            autoplay: false,
            sprite: spriteData,
            onend: () => {
                this.props.endSound();
            }
        });
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        const {
            currentvol,
            gamePause,
            soundLoadStart,
            changeVolumesoundobjList,
            stopsoundobjList,
            fadesoundobjList,
            allSoundSFXStop,
            allSoundBGMStop,
            playsoundobjList,
        } = nextProps;

        this.setVolume(currentvol);

        if (gamePause !== this.props.gamePause) {
            this.setVolume(gamePause ? 0 : currentvol);
        }

        if (soundLoadStart !== this.props.soundLoadStart) {
            this.soundLoadStart();
        }

        if (changeVolumesoundobjList !== this.props.changeVolumesoundobjList) {
            this.changeVolume(changeVolumesoundobjList);
        }

        if (stopsoundobjList !== this.props.stopsoundobjList) {
            this.stopSound(stopsoundobjList);
        }

        if (fadesoundobjList !== this.props.fadesoundobjList) {
            this.fadeOut(fadesoundobjList);
        }

        if (allSoundSFXStop !== this.props.allSoundSFXStop) {
            this.stopAllSFXSound();
        }

        if (allSoundBGMStop !== this.props.allSoundBGMStop) {
            this.stopAllBGMSound();
        }

        if (playsoundobjList !== this.props.playsoundobjList) {
            this.playSound(playsoundobjList);
        }
        return false;
    }

    playSound(nameList: any) {
        for (let da of nameList) {
            if (!this.props.data.sfx || !this.props.data.bg) {
                continue;
            }
            const { name, loop, vol } = da;
            const soundInstance = this.props.sound.find((s: any) => s.name === name);
            if (!soundInstance) {
                continue;
            }
            const { type, sound } = soundInstance;
            if (vol) {
                sound.vol = vol;
            }

            if (type === "bg" && sound.howl.playing()) {
                sound.howl.volume(sound.vol);
            } else {
                if (!this.props.allSoundBGMStop && !this.props.allSoundSFXStop) {
                    sound.howl.volume(sound.vol);
                    sound.howl.loop(loop || false);
                    sound.howl.play(soundInstance.name);
                } else if (!this.props.allSoundBGMStop && type === "bg") {
                    // do nothing
                } else if (!this.props.allSoundSFXStop && type === "sfx") {
                    sound.howl.volume(sound.vol);
                    sound.howl.loop(loop || false);
                    sound.howl.play(soundInstance.name);
                }
            }
        }
    }

    stopSound(nameList: any) {
       
        nameList.forEach(({ name }: { name: string }) => {
            const soundInstance = this.props.sound.find((element: any) => element.name === name);
            soundInstance?.sound?.howl.stop();
        });
    }

    async fadeOut(nameList: any): Promise<void> {
        const fadePromises = nameList.map(async ({ name }: { name: string }) => {
            const soundInstance = this.props.sound.find((element: any) => element.name === name);
            if (soundInstance) {
                await soundInstance.sound.howl.fade((soundInstance.sound.vol * this._currentvol), 0, 500);
                soundInstance.sound.howl.stop();
            }
        });
        await Promise.all(fadePromises);
    }

    stopAllSFXSound() {
        this.props.sound.forEach((element: any) => {
            if (element.type === "sfx") {
                element.sound.howl?.stop();
            }
        });
    }

    stopAllBGMSound() {
        this.props.sound.forEach((element: any) => {
            if (element.type === "bg") {
                element.sound.howl?.stop();
            }
        });
    }

    changeVolume(nameList: any): void {
        for (const da of nameList) {
            if (!this.props.data.sfx || !this.props.data.bg ||
                (this.props.data.sfx[da.name] === undefined && this.props.data.bg[da.name] === undefined)) {
                continue;
            }
            const soundInstance = this.props.sound.find((element: any) => element.name === da.name);
            if (Number.isFinite(da.vol)) {
                soundInstance?.sound.howl.volume(da.vol);
            }
        }
    }

    setVolume(vol: number): void {
        this._currentvol = vol;
        Howler.volume(vol);
    }

    soundLoadStart() {
        const { sfx, bg, srcPath, spriteData } = this.props.data;
        const soundCreate = this.createNewSound(srcPath, spriteData);
        const sounds = [
            ...Object.keys(sfx).map(name => {
                let loop = sfx[name].loop ? sfx[name].loop : false;
                let vol = sfx[name].vol ? sfx[name].vol : 1;
                soundCreate.loop(loop);
                soundCreate.volume(vol * this._currentvol);

                return {
                    name,
                    type: 'sfx',
                    sound: { howl: soundCreate, debounce: {}, vol: vol }
                }
            }),
            ...Object.keys(bg).map(name => {
                let loop = bg[name].loop ? bg[name].loop : false;
                let vol = bg[name].vol ? bg[name].vol : 1;
                let soundCreateTemp = soundCreate;
                // if (bg[name].id === "jq_mx_basegame" || bg[name].id === 'jq_mx_freegame_music_loop') {
                //     soundCreateTemp = this.createNewSound(srcPath, spriteData);
                // }
                soundCreateTemp.loop(loop);
                soundCreateTemp.volume(vol * this._currentvol);
                return {
                    name,
                    type: 'bg',
                    sound: { howl: soundCreateTemp, debounce: {}, vol: vol }
                }
            })
        ];
        this.props.addSound(sounds);
    }

    render() {
        return null;
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'applicationState' | 'basegameState' | 'reelsState' | 'asyncInitAction' | 'soundState'>): IStateToProps =>
    ({
        soundLoadStart: state.soundState.soundLoadStart,
        playsoundobjList: state.soundState.playsoundobjList,
        stopsoundobjList: state.soundState.stopsoundobjList,
        fadesoundobjList: state.soundState.fadesoundobjList,
        changeVolumesoundobjList: state.soundState.changeVolumesoundobjList,
        currentvol: state.soundState.currentvol,
        allSoundSFXStop: state.soundState.allSoundSFXStop,
        allSoundBGMStop: state.soundState.allSoundBGMStop,
        sound: state.soundState.sound,
        gamePause: state.applicationState.gamePause,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        addSound: (symbol: any): any => dispatch(soundActions.addSound(symbol)),
        endSound: (): any => dispatch(soundActions.endSound())
    }))(withSoundConfiguration(Sounds)));