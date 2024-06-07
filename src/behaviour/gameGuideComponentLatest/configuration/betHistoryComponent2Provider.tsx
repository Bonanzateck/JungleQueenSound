import * as React from 'react';

import { BetHistoryComponent2ConfigurationContext } from './betHistoryComponent2Configuration';


interface IProps {
    children: React.ReactElement;

}

export class BetHistoryComponent2ConfigurationProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const { children, ...rest } = this.props;

        return (
            <BetHistoryComponent2ConfigurationContext.Provider value={{ ...rest }}>
                {children}
            </BetHistoryComponent2ConfigurationContext.Provider>
        );
    }
}
export default BetHistoryComponent2ConfigurationProvider;
