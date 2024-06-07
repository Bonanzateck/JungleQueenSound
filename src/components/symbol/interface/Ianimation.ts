export interface Ianimation {
    "id"?: string,
    "name"?: string,
    "image"?: string,
    "type": string,
    "effectType"?: any,
    "width"?: number | string,
    "maskHeight"?: number | string,
    "spineAnimName"?: string,
    "height"?: number | string,
    "x"?: number | string,
    "y"?: number | string,
    "anchor"?: any,
    "animationSpeed"?: number | string,
    "playing"?: boolean,
    "loop"?: boolean,
    "scaleToFit"?: boolean,
    "visible": boolean,
    "scale"?: number,
    "currentFrames"?: Array<string>,
    "animations"?: {},
    "animationData"?: {
        "frame-pre-name": string,
        "frame-post-name": string,
        "frame-count": number
    },
    "spinedata"?: {
        "spinename": string,
        "animationname": string,
        "loop": boolean,
        "timeScale": number,

    },
    "text"?: number | string,
    "textStyle"?: { fontFamily: string; fontSize: number; fill: string[]; stroke: string[]; strokeThickness: number; dropShadow: true; dropShadowColor: string; dropShadowAngle: number; dropShadowDistance: number; letterSpacing: number; }

}