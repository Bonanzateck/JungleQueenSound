import * as React from 'react';
import { buyFeatureConfigurationContext, frameworkBuyFeature } from './buyFeatureConfiguration';

const withBuyFeatureConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <buyFeatureConfigurationContext.Consumer>
            {(): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkBuyFeature} />
                );
            }}
        </buyFeatureConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withBuyFeatureConfiguration;