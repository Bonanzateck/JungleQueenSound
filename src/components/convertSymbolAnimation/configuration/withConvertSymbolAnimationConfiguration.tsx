import * as React from 'react';

import {ConvertSymbolAnimationContext, frameworkConvertSymbolAnimationConfiguration} from './convertSymbolAnimationConfiguration';

const withConvertSymbolAnimationConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <ConvertSymbolAnimationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkConvertSymbolAnimationConfiguration}/>
                );
            }}
        </ConvertSymbolAnimationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withConvertSymbolAnimationConfiguration;