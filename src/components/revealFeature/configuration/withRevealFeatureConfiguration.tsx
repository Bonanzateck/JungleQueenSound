import * as React from 'react';

import {RevealFeatureConfigurationContext, frameworkRevealFeature} from './revealFeatureConfiguration';

const withRevealFeatureConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <RevealFeatureConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkRevealFeature}/>
                );
            }}
        </RevealFeatureConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withRevealFeatureConfiguration;