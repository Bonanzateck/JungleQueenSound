import * as React from 'react';
import { SymbolConfigurationContext, frameworkSymbol } from "@bonanzainteractive/slote_core";


const withSymbolConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <SymbolConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkSymbol}/>
                );
            }}
        </SymbolConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withSymbolConfiguration;