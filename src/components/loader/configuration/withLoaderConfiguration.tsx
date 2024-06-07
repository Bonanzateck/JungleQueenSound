import * as React from 'react';
import {LoaderConfigurationContext, frameworkLoader} from './loaderconfiguration';
/**
 * withLoaderConfiguration HOC component 
 * @param {object} p will render 
 * export default withLoaderConfiguration
 */
const withLoaderConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <LoaderConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkLoader}/>
                );
            }}
        </LoaderConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withLoaderConfiguration;