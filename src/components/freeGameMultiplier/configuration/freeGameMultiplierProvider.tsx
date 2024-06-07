import * as React from 'react';
import { FreegameMultiplierContext } from './freeGameMultiplierConfiguration';

interface IProps {
    children: React.ReactElement;
}

export class FreegameMultiplierProvider extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const { children, ...rest } = this.props;

        return (
            <FreegameMultiplierContext.Provider value={{ ...rest }}>
                {children}
            </FreegameMultiplierContext.Provider>
        );
    }
}

export default FreegameMultiplierProvider;
