import * as React from 'react';

import { BetHistoryComponentConfigurationContext } from './betHistoryComponentConfiguration';


interface IProps {
    children: React.ReactElement;

}

export class BetHistoryComponentConfigurationProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const { children, ...rest } = this.props;

        return (
            <BetHistoryComponentConfigurationContext.Provider value={{ ...rest }}>
                {children}
            </BetHistoryComponentConfigurationContext.Provider>
        );
    }
}
export default BetHistoryComponentConfigurationProvider;
