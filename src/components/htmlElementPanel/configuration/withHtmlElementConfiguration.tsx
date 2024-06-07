import * as React from 'react';
import {htmlElementConfigurationContext, frameworkHtmlElement} from './htmlElementconfiguration';

const withHtmlElementConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <htmlElementConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkHtmlElement}/>
                );
            }}
        </htmlElementConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withHtmlElementConfiguration;