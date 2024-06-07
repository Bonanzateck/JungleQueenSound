import React from "react";


interface IframeworkSound {
    data: {}
}

export const frameworkSound: IframeworkSound = {
    data: {
        sfx: {},
        bg: {}

    }

};
export const soundConfigurationContext = React.createContext(
    {}
);