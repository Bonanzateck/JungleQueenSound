import * as React from 'react';

import { FreegameMultiplierContext, frameworkFreegameMultiplierConfiguration } from './freeGameMultiplierConfiguration';

const withFreegameMultiplierConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <FreegameMultiplierContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkFreegameMultiplierConfiguration} />
                );
            }}
        </FreegameMultiplierContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withFreegameMultiplierConfiguration;