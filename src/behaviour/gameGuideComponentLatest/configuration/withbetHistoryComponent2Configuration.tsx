import * as React from 'react';

import {betHistoryComponent2, BetHistoryComponent2ConfigurationContext} from './betHistoryComponent2Configuration';

const withBetHistoryComponent2Configuration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <BetHistoryComponent2ConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...betHistoryComponent2}/>
                );
            }}
        </BetHistoryComponent2ConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withBetHistoryComponent2Configuration;