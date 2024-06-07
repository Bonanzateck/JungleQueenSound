import * as React from 'react';
import {mobViewPanelConfigurationContext, frameworkMobViewPanel} from './mobViewPanelconfiguration';

const withMobViewPanelConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <mobViewPanelConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkMobViewPanel}/>
                );
            }}
        </mobViewPanelConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withMobViewPanelConfiguration;