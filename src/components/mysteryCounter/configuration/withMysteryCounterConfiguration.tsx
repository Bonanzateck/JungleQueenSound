import * as React from 'react';

import { MysteryCounterContext, frameworkMysteryCounterConfiguration } from './mysteryCounterConfiguration';

const withMysteryCounterConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <MysteryCounterContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkMysteryCounterConfiguration} />
                );
            }}
        </MysteryCounterContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withMysteryCounterConfiguration;