import React, { Component } from "react";
import withLoaderConfiguration from "../loader/configuration/withLoaderConfiguration";
import * as PIXI from 'pixi.js'
import { Graphics, Text, withPixiApp } from '@inlet/react-pixi'
import { Container, Sprite } from '@inlet/react-pixi'
import { isMobile, isTablet } from "react-device-detect";
import { Iloader } from "./interface/Iloader";
import { GSAPTimer } from "@bonanzainteractive/core";

interface IProps {
    [x: string]: any;
    onloadingComplete: Function,
    onGameAssetsLoad: Function,
    getLoading: Function,
    // intropagevisible: any;
}

interface IState {
    isLoadComplete: boolean,
    showLoader: boolean,
    width: number,
    height: number,
    showPopUp: boolean,
}


export interface IframeworkLoader {
    data: {
        loader: Iloader
    }
}

/**
 * Loader class  
 * Loader class use for loaded  all type of assets and all  
 * common assets and game assets 
 * export default withLoaderConfiguration
 */
class Loader extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected loaderConfig: any;
    protected manifest: any;
    protected loaderRect: any;
    protected loadingText: PIXI.Text | null;
    protected loaderContainer: PIXI.Container | null;
    protected handleClick: Function;
    protected loadedImageBG: string;
    protected loadedBarImage: string;
    protected loadedBarImageBG: string;
    private minFullHDWidth: number;
    private HDReadyWidth: number;
    private minFullHDPxRatio: number;
    private loadHD = false;
    private resolutionPath = "";
    private _isMounted = false;
    private maskingArr: PIXI.Graphics[] = [];
    private butterFlyX: number = 0;
    private butterFlyY: number = 0;
    private loadingProgress: any;
    /**
     * constructor function
     * @param {any} -IProps  
     * set initial stages 
     * bind the call function aslo 
     */
    constructor(props: IProps) {
        super(props);
        this.state = {
            showLoader: false,
            isLoadComplete: false,
            width: this.props.width,
            height: this.props.height,
            showPopUp: false,
        }
        this.app = props.app;
        this.loadedImageBG = '';
        this.loadedBarImage = '';
        this.loadedBarImageBG = '';
        this.loadingText = null;
        this.loaderContainer = null;
        this.loaderConfig = props.data.loader;
        this.manifest = this.loaderConfig.manifest;
        this.handleClick = this.hideLoader.bind(this);
        this.props.getLoading();
        this.minFullHDWidth = 1024;
        this.HDReadyWidth = 1280;
        this.minFullHDPxRatio = 2;
        this.loadingProgress = "";
        this.init();
    }

    /**
    * init function  
    * @param {any} -IProps  
    * set initial stages 
    */
    init() {
        this.loadHD = this.checkDeviceResolution();
        this.resolutionPath = this.loadHD ? "HD/" : "LD/";
        if (isTablet) {
            this.resolutionPath = "LD/";
        }
        this.app.loader.baseUrl = this.loaderConfig.baseUrl;
        const { loader } = this.props.data;
        for (const key in loader.config) {
            this.app.loader.add(key, this.resolutionPath + loader.config[key])
        }
        this.app.loader.onProgress.once(this.showProgress, this);
        this.app.loader.onComplete.once(this.loadScreenAssetDone, this);
        this.app.loader.onError.once(this.reportError, this);
        this.app.loader.load();
    }
    /**
    * checkDeviceResolution function  
    * Here function will check device resolution  
    */
    checkDeviceResolution() {
        let screen = window.screen;
        let isFullHD = false;
        // FullHD atlas will be loaded on devices whose base resolution is greater than 1024px width and its pixel ratio (density) is greater than 1 (https://mydevice.io/devices/)
        // In the case of computer screens which normally have a pixel ratio of 1, it will be checked if the base resolution is HDReady or FullHD to load the fullHD atlas
        if (((screen.width >= this.minFullHDWidth || screen.height >= this.minFullHDWidth) && window.devicePixelRatio >= this.minFullHDPxRatio) ||
            (screen.width >= this.HDReadyWidth || screen.height >= this.HDReadyWidth)) {
            isFullHD = true;
        }

        return isFullHD;
    }
    showProgress(e: any) {
    }

    reportError(e: any) {
        console.error("show error:", e.message);
    }
    /**
   * loadScreenAssetDone function  
   * @param {void} -IProps  
   * set initial stages 
   */
    loadScreenAssetDone() {
        this.loadedImageBG = this.app.loader.resources.loaderLandscapeBG.url;
        this.loadedBarImage = this.app.loader.resources.loaderloadingBar && this.app.loader.resources.loaderloadingBar.url;
        this.loadedBarImageBG = this.app.loader.resources.loaderloadingBarBG && this.app.loader.resources.loaderloadingBarBG.url;
        this.setState((prevState) => {
            return {
                ...prevState,
                showLoader: true,
            }
        })
        this.startManifestLoading();
    }
    /**
     * startManifestLoading function  
     * Loading with Url data      
     *  
     * */
    startManifestLoading() {
        this.app.loader.baseUrl = "";
        for (const key in this.manifest) {
            let str: any = this.manifest[key];
            for (const subkey in this.manifest[key]) {
                let re: any = ""
                let replaceToBe = ""
                if (isMobile) {
                    if (this.manifest[key][subkey].indexOf("@mobile") > -1) {
                        re = /\@mobile/gi;
                        replaceToBe = "mobile";
                    }
                    if (this.manifest[key][subkey].indexOf("@desktop") > -1) {
                        continue;
                    }
                } else {
                    if (this.manifest[key][subkey].indexOf("@mobile") > -1) {
                        continue;
                    }
                    if (this.manifest[key][subkey].indexOf("@desktop") > -1) {
                        re = /\@desktop/gi;
                        replaceToBe = "desktop";
                    }
                }
                if (replaceToBe) {
                    this.app.loader.add(subkey, this.resolutionPath + this.manifest[key][subkey].replace(re, replaceToBe))
                } else {
                    this.app.loader.add(subkey, this.resolutionPath + this.manifest[key][subkey])
                }

            }
        }
        for (const key in this.props.lanAssetConfig) {
            let str: any = this.props.lanAssetConfig[key];
            let re = /\langCode/gi;
            this.app.loader.add(key, this.resolutionPath + str.replace(re, this.props.langcode))
        }
        this.loaderRect && (this.loaderRect.visible = false);
        this.app.loader.onProgress.add(this.showAssetProgress, this)
        this.app.loader.onComplete.once(this.gameAssetLoaded, this);
        this.app.loader.onError.once(this.reportError);
        this.app.loader.load();
    }
    /**
     * showAssetProgress function  
     * @param {object}-e showing the percentage of loading object 
     * @function {callback} - onGameLoadPercentage 
     * set mask for loading bar 
     */
    private value = 0;
    private firstTime: boolean = false;
    showAssetProgress(e: object) {
        let progresiveData = Object(e);
        this.loadingText && (this.loadingText.text = (this.props.langObj[this.loaderConfig.loadingScreenType1.progressBar.displayTextOne.text] || this.loaderConfig.loadingScreenType1.progressBar.displayTextOne.text) + " " + Math.floor(progresiveData.progress) + "%");
        this.loaderRect && (this.loaderRect.visible = true);
        this.loaderRect && (this.loaderRect.width = this.props.constant.configGame.loaderBarWidth);
        this.addMask();  //creating mask for loading bar
        this.maskingArr[0].x = this.props.constant.configGame.loaderBarWidth * Math.floor(progresiveData.progress) / 100;
        this.props.onGameLoadPercentage(Math.floor(progresiveData.progress));

        // this.loadingProgress = this.props.langObj[this.loaderConfig.loadingScreenType1.progressBar.displayTextOne.text] + "... " + " " + Math.round(progresiveData.progress) + "%";

        // if (progresiveData.progress >= 90) {

        //     if (this.firstTime === false) {
        //         this.firstTime = true;
        //         this.value = 90;
        //         this.nowCustomUpdate();
        //     }

        //     // this.loadingProgress = this.props.langObj[this.loaderConfig.loadingScreenType1.progressBar.displayTextOne.text] + "... " + " " + 10 + "%";

        //     // this.hideLoader();
        // } else {
        //     this.value = 0;
        //     this.loadingProgress = this.props.langObj[this.loaderConfig.loadingScreenType1.progressBar.displayTextOne.text] + "... " + " " + Math.round(progresiveData.progress) + "%";

        // }

        this.forceUpdate();

    }

    private nowCustomUpdate(): void {
        if (this.value < 101) {
            if (this.value === 100) {
                this.loadingProgress = this.props.langObj[this.loaderConfig.loadingScreenType1.progressBar.displayTextOne.text] + "... " + " " + this.value + "%";
              
                this.hideLoader();
            }
            GSAPTimer.getInstance().addTimer(0.250, () => {
                this.value = this.value + 1;
                this.loadingProgress = this.props.langObj[this.loaderConfig.loadingScreenType1.progressBar.displayTextOne.text] + "... " + " " + this.value + "%";
                this.forceUpdate();
                this.nowCustomUpdate();
            });
           
        } else {
            this.hideLoader();
        }

    }

    showLoaderProgress() {
        const loaderProgress = (!isMobile || (isMobile && window.innerWidth > window.innerHeight)) ?
            <Text
                anchor={[0.5, 0.5]} width={275} height={48}
                style={this.loaderConfig.loadingScreenType1.progressBar.text.style}
                x={932}
                y={1045}
                text={(this.loadingProgress)}
            />
            :
            <Text
                anchor={[0.5, 0.5]} width={200} height={41}
                style={this.loaderConfig.loadingScreenType1.progressBar.text.style}
                x={525}
                y={1390}
                text={(this.loadingProgress)}
            />

        return loaderProgress;
    }

    /**
    * addMask function       
    * set mask for loading bar 
    */
    private addMask(): void {
        if (!this.maskingArr.length) {
            const thing = new PIXI.Graphics();
            thing.beginFill(0xDE3249);
            thing.drawRect(this.props.constant.configGame.loaderBarMaskX, this.props.constant.configGame.loaderBarMaskY, this.props.constant.configGame.loaderBarWidth, this.props.constant.configGame.loaderBarHeight);
            thing.endFill();
            this.loaderRect.addChild(thing);
            thing.x = 0;
            thing.y = 0;
            thing.alpha = 1
            this.loaderRect.mask = thing;
            this.maskingArr.push(thing);
        }
    }
    /**
     * gameAssetLoaded function  
     * set the current stage        
     */
    gameAssetLoaded() {
        this.setState((prevState) => {
            return {
                ...prevState,
                isLoadComplete: true,
            }
        })
        this.props.onGameAssetsLoad(this.hideLoader.bind(this));
        // this.props.onGameAssetsLoad();

    }
    /**
     * hideLoader function  
     * set the visibility of loader        
     */
    hideLoader() {
        if (!this.props.loading && this.loaderContainer && this.loaderContainer.alpha > 0) {
            this.loaderContainer && (this.loaderContainer.alpha = 0);
            this.loaderContainer && this.props.onloadingComplete();
        }
    }
    /**
    * shouldComponentUpdate function 
    * If pure is true, the selector returned by selectorFactory will memoize its results,
    * @param {Readonly} nextProps -  upcomming props  
    * @param {Readonly} nextState -  upcomming state 
    * @param {any} nextContext -  upcomming context 
    */
    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        return true;
    }
    /**
     * componentDidUpdate function  
     * update the component whenever any changes in loading 
     * or assets      
     */
    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        if (navigator.onLine && this.state.showPopUp) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    showPopUp: false,
                }
            })
        } else if (!navigator.onLine) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    showPopUp: true,
                }
            })
        }
    }
    /**
    * componentDidMount function  
    * set resize event Listner first timeload 
    * 
    */
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions.bind(this));
    }
    /**
    * componentWillUnmount function  
    * remove object from picture 
    * 
    *  */

    componentWillUnmount() {
        this._isMounted = false;
    }
    /**
      * updateDimensions function  
      * set resize event Listner first timeload 
      * 
      */
    updateDimensions() {
        if (isMobile) {
            if (this._isMounted) {
                if (window.innerHeight > window.innerWidth) {
                    this.loadedImageBG = this.app.loader.resources.loaderPortraitBg.url;
                    this.setState((prevState) => {
                        return {
                            ...prevState,
                            width: this.props.height,
                            height: this.props.width,

                        }
                    });
                } else {
                    this.loadedImageBG = this.app.loader.resources.loaderLandscapeBG.url;
                    this.setState((prevState) => {
                        return {
                            ...prevState,
                            width: this.props.width,
                            height: this.props.height,

                        }
                    });
                }
            }
        }
    }

    render() {
        const {
            loading
        } = this.props;
        const {
            showLoader,
            isLoadComplete,
            showPopUp
        } = this.state;
        let width, height, showInPortrait;
        width = this.props.width;
        height = this.props.height;
        if (isMobile) {
            if (window.innerHeight > window.innerWidth) {
                this.loadedImageBG = this.app.loader.resources.loaderPortraitBg.url;
                width = this.props.configGame.CANVAS_HEIGHT;
                height = this.props.configGame.CANVAS_WIDTH;
                showInPortrait = true;
            } else {
                width = this.props.width;
                height = this.props.height;
                this.loadedImageBG = this.app.loader.resources.loaderLandscapeBG.url;
                showInPortrait = false;
            }
        }

        return (
            <Container
                ref={i => this.loaderContainer = i} name={'loaderContainer'}>
                {showLoader &&
                    <Sprite x={width / 2} y={height / 2} width={width} name={"Sprite"}
                        height={height}
                        image={this.loadedImageBG} anchor={[0.5, 0.5]}></Sprite>
                }
                {this.props.LOADERUI}

                {!showInPortrait && showLoader && this.loadedBarImageBG &&
                    <Sprite name={"Sprite"}
                        x={width / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetX + this.props.constant.configGame.loaderBarBGX}
                        y={height / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetY + this.props.constant.configGame.loaderBarBGY}
                        image={this.loadedBarImageBG}></Sprite>
                }

                {showInPortrait && showLoader && this.loadedBarImageBG &&
                    <Sprite name={"Sprite"}
                        x={width / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetX + this.props.constant.configGame.loaderBarBGPortraitX}
                        y={height / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetY + this.props.constant.configGame.loaderBarBGPortraitY}
                        image={this.loadedBarImageBG}></Sprite>
                }


                {!showInPortrait && showLoader && this.loadedBarImage &&
                    <Sprite ref={i => this.loaderRect = i} name={"Sprite"}
                        x={((width / 2) - 10) + this.loaderConfig.loadingScreenType1.progressBar.offsetX + this.props.constant.configGame.loaderBarX}
                        y={((height / 2) - 12) + this.loaderConfig.loadingScreenType1.progressBar.offsetY + this.props.constant.configGame.loaderBarY}
                        image={this.loadedBarImage}></Sprite>
                }

                {showInPortrait && showLoader && this.loadedBarImage &&
                    <Sprite ref={i => this.loaderRect = i} name={"Sprite"}
                        x={width / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetX + this.props.constant.configGame.loaderBarPortraitX}
                        y={height / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetY + this.props.constant.configGame.loaderBarPortraitY}
                        image={this.loadedBarImage}></Sprite>
                }

                {
                    showLoader && !this.loadedBarImage &&
                    <Graphics
                        x={width / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetX}
                        y={height / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetY}
                        draw={g => {
                            g.beginFill(this.loaderConfig.loadingScreenType1.progressBar.baseRect.color, 1)
                            g.drawRoundedRect(0, 0, this.loaderConfig.loadingScreenType1.progressBar.baseRect.width, this.loaderConfig.loadingScreenType1.progressBar.baseRect.height, this.loaderConfig.loadingScreenType1.progressBar.baseRect.radius)
                            g.endFill()

                        }}
                    />
                }
                {
                    showLoader && !this.loadedBarImage &&
                    <Graphics ref={i => this.loaderRect = i}
                        x={width / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetX}
                        y={height / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetY}
                        pivot={1}
                        draw={g => {
                            g.beginFill(this.loaderConfig.loadingScreenType1.progressBar.rect.color, 1)
                            g.drawRoundedRect(0, 0, this.loaderConfig.loadingScreenType1.progressBar.baseRect.width, this.loaderConfig.loadingScreenType1.progressBar.baseRect.height, this.loaderConfig.loadingScreenType1.progressBar.baseRect.radius)
                            g.endFill()
                        }}
                    />
                }
                {
                    showLoader && this.props.constant.configGame.showLoaderText &&
                    <Text ref={i => this.loadingText = i}
                        anchor={[0.5, 0.5]} width={100} height={25}
                        style={this.loaderConfig.loadingScreenType1.progressBar.text.style}
                        x={this.props.width / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetX + this.loaderConfig.loadingScreenType1.progressBar.text.offsetX}
                        y={this.props.height / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetY + this.loaderConfig.loadingScreenType1.progressBar.text.offsetY}
                        text={isLoadComplete && (this.props.langObj[this.loaderConfig.loadingScreenType1.progressBar.displayTextTwo.text] || this.loaderConfig.loadingScreenType1.progressBar.displayTextTwo.text) || ""} />
                }
                {
                    showLoader && showPopUp &&
                    <Graphics
                        x={-4}
                        y={695}
                        pivot={1}
                        anchor={[0.5, 0.5]}
                        draw={g => {
                            g.beginFill(0x000000, 0.5)
                            g.drawRoundedRect(0, 0, this.loaderConfig.loadingScreenType1.progressBar.baseRect.width + 1400, this.loaderConfig.loadingScreenType1.progressBar.baseRect.height + 100, this.loaderConfig.loadingScreenType1.progressBar.baseRect.radius)
                            g.endFill()
                        }}
                    />
                }
                {
                    // showLoader && this.showLoaderProgress()
                }
                {
                    showLoader && showPopUp &&
                    <Text
                        anchor={[0.5, 0.5]} width={1013} height={41}
                        style={this.loaderConfig.loadingScreenType1.progressBar.text.style}
                        x={925}
                        y={745}
                        text={(this.props.langObj["noInternetPopUpText2"])} />
                }
                {
                    this.props.movingImg && <Sprite
                        x={this.maskingArr.length && this.maskingArr[0].x ? this.maskingArr[0].x + (showInPortrait ? this.props.constant.configGame.movingImgPortraitX : this.props.constant.configGame.movingImgX) : this.butterFlyX + (showInPortrait ? this.props.constant.configGame.movingImgPortraitX : this.props.constant.configGame.movingImgX)}
                        y={(showInPortrait ? this.props.constant.configGame.movingImgPortraitY : this.props.constant.configGame.movingImgY)}
                        image={this.props.movingImg}
                        anchor={[0.5, 0.5]}
                        name={this.props.name === undefined ? 'sprite' : this.props.name}
                        key={`sprite-${Math.random() * 10000}`}
                    >
                    </Sprite>
                }
            </Container>
        );
    }
}
export default withLoaderConfiguration(Loader)