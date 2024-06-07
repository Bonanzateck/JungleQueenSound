import * as React from 'react';
import { MysteryCounterContext } from './mysteryCounterConfiguration';

interface IProps {
    children: React.ReactElement;
}

export class MysteryCounterProvider extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const { children, ...rest } = this.props;

        return (
            <MysteryCounterContext.Provider value={{ ...rest }}>
                {children}
            </MysteryCounterContext.Provider>
        );
    }
}

export default MysteryCounterProvider;
