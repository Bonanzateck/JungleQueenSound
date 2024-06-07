import * as React from 'react';

import {gameSettingsContainer, GameSettingsContainerConfigurationContext} from './gameSettingsContainerConfiguration';

const withGameSettingsContainerConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <GameSettingsContainerConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...gameSettingsContainer}/>
                );
            }}
        </GameSettingsContainerConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withGameSettingsContainerConfiguration;