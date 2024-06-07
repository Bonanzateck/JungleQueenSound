
import { baseGameAction, freegameActions } from "@bonanzainteractive/slote_core";

export const playNextFreeCommand = (initResult: any): void => {
    // Check if there are more free spins left.
    if (initResult.config.freespins && initResult.state.totalFSAwarded && initResult.state.freespinsRemaining) {
        // Start a new free game.
        freegameActions.startFreegame();
    } else {
        // Play the next free game.
        freegameActions.nextFreegame();
    }
}


export const setFreeGameConfig = (nextProps: any) => {
    const { initResult } = nextProps;
    // Check if the game has free spins.
    if (initResult) {
        if (initResult.config.freespins && initResult.state.totalFSAwarded && initResult.state.freespinsRemaining) {
            // If free spins are available, set the base game state false.
            baseGameAction.setApplicationToBaseGameState(false);
        }

        // Check if it's the last free spin.
        if (initResult.config.freespins && initResult.state.freespinsRemaining === 0) {
            // Notify that the free game has been retriggered.
            nextProps.reTriggeredFreegame(true);
        } else if (initResult.config.freespins) {
            // Calculate the difference in the total number of free spins.
            let count = initResult.state.totalFSAwarded - initResult.state.freespinsRemaining;
            if (count !== 0) {
                // Notify that the free game has been retriggered.
                nextProps.reTriggeredFreegame(true);
            }
        }
    }
}


export const showErrorMessage = (errorCode: number, props: any) => {
    switch (errorCode) {
        case 400:
            props.visibleNoInternetPopUp(true, "noInternetPopUpText5", true, false);
            break;
        case 402:
            props.visibleNoInternetPopUp(true, "noInternetPopUpText3", true, false);
            break;
        case 500:
            props.visibleNoInternetPopUp(true, "noInternetPopUpText6", true, false);
            break;
        case 502:
            props.visibleNoInternetPopUp(true, "noInternetPopUpText5", true, false);
            break;
        default:
            return 'No buttons';
    }
}

