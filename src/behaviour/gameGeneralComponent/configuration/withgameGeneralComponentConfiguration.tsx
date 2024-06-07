import * as React from 'react';

import {gameGeneralComponent, GameGeneralComponentConfigurationContext} from './gameGeneralComponentConfiguration';

const withGameGeneralComponentConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <GameGeneralComponentConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...gameGeneralComponent}/>
                );
            }}
        </GameGeneralComponentConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withGameGeneralComponentConfiguration;