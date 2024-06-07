export interface Iloader {
    "baseUrl": string,
    "loadingScreenType1": {
        "loaderImage": string,
        "progressBar": {
            "offsetX": number,
            "offsetY": number,
            "type": string,
            "baseRect": {
                "height": number,
                "width": number,
                "color": string,
                "radius": number
            },
            "rect": {
                "height": number,
                "width": number,
                "color": string,
                "radius": number
            },
            "text": {
                "offsetX": number,
                "offsetY": number,
                "value": number,
                "style": any,
            },
            "displayTextOne": {
                "text": any
            },
            "displayTextTwo": {
                "text": any
            }
        }
    },
    "loadingScreenType2": any,
    config: any,
    "manifest": any,


}