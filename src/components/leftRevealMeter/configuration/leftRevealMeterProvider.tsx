import * as React from 'react';
import { LeftRevealMeterContext } from './leftRevealMeterConfiguration';

interface IProps {
    children: React.ReactElement;
}

export class LeftRevealMeterProvider extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const { children, ...rest } = this.props;

        return (
            <LeftRevealMeterContext.Provider value={{ ...rest }}>
                {children}
            </LeftRevealMeterContext.Provider>
        );
    }
}

export default LeftRevealMeterProvider;
