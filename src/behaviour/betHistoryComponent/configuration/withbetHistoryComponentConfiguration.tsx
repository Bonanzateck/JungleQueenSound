import * as React from 'react';

import {betHistoryComponent, BetHistoryComponentConfigurationContext} from './betHistoryComponentConfiguration';

const withBetHistoryComponentConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <BetHistoryComponentConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...betHistoryComponent}/>
                );
            }}
        </BetHistoryComponentConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withBetHistoryComponentConfiguration;